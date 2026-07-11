import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { pusherServer } from "@/app/lib/pusher";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { job_id, mechanic_id, mechanic_email } = body;

    let mId = mechanic_id;

    if (mechanic_email && !mId) {
      const mech = await prisma.user.findUnique({ where: { email: mechanic_email } });
      if (!mech) return NextResponse.json({ message: "Mechanic not found" }, { status: 404 });
      mId = mech.id;
    }

    if (!job_id || !mId) {
      return NextResponse.json({ message: "Missing job_id or mechanic_id" }, { status: 400 });
    }

    // Assign the mechanic and update status
    const job = await prisma.job.update({
      where: { id: job_id },
      data: {
        mechanic_id: mId,
        status: "ASSIGNED"
      },
      include: {
        customer: { select: { first_name: true, last_name: true, phone: true } },
        vehicle: { select: { make: true, model: true, year: true, license_plate: true } }
      }
    });

    // 1. Broadcast to the specific mechanic's private-ish channel
    // In production, we'd use Pusher presence channels or private channels with auth.
    // For MVP, we can just use a unique channel name based on mechanic_id.
    const channelName = `mechanic-${mId}`;
    
    await pusherServer.trigger(channelName, "job_assigned", {
      job: {
        id: job.id,
        customer_name: `${job.customer.first_name} ${job.customer.last_name}`,
        vehicle: `${job.vehicle.year} ${job.vehicle.make} ${job.vehicle.model}`,
        license_plate: job.vehicle.license_plate,
        issue: job.reported_issue,
        address: job.address,
        latitude: job.latitude,
        longitude: job.longitude,
        status: job.status
      }
    });

    // 2. Broadcast back to the Admin Control Room that the job is no longer pending
    await pusherServer.trigger("admin-channel", "job_status_update", {
      job_id: job.id,
      status: "ASSIGNED",
      mechanic_id: mId
    });

    return NextResponse.json({ success: true, job }, { status: 200 });
  } catch (error) {
    console.error("Dispatch assignment error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

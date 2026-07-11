import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { pusherServer } from "@/app/lib/pusher";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer_id, vehicle_id, reported_issue, latitude, longitude, address } = body;

    let vId = vehicle_id;

    if (body.fetch_first_vehicle && !vId) {
      const v = await prisma.vehicle.findFirst({ where: { user_id: customer_id } });
      if (!v) return NextResponse.json({ message: "No vehicle found for user" }, { status: 400 });
      vId = v.id;
    }

    if (!customer_id || !vId || !reported_issue || !latitude || !longitude) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Create the job in the database
    const job = await prisma.job.create({
      data: {
        customer_id,
        vehicle_id: vId,
        reported_issue,
        latitude,
        longitude,
        address,
        status: "PENDING",
      },
      include: {
        customer: {
          select: { first_name: true, last_name: true, phone: true }
        },
        vehicle: {
          select: { make: true, model: true, year: true, license_plate: true }
        }
      }
    });

    // Broadcast the new job to the Admin Control Room channel
    await pusherServer.trigger("admin-channel", "job_created", {
      job: {
        id: job.id,
        customer_name: `${job.customer.first_name} ${job.customer.last_name}`,
        vehicle: `${job.vehicle.year} ${job.vehicle.make} ${job.vehicle.model}`,
        license_plate: job.vehicle.license_plate,
        issue: job.reported_issue,
        address: job.address,
        latitude: job.latitude,
        longitude: job.longitude,
        status: job.status,
        created_at: job.created_at,
      }
    });

    return NextResponse.json({ success: true, job }, { status: 201 });
  } catch (error) {
    console.error("Job creation error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    // For the Admin Control Room initial load
    const jobs = await prisma.job.findMany({
      where: { status: "PENDING" },
      include: {
        customer: {
          select: { first_name: true, last_name: true, phone: true }
        },
        vehicle: {
          select: { make: true, model: true, year: true, license_plate: true }
        }
      },
      orderBy: { created_at: "desc" }
    });

    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    console.error("Fetch jobs error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

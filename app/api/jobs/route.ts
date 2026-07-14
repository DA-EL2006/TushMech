import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { pusherServer } from "@/app/lib/pusher";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    
    let customerId = session?.user ? (session.user as any).id : body.customer_id;
    let vId = body.vehicle_id;
    const { reported_issue, latitude, longitude, address, is_guest, phone } = body;

    // Handle frictionless guest SOS
    if (is_guest && phone) {
      let user = await prisma.user.findUnique({ where: { phone } });
      if (!user) {
        user = await prisma.user.create({
          data: {
            phone,
            first_name: "Guest",
            last_name: "User",
            role: "CUSTOMER",
            is_verified: false,
          }
        });
      }
      customerId = user.id;

      let vehicle = await prisma.vehicle.findFirst({ where: { user_id: customerId } });
      if (!vehicle) {
        vehicle = await prisma.vehicle.create({
          data: {
            user_id: customerId,
            make: "Unknown",
            model: "Vehicle",
            year: new Date().getFullYear(),
            license_plate: "GUEST-SOS",
          }
        });
      }
      vId = vehicle.id;
    }

    if (body.fetch_first_vehicle && !vId && customerId) {
      const v = await prisma.vehicle.findFirst({ where: { user_id: customerId } });
      if (!v) return NextResponse.json({ message: "No vehicle found for user" }, { status: 400 });
      vId = v.id;
    }

    if (!customerId || !vId || !reported_issue || !latitude || !longitude) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // Create the job in the database
    const job = await prisma.job.create({
      data: {
        customer_id: customerId,
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

    // Broadcast to Admin and Mechanics
    const broadcastData = {
      job: {
        id: job.id,
        customer_name: `${job.customer.first_name || ""} ${job.customer.last_name || ""}`.trim() || "Customer",
        vehicle: `${job.vehicle.year} ${job.vehicle.make} ${job.vehicle.model}`,
        license_plate: job.vehicle.license_plate,
        issue: job.reported_issue,
        address: job.address,
        latitude: job.latitude,
        longitude: job.longitude,
        status: job.status,
        created_at: job.created_at,
      }
    };
    
    await pusherServer.trigger("admin-channel", "job_created", broadcastData);
    await pusherServer.trigger("mechanics-channel", "new_job", broadcastData);

    return NextResponse.json({ success: true, job, customer_id: customerId }, { status: 201 });
  } catch (error) {
    console.error("Job creation error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    const userId = (session.user as any).id;

    let jobs;

    if (role === "CUSTOMER") {
      jobs = await prisma.job.findMany({
        where: { customer_id: userId },
        include: {
          mechanic: { select: { first_name: true, last_name: true, phone: true } },
          vehicle: { select: { make: true, model: true, year: true, license_plate: true } }
        },
        orderBy: { created_at: "desc" }
      });
    } else if (role === "MECHANIC") {
      jobs = await prisma.job.findMany({
        where: {
          OR: [
            { status: "PENDING" },
            { mechanic_id: userId }
          ]
        },
        include: {
          customer: { select: { first_name: true, last_name: true, phone: true } },
          vehicle: { select: { make: true, model: true, year: true, license_plate: true } }
        },
        orderBy: { created_at: "desc" }
      });
    } else {
      jobs = await prisma.job.findMany({
        include: {
          customer: { select: { first_name: true, last_name: true, phone: true } },
          vehicle: { select: { make: true, model: true, year: true, license_plate: true } }
        },
        orderBy: { created_at: "desc" }
      });
    }

    return NextResponse.json({ success: true, jobs });
  } catch (error) {
    console.error("Fetch jobs error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/app/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const vehicles = await prisma.vehicle.findMany({
      where: { user_id: (session.user as any).id },
      orderBy: { created_at: 'desc' }
    });

    return NextResponse.json({ vehicles }, { status: 200 });
  } catch (error) {
    console.error("Vehicles GET error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { make, model, year, licensePlate, vin, currentMileage } = body;

    if (!make || !model || !year || !licensePlate) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        user_id: (session.user as any).id,
        make,
        model,
        year: parseInt(year),
        license_plate: licensePlate,
        vin: vin || undefined,
        current_mileage: currentMileage ? parseInt(currentMileage) : 0,
      },
    });

    return NextResponse.json({ message: "Vehicle added successfully", vehicle }, { status: 201 });
  } catch (error) {
    console.error("Vehicles POST error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

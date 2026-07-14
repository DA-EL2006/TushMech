import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { job_id, part_name, amount } = body;

    if (!job_id || !part_name || !amount) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // For the demo, we assume the first VENDOR user is the one receiving the order
    const vendor = await prisma.user.findFirst({ where: { role: "VENDOR" } });
    if (!vendor) {
      // Return a mock success if no vendor exists (pitch demo fallback)
      return NextResponse.json({
        success: true,
        order: { id: "ORD-MOCK-1", part_name, amount, status: "PENDING", escrow_status: "HELD" }
      });
    }

    const order = await prisma.vendorOrder.create({
      data: {
        vendor_id: vendor.id,
        job_id,
        part_name,
        amount,
        status: "PENDING",
        escrow_status: "HELD"
      }
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Escrow order creation error:", error);
    // Pitch Demo Fallback if DB is unreachable
    return NextResponse.json({
      success: true,
      demo_mode: true,
      order: { id: "ORD-DEMO-1", part_name: "Mock Part", amount: 15000, status: "PENDING", escrow_status: "HELD" }
    });
  }
}

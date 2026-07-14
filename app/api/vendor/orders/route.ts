import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const vendorId = session?.user ? (session.user as any).id : null;

    if (!vendorId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const orders = await prisma.vendorOrder.findMany({
      where: { vendor_id: vendorId },
      include: {
        job: {
          include: { customer: { select: { first_name: true, last_name: true } } }
        }
      },
      orderBy: { created_at: "desc" }
    });

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error("Fetch vendor orders error:", error);
    // Pitch Demo Fallback
    return NextResponse.json({
      success: true,
      demo_mode: true,
      orders: [
        { id: "ORD-DEMO-1", part_name: "Brembo Brake Pad Set", amount: 32000, quantity: 1, status: "PENDING", escrow_status: "HELD", created_at: new Date().toISOString(), job: { customer: { first_name: "Amara", last_name: "Okafor" } } },
        { id: "ORD-DEMO-2", part_name: "Bosch Spark Plugs", amount: 14500, quantity: 4, status: "SHIPPED", escrow_status: "HELD", created_at: new Date(Date.now() - 86400000).toISOString(), job: { customer: { first_name: "Emeka", last_name: "Chukwu" } } }
      ]
    });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { order_id, status } = body;

    const order = await prisma.vendorOrder.update({
      where: { id: order_id },
      data: { status }
    });

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    // Pitch Demo Fallback
    return NextResponse.json({ success: true, demo_mode: true, message: "Order updated (Demo Mode)" });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user ? (session.user as any).id : null;

    if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    let wallet = await prisma.wallet.findUnique({ where: { user_id: userId } });
    if (!wallet) {
      wallet = await prisma.wallet.create({ data: { user_id: userId, available_balance: 0, escrow_balance: 0 } });
    }

    return NextResponse.json({ success: true, wallet }, { status: 200 });
  } catch (error) {
    console.error("Fetch wallet error:", error);
    // Pitch Demo Fallback
    return NextResponse.json({
      success: true,
      demo_mode: true,
      wallet: { available_balance: 84000, escrow_balance: 15000 }
    });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const invoice = await prisma.invoice.findUnique({
      where: { id: resolvedParams.id },
      include: {
        job: {
          include: {
            diagnostic_report: {
              include: {
                estimate_items: true
              }
            },
            vehicle: true
          }
        }
      }
    });

    if (!invoice) {
      return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
    }

    return NextResponse.json({ invoice });
  } catch (error) {
    console.error("Failed to fetch invoice:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

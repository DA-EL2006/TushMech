import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { InvoiceStatus, TransactionStatus } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invoice_id, bvn, employmentStatus, income } = body;

    if (!invoice_id || !bvn) {
      return NextResponse.json(
        { message: "Missing required fields (invoice_id, bvn)" },
        { status: 400 }
      );
    }

    // 1. Fetch the invoice
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoice_id }
    });

    if (!invoice) {
      return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
    }

    if (invoice.status === InvoiceStatus.PAID) {
      return NextResponse.json({ message: "Invoice already paid" }, { status: 400 });
    }

    // ==========================================
    // 🏦 WEMA ALAT BNPL SIMULATION ENGINE
    // ==========================================
    // In production, this would call the actual Wema ALAT Loan APIs.
    // For the MVP Hackathon, we simulate network latency and risk logic.
    
    // Simulate API Network Delay (1.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Basic Risk Simulation Logic
    let isApproved = false;
    let loanId = null;

    if (employmentStatus === "Employed" && income >= invoice.total_amount * 0.3) {
      // Approve if employed and income is at least 30% of the total repair cost
      isApproved = true;
      loanId = `ALAT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    }

    if (!isApproved) {
      // Simulation: Rejected
      await prisma.invoice.update({
        where: { id: invoice_id },
        data: { bnpl_status: "REJECTED" }
      });

      return NextResponse.json({
        success: false,
        message: "Your credit application was declined based on the provided details.",
        alat_response: { status: "REJECTED", reason: "Debt to income ratio too high." }
      }, { status: 200 }); // Return 200 so the UI can show the rejection gracefully
    }

    // Simulation: Approved
    // 2. Update Invoice Status
    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoice_id },
      data: {
        status: InvoiceStatus.PAID,
        payment_method: "ALAT_BNPL",
        alat_loan_id: loanId,
        bnpl_status: "APPROVED"
      }
    });

    // 3. Generate a Transaction Record marking it as funded by ALAT
    await prisma.transaction.create({
      data: {
        invoice_id: updatedInvoice.id,
        amount: updatedInvoice.total_amount,
        reference: `WEMA-FUND-${loanId}`,
        status: TransactionStatus.SUCCESS
      }
    });

    return NextResponse.json({
      success: true,
      message: "Credit application approved! Your repair has been funded by ALAT.",
      alat_response: {
        loan_id: loanId,
        status: "APPROVED",
        funded_amount: updatedInvoice.total_amount,
        installments: 4,
        next_payment_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    });

  } catch (error) {
    console.error("ALAT BNPL Simulation error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

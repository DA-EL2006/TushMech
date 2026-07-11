import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { invoice_id, email } = body;

    if (!invoice_id || !email) {
      return NextResponse.json(
        { message: "Missing required fields (invoice_id, email)" },
        { status: 400 }
      );
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoice_id }
    });

    if (!invoice) {
      return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
    }

    // ==========================================
    // 💳 PAYSTACK INTEGRATION
    // ==========================================
    const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
    
    if (!PAYSTACK_SECRET || PAYSTACK_SECRET.includes("sk_test_...")) {
      // Fallback for MVP if no real Paystack key is provided in .env
      console.warn("No valid Paystack secret key found. Simulating Paystack Initialization.");
      return NextResponse.json({
        success: true,
        authorization_url: `/customer/checkout/success?invoice_id=${invoice.id}&reference=simulated_${Date.now()}`,
        reference: `simulated_${Date.now()}`
      });
    }

    // Call actual Paystack API
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        amount: Math.round(invoice.total_amount * 100), // Paystack uses kobo
        reference: `TM_${invoice.id}_${Date.now()}`,
        callback_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/customer/checkout/success?invoice_id=${invoice.id}`
      })
    });

    const data = await paystackRes.json();

    if (!data.status) {
      throw new Error(data.message || "Failed to initialize Paystack");
    }

    // Create a pending transaction in our DB
    await prisma.transaction.create({
      data: {
        invoice_id: invoice.id,
        amount: invoice.total_amount,
        reference: data.data.reference,
        status: "PENDING"
      }
    });

    return NextResponse.json({
      success: true,
      authorization_url: data.data.authorization_url,
      reference: data.data.reference
    });

  } catch (error) {
    console.error("Paystack Init error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

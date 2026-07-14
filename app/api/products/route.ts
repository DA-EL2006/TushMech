import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const vendorId = searchParams.get("vendorId");
    
    const where = vendorId ? { vendor_id: vendorId } : {};
    
    const products = await prisma.product.findMany({
      where,
      orderBy: { created_at: "desc" },
    });
    
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== "VENDOR") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, price, type, category, compat, stock, image_url } = body;

    const product = await prisma.product.create({
      data: {
        vendor_id: (session.user as any).id,
        name,
        price: parseFloat(price),
        type,
        category,
        compat: Array.isArray(compat) ? compat : [compat],
        stock: parseInt(stock),
        image_url: image_url || "/images/tire_inflator.jpg", // default placeholder
        rating: 0.0,
        reviews: 0
      }
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

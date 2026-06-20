import dbConnect from "@/config/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const products = await Product.find({})
      .sort({ name: 1 });

    return NextResponse.json({
      success: true,
      products,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
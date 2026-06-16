import dbConnect from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { cartData } = await request.json();

    await dbConnect();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false,message: "User not found" })}

    user.cartItems = cartData;
    await user.save();

    return NextResponse.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
}
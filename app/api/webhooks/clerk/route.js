import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    const payload = await req.json();

    await dbConnect();

    switch (payload.type) {
      case "user.created":
        await User.create({
          _id: payload.data.id,
          name: `${payload.data.first_name || ""} ${
            payload.data.last_name || ""
          }`.trim(),
          email: payload.data.email_addresses[0]?.email_address,
          imageUrl: payload.data.image_url,
        });
        break;

      case "user.updated":
        await User.findByIdAndUpdate(payload.data.id, {
          name: `${payload.data.first_name || ""} ${
            payload.data.last_name || ""
          }`.trim(),
          email: payload.data.email_addresses[0]?.email_address,
          imageUrl: payload.data.image_url,
        });
        break;

      case "user.deleted":
        await User.findByIdAndDelete(payload.data.id);
        break;

      default:
        console.log(`Unhandled event: ${payload.type}`);
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
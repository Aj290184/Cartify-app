import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import User from "@/models/User";

export async function POST(req) {
  try {
    const payload = await req.json();

    console.log("WEBHOOK HIT");
    console.log("Event:", payload.type);
    console.log("User ID:", payload.data?.id);
    console.log(payload.data);

    await dbConnect();

    const email = payload.data?.email_addresses?.[0]?.email_address || "";

    const fullName = `${payload.data?.first_name || ""} ${
      payload.data?.last_name || ""
    }`.trim();

    const name = fullName || email.split("@")[0] || "User";

    switch (payload.type) {
      case "user.created":
        await User.create({
          _id: payload.data.id,
          name,
          email,
          imageUrl: payload.data.image_url || "",
        });
        break;

      case "user.updated":
        await User.findByIdAndUpdate(
          payload.data.id,
          {
            name,
            email,
            imageUrl: payload.data.image_url || "",
          },
          { new: true }
        );
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
    console.error("Webhook Error:", error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
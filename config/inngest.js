import { Inngest } from "inngest";
import User from "@/models/User";
import dbConnect from "./db";

export const inngest = new Inngest({ id: "Cartify" });

// Inngest function to save data in database
export const syncUserCreation = inngest.createFunction(
  {
    id: "sync-user-from-clerk",
  },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    await User.create({
      _id: id,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      email: email_addresses[0]?.email_address,
      imageUrl: image_url,
    });

    return { success: true };
  }
);

//Inngest function for update user data in database
export const syncUserUpdation = inngest.createFunction(
  {
    id: "update-user-from-clerk",
  },
  { event: "clerk/user.updated" },

  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      email: email_addresses[0]?.email_address,
      imageUrl: image_url,
    };

	await dbConnect();
    await User.findByIdAndUpdate(id, userData);
  }
);

//Inngest function for delete user from database
export const syncUserDeletion = inngest.createFunction(
  {
    id: "delete-user-from-clerk",
  },
  { event: "clerk/user.deleted" },

  async ({ event }) => { 
	const { id } = event.data;

	await dbConnect();
    await User.findByIdAndDelete(id);
  }
);
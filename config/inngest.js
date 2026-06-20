import { Inngest } from "inngest";
import User from "@/models/User";
import dbConnect from "./db";
import Order from "@/models/Order";

export const inngest = new Inngest({ id: "Cartify" });

// Create User
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    await dbConnect();

    await User.create({
      _id: id,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      email: email_addresses[0]?.email_address,
      imageUrl: image_url,
    });

    return { success: true };
  }
);

// Update User
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    await dbConnect();

    await User.findByIdAndUpdate(id, {
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      email: email_addresses[0]?.email_address,
      imageUrl: image_url,
    });

    return { success: true };
  }
);

// Delete User
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    await dbConnect();

    await User.findByIdAndDelete(id);

    return { success: true };
  }
);

export const creatUserOrder = inngest.createFunction(
  {
    id : "create-user-order",
    batchEvents : {
      maxSize : 5,
      timeout : '5s'
    }
  },
  {event : 'order-created'},
  async ({events}) => {
    const orders = events.map((event) => {
      return {
        userId : event.data.userId,
        items :  event.data.items,
        amount : event.data.event,
        address : event.data.address,
        date : event.data.date
      }
    })

    await dbConnect();
    await Order.insertMany(orders)
    return { sucess : true, processed : orders.length};
  }
)
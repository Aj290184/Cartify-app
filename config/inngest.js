import { Inngest } from "inngest";
import User from "@/models/User";
import dbConnect from "./db";
import Order from "@/models/Order";

export const inngest = new Inngest({ id: "Cartify" });

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
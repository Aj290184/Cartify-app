import { serve } from "inngest/next";
import { creatUserOrder, inngest } from "@/config/inngest.js";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [ creatUserOrder ],
});
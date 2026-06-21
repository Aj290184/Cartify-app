// src/app/api/inngest/route.ts
import { serve } from "inngest/next";
import { creatUserOrder } from "@/config/inngest.js";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [ creatUserOrder ],
});
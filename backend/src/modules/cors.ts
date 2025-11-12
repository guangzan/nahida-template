import { cors } from "@elysiajs/cors"

export const corsModule = cors({
  origin: "http://localhost:3000",
  credentials: true,
})

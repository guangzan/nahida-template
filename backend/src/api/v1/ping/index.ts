import Elysia from "elysia"

export const ping = new Elysia({
  prefix: "/ping",
}).get("/", () => {
  const data = {
    title: "Welcome to Nahida Template",
    description:
      "A full-stack monorepo template built with Elysia.js, Next.js and Better Auth",
    features: [
      {
        title: "Backend API",
        description: "High-performance API server built with Elysia.js",
        children: [
          "TypeScript Support",
          "OpenAPI Documentation",
          "Better Auth Integration",
          "Drizzle ORM",
        ],
      },
      {
        title: "Frontend App",
        description: "Modern web application built with Next.js",
        children: [
          "React 19",
          "Tailwind CSS",
          "shadcn/ui Component Library",
          "TanStack Query",
        ],
      },
    ],
  }

  return data
})

import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { openAPI } from "better-auth/plugins"
import Elysia from "elysia"
import { db } from "../db"
import { account, session, user, verification } from "../db/schema/auth"
import { env } from "../utils/env"

export const authInstance = betterAuth({
  basePath: "/api/auth",
  telemetry: {
    enabled: false,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github"],
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  plugins: [openAPI()],
})

export const authMiddleware = new Elysia({ name: "better-auth" })
  .mount(authInstance.handler)
  .macro({
    auth: {
      async resolve({ request: { headers } }) {
        try {
          const session = await authInstance.api.getSession({
            headers,
          })
          if (!session) {
            // return status(401);
            throw new Response("Unauthorized", { status: 401 })
          }
          return {
            user: session.user,
            session: session.session,
          }
        } catch {
          throw new Response("Unauthorized", { status: 401 })
        }
      },
    },
  })

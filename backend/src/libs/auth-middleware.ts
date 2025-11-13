import Elysia from "elysia"
import { authInstance } from "./auth-instance"

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

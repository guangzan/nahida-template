import { authInstance } from "@backend/libs/auth-instance"
import { toNextJsHandler } from "better-auth/next-js"

export const { POST, GET } = toNextJsHandler(authInstance)

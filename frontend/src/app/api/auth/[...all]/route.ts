import { authInstance } from "@backend/libs/better-auth"
import { toNextJsHandler } from "better-auth/next-js"

export const { POST, GET } = toNextJsHandler(authInstance)

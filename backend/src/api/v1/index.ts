import Elysia from "elysia"
import { ping } from "./ping"
import { todo } from "./todo"

export const api = new Elysia({
  prefix: "/api/v1",
})
  .use(ping)
  .use(todo)

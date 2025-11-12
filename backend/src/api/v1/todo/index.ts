import { Elysia } from "elysia"

import { authMiddleware } from "../../../libs/better-auth"
import { model } from "./model"
import { service } from "./service"

export const todo = new Elysia({
  prefix: "/todos",
})
  .use(authMiddleware)
  .get(
    "/",
    ({ query, user }) =>
      service.list({
        userId: user.id,
        query,
      }),
    {
      auth: true,
      query: model.listQuery,
    }
  )
  .post(
    "/",
    ({ body, user }) =>
      service.create({
        userId: user.id,
        body,
      }),
    {
      auth: true,
      body: model.createBody,
    }
  )
  .get(
    "/:id",
    ({ params, user }) =>
      service.getById({
        userId: user.id,
        id: params.id,
      }),
    {
      auth: true,
    }
  )
  .put(
    "/:id",
    ({ params, body, user }) =>
      service.update({
        userId: user.id,
        id: params.id,
        body,
      }),
    {
      auth: true,
      body: model.updateBody,
    }
  )
  .delete(
    "/:id",
    ({ params, user }) =>
      service.delete({
        userId: user.id,
        id: params.id,
      }),
    {
      auth: true,
    }
  )

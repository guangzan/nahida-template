import { t } from "elysia"

const nullableString = t.Union([t.String(), t.Null()])

export const model = {
  listQuery: t.Object({
    categoryId: t.Optional(t.String()),
  }),
  createBody: t.Object({
    title: t.String(),
    content: t.Optional(t.String()),
    categoryId: t.String(),
  }),
  updateBody: t.Object({
    completed: t.Optional(t.Boolean()),
    title: t.Optional(nullableString),
    content: t.Optional(nullableString),
    categoryId: t.Optional(nullableString),
  }),
} as const

export type ListQuery = typeof model.listQuery.static
export type CreateBody = typeof model.createBody.static
export type UpdateBody = typeof model.updateBody.static

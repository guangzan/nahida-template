import { and, eq } from "drizzle-orm"

import { db } from "../../../db"
import { todo } from "../../../db/schema/todo"
import type { CreateBody, ListQuery, UpdateBody } from "./model"

type UpdatePayload = Omit<UpdateBody, "id">

type ListParams = {
  userId: string
  query: ListQuery
}

type CreateParams = {
  userId: string
  body: CreateBody
}

type UpdateParams = {
  userId: string
  id: string
  body: UpdatePayload
}

type GetParams = {
  userId: string
  id: string
}

type DeleteParams = {
  userId: string
  id: string
}

export const service = {
  async create({ userId, body }: CreateParams) {
    const content = body.content ?? ""

    const [newTodo] = await db
      .insert(todo)
      .values({
        userId,
        title: body.title,
        content,
        categoryId: body.categoryId,
      })
      .returning()

    return newTodo ?? null
  },

  async list({ userId, query }: ListParams) {
    const where = query.categoryId
      ? and(eq(todo.userId, userId), eq(todo.categoryId, query.categoryId))
      : eq(todo.userId, userId)

    const todos = await db
      .select()
      .from(todo)
      .where(where)
      .orderBy(todo.createdAt)

    return todos ?? null
  },

  async getById({ userId, id }: GetParams) {
    const result = await db
      .select()
      .from(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))

    if (!result.length) {
      return null
    }

    return result[0]
  },

  async update({ userId, id, body }: UpdateParams) {
    const updates: Partial<typeof todo.$inferInsert> = {
      updatedAt: new Date(),
    }

    if (typeof body.completed === "boolean") {
      updates.completed = body.completed
    }
    if (typeof body.title === "string") {
      updates.title = body.title
    }
    if (typeof body.content === "string") {
      updates.content = body.content
    }
    if (typeof body.categoryId === "string") {
      updates.categoryId = body.categoryId
    }

    const [updated] = await db
      .update(todo)
      .set(updates)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
      .returning()

    return updated ?? null
  },

  async delete({ userId, id }: DeleteParams) {
    const [deleted] = await db
      .delete(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
      .returning()

    return deleted ?? null
  },
}

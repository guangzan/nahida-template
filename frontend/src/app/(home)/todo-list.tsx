"use client"

import { client } from "@client"
import { useQuery } from "@tanstack/react-query"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"

export function TodoList() {
  const { data: session } = authClient.useSession()

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => client.api.v1.todos.get(),
    enabled: !!session,
  })

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
          <CardDescription>Please log in to view todos</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
        {error && <CardDescription>Error: {error.message}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ul>
          {response?.data?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

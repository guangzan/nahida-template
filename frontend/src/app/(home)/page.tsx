import { client } from "@client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LoginStatus } from "./login-status"
import { TodoList } from "./todo-list"

export default async function Page() {
  const response = await client.api.v1.ping.get()

  if (response.error) {
    return <div>Error: {response.error.value as string}</div>
  }

  const { data } = response

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="font-bold text-4xl tracking-tight">{data.title}</h1>
          <p className="text-lg text-muted-foreground">{data.description}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {data.features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-left text-muted-foreground text-sm">
                  {feature.children.map((child) => (
                    <li key={child}>{child}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <LoginStatus />
        <TodoList />
      </div>
    </div>
  )
}

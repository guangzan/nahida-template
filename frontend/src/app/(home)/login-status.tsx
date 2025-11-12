"use client"

import { useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

export function LoginStatus() {
  const { data: session } = authClient.useSession()
  const queryClient = useQueryClient()

  const handleGithubLogin = () => {
    authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    })
  }

  const handleLogout = async () => {
    await authClient.signOut()
    queryClient.removeQueries({ queryKey: ["todos"] })
  }

  return (
    <div className="flex items-center justify-center gap-4">
      {session ? (
        <div className="flex items-center gap-4">
          <p className="text-muted-foreground text-sm">
            Logged in as: {session.user.email}
          </p>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      ) : (
        <Button onClick={handleGithubLogin}>GitHub Login</Button>
      )}
    </div>
  )
}

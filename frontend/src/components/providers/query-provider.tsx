"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { env } from "@/utils/env"

let clientQueryClientSingleton: QueryClient

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        retry: env.NODE_ENV === "development" ? false : 3,
      },
      mutations: {
        retry: env.NODE_ENV === "development" ? false : 3,
      },
    },
  })
}

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient()
  }
  // Browser: make a new query client if we don't already have one
  // This is very important, so we don't re-make a new client if React
  // suspends during the initial render. This may not be needed if we
  // have a suspense boundary BELOW the creation of the query client
  if (!clientQueryClientSingleton) {
    clientQueryClientSingleton = createQueryClient()
  }
  return clientQueryClientSingleton
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

import type { App } from "@backend"
import { treaty } from "@elysiajs/eden"

const API_URL = "http://localhost:3001"

export const client = treaty<App>(API_URL, {
  fetch: {
    credentials: "include",
  },
  fetcher: (async (url, options) => {
    const res = await fetch(url, options)

    if (!res.ok) {
      throw new Error(`${res.statusText} (${res.status})`)
    }
    return res
  }) as typeof fetch,
})

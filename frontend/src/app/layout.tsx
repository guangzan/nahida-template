"use client"

import "./globals.css"
import { Providers } from "@/components/providers"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={"antialiased"} suppressHydrationWarning>
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}

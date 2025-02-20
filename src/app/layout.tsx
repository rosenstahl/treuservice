import type { Metadata } from "next"
import { inter } from "@/styles/fonts"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Treu Service",
  description: "Professionelle Dienstleistungen",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
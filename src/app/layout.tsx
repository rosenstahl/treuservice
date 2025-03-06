import type { Metadata } from 'next'
import "./globals.css"
import { inter } from '@/styles/fonts'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'TREU Service',
  description: 'TREU-Service - Zuverlässige Dienstleistungen für Gewerbekunden und Privatpersonen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={inter.variable}>
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCbAjl459xe6fTtqZ8rS3OjyVIKypc0Bfg&libraries=places,drawing,geometry`}
          strategy="beforeInteractive"
        />
      </head>
      <body className="h-screen flex flex-col bg-primary">
        {children}
      </body>
    </html>
  )
}
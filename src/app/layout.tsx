import type { Metadata } from 'next'
import "./globals.css"
import { inter } from '@/styles/fonts'
import Script from 'next/script'
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { WeatherProvider } from '@/components/weather/features/WeatherContext'

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
        <WeatherProvider>
          <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </WeatherProvider>
      </body>
    </html>
  )
}
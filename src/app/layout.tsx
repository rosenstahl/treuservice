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
  icons: {
    icon: [
      { url: '/images/favicon.ico', sizes: 'any' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={inter.variable}>
      <head>
        {/* Standard Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
        <link rel="manifest" href="/images/site.webmanifest" />
        <link rel="icon" href="/images/treu-logo.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* Google Maps API Key - async loading mit eindeutiger ID hinzugefügt */}
        <Script
          id="google-maps-api"
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
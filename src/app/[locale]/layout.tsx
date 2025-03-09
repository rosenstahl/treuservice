"use client"
 
import { notFound } from "next/navigation"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

// Import the WeatherProvider
import { WeatherProvider } from '@/components/weather/WeatherContext'

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

// Liste der unterstützten Sprachen
const supportedLocales = ['de', 'en']

export default function LocaleLayout({
  children,
  params,
}: RootLayoutProps) {
  // Unwrap params mit React.use() wie in der Warnung empfohlen
  const locale = params.locale

  // Validate that the incoming `locale` parameter is valid
  if (!supportedLocales.includes(locale)) {
    notFound()
  }

  return (
    <WeatherProvider>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </WeatherProvider>
  )
}
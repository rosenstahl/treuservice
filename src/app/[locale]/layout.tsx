import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

interface LocaleLayoutProps {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  // Wir können locale hier verwenden, z.B. für i18n oder andere Zwecke
  console.log(`Current locale: ${locale}`)
  
  return (
    <div className="font-sans">
      <Header />
      {children}
      <Footer />
    </div>
  )
}
"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Grid } from "@/components/layout/Grid"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { cn } from '@/lib/utils'
import { 
  Star, 
  ChevronRight, 
  Info, 
  CheckCircle2, 
  PhoneCall, 
  CloudSnow, 
  Snowflake, 
  Timer, 
  Calendar, 
  Truck, 
  Calculator 
} from 'lucide-react'
import { WeatherDetails } from '@/components/weather/WeatherDetails';
import { ServiceCard } from '@/components/ui/service-card'
import AppleCardsCarousel from '@/components/ui/apple-cards-carousel'
import AnimatedTestimonials from '@/components/ui/animated-testimonials'
import { HeroParallax } from '@/components/ui/hero-parallax'
import { FeaturesGrid } from '@/components/ui/features-section-demo-3'
import Image from "next/image"
import Link from "next/link"

const features = [
  {
    icon: <CloudSnow className="h-5 w-5 text-primary" />,
    title: "Schneeräumung",
    description: "Professionelles Räumen von Schnee und Eis für sichere Wege und Flächen."
  },
  {
    icon: <Snowflake className="h-5 w-5 text-primary" />,
    title: "Streudienst",
    description: "Umweltgerechtes Streuen bei Glätte mit optimalen Materialien für jede Situation."
  },
  {
    icon: <Timer className="h-5 w-5 text-primary" />,
    title: "24/7 Rufbereitschaft",
    description: "Rund um die Uhr für Sie verfügbar - auch an Wochenenden und Feiertagen."
  },
  {
    icon: <Calendar className="h-5 w-5 text-primary" />,
    title: "Saisonverträge",
    description: "Maßgeschneiderte Saisonverträge für planbare Kosten und sorgenfreie Wintermonate."
  },
  {
    icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
    title: "Rechtssicherheit",
    description: "Vollständige Übernahme der Verkehrssicherungspflicht und rechtliche Absicherung."
  },
  {
    icon: <Truck className="h-5 w-5 text-primary" />,
    title: "Spezialfahrzeuge",
    description: "Moderne Spezialfahrzeuge für effiziente Räumung auch großer Flächen."
  }
];

const heroItems = [
  {
    title: "Professioneller Winterdienst",
    description:
      "Schneeräumung und Streudienst für Privat- und Gewerbekunden im Rhein-Main-Gebiet.",
    link: "#services"
  },
  {
    title: "Streumittel-Rechner",
    description:
      "Berechnen Sie Ihren optimalen Streumittelbedarf mit unserem neuen Online-Rechner.",
    link: "/blog/StreumittelCalculator",
    highlighted: true
  },
  {
    title: "Keine Wintersorgen mehr",
    description:
      "Übernahme aller Pflichten inkl. Dokumentation und rechtlicher Absicherung.",
    link: "#about"
  },
];

export default function WinterdienstPage() {
  return (
    <div className="w-full">
      <HeroParallax
        items={heroItems}
        backgroundUrl="/images/winter/hero-bg.jpg"
        blur={true}
      />
      
      <Section id="about" className="">
        <Container>
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
            <div className="w-full md:w-1/2 lg:pr-8">
              <H2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-6">
                Zuverlässiger Winterdienst für Ihre Sicherheit
              </H2>
              <Paragraph className="mb-4 text-muted-foreground">
                Mit dem TREU Service Winterdienst überlassen Sie die Schneeräumung und Streuarbeiten
                echten Profis. Wir sorgen für sichere Gehwege, Parkplätze und Zufahrten - damit
                Sie und Ihre Besucher auch bei Eis und Schnee sicher unterwegs sind.
              </Paragraph>
              <Paragraph className="mb-4 text-muted-foreground">
                Als erfahrenes Unternehmen bieten wir maßgeschneiderte Lösungen für
                Privatpersonen, Hausverwaltungen und Gewerbetreibende im gesamten Rhein-Main-Gebiet.
              </Paragraph>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button className="gap-2" asChild>
                  <a href="#contact">
                    <PhoneCall className="h-4 w-4" />
                    Angebot anfordern
                  </a>
                </Button>
                <Button variant="outline" className="gap-2" asChild>
                  <Link href="/blog/StreumittelCalculator">
                    <Calculator className="h-4 w-4 text-blue-600" />
                    Zum Streumittel-Rechner
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-video relative rounded-xl overflow-hidden">
                <Image 
                  src="/images/winter/service.jpg" 
                  alt="TREU Service Winterdienst" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="bg-white shadow-lg p-4 rounded-lg absolute -bottom-6 -left-6 max-w-[280px] hidden md:block">
                <div className="flex items-center gap-2 mb-2">
                  <CloudSnow className="h-6 w-6 text-primary" />
                  <H3 className="font-bold">Winterdienst mit Mehrwert</H3>
                </div>
                <Paragraph className="text-sm">
                  Wir übernehmen die komplette Verantwortung und rechtliche 
                  Absicherung für Ihre Flächen im Winter.
                </Paragraph>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      <Section id="weather" className="bg-slate-50">
        <Container>
          <WeatherDetails />
        </Container>
      </Section>
      
      <Section id="services" className="bg-white">
        <Container>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 mb-12">
            <div className="md:w-1/3">
              <H2 className="text-3xl font-bold tracking-tight mb-4">
                Unsere Winterdienst-Leistungen
              </H2>
              <Paragraph className="text-muted-foreground mb-6">
                Umfassender Service für jede Situation - zuverlässig und pünktlich.
              </Paragraph>
              <div className="hidden md:block">
                <FeaturesGrid features={features} />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ServiceCard
                  icon={<CloudSnow className="h-6 w-6" />}
                  title="Schneeräumung"
                  description="Professionelle und zuverlässige Räumung von Schnee und Eis auf Gehwegen, Zufahrten und Parkplätzen. Wir arbeiten mit modernem Equipment für eine gründliche Reinigung."
                  features={[
                    "Manuelle und maschinelle Räumung",
                    "Regelmäßige Kontrollen bei Schneefall",
                    "Dokumentierte Einsatzprotokolle"
                  ]}
                />
                
                <ServiceCard
                  icon={<Snowflake className="h-6 w-6" />}
                  title="Professioneller Streudienst"
                  description="Umweltgerechtes Streuen bei Glätte mit optimal dosierten Streumitteln. Wir setzen auf die richtige Mischung zwischen Wirksamkeit und Umweltschutz."
                  features={[
                    "Umweltfreundliche Streumittel",
                    "Fachgerechte Dosierung",
                    "Bedarfsgerechter Einsatz"
                  ]}
                />
                
                <ServiceCard
                  icon={<CheckCircle2 className="h-6 w-6" />}
                  title="Verkehrssicherungspflicht"
                  description="Wir übernehmen Ihre gesetzliche Verpflichtung zur Beseitigung von Schnee und Eis. Mit uns sind Sie rechtlich auf der sicheren Seite."
                  features={[
                    "Vollständige Haftungsübernahme",
                    "Rechtsichere Dokumentation",
                    "Versicherungsschutz"
                  ]}
                />
                
                <ServiceCard
                  icon={<Calendar className="h-6 w-6" />}
                  title="Saisonverträge"
                  description="Planungssicherheit für die gesamte Wintersaison mit maßgeschneiderten Vertragsmodellen. Keine unerwarteten Kosten, keine Sorgen."
                  features={[
                    "Feste Pauschalen",
                    "Flexible Vertragsmodelle",
                    "Komplettpaket oder Einzeleinsätze"
                  ]}
                />
              </div>
              
              {/* Neue Call-to-Action für den Streumittel-Rechner */}
              <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="flex items-center justify-center bg-white p-3 rounded-full">
                    <Calculator className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <H3 className="font-bold text-xl mb-1">Streumittelrechner</H3>
                    <p className="text-slate-700 text-sm">
                      Berechnen Sie Ihren optimalen Streumittelbedarf, Kosten und umweltfreundliche Alternativen mit unserem interaktiven Online-Tool.
                    </p>
                  </div>
                  <Button className="whitespace-nowrap" asChild>
                    <Link href="/blog/StreumittelCalculator">
                      Zum Rechner
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="block md:hidden mt-6">
            <FeaturesGrid features={features} />
          </div>
        </Container>
      </Section>
      
      <Section id="testimonials" className="bg-slate-50">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <H2 className="text-3xl font-bold tracking-tight mb-4">
              Das sagen unsere Kunden
            </H2>
            <Paragraph className="text-muted-foreground">
              Seit über 10 Jahren vertrauen Privat- und Gewerbekunden auf unseren zuverlässigen Winterdienst.
            </Paragraph>
          </div>
          
          <AnimatedTestimonials testimonials={[
            {
              name: "Michael Schneider",
              title: "Hausverwalter, Frankfurt",
              image: "/images/testimonials/person1.jpg",
              content: "Endlich keine Beschwerden mehr von Mietern! Der Winterdienst von TREU Service ist absolut zuverlässig und gründlich. Besonders schätze ich die detaillierte Dokumentation und die rechtliche Absicherung."
            },
            {
              name: "Christina Bauer",
              title: "Immobilienbesitzerin, Offenbach",
              image: "/images/testimonials/person2.jpg",
              content: "Seit drei Jahren nutzen wir den Winterdienst und sind rundum zufrieden. Die Mitarbeiter sind immer pünktlich - selbst bei überraschendem Schneefall mitten in der Nacht! Sehr empfehlenswert."
            },
            {
              name: "Thomas Wagner",
              title: "Restaurantbesitzer, Darmstadt",
              image: "/images/testimonials/person3.jpg",
              content: "Für mein Restaurant ist ein sicherer Zugang essenziell. Das Team von TREU Service gewährleistet, dass unsere Gäste selbst bei extremen Wetterbedingungen sicher zu uns kommen können. Ein wichtiger Faktor für unser Geschäft!"
            },
            {
              name: "Marion Schuster",
              title: "Supermarktleiterin, Mainz",
              image: "/images/testimonials/person4.jpg",
              content: "Der Kundenservice ist hervorragend und die Mitarbeiter sind äußerst freundlich. Unser Parkplatz und die Eingänge sind selbst bei schlimmstem Winterwetter stets sicher und gut zugänglich."
            }
          ]} />
        </Container>
      </Section>
      
      <Section id="pricing" className="bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <H2 className="text-3xl font-bold tracking-tight mb-4">
              Winterdienst-Pakete für Ihre Bedürfnisse
            </H2>
            <Paragraph className="text-muted-foreground">
              Wir bieten flexible Lösungen für unterschiedliche Anforderungen und Budgets.
              Von Komplettlösungen für die ganze Wintersaison bis hin zu Einzeleinsätzen.
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-100">
              <CardHeader className="pb-0">
                <CardTitle className="text-xl">Basispaket</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-3xl font-bold">ab 349€</span>
                  <span className="text-sm text-muted-foreground ml-2">/ Saison</span>
                </div>
                <CardDescription>
                  Ideal für Privathaushalte mit kleinen Flächen
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Schneeräumung & Streudienst</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Einsatz bei Schneefall bzw. Glätte</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Dokumentation aller Einsätze</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full">Angebot anfordern</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary md:scale-105 shadow-md">
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                Empfohlen
              </div>
              <CardHeader className="pb-0 pt-6">
                <CardTitle className="text-xl">Komfortpaket</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-3xl font-bold">ab 649€</span>
                  <span className="text-sm text-muted-foreground ml-2">/ Saison</span>
                </div>
                <CardDescription>
                  Optimal für Mehrfamilienhäuser & kleine Gewerbe
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Alle Leistungen des Basispakets</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Haftungsübernahme</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>24/7 Rufbereitschaft</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Regelmäßige Kontrollfahrten</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full bg-primary hover:bg-primary/90">Angebot anfordern</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-100">
              <CardHeader className="pb-0">
                <CardTitle className="text-xl">Premiumpaket</CardTitle>
                <div className="mt-4 mb-2">
                  <span className="text-3xl font-bold">Individuell</span>
                </div>
                <CardDescription>
                  Maßgeschneidert für große Gewerbeflächen
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Alle Leistungen des Komfortpakets</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Einsatz von Spezialfahrzeugen</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Präventiver Winterdienst</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Dedizierter Ansprechpartner</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <Button className="w-full">Angebot anfordern</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 bg-slate-100 rounded-lg p-6 border border-slate-200">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <H3 className="font-semibold mb-2">Individuelle Beratung</H3>
                <Paragraph className="text-muted-foreground mb-4">
                  Jede Immobilie und jedes Grundstück ist anders. Kontaktieren Sie uns für eine 
                  kostenlose Beratung und ein unverbindliches Angebot, das exakt auf Ihre Bedürfnisse 
                  zugeschnitten ist.
                </Paragraph>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild>
                    <a href="#contact">Angebot anfordern</a>
                  </Button>
                  
                  <Button variant="outline" asChild>
                    <Link href="/blog/StreumittelCalculator" className="inline-flex items-center">
                      <Calculator className="mr-2 h-4 w-4 text-blue-600" />
                      Streumittelbedarf berechnen
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      <Section id="faq" className="bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <H2 className="text-3xl font-bold tracking-tight mb-4">
                Häufig gestellte Fragen
              </H2>
              <Paragraph className="text-muted-foreground">
                Antworten auf die wichtigsten Fragen rund um unseren Winterdienst
              </Paragraph>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <H3 className="font-semibold mb-2">Ab wann beginnt die Winterdienst-Saison?</H3>
                <Paragraph className="text-muted-foreground">
                  Unsere Winterdienstsaison beginnt in der Regel am 1. November und endet am 31. März des Folgejahres. Bei besonderen Witterungsverhältnissen sind wir auch außerhalb dieses Zeitraums für Sie da.
                </Paragraph>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <H3 className="font-semibold mb-2">Welche Flächen werden geräumt?</H3>
                <Paragraph className="text-muted-foreground">
                  Wir räumen alle vereinbarten Flächen wie Gehwege, Zufahrten, Parkplätze, Eingangsbereiche und Notausgänge. Die genauen Flächen werden im Vorfeld vertraglich festgelegt und auf einem Lageplan markiert.
                </Paragraph>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <H3 className="font-semibold mb-2">Wie oft wird geräumt?</H3>
                <Paragraph className="text-muted-foreground">
                  Die Räumfrequenz hängt von den Witterungsbedingungen ab. Bei anhaltendem Schneefall oder Eisbildung räumen und streuen wir nach Bedarf mehrmals täglich. Für Gewerbeflächen bieten wir zudem regelmäßige Kontrollfahrten an.
                </Paragraph>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <H3 className="font-semibold mb-2">Welche Streumittel werden verwendet?</H3>
                <Paragraph className="text-muted-foreground">
                  Wir verwenden je nach lokalen Vorschriften und Kundenwunsch verschiedene Streumittel. In vielen Kommunen ist der Einsatz von Streusalz eingeschränkt oder verboten. Wir bieten sowohl abstumpfende Streumittel (Splitt, Sand) als auch umweltfreundliche Taumittel an.
                </Paragraph>
                <div className="mt-3">
                  <Link href="/blog/StreumittelCalculator" className="text-primary font-medium flex items-center hover:underline">
                    <Calculator className="mr-1.5 h-4 w-4 text-blue-600" />
                    Mit unserem Streumittelrechner optimale Mengen berechnen
                  </Link>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <H3 className="font-semibold mb-2">Übernehmen Sie die volle Haftung?</H3>
                <Paragraph className="text-muted-foreground">
                  Ja, wir übernehmen bei Vertragsabschluss die volle Haftung für die Verkehrssicherheit der vereinbarten Flächen im Winter. Dies umfasst alle Verpflichtungen der Verkehrssicherungspflicht bei Schnee und Eis.
                </Paragraph>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      <Section id="contact" className="bg-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <H2 className="text-3xl font-bold tracking-tight mb-4">
              Kontaktieren Sie uns
            </H2>
            <Paragraph className="text-muted-foreground">
              Unser Team steht Ihnen für eine individuelle Beratung und ein unverbindliches Angebot gerne zur Verfügung.
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Winterdienst anfragen</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                    <input type="text" id="name" className="w-full p-2 border rounded-md" placeholder="Ihr Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">E-Mail</label>
                    <input type="email" id="email" className="w-full p-2 border rounded-md" placeholder="Ihre E-Mail" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="phone">Telefon</label>
                  <input type="tel" id="phone" className="w-full p-2 border rounded-md" placeholder="Ihre Telefonnummer" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="address">Adresse der zu räumenden Fläche</label>
                  <input type="text" id="address" className="w-full p-2 border rounded-md" placeholder="Straße, Hausnummer, PLZ, Ort" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="area">Größe der Fläche (ca. in m²)</label>
                  <input type="number" id="area" className="w-full p-2 border rounded-md" placeholder="z.B. 100" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="message">Ihre Nachricht an uns</label>
                  <textarea id="message" rows={4} className="w-full p-2 border rounded-md" placeholder="Weitere Details oder Fragen..."></textarea>
                </div>
                
                <Button className="w-full">Anfrage absenden</Button>
              </form>
            </div>
            
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-4">Kontaktinformationen</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <PhoneCall className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-muted-foreground">+49 (0) 123 456 789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CloudSnow className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">24/7 Winterdienst-Hotline</p>
                      <p className="text-muted-foreground">+49 (0) 123 456 700</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Info className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Winterdienst-Informationen</p>
                      <p className="text-muted-foreground mb-2">
                        Nützliche Informationen für die Wintersaison:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Link href="/blog/winterdienst" className="text-primary hover:underline flex items-center">
                            <ChevronRight className="h-4 w-4 mr-1" /> 
                            DIY-Winterdienst Tipps
                          </Link>
                        </li>
                        <li className="flex items-center">
                          <Link href="/blog/streumittel" className="text-primary hover:underline flex items-center">
                            <ChevronRight className="h-4 w-4 mr-1" /> 
                            Streugut-Vergleich
                          </Link>
                        </li>
                        <li className="flex items-center">
                          <Link href="/blog/StreumittelCalculator" className="text-primary hover:underline flex items-center">
                            <Calculator className="h-4 w-4 mr-1 text-blue-600" /> 
                            Streumittel-Rechner
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-10 bg-blue-50 p-5 rounded-lg border border-blue-100">
                <div className="flex items-start gap-4">
                  <Snowflake className="h-8 w-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Saisonverträge sichern</h4>
                    <p className="text-slate-700 text-sm mb-4">
                      Sichern Sie sich jetzt Ihren Winterdienst-Vertrag für die kommende Saison und profitieren Sie von unserem Frühbucherrabatt!
                    </p>
                    <Button asChild>
                      <a href="tel:+49123456789">
                        <PhoneCall className="h-4 w-4 mr-2" />
                        Jetzt anrufen
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
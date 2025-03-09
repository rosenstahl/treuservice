"use client"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { ArrowRight, CheckCircle, Users, Calendar, Star, Phone, Mail } from 'lucide-react'
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { InView } from "@/components/ui/in-view"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { useParams } from "next/navigation"

// Import language data
import deData from "@/i18n/de/de.json"
import enData from "@/i18n/en/en.json"

export default function Home() {
  const params = useParams();
  const locale = (params.locale as "de" | "en") || "de";
  
  // Get the language data based on the locale
  const langData = locale === "de" ? deData : enData;
  
  // Get testimonials from the central testimonials collection
  const testimonials = langData.testimonials?.all?.slice(0, 6).map(t => ({
    quote: t.quote,
    name: t.author,
    designation: t.designation,
    src: "/images/testimonials/placeholder.jpg"
  })) || [];

  return (
    <div className="flex-1 bg-white">
      {/* Hero Section */}
      <Section className="bg-white pt-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <InView
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <H1 className="text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
                  Professionelle Dienstleistungen für jeden Bedarf
                </H1>
                <Paragraph className="mt-6 text-xl text-foreground/90">
                  Zuverlässige Services für Reinigung, Sicherheit, Winterdienst und Entrümpelung.
                  TREU Service - Ihr kompetenter Partner für alle Aufgaben rund um Gebäude und Grundstücke.
                </Paragraph>
                <div className="mt-12 flex flex-col sm:flex-row gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-white px-8 py-6 rounded-lg text-lg font-medium transform transition-all hover:scale-105">
                    Angebot anfordern
                  </Button>
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent/5 px-8 py-6 rounded-lg text-lg font-medium">
                    Mehr erfahren
                  </Button>
                </div>
              </div>
            </InView>
            <div className="relative h-[500px] rounded-3xl overflow-hidden">
              <Image
                src="/images/hero.jpg"
                alt="TREU Service - Professionelle Dienstleistungen"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Services Section */}
      <Section className="bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <H2 className="text-4xl font-bold tracking-tight mb-4">Unsere Dienstleistungen</H2>
            <Paragraph className="text-lg text-muted-foreground">
              Maßgeschneiderte Lösungen für Hausbesitzer, Unternehmen und öffentliche Einrichtungen
            </Paragraph>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 - Winterdienst */}
            <Card className="border-t-4 border-t-accent hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Winterdienst</CardTitle>
                <CardDescription>Professioneller Räum- und Streudienst</CardDescription>
              </CardHeader>
              <CardContent>
                <Paragraph className="mb-4">
                  Zuverlässige Schneeräumung und Glättebekämpfung für Privatpersonen und Gewerbetreibende.
                </Paragraph>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>24/7 Rufbereitschaft</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Umweltschonende Taumittel</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={`/${locale}/winterdienst`} className="w-full">
                  <Button className="w-full">
                    Mehr erfahren
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Service 2 - Reinigung */}
            <Card className="border-t-4 border-t-accent hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Reinigung</CardTitle>
                <CardDescription>Gebäude- und Spezialreinigung</CardDescription>
              </CardHeader>
              <CardContent>
                <Paragraph className="mb-4">
                  Professionelle Reinigungsdienstleistungen für saubere und hygienische Räumlichkeiten.
                </Paragraph>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Maßgeschneiderte Reinigungspläne</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Umweltfreundliche Reinigungsmittel</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={`/${locale}/reinigung`} className="w-full">
                  <Button className="w-full">
                    Mehr erfahren
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Service 3 - Security */}
            <Card className="border-t-4 border-t-accent hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Professioneller Sicherheitsdienst</CardDescription>
              </CardHeader>
              <CardContent>
                <Paragraph className="mb-4">
                  Umfassender Schutz für Immobilien, Veranstaltungen und mehr durch qualifiziertes Personal.
                </Paragraph>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Qualifiziertes Sicherheitspersonal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Maßgeschneiderte Sicherheitskonzepte</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={`/${locale}/security`} className="w-full">
                  <Button className="w-full">
                    Mehr erfahren
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Service 4 - Entrümpelung */}
            <Card className="border-t-4 border-t-accent hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Entrümpelung</CardTitle>
                <CardDescription>Fachgerechte Entsorgung</CardDescription>
              </CardHeader>
              <CardContent>
                <Paragraph className="mb-4">
                  Professionelle Entrümpelung und umweltgerechte Entsorgung für Privat und Gewerbe.
                </Paragraph>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Schnelle und saubere Durchführung</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>Umweltgerechte Entsorgung</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href={`/${locale}/entruempelung`} className="w-full">
                  <Button className="w-full">
                    Mehr erfahren
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </Container>
      </Section>

      {/* About Section */}
      <Section className="bg-white py-20">
        <Container>
          <div className="relative overflow-hidden rounded-xl bg-accent/5 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <H2 className="text-3xl font-bold mb-4">Über TREU Service</H2>
                <Paragraph className="mb-6">
                  Seit über 15 Jahren bieten wir erstklassige Dienstleistungen rund um Gebäude und Grundstücke. 
                  Mit unserem engagierten Team sorgen wir für die Zufriedenheit unserer Kunden und setzen auf höchste Qualitätsstandards.
                </Paragraph>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">15+</div>
                    <div className="text-sm text-muted-foreground">Jahre Erfahrung</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">500+</div>
                    <div className="text-sm text-muted-foreground">Zufriedene Kunden</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">50+</div>
                    <div className="text-sm text-muted-foreground">Mitarbeiter</div>
                  </div>
                </div>
                
                <Link href={`/${locale}/about`}>
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent/5">
                    Mehr über uns
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/about.jpg"
                  alt="TREU Service Team"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section className="bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <H2 className="text-4xl font-bold tracking-tight mb-4">
              {langData.testimonials?.title || "Kundenstimmen"}
            </H2>
            <Paragraph className="text-lg text-muted-foreground">
              Was unsere Kunden über unsere Dienstleistungen sagen
            </Paragraph>
          </div>
          
          <AnimatedTestimonials testimonials={testimonials} />
        </Container>
      </Section>

      {/* Contact Section */}
      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <H2 className="text-3xl font-bold mb-4">Kontaktieren Sie uns</H2>
              <Paragraph className="mb-6">
                Unser Team steht Ihnen für alle Fragen und Anliegen gerne zur Verfügung. 
                Kontaktieren Sie uns für ein unverbindliches Angebot oder eine Beratung.
              </Paragraph>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <div className="font-medium">Telefon</div>
                    <a href="tel:+4912345678" className="text-accent hover:underline">+49 (0) 123 456 78</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <div className="font-medium">E-Mail</div>
                    <a href="mailto:info@treu-service.de" className="text-accent hover:underline">info@treu-service.de</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-accent mt-1" />
                  <div>
                    <div className="font-medium">Öffnungszeiten</div>
                    <p>Mo-Fr: 8:00 - 18:00 Uhr</p>
                  </div>
                </div>
              </div>
              
              <Link href={`/${locale}/kontakt`}>
                <Button className="bg-accent hover:bg-accent/90 text-white">
                  Kontaktformular
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/images/contact.jpg"
                alt="TREU Service Kontakt"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
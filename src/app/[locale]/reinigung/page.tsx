"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import ColourfulText from "@/components/ui/colourful-text"
import ExpandableCleaningCards from "@/components/ui/ExpandableCleaningCards"
import { useSearchParams } from 'next/navigation'
import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import ReinigungWizard from "@/components/contact/reinigung/ReinigungWizard"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import cleaningData from "@/i18n/de/cleaning.json"
import {
  StarIcon,
  LeafIcon,
  Clock,
  Zap,
  Cog,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  BadgeCheck,
  Sparkles,
  XCircle,
  Handshake
} from "lucide-react"

export default function CleaningPage() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    setImageLoaded(true)
    
    // Service aus der URL holen
    const service = searchParams.get('service')
    if (service) {
      // Kurz warten bis die Seite geladen ist
      setTimeout(() => {
        // Die spezifische Card finden
        const card = document.querySelector(`[data-service-name="${service}"]`)
        if (card) {
          // Zur Card scrollen
          card.scrollIntoView({ behavior: 'smooth', block: 'center' })
          // Card öffnen
          setExpandedCard(service)
        }
      }, 500)
    }
  }, [searchParams])

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <Section className="relative bg-gradient-to-b from-primary/20 to-primary-light pt-28">
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
                  {cleaningData.hero.title}
                </H1>
                <div className="mt-4 min-h-[80px] text-3xl lg:text-4xl mb-8">
                  <ColourfulText text={cleaningData.hero.subtitle} />
                </div>
                <Paragraph className="mt-6 text-xl text-foreground/90">
                  {cleaningData.hero.description}
                </Paragraph>
                <button 
                  onClick={scrollToContact}
                  className="mt-12 bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-lg text-lg font-medium transform transition-all hover:scale-105"
                >
                  Jetzt Angebot anfordern
                </button>
              </div>
            </InView>
            <div className={cn(
              "relative h-[600px] rounded-3xl overflow-hidden transition-all duration-1000",
              imageLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <Image
                src="/images/reinigung/hero.jpg"
                fill
                className="object-cover"
                alt="Professionelle Reinigung"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

{/* Basisleistungen */}
<Section className="bg-background">
  <Container>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <InView
        variants={{
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 }
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-[600px] rounded-3xl overflow-hidden">
          <Image
            src="/images/reinigung/basis.jpg"
            fill
            className="object-cover"
            alt="Professionelle Reinigung"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
        </div>
      </InView>
      <div>
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5 }}
        >
          <H2 className="mb-4">{cleaningData.basisleistungen.title}</H2>
          <H3 className="mb-12">{cleaningData.basisleistungen.subtitle}</H3>
          <Paragraph className="mb-8">{cleaningData.basisleistungen.note}</Paragraph>
        </InView>
        <div className="grid grid-cols-1 gap-8">
          {cleaningData.basisleistungen.items.map((item, i) => (
            <InView
              key={i}
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ delay: i * 0.1 }}
            >
              <div
                className="flex items-start gap-4 group hover:bg-accent/5 p-4 rounded-lg transition-colors"
              >
                <div className="text-accent mt-1">
                  {i === 0 && <ClipboardCheck className="w-6 h-6" />}
                  {i === 1 && <Sparkles className="w-6 h-6" />}
                  {i === 2 && <Droplets className="w-6 h-6" />}
                  {i === 3 && <BadgeCheck className="w-6 h-6" />}
                  {i === 4 && <LeafIcon className="w-6 h-6" />}
                </div>
                <div>
                  <H3 className="text-lg font-medium group-hover:text-accent transition-colors">
                    {item}
                  </H3>
                </div>
              </div>
            </InView>
          ))}
        </div>
      </div>
    </div>
  </Container>
</Section>

      {/* Spezialisierte Lösungen */}
      <Section className="bg-primary/5">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <H2 className="text-center mb-12">{cleaningData.spezialisierteLoesungen.title}</H2>
            <ExpandableCleaningCards
              services={cleaningData.spezialisierteLoesungen.services.map(service => ({
                ...service,
                image: `/images/reinigung/${service.title.toLowerCase().replace(/\s+/g, '-')}.jpg`
              }))}
            />
          </InView>
        </Container>
      </Section>

      {/* Warum TREU Service */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <InView
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/reinigung/expertise.jpg"
                  fill
                  className="object-cover"
                  alt="TREU Service Expertise"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
              </div>
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <H2 className="mb-8">{cleaningData.warumTreuService.title}</H2>
                <Accordion type="single" collapsible className="w-full">
                  {cleaningData.warumTreuService.items.map((item, i) => {
                    const [title, description] = item.split(": ")
                    return (
                      <AccordionItem
                        key={i}
                        value={`item-${i}`}
                        className="border-b border-primary/10"
                      >
                        <AccordionTrigger className="hover:no-underline hover:bg-accent/5 rounded-lg transition-colors">
                          <span className="font-bold">{title}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="p-4 bg-accent/5 rounded-lg">
                            {description}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            </InView>
          </div>
        </Container>
      </Section>

      {/* Häufige Probleme */}
      <Section className="bg-background">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <H2>{cleaningData.haeufigeProbleme.title}</H2>
              <Paragraph className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                {cleaningData.haeufigeProbleme.subtitle}
              </Paragraph>
            </div>
          </InView>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cleaningData.haeufigeProbleme.items.map((item, i) => (
              <InView
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: i * 0.1
                }}
              >
                <div
                  className="group relative overflow-hidden rounded-2xl bg-white/50 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl border border-accent/10"
                >
                  <div className="px-6 py-8">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-full bg-red-100/80 p-3">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <H3 className="text-lg font-semibold mb-2">{item.problem}</H3>
                        <Paragraph className="text-red-500 mb-6">
                          {item.issue}
                        </Paragraph>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-accent/10">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 rounded-full bg-green-100/80 p-3">
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <Paragraph className="text-green-600 font-medium py-2">
                          {item.solution}
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.2) 100%)',
                    }}
                  />
                </div>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Kontaktformular */}
      <Section id="kontakt" className="bg-accent/5">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">KONTAKT</Badge>
              <H2 className="mb-4">{cleaningData.kontakt.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {cleaningData.kontakt.subtitle}
              </Paragraph>
            </div>

            {/* Hier der neue ReinigungWizard */}
            <ReinigungWizard />
            
          </InView>
        </Container>
      </Section>

      {/* Call-to-Action */}
      <Section className="bg-[#009FD8] text-white py-10">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Lassen Sie sich jetzt von unseren Experten beraten</h2>
            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              Unsere Reinigungsprofis finden die optimale Lösung für Ihre individuellen Anforderungen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-[#009FD8] hover:bg-gray-100 rounded-lg font-medium transition-all shadow-sm"
              >
                Kostenlose Beratung
              </button>
              <a 
                href="tel:+491234567890"
                className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                <Clock className="mr-2 h-5 w-5" />
                24/7 Erreichbar
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
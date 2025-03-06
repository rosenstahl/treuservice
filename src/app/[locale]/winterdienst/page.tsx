"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import ColourfulText from "@/components/ui/colourful-text"

import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"

import Image from "next/image"
import winterserviceData from "@/i18n/de/winterservice.json"

import {
  StarIcon,
  LeafIcon,
  Clock as ClockIcon,
  Zap,
  Cog,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  XCircle,
  Handshake,
  Snowflake,
  ThermometerSnowflake,
  CalendarClock,
  ShieldCheck
} from "lucide-react"

// Neue Wetter-Komponente importieren
import { WeatherWidget } from '@/components/weather/WeatherWidget'

// Neuer Buchungsassistent importieren
import WinterdienstWizard from '@/components/contact/winter/WinterdienstWizard'

export default function WinterservicePage() {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setImageLoaded(true)
  }, [])

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
                  {winterserviceData.winterservice.meta.title}
                </H1>
                <div className="mt-4 min-h-[80px] text-3xl lg:text-4xl mb-8">
                  <ColourfulText text={winterserviceData.winterservice.meta.subtitle} />
                </div>
                <Paragraph className="mt-6 text-xl text-foreground/90">
                  {winterserviceData.winterservice.hero.description}
                </Paragraph>
                <button 
                  className="mt-12 bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-lg text-lg font-medium transform transition-all hover:scale-105"
                  onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}
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
                src="/images/winterdienst/hero.jpg"
                fill
                className="object-cover"
                alt="Professioneller Winterdienst"
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

      {/* Neue Weather Widget Section */}
      <Section className="bg-white">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <H2 className="text-center mb-8">Intelligente Wettervorhersage für Ihren Winterdienst</H2>
            <Paragraph className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Unser intelligentes System basiert auf präzisen Wetterdaten des Deutschen Wetterdienstes (DWD) und liefert Ihnen alle wichtigen Informationen für einen effizienten Winterdienst.
            </Paragraph>
            
            {/* Weather Widget einbinden */}
            <WeatherWidget />
          </InView>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Hauptleistungen */}
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
                  src="/images/winterdienst/services.jpg"
                  fill
                  className="object-cover"
                  alt="Winterdienst Leistungen"
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
                <H2 className="mb-12">{winterserviceData.winterservice.mainServices.title}</H2>
              </InView>
              <div className="grid grid-cols-1 gap-8">
                {winterserviceData.winterservice.mainServices.services.map((service, i) => (
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
                        {i === 0 && <Snowflake className="w-6 h-6" />}
                        {i === 1 && <ThermometerSnowflake className="w-6 h-6" />}
                        {i === 2 && <Droplets className="w-6 h-6" />}
                        {i === 3 && <ClipboardCheck className="w-6 h-6" />}
                      </div>
                      <div>
                        <H3 className="text-lg font-medium group-hover:text-accent transition-colors">
                          {service.title}
                        </H3>
                        <Paragraph className="text-muted-foreground">
                          {service.description}
                        </Paragraph>
                      </div>
                    </div>
                  </InView>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Service Features */}
      <Section className="bg-primary/5">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <H2 className="text-center mb-12">{winterserviceData.winterservice.serviceFeatures.title}</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {winterserviceData.winterservice.serviceFeatures.features.map((feature, i) => (
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
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-accent/10">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-full bg-accent/10 p-3">
                        {i === 0 && <ClockIcon className="w-6 h-6 text-accent" />}
                        {i === 1 && <ShieldCheck className="w-6 h-6 text-accent" />}
                        {i === 2 && <ClipboardCheck className="w-6 h-6 text-accent" />}
                        {i === 3 && <CalendarClock className="w-6 h-6 text-accent" />}
                      </div>
                      <div>
                        <H3 className="text-lg font-semibold mb-2">{feature.title}</H3>
                        <Paragraph className="text-muted-foreground">
                          {feature.description}
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                </InView>
              ))}
            </div>
          </InView>
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
              <H2>{winterserviceData.winterservice.commonProblems.title}</H2>
              <Paragraph className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                {winterserviceData.winterservice.commonProblems.intro}
              </Paragraph>
            </div>
          </InView>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {winterserviceData.winterservice.commonProblems.problems.map((item, i) => (
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
                        <H3 className="text-lg font-semibold mb-2">{item.question}</H3>
                        <Paragraph className="text-red-500 mb-6">
                          {item.problem}
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
                </div>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Warum TREU Service */}
      <Section className="bg-primary/5">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <H2 className="text-center mb-12">{winterserviceData.winterservice.advantages.title}</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {winterserviceData.winterservice.advantages.items.map((advantage, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-lg border border-accent/10"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 rounded-full bg-accent/10 p-3">
                      {i === 0 && <StarIcon className="w-6 h-6 text-accent" />}
                      {i === 1 && <Zap className="w-6 h-6 text-accent" />}
                      {i === 2 && <ClockIcon className="w-6 h-6 text-accent" />}
                      {i === 3 && <Cog className="w-6 h-6 text-accent" />}
                      {i === 4 && <LeafIcon className="w-6 h-6 text-accent" />}
                      {i === 5 && <Handshake className="w-6 h-6 text-accent" />}
                    </div>
                    <H3 className="text-lg font-semibold">{advantage.title}</H3>
                  </div>
                  <Paragraph className="text-muted-foreground">
                    {advantage.description}
                  </Paragraph>
                </div>
              ))}
            </div>
          </InView>
        </Container>
      </Section>

      {/* Online Buchungs-Wizard */}
      <Section className="bg-accent/5" id="booking-section">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <H2 className="text-center mb-8">{winterserviceData.winterservice.contact.title}</H2>
            <Paragraph className="text-center mb-12 max-w-3xl mx-auto">
              Mit unserem Online-Buchungssystem können Sie schnell und einfach Ihren Winterdienst buchen. Wählen Sie die zu räumende Fläche, Ihr Wunschpaket und passende Zusatzleistungen.
            </Paragraph>
            
            {/* Hier wird der neue Buchungs-Wizard eingebunden */}
            <WinterdienstWizard />
          </InView>
        </Container>
      </Section>
    </div>
  )
}
"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { TextEffect } from "@/components/ui/text-effect"
import ExpandableSecurityCards from '@/components/ui/ExpandableSecurityCards'
import SecurityWizard from '@/components/contact/security/SecurityWizard'
import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"
import { useSearchParams } from 'next/navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import securityData from "@/i18n/de/security.json"
import {
  PlusCircle,  
  Bell,       
  Clock,     
  Zap,       
  Network,    
  Settings,    
  CheckCircle2,
  FileCheck,
  Lock,
  BadgeCheck,
  Eye,
  XCircle,
  ArrowRight,
  PhoneCall
} from "lucide-react"

export default function SecurityPage() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    setImageLoaded(true)

    // Service aus URL Parameter holen
    const service = searchParams.get('service')
    if (service) {
      setTimeout(() => {
        const card = document.querySelector(`[data-service-name="${service}"]`)
        if (card) {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' })
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
                  {securityData.hero.title}
                </H1>
                <div className="mt-4 min-h-[80px] text-3xl lg:text-4xl mb-8">
                  <TextEffect>{securityData.hero.subtitle}</TextEffect>
                </div>
                <Paragraph className="mt-6 text-xl text-foreground/90">
                  {securityData.hero.description}
                </Paragraph>
                <button 
                  onClick={scrollToContact}
                  className="mt-12 bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-lg text-lg font-medium transform transition-all hover:scale-105"
                >
                  {securityData.form.requestOffer}
                </button>
              </div>
            </InView>
            <div className={cn(
              "relative h-[600px] rounded-3xl overflow-hidden transition-all duration-1000",
              imageLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <Image
                src="/images/security/hero.jpg"
                fill
                className="object-cover"
                alt="Professionelle Security"
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
              <div className="relative h-[610px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/security/basis.jpg"
                  fill
                  className="object-cover"
                  alt="Professionelle Security"
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
                <H2 className="mb-4">{securityData.basisleistungen.title}</H2>
                <Paragraph className="mb-8">{securityData.basisleistungen.note}</Paragraph>
              </InView>
              <div className="grid grid-cols-1 gap-8">
                {securityData.basisleistungen.items.map((item, i) => (
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
                        {i === 0 && <FileCheck className="w-6 h-6" />}
                        {i === 1 && <Eye className="w-6 h-6" />}
                        {i === 2 && <Lock className="w-6 h-6" />}
                        {i === 3 && <PlusCircle className="w-6 h-6 text-red-600" />}
                        {i === 4 && <Bell className="w-6 h-6" />}
                        {i === 5 && <FileCheck className="w-6 h-6" />}
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

{/* Specialized Solutions */}
<Section className="bg-primary/5" id="services">
  <Container>
    <InView
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
    >
      <H2 className="text-center mb-12">{securityData.specializedLoesungen.title}</H2>
      <ExpandableSecurityCards
        services={securityData.specializedLoesungen.services.map(service => ({
          ...service,
          image: `/images/security/${service.title.toLowerCase().replace(/\s+/g, '-')}.jpg`
        }))}
        labels={{
          einsatzgebiete: securityData.specializedLoesungen.labels.einsatzgebiete,
          leistungen: securityData.specializedLoesungen.labels.leistungen,
          details: securityData.specializedLoesungen.labels.details,
          angebotAnfordern: securityData.specializedLoesungen.labels.angebotAnfordern
        }}
        expandedCard={expandedCard}
        setExpandedCard={setExpandedCard}
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
                  src="/images/security/expertise.jpg"
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
                <H2 className="mb-8">{securityData.warumTreuService.title}</H2>
                <Accordion type="single" collapsible className="w-full">
                  {securityData.warumTreuService.items.map((item, i) => {
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

      {/* Common Issues */}
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
              <H2>{securityData.commonIssues.title}</H2>
              <Paragraph className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                {securityData.commonIssues.subtitle}
              </Paragraph>
            </div>
          </InView>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {securityData.commonIssues.items.map((item, i) => (
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
              <H2 className="mb-4">{securityData.kontakt.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {securityData.kontakt.description}
              </Paragraph>
            </div>

            {/* Hier der neue SecurityWizard */}
            <SecurityWizard />
          </InView>
        </Container>
      </Section>

      {/* Call-to-Action */}
      <Section className="bg-[#009FD8] text-white py-10">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Lassen Sie sich jetzt von unseren Sicherheitsexperten beraten</h2>
            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              Unsere Sicherheitsspezialisten erstellen Ihnen ein maßgeschneidertes Konzept für Ihre individuellen Anforderungen
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-[#009FD8] hover:bg-gray-100 rounded-lg font-medium transition-all shadow-sm flex items-center justify-center"
              >
                Kostenlose Beratung
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <a 
                href="tel:+491234567890"
                className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                <PhoneCall className="mr-2 h-5 w-5" />
                24/7 Erreichbar
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
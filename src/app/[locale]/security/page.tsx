"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
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
  CheckCircle,
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
      {/* HERO Section - Full height */}
      <Section className="relative bg-white min-h-screen flex items-center pt-24 md:pt-28 py-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <InView
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <H1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  {securityData.hero.title}
                </H1>
                <div className="text-xl md:text-2xl font-medium text-accent mb-6">
                  {securityData.hero.subtitle}
                </div>
                <Paragraph className="text-lg text-gray-600 mb-8 max-w-xl">
                  {securityData.hero.description}
                </Paragraph>
                <button 
                  onClick={scrollToContact}
                  className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all duration-200 shadow-sm flex items-center gap-2"
                >
                  {securityData.hero.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </InView>
            <div className={cn(
              "relative h-[460px] rounded-2xl overflow-hidden transition-all duration-1000 shadow-xl",
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
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/5" />

      {/* ÜBER UNS Section - Full height */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <InView
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">ÜBER UNS</Badge>
                <H2 className="mb-4 text-secondary">{securityData.about.title}</H2>
                <Paragraph className="text-gray-600 mb-6">
                  {securityData.about.description}
                </Paragraph>
                
                <div className="space-y-2 mt-5">
                  {securityData.about.checkpoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={scrollToContact}
                  className="mt-6 px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all duration-200 shadow-sm inline-flex items-center gap-2"
                >
                  Kostenlose Beratung 
                  <ArrowRight className="h-4 w-4" />
                </button>
              </InView>
            </div>
            
            <div className="order-1 lg:order-2">
              <InView
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/security/expertise.jpg"
                    fill
                    className="object-cover"
                    alt="TREU Service Team"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </InView>
            </div>
          </div>
        </Container>
      </Section>

      {/* Basisleistungen - Full height */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <InView
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/security/basis.jpg"
                  fill
                  className="object-cover"
                  alt="Professionelle Security"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
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
                <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">BASISLEISTUNGEN</Badge>
                <H2 className="mb-4">{securityData.basisleistungen.title}</H2>
                <Paragraph className="mb-8 text-gray-600">{securityData.basisleistungen.note}</Paragraph>
              </InView>
              <div className="grid grid-cols-1 gap-4">
                {securityData.basisleistungen.items.map((item, i) => (
                  <InView
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: 30 },
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

      {/* Specialized Solutions - Full height */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0" id="services">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">SERVICE</Badge>
            <H2 className="mb-4 text-secondary">{securityData.specializedLoesungen.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              Unsere spezialisierten Sicherheitslösungen decken alle Bereiche ab - vom Objektschutz bis zum Personenschutz.
            </Paragraph>
          </div>
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
        </Container>
      </Section>

      {/* Ablaufprozess - Full height */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">ABLAUF</Badge>
            <H2 className="mb-4 text-secondary">{securityData.process.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {securityData.process.description}
            </Paragraph>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-accent/20 z-0 hidden md:block"></div>
              <div className="space-y-8">
                {securityData.process.steps.map((step, index) => (
                  <div key={index} className="relative z-10">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-1">{step.title}</h3>
                        <p className="text-foreground/70 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all duration-200 shadow-sm inline-flex items-center gap-2"
              >
                Jetzt anfragen
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* UNSERE VORTEILE Section - Full height */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">UNSERE VORTEILE</Badge>
            <H2 className="mb-4 text-secondary">{securityData.advantages.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {securityData.advantages.description}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {securityData.advantages.items.map((item, i) => (
              <InView
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-accent h-full">
                  <CardContent className="p-5">
                    <div className="flex flex-col h-full">
                      <div className="mb-3 text-accent">
                        {item.icon === "Zap" && <Zap className="w-4 h-4" />}
                        {item.icon === "Badge" && <BadgeCheck className="w-4 h-4" />}
                        {item.icon === "Network" && <Network className="w-4 h-4" />}
                        {item.icon === "Settings" && <Settings className="w-4 h-4" />}
                        {item.icon === "Clock" && <Clock className="w-4 h-4" />}
                        {item.icon === "Bell" && <Bell className="w-4 h-4" />}
                      </div>
                      <h3 className="text-base font-semibold mb-2 text-secondary">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Common Issues - Full height */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">HERAUSFORDERUNGEN</Badge>
            <H2 className="mb-4 text-secondary">{securityData.commonIssues.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {securityData.commonIssues.subtitle}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {securityData.commonIssues.items.map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-1.5 rounded-full bg-red-50 text-red-500 mt-1 flex-shrink-0">
                    <XCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{item.problem}</h3>
                    <p className="text-red-500 mt-1 text-sm">{item.issue}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 pl-10 mt-auto">
                  <div className="p-1.5 rounded-full bg-green-50 text-green-500 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-green-700 text-sm">{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ Section - Full height */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container size="small">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">FAQ</Badge>
            <H2 className="mb-4 text-secondary">{securityData.faq.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {securityData.faq.description}
            </Paragraph>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {securityData.faq.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="mb-4 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="font-medium text-secondary text-left">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      {/* Kontaktformular - Full height */}
      <Section id="kontakt" className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">KONTAKT</Badge>
            <H2 className="mb-4 text-secondary">{securityData.kontakt.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {securityData.kontakt.subtitle}
            </Paragraph>
          </div>

          {/* SecurityWizard */}
          <SecurityWizard />
        </Container>
      </Section>

      {/* Call-to-Action */}
      <Section className="bg-accent text-white py-10">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{securityData.kontakt.cta.title}</h2>
            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              {securityData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-accent hover:bg-gray-100 rounded-lg font-medium transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {securityData.kontakt.cta.button}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a 
                href="tel:+491234567890"
                className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                <PhoneCall className="mr-2 h-5 w-5" />
                {securityData.kontakt.cta.call}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
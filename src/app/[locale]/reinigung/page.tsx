"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import ExpandableCleaningCards from "@/components/ui/ExpandableCleaningCards"
import { useSearchParams } from 'next/navigation'
import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"
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
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  BadgeCheck,
  Sparkles,
  XCircle,
  FileText,
  Shield,
  Leaf,
  Phone,
  Star,
  Calendar
} from "lucide-react"

// Challenge Card Component - Simplified with fixed height
const ChallengeCard = ({ problem, issue, solution }: { problem: string; issue: string; solution: string }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full flex flex-col">
    <div className="flex items-start gap-3 mb-3">
      <div className="p-1.5 rounded-full bg-red-50 text-red-500 mt-1 flex-shrink-0">
        <XCircle className="w-4 h-4" />
      </div>
      <div>
        <h3 className="text-base font-semibold">{problem}</h3>
        <p className="text-red-500 mt-1 text-sm">{issue}</p>
      </div>
    </div>
    
    <div className="flex items-start gap-3 pl-10 mt-auto">
      <div className="p-1.5 rounded-full bg-green-50 text-green-500 flex-shrink-0">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <p className="text-green-700 text-sm">{solution}</p>
    </div>
  </div>
);

// Process Step Component - Compact Version
const ProcessStep = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <div>
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
  </div>
);

export default function CleaningPage() {
  const [imageLoaded, setImageLoaded] = useState(false)
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
      <Section className="relative bg-white min-h-screen flex items-center pt-24 md:pt-28">
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
                  {cleaningData.hero.title}
                </H1>
                <div className="text-xl md:text-2xl font-medium text-accent mb-6">
                  {cleaningData.hero.subtitle}
                </div>
                <Paragraph className="text-lg text-gray-600 mb-8 max-w-xl">
                  {cleaningData.hero.description}
                </Paragraph>
                <button 
                  onClick={scrollToContact}
                  className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all duration-200 shadow-sm flex items-center gap-2"
                >
                  Jetzt Angebot anfordern
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </InView>
            <div className={cn(
              "relative h-[460px] rounded-2xl overflow-hidden transition-all duration-1000 shadow-xl",
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
                <H2 className="mb-4 text-secondary">{cleaningData.about.title}</H2>
                <Paragraph className="text-gray-600 mb-6">
                  {cleaningData.about.description}
                </Paragraph>
                
                <div className="space-y-2 mt-5">
                  {cleaningData.about.checkpoints.map((point, idx) => (
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
                    src="/images/reinigung/about.jpg" 
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

      {/* BASISLEISTUNGEN Section - Verbessertes Design mit Button als Card */}
      <Section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <InView
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">BASISLEISTUNGEN</Badge>
                <H2 className="mb-4 text-secondary">{cleaningData.basisleistungen.title}</H2>
                <H3 className="text-accent mb-6">{cleaningData.basisleistungen.subtitle}</H3>
                <Paragraph className="text-gray-600 mb-8 max-w-2xl">
                  {cleaningData.basisleistungen.note}
                </Paragraph>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  {cleaningData.basisleistungen.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start p-4 gap-3 bg-gray-50 rounded-lg hover:shadow-md transition-all hover:bg-white"
                    >
                      <div className="bg-accent/10 p-2 rounded-full text-accent">
                        {i === 0 && <ClipboardCheck className="w-5 h-5" />}
                        {i === 1 && <Sparkles className="w-5 h-5" />}
                        {i === 2 && <Droplets className="w-5 h-5" />}
                        {i === 3 && <BadgeCheck className="w-5 h-5" />}
                        {i === 4 && <Leaf className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{item}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Button als eigene Card im Stil der anderen Buttons */}
                  <div
                    className="flex items-start p-4 gap-3 bg-accent rounded-lg hover:shadow-md transition-all hover:bg-accent/90 cursor-pointer"
                    onClick={scrollToContact}
                  >
                    <div className="bg-white p-2 rounded-full text-accent">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">Beratungsgespräch vereinbaren</p>
                    </div>
                  </div>
                </div>
              </InView>
            </div>
            
            <div className="lg:col-span-5 order-1 lg:order-2">
              <InView
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/reinigung/basis.jpg"
                    fill
                    className="object-cover"
                    alt="Professionelle Reinigung und Basisleistungen"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/20"></div>
                </div>
              </InView>
            </div>
          </div>
        </Container>
      </Section>

      {/* SERVICES Section - Die ExpandableCleaningCards bleiben wie sie waren */}
      <Section className="bg-[#F8FAFC] py-16">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">SERVICE</Badge>
            <H2 className="mb-4 text-[#222425]">{cleaningData.spezialisierteLoesungen.title}</H2>
          </div>
          
          <ExpandableCleaningCards />
        </Container>
      </Section>

      {/* ABLAUF Section - NEU */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">ABLAUF</Badge>
            <H2 className="mb-4 text-secondary">{cleaningData.process.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {cleaningData.process.description}
            </Paragraph>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-accent/20 z-0 hidden md:block"></div>
              <div className="space-y-8">
                {cleaningData.process.steps.map((step, index) => (
                  <div key={index} className="relative z-10">
                    <ProcessStep 
                      number={index + 1}
                      title={step.title}
                      description={step.description}
                    />
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

      {/* UNSERE VORTEILE Section - Angepasst an andere Pages */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">UNSERE VORTEILE</Badge>
            <H2 className="mb-4 text-secondary">{cleaningData.advantages.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {cleaningData.advantages.description}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {cleaningData.advantages.items.map((item, i) => (
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
                        {item.icon === "Clock" && <Star className="h-5 w-5" />}
                        {item.icon === "Badge" && <BadgeCheck className="h-5 w-5" />}
                        {item.icon === "Leaf" && <Leaf className="h-5 w-5" />}
                        {item.icon === "Shield" && <Shield className="h-5 w-5" />}
                        {item.icon === "Phone" && <Phone className="h-5 w-5" />}
                        {item.icon === "FileText" && <FileText className="h-5 w-5" />}
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

      {/* HERAUSFORDERUNGEN Section - Angepasst an andere Pages */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">HERAUSFORDERUNGEN</Badge>
            <H2 className="mb-4 text-secondary">{cleaningData.haeufigeProbleme.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {cleaningData.haeufigeProbleme.subtitle}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {cleaningData.haeufigeProbleme.items.map((item, i) => (
              <ChallengeCard
                key={i}
                problem={item.problem}
                issue={item.issue}
                solution={item.solution}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ Section - Verbessert und an andere Pages angepasst */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container size="small">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">FAQ</Badge>
            <H2 className="mb-4 text-secondary">{cleaningData.faq.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {cleaningData.faq.description}
            </Paragraph>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {cleaningData.faq.questions.map((faq, index) => (
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

      {/* Kontakt Section - Full height, gray background for contrast */}
      <Section id="kontakt" className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">KONTAKT</Badge>
            <H2 className="mb-4 text-secondary">{cleaningData.kontakt.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {cleaningData.kontakt.subtitle}
            </Paragraph>
          </div>
          
          <ReinigungWizard />
        </Container>
      </Section>

      {/* Call-to-Action */}
      <Section className="bg-accent text-white py-10">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{cleaningData.kontakt.cta?.title || "Sauberkeit ist Vertrauenssache"}</h2>
            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              {cleaningData.kontakt.cta?.description || "Überzeugen Sie sich von unserer Qualität. Wir erstellen Ihnen ein maßgeschneidertes Angebot für Ihre individuellen Anforderungen."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-accent hover:bg-gray-100 rounded-lg font-medium transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {cleaningData.kontakt.cta?.button || "Angebot anfordern"}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a 
                href="tel:+491234567890"
                className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                24/7 Erreichbar
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
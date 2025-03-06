"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { TextEffect } from '@/components/ui/text-effect'

import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import entkernungData from "@/i18n/de/entkernung.json"
import EntkernungWizard from '@/components/contact/entkernung/EntkernungWizard';
import {
  Clock,
  CheckCircle2,
  XCircle,
  HardHat,
  Hammer,
  FileCheck,
  Building,
  Recycle,
  AlertTriangle,
  FileText,
  ChevronDown,
} from "lucide-react"

export default function EntkernungPage() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const searchParams = useSearchParams()

  useEffect(() => {
    setImageLoaded(true)
  }, [searchParams])

  // Icons für die verschiedenen Entkernungsservices
  const serviceIcons = [
    <Hammer key="icon-hammer" className="w-8 h-8" />,
    <Building key="icon-building" className="w-8 h-8" />,
    <Recycle key="icon-recycle" className="w-8 h-8" />,
    <AlertTriangle key="icon-alert" className="w-8 h-8" />,
    <FileText key="icon-file" className="w-8 h-8" />
  ]

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
                  {entkernungData.hero.title}
                </H1>
                <div className="mt-4 min-h-[80px] text-3xl lg:text-4xl mb-8">
                  <TextEffect 
                    preset="fade-in-blur" 
                    per="word"
                    className="leading-normal font-medium"
                    speedReveal={1.5}
                  >
                    {entkernungData.hero.subtitle}
                  </TextEffect>
                </div>
                <Paragraph className="mt-6 text-xl text-foreground/90">
                  {entkernungData.hero.description}
                </Paragraph>
                <div className="mt-12 flex space-x-4">
                  <Link href="#kontakt">
                    <button className="bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-lg text-lg font-medium transform transition-all hover:scale-105">
                      Angebot anfordern
                    </button>
                  </Link>
                </div>
              </div>
            </InView>
            <div className={cn(
              "relative h-[600px] rounded-3xl overflow-hidden transition-all duration-1000",
              imageLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <Image
                src="/images/entkernung/hero.jpg"
                fill
                className="object-cover"
                alt="Professionelle Entkernung"
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

      {/* Intro Section */}
      <Section className="bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <H2 className="mb-6">{entkernungData.intro.title}</H2>
              <Paragraph className="text-lg">
                {entkernungData.intro.description}
              </Paragraph>
            </InView>
          </div>
        </Container>
      </Section>

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
                  src="/images/entkernung/basis.jpg"
                  fill
                  className="object-cover"
                  alt="Entkernung"
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
                <H2 className="mb-4">{entkernungData.basisleistungen.title}</H2>
                <Paragraph className="mb-8">{entkernungData.basisleistungen.note}</Paragraph>
              </InView>
              <div className="grid grid-cols-1 gap-8">
                {entkernungData.basisleistungen.items.map((item, i) => (
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
                        {serviceIcons[i]}
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

      {/* Unser Versprechen */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <H2 className="mb-4">{entkernungData.versprechen.title}</H2>
            </InView>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {entkernungData.versprechen.items.map((item, i) => (
              <InView
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="bg-white p-6 rounded-xl shadow-sm border border-accent/10 h-full flex flex-col">
                  <div className="bg-accent/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {i === 0 && <Hammer className="h-6 w-6 text-accent" />}
                    {i === 1 && <CheckCircle2 className="h-6 w-6 text-accent" />}
                    {i === 2 && <Clock className="h-6 w-6 text-accent" />}
                    {i === 3 && <Recycle className="h-6 w-6 text-accent" />}
                    {i === 4 && <FileCheck className="h-6 w-6 text-accent" />}
                  </div>
                  <H3 className="text-xl font-medium mb-2">{item.title}</H3>
                  <Paragraph className="text-gray-600 flex-grow">{item.description}</Paragraph>
                </div>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Arbeitsweise */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-16">
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <H2>{entkernungData.arbeitsweise.title}</H2>
            </InView>
          </div>
          
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-accent/20 hidden md:block" />
            
            <div className="space-y-8 md:space-y-0">
              {entkernungData.arbeitsweise.steps.map((step, i) => (
                <InView
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center mb-16`}>
                    <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} mb-6 md:mb-0`}>
                      <span className="inline-block text-sm font-bold text-accent mb-1">SCHRITT {i + 1}</span>
                      <H3 className="text-xl font-semibold mb-2">{step.title}</H3>
                      <Paragraph>{step.description}</Paragraph>
                    </div>
                    
                    <div className="relative md:w-1/2 flex justify-center">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold z-10">
                        {i + 1}
                      </div>
                      {i % 2 === 0 ? (
                        <div className="absolute left-1/2 w-0.5 h-16 bg-accent/20 hidden md:block" />
                      ) : (
                        <div className="absolute right-1/2 w-0.5 h-16 bg-accent/20 hidden md:block" />
                      )}
                    </div>
                  </div>
                </InView>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Ablauf */}
      <Section className="bg-accent/5">
        <Container>
          <div className="text-center mb-12">
            <H2 className="mb-4">{entkernungData.ablauf.title}</H2>
            <Paragraph className="text-muted-foreground max-w-2xl mx-auto">
              {entkernungData.ablauf.subtitle}
            </Paragraph>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 border border-accent/10 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-40 h-40 bg-primary/10 rounded-full flex items-center justify-center">
                  <HardHat className="w-20 h-20 text-primary" />
                  <div className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                    10
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <H3 className="text-xl font-semibold mb-4">Professioneller Entkernungsprozess in 10 Schritten</H3>
                <Paragraph className="mb-6">
                  Die Entkernung eines Gebäudes ist ein komplexer Prozess, der Fachwissen und eine durchdachte Planung erfordert. In unserem ausführlichen Leitfaden erklären wir den gesamten Ablauf von der Planung bis zur finalen Entsorgung.
                </Paragraph>
              </div>
            </div>
            
            {/* Preview der ersten 3 Schritte */}
            <div className="mt-8 pt-8 border-t border-accent/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {entkernungData.ablauf.items.slice(0, 3).map((item, i) => (
                  <InView
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <div className="bg-primary/5 rounded-lg p-4 h-full flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-primary font-semibold">
                          {i + 1}
                        </div>
                        <H3 className="text-base font-medium">{item.title}</H3>
                      </div>
                      <Paragraph className="text-sm flex-grow">
                        {item.description.length > 100 
                          ? item.description.substring(0, 100) + '...' 
                          : item.description}
                      </Paragraph>
                    </div>
                  </InView>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Häufige Probleme */}
      <Section className="bg-primary/5">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <H2>{entkernungData.haeufigeProbleme.title}</H2>
              <Paragraph className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                {entkernungData.haeufigeProbleme.subtitle}
              </Paragraph>
            </div>
          </InView>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {entkernungData.haeufigeProbleme.items.map((item, i) => (
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


      {/* FAQ */}
      <Section className="bg-primary/5">
        <Container>
          <div className="text-center mb-12">
            <InView
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <H2 className="mb-4">{entkernungData.faq.title}</H2>
            </InView>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {entkernungData.faq.questions.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-accent/10 mb-4 bg-white rounded-lg overflow-hidden shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                    <span className="text-left font-medium text-lg">{faq.question}</span>
                    <ChevronDown className="h-5 w-5 text-accent shrink-0 transition-transform duration-200" />
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
                  src="/images/entkernung/expertise.jpg"
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
                <H2 className="mb-8">{entkernungData.warumTreuService.title}</H2>
                <Accordion type="single" collapsible className="w-full">
                  {entkernungData.warumTreuService.items.map((item, i) => {
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

      {/* Contact CTA with Wizard */}
      <Section className="bg-accent/5" id="kontakt">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <H2 className="mb-4">{entkernungData.kontakt.title}</H2>
              <Paragraph className="text-muted-foreground max-w-2xl mx-auto">
                {entkernungData.kontakt.subtitle}
              </Paragraph>
            </div>
            
            <div className="mt-12 max-w-5xl mx-auto">
              <EntkernungWizard />
            </div>
          </InView>
        </Container>
      </Section>
    </div>
  )
}
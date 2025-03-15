"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import PVMontageWizard from "@/components/contact/pv/PVMontageWizard"
import pvMontageData from "@/i18n/de/pv-montage.json"
import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  PhoneCall,
  Battery,
  Shield,
  Zap,
  Sun,
  PanelTop,
  CheckCircle2,
  CircleDollarSign,
  Leaf,
  BookOpen,
  Clock,
  BadgeCheck,
  FileText,
  TrendingUp,
  XCircle,
  Hammer,
  MessageSquare
} from "lucide-react"

// TypeScript interface definitions
interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

interface ChallengeCardProps {
  problem: string;
  issue: string;
  solution: string;
}

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

// Accordion Item Component für FAQ
const AccordionItem = ({ question, answer, isOpen, onClick }: AccordionItemProps) => (
  <div className="mb-4 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
    <button 
      onClick={onClick}
      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
    >
      <span className="font-medium text-secondary">{question}</span>
      <ChevronDown 
        className={`h-5 w-5 text-accent transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
      />
    </button>
    <div 
      className={`transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-6 py-4 border-t border-gray-100">
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  </div>
);

// Challenge Card Component
const ChallengeCard = ({ problem, issue, solution }: ChallengeCardProps) => (
  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 h-full flex flex-col">
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

// Process Step Component
const ProcessStep = ({ number, title, description }: ProcessStepProps) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <div>
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </div>
);

export default function PVMontagePage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false);

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleFAQ = (index: number) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null)
    } else {
      setExpandedFAQ(index)
    }
  }

  useEffect(() => {
    setImageLoaded(true);
  }, []);

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
                  {pvMontageData.hero.title}
                </H1>
                <div className="text-xl md:text-2xl font-medium text-accent mb-6">
                  {pvMontageData.hero.subtitle}
                </div>
                <Paragraph className="text-lg text-gray-600 mb-8 max-w-xl">
                  {pvMontageData.hero.description}
                </Paragraph>
                <button 
                  onClick={scrollToContact}
                  className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all duration-200 shadow-sm flex items-center gap-2"
                >
                  Solar-Potenzial ermitteln
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </InView>
            <div className={cn(
              "relative h-[460px] rounded-2xl overflow-hidden transition-all duration-1000 shadow-xl",
              imageLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <Image
                src="/images/pv-montage/hero.jpg"
                fill
                className="object-cover"
                alt="Professionelle Photovoltaik-Montage von TREU Service"
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
                <H2 className="mb-4 text-secondary">{pvMontageData.about.title}</H2>
                <Paragraph className="text-gray-600 mb-6">
                  {pvMontageData.about.description}
                </Paragraph>
                
                <div className="space-y-2 mt-5">
                  {pvMontageData.about.checkpoints.map((point, idx) => (
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
                  Beratungstermin vereinbaren
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
                    src="/images/pv-montage/expertise.jpg"
                    fill
                    className="object-cover"
                    alt="Photovoltaik TREU Service Team"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </InView>
            </div>
          </div>
        </Container>
      </Section>

      {/* SERVICE Section - Full height */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">SERVICE</Badge>
              <H2 className="mb-4 text-secondary">{pvMontageData.spezialisierteLoesungen.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {pvMontageData.spezialisierteLoesungen.subtitle}
              </Paragraph>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Aufdach-Montage */}
              <Card className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
                <div className="p-1 bg-accent">
                  <div className="py-3 px-4 flex items-center gap-3">
                    <Sun className="w-5 h-5 text-white" />
                    <h3 className="text-white font-medium">{pvMontageData.spezialisierteLoesungen.services[0].title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-5 text-sm">{pvMontageData.spezialisierteLoesungen.services[0].description.split('"')[0]}</p>
                  <h4 className="font-medium text-secondary mb-3">Leistungen:</h4>
                  <ul className="space-y-3">
                    {pvMontageData.spezialisierteLoesungen.services[0].leistungen.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 text-center">
                    <button 
                      onClick={scrollToContact}
                      className="px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm inline-flex items-center"
                    >
                      Angebot anfordern
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Indach-Montage */}
              <Card className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
                <div className="p-1 bg-accent">
                  <div className="py-3 px-4 flex items-center gap-3">
                    <PanelTop className="w-5 h-5 text-white" />
                    <h3 className="text-white font-medium">{pvMontageData.spezialisierteLoesungen.services[1].title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-5 text-sm">{pvMontageData.spezialisierteLoesungen.services[1].description.split('"')[0]}</p>
                  <h4 className="font-medium text-secondary mb-3">Leistungen:</h4>
                  <ul className="space-y-3">
                    {pvMontageData.spezialisierteLoesungen.services[1].leistungen.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 text-center">
                    <button 
                      onClick={scrollToContact}
                      className="px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm inline-flex items-center"
                    >
                      Angebot anfordern
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Flachdach-Montage */}
              <Card className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
                <div className="p-1 bg-accent">
                  <div className="py-3 px-4 flex items-center gap-3">
                    <Battery className="w-5 h-5 text-white" />
                    <h3 className="text-white font-medium">{pvMontageData.spezialisierteLoesungen.services[2].title}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-5 text-sm">{pvMontageData.spezialisierteLoesungen.services[2].description.split('"')[0]}</p>
                  <h4 className="font-medium text-secondary mb-3">Leistungen:</h4>
                  <ul className="space-y-3">
                    {pvMontageData.spezialisierteLoesungen.services[2].leistungen.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 text-center">
                    <button 
                      onClick={scrollToContact}
                      className="px-6 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm inline-flex items-center"
                    >
                      Angebot anfordern
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </InView>
        </Container>
      </Section>

      {/* ABLAUF Section - Full height */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">ABLAUF</Badge>
              <H2 className="mb-4 text-secondary">{pvMontageData.arbeitsweise.title}</H2>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-accent/20 z-0 hidden md:block"></div>
                <div className="space-y-8">
                  {pvMontageData.arbeitsweise.steps.map((step, index) => (
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
          </InView>
        </Container>
      </Section>

      {/* VORTEILE Section - Full height, white background */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">UNSERE VORTEILE</Badge>
              <H2 className="mb-4 text-secondary">{pvMontageData.advantages.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {pvMontageData.advantages.description}
              </Paragraph>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pvMontageData.advantages.items.map((item, i) => (
                <InView
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-accent h-full">
                    <CardContent className="p-5">
                      <div className="flex flex-col h-full">
                        <div className="mb-3 text-accent">
                          {item.icon === 'Certificate' && <MessageSquare className="h-5 w-5" />}
                          {item.icon === 'BadgeCheck' && <Hammer className="h-5 w-5" />}
                          {item.icon === 'TrendingUp' && <TrendingUp className="h-5 w-5" />}
                          {item.icon === 'Clock' && <Clock className="h-5 w-5" />}
                          {item.icon === 'Shield' && <Shield className="h-5 w-5" />}
                          {item.icon === 'FileCheck' && <FileText className="h-5 w-5" />}
                          {item.icon === 'Zap' && <Zap className="h-5 w-5" />}
                          {item.icon === 'Badge' && <BadgeCheck className="h-5 w-5" />}
                          {item.icon === 'Cog' && <Zap className="h-5 w-5" />}
                          {item.icon === 'FileText' && <FileText className="h-5 w-5" />}
                          {item.icon === 'Leaf' && <Leaf className="h-5 w-5" />}
                          {item.icon === 'HandShake' && <Sun className="h-5 w-5" />}
                        </div>
                        <h3 className="text-base font-semibold mb-2 text-secondary">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </InView>
              ))}
            </div>
          </InView>
        </Container>
      </Section>

      {/* IHRE VORTEILE Section */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">IHRE VORTEILE</Badge>
              <H2 className="mb-4 text-secondary">{pvMontageData.vorteile.title}</H2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
                <div className="p-1 bg-[#16A34A]">
                  <div className="py-3 px-4 flex items-center gap-3">
                    <CircleDollarSign className="w-5 h-5 text-white" />
                    <h3 className="text-white font-medium">Finanzielle Vorteile</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {pvMontageData.vorteile.finanzielle.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#16A34A] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
                <div className="p-1 bg-[#0EA5E9]">
                  <div className="py-3 px-4 flex items-center gap-3">
                    <Leaf className="w-5 h-5 text-white" />
                    <h3 className="text-white font-medium">Ökologische Vorteile</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {pvMontageData.vorteile.nachhaltige.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#0EA5E9] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
                <div className="p-1 bg-[#F59E0B]">
                  <div className="py-3 px-4 flex items-center gap-3">
                    <Sun className="w-5 h-5 text-white" />
                    <h3 className="text-white font-medium">Praktische Vorteile</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {pvMontageData.vorteile.praktische.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#F59E0B] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </InView>
        </Container>
      </Section>
      
      {/* RATGEBER Section */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">RATGEBER</Badge>
              <H2 className="mb-4 text-secondary">Solarenergie optimal nutzen</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                Wissenswerte Informationen und praktische Tipps für Ihre Solaranlage
              </Paragraph>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative w-32 h-32 bg-[#F8FAFC] rounded-full flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-accent" />
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-semibold mb-4 text-secondary">Mehr Leistung aus Ihrer Photovoltaikanlage</h3>
                  <Paragraph className="mb-6">
                    Erfahren Sie, wie Sie den Ertrag Ihrer Solaranlage optimieren und Ihre Energieunabhängigkeit maximieren können. In unserem ausführlichen Ratgeber teilen wir Expertenstrategien für höhere Erträge und längere Lebensdauer.
                  </Paragraph>
                  
                  <Link href="/blog/photovoltaik-optimierung" className="inline-flex items-center group">
                    <span className="mr-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E6F4FA] group-hover:bg-[#C5E8F7] transition-colors">
                      <Sun className="w-5 h-5 text-accent" />
                    </span>
                    <span className="text-accent font-medium group-hover:underline">
                      Zum Ratgeber: Photovoltaik optimal nutzen
                    </span>
                    <ArrowRight className="ml-2 w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              
              {/* Preview der Themen */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#FEF2F2] rounded-lg p-4 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Sun className="w-4 h-4 text-red-500" />
                      </div>
                      <h3 className="text-base font-medium">Ausrichtung optimieren</h3>
                    </div>
                    <p className="text-xs text-gray-600 flex-grow">
                      Die richtige Ausrichtung und Neigung Ihrer Solarmodule kann den Jahresertrag um bis zu 25% steigern. Lernen Sie, wie Sie die optimale Position für Ihre Anlage finden.
                    </p>
                  </div>
                  
                  <div className="bg-[#EFF6FF] rounded-lg p-4 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Battery className="w-4 h-4 text-blue-500" />
                      </div>
                      <h3 className="text-base font-medium">Speicherlösungen</h3>
                    </div>
                    <p className="text-xs text-gray-600 flex-grow">
                      Mit modernen Batteriespeichern können Sie Ihren Eigenverbrauch von 30% auf bis zu 80% steigern. Wir zeigen die besten Strategien für maximale Wirtschaftlichkeit.
                    </p>
                  </div>
                  
                  <div className="bg-[#ECFDF5] rounded-lg p-4 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <Leaf className="w-4 h-4 text-green-600" />
                      </div>
                      <h3 className="text-base font-medium">Wartung & Pflege</h3>
                    </div>
                    <p className="text-xs text-gray-600 flex-grow">
                      Richtige Wartung und Reinigung kann die Leistung Ihrer Anlage um 5-10% erhöhen. Erfahren Sie, wie Sie Ihre Anlage mit minimalem Aufwand optimal pflegen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </InView>
        </Container>
      </Section>

      {/* HERAUSFORDERUNGEN Section - Full height */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">HERAUSFORDERUNGEN</Badge>
              <H2 className="mb-4 text-secondary">{pvMontageData.haeufigeProbleme.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {pvMontageData.haeufigeProbleme.subtitle}
              </Paragraph>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {pvMontageData.haeufigeProbleme.items.map((item, i) => (
                <ChallengeCard
                  key={i}
                  problem={item.problem}
                  issue={item.issue}
                  solution={item.solution}
                />
              ))}
            </div>
          </InView>
        </Container>
      </Section>

      {/* FAQ Section - Full height */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container size="small">
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">FAQ</Badge>
              <H2 className="mb-4 text-secondary">{pvMontageData.faq.title}</H2>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {pvMontageData.faq.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={expandedFAQ === index}
                  onClick={() => toggleFAQ(index)}
                />
              ))}
            </div>
          </InView>
        </Container>
      </Section>

      {/* Kontakt Section - Full height */}
      <Section id="kontakt" className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">KONTAKT</Badge>
              <H2 className="mb-4 text-secondary">{pvMontageData.kontakt.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {pvMontageData.kontakt.subtitle}
              </Paragraph>
            </div>
            
            <PVMontageWizard />
          </InView>
        </Container>
      </Section>

      {/* Call-to-Action */}
      <Section className="bg-accent text-white py-10">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{pvMontageData.kontakt.description}</h2>
            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              {pvMontageData.kontakt.cta}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-accent hover:bg-gray-100 rounded-lg font-medium transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {pvMontageData.kontakt.ctaButton}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a 
                href="tel:+491234567890"
                className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                <PhoneCall className="mr-2 h-5 w-5" />
                {pvMontageData.kontakt.ctaCall}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
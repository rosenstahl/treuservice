"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"
import entkernungData from "@/i18n/de/entkernung.json"
import EntkernungWizard from '@/components/contact/entkernung/EntkernungWizard';
import {
  Clock,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Hammer,
  FileCheck,
  Recycle,
  AlertTriangle,
  ArrowRight,
  Shield,
  BadgeCheck,
  HardHat,
  ChevronRight,
  Construction,
  Wrench,
  PanelRight,
  PanelBottom,
  Plug,
  Phone,
  Target,
} from "lucide-react"

// Challenge Card Component für den "Häufige Herausforderungen" Abschnitt
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

// Process Step Component für den Ablauf-Bereich
const ProcessStep = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#009FD8] text-white flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <div>
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
  </div>
);

// Service Card Component
const ServiceCard = ({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) => (
  <Card className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full">
    <div className="p-1 bg-[#009FD8]">
      <div className="py-3 px-4 flex items-center gap-3">
        <div className="text-white">
          {icon}
        </div>
        <h3 className="text-white font-medium">{title}</h3>
      </div>
    </div>
    <CardContent className="p-6">
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start">
            <ArrowRight className="w-4 h-4 text-[#009FD8] mr-2 mt-1 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{item}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default function EntkernungPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(true);
  }, []);

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get service icon by name
  const getServiceIcon = (iconName: string) => {
    switch(iconName) {
      case 'HardHat': return <HardHat className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'PanelRight': return <PanelRight className="w-6 h-6 text-[#009FD8]" />;
      case 'PanelBottom': return <PanelBottom className="w-6 h-6 text-[#009FD8]" />;
      case 'Plug': return <Plug className="w-6 h-6 text-[#009FD8]" />;
      default: return <Hammer className="w-5 h-5" />;
    }
  };

  // Get theme icon by name
  const getThemeIcon = (iconName: string, color: string) => {
    switch(iconName) {
      case 'Construction': return <Construction className={`w-4 h-4 text-${color}-500`} />;
      case 'Hammer': return <Hammer className={`w-4 h-4 text-${color}-500`} />;
      case 'Recycle': return <Recycle className={`w-4 h-4 text-${color}-600`} />;
      default: return <CheckCircle className={`w-4 h-4 text-${color}-500`} />;
    }
  };

  // Function to get advantage icon
  const getAdvantageIcon = (iconName: string) => {
    switch(iconName) {
      case 'Target': return <Target className="w-4 h-4 text-[#009FD8]" />;      
      case 'Shield': return <Shield className="w-4 h-4 text-[#009FD8]" />;
      case 'Clock': return <Clock className="w-4 h-4 text-[#009FD8]" />;
      case 'Recycle': return <Recycle className="w-4 h-4 text-[#009FD8]" />;
      case 'FileCheck': return <FileCheck className="w-4 h-4 text-[#009FD8]" />;
      case 'BadgeCheck': return <BadgeCheck className="w-4 h-4 text-[#009FD8]" />;
      default: return <CheckCircle className="w-4 h-4 text-[#009FD8]" />;
    }
  };

  return (
    <div className="flex-1">
      {/* 1. HERO Section */}
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
                  {entkernungData.hero.title}
                </H1>
                <div className="text-xl md:text-2xl font-medium text-[#009FD8] mb-6">
                  {entkernungData.hero.subtitle}
                </div>
                <Paragraph className="text-lg text-gray-600 mb-8 max-w-xl">
                  {entkernungData.hero.description}
                </Paragraph>
                <button 
                  onClick={scrollToContact}
                  className="px-6 py-3 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-lg font-medium transition-all duration-200 shadow-sm flex items-center gap-2"
                >
                  Angebot anfordern
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </InView>
            <div className={cn(
              "relative h-[460px] rounded-2xl overflow-hidden transition-all duration-1000 shadow-xl",
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
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/5" />

      {/* 2. ÜBER UNS Section */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <InView
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">ÜBER UNS</Badge>
                <H2 className="mb-4">{entkernungData.intro.title}</H2>
                <Paragraph className="text-gray-600 mb-6 text-lg">
                  {entkernungData.intro.description}
                </Paragraph>
                
                <div className="space-y-3 mt-5">
                  {entkernungData.qualitaetsversprechen.items.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#009FD8] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{item}</p>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={scrollToContact}
                  className="mt-6 px-6 py-3 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-lg font-medium transition-all duration-200 shadow-sm inline-flex items-center gap-2"
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
                    src="/images/entkernung/basis.jpg"
                    fill
                    className="object-cover"
                    alt="TREU Service Entkernungsexperten"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </InView>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. SERVICE Section - Visuell verbessert mit Icons */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">SERVICE</Badge>
            <H2 className="mb-4">{entkernungData.leistungen.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entkernungData.leistungen.description}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {entkernungData.leistungen.services.map((service, i) => (
              <ServiceCard 
                key={i}
                title={service.category} 
                icon={getServiceIcon(service.icon)}
                items={service.items}
              />
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {entkernungData.leistungen.highlightCards.map((card, i) => (
              <Card key={i} className="shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-5">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-[#009FD8]/10 flex items-center justify-center mb-4">
                      {getServiceIcon(card.icon)}
                    </div>
                    <h3 className="text-lg font-medium mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600">{card.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
      
      {/* 4. ABLAUF Section */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">ABLAUF</Badge>
            <H2 className="mb-4">{entkernungData.ablauf.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entkernungData.ablauf.description}
            </Paragraph>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-[#009FD8]/20 z-0 hidden md:block"></div>
              <div className="space-y-8">
                {entkernungData.ablauf.steps.map((step, index) => (
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
                className="px-6 py-3 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-lg font-medium transition-all duration-200 shadow-sm inline-flex items-center gap-2"
              >
                Jetzt anfragen
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. RATGEBER Section */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">RATGEBER</Badge>
            <H2 className="mb-4">{entkernungData.ratgeber.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entkernungData.ratgeber.subtitle}
            </Paragraph>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-32 h-32 bg-[#F8FAFC] rounded-full flex items-center justify-center">
                <HardHat className="w-16 h-16 text-[#FFC107]" />
                </div>
                </div>
              
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-semibold mb-4 text-[#222425]">Professioneller Entkernungsprozess</h3>
                <Paragraph className="mb-6">
                  {entkernungData.ratgeber.content}
                </Paragraph>
                
                <Link href={entkernungData.ratgeber.linkUrl} className="inline-flex items-center group">
                  <span className="mr-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E6F4FA] group-hover:bg-[#C5E8F7] transition-colors">
                    <AlertTriangle className="w-5 h-5 text-[#009FD8]" />
                  </span>
                  <span className="text-[#009FD8] font-medium group-hover:underline">
                    {entkernungData.ratgeber.linkText}
                  </span>
                  <ChevronRight className="ml-2 w-4 h-4 text-[#009FD8] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Preview der Themen */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {entkernungData.ratgeber.themesPreview.map((theme, i) => (
                  <div key={i} className={`bg-${theme.color === 'red' ? '[#FEF2F2]' : theme.color === 'blue' ? '[#EFF6FF]' : '[#ECFDF5]'} rounded-lg p-4 h-full flex flex-col`}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        {getThemeIcon(theme.icon, theme.color)}
                      </div>
                      <h3 className="text-base font-medium">{theme.title}</h3>
                    </div>
                    <p className="text-xs text-gray-600 flex-grow">
                      {theme.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. VORTEILE Section */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">UNSERE VORTEILE</Badge>
            <H2 className="mb-4">{entkernungData.vorteile.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entkernungData.vorteile.description}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {entkernungData.vorteile.items.map((item, i) => (
              <InView
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-[#009FD8] h-full">
                  <CardContent className="p-5">
                    <div className="flex flex-col h-full">
                      <div className="mb-3 text-[#009FD8]">
                        {getAdvantageIcon(item.icon)}
                      </div>
                      <h3 className="text-base font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* 7. HERAUSFORDERUNGEN Section */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">HERAUSFORDERUNGEN</Badge>
            <H2 className="mb-4">{entkernungData.haeufigeProbleme.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entkernungData.haeufigeProbleme.subtitle}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {entkernungData.haeufigeProbleme.items.map((item, i) => (
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

      {/* 8. FAQ Section */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container size="small">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">FAQ</Badge>
            <H2 className="mb-4">{entkernungData.faq.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entkernungData.faq.description || "Antworten auf die wichtigsten Fragen zur Entkernung"}
            </Paragraph>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {entkernungData.faq.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="mb-4 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="font-medium text-left">{faq.question}</span>
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

      {/* 9. Kontaktformular */}
      <Section id="kontakt" className="bg-white min-h-screen flex items-center py-0">
        <Container size="small">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">KONTAKT</Badge>
            <H2 className="mb-4">{entkernungData.kontakt.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entkernungData.kontakt.subtitle}
            </Paragraph>
          </div>
          <EntkernungWizard />
        </Container>
      </Section>

      {/* 10. Call-to-Action */}
      <Section className="bg-[#009FD8] text-white py-10">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{entkernungData.kontakt.cta.title}</h2>
            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              {entkernungData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-[#009FD8] hover:bg-gray-100 rounded-lg font-medium transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {entkernungData.kontakt.cta.button}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a 
                href="tel:+491234567890"
                className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                {entkernungData.kontakt.cta.call}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
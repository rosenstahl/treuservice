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
import EntruempelungWizard from "@/components/contact/entruempelung/EntruempelungWizard"
import entruempelungData from "@/i18n/de/entruempelung.json"
import {
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  Truck,
  Shield,
  Heart,
  Phone,
  FileText,
  Leaf,
  CreditCard,
  Zap,
  ChevronRight,
  AlertTriangle,
  Banknote
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Challenge Card Component für den "Herausforderungen" Abschnitt
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
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <div>
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
  </div>
);

export default function EntruempelungPage() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(true);
  }, []);

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to get advantage icon
  const getAdvantageIcon = (iconName: string) => {
    switch(iconName) {
      case 'Shield': return <Shield className="w-5 h-5 text-accent" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-accent" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-accent" />;
      case 'Zap': return <Zap className="w-5 h-5 text-accent" />;
      case 'FileText': return <FileText className="w-5 h-5 text-accent" />;
      case 'Heart': return <Heart className="w-5 h-5 text-accent" />;
      default: return <CheckCircle className="w-5 h-5 text-accent" />;
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
                  {entruempelungData.hero.title}
                </H1>
                <div className="text-xl md:text-2xl font-medium text-[#B91C1C] mb-6">
                  {entruempelungData.hero.subtitle}
                </div>
                <Paragraph className="text-lg text-gray-600 mb-8 max-w-xl">
                  {entruempelungData.hero.description}
                </Paragraph>
                <button 
                  onClick={scrollToContact}
                  className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all duration-200 shadow-sm flex items-center gap-2"
                >
                  {entruempelungData.hero.cta}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </InView>
            <div className={cn(
              "relative h-[460px] rounded-2xl overflow-hidden transition-all duration-1000 shadow-xl",
              imageLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <Image
                src="/images/entruempelung/hero.jpg"
                fill
                className="object-cover"
                alt="Professionelle Entrümpelung"
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
                <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">ÜBER UNS</Badge>
                <H2 className="mb-4 text-secondary">{entruempelungData.about.title}</H2>
                <Paragraph className="text-gray-600 mb-6">
                  {entruempelungData.about.description}
                </Paragraph>
                
                <div className="space-y-3 mt-5">
                  {entruempelungData.about.checkpoints.map((point, idx) => (
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
                    src="/images/entruempelung/about.jpg"
                    fill
                    className="object-cover"
                    alt="TREU Service Entrümpelungs-Team"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </InView>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. SERVICE Section */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">SERVICE</Badge>
            <H2 className="mb-4 text-secondary">{entruempelungData.leistungen.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entruempelungData.leistungen.description}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {entruempelungData.leistungen.services.map((service, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
                <div className="p-1 bg-accent">
                  <div className="py-3 px-4 flex items-center gap-3">
                    {index === 0 ? <Trash2 className="w-5 h-5 text-white" /> : <Truck className="w-5 h-5 text-white" />}
                    <h3 className="text-white font-medium">{service.category}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-5 text-sm">{service.description}</p>
                  <ul className="space-y-3">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
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
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">ABLAUF</Badge>
            <H2 className="mb-4 text-secondary">{entruempelungData.arbeitsweise.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entruempelungData.arbeitsweise.description}
            </Paragraph>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 h-full w-0.5 bg-accent/20 z-0 hidden md:block"></div>
              <div className="space-y-8">
                {entruempelungData.arbeitsweise.steps.map((step, index) => (
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

      {/* 5. RATGEBER Section (NEU) */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">RATGEBER</Badge>
            <H2 className="mb-4 text-secondary">Entrümpelungs-Guide: Wertvolle Tipps & Entscheidungshilfen</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              Unser umfassender Entrümpelungs-Guide bietet Ihnen praktische Informationen und Checklisten für ein erfolgreiches Entrümpelungsprojekt.
            </Paragraph>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-32 h-32 bg-[#FEF2F2] rounded-full flex items-center justify-center">
                  <Trash2 className="w-16 h-16 text-[#B91C1C]" />
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-semibold mb-4 text-[#222425]">Entrümpelungs-Guide: Prozess, Materialien & emotionale Aspekte</h3>
                <Paragraph className="mb-6">
                  Entrümpelung ist mehr als nur das Wegwerfen unerwünschter Gegenstände. Unser umfassender Guide behandelt den gesamten Prozess, von der Planung bis zur Durchführung, und gibt Ihnen wertvolle Tipps zum Umgang mit emotionalen Herausforderungen beim Loslassen.
                </Paragraph>
                
                <Link href="/blog/EntruempelungsGuide?tab=checkliste" className="inline-flex items-center group">
                  <span className="mr-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FEF2F2] group-hover:bg-[#FEE2E2] transition-colors">
                    <AlertTriangle className="w-5 h-5 text-[#B91C1C]" />
                  </span>
                  <span className="text-[#B91C1C] font-medium group-hover:underline">
                    Entrümpelungs-Checkliste und praktische Tipps
                  </span>
                  <ChevronRight className="ml-2 w-4 h-4 text-[#B91C1C] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Preview der Themen */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FEF2F2] rounded-lg p-4 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </div>
                    <h3 className="text-base font-medium">Prozess & Zeitplanung</h3>
                  </div>
                  <p className="text-xs text-gray-600 flex-grow">
                    Detaillierte Schrittabfolge einer professionellen Entrümpelung und zeitliche Einordnung verschiedener Projekte.
                  </p>
                </div>
                
                <div className="bg-[#F0F9FF] rounded-lg p-4 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Truck className="w-4 h-4 text-blue-500" />
                    </div>
                    <h3 className="text-base font-medium">Materialien & Entsorgung</h3>
                  </div>
                  <p className="text-xs text-gray-600 flex-grow">
                    Umfassende Übersicht aller Materialgruppen und deren fachgerechte, umweltbewusste Entsorgung.
                  </p>
                </div>
                
                <div className="bg-[#FDF7F7] rounded-lg p-4 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Heart className="w-4 h-4 text-pink-500" />
                    </div>
                    <h3 className="text-base font-medium">Psychologie des Loslassens</h3>
                  </div>
                  <p className="text-xs text-gray-600 flex-grow">
                    Strategien zum emotionalen Umgang mit Entrümpelung und praktische Tipps für sensible Situationen wie Nachlassauflösungen.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons für den Guide */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blog/EntruempelungsGuide" className="w-full sm:w-auto">
                <Button className="w-full bg-accent hover:bg-accent-hover flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Kompletten Guide lesen
                </Button>
              </Link>
              <Link href="/blog/EntruemplungsKostenRechner" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent/5 flex items-center gap-2">
                  <Banknote className="w-4 h-4" />
                  Kostenrechner nutzen
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. UNSERE VORTEILE Section */}
      <Section className="bg-gray-50 min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">UNSERE VORTEILE</Badge>
            <H2 className="mb-4 text-secondary">{entruempelungData.advantages.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entruempelungData.advantages.description}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {entruempelungData.advantages.items.map((item, i) => (
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
                        {getAdvantageIcon(item.icon)}
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

      {/* 7. HERAUSFORDERUNGEN Section */}
      <Section className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">HERAUSFORDERUNGEN</Badge>
            <H2 className="mb-4 text-secondary">{entruempelungData.challenges.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entruempelungData.challenges.subtitle}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {entruempelungData.challenges.items.map((item, i) => (
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
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">FAQ</Badge>
            <H2 className="mb-4 text-secondary">{entruempelungData.faq.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entruempelungData.faq.description}
            </Paragraph>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {entruempelungData.faq.questions.map((faq, index) => (
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

      {/* 9. Kontaktformular */}
      <Section id="kontakt" className="bg-white min-h-screen flex items-center py-0">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent-hover">KONTAKT</Badge>
            <H2 className="mb-4 text-secondary">{entruempelungData.kontakt.formTitle}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entruempelungData.kontakt.formSubtitle}
            </Paragraph>
          </div>
          
          <EntruempelungWizard />
        </Container>
      </Section>

      {/* 10. Call-to-Action */}
      <Section className="bg-accent text-white py-10">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{entruempelungData.kontakt.cta.title}</h2>
            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              {entruempelungData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-accent hover:bg-gray-100 rounded-lg font-medium transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {entruempelungData.kontakt.cta.button}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a 
                href="tel:+491234567890"
                className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                {entruempelungData.kontakt.cta.call}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
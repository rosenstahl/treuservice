"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"
import EntkernungWizard from '@/components/contact/entkernung/EntkernungWizard';
import entkernungData from "@/i18n/de/entkernung.json"
import {
  Clock,
  CheckCircle,
  CheckCircle2,
  XCircle,
  Hammer,
  FileCheck,
  Recycle,
  Shield,
  BadgeCheck,
  HardHat,
  Construction,
  Wrench,
  PanelRight,
  PanelBottom,
  Plug,
  Phone,
  Target,
  Banknote,
  FileText,
  ArrowRight
} from "lucide-react"

export default function EntkernungPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Sanfte Überblendung der Seite für ein Apple-typisches Erlebnis
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Get service icon by name - konsistente Größe für alle Icons
  const getServiceIcon = (iconName: string) => {
    switch(iconName) {
      case 'HardHat': return <HardHat className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'PanelRight': return <PanelRight className="w-5 h-5 text-[#009FD8]" />;
      case 'PanelBottom': return <PanelBottom className="w-5 h-5 text-[#009FD8]" />;
      case 'Plug': return <Plug className="w-5 h-5 text-[#009FD8]" />;
      default: return <Hammer className="w-5 h-5" />;
    }
  };

  // Get theme icon by name - konsistente Größe
  const getThemeIcon = (iconName: string) => {
    switch(iconName) {
      case 'Construction': return <Construction className="w-4 h-4 text-[#009FD8]" />;
      case 'Hammer': return <Hammer className="w-4 h-4 text-[#009FD8]" />;
      case 'Recycle': return <Recycle className="w-4 h-4 text-[#009FD8]" />;
      default: return <CheckCircle className="w-4 h-4 text-[#009FD8]" />;
    }
  };

  // Function to get advantage icon - konsistente Größe
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
    <div className={`flex-1 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* 1. HERO Section - Apple-style fullscreen hero - Mobile-optimiert */}
      <Section 
        id="hero-section"
        className="min-h-[100svh] flex items-center justify-center relative overflow-hidden p-0"
      >
        {/* Fullscreen Hintergrundbild */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: "url('/images/entkernung/hero.jpg')"}} 
        />
        
        {/* Gradient-Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        <Container className="relative z-10">
          <div className="max-w-xl mx-auto">
            {/* Perfekt ausgerichteter, minimalistischer Hero-Content */}
            <div className="text-center flex flex-col items-center justify-center min-h-[70vh] px-5 md:px-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4 text-white">
                {entkernungData.hero.title}
              </h1>
              
              <div className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 mb-8 md:mb-12">
                {entkernungData.hero.subtitle}
              </div>
              
              <p className="text-base md:text-lg text-white/80 mb-8 md:mb-12 max-w-md">
                {entkernungData.hero.description}
              </p>
              
              {/* Call-to-Action Buttons - perfekt ausgerichtet */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md">
                <button 
                  onClick={scrollToContact}
                  className="flex-1 text-center bg-[#009FD8] text-white px-6 py-3 rounded-full hover:bg-[#007CAB] transition-colors text-sm font-medium"
                >
                  Angebot anfordern
                </button>
                <a 
                  href="tel:+4923115044352"
                  className="flex-1 text-center bg-white/10 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-full hover:bg-white/20 transition-colors text-sm font-medium"
                >
                  <Phone className="inline-block mr-2 h-4 w-4" />
                  0231 15044352
                </a>
              </div>
            </div>
          </div>
        </Container>
        
        {/* Subtiler Scroll-Indikator im Apple-Stil - Mobile-optimiert */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60 animate-pulse">
          <p className="text-xs mb-1.5">Mehr entdecken</p>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </Section>
      
      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 2. ÜBER UNS Section - Mobile-optimiert */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center px-5 md:px-0">
            <div>
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wider">ÜBER UNS</span>
              <H2 className="mt-2 mb-4 md:mb-6">{entkernungData.intro.title}</H2>
              <Paragraph className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                {entkernungData.intro.description}
              </Paragraph>
              
              <div className="space-y-2 md:space-y-3 mt-6 md:mt-8">
                {entkernungData.qualitaetsversprechen.items.slice(0, 4).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#009FD8] flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden">
              <Image
                src="/images/entkernung/basis.jpg"
                fill
                className="object-cover"
                alt="TREU Service Entkernungsexperten"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 3. SERVICE Section - Mobile-optimiert */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wider">SERVICE</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4 md:mb-6">
              {entkernungData.leistungen.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entkernungData.leistungen.description}
            </p>
          </div>
          
          {/* Hauptleistungen im Apple-Stil */}
          <div className="mb-16 md:mb-20 max-w-4xl mx-auto px-5 md:px-0">
            {entkernungData.leistungen.services.map((service, i) => (
              <div key={i} className={`py-6 md:py-8 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <div className="flex items-center md:justify-start">
                      <div className="w-8 h-8 rounded-full bg-[#F8FAFC] flex items-center justify-center mr-3">
                        {getServiceIcon(service.icon)}
                      </div>
                      <h3 className="text-base md:text-lg font-medium">{service.category}</h3>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-[#009FD8] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 4. ABLAUF Section - Mobile-optimiert */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="text-center mb-8 md:mb-12 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wider">ABLAUF</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4 md:mb-6">
              {entkernungData.ablauf.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entkernungData.ablauf.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {entkernungData.ablauf.steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#009FD8]/20 text-[#009FD8] flex items-center justify-center font-medium text-sm mb-3 md:mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-medium mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 md:mt-10 pt-6 border-t border-gray-100">
              <button 
                onClick={scrollToContact}
                className="px-5 py-2.5 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-full text-sm font-medium transition-all duration-200 inline-flex items-center gap-1.5"
              >
                Jetzt anfragen
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 5. RATGEBER Section - Mobile-optimiert */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wider">RATGEBER</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4 md:mb-6">
              {entkernungData.ratgeber.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entkernungData.ratgeber.subtitle}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto px-5 md:px-0">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-10 md:mb-14">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-full max-w-[200px] md:max-w-none aspect-square rounded-lg overflow-hidden shadow-sm">
                  <Image 
                    src="/images/blog/entkernung.jpg"
                    alt="Professionelle Entkernung Guide"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 33vw"
                    priority
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-medium mb-3 text-[#222425]">
                  Entkernungs-Guide: Professioneller Prozess & Entscheidungshilfen
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {entkernungData.ratgeber.content}
                </p>
                
                <Link href="/blog/EntkernungsGuide?tab=finanzierung" className="inline-flex items-center group">
                  <span className="text-[#009FD8] text-xs md:text-sm font-medium group-hover:underline">
                    {entkernungData.ratgeber.linkText}
                  </span>
                  <ArrowRight className="ml-1.5 w-3.5 h-3.5 text-[#009FD8] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Themen im minimalistischen Stil */}
            <div className="border-t border-gray-100 pt-8 md:pt-10">
              <h4 className="text-sm md:text-base font-medium mb-5 md:mb-8 text-center">Themenübersicht</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {entkernungData.ratgeber.themesPreview.map((theme, i) => (
                  <div key={i} className="flex items-start bg-gray-50 p-4 rounded-xl">
                    <div className="text-[#009FD8] flex-shrink-0 mr-3">
                      {getThemeIcon(theme.icon)}
                    </div>
                    <div>
                      <h5 className="text-xs md:text-sm font-medium mb-1.5">{theme.title}</h5>
                      <p className="text-xs text-gray-600">{theme.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Minimalistische Buttons ohne Schatten */}
            <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/blog/EntkernungsGuide" className="w-full sm:w-auto">
                <button className="w-full px-4 py-2.5 md:px-5 md:py-2.5 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Kompletten Guide lesen
                </button>
              </Link>
              <Link href="/blog/EntkernungsGuide?tab=finanzierung" className="w-full sm:w-auto">
                <button className="w-full px-4 py-2.5 md:px-5 md:py-2.5 border border-[#009FD8] text-[#009FD8] hover:bg-[#009FD8]/5 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5">
                  <Banknote className="w-3.5 h-3.5" />
                  Finanzierungsoptionen
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 6. VORTEILE Section - Mobile-optimiert */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wider">UNSERE VORTEILE</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4 md:mb-6">
              {entkernungData.vorteile.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entkernungData.vorteile.description}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 gap-5 md:gap-6">
              {entkernungData.vorteile.items.map((item, i) => (
                <div key={i} className={`${i > 0 ? 'pt-5 md:pt-6 border-t border-gray-100' : ''}`}>
                  <div className="flex items-start">
                    <div className="text-[#009FD8] flex-shrink-0 mr-3 mt-0.5">
                      {getAdvantageIcon(item.icon)}
                    </div>
                    <div>
                      <h3 className="text-base font-medium mb-1.5">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 7. HERAUSFORDERUNGEN Section - Mobile-optimiert */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wider">HERAUSFORDERUNGEN</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4 md:mb-6">
              {entkernungData.haeufigeProbleme.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entkernungData.haeufigeProbleme.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {entkernungData.haeufigeProbleme.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`problem-${i}`}
                  className="border-0 py-1"
                >
                  <AccordionTrigger className="py-3 hover:no-underline text-left">
                    <div className="flex items-center text-left">
                      <div className="p-0.5 rounded-full text-red-500 mr-2.5">
                        <XCircle className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-sm">{item.problem}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-0 pl-8 md:pl-10">
                    <div className="pt-1.5">
                      <div className="text-red-600 mb-4 text-xs">
                        {item.issue}
                      </div>
                      <div className="flex">
                        <div className="p-0.5 rounded-full text-green-500 mr-2.5 flex-shrink-0 h-fit">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div className="text-green-700 text-xs">
                          <span className="font-medium inline-block mb-1">Unsere Lösung:</span><br />
                          {item.solution}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 8. FAQ Section - Mobile-optimiert */}
      <Section className="py-16 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4 md:mb-6">
              {entkernungData.faq.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entkernungData.faq.description || "Antworten auf die wichtigsten Fragen zur Entkernung"}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {entkernungData.faq.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-0 py-1"
                >
                  <AccordionTrigger className="py-3 hover:no-underline text-left">
                    <span className="font-medium text-sm">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-xs text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 9. Kontaktformular - Mobile-optimiert */}
      <Section id="kontakt" className="py-16 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wider">KONTAKT</span>
            <h2 className="text-3xl md:text-4xl font-semibold mt-2 mb-4 md:mb-6">
              {entkernungData.kontakt.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entkernungData.kontakt.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <EntkernungWizard />
          </div>
        </Container>
      </Section>

      {/* 10. Call-to-Action - Mobile-optimiert */}
      <Section className="py-12 md:py-16 bg-gradient-to-r from-[#009FD8] to-[#007CAB] text-white">
        <Container>
          <div className="text-center max-w-xl mx-auto px-5 md:px-0">
            <h2 className="text-xl md:text-2xl font-medium mb-2 md:mb-3">{entkernungData.kontakt.cta.title}</h2>
            <p className="mb-6 md:mb-8 text-white/90 text-sm max-w-sm mx-auto">
              {entkernungData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-5 py-2.5 bg-white text-[#009FD8] hover:bg-gray-100 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                {entkernungData.kontakt.cta.button}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <a 
                href="tel:+4923115044352"
                className="px-5 py-2.5 border border-white/30 hover:bg-white/10 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Phone className="h-3.5 w-3.5" />
                {entkernungData.kontakt.cta.call}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
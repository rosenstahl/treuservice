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
  Banknote
} from "lucide-react"

export default function EntruempelungPage() {
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

  // Function to get advantage icon - konsistente Größe
  const getAdvantageIcon = (iconName: string) => {
    switch(iconName) {
      case 'Shield': return <Shield className="w-4 h-4 text-[#009FD8]" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4 text-[#009FD8]" />;
      case 'Leaf': return <Leaf className="w-4 h-4 text-[#009FD8]" />;
      case 'Zap': return <Zap className="w-4 h-4 text-[#009FD8]" />;
      case 'FileText': return <FileText className="w-4 h-4 text-[#009FD8]" />;
      case 'Heart': return <Heart className="w-4 h-4 text-[#009FD8]" />;
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
          style={{backgroundImage: "url('/images/entruempelung/hero.jpg')"}} 
        />
        
        {/* Gradient-Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        <Container className="relative z-10">
          <div className="max-w-xl mx-auto">
            {/* Perfekt ausgerichteter, minimalistischer Hero-Content */}
            <div className="text-center flex flex-col items-center justify-center min-h-[100svh] px-5 md:px-0">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-3 md:mb-4 text-white">
                {entruempelungData.hero.title}
              </h1>
              
              <div className="text-xl md:text-3xl font-light text-white/90 mb-8 md:mb-12">
                {entruempelungData.hero.subtitle}
              </div>
              
              <p className="text-base md:text-lg text-white/80 mb-8 md:mb-12 max-w-md">
                {entruempelungData.hero.description}
              </p>
              
              {/* Call-to-Action Buttons - perfekt ausgerichtet */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full max-w-md">
                <button 
                  onClick={scrollToContact}
                  className="flex-1 text-center bg-[#009FD8] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-[#007CAB] active:bg-[#006694] transition-colors text-sm font-medium"
                >
                  {entruempelungData.hero.cta}
                </button>
                <a 
                  href="tel:+4923115044352"
                  className="flex-1 text-center bg-white/10 backdrop-blur-sm border border-white/30 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors text-sm font-medium"
                >
                  <Phone className="inline-block mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                  0231 15044352
                </a>
              </div>
            </div>
          </div>
        </Container>
        
        {/* Subtiler Scroll-Indikator im Apple-Stil */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60 animate-pulse">
          <p className="text-xs mb-1.5">Mehr entdecken</p>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </Section>
      
      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 2. ÜBER UNS Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center px-5 md:px-0">
            <div>
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide md:tracking-wider">ÜBER UNS</span>
              <H2 className="mt-2 mb-4 md:mb-6 text-2xl md:text-4xl">{entruempelungData.about.title}</H2>
              <Paragraph className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                {entruempelungData.about.description}
              </Paragraph>
              
              <div className="space-y-2 md:space-y-3 mt-6 md:mt-8">
                {entruempelungData.about.checkpoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8] flex-shrink-0 mt-0.5 md:mt-1" />
                    <p className="text-gray-700 text-xs md:text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[250px] md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden">
              <Image
                src="/images/entruempelung/about.jpg"
                fill
                className="object-cover"
                alt="TREU Service Entrümpelungs-Team"
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
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">SERVICE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {entruempelungData.leistungen.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entruempelungData.leistungen.description}
            </p>
          </div>
          
          {/* Hauptleistungen im Apple-Stil */}
          <div className="mb-12 md:mb-20 max-w-4xl mx-auto px-5 md:px-0">
            {entruempelungData.leistungen.services.map((service, i) => (
              <div key={i} className={`py-6 md:py-8 ${i > 0 ? 'border-t border-gray-100' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="md:w-1/3 mb-3 md:mb-0">
                    <div className="flex items-center md:justify-start">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#E6F4FA] flex items-center justify-center mr-2 md:mr-3">
                        {i === 0 ? <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-[#009FD8]" /> : <Truck className="w-4 h-4 md:w-5 md:h-5 text-[#009FD8]" />}
                      </div>
                      <h3 className="text-base md:text-lg font-medium">{service.category}</h3>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm">{service.description}</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8] mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-xs md:text-sm">{item}</span>
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
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-8 md:mb-12 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">ABLAUF</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {entruempelungData.arbeitsweise.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entruempelungData.arbeitsweise.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {entruempelungData.arbeitsweise.steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-[#009FD8]/20 text-[#009FD8] flex items-center justify-center font-medium text-sm mb-3 md:mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-sm md:text-base font-medium mb-1.5 md:mb-2">{step.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 md:mt-10 pt-5 md:pt-6 border-t border-gray-100">
              <button 
                onClick={scrollToContact}
                className="px-4 py-2.5 md:px-5 md:py-2.5 bg-[#009FD8] hover:bg-[#007CAB] active:bg-[#006694] text-white rounded-full text-xs md:text-sm font-medium transition-all duration-200 inline-flex items-center gap-1.5"
              >
                Jetzt anfragen
                <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 5. RATGEBER Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">RATGEBER</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 tracking-tight">
              Entrümpelungs-Guide: Wertvolle Tipps & Entscheidungshilfen
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              Unser umfassender Entrümpelungs-Guide bietet Ihnen praktische Informationen und Checklisten für ein erfolgreiches Entrümpelungsprojekt.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto px-5 md:px-0">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-10 md:mb-14">
              {/* Optimierte Bilddarstellung für mobile Geräte */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-full max-w-[200px] md:max-w-none aspect-square rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <Image 
                    src="/images/blog/entruempelung.jpg"
                    alt="Entrümpelungs-Guide"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 33vw"
                    priority
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-medium mb-3 text-[#222425]">
                  Entrümpelungs-Guide: Prozess, Materialien & emotionale Aspekte
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Entrümpelung ist mehr als nur das Wegwerfen unerwünschter Gegenstände. Unser umfassender Guide behandelt den gesamten Prozess, von der Planung bis zur Durchführung, und gibt Ihnen wertvolle Tipps zum Umgang mit emotionalen Herausforderungen beim Loslassen.
                </p>
                
                <Link href="/blog/EntruempelungsGuide?tab=checkliste" className="inline-flex items-center group">
                  <span className="text-[#009FD8] text-xs md:text-sm font-medium group-hover:underline">
                    Entrümpelungs-Checkliste und praktische Tipps
                  </span>
                  <ArrowRight className="ml-1.5 w-3 h-3 md:w-3.5 md:h-3.5 text-[#009FD8] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Themen mit Card-Layout für bessere mobile Darstellung */}
            <div className="border-t border-gray-100 pt-8 md:pt-10">
              <h4 className="text-sm md:text-base font-medium mb-5 md:mb-8 text-center">Themenübersicht</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#009FD8] flex-shrink-0 mr-3">
                    <Trash2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">Prozess & Zeitplanung</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Detaillierte Schrittabfolge einer professionellen Entrümpelung und zeitliche Einordnung verschiedener Projekte.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#009FD8] flex-shrink-0 mr-3">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">Materialien & Entsorgung</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Umfassende Übersicht aller Materialgruppen und deren fachgerechte, umweltbewusste Entsorgung.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#009FD8] flex-shrink-0 mr-3">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">Psychologie des Loslassens</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Strategien zum emotionalen Umgang mit Entrümpelung und praktische Tipps für sensible Situationen wie Nachlassauflösungen.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimierte Buttons für mobile Geräte */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/blog/EntruempelungsGuide" className="w-full sm:w-auto">
                <button className="w-full px-4 py-2.5 md:px-5 md:py-2.5 bg-[#009FD8] text-white rounded-full text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[#007CAB] active:bg-[#006694] active:transform active:translate-y-0.5">
                  <FileText className="w-3.5 h-3.5" />
                  Kompletten Guide lesen
                </button>
              </Link>
              <Link href="/blog/EntruemplungsKostenRechner" className="w-full sm:w-auto">
                <button className="w-full px-4 py-2.5 md:px-5 md:py-2.5 border border-[#009FD8] text-[#009FD8] rounded-full text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[#EAF7FC] active:bg-[#D5F0FA] active:transform active:translate-y-0.5">
                  <Banknote className="w-3.5 h-3.5" />
                  Kostenrechner nutzen
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 6. VORTEILE Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">UNSERE VORTEILE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {entruempelungData.advantages.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entruempelungData.advantages.description}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {entruempelungData.advantages.items.map((item, i) => (
                <div key={i} className={`${i > 0 ? 'pt-4 md:pt-6 border-t border-gray-100' : ''}`}>
                  <div className="flex items-start">
                    <div className="text-[#009FD8] flex-shrink-0 mr-3 mt-0.5">
                      {getAdvantageIcon(item.icon)}
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-medium mb-1 md:mb-1.5">{item.title}</h3>
                      <p className="text-xs md:text-sm text-gray-600">{item.description}</p>
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

      {/* 7. HERAUSFORDERUNGEN Section - Mobile-optimiertes Accordion */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">HERAUSFORDERUNGEN</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {entruempelungData.challenges.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entruempelungData.challenges.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {entruempelungData.challenges.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`problem-${i}`}
                  className="border-0 py-1"
                >
                  <AccordionTrigger className="py-2.5 md:py-3 hover:no-underline text-left">
                    <div className="flex items-center text-left">
                      <div className="p-0.5 rounded-full text-red-500 mr-2 md:mr-2.5">
                        <XCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </div>
                      <span className="font-medium text-xs md:text-sm">{item.problem}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2.5 md:pb-3 pt-0 pl-7 md:pl-10">
                    <div className="pt-1.5">
                      <div className="text-red-600 mb-3 md:mb-4 text-xs">
                        {item.issue}
                      </div>
                      <div className="flex">
                        <div className="p-0.5 rounded-full text-green-500 mr-2 md:mr-2.5 flex-shrink-0 h-fit">
                          <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
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

      {/* 8. FAQ Section - Mobile-optimiertes Accordion */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">FAQ</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {entruempelungData.faq.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entruempelungData.faq.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {entruempelungData.faq.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-0 py-1"
                >
                  <AccordionTrigger className="py-2.5 md:py-3 hover:no-underline text-left">
                    <span className="font-medium text-xs md:text-sm">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-2.5 md:pb-3 text-xs text-gray-600">
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
      <Section id="kontakt" className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">KONTAKT</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {entruempelungData.kontakt.formTitle}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {entruempelungData.kontakt.formSubtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <EntruempelungWizard />
          </div>
        </Container>
      </Section>

      {/* 10. Call-to-Action - Mobile-optimiert */}
      <Section className="py-12 md:py-16 bg-gradient-to-r from-[#009FD8] to-[#007CAB] text-white">
        <Container>
          <div className="text-center max-w-xl mx-auto px-5 md:px-0">
            <h2 className="text-xl md:text-2xl font-medium mb-2 md:mb-3">{entruempelungData.kontakt.cta.title}</h2>
            <p className="mb-6 md:mb-8 text-white/90 text-xs md:text-sm max-w-sm mx-auto">
              {entruempelungData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-4 py-2.5 md:px-5 md:py-2.5 bg-white text-[#009FD8] hover:bg-gray-100 active:bg-gray-200 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                {entruempelungData.kontakt.cta.button}
                <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </button>
              <a 
                href="tel:+4923115044352"
                className="px-4 py-2.5 md:px-5 md:py-2.5 border border-white/30 hover:bg-white/10 active:bg-white/20 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Phone className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {entruempelungData.kontakt.cta.call}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
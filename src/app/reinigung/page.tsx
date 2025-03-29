"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import ExpandableCleaningCards from "@/components/ui/ExpandableCleaningCards"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"
import ReinigungWizard from "@/components/contact/reinigung/ReinigungWizard"
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
  Calendar,
  Calculator
} from "lucide-react"

export default function CleaningPage() {
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

  return (
    <div className={`flex-1 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* 1. HERO Section - Mobile-optimiert */}
      <Section 
        id="hero-section"
        className="min-h-[100svh] flex items-center justify-center relative overflow-hidden p-0"
      >
        {/* Fullscreen Hintergrundbild */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: "url('/images/reinigung/hero.jpg')"}} 
        />
        
        {/* Gradient-Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        <Container className="relative z-10">
          <div className="max-w-xl mx-auto">
            {/* Perfekt ausgerichteter, minimalistischer Hero-Content */}
            <div className="text-center flex flex-col items-center justify-center min-h-[100svh] px-5 md:px-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-3 md:mb-4 text-white">
                {cleaningData.hero.title}
              </h1>
              
              <div className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 mb-8 md:mb-12">
                {cleaningData.hero.subtitle}
              </div>
              
              <p className="text-base md:text-lg text-white/80 mb-8 md:mb-12 max-w-md">
                {cleaningData.hero.description}
              </p>
              
              {/* Call-to-Action Buttons - für Touch optimiert */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full max-w-xs sm:max-w-md">
                <button 
                  onClick={scrollToContact}
                  className="flex-1 text-center bg-[#009FD8] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-[#007CAB] active:bg-[#006694] transition-colors text-sm font-medium shadow-sm"
                >
                  Jetzt anfragen
                </button>
                <a 
                  href="tel:+4923115044352"
                  className="flex-1 text-center bg-white/10 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors text-sm font-medium"
                >
                  <Phone className="inline-block mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                  0231 15044352
                </a>
              </div>
            </div>
          </div>
        </Container>
        
        {/* Subtiler Scroll-Indikator im Apple-Stil */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60 animate-pulse">
          <p className="text-xs mb-1 md:mb-1.5">Mehr entdecken</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div className="px-5 md:px-0">
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">ÜBER UNS</span>
              <H2 className="mt-2 mb-4 md:mb-6 text-2xl md:text-4xl">{cleaningData.about.title}</H2>
              <Paragraph className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                {cleaningData.about.description}
              </Paragraph>
              
              <div className="space-y-2 md:space-y-3 mt-6 md:mt-8">
                {cleaningData.about.checkpoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-xs md:text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-64 sm:h-80 md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden mx-5 md:mx-0">
              <Image
                src="/images/reinigung/about.jpg"
                fill
                className="object-cover"
                alt="TREU Service Team"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 3. BASISLEISTUNGEN Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="lg:col-span-7 px-5 md:px-0">
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">BASISLEISTUNGEN</span>
              <H2 className="mt-2 mb-4 md:mb-6 text-2xl md:text-4xl">{cleaningData.basisleistungen.title}</H2>
              <div className="text-lg md:text-xl text-[#009FD8] mb-4 md:mb-6 font-light">{cleaningData.basisleistungen.subtitle}</div>
              <Paragraph className="text-gray-600 mb-6 md:mb-10 text-sm md:text-base">
                {cleaningData.basisleistungen.note}
              </Paragraph>

              <div className="space-y-2 md:space-y-4">
                {cleaningData.basisleistungen.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center p-3 md:p-4 gap-3 md:gap-4 transition-colors hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  >
                    <div className="text-[#009FD8]">
                      {i === 0 && <ClipboardCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {i === 1 && <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {i === 2 && <Droplets className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {i === 3 && <BadgeCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {i === 4 && <Leaf className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-xs md:text-sm">{item}</p>
                    </div>
                  </div>
                ))}
                
                {/* Button als eigene Reihe */}
                <div
                  className="flex items-center p-3 md:p-4 gap-3 md:gap-4 transition-colors border-t border-gray-100 mt-2 md:mt-4 pt-3 md:pt-4"
                >
                  <button 
                    onClick={scrollToContact}
                    className="w-full bg-[#009FD8] text-white py-2.5 md:py-3 rounded-full hover:bg-[#007CAB] active:bg-[#006694] transition-colors text-xs md:text-sm font-medium flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Beratungsgespräch vereinbaren
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 px-5 md:px-0">
              <div className="relative h-64 sm:h-96 md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden">
                <Image
                  src="/images/reinigung/basis.jpg"
                  fill
                  className="object-cover"
                  alt="Professionelle Reinigung und Basisleistungen"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 4. SERVICES Section mit ExpandableCleaningCards - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-8 md:mb-12 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">SERVICE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {cleaningData.spezialisierteLoesungen.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              Maßgeschneiderte Lösungen für jeden Bedarf
            </p>
          </div>
          
          {/* Anmerkung: Die ExpandableCleaningCards-Komponente müsste separat überarbeitet werden */}
          <div className="px-3 md:px-0">
            <ExpandableCleaningCards />
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 5. RATGEBER Section - Nachhaltigkeit Blog Feature - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-12 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">NACHHALTIGKEIT</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 tracking-tight">
              Unser Engagement für die Umwelt
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              Erfahren Sie, wie unsere nachhaltigen Reinigungsmethoden die Umwelt schonen
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto px-5 md:px-0">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-10 md:mb-14">
              {/* Optimierte Bilddarstellung für Mobile */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-full max-w-[200px] md:max-w-none aspect-square rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <Image 
                    src="/images/blog/home-cleaning.jpg"
                    alt="Nachhaltige Reinigung"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 33vw"
                    priority
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-medium mb-3 text-[#222425]">
                  Nachhaltige Reinigungsmethoden & Öko-Zertifizierungen
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Die Reinigungsbranche steht vor einem entscheidenden Wandel: Nachhaltigkeit ist längst kein optionales Extra mehr, sondern eine Notwendigkeit für zukunftsfähige Unternehmen. Unsere nachhaltigen Reinigungsmethoden reduzieren nachweislich die Umweltbelastung und bringen wirtschaftliche Vorteile.
                </p>
                
                {/* Mobile-optimierte Badge-Darstellung */}
                <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-4 md:mb-5 text-xs md:text-sm text-[#009FD8] font-medium">
                  <div className="flex items-center gap-1.5 bg-[#EAF7FC] px-2 py-1 rounded-full">
                    <Leaf className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>40% Wasserersparnis</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#EAF7FC] px-2 py-1 rounded-full">
                    <Droplets className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>Ökozertifiziert</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#EAF7FC] px-2 py-1 rounded-full">
                    <Calculator className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>CO₂-Rechner</span>
                  </div>
                </div>
                
                <Link href="/blog/NachhaltigeReinigung" className="inline-flex items-center group">
                  <span className="text-[#009FD8] text-xs md:text-sm font-medium group-hover:underline">
                    Mehr über nachhaltige Reinigung erfahren
                  </span>
                  <ArrowRight className="ml-1.5 w-3 h-3 md:w-3.5 md:h-3.5 text-[#009FD8] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Themen mit optimiertem Card-Layout für Mobile */}
            <div className="border-t border-gray-100 pt-8 md:pt-10">
              <h4 className="text-sm md:text-base font-medium mb-5 md:mb-8 text-center">Weitere Themenbereiche</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link href="/blog/MaterialspezifischeReinigung" className="group">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 transition-all hover:bg-[#EAF7FC]">
                    <div className="text-[#009FD8] flex-shrink-0">
                      <Droplets className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs md:text-sm font-medium mb-1.5 group-hover:text-[#009FD8] transition-colors">Materialspezifische Reinigung</h5>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Spezielle Reinigungsmethoden für unterschiedliche Materialien und Oberflächen
                      </p>
                    </div>
                  </div>
                </Link>
                
                <Link href="/blog/FleckenentfernungsBerater" className="group">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 transition-all hover:bg-[#EAF7FC]">
                    <div className="text-[#009FD8] flex-shrink-0">
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs md:text-sm font-medium mb-1.5 group-hover:text-[#009FD8] transition-colors">Fleckenentfernungs-Berater</h5>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        Praktische Tipps und Tricks zur effektiven Entfernung hartnäckiger Flecken
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Optimierter CTA-Button */}
            <div className="mt-6 md:mt-8 text-center">
              <Link 
                href="/blog/NachhaltigeReinigung" 
                className="px-4 py-2.5 md:px-5 md:py-2.5 bg-[#009FD8] text-white rounded-full text-xs md:text-sm font-medium transition-all duration-200 inline-flex items-center gap-1.5 hover:bg-[#007CAB] active:bg-[#006694] active:transform active:translate-y-0.5"
              >
                <FileText className="w-3.5 h-3.5" />
                Alle Reinigungstipps entdecken
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 6. ABLAUF Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-8 md:mb-12 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">ABLAUF</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {cleaningData.process.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {cleaningData.process.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8">
              {cleaningData.process.steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-[#009FD8]/20 text-[#009FD8] flex items-center justify-center font-medium text-xs md:text-sm mb-3 md:mb-4">
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

      {/* 7. VORTEILE Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">UNSERE VORTEILE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {cleaningData.advantages.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {cleaningData.advantages.description}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {cleaningData.advantages.items.map((item, i) => (
                <div key={i} className={`${i > 0 ? 'pt-4 md:pt-6 border-t border-gray-100' : ''}`}>
                  <div className="flex items-start">
                    <div className="text-[#009FD8] flex-shrink-0 mr-2.5 md:mr-3 mt-0.5">
                      {item.icon === "Clock" && <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === "Badge" && <BadgeCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === "Leaf" && <Leaf className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === "Shield" && <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === "Phone" && <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === "FileText" && <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />}
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

      {/* 8. HERAUSFORDERUNGEN Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">HERAUSFORDERUNGEN</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {cleaningData.haeufigeProbleme.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {cleaningData.haeufigeProbleme.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {cleaningData.haeufigeProbleme.items.map((item, i) => (
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
                  <AccordionContent className="pb-2.5 md:pb-3 pt-0 pl-6 md:pl-10">
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

      {/* 9. FAQ Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">FAQ</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {cleaningData.faq.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {cleaningData.faq.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {cleaningData.faq.questions.map((faq, index) => (
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

      {/* 10. Kontaktformular - Mobile-optimiert */}
      <Section id="kontakt" className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">KONTAKT</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {cleaningData.kontakt.title}
            </h2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              {cleaningData.kontakt.subtitle}
            </Paragraph>
          </div>
          <div className="px-3 md:px-0">
            <ReinigungWizard />
          </div>
        </Container>
      </Section>

      {/* 11. Call-to-Action - Mobile-optimiert */}
      <Section className="py-12 md:py-16 bg-gradient-to-r from-[#009FD8] to-[#007CAB] text-white">
        <Container>
          <div className="text-center max-w-xl mx-auto px-5 md:px-0">
            <h2 className="text-xl md:text-2xl font-medium mb-2 md:mb-3">{cleaningData.kontakt.cta?.title || "Sauberkeit ist Vertrauenssache"}</h2>
            <p className="mb-6 md:mb-8 text-white/90 text-xs md:text-sm max-w-sm mx-auto">
              {cleaningData.kontakt.cta?.description || "Überzeugen Sie sich von unserer Qualität. Wir erstellen Ihnen ein maßgeschneidertes Angebot für Ihre individuellen Anforderungen."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-4 py-2.5 md:px-5 md:py-2.5 bg-white text-[#009FD8] hover:bg-gray-100 active:bg-gray-200 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                {cleaningData.kontakt.cta?.button || "Angebot anfordern"}
                <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </button>
              <a 
                href="tel:+4923115044352"
                className="px-4 py-2.5 md:px-5 md:py-2.5 border border-white/30 hover:bg-white/10 active:bg-white/20 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Phone className="h-3 w-3 md:h-3.5 md:w-3.5" />
                24/7 Erreichbar
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
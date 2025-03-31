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
import PVMontageWizard from "@/components/contact/pv/PVMontageWizard"
import pvMontageData from "@/i18n/de/pv-montage.json"
import {
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  XCircle,
  PhoneCall,
  Battery,
  Shield,
  Zap,
  Sun,
  PanelTop,
  CircleDollarSign,
  Leaf,
  Clock,
  BadgeCheck,
  FileText,
  TrendingUp,
  Hammer,
  MessageSquare,
  Layers,
  Drill,
  Wrench,
  Phone
} from "lucide-react"

export default function PVMontagePage() {
  const [] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // Sanfte Überblendung der Seite für ein Apple-typisches Erlebnis
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex-1 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* 1. HERO Section - Mobile-optimierter Apple-style fullscreen hero */}
      <Section 
        id="hero-section"
        className="min-h-[100svh] flex items-center justify-center relative overflow-hidden p-0"
      >
        {/* Fullscreen Hintergrundbild */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: "url('/images/pv-montage/hero.jpg')"}} 
        />
        
        {/* Gradient-Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        <Container className="relative z-10">
          <div className="max-w-xl mx-auto">
            {/* Perfekt ausgerichteter, minimalistischer Hero-Content */}
            <div className="text-center flex flex-col items-center justify-center min-h-[100svh] px-5 md:px-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-3 md:mb-4 text-white">
                {pvMontageData.hero.title}
              </h1>
              
              <div className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 mb-8 md:mb-12">
                {pvMontageData.hero.subtitle}
              </div>
              
              <p className="text-base md:text-lg text-white/80 mb-8 md:mb-12 max-w-md">
                {pvMontageData.hero.description}
              </p>
              
              {/* Call-to-Action Buttons - perfekt ausgerichtet für Touch */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full max-w-xs sm:max-w-md">
                <button 
                  onClick={scrollToContact}
                  className="flex-1 text-center bg-[#009FD8] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full hover:bg-[#007CAB] active:bg-[#006694] transition-colors text-sm font-medium shadow-sm"
                >
                  Solar-Potenzial ermitteln
                </button>
                <a 
                  href="tel:+4923115044352"
                  className="flex-1 text-center bg-white/10 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors text-sm font-medium"
                >
                  <Phone className="inline-block mr-1.5 h-3.5 w-3.5 md:mr-2 md:h-4 md:w-4" />
                  0231 15044352
                </a>
              </div>
            </div>
          </div>
        </Container>
        
        {/* Subtiler Scroll-Indikator im Apple-Stil - optimierte Position für moderne Smartphones */}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center px-5 md:px-0">
            <div>
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">ÜBER UNS</span>
              <H2 className="mt-2 mb-4 md:mb-6 text-2xl md:text-4xl">{pvMontageData.about.title}</H2>
              <Paragraph className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                {pvMontageData.about.description}
              </Paragraph>
              
              <div className="space-y-2 md:space-y-3 mt-6 md:mt-8">
                {pvMontageData.about.checkpoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#009FD8] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-xs md:text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-64 sm:h-80 md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden mt-4 md:mt-0">
              <Image
                src="/images/pv-montage/expertise.jpg"
                fill
                className="object-cover"
                alt="Photovoltaik TREU Service Team"
                sizes="(max-width: 1023px) 100vw, 50vw"
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
              {pvMontageData.spezialisierteLoesungen.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {pvMontageData.spezialisierteLoesungen.subtitle}
            </p>
          </div>
          
          {/* Service items mobile-optimiert */}
          <div className="max-w-4xl mx-auto px-5 md:px-0">
            {pvMontageData.spezialisierteLoesungen.services.map((service, index) => (
              <div key={index} className={`py-6 md:py-8 ${index > 0 ? 'border-t border-gray-100' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="md:w-1/3 mb-3 md:mb-0">
                    <div className="flex items-center md:justify-start">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#E6F4FA] flex items-center justify-center mr-2 md:mr-3">
                        {index === 0 ? <Sun className="w-4 h-4 md:w-5 md:h-5 text-[#009FD8]" /> : 
                         index === 1 ? <PanelTop className="w-4 h-4 md:w-5 md:h-5 text-[#009FD8]" /> : 
                         <Battery className="w-4 h-4 md:w-5 md:h-5 text-[#009FD8]" />}
                      </div>
                      <h3 className="text-base md:text-lg font-medium">{service.title}</h3>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm">{service.description.split('"')[0]}</p>
                    <h4 className="text-xs md:text-sm font-medium mb-2 md:mb-3">Leistungen:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                      {service.leistungen.slice(0, 5).map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8] mr-1.5 md:mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-xs md:text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 pt-3 md:mt-4 md:pt-4 border-t border-gray-100 text-center md:text-left">
                      <button 
                        onClick={scrollToContact}
                        className="px-4 py-2 md:px-5 md:py-2.5 bg-[#009FD8] hover:bg-[#007CAB] active:bg-[#006694] text-white rounded-full text-xs font-medium transition-all duration-200 inline-flex items-center gap-1.5"
                      >
                        Angebot anfordern
                        <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
                      </button>
                    </div>
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
              {pvMontageData.arbeitsweise.title}
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {pvMontageData.arbeitsweise.steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center bg-gray-50 p-4 md:p-5 rounded-xl">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-[#009FD8]/20 text-[#009FD8] flex items-center justify-center font-medium text-sm mb-3 md:mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-sm md:text-base font-medium mb-1.5 md:mb-2">{step.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 pt-5 md:mt-10 md:pt-6 border-t border-gray-100">
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

      {/* 5. VORTEILE Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">UNSERE VORTEILE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {pvMontageData.advantages.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {pvMontageData.advantages.description}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {pvMontageData.advantages.items.map((item, i) => (
                <div key={i} className={`${i > 0 ? 'pt-4 md:pt-6 border-t border-gray-100' : ''}`}>
                  <div className="flex items-start">
                    <div className="text-[#009FD8] flex-shrink-0 mr-2.5 md:mr-3 mt-0.5">
                      {item.icon === 'Certificate' && <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === 'BadgeCheck' && <Hammer className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === 'TrendingUp' && <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === 'Clock' && <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === 'Shield' && <Shield className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === 'FileCheck' && <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === 'Zap' && <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === 'Badge' && <BadgeCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === 'Cog' && <Zap className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === 'FileText' && <FileText className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === 'Leaf' && <Leaf className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                      {item.icon === 'HandShake' && <Sun className="w-3.5 h-3.5 md:w-4 md:h-4" />}
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
      
      {/* 6. IHRE VORTEILE Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">IHRE VORTEILE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {pvMontageData.vorteile.title}
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 gap-8 md:gap-16 lg:grid-cols-3">
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="flex items-center mb-3 md:mb-4">
                  <CircleDollarSign className="w-4 h-4 md:w-5 md:h-5 text-[#16A34A] mr-2" />
                  <h3 className="text-base md:text-lg font-medium">Finanzielle Vorteile</h3>
                </div>
                <ul className="space-y-2 md:space-y-3">
                  {pvMontageData.vorteile.finanzielle.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#16A34A] mr-1.5 md:mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-xs md:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="flex items-center mb-3 md:mb-4">
                  <Leaf className="w-4 h-4 md:w-5 md:h-5 text-[#0EA5E9] mr-2" />
                  <h3 className="text-base md:text-lg font-medium">Ökologische Vorteile</h3>
                </div>
                <ul className="space-y-2 md:space-y-3">
                  {pvMontageData.vorteile.nachhaltige.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#0EA5E9] mr-1.5 md:mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-xs md:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-xl">
                <div className="flex items-center mb-3 md:mb-4">
                  <Sun className="w-4 h-4 md:w-5 md:h-5 text-[#F59E0B] mr-2" />
                  <h3 className="text-base md:text-lg font-medium">Praktische Vorteile</h3>
                </div>
                <ul className="space-y-2 md:space-y-3">
                  {pvMontageData.vorteile.praktische.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#F59E0B] mr-1.5 md:mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-xs md:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 7. RATGEBER Section - Mobile-optimiert im Apple-Stil */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">RATGEBER</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 tracking-tight">
              PV-Montage Ratgeber
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              Alles, was Sie über die professionelle Montage von Photovoltaikanlagen wissen müssen
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto px-5 md:px-0">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-10 md:mb-14">
              {/* Optimierte Bilddarstellung für mobile Geräte */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-full max-w-[200px] md:max-w-none aspect-square rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <Image 
                    src="/images/blog/guide.jpg"
                    alt="PV-Montage Guide"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 33vw"
                    priority
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-medium mb-3 text-[#222425]">
                  Photovoltaik-Montage Guide: Planung & Installation
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Unser umfassender Guide zur PV-Montage bietet Ihnen wertvolle Informationen zu verschiedenen Montagearten, Praxistipps für optimale Installation und konkrete Hinweise zur Leistungsoptimierung Ihrer Solaranlage.
                </p>
                
                <Link href="/blog/PVGuide" className="inline-flex items-center group">
                  <span className="text-[#009FD8] text-xs md:text-sm font-medium group-hover:underline">
                    Zum Guide: Perfekte Montage für maximale Solarerträge
                  </span>
                  <ArrowRight className="ml-1.5 w-3 h-3 md:w-3.5 md:h-3.5 text-[#009FD8] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Themen in Card-Layout für bessere mobile Darstellung */}
            <div className="border-t border-gray-100 pt-8 md:pt-10">
              <h4 className="text-sm md:text-base font-medium mb-5 md:mb-8 text-center">Themenübersicht</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#009FD8] flex-shrink-0 mr-3">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">Montagearten im Vergleich</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Detaillierte Vor- und Nachteile verschiedener Montagelösungen mit konkreten ROI-Vergleichen.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#009FD8] flex-shrink-0 mr-3">
                    <Drill className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">Installation & Optimierung</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Expertentipps zu Installation und Ertragsoptimierung für bis zu 30% höhere Leistung.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#009FD8] flex-shrink-0 mr-3">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">DIY vs. Profi-Montage</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Praxisnahe Entscheidungshilfe mit Kosten-Nutzen-Analyse der Selbstmontage vs. Profi-Installation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimierter CTA-Button */}
            <div className="mt-6 md:mt-8 text-center">
              <Link href="/blog/PVGuide">
                <button className="px-4 py-2.5 md:px-5 md:py-2.5 bg-[#009FD8] text-white rounded-full text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[#007CAB] active:bg-[#006694] active:transform active:translate-y-0.5">
                  <FileText className="w-3.5 h-3.5" />
                  Kompletten Guide lesen
                </button>
              </Link>
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
              {pvMontageData.haeufigeProbleme.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {pvMontageData.haeufigeProbleme.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {pvMontageData.haeufigeProbleme.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`problem-${i}`}
                  className="border-0 py-1"
                >
                  <AccordionTrigger className="py-3 hover:no-underline text-left">
                    <div className="flex items-center text-left">
                      <div className="p-0.5 rounded-full text-red-500 mr-2 md:mr-2.5">
                        <XCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </div>
                      <span className="font-medium text-xs md:text-sm">{item.problem}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-0 pl-6 md:pl-10">
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
              {pvMontageData.faq.title}
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {pvMontageData.faq.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-0 py-1"
                >
                  <AccordionTrigger className="py-3 hover:no-underline text-left">
                    <span className="font-medium text-xs md:text-sm">{faq.question}</span>
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

      {/* 10. Kontaktformular - Mobile-optimiert */}
      <Section id="kontakt" className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">KONTAKT</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {pvMontageData.kontakt.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {pvMontageData.kontakt.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-4 md:px-0">
            <PVMontageWizard />
          </div>
        </Container>
      </Section>

      {/* 11. Call-to-Action - Mobile-optimiert */}
      <Section className="py-12 md:py-16 bg-gradient-to-r from-[#009FD8] to-[#007CAB] text-white">
        <Container>
          <div className="text-center max-w-xl mx-auto px-5 md:px-0">
            <h2 className="text-xl md:text-2xl font-medium mb-2 md:mb-3">{pvMontageData.kontakt.description}</h2>
            <p className="mb-6 md:mb-8 text-white/90 text-xs md:text-sm max-w-sm mx-auto">
              {pvMontageData.kontakt.cta}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-4 py-2.5 md:px-5 md:py-2.5 bg-white text-[#009FD8] hover:bg-gray-100 active:bg-gray-200 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                {pvMontageData.kontakt.ctaButton}
                <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </button>
              <a 
                href="tel:+4923115044352"
                className="px-4 py-2.5 md:px-5 md:py-2.5 border border-white/30 hover:bg-white/10 active:bg-white/20 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1.5" />
                {pvMontageData.kontakt.ctaCall}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
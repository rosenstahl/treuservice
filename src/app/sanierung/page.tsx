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
import SanierungWizard from "@/components/contact/sanierung/SanierungWizard"
import sanierungData from "@/i18n/de/sanierung.json"
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Flame,
  Droplet,
  Bug,
  Zap,
  HandshakeIcon,
  Cog,
  Leaf,
  BadgeCheck,
  FileText,
  CheckCircle2,
  XCircle
} from "lucide-react"

export default function SanierungPage() {
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

  // Function to get advantage icon
  const getAdvantageIcon = (iconName: string) => {
    switch(iconName) {
      case 'Zap': return <Zap className="w-4 h-4 text-[#009FD8]" />;
      case 'Badge': return <BadgeCheck className="w-4 h-4 text-[#009FD8]" />;
      case 'Cog': return <Cog className="w-4 h-4 text-[#009FD8]" />;
      case 'FileText': return <FileText className="w-4 h-4 text-[#009FD8]" />;
      case 'Leaf': return <Leaf className="w-4 h-4 text-[#009FD8]" />;
      case 'HandShake': return <HandshakeIcon className="w-4 h-4 text-[#009FD8]" />;
      default: return <CheckCircle className="w-4 h-4 text-[#009FD8]" />;
    }
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
          style={{backgroundImage: "url('/images/sanierung/hero.jpg')"}} 
        />
        
        {/* Gradient-Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        <Container className="relative z-10">
          <div className="max-w-xl mx-auto px-5 md:px-0">
            {/* Mobile-optimierter Hero-Content */}
            <div className="text-center flex flex-col items-center justify-center min-h-[80svh]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-3 md:mb-4 text-white">
                {sanierungData.hero.title}
              </h1>
              
              <div className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 mb-8 md:mb-12">
                {sanierungData.hero.subtitle}
              </div>
              
              <p className="text-base md:text-lg text-white/80 mb-8 md:mb-12 max-w-md">
                {sanierungData.hero.description}
              </p>
              
              {/* Mobile-optimierte Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full max-w-xs sm:max-w-md">
                <button 
                  onClick={scrollToContact}
                  className="flex-1 text-center bg-[#009FD8] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-[#007CAB] active:bg-[#006694] transition-colors text-sm font-medium"
                >
                  {sanierungData.hero.cta || "Notfallhilfe anfordern"}
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
        
        {/* Mobile-optimierter Scroll-Indikator */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60 animate-pulse">
          <p className="text-xs mb-1 md:mb-1.5">Mehr entdecken</p>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5">
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
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide md:tracking-wider">ÜBER UNS</span>
              <H2 className="mt-2 mb-4 md:mb-6 text-2xl md:text-4xl">{sanierungData.about.title}</H2>
              <Paragraph className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                {sanierungData.about.description}
              </Paragraph>
              
              <div className="space-y-2 md:space-y-3 mt-6 md:mt-8">
                {sanierungData.about.checkpoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8] flex-shrink-0 mt-0.5 md:mt-1" />
                    <p className="text-gray-700 text-xs md:text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-64 sm:h-80 md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden">
              <Image
                src="/images/sanierung/basis.jpg"
                fill
                className="object-cover"
                alt="TREU Service Sanierungsexperten"
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
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide md:tracking-wider">SERVICE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {sanierungData.spezialisierteLoesungen.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {sanierungData.spezialisierteLoesungen.subtitle}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto px-5 md:px-0">
            {/* Brandschadensanierung - Mobile-optimiert */}
            <div className="py-6 md:py-8 border-t border-gray-100 first:border-t-0">
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="md:w-1/3 mb-3 md:mb-0">
                  <div className="flex items-center md:justify-start">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#FEF2F2] flex items-center justify-center mr-2 md:mr-3">
                      <Flame className="w-4 h-4 md:w-5 md:h-5 text-[#EF4444]" />
                    </div>
                    <h3 className="text-base md:text-lg font-medium">{sanierungData.spezialisierteLoesungen.services[0].title}</h3>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm">{sanierungData.spezialisierteLoesungen.services[0].description}</p>
                  <h4 className="text-xs md:text-sm font-medium mb-2 md:mb-3">Leistungen:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {sanierungData.spezialisierteLoesungen.services[0].leistungen.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#EF4444] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-xs md:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center md:text-left">
                    <button 
                      onClick={scrollToContact}
                      className="px-4 py-2 md:px-5 md:py-2.5 bg-[#EF4444] hover:bg-[#DC2626] active:bg-[#B91C1C] text-white rounded-full text-xs font-medium transition-all duration-200 inline-flex items-center gap-1.5"
                    >
                      Angebot anfordern
                      <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Wasserschadensanierung - Mobile-optimiert */}
            <div className="py-6 md:py-8 border-t border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="md:w-1/3 mb-3 md:mb-0">
                  <div className="flex items-center md:justify-start">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#E6F4FA] flex items-center justify-center mr-2 md:mr-3">
                      <Droplet className="w-4 h-4 md:w-5 md:h-5 text-[#009FD8]" />
                    </div>
                    <h3 className="text-base md:text-lg font-medium">{sanierungData.spezialisierteLoesungen.services[1].title}</h3>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm">{sanierungData.spezialisierteLoesungen.services[1].description}</p>
                  <h4 className="text-xs md:text-sm font-medium mb-2 md:mb-3">Leistungen:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {sanierungData.spezialisierteLoesungen.services[1].leistungen.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-xs md:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center md:text-left">
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
            
            {/* Schimmelpilzsanierung - Mobile-optimiert */}
            <div className="py-6 md:py-8 border-t border-gray-100">
              <div className="flex flex-col md:flex-row md:items-start">
                <div className="md:w-1/3 mb-3 md:mb-0">
                  <div className="flex items-center md:justify-start">
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#ECFDF5] flex items-center justify-center mr-2 md:mr-3">
                      <Bug className="w-4 h-4 md:w-5 md:h-5 text-[#10B981]" />
                    </div>
                    <h3 className="text-base md:text-lg font-medium">{sanierungData.spezialisierteLoesungen.services[2].title}</h3>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-gray-600 mb-3 md:mb-4 text-xs md:text-sm">{sanierungData.spezialisierteLoesungen.services[2].description}</p>
                  <h4 className="text-xs md:text-sm font-medium mb-2 md:mb-3">Leistungen:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                    {sanierungData.spezialisierteLoesungen.services[2].leistungen.slice(0, 5).map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#10B981] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-xs md:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-100 text-center md:text-left">
                    <button 
                      onClick={scrollToContact}
                      className="px-4 py-2 md:px-5 md:py-2.5 bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] text-white rounded-full text-xs font-medium transition-all duration-200 inline-flex items-center gap-1.5"
                    >
                      Angebot anfordern
                      <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 4. ABLAUF Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-8 md:mb-12 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide md:tracking-wider">ABLAUF</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {sanierungData.process.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {sanierungData.process.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {sanierungData.process.steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-[#009FD8]/20 text-[#009FD8] flex items-center justify-center font-medium text-xs md:text-sm mb-3 md:mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-sm md:text-base font-medium mb-1.5 md:mb-2">{step.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 md:mt-10 pt-6 border-t border-gray-100">
              <button 
                onClick={scrollToContact}
                className="px-4 py-2 md:px-5 md:py-2.5 bg-[#009FD8] hover:bg-[#007CAB] active:bg-[#006694] text-white rounded-full text-xs md:text-sm font-medium transition-all duration-200 inline-flex items-center gap-1.5"
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
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide md:tracking-wider">RATGEBER</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {sanierungData.praevention.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {sanierungData.praevention.subtitle}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto px-5 md:px-0">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-10 md:mb-14">
              {/* Mobile-optimierte Bilddarstellung */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-full max-w-[200px] md:max-w-none aspect-square rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <Image 
                    src="/images/blog/sanierung1.jpg"
                    alt="Schadensanierung Guide"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 33vw"
                    priority
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-medium mb-3 text-[#222425]">
                  Vorbeugen ist besser als Sanieren
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {sanierungData.praevention.ratgeberText}
                </p>
                
                <Link href="/blog/SanierungPraevention" className="inline-flex items-center group">
                  <span className="text-[#009FD8] text-xs md:text-sm font-medium group-hover:underline">
                    {sanierungData.praevention.ratgeberLinkText}
                  </span>
                  <ArrowRight className="ml-1.5 w-3 h-3 md:w-3.5 md:h-3.5 text-[#009FD8] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Mobile-optimierte Themen-Cards */}
            <div className="border-t border-gray-100 pt-8 md:pt-10">
              <h4 className="text-sm md:text-base font-medium mb-5 md:mb-8 text-center">Präventionsthemen</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#EF4444] flex-shrink-0 mr-3">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">{sanierungData.praevention.praventionsthemen[0].title}</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {sanierungData.praevention.praventionsthemen[0].description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#009FD8] flex-shrink-0 mr-3">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">{sanierungData.praevention.praventionsthemen[1].title}</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {sanierungData.praevention.praventionsthemen[1].description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#10B981] flex-shrink-0 mr-3">
                    <Bug className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">{sanierungData.praevention.praventionsthemen[2].title}</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {sanierungData.praevention.praventionsthemen[2].description}
                    </p>
                  </div>
                </div>
              </div>
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
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide md:tracking-wider">UNSERE VORTEILE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {sanierungData.advantages.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {sanierungData.advantages.description}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {sanierungData.advantages.items.map((item, i) => (
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

      {/* 7. HERAUSFORDERUNGEN Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide md:tracking-wider">HERAUSFORDERUNGEN</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {sanierungData.challenges.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {sanierungData.challenges.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {sanierungData.challenges.items.map((item, i) => (
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

      {/* 8. FAQ Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide md:tracking-wider">FAQ</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {sanierungData.faq.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {sanierungData.faq.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {sanierungData.faq.questions.map((faq, index) => (
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
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide md:tracking-wider">KONTAKT</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {sanierungData.kontakt.form.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {sanierungData.kontakt.form.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <SanierungWizard />
          </div>
        </Container>
      </Section>

      {/* 10. Call-to-Action - Mobile-optimiert */}
      <Section className="py-12 md:py-16 bg-gradient-to-r from-[#009FD8] to-[#007CAB] text-white">
        <Container>
          <div className="text-center max-w-xl mx-auto px-5 md:px-0">
            <h2 className="text-xl md:text-2xl font-medium mb-2 md:mb-3">{sanierungData.kontakt.cta.title}</h2>
            <p className="mb-6 md:mb-8 text-white/90 text-xs md:text-sm max-w-sm mx-auto">
              {sanierungData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-4 py-2 md:px-5 md:py-2.5 bg-white text-[#009FD8] hover:bg-gray-100 active:bg-gray-200 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                {sanierungData.kontakt.cta.button}
                <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </button>
              <a 
                href="tel:+4923115044352"
                className="px-4 py-2 md:px-5 md:py-2.5 border border-white/30 hover:bg-white/10 active:bg-white/20 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Phone className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {sanierungData.kontakt.cta.call}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
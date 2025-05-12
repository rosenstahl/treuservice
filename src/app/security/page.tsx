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
import SecurityWizard from '@/components/contact/security/SecurityWizard'
import ExpandableSecurityCards from '@/components/ui/ExpandableSecurityCards'
import securityData from "@/i18n/de/security.json"
import {
  PlusCircle,  
  Bell,       
  Clock,     
  Zap,       
  Network,    
  Settings,    
  CheckCircle,
  CheckCircle2,
  FileCheck,
  Lock,
  BadgeCheck,
  Eye,
  XCircle,
  ArrowRight,
  Phone,
  BookOpen,
} from "lucide-react"

export default function SecurityPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
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
          style={{backgroundImage: "url('/images/security/hero.jpg')"}} 
        />
        
        {/* Gradient-Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        <Container className="relative z-10">
          <div className="max-w-xl mx-auto px-5 md:px-0">
            {/* Perfekt ausgerichteter, minimalistischer Hero-Content */}
            <div className="text-center flex flex-col items-center justify-center min-h-[70vh]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-3 md:mb-4 text-white">
                {securityData.hero.title}
              </h1>
              
              <div className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 mb-8 md:mb-12">
                {securityData.hero.subtitle}
              </div>
              
              <p className="text-base md:text-lg text-white/80 mb-8 md:mb-12 max-w-md">
                {securityData.hero.description}
              </p>
              
              {/* Call-to-Action Buttons - mobile-optimiert */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full max-w-md">
                <button 
                  onClick={scrollToContact}
                  className="flex-1 text-center bg-[#009FD8] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-[#007CAB] active:bg-[#006694] transition-colors text-sm font-medium"
                >
                  {securityData.hero.cta}
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
        
        {/* Subtiler Scroll-Indikator im Apple-Stil - mobil-optimiert */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60 animate-pulse">
          <p className="text-xs mb-1.5">Mehr entdecken</p>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </Section>
      
      {/* Rest der Komponente bleibt unverändert... */}
      
      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 2. ÜBER UNS Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="px-5 md:px-0">
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide md:tracking-wider">ÜBER UNS</span>
              <H2 className="mt-2 mb-4 md:mb-6 text-2xl md:text-4xl">{securityData.about.title}</H2>
              <Paragraph className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                {securityData.about.description}
              </Paragraph>
              
              <div className="space-y-3 mt-6 md:mt-8">
                {securityData.about.checkpoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#009FD8] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-xs md:text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden mx-5 md:mx-0">
              <Image
                src="/images/security/expertise.jpg"
                fill
                className="object-cover"
                alt="TREU Service Sicherheitsexperten"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 lg:order-1 relative h-[300px] md:h-[500px] rounded-xl md:rounded-2xl overflow-hidden mx-5 md:mx-0">
              <Image
                src="/images/security/basis.jpg"
                fill
                className="object-cover"
                alt="Professionelle Security"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="order-1 lg:order-2 px-5 md:px-0">
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide md:tracking-wider">BASISLEISTUNGEN</span>
              <H2 className="mt-2 mb-4 md:mb-6 text-2xl md:text-4xl">{securityData.basisleistungen.title}</H2>
              <Paragraph className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                {securityData.basisleistungen.note}
              </Paragraph>
              
              <div className="space-y-4 md:space-y-6 mt-6 md:mt-8">
                {securityData.basisleistungen.items.map((item, i) => (
                  <div key={i} className={`${i > 0 ? 'pt-4 md:pt-6 border-t border-gray-100' : ''}`}>
                    <div className="flex items-start">
                      <div className="text-[#009FD8] flex-shrink-0 mr-3 mt-0.5">
                        {i === 0 && <FileCheck className="w-4 h-4" />}
                        {i === 1 && <Eye className="w-4 h-4" />}
                        {i === 2 && <Lock className="w-4 h-4" />}
                        {i === 3 && <PlusCircle className="w-4 h-4 text-red-600" />}
                        {i === 4 && <Bell className="w-4 h-4" />}
                        {i === 5 && <FileCheck className="w-4 h-4" />}
                      </div>
                      <div>
                        <h3 className="text-sm md:text-base font-medium text-gray-800">
                          {item}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 4. SERVICE Section - Mobile-optimierte ExpandableSecurityCards */}
      <Section id="services" className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">SERVICE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {securityData.specializedLoesungen.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              Unsere spezialisierten Sicherheitslösungen decken alle Bereiche ab - vom Objektschutz bis zum Personenschutz.
            </p>
          </div>
          
          <div className="px-3 md:px-0">
            <ExpandableSecurityCards
              services={securityData.specializedLoesungen.services.map(service => ({
                ...service,
                image: `/images/security/${service.title.toLowerCase().replace(/\s+/g, '-')}.jpg`
              }))}
              labels={{
                einsatzgebiete: securityData.specializedLoesungen.labels.einsatzgebiete,
                leistungen: securityData.specializedLoesungen.labels.leistungen,
                details: securityData.specializedLoesungen.labels.details,
                angebotAnfordern: securityData.specializedLoesungen.labels.angebotAnfordern
              }}
              expandedCard={expandedCard}
              setExpandedCard={setExpandedCard}
            />
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 5. ABLAUF Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-12 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">ABLAUF</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {securityData.process.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {securityData.process.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {securityData.process.steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#009FD8]/20 text-[#009FD8] flex items-center justify-center font-medium text-sm mb-3 md:mb-4">
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
                className="px-4 py-2.5 md:px-5 md:py-2.5 bg-[#009FD8] hover:bg-[#007CAB] active:bg-[#006694] text-white rounded-full text-xs md:text-sm font-medium transition-all duration-200 inline-flex items-center gap-1.5 active:transform active:translate-y-0.5"
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

      {/* 6. BLOG Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">WISSENSWERTES</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              Fachinformationen & Ratgeber
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              Wir teilen unser Expertenwissen zu Sicherheitsthemen, damit Sie immer optimal informiert sind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 px-5 md:px-0">
            {/* Blog 1: Notfallplan - Mobile-optimiert */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <div className="relative h-48 md:h-auto md:aspect-[4/3] overflow-hidden">
                <Image 
                  src="/images/blog/security.jpg"
                  alt="Notfallpläne für Unternehmen"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-2 py-0.5 text-xs font-medium text-white mb-2">
                    Sicherheitsmanagement
                  </div>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <span className="text-[#009FD8] text-xs">RATGEBER</span>
                <h3 className="text-base md:text-lg font-medium mt-1 mb-1.5 group-hover:text-[#009FD8] transition-colors">
                  Notfallpläne für Unternehmen
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2.5 line-clamp-2">
                  Ein umfassender Leitfaden zur Erstellung wirksamer Notfallpläne für maximale Sicherheit.
                </p>
                <Link 
                  href="/blog/security" 
                  className="inline-flex items-center text-xs md:text-sm text-[#009FD8] font-medium group-hover:underline"
                >
                  Artikel lesen
                  <ArrowRight className="ml-1.5 w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Blog 2: Smart Building Sicherheit */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <div className="relative h-48 md:h-auto md:aspect-[4/3] overflow-hidden">
                <Image 
                  src="/images/blog/smart-building.jpg"
                  alt="Smart Building Sicherheitstechnologien"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-2 py-0.5 text-xs font-medium text-white mb-2">
                    Technologie
                  </div>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <span className="text-[#009FD8] text-xs">WISSEN</span>
                <h3 className="text-base md:text-lg font-medium mt-1 mb-1.5 group-hover:text-[#009FD8] transition-colors">
                  Smart Building Sicherheitstechnologien
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2.5 line-clamp-2">
                  Moderne Sicherheitssysteme für intelligente Gebäude: Trends und Lösungen im Überblick.
                </p>
                <Link 
                  href="/blog/SmartBuildingSicherheit" 
                  className="inline-flex items-center text-xs md:text-sm text-[#009FD8] font-medium group-hover:underline"
                >
                  Artikel lesen
                  <ArrowRight className="ml-1.5 w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Blog 3: §34a Sachkunde */}
            <div className="group bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <div className="relative h-48 md:h-auto md:aspect-[4/3] overflow-hidden">
                <Image 
                  src="/images/blog/34a-hero.jpg"
                  alt="§34a Sachkundeprüfung"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                  <div className="inline-flex items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-2 py-0.5 text-xs font-medium text-white mb-2">
                    Qualifikation
                  </div>
                </div>
              </div>
              <div className="p-3 md:p-4">
                <span className="text-[#009FD8] text-xs">LEITFADEN</span>
                <h3 className="text-base md:text-lg font-medium mt-1 mb-1.5 group-hover:text-[#009FD8] transition-colors">
                  §34a Sachkundeprüfung
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2.5 line-clamp-2">
                  Der umfassende Guide zur Vorbereitung auf die Sachkundeprüfung mit kostenlosem Prüfungssimulator.
                </p>
                <Link 
                  href="/blog/Sachkunde34a" 
                  className="inline-flex items-center text-xs md:text-sm text-[#009FD8] font-medium group-hover:underline"
                >
                  Zum Guide
                  <ArrowRight className="ml-1.5 w-3 h-3 md:w-3.5 md:h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8 md:mt-12 px-5 md:px-0">
            <Link 
              href="/blog?category=security" 
              className="inline-block px-4 py-2.5 md:px-5 md:py-2.5 border border-[#009FD8] text-[#009FD8] hover:bg-[#EAF7FC] active:bg-[#D5F0FA] rounded-full text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 w-full sm:w-auto sm:inline-flex"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Alle Sicherheitsartikel ansehen
            </Link>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 7. UNSERE VORTEILE Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container>
          <div className="text-center mb-10 md:mb-16 px-5 md:px-0">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">UNSERE VORTEILE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {securityData.advantages.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {securityData.advantages.description}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto px-5 md:px-0">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {securityData.advantages.items.map((item, i) => (
                <div key={i} className={`${i > 0 ? 'pt-4 md:pt-6 border-t border-gray-100' : ''}`}>
                  <div className="flex items-start">
                    <div className="text-[#009FD8] flex-shrink-0 mr-3 mt-0.5">
                      {item.icon === "Zap" && <Zap className="w-4 h-4" />}
                      {item.icon === "Badge" && <BadgeCheck className="w-4 h-4" />}
                      {item.icon === "Network" && <Network className="w-4 h-4" />}
                      {item.icon === "Settings" && <Settings className="w-4 h-4" />}
                      {item.icon === "Clock" && <Clock className="w-4 h-4" />}
                      {item.icon === "Bell" && <Bell className="w-4 h-4" />}
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
              {securityData.commonIssues.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {securityData.commonIssues.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {securityData.commonIssues.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`problem-${i}`}
                  className="border-0 py-1"
                >
                  <AccordionTrigger className="py-3 hover:no-underline text-left">
                    <div className="flex items-center text-left">
                      <div className="p-0.5 rounded-full text-red-500 mr-2.5">
                        <XCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      </div>
                      <span className="font-medium text-xs md:text-sm">{item.problem}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-0 pl-6 md:pl-10">
                    <div className="pt-1.5">
                      <div className="text-red-600 mb-3 md:mb-4 text-xxs md:text-xs">
                        {item.issue}
                      </div>
                      <div className="flex">
                        <div className="p-0.5 rounded-full text-green-500 mr-2 md:mr-2.5 flex-shrink-0 h-fit">
                          <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </div>
                        <div className="text-green-700 text-xxs md:text-xs">
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
              {securityData.faq.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {securityData.faq.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto px-5 md:px-0">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {securityData.faq.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-0 py-1"
                >
                  <AccordionTrigger className="py-3 hover:no-underline text-left">
                    <span className="font-medium text-xs md:text-sm">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-xxs md:text-xs text-gray-600">
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
              {securityData.kontakt.title}
            </h2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              {securityData.kontakt.subtitle}
            </Paragraph>
          </div>

          {/* SecurityWizard mit etwas Padding für mobile Geräte */}
          <div className="px-3 md:px-0">
            <SecurityWizard />
          </div>
        </Container>
      </Section>

      {/* 11. Call-to-Action - Mobile-optimiert */}
      <Section className="py-12 md:py-16 bg-gradient-to-r from-[#009FD8] to-[#007CAB] text-white">
        <Container>
          <div className="text-center max-w-xl mx-auto px-5 md:px-0">
            <h2 className="text-xl md:text-2xl font-medium mb-2 md:mb-3">{securityData.kontakt.cta.title}</h2>
            <p className="mb-6 md:mb-8 text-white/90 text-xs md:text-sm max-w-sm mx-auto">
              {securityData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-4 py-2.5 md:px-5 md:py-2.5 bg-white text-[#009FD8] hover:bg-gray-100 active:bg-gray-200 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 active:transform active:translate-y-0.5"
              >
                {securityData.kontakt.cta.button}
                <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </button>
              <a 
                href="tel:+4923115044352"
                className="px-4 py-2.5 md:px-5 md:py-2.5 border border-white/30 hover:bg-white/10 active:bg-white/20 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 active:transform active:translate-y-0.5"
              >
                <Phone className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {securityData.kontakt.cta.call}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
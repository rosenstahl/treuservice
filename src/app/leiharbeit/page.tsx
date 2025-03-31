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
import LeiharbeitWizard from "@/components/contact/leiharbeit/LeiharbeitWizard"
import leiharbeitData from "@/i18n/de/leiharbeit.json"
import {
  Users,
  Briefcase,
  Zap,
  Calendar,
  CheckCircle,
  CheckSquare,
  BadgeCheck,
  Shield,
  FileText,
  Building2,
  XCircle,
  CheckCircle2,
  Hammer,
  ArrowRight,
  Phone,
  ChevronDown
} from "lucide-react"

// Service Item component - Mobile-optimiert
const ServiceItem = ({ title, description, benefits, details, case_study, icon }: { 
  title: string; 
  description: string; 
  benefits: string; 
  details: string[]; 
  case_study: string; 
  icon: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`py-6 md:py-8 border-t border-gray-100`}>
      <div className="flex flex-col md:flex-row md:items-start">
        <div className="w-full md:w-1/3 mb-3 md:mb-0">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#E6F4FA] flex items-center justify-center mr-3">
              {icon}
            </div>
            <h3 className="text-base md:text-lg font-medium">{title}</h3>
          </div>
          <p className="text-[#009FD8] text-xs md:text-sm font-medium mt-1.5 md:mt-2 md:ml-11">
            {benefits}
          </p>
        </div>
        
        <div className="w-full md:w-2/3">
          <p className="text-gray-600 mb-3 md:mb-4 text-sm">{description}</p>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[#009FD8] text-xs md:text-sm font-medium flex items-center gap-1 hover:underline mb-2 py-1"
          >
            {isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="pt-2">
              <h4 className="font-medium mb-2 text-xs md:text-sm">Qualifikationen:</h4>
              <ul className="grid grid-cols-1 gap-2">
                {details.map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8] mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-xs md:text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <h4 className="font-medium mb-1 text-xs md:text-sm">Erfolgsgeschichte:</h4>
                <p className="text-xs text-gray-700 italic">{case_study}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function LeiharbeitPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // For service cards
  const serviceIcons = [
    <Users key="users" className="w-4 h-4 md:w-5 md:h-5 text-[#009FD8]" />,
    <Briefcase key="briefcase" className="w-4 h-4 md:w-5 md:h-5 text-[#009FD8]" />,
    <Building2 key="building" className="w-4 h-4 md:w-5 md:h-5 text-[#009FD8]" />,
    <Hammer key="Hammer" className="w-4 h-4 md:w-5 md:h-5 text-[#009FD8]" />
  ];
  
  // For advantage cards
  const getAdvantageIcon = (iconName: string) => {
    switch(iconName) {
      case 'Zap': return <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8]" />;
      case 'Badge': return <BadgeCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8]" />;
      case 'Calendar': return <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8]" />;
      case 'FileText': return <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8]" />;
      case 'Shield': return <Shield className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8]" />;
      case 'CheckSquare': return <CheckSquare className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8]" />;
      default: return <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8]" />;
    }
  };

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
      {/* 1. HERO Section - Mobile-optimierte Vollbildansicht */}
      <Section 
        id="hero-section"
        className="min-h-[100svh] flex items-center justify-center relative overflow-hidden p-0"
      >
        {/* Fullscreen Hintergrundbild */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: "url('/images/leiharbeit/hero.jpg')"}} 
        />
        
        {/* Gradient-Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        <Container className="relative z-10">
          <div className="max-w-xl mx-auto">
            {/* Perfekt ausgerichteter, minimalistischer Hero-Content */}
            <div className="text-center flex flex-col items-center justify-center min-h-[85svh] px-5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-3 md:mb-4 text-white">
                {leiharbeitData.hero.title}
              </h1>
              
              <div className="text-xl sm:text-2xl md:text-3xl font-light text-white/90 mb-8 md:mb-12">
                {leiharbeitData.hero.subtitle}
              </div>
              
              <p className="text-base md:text-lg text-white/80 mb-8 md:mb-12 max-w-md">
                {leiharbeitData.hero.description}
              </p>
              
              {/* Call-to-Action Buttons - für Touch optimiert */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full max-w-md">
                <button 
                  onClick={scrollToContact}
                  className="flex-1 text-center bg-[#009FD8] text-white px-5 py-2.5 md:px-6 md:py-3 rounded-full hover:bg-[#007CAB] active:bg-[#006694] transition-colors text-sm font-medium"
                >
                  Jetzt Mitarbeiter finden
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
        
        {/* Scroll-Indikator - Positionierung für mobile Geräte optimiert */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60 animate-pulse">
          <p className="text-xs mb-1 md:mb-1.5">Mehr entdecken</p>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="md:w-5 md:h-5">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </div>
      </Section>
      
      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 2. ÜBER UNS Section - Für mobile Geräte optimiert */}
      <Section className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">ÜBER UNS</span>
              <H2 className="mt-2 mb-4 md:mb-6 text-2xl md:text-4xl">{leiharbeitData.about.title}</H2>
              <Paragraph className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                {leiharbeitData.about.description}
              </Paragraph>
              
              <div className="space-y-2.5 md:space-y-3 mt-6 md:mt-8">
                {leiharbeitData.about.checkpoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#009FD8] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-xs md:text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-64 sm:h-80 md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden">
              <Image
                src="/images/leiharbeit/about.jpg"
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

      {/* 3. SERVICE Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">LEISTUNG</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6">
              {leiharbeitData.service.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {leiharbeitData.service.description}
            </p>
          </div>
          
          {/* Service items - Mobile-optimiert */}
          <div className="max-w-4xl mx-auto">
            {leiharbeitData.service.categories.map((service, index) => (
              <ServiceItem
                key={index}
                title={service.title}
                description={service.description}
                benefits={service.benefits}
                details={service.details}
                case_study={service.case_study}
                icon={serviceIcons[index]}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 4. ABLAUF Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">ABLAUF</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6">
              {leiharbeitData.process.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {leiharbeitData.process.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {leiharbeitData.process.steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-[#009FD8]/20 text-[#009FD8] flex items-center justify-center font-medium text-xs md:text-sm mb-3 md:mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-sm md:text-base font-medium mb-1.5 md:mb-2">{step.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 md:mt-10 pt-4 md:pt-6 border-t border-gray-100">
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
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">RATGEBER</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3">
              Leiharbeits-Guide: Vorteile & rechtskonforme Nutzung
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              Unser umfassender Leiharbeits-Guide bietet Ihnen praktische Informationen und Best Practices für die erfolgreiche Integration von Leiharbeitern.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12 mb-10 md:mb-14">
              {/* Optimierte Bilddarstellung für mobile Geräte */}
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-full max-w-[200px] md:max-w-none aspect-square rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <Image 
                    src="/images/blog/leiharbeit.jpg"
                    alt="Leiharbeits-Guide"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 33vw"
                    priority
                  />
                </div>
              </div>
              
              <div className="w-full md:w-2/3 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-medium mb-3 text-[#222425]">
                  Leiharbeits-Guide: Rechtliches & Integration
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  Leiharbeit bietet Unternehmen wertvolle Flexibilität, erfordert aber auch besondere Aufmerksamkeit bei rechtlichen und organisatorischen Aspekten. Unser Guide behandelt alle wichtigen Themen vom Arbeitnehmerüberlassungsgesetz bis hin zu bewährten Methoden für die erfolgreiche Integration.
                </p>
                
                <Link href="/blog/LeiharbeitGuide?tab=rechtliches" className="inline-flex items-center group">
                  <span className="text-[#009FD8] text-xs md:text-sm font-medium group-hover:underline">
                    Rechtliche Grundlagen und praktische Tipps
                  </span>
                  <ArrowRight className="ml-1.5 w-3 h-3 md:w-3.5 md:h-3.5 text-[#009FD8] group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Themen im Card-Layout für bessere mobile Touch-Bedienung */}
            <div className="border-t border-gray-100 pt-8 md:pt-10">
              <h4 className="text-sm md:text-base font-medium mb-5 md:mb-8 text-center">Themenübersicht</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#009FD8] flex-shrink-0 mr-3">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">Rechtliche Grundlagen</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Erklärung des Arbeitnehmerüberlassungsgesetzes, Equal Pay und aktuelle Änderungen.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#009FD8] flex-shrink-0 mr-3">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">Integration & Prozess</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Praxisnahe Anleitung für erfolgreiche Integration und optimalen Prozessablauf.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start bg-gray-50 p-4 rounded-xl">
                  <div className="text-[#009FD8] flex-shrink-0 mr-3">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs md:text-sm font-medium mb-1.5">Vorteile & Best Practices</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Strategien zur Maximierung der Vorteile und bewährte Methoden für die Zusammenarbeit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Optimierte Buttons für mobile Bedienung */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/blog/LeiharbeitGuide" className="w-full sm:w-auto">
                <button className="w-full px-4 py-2.5 md:px-5 md:py-2.5 bg-[#009FD8] text-white rounded-full text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[#007CAB] active:bg-[#006694] active:transform active:translate-y-0.5">
                  <FileText className="w-3.5 h-3.5" />
                  Kompletten Guide lesen
                </button>
              </Link>
              <button 
                onClick={scrollToContact} 
                className="w-full sm:w-auto px-4 py-2.5 md:px-5 md:py-2.5 border border-[#009FD8] text-[#009FD8] rounded-full text-xs md:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[#EAF7FC] active:bg-[#D5F0FA] active:transform active:translate-y-0.5"
              >
                <Users className="w-3.5 h-3.5" />
                Leiharbeiter anfragen
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* 6. VORTEILE Section - Mobile-optimiert */}
      <Section className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">UNSERE VORTEILE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6">
              {leiharbeitData.advantages.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {leiharbeitData.advantages.description}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {leiharbeitData.advantages.items.map((item, i) => (
                <div key={i} className={`${i > 0 ? 'pt-4 md:pt-6 border-t border-gray-100' : ''}`}>
                  <div className="flex items-start">
                    <div className="text-[#009FD8] flex-shrink-0 mr-2.5 md:mr-3 mt-0.5">
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
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">HERAUSFORDERUNGEN</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6">
              {leiharbeitData.challenges.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {leiharbeitData.challenges.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {leiharbeitData.challenges.items.map((item, i) => (
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
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">FAQ</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6">
              {leiharbeitData.faq.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {leiharbeitData.faq.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {leiharbeitData.faq.questions.map((faq, index) => (
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
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">KONTAKT</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6">
              {leiharbeitData.kontakt.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {leiharbeitData.kontakt.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeiharbeitWizard />
          </div>
        </Container>
      </Section>

      {/* 10. Call-to-Action - Mobile-optimiert */}
      <Section className="py-12 md:py-16 bg-gradient-to-r from-[#009FD8] to-[#007CAB] text-white">
        <Container className="px-5 md:px-0">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-medium mb-2 md:mb-3">{leiharbeitData.kontakt.cta.title}</h2>
            <p className="mb-6 md:mb-8 text-white/90 text-xs md:text-sm max-w-sm mx-auto">
              {leiharbeitData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-4 py-2.5 md:px-5 md:py-2.5 bg-white text-[#009FD8] hover:bg-gray-100 active:bg-gray-200 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                {leiharbeitData.kontakt.cta.button}
                <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </button>
              <a 
                href="tel:+4923115044352"
                className="px-4 py-2.5 md:px-5 md:py-2.5 border border-white/30 hover:bg-white/10 active:bg-white/20 rounded-full text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Phone className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {leiharbeitData.kontakt.cta.call}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
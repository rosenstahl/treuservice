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
import winterserviceData from "@/i18n/de/winterservice.json"
import {
  StarIcon,
  LeafIcon,
  Clock as ClockIcon,
  Zap,
  Cog,
  CheckCircle2,
  ClipboardCheck,
  Leaf,
  XCircle,
  Shovel,
  ArrowRight,
  CheckCircle,
  FileText,
  Phone,
  ClipboardList,
  Calculator,
  Truck,
  Popsicle,
  Shield
} from "lucide-react"

// Weather Components
import WeatherHero from '@/components/weather/WeatherHero'

// Booking Assistant
import WinterdienstWizard from '@/components/contact/winter/WinterdienstWizard'

export default function WinterservicePage() {
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
      {/* HERO Section mit WeatherHero - Mobile optimiert */}
      <Section className="relative min-h-[100svh] flex items-center p-0">
        <WeatherHero scrollToContact={scrollToContact} />
      </Section>
      
      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* ÜBER UNS Section - Mobile optimiert */}
      <Section className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">ÜBER UNS</span>
              <H2 className="mt-2 mb-4 md:mb-6 text-2xl md:text-4xl tracking-tight">{winterserviceData.about.title}</H2>
              <Paragraph className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">
                {winterserviceData.about.description}
              </Paragraph>
              
              <div className="space-y-2 md:space-y-3 mt-6 md:mt-8">
                {winterserviceData.about.checkpoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#009FD8] flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-xs md:text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* position:relative hinzugefügt */}
            <div className="relative h-64 md:h-[400px] rounded-xl md:rounded-2xl overflow-hidden mt-6 md:mt-0">
              <Image
                src="/images/winterdienst/winter-service-5.jpg"
                fill
                className="object-cover"
                alt="TREU Service Winterdienst Team"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* BASISLEISTUNGEN Section - Mobile optimiert */}
      <Section className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">BASISLEISTUNGEN</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {winterserviceData.basisleistungen.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {winterserviceData.basisleistungen.subtitle}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {winterserviceData.basisleistungen.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 md:gap-4 bg-gray-50 p-3 md:p-4 rounded-xl">
                  <div className="p-1.5 md:p-2 rounded-full bg-[#E6F4FA] text-[#009FD8] flex-shrink-0 mt-0.5">
                    {i === 0 && <Shovel className="w-4 h-4 md:w-5 md:h-5" />}
                    {i === 1 && <Popsicle className="w-4 h-4 md:w-5 md:h-5" />}
                    {i === 2 && <Leaf className="w-4 h-4 md:w-5 md:h-5" />}
                    {i === 3 && <Truck className="w-4 h-4 md:w-5 md:h-5" />}
                    {i === 4 && <ClipboardCheck className="w-4 h-4 md:w-5 md:h-5" />}
                  </div>
                  <p className="text-gray-700 text-xs md:text-sm">{item}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 md:mt-10 pt-4 md:pt-6 border-t border-gray-100">
              <button 
                onClick={scrollToContact}
                className="px-4 py-2.5 md:px-5 md:py-2.5 bg-[#009FD8] text-white rounded-full text-xs md:text-sm font-medium transition-all duration-200 inline-flex items-center justify-center gap-1.5 hover:bg-[#007CAB] active:bg-[#006694] active:transform active:translate-y-0.5"
              >
                Beratungsgespräch vereinbaren
                <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* ABLAUF Section - Mobile optimiert */}
      <Section className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">ABLAUF</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {winterserviceData.process.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {winterserviceData.process.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {winterserviceData.process.steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border border-[#009FD8]/20 text-[#009FD8] flex items-center justify-center font-medium text-sm mb-3 md:mb-4">
                    {index + 1}
                  </div>
                  <h3 className="text-sm md:text-base font-medium mb-2">{step.title}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8 md:mt-10 pt-4 md:pt-6 border-t border-gray-100">
              <button 
                onClick={scrollToContact}
                className="px-4 py-2.5 md:px-5 md:py-2.5 bg-[#009FD8] text-white rounded-full text-xs md:text-sm font-medium transition-all duration-200 inline-flex items-center justify-center gap-1.5 hover:bg-[#007CAB] active:bg-[#006694] active:transform active:translate-y-0.5"
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

      {/* FACHLICHER RATGEBER Section - Mobile optimiert */}
      <Section className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">RATGEBER</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 tracking-tight">
              Unsere Winterdienst-Expertisen
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              Fundierte Entscheidungshilfen und praktische Tools für optimalen Winterdienst.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Räumpflicht-Guide - Mobile-optimierte Version */}
              <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                {/* position:relative hinzugefügt */}
                <div className="relative w-full h-48 md:h-auto md:aspect-video overflow-hidden">
                  <Image 
                    src="/images/blog/raeumpflicht.jpg"
                    alt="Räumpflicht Guide 2025"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3">Der ultimative Räumpflicht-Guide 2025</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3 md:line-clamp-none">
                    Was Hausbesitzer und Vermieter in Deutschland jetzt über Räum- und Streupflichten wissen müssen - mit interaktivem Pflicht-Checker und aktuellen Gerichtsurteilen.
                  </p>
                  
                  <Link href="/blog/RaeumpflichtGuide2025" className="inline-flex items-center group">
                    <span className="text-[#009FD8] text-xs md:text-sm font-medium group-hover:underline">
                      Alles zu Räum- und Streupflichten
                    </span>
                    <ArrowRight className="ml-1.5 w-3 h-3 md:w-3.5 md:h-3.5 text-[#009FD8] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
              
              {/* DIY vs. Professionell - Mobile-optimierte Version */}
              <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                {/* position:relative hinzugefügt */}
                <div className="relative w-full h-48 md:h-auto md:aspect-video overflow-hidden">
                  <Image 
                    src="/images/blog/winteer.jpg"
                    alt="DIY vs. Professionell Vergleich"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-medium mb-2 md:mb-3">Winterdienst: DIY vs. Professionell - Was lohnt sich?</h3>
                  <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-3 md:line-clamp-none">
                    Berechnen Sie die Kosten für professionellen Winterdienst im Vergleich zur Eigenleistung mit unserem interaktiven Rechner.
                  </p>
                  
                  <Link href="/blog/WinterdienstKostenrechner" className="inline-flex items-center group">
                    <span className="text-[#009FD8] text-xs md:text-sm font-medium group-hover:underline">
                      Kostenvergleich berechnen
                    </span>
                    <Calculator className="ml-1.5 w-3 h-3 md:w-3.5 md:h-3.5 text-[#009FD8]" />
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Dezenter Hinweis auf den Streumittel Vergleich - Optimiert für Mobile */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100 text-center">
              <Link 
                href="/blog/StreumittelRechnerundVergleich" 
                className="inline-block px-4 py-2.5 md:px-5 md:py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-xs md:text-sm text-gray-700 font-medium transition-all"
              >
                <span className="flex items-center justify-center gap-1.5">
                  <Shovel className="w-3.5 h-3.5 text-[#009FD8]" />
                  Streumittel-Vergleich 2025 mit Bedarfsrechner
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trennlinie */}
      <Separator className="h-px bg-gray-100" />

      {/* VORTEILE Section - Mobile optimiert */}
      <Section className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">UNSERE VORTEILE</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {winterserviceData.advantages.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {winterserviceData.advantages.description}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 gap-4 md:gap-6">
              {winterserviceData.advantages.items.map((item, i) => (
                <div key={i} className={`${i > 0 ? 'pt-4 md:pt-6 border-t border-gray-100' : ''}`}>
                  <div className="flex items-start">
                    <div className="text-[#009FD8] flex-shrink-0 mr-3 mt-0.5">
                      {item.icon === "Star" && <StarIcon className="w-4 h-4" />}
                      {item.icon === "Zap" && <Zap className="w-4 h-4" />}
                      {item.icon === "Clock" && <ClockIcon className="w-4 h-4" />}
                      {item.icon === "Cog" && <Cog className="w-4 h-4" />}
                      {item.icon === "Leaf" && <LeafIcon className="w-4 h-4" />}
                      {item.icon === "FileText" && <FileText className="w-4 h-4" />}
                      {item.icon === "Shield" && <Shield className="w-4 h-4" />}
                      {item.icon === "ClipboardList" && <ClipboardList className="w-4 h-4" />}
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-medium mb-1.5">{item.title}</h3>
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

      {/* HERAUSFORDERUNGEN Section - Mobile optimiert */}
      <Section className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">HERAUSFORDERUNGEN</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {winterserviceData.challenges.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {winterserviceData.challenges.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {winterserviceData.challenges.items.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`problem-${i}`}
                  className="border-0 py-1"
                >
                  <AccordionTrigger className="py-2.5 md:py-3 hover:no-underline text-left">
                    <div className="flex items-center text-left">
                      <div className="p-0.5 rounded-full text-red-500 mr-2.5">
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
                        <div className="p-0.5 rounded-full text-green-500 mr-2.5 flex-shrink-0 h-fit">
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

      {/* FAQ Section - Mobile optimiert */}
      <Section className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">FAQ</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {winterserviceData.faq.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {winterserviceData.faq.description}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
              {winterserviceData.faq.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-0 py-1"
                >
                  <AccordionTrigger className="py-2.5 md:py-3 hover:no-underline text-left">
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

      {/* Kontaktformular - Mobile optimiert */}
      <Section id="kontakt" className="py-14 md:py-20">
        <Container className="px-5 md:px-0">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">KONTAKT</span>
            <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
              {winterserviceData.kontakt.title}
            </h2>
            <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto">
              {winterserviceData.kontakt.subtitle}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <WinterdienstWizard />
          </div>
        </Container>
      </Section>

      {/* Call-to-Action - Mobile optimiert */}
      <Section className="py-12 md:py-16 bg-gradient-to-r from-[#009FD8] to-[#007CAB] text-white">
        <Container className="px-5 md:px-0">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-xl md:text-2xl font-medium mb-2 md:mb-3">{winterserviceData.kontakt.cta.title}</h2>
            <p className="mb-6 md:mb-8 text-white/90 text-xs md:text-sm max-w-sm mx-auto">
              {winterserviceData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-4 py-2.5 md:px-5 md:py-2.5 bg-white text-[#009FD8] hover:bg-gray-100 active:bg-gray-200 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-all active:transform active:translate-y-0.5"
              >
                {winterserviceData.kontakt.cta.button}
                <ArrowRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </button>
              <a 
                href="tel:+4923115044352"
                className="px-4 py-2.5 md:px-5 md:py-2.5 border border-white/30 hover:bg-white/10 active:bg-white/20 rounded-full text-xs font-medium flex items-center justify-center gap-1.5 transition-all active:transform active:translate-y-0.5"
              >
                <Phone className="h-3 w-3 md:h-3.5 md:w-3.5" />
                {winterserviceData.kontakt.cta.call}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
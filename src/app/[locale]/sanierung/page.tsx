"use client"

import React, { useState } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H2, Paragraph } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import SanierungWizard from "@/components/contact/sanierung/SanierungWizard"
import sanierungData from "@/i18n/de/sanierung.json"
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Clock,
  PhoneCall,
  Shield,
  Flame,
  Droplet,
  Bug,
  FileCheck,
  AlertTriangle,
  Zap,
  BookOpen,
  ChevronRight,
  Sparkles,
  HandshakeIcon,
  HeadphonesIcon,
  ClipboardCheck,
  MessageSquare
} from "lucide-react"

// Erweitern der Typen für sanierungData
type ExtendedSanierungData = typeof sanierungData

export default function SanierungPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  const toggleFAQ = (index: number) => {
    if (expandedFAQ === index) {
      setExpandedFAQ(null)
    } else {
      setExpandedFAQ(index)
    }
  }

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <Section className="bg-white pt-24 md:pt-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#222425]">
                {sanierungData.hero.title}
              </h1>
              <div className="text-xl md:text-2xl font-medium text-[#009FD8] mb-6">
                {sanierungData.hero.subtitle}
              </div>
              <Paragraph className="text-lg text-gray-600 mb-8 max-w-xl">
                {sanierungData.hero.description}
              </Paragraph>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToContact}
                  className="px-6 py-3 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
                >
                  {sanierungData.hero.cta}
                </button>
                <a 
                  href="tel:+491234567890"
                  className="px-6 py-3 border border-gray-300 hover:border-[#009FD8] rounded-lg font-medium transition-all flex items-center justify-center text-[#222425]"
                >
                  <PhoneCall className="mr-2 h-5 w-5" />
                  {sanierungData.hero.ctaCall}
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/sanierung/hero.jpg"
                alt="Professionelle Sanierung"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Qualitätsversprechen - mit korrigierten Icons und angepasster Kartenstruktur */}
      <Section className="bg-[#F8FAFC] py-16">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">UNSERE VERSPRECHEN</Badge>
            <H2 className="text-[#222425]">{sanierungData.qualitaetsversprechen.title}</H2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Karten-Größe angepasst - 3 Karten pro Zeile statt 6 für bessere Passform */}
            <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-[#009FD8] h-full">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-[#009FD8]">
                    <HeadphonesIcon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#222425]">{sanierungData.qualitaetsversprechen.items[0]}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-[#009FD8] h-full">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-[#009FD8]">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#222425]">{sanierungData.qualitaetsversprechen.items[1]}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-[#009FD8] h-full">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-[#009FD8]">
                    <ClipboardCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#222425]">{sanierungData.qualitaetsversprechen.items[2]}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-[#009FD8] h-full">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-[#009FD8]">
                    <Shield className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#222425]">{sanierungData.qualitaetsversprechen.items[3]}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-[#009FD8] h-full">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-[#009FD8]">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#222425]">{sanierungData.qualitaetsversprechen.items[4]}</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-[#009FD8] h-full">
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-[#009FD8]">
                    <FileCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#222425]">{sanierungData.qualitaetsversprechen.items[5]}</h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Intro/Basisleistungen */}
      <Section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">ÜBER UNS</Badge>
              <H2 className="mb-6 text-[#222425]">{sanierungData.basisleistungen.title}</H2>
              <Paragraph className="text-gray-600 text-lg">
                {sanierungData.basisleistungen.note}
              </Paragraph>
              <div className="mt-8 space-y-4">
                {sanierungData.basisleistungen.items.map((item, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <CheckCircle className="h-5 w-5 mr-3 text-[#009FD8]" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={scrollToContact}
                className="mt-8 px-6 py-3 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-lg font-medium transition-all duration-200 shadow-sm inline-flex items-center"
              >
                Kostenlose Beratung
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/sanierung/basis.jpg"
                alt="Professionelle Sanierung"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Leistungen - mit farblich angepassten Cards */}
      <Section className="bg-[#F8FAFC] py-16">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">SERVICE</Badge>
            <H2 className="mb-4 text-[#222425]">{sanierungData.spezialisierteLoesungen.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              Unsere spezialisierten Sanierungsleistungen decken alle Arten von Schäden ab - von Brand über Wasser bis hin zu Schimmelbefall.
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Brandschadensanierung - Rot */}
            <Card className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
              <div className="p-1 bg-[#EF4444]">
                <div className="py-3 px-4 flex items-center gap-3">
                  <Flame className="w-5 h-5 text-white" />
                  <h3 className="text-white font-medium">{sanierungData.spezialisierteLoesungen.services[0].title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-5 text-sm">{sanierungData.spezialisierteLoesungen.services[0].description}</p>
                <h4 className="font-medium text-[#222425] mb-3">Leistungen:</h4>
                <ul className="space-y-3">
                  {sanierungData.spezialisierteLoesungen.services[0].leistungen.slice(0, 5).map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-[#EF4444] mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 text-center">
                  <button 
                    onClick={scrollToContact}
                    className="px-6 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm inline-flex items-center"
                  >
                    Angebot anfordern
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Wasserschadensanierung - Blau */}
            <Card className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
              <div className="p-1 bg-[#009FD8]">
                <div className="py-3 px-4 flex items-center gap-3">
                  <Droplet className="w-5 h-5 text-white" />
                  <h3 className="text-white font-medium">{sanierungData.spezialisierteLoesungen.services[1].title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-5 text-sm">{sanierungData.spezialisierteLoesungen.services[1].description}</p>
                <h4 className="font-medium text-[#222425] mb-3">Leistungen:</h4>
                <ul className="space-y-3">
                  {sanierungData.spezialisierteLoesungen.services[1].leistungen.slice(0, 5).map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-[#009FD8] mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 text-center">
                  <button 
                    onClick={scrollToContact}
                    className="px-6 py-2 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm inline-flex items-center"
                  >
                    Angebot anfordern
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Schimmelpilzsanierung - Grün */}
            <Card className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
              <div className="p-1 bg-[#10B981]">
                <div className="py-3 px-4 flex items-center gap-3">
                  <Bug className="w-5 h-5 text-white" />
                  <h3 className="text-white font-medium">{sanierungData.spezialisierteLoesungen.services[2].title}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-5 text-sm">{sanierungData.spezialisierteLoesungen.services[2].description}</p>
                <h4 className="font-medium text-[#222425] mb-3">Leistungen:</h4>
                <ul className="space-y-3">
                  {sanierungData.spezialisierteLoesungen.services[2].leistungen.slice(0, 5).map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-[#10B981] mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 text-center">
                  <button 
                    onClick={scrollToContact}
                    className="px-6 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-sm inline-flex items-center"
                  >
                    Angebot anfordern
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>


      {/* Schadensprävention Blog-Link - mit korrigiertem Link */}
      <Section className="bg-[#F8FAFC] py-16">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">RATGEBER</Badge>
            <H2 className="mb-4 text-[#222425]">{sanierungData.praevention.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {sanierungData.praevention.subtitle}
            </Paragraph>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-32 h-32 bg-[#F8FAFC] rounded-full flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-[#009FD8]" />
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-semibold mb-4 text-[#222425]">Vorbeugen ist besser als Sanieren</h3>
                <Paragraph className="mb-6">
                  {sanierungData.praevention.ratgeberText}
                </Paragraph>
                
                <Link href="/blog/SanierungPraevention" className="inline-flex items-center group">
                  <span className="mr-2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#E6F4FA] group-hover:bg-[#C5E8F7] transition-colors">
                    <AlertTriangle className="w-5 h-5 text-[#009FD8]" />
                  </span>
                  <span className="text-[#009FD8] font-medium group-hover:underline">
                    {sanierungData.praevention.ratgeberLinkText}
                  </span>
                  <ChevronRight className="ml-2 w-4 h-4 text-[#009FD8] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            
            {/* Preview der Themen */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FEF2F2] rounded-lg p-4 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Flame className="w-4 h-4 text-red-500" />
                    </div>
                    <h3 className="text-base font-medium">{sanierungData.praevention.praventionsthemen[0].title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 flex-grow">
                    {sanierungData.praevention.praventionsthemen[0].description}
                  </p>
                </div>
                
                <div className="bg-[#EFF6FF] rounded-lg p-4 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Droplet className="w-4 h-4 text-blue-500" />
                    </div>
                    <h3 className="text-base font-medium">{sanierungData.praevention.praventionsthemen[1].title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 flex-grow">
                    {sanierungData.praevention.praventionsthemen[1].description}
                  </p>
                </div>
                
                <div className="bg-[#ECFDF5] rounded-lg p-4 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Bug className="w-4 h-4 text-green-600" />
                    </div>
                    <h3 className="text-base font-medium">{sanierungData.praevention.praventionsthemen[2].title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 flex-grow">
                    {sanierungData.praevention.praventionsthemen[2].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Warum TREU Service - mit korrigierten Icons */}
      <Section className="bg-white py-16">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">VORTEILE</Badge>
            <H2 className="mb-4 text-[#222425]">{sanierungData.warumTreuService.title}</H2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sanierungData.warumTreuService.items.map((item, index) => {
              const [title, description] = item.split(": ")
              return (
                <Card key={index} className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
                  <CardContent className="p-6">
                    <div className="flex flex-col h-full">
                      <div className="mb-4 text-[#009FD8]">
                        {index === 0 && <ClipboardCheck className="h-8 w-8" />} {/* Erfahrung und Expertise */}
                        {index === 1 && <Sparkles className="h-8 w-8" />} {/* Individuelle Lösungen */}
                        {index === 2 && <MessageSquare className="h-8 w-8" />} {/* Transparente Kommunikation */}
                        {index === 3 && <Shield className="h-8 w-8" />} {/* Umweltfreundliche Verfahren */}
                        {index === 4 && <Clock className="h-8 w-8" />} {/* Rund-um-die-Uhr-Service */}
                        {index === 5 && <HandshakeIcon className="h-8 w-8" />} {/* Versicherungsexpertise */}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-[#222425]">{title}</h3>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="bg-[#F8FAFC] py-16">
        <Container size="small">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">FAQ</Badge>
            <H2 className="mb-4 text-[#222425]">{sanierungData.faq.title}</H2>
          </div>
          <div className="max-w-3xl mx-auto">
            {sanierungData.faq.questions.map((faq, index) => (
              <div 
                key={index} 
                className="mb-4 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-[#222425]">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-[#009FD8] transition-transform ${expandedFAQ === index ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                <div 
                  className={`px-6 py-4 border-t border-gray-100 transition-all duration-300 ${
                    expandedFAQ === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Kontaktformular */}
      <Section id="kontakt" className="bg-white py-16">
        <Container size="small">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">KONTAKT</Badge>
            <H2 className="mb-4 text-[#222425]">{sanierungData.kontakt.form.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {sanierungData.kontakt.form.subtitle}
            </Paragraph>
          </div>
          <SanierungWizard />
        </Container>
      </Section>

      {/* Call-to-Action */}
      <Section className="bg-[#009FD8] text-white py-10">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{sanierungData.kontakt.cta.title}</h2>
            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              {sanierungData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-[#009FD8] hover:bg-gray-100 rounded-lg font-medium transition-all shadow-sm"
              >
                {sanierungData.kontakt.cta.button}
              </button>
              <a 
                href="tel:+491234567890"
                className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                <PhoneCall className="mr-2 h-5 w-5" />
                {sanierungData.kontakt.cta.call}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
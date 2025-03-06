"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H2, Paragraph } from "@/components/ui/typography"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import EntruempelungWizard from "@/components/contact/entruempelung/EntruempelungWizard"
import entruempelungData from "@/i18n/de/entruempelung.json"
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  CircleDollarSign,
  Clock,
  PhoneCall,
  RecycleIcon,
  Sparkles,
  Shield,
  Truck
} from "lucide-react"

// Erweitern der Typen für entruempelungData basierend auf der JSON-Struktur
type ExtendedEntruempelungData = typeof entruempelungData & {
  testimonials?: {
    title: string;
    items: Array<{
      text: string;
      author: string;
      location: string;
    }>;
  };
  preise?: {
    title: string;
    description: string;
    examples: Array<{
      type: string;
      price: string;
      details: string;
    }>;
    note: string;
  };
};

export default function EntruempelungPage() {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0)
  const [expandedFAQ, setExpandedFAQ] = React.useState<number | null>(null)
  const data = entruempelungData as ExtendedEntruempelungData

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
                {entruempelungData.hero.title}
              </h1>
              <div className="text-xl md:text-2xl font-medium text-[#009FD8] mb-6">
                {entruempelungData.hero.subtitle}
              </div>
              <Paragraph className="text-lg text-gray-600 mb-8 max-w-xl">
                {entruempelungData.hero.description}
              </Paragraph>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToContact}
                  className="px-6 py-3 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-lg font-medium transition-all duration-200 shadow-sm"
                >
                  {entruempelungData.hero.cta}
                </button>
                <a 
                  href="tel:+491234567890"
                  className="px-6 py-3 border border-gray-300 hover:border-[#009FD8] rounded-lg font-medium transition-all flex items-center justify-center text-[#222425]"
                >
                  <PhoneCall className="mr-2 h-5 w-5" />
                  {entruempelungData.hero.ctaCall}
                </a>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/entruempelung/hero.jpg"
                alt="Professionelle Entrümpelung"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Vorteile - visuell hervorgehoben */}
      <Section className="bg-[#F8FAFC] py-16">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">UNSERE VERSPRECHEN</Badge>
            <H2 className="text-[#222425]">{entruempelungData.versprechen.title}</H2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {entruempelungData.versprechen.items.map((item, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-[#009FD8] h-full">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-[#009FD8]">
                      {index === 0 && <CircleDollarSign className="h-8 w-8" />}
                      {index === 1 && <Clock className="h-8 w-8" />}
                      {index === 2 && <RecycleIcon className="h-8 w-8" />}
                      {index === 3 && <Sparkles className="h-8 w-8" />}
                      {index === 4 && <Shield className="h-8 w-8" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-[#222425]">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Intro */}
      <Section className="bg-white py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-xl">
              <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">ÜBER UNS</Badge>
              <H2 className="mb-6 text-[#222425]">{entruempelungData.intro.title}</H2>
              <Paragraph className="text-gray-600 text-lg">
                {entruempelungData.intro.description}
              </Paragraph>
              <div className="mt-8 flex flex-wrap gap-3">
                {entruempelungData.vorteile.items.slice(0, 3).map((item, index) => (
                  <div key={index} className="flex items-center text-gray-700 text-sm">
                    <CheckCircle className="h-4 w-4 mr-2 text-[#009FD8]" />
                    <span>{item}</span>
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
                src="/images/entruempelung/trust.jpg"
                alt="Vertrauensvolle Entrümpelung"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Leistungen */}
      <Section className="bg-[#F8FAFC] py-16">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">SERVICE</Badge>
            <H2 className="mb-4 text-[#222425]">{entruempelungData.leistungen.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entruempelungData.leistungen.description}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {entruempelungData.leistungen.services.map((service, index) => (
              <Card key={index} className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0">
                <div className="p-1 bg-[#009FD8]">
                  <div className="py-3 px-4 flex items-center gap-3">
                    {index === 0 ? (
                      <Truck className="w-5 h-5 text-white" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-white" />
                    )}
                    <h3 className="text-white font-medium">{service.category}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-[#009FD8] mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Preisbeispiele */}
      {data.preise && (
        <Section className="bg-white py-16">
          <Container size="small">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">PREISE</Badge>
              <H2 className="mb-4 text-[#222425]">{data.preise.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {data.preise.description}
              </Paragraph>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.preise.examples.map((example: {type: string; price: string; details: string}, index: number) => (
                <Card key={index} className="shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden text-center border-0">
                  <CardContent className="p-6">
                    <div className="mb-3 p-3 rounded-full bg-[#F8FAFC] inline-block">
                      <CircleDollarSign className="h-8 w-8 text-[#009FD8]" />
                    </div>
                    <h3 className="text-xl font-medium text-[#222425]">{example.type}</h3>
                    <p className="text-2xl font-bold text-[#009FD8] my-3">{example.price}</p>
                    <p className="text-sm text-gray-500">{example.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 text-center mt-6">
              {data.preise.note}
            </p>
          </Container>
        </Section>
      )}

      {/* Ablauf */}
      <Section className="bg-[#F8FAFC] py-16">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">ABLAUF</Badge>
            <H2 className="mb-4 text-[#222425]">{entruempelungData.arbeitsweise.title}</H2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-5 top-0 h-full w-0.5 bg-[#009FD8]/30 z-0 hidden md:block"></div>
              {entruempelungData.arbeitsweise.steps.map((step, index) => (
                <div key={index} className="relative z-10 flex flex-col md:flex-row mb-10 items-start">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#009FD8] text-white flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="md:ml-8 mt-4 md:mt-0">
                    <h3 className="text-xl font-semibold text-[#222425] mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-lg font-medium transition-all duration-200 shadow-sm inline-flex items-center"
              >
                Jetzt kostenlos anfragen
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      {data.testimonials && (
        <Section className="bg-white py-16">
          <Container size="small">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">ERFAHRUNGEN</Badge>
              <H2 className="mb-4 text-[#222425]">{data.testimonials.title}</H2>
            </div>
            
            <div className="max-w-3xl mx-auto relative">
              <div className="bg-[#F8FAFC] rounded-2xl p-8 shadow-sm relative">
                <div className="text-4xl text-[#009FD8]/20 font-serif absolute top-4 left-4">&ldquo;</div>
                <div className="relative">
                  {data.testimonials.items.map((testimonial: {text: string; author: string; location: string}, index: number) => (
                    <div 
                      key={index}
                      className={`transition-opacity duration-500 ${activeTestimonial === index ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}
                    >
                      <p className="text-gray-700 text-lg italic mb-6">{testimonial.text}</p>
                      <div className="flex items-center">
                        <div className="bg-[#009FD8] h-10 w-10 rounded-full flex items-center justify-center text-white font-bold">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-[#222425]">{testimonial.author}</p>
                          <p className="text-sm text-gray-500">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center mt-6 gap-2">
                {data.testimonials.items.map((_: any, index: number) => (
                  <button 
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 rounded-full transition-all ${activeTestimonial === index ? 'w-8 bg-[#009FD8]' : 'w-2 bg-gray-300'}`}
                    aria-label={`Testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      <Section className="bg-[#F8FAFC] py-16">
        <Container size="small">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">FAQ</Badge>
            <H2 className="mb-4 text-[#222425]">{entruempelungData.faq.title}</H2>
          </div>
          <div className="max-w-3xl mx-auto">
            {entruempelungData.faq.questions.map((faq, index) => (
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
            <H2 className="mb-4 text-[#222425]">{entruempelungData.kontakt.formTitle}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {entruempelungData.kontakt.formSubtitle}
            </Paragraph>
          </div>
          <EntruempelungWizard />
        </Container>
      </Section>

      {/* Call-to-Action */}
      <Section className="bg-[#009FD8] text-white py-10">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{entruempelungData.kontakt.description}</h2>
            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              {entruempelungData.kontakt.cta}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-[#009FD8] hover:bg-gray-100 rounded-lg font-medium transition-all shadow-sm"
              >
                {entruempelungData.kontakt.ctaButton}
              </button>
              <a 
                href="tel:+491234567890"
                className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                <PhoneCall className="mr-2 h-5 w-5" />
                {entruempelungData.kontakt.ctaCall}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
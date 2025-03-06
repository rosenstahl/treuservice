"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import LeiharbeitWizard from "@/components/contact/leiharbeit/LeiharbeitWizard"
import leiharbeitData from "@/i18n/de/leiharbeit.json"
import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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

// Service Card Component for the Services Section
interface ServiceCardProps {
  title: string;
  description: string;
  benefits: string;
  details: string[];
  case_study: string;
  icon: React.ReactNode;
}

const ServiceCard = ({ title, description, benefits, details, case_study, icon }: ServiceCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-[#009FD8]/10 hover:border-[#009FD8]/30
        ${isExpanded ? 'scale-100' : 'hover:translate-y-[-4px]'}`}
      data-service-name={title.toLowerCase().replace(/\s+/g, '-')}
    >
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-full bg-[#009FD8]/10 text-[#009FD8]">
            {icon}
          </div>
          <h3 className="text-lg font-bold">{title}</h3>
        </div>
        
        <p className="text-foreground/80 mb-2 text-sm">{description}</p>
        <p className="text-[#009FD8] font-medium mb-3 text-sm">{benefits}</p>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[#009FD8] text-sm font-medium flex items-center gap-1 hover:underline"
        >
          {isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        
        {isExpanded && (
          <div className="mt-3 space-y-3 border-t pt-3 border-[#009FD8]/10 animate-fadeIn">
            <div>
              <h4 className="font-medium mb-2 text-sm">Qualifikationen:</h4>
              <ul className="space-y-1">
                {details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="nmt-3 pt-3 border-t border-[#009FD8]/5">
              <h4 className="font-medium mb-1 text-sm">Erfolgsgeschichte:</h4>
              <p className="text-xs text-foreground/80 italic">{case_study}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Process Step Component - Compact Version
const ProcessStep = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#009FD8] text-white flex items-center justify-center font-bold text-sm">
      {number}
    </div>
    <div>
      <h3 className="text-base font-semibold mb-1">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
  </div>
);

// Challenge Card Component - Simplified
const ChallengeCard = ({ problem, issue, solution }: { problem: string; issue: string; solution: string }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
    <div className="flex items-start gap-3 mb-3">
      <div className="p-1.5 rounded-full bg-red-50 text-red-500 mt-1 flex-shrink-0">
        <XCircle className="w-4 h-4" />
      </div>
      <div>
        <h3 className="text-base font-semibold">{problem}</h3>
        <p className="text-red-500 mt-1 text-sm">{issue}</p>
      </div>
    </div>
    
    <div className="flex items-start gap-3 pl-10">
      <div className="p-1.5 rounded-full bg-green-50 text-green-500 flex-shrink-0">
        <CheckCircle2 className="w-4 h-4" />
      </div>
      <p className="text-green-700 text-sm">{solution}</p>
    </div>
  </div>
);

export default function LeiharbeitPage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // For service cards
  const serviceIcons = [
    <Users key="users" className="w-4 h-4" />,
    <Briefcase key="briefcase" className="w-4 h-4" />,
    <Building2 key="building" className="w-4 h-4" />,
    <Hammer key="Hammer" className="w-4 h-4" />
  ];
  
  // For advantage cards
  const getAdvantageIcon = (iconName: string) => {
    switch(iconName) {
      case 'Zap': return <Zap className="w-4 h-4 text-[#009FD8]" />;
      case 'Badge': return <BadgeCheck className="w-4 h-4 text-[#009FD8]" />;
      case 'Calendar': return <Calendar className="w-4 h-4 text-[#009FD8]" />;
      case 'FileText': return <FileText className="w-4 h-4 text-[#009FD8]" />;
      case 'Shield': return <Shield className="w-4 h-4 text-[#009FD8]" />;
      case 'CheckSquare': return <CheckSquare className="w-4 h-4 text-[#009FD8]" />;
      default: return <CheckCircle className="w-4 h-4 text-[#009FD8]" />;
    }
  };

  useEffect(() => {
    setImageLoaded(true);
  }, []);

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex-1">
      {/* HERO Section */}
      <Section className="relative bg-gradient-to-b from-blue-50 to-white pt-24 md:pt-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <InView
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <H1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  {leiharbeitData.hero.title}
                </H1>
                <div className="text-xl md:text-2xl font-medium text-[#009FD8] mb-6">
                  {leiharbeitData.hero.subtitle}
                </div>
                <Paragraph className="text-lg text-gray-600 mb-8 max-w-xl">
                  {leiharbeitData.hero.description}
                </Paragraph>
                <button 
                  onClick={scrollToContact}
                  className="px-6 py-3 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-lg font-medium transition-all duration-200 shadow-sm flex items-center gap-2"
                >
                  Jetzt Mitarbeiter finden
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </InView>
            <div className={cn(
              "relative h-[460px] rounded-2xl overflow-hidden transition-all duration-1000 shadow-xl",
              imageLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <Image
                src="/images/leiharbeit/hero.jpg"
                fill
                className="object-cover"
                alt="Professionelle Leiharbeit bei TREU Service"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-[#009FD8]/5" />

      {/* ÜBER UNS Section */}
      <Section className="bg-white py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <InView
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">ÜBER UNS</Badge>
                <H2 className="mb-4 text-[#222425]">{leiharbeitData.about.title}</H2>
                <Paragraph className="text-gray-600 mb-6">
                  {leiharbeitData.about.description}
                </Paragraph>
                
                <div className="space-y-2 mt-5">
                  {leiharbeitData.about.checkpoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#009FD8] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={scrollToContact}
                  className="mt-6 px-6 py-3 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-lg font-medium transition-all duration-200 shadow-sm inline-flex items-center gap-2"
                >
                  Kostenlose Beratung 
                  <ArrowRight className="h-4 w-4" />
                </button>
              </InView>
            </div>
            
            <div className="order-1 lg:order-2">
              <InView
                variants={{
                  hidden: { opacity: 0, x: 30 },
                  visible: { opacity: 1, x: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/leiharbeit/hero.jpg" // Platzhalter, später zu ersetzen
                    fill
                    className="object-cover"
                    alt="TREU Service Team"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </InView>
            </div>
          </div>
        </Container>
      </Section>

      {/* SERVICE Section */}
      <Section className="bg-[#F8FAFC] py-12">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">SERVICE</Badge>
              <H2 className="mb-4 text-[#222425]">{leiharbeitData.service.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {leiharbeitData.service.description}
              </Paragraph>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="services">
              {leiharbeitData.service.categories.map((service, index) => (
                <ServiceCard
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
          </InView>
        </Container>
      </Section>

      {/* ABLAUF Section - Kompakter */}
      <Section className="bg-white py-12">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">ABLAUF</Badge>
              <H2 className="mb-4 text-[#222425]">{leiharbeitData.process.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {leiharbeitData.process.description}
              </Paragraph>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-[#009FD8]/20 z-0 hidden md:block"></div>
                <div className="space-y-8">
                  {leiharbeitData.process.steps.map((step, index) => (
                    <div key={index} className="relative z-10">
                      <ProcessStep 
                        number={index + 1}
                        title={step.title}
                        description={step.description}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center mt-8">
                <button 
                  onClick={scrollToContact}
                  className="px-6 py-3 bg-[#009FD8] hover:bg-[#007CAB] text-white rounded-lg font-medium transition-all duration-200 shadow-sm inline-flex items-center gap-2"
                >
                  Jetzt anfragen
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </InView>
        </Container>
      </Section>

      {/* UNSERE VORTEILE Section */}
      <Section className="bg-[#F8FAFC] py-12">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">UNSERE VORTEILE</Badge>
              <H2 className="mb-4 text-[#222425]">{leiharbeitData.advantages.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {leiharbeitData.advantages.description}
              </Paragraph>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {leiharbeitData.advantages.items.map((item, i) => (
                <InView
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="shadow-sm hover:shadow-md transition-all duration-300 border-t-4 border-t-[#009FD8] h-full">
                    <CardContent className="p-5">
                      <div className="flex flex-col h-full">
                        <div className="mb-3 text-[#009FD8]">
                          {getAdvantageIcon(item.icon)}
                        </div>
                        <h3 className="text-base font-semibold mb-2 text-[#222425]">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </InView>
              ))}
            </div>
          </InView>
        </Container>
      </Section>

      {/* HERAUSFORDERUNGEN Section */}
      <Section className="bg-white py-12">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">HERAUSFORDERUNGEN</Badge>
              <H2 className="mb-4 text-[#222425]">{leiharbeitData.challenges.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {leiharbeitData.challenges.subtitle}
              </Paragraph>
            </div>
          </InView>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {leiharbeitData.challenges.items.map((item, i) => (
              <InView
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ delay: i * 0.1 }}
              >
                <ChallengeCard
                  problem={item.problem}
                  issue={item.issue}
                  solution={item.solution}
                />
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ Section - Mit korrekt verwendetem Accordion */}
      <Section className="bg-[#F8FAFC] py-12">
        <Container size="small">
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">FAQ</Badge>
              <H2 className="mb-4 text-[#222425]">{leiharbeitData.faq.title}</H2>
              <Paragraph className="text-gray-600 max-w-2xl mx-auto">
                {leiharbeitData.faq.description}
              </Paragraph>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {leiharbeitData.faq.questions.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="mb-4 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <span className="font-medium text-[#222425] text-left">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </InView>
        </Container>
      </Section>

      {/* Kontakt Section */}
      <Section id="kontakt" className="bg-white py-12">
        <Container>
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-[#009FD8] text-white hover:bg-[#007CAB]">KONTAKT</Badge>
            <H2 className="mb-4 text-[#222425]">{leiharbeitData.kontakt.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {leiharbeitData.kontakt.subtitle}
            </Paragraph>
          </div>
          
          {/* LeiharbeitWizard - Keep as is */}
          <LeiharbeitWizard />
        </Container>
      </Section>

      {/* Call-to-Action */}
      <Section className="bg-[#009FD8] text-white py-10">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{leiharbeitData.kontakt.cta.title}</h2>
            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              {leiharbeitData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-[#009FD8] hover:bg-gray-100 rounded-lg font-medium transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {leiharbeitData.kontakt.cta.button}
                <ArrowRight className="h-4 w-4" />
              </button>
              <a 
                href="tel:+491234567890"
                className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg font-medium transition-all flex items-center justify-center"
              >
                <Phone className="mr-2 h-5 w-5" />
                {leiharbeitData.kontakt.cta.call}
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}


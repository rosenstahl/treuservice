"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
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
  Clock,
  Zap,
  Calendar,
  CheckCircle,
  CheckSquare,
  BadgeCheck as Badge2,
  Shield,
  FileText,
  Building2,
  XCircle,
  CheckCircle2,
  Wrench,
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
      className="bg-white rounded-xl overflow-hidden shadow-lg border border-accent/5 hover:border-accent/20 transition-all duration-300 h-full"
      data-service-name={title.toLowerCase().replace(/\s+/g, '-')}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-full bg-accent/10 text-accent">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        
        <p className="text-foreground/80 mb-3">{description}</p>
        <p className="text-accent font-medium mb-4">{benefits}</p>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-accent font-medium flex items-center gap-1 hover:underline mb-2 mt-auto"
        >
          {isExpanded ? "Weniger anzeigen" : "Mehr anzeigen"}
          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
        
        {isExpanded && (
          <div className="mt-4 space-y-4 border-t pt-4 border-accent/10 animate-fadeIn">
            <div>
              <h4 className="font-medium mb-2">Qualifikationen:</h4>
              <ul className="space-y-2">
                {details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 pt-4 border-t border-accent/5">
              <h4 className="font-medium mb-2">Erfolgsgeschichte:</h4>
              <p className="text-sm text-foreground/80 italic">"{case_study}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Process Step Component for the Process Section
interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

const ProcessStep = ({ number, title, description }: ProcessStepProps) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  </div>
);

// Challenge Card Component for Challenges Section
interface ChallengeCardProps {
  problem: string;
  issue: string;
  solution: string;
}

const ChallengeCard = ({ problem, issue, solution }: ChallengeCardProps) => (
  <div className="bg-white p-6 rounded-xl shadow-md overflow-hidden border border-gray-100 h-full flex flex-col">
    <div className="flex items-start gap-4 mb-4">
      <div className="p-2 rounded-full bg-red-50 text-red-500 mt-1 flex-shrink-0">
        <XCircle className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">{problem}</h3>
        <p className="text-red-500 mt-1">{issue}</p>
      </div>
    </div>
    
    <div className="flex items-start gap-4 pl-14 mt-auto">
      <div className="p-2 rounded-full bg-green-50 text-green-500 flex-shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>
      <p className="text-green-700">{solution}</p>
    </div>
  </div>
);

export default function LeiharbeitPage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // For service cards
  const serviceIcons = [
    <Users key="users" className="w-5 h-5" />,
    <Briefcase key="briefcase" className="w-5 h-5" />,
    <Building2 key="building" className="w-5 h-5" />,
    <Wrench key="wrench" className="w-5 h-5" />
  ];
  
  // For advantage cards
  const getAdvantageIcon = (iconName: string) => {
    switch(iconName) {
      case 'Zap': return <Zap className="w-5 h-5 text-accent" />;
      case 'Badge': return <Badge2 className="w-5 h-5 text-accent" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-accent" />;
      case 'FileText': return <FileText className="w-5 h-5 text-accent" />;
      case 'Shield': return <Shield className="w-5 h-5 text-accent" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5 text-accent" />;
      default: return <CheckCircle className="w-5 h-5 text-accent" />;
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
      {/* HERO Section - Fullscreen */}
      <Section className="bg-white pt-28 min-h-screen flex items-center">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <InView
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <H1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                  {leiharbeitData.hero.title}
                </H1>
                <div className="mt-2 min-h-[80px] text-2xl lg:text-3xl mb-6 text-accent font-semibold">
                  {leiharbeitData.hero.subtitle}
                </div>
                <Paragraph className="mt-4 text-lg text-foreground/90">
                  {leiharbeitData.hero.description}
                </Paragraph>
                <button 
                  onClick={scrollToContact}
                  className="mt-8 bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-medium transform transition-all hover:scale-105 flex items-center gap-2"
                >
                  Jetzt Mitarbeiter finden
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </InView>
            <div className={cn(
              "relative h-[500px] rounded-2xl overflow-hidden transition-all duration-1000 shadow-xl",
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

      {/* ÜBER UNS Section */}
      <Section className="bg-white min-h-screen flex items-center">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <InView
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <Badge className="mb-3 bg-accent text-white hover:bg-accent/90">ÜBER UNS</Badge>
                <H2 className="mb-4">{leiharbeitData.about.title}</H2>
                <Paragraph className="text-foreground/80 mb-6">
                  {leiharbeitData.about.description}
                </Paragraph>
                
                <div className="space-y-3 mt-6">
                  {leiharbeitData.about.checkpoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <p className="text-foreground/80">{point}</p>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={scrollToContact}
                  className="mt-8 px-6 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-all duration-200 inline-flex items-center gap-2"
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
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/leiharbeit/team.jpg"
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
      <Section className="bg-white min-h-screen flex items-center">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent/90">SERVICE</Badge>
            <H2 className="mb-4">{leiharbeitData.service.title}</H2>
            <Paragraph className="text-foreground/80 max-w-3xl mx-auto">
              {leiharbeitData.service.description}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="services">
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
        </Container>
      </Section>

      {/* ABLAUF Section */}
      <Section className="bg-white min-h-screen flex items-center">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent/90">ABLAUF</Badge>
            <H2 className="mb-4">{leiharbeitData.process.title}</H2>
            <Paragraph className="text-foreground/80 max-w-3xl mx-auto">
              {leiharbeitData.process.description}
            </Paragraph>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-5 top-0 h-full w-0.5 bg-accent/30 z-0 hidden md:block"></div>
              <div className="space-y-10">
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
            
            <div className="text-center mt-12">
              <button 
                onClick={scrollToContact}
                className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-all duration-200 inline-flex items-center gap-2"
              >
                Jetzt Mitarbeiter finden
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* UNSERE VORTEILE Section */}
      <Section className="bg-white min-h-screen flex items-center">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent/90">UNSERE VORTEILE</Badge>
            <H2 className="mb-4">{leiharbeitData.advantages.title}</H2>
            <Paragraph className="text-foreground/80 max-w-3xl mx-auto">
              {leiharbeitData.advantages.description}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leiharbeitData.advantages.items.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg border border-accent/5 hover:border-accent/20 transition-all h-full flex flex-col">
                <div className="mb-4 p-3 rounded-full bg-accent/10 w-fit">
                  {getAdvantageIcon(item.icon)}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-foreground/80">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* HERAUSFORDERUNGEN Section */}
      <Section className="bg-white min-h-screen flex items-center">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent/90">HERAUSFORDERUNGEN</Badge>
            <H2 className="mb-4">{leiharbeitData.challenges.title}</H2>
            <Paragraph className="text-foreground/80 max-w-3xl mx-auto">
              {leiharbeitData.challenges.subtitle}
            </Paragraph>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {leiharbeitData.challenges.items.map((item, i) => (
              <ChallengeCard
                key={i}
                problem={item.problem}
                issue={item.issue}
                solution={item.solution}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-white min-h-screen flex items-center">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent/90">FAQ</Badge>
            <H2 className="mb-4">{leiharbeitData.faq.title}</H2>
            <Paragraph className="text-foreground/80 max-w-3xl mx-auto">
              {leiharbeitData.faq.description}
            </Paragraph>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {leiharbeitData.faq.questions.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="mb-4 border border-accent/10 rounded-lg bg-white overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <span className="font-medium text-lg text-left">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-1 text-foreground/80">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      {/* Kontakt Section */}
      <Section id="kontakt" className="bg-white min-h-screen flex items-center">
        <Container>
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-accent text-white hover:bg-accent/90">KONTAKT</Badge>
            <H2 className="mb-4">{leiharbeitData.kontakt.title}</H2>
            <Paragraph className="text-gray-600 max-w-2xl mx-auto">
              {leiharbeitData.kontakt.subtitle}
            </Paragraph>
          </div>
          
          {/* LeiharbeitWizard - Keep as is */}
          <LeiharbeitWizard />
        </Container>
      </Section>

      {/* Call-to-Action */}
      <Section className="bg-accent text-white py-10">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">{leiharbeitData.kontakt.cta.title}</h2>
            <p className="mb-8 text-white/90 max-w-2xl mx-auto">
              {leiharbeitData.kontakt.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-white text-accent hover:bg-gray-100 rounded-lg font-medium transition-all shadow-sm flex items-center justify-center gap-2"
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

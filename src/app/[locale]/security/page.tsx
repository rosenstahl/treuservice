"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { TextEffect } from "@/components/ui/text-effect"
import ExpandableSecurityCards from '@/components/ui/ExpandableSecurityCards'
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import ContactButton from '@/components/ui/contact-button'
import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import securityData from "@/i18n/de/security.json"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  PlusCircle,  
  Bell,       
  Clock,     
  Zap,       
  Network,    
  Settings,    
  CheckCircle2,
  FileCheck,
  Lock,
  BadgeCheck,
  Eye,
  XCircle,
} from "lucide-react"

export default function SecurityPage() {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    setImageLoaded(true)
  }, [])

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <Section className="relative bg-gradient-to-b from-primary/20 to-primary-light pt-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <InView
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <H1 className="text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
                  {securityData.hero.title}
                </H1>
                <div className="mt-4 min-h-[80px] text-3xl lg:text-4xl mb-8">
                  <TextEffect>{securityData.hero.subtitle}</TextEffect>
                </div>
                <Paragraph className="mt-6 text-xl text-foreground/90">
                  {securityData.hero.description}
                </Paragraph>
                <button className="mt-12 bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-lg text-lg font-medium transform transition-all hover:scale-105">
                  {securityData.form.requestOffer}
                </button>
              </div>
            </InView>
            <div className={cn(
              "relative h-[600px] rounded-3xl overflow-hidden transition-all duration-1000",
              imageLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}>
              <Image
                src="/images/security/hero.jpg"
                fill
                className="object-cover"
                alt="Professionelle Security"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Basisleistungen */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <InView
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-[610px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/security/basis.jpg"
                  fill
                  className="object-cover"
                  alt="Professionelle Security"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
              </div>
            </InView>
            <div>
              <InView
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 0.5 }}
              >
                <H2 className="mb-4">{securityData.basisleistungen.title}</H2>
                <Paragraph className="mb-8">{securityData.basisleistungen.note}</Paragraph>
              </InView>
              <div className="grid grid-cols-1 gap-8">
                {securityData.basisleistungen.items.map((item, i) => (
                  <InView
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div
                      className="flex items-start gap-4 group hover:bg-accent/5 p-4 rounded-lg transition-colors"
                    >
                      <div className="text-accent mt-1">
                        {i === 0 && <FileCheck className="w-6 h-6" />}
                        {i === 1 && <Eye className="w-6 h-6" />}
                        {i === 2 && <Lock className="w-6 h-6" />}
                        {i === 3 && <PlusCircle className="w-6 h-6 text-red-600" />}
                        {i === 4 && <Bell className="w-6 h-6" />}
                        {i === 5 && <FileCheck className="w-6 h-6" />}
                      </div>
                      <div>
                        <H3 className="text-lg font-medium group-hover:text-accent transition-colors">
                          {item}
                        </H3>
                      </div>
                    </div>
                  </InView>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Specialized Solutions */}
      <Section className="bg-primary/5">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <H2 className="text-center mb-12">{securityData.specializedLoesungen.title}</H2>
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
            />
          </InView>
        </Container>
      </Section>

      {/* Warum TREU Service */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <InView
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/security/expertise.jpg"
                  fill
                  className="object-cover"
                  alt="TREU Service Expertise"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
              </div>
            </InView>
            <InView
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <H2 className="mb-8">{securityData.warumTreuService.title}</H2>
                <Accordion type="single" collapsible className="w-full">
                  {securityData.warumTreuService.items.map((item, i) => {
                    const [title, description] = item.split(": ")
                    return (
                      <AccordionItem
                        key={i}
                        value={`item-${i}`}
                        className="border-b border-primary/10"
                      >
                        <AccordionTrigger className="hover:no-underline hover:bg-accent/5 rounded-lg transition-colors">
                          <span className="font-bold">{title}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="p-4 bg-accent/5 rounded-lg">
                            {description}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>
            </InView>
          </div>
        </Container>
      </Section>

      {/* Common Issues */}
      <Section className="bg-background">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <H2>{securityData.commonIssues.title}</H2>
              <Paragraph className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                {securityData.commonIssues.subtitle}
              </Paragraph>
            </div>
          </InView>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {securityData.commonIssues.items.map((item, i) => (
              <InView
                key={i}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: i * 0.1
                }}
              >
                <div
                  className="group relative overflow-hidden rounded-2xl bg-white/50 hover:bg-white/80 transition-all duration-300 shadow-lg hover:shadow-xl border border-accent/10"
                >
                  <div className="px-6 py-8">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 rounded-full bg-red-100/80 p-3">
                        <XCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <H3 className="text-lg font-semibold mb-2">{item.problem}</H3>
                        <Paragraph className="text-red-500 mb-6">
                          {item.issue}
                        </Paragraph>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-accent/10">
                      <div className="flex items-start gap-4">
                        <div className="shrink-0 rounded-full bg-green-100/80 p-3">
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <Paragraph className="text-green-600 font-medium py-2">
                          {item.solution}
                        </Paragraph>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.2) 100%)',
                    }}
                  />
                </div>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Kundenstimmen */}
      <Section className="bg-primary/5">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <H2 className="text-center mb-12">{securityData.kundenstimmen.title}</H2>
            <AnimatedTestimonials
              testimonials={securityData.kundenstimmen.testimonials.map(t => ({
                quote: t.quote,
                name: t.author,
                designation: t.sector,
                src: "/images/testimonials/placeholder.jpg"
              }))}
            />
          </InView>
        </Container>
      </Section>

      {/* Contact CTA - Final Section */}
      <Section className="bg-accent/5">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Side - Contact Info & Features */}
              <div>
                <H2 className="mb-4">{securityData.kontakt.title}</H2>
                <H3 className="mb-8">{securityData.kontakt.description}</H3>
                
               {/* Quality Promise List */}
                <div className="grid grid-cols-1 gap-8">
                 {securityData.qualitaetsversprechen.items.map((title, i) => {
                   const icons = [
                     { id: '34a GewO', icon: <BadgeCheck className="w-6 h-6" /> },
                     { id: '24/7', icon: <Clock className="w-6 h-6" /> },
                     { id: 'fast', icon: <Zap className="w-6 h-6" /> },
                     { id: 'network', icon: <Network className="w-6 h-6" /> },
                     { id: 'settings', icon: <Settings className="w-6 h-6" /> },
                   ];
                   return (
                     <div 
                       key={i}
                       className="flex items-start gap-4 group hover:bg-accent/5 p-4 rounded-lg transition-colors"
                     >
                       <div className="text-accent mt-1">
                         {icons[i].icon}
                       </div>
                       <div>
                         <H3 className="text-lg font-medium group-hover:text-accent transition-colors">
                           {title}
                         </H3>
                       </div>
                     </div>
                   );
                 })}
               </div>
             </div>
             
             {/* Right Side - Contact Form */}
             <div className="bg-white p-8 rounded-xl shadow-lg border border-accent/10">
               <form className="space-y-6" onSubmit={(e) => {
                 e.preventDefault();
                 // Handle form submission
               }}>
                 <div className="space-y-2">
                   <Label htmlFor="name">{securityData.form.name}</Label>
                   <Input 
                     id="name"
                     name="name"
                     type="text"
                     placeholder={securityData.form.name}
                     className="w-full"
                     required
                   />
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="email">{securityData.form.email}</Label>
                   <Input 
                     id="email"
                     name="email"
                     type="email"
                     placeholder={securityData.form.email}
                     className="w-full"
                     required
                   />
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="phone">{securityData.form.phone}</Label>
                   <Input 
                     id="phone"
                     name="phone"
                     type="tel"
                     placeholder={securityData.form.phone}
                     className="w-full"
                   />
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="service">{securityData.form.desiredService}</Label>
                   <select 
                     id="service"
                     name="service"
                     className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                     required
                   >
                     <option value="">{securityData.form.serviceSelect}</option>
                     {securityData.specializedLoesungen.services.map((service) => (
                       <option key={service.title} value={service.title}>
                         {service.title}
                       </option>
                     ))}
                   </select>
                 </div>
                 
                 <div className="space-y-2">
                   <Label htmlFor="message">{securityData.form.message}</Label>
                   <Textarea 
                     id="message"
                     name="message"
                     placeholder={securityData.form.message}
                     className="w-full min-h-[100px]"
                     required
                   />
                 </div>
                 
                 <ContactButton text={securityData.form.requestOffer} />
               </form>
             </div>
           </div>
         </InView>
       </Container>
     </Section>
   </div>
 )
}
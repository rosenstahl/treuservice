"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { TracingBeam } from "@/components/ui/tracing-beam"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"
import ExpandableCleaningCards from "@/components/ui/ExpandableCleaningCards"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useParams } from "next/navigation"
import Image from "next/image"
import cleaningData from "@/i18n/de/cleaning.json"
import {
  StarIcon,
  LeafIcon,
  Clock,
  Zap,
  Cog,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  BadgeCheck,
  Sparkles,
  XCircle
} from "lucide-react"

export default function CleaningPage() {
  const params = useParams()
  const locale = params.locale as string
  const data = cleaningData

  const words = data.hero.subtitle.split(" ").map(word => ({
    text: word,
    className: "text-black dark:text-white font-medium",
  }))

  const features = [
    {
      title: data.qualitaetsversprechen.items[0],
      icon: <StarIcon className="w-6 h-6" />,
    },
    {
      title: data.qualitaetsversprechen.items[1],
      icon: <LeafIcon className="w-6 h-6" />,
    },
    {
      title: data.qualitaetsversprechen.items[2],
      icon: <Clock className="w-6 h-6" />,
    },
    {
      title: data.qualitaetsversprechen.items[3],
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: data.qualitaetsversprechen.items[4],
      icon: <Cog className="w-6 h-6" />,
    }
  ]

  return (
    <TracingBeam className="flex-1">
      {/* Hero Section */}
      <Section className="relative bg-gradient-to-b from-primary/20 to-primary-light pt-24">
        <Container>
          <div className="max-w-3xl">
            <H1>{data.hero.title}</H1>
            <div className="mt-4 min-h-[60px]">
              <TypewriterEffect words={words} />
            </div>
            <Paragraph className="mt-6 text-lg text-foreground/90">
              {data.hero.description}
            </Paragraph>
            <button className="mt-12 bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-lg text-lg font-medium transform transition-all hover:scale-105">
              Jetzt Angebot anfordern
            </button>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Basisleistungen */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <H2 className="mb-4">{data.basisleistungen.title}</H2>
              <H3 className="mb-12">{data.basisleistungen.subtitle}</H3>
              <Paragraph className="mb-8">{data.basisleistungen.note}</Paragraph>
              <div className="grid grid-cols-1 gap-8">
                {data.basisleistungen.items.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 group hover:bg-accent/5 p-4 rounded-lg transition-colors"
                  >
                    <div className="text-accent mt-1">
                      {index === 0 && <ClipboardCheck className="w-6 h-6" />}
                      {index === 1 && <Sparkles className="w-6 h-6" />}
                      {index === 2 && <Droplets className="w-6 h-6" />}
                      {index === 3 && <BadgeCheck className="w-6 h-6" />}
                      {index === 4 && <LeafIcon className="w-6 h-6" />}
                    </div>
                    <div>
                      <H3 className="text-lg font-medium group-hover:text-accent transition-colors">
                        {item}
                      </H3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="/images/reinigung/basis.jpg"
                fill
                className="object-cover"
                alt="Professionelle Reinigung"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Qualitätsversprechen - Neu */}
      <Section>
        <Container>
          <H2 className="text-center mb-12">{data.qualitaetsversprechen.title}</H2>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={cn(
                  "flex flex-col items-center text-center p-4 hover:bg-accent/5 rounded-lg transition-colors relative group",
                )}
              >
                <div className="mb-2 text-accent">
                  {feature.icon}
                </div>
                <div className="text-sm font-bold group-hover:text-accent transition-colors">
                  {feature.title}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Spezialisierte Lösungen */}
      <Section className="bg-primary/5">
  <Container>
    <H2 className="text-center mb-12">{data.spezialisierteLoesungen.title}</H2>
    <ExpandableCleaningCards 
      services={data.spezialisierteLoesungen.services.map(service => ({
        ...service,
        image: `/images/reinigung/${service.title.toLowerCase().replace(/\s+/g, '-')}.jpg` // Assumes you have matching images
      }))}
    />
  </Container>
</Section>
      {/* Warum TREU Service */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="/images/reinigung/expertise.jpg"
                fill
                className="object-cover"
                alt="TREU Service Expertise"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
            </div>
            <div>
              <H2 className="mb-8">{data.warumTreuService.title}</H2>
              <Accordion type="single" collapsible className="w-full">
                {data.warumTreuService.items.map((item, index) => {
                  const [title, description] = item.split(": ")
                  return (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`}
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
          </div>
        </Container>
      </Section>

      {/* Häufige Probleme */}
      <Section className="bg-background">
        <Container>
          <div className="text-center mb-12">
            <H2>{data.haeufigeProbleme.title}</H2>
            <Paragraph className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              {data.haeufigeProbleme.subtitle}
            </Paragraph>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.haeufigeProbleme.items.map((item, index) => (
              <div
                key={index}
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
            ))}
          </div>
        </Container>
      </Section>

      {/* Kundenstimmen */}
      <Section className="bg-primary/5">
        <Container>
          <H2 className="text-center mb-12">{data.kundenstimmen.title}</H2>
          <AnimatedTestimonials 
            testimonials={data.kundenstimmen.testimonials.map(t => ({
              quote: t.quote,
              name: t.author,
              title: t.sector,
              image: "/images/testimonials/placeholder.jpg"
            }))}
          />
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-accent text-white">
        <Container size="small">
          <div className="text-center">
            <H2 className="text-white mb-6">{data.kontakt.title}</H2>
            <Paragraph className="text-white/90 mb-4">
              {data.kontakt.description}
            </Paragraph>
            <Paragraph className="text-white/80 mb-8">
              {data.kontakt.callToAction}
            </Paragraph>
            <button className="bg-white text-accent hover:bg-white/90 px-10 py-4 rounded-lg text-lg font-medium transform transition-all hover:scale-105">
              Jetzt Kontakt aufnehmen
            </button>
          </div>
        </Container>
      </Section>
    </TracingBeam>
  )
}
// src/app/[locale]/blog/winterdienst/page.tsx
"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import blogData from "@/i18n/de/blog.json"

export default function WinterdienstBlogPage() {
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
                  {blogData.blog.diy_winterservice.title}
                </H1>
                <Paragraph className="mt-6 text-xl text-foreground/90">
                  {blogData.blog.diy_winterservice.intro}
                </Paragraph>
              </div>
            </InView>
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="/images/blog/winterdienst/hero.jpg"
                fill
                className="object-cover"
                alt="Winterdienst Blog"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* DIY Winterdienst Tips */}
      <Section id="diy">
        <Container>
          <H2 className="text-center mb-12">{blogData.blog.diy_winterservice.title}</H2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {blogData.blog.diy_winterservice.steps.map((step, index) => (
              <InView
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center">
                      {step.number}
                    </div>
                    <H3>{step.title}</H3>
                  </div>
                  {step.intro && (
                    <Paragraph className="mb-4">{step.intro}</Paragraph>
                  )}
                  <div className="space-y-4">
                    {step.items.map((item, i) => (
                      <div key={i} className="border-l-4 border-accent pl-4">
                        <H3 className="text-lg font-medium">{item.title}</H3>
                        <Paragraph>{item.description}</Paragraph>
                      </div>
                    ))}
                  </div>
                </div>
              </InView>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Paragraph className="italic">{blogData.blog.diy_winterservice.conclusion.text}</Paragraph>
            <Paragraph className="mt-4 font-medium">{blogData.blog.diy_winterservice.conclusion.closing}</Paragraph>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Streumittel Vergleich */}
      <Section id="streumittel" className="bg-primary/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <H2 className="mb-8">{blogData.blog.streumittel.subtitle}</H2>
              <div className="space-y-6">
                <Accordion type="single" collapsible>
                  {blogData.blog.streumittel.materials.map((material, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{material.name}</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <div>
                            <strong>Wirkung:</strong> {material.wirkung}
                          </div>
                          <div>
                            <strong>Vorteile:</strong>
                            <ul className="list-disc pl-4 mt-2">
                              {material.vorteile.map((vorteil, i) => (
                                <li key={i} className="text-green-600">{vorteil}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong>Nachteile:</strong>
                            <ul className="list-disc pl-4 mt-2">
                              {material.nachteile.map((nachteil, i) => (
                                <li key={i} className="text-red-600">{nachteil}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-accent/5 p-6 rounded-lg">
                <H3 className="mb-4">Zusammenfassung</H3>
                <Paragraph>{blogData.blog.streumittel.summary.general}</Paragraph>
                <Paragraph className="mt-4">{blogData.blog.streumittel.summary.chemical_agents}</Paragraph>
                <Paragraph className="mt-4">{blogData.blog.streumittel.summary.extreme_conditions}</Paragraph>
                <Paragraph className="mt-4">{blogData.blog.streumittel.summary.natural_alternatives}</Paragraph>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/blog/winterdienst/streumittel.jpg"
                  fill
                  className="object-cover"
                  alt="Streumittel Vergleich"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-accent text-white">
        <Container>
          <div className="text-center">
            <H2 className="text-white mb-6">Professionelle Unterstützung benötigt?</H2>
            <Paragraph className="text-white/90 mb-8">
              Lassen Sie sich von unseren Experten beraten und erhalten Sie ein 
              maßgeschneidertes Angebot für Ihren Winterdienst.
            </Paragraph>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white text-accent hover:bg-white/90"
            >
              Jetzt Angebot anfordern
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  )
}
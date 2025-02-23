// src/app/[locale]/blog/security/page.tsx
"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { InView } from "@/components/ui/in-view"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import blogData from "@/i18n/de/blog.json"

export default function SecurityBlogPage() {
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
                  {blogData.blog.emergency_plan.title}
                </H1>
                <div className="text-2xl mb-6">{blogData.blog.emergency_plan.subtitle}</div>
                <Paragraph className="text-xl">
                  {blogData.blog.emergency_plan.intro}
                </Paragraph>
              </div>
            </InView>
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="/images/blog/security/hero.jpg"
                fill
                className="object-cover"
                alt="Security Blog"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Gesetzliche Grundlagen */}
      <Section>
        <Container>
          <H2 className="text-center mb-12">{blogData.blog.emergency_plan.legal_basis.title}</H2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-accent/5 p-6 rounded-lg mb-8">
                <H3 className="mb-4">Notwendigkeit</H3>
                <Paragraph>{blogData.blog.emergency_plan.legal_basis.requirements.when_needed}</Paragraph>
                <Paragraph className="mt-4">{blogData.blog.emergency_plan.legal_basis.requirements.preparation}</Paragraph>
              </div>
              <div className="space-y-4">
                {blogData.blog.emergency_plan.legal_basis.legal_sources.map((source, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{source.name}</CardTitle>
                      {source.section && (
                        <CardDescription>{source.section}</CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <Paragraph>{source.content}</Paragraph>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/images/blog/security/legal.jpg"
                  fill
                  className="object-cover"
                  alt="Gesetzliche Grundlagen"
                />
              </div>
              <div className="bg-accent/5 p-6 rounded-lg">
                <H3 className="mb-4">Erforderliche Inhalte</H3>
                <div className="space-y-4">
                  {blogData.blog.emergency_plan.required_content.items.map((item, index) => (
                    <div key={index} className="border-l-4 border-accent pl-4">
                      <H3 className="text-lg font-medium">{item.title}</H3>
                      <Paragraph>{item.description}</Paragraph>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

{/* Schritt-für-Schritt Anleitung */}
<Section className="bg-primary/5">
        <Container>
          <H2 className="text-center mb-12">{blogData.blog.emergency_plan.creation_steps.title}</H2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogData.blog.emergency_plan.creation_steps.steps.map((step, index) => (
              <InView
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center">
                        {step.number}
                      </div>
                      <CardTitle>{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-4 space-y-2">
                      {step.tasks.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Fazit */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <H2 className="mb-8">Fazit</H2>
            <Paragraph className="mb-8">{blogData.blog.emergency_plan.conclusion.summary}</Paragraph>
            <div className="grid grid-cols-2 gap-8 mb-8">
              {blogData.blog.emergency_plan.conclusion.benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="bg-accent/5 p-4 rounded-lg flex items-center justify-center text-center"
                >
                  {benefit}
                </div>
              ))}
            </div>
            <Paragraph className="italic">{blogData.blog.emergency_plan.conclusion.final_note}</Paragraph>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-accent text-white">
        <Container>
          <div className="text-center">
            <H2 className="text-white mb-6">Professionelle Unterstützung bei der Notfallplanung?</H2>
            <Paragraph className="text-white/90 mb-8">
              Lassen Sie sich von unseren Experten beraten und erhalten Sie ein 
              maßgeschneidertes Konzept für Ihre Notfallplanung.
            </Paragraph>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white text-accent hover:bg-white/90"
            >
              Jetzt Beratungsgespräch vereinbaren
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  )
}
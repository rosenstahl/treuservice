// src/app/[locale]/blog/reinigung/page.tsx
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import blogData from "@/i18n/de/blog.json"

export default function ReinigungBlogPage() {
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
                  {blogData.blog.cleaning.title}
                </H1>
              </div>
            </InView>
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="/images/blog/reinigung/hero.jpg"
                fill
                className="object-cover"
                alt="Reinigung Blog"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Bodenbeläge und Oberflächen */}
      <Section>
        <Container>
          <H2 className="text-center mb-12">{blogData.blog.cleaning.sections.floors_surfaces.title}</H2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogData.blog.cleaning.sections.floors_surfaces.problems.map((problem, index) => (
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
                    <CardTitle>{problem.title}</CardTitle>
                    <CardDescription className="text-red-500">{problem.cause}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <H3 className="text-lg mb-2">Lösungen:</H3>
                        <ul className="list-disc pl-4">
                          {problem.solution.map((sol, i) => (
                            <li key={i} className="text-green-600">{sol}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <H3 className="text-lg mb-2">Prävention:</H3>
                        <ul className="list-disc pl-4">
                          {problem.prevention.map((prev, i) => (
                            <li key={i} className="text-blue-600">{prev}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Spezielle Reinigungssituationen */}
      <Section className="bg-primary/5">
        <Container>
          <H2 className="text-center mb-12">{blogData.blog.cleaning.sections.special_situations.title}</H2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogData.blog.cleaning.sections.special_situations.problems.map((problem, index) => (
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
                    <CardTitle>{problem.title}</CardTitle>
                    <CardDescription className="text-red-500">{problem.cause}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <H3 className="text-lg mb-2">Lösungen:</H3>
                        <ul className="list-disc pl-4">
                          {problem.solution.map((sol, i) => (
                            <li key={i} className="text-green-600">{sol}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <H3 className="text-lg mb-2">Prävention:</H3>
                        <ul className="list-disc pl-4">
                          {problem.prevention.map((prev, i) => (
                            <li key={i} className="text-blue-600">{prev}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Außenbereiche und Fassaden */}
      <Section>
        <Container>
          <H2 className="text-center mb-12">{blogData.blog.cleaning.sections.exterior_facades.title}</H2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogData.blog.cleaning.sections.exterior_facades.problems.map((problem, index) => (
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
                    <CardTitle>{problem.title}</CardTitle>
                    <CardDescription className="text-red-500">{problem.cause}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <H3 className="text-lg mb-2">Lösungen:</H3>
                        <ul className="list-disc pl-4">
                          {problem.solution.map((sol, i) => (
                            <li key={i} className="text-green-600">{sol}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <H3 className="text-lg mb-2">Prävention:</H3>
                        <ul className="list-disc pl-4">
                          {problem.prevention.map((prev, i) => (
                            <li key={i} className="text-blue-600">{prev}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Spezialfälle */}
      <Section className="bg-primary/5">
        <Container>
          <H2 className="text-center mb-12">{blogData.blog.cleaning.sections.special_cases.title}</H2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogData.blog.cleaning.sections.special_cases.problems.map((problem, index) => (
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
                    <CardTitle>{problem.title}</CardTitle>
                    <CardDescription className="text-red-500">{problem.cause}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <H3 className="text-lg mb-2">Lösungen:</H3>
                        <ul className="list-disc pl-4">
                          {problem.solution.map((sol, i) => (
                            <li key={i} className="text-green-600">{sol}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <H3 className="text-lg mb-2">Prävention:</H3>
                        <ul className="list-disc pl-4">
                          {problem.prevention.map((prev, i) => (
                            <li key={i} className="text-blue-600">{prev}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-accent text-white">
        <Container>
          <div className="text-center">
            <H2 className="text-white mb-6">Professionelle Reinigung benötigt?</H2>
            <Paragraph className="text-white/90 mb-8">
              Lassen Sie sich von unseren Experten beraten und erhalten Sie ein 
              maßgeschneidertes Angebot für Ihre Reinigungsanforderungen.
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
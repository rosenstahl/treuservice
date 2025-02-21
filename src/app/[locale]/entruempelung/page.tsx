"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { TextEffect } from "@/components/ui/text-effect"
import { InView } from "@/components/ui/in-view"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import entruempelungData from "@/i18n/de/entruempelung.json"
import {
  ArrowRight,
  Truck,
  Recycle,
  Star,
  Award,
  Timer,
  Users,
  PhoneCall,
  Shield,
  Handshake,
  Settings,
  Wrench
} from "lucide-react"

export default function EntruempelungPage() {
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
                <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
                  {entruempelungData.hero.title}
                </h1>
                <div className="mt-8 text-3xl lg:text-4xl mb-12">
                  <TextEffect 
                    preset="fade-in-blur"
                    per="word"
                  >
                    {entruempelungData.hero.subtitle}
                  </TextEffect>
                </div>
                <Paragraph className="mt-6 text-xl text-foreground/90">
                  {entruempelungData.hero.description}
                </Paragraph>
                <button className="mt-12 bg-accent hover:bg-accent/90 text-white px-10 py-4 rounded-lg text-lg font-medium transform transition-all hover:scale-105">
                  {entruempelungData.hero.cta}
                </button>
              </div>
            </InView>
            <div className="relative h-[600px] rounded-3xl overflow-hidden">
              <Image
                src="/images/entruempelung/hero.jpg"
                fill
                className="object-cover"
                alt="Professionelle Entrümpelung"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/20 to-transparent" />
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

{/* Vertrauen Section */}
<Section className="bg-background pt-16">
  <Container>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="relative h-[500px] rounded-3xl overflow-hidden">
        <Image
          src="/images/entruempelung/trust.jpg"
          fill
          className="object-cover"
          alt="Vertrauensvolle Entrümpelung"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
      </div>
      <div>
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5 }}
        >
          <H2 className="mb-6">{entruempelungData.intro.title}</H2>
          <div className="prose prose-lg">
            <Paragraph className="text-lg leading-relaxed text-muted-foreground mb-8">
              {entruempelungData.intro.description}
            </Paragraph>
          </div>
        </InView>
      </div>
    </div>
  </Container>
</Section>

      <Separator className="bg-accent/10" />

      {/* Versprechen Section */}
      <Section className="bg-primary/5">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <H2>{entruempelungData.versprechen.title}</H2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entruempelungData.versprechen.items.map((item, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      {index === 0 && <Handshake className="w-12 h-12 text-accent" />}
                      {index === 1 && <Settings className="w-12 h-12 text-accent" />}
                      {index === 2 && <Recycle className="w-12 h-12 text-accent" />}
                      {index === 3 && <Timer className="w-12 h-12 text-accent" />}
                      {index === 4 && <Shield className="w-12 h-12 text-accent" />}
                    </div>
                    <H3 className="mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </H3>
                    <Paragraph className="text-muted-foreground">
                      {item.description}
                    </Paragraph>
                  </CardContent>
                </Card>
              ))}
            </div>
          </InView>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Leistungsspektrum Section */}
      <Section className="bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <InView
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-8">
                <H2 className="mb-6">{entruempelungData.leistungen.title}</H2>
                <Paragraph className="text-lg text-muted-foreground mb-8">
                  {entruempelungData.leistungen.description}
                </Paragraph>
                <div className="relative h-[527px] rounded-3xl overflow-hidden">
                  <Image
                    src="/images/entruempelung/services.jpg"
                    fill
                    className="object-cover"
                    alt="Professionelle Entrümpelung"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </InView>
            
            <div className="space-y-6">
              {entruempelungData.leistungen.services.map((service, index) => (
                <Card key={index} className="bg-white hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      {index === 0 ? (
                        <Truck className="w-8 h-8 text-accent" />
                      ) : (
                        <Wrench className="w-8 h-8 text-accent" />
                      )}
                      <H3>{service.category}</H3>
                    </div>
                    <ul className="space-y-4">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <ArrowRight className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Arbeitsweise Section */}
      <Section className="bg-primary/5">
        <Container>
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <H2>{entruempelungData.arbeitsweise.title}</H2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {entruempelungData.arbeitsweise.steps.map((step, index) => (
                <Card key={index} className="relative group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center mb-4 text-xl font-bold">
                        {index + 1}
                      </div>
                      <H3 className="mb-2 group-hover:text-accent transition-colors">
                        {step.title}
                      </H3>
                      <Paragraph className="text-sm text-muted-foreground">
                        {step.description}
                      </Paragraph>
                    </div>
                  </CardContent>
                  {index < entruempelungData.arbeitsweise.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-accent/30" />
                  )}
                </Card>
              ))}
            </div>
          </InView>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

 {/* Vertrauen Section */}
<Section className="bg-background">
  <Container size="small">
    <InView
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5 }}
    >
      <H2 className="text-center mb-12">{entruempelungData.vorteile.title}</H2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {entruempelungData.vorteile.items.map((item, index) => (
          <Card 
            key={index} 
            className="bg-white hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center rounded-full bg-accent/10 p-4 flex-shrink-0">
                  {index === 0 && <Award className="w-8 h-8 text-accent" />}
                  {index === 1 && <Users className="w-8 h-8 text-accent" />}
                  {index === 2 && <Truck className="w-8 h-8 text-accent" />}
                  {index === 3 && <Star className="w-8 h-8 text-accent" />}
                  {index === 4 && <Timer className="w-8 h-8 text-accent" />}
                  {index === 5 && <PhoneCall className="w-8 h-8 text-accent" />}
                </div>
                <span className="text-lg font-medium">{item}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </InView>
  </Container>
</Section>

      {/* Contact CTA */}
      <Section className="bg-accent text-white">
        <Container size="small">
          <div className="text-center">
            <H2 className="text-white">{entruempelungData.kontakt.description}</H2>
            <Paragraph className="mt-4 text-white/90">
              {entruempelungData.kontakt.cta}
            </Paragraph>
            <button className="mt-8 bg-white text-accent hover:bg-white/90 px-10 py-4 rounded-lg text-lg font-medium transform transition-all hover:scale-105">
              {entruempelungData.hero.cta}
            </button>
          </div>
        </Container>
      </Section>
    </div>
  )
}
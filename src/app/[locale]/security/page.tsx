"use client"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FlipCard } from "@/components/ui/flip-card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { useParams } from "next/navigation"
import securityData from "@/i18n/de/security.json"

export default function SecurityPage() {
  const params = useParams()
  const locale = params.locale as string
  const data = securityData

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Section className="relative bg-gradient-to-b from-primary/20 to-primary-light pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <H1>{data.hero.title}</H1>
            <Paragraph className="mt-6 text-lg">{data.hero.description}</Paragraph>
            <Button size="lg" className="mt-8">
              Jetzt Angebot anfordern
            </Button>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Basisleistungen */}
      <Section>
        <Container>
          <H2 className="text-center mb-8">{data.basisleistungen.title}</H2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {data.basisleistungen.items.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    {item}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Paragraph>
                      {data.basisleistungen.note}
                    </Paragraph>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Spezialisierte Lösungen */}
      <Section className="bg-primary-light">
        <Container>
          <H2 className="text-center mb-12">{data.specializedLoesungen.title}</H2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.specializedLoesungen.services.map((service, index) => (
              <FlipCard
                key={index}
                title={service.title}
                description={service.tileText}
                features={service.leistungen}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Häufige Probleme */}
      <Section>
        <Container size="small">
          <H2 className="text-center mb-4">{data.commonIssues.title}</H2>
          <Paragraph className="text-center mb-8">{data.commonIssues.subtitle}</Paragraph>
          <Accordion type="single" collapsible>
            {data.commonIssues.items.map((item, index) => (
              <AccordionItem key={index} value={`problem-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {item.problem}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="text-red-500/80 text-sm">{item.issue}</p>
                    <p className="text-green-600 font-medium">{item.solution}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Warum TREU Service */}
      <Section className="bg-primary-light">
        <Container>
          <H2 className="text-center mb-12">{data.warumTreuService.title}</H2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {data.warumTreuService.items.map((item, index) => (
                <AccordionItem key={index} value={`vorteil-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    {item}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Paragraph>
                      Professionelle Sicherheitslösungen mit höchsten Standards
                    </Paragraph>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Kundenstimmen */}
      <Section>
        <Container>
          <H2 className="text-center mb-12">{data.kundenstimmen.title}</H2>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {data.kundenstimmen.testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card>
                    <CardContent className="p-6">
                      <blockquote className="border-l-4 border-accent pl-4">
                        <p className="italic text-base">{testimonial.quote}</p>
                        <footer className="mt-4">
                          <strong className="text-secondary">{testimonial.author}</strong>
                          <span className="text-secondary/60"> - {testimonial.sector}</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-4 flex justify-center gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-accent text-white">
        <Container size="small">
          <div className="text-center">
            <H2 className="text-white">{data.kontakt.title}</H2>
            <Paragraph className="mt-4 text-white/90">
              {data.kontakt.description}
            </Paragraph>
            <Paragraph className="mt-4 text-white/90">
              {data.kontakt.callToAction}
            </Paragraph>
            <Button 
              size="lg" 
              className="mt-8 bg-white text-accent hover:bg-white/90"
            >
              Jetzt Kontakt aufnehmen
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
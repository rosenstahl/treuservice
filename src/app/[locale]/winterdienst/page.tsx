"use client"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import Image from "next/image"
import winterData from "@/i18n/de/winterservice.json"

export default function WinterdienstPage() {
  const { winterservice: data } = winterData
  
  return (
    <>
      {/* Hero Section */}
      <Section className="min-h-[80vh] relative bg-primary/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/winter-hero.jpg"
            alt="Winterdienst Hero"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <Container className="relative z-10 pt-24">
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

      {/* Main Services - Kompakt und übersichtlich */}
      <Section>
        <Container>
          <H2 className="text-center mb-12">{data.mainServices.title}</H2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/images/winter-service-1.jpg"
                alt="Winterdienst Service"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <Accordion type="single" collapsible>
                {data.mainServices.services.map((service, index) => (
                  <AccordionItem key={index} value={`service-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">
                      {service.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <Paragraph>{service.description}</Paragraph>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Service Features - Mit visuellen Elementen */}
      <Section className="bg-primary-light">
        <Container>
          <H2 className="text-center mb-12">{data.serviceFeatures.title}</H2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/images/winter-service-2.jpg"
                  alt="Service Feature 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/images/winter-service-3.jpg"
                  alt="Service Feature 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <Accordion type="single" collapsible>
                {data.serviceFeatures.features.map((feature, index) => (
                  <AccordionItem key={index} value={`feature-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">
                      {feature.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <Paragraph>{feature.description}</Paragraph>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Häufige Probleme - Übersichtlich mit Accordion */}
      <Section>
        <Container size="small">
          <H2 className="text-center mb-4">{data.commonProblems.title}</H2>
          <Paragraph className="text-center mb-8">{data.commonProblems.intro}</Paragraph>
          <Accordion type="single" collapsible className="w-full">
            {data.commonProblems.problems.map((problem, index) => (
              <AccordionItem key={index} value={`problem-${index}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {problem.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p className="text-red-500/80 text-sm">{problem.problem}</p>
                    <p className="text-green-600 font-medium">{problem.solution}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Streumittel Vergleich - Übersichtliche Tabelle */}
      <Section className="bg-primary-light">
        <Container>
          <H2 className="text-center mb-6">{data.streuMittelVergleich.title}</H2>
          <Paragraph className="text-center mb-8">{data.streuMittelVergleich.intro}</Paragraph>
          <div className="bg-white rounded-lg p-6 shadow-lg overflow-x-auto">
            <Table>
              <TableCaption>{data.streuMittelVergleich.conclusion}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Streumittel</TableHead>
                  <TableHead className="w-[150px]">Wirkung</TableHead>
                  <TableHead>Vorteile</TableHead>
                  <TableHead>Nachteile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(data.streuMittelVergleich.mittel).map((mittel) => (
                  <TableRow key={mittel.name}>
                    <TableCell className="font-medium">{mittel.name}</TableCell>
                    <TableCell>{mittel.wirkung}</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-4">
                        {mittel.vorteile.map((vorteil, i) => (
                          <li key={i} className="text-green-600">{vorteil}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      <ul className="list-disc pl-4">
                        {mittel.nachteile.map((nachteil, i) => (
                          <li key={i} className="text-red-600">{nachteil}</li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Testimonials - Carousel */}
      <Section>
        <Container>
          <H2 className="text-center mb-12">{data.testimonials.title}</H2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {data.testimonials.items.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <Card className="h-full">
                    <CardContent className="pt-6">
                      <blockquote className="border-l-4 border-accent pl-4">
                        <p className="italic text-base">{testimonial.text}</p>
                        <footer className="mt-4">
                          <strong className="text-secondary">{testimonial.author}</strong>
                          <span className="text-secondary/60"> - {testimonial.position}</span>
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-accent text-white">
        <Container size="small">
          <div className="text-center">
            <H2 className="text-white">{data.contact.title}</H2>
            <H3 className="mt-4 text-white">{data.contact.subtitle}</H3>
            <Paragraph className="mt-4 text-white/90">
              {data.contact.description}
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
    </>
  )
}
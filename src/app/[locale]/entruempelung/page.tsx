"use client"

import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

const entruempelungData = {
  hero: {
    title: "Professionelle Entrümpelung mit Herz und Verstand",
    description: "Wenn Räume neue Perspektiven brauchen, sind wir Ihr verlässlicher Partner für professionelle Entrümpelung. Mit jahrelanger Erfahrung und einem eingespielten Team verwandeln wir überfüllte Räume in neue Möglichkeiten – effizient, diskret und nachhaltig."
  },
  intro: {
    title: "Ihr Vertrauen ist unser Antrieb",
    description: "Eine Entrümpelung bedeutet oft mehr als nur das Beseitigen von Gegenständen. Wir verstehen die emotionale Komponente und begleiten Sie einfühlsam durch diesen Prozess. Ob Haushaltsauflösung, Nachlassregulierung oder gewerbliche Räumung – wir sind der Partner an Ihrer Seite, der Professionalität mit Fingerspitzengefühl verbindet."
  },
  versprechen: {
    title: "Unser Versprechen an Sie",
    items: [
      {
        title: "Kostenlose Erstberatung vor Ort",
        description: "Transparente Preisgestaltung ohne versteckte Kosten"
      },
      {
        title: "Maßgeschneiderte Lösungen",
        description: "Vom Einzelzimmer bis zur kompletten Gewerbeimmobilie"
      },
      {
        title: "Nachhaltiges Konzept",
        description: "Fachgerechte Sortierung und umweltbewusste Entsorgung"
      },
      {
        title: "Zeitersparnis",
        description: "Schnelle und effiziente Durchführung dank erfahrenem Team"
      },
      {
        title: "Rundum-Service",
        description: "Von der ersten Beratung bis zur besenreinen Übergabe"
      }
    ]
  },
  leistungen: {
    title: "Unser Leistungsspektrum im Detail",
    services: [
      {
        category: "Professionelle Entrümpelung",
        items: [
          "Komplette Haushaltsauflösungen",
          "Gewerberäumungen",
          "Kellerentrümpelungen",
          "Dachbodenräumungen",
          "Garagenentrümpelungen",
          "Grundstücksberäumungen"
        ]
      },
      {
        category: "Zusätzliche Services",
        items: [
          "Fachmännische Demontage von Möbeln und Einrichtungen",
          "Zertifizierte Aktenvernichtung",
          "Verwertung von Antiquitäten und Wertgegenständen",
          "Container-Bereitstellung aller Größen",
          "Professionelle Endreinigung",
          "Malerarbeiten und Renovierung"
        ]
      }
    ]
  },
  arbeitsweise: {
    title: "Unsere Arbeitsweise",
    steps: [
      {
        title: "Persönliche Beratung",
        description: "Kostenlose Erstbesichtigung und detaillierte Bestandsaufnahme"
      },
      {
        title: "Individuelles Konzept",
        description: "Maßgeschneiderter Entrümpelungsplan nach Ihren Bedürfnissen"
      },
      {
        title: "Professionelle Durchführung",
        description: "Schnelle und sorgfältige Ausführung durch geschultes Personal"
      },
      {
        title: "Nachhaltige Entsorgung",
        description: "Umweltgerechte Verwertung und Entsorgung aller Materialien"
      },
      {
        title: "Qualitätssicherung",
        description: "Besenreine Übergabe und Abnahmeprotokoll"
      }
    ]
  },
  vorteile: {
    title: "Warum Sie uns vertrauen können",
    items: [
      "Über 15 Jahre Branchenerfahrung",
      "Geschultes und vertrauenswürdiges Personal",
      "Modernste Ausrüstung und Transportfahrzeuge",
      "Alle erforderlichen Versicherungen und Zertifizierungen",
      "Garantierte Termintreue und Festpreise",
      "Durchgehende Ansprechpartner"
    ]
  }
}

export default function EntruempelungPage() {
  const data = entruempelungData

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

      {/* Intro */}
      <Section>
        <Container size="small">
          <div className="text-center">
            <H2>{data.intro.title}</H2>
            <Paragraph className="mt-6">{data.intro.description}</Paragraph>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Versprechen */}
      <Section className="bg-primary-light">
        <Container>
          <H2 className="text-center mb-12">{data.versprechen.title}</H2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {data.versprechen.items.map((item, index) => (
                <AccordionItem key={index} value={`versprechen-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Paragraph>{item.description}</Paragraph>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Leistungen */}
      <Section>
        <Container>
          <H2 className="text-center mb-12">{data.leistungen.title}</H2>
          <div className="grid md:grid-cols-2 gap-8">
            {data.leistungen.services.map((service, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="pt-6">
                  <H3 className="mb-4">{service.category}</H3>
                  <ul className="space-y-2">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2 text-accent">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Arbeitsweise */}
      <Section className="bg-primary-light">
        <Container>
          <H2 className="text-center mb-12">{data.arbeitsweise.title}</H2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {data.arbeitsweise.steps.map((step, index) => (
                <AccordionItem key={index} value={`step-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    <span className="flex items-center">
                      <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center mr-4">
                        {index + 1}
                      </span>
                      {step.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Paragraph>{step.description}</Paragraph>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </Section>

      <Separator className="bg-accent/10" />

      {/* Vorteile */}
      <Section>
        <Container size="small">
          <H2 className="text-center mb-12">{data.vorteile.title}</H2>
          <div className="space-y-4">
            {data.vorteile.items.map((item, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-start">
                    <span className="mr-2 text-accent">✓</span>
                    <span>{item}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact CTA */}
      <Section className="bg-accent text-white">
        <Container size="small">
          <div className="text-center">
            <H2 className="text-white">Vertrauen Sie auf unsere Expertise</H2>
            <Paragraph className="mt-4 text-white/90">
              Kontaktieren Sie uns noch heute für ein unverbindliches Beratungsgespräch.
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
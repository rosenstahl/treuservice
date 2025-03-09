"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { InView } from "@/components/ui/in-view"
import { cn } from "@/lib/utils"
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card"
import { 
  CheckCircle2, 
  ChevronRight, 
  Sun, 
  Zap, 
  Download,
  CableLine,
  Workflow,
  Box,
  Battery,
  FileText,
  HomeIcon,
  Layers,
  ArrowDown
} from "lucide-react"
import pvMontageData from "@/i18n/de/pv-montage.json"

export default function PVAnlagenAufbauPage() {
  return (
    <div className="flex-1 pb-20">
      {/* Hero Section */}
      <Section className="pt-32 bg-gradient-to-b from-yellow-100/50 to-transparent">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block animate-pulse bg-yellow-500/20 p-2 rounded-full mb-4">
              <Sun className="h-8 w-8 text-yellow-500" />
            </div>
            <H1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Aufbau einer Photovoltaikanlage
            </H1>
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 bg-clip-text text-transparent text-xl md:text-2xl font-medium mb-6">
              Alle Komponenten und Montagearten im Überblick
            </div>
            <Paragraph className="text-muted-foreground text-lg mb-8">
              Ein umfassender Guide zu den Hauptkomponenten moderner Photovoltaikanlagen und verschiedenen Montagearten. Erfahren Sie, welche Teile für den effizienten Betrieb notwendig sind und welche Montageart für Ihren Fall optimal ist.
            </Paragraph>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
              <Link href="/pv-montage" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition-colors">
                Zurück zur PV-Montage-Seite
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#montageanleitung" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/5 transition-colors">
                IBC TOPFIX200 Montageanleitung
                <ArrowDown className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="my-8" />

      {/* Hauptkomponenten */}
      <Section>
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="mb-12 text-center">
              <H2 className="mb-4">{pvMontageData.hauptkomponenten.title}</H2>
              <Paragraph className="text-muted-foreground max-w-3xl mx-auto">
                {pvMontageData.hauptkomponenten.content}
              </Paragraph>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {pvMontageData.hauptkomponenten.items.map((component, index) => {
                // Icons für die verschiedenen Komponenten
                const icons = [
                  <Sun key="solarmodule" className="h-12 w-12" />,
                  <Zap key="wechselrichter" className="h-12 w-12" />,
                  <Layers key="montagesystem" className="h-12 w-12" />,
                  <Battery key="speicher" className="h-12 w-12" />,
                  <CableLine key="verkabelung" className="h-12 w-12" />,
                  <Box key="anschlusskasten" className="h-12 w-12" />
                ];
                
                return (
                  <InView
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-md transition-shadow border-yellow-500/10">
                      <CardHeader className="bg-gradient-to-r from-yellow-50 to-transparent">
                        <div className="flex items-center gap-4">
                          <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                            {icons[index]}
                          </div>
                          <CardTitle className="text-xl">{component.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <Paragraph>{component.description}</Paragraph>
                      </CardContent>
                      <CardFooter className="border-t border-border/20 pt-4 flex justify-between">
                        <div className="text-sm font-semibold">
                          Komponente {index + 1} von 6
                        </div>
                        <div className="text-yellow-600 text-sm font-medium">
                          {index < 3 ? "Unverzichtbar" : "Optional/Ergänzend"}
                        </div>
                      </CardFooter>
                    </Card>
                  </InView>
                );
              })}
            </div>

            {/* Diagram */}
            <div className="mt-16 bg-white p-8 rounded-xl shadow-md border border-yellow-500/10">
              <H3 className="text-xl font-bold mb-6 text-center">Zusammenspiel der Komponenten</H3>
              <div className="relative h-[400px] mx-auto overflow-hidden rounded-lg">
                <Image
                  src="/images/pv-montage/pv-diagram.jpg"
                  fill
                  className="object-contain"
                  alt="Photovoltaikanlage Diagramm"
                />
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sun className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium">Stromerzeugung</span>
                  </div>
                  <Paragraph className="text-sm">
                    Solarmodule wandeln Sonnenlicht in Gleichstrom um
                  </Paragraph>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Workflow className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium">Stromwandlung</span>
                  </div>
                  <Paragraph className="text-sm">
                    Wechselrichter konvertiert zu Wechselstrom für den Hausgebrauch
                  </Paragraph>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium">Stromspeicherung</span>
                  </div>
                  <Paragraph className="text-sm">
                    Überschüssige Energie wird im Akku gespeichert oder ins Netz eingespeist
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Montagearten */}
      <Section className="bg-yellow-50/50 mt-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="mb-10 text-center">
              <H2 className="mb-4">Arten der Montage</H2>
              <Paragraph className="text-muted-foreground max-w-3xl mx-auto">
                Je nach Gebäudeart und individuellen Anforderungen bieten wir verschiedene Montagearten an
              </Paragraph>
            </div>
            
            <div className="space-y-12">
              {[
                {
                  title: "Aufdach-Montage",
                  description: "Hierbei werden die Solarmodule auf bestehende Dächer montiert. Dachhaken werden am Dachstuhl befestigt und darauf Montageschienen installiert. Diese Methode ist gängig für Schrägdächer.",
                  image: "/images/pv-montage/aufdach.jpg",
                  advantages: [
                    "Kostengünstigste Variante",
                    "Kein Eingriff in die Dachhaut notwendig",
                    "Für fast alle Dachtypen geeignet",
                    "Nachträgliche Installation möglich"
                  ]
                },
                {
                  title: "Indach-Montage",
                  description: "Die Solarmodule ersetzen die Dachziegel und werden direkt in die Dachhaut integriert. Dies bietet eine ästhetisch ansprechende Lösung, ist aber aufwendiger und teurer.",
                  image: "/images/pv-montage/indach.jpg",
                  advantages: [
                    "Ästhetisch ansprechende, elegante Optik",
                    "Bessere Gebäudeintegration",
                    "Ersetzt traditionelle Dacheindeckung",
                    "Ideal für Neubauten oder Dachsanierungen"
                  ]
                },
                {
                  title: "Flachdach-Montage",
                  description: "Auf Flachdächern werden die Module aufgeständert und mit Gewichten beschwert, ohne die Dachhaut zu beschädigen. Diese Methode ermöglicht eine optimale Ausrichtung und Neigung der Module.",
                  image: "/images/pv-montage/flachdach.jpg",
                  advantages: [
                    "Optimale Ausrichtung zur Sonne möglich",
                    "Keine Dachdurchdringung notwendig",
                    "Einfache Installation und Wartung",
                    "Höhere Energieerträge durch optimale Neigung"
                  ]
                },
                {
                  title: "Vordach-Montage",
                  description: "Diese Methode umfasst die Montage der Solarmodule über bestehenden Strukturen wie Terrassen oder Carports. Sie bietet zusätzlichen Schutz vor Witterungseinflüssen und nutzt freie Flächen effizient.",
                  image: "/images/pv-montage/vordach.jpg",
                  advantages: [
                    "Doppelnutzen: Überdachung und Stromerzeugung",
                    "Effizienter Flächeneinsatz",
                    "Schutz für Fahrzeuge oder Sitzbereich",
                    "Optionale transparente Module für Lichtdurchlass"
                  ]
                },
                {
                  title: "Fassadenmontage",
                  description: "Bei dieser Methode werden die Solarmodule an der Gebäudefassade angebracht. Es gibt zwei Arten: Die Kaltfassade, bei der die Module vor die Fassade montiert werden, und die Warmfassade, bei der die Module in die Gebäudestruktur integriert werden und als Wärmedämmung dienen.",
                  image: "/images/pv-montage/fassade.jpg",
                  advantages: [
                    "Nutzung vertikaler Gebäudeflächen",
                    "Architektonisches Gestaltungselement",
                    "Kombination mit Wärmedämmung möglich",
                    "Ideal bei begrenzten Dachflächen"
                  ]
                }
              ].map((type, index) => (
                <InView
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={cn(
                    "flex flex-col md:flex-row items-center gap-8",
                    index % 2 !== 0 ? "md:flex-row-reverse" : ""
                  )}>
                    <div className="w-full md:w-2/5">
                      <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
                        <Image
                          src={type.image || `/images/pv-montage/placeholder.jpg`}
                          fill
                          className="object-cover"
                          alt={type.title}
                        />
                      </div>
                    </div>
                    
                    <div className="w-full md:w-3/5">
                      <H3 className="text-2xl font-semibold mb-3">{type.title}</H3>
                      <Paragraph className="mb-4">{type.description}</Paragraph>
                      
                      <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-500/10">
                        <div className="font-medium text-yellow-700 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Vorteile
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {type.advantages.map((advantage, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-sm">{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </InView>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Montageanleitung */}
      <Section className="mt-16" id="montageanleitung">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg border border-yellow-500/10 p-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                <div className="p-4 bg-yellow-100 rounded-full">
                  <FileText className="h-10 w-10 text-yellow-600" />
                </div>
                <div>
                  <H2 className="text-2xl font-bold">IBC TOPFIX200 Montageanleitung</H2>
                  <Paragraph className="text-muted-foreground">
                    Detaillierte Anleitung für die professionelle Installation des IBC TOPFIX200 Montagesystems
                  </Paragraph>
                </div>
              </div>
              
              <div className="mb-6">
                <Paragraph className="mb-4">
                  Die IBC TOPFIX200 Montageanleitung enthält alle wichtigen Informationen zur korrekten Installation des Montagesystems, einschließlich:
                </Paragraph>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                    <span>Detaillierte Schritt-für-Schritt Anweisungen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                    <span>Illustrierte Diagramme und technische Zeichnungen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                    <span>Materiallisten und benötigte Werkzeuge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1" />
                    <span>Sicherheitshinweise und Best Practices</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
                <div className="flex items-start gap-3">
                  <div className="text-yellow-600 mt-1">
                    <HomeIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-yellow-800 mb-1">Anwendbar für:</div>
                    <Paragraph className="text-sm text-yellow-700">
                      Schrägdächer mit Ziegeln, Schiefer oder Wellplatten. Das System ist für verschiedene Dachneigungen und Dacheindeckungen geeignet.
                    </Paragraph>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <Link 
                  href="/downloads/IBC_TOPFIX200.pdf" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium"
                  target="_blank"
                >
                  <Download className="h-5 w-5" />
                  Montageanleitung herunterladen (PDF)
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="mt-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 md:p-10 text-center">
              <div className="inline-block bg-white p-3 rounded-full shadow-sm mb-6">
                <Sun className="h-8 w-8 text-yellow-500" />
              </div>
              <H2 className="text-2xl md:text-3xl font-bold mb-4">Bereit für Ihr Photovoltaik-Projekt?</H2>
              <Paragraph className="text-muted-foreground max-w-2xl mx-auto mb-8">
                TREU Service steht Ihnen mit Fachwissen, Erfahrung und hochwertigen Komponenten für eine effiziente und sichere PV-Installation zur Verfügung. Kontaktieren Sie uns noch heute!
              </Paragraph>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/pv-montage" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition-colors">
                  Zurück zur PV-Montage Seite
                </Link>
                <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/5 transition-colors">
                  Kostenloses Angebot anfordern
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
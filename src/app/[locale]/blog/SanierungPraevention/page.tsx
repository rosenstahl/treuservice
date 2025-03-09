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
  Flame, 
  Droplet, 
  Bug,
  AlertTriangle,
  Home,
  Info,
  PhoneCall,
  FileText,
  Megaphone,
  ShieldAlert
} from "lucide-react"
import sanierungData from "@/i18n/de/sanierung.json"

export default function SanierungPraeventionPage() {
  return (
    <div className="flex-1 pb-20">
      {/* Hero Section */}
      <Section className="pt-32 bg-gradient-to-b from-primary/10 to-transparent">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block animate-bounce bg-red-100 p-2 rounded-full mb-4">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <H1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Schadensprävention und Erste Hilfe
            </H1>
            <div className="bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent text-xl md:text-2xl font-medium mb-6">
              Tipps zur Vorbeugung und zum richtigen Handeln im Schadensfall
            </div>
            <Paragraph className="text-muted-foreground text-lg mb-8">
              Dieser Leitfaden bietet Ihnen wertvolle Informationen, wie Sie Brand-, Wasser- und Schimmelschäden effektiv vorbeugen können und was im Ernstfall zu tun ist. Vorbereitet sein ist der beste Schutz für Ihr Eigentum und Ihre Gesundheit.
            </Paragraph>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
              <Link href="/sanierung" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                Zurück zur Sanierungsseite
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors">
                Beratungsgespräch vereinbaren
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Separator className="my-8" />

      {/* Präventions-Bereiche */}
      <Section>
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="space-y-16">
              {sanierungData.praevention.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="bg-white rounded-xl shadow-lg p-8 border border-primary/10">
                  <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="w-full md:w-1/3">
                      <div className="rounded-xl overflow-hidden relative h-[200px] md:h-[300px] shadow-md">
                        <Image
                          src={`/images/sanierung/prevention-${sectionIndex + 1}.jpg`}
                          fill
                          className="object-cover"
                          alt={section.title}
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-full">
                              {sectionIndex === 0 && <Flame className="h-6 w-6 text-red-500" />}
                              {sectionIndex === 1 && <Droplet className="h-6 w-6 text-blue-500" />}
                              {sectionIndex === 2 && <Bug className="h-6 w-6 text-green-600" />}
                            </div>
                            <H3 className="text-white text-lg font-bold">{section.title}</H3>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-2/3">
                      <div className="mb-6">
                        <div className="inline-block bg-primary/10 px-4 py-2 rounded-lg text-primary font-semibold mb-2">
                          Warum ist dies wichtig?
                        </div>
                        <Paragraph>
                          {sectionIndex === 0 && "Brände können binnen Minuten ganze Gebäude zerstören und Menschenleben gefährden. Durch richtige Prävention und schnelles Handeln können Sie fatale Folgen verhindern."}
                          {sectionIndex === 1 && "Wasserschäden verursachen nicht nur hohe Kosten, sondern können auch zu Schimmelbildung und Strukturschäden führen. Eine schnelle Erkennung und Reaktion ist entscheidend."}
                          {sectionIndex === 2 && "Schimmelpilze stellen ein ernsthaftes Gesundheitsrisiko dar und können Allergien und Atemwegserkrankungen verursachen. Die richtige Prävention beginnt bei der Kontrolle der Luftfeuchtigkeit."}
                        </Paragraph>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 rounded-full">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                          </div>
                          <H3 className="font-semibold">Häufige Risikofaktoren:</H3>
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
                          {sectionIndex === 0 && ["Defekte Elektrogeräte", "Überlastete Steckdosen", "Unbeaufsichtigte Kerzen", "Fehlerhafte Elektroinstallationen", "Brennbare Materialien nahe Wärmequellen", "Fehlende Rauchmelder"].map((risk, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <ShieldAlert className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                              <span className="text-sm">{risk}</span>
                            </li>
                          ))}
                          {sectionIndex === 1 && ["Alte oder marode Rohrleitungen", "Verstopfte Dachrinnen", "Unbemerkte Leckagen", "Defekte Haushaltsgeräte mit Wasserzulauf", "Mangelnde Abdichtung im Sanitärbereich", "Fehlendes Notfallwissen"].map((risk, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <ShieldAlert className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                              <span className="text-sm">{risk}</span>
                            </li>
                          ))}
                          {sectionIndex === 2 && ["Hohe Luftfeuchtigkeit", "Mangelnde Lüftung", "Wärmebrücken", "Wasserschäden", "Undichte Fenster und Dächer", "Falsche Möbelplatzierung an Außenwänden"].map((risk, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <ShieldAlert className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                              <span className="text-sm">{risk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <InView
                        key={subIndex}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.5, delay: subIndex * 0.1 }}
                      >
                        <div className={cn(
                          "p-6 rounded-xl shadow-sm border",
                          subIndex === 0 ? "bg-blue-50 border-blue-200" : "bg-orange-50 border-orange-200"
                        )}>
                          <div className="flex items-center gap-3 mb-4">
                            <div className={cn(
                              "p-2 rounded-full",
                              subIndex === 0 ? "bg-blue-100" : "bg-orange-100"
                            )}>
                              {subIndex === 0 ? 
                                <Home className={cn("h-5 w-5", sectionIndex === 0 ? "text-red-500" : sectionIndex === 1 ? "text-blue-500" : "text-green-600")} /> : 
                                <Megaphone className={cn("h-5 w-5", sectionIndex === 0 ? "text-red-500" : sectionIndex === 1 ? "text-blue-500" : "text-green-600")} />
                              }
                            </div>
                            <H3 className={cn(
                              "text-lg font-semibold",
                              subIndex === 0 ? "text-blue-700" : "text-orange-700"
                            )}>{subsection.title}</H3>
                          </div>
                          <ul className="space-y-3">
                            {subsection.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className={cn(
                                  "mt-1",
                                  subIndex === 0 ? "text-blue-500" : "text-orange-500"
                                )}>
                                  <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <Paragraph className="text-sm">{item}</Paragraph>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </InView>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Notfallkontakte */}
      <Section className="bg-gray-50 mt-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <H2 className="text-3xl font-bold mb-4">Wichtige Notfallkontakte</H2>
              <Paragraph className="text-muted-foreground">
                Im Notfall zählt jede Sekunde. Speichern Sie diese Kontakte.
              </Paragraph>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Flame className="h-5 w-5 text-red-500" />
                    Feuer & Notfall
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <PhoneCall className="h-4 w-4 text-red-500" />
                    <span className="font-bold">112</span>
                  </div>
                  <Paragraph className="text-xs text-muted-foreground">
                    Für Brände, medizinische Notfälle und akute Gefahrensituationen
                  </Paragraph>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-blue-500" />
                    Wasserschäden
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <PhoneCall className="h-4 w-4 text-blue-500" />
                    <span className="font-bold">Installateurnotdienst</span>
                  </div>
                  <Paragraph className="text-xs text-muted-foreground">
                    Lokalen Notdienst für Wasserschäden kontaktieren
                  </Paragraph>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="h-5 w-5 text-green-500" />
                    TREU Service Notdienst
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <PhoneCall className="h-4 w-4 text-green-500" />
                    <span className="font-bold">0800-123-4567</span>
                  </div>
                  <Paragraph className="text-xs text-muted-foreground">
                    24/7 verfügbar für Notfallsanierungen
                  </Paragraph>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="mt-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 md:p-10">
              <div className="text-center">
                <div className="inline-block bg-white p-3 rounded-full shadow-sm mb-6">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <H2 className="text-2xl md:text-3xl font-bold mb-4">Kostenlose Risikoanalyse für Ihr Gebäude</H2>
                <Paragraph className="text-muted-foreground max-w-2xl mx-auto mb-8">
                  Lassen Sie Ihr Gebäude von unseren Experten auf potenzielle Risikofaktoren untersuchen und erhalten Sie einen individuellen Präventionsplan.
                </Paragraph>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link href="/sanierung" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                    Mehr über unsere Sanierungsleistungen
                  </Link>
                  <Link href="/kontakt" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors">
                    Kostenlose Risikoanalyse anfordern
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
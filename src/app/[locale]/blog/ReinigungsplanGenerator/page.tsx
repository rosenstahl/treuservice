"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import ReinigungsplanTool from './ReinigungsplanTool'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronRight, 
  Download, 
  ClipboardList, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Leaf,
  DownloadCloud,
  ArrowDownCircle,
  ExternalLink,
  ArrowRight
} from 'lucide-react'

export default function ReinigungsplanGeneratorPage() {
  return (
    <div className="flex-1">
      <Section className="pt-0 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Reinigung</span>
          </div>
          
          <div className="max-w-4xl">
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Professioneller Reinigungsplan-Generator
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              Erstellen Sie individuelle Reinigungspläne für Ihre spezifischen Anforderungen
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Optimieren Sie Ihre Reinigungsprozesse mit maßgeschneiderten Reinigungsplänen, die auf Ihre individuellen Bedürfnisse zugeschnitten sind. Unser interaktiver Generator erstellt für Sie professionelle Reinigungspläne mit klaren Zuständigkeiten, Zeitplänen und Aufgabenlisten - einfach anpassbar für Büros, Praxen, Gewerbeimmobilien und mehr.
            </Paragraph>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Hauptinhalt */}
              <div className="prose prose-lg max-w-none">
                <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/reinigung/reinigungsplan.jpg" 
                    alt="Professioneller Reinigungsplan" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <p className="text-white text-sm p-4">Ein durchdachter Reinigungsplan sorgt für langfristige Sauberkeit und Hygiene</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <ClipboardList className="w-6 h-6 mr-2 text-primary" />
                  Warum ein professioneller Reinigungsplan unverzichtbar ist
                </h2>
                
                <p>
                  Ein systematischer Reinigungsplan ist das Fundament für nachhaltige Sauberkeit und Hygiene in jeder Immobilie. Er sorgt nicht nur für ein angenehmes Ambiente, sondern trägt maßgeblich zur Werterhaltung bei und reduziert langfristig Kosten durch:
                </p>

                <ul className="mb-6">
                  <li><strong>Bedarfsgerechte Reinigungsintervalle</strong> – vermeidet Über- oder Unterreinigung</li>
                  <li><strong>Klare Aufgabenverteilung</strong> – verhindert Doppelarbeit oder vergessene Bereiche</li>
                  <li><strong>Nachverfolgbarkeit</strong> – dokumentiert erledigte Aufgaben transparent</li>
                  <li><strong>Optimierte Ressourcennutzung</strong> – spart Zeit, Material und Personal</li>
                  <li><strong>Langfristige Qualitätssicherung</strong> – garantiert gleichbleibend hohen Standard</li>
                </ul>

                <p>
                  Ein professionell erstellter Reinigungsplan berücksichtigt die spezifischen Anforderungen Ihrer Räumlichkeiten, die Nutzungsfrequenz, Materialien und gesetzliche Vorgaben. Unsere Experten haben einen interaktiven Generator entwickelt, der Ihnen hilft, genau diesen individuellen Plan zu erstellen.
                </p>

                <Alert className="my-8 bg-primary/5 border-primary/20">
                  <CheckCircle2 className="h-5 w-5" />
                  <AlertTitle>Studien belegen</AlertTitle>
                  <AlertDescription>
                    <p className="mt-2">Optimierte Reinigungspläne können die Reinigungskosten um bis zu 20% senken und gleichzeitig die Zufriedenheit der Nutzer deutlich steigern. Eine strukturierte Reinigung reduziert nachweislich krankheitsbedingte Ausfälle und verbessert das Wohlbefinden am Arbeitsplatz.</p>
                  </AlertDescription>
                </Alert>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-primary" />
                  Reinigungsintervalle richtig planen
                </h2>

                <p>
                  Die Festlegung der richtigen Reinigungsintervalle ist entscheidend für einen effizienten Reinigungsplan. Je nach Bereich, Nutzungsintensität und Anforderungen an die Hygiene variieren die optimalen Intervalle deutlich:
                </p>

                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-primary/10">
                        <th className="border p-2 text-left">Bereich</th>
                        <th className="border p-2 text-left">Täglich</th>
                        <th className="border p-2 text-left">Wöchentlich</th>
                        <th className="border p-2 text-left">Monatlich</th>
                        <th className="border p-2 text-left">Quartal/Jahr</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 font-medium">Sanitärbereiche</td>
                        <td className="border p-2">Grundreinigung, Auffüllen von Materialien</td>
                        <td className="border p-2">Desinfektion aller Oberflächen</td>
                        <td className="border p-2">Spezialreinigung Fugen/Abflüsse</td>
                        <td className="border p-2">Tiefenreinigung</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">Büroflächen</td>
                        <td className="border p-2">Papierkorb, Oberflächen</td>
                        <td className="border p-2">Staubwischen, Bodenpflege</td>
                        <td className="border p-2">Tastaturen, Telefone</td>
                        <td className="border p-2">Fenster, Polstermöbel</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">Verkehrsflächen</td>
                        <td className="border p-2">Böden, Eingangsbereiche</td>
                        <td className="border p-2">Treppenhaus reinigen</td>
                        <td className="border p-2">Handläufe desinfizieren</td>
                        <td className="border p-2">Grundreinigung Bodenbeläge</td>
                      </tr>
                      <tr>
                        <td className="border p-2 font-medium">Küche/Sozialräume</td>
                        <td className="border p-2">Arbeitsflächen, Spülbecken</td>
                        <td className="border p-2">Kühlschrank, Mikrowelle</td>
                        <td className="border p-2">Schränke, Lagerbestände</td>
                        <td className="border p-2">Gerätereinigung innen</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <p className="text-sm text-muted-foreground">
                  <em>Hinweis: Diese Tabelle bietet eine allgemeine Orientierung. Mit unserem Generator können Sie die Intervalle an Ihre spezifischen Anforderungen anpassen.</em>
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-primary" />
                  Reinigungsdokumentation – Warum sie unverzichtbar ist
                </h2>

                <p>
                  Eine lückenlose Dokumentation der Reinigungsleistungen ist nicht nur für die Qualitätssicherung wichtig, sondern bietet zahlreiche weitere Vorteile:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <ShieldCheck className="w-5 h-5 mr-2 text-green-600" />
                        Rechtliche Sicherheit
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Nachweis der Erfüllung gesetzlicher Pflichten, besonders wichtig für Gesundheitseinrichtungen und Lebensmittelbetriebe. Schützt bei Haftungsansprüchen.</p>
                    </CardContent>
                  </Card>

                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
                        Qualitätskontrolle
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Ermöglicht die regelmäßige Überprüfung der Reinigungsqualität und schnelles Eingreifen bei Mängeln. Fördert kontinuierliche Verbesserung.</p>
                    </CardContent>
                  </Card>

                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Users className="w-5 h-5 mr-2 text-amber-600" />
                        Kommunikation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Transparenz für alle Beteiligten – vom Reinigungspersonal bis zum Management. Klare Zuständigkeiten und Ansprechpartner.</p>
                    </CardContent>
                  </Card>

                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Leaf className="w-5 h-5 mr-2 text-green-600" />
                        Ressourceneffizienz
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Optimierter Einsatz von Personal, Zeit und Reinigungsmitteln durch Analyse der Dokumentation. Unterstützt nachhaltige Reinigungskonzepte.</p>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-2xl font-bold mt-10 mb-6 flex items-center">
                  <DownloadCloud className="w-6 h-6 mr-2 text-primary" />
                  Ihr individueller Reinigungsplan-Generator
                </h2>

                <p className="mb-6">
                  Nutzen Sie unser interaktives Tool, um in wenigen Schritten Ihren maßgeschneiderten Reinigungsplan zu erstellen. Wählen Sie einfach die für Sie relevanten Parameter und erhalten Sie sofort Ihren personalisierten Plan.
                </p>
              </div>

              {/* Reinigungsplan Generator Tool */}
              <div className="mt-6 mb-12">
                <ReinigungsplanTool />
              </div>

              <div className="prose prose-lg max-w-none mt-12">
                <h2 className="text-2xl font-bold mt-8 mb-4">Digitale Reinigungsdokumentation als Zukunftstrend</h2>

                <p>
                  In der modernen Gebäudereinigung hat die digitale Transformation längst begonnen. Die Vorteile digitaler Systeme gegenüber herkömmlichen Papierlösungen sind beeindruckend:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <div className="bg-slate-50 p-6 rounded-lg border">
                    <h3 className="text-lg font-bold mb-3 text-red-600">Herkömmliche Papierlösungen</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Hoher Zeit- und Verwaltungsaufwand</li>
                      <li>Fehleranfällig bei der Dokumentation</li>
                      <li>Schwierige Nachverfolgung und Auswertung</li>
                      <li>Kaum Echtzeit-Kontrolle möglich</li>
                      <li>Hoher Ressourcenverbrauch (Papier)</li>
                      <li>Aufwändige Archivierung und Einsicht</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border border-green-100">
                    <h3 className="text-lg font-bold mb-3 text-green-600">Digitale Reinigungssysteme</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Automatisierte Prozesse sparen Zeit</li>
                      <li>Lückenlose, präzise Dokumentation</li>
                      <li>Einfache Auswertung und Optimierung</li>
                      <li>Echtzeit-Einblick in erledigte Aufgaben</li>
                      <li>Ressourcenschonend und nachhaltig</li>
                      <li>Flexible Zugriffsrechte und Transparenz</li>
                    </ul>
                  </div>
                </div>

                <p>
                  Moderne digitale Lösungen zur Reinigungsplanung und -dokumentation bieten häufig auch spezielle Apps für Smartphone oder Tablet. So kann das Reinigungspersonal direkt vor Ort Aufgaben abhaken und Probleme dokumentieren – inklusive Fotodokumentation und Zeitstempel.
                </p>

                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 my-8">
                  <h3 className="text-xl font-bold mb-4">Professionelle Reinigungsleistungen vom Experten</h3>
                  <p className="mb-4">
                    Sie möchten sich nicht mit der komplexen Planung und Durchführung von Reinigungsaufgaben beschäftigen? TREU Service übernimmt für Sie die professionelle Reinigung Ihrer Räumlichkeiten – mit optimierten Prozessen, geschultem Personal und maßgeschneiderten Lösungen.
                  </p>
                  <Button className="w-full sm:w-auto mt-2" asChild>
                    <Link href="/reinigung">
                      Reinigungsangebot anfordern <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Inhaltsverzeichnis */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Inhaltsverzeichnis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="text-sm">
                      <ul className="space-y-1">
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center">
                            <ClipboardList className="w-4 h-4 mr-1" />
                            Warum ein Reinigungsplan wichtig ist
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            Reinigungsintervalle planen
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Reinigungsdokumentation
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center">
                            <DownloadCloud className="w-4 h-4 mr-1" />
                            Reinigungsplan-Generator
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center">
                            <Sparkles className="w-4 h-4 mr-1" />
                            Digitale Dokumentation
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </CardContent>
                </Card>
                
                {/* Download Checklist */}
                <Card className="bg-green-50 border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Download className="w-5 h-5 mr-2 text-green-600" />
                      Kostenlose Checklisten
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Ergänzen Sie Ihren Reinigungsplan mit unseren kostenlosen Checklisten:
                    </p>
                    <ul className="text-sm space-y-2 mb-4">
                      <li className="flex items-center">
                        <ArrowDownCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span>Hygiene-Checkliste für Sanitärbereiche</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowDownCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span>Kontrolliste für Grundreinigungen</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowDownCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span>Qualitäts-Check für die Gebäudereinigung</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-100">
                      Checklisten herunterladen
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Related Articles */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Verwandte Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link 
                        href="/blog/reinigung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Professionelle Reinigungstipps
                      </Link>
                      <a 
                        href="#" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Nachhaltige Reinigungsmethoden
                      </a>
                      <a 
                        href="#" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Hygieneanforderungen in Gewerbeimmobilien
                      </a>
                      <a 
                        href="#" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Spezialreinigung für sensible Bereiche
                      </a>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Expert Advice */}
                <Card className="bg-blue-50 border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <ExternalLink className="w-5 h-5 mr-2 text-blue-600" />
                      Expertentipps
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Unsere Reinigungsexperten beraten Sie gerne persönlich zu optimalen Reinigungskonzepten für Ihre spezifischen Anforderungen. Profitieren Sie von über 15 Jahren Erfahrung in der professionellen Gebäudereinigung.
                    </p>
                    <Button className="w-full">
                      Kostenlose Beratung vereinbaren
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronRight, 
  CloudSnow, 
  Clock, 
  Thermometer, 
  Smartphone, 
  ArrowUpRight,
  Database,
  MapPin,
  BarChart3,
  Wind,
  Radar,
  Droplets,
  AlertTriangle,
  Info
} from 'lucide-react'

export default function WetterDatenWinterdienstPage() {
  return (
    <div className="flex-1">
      <Section className="pt-0 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Winterdienst</span>
          </div>
          
          <div className="max-w-4xl">
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Smarter Winterdienst: Intelligente Wetterdaten und Prognosemodelle
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              Wie moderne Technologien den Winterdienst effizienter, kosteneffektiver und umweltfreundlicher machen
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Der Einsatz präziser Wetterprognosen und intelligenter Datenanalyse revolutioniert den Winterdienst. Erfahren Sie, wie Sie mit modernen Technologien Ressourcen sparen, Kosten senken und die Sicherheit erhöhen können.
            </Paragraph>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Hauptinhalt */}
              <div className="prose prose-lg max-w-none">
                <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
                  <Image 
                    src="/images/blog/winterdienst/weather-data.jpg" 
                    alt="Winterdienst mit modernster Datenanalyse" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <p className="text-white text-sm p-4">Moderne Wetterprognosen ermöglichen präzise Winterdienst-Planung</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-6 mb-4 flex items-center">
                  <Database className="w-6 h-6 mr-2 text-primary" />
                  Die wichtigsten Datenquellen für den Winterdienst
                </h2>
                
                <p>
                  Präzise Wetterdaten sind das Fundament eines effizienten Winterdienstes. Sie ermöglichen eine vorausschauende Planung und bedarfsgerechten Ressourceneinsatz. Folgende Datenquellen stehen heute zur Verfügung:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Radar className="w-5 h-5 mr-2 text-blue-500" />
                        Deutscher Wetterdienst (DWD)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Offizielle Wetterwarnungen und Vorhersagen</li>
                        <li>Stündlich aktualisierte Prognosen für Deutschland</li>
                        <li>Hochaufgelöste Niederschlagsradardaten (RW/RZ-Produkte)</li>
                        <li>Zugang über kostenfreie Open Data API</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Thermometer className="w-5 h-5 mr-2 text-red-500" />
                        Straßenwetterstationen
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Echtzeit-Überwachung der Straßenverhältnisse</li>
                        <li>Messung von Fahrbahn- und Bodentemperaturen</li>
                        <li>Erfassung von Niederschlagsart und -menge</li>
                        <li>Detektion von Reifglätte und Straßenzustand</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-amber-500" />
                        Historische Daten und Statistiken
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Analyse vergangener Winterperioden</li>
                        <li>Regionaltypische Wettermuster</li>
                        <li>Korrelation zwischen Wetterbedingungen und Einsatzaufwand</li>
                        <li>Statistische Vorhersagemodelle</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-green-500" />
                        Lokale Sensornetzwerke
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>IoT-basierte Bodensensoren für Feuchtigkeit und Temperatur</li>
                        <li>Eigenständige Wetterstationen für präzise Mikroklimaanalyse</li>
                        <li>Integration mit Fahrzeugsensoren im Echtzeiteinsatz</li>
                        <li>Automatische Datenaggregation in der Cloud</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Alert className="my-6">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warum herkömmliche Wetterberichte nicht ausreichen</AlertTitle>
                  <AlertDescription>
                    Standard-Wetterberichte geben nur grobe Trends für größere Gebiete an und sind für eine präzise Winterdienstplanung unzureichend. Lokale Mikroklimaeffekte, genaue Niederschlagszeiten und Oberflächentemperaturen - entscheidend für die Bildung von Glätte - werden nicht ausreichend berücksichtigt.
                  </AlertDescription>
                </Alert>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Smartphone className="w-6 h-6 mr-2 text-primary" />
                  Moderne Winter-Apps und Prognosetools
                </h2>

                <p>
                  Die Digitalisierung hat auch vor dem Winterdienst nicht Halt gemacht. Moderne Software-Lösungen und Apps unterstützen bei der effizienten Planung und Durchführung:
                </p>

                <div className="my-6 space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-bold text-lg mb-2 flex items-center">
                      <CloudSnow className="w-5 h-5 mr-2 text-blue-600" />
                      Präzise Schneefall-Prognose
                    </h3>
                    <p className="text-sm mb-3">
                      Moderne Prognosetools kombinieren verschiedene Datenquellen und meteorologische Modelle, um präzise Vorhersagen zu treffen:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>Niederschlagsart-Erkennung:</strong> Unterscheidung zwischen Schnee, Schneeregen und Regen</li>
                      <li><strong>Zeitleiste:</strong> Exakte Prognose von Beginn und Ende des Schneefalls</li>
                      <li><strong>Akkumulationsvorhersage:</strong> Erwartete Schneehöhe in cm</li>
                      <li><strong>Gebietsspezifische Auflösung:</strong> Punktgenaue Vorhersagen für spezifische Standorte</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-bold text-lg mb-2 flex items-center">
                      <Thermometer className="w-5 h-5 mr-2 text-red-600" />
                      Glätte- und Temperaturanalyse
                    </h3>
                    <p className="text-sm mb-3">
                      Besonders gefährlich: Temperaturschwankungen um den Gefrierpunkt können zu überraschender Glätte führen:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>Oberflächentemperatur-Prognose:</strong> Präzise Vorhersage der Bodentemperaturen</li>
                      <li><strong>Taupunktberechnung:</strong> Erkennung von Reifglätte-Risiko</li>
                      <li><strong>Eisregen-Frühwarnung:</strong> Rechtzeitige Warnungen vor besonders gefährlichen Wetterereignissen</li>
                      <li><strong>Schmelzwasser-Analyse:</strong> Prognose von Wieder-Vereisungen nach Tauphasen</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h3 className="font-bold text-lg mb-2 flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-amber-600" />
                      Einsatzplanung und Ressourcenoptimierung
                    </h3>
                    <p className="text-sm mb-3">
                      Intelligente Systeme berechnen den optimalen Zeitpunkt und Umfang von Winterdienst-Einsätzen:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li><strong>Präventive Einsatzempfehlungen:</strong> Optimaler Zeitpunkt für präventives Streuen</li>
                      <li><strong>Routenoptimierung:</strong> Effiziente Streckenplanung für Räumfahrzeuge</li>
                      <li><strong>Streumittel-Kalkulation:</strong> Berechnung des optimalen Materialeinsatzes</li>
                      <li><strong>Ressourcenmanagement:</strong> Personal- und Fahrzeugplanung basierend auf Wetterprognosen</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Vorteile datengestützter Winterdienst-Konzepte</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <Card className="bg-green-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center text-green-700">
                        <Droplets className="w-5 h-5 mr-2" />
                        Umweltvorteile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Reduzierung des Streusalz-Einsatzes um bis zu 30%</li>
                        <li>Verringerung der Bodenbelastung</li>
                        <li>Schutz von Straßenbegleitgrün und Grundwasser</li>
                        <li>Geringere CO₂-Emissionen durch optimierte Routen</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center text-blue-700">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Wirtschaftliche Vorteile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Kosteneinsparung durch bedarfsgerechten Materialeinsatz</li>
                        <li>Reduzierung unnötiger Einsatzfahrten</li>
                        <li>Effiziente Personalplanung</li>
                        <li>Geringerer Verschleiß an Fahrzeugen und Straßen</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-amber-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center text-amber-700">
                        <Wind className="w-5 h-5 mr-2" />
                        Sicherheitsvorteile
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Schnellere Reaktion auf kritische Wetterereignisse</li>
                        <li>Höhere Verkehrssicherheit durch präventives Handeln</li>
                        <li>Bessere Dokumentation für Haftungsfragen</li>
                        <li>Reduzierung von glättebedingten Unfällen</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Praxisbeispiel: Intelligenter Winterdienst in der Anwendung</h2>

                <div className="bg-gray-50 p-6 rounded-lg border mb-6">
                  <h3 className="font-bold text-lg mb-3">Fallstudie: Mittelgroße Wohnanlage mit 300 Wohneinheiten</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Ausgangssituation:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Pauschaler Winterdienst über 4 Monate</li>
                      <li>Fixe Einsatzzeiten unabhängig vom Wetter</li>
                      <li>Hoher Streumittelverbrauch</li>
                      <li>Jährliche Kosten: ca. 12.000 € </li>
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Implementierung des intelligenten Winterdienstes:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Installation von drei IoT-Bodensensoren zur lokalen Temperatur- und Feuchtigkeitsmessung</li>
                      <li>Integration mit hochaufgelösten DWD-Wetterdaten</li>
                      <li>App-basierte Einsatzsteuerung mit automatischen Alarmen</li>
                      <li>Bedarfsgerechter Winterdienst mit wetterspezifischer Einsatzplanung</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Ergebnisse nach einem Jahr:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Reduzierung der Einsatzfahrten um 38%</li>
                      <li>Streumittel-Einsparung von 42%</li>
                      <li>Höhere Zufriedenheit der Bewohner durch bessere Räumqualität</li>
                      <li>Kosten-Einsparung von 3.800 € im Vergleich zum Vorjahr</li>
                      <li>Return on Investment der Sensortechnologie: 9 Monate</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4">Implementierung für Ihr Unternehmen</h2>

                <p className="mb-4">
                  Der Einstieg in einen intelligenten, datengestützten Winterdienst ist einfacher als gedacht. Je nach Größe und Anforderungen Ihres Objekts gibt es verschiedene Implementierungsstufen:
                </p>

                <div className="space-y-4 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100">
                    <h3 className="font-bold text-lg mb-2">Basis-Implementierung</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Nutzung kostenfreier DWD-Daten über API</li>
                      <li>Einrichtung eines einfachen Benachrichtigungssystems</li>
                      <li>Grundlegende Einsatzplanung basierend auf Wettervorhersagen</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-blue-100 to-white p-4 rounded-lg border border-blue-200">
                    <h3 className="font-bold text-lg mb-2">Erweiterte Implementierung</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Installation einzelner Bodensensoren an kritischen Stellen</li>
                      <li>Integration einer spezialisierten Winterdienst-App</li>
                      <li>Einsatz von präzisen Streuautomaten mit GPS-Tracking</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-blue-200 to-white p-4 rounded-lg border border-blue-300">
                    <h3 className="font-bold text-lg mb-2">Vollständige Implementierung</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Flächendeckendes Sensornetzwerk für Mikroklimaanalyse</li>
                      <li>Integration in bestehende Facility Management-Systeme</li>
                      <li>Automatisierte Einsatzplanung mit KI-Algorithmen</li>
                      <li>Vollständige digitale Dokumentation und Reporting</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 mb-8">
                  <h3 className="font-bold text-xl mb-3 text-primary">Unser Angebot: Smart Winterdienst</h3>
                  <p className="mb-4">
                    TREU Service bietet einen vollständig datengestützten, intelligenten Winterdienst an. Unsere Lösung kombiniert modernste Sensortechnologie mit präzisen Wetterprognosen und erfahrenen Winterdienst-Teams.
                  </p>
                  <Button className="w-full sm:w-auto" asChild>
                    <Link href="/winterdienst">
                      Smarten Winterdienst anfragen <ArrowUpRight className="ml-2 h-4 w-4" />
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
                            <Database className="w-4 h-4 mr-1" />
                            Wichtige Datenquellen
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center">
                            <Smartphone className="w-4 h-4 mr-1" />
                            Winter-Apps und Prognosetools
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Vorteile datengestützter Konzepte
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center">
                            <Info className="w-4 h-4 mr-1" />
                            Praxisbeispiel
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center">
                            <ArrowUpRight className="w-4 h-4 mr-1" />
                            Implementierung
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </CardContent>
                </Card>
                
                {/* Related Articles */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weitere Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link 
                        href="/blog/RaeumpflichtGuide" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Interaktiver Räumpflicht-Guide 2025
                      </Link>
                      <Link 
                        href="/blog/winterdienst" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        DIY-Winterdienst Tipps
                      </Link>
                      <Link 
                        href="/blog/streumittel" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Streugut-Vergleich für den Winterdienst
                      </Link>
                      <Link 
                        href="/blog/StreumittelCalculator" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Streumittel-Rechner
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* CTA Box */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Smartes Winterdienst-Paket</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Unser Premium-Winterdienstpaket mit Wetterprognose-Integration für einen effizienteren, umweltschonenderen Winterdienst.
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm mb-4">
                      <li>Echtzeit-Glätteüberwachung</li>
                      <li>Bedarfsgerechte Einsatzplanung</li>
                      <li>Ressourcenoptimierter Materialeinsatz</li>
                      <li>Digitale Dokumentation</li>
                    </ul>
                    <Button className="w-full" asChild>
                      <Link href="/winterdienst">
                        Unverbindliches Angebot anfordern
                      </Link>
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
"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import EntruemplungsKostenRechner from './EntruemplungsKostenRechner'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Calculator, PiggyBank, AlertTriangle, Info, Clock, Calendar, Euro } from 'lucide-react'

export default function EntruemplungsKostenRechnerPage() {
  return (
    <div className="flex-1">
      <Section className="pt-0 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Entrümpelung</span>
          </div>
          
          <div className="max-w-4xl">
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Entrümpelungskosten-Rechner 2025
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              Berechnen Sie die Kosten für Ihre Entrümpelung mit unserem interaktiven Tool
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Entrümpelungen können je nach Umfang, Art und regionalen Faktoren stark im Preis variieren. Mit unserem interaktiven Kostenrechner erhalten Sie eine realistische Einschätzung, mit welchen Kosten Sie für Ihr individuelles Entrümpelungsprojekt rechnen müssen.
            </Paragraph>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Kostenrechner-Komponente */}
              <EntruemplungsKostenRechner />
              
              {/* Zusätzliche Informationen */}
              <div className="mt-10 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      So entstehen die Kosten einer professionellen Entrümpelung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Paragraph>
                      Die Preisgestaltung für eine professionelle Entrümpelung kann für viele undurchsichtig erscheinen. Tatsächlich setzen sich die Kosten aus verschiedenen Faktoren zusammen, die je nach individuellem Fall unterschiedlich ins Gewicht fallen:
                    </Paragraph>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">Arbeitsaufwand & Personal</div>
                            <p className="text-sm text-slate-600">
                              Der Zeitaufwand und die Anzahl benötigter Mitarbeiter sind wesentliche Kostenfaktoren. Besonders bei schwierigen Objekten wie Messie-Wohnungen oder Häusern mit schwer zugänglichen Räumen steigt der Personalbedarf.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                            <Calculator className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">Menge & Art des Entrümpelungsguts</div>
                            <p className="text-sm text-slate-600">
                              Das Volumen und die Art der zu entsorgenden Gegenstände beeinflussen maßgeblich die Kosten. Besonders Sperrmüll, Sondermüll und Elektroschrott verursachen höhere Entsorgungskosten.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                            <Euro className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">Entsorgungsgebühren</div>
                            <p className="text-sm text-slate-600">
                              Die Gebühren für die fachgerechte Entsorgung variieren je nach Abfallart, Menge und regionalen Vorgaben. Diese Kosten werden in der Regel direkt an den Kunden weitergegeben.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">Standort & Zugänglichkeit</div>
                            <p className="text-sm text-slate-600">
                              Die Lage des Objekts, das Stockwerk, das Vorhandensein eines Aufzugs und die Parkplatzsituation spielen eine wichtige Rolle. Schwer zugängliche Bereiche wie Dachböden ohne richtigen Zugang verursachen Mehraufwand.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                            <PiggyBank className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">Potenzielle Wertgegenstände</div>
                            <p className="text-sm text-slate-600">
                              Vorhandene Wertgegenstände wie Antiquitäten, Sammlerstücke oder verwertbare Möbel können die Gesamtkosten senken, da sie gegen die Entrümpelungskosten aufgerechnet werden können.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-primary/10 text-primary shrink-0 mt-0.5">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-medium">Besondere Herausforderungen</div>
                            <p className="text-sm text-slate-600">
                              Spezialfälle wie Messie-Wohnungen, Hinterlassenschaften, Schädlingsbefall oder Schimmel erfordern besondere Maßnahmen und Schutzausrüstung, was zusätzliche Kosten verursacht.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      Checkliste: So bereiten Sie eine kosteneffiziente Entrümpelung vor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                      <Image 
                        src="/images/blog/entruempelung-vorbereitung.jpg" 
                        alt="Entrümpelungsvorbereitung"
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <H3 className="text-lg font-medium mb-2">Vor der Beauftragung</H3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Sortieren Sie vorab wertvolle oder persönliche Gegenstände aus</li>
                          <li>Erstellen Sie eine grobe Inventarliste der zu entsorgenden Gegenstände</li>
                          <li>Fotografieren Sie Räume und größere Gegenstände für präzisere Angebote</li>
                          <li>Prüfen Sie, ob Sie selbst Teile der Entrümpelung übernehmen könnten</li>
                          <li>Klären Sie die Zugangssituation und informieren Sie Nachbarn</li>
                        </ul>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <H3 className="text-lg font-medium mb-2">Bei der Angebotserstellung</H3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Holen Sie mindestens drei Vergleichsangebote ein</li>
                          <li>Achten Sie auf Pauschalangebote vs. Abrechnung nach Aufwand</li>
                          <li>Fragen Sie nach möglichen Wertanrechnungen</li>
                          <li>Klären Sie, ob die Entsorgungskosten inkludiert sind</li>
                          <li>Prüfen Sie, ob eine besenreine Übergabe im Angebot enthalten ist</li>
                        </ul>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-lg">
                        <H3 className="text-lg font-medium mb-2">Nach der Entrümpelung</H3>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Lassen Sie sich Entsorgungsnachweise aushändigen</li>
                          <li>Führen Sie eine gemeinsame Abnahme mit dem Dienstleister durch</li>
                          <li>Dokumentieren Sie den Endzustand mit Fotos</li>
                          <li>Prüfen Sie die Rechnung auf Übereinstimmung mit dem Angebot</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PiggyBank className="h-5 w-5 text-primary" />
                      Spartipps für die Entrümpelung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Paragraph>
                      Mit ein paar klugen Strategien können Sie die Kosten für Ihre Entrümpelung deutlich reduzieren:
                    </Paragraph>
                    
                    <ul className="list-disc pl-5 space-y-3">
                      <li>
                        <strong>Eigenleistung:</strong> Übernehmen Sie einfache Arbeiten selbst, wie das Ausräumen von Schränken oder das Sortieren von persönlichen Gegenständen. Bei den meisten Entrümpelungsfirmen können Sie durch Eigenleistung 10-20% der Kosten sparen.
                      </li>
                      <li>
                        <strong>Vorverkauf wertvoller Gegenstände:</strong> Versuchen Sie hochwertige Möbel, Elektronik oder Sammlerstücke vorab selbst zu verkaufen, statt sie der Entrümpelungsfirma zu überlassen. Online-Plattformen, lokale Flohmärkte oder spezialisierte Händler sind gute Anlaufstellen.
                      </li>
                      <li>
                        <strong>Sperrmülltermine nutzen:</strong> Für kleinere Mengen können Sie die kostenfreien oder günstigen Sperrmülltermine Ihrer Gemeinde nutzen. Planen Sie Ihre Entrümpelung entsprechend.
                      </li>
                      <li>
                        <strong>Gemeinsame Entrümpelung:</strong> Wenn in Ihrer Nachbarschaft mehrere Entrümpelungen anstehen, fragen Sie nach Kombiangeboten. Viele Firmen bieten Rabatte an, wenn sie mehrere Objekte in der gleichen Gegend bearbeiten können.
                      </li>
                      <li>
                        <strong>Saisonale Angebote:</strong> In der Nebensaison (meist Winter) bieten viele Entrümpelungsunternehmen günstigere Konditionen an. Wenn Ihre Entrümpelung nicht dringend ist, kann sich das Warten lohnen.
                      </li>
                      <li>
                        <strong>Spenden statt entsorgen:</strong> Viele gemeinnützige Organisationen nehmen gut erhaltene Möbel, Bücher, Kleidung und Haushaltsgegenstände kostenlos an. So sparen Sie Entsorgungskosten und tun etwas Gutes.
                      </li>
                    </ul>
                    
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-yellow-800">Wichtiger Hinweis:</span>
                          <p className="text-yellow-700 mt-1">
                            Achten Sie bei sehr günstigen Angeboten auf versteckte Kosten oder unseriöse Anbieter, die möglicherweise die Entsorgung nicht fachgerecht durchführen oder zusätzliche Kosten nachträglich in Rechnung stellen. Verlangen Sie immer ein detailliertes schriftliches Angebot und prüfen Sie Bewertungen oder Referenzen.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Inhaltsübersicht */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">In diesem Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <a href="#" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                          <ChevronRight className="h-3 w-3 mr-2" />
                          Kostenrechner für Entrümpelung
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                          <ChevronRight className="h-3 w-3 mr-2" />
                          Wie entstehen die Kosten
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                          <ChevronRight className="h-3 w-3 mr-2" />
                          Checkliste für Vorbereitung
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                          <ChevronRight className="h-3 w-3 mr-2" />
                          Spartipps für die Entrümpelung
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Verwandte Artikel */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weitere Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link 
                        href="/blog/reinigung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Professionelle Reinigungstipps
                      </Link>
                      <Link 
                        href="/blog/MaterialspezifischerReinigungsguide" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Materialspezifischer Reinigungsguide
                      </Link>
                      <Link 
                        href="/blog/NachhaltigeReinigung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Nachhaltige Reinigungsmethoden
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Services Promotion */}
                <Card className="bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Entrümpelung vom Profi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-4">
                      Überlassen Sie die Arbeit den Experten: TREU Service bietet professionelle Entrümpelungen zu fairen Preisen. Wir übernehmen alles - von der Beratung bis zur fachgerechten Entsorgung und übergeben Ihnen die Räumlichkeiten besenrein.
                    </Paragraph>
                    <Link href="/entruempelung" className="text-primary font-medium hover:underline text-sm">
                      Kostenfreies Angebot anfordern →
                    </Link>
                  </CardContent>
                </Card>
                
                {/* Rechtlicher Hinweis */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Hinweis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm text-amber-800">
                      Die Preisberechnung basiert auf aktuellen Durchschnittswerten (Stand: März 2025). Regionale Unterschiede und individuelle Faktoren können zu Abweichungen führen. Für ein verbindliches Angebot empfehlen wir eine professionelle Vor-Ort-Besichtigung.
                    </Paragraph>
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
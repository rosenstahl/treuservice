"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import Link from 'next/link'
import { ChevronRight, AlertTriangle, FileText, MapPin, Clock, BookOpen, ArrowRight, Shield, FileCheck, Info, Gavel } from 'lucide-react'
import RaeumpflichtRechner from './RaeumpflichtRechner'
import RaeumpflichtInformation from './RaeumpflichtInformation'

export default function RaeumpflichtGuidePage() {
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
              Der ultimative Räumpflicht-Guide 2025
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              Was Hausbesitzer und Vermieter in Deutschland jetzt wissen müssen
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Unsere aktualisierte Zusammenfassung der wichtigsten rechtlichen Informationen zur Räum- und Streupflicht. Erfahren Sie, welche Pflichten Sie haben, wie Sie Haftungsrisiken minimieren und wie sich die Vorschriften regional unterscheiden.
            </Paragraph>
            
            <div className="flex items-center gap-2 mt-4 text-sm">
              <span className="text-muted-foreground">Aktualisiert: März 2025</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">Lesezeit: 12 Min.</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-primary flex items-center">
                <FileCheck className="w-3.5 h-3.5 mr-1" />
                Rechtlich geprüft
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Einführungstext */}
              <div className="prose max-w-none mb-8">
                <p>
                  Wenn es um Winterdienst geht, stehen Hauseigentümer und Vermieter oft vor vielen Fragen: Wer ist wann für die Schneeräumung verantwortlich? Welche Zeiten müssen eingehalten werden? Und wie unterscheiden sich die Vorschriften in verschiedenen Bundesländern?
                </p>
                <p>
                  Mit diesem aktuellen Leitfaden bieten wir Ihnen einen umfassenden Überblick über die Räum- und Streupflicht in Deutschland und beantworten die wichtigsten Fragen. Unser Guide berücksichtigt die neuesten Urteile und rechtlichen Entwicklungen mit Stand März 2025.
                </p>
              </div>
              
              {/* Wichtiger Hinweis */}
              <Alert className="my-6 bg-blue-50 border-blue-200">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                <AlertTitle className="text-blue-800 font-medium">Wichtiger Hinweis</AlertTitle>
                <AlertDescription className="text-blue-700">
                  Dieser Artikel bietet eine allgemeine Orientierung, ersetzt jedoch keine Rechtsberatung. Lokale Vorschriften können variieren. Konsultieren Sie im Zweifelsfall einen Rechtsanwalt oder prüfen Sie die spezifischen Regelungen Ihrer Gemeinde.
                </AlertDescription>
              </Alert>
              
              {/* Interaktiver Räumpflicht-Rechner */}
              <div id="rechner">
                <H3 className="mb-4">Interaktiver Räumpflicht-Rechner</H3>
                <Paragraph className="mb-6">
                  Prüfen Sie Ihre individuellen Räum- und Streupflichten mit unserem interaktiven Assistenten. Beantworten Sie einfach die folgenden Fragen, um Ihre persönliche Räumpflicht-Bewertung zu erhalten.
                </Paragraph>
                <RaeumpflichtRechner />
              </div>
              
              {/* Regionaler Räumpflicht-Vergleich */}
              <div className="mt-10" id="bundeslaender">
                <H3 className="mb-4">Räumpflicht & Bundesland-Informationen</H3>
                <Paragraph className="mb-6">
                  Wählen Sie Ihre persönliche Situation und erhalten Sie detaillierte Informationen zur Räumpflicht in Ihrem Bundesland.
                </Paragraph>
                <RaeumpflichtInformation />
              </div>
              
              {/* Weitere Themenblöcke */}
              <div className="mt-10 space-y-6">
                <Card id="raeumzeiten">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Räum- und Streuzeiten: Wann müssen Sie aktiv werden?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Paragraph>
                      Die allgemeine Räumpflicht beginnt in den meisten Gemeinden zwischen 7:00 und 8:00 Uhr morgens und endet abends zwischen 20:00 und 22:00 Uhr. An Wochenenden und Feiertagen kann der Beginn auf 8:00 oder 9:00 Uhr verschoben sein. Diese Zeiten können jedoch je nach lokaler Satzung variieren.
                    </Paragraph>
                    <Paragraph>
                      <strong>Wichtig:</strong> Schneefall oder Glätte muss nicht sofort beseitigt werden. Die Rechtsprechung gewährt eine angemessene Reaktionszeit von etwa 30 Minuten bis zu einer Stunde. Bei plötzlich auftretendem Blitzeis oder unerwarteten starken Schneefällen kann diese Zeit auch länger sein.
                    </Paragraph>
                    <Paragraph>
                      Bei andauerndem Schneefall müssen Sie nicht permanent räumen. Sie sollten jedoch bei Bedarf mehrmals am Tag tätig werden, insbesondere wenn sich eine gefährliche Situation entwickelt. Nach Ende des Schneefalls ist dann eine vollständige Räumung erforderlich.
                    </Paragraph>
                  </CardContent>
                </Card>
                
                <Card id="urteile">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gavel className="h-5 w-5 text-primary" />
                      Die aktuelle Rechtslage 2025: Neueste Urteile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <h4 className="font-medium mb-1 text-primary">BGH-Urteil vom 14.01.2025 (Az: VI ZR 220/24)</h4>
                      <p className="text-sm">
                        Der Bundesgerichtshof stellte klar, dass bei extremen Wetterlagen die Räumpflicht nicht entfällt, jedoch die Anforderungen an deren Erfüllung angepasst werden müssen. Bei starkem Dauerschneefall kann ein temporäres Freiräumen der wichtigsten Gehwegbereiche ausreichend sein.
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <h4 className="font-medium mb-1 text-primary">OLG München vom 23.11.2024 (Az: 5 U 2837/24)</h4>
                      <p className="text-sm">
                        Eine verspätete Räumung kann mit Bußgeldern bis zu 10.000 € geahndet werden, wenn durch die Pflichtverletzung eine besondere Gefährdung entstanden ist. Dies betraf einen Fall, bei dem ein Hauseigentümer trotz wiederholter Aufforderung über mehrere Tage nicht geräumt hatte.
                      </p>
                    </div>
                    
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <h4 className="font-medium mb-1 text-primary">LG Hamburg vom 05.10.2024 (Az: 331 O 156/24)</h4>
                      <p className="text-sm">
                        Das Landgericht bestätigte, dass der Einsatz von Streusalz bei Extremwetterlagen auch in Bereichen erlaubt ist, in denen es normalerweise verboten ist. Die Verhältnismäßigkeit muss jedoch gewahrt bleiben und Alternativen wie Splitt oder Sand sind vorzuziehen.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-500" />
                      Gerichtliche Grundsatzentscheidungen zum Winterdienst
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="list-disc pl-5 space-y-3">
                      <li>
                        <strong>Zeitliche Verpflichtung (BGH, Az. VI ZR 49/83):</strong> Die Räum- und Streupflicht besteht werktags in der Regel von 7 Uhr bis 20 Uhr, an Sonn- und Feiertagen ab 8 oder 9 Uhr, je nach lokaler Regelung.
                      </li>
                      <li>
                        <strong>Umfang der Räumpflicht (BGH, Az. VI ZR 286/03):</strong> Es muss ein verkehrssicherer Durchgang geschaffen werden, nicht zwingend auf der gesamten Fläche. In der Regel genügt eine Breite von 1 bis 1,5 Metern.
                      </li>
                      <li>
                        <strong>Dauerschneefall (OLG Karlsruhe, 7 U 163/05):</strong> Bei anhaltendem Schneefall muss nicht ständig geräumt werden. Erst wenn der Schneefall nachlässt oder pausiert, setzt die Räumpflicht wieder ein.
                      </li>
                      <li>
                        <strong>Rutschige Stellen (BGH, Az. VI ZR 223/92):</strong> Besonders gefährliche Stellen wie Treppen oder Gefällstrecken erfordern besondere Aufmerksamkeit und gegebenenfalls zusätzliche Maßnahmen.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Inhaltsverzeichnis */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Inhalt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <a href="#rechner" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                          <ArrowRight className="h-3 w-3 mr-2" />
                          Interaktiver Räumpflicht-Rechner
                        </a>
                      </li>
                      <li>
                        <a href="#bundeslaender" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                          <ArrowRight className="h-3 w-3 mr-2" />
                          Bundesland-Informationen
                        </a>
                      </li>
                      <li>
                        <a href="#raeumzeiten" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                          <ArrowRight className="h-3 w-3 mr-2" />
                          Räum- und Streuzeiten
                        </a>
                      </li>
                      <li>
                        <a href="#urteile" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                          <ArrowRight className="h-3 w-3 mr-2" />
                          Aktuelle Urteile 2025
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Winterdienst Services */}
                <Card className="bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Professioneller Winterdienst</CardTitle>
                    <CardDescription>
                      Übertragen Sie Ihre Räumpflicht an Profis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-4">
                      Als Hausbesitzer oder Vermieter können Sie Ihre Verkehrssicherungspflicht an einen professionellen Dienstleister übertragen. Wir übernehmen die rechtssichere Durchführung des Winterdienstes für Sie.
                    </Paragraph>
                    <ul className="text-sm space-y-2 mb-4">
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Rechtssichere Übertragung der Verkehrssicherungspflicht</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Dokumentation aller Einsätze und Maßnahmen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Umweltgerechte Räumung nach lokalen Vorschriften</span>
                      </li>
                    </ul>
                    <Link href="/winterdienst" className="text-primary font-medium hover:underline text-sm flex items-center">
                      Winterdienst-Angebot anfragen
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
                
                {/* Weiterlesen */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weiterlesen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
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
                        Streugut-Vergleich: Umweltschutz & Wirksamkeit
                      </Link>
                      <Link 
                        href="/blog/StreumittelCalculator" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Streumittel-Rechner: Bedarfsermittlung leicht gemacht
                      </Link>
                      <Link 
                        href="/blog/WinterdienstKostenrechner" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Winterdienst-Kostenrechner
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Rechtlicher Disclaimer */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Haftungsausschluss</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm text-amber-800">
                      Dieser Guide ersetzt keine individuelle Rechtsberatung. Kommunale Satzungen, individuelle Verträge oder besondere örtliche Verhältnisse können zu abweichenden Pflichten führen.
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
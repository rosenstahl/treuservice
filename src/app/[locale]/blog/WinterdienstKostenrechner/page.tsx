"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import WinterdienstKostenRechner from './WinterdienstKostenRechner'
import Link from 'next/link'
import { ChevronRight, CalculatorIcon, AlertTriangle, Info, ThumbsUp } from 'lucide-react'

export default function WinterdienstKostenrechnerPage() {
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
              Kostenrechner für Winterdienst-Outsourcing
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              Berechnen Sie die Kosten für professionellen Winterdienst vs. Eigenleistung
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Mit unserem interaktiven Kostenrechner können Sie schnell und einfach ermitteln, ob sich das Outsourcing Ihres Winterdienstes an einen professionellen Dienstleister für Sie lohnt. Erfahren Sie, welche versteckten Kosten bei der Eigenleistung entstehen und welche Faktoren den Preis für einen professionellen Winterdienst beeinflussen.
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
              <WinterdienstKostenRechner />
              
              {/* Zusätzliche Informationen */}
              <div className="mt-10 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-500" />
                      Die wahren Kosten hinter dem Winterdienst in Eigenleistung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Paragraph>
                      Viele Immobilienbesitzer unterschätzen die tatsächlichen Kosten und Risiken, die mit der Durchführung des Winterdienstes in Eigenregie verbunden sind. Neben den offensichtlichen Anschaffungskosten für Geräte und Streumittel gibt es weitere versteckte Kostenfaktoren:
                    </Paragraph>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Zeitaufwand:</strong> Der Winterdienst muss oft zu unpassenden Zeiten (früh morgens, an Wochenenden oder Feiertagen) durchgeführt werden. Diese Zeit könnten Sie anderweitig nutzen.
                      </li>
                      <li>
                        <strong>Gesundheitsrisiken:</strong> Schneeschieben ist eine körperlich anstrengende Tätigkeit, die insbesondere bei älteren Menschen zu Rückenproblemen oder sogar Herzinfarkten führen kann.
                      </li>
                      <li>
                        <strong>Haftungsrisiken:</strong> Bei unzureichender Räumung haften Sie als Eigentümer für Unfälle. Dies kann zu hohen Schadensersatzforderungen führen.
                      </li>
                      <li>
                        <strong>Lagerkosten:</strong> Werkzeuge, Geräte und Streumittel müssen gelagert werden, was wertvollen Platz in Anspruch nimmt.
                      </li>
                      <li>
                        <strong>Wartungskosten:</strong> Geräte wie Schneefräsen müssen regelmäßig gewartet werden, um funktionsfähig zu bleiben.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ThumbsUp className="h-5 w-5 text-green-500" />
                      Vorteile eines professionellen Winterdienstes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Rechtssicherheit:</strong> Professionelle Winterdienste dokumentieren ihre Einsätze lückenlos, was im Schadensfall als Nachweis dient und Ihre Haftpflicht absichert.
                      </li>
                      <li>
                        <strong>Expertise und Effizienz:</strong> Durch Erfahrung und spezialisierte Ausrüstung arbeiten professionelle Dienste deutlich effizienter als Laien.
                      </li>
                      <li>
                        <strong>Stressfreier Winter:</strong> Keine frühen Wecker oder Sorgen bei Schneefall während Ihres Urlaubs – der Dienstleister kümmert sich zuverlässig um alles.
                      </li>
                      <li>
                        <strong>Umweltfreundlichkeit:</strong> Professionelle Dienste verfügen über das Know-how für einen umweltschonenden Einsatz von Streumitteln.
                      </li>
                      <li>
                        <strong>Planbare Kosten:</strong> Mit festen Verträgen haben Sie eine klare Kostentransparenz ohne unerwartete Ausgaben.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalculatorIcon className="h-5 w-5 text-primary" />
                      Preisfaktoren für professionellen Winterdienst
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Paragraph>
                      Die Kosten für einen professionellen Winterdienst werden von verschiedenen Faktoren beeinflusst:
                    </Paragraph>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Größe der zu räumenden Fläche:</strong> Der wichtigste Preisfaktor ist die Quadratmeterzahl der zu räumenden Flächen (Gehwege, Parkplätze, Einfahrten).
                      </li>
                      <li>
                        <strong>Lage und Beschaffenheit:</strong> Schwer zugängliche oder verwinkelte Bereiche, Treppen oder Steigungen erhöhen den Arbeitsaufwand und damit die Kosten.
                      </li>
                      <li>
                        <strong>Einsatzzeiten:</strong> Frühe Morgen- oder Nachteinsätze sind in der Regel teurer als Räumungen zu regulären Arbeitszeiten.
                      </li>
                      <li>
                        <strong>Vertragsmodell:</strong> Bei Pauschalsaison-Verträgen zahlen Sie einen festen Betrag unabhängig von der Anzahl der Einsätze. Bei Einzeleinsätzen oder Zahlung pro Räumung hängen die Kosten vom tatsächlichen Winterwetter ab.
                      </li>
                      <li>
                        <strong>Zusatzleistungen:</strong> Optional buchbare Leistungen wie die Entfernung von Eiszapfen oder Dachlawinensicherung können zusätzliche Kosten verursachen.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Related Articles */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weitere Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link 
                        href="/blog/winterdienst" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        DIY-Winterdienst Tipps
                      </Link>
                      <Link 
                        href="/blog/RaeumpflichtGuide" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Räumpflicht-Guide 2025
                      </Link>
                      <Link 
                        href="/blog/StreumittelCalculator" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Interaktiver Streumittel-Rechner
                      </Link>
                      <Link 
                        href="/blog/streumittel" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Streugut-Vergleich
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Services Promotion */}
                <Card className="bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Professionellen Winterdienst beauftragen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-4">
                      Stressfrei durch den Winter: Unser professioneller Winterdienst sorgt für geräumte Wege und rechtliche Sicherheit. Vereinbaren Sie jetzt ein unverbindliches Beratungsgespräch.
                    </Paragraph>
                    <Link href="/winterdienst" className="text-primary font-medium hover:underline text-sm">
                      Winterdienst-Angebot anfragen →
                    </Link>
                  </CardContent>
                </Card>
                
                {/* Rechtlicher Disclaimer */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Hinweis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm text-amber-800">
                      Die berechneten Kosten basieren auf Durchschnittswerten (Stand: Februar 2025) und können regional variieren. Für ein verbindliches Angebot kontaktieren Sie bitte einen Winterdienst in Ihrer Region.
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
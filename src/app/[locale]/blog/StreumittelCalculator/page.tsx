"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import StreumittelRechnerBlog from './StreumittelCalculator'
import Link from 'next/link'
import { ChevronRight, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function StreumittelCalculatorPage() {
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
            <div className="mb-4 flex items-center gap-3">
              <Calculator className="h-7 w-7 text-blue-600" />
              <H1 className="text-3xl lg:text-4xl font-bold tracking-tight">
                Streumittel-Rechner für Winterdienst
              </H1>
            </div>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              Berechnen Sie den optimalen Streumittelbedarf für Ihre Flächen
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Unser Streumittel-Rechner hilft Ihnen, die benötigte Menge an Streumitteln genau zu berechnen und informiert Sie über die Umweltauswirkungen verschiedener Produkte. Nutzen Sie dieses Tool für eine kosteneffiziente und umweltbewusste Winterdienstplanung.
            </Paragraph>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Calculator Component */}
              <StreumittelRechnerBlog />
              
              {/* Additional Info */}
              <div className="mt-10 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Gesetzliche Vorschriften zu Streumitteln</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Paragraph>
                      In vielen deutschen Kommunen ist die Verwendung von Streusalz für Privatpersonen verboten oder stark eingeschränkt. Diese Verordnungen dienen dem Schutz von Umwelt, Pflanzen und Infrastruktur.
                    </Paragraph>
                    <Paragraph>
                      Bitte informieren Sie sich vor der Verwendung von Taumitteln über die lokalen Vorschriften in Ihrer Gemeinde. Bei Nichtbeachtung drohen Bußgelder von bis zu 10.000 Euro, je nach kommunaler Regelung.
                    </Paragraph>
                    <Paragraph>
                      Ausnahmen vom Streusalzverbot gelten meist nur bei extremen Wetterbedingungen wie Blitzeis oder wenn besondere Gefahrenstellen gesichert werden müssen. In diesen Fällen sollte Streusalz sparsam und gezielt eingesetzt werden.
                    </Paragraph>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Umweltfreundliche Alternativen im Trend</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Paragraph>
                      Der Markt für umweltfreundliche Streumittel wächst stetig. Besonders nachgefragt sind aktuell:
                    </Paragraph>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <strong>Formiatlösungen:</strong> Diese chloridfreien Auftaumittel sind besonders umweltschonend, biologisch abbaubar und hinterlassen keine schädlichen Rückstände. Sie wirken auch bei sehr niedrigen Temperaturen.
                      </li>
                      <li>
                        <strong>Lavagranulat:</strong> Dieses natürliche Vulkangestein bietet hervorragende abstumpfende Wirkung, nimmt Schmelzwasser auf, löst sich nicht auf und kann teilweise wiederverwendet werden.
                      </li>
                      <li>
                        <strong>Holzspäne mit Salzlösung:</strong> Diese umweltfreundlichere Alternative kombiniert die abstumpfenden Eigenschaften von Holzspänen mit der mäßigen Tauwirkung einer geringen Salzkonzentration.
                      </li>
                    </ul>
                    <Paragraph>
                      Die aktuellen Marktpreise für diese nachhaltigen Alternativen liegen zwar über denen von konventionellem Streusalz, bieten aber langfristig ökologische und oft auch wirtschaftliche Vorteile durch Wiederverwendung und geringere Folgeschäden.
                    </Paragraph>
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
                        href="/blog/streumittel" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Streugut-Vergleich für den Winterdienst
                      </Link>
                      <Link 
                        href="/blog/reinigung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Reinigungsprobleme und Lösungen
                      </Link>
                      <Link 
                        href="/blog/security" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Notfallpläne für Unternehmen
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
                      Überlassen Sie den Winterdienst den Profis! Wir kümmern uns um die rechtssichere und umweltfreundliche Räumung Ihrer Flächen - mit optimal dosierten Streumitteln und fachgerechter Ausführung.
                    </Paragraph>
                    <Button className="w-full" asChild>
                      <Link href="/winterdienst">
                        Winterdienst-Angebot anfragen
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
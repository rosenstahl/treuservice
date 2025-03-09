"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Leaf, CheckCircle, AlertTriangle, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react'
import UmweltZertifikateVergleich from './UmweltZertifikateVergleich'

export default function NachhaltigeReinigungPage() {
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
              Nachhaltige Reinigungsmethoden & Öko-Zertifizierungen
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              Ein umfassender Leitfaden für umweltbewusste Gebäudereinigung
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Die Reinigungsbranche steht vor einem entscheidenden Wandel: Nachhaltigkeit ist längst kein optionales Extra mehr, sondern eine Notwendigkeit für zukunftsfähige Unternehmen. In diesem Artikel stellen wir die wirksamsten umweltfreundlichen Reinigungsmethoden vor und erklären, welche Öko-Zertifizierungen wirklich vertrauenswürdig sind.
            </Paragraph>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-12">
                  <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-6">
                    <Image 
                      src="/images/blog/sustainable-cleaning.jpg" 
                      alt="Nachhaltige Reinigungsmethoden"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <H3>Warum nachhaltige Reinigung wichtiger denn je ist</H3>
                  <Paragraph>
                    Die Reinigungsbranche hat einen erheblichen ökologischen Fußabdruck: Vom Wasserverbrauch über chemische Reinigungsmittel bis hin zu Plastikmüll und CO₂-Emissionen. Gleichzeitig wächst das Bewusstsein für Umweltschutz und Nachhaltigkeit bei Kunden und Auftraggebern. Unternehmen, die auf nachhaltige Reinigungspraktiken umstellen, profitieren daher nicht nur vom wachsenden Markt für umweltbewusste Dienstleistungen, sondern leisten auch einen wichtigen Beitrag zum Klimaschutz.
                  </Paragraph>
                  
                  <Alert className="bg-green-50 border-green-200 mb-8">
                    <AlertDescription className="flex items-start">
                      <Leaf className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-green-800">
                        Studien zeigen, dass umweltfreundliche Reinigungsmethoden nicht nur die Umwelt schonen, sondern auch wirtschaftliche Vorteile bieten: Sie senken Kosten für Wasser und Energie, verbessern die Luftqualität in Innenräumen und tragen zur Gesundheit der Mitarbeiter bei.
                      </span>
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Trendsetter Tabs */}
                <div className="mb-12">
                  <H3 className="mb-6">Die wichtigsten Trends für nachhaltige Reinigung 2025</H3>
                  
                  <Tabs defaultValue="methoden">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="methoden">Methoden</TabsTrigger>
                      <TabsTrigger value="geraete">Geräte & Technik</TabsTrigger>
                      <TabsTrigger value="mittel">Reinigungsmittel</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="methoden" className="p-6 border rounded-md mt-2 bg-slate-50">
                      <div className="space-y-4">
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Dampfreinigung ohne Chemie
                          </H3>
                          <Paragraph>
                            Die Dampfreinigung ist eine der effektivsten nachhaltigen Reinigungsmethoden. Durch den Einsatz von heißem Wasserdampf (bis zu 180°C) werden Schmutz und Bakterien ohne den Einsatz chemischer Reinigungsmittel entfernt. Dies funktioniert sogar bei hartnäckigen Verschmutzungen und bietet eine Keimreduktion von bis zu 99,9%.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Reduktion von Mikroplastik
                          </H3>
                          <Paragraph>
                            Mikrofasertücher sind zwar effektiv, setzen aber bei jedem Waschgang Mikroplastik frei. Neue Lösungen wie das Vorfiltern des Waschwassers oder der Einsatz natürlicher Materialien wie Baumwolle und Bambus in Kombination mit optimierten Reinigungstechniken verringern dieses Problem erheblich.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Wasserreduktion durch osmotische Reinigung
                          </H3>
                          <Paragraph>
                            Bei der osmotischen Reinigung wird Wasser durch eine Membrane gefiltert, wodurch alle Mineralien entfernt werden. Das demineralisierte Wasser kann Verschmutzungen ohne Zusatz von Chemie lösen und trocknet streifenfrei. Diese Methode reduziert den Wasserverbrauch um bis zu 80% und macht Reinigungsmittel in vielen Fällen überflüssig.
                          </Paragraph>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="geraete" className="p-6 border rounded-md mt-2 bg-slate-50">
                      <div className="space-y-4">
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Energieeffiziente Reinigungsmaschinen
                          </H3>
                          <Paragraph>
                            Die neueste Generation von Reinigungsgeräten zeichnet sich durch deutlich reduzierten Energieverbrauch aus. Moderne Staubsauger, Bodenreiniger und Dampfreiniger mit Energieeffizienzklasse A+++ verbrauchen bis zu 70% weniger Strom als herkömmliche Geräte.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Digitale Dosierungssysteme
                          </H3>
                          <Paragraph>
                            Überdosierung ist eines der größten Probleme bei der Verwendung von Reinigungsmitteln. Intelligente Dosierungssysteme mit Sensorik messen automatisch die benötigte Menge an Reinigungsmitteln und reduzieren den Verbrauch um bis zu 30%, was sowohl Kosten spart als auch die Umweltbelastung minimiert.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Robotik und KI-gestützte Reinigung
                          </H3>
                          <Paragraph>
                            Autonome Reinigungsroboter mit KI-Steuerung optimieren Reinigungswege und -zeiten, was den Energie- und Ressourcenverbrauch senkt. Sie erkennen Verschmutzungsgrade und passen die Reinigungsintensität entsprechend an, wodurch unnötiger Ressourcenverbrauch vermieden wird.
                          </Paragraph>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="mittel" className="p-6 border rounded-md mt-2 bg-slate-50">
                      <div className="space-y-4">
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Biologisch abbaubare Reinigungsmittel
                          </H3>
                          <Paragraph>
                            Moderne Öko-Reiniger bestehen aus 100% biologisch abbaubaren Inhaltsstoffen pflanzlichen Ursprungs. Sie enthalten keine Phosphate, Chlor, optische Aufheller oder synthetische Duftstoffe und sind trotzdem hocheffektiv bei der Entfernung von Schmutz und Bakterien.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Hochkonzentrate und Nachfüllsysteme
                          </H3>
                          <Paragraph>
                            Hochkonzentrierte Reinigungsmittel sparen Verpackungsmaterial und Transportemissionen. In Kombination mit wiederverwendbaren Behältern und Nachfüllstationen reduzieren sie den Plastikmüll erheblich. Ein Liter Konzentrat ersetzt oft bis zu 100 Liter gebrauchsfertiges Reinigungsmittel.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                            Probiotische Reiniger
                          </H3>
                          <Paragraph>
                            Ein revolutionärer Ansatz: Probiotische Reiniger nutzen lebende Mikroorganismen, die Schmutz abbauen und schädliche Bakterien verdrängen. Sie wirken über die Reinigung hinaus und schaffen ein gesundes Mikrobiom auf Oberflächen, das die Neubildung von Schmutz verlangsamt.
                          </Paragraph>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Öko-Zertifikate Vergleich */}
                <div className="mb-12">
                  <H3 className="mb-6">Umweltzertifikate im Vergleich: Welche Siegel sind vertrauenswürdig?</H3>
                  <Paragraph className="mb-4">
                    Die Vielzahl an Umweltsiegeln und Öko-Zertifikaten kann verwirrend sein. Wir haben die wichtigsten Zertifikate für nachhaltige Reinigung analysiert und bewertet, um Ihnen die Orientierung zu erleichtern.
                  </Paragraph>
                  
                  <UmweltZertifikateVergleich />
                </div>

                {/* Praktische Tipps für Unternehmen */}
                <div className="mb-12">
                  <H3 className="mb-6">Implementierung nachhaltiger Reinigungspraktiken: Schritt für Schritt</H3>
                  
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-5 rounded-lg border">
                      <H3 className="text-lg font-medium mb-3">1. Analyse des Status quo</H3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Erfassen Sie alle verwendeten Reinigungsmittel, -geräte und -methoden</li>
                        <li>Erstellen Sie eine Übersicht zu Wasser-, Energie- und Chemikalienverbrauch</li>
                        <li>Identifizieren Sie die größten Umweltbelastungen im aktuellen Reinigungsprozess</li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-5 rounded-lg border">
                      <H3 className="text-lg font-medium mb-3">2. Schulung und Sensibilisierung der Mitarbeiter</H3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Bilden Sie Ihr Reinigungspersonal in umweltfreundlichen Techniken aus</li>
                        <li>Sensibilisieren Sie für die korrekte Dosierung von Reinigungsmitteln</li>
                        <li>Etablieren Sie ein Feedbacksystem für Verbesserungsvorschläge</li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-5 rounded-lg border">
                      <H3 className="text-lg font-medium mb-3">3. Schrittweise Umstellung</H3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Beginnen Sie mit dem Austausch der umweltschädlichsten Reinigungsmittel</li>
                        <li>Investieren Sie in energieeffiziente Geräte bei Neuanschaffungen</li>
                        <li>Testen Sie verschiedene umweltfreundliche Methoden und evaluieren Sie ihre Wirksamkeit</li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-5 rounded-lg border">
                      <H3 className="text-lg font-medium mb-3">4. Dokumentation und kontinuierliche Verbesserung</H3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Erfassen Sie regelmäßig Verbrauchsdaten und Umweltkennzahlen</li>
                        <li>Setzen Sie sich ambitionierte, aber realistische Ziele zur Reduktion der Umweltauswirkungen</li>
                        <li>Streben Sie eine Zertifizierung an (z.B. nach ISO 14001 oder spezifischen Umweltsiegeln)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Kosten-Nutzen-Analyse */}
                <div className="mb-12">
                  <H3 className="mb-6">Kosten-Nutzen-Analyse: Lohnt sich die Umstellung wirtschaftlich?</H3>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Maßnahme</TableHead>
                        <TableHead>Initiale Kosten</TableHead>
                        <TableHead>Jährliche Einsparung</TableHead>
                        <TableHead className="text-right">Amortisation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Umstellung auf Hochkonzentrate</TableCell>
                        <TableCell>Gering (€)</TableCell>
                        <TableCell className="text-green-600">15-25%</TableCell>
                        <TableCell className="text-right">&lt; 3 Monate</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Osmotische Glasreinigung</TableCell>
                        <TableCell>Mittel (€€)</TableCell>
                        <TableCell className="text-green-600">30-40%</TableCell>
                        <TableCell className="text-right">12-18 Monate</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Dampfreinigungssysteme</TableCell>
                        <TableCell>Hoch (€€€)</TableCell>
                        <TableCell className="text-green-600">40-60%</TableCell>
                        <TableCell className="text-right">24-36 Monate</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Automatische Dosiersysteme</TableCell>
                        <TableCell>Mittel (€€)</TableCell>
                        <TableCell className="text-green-600">20-30%</TableCell>
                        <TableCell className="text-right">18-24 Monate</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Schulung des Personals</TableCell>
                        <TableCell>Gering-Mittel (€-€€)</TableCell>
                        <TableCell className="text-green-600">10-20%</TableCell>
                        <TableCell className="text-right">6-12 Monate</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <Paragraph className="mt-4 text-sm text-slate-600">
                    Hinweis: Die genauen Einsparungen variieren je nach Ausgangssituation, Gebäudegröße und -art sowie Implementierungsgrad.
                  </Paragraph>
                </div>

                {/* Fazit */}
                <div>
                  <H3 className="mb-4">Fazit: Nachhaltigkeit als Wettbewerbsvorteil</H3>
                  <Paragraph>
                    Die Umstellung auf nachhaltige Reinigungsmethoden ist nicht nur ein Beitrag zum Umweltschutz, sondern bietet auch handfeste wirtschaftliche Vorteile. Unternehmen, die jetzt auf grüne Reinigungspraktiken setzen, positionieren sich als zukunftsorientiert und verantwortungsbewusst. In einer Zeit, in der Umweltbewusstsein bei Kunden und Auftraggebern zunehmend entscheidungsrelevant wird, kann dies zu einem entscheidenden Wettbewerbsvorteil werden.
                  </Paragraph>
                  <Paragraph>
                    Wir bei TREU Service haben uns zum Ziel gesetzt, bis 2027 vollständig auf nachhaltige Reinigungsmethoden umzustellen. Durch konsequente Schulung unseres Personals, kontinuierliche Investitionen in moderne Technologien und die Zusammenarbeit mit zertifizierten Lieferanten bieten wir unseren Kunden bereits heute umweltfreundliche Reinigungsdienstleistungen auf höchstem Niveau.
                  </Paragraph>
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
                    <ul className="space-y-1 text-sm">
                      <li>
                        <a href="#" className="block hover:text-primary">
                          Warum nachhaltige Reinigung wichtiger denn je ist
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-primary">
                          Die wichtigsten Trends für nachhaltige Reinigung 2025
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-primary">
                          Umweltzertifikate im Vergleich
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-primary">
                          Implementierung: Schritt für Schritt
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-primary">
                          Kosten-Nutzen-Analyse
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-primary">
                          Fazit
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
                        href="/blog/ReinigungsplanGenerator" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Reinigungsplan-Generator
                      </Link>
                      <Link 
                        href="/blog/streumittel" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Streugut-Vergleich für den Winterdienst
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Services Promotion */}
                <Card className="bg-primary/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Umweltfreundliche Reinigung von Profis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-4">
                      Möchten Sie auf nachhaltige Reinigung umsteigen, wissen aber nicht, wo Sie anfangen sollen? TREU Service bietet professionelle, umweltfreundliche Reinigungsdienstleistungen mit zertifizierten Öko-Produkten und geschultem Personal.
                    </Paragraph>
                    <Link href="/reinigung" className="text-primary font-medium hover:underline text-sm">
                      Nachhaltige Reinigung anfragen →
                    </Link>
                  </CardContent>
                </Card>
                
                {/* Downloads */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Checklisten & Leitfäden</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <a 
                        href="#" 
                        className="flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Checkliste: Nachhaltige Reinigung
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Umweltsiegel-Guide als PDF
                      </a>
                    </div>
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

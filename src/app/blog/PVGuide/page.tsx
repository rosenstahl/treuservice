"use client"

import React from 'react'
import Link from 'next/link'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CheckCircle2, 
  Sun, 
  Lightbulb,
  ClipboardList,
  ChevronRight, 
  Calendar, 
  Clock, 
  Share2,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  AlertTriangle,
  Zap,
  LineChart,
  FileText,
  Banknote,
  ShieldCheck,
  Home as HomeIcon,
  Wrench,
  BarChart4,
  Layers,
  Battery,
  Drill,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Separator } from "@/components/ui/separator"

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-yellow-600 bg-yellow-600/10 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

const ShareContent = (title: string, url: string) => {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    }).catch(error => {
      console.log('Error sharing', error);
    });
  } else {
    // Fallback für Browser ohne Web Share API
    navigator.clipboard.writeText(url).then(() => {
      alert('Link in die Zwischenablage kopiert!');
    });
  }
};

export default function PVGuidePage() {
  const title = "Photovoltaik-Montage Guide: Optimale Planung, Installation & Ertragsmaximierung"
  const subtitle = "Der ultimative Leitfaden zur fachgerechten Montage von PV-Anlagen für maximale Leistung und Lebensdauer"
  const date = new Date('2025-03-20');
  const readingTime = "15 min";
  const author = {
    name: "TREU Service Team",
    image: "/images/blog/guide.jpg"
  };
  
  
  return (
    <div className="flex-1 pb-10">
      <Section className="pt-6 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-yellow-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-yellow-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">PV-Montage</span>
          </div>
          
          <div className="max-w-4xl">
            {/* Tag/Badge */}
            <Badge className="mb-3">
              PV-Montage
            </Badge>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </H1>
            
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              {subtitle}
            </H2>
            
            <div className="flex items-center gap-6 text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <div className="inline-block bg-yellow-200/20 p-2 rounded-full">
                  <Sun className="h-4 w-4 text-yellow-500" />
                </div>
                <span className="text-sm">{author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{format(date, 'dd. MMMM yyyy', { locale: de })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{readingTime} Lesezeit</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Tabs Navigation */}
              <Tabs defaultValue="grundlagen" className="w-full mb-8">
                <TabsList className="grid grid-cols-4 w-full mb-6">
                  <TabsTrigger value="grundlagen" className="text-sm">Grundlagen</TabsTrigger>
                  <TabsTrigger value="montagearten" className="text-sm">Montagearten</TabsTrigger>
                  <TabsTrigger value="optimierung" className="text-sm">Optimierung</TabsTrigger>
                  <TabsTrigger value="installation" className="text-sm">Installation</TabsTrigger>
                </TabsList>
                
                {/* Tab 1: Grundlagen */}
                <TabsContent value="grundlagen">
                  <div className="space-y-6">
                    {/* Grundlagen-Beschreibung */}
                    <div className="bg-white p-4 rounded-lg border border-yellow-500/10 shadow-sm">
                      <div className="flex items-center mb-4">
                        <H3 className="text-lg font-medium">PV-Montage Grundlagen – Was Sie wissen sollten</H3>
                      </div>
                      
                      <div className="mb-4 text-sm text-muted-foreground">
                        Die korrekte Montage einer Photovoltaikanlage ist entscheidend für deren Leistung, Sicherheit und Langlebigkeit. Sie umfasst mehr als nur das Anbringen von Solarmodulen - es handelt sich um einen komplexen Prozess mit verschiedenen Faktoren:
                      </div>
                      
                      {/* Die Grundkomponenten der PV-Montage */}
                      <div className="relative bg-yellow-50 p-4 rounded-lg mb-6">
                        <div className="text-center mb-6">
                          <div className="font-medium text-yellow-700">Die Grundkomponenten einer PV-Montagelösung</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 relative">
                          <div className="text-center">
                            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-yellow-100 border border-yellow-200 mb-2">
                              <Layers className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="font-medium text-sm">Montagesystem</div>
                            <div className="text-xs text-gray-600">(Trägerstruktur)</div>
                          </div>
                          
                          <div className="text-center mt-12">
                            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-yellow-100 border border-yellow-200 mb-2">
                              <Drill className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="font-medium text-sm">Befestigungsmaterial</div>
                            <div className="text-xs text-gray-600">(Verbindungselemente)</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-yellow-100 border border-yellow-200 mb-2">
                              <Sun className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div className="font-medium text-sm">Solarmodule</div>
                            <div className="text-xs text-gray-600">(PV-Module)</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="font-medium mb-2">Wichtige Faktoren bei der PV-Montage</div>
                          <p className="text-sm text-gray-600 mb-2">
                            Eine fachgerechte PV-Montage berücksichtigt zahlreiche technische und bauliche Aspekte, die über die reine Befestigung der Module hinausgehen:
                          </p>
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Dachstatik und Belastbarkeit:</span> Prüfung, ob das Dach die zusätzliche Last tragen kann
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Ausrichtung und Neigung:</span> Optimale Positionierung für maximalen Energieertrag
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Wind- und Schneelasten:</span> Berücksichtigung lokaler Wetterbedingungen und Anforderungen
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Dichtigkeit und Schutz:</span> Vermeidung von Beschädigungen an der Dachhaut
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Elektrische Sicherheit:</span> Fachgerechte Verkabelung und Erdung der Anlage
                              </div>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <div className="font-medium mb-2">Aktuelle Trends bei PV-Montagesystemen 2025</div>
                          <div className="text-sm text-gray-600">
                            <p className="mb-2">
                              Die Montagesysteme haben sich in den letzten Jahren deutlich weiterentwickelt:
                            </p>
                            <ul className="space-y-1 pl-4 list-disc">
                              <li>Modulare Systeme mit reduzierten Montagezeiten (bis zu 40% schnellere Installation)</li>
                              <li>Aerodynamische Lösungen ohne Dachdurchdringung für Flachdächer</li>
                              <li>Integrierte Kabelmanagement-Systeme für saubere und sichere Verkabelung</li>
                              <li>Selbstausrichtende Befestigungselemente für vereinfachte Installation</li>
                              <li>Leichtere Materialien mit höherer Belastbarkeit (bis zu 25% Gewichtsreduktion)</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="h-8 w-8 text-yellow-400 mt-0.5" />
                            <div>
                              <div className="font-medium mb-1">Wussten Sie schon?</div>
                              <p className="text-sm text-gray-600">
                                Aktuelle Studien zeigen, dass eine fachgerechte Montage den Ertrag einer PV-Anlage um bis zu 30% steigern kann – verglichen mit einer suboptimalen Installation. Die Montage macht zwar nur etwa 10-15% der Gesamtkosten einer PV-Anlage aus, hat aber einen überproportional großen Einfluss auf die Gesamtleistung und Amortisationszeit der Investition.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Preisübersicht */}
                    <div className="bg-white p-4 rounded-lg border border-yellow-500/10 shadow-sm">
                      <div className="flex items-center mb-4">
                        <H3 className="text-lg font-medium">Kostenübersicht: Was kostet die PV-Montage 2025?</H3>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600">
                          Die Montagekosten einer PV-Anlage hängen von verschiedenen Faktoren ab, darunter Dachtyp, Komplexität der Installation und gewähltes Montagesystem. Hier eine aktuelle Übersicht der durchschnittlichen Kosten:
                        </p>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead className="bg-yellow-50">
                              <tr>
                                <th className="px-4 py-2 text-left">Montageart</th>
                                <th className="px-4 py-2 text-right">Materialkosten/m²</th>
                                <th className="px-4 py-2 text-right">Arbeitskosten/kWp</th>
                                <th className="px-4 py-2 text-right">Gesamt/kWp</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              <tr>
                                <td className="px-4 py-2">Aufdach-Montage (Schrägdach)</td>
                                <td className="px-4 py-2 text-right">35-50 €</td>
                                <td className="px-4 py-2 text-right">120-180 €</td>
                                <td className="px-4 py-2 text-right font-medium">155-230 €</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2">Indach-Montage</td>
                                <td className="px-4 py-2 text-right">80-140 €</td>
                                <td className="px-4 py-2 text-right">150-250 €</td>
                                <td className="px-4 py-2 text-right font-medium">230-390 €</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2">Flachdach-Montage (aufgeständert)</td>
                                <td className="px-4 py-2 text-right">45-70 €</td>
                                <td className="px-4 py-2 text-right">130-200 €</td>
                                <td className="px-4 py-2 text-right font-medium">175-270 €</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-2">Fassaden-Montage</td>
                                <td className="px-4 py-2 text-right">70-120 €</td>
                                <td className="px-4 py-2 text-right">150-230 €</td>
                                <td className="px-4 py-2 text-right font-medium">220-350 €</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          <p>Hinweis: Die Preise beziehen sich auf durchschnittliche Werte für 2025 und können je nach Region, Anbieter und individuellen Anforderungen variieren.</p>
                        </div>
                        
                        <div className="bg-yellow-50 p-4 rounded-lg mt-2">
                          <div className="flex items-start gap-3">
                            <Banknote className="h-5 w-5 text-green-600 mt-0.5" />
                            <div>
                              <div className="font-medium mb-1">Förderungen 2025 beachten!</div>
                              <p className="text-sm text-gray-600">
                                Seit 2023 gilt der Nullsteuersatz für die Lieferung und Installation von PV-Anlagen bis 30 kWp. Zusätzlich gibt es regionale Förderprogramme, die die Montagekosten bezuschussen. Ab 2025 erhalten Sie bei voller Ausnutzung der belegbaren Dachfläche einen Bonus von 100 € pro kWp.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 2: Montagearten */}
                <TabsContent value="montagearten">
                  <div className="space-y-6">
                    <Card className="mb-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Übersicht der verschiedenen Montagearten im Vergleich</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm space-y-4">
                          <p>
                            Die Wahl der richtigen Montageart ist entscheidend für die langfristige Leistung und Sicherheit Ihrer PV-Anlage. Jede Montageart hat spezifische Vor- und Nachteile:
                          </p>
                          
                          <div className="space-y-6">
                            {/* Aufdach-Montage */}
                            <div className="flex flex-col md:flex-row gap-4 p-4 bg-yellow-50 rounded-lg">
                              <div className="md:w-1/3">
                                <div className="font-medium text-yellow-800 mb-2">1. Aufdach-Montage</div>
                                <p className="text-sm text-gray-600 mb-2">
                                  Die klassische und häufigste Montageform, bei der die Module auf einer Trägerkonstruktion über der Dacheindeckung befestigt werden.
                                </p>
                              </div>
                              
                              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <div className="font-medium text-green-600 text-sm mb-1">Vorteile</div>
                                  <ul className="text-xs space-y-1">
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Günstigste Installationsmethode (20-30% weniger als Indach)</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Optimale Hinterlüftung (bis zu 5% mehr Ertrag bei hohen Temperaturen)</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Einfacher Austausch einzelner Module bei Defekten</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Für fast alle Dachtypen geeignet</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div>
                                  <div className="font-medium text-red-600 text-sm mb-1">Nachteile</div>
                                  <ul className="text-xs space-y-1">
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Optisch auffälliger als integrierte Lösungen</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Durchdringung der Dachhaut notwendig (potenzielle Undichtigkeiten)</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Höhere Windlasten möglich</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Indach-Montage */}
                            <div className="flex flex-col md:flex-row gap-4 p-4 bg-yellow-50 rounded-lg">
                              <div className="md:w-1/3">
                                <div className="font-medium text-yellow-800 mb-2">2. Indach-Montage</div>
                                <p className="text-sm text-gray-600 mb-2">
                                  Die Module werden in die Dacheindeckung integriert und ersetzen Teile der Dachziegel oder -schindeln.
                                </p>
                              </div>
                              
                              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <div className="font-medium text-green-600 text-sm mb-1">Vorteile</div>
                                  <ul className="text-xs space-y-1">
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Ästhetisch ansprechende, elegante Optik</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Ersetzt reguläre Dacheindeckung (Kosteneinsparung bei Neubau)</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Aerodynamischere Form (geringere Windlasten)</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Ideal für Neubauten und Dachsanierungen</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div>
                                  <div className="font-medium text-red-600 text-sm mb-1">Nachteile</div>
                                  <ul className="text-xs space-y-1">
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>20-40% höhere Installationskosten als Aufdach</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Geringere Hinterlüftung (3-8% niedrigerer Ertrag bei Hitze)</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Komplexerer Austausch bei Moduldefekten</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Benötigt mindestens 20° Dachneigung</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Flachdach-Montage */}
                            <div className="flex flex-col md:flex-row gap-4 p-4 bg-yellow-50 rounded-lg">
                              <div className="md:w-1/3">
                                <div className="font-medium text-yellow-800 mb-2">3. Flachdach-Montage</div>
                                <p className="text-sm text-gray-600 mb-2">
                                  Spezielle Aufständerungssysteme ermöglichen die optimale Ausrichtung und Neigung der Module auf Flachdächern.
                                </p>
                              </div>
                              
                              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <div className="font-medium text-green-600 text-sm mb-1">Vorteile</div>
                                  <ul className="text-xs space-y-1">
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Optimale Ausrichtung und Neigung unabhängig vom Dach</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Oft ohne Dachdurchdringung möglich (Ballastierung)</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Einfacher Zugang für Wartung und Reinigung</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>10-15% höhere Erträge durch optimale Neigung möglich</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div>
                                  <div className="font-medium text-red-600 text-sm mb-1">Nachteile</div>
                                  <ul className="text-xs space-y-1">
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Höheres Gewicht durch Ballast (150-200 kg/m²)</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Statische Prüfung des Daches notwendig</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Höhere Windlasten durch Aufständerung</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Geringere Moduldichte pro Fläche (Verschattung)</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>

                            {/* Fassaden-Montage */}
                            <div className="flex flex-col md:flex-row gap-4 p-4 bg-yellow-50 rounded-lg">
                              <div className="md:w-1/3">
                                <div className="font-medium text-yellow-800 mb-2">4. Fassaden-Montage</div>
                                <p className="text-sm text-gray-600 mb-2">
                                  PV-Module werden an der Gebäudefassade angebracht, entweder vorgesetzt (Kaltfassade) oder integriert (Warmfassade).
                                </p>
                              </div>
                              
                              <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <div className="font-medium text-green-600 text-sm mb-1">Vorteile</div>
                                  <ul className="text-xs space-y-1">
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Nutzung von Flächen bei begrenztem Dachraum</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Architektonisches Gestaltungselement</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Bessere Erträge im Winter bei niedrigem Sonnenstand</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <CheckCircle2 className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>Kann mit Wärmedämmung kombiniert werden</span>
                                    </li>
                                  </ul>
                                </div>
                                
                                <div>
                                  <div className="font-medium text-red-600 text-sm mb-1">Nachteile</div>
                                  <ul className="text-xs space-y-1">
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>20-30% geringere Jahreserträge als optimal ausgerichtete Dachanlagen</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Höhere Installationskosten</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Schwierigere Integration in bestehende Gebäude</span>
                                    </li>
                                    <li className="flex items-start gap-1">
                                      <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                                      <span>Spezielle Module und Montagesysteme erforderlich</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mt-4">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                              <div>
                                <div className="font-medium mb-1">Entscheidungshilfe zur Auswahl der Montageart</div>
                                <p className="text-sm text-gray-600">
                                  Bei der Wahl der richtigen Montageart sollten folgende Faktoren berücksichtigt werden:
                                </p>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mt-2">
                                  <li><span className="font-medium">Dachtyp und Beschaffenheit:</span> Bestandsdach oder Neubau, Dachneigung, Tragfähigkeit</li>
                                  <li><span className="font-medium">Budget und Wirtschaftlichkeit:</span> Kosten vs. Mehrertrag</li>
                                  <li><span className="font-medium">Ästhetische Anforderungen:</span> Integration in das Gebäudedesign</li>
                                  <li><span className="font-medium">Regionale Faktoren:</span> Wind- und Schneelasten, Temperaturen, Baurechtliche Vorgaben</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Spezialfälle und innovative Montagelösungen 2025</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <p className="mb-4 text-muted-foreground">
                            Neben den klassischen Montagearten haben sich einige innovative Sonderlösungen entwickelt, die für spezielle Anforderungen geeignet sind:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="bg-white border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Sun className="h-5 w-5 text-yellow-600" />
                                <h3 className="font-medium">Bifaziale Module-Montage</h3>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Spezielle Montagesysteme für zweiseitige Module, die auch von der Rückseite Licht einfangen. Diese benötigen reflektierende Untergründe und eine erhöhte Aufständerung für maximalen Ertrag.
                              </p>
                              <div className="text-xs text-yellow-700 bg-yellow-50 p-2 rounded-md">
                                Bis zu 30% mehr Ertrag gegenüber konventionellen Modulen bei optimaler Montage
                              </div>
                            </div>

                            <div className="bg-white border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Layers className="h-5 w-5 text-yellow-600" />
                                <h3 className="font-medium">Ost-West-Systeme</h3>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Speziell für Flachdächer entwickelte Aufständerungen, bei denen die Module in entgegengesetzte Richtungen (Ost und West) ausgerichtet werden, um Morgen- und Abendsonne optimal zu nutzen.
                              </p>
                              <div className="text-xs text-yellow-700 bg-yellow-50 p-2 rounded-md">
                                Höhere Flächenausnutzung, ausgeglichenere Tagesstromproduktion, geringere Windlasten
                              </div>
                            </div>

                            <div className="bg-white border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Battery className="h-5 w-5 text-yellow-600" />
                                <h3 className="font-medium">Ballastfreie Leichtmontage</h3>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Aerodynamische Montagesysteme für Flachdächer, die mit minimaler Ballastierung auskommen und somit auch auf statisch eingeschränkten Dächern eingesetzt werden können.
                              </p>
                              <div className="text-xs text-yellow-700 bg-yellow-50 p-2 rounded-md">
                                Gewichtsbelastung unter 10 kg/m² möglich, etwa 75% weniger als klassische Systeme
                              </div>
                            </div>

                            <div className="bg-white border border-yellow-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <HomeIcon className="h-5 w-5 text-yellow-600" />
                                <h3 className="font-medium">Integrierte Solardachziegel</h3>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                Neuartige Systeme, bei denen die PV-Zellen direkt in Dachziegel integriert sind, die wie herkömmliche Dachziegel montiert werden können – ideal für denkmalgeschützte Gebäude.
                              </p>
                              <div className="text-xs text-yellow-700 bg-yellow-50 p-2 rounded-md">
                                Ästhetisch unauffällig, höhere Kosten, mittlerweile Effizienz bis zu 20%
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                            <h3 className="font-medium mb-2 flex items-center gap-2">
                              <Zap className="h-5 w-5 text-yellow-600" />
                              <span>Innovation 2025: Smart-Mounting-Systeme</span>
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                              Neueste Entwicklung sind intelligente Montagesysteme mit eingebauter Sensorik, die kontinuierlich Daten zu Modultemperatur, Windbelastung und Strukturstabilität liefern. Diese ermöglichen eine vorausschauende Wartung und optimieren die Anlagenleistung.
                            </p>
                            <div className="text-sm">
                              <span className="font-medium">Vorteile:</span>
                              <ul className="list-disc pl-5 space-y-1 text-xs mt-1">
                                <li>Frühzeitige Erkennung von Montagefehlern oder Verschleißerscheinungen</li>
                                <li>Integration in Smart-Home-Systeme zur Leistungsoptimierung</li>
                                <li>Automatische Warnmeldungen bei kritischen Wetterlagen</li>
                                <li>Datenbasis für langfristige Performanceoptimierung</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Tab 3: Optimierung */}
                <TabsContent value="optimierung">
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border border-yellow-500/10 shadow-sm">
                      <H3 className="text-lg font-medium mb-4">Leistungsoptimierung durch bessere Montage</H3>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <Card className="border-yellow-100">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <LineChart className="h-5 w-5 text-purple-600" />
                              Ausrichtung & Neigung optimieren
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Südausrichtung mit 30-35° Neigung:</strong> Maximiert den Jahresertrag um bis zu 15% gegenüber suboptimaler Ausrichtung</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Ost-West-Ausrichtung:</strong> Gleichmäßigere Stromproduktion über den Tag, ideal für hohen Eigenverbrauch</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Verschattungsoptimierung:</strong> Korrekte Erhöhung der Reihenabstände verhindert Ertragseinbußen von 20-40%</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Planungssoftware:</strong> 3D-Simulation zur Ermittlung der optimalen Anordnung</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-yellow-100">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Zap className="h-5 w-5 text-yellow-600" />
                              Kühlung & Belüftung verbessern
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Optimaler Montageabstand:</strong> 10-15 cm Abstand zum Dach für effektive Hinterlüftung</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Thermische Entkopplung:</strong> Spezielle Montageschienen reduzieren Wärmebrücken</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Leistungssteigerung:</strong> Pro 1°C niedrigerer Modultemperatur ca. 0,4-0,5% mehr Leistung</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Ganzjahreseffekt:</strong> Bis zu 8% höherer Jahresertrag durch optimierte Kühlung</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-yellow-100">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Wrench className="h-5 w-5 text-amber-600" />
                              Montagehardware optimieren
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Korrosionsbeständige Materialien:</strong> V4A-Edelstahl für Küstenregionen, Aluminium für Normalklima</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Anti-Diebstahl-Schrauben:</strong> Spezialschrauben oder Klemmen mit Sicherungsmechanismen</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Flexible Ausgleichssysteme:</strong> Kompensieren Dachunregelmäßigkeiten und thermische Ausdehnung</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Richtige Dimensionierung:</strong> Angepasst an lokale Wind- und Schneelasten</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-yellow-100">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <ShieldCheck className="h-5 w-5 text-blue-600" />
                              Langzeitschutz implementieren
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Dichtungssysteme:</strong> Hochwertiges EPDM statt Standard-Materialien, hält 25+ Jahre</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Blitz- und Überspannungsschutz:</strong> Korrekte Integration in Gebäudeblitzschutz</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Potenzialausgleich:</strong> Professjonelle Erdung aller Metallteile verhindert Korrosion</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span><strong>Zugänglichkeit:</strong> Wartungswege und Zugangspunkte für spätere Inspektion</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {/* Fallbeispiel */}
                      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg mb-6">
                        <div className="font-medium mb-2 text-yellow-700">Fallbeispiel: Ertragssteigerung durch Montageoptimierung</div>
                        <p className="text-sm text-gray-700 mb-3">
                          Eine PV-Anlage in München mit 10 kWp zeigte nach dem ersten Betriebsjahr 15% weniger Ertrag als prognostiziert. Eine genaue Analyse deckte suboptimale Montagebedingungen auf.
                        </p>
                        <div className="text-sm text-gray-700">
                          <strong>Durchgeführte Optimierungen:</strong>
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>Korrektur der Neigungswinkel von 15° auf 30° bei Südmodulen</li>
                            <li>Verbesserung der Hinterlüftung durch Anhebung der Montageschienen um 5 cm</li>
                            <li>Installation von Leistungsoptimierern bei teilweise verschatteten Modulen</li>
                            <li>Einbau eines verbesserten Kabelmanagements zur Reduktion elektrischer Verluste</li>
                          </ul>
                          <p className="mt-3 font-medium text-green-700">
                            Ergebnis: Der Jahresertrag stieg um 23% auf 1.150 kWh/kWp. Die Mehrkosten von 1.200 € amortisierten sich bereits nach 2,3 Jahren.
                          </p>
                        </div>
                      </div>
                      
                      {/* Optimierungstabelle */}
                      <div>
                        <H3 className="text-lg font-medium mb-4">Zusammenfassung der Optimierungspotenziale</H3>
                        
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm border-collapse">
                            <thead className="bg-yellow-50">
                              <tr>
                                <th className="border border-yellow-200 px-4 py-2 text-left">Optimierungsmaßnahme</th>
                                <th className="border border-yellow-200 px-4 py-2 text-center">Ertragsgewinn</th>
                                <th className="border border-yellow-200 px-4 py-2 text-center">Kosten</th>
                                <th className="border border-yellow-200 px-4 py-2 text-center">Amortisation</th>
                                <th className="border border-yellow-200 px-4 py-2 text-center">Einfachheit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="border border-yellow-100 px-4 py-2">Optimierung Ausrichtung/Neigung</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center font-medium text-green-600">10-15%</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">€€€</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">4-6 Jahre</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">⭐⭐</td>
                              </tr>
                              <tr>
                                <td className="border border-yellow-100 px-4 py-2">Verbesserte Hinterlüftung</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center font-medium text-green-600">3-8%</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">€€</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">2-3 Jahre</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">⭐⭐⭐</td>
                              </tr>
                              <tr>
                                <td className="border border-yellow-100 px-4 py-2">Leistungsoptimierer für Verschattung</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center font-medium text-green-600">10-25%*</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">€€</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">3-4 Jahre</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">⭐⭐⭐⭐</td>
                              </tr>
                              <tr>
                                <td className="border border-yellow-100 px-4 py-2">Optimierte Kabelführung</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center font-medium text-green-600">1-3%</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">€</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">1-2 Jahre</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">⭐⭐⭐⭐⭐</td>
                              </tr>
                              <tr>
                                <td className="border border-yellow-100 px-4 py-2">Regelmäßige Modulreinigung</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center font-medium text-green-600">2-5%</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">€</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">&lt;1 Jahr</td>
                                <td className="border border-yellow-100 px-4 py-2 text-center">⭐⭐⭐⭐⭐</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">* Bei teilweise verschatteten Modulen</p>
                      </div>
                    </div>
                    
                    {/* DIY vs. Profi-Montage */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Drill className="h-5 w-5 text-yellow-600" />
                          DIY vs. Profi-Montage: Was können Sie selbst machen?
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm space-y-4">
                          <p>
                            Die Selbstmontage einer PV-Anlage kann Kosten sparen, birgt aber auch Risiken. Hier eine Übersicht, welche Arbeiten Sie selbst durchführen können und wann Sie Profis hinzuziehen sollten:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                              <h3 className="font-medium mb-2 text-green-700">Das können Sie selbst machen:</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Vorbereitende Planung</span>
                                    <p className="text-xs text-gray-600">Standortanalyse, Ausrichtungsoptimierung, Verschattungsanalyse</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Montage von Balkonkraftwerken</span>
                                    <p className="text-xs text-gray-600">Diese Mini-PV-Anlagen sind für DIY-Installation konzipiert</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Unterstützende Arbeiten</span>
                                    <p className="text-xs text-gray-600">Assistenz bei der professionellen Installation, Material- und Werkzeugbereitstellung</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Grundreinigung und Wartung</span>
                                    <p className="text-xs text-gray-600">Regelmäßige visuelle Kontrollen, einfache Reinigungsarbeiten (vom Boden aus)</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                              <h3 className="font-medium mb-2 text-red-700">Das sollten Profis übernehmen:</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Dacharbeiten und Montage</span>
                                    <p className="text-xs text-gray-600">Sicherheitsrisiken, Garantieverlust bei unsachgemäßer Montage, strukturelle Dachschäden</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Elektrischer Anschluss</span>
                                    <p className="text-xs text-gray-600">Rechtlich in Deutschland nur durch Elektriker mit entsprechender Qualifikation erlaubt</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Netzanmeldung und Inbetriebnahme</span>
                                    <p className="text-xs text-gray-600">Komplexe regulatorische Anforderungen, Abnahme durch Netzbetreiber</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Statische Berechnungen</span>
                                    <p className="text-xs text-gray-600">Dachlasten, Wind- und Schneelasten müssen professionell ermittelt werden</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                            <div className="flex items-start gap-3">
                              <Lightbulb className="h-8 w-20 text-yellow-400 mt-0.5" />
                              <div>
                                <div className="font-medium mb-1">Das Hybrid-Modell: DIY + Profi</div>
                                <p className="text-sm text-gray-600">
                                  Eine optimale Lösung für kostenbewusste Hausbesitzer ist das Hybrid-Modell: Sie übernehmen Planung, Vorbereitung und Helferarbeiten, während ein Fachbetrieb die kritischen Montage- und Anschlussarbeiten ausführt. Dies kann die Installationskosten um 15-20% senken, ohne Kompromisse bei Sicherheit und Garantien einzugehen.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Tab 4: Installation */}
                <TabsContent value="installation">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-yellow-600/10 shadow-sm">
                      <div className="flex items-start gap-3">
                        <ClipboardList className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
                        <div>
                          <H3 className="text-lg font-medium mb-2">Der professionelle Installationsprozess</H3>
                          <div className="text-sm text-muted-foreground mb-3">
                            Eine fachgerechte PV-Installation folgt einem strukturierten Prozess, der von der Planung bis zur Inbetriebnahme reicht.
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {/* Schritt 1 */}
                        <div className="flex gap-4 ml-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium z-10">
                            1
                          </div>
                          <div>
                            <div className="font-medium text-sm">Standortanalyse und Planung</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Dachvermessung und Aufnahme aller Dachdurchdringungen</li>
                              <li>Statische Prüfung der Dachkonstruktion und Tragfähigkeit</li>
                              <li>Verschattungsanalyse mit Solar-Pathfinder oder digitalen Tools</li>
                              <li>Festlegung des optimalen Montagesystems und der Modulanordnung</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Schritt 2 */}
                        <div className="flex gap-4 ml-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium z-10">
                            2
                          </div>
                          <div>
                            <div className="font-medium text-sm">Montagesystem-Installation</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Positionierung der Dachhaken und Befestigungspunkte am Dachstuhl</li>
                              <li>Installation der Montageschienen unter Berücksichtigung der Dehnungsfugen</li>
                              <li>Ausrichtung und Nivellierung des gesamten Montagesystems</li>
                              <li>Fachgerechte Abdichtung aller Dachdurchdringungen</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Schritt 3 */}
                        <div className="flex gap-4 ml-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium z-10">
                            3
                          </div>
                          <div>
                            <div className="font-medium text-sm">Modulinstallation und Verkabelung</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Korrekte Auswahl und Verlegung der DC-Kabel mit UV-Schutz</li>
                              <li>Verschaltung der Module gemäß optimiertem Stringplan</li>
                              <li>Sicherung der Module mit spezifischem Drehmoment (meist 15-18 Nm)</li>
                              <li>Professionelles Kabelmanagement und Zugentlastung</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Schritt 4 */}
                        <div className="flex gap-4 ml-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium z-10">
                            4
                          </div>
                          <div>
                            <div className="font-medium text-sm">Elektrischer Anschluss und Sicherheitseinrichtungen</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Installation des Wechselrichters an gut belüfteter Position</li>
                              <li>Montage der AC/DC-Schutztechnik und Überspannungsableiter</li>
                              <li>Korrekte Erdung aller Metallteile und Potenzialausgleich</li>
                              <li>Integration in bestehenden Blitzschutz (falls vorhanden)</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Schritt 5 */}
                        <div className="flex gap-4 ml-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium z-10">
                            5
                          </div>
                          <div>
                            <div className="font-medium text-sm">Netzanschluss und Inbetriebnahme</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Anmeldung beim Netzbetreiber und Installation des Einspeisezählers</li>
                              <li>Komplette Funktions- und Sicherheitsprüfung gemäß VDE-Vorschriften</li>
                              <li>Einstellung und Konfiguration des Wechselrichters und Monitoring-Systems</li>
                              <li>Anfertigung der vollständigen Anlagendokumentation für den Kunden</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Schritt 6 */}
                        <div className="flex gap-4 ml-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium z-10">
                            6
                          </div>
                          <div>
                            <div className="font-medium text-sm">Übergabe und Einweisung</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Übergabe der detaillierten Anlagendokumentation und Wartungshinweise</li>
                              <li>Einweisung des Kunden in Monitoring und Kontrollfunktionen</li>
                              <li>Erklärung der Verhaltensregeln bei Störungen oder Notfällen</li>
                              <li>Vereinbarung regelmäßiger Wartungsintervalle (empfohlen: alle 2 Jahre)</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-yellow-50 p-4 rounded-lg mt-6">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-6 w-6 text-yellow-400 mt-0.5" />
                          <div>
                            <div className="font-medium mb-1">7 kritische Montagefehler und wie Sie sie vermeiden</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                              <div className="text-sm">
                                <ol className="list-decimal pl-4 space-y-2">
                                  <li>
                                    <span className="font-medium">Zu geringe Dachabstände</span>
                                    <p className="text-xs text-gray-600">Führt zu Überhitzung und Ertragsverlusten. Minimum 10 cm Abstand zur Dachfläche einhalten.</p>
                                  </li>
                                  <li>
                                    <span className="font-medium">Falsche Stringverschaltung</span>
                                    <p className="text-xs text-gray-600">Unterschiedlich verschattete Module nicht im gleichen String betreiben oder Optimierer verwenden.</p>
                                  </li>
                                  <li>
                                    <span className="font-medium">Mangelhafte Dachdurchdringungen</span>
                                    <p className="text-xs text-gray-600">Spezielle Manschetten und Dichtungsmaterial für Dachdurchführungen verwenden.</p>
                                  </li>
                                  <li>
                                    <span className="font-medium">Fehlender Potenzialausgleich</span>
                                    <p className="text-xs text-gray-600">Alle Metallteile müssen untereinander verbunden und geerdet sein.</p>
                                  </li>
                                </ol>
                              </div>
                              <div className="text-sm">
                                <ol className="list-decimal pl-4 space-y-2 start-5">
                                  <li>
                                    <span className="font-medium">Überhitzung des Wechselrichters</span>
                                    <p className="text-xs text-gray-600">Ausreichende Belüftung sicherstellen, nicht in direkter Sonne montieren.</p>
                                  </li>
                                  <li>
                                    <span className="font-medium">Unzureichende Kabelquerschnitte</span>
                                    <p className="text-xs text-gray-600">Mindestens 6mm² für Hauptleitungen verwenden, Spannungsabfall unter 1% halten.</p>
                                  </li>
                                  <li>
                                    <span className="font-medium">Falsches Anzugsdrehmoment</span>
                                    <p className="text-xs text-gray-600">Drehmomentschlüssel verwenden und Herstellervorgaben beachten (meist 15-18 Nm).</p>
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Qualitätssicherung */}
                    <Card className="bg-gradient-to-r from-yellow-50 to-white border-yellow-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <BarChart4 className="h-5 w-5 text-yellow-600" />
                          Qualitätssicherung und Abnahme
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 text-sm">
                          <p className="mb-2">
                            Die Qualitätskontrolle ist ein entscheidender Schritt nach der Installation. Hier die wichtigsten Prüfpunkte für Installateure und Kunden:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
                              <div className="font-medium mb-3 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-yellow-600" />
                                Die elektrische Abnahme
                              </div>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Isolationsmessung der DC-Leitungen</span>
                                    <p className="text-xs text-gray-600">Widerstand sollte {'>'}1 MOhm pro 100V Systemspannung sein</p>                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Stringspannungsmessung unter Last</span>
                                    <p className="text-xs text-gray-600">Überprüfung der korrekten Verschaltung und Modulleistung</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">RCD-Schutzprüfung (Fehlerstromschutz)</span>
                                    <p className="text-xs text-gray-600">Test der Auslösezeit und Auslösestrom nach VDE 0100-600</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
                              <div className="font-medium mb-3 flex items-center gap-2">
                                <Drill className="h-4 w-4 text-yellow-600" />
                                Die mechanische Abnahme
                              </div>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Kontrolle aller Befestigungspunkte</span>
                                    <p className="text-xs text-gray-600">Drehmomentprüfung stichprobenartig an 10% der Klemmen</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Prüfung der Dachdichtigkeit</span>
                                    <p className="text-xs text-gray-600">Visuelle Inspektion aller Dachdurchdringungen von innen und außen</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Kabelführung und -management</span>
                                    <p className="text-xs text-gray-600">Keine losen Kabel, UV-Schutz vollständig, keine scharfen Kanten</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
                              <div className="font-medium mb-3 flex items-center gap-2">
                                <LineChart className="h-4 w-4 text-yellow-600" />
                                Funktions- und Ertragstest
                              </div>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Performance Ratio Messung</span>
                                    <p className="text-xs text-gray-600">Sollte {'>'}80% bei optimalen Bedingungen liegen</p>                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Thermografische Untersuchung</span>
                                    <p className="text-xs text-gray-600">Erkennt Hot-Spots und fehlerhafte Verbindungen frühzeitig</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Monitoring-System-Einrichtung</span>
                                    <p className="text-xs text-gray-600">Korrekte Datendokumentation und Alarmeinrichtung</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
                              <div className="font-medium mb-3 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-yellow-600" />
                                Dokumentation
                              </div>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Vollständiges Anlagenprotokoll</span>
                                    <p className="text-xs text-gray-600">Nach DIN VDE 0100-712 mit allen Messwerten und Prüfergebnissen</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Anlagenübersichtsplan</span>
                                    <p className="text-xs text-gray-600">Mit Modullayout, Verschaltungsplan und Anschlussschema</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Komponentendatenblätter</span>
                                    <p className="text-xs text-gray-600">Alle Datenblätter und Garantiebedingungen von Modulen, Wechselrichter, Montagesystem</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Wartung und Pflege */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Wrench className="h-5 w-5 text-yellow-600" />
                          Wartung und Pflege nach der Installation
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm space-y-4">
                          <p>
                            Regelmäßige Wartung und Pflege sind entscheidend für die langfristige Leistungsfähigkeit und Sicherheit Ihrer PV-Anlage:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                              <h3 className="font-medium mb-2 text-yellow-700">Empfohlener Wartungsplan</h3>
                              <table className="w-full text-xs">
                                <thead className="bg-yellow-50">
                                  <tr>
                                    <th className="p-2 text-left">Maßnahme</th>
                                    <th className="p-2 text-left">Intervall</th>
                                    <th className="p-2 text-left">Durchführung</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y">
                                  <tr>
                                    <td className="p-2">Sichtprüfung Module</td>
                                    <td className="p-2">1/2-jährlich</td>
                                    <td className="p-2">Eigenleistung möglich</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2">Modulreinigung</td>
                                    <td className="p-2">Jährlich</td>
                                    <td className="p-2">Eigenleistung/Profi</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2">Elektrische Prüfung</td>
                                    <td className="p-2">Alle 4 Jahre</td>
                                    <td className="p-2">Nur Fachbetrieb</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2">Wechselrichtercheck</td>
                                    <td className="p-2">Jährlich</td>
                                    <td className="p-2">Eigenleistung möglich</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2">Befestigungskontrolle</td>
                                    <td className="p-2">Alle 2 Jahre</td>
                                    <td className="p-2">Nur Fachbetrieb</td>
                                  </tr>
                                  <tr>
                                    <td className="p-2">Thermografie</td>
                                    <td className="p-2">Alle 5 Jahre</td>
                                    <td className="p-2">Nur Fachbetrieb</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            
                            <div className="border rounded-lg p-4">
                              <h3 className="font-medium mb-2 text-yellow-700">Reinigungstipps für PV-Module</h3>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div className="text-xs">
                                    <span className="font-medium">Geeignetes Wasser verwenden</span>
                                    <p className="text-gray-600">Kalk- und mineralfreies Wasser (osmotisiert) nutzen, um Kalkflecken zu vermeiden</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div className="text-xs">
                                    <span className="font-medium">Weiche Reinigungswerkzeuge</span>
                                    <p className="text-gray-600">Mikrofasermopp oder weiche Bürsten ohne harte Borsten verwenden, keine Hochdruckreiniger</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div className="text-xs">
                                    <span className="font-medium">Optimaler Zeitpunkt</span>
                                    <p className="text-gray-600">Früh morgens oder abends bei abgekühlten Modulen, nicht bei direkter Sonneneinstrahlung</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mt-4">
                            <div className="flex items-start gap-3">
                              <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
                              <div>
                                <div className="font-medium mb-1">Professionelle Wartung lohnt sich</div>
                                <p className="text-sm text-gray-600">
                                  Langzeitstudien zeigen, dass regelmäßig gewartete PV-Anlagen im Schnitt 12-18% höhere Erträge über die gesamte Lebensdauer liefern als nicht oder unzureichend gewartete Anlagen. Die Kosten für eine professionelle Wartung (ca. 100-300 € pro Jahr) amortisieren sich daher meist bereits nach 2-3 Jahren durch die höheren Erträge und die verlängerte Lebensdauer.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* CTA Section */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <H3 className="text-xl font-bold mb-2">Bereit für Ihre professionelle PV-Montage?</H3>
                    <Paragraph className="text-sm text-muted-foreground mb-4">
                      Nutzen Sie unser Fachwissen für eine optimale Installation Ihrer Photovoltaikanlage. Unser erfahrenes Team sorgt für höchste Qualitätsstandards und maximale Erträge durch fachmännische Montage. Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
                    </Paragraph>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/pv-montage">
                        <Button variant="outline" className="text-yellow-500 border-yellow-500 hover:bg-yellow-500/5 w-full sm:w-auto">
                          Mehr erfahren
                        </Button>
                      </Link>
                      <Link href="/pv-montage#kontakt">
                      <Button className="bg-yellow-500 hover:bg-yellow-500/90 text-white w-full sm:w-auto">
                          Kostenlose Beratung
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="md:border-l md:border-yellow-600/20 md:pl-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-yellow-500" />
                      <div>
                        <div className="text-xs text-muted-foreground">Telefon</div>
                        <div className="text-sm font-medium">0231 15044352</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-yellow-500" />
                      <div>
                        <div className="text-xs text-muted-foreground">E-Mail</div>
                        <div className="text-sm font-medium">info@treuservice.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-5 w-5 text-yellow-500" />
                      <div>
                        <div className="text-xs text-muted-foreground">Erreichbarkeit</div>
                        <div className="text-sm font-medium">Mo-Fr: 8:00-18:00 Uhr</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Letzte Aktualisierung: {format(date, 'dd. MMMM yyyy', { locale: de })}</span>
                    </div>
                    <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-gray-100"

                  onClick={() => ShareContent(title, window.location.href)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Teilen
                </Button>
                  </div>
                </div>
              </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Experten-Tipp Box */}
                <Card className="bg-yellow-500/5 border-yellow-500/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-6 w-6 text-yellow-400" />
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Achten Sie bei der Montage besonders auf die Dachstatik und Tragfähigkeit. Ein professioneller Statiker sollte vor der Installation die Belastbarkeit des Daches überprüfen, insbesondere bei älteren Gebäuden oder komplexen Dachkonstruktionen.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Besonders wichtig: Die Dachneigung und Ausrichtung bestimmen bis zu 25% Ihres Ertrags. Schon kleine Optimierungen bei der Montage können über 25 Jahre Laufzeit mehrere tausend Euro Mehrertrag bringen.
                    </Paragraph>
                  </CardContent>
                </Card>
                
                {/* Kosten-Übersicht */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-green-600" />
                      Kosten-Orientierung
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Aufdach-Montage (Schrägdach)</span>
                        <span className="font-medium">155-230 €/kWp</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Indach-Montage</span>
                        <span className="font-medium">230-390 €/kWp</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Flachdach-Montage</span>
                        <span className="font-medium">175-270 €/kWp</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Fassaden-Montage</span>
                        <span className="font-medium">220-350 €/kWp</span>
                      </div>
                      <Paragraph className="text-xs text-muted-foreground mt-2">
                        Hinweis: Preise beinhalten Material und Arbeitskosten, variieren je nach Dachbeschaffenheit, Komplexität und regionalen Faktoren. Stand: März 2025.
                      </Paragraph>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Checkliste */}
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ClipboardList className="h-5 w-5 text-yellow-600" />
                      Montage-Checkliste
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Dachstatik durch Fachmann prüfen lassen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Verschattungsanalyse durchführen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Mindestens 3 Angebote einholen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Montagesystem für lokale Wind-/Schneelasten</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Qualifikationen des Installateurs prüfen</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Verwandte Artikel */}
                <Card className="rounded-xl shadow-sm overflow-hidden">
                <CardHeader className="pb-2 bg-gray-50">
                <CardTitle className="text-lg">Verwandte Artikel</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="divide-y">
                      {[
                        { url: "/reinigung", title: "Reinigung und Wartung von PV-Anlagen" },
                        { url: "/blog/PVVergleich", title: "Photovoltaikmodul-Vergleich & Rechner" }
                      ].map((article, idx) => (
                        <Link 
                          key={idx}
                          href={article.url} 
                          className="flex items-center py-3 group"
                        >
                          <ArrowRight className="h-4 w-4 text-yellow-500 mr-2 transform group-hover:translate-x-1 transition-transform" />
                          <span className="text-sm group-hover:text-yellow-600 transition-colors">{article.title}</span>
                        </Link>
                      ))}
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
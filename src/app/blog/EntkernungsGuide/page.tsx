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
  HardHat, 
  Lightbulb,
  ClipboardList,
  ChevronRight, 
  Calendar, 
  Clock, 
  Share2,
  Phone,
  Mail,
  Calendar as CalendarIcon,
  Banknote,
  AlertTriangle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Separator } from "@/components/ui/separator"

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-orange-500 bg-orange-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
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

export default function EntkernungsGuidePage() {
  const title = "Entkernungs-Guide: Prozess, Entscheidungen & Vorbereitung"
  const subtitle = "Professioneller Rückbau kompakt erklärt"
  const date = new Date('2024-03-19');
  const readingTime = "8 min";
  const author = {
    name: "TREU Service Team",
    image: "/images/entkernung/home.jpg"
  };
  
  
  return (
    <div className="flex-1 pb-10">
      <Section className="pt-6 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-orange-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Entkernung</span>
          </div>
          
          <div className="max-w-4xl">
            {/* Tag/Badge */}
            <Badge className="mb-3">
              Entkernung
            </Badge>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </H1>
            
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              {subtitle}
            </H2>
            
            <div className="flex items-center gap-6 text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <div className="inline-block bg-orange-500/20 p-2 rounded-full">
                  <HardHat className="h-4 w-4 text-orange-500" />
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
              <Tabs defaultValue="prozess" className="w-full mb-8">
                <TabsList className="grid grid-cols-4 w-full mb-6">
                  <TabsTrigger value="prozess" className="text-sm">Prozess</TabsTrigger>
                  <TabsTrigger value="vergleich" className="text-sm">Entscheidungshilfe</TabsTrigger>
                  <TabsTrigger value="checkliste" className="text-sm">Checkliste</TabsTrigger>
                  <TabsTrigger value="finanzierung" className="text-sm">Finanzierung</TabsTrigger>
                </TabsList>
                
                {/* Tab 1: Prozess */}
                <TabsContent value="prozess">
                  <div className="space-y-6">
                    {/* Verbesserte Prozess-Beschreibung */}
                    <div className="bg-white p-4 rounded-lg border border-accent/10 shadow-sm">
                      <div className="flex items-center mb-4">
                        <H3 className="text-lg font-medium">Ablauf einer Entkernungsarbeit – einfach erklärt</H3>
                      </div>
                      
                      <div className="mb-4 text-sm text-muted-foreground">
                        Die Entkernung eines Gebäudes umfasst mehrere sorgfältig geplante und ausgeführte Schritte. Hier sind die Hauptelemente:
                      </div>
                      
                      {/* Verbesserte Schrittliste */}
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-accent/30" />
                        
                        <div className="space-y-4">
                          {/* Schritt 1-2 */}
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              1
                            </div>
                            <div>
                              <div className="font-medium text-sm">Planung und Vorbereitung</div>
                              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                                <li>Genehmigungen: Einholen aller erforderlichen Genehmigungen und Abnahmen</li>
                                <li>Risikoanalyse: Durchführung einer gründlichen Risikoanalyse</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              2
                            </div>
                            <div>
                              <div className="font-medium text-sm">Sicherheitseinrichtungen</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Bereitstellung aller notwendigen Sicherheitsausrüstungen wie Absperrungen, Atemschutzgeräte, Schutzhelme und Sicherheitsschuhe.
                              </div>
                            </div>
                          </div>
                          
                          {/* Schritt 3-7 */}
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              3
                            </div>
                            <div>
                              <div className="font-medium text-sm">Entfernung von Möbeln und Gegenständen</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Räumung aller Möbel, Gegenstände und Geräte aus dem betroffenen Bereich.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              4
                            </div>
                            <div>
                              <div className="font-medium text-sm">Abklemmen von Versorgungsleitungen</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Fachgerechtes Abklemmen von Strom-, Wasser-, Gas- und anderen Versorgungsleitungen.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              5
                            </div>
                            <div>
                              <div className="font-medium text-sm">Entfernung von Wänden und Decken</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Sorgfältige Planung und Durchführung der Entfernung unter Berücksichtigung tragender Elemente.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              6
                            </div>
                            <div>
                              <div className="font-medium text-sm">Entfernung von Böden und Bodenbelägen</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Fachgerechte Entfernung von Böden und Bodenbelägen zur Freilegung darunter liegender Rohrleitungen und Kabel.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              7
                            </div>
                            <div>
                              <div className="font-medium text-sm">Entfernung von Elektroinstallationen</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Sichere und ordnungsgemäße Entfernung von Elektroinstallationen durch qualifizierte Elektriker.
                              </div>
                            </div>
                          </div>
                          
                          {/* Schritt 8-10 */}
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              8
                            </div>
                            <div>
                              <div className="font-medium text-sm">Entfernung von Rohrleitungen</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Vorsichtige Entfernung von Rohrleitungen zur Schaffung von Raum für neue Installationen ohne Beschädigung umliegender Bereiche.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              9
                            </div>
                            <div>
                              <div className="font-medium text-sm">Abschlussprüfung</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Überprüfung der strukturellen Integrität und Qualitätskontrolle des entkernten Bereichs.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              10
                            </div>
                            <div>
                              <div className="font-medium text-sm">Entsorgung</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Ordnungsgemäße Entsorgung aller während der Entkernung anfallenden Materialien und Abfälle unter strikter Einhaltung von Umwelt- und Gesundheitsstandards.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 2: Entscheidungshilfe */}
                <TabsContent value="vergleich">
                  <div className="space-y-6">
                    {/* Entkernung vs. Abriss */}
                    <Card className="mb-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Entkernung vs. Komplett-Abriss</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium mb-2">Entkernung sinnvoll wenn:</div>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Tragstruktur erhaltenswert</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Denkmalschutz besteht</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Teilnutzung während Sanierung</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Günstigere CO2-Bilanz gewünscht</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Neue Raumaufteilung bei gleicher Struktur</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-medium mb-2">Abriss sinnvoll wenn:</div>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>Grundlegende Tragwerksprobleme</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>Massive Schadstoffbelastung</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>Völlig neue Raumaufteilung geplant</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>Sanierungskosten {'>'} 80% des Neubauwertes</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>Neugestaltung von Grund auf gewünscht</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* DIY vs. Profi */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">DIY vs. Professionelle Entkernung</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium mb-2">Für Profis entscheiden wenn:</div>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                                <span>Tragende Elemente betroffen</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                                <span>Schadstoffverdacht besteht</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                                <span>Umfangreiches Projekt ({'>'}50m²)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                                <span>Komplexe Ver-/Entsorgungsleitungen</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                                <span>Zeitmangel und schnelle Umsetzung nötig</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <div className="font-medium mb-2">DIY möglich bei:</div>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>Entfernung von Tapeten/Fliesen</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>Leichte, nicht-tragende Trennwände</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>Bodenbeläge ohne Schadstoffverdacht</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>Abgehängte Decken (nicht-tragend)</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span>Kleine, überschaubare Projekte</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Tab 3: Vorbereitungscheckliste */}
                <TabsContent value="checkliste">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-accent/10 shadow-sm">
                      <div className="flex items-start gap-3">
                        <ClipboardList className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                        <div>
                          <H3 className="text-lg font-medium mb-2">Ihre Vorbereitungscheckliste</H3>
                          <div className="text-sm text-muted-foreground mb-3">
                            Nutzen Sie diese Checkliste, um optimal auf Ihr Entkernungsprojekt vorbereitet zu sein.
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mt-4">
                        {/* Behördliche Vorbereitungen */}
                        <div>
                          <div className="font-medium text-sm text-orange-500 mb-1">1. Behördliche Vorbereitungen</div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Bauantrag/Genehmigung bei der zuständigen Behörde einholen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Statischen Nachweis einholen (bei tragenden Elementen)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Bei Denkmalschutz: Spezielle Genehmigung einholen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Nachbarn rechtzeitig über Arbeiten informieren</span>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Technische Vorbereitungen */}
                        <div>
                          <div className="font-medium text-sm text-orange-500 mb-1">2. Technische Vorbereitungen</div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Strom, Wasser und Gas abstellen und fachgerecht absichern</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Wertsachen und empfindliche Gegenstände entfernen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Schutzvorkehrungen für nicht betroffene Bereiche treffen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Zufahrtswege und Lagerplätze für Container organisieren</span>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Dokumentation */}
                        <div>
                          <div className="font-medium text-sm text-orange-500 mb-1">3. Dokumentation & Planung</div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Bestandsfotos vom Ist-Zustand machen (wichtig für Versicherung)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Baupläne bereithalten und tragenda Wände markieren</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Schadstoffanalyse durchführen lassen (besonders bei Baujahr vor 1995)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Folgegewerke planen und koordinieren</span>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Versicherung & Schutz */}
                        <div>
                          <div className="font-medium text-sm text-orange-500 mb-1">4. Versicherung & Schutz</div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Bauleistungsversicherung abschließen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Gebäudeversicherung über Baumaßnahmen informieren</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Bei DIY: Geeignete Schutzausrüstung bereitstellen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Sicherheitskonzept für die Baustelle erstellen</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 4: Finanzierung & Herausforderungen */}
                <TabsContent value="finanzierung">
                  <div className="space-y-6">
                    <Card className="mb-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Banknote className="h-5 w-5 text-green-600" />
                          Finanzierungsmöglichkeiten für Entkernungsmaßnahmen
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 text-sm">
                          <Paragraph className="text-sm mb-4">
                            Die Finanzierung von Entkernungsmaßnahmen kann leichter werden. Staatliche Förderprogramme helfen dabei. Sie bieten Zuschüsse und zinsgünstige Darlehen. Diese sind für Sanierungen und Modernisierungen gedacht. So sparen Sie Geld.
                          </Paragraph>
                          
                          <div>
                            <div className="font-medium mb-2">Staatliche Förderungen</div>
                            <Paragraph className="text-sm mb-3">
                              Das Bundesamt für Wirtschaft und Ausfuhrkontrolle (BAFA) gibt bis zu 75.000 EUR pro Wohneinheit. Dies ist bei Abriss oder Sanierung möglich. Es gibt auch einen Baubegleitungszuschuss von 20.000 EUR. Beim Neubau stehen bis zu 37.500 EUR pro Wohneinheit bereit.
                            </Paragraph>
                            <Paragraph className="text-sm mb-3">
                              Bis zu 45% der Neubaukosten können entfallen.
                            </Paragraph>
                          </div>
                          
                          <div>
                            <div className="font-medium mb-2">Finanzierungsoptionen</div>
                            <Paragraph className="text-sm mb-3">
                              Viele Optionen stehen offen: von Krediten bis zu Fördermitteln. Sanierungskredite reichen von 5.000 bis 50.000 EUR. Keine Grundbucheintragung ist nötig. Besonders förderfähig sind energetische Sanierungen.
                            </Paragraph>
                            <Paragraph className="text-sm mb-3">
                              Einliegerwohnungen oder Fenstertausch bringen hohe Zuschüsse. BAFA und traditionelle Kredite sind hier nützlich. Sie können sogar bis zu 145.000 EUR Förderung bekommen.
                            </Paragraph>
                            <ul className="space-y-1 pl-4 list-disc mb-3">
                              <li>Spezielle Sanierungskredite für altersgerechten Umbau durch die KfW</li>
                              <li>Förderkredit 159 der KfW für Barrierefreiheit</li>
                              <li>KfW Förderkredite für Solarenergieprojekte</li>
                            </ul>
                            <Paragraph className="text-sm">
                              Nutzen Sie die vielen Finanz- und Fördermöglichkeiten. Informieren Sie sich gut. So erreichen Sie Ihr Sanierungsziel kosteneffektiv.
                            </Paragraph>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-amber-600" />
                          Typische Herausforderungen und wie man sie meistert
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 text-sm">
                          <Paragraph className="text-sm mb-4">
                            Ein Entkernungsprojekt kann auf viele Herausforderungen stoßen. Wichtig ist, diese früh zu erkennen und zu lösen. So kann man die Arbeiten gut voranbringen.
                          </Paragraph>
                          
                          <div>
                            <div className="font-medium mb-2">Ungeplante Zeitfresser</div>
                            <Paragraph className="text-sm mb-3">
                              Alte Gebäude verbergen manchmal böse Überraschungen. Sie könnten Mängel haben, die viel Zeit kosten. Zum Beispiel sind das schlechte Mauern oder Leitungen, die nicht auf der Karte stehen. Eine gründliche Überprüfung vor dem Start hilft, solche Probleme zu finden. Auch ist es klug, Zeitpuffer einzuplanen.
                            </Paragraph>
                          </div>
                          
                          <div>
                            <div className="font-medium mb-2">Budgetüberschreitungen vermeiden</div>
                            <Paragraph className="text-sm">
                              Eine gute Budgetplanung schützt vor zu hohen Kosten. Plötzliche Ausgaben können das Budget zerstören. Es ist immer schlau, ein Extra-Geldpolster und Geld für Gefahren wie Asbest zu haben. So kann das Projekt finanziell erfolgreich sein.
                            </Paragraph>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Schadstoffe Sektion */}
              <div className="mb-8">
                <H3 className="text-xl font-medium mb-4">Häufige Schadstoffe im Altbau</H3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-red-50 p-3 rounded-md">
                    <div className="font-medium text-sm text-red-700 mb-1">Asbest</div>
                    <div className="text-xs text-red-600">In Bodenbelägen, Klebern, Fassadenplatten, Dachbedeckungen (bis 1993 verbaut)</div>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-md">
                    <div className="font-medium text-sm text-amber-700 mb-1">PCB</div>
                    <div className="text-xs text-amber-600">In Fugenmaterialien, Anstrichen, Dichtmassen (1950er bis 1980er)</div>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="font-medium text-sm text-blue-700 mb-1">KMF</div>
                    <div className="text-xs text-blue-600">Künstliche Mineralfasern in alten Dämmstoffen und Isolierungen</div>
                  </div>
                  
                  <div className="bg-purple-50 p-3 rounded-md">
                    <div className="font-medium text-sm text-purple-700 mb-1">PAK</div>
                    <div className="text-xs text-purple-600">In alten Parkettkleber, Teerpappe, Bitumen (bis 1990er)</div>
                  </div>
                </div>
                
                <Card className="bg-orange-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      Schadstoffanalyse empfohlen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm">
                      Eine professionelle Schadstoffanalyse vor der Entkernung bietet wichtige Vorteile:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 mb-6">
                      <li className="text-sm">Gesundheitsschutz für alle Beteiligten</li>
                      <li className="text-sm">Rechtssicherheit bei der Entsorgung</li>
                      <li className="text-sm">Vermeidung von Projektverzögerungen</li>
                      <li className="text-sm">Kosteneinsparung durch gezielte Maßnahmen</li>
                    </ul>
                    <Link href="/entkernung#kontakt">
                      <Button size="lg" className="w-full sm:w-auto">
                        Schadstoffanalyse anfragen
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
              
              {/* CTA Section */}
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <H3 className="text-xl font-bold mb-2">Bereit für Ihr Entkernungsprojekt?</H3>
                    <Paragraph className="text-sm text-muted-foreground mb-4">
                      Lassen Sie sich jetzt von unseren Experten beraten und erhalten Sie ein unverbindliches Angebot für Ihr Entkernungsvorhaben. Wir stehen Ihnen mit jahrelanger Erfahrung zur Seite.
                    </Paragraph>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/entkernung">
                        <Button variant="outline" className="text-accent border-accent hover:bg-accent/5 w-full sm:w-auto">
                          Dienstleistungen
                        </Button>
                      </Link>
                      <Link href="/entkernung#kontakt">
                      <Button className="bg-accent hover:bg-accent/90 text-white w-full sm:w-auto">
                          Kostenloses Angebot
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="md:border-l md:border-accent/20 md:pl-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <div>
                        <div className="text-xs text-muted-foreground">Telefon</div>
                        <div className="text-sm font-medium">0231 15044352</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-accent" />
                      <div>
                        <div className="text-xs text-muted-foreground">E-Mail</div>
                        <div className="text-sm font-medium">info@treuservice.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-5 w-5 text-accent" />
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
                <Card className="bg-accent/5 border-accent/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-400" />
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Achten Sie darauf, dass bei der Entkernung alle Versorgungsleitungen fachgerecht abgeklemmt werden. Eine unvollständige Abklemmung kann zu kostspieligen Folgeschäden führen.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Besonders wichtig: Dokumentieren Sie immer den Ist-Zustand mit Fotos vor Beginn der Arbeiten!
                    </Paragraph>
                  </CardContent>
                </Card>
                
                {/* Kosten-Übersicht */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Kosten-Orientierung</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Einfache Entkernung</span>
                        <span className="font-medium">40-60 €/m²</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Standard-Entkernung</span>
                        <span className="font-medium">60-80 €/m²</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Komplexe Entkernung</span>
                        <span className="font-medium">80-120 €/m²</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Schadstoffsanierung</span>
                        <span className="font-medium">+ 20-50 €/m²</span>
                      </div>
                      <Paragraph className="text-xs text-muted-foreground mt-2">
                        Hinweis: Diese Preise sind Richtwerte und können je nach Projekt variieren. Für ein genaues Angebot kontaktieren Sie uns bitte.
                      </Paragraph>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Weitere Artikel */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weitere Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link 
                        href="/blog/SanierungPraevention" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Sanierung und Prävention: Der ultimative Guide
                      </Link>
                      <Link 
                        href="/reinigung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Reinigung nach Entkernung
                      </Link>
                      <Link 
                        href="/entkernung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Unsere Entkernungs-Dienstleistungen im Detail
                      </Link>
                      <Link 
                        href="/sanierung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Professionelle Sanierungsarbeiten nach Entkernung
                      </Link>
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
"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  CheckCircle2, 
  Trash2, 
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
  Scale,
  Heart,
  TrendingUp,
  RefreshCcw,
  Banknote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Separator } from "@/components/ui/separator"

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-red-600 bg-red/10 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
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

export default function EntruempelungsGuidePage() {
  const title = "Entrümpelungs-Guide: Professionell, effizient und stressfrei"
  const subtitle = "Der ultimative Leitfaden für eine erfolgreiche Entrümpelung"
  const date = new Date('2025-03-20');
  const readingTime = "10 min";
  const author = {
    name: "TREU Service Team",
    image: "/images/entruempelung/home.jpg"
  };
  
  
  return (
    <div className="flex-1 pb-10">
      <Section className="pt-6 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-red-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Entrümpelung</span>
          </div>
          
          <div className="max-w-4xl">
            {/* Tag/Badge */}
            <Badge className="mb-3">
              Entrümpelung
            </Badge>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </H1>
            
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              {subtitle}
            </H2>
            
            <div className="flex items-center gap-6 text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <div className="inline-block bg-accent/20 p-2 rounded-full">
                  <Trash2 className="h-4 w-4 text-red-600" />
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
                  <TabsTrigger value="materialien" className="text-sm">Materialien</TabsTrigger>
                  <TabsTrigger value="checkliste" className="text-sm">Checkliste</TabsTrigger>
                  <TabsTrigger value="planung" className="text-sm">Zeitplanung</TabsTrigger>
                </TabsList>
                
                {/* Tab 1: Prozess */}
                <TabsContent value="prozess">
                  <div className="space-y-6">
                    {/* Prozess-Beschreibung */}
                    <div className="bg-white p-4 rounded-lg border border-accent/10 shadow-sm">
                      <div className="flex items-center mb-4">
                        <H3 className="text-lg font-medium">Der professionelle Entrümpelungsprozess – Schritt für Schritt</H3>
                      </div>
                      
                      <div className="mb-4 text-sm text-muted-foreground">
                        Eine professionelle Entrümpelung erfolgt strukturiert und systematisch. Hier sind die wichtigsten Schritte:
                      </div>
                      
                      {/* Detaillierte Schrittliste */}
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-accent/30" />
                        
                        <div className="space-y-4">
                          {/* Schritt 1-3 */}
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              1
                            </div>
                            <div>
                              <div className="font-medium text-sm">Erstberatung und Besichtigung</div>
                              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                                <li>Kostenlose Vor-Ort-Begehung zur Einschätzung des Umfangs</li>
                                <li>Identifikation wertvoller Gegenstände</li>
                                <li>Klärung besonderer Anforderungen (Zeitdruck, Teilentrümpelung, etc.)</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              2
                            </div>
                            <div>
                              <div className="font-medium text-sm">Angebotserstellung und Planung</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Basierend auf der Besichtigung erstellen wir ein detailliertes, transparentes Angebot, das alle Kosten aufschlüsselt und einen konkreten Zeitplan beinhaltet.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              3
                            </div>
                            <div>
                              <div className="font-medium text-sm">Vorbereitung und Sicherung</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Vor Beginn der eigentlichen Entrümpelung werden wertvolle oder zu bewahrende Gegenstände identifiziert und gesichert sowie Zugangswege für den effizienten Abtransport vorbereitet.
                              </div>
                            </div>
                          </div>
                          
                          {/* Schritt 4-6 */}
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              4
                            </div>
                            <div>
                              <div className="font-medium text-sm">Systematische Räumung und Sortierung</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Die eigentliche Entrümpelung erfolgt Raum für Raum. Dabei werden alle Gegenstände fachgerecht in verschiedene Kategorien sortiert: Verwertbares, Sperrmüll, Elektronikschrott, Gefahrstoffe und weitere.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              5
                            </div>
                            <div>
                              <div className="font-medium text-sm">Fachgerechte Entsorgung</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Alle Materialien werden entsprechend ihrer Kategorie korrekt und umweltgerecht entsorgt. Bei Bedarf werden Spezialunternehmen für Sondermüll hinzugezogen.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              6
                            </div>
                            <div>
                              <div className="font-medium text-sm">Verwertung und Verkauf wertvoller Gegenstände</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Identifizierte Wertgegenstände werden nach Absprache verwertet oder verkauft, was die Gesamtkosten der Entrümpelung reduzieren kann.
                              </div>
                            </div>
                          </div>
                          
                          {/* Schritt 7-8 */}
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              7
                            </div>
                            <div>
                              <div className="font-medium text-sm">Besenreine Übergabe</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Nach Abschluss aller Arbeiten werden die Räumlichkeiten besenrein übergeben, sodass sie für den nächsten Schritt (Renovierung, Verkauf, etc.) bereit sind.
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-4 ml-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium">
                              8
                            </div>
                            <div>
                              <div className="font-medium text-sm">Dokumentation und Abnahme</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                Wir dokumentieren alle entsorgten Materialien und stellen bei Bedarf Entsorgungsnachweise aus. Die finale Abnahme erfolgt gemeinsam mit dem Kunden.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 2: Materialien */}
                <TabsContent value="materialien">
                  <div className="space-y-6">
                    {/* Materialgruppen */}
                    <Card className="shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Scale className="h-5 w-5 text-red-600" />
                          Materialkategorien und fachgerechte Entsorgung
                        </CardTitle>
                        <CardDescription>
                          Eine professionelle Entrümpelung umfasst die richtige Sortierung und Entsorgung verschiedener Materialien.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Restmüll und Haushaltsmüll */}
                          <Card className="bg-slate-50 border-0 shadow-none">
                            <CardHeader className="px-4 py-3 pb-1">
                              <CardTitle className="text-base">Restmüll und Haushaltsmüll</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pt-0 pb-4">
                              <ul className="text-sm space-y-2">
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Reguläre Haushaltsgegenstände ohne Recyclingsmöglichkeit</span>
                                </li>
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Stark verschmutzte oder beschädigte Textilien</span>
                                </li>
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Hygieneartikel und Verpackungsmaterialien</span>
                                </li>
                              </ul>
                              <div className="mt-3 text-xs text-muted-foreground">
                                Entsorgung über lokale Müllentsorgungsunternehmen.
                              </div>
                            </CardContent>
                          </Card>
                        
                          {/* Sperrmüll */}
                          <Card className="bg-slate-50 border-0 shadow-none">
                            <CardHeader className="px-4 py-3 pb-1">
                              <CardTitle className="text-base">Sperrmüll</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pt-0 pb-4">
                              <ul className="text-sm space-y-2">
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Möbel (Sofas, Schränke, Tische, Stühle)</span>
                                </li>
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Matratzen und Bettgestelle</span>
                                </li>
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Teppiche, große Dekorationsgegenstände</span>
                                </li>
                              </ul>
                              <div className="mt-3 text-xs text-muted-foreground">
                                Transport zu Wertstoffhöfen oder Sperrmüllabholung.
                              </div>
                            </CardContent>
                          </Card>
                          
                          {/* Elektro- und Elektronikschrott */}
                          <Card className="bg-slate-50 border-0 shadow-none">
                            <CardHeader className="px-4 py-3 pb-1">
                              <CardTitle className="text-base">Elektro- und Elektronikschrott</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pt-0 pb-4">
                              <ul className="text-sm space-y-2">
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Haushaltsgeräte (Kühlschränke, Waschmaschinen)</span>
                                </li>
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Unterhaltungselektronik (TV, Radio, Computer)</span>
                                </li>
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Kleingeräte (Toaster, Mixer, Bügeleisen)</span>
                                </li>
                              </ul>
                              <div className="mt-3 text-xs text-muted-foreground">
                                Fachgerechte Entsorgung gemäß Elektro- und Elektronikgerätegesetz.
                              </div>
                            </CardContent>
                          </Card>
                          
                          {/* Wertstoffe */}
                          <Card className="bg-slate-50 border-0 shadow-none">
                            <CardHeader className="px-4 py-3 pb-1">
                              <CardTitle className="text-base">Wertstoffe</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pt-0 pb-4">
                              <ul className="text-sm space-y-2">
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Papier, Karton und Pappe</span>
                                </li>
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Glas (Flaschen, Behälter)</span>
                                </li>
                                <li className="flex gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Metalle und Kunststoffe</span>
                                </li>
                              </ul>
                              <div className="mt-3 text-xs text-muted-foreground">
                                Sortierte Zuführung zum Recycling über entsprechende Container.
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Gefahrstoffe */}
                          <Card className="bg-red-50 border-red-100 shadow-none">
                            <CardHeader className="px-4 py-3 pb-1">
                              <CardTitle className="text-base text-red-600">Gefahrstoffe und Problemabfälle</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pt-0 pb-4">
                              <ul className="text-sm space-y-2 text-red-800">
                                <li className="flex gap-2">
                                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  <span>Farben, Lacke und Lösungsmittel</span>
                                </li>
                                <li className="flex gap-2">
                                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  <span>Batterien und Akkus</span>
                                </li>
                                <li className="flex gap-2">
                                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  <span>Chemikalien und Reinigungsmittel</span>
                                </li>
                                <li className="flex gap-2">
                                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                  <span>Leuchtstoffröhren und Energiesparlampen</span>
                                </li>
                              </ul>
                              <div className="mt-3 text-xs text-red-600 font-medium">
                                Besondere Vorsicht! Entsorgung ausschließlich über spezielle Sammelstellen oder Schadstoffmobile.
                              </div>
                            </CardContent>
                          </Card>
                          
                          {/* Wertgegenstände */}
                          <Card className="bg-green-50 border-green-100 shadow-none">
                            <CardHeader className="px-4 py-3 pb-1">
                              <CardTitle className="text-base text-green-700">Wertgegenstände</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 pt-0 pb-4">
                              <ul className="text-sm space-y-2 text-green-800">
                                <li className="flex gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>Antiquitäten und Sammlerstücke</span>
                                </li>
                                <li className="flex gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>Schmuck, Münzen und Edelmetalle</span>
                                </li>
                                <li className="flex gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>Kunstgegenstände und Designermöbel</span>
                                </li>
                                <li className="flex gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                  <span>Hochwertige Elektronik und teure Haushaltsgeräte</span>
                                </li>
                              </ul>
                              <div className="mt-3 text-xs text-green-700">
                                Separate Erfassung und Bewertung mit Option zum Verkauf oder zur Anrechnung auf die Entrümpelungskosten.
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="bg-accent/5 p-4 rounded-lg">
                          <div className="flex gap-3 items-start">
                            <div className="bg-accent/20 p-2 rounded-full mt-0.5">
                              <Lightbulb className="h-5 w-5 text-yellow-400" />
                            </div>
                            <div>
                              <div className="font-medium mb-1">Profi-Tipp</div>
                              <p className="text-sm text-muted-foreground">
                                Eine gute Vorsortierung spart Zeit und Geld. Wenn Sie selbst vor der Entrümpelung bereits Materialien trennen können, reduziert sich der Aufwand für das Entrümpelungsteam und damit möglicherweise auch die Kosten.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                  </div>
                </TabsContent>
                
                {/* Tab 3: Checkliste */}
                <TabsContent value="checkliste">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-accent/10 shadow-sm">
                      <div className="flex items-start gap-3">
                        <ClipboardList className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                          <H3 className="text-lg font-medium mb-2">Die ultimative Entrümpelungs-Checkliste</H3>
                          <div className="text-sm text-muted-foreground mb-3">
                            Mit dieser Checkliste sind Sie optimal auf Ihr Entrümpelungsprojekt vorbereitet.
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4 mt-4">
                        {/* Vor der Entrümpelung */}
                        <div>
                          <div className="font-medium text-sm text-red-600 mb-1">1. Vor der Entrümpelung</div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Rechtliche Situation klären (Eigentum, Vollmachten, etc.)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Zugangsrechte sicherstellen und Schlüssel organisieren</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Bestandsaufnahme wichtiger/wertvoller Gegenstände erstellen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Fotos vom Ist-Zustand machen (wichtig für Versicherung)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Nachbarn über geplante Entrümpelung informieren</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Persönliche Dokumente und wichtige Unterlagen sichern</span>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Planung der Entrümpelung */}
                        <div>
                          <div className="font-medium text-sm text-red-600 mb-1">2. Planung der Entrümpelung</div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Mehrere Angebote von Entrümpelungsunternehmen einholen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Genauen Leistungsumfang vertraglich festhalten</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Parkplatz für Container/Fahrzeuge organisieren</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Terminplanung mit allen Beteiligten abstimmen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Ggf. Sonderregelungen für Hausverwaltung einholen</span>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Während der Entrümpelung */}
                        <div>
                          <div className="font-medium text-sm text-red-600 mb-1">3. Während der Entrümpelung</div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Ansprechpartner für Rückfragen benennen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Bei Bedarf Wertgegenstände für Anrechnung bestätigen lassen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Zwischenabnahmen bei mehrtägigen Projekten durchführen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Sonderfälle (z.B. unerwartete Gefahrstoffe) dokumentieren</span>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Nach der Entrümpelung */}
                        <div>
                          <div className="font-medium text-sm text-red-600 mb-1">4. Nach der Entrümpelung</div>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Abnahme der besenreinen Räumlichkeiten durchführen</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Zustand mit Fotos dokumentieren</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Entsorgungsnachweise überprüfen und abheften</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Schlüsselrückgabe organisieren und dokumentieren</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>Rechnung prüfen und Bewertung des Dienstleisters hinterlassen</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 4: Zeitplanung */}
                <TabsContent value="planung">
                  <div className="space-y-6">
                    <Card className="mb-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Clock className="h-5 w-5 text-accent" />
                          Zeitplanung für Ihr Entrümpelungsprojekt
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 text-sm">
                          <Paragraph className="text-sm mb-4">
                            Die richtige Zeitplanung ist entscheidend für eine erfolgreiche Entrümpelung. Hier finden Sie typische Zeitrahmen für verschiedene Entrümpelungsprojekte sowie wichtige Faktoren, die die Dauer beeinflussen können.
                          </Paragraph>
                          
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="bg-accent/10">
                                  <th className="border px-3 py-2 text-left">Objekt</th>
                                  <th className="border px-3 py-2 text-left">Füllungsgrad</th>
                                  <th className="border px-3 py-2 text-left">Typische Dauer</th>
                                  <th className="border px-3 py-2 text-left">Team</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="border px-3 py-2">1-Zimmer-Wohnung</td>
                                  <td className="border px-3 py-2">Normal</td>
                                  <td className="border px-3 py-2">4-6 Stunden</td>
                                  <td className="border px-3 py-2">2 Personen</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border px-3 py-2">2-3-Zimmer-Wohnung</td>
                                  <td className="border px-3 py-2">Normal</td>
                                  <td className="border px-3 py-2">1 Tag</td>
                                  <td className="border px-3 py-2">2-3 Personen</td>
                                </tr>
                                <tr>
                                  <td className="border px-3 py-2">4-Zimmer-Wohnung</td>
                                  <td className="border px-3 py-2">Normal</td>
                                  <td className="border px-3 py-2">1-2 Tage</td>
                                  <td className="border px-3 py-2">3-4 Personen</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border px-3 py-2">Einfamilienhaus</td>
                                  <td className="border px-3 py-2">Normal</td>
                                  <td className="border px-3 py-2">2-3 Tage</td>
                                  <td className="border px-3 py-2">4-5 Personen</td>
                                </tr>
                                <tr>
                                  <td className="border px-3 py-2">Keller/Dachboden</td>
                                  <td className="border px-3 py-2">Normal</td>
                                  <td className="border px-3 py-2">4-8 Stunden</td>
                                  <td className="border px-3 py-2">2-3 Personen</td>
                                </tr>
                                <tr className="bg-gray-50">
                                  <td className="border px-3 py-2">Garage</td>
                                  <td className="border px-3 py-2">Normal</td>
                                  <td className="border px-3 py-2">3-5 Stunden</td>
                                  <td className="border px-3 py-2">2 Personen</td>
                                </tr>
                                <tr>
                                  <td className="border px-3 py-2">Messie-Wohnung</td>
                                  <td className="border px-3 py-2">Stark überfüllt</td>
                                  <td className="border px-3 py-2">2-4 Tage</td>
                                  <td className="border px-3 py-2">3-5 Personen</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div className="mt-6">
                            <div className="font-medium mb-2">Zeitbeeinflussende Faktoren</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <div className="font-medium text-sm">Faktoren, die mehr Zeit erfordern:</div>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                  <li>Schwer zugängliche Räumlichkeiten (kein Aufzug, enge Treppenhäuser)</li>
                                  <li>Große Mengen schwerer Möbel</li>
                                  <li>Spezielle Entsorgungsanforderungen für Gefahrstoffe</li>
                                  <li>Schlechter Zustand der Räumlichkeiten (z.B. Schimmel)</li>
                                  <li>Ausgangssituation stark vermüllt (Messie-Wohnung)</li>
                                </ul>
                              </div>
                              <div className="space-y-2">
                                <div className="font-medium text-sm">Faktoren, die Zeit sparen:</div>
                                <ul className="list-disc pl-5 space-y-1 text-sm">
                                  <li>Gute Vorsortierung durch den Auftraggeber</li>
                                  <li>Direkter Zugang mit Fahrzeugen zum Objekt</li>
                                  <li>Verfügbarkeit eines Aufzugs</li>
                                  <li>Wenige Wertgegenstände, die besondere Behandlung erfordern</li>
                                  <li>Klare Anweisungen, was behalten und was entsorgt werden soll</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-accent/5 p-4 rounded-lg mt-4">
                            <div className="flex gap-3 items-start">
                              <RefreshCcw className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                              <div>
                                <div className="font-medium">Planungstipp</div>
                                <p className="text-sm text-muted-foreground">
                                  Planen Sie immer einen Zeitpuffer von mindestens 20% ein. Bei größeren Projekten empfehlen wir, zusätzlich einen Tag für unvorhergesehene Probleme einzukalkulieren. Achten Sie auch auf saisonale Faktoren – in den Sommermonaten und zu Jahresbeginn sind Entrümpelungsfirmen oft stark ausgelastet.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-accent" />
                          Saisonale Entrümpelungsplanung
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="font-medium mb-2">Beste Zeiten für Entrümpelung</div>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Frühjahr (März-Mai)</span>
                                    <p className="text-xs text-muted-foreground">Ideale Zeit für den Frühjahrsputz und Entrümpelung, moderate Temperaturen, gute Verfügbarkeit von Dienstleistern nach der Winterpause.</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Herbst (September-November)</span>
                                    <p className="text-xs text-muted-foreground">Zweite ideale Periode, angenehme Arbeitsbedingungen, gute Vorbereitung auf den Winter.</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <div className="font-medium mb-2">Weniger günstige Zeiträume</div>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Hochsommer (Juli-August)</span>
                                    <p className="text-xs text-muted-foreground">Hitze erschwert körperlich anstrengende Arbeiten, viele Dienstleister haben Urlaubszeiten.</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Dezember</span>
                                    <p className="text-xs text-muted-foreground">Weihnachtszeit ist oft hektisch, eingeschränkte Verfügbarkeit von Dienstleistern zum Jahresende.</p>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Vergleichstabelle */}
              <div className="mb-8">
                <H3 className="text-xl font-medium mb-4">Entrümpelung vs. Entsorgung vs. Umzug</H3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-accent/10">
                            <th className="border px-3 py-2 text-left">Kriterium</th>
                            <th className="border px-3 py-2 text-left">Entrümpelung</th>
                            <th className="border px-3 py-2 text-left">Sperrmüllentsorgung</th>
                            <th className="border px-3 py-2 text-left">Umzug</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          <tr>
                            <td className="border px-3 py-2 font-medium">Ziel</td>
                            <td className="border px-3 py-2">Komplette oder teilweise Leerung von Räumlichkeiten</td>
                            <td className="border px-3 py-2">Entsorgung einzelner großer Gegenstände</td>
                            <td className="border px-3 py-2">Transport von Besitztümern an einen neuen Ort</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border px-3 py-2 font-medium">Umfang</td>
                            <td className="border px-3 py-2">Umfassend, meist komplette Räume oder Objekte</td>
                            <td className="border px-3 py-2">Selektiv, nur ausgewählte Gegenstände</td>
                            <td className="border px-3 py-2">Umfassend, aber erhaltend statt entsorgend</td>
                          </tr>
                          <tr>
                            <td className="border px-3 py-2 font-medium">Sortierung</td>
                            <td className="border px-3 py-2">Umfangreiche Sortierung nach Materialarten</td>
                            <td className="border px-3 py-2">Minimal, vorwiegend Sperrmüll</td>
                            <td className="border px-3 py-2">Nach Räumen und Fragilität</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border px-3 py-2 font-medium">Wertgegenstandbehandlung</td>
                            <td className="border px-3 py-2">Identifikation, Bewertung, möglicher Verkauf</td>
                            <td className="border px-3 py-2">Nicht vorgesehen</td>
                            <td className="border px-3 py-2">Besonders sorgfältiger Transport</td>
                          </tr>
                          <tr>
                            <td className="border px-3 py-2 font-medium">Kosten</td>
                            <td className="border px-3 py-2">Mittel bis hoch, abhängig vom Umfang</td>
                            <td className="border px-3 py-2">Niedrig, oft kommunal pauschaliert</td>
                            <td className="border px-3 py-2">Mittel bis hoch, abhängig von Distanz und Volumen</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="border px-3 py-2 font-medium">Typische Anlässe</td>
                            <td className="border px-3 py-2">Nachlass, Haushaltsauflösung, Sanierung</td>
                            <td className="border px-3 py-2">Möbelersatz, kleinere Renovierungen</td>
                            <td className="border px-3 py-2">Wohnungswechsel, Büroumzug</td>
                          </tr>
                          <tr>
                            <td className="border px-3 py-2 font-medium">Endzustand</td>
                            <td className="border px-3 py-2">Besenrein</td>
                            <td className="border px-3 py-2">Unverändert, minus entsorgte Gegenstände</td>
                            <td className="border px-3 py-2">Leer</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6">
                  <div className="font-medium mb-3">DIY vs. Professionelle Entrümpelung</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-blue-50/50 border-blue-200/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Für DIY geeignet wenn:</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Kleine Fläche (1-2 Zimmer) mit wenigen Gegenständen</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Ausreichend Zeit und helfende Hände vorhanden</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Zugang zu Transportfahrzeug und Entsorgungsmöglichkeiten</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Keine schweren Möbel oder gefährlichen Materialien</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Keine emotionale Bindung zu den zu entsorgenden Gegenständen</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-purple-50/50 border-purple-200/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Profis beauftragen wenn:</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>Größere Fläche (komplettes Haus, Wohnung)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>Zeitdruck besteht (z.B. Mietübergabe, Verkauf)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>Potenzielle Gefahrstoffe vorhanden (Chemikalien, Asbest)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>Schwere oder sperrige Gegenstände zu entsorgen</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>Messie-Situation oder sehr starke Verschmutzung</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>Wertgegenstandsermittlung und -verwertung gewünscht</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              
              {/* Entrümpelungs-Psychologie */}
              <div className="mb-8">
                <H3 className="text-xl font-medium mb-4">Entrümpelungs-Psychologie: Die emotionale Seite des Loslassens</H3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                      <div>
                        <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                          <Image
                            src="/images/blog/entruempelung-emotion.jpg"
                            alt="Die emotionale Seite des Loslassens"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Paragraph className="text-sm">
                          Entrümpelung ist nicht nur ein physischer, sondern auch ein psychologischer Prozess. Oft fällt es schwer, sich von Gegenständen zu trennen, die Teil unserer Lebensgeschichte sind oder emotionale Bedeutung haben. 
                        </Paragraph>
                      </div>
                      <div>
                        <div className="font-medium mb-3">Warum das Loslassen so schwer fällt</div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <Heart className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Emotionale Bindung</span>
                              <p className="text-muted-foreground">Gegenstände sind mit Erinnerungen und Emotionen verknüpft, die wir nicht verlieren möchten.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Heart className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Zukunftsangst</span>
                              <p className="text-muted-foreground">&ldquo;Was, wenn ich es später noch brauche?&rdquo; - Die Sorge, etwas zu entsorgen, das später nützlich sein könnte.</p>
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Heart className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Identitätsverlust</span>
                              <p className="text-muted-foreground">Besitztümer definieren teilweise, wer wir sind oder waren - ihre Entsorgung kann wie ein Verlust der eigenen Geschichte wirken.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-6">
                      <div>
                        <div className="font-medium mb-3">Strategien zum leichteren Loslassen</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <Card className="shadow-sm">
                            <CardContent className="p-4">
                              <div className="font-medium mb-2">1. Die Erinnerungstechnik</div>
                              <p className="text-muted-foreground mb-3">
                                Machen Sie Fotos von Gegenständen mit hohem emotionalem Wert, bevor Sie sie weggeben. Die Erinnerung bleibt, auch wenn der physische Gegenstand nicht mehr da ist.
                              </p>
                              <p className="text-muted-foreground">
                                Erstellen Sie ein &ldquo;Erinnerungsalbum&rdquo; mit Fotos und kurzen Notizen zu den Geschichten hinter den Gegenständen.
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="shadow-sm">
                            <CardContent className="p-4">
                              <div className="font-medium mb-2">2. Die Wertschätzungsmethode</div>
                              <p className="text-muted-foreground mb-3">
                                Fragen Sie sich: &ldquo;Hat dieser Gegenstand in den letzten 12 Monaten mein Leben bereichert?&rdquo; Wenn nicht, ist es vielleicht Zeit, ihn weiterzugeben.
                              </p>
                              <p className="text-muted-foreground">
                                Danken Sie dem Gegenstand mental für seinen Dienst, bevor Sie ihn entsorgen oder weitergeben.
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card className="shadow-sm">
                            <CardContent className="p-4">
                              <div className="font-medium mb-2">3. Die Weitergabe-Strategie</div>
                              <p className="text-muted-foreground mb-3">
                                Finden Sie für wertvolle Gegenstände ein &ldquo;neues Zuhause&rdquo; - sei es bei Verwandten, Freunden oder durch Spenden an Bedürftige.
                              </p>
                              <p className="text-muted-foreground">
                                Das Wissen, dass jemand anderes Freude an dem Gegenstand haben wird, erleichtert das Loslassen erheblich.
                              </p>
                            </CardContent>
                          </Card>
                          
                          <Card className="shadow-sm">
                            <CardContent className="p-4">
                              <div className="font-medium mb-2">4. Die 6-Monats-Kiste</div>
                              <p className="text-muted-foreground mb-3">
                                Bei Unsicherheit: Packen Sie Gegenstände in eine Kiste, beschriften Sie diese mit dem aktuellen Datum und einem Datum in 6 Monaten.
                              </p>
                              <p className="text-muted-foreground">
                                Wenn Sie die Kiste bis zum angegebenen Datum nicht geöffnet haben, können Sie sie ungeöffnet entsorgen oder spenden.
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                      
                      <div>
                        <div className="font-medium mb-3">Besondere Herausforderungen bei der Entrümpelung von Nachlässen</div>
                        <Card className="bg-amber-50 border-amber-200">
                          <CardContent className="p-4">
                            <div className="text-sm space-y-4">
                              <p>
                                Die Entrümpelung nach dem Tod eines Angehörigen ist besonders emotional belastend. Hier sind einige Ratschläge:
                              </p>
                              <ul className="list-disc pl-5 space-y-2">
                                <li>Nehmen Sie sich Zeit und setzen Sie sich nicht unter Druck</li>
                                <li>Ziehen Sie eine neutrale Person hinzu, die weniger emotional involviert ist</li>
                                <li>Erstellen Sie drei Kategorien: Behalten, Weitergeben an Familie/Freunde, Entsorgen</li>
                                <li>Machen Sie regelmäßige Pausen und achten Sie auf Ihre psychische Gesundheit</li>
                                <li>Erwägen Sie professionelle Hilfe, sowohl für den praktischen als auch den emotionalen Aspekt</li>
                              </ul>
                              <p>
                                Eine empathische Entrümpelungsfirma kann in solchen Situationen eine große Unterstützung sein und den Prozess mit der nötigen Sensibilität begleiten.
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* CTA Section */}
              <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <H3 className="text-xl font-bold mb-2">Bereit für Ihre Entrümpelung?</H3>
                    <Paragraph className="text-sm text-muted-foreground mb-4">
                      Lassen Sie sich jetzt von unseren Experten beraten und erhalten Sie ein unverbindliches Angebot für Ihr individuelles Entrümpelungsprojekt. Wir stehen Ihnen mit jahrelanger Erfahrung zur Seite.
                    </Paragraph>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/entruempelung">
                        <Button variant="outline" className="text-accent border-accent hover:bg-accent/5 w-full sm:w-auto">
                          Mehr erfahren
                        </Button>
                      </Link>
                      <Link href="/entruempelung#kontakt">
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
                      Dokumentieren Sie den Zustand vor der Entrümpelung mit Fotos. Dies hilft nicht nur bei eventuellen Versicherungsfragen, sondern erleichtert auch die Einschätzung des Umfangs für Angebote.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Besonders wichtig: Suchen Sie vor der Entrümpelung gründlich nach wichtigen Dokumenten, Wertgegenständen und persönlichen Erinnerungsstücken.
                    </Paragraph>
                  </CardContent>
                </Card>
                
                {/* Kosten-Übersicht */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-green-600" />
                      Kosten-Übersicht
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Kleinere Wohnung (bis 60m²)</span>
                        <span className="font-medium">800-1.500 €</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Mittlere Wohnung (60-100m²)</span>
                        <span className="font-medium">1.500-2.800 €</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Große Wohnung/Haus (100-200m²)</span>
                        <span className="font-medium">2.800-5.000 €</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Keller/Dachboden</span>
                        <span className="font-medium">400-900 €</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Messie-Wohnung (Aufschlag)</span>
                        <span className="font-medium">+50-100%</span>
                      </div>
                      <Paragraph className="text-xs text-muted-foreground mt-2">
                        Hinweis: Diese Preise sind Richtwerte und können je nach Füllgrad, Region und besonderen Anforderungen variieren. Nutzen Sie unseren <Link href="/blog/EntruemplungsKostenRechner" className="text-accent hover:underline">Kostenrechner</Link> für eine genauere Schätzung.
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
                        href="/blog/EntruemplungsKostenRechner" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Entrümpelungskosten-Rechner
                      </Link>
                      <Link 
                        href="/blog/NachhaltigeReinigung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Nachhaltige Reinigung nach der Entrümpelung
                      </Link>
                      <Link 
                        href="/entruempelung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Unsere Entrümpelungs-Dienstleistungen im Detail
                      </Link>
                      <Link 
                        href="/blog/SanierungPraevention" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Sanierung nach Entrümpelung - Was beachten?
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
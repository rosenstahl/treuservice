"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { 
  ChevronRight, 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  XCircle,
  PhoneCall,
  Camera,
  FileText,
  Droplet,
  Info,
  Flame,
  Bug,
  Paintbrush,
  Gauge,
  Home,
  HeartPulse,
  Sparkles,
  Building,
  Phone,
  Mail,
  Check,
  Calendar
} from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

// Benutzerdefinierte Badge-Komponente
const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-purple-500 bg-purple-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

// Zeitleiste-Eintrag-Komponente
const TimelineItem = ({ time, title, description, icon, isAlert = false }: { time: string; title: string; description: string; icon: React.ReactNode; isAlert?: boolean }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full ${isAlert ? 'bg-red-100' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
    </div>
    <div className="pb-10">
      <div className="text-sm font-medium text-muted-foreground">{time}</div>
      <div className="font-medium mb-1">{title}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

// Checklisten-Item-Komponente
const ChecklistItem = ({ title, description, isDo = true }: { title: string; description: string; isDo?: boolean }) => (
  <div className="flex items-start gap-3 mb-4">
    <div className={`p-2 rounded-full ${isDo ? 'bg-green-100' : 'bg-red-100'} flex-shrink-0 mt-1`}>
      {isDo ? (
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      ) : (
        <XCircle className="w-4 h-4 text-red-600" />
      )}
    </div>
    <div>
      <div className="font-medium">{title}</div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

// TipBox-Komponente
const TipBox = ({ title, children, icon }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) => (
  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
    <div className="flex items-start gap-3">
      <div className="p-2 bg-amber-100 rounded-full flex-shrink-0">
        {icon || <Info className="w-4 h-4 text-amber-700" />}
      </div>
      <div>
        <h4 className="font-medium text-amber-800 mb-1">{title}</h4>
        <div className="text-sm text-amber-700">{children}</div>
      </div>
    </div>
  </div>
);

// DownloadButton-Komponente

// Phasen-Icon-Komponente
const PhaseIcon = ({ phase }: { phase: number }) => {
  let Icon;
  let bgColor;
  let iconColor;

  switch (phase) {
    case 1:
      Icon = AlertCircle;
      bgColor = "bg-red-100";
      iconColor = "text-red-600";
      break;
    case 2:
      Icon = FileText;
      bgColor = "bg-amber-100";
      iconColor = "text-amber-600";
      break;
    case 3:
      Icon = Gauge;
      bgColor = "bg-blue-100";
      iconColor = "text-blue-600";
      break;
    case 4:
      Icon = Building;
      bgColor = "bg-green-100";
      iconColor = "text-green-600";
      break;
    case 5:
      Icon = Home;
      bgColor = "bg-purple-100";
      iconColor = "text-purple-600";
      break;
    default:
      Icon = Info;
      bgColor = "bg-gray-100";
      iconColor = "text-gray-600";
  }

  return (
    <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
  );
};

export default function SanierungsGuidePage() {
  const title = "Der ultimative Sanierungsguide: Von der Notfallreaktion bis zur Komplettsanierung"
  const subtitle = "Ihr umfassender Leitfaden für erfolgreiche Sanierungen nach Wasser-, Brand- und Schimmelschäden"
  const date = new Date('2025-03-20');
  const readingTime = "18 min";
  const author = {
    name: "TREU Service Sanierungsteam",
    image: "/images/blog/sanierung.jpg"
  };
  
  return (
    <div className="flex-1 pb-10">
      <Section className="pt-6 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-purple-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Schadensanierung</span>
          </div>
          
          <div className="max-w-4xl">
            {/* Tag/Badge */}
            <Badge className="mb-3 text-purple-400">
              Schadensanierung
            </Badge>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </H1>
            
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              {subtitle}
            </H2>
            
            <div className="flex items-center gap-6 text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <div>
                  <Paintbrush className="h-5 w-5 text-purple-500" />
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
              <div className="mb-8">
                <div className="relative rounded-xl overflow-hidden w-full aspect-video mb-6">
                  <Image 
                    src="/images/blog/sanierung1.jpg"
                    alt="Professionelle Sanierung nach Gebäudeschäden"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame className="w-4 h-4 text-red-500" />
                        <h3 className="font-medium text-sm">Brandschäden</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">Professionelle Sanierung nach Feuer, Rauch und Ruß</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplet className="w-4 h-4 text-blue-500" />
                        <h3 className="font-medium text-sm">Wasserschäden</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">Effektive Trocknung und Wiederherstellung</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Bug className="w-4 h-4 text-green-500" />
                        <h3 className="font-medium text-sm">Schimmelschäden</h3>
                      </div>
                      <p className="text-xs text-muted-foreground">Fachgerechte Beseitigung und Prävention</p>
                    </CardContent>
                  </Card>
                </div>
                
                <Paragraph>
                  Ein Gebäudeschaden – sei es durch Wasser, Feuer oder Schimmel – stellt Eigentümer vor enorme Herausforderungen. Neben dem emotionalen Stress kommen komplexe Entscheidungen hinzu, die langfristige Auswirkungen auf Ihre Immobilie haben können. Dieser umfassende Sanierungsguide führt Sie durch alle Phasen: von den kritischen ersten Stunden nach dem Schadensereignis über die Versicherungsabwicklung bis hin zur erfolgreichen Abnahme der Sanierungsarbeiten.
                </Paragraph>
                
                <Paragraph className="mt-4">
                  Mit Expertenwissen, praxisnahen Checklisten und bewährten Strategien unterstützen wir Sie dabei, den komplexen Sanierungsprozess erfolgreich zu meistern und teure Fehler zu vermeiden. Ob Sie selbst Hand anlegen oder professionelle Hilfe in Anspruch nehmen – dieser Guide bietet Ihnen in jeder Phase die notwendige Orientierung.
                </Paragraph>
              </div>
              
              {/* Tabs Navigation */}
              <Tabs defaultValue="notfall" className="w-full mb-8">
                <TabsList className="grid grid-cols-5 w-full mb-6">
                  <TabsTrigger value="notfall" className="text-sm">Notfall & Erste Hilfe</TabsTrigger>
                  <TabsTrigger value="versicherung" className="text-sm">Versicherung</TabsTrigger>
                  <TabsTrigger value="sanierung" className="text-sm">Sanierungsverfahren</TabsTrigger>
                  <TabsTrigger value="waehrend" className="text-sm">Während der Sanierung</TabsTrigger>
                  <TabsTrigger value="nachher" className="text-sm">Nach der Sanierung</TabsTrigger>
                </TabsList>
                
                {/* Tab 1: Notfall & Erste Hilfe */}
                <TabsContent value="notfall">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <PhaseIcon phase={1} />
                      <div>
                        <H3 className="text-xl font-semibold mb-2">Phase 1: Notfall & Erste Hilfe</H3>
                        <Paragraph className="text-muted-foreground">
                          Die ersten Stunden nach einem Schadensfall sind entscheidend. Mit den richtigen Sofortmaßnahmen können Sie größere Folgeschäden vermeiden und die Grundlage für eine erfolgreiche Sanierung schaffen.
                        </Paragraph>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Schnellreaktionskarten je nach Schadensart */}
                      <div>
                        <H3 className="text-lg font-medium mb-4">Sofortmaßnahmen nach Schadenstyp</H3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Wasserschaden */}
                          <Card className="border-l-4 border-l-blue-500">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Droplet className="w-4 h-4 text-blue-500" />
                                Wasserschaden
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ol className="list-decimal pl-5 space-y-1 text-sm">
                                <li>Hauptwasserhahn abdrehen</li>
                                <li>Strom in betroffenen Bereichen abschalten</li>
                                <li>Wasser aufnehmen (Eimer, Tücher, Nasssauger)</li>
                                <li>Gefährdete Gegenstände in Sicherheit bringen</li>
                                <li>Möbel auf Alufolie oder Blöcke stellen</li>
                              </ol>
                            </CardContent>
                            <CardFooter>
                              <Link href="#wasserdetails" className="text-xs text-blue-600 hover:underline">Detaillierte Anweisungen →</Link>
                            </CardFooter>
                          </Card>
                          
                          {/* Brandschaden */}
                          <Card className="border-l-4 border-l-red-500">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Flame className="w-4 h-4 text-red-500" />
                                Brandschaden
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ol className="list-decimal pl-5 space-y-1 text-sm">
                                <li>Sicherheit geht vor: Brandstelle erst nach Freigabe betreten</li>
                                <li>Strom und Gas abstellen (wenn sicher)</li>
                                <li>Fenster nicht öffnen (Ruß nicht verteilen)</li>
                                <li>Nichts anfassen oder reinigen</li>
                                <li>Ruß- und Rauchspuren für Versicherung dokumentieren</li>
                              </ol>
                            </CardContent>
                            <CardFooter>
                              <Link href="#branddetails" className="text-xs text-red-600 hover:underline">Detaillierte Anweisungen →</Link>
                            </CardFooter>
                          </Card>
                          
                          {/* Schimmelschaden */}
                          <Card className="border-l-4 border-l-green-500">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Bug className="w-4 h-4 text-green-500" />
                                Schimmelschaden
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ol className="list-decimal pl-5 space-y-1 text-sm">
                                <li>Feuchtigkeitsquelle identifizieren und beseitigen</li>
                                <li>Betroffenen Bereich nicht berühren (ohne Schutz)</li>
                                <li>Raumluft nicht verwirbeln, keine Ventilatoren nutzen</li>
                                <li>Umfang des Befalls dokumentieren (Fotos)</li>
                                <li>Bei größerem Befall ({'>'}0,5m²): Profis kontaktieren</li>
                              </ol>
                            </CardContent>
                            <CardFooter>
                              <Link href="#schimmeldetails" className="text-xs text-green-600 hover:underline">Detaillierte Anweisungen →</Link>
                            </CardFooter>
                          </Card>
                        </div>
                      </div>
                      
                      {/* Detaillierter Notfallplan für Wasserschäden */}
                      <div id="wasserdetails" className="mt-10 pt-4 border-t">
                        <H3 className="text-lg font-medium mb-4">Wasserschaden: Die ersten 24 Stunden</H3>
                        
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <div className="font-medium text-blue-800">Schnell handeln bei Wasserschäden!</div>
                              <p className="text-sm text-blue-700 mt-1">
                                Nach 24-48 Stunden steigt das Schimmelrisiko drastisch. Schnelles und effektives Handeln ist entscheidend, um Folgeschäden zu minimieren.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <TimelineItem 
                            time="Sofort (0h)" 
                            title="Wasserzufuhr stoppen und Gefahrenquellen sichern" 
                            description="Hauptwasserhahn zudrehen, Strom abschalten wenn nötig, austretendes Wasser auffangen."
                            icon={<AlertCircle className="w-5 h-5 text-red-600" />}
                            isAlert={true}
                          />
                          
                          <TimelineItem 
                            time="0-1 Stunde" 
                            title="Erste Dokumentation und Wasser entfernen" 
                            description="Fotos vom Schaden machen, losen Besitz aus dem Wasser entfernen, soviel Wasser wie möglich beseitigen."
                            icon={<Camera className="w-5 h-5 text-blue-600" />}
                          />
                          
                          <TimelineItem 
                            time="1-3 Stunden" 
                            title="Lüften und Versicherung informieren" 
                            description="Fenster öffnen (außer bei hoher Luftfeuchtigkeit draußen), Versicherung kontaktieren und Schadensmeldung einleiten."
                            icon={<PhoneCall className="w-5 h-5 text-blue-600" />}
                          />
                          
                          <TimelineItem 
                            time="3-6 Stunden" 
                            title="Trocknungsmaßnahmen verstärken" 
                            description="Bei kleineren Schäden: Ventilatoren aufstellen, Luftentfeuchter einsetzen. Bei größeren Schäden: Professionelle Hilfe organisieren."
                            icon={<Droplet className="w-5 h-5 text-blue-600" />}
                          />
                        </div>
                        
                        <TipBox title="Expertentipp: Effektive Notfall-Trocknung">
                          <p>
                            Stellen Sie mindestens einen Ventilator so auf, dass er Luft aus dem Raum hinausbläst (am Fenster), während ein anderer frische Luft hineinbläst. Dies erzeugt einen Luftstrom, der die Feuchtigkeit schneller abtransportiert als stillstehende Luft.
                          </p>
                        </TipBox>
                      </div>
                      {/* Detaillierter Notfallplan für Brandschäden */}
                      <div id="branddetails" className="mt-4 pt-4 border-t">
                        <H3 className="text-lg font-medium mb-4">Brandschaden: Kritische erste Maßnahmen</H3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Sofort tun</CardTitle>
                              <CardDescription>Diese Maßnahmen haben Priorität</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <ChecklistItem 
                                title="Sicherheit gewährleisten" 
                                description="Betreten Sie die Brandstelle erst nach Freigabe durch die Feuerwehr."
                              />
                              <ChecklistItem 
                                title="Versorgungsleitungen sichern" 
                                description="Strom und Gas abstellen, sofern dies gefahrlos möglich ist."
                              />
                              <ChecklistItem 
                                title="Dokumentation erstellen" 
                                description="Ausführlich fotografieren, bevor irgendwelche Reinigungsmaßnahmen begonnen werden."
                              />
                              <ChecklistItem 
                                title="Versicherung kontaktieren" 
                                description="Sofortige Schadensmeldung erstatten und weitere Anweisungen einholen."
                              />
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Unbedingt vermeiden</CardTitle>
                              <CardDescription>Diese Fehler verschlimmern den Schaden</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <ChecklistItem 
                                title="Keine eigenständige Reinigung" 
                                description="Rußpartikel können sich tiefer in Oberflächen einreiben oder im ganzen Gebäude verteilen."
                                isDo={false}
                              />
                              <ChecklistItem 
                                title="Keine Ventilatoren einsetzen" 
                                description="Dies würde Rußpartikel aufwirbeln und in weitere Räume transportieren."
                                isDo={false}
                              />
                              <ChecklistItem 
                                title="Keine Elektrogeräte testen" 
                                description="Auch wenn sie äußerlich unbeschädigt erscheinen - Ruß und Hitze können innere Schäden verursacht haben."
                                isDo={false}
                              />
                              <ChecklistItem 
                                title="Lebensmittel nicht mehr konsumieren" 
                                description="Alle offenen Lebensmittel nach einem Brand entsorgen, auch aus geschlossenen Schränken."
                                isDo={false}
                              />
                            </CardContent>
                          </Card>
                        </div>
                        
                        <TipBox 
                          title="Gesundheitsrisiken nach Bränden" 
                          icon={<HeartPulse className="w-4 h-4 text-amber-700" />}
                        >
                          <p>
                            Rußpartikel sind extrem klein und können tief in die Lunge eindringen. Sie enthalten oft toxische Substanzen. Verwenden Sie mindestens eine FFP2-Maske, wenn Sie sich nach einem Brand im Gebäude aufhalten müssen, und beschränken Sie die Aufenthaltsdauer.
                          </p>
                        </TipBox>
                      </div>
                      
                      {/* Detaillierter Notfallplan für Schimmelschäden */}
                      <div id="schimmeldetails" className="mt-4 pt-4 border-t">
                        <H3 className="text-lg font-medium mb-4">Schimmelschaden: Erste Maßnahmen</H3>
                        
                        <TipBox 
                          title="Gesundheitshinweis" 
                          icon={<AlertCircle className="w-4 h-4 text-amber-700" />}
                        >
                          <p>
                            Schimmelpilzsporen können allergische Reaktionen und Atemwegserkrankungen auslösen. Besonders gefährdet sind Kinder, ältere Menschen, Allergiker und Personen mit geschwächtem Immunsystem.
                          </p>
                        </TipBox>
                        
                        <div className="mt-4 space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Bug className="w-5 h-5 text-green-600" />
                                Beurteilung des Schimmelschadens
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-medium text-green-700">1</span>
                                  </div>
                                  <div>
                                    <div className="font-medium">Umfang bestimmen</div>
                                    <p className="text-sm text-muted-foreground">
                                      Kleiner Befall (unter 0,5m²): kann ggf. selbst beseitigt werden<br />
                                      Mittlerer Befall (0,5-3m²): Handschuhe, Maske und Schutzbrille erforderlich<br />
                                      Großer Befall (über 3m²): immer Fachfirma beauftragen
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-medium text-green-700">2</span>
                                  </div>
                                  <div>
                                    <div className="font-medium">Ursache identifizieren</div>
                                    <p className="text-sm text-muted-foreground">
                                      Ohne Beseitigung der Feuchtigkeitsursache ist jede Schimmelbekämpfung nur temporär. Prüfen Sie auf Leckagen, Wasserschäden, Kondensationsprobleme oder Baumängel.
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-medium text-green-700">3</span>
                                  </div>
                                  <div>
                                    <div className="font-medium">Feuchtigkeitsmessung durchführen</div>
                                    <p className="text-sm text-muted-foreground">
                                      Messen Sie die Luftfeuchtigkeit (Optimalbereich: 40-60%) und wenn möglich die Materialfeuchte in befallenen und angrenzenden Bereichen.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Paragraph>
                            Bei einem aktiven Schimmelbefall ist es wichtig, den Bereich zu isolieren, um eine Verbreitung der Sporen zu vermeiden. Bei kleinen Befällen können Sie nach entsprechender Vorbereitung selbst hand anlegen, bei größeren Befällen sollten Sie immer professionelle Hilfe in Anspruch nehmen.
                          </Paragraph>
                          
                          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="p-2 bg-green-100 rounded-full flex-shrink-0 mt-1">
                              <Sparkles className="w-4 h-4 text-green-700" />
                            </div>
                            <div>
                              <div className="font-medium text-green-800">Für Soforthilfe und professionelle Schimmelsanierung</div>
                              <p className="text-sm text-green-700 mt-1">
                                Unser Expertenteam bietet schnelle und gründliche Schimmelsanierung mit modernsten Verfahren und umweltschonenden Mitteln. Kontaktieren Sie uns für eine kostenlose Erstberatung.
                              </p>
                              <div className="mt-3">
                                <Button className="bg-green-700 hover:bg-green-800 text-white" size="sm">
                                  <PhoneCall className="w-4 h-4 mr-2" />
                                  <a href="tel:+4923115044352">Schimmel-Notfallhotline: 0231 15044352</a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Wann professionelle Hilfe */}
                      <div className="mt-4 pt-4 border-t">
                        <H3 className="text-lg font-medium mb-4">Wann ist professionelle Hilfe nötig?</H3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Card className="border-t-4 border-t-blue-500">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Droplet className="w-4 h-4 text-blue-500" />
                                Wasserschaden
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="list-disc pl-5 space-y-2 text-sm">
                                <li>Großflächige Schäden (mehr als 5m²)</li>
                                <li>Wasser steht mehrere Zentimeter hoch</li>
                                <li>Wasser kommt aus Wänden/Decke</li>
                                <li>Elektronik oder Elektroinstallation betroffen</li>
                                <li>Grauwasser oder Schwarzwasser</li>
                                <li>Alter des Wasserschadens {'>'} 48 Stunden</li>
                              </ul>
                            </CardContent>
                          </Card>
                          <Card className="border-t-4 border-t-red-500">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Flame className="w-4 h-4 text-red-500" />
                                Brandschaden
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="list-disc pl-5 space-y-2 text-sm">
                                <li>Alle Brandschäden mit Rußbildung</li>
                                <li>Jeder Brandschaden, der nicht auf einen einzelnen Gegenstand beschränkt ist</li>
                                <li>Wenn Kunststoffe verbrannt sind</li>
                                <li>Bei Rauchgeruch im ganzen Gebäude</li>
                                <li>Bei sichtbaren oder vermuteten strukturellen Schäden</li>
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-t-4 border-t-green-500">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Bug className="w-4 h-4 text-green-500" />
                                Schimmelschaden
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="list-disc pl-5 space-y-2 text-sm">
                                <li>Befallsfläche größer als 0,5m²</li>
                                <li>Verdeckter Schimmel (in Wänden, unter Böden)</li>
                                <li>Schimmel in mehreren Räumen</li>
                                <li>Bei Gesundheitsbeschwerden der Bewohner</li>
                                <li>Wiederholter Schimmelbefall</li>
                                <li>Schwarzer oder ungewöhnlich farbiger Schimmel</li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                {/* Tab 2: Versicherung & Dokumentation */}
                <TabsContent value="versicherung">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <PhaseIcon phase={2} />
                      <div>
                        <H3 className="text-xl font-semibold mb-2">Phase 2: Versicherung & Dokumentation</H3>
                        <Paragraph className="text-muted-foreground">
                          Die richtige Dokumentation und Kommunikation mit Ihrer Versicherung ist entscheidend für eine erfolgreiche Schadensregulierung. In dieser Phase zeigen wir Ihnen, wie Sie vorgehen sollten.
                        </Paragraph>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Sofortige Dokumentation */}
                      <div className="mt-4">
                        <H3 className="text-lg font-medium mb-4">Lückenlose Dokumentation für die Versicherung</H3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <Camera className="w-5 h-5 text-amber-600" />
                                Fotodokumentation
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Übersichtsaufnahmen</span>
                                    <p className="text-sm text-muted-foreground">Dokumentieren Sie alle betroffenen Räume aus verschiedenen Blickwinkeln</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Detailaufnahmen der Schäden</span>
                                    <p className="text-sm text-muted-foreground">Nahaufnahmen von beschädigten Objekten, Möbeln, Böden, Wänden</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Schadensursache</span>
                                    <p className="text-sm text-muted-foreground">Fotos der Ursache (geplatzte Leitung, Überschwemmung, etc.)</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Zeitstempel</span>
                                    <p className="text-sm text-muted-foreground">Achten Sie auf korrekte Datumseinstellung Ihrer Kamera</p>
                                  </div>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center gap-2">
                                <FileText className="w-5 h-5 text-amber-600" />
                                Schriftliche Dokumentation
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Schadensprotokoll</span>
                                    <p className="text-sm text-muted-foreground">Datum, Uhrzeit, Entdeckung des Schadens, vermutete Ursache</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Maßnahmenliste</span>
                                    <p className="text-sm text-muted-foreground">Chronologische Auflistung aller ergriffenen Maßnahmen mit Zeitangaben</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Schadensinventar</span>
                                    <p className="text-sm text-muted-foreground">Liste aller beschädigten Gegenstände mit Kaufbelegen oder Wertschätzungen</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Kontaktdaten</span>
                                    <p className="text-sm text-muted-foreground">Ihrer Versicherung, beauftragter Handwerker und Zeugen</p>
                                  </div>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                        
                        
                      </div>
                      
                      {/* Der Weg zur erfolgreichen Schadenregulierung */}
                      <div className="mt-8 pt-4 border-t">
                        <H3 className="text-lg font-medium mb-4">Schritt-für-Schritt zur erfolgreichen Schadensregulierung</H3>
                        
                        <div className="space-y-5">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-medium">1</div>
                            <div>
                              <div className="font-medium">Sofortige Schadensmeldung</div>
                              <p className="text-sm text-muted-foreground mt-1">
                                Melden Sie den Schaden unverzüglich Ihrer Versicherung – telefonisch oder online. Notieren Sie dabei Datum, Uhrzeit und Namen Ihres Ansprechpartners. Schildern Sie den Schaden sachlich und objektiv, ohne Schuldzuweisungen.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-medium">2</div>
                            <div>
                              <div className="font-medium">Folgekommunikation schriftlich</div>
                              <p className="text-sm text-muted-foreground mt-1">
                                Bestätigen Sie nach der telefonischen Meldung den Schaden per E-Mail oder über das Kundenportal. Verwenden Sie dabei die Schadensnummer und fügen Sie erste Dokumentationsfotos bei.
                              </p>
                              <div className="bg-gray-50 rounded-md p-3 mt-2 text-sm">
                                <h4 className="font-medium mb-1">Muster-Formulierung für die Schadensmeldung:</h4>
                                <p className="text-muted-foreground italic">
                                  &ldquo;Sehr geehrte Damen und Herren, hiermit melde ich einen Wasserschaden in meiner versicherten Immobilie in der [Adresse]. Der Schaden wurde am [Datum] um [Uhrzeit] festgestellt und ist vermutlich auf [Ursache] zurückzuführen. Ich habe bereits folgende Sofortmaßnahmen ergriffen: [Maßnahmen]. Anbei finden Sie erste Fotos zur Dokumentation. Bitte bestätigen Sie den Eingang dieser Meldung und teilen Sie mir die weiteren Schritte mit.&rdquo;
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-medium">3</div>
                            <div>
                              <div className="font-medium">Schadensbegutachtung koordinieren</div>
                              <p className="text-sm text-muted-foreground mt-1">
                                Die Versicherung wird in den meisten Fällen einen Gutachter entsenden. Bereiten Sie alle relevanten Unterlagen vor (Fotos, Protokolle, Kaufbelege) und seien Sie während der Begutachtung anwesend, um Fragen zu beantworten.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-medium">4</div>
                            <div>
                              <div className="font-medium">Kostenvoranschläge einholen</div>
                              <p className="text-sm text-muted-foreground mt-1">
                                Holen Sie möglichst drei Kostenvoranschläge von Fachfirmen ein. Dies erhöht die Wahrscheinlichkeit, dass die Versicherung die Kosten ohne Abzüge übernimmt. Achten Sie darauf, dass in den Angeboten dieselben Leistungen spezifiziert sind.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-medium">5</div>
                            <div>
                              <div className="font-medium">Regulierungsvorschlag prüfen</div>
                              <p className="text-sm text-muted-foreground mt-1">
                                Prüfen Sie den Regulierungsvorschlag der Versicherung sorgfältig. Achten Sie auf Abzüge für Zeitwert oder Selbstbeteiligung. Bei Unklarheiten fragen Sie nach und lassen Sie sich die Berechnungsgrundlage erläutern.
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-medium">6</div>
                            <div>
                              <div className="font-medium">Dokumentierte Abwicklung der Sanierung</div>
                              <p className="text-sm text-muted-foreground mt-1">
                                Führen Sie auch während der Sanierung eine lückenlose Dokumentation fort. Lassen Sie sich alle Arbeitsschritte und Materialien quittieren. Dies ist wichtig, falls später Folgeschäden auftreten.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Versicherungsfallen vermeiden */}
                      <div className="mt-8 pt-4 border-t">
                        <H3 className="text-lg font-medium mb-4">Die häufigsten Fallstricke bei der Schadensregulierung vermeiden</H3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                            <div className="flex items-start gap-3 mb-3">
                              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <div className="font-medium">Verspätete Meldung</div>
                            </div>
                            <p className="text-sm text-red-700 ml-8">
                              Fast alle Versicherungspolicen enthalten eine Klausel zur &ldquo;unverzüglichen Schadensmeldung&rdquo; - in der Regel bedeutet dies innerhalb von 24-72 Stunden. Eine verspätete Meldung kann zur Kürzung oder gar Ablehnung der Leistung führen.
                            </p>
                          </div>
                          
                          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                            <div className="flex items-start gap-3 mb-3">
                              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <div className="font-medium">Schadenminderungspflicht verletzt</div>
                            </div>
                            <p className="text-sm text-red-700 ml-8">
                              Sie sind verpflichtet, den Schaden so gering wie möglich zu halten. Wenn Sie z.B. nach einem Wasserschaden keine Maßnahmen zur Trocknung ergreifen und dadurch Schimmel entsteht, kann die Versicherung die Übernahme dieser Folgeschäden verweigern.
                            </p>
                          </div>
                          
                          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                            <div className="flex items-start gap-3 mb-3">
                              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <div className="font-medium">Unvollständige Dokumentation</div>
                            </div>
                            <p className="text-sm text-red-700 ml-8">
                              Ohne ausreichende Fotos und Beschreibungen der Schäden kann die Versicherung den Umfang des Schadens anzweifeln. Besonders kritisch: Wenn Sie beschädigte Gegenstände entsorgen, bevor sie dokumentiert wurden.
                            </p>
                          </div>
                          
                          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                            <div className="flex items-start gap-3 mb-3">
                              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <div className="font-medium">Fehlendes Schadensinventar</div>
                            </div>
                            <p className="text-sm text-red-700 ml-8">
                              Ohne eine detaillierte Liste der beschädigten Gegenstände mit Angaben zu Alter, Kaufpreis und ggf. Kaufbelegen wird die Versicherung oft nur Pauschalbeträge oder Zeitwerte erstatten, die deutlich unter dem Wiederbeschaffungswert liegen.
                            </p>
                          </div>
                        </div>
                        
                        <TipBox title="Expertenrat: Kommunikation mit der Versicherung">
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Bleiben Sie sachlich und faktenorientiert</li>
                            <li>Notieren Sie Namen, Datum und Uhrzeit bei jedem Kontakt</li>
                            <li>Bestätigen Sie mündliche Absprachen immer schriftlich</li>
                            <li>Setzen Sie angemessene Fristen für Rückmeldungen</li>
                            <li>Bei Ablehnung: Fordern Sie eine schriftliche Begründung mit Verweis auf die konkreten Versicherungsbedingungen</li>
                          </ul>
                        </TipBox>
                      </div>
                      
                      </div>

                  </div>
                </TabsContent>
                
                {/* Tab 3: Sanierungsverfahren */}
                <TabsContent value="sanierung">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <PhaseIcon phase={3} />
                      <div>
                        <H3 className="text-xl font-semibold mb-2">Phase 3: Sanierungsverfahren & -auswahl</H3>
                        <Paragraph className="text-muted-foreground">
                          Die Wahl des richtigen Sanierungsverfahrens ist entscheidend für das Ergebnis. Hier finden Sie Informationen zu verschiedenen Technologien, deren Vor- und Nachteile sowie Entscheidungshilfen.
                        </Paragraph>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Sanierungsverfahren nach Schadenstyp */}
                      <div className="mt-4">
                        <H3 className="text-lg font-medium mb-4">Sanierungsverfahren im Überblick</H3>
                        
                        <Tabs defaultValue="wasser" className="mt-4">
                          <TabsList className="grid grid-cols-3 w-full mb-6">
                            <TabsTrigger value="wasser" className="text-sm">Wasserschäden</TabsTrigger>
                            <TabsTrigger value="brand" className="text-sm">Brandschäden</TabsTrigger>
                            <TabsTrigger value="schimmel" className="text-sm">Schimmelschäden</TabsTrigger>
                          </TabsList>
                          
                          {/* Wasserschaden-Sanierungsverfahren */}
                          <TabsContent value="wasser">
                            <div className="space-y-6">
                              <Paragraph>
                                Die Wahl des richtigen Trocknungsverfahrens hängt von verschiedenen Faktoren ab: Art des Wasserschadens, betroffene Materialien, Umgebungstemperatur und gewünschte Trocknungsgeschwindigkeit. Hier die wichtigsten Verfahren im Vergleich:
                              </Paragraph>
                              
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="bg-blue-50">
                                      <th className="px-4 py-2 text-left">Verfahren</th>
                                      <th className="px-4 py-2 text-left">Funktionsweise</th>
                                      <th className="px-4 py-2 text-left">Vorteile</th>
                                      <th className="px-4 py-2 text-left">Nachteile</th>
                                      <th className="px-4 py-2 text-left">Typische Anwendung</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-t">
                                      <td className="px-4 py-3 font-medium">Technische Trocknung</td>
                                      <td className="px-4 py-3">Kombination aus Luftentfeuchtern und Ventilatoren zur Beschleunigung des natürlichen Trocknungsprozesses</td>
                                      <td className="px-4 py-3">Energieeffizient, schonend für Bausubstanz, kostengünstig</td>
                                      <td className="px-4 py-3">Relativ lange Trocknungszeit (7-14 Tage)</td>
                                      <td className="px-4 py-3">Kleinere Wasserschäden, nicht-dringende Fälle</td>
                                    </tr>
                                    <tr className="border-t bg-gray-50">
                                      <td className="px-4 py-3 font-medium">Kondenstrocknung</td>
                                      <td className="px-4 py-3">Kondensationsentfeuchter entziehen der Luft Feuchtigkeit</td>
                                      <td className="px-4 py-3">Effektiv bei höheren Temperaturen, einfach umsetzbar</td>
                                      <td className="px-4 py-3">Weniger effizient bei niedrigen Temperaturen, erhöhter Stromverbrauch</td>
                                      <td className="px-4 py-3">Standardverfahren für die meisten Wasserschäden</td>
                                    </tr>
                                    <tr className="border-t">
                                      <td className="px-4 py-3 font-medium">Adsorptionstrocknung</td>
                                      <td className="px-4 py-3">Entfeuchtung mittels hygroskopischer Materialien (z.B. Silicagel)</td>
                                      <td className="px-4 py-3">Effektiv bei niedrigen Temperaturen, auch für schwer zugängliche Bereiche</td>
                                      <td className="px-4 py-3">Höhere Betriebskosten, komplexere Geräte</td>
                                      <td className="px-4 py-3">Kalte Räume, Keller, ungedämmte Bereiche</td>
                                    </tr>
                                    <tr className="border-t bg-gray-50">
                                      <td className="px-4 py-3 font-medium">Mikrowellentrocknung</td>
                                      <td className="px-4 py-3">Trocknungsgerät erzeugt Mikrowellen, die Wassermoleküle direkt erhitzen</td>
                                      <td className="px-4 py-3">Sehr schnell (1-3 Tage), punktgenau einsetzbar</td>
                                      <td className="px-4 py-3">Teuer, nicht für alle Materialien geeignet, Risiko von Überhitzung</td>
                                      <td className="px-4 py-3">Dringende Fälle, Bereiche mit begrenztem Zugang</td>
                                    </tr>
                                    <tr className="border-t">
                                      <td className="px-4 py-3 font-medium">Unterdrucktrocknung</td>
                                      <td className="px-4 py-3">Erzeugt Unterdruck im Boden/Estrich, der Feuchtigkeit nach oben zieht</td>
                                      <td className="px-4 py-3">Effektiv für Bodenkonstruktionen, kann Abriss vermeiden</td>
                                      <td className="px-4 py-3">Aufwändig in der Installation, längere Trocknungsdauer</td>
                                      <td className="px-4 py-3">Schwimmende Estriche, Hohlraumböden</td>
                                    </tr>
                                    <tr className="border-t bg-gray-50">
                                      <td className="px-4 py-3 font-medium">Infrarottrocknung</td>
                                      <td className="px-4 py-3">Erwärmung der Oberflächen durch Infrarotstrahlung</td>
                                      <td className="px-4 py-3">Schnell, energieeffizient, gezielt einsetzbar</td>
                                      <td className="px-4 py-3">Nur für oberflächliche Trocknung, Wärmestau möglich</td>
                                      <td className="px-4 py-3">Ergänzende Trocknung, lokale Feuchtstellen</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </TabsContent>
                          {/* Brandschaden-Sanierungsverfahren */}
                          <TabsContent value="brand">
                            <div className="space-y-6">
                              <Paragraph>
                                Die Sanierung nach einem Brandschaden umfasst mehrere Phasen, die aufeinander aufbauen. Je nach Schwere des Schadens können einzelne Schritte intensiver ausfallen oder wegfallen.
                              </Paragraph>
                              
                              <div className="space-y-6 mt-4">
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                      <span className="font-medium text-red-700">1</span>
                                    </div>
                                    <div>
                                      <div className="font-medium text-red-800">Schadstoffuntersuchung & Sicherung</div>
                                      <div className="text-sm text-red-700 mt-1">
                                        <p className="mb-2">
                                          Vor Beginn der eigentlichen Sanierung wird eine Schadstoffanalyse durchgeführt, um gefährliche Substanzen wie PAK, Dioxine oder Schwermetalle zu identifizieren. Gleichzeitig wird die Statik des Gebäudes geprüft und ggf. gesichert.
                                        </p>
                                        <p className="font-medium">Techniken:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                          <li>Materialprobenentnahme für Laboranalysen</li>
                                          <li>Luftproben zur Erfassung von Schadstoffen</li>
                                          <li>Statische Untersuchungen und temporäre Abstützungen</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                      <span className="font-medium text-red-700">2</span>
                                    </div>
                                    <div>
                                      <div className="font-medium text-red-800">Grobe Reinigung & Schutt-Entsorgung</div>
                                      <div className="text-sm text-red-700 mt-1">
                                        <p className="mb-2">
                                          In dieser Phase werden zerstörte Bauteile, Schutt und nicht mehr verwendbare Gegenstände fachgerecht entfernt und entsorgt. Dies schafft die Voraussetzung für die weiteren Sanierungsschritte.
                                        </p>
                                        <p className="font-medium">Techniken:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                          <li>Manuelle Sortierung und Entsorgung nach Abfallkategorien</li>
                                          <li>Einsatz von Spezialcontainern für kontaminierte Materialien</li>
                                          <li>Industriestaubsauger mit HEPA-Filtern für lose Rußpartikel</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                  <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                      <span className="font-medium text-red-700">3</span>
                                    </div>
                                    <div>
                                      <div className="font-medium text-red-800">Dekontamination & Feinreinigung</div>
                                      <div className="text-sm text-red-700 mt-1">
                                        <p className="mb-2">
                                          Die Feinreinigung entfernt Ruß, Rauchpartikel und Brandgerüche von allen Oberflächen. Je nach Material kommen unterschiedliche Verfahren zum Einsatz.
                                        </p>
                                        <p className="font-medium">Verfahren:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                          <li><strong>Trockeneis-Strahlen:</strong> Schonend für empfindliche Oberflächen, rückstandsfrei</li>
                                          <li><strong>Chemische Reinigung:</strong> Für hartnäckige Verunreinigungen, neutralisiert Gerüche</li>
                                          <li><strong>Ultraschallreinigung:</strong> Für wertvolle Kleinteile und Elektrokomponenten</li>
                                          <li><strong>Ozonbehandlung:</strong> Zur Geruchsbeseitigung in schwer zugänglichen Bereichen</li>
                                          <li><strong>Ionisierung:</strong> Bindet Schwebteilchen und neutralisiert Gerüche</li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          {/* Schimmelschaden-Sanierungsverfahren */}
                          <TabsContent value="schimmel">
                            <div className="space-y-6">
                              <Paragraph>
                                Bei der Schimmelsanierung ist die Kombination aus Beseitigung des bestehenden Befalls und Behebung der Ursache entscheidend. Nur wenn beides fachgerecht durchgeführt wird, kann ein dauerhafter Erfolg erzielt werden.
                              </Paragraph>
                              
                              <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="bg-green-50">
                                      <th className="px-4 py-2 text-left">Verfahren</th>
                                      <th className="px-4 py-2 text-left">Beschreibung</th>
                                      <th className="px-4 py-2 text-left">Vorteile</th>
                                      <th className="px-4 py-2 text-left">Nachteile</th>
                                      <th className="px-4 py-2 text-left">Einsatzbereich</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-t">
                                      <td className="px-4 py-3 font-medium">Oberflächenbehandlung</td>
                                      <td className="px-4 py-3">Abtöten und Entfernen des Schimmels durch antimikrobielle Reinigungsmittel</td>
                                      <td className="px-4 py-3">Schnell, kostengünstig, ohne Baumaßnahmen</td>
                                      <td className="px-4 py-3">Nur bei oberflächlichem Befall wirksam, bekämpft nicht die Ursache</td>
                                      <td className="px-4 py-3">Kleine Schimmelflecken (&lt;0,5m²) auf nicht-porösen Oberflächen</td>
                                    </tr>
                                    <tr className="border-t bg-gray-50">
                                      <td className="px-4 py-3 font-medium">Mechanische Entfernung</td>
                                      <td className="px-4 py-3">Abtragen befallener Materialien und Ersatz durch neue</td>
                                      <td className="px-4 py-3">Vollständige Beseitigung des Schimmels, nachhaltig</td>
                                      <td className="px-4 py-3">Aufwändig, teuer, verursacht Staub und Schmutz</td>
                                      <td className="px-4 py-3">Mittlerer bis starker Befall, tief in Materialien eingedrungen</td>
                                    </tr>
                                    <tr className="border-t">
                                      <td className="px-4 py-3 font-medium">Trockeneisreinigung</td>
                                      <td className="px-4 py-3">Bestrahlung mit Trockeneispartikeln zur schonenden Entfernung</td>
                                      <td className="px-4 py-3">Rückstandsfrei, schonend für das Material, keine Chemikalien</td>
                                      <td className="px-4 py-3">Teuer, spezielles Equipment notwendig</td>
                                      <td className="px-4 py-3">Historische Gebäude, empfindliche Oberflächen, Holzkonstruktionen</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              
                              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-6">
                                <div className="flex items-start gap-3">
                                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <div className="font-medium text-amber-800">Achtung: Schimmelsanierung ohne Ursachenbeseitigung ist wirkungslos</div>
                                    <p className="text-sm text-amber-700 mt-1">
                                      Die wichtigste Maßnahme jeder Schimmelsanierung ist die Behebung der Feuchtigkeitsursache. Ohne diese wird der Schimmel mit hoher Wahrscheinlichkeit zurückkehren. Häufige Ursachen sind:
                                    </p>
                                    <ul className="list-disc pl-5 space-y-1 mt-2 text-sm text-amber-700">
                                      <li>Baumängel wie Wärmebrücken oder undichte Stellen</li>
                                      <li>Wasserschäden (Rohrbrüche, undichte Dächer)</li>
                                      <li>Fehlerhafte Lüftung oder Heizung</li>
                                      <li>Aufsteigende Feuchtigkeit aus dem Boden</li>
                                      <li>Falsch gedämmte Wände (Kondenswasserbildung)</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 4: Während der Sanierung */}
                <TabsContent value="waehrend">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <PhaseIcon phase={4} />
                      <div>
                        <H3 className="text-xl font-semibold mb-2">Phase 4: Während der Sanierung</H3>
                        <Paragraph className="text-muted-foreground">
                          Die Sanierungsphase kann je nach Umfang der Schäden von wenigen Tagen bis zu mehreren Wochen dauern. Hier finden Sie Informationen, wie Sie diese Zeit optimal überbrücken und die Qualität der Arbeiten überwachen können.
                        </Paragraph>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Qualitätskontrolle */}
                      <div className="mt-4">
                        <H3 className="text-lg font-medium mb-4">Qualitätskontrolle während der Sanierung</H3>
                        
                        <Card className="mb-6">
                          <CardHeader>
                            <CardTitle className="text-lg">Checkliste für die tägliche Überwachung</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium">Fortschritt dokumentieren</div>
                                  <p className="text-sm text-muted-foreground">
                                    Führen Sie ein Bautagebuch mit Fotos und Notizen zu den täglich durchgeführten Arbeiten. Notieren Sie auch unerwartete Probleme oder Verzögerungen.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium">Feuchtigkeitswerte kontrollieren</div>
                                  <p className="text-sm text-muted-foreground">
                                    Bei Wasserschäden: Lassen Sie sich die gemessenen Feuchtigkeitswerte täglich zeigen und dokumentieren. Diese sollten kontinuierlich abnehmen.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium">Materialien prüfen</div>
                                  <p className="text-sm text-muted-foreground">
                                    Überprüfen Sie die verwendeten Materialien auf Übereinstimmung mit den vereinbarten Spezifikationen. Achten Sie besonders auf Baustoffe, die später nicht mehr sichtbar sein werden.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <div className="font-medium">Zwischenabnahmen durchführen</div>
                                  <p className="text-sm text-muted-foreground">
                                    Vereinbaren Sie bei mehrwöchigen Projekten Zwischenabnahmen für wichtige Bauphasen (z.B. nach Trocknung, vor Verschließen der Wände, etc.).
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <TipBox title="Rote Flaggen erkennen">
                          <p className="mb-2">
                            Achten Sie auf diese Warnsignale während der Sanierung:
                          </p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Unangekündigtes Fernbleiben der Handwerker über mehrere Tage</li>
                            <li>Plötzliche Änderungen am vereinbarten Sanierungskonzept ohne Erklärung</li>
                            <li>Geräte, die abgeschaltet wurden oder falsch eingestellt sind</li>
                            <li>Ungeschütztes Baustellenmaterial, das Wind und Wetter ausgesetzt ist</li>
                            <li>Verwendung anderer Materialien als vereinbart (besonders bei Isolierung, Dämmung)</li>
                            <li>Weigerung, Feuchtigkeitsmessungen durchzuführen oder Ergebnisse mitzuteilen</li>
                          </ul>
                        </TipBox>
                      </div>
                      
                      {/* Wohnen während der Sanierung */}
                      <div className="mt-8 pt-4 border-t">
                        <H3 className="text-lg font-medium mb-4">Leben während der Sanierung</H3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Tipps für temporäres Wohnen</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Baustelle räumlich trennen</span>
                                    <p className="text-sm text-muted-foreground">Installieren Sie Staubschutzwände mit Reißverschlusstüren, um bewohnte Bereiche zu schützen</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Luftreiniger einsetzen</span>
                                    <p className="text-sm text-muted-foreground">HEPA-Luftreiniger in bewohnten Räumen reduzieren Feinstaub und Gerüche</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Zeitpläne abstimmen</span>
                                    <p className="text-sm text-muted-foreground">Vereinbaren Sie lärmintensive Arbeiten für Zeiten, in denen Sie außer Haus sind</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Arbeitsfreie Tage</span>
                                    <p className="text-sm text-muted-foreground">Planen Sie mit dem Sanierungsunternehmen feste Tage ohne Bauarbeiten (z.B. Sonntage)</p>
                                  </div>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Gesundheit schützen</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-3">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Regelmäßig lüften</span>
                                    <p className="text-sm text-muted-foreground">Stoßlüften Sie mehrmals täglich in bewohnten Räumen (außer während staubintensiver Arbeiten)</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Hygiene intensivieren</span>
                                    <p className="text-sm text-muted-foreground">Tägliches Feucht-Wischen in bewohnten Räumen reduziert Staub und Schadstoffe</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Risikopersonen schützen</span>
                                    <p className="text-sm text-muted-foreground">Erwägen Sie alternative Unterbringung für Asthmatiker, Kleinkinder und ältere Menschen</p>
                                  </div>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="font-medium">Auf Symptome achten</span>
                                    <p className="text-sm text-muted-foreground">Nehmen Sie Reizungen der Atemwege, Hautreaktionen oder Kopfschmerzen ernst</p>
                                  </div>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 5: Nach der Sanierung */}
                <TabsContent value="nachher">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <PhaseIcon phase={5} />
                      <div>
                        <H3 className="text-xl font-semibold mb-2">Phase 5: Nach der Sanierung</H3>
                        <Paragraph className="text-muted-foreground">
                          Nach Abschluss der Sanierungsarbeiten stehen wichtige Schritte an: die sorgfältige Abnahme der Arbeiten, präventive Maßnahmen und langfristige Pflege, um künftige Schäden zu vermeiden.
                        </Paragraph>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Abnahme der Arbeiten */}
                      <div className="mt-4">
                        <H3 className="text-lg font-medium mb-4">Die professionelle Abnahme der Sanierungsarbeiten</H3>
                        
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Checkliste für die Endabnahme</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-medium text-purple-700">1</span>
                                </div>
                                <div>
                                  <div className="font-medium">Vollständigkeit prüfen</div>
                                  <p className="text-sm text-muted-foreground">
                                    Vergleichen Sie alle ausgeführten Arbeiten mit dem ursprünglichen Leistungsverzeichnis. Achten Sie auf fehlende Arbeiten oder Abweichungen.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-medium text-purple-700">2</span>
                                </div>
                                <div>
                                  <div className="font-medium">Feuchtigkeitsmessungen durchführen</div>
                                  <p className="text-sm text-muted-foreground">
                                    Bestehen Sie auf abschließende Feuchtigkeitsmessungen in allen sanierten Bereichen. Die Werte sollten den Normbereich nicht überschreiten.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-medium text-purple-700">3</span>
                                </div>
                                <div>
                                  <div className="font-medium">Optische Begutachtung</div>
                                  <p className="text-sm text-muted-foreground">
                                    Prüfen Sie alle sichtbaren Oberflächen auf einwandfreie Ausführung. Achten Sie auf gleichmäßige Farbtöne, saubere Übergänge und korrekte Fugen.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-medium text-purple-700">4</span>
                                </div>
                                <div>
                                  <div className="font-medium">Funktionsprüfungen</div>
                                  <p className="text-sm text-muted-foreground">
                                    Testen Sie alle technischen Installationen: Steckdosen, Lichtschalter, Wasserhähne, Abflüsse, Heizungen und andere betroffene Installationen.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-medium text-purple-700">5</span>
                                </div>
                                <div>
                                  <div className="font-medium">Geruchskontrolle</div>
                                  <p className="text-sm text-muted-foreground">
                                    Prüfen Sie auf verbleibende Gerüche, besonders bei Brand- und Schimmelschäden. Diese können auf versteckte Reste oder nicht vollständig beseitigte Ursachen hindeuten.
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs font-medium text-purple-700">6</span>
                                </div>
                                <div>
                                  <div className="font-medium">Abnahmeprotokoll anfertigen</div>
                                  <p className="text-sm text-muted-foreground">
                                    Dokumentieren Sie schriftlich alle festgestellten Mängel und vereinbaren Sie verbindliche Fristen für deren Beseitigung. Lassen Sie das Protokoll von beiden Parteien unterschreiben.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <TipBox title="Praxistipp: Abnahme auf zwei Termine verteilen">
                          <p>
                            Für umfangreiche Sanierungsprojekte empfiehlt es sich, die Abnahme auf zwei Termine zu verteilen: Die erste Begehung dient dem Aufspüren offensichtlicher Mängel, die dann bis zum zweiten Termin behoben werden können. Dies reduziert Stress und erhöht die Chance auf eine reibungslose finale Abnahme.
                          </p>
                        </TipBox>
                      </div>
                      
                      {/* Präventionsmaßnahmen */}
                      <div className="mt-8 pt-4 border-t">
                        <H3 className="text-lg font-medium mb-4">Langfristige Prävention: So beugen Sie künftigen Schäden vor</H3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <Card className="border-t-4 border-t-blue-500">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Droplet className="w-4 h-4 text-blue-500" />
                                Wasserschadenprophylaxe
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Wasserführende Leitungen regelmäßig prüfen</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Wassersensoren an kritischen Stellen installieren</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Hauptwasserhahn bei längerer Abwesenheit abdrehen</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Abflüsse und Dachrinnen regelmäßig reinigen</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Versicherung auf ausreichende Deckung prüfen</span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-t-4 border-t-red-500">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Flame className="w-4 h-4 text-red-500" />
                                Brandschutzmaßnahmen
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Rauchwarnmelder in allen Räumen installieren</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Elektrische Anlagen regelmäßig prüfen lassen</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Feuerlöscher bereithalten und warten</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Fluchtwege freihalten und Notfallplan erstellen</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Brennbare Materialien sicher lagern</span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                          
                          <Card className="border-t-4 border-t-green-500">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base flex items-center gap-2">
                                <Bug className="w-4 h-4 text-green-500" />
                                Schimmelprävention
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Regelmäßiges Stoßlüften (3-4 mal täglich)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Luftfeuchtigkeit kontrollieren (40-60%)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Wärmebrücken identifizieren und beheben</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Ausreichende Beheizung aller Räume</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>Möbel mit Abstand zur Außenwand platzieren</span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                
                
                {/* Notfall-Kontakte */}
                <Card className="bg-red-50 border-red-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span>Notfall-Kontakte</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <PhoneCall className="w-4 h-4 text-red-500" />
                        <div>
                          <div className="text-xs text-muted-foreground">Feuerwehr/Notarzt</div>
                          <div className="font-bold">112</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <PhoneCall className="w-4 h-4 text-blue-500" />
                        <div>
                          <div className="text-xs text-muted-foreground">Notfall-Hotline</div>
                          <div className="font-bold">0231 15044352</div>
                        </div>
                      </div>
                      
                      <Separator className="my-2" />
                      
                      <p className="text-xs text-muted-foreground">
                        Unser 24/7 Notdienst steht Ihnen bei akuten Gebäudeschäden rund um die Uhr zur Verfügung.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                  
                  {/* Professionellen Winterdienst beauftragen */}
                  <Card className="bg-purple-500 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Professionellen Sanierung beauftragen?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm text-white/90 mb-4">
                      Überlassen Sie die Schadensanierung unseren Experten. Wir bieten:
                    </Paragraph>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                        <span>Brandschadensanierung</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                        <span>Wasserschadensanierung</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                        <span>Schimmelsanierung</span>
                      </li>
                    </ul>
                    <div className="space-y-3">
                    <Link href="/sanierung#kontakt">
                      <Button className="w-full bg-white text-purple-700 hover:bg-white/90">
                        Kostenfreies Angebot anfordern
                      </Button>
                      </Link>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">Telefon</div>
                            <div className="text-sm font-medium">+0231 15044352</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">E-Mail</div>
                            <div className="text-sm font-medium">info@treuservice.com</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Verwandte Artikel */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Verwandte Themen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link href="/sanierung" className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm">
                        Unsere Sanierungsleistungen im Detail
                      </Link>
                      <Link href="/blog/EntruemplungsKostenRechner" className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm">
                        Entrümplungs-Kostenrechner
                      </Link>
                      <Link href="/blog/EntkernungsGuide" className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm">
                        Kompletter Entkernungs-Guide
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
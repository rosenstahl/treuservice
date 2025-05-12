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
  Users, 
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
  Briefcase,
  LineChart,
  FileText,
  Building2,
  Banknote,
  ShieldCheck,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Separator } from "@/components/ui/separator"

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-pink-600 bg-pink-600/10 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
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

export default function LeiharbeitGuidePage() {
  const title = "Leiharbeits-Guide: Vorteile, Planung & rechtskonformer Einsatz"
  const subtitle = "Der ultimative Leitfaden für Unternehmen zum Einsatz von Leiharbeitern"
  const date = new Date('2025-03-20');
  const readingTime = "12 min";
  const author = {
    name: "TREU Service Team",
    image: "/images/blog/leiharbeit.jpg"
  };
  
  
  return (
    <div className="flex-1 pb-10">
      <Section className="pt-6 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-pink-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Leiharbeit</span>
          </div>
          
          <div className="max-w-4xl">
            {/* Tag/Badge */}
            <Badge className="mb-3">
              Leiharbeit
            </Badge>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </H1>
            
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              {subtitle}
            </H2>
            
            <div className="flex items-center gap-6 text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <div className="inline-block bg-pink-600/20 p-2 rounded-full">
                  <Users className="h-4 w-4 text-pink-600" />
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
                  <TabsTrigger value="rechtliches" className="text-sm">Rechtliches</TabsTrigger>
                  <TabsTrigger value="vorteile" className="text-sm">Vorteile</TabsTrigger>
                  <TabsTrigger value="prozess" className="text-sm">Prozess</TabsTrigger>
                </TabsList>
                
                {/* Tab 1: Grundlagen */}
                <TabsContent value="grundlagen">
                  <div className="space-y-6">
                    {/* Grundlagen-Beschreibung */}
                    <div className="bg-white p-4 rounded-lg border border-pink-500/10 shadow-sm">
                      <div className="flex items-center mb-4">
                        <H3 className="text-lg font-medium">Grundlagen der Leiharbeit – Was Sie wissen sollten</H3>
                      </div>
                      
                      <div className="mb-4 text-sm text-muted-foreground">
                        Leiharbeit (auch als Zeitarbeit oder Arbeitnehmerüberlassung bezeichnet) stellt ein besonderes Arbeitsverhältnis dar, das durch eine Dreiecksbeziehung gekennzeichnet ist:
                      </div>
                      
                      {/* Das Dreiecksverhältnis */}
                      <div className="relative bg-pink-50 p-4 rounded-lg mb-6">
                        <div className="text-center mb-6">
                                                      <div className="font-medium text-pink-700">Das Dreiecksverhältnis der Leiharbeit</div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 relative">
                          <div className="text-center">
                            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-pink-100 border border-pink-200 mb-2">
                              <Building2 className="w-6 h-6 text-pink-600" />
                            </div>
                            <div className="font-medium text-sm">Verleiher</div>
                            <div className="text-xs text-gray-600">(Zeitarbeitsunternehmen)</div>
                          </div>
                          
                          <div className="text-center mt-12">
                            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-pink-100 border border-pink-200 mb-2">
                              <Users className="w-6 h-6 text-pink-600" />
                            </div>
                            <div className="font-medium text-sm">Leiharbeitnehmer</div>
                            <div className="text-xs text-gray-600">(Zeitarbeitskraft)</div>
                          </div>
                          
                          <div className="text-center">
                            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center bg-pink-100 border border-pink-200 mb-2">
                              <Building2 className="w-6 h-6 text-pink-600" />
                            </div>
                            <div className="font-medium text-sm">Entleiher</div>
                            <div className="text-xs text-gray-600">(Einsatzunternehmen)</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="font-medium mb-2">Funktionsweise der Leiharbeit</div>
                          <p className="text-sm text-gray-600 mb-2">
                            Bei der Leiharbeit beschäftigt ein Verleiher (das Zeitarbeitsunternehmen) Arbeitnehmer und überlässt diese gegen Entgelt an einen Entleiher (das Einsatzunternehmen), der sie in seinem Betrieb einsetzt.
                          </p>
                          <ul className="text-sm space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Arbeitsvertragliche Beziehung:</span> Besteht zwischen dem Leiharbeitnehmer und dem Verleiher
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Weisungsrecht:</span> Geht für die Dauer der Überlassung auf den Entleiher über
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Vergütungspflicht:</span> Bleibt beim Verleiher, der dem Entleiher die Arbeitsleistung in Rechnung stellt
                              </div>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <div className="font-medium mb-2">Der Leiharbeitsmarkt in Deutschland</div>
                          <div className="text-sm text-gray-600">
                            <p className="mb-2">
                              Leiharbeit ist ein wichtiger Bestandteil des deutschen Arbeitsmarktes. Aktuelle Zahlen zeigen:
                            </p>
                            <ul className="space-y-1 pl-4 list-disc">
                              <li>Ca. 950.000 Beschäftigte in der Leiharbeit (Stand 2024)</li>
                              <li>Etwa 2,3% aller sozialversicherungspflichtig Beschäftigten</li>
                              <li>Schwerpunkte in der Industrie, Logistik und im Handwerk</li>
                              <li>Wachsende Bedeutung im Kontext des Fachkräftemangels</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-pink-50 p-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Lightbulb className="h-8 w-20 text-yellow-400 mt-0.5" />
                            <div>
                              <div className="font-medium mb-1">Wussten Sie schon?</div>
                              <p className="text-sm text-gray-600">
                                Leiharbeit wird aufgrund des akuten Fachkräftemangels immer wichtiger. Laut aktuellen Prognosen des Instituts für Arbeitsmarkt- und Berufsforschung werden bis 2027 rund 728.000 Fachkräfte in Deutschland fehlen - ein Umstand, der flexible Beschäftigungsmodelle wie Leiharbeit für Unternehmen noch attraktiver macht.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 2: Rechtliches */}
                <TabsContent value="rechtliches">
                  <div className="space-y-6">
                    <Card className="mb-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Das Arbeitnehmerüberlassungsgesetz (AÜG)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm space-y-4">
                          <p>
                            Das AÜG reguliert die Leiharbeit in Deutschland und wurde zuletzt zum 01.01.2025 novelliert. Folgende zentrale Aspekte sind für Unternehmen besonders wichtig:
                          </p>
                          
                          <div className="space-y-3">
                            <div className="flex items-start gap-3 border-l-2 border-pink-600 pl-3">
                              <div>
                                <div className="font-medium">Erlaubnispflicht</div>
                                <p className="text-muted-foreground">
                                  Verleiher benötigen eine Erlaubnis der Bundesagentur für Arbeit. Ohne diese Erlaubnis ist die Überlassung von Arbeitnehmern nicht zulässig. Unternehmen sollten daher immer die Erlaubnis des Verleihers überprüfen.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3 border-l-2 border-pink-600 pl-3">
                              <div>
                                <div className="font-medium">Kennzeichnungspflicht</div>
                                <p className="text-muted-foreground">
                                  Die Überlassung muss im Vertrag zwischen Verleiher und Entleiher ausdrücklich als &quot;Arbeitnehmerüberlassung&quot; bezeichnet werden. Ab 01.01.2025 reicht hierfür die Textform (vorher: Schriftform).
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3 border-l-2 border-pink-600 pl-3">
                              <div>
                                <div className="font-medium">Höchstüberlassungsdauer</div>
                                <p className="text-muted-foreground">
                                  Ein Leiharbeitnehmer darf höchstens 18 Monate ununterbrochen bei demselben Entleiher eingesetzt werden. In Tarifverträgen können abweichende Regelungen getroffen werden.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3 border-l-2 border-pink-600 pl-3">
                              <div>
                                <div className="font-medium">Equal Pay und Equal Treatment</div>
                                <p className="text-muted-foreground">
                                  Nach 9 Monaten Einsatzdauer haben Leiharbeitnehmer Anspruch auf gleiche Vergütung wie vergleichbare Stammmitarbeiter (Equal Pay). Gleichbehandlung bei den Arbeitsbedingungen (Equal Treatment) gilt vom ersten Tag an.
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3 border-l-2 border-pink-600 pl-3">
                              <div>
                                <div className="font-medium">Mitbestimmungsrechte</div>
                                <p className="text-muted-foreground">
                                  Leiharbeitnehmer werden bei den Schwellenwerten für die betriebliche Mitbestimmung mitgezählt (Ausnahme: § 112a BetrVG).
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                              <div>
                                <div className="font-medium mb-1">Rechtliche Risiken beachten</div>
                                <p className="text-sm text-gray-600">
                                  Bei Verstößen gegen das AÜG drohen erhebliche Konsequenzen:
                                </p>
                                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600 mt-2">
                                  <li>Bußgelder bis zu 30.000 Euro</li>
                                  <li>Fiktion eines Arbeitsverhältnisses zwischen Leiharbeitnehmer und Entleiher</li>
                                  <li>Entzug der Überlassungserlaubnis für den Verleiher</li>
                                  <li>Nachzahlung von Sozialversicherungsbeiträgen</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Wichtige Neuerungen zum 01.01.2025</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 text-sm">
                          <p className="mb-2 text-muted-foreground">
                            Zum Jahresbeginn 2025 sind folgende Änderungen in Kraft getreten:
                          </p>
                          
                          <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Textform statt Schriftform:</span> Für Arbeitnehmerüberlassungsverträge zwischen Verleiher und Entleiher reicht nun die Textform gemäß § 12 Abs. 1 S. 1 AÜG aus.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Erhöhte Mindestlöhne für Leiharbeitnehmer:</span> Die tariflichen Mindestlöhne in der Leiharbeit liegen nun deutlich über dem gesetzlichen Mindestlohn.
                              </div>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Neue Mitteilungspflichten:</span> Erweiterte Informationspflichten gegenüber den Leiharbeitnehmern.
                              </div>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                {/* Tab 3: Vorteile */}
                <TabsContent value="vorteile">
                  <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border border-blue-500/10 shadow-sm">
                      <H3 className="text-lg font-medium mb-4">Vorteile der Leiharbeit für Ihr Unternehmen</H3>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <Card className="border-blue-100">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <LineChart className="h-5 w-5 text-purple-600" />
                              Flexibles Personalmanagement
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Schnelle Reaktion auf Auftragsspitzen</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Abdeckung saisonaler Schwankungen</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Kurzfristige Personalbeschaffung</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Reduktion von Überstunden der Stammbelegschaft</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-blue-100">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Banknote className="h-5 w-5 text-green-600" />
                              Kosteneinsparungen
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Keine Rekrutierungskosten</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Reduzierte Einarbeitungszeit</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Keine langfristigen Personalverpflichtungen</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Kalkulierbare Personalkosten</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-blue-100">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <Briefcase className="h-5 w-5 text-amber-600" />
                              Recruiting-Vorteile
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>&quot;Try before you hire&quot;-Prinzip</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Zugang zu qualifizierten Fachkräften</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Risikominimierung bei Neueinstellungen</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Überbrückung von Vakanzen bei Fluktuation</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-blue-100">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base flex items-center gap-2">
                              <ShieldCheck className="h-5 w-5 text-blue-600" />
                              Risikominimierung
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="text-sm">
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Übertragung des Ausfallrisikos auf den Verleiher</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Rechtssichere Vertragsgestaltung durch den Verleiher</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Schnelle Personalanpassung bei Auftragsrückgängen</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>Compliance-Management durch Personaldienstleister</span>
                              </li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {/* Fallbeispiel */}
                      <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-lg mb-6">
                        <div className="font-medium mb-2 text-pink-700">Fallbeispiel: Automobilzulieferer bewältigt Produktionsspitzen</div>
                        <p className="text-sm text-gray-700 mb-3">
                          Ein mittelständischer Automobilzulieferer in Bayern erhielt kurzfristig einen Großauftrag, der die Produktionskapazität um 30% erhöhen sollte - für einen begrenzten Zeitraum von 6 Monaten.
                        </p>
                        <div className="text-sm text-gray-700">
                          <strong>Lösung:</strong> Durch den Einsatz von 22 qualifizierten Leiharbeitern konnte der Auftrag termingerecht erfüllt werden. Die Flexibilität der Leiharbeit ermöglichte es dem Unternehmen:
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>Schnelle Skalierung der Produktion innerhalb von 2 Wochen</li>
                            <li>Keine langfristigen Personalverpflichtungen</li>
                            <li>Reduktion von Überstunden der Stammbelegschaft</li>
                            <li>Zwei besonders qualifizierte Fachkräfte wurden nach Projektende übernommen</li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Herausforderungen und Lösungen */}
                      <div>
                        <H3 className="text-lg font-medium mb-4">Herausforderungen und Lösungsansätze</H3>
                        
                        <div className="space-y-4">
                          <Card className="bg-blue-50/50 border-blue-200/50">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Herausforderung: Integration in Teams</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-sm space-y-2">
                                <p className="text-muted-foreground">
                                  Leiharbeitnehmer fühlen sich oft nicht vollständig als Teil des Teams, was zu Motivationsproblemen führen kann.
                                </p>
                                <div className="pt-2 border-t border-blue-100">
                                  <div className="font-medium mb-1">Lösungsansätze:</div>
                                  <ul className="space-y-1 pl-4 list-disc">
                                    <li>Strukturierter Onboarding-Prozess auch für Leiharbeitnehmer</li>
                                    <li>Einbindung in Teamveranstaltungen und -meetings</li>
                                    <li>Klare Kommunikation der Aufgaben und Verantwortlichkeiten</li>
                                    <li>Ernennung eines Mentors aus der Stammbelegschaft</li>
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-blue-50/50 border-blue-200/50">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Herausforderung: Qualitätssicherung</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-sm space-y-2">
                                <p className="text-muted-foreground">
                                  Die Sicherstellung einer gleichbleibenden Qualität kann bei wechselnden Mitarbeitern schwierig sein.
                                </p>
                                <div className="pt-2 border-t border-blue-100">
                                  <div className="font-medium mb-1">Lösungsansätze:</div>
                                  <ul className="space-y-1 pl-4 list-disc">
                                    <li>Detaillierte Anforderungsprofile an den Verleiher</li>
                                    <li>Standardisierte Einarbeitungsprozesse</li>
                                    <li>Regelmäßiges Feedback und Qualitätskontrolle</li>
                                    <li>Enge Zusammenarbeit mit dem Zeitarbeitsunternehmen</li>
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card className="bg-blue-50/50 border-blue-200/50">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Herausforderung: Rechtliche Komplexität</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-sm space-y-2">
                                <p className="text-muted-foreground">
                                  Die Einhaltung aller rechtlichen Vorgaben des AÜG kann komplex sein und erfordert ständige Aufmerksamkeit.
                                </p>
                                <div className="pt-2 border-t border-blue-100">
                                  <div className="font-medium mb-1">Lösungsansätze:</div>
                                  <ul className="space-y-1 pl-4 list-disc">
                                    <li>Sorgfältige Auswahl eines renommierten Personaldienstleisters</li>
                                    <li>Klare vertragliche Regelungen mit dem Verleiher</li>
                                    <li>Regelmäßige Überprüfung der Höchstüberlassungsdauer</li>
                                    <li>Dokumentation aller relevanten Prozesse</li>
                                  </ul>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 4: Prozess */}
                <TabsContent value="prozess">
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-600/10 shadow-sm">
                      <div className="flex items-start gap-3">
                        <ClipboardList className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                          <H3 className="text-lg font-medium mb-2">Der Prozess der Arbeitnehmerüberlassung</H3>
                          <div className="text-sm text-muted-foreground mb-3">
                            Ein erfolgreicher Einsatz von Leiharbeitnehmern erfordert eine strukturierte Vorgehensweise.
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
                            <div className="font-medium text-sm">Bedarfsanalyse und Planung</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Ermittlung des quantitativen Personalbedarfs (Anzahl, Zeitraum)</li>
                              <li>Definition der benötigten Qualifikationen und Kompetenzen</li>
                              <li>Festlegung der Einsatzbereiche und -dauer</li>
                              <li>Budgetierung und Kostenkalkulation</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Schritt 2 */}
                        <div className="flex gap-4 ml-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium z-10">
                            2
                          </div>
                          <div>
                            <div className="font-medium text-sm">Auswahl des Personaldienstleisters</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Recherche und Vorauswahl geeigneter Verleiher</li>
                              <li>Überprüfung der Erlaubnis zur Arbeitnehmerüberlassung</li>
                              <li>Anfrage und Vergleich von Angeboten</li>
                              <li>Berücksichtigung von Branchenerfahrung und Spezialisierung</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Schritt 3 */}
                        <div className="flex gap-4 ml-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium z-10">
                            3
                          </div>
                          <div>
                            <div className="font-medium text-sm">Vertragsgestaltung</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Ausdrückliche Kennzeichnung als Arbeitnehmerüberlassung</li>
                              <li>Konkretisierung der Tätigkeits- und Anforderungsprofile</li>
                              <li>Festlegung der Überlassungsdauer und -konditionen</li>
                              <li>Regelungen zu Equal Pay und Equal Treatment</li>
                              <li>Vereinbarung zu Übernahmeoptionen (Vermittlungsprovision)</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Schritt 4 */}
                        <div className="flex gap-4 ml-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium z-10">
                            4
                          </div>
                          <div>
                            <div className="font-medium text-sm">Onboarding und Integration</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Vorbereitung der Stammbelegschaft auf den Einsatz von Leiharbeitnehmern</li>
                              <li>Strukturierte Einarbeitung und Einweisung</li>
                              <li>Klare Kommunikation von Aufgaben und Verantwortlichkeiten</li>
                              <li>Integration in betriebliche Prozesse und Teamstrukturen</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Schritt 5 */}
                        <div className="flex gap-4 ml-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium z-10">
                            5
                          </div>
                          <div>
                            <div className="font-medium text-sm">Management während des Einsatzes</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Regelmäßige Abstimmung mit dem Verleiher</li>
                              <li>Feedback zur Leistung und Qualität</li>
                              <li>Überwachung der Einsatzdauer (Höchstüberlassungsdauer)</li>
                              <li>Anpassung bei veränderten Anforderungen</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Schritt 6 */}
                        <div className="flex gap-4 ml-2">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-medium z-10">
                            6
                          </div>
                          <div>
                            <div className="font-medium text-sm">Beendigung oder Übernahme</div>
                            <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                              <li>Zeitgerechte Planung der Beendigung der Überlassung</li>
                              <li>Evaluation der Leistung und des Einsatzes</li>
                              <li>Prüfung von Übernahmemöglichkeiten besonders geeigneter Mitarbeiter</li>
                              <li>Geordnete Übergabe von Aufgaben und Wissen</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-pink-50 p-4 rounded-lg mt-6">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-6 w-6 text-yellow-400 mt-0.5" />
                          <div>
                            <div className="font-medium mb-1">Best Practices für erfolgreiche Integration</div>
                            <p className="text-sm text-gray-600 mb-2">
                              Unternehmen, die Leiharbeitskräfte besonders erfolgreich einsetzen, zeichnen sich durch folgende Praktiken aus:
                            </p>
                            <ul className="space-y-2 text-sm">
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-medium">Onboarding wie für Festangestellte:</span> Leiharbeitnehmer durchlaufen den gleichen strukturierten Einarbeitungsprozess wie Stammmitarbeiter.
                                </div>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-medium">Klare Kommunikation zur Rolle:</span> Transparente Information aller Beteiligten über Aufgaben, Verantwortlichkeiten und geplante Einsatzdauer.
                                </div>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-medium">Einbindung in Teamaktivitäten:</span> Konsequente Inklusion von Leiharbeitnehmern in Meetings, Schulungen und Teamevents.
                                </div>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-medium">Regelmäßiges Feedback:</span> Strukturierte Feedback-Gespräche, die Entwicklungsmöglichkeiten aufzeigen.
                                </div>
                              </li>
                              <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <div>
                                  <span className="font-medium">Langfristige Perspektiven:</span> Frühzeitige Information über mögliche Übernahmechancen, wenn die Leistung stimmt.
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Zukunftstrends */}
                    <Card className="bg-gradient-to-r from-pink-50 to-indigo-50 border-pink-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          Zukunftstrends der Leiharbeit
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 text-sm">
                          <p className="mb-2">
                            Die Leiharbeit wird sich in den kommenden Jahren durch verschiedene Faktoren weiterentwickeln:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                              <div className="font-medium mb-2 text-pink-600">Digitalisierung der Personalbeschaffung</div>
                              <p className="text-muted-foreground">
                                KI-gestützte Matching-Algorithmen und digitale Plattformen ermöglichen eine schnellere und präzisere Vermittlung von Leiharbeitnehmern mit genau den gesuchten Qualifikationen.
                              </p>
                            </div>
                            
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                              <div className="font-medium mb-2 text-pink-600">Zunehmende Spezialisierung</div>
                              <p className="text-muted-foreground">
                                Die Nachfrage nach hochqualifizierten Fachkräften in Spezialbereichen wie IT, Engineering oder Healthcare wird weiter steigen – Leiharbeit wird auch hier an Bedeutung gewinnen.
                              </p>
                            </div>
                            
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                              <div className="font-medium mb-2 text-pink-600">Hybride Arbeitsmodelle</div>
                              <p className="text-muted-foreground">
                                Die Integration von Remote Work in Leiharbeitsverträge wird zunehmen, was mehr Flexibilität für alle Beteiligten bietet und den Pool verfügbarer Arbeitskräfte vergrößert.
                              </p>
                            </div>
                            
                            <div className="bg-white p-3 rounded-lg shadow-sm">
                              <div className="font-medium mb-2 text-pink-600">Strategische Personalpartnerschaften</div>
                              <p className="text-muted-foreground">
                                Unternehmen werden verstärkt langfristige strategische Partnerschaften mit Personaldienstleistern eingehen, um dem Fachkräftemangel proaktiv zu begegnen.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* CTA Section */}
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <H3 className="text-xl font-bold mb-2">Bereit für flexible Personallösungen?</H3>
                    <Paragraph className="text-sm text-muted-foreground mb-4">
                      Nutzen Sie die Vorteile der Leiharbeit für Ihr Unternehmen. Unser erfahrenes Team unterstützt Sie bei der Planung und Umsetzung Ihrer individuellen Personalstrategie. Kontaktieren Sie uns für ein unverbindliches Beratungsgespräch.
                    </Paragraph>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link href="/leiharbeit">
                        <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-500/5 w-full sm:w-auto">
                          Mehr erfahren
                        </Button>
                      </Link>
                      <Link href="/leiharbeit#kontakt">
                      <Button className="bg-blue-500 hover:bg-blue-500/90 text-white w-full sm:w-auto">
                          Kostenlose Beratung
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="md:border-l md:border-blue-600/20 md:pl-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-xs text-muted-foreground">Telefon</div>
                        <div className="text-sm font-medium">0231 15044352</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-blue-500" />
                      <div>
                        <div className="text-xs text-muted-foreground">E-Mail</div>
                        <div className="text-sm font-medium">info@treuservice.com</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-5 w-5 text-blue-500" />
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
                <Card className="bg-pink-500/5 border-pink-500/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-6 w-6 text-yellow-400" />
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Vergleichen Sie nicht nur die Stundensätze verschiedener Personaldienstleister, sondern achten Sie besonders auf Faktoren wie Branchenerfahrung, Qualifikationsprofile der Mitarbeiter und Flexibilität bei veränderten Anforderungen.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Besonders wichtig: Investieren Sie in ein gutes Onboarding. Die ersten Tage entscheiden maßgeblich über die erfolgreiche Integration und Leistung von Leiharbeitnehmern.
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
                        <span>Helfer-/Einfachpersonal</span>
                        <span className="font-medium">1,5-1,8x Direktkosten</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Facharbeiter</span>
                        <span className="font-medium">1,8-2,2x Direktkosten</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Spezialisten</span>
                        <span className="font-medium">2,2-2,5x Direktkosten</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Hochqualifizierte Fachkräfte</span>
                        <span className="font-medium">2,5-3,0x Direktkosten</span>
                      </div>
                      <Paragraph className="text-xs text-muted-foreground mt-2">
                        Hinweis: Diese Faktoren sind Richtwerte und beziehen sich auf die Gehaltskosten, die für einen direkt angestellten Mitarbeiter anfallen würden. Die tatsächlichen Kosten variieren je nach Branche, Region und Qualifikationsprofil.
                      </Paragraph>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Rechtliche Hinweise */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-amber-600" />
                      Wichtige rechtliche Hinweise
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Höchstüberlassungsdauer von 18 Monaten beachten</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Equal Pay nach 9 Monaten sicherstellen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Überlassungserlaubnis des Verleihers prüfen</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Keine verdeckte Arbeitnehmerüberlassung</span>
                      </li>
                    </ul>
                    <div className="mt-4 text-sm">
                      <div className="font-medium">Zum 01.01.2025 neu:</div>
                      <p className="text-xs text-muted-foreground">Arbeitnehmerüberlassungsverträge können nun in Textform statt Schriftform abgeschlossen werden.</p>
                    </div>
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
                        { url: "/reinigung", title: "Reingungs Leiharbeiter" },
                        { url: "/security", title: "Security Leiharbeiter" }
                      ].map((article, idx) => (
                        <Link 
                          key={idx}
                          href={article.url} 
                          className="flex items-center py-3 group"
                        >
                          <ArrowRight className="h-4 w-4 text-pink-600 mr-2 transform group-hover:translate-x-1 transition-transform" />
                          <span className="text-sm group-hover:text-pink-700 transition-colors">{article.title}</span>
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
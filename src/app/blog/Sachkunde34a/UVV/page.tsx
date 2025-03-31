import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, BookOpen, AlertTriangle, CheckCircle, HelpCircle, MousePointer, ExternalLink, FileText, AlertCircle, Folder } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Unfallverhütungsvorschriften (UVV) | Sachkunde §34a",
  description: "UVV und Arbeitssicherheit für die Sachkundeprüfung §34a GewO - Grundlagen, Maßnahmen und Pflichten im Sicherheitsgewerbe",
};

export default function UVVPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-12">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <span>/</span>
          <span>Unfallverhütungsvorschriften (UVV)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Unfallverhütungsvorschriften (UVV)</h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Arbeitssicherheit und Unfallverhütung im Sicherheitsgewerbe - Rechtsgrundlagen, Maßnahmen und praktische Anwendung
        </p>
      </div>

      {/* Überblick und Wichtigkeit */}
      <Alert className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Prüfungsrelevanz: Mittel</AlertTitle>
        <AlertDescription>
          Dieser Themenbereich macht etwa 8-10% der schriftlichen Prüfungsfragen aus. Besonders wichtig sind die Grundpflichten, die Gefährdungsbeurteilung und das richtige Verhalten in Notfallsituationen.
        </AlertDescription>
      </Alert>

      {/* Hauptinhalte mit Tabs */}
      <Tabs defaultValue="grundlagen" className="space-y-8">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="grundlagen">Grundlagen</TabsTrigger>
          <TabsTrigger value="gefaehrdung">Gefährdungsbeurteilung</TabsTrigger>
          <TabsTrigger value="notfall">Notfallmanagement</TabsTrigger>
          <TabsTrigger value="praxis">Praxiswissen</TabsTrigger>
        </TabsList>
        
        {/* Grundlagen */}
        <TabsContent value="grundlagen" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Grundlagen der Unfallverhütung</h2>
            
            <p>
              Unfallverhütungsvorschriften (UVV) sind Regelungen der Berufsgenossenschaften zur Verhütung von Arbeitsunfällen, 
              Berufskrankheiten und arbeitsbedingten Gesundheitsgefahren. Sie sind für Arbeitgeber und Beschäftigte 
              rechtlich bindend und ergänzen die staatlichen Arbeitsschutzvorschriften.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Rechtliche Grundlagen</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Die Unfallverhütung basiert auf verschiedenen rechtlichen Grundlagen:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Arbeitsschutzgesetz (ArbSchG)</li>
                    <li>Unfallverhütungsvorschriften der Berufsgenossenschaften</li>
                    <li>DGUV Vorschrift 1 "Grundsätze der Prävention"</li>
                    <li>DGUV Vorschrift 23 "Wach- und Sicherungsdienste"</li>
                    <li>Betriebssicherheitsverordnung (BetrSichV)</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Zuständige Berufsgenossenschaft</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Für das Sicherheitsgewerbe ist die Berufsgenossenschaft für Handel und Warenlogistik (BGHW) zuständig. 
                    Sie erlässt branchenspezifische Unfallverhütungsvorschriften und berät Unternehmen in Fragen der 
                    Arbeitssicherheit und des Gesundheitsschutzes.
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Die Berufsgenossenschaft ist ein Träger der gesetzlichen Unfallversicherung und übernimmt neben der 
                    Prävention auch die Rehabilitation und Entschädigung nach Arbeitsunfällen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Allgemeine Pflichten im Arbeitsschutz</h3>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Grundpflichten des Arbeitgebers</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Der Arbeitgeber ist hauptverantwortlich für den Arbeitsschutz im Unternehmen:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Durchführung von Gefährdungsbeurteilungen</li>
                    <li>Festlegung geeigneter Schutzmaßnahmen</li>
                    <li>Bereitstellung erforderlicher Arbeitsmittel und persönlicher Schutzausrüstung (PSA)</li>
                    <li>Regelmäßige Unterweisung der Beschäftigten</li>
                    <li>Bestellung von Fachkräften für Arbeitssicherheit und Betriebsärzten</li>
                    <li>Organisation der Ersten Hilfe und des Brandschutzes</li>
                  </ul>
                  <p className="mt-2 text-sm text-muted-foreground">
                    In Sicherheitsunternehmen ist besonders wichtig: Die Anpassung der Arbeitsschutzmaßnahmen an die 
                    unterschiedlichen Einsatzorte und Gefährdungen, mit denen die Mitarbeiter konfrontiert werden können.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Pflichten der Beschäftigten</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Auch die Beschäftigten haben Pflichten im Arbeitsschutz:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Befolgen von Weisungen und Anweisungen</li>
                    <li>Sachgemäße Nutzung von Arbeitsmitteln und Schutzausrüstung</li>
                    <li>Meldung von Gefährdungen und Mängeln</li>
                    <li>Teilnahme an Unterweisungen und arbeitsmedizinischen Untersuchungen</li>
                    <li>Kein Arbeiten unter Alkohol- oder Drogeneinfluss</li>
                  </ul>
                  <div className="mt-2 bg-muted/50 p-2 rounded">
                    <p className="text-xs">
                      <strong>Prüfungshinweis:</strong> Die Fürsorgepflicht des Arbeitgebers entbindet die Beschäftigten nicht 
                      von ihrer eigenen Verantwortung. Mitarbeiter müssen aktiv zur Sicherheit am Arbeitsplatz beitragen.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Unterweisungspflicht</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Beschäftigte müssen regelmäßig über Arbeitsschutzthemen unterwiesen werden:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Bei Neueinstellung und vor Aufnahme der Tätigkeit</li>
                    <li>Bei wesentlichen Änderungen der Arbeitsbedingungen</li>
                    <li>Bei Einführung neuer Arbeitsmittel oder Technologien</li>
                    <li>Nach Unfällen oder Beinahe-Unfällen</li>
                    <li>Mindestens einmal jährlich als Wiederholungsunterweisung</li>
                  </ul>
                  <p className="mt-2 text-sm">
                    Die Unterweisungen müssen dokumentiert werden und sollten folgende Inhalte umfassen:
                  </p>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                    <li>Spezifische Gefährdungen am Arbeitsplatz</li>
                    <li>Schutzmaßnahmen und sichere Arbeitsabläufe</li>
                    <li>Notfallmaßnahmen und Erste Hilfe</li>
                    <li>Umgang mit Arbeitsmitteln und persönlicher Schutzausrüstung</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Persönliche Schutzausrüstung (PSA)</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Wenn technische und organisatorische Maßnahmen nicht ausreichen, muss der Arbeitgeber 
                    geeignete persönliche Schutzausrüstung zur Verfügung stellen:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="text-sm border p-2 rounded">
                      <p className="font-medium">Im Sicherheitsgewerbe relevante PSA:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                        <li>Wetterschutzkleidung für Außeneinsätze</li>
                        <li>Sicherheitsschuhe mit rutschfester Sohle</li>
                        <li>Warnwesten bei Einsätzen im Straßenverkehr</li>
                        <li>Schnittschutzhandschuhe (bei bestimmten Einsätzen)</li>
                        <li>Ggf. Schutzwesten (bei erhöhtem Risiko)</li>
                      </ul>
                    </div>
                    <div className="text-sm border p-2 rounded">
                      <p className="font-medium">Pflichten bezüglich PSA:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                        <li>Arbeitgeber: Bereitstellung, Instandhaltung, Prüfung</li>
                        <li>Arbeitgeber: Unterweisung zur richtigen Verwendung</li>
                        <li>Beschäftigte: Sachgemäße Nutzung</li>
                        <li>Beschäftigte: Meldung von Mängeln</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        {/* Gefährdungsbeurteilung */}
        <TabsContent value="gefaehrdung" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Gefährdungsbeurteilung im Sicherheitsgewerbe</h2>
            
            <p>
              Die Gefährdungsbeurteilung ist das zentrale Element des betrieblichen Arbeitsschutzes.
              Sie dient dazu, mögliche Gefährdungen systematisch zu ermitteln und geeignete Schutzmaßnahmen festzulegen.
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Folder className="h-5 w-5 mr-2 text-blue-600" />
                  Ablauf einer Gefährdungsbeurteilung
                </h3>
                <div className="text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">1</Badge>
                    <div>
                      <p className="font-medium">Arbeitsbereiche und Tätigkeiten festlegen</p>
                      <p className="text-muted-foreground">Systematische Erfassung aller Arbeitsbereiche und Tätigkeiten (z.B. Pfortendienst, Streifendienst, Veranstaltungsschutz)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">2</Badge>
                    <div>
                      <p className="font-medium">Gefährdungen ermitteln</p>
                      <p className="text-muted-foreground">Identifikation möglicher Gefährdungen für jeden Arbeitsbereich und jede Tätigkeit</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">3</Badge>
                    <div>
                      <p className="font-medium">Gefährdungen bewerten</p>
                      <p className="text-muted-foreground">Einschätzung der Eintrittswahrscheinlichkeit und Schwere der möglichen Schäden</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">4</Badge>
                    <div>
                      <p className="font-medium">Maßnahmen festlegen</p>
                      <p className="text-muted-foreground">Festlegung geeigneter Schutzmaßnahmen nach dem TOP-Prinzip (Technisch, Organisatorisch, Persönlich)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">5</Badge>
                    <div>
                      <p className="font-medium">Maßnahmen umsetzen</p>
                      <p className="text-muted-foreground">Praktische Umsetzung der festgelegten Maßnahmen und Kontrolle ihrer Wirksamkeit</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">6</Badge>
                    <div>
                      <p className="font-medium">Dokumentation</p>
                      <p className="text-muted-foreground">Schriftliche Dokumentation aller Schritte und Ergebnisse der Gefährdungsbeurteilung</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">7</Badge>
                    <div>
                      <p className="font-medium">Regelmäßige Überprüfung und Aktualisierung</p>
                      <p className="text-muted-foreground">Anpassung bei geänderten Arbeitsbedingungen und regelmäßige Überprüfung (mind. alle 2 Jahre)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Typische Gefährdungen im Sicherheitsgewerbe
                </h3>
                <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <Card className="border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Physische Gefährdungen</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Übergriffe durch Dritte (Gewalt)</li>
                        <li>Stolper-, Rutsch- und Sturzgefahren</li>
                        <li>Unfälle im Straßenverkehr</li>
                        <li>Gefahren durch bewegte Teile (z.B. Tore, Schranken)</li>
                        <li>Arbeiten an gefährlichen Orten (Höhen, Baustellen)</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Psychische Belastungen</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Nacht- und Schichtarbeit</li>
                        <li>Isolation (Alleindienst)</li>
                        <li>Konfliktsituationen und verbale Angriffe</li>
                        <li>Hohe Verantwortung</li>
                        <li>Monotonie bei bestimmten Aufgaben</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Umgebungsbedingte Gefährdungen</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Witterungseinflüsse (Kälte, Hitze, Nässe)</li>
                        <li>Lärm (z.B. bei Veranstaltungen)</li>
                        <li>Mangelhafte Beleuchtung</li>
                        <li>Gefährliche Arbeitsstoffe bei Objektschutz</li>
                        <li>Biologische Gefahren (z.B. Infektionen)</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Organisatorische Risiken</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Unzureichende Einarbeitung/Unterweisung</li>
                        <li>Mangelnde Kommunikation</li>
                        <li>Fehlende oder unzureichende Notfallpläne</li>
                        <li>Unklare Zuständigkeiten und Verantwortungen</li>
                        <li>Zeitdruck und Unterbesetzung</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Schutzmaßnahmen nach dem TOP-Prinzip
                </h3>
                <p className="text-sm mb-3">
                  Schutzmaßnahmen sollten nach dem TOP-Prinzip festgelegt werden - von der höchsten zur niedrigsten Wirksamkeit:
                </p>
                <div className="text-sm space-y-3">
                  <div>
                    <p className="font-medium">T - Technische Maßnahmen</p>
                    <p className="text-muted-foreground ml-4">Höchste Wirksamkeit durch technische Lösungen</p>
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-xs">
                      <li>Sichere Zugangssysteme (Vereinzelungsanlagen, Drehkreuze)</li>
                      <li>Alarmierungs- und Kommunikationssysteme</li>
                      <li>Beleuchtung von Kontroll- und Streifenwegen</li>
                      <li>Schutzvorrichtungen an Maschinen und Anlagen</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium">O - Organisatorische Maßnahmen</p>
                    <p className="text-muted-foreground ml-4">Mittlere Wirksamkeit durch Arbeitsorganisation</p>
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-xs">
                      <li>Klare Arbeitsanweisungen und Dienstpläne</li>
                      <li>Regelmäßige Unterweisungen und Schulungen</li>
                      <li>Notfall- und Alarmierungspläne</li>
                      <li>Regelmäßige Kontrollen der Arbeitsbedingungen</li>
                      <li>Vermeidung von Alleindiensten bei erhöhtem Risiko</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium">P - Personenbezogene Maßnahmen</p>
                    <p className="text-muted-foreground ml-4">Geringste Wirksamkeit, ergänzend einzusetzen</p>
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1 text-xs">
                      <li>Bereitstellung und Nutzung von PSA</li>
                      <li>Verhaltensregeln für bestimmte Situationen</li>
                      <li>Deeskalationstraining</li>
                      <li>Erste-Hilfe-Ausbildung</li>
                      <li>Gesundheitsförderung und arbeitsmedizinische Vorsorge</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Notfallmanagement */}
        <TabsContent value="notfall" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Notfallmanagement und Erste Hilfe</h2>
            
            <p>
              Im Sicherheitsgewerbe ist eine gute Vorbereitung auf Notfälle besonders wichtig.
              Sicherheitsmitarbeiter sind oft die ersten Ansprechpartner bei Notfällen und müssen
              entsprechend handeln können.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">§ 10 ArbSchG</Badge>
                  <CardTitle className="text-base">Erste Hilfe und Notfallvorsorge</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Der Arbeitgeber hat entsprechend der Art der Arbeitsstätte und der Tätigkeiten sowie
                    der Zahl der Beschäftigten die Maßnahmen zu treffen, die zur Ersten Hilfe, Brandbekämpfung 
                    und Evakuierung erforderlich sind.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Notwendige Maßnahmen:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Bereitstellung von Erste-Hilfe-Material</li>
                    <li>Ausbildung von Ersthelfern (mind. 5% der Beschäftigten)</li>
                    <li>Erstellung von Notfall- und Fluchtplänen</li>
                    <li>Regelmäßige Übungen zum Verhalten in Notfällen</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">DGUV Vorschrift 1</Badge>
                  <CardTitle className="text-base">Ersthelfer im Betrieb</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Der Unternehmer hat dafür zu sorgen, dass für die Erste-Hilfe-Leistung Ersthelfer
                    mindestens in folgender Zahl zur Verfügung stehen:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Bei 2 bis 20 anwesenden Versicherten: ein Ersthelfer</li>
                    <li>Bei mehr als 20 anwesenden Versicherten:</li>
                    <ul className="list-disc list-inside ml-4">
                      <li>In Verwaltungs- und Handelsbetrieben: mind. 5%</li>
                      <li>In sonstigen Betrieben: mind. 10%</li>
                    </ul>
                  </ul>
                  <p className="mt-2">
                    <strong>Hinweis:</strong> Im Sicherheitsgewerbe ist aufgrund der erhöhten Gefährdung und der 
                    oft dezentralen Einsatzorte eine höhere Quote von Ersthelfern sinnvoll.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4 mt-6">
              <h3 className="text-xl font-semibold">Verhalten in Notfallsituationen</h3>
              
              <div className="space-y-4">
                <p>
                  Sicherheitsmitarbeiter müssen auf verschiedene Notfallsituationen vorbereitet sein
                  und angemessen reagieren können.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Erste Hilfe bei Unfällen</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <ol className="list-decimal list-inside space-y-1">
                        <li><strong>Eigenschutz beachten</strong> - Keine Selbstgefährdung</li>
                        <li><strong>Unfallstelle sichern</strong> - Weitere Unfälle verhindern</li>
                        <li><strong>Lebensrettende Sofortmaßnahmen</strong> - Bewusstsein, Atmung, Kreislauf prüfen</li>
                        <li><strong>Notruf absetzen</strong> - 5 W-Fragen: Wo? Was? Wie viele Verletzte? Welche Verletzungen? Warten auf Rückfragen</li>
                        <li><strong>Erste Hilfe leisten</strong> - Versorgung nach Dringlichkeit</li>
                        <li><strong>Betreuung</strong> - Verletzte nicht allein lassen</li>
                      </ol>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Brandschutz und Brandbekämpfung</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <ol className="list-decimal list-inside space-y-1">
                        <li><strong>Alarmieren</strong> - Feueralarm auslösen, Notruf 112</li>
                        <li><strong>Retten</strong> - Gefährdete Personen warnen und in Sicherheit bringen</li>
                        <li><strong>Löschen</strong> - Entstehungsbrände mit Feuerlöschern bekämpfen</li>
                      </ol>
                      <p className="mt-2">
                        <strong>Wichtig:</strong> Nur Entstehungsbrände bekämpfen, keine Selbstgefährdung!
                      </p>
                      <p>
                        Sicherheitsmitarbeiter sollten die Standorte der Feuerlöscher, Fluchtwege und 
                        Sammelplätze in ihrem Einsatzbereich kennen.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Evakuierung</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p>
                        Bei einer Evakuierung haben Sicherheitsmitarbeiter oft eine besondere Verantwortung:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Alarmierung der betroffenen Bereiche</li>
                        <li>Anweisen der Personen zu den Notausgängen</li>
                        <li>Kontrolle der zu evakuierenden Bereiche</li>
                        <li>Unterstützung hilfsbedürftiger Personen</li>
                        <li>Einweisung der Rettungskräfte</li>
                      </ul>
                      <p className="mt-2">
                        <strong>Tipp:</strong> Regelmäßige Übungen und Begehungen der Fluchtwege erhöhen die Sicherheit im Ernstfall.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Meldekette und Dokumentation</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p>
                        Nach einem Notfall oder Unfall sind folgende Schritte wichtig:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Information des Vorgesetzten/der Einsatzzentrale</li>
                        <li>Dokumentation des Vorfalls (Unfallbericht)</li>
                        <li>Bei Arbeitsunfällen: Meldung an die Berufsgenossenschaft</li>
                        <li>Bei schweren Unfällen: Meldung an die zuständige Behörde</li>
                        <li>Analyse des Vorfalls zur Vermeidung ähnlicher Ereignisse</li>
                      </ul>
                      <p className="mt-2">
                        <strong>Dokumentation umfasst:</strong> Datum, Zeit, Ort, Beteiligte, Hergang, 
                        Maßnahmen, Zeugen
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
          
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Wichtig für die Prüfung</AlertTitle>
            <AlertDescription>
              Merken Sie sich die Grundsätze der Ersten Hilfe und das richtige Verhalten bei Brand und Evakuierung.
              Diese Themen sind regelmäßig Gegenstand der Prüfung und können im Ernstfall Leben retten!
              Achten Sie besonders auf die richtige Reihenfolge der Maßnahmen und den Eigenschutz.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Praxiswissen */}
        <TabsContent value="praxis" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Praxiswissen und typische Gefährdungen</h2>
            
            <p>
              Im Sicherheitsgewerbe gibt es spezifische Gefährdungen und Herausforderungen,
              die in der praktischen Arbeit besonders zu beachten sind.
            </p>
            
            <div className="mt-6 space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Alleindienst</CardTitle>
                  <CardDescription>Besondere Gefährdungen und Schutzmaßnahmen</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Sicherheitsmitarbeiter sind häufig allein im Einsatz, 
                    z.B. beim Objektschutz oder bei Kontrollgängen.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Besondere Gefährdungen:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Fehlende unmittelbare Hilfe bei Überfällen oder Notfällen</li>
                      <li>Psychische Belastung durch Isolation</li>
                      <li>Erhöhte Eigenverantwortung bei Notfallsituationen</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Schutzmaßnahmen:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Regelmäßige Kontaktaufnahme mit der Zentrale (Check-In-System)</li>
                      <li>Personennotsignalgeräte (PNG) für Notfälle</li>
                      <li>Klare Notfallpläne und Kommunikationswege</li>
                      <li>Gute Beleuchtung und Sichtbarkeit des Arbeitsbereichs</li>
                      <li>Bei erhöhtem Risiko: Verzicht auf Alleindienst</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Nacht- und Schichtarbeit</CardTitle>
                  <CardDescription>Gesundheitsschutz bei unregelmäßigen Arbeitszeiten</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Im Sicherheitsgewerbe ist Schichtarbeit und Nachtarbeit häufig unvermeidbar.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Gesundheitliche Risiken:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Schlafstörungen und Schlafmangel</li>
                      <li>Störung des biologischen Rhythmus</li>
                      <li>Erhöhtes Risiko für Herz-Kreislauf-Erkrankungen</li>
                      <li>Verdauungsprobleme</li>
                      <li>Beeinträchtigung des sozialen Lebens</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Schutzmaßnahmen:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Ergonomische Schichtplanung (vorwärts rotierende Schichten)</li>
                      <li>Ausreichende Ruhephasen zwischen den Schichten</li>
                      <li>Gesundheitsförderung (Ernährung, Bewegung, Stressbewältigung)</li>
                      <li>Arbeitsmedizinische Vorsorge nach ArbMedVV</li>
                      <li>Gute Lichtbedingungen in Nachtstunden</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Umgang mit aggressiven Personen</CardTitle>
                  <CardDescription>Prävention und Verhalten bei Übergriffen</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Sicherheitsmitarbeiter werden häufig mit schwierigen oder 
                    aggressiven Personen konfrontiert.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Präventive Maßnahmen:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Deeskalationstraining für alle Mitarbeiter</li>
                      <li>Klare Handlungsanweisungen für Konfliktsituationen</li>
                      <li>Technische Sicherheitsmaßnahmen (Alarmknöpfe, Kamerasysteme)</li>
                      <li>Angemessene Personalstärke bei risikoreichen Einsätzen</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Verhalten im Ernstfall:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Ruhe bewahren und deeskalierend wirken</li>
                      <li>Sicherheitsabstand einhalten</li>
                      <li>Hilfe holen, Kollegen oder Polizei alarmieren</li>
                      <li>Notwehr nur als letztes Mittel (verhältnismäßig)</li>
                      <li>Nach einem Vorfall: Dokumentation und psychologische Nachsorge</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Arbeiten bei extremen Witterungsbedingungen</CardTitle>
                  <CardDescription>Schutz vor Hitze, Kälte und Unwetter</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Außendienste sind oft extremen Witterungsbedingungen ausgesetzt.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Gefährdungen:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Hitze:</strong> Hitzschlag, Sonnenstich, Dehydration</li>
                      <li><strong>Kälte:</strong> Unterkühlung, Erfrierungen</li>
                      <li><strong>Nässe:</strong> Erkältung, erhöhte Rutschgefahr</li>
                      <li><strong>Unwetter:</strong> Verletzungsgefahr durch Blitzschlag, herabfallende Äste etc.</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Schutzmaßnahmen:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Geeignete Schutzkleidung (wasserdicht, winddicht, atmungsaktiv)</li>
                      <li>Anpassung der Arbeitszeiten und -abläufe</li>
                      <li>Schutzhütten und klimatisierte Pausenräume</li>
                      <li>Ausreichend Getränke (im Sommer gekühlt, im Winter warm)</li>
                      <li>Unterweisung zu wetterabhängigen Gefährdungen</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Lernhilfen und Zusammenfassung */}
      <div className="space-y-6 p-6 bg-muted/30 rounded-lg">
        <h2 className="text-2xl font-bold">Lernhilfen und Schlüsselbegriffe</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">Essentielle Begriffe</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>UVV:</strong> Unfallverhütungsvorschriften - Regelungen der Berufsgenossenschaften zur Verhütung von Arbeitsunfällen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Gefährdungsbeurteilung:</strong> Systematische Ermittlung und Bewertung von Gefährdungen am Arbeitsplatz</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>TOP-Prinzip:</strong> Reihenfolge der Schutzmaßnahmen: Technisch vor Organisatorisch vor Personenbezogen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>PSA:</strong> Persönliche Schutzausrüstung - individuelle Ausrüstung zum Schutz vor Gefährdungen</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Häufige Prüfungsfragen</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Welche Pflichten haben Arbeitgeber und Arbeitnehmer im Arbeitsschutz?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Was sind die Schritte einer Gefährdungsbeurteilung?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Wie sollte man sich bei einem Arbeitsunfall verhalten?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Welche Schutzmaßnahmen gibt es für Alleindienste?</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA-Bereich */}
      <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
        <div>
          <h3 className="text-lg font-medium mb-2">Bereit für die nächsten Themen?</h3>
          <p className="text-sm text-muted-foreground">
            Setzen Sie Ihre Vorbereitung mit den anderen Prüfungsbereichen fort oder testen Sie Ihr Wissen im Simulator.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/blog/Sachkunde34a/Deeskalation"
            className={buttonVariants({ variant: "outline" })}
          >
            <BookOpen className="mr-2 h-4 w-4" /> Nächstes Thema
          </Link>
          <Link
            href="/blog/Sachkunde34a/PruefungsSimulator"
            className={buttonVariants({})}
          >
            <MousePointer className="mr-2 h-4 w-4" /> Zum Prüfungssimulator
          </Link>
        </div>
      </div>

      {/* Weitere Ressourcen */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-medium">Weiterführende Ressourcen</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://www.dguv.de/de/praevention/index.jsp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Deutsche Gesetzliche Unfallversicherung (DGUV)</span>
          </a>
          
          <a
            href="https://www.bgw-online.de/DE/Arbeitssicherheit-Gesundheitsschutz/Gefaehrdungsbeurteilung/Gefaehrdungsbeurteilung_node.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Informationen zur Gefährdungsbeurteilung</span>
          </a>
        </div>
      </div>
    </div>
  );
}

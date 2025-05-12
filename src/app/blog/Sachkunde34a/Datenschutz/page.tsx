import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, BookOpen, AlertTriangle, CheckCircle, HelpCircle, MousePointer, ExternalLink, FileText, AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Datenschutz | Sachkunde §34a",
  description: "Alles zum Thema Datenschutz für die Sachkundeprüfung §34a GewO - DSGVO, BDSG und deren Anwendung im Sicherheitsgewerbe",
};

export default function DatenschutzPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-12">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <span>/</span>
          <span>Datenschutz</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Datenschutz im Sicherheitsgewerbe</h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Grundlagen des Datenschutzrechts und seine Anwendung in der Sicherheitsbranche mit Fokus auf DSGVO und BDSG
        </p>
      </div>

      {/* Überblick und Wichtigkeit */}
      <Alert className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Prüfungsrelevanz: Hoch</AlertTitle>
        <AlertDescription>
          Der Datenschutz ist ein wichtiger Bestandteil der §34a-Sachkundeprüfung und macht etwa 10-15% der schriftlichen Prüfungsfragen aus.
        </AlertDescription>
      </Alert>

      {/* Hauptinhalte mit Tabs */}
      <Tabs defaultValue="grundlagen" className="space-y-8">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="grundlagen">Grundlagen</TabsTrigger>
          <TabsTrigger value="dsgvo">DSGVO</TabsTrigger>
          <TabsTrigger value="sicherheit">Videoüberwachung</TabsTrigger>
          <TabsTrigger value="praxis">Praxiswissen</TabsTrigger>
        </TabsList>
        
        {/* Grundlagen */}
        <TabsContent value="grundlagen" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Grundlagen des Datenschutzes</h2>
            
            <p>
              Datenschutz ist im Sicherheitsgewerbe von besonderer Bedeutung, da Sicherheitsmitarbeiter 
              regelmäßig mit personenbezogenen Daten in Kontakt kommen. Die korrekte Handhabung dieser 
              Daten ist gesetzlich geregelt und muss strikt beachtet werden.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Was ist Datenschutz?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Datenschutz umfasst alle Maßnahmen zum Schutz der informationellen Selbstbestimmung des Einzelnen. 
                    Es geht darum, dass jeder Mensch grundsätzlich selbst darüber bestimmen kann, wer was über ihn weiß.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Personenbezogene Daten</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Als personenbezogene Daten gelten alle Informationen, die sich auf eine identifizierte oder 
                    identifizierbare natürliche Person beziehen. Dazu gehören unter anderem:
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Name, Anschrift, Telefonnummern</li>
                    <li>Ausweisnummern, Kfz-Kennzeichen</li>
                    <li>Biometrische Daten, Videoaufnahmen</li>
                    <li>IP-Adressen, RFID-Kennnummern</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Rechtliche Grundlagen</h3>
            
            <p className="text-sm text-muted-foreground">
              Der Datenschutz in Deutschland wird durch folgende wesentliche Rechtsgrundlagen geregelt:
            </p>
            
            <div className="grid grid-cols-1 gap-4 mt-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Datenschutz-Grundverordnung (DSGVO)</h4>
                  <p className="text-sm text-muted-foreground">
                    EU-weite Verordnung, die seit 25. Mai 2018 in Kraft ist. Sie regelt die Verarbeitung personenbezogener 
                    Daten durch private Unternehmen und öffentliche Stellen.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Bundesdatenschutzgesetz (BDSG)</h4>
                  <p className="text-sm text-muted-foreground">
                    Ergänzt die DSGVO um nationale Regelungen und betrifft vor allem öffentliche Stellen des Bundes 
                    sowie nicht-öffentliche Stellen (private Unternehmen).
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Landesdatenschutzgesetze</h4>
                  <p className="text-sm text-muted-foreground">
                    Regeln den Datenschutz für öffentliche Stellen der Länder und kommunale Einrichtungen.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Bereichsspezifische Regelungen</h4>
                  <p className="text-sm text-muted-foreground">
                    Zusätzliche Vorschriften in speziellen Bereichen, wie z.B. das Kunsturhebergesetz (KUG) für das Recht am eigenen Bild.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg mt-4">
            <p className="text-sm">
              <strong>Beachte:</strong> Im Sicherheitsgewerbe sind insbesondere die DSGVO und das BDSG relevant. 
              Sie bilden die Grundlage für den Umgang mit personenbezogenen Daten bei Überwachungs-, Kontroll- und 
              Dokumentationstätigkeiten.
            </p>
          </div>
        </TabsContent>
        
        {/* DSGVO */}
        <TabsContent value="dsgvo" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Die Datenschutz-Grundverordnung (DSGVO)</h2>
            
            <p>
              Die DSGVO ist seit 2018 die zentrale Rechtsgrundlage für den Datenschutz in der EU. 
              Sie legt einheitliche Regeln für die Verarbeitung personenbezogener Daten fest und 
              stärkt die Rechte der betroffenen Personen.
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Grundprinzipien der DSGVO (Art. 5)
                </h3>
                <div className="text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">1</Badge>
                    <div>
                      <p className="font-medium">Rechtmäßigkeit, Transparenz, Treu und Glauben</p>
                      <p className="text-muted-foreground">Personenbezogene Daten müssen auf rechtmäßige Weise, nach Treu und Glauben und in einer für die betroffene Person nachvollziehbaren Weise verarbeitet werden.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">2</Badge>
                    <div>
                      <p className="font-medium">Zweckbindung</p>
                      <p className="text-muted-foreground">Daten dürfen nur für festgelegte, eindeutige und legitime Zwecke erhoben werden.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">3</Badge>
                    <div>
                      <p className="font-medium">Datenminimierung</p>
                      <p className="text-muted-foreground">Die Datenverarbeitung muss auf das notwendige Maß beschränkt sein.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">4</Badge>
                    <div>
                      <p className="font-medium">Richtigkeit</p>
                      <p className="text-muted-foreground">Daten müssen sachlich richtig und auf dem neuesten Stand sein.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">5</Badge>
                    <div>
                      <p className="font-medium">Speicherbegrenzung</p>
                      <p className="text-muted-foreground">Daten dürfen nur so lange gespeichert werden, wie es für den Zweck erforderlich ist.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">6</Badge>
                    <div>
                      <p className="font-medium">Integrität und Vertraulichkeit</p>
                      <p className="text-muted-foreground">Daten müssen angemessen gesichert werden.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Rechtsgrundlagen für die Datenverarbeitung (Art. 6)
                </h3>
                <p className="text-sm mb-3">
                  Eine Verarbeitung personenbezogener Daten ist nur zulässig, wenn mindestens eine der folgenden 
                  Rechtsgrundlagen vorliegt:
                </p>
                <div className="text-sm space-y-2">
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Einwilligung:</strong> Die betroffene Person hat eingewilligt</li>
                    <li><strong>Vertrag:</strong> Die Verarbeitung ist für die Erfüllung eines Vertrags erforderlich</li>
                    <li><strong>Rechtliche Verpflichtung:</strong> Die Verarbeitung ist zur Erfüllung einer rechtlichen Verpflichtung erforderlich</li>
                    <li><strong>Lebenswichtige Interessen:</strong> Die Verarbeitung ist zum Schutz lebenswichtiger Interessen erforderlich</li>
                    <li><strong>Öffentliches Interesse:</strong> Die Verarbeitung ist für eine Aufgabe im öffentlichen Interesse erforderlich</li>
                    <li><strong>Berechtigte Interessen:</strong> Die Verarbeitung ist zur Wahrung berechtigter Interessen erforderlich, sofern nicht die Interessen der betroffenen Person überwiegen</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Betroffenenrechte
                </h3>
                <p className="text-sm mb-3">
                  Die DSGVO stärkt die Rechte der von der Datenverarbeitung betroffenen Personen. Diese umfassen:
                </p>
                <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium">Recht auf Information (Art. 13, 14)</p>
                    <p className="text-xs text-muted-foreground">Transparente Information über die Datenverarbeitung</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium">Recht auf Auskunft (Art. 15)</p>
                    <p className="text-xs text-muted-foreground">Auskunft über gespeicherte personenbezogene Daten</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium">Recht auf Berichtigung (Art. 16)</p>
                    <p className="text-xs text-muted-foreground">Berichtigung unrichtiger Daten</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium">Recht auf Löschung (Art. 17)</p>
                    <p className="text-xs text-muted-foreground">Löschung der Daten unter bestimmten Voraussetzungen</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium">Recht auf Einschränkung (Art. 18)</p>
                    <p className="text-xs text-muted-foreground">Einschränkung der Verarbeitung</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium">Recht auf Datenübertragbarkeit (Art. 20)</p>
                    <p className="text-xs text-muted-foreground">Erhalt der Daten in strukturiertem Format</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium">Widerspruchsrecht (Art. 21)</p>
                    <p className="text-xs text-muted-foreground">Widerspruch gegen die Verarbeitung</p>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <p className="font-medium">Beschwerde bei der Aufsichtsbehörde (Art. 77)</p>
                    <p className="text-xs text-muted-foreground">Beschwerde bei der zuständigen Datenschutzbehörde</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Videoüberwachung und Sicherheit */}
        <TabsContent value="sicherheit" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Videoüberwachung im Sicherheitsgewerbe</h2>
            
            <p>
              Die Videoüberwachung ist eine zentrale Tätigkeit vieler Sicherheitsdienste.
              Datenschutzrechtlich unterliegt sie besonderen Anforderungen, da sie einen
              erheblichen Eingriff in die Privatsphäre darstellen kann.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">§ 4 BDSG</Badge>
                  <CardTitle className="text-base">Rechtsgrundlage für Videoüberwachung</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    § 4 BDSG regelt die Videoüberwachung öffentlich zugänglicher Räume.
                    Die Überwachung ist nur zulässig, soweit sie:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>zur Aufgabenerfüllung öffentlicher Stellen,</li>
                    <li>zur Wahrnehmung des Hausrechts oder</li>
                    <li>zur Wahrnehmung berechtigter Interessen für konkret festgelegte Zwecke</li>
                  </ul>
                  <p>erforderlich ist und keine Anhaltspunkte bestehen, dass schutzwürdige Interessen der Betroffenen überwiegen.</p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Transparenz</Badge>
                  <CardTitle className="text-base">Hinweispflicht</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Eine Videoüberwachung muss durch geeignete Maßnahmen kenntlich gemacht werden:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Deutlich erkennbare Hinweisschilder</li>
                    <li>Information über den Verantwortlichen</li>
                    <li>Angabe des Zwecks der Überwachung</li>
                    <li>Hinweis auf weitere Informationen nach Art. 13 DSGVO</li>
                  </ul>
                  <div className="bg-muted/50 p-2 rounded mt-2">
                    <p className="text-xs">
                      <strong>Tipp für die Prüfung:</strong> Das Fehlen von Hinweisschildern bei Videoüberwachung 
                      stellt einen Verstoß gegen die DSGVO dar!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4 mt-6">
              <h3 className="text-xl font-semibold">Anforderungen an die Videoüberwachung</h3>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Zweckbindung und Erforderlichkeit</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Die Videoüberwachung darf nur für konkret festgelegte Zwecke eingesetzt werden:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>Schutz des Eigentums</li>
                      <li>Verhinderung von Straftaten</li>
                      <li>Gewährleistung der Sicherheit von Personen</li>
                      <li>Durchsetzung des Hausrechts</li>
                    </ul>
                    <p className="mt-2 text-sm">
                      Die Überwachung muss zur Erreichung des Zwecks erforderlich sein - es darf kein milderes 
                      Mittel geben, das gleich effektiv ist.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Speicherdauer</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Videoaufzeichnungen dürfen nur so lange gespeichert werden, wie es zum Erreichen des Zwecks 
                      erforderlich ist:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>In der Regel maximal 48-72 Stunden</li>
                      <li>Bei besonderen Vorfällen (z.B. Straftaten) längere Speicherung möglich</li>
                      <li>Eine automatische Löschroutine sollte eingerichtet sein</li>
                    </ul>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Beachte: Eine anlasslose Speicherung über mehrere Wochen ist in der Regel nicht zulässig!
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Überwachungsbereich</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Der Überwachungsbereich muss angemessen begrenzt sein:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>Keine flächendeckende Überwachung</li>
                      <li>Beschränkung auf schutzbedürftige Bereiche</li>
                      <li>Keine Überwachung von Bereichen mit erhöhter Privatsphäre (z.B. Sanitärräume, Umkleiden)</li>
                      <li>Öffentliche Gehwege und Straßen dürfen nur in engem Umfang miterfasst werden</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Zugriffsberechtigungen</AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Der Zugriff auf Videoaufzeichnungen muss streng reglementiert sein:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      <li>Zugriff nur für autorisierte Personen</li>
                      <li>Dokumentation der Zugriffe (Protokollierung)</li>
                      <li>Technische und organisatorische Maßnahmen zum Schutz vor unbefugtem Zugriff</li>
                      <li>Schulung des Personals zum datenschutzkonformen Umgang</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Wichtig für die Prüfung</AlertTitle>
            <AlertDescription>
              Bei Videoüberwachung sind die Informationspflichten nach Art. 13 DSGVO zu beachten. 
              Ein Hinweisschild muss die videoüberwachte Zone kennzeichnen und auf den Verantwortlichen
              sowie weitere Informationen (z.B. Kontakt zum Datenschutzbeauftragten) verweisen.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Praxiswissen */}
        <TabsContent value="praxis" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Datenschutz im Berufsalltag</h2>
            
            <p>
              Der Datenschutz spielt im Arbeitsalltag von Sicherheitsmitarbeitern eine wichtige Rolle.
              Die folgenden praktischen Beispiele veranschaulichen die korrekte Umsetzung der gesetzlichen
              Vorgaben.
            </p>
            
            <div className="mt-6 space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Fallbeispiel 1: Besucherverwaltung</CardTitle>
                  <CardDescription>Umgang mit Besucherdaten an der Pforte</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Als Sicherheitsmitarbeiter an der Pforte eines Unternehmens
                    erfassen Sie Daten von Besuchern (Name, Firma, Ausweisnummer, besuchte Person).
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Datenschutzkonforme Vorgehensweise:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Information der Besucher über die Datenerhebung (Aushang oder Hinweis)</li>
                      <li>Erhebung nur der tatsächlich erforderlichen Daten (Datensparsamkeit)</li>
                      <li>Keine Einsicht anderer Besucher in die Liste (z.B. durch Abdeckblatt)</li>
                      <li>Löschung der Daten nach Erfüllung des Zwecks (z.B. nach einem Monat)</li>
                      <li>Keine Weitergabe der Daten an unbefugte Dritte</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Typische Fehler:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Offene Besucherlisten, die von jedem eingesehen werden können</li>
                      <li>Übermäßige Datenerhebung (z.B. private Telefonnummern ohne Erforderlichkeit)</li>
                      <li>Unbefristete Aufbewahrung der Listen</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Fallbeispiel 2: Umgang mit Vorfallsdokumentation</CardTitle>
                  <CardDescription>Datenschutzkonforme Dokumentation von Vorfällen</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Sie müssen einen Vorfall dokumentieren, bei dem eine Person
                    unbefugt in einem Gebäude angetroffen wurde.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Datenschutzkonforme Vorgehensweise:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Sachliche Dokumentation nur der relevanten Fakten</li>
                      <li>Sichere Aufbewahrung des Vorfallberichts (verschlossener Schrank, Passwortschutz)</li>
                      <li>Weitergabe nur an autorisierte Personen (Vorgesetzte, ggf. Polizei)</li>
                      <li>Löschung nach gesetzlicher Aufbewahrungsfrist oder bei Zweckerfüllung</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Typische Fehler:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Unsachliche Bewertungen oder diskriminierende Äußerungen im Bericht</li>
                      <li>Anfertigung von Kopien für den privaten Gebrauch</li>
                      <li>Weitergabe von Informationen an unbefugte Dritte oder Presse</li>
                      <li>Veröffentlichung von Vorfällen in sozialen Medien</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Fallbeispiel 3: Videoüberwachung eines Parkplatzes</CardTitle>
                  <CardDescription>Rechtskonforme Einrichtung einer Videoüberwachung</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Ein Unternehmen möchte seinen Mitarbeiterparkplatz per
                    Videoüberwachung sichern. Sie sollen als Sicherheitsdienstleister dies umsetzen.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Datenschutzkonforme Vorgehensweise:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Prüfung der Erforderlichkeit (z.B. aufgrund vorangegangener Diebstähle)</li>
                      <li>Anbringung deutlich sichtbarer Hinweisschilder</li>
                      <li>Begrenzung des Überwachungsbereichs auf den Parkplatz (keine angrenzenden Gehwege)</li>
                      <li>Einrichtung einer automatischen Löschung nach 72 Stunden</li>
                      <li>Zugriffsbeschränkung auf autorisiertes Sicherheitspersonal</li>
                      <li>Information der Mitarbeiter über die Überwachung</li>
                    </ul>
                  </div>
                  <div className="text-sm">
                    <p className="mt-2 text-muted-foreground">
                      <strong>Hinweis:</strong> Der Betriebsrat ist bei der Videoüberwachung von Mitarbeitern zu beteiligen.
                    </p>
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
                <span><strong>Personenbezogene Daten:</strong> Alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>DSGVO:</strong> Datenschutz-Grundverordnung - EU-weites Datenschutzrecht seit 2018</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Verarbeitung:</strong> Jeder Vorgang im Zusammenhang mit personenbezogenen Daten (Erheben, Speichern, Verändern, Auslesen, Verbreiten usw.)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Datenschutzbeauftragter:</strong> Person, die in einem Unternehmen die Einhaltung des Datenschutzes überwacht</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Häufige Prüfungsfragen</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Was sind personenbezogene Daten? Nennen Sie Beispiele.</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Welche Grundprinzipien enthält Art. 5 DSGVO?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Welche Rechtsgrundlagen gibt es für die Verarbeitung personenbezogener Daten?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Was muss bei einer Videoüberwachung datenschutzrechtlich beachtet werden?</span>
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
            href="/blog/Sachkunde34a/BGB"
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
            href="https://dsgvo-gesetz.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>DSGVO im Volltext mit Erläuterungen</span>
          </a>
          
          <a
            href="https://www.bfdi.bund.de/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Bundesbeauftragter für den Datenschutz und die Informationsfreiheit</span>
          </a>
        </div>
      </div>
    </div>
  );
}

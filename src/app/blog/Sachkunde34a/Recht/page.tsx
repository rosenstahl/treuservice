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
  title: "Recht der öffentlichen Sicherheit und Ordnung | Sachkunde §34a",
  description: "Alles zum Thema Recht der öffentlichen Sicherheit und Ordnung für die Sachkundeprüfung §34a GewO",
};

export default function RechtPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-12">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <span>/</span>
          <span>Recht der öffentlichen Sicherheit und Ordnung</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Recht der öffentlichen Sicherheit und Ordnung</h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Grundlegende Kenntnisse zu Sicherheit und Ordnung, Polizei- und Ordnungsrecht sowie den wesentlichen Grundrechten
        </p>
      </div>

      {/* Überblick und Wichtigkeit */}
      <Alert className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Prüfungsrelevanz: Hoch</AlertTitle>
        <AlertDescription>
          Dieser Themenbereich macht etwa 15-20% der schriftlichen Prüfungsfragen aus und wird auch im mündlichen Teil häufig behandelt.
        </AlertDescription>
      </Alert>

      {/* Hauptinhalte mit Tabs */}
      <Tabs defaultValue="grundlagen" className="space-y-8">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="grundlagen">Grundlagen</TabsTrigger>
          <TabsTrigger value="gesetze">Gesetze & Normen</TabsTrigger>
          <TabsTrigger value="grundrechte">Grundrechte</TabsTrigger>
          <TabsTrigger value="praxis">Praxiswissen</TabsTrigger>
        </TabsList>
        
        {/* Grundlagen */}
        <TabsContent value="grundlagen" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Die Grundlagen des Sicherheitsrechts</h2>
            
            <p>
              Das Recht der öffentlichen Sicherheit und Ordnung bildet die rechtliche Basis für die Tätigkeit im Sicherheitsgewerbe. 
              Es definiert Befugnisse, Grenzen und Handlungsspielräume für Sicherheitsmitarbeiter.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Öffentliche Sicherheit</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Umfasst den Schutz der Rechtsordnung, der Rechte des Einzelnen und den Bestand des Staates und seiner Einrichtungen.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Öffentliche Ordnung</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Bezieht sich auf ungeschriebene Regeln für das Verhalten des Einzelnen in der Öffentlichkeit, deren Befolgung für ein geordnetes Zusammenleben notwendig ist.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Zentrale Begriffe</h3>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Subsidiaritätsprinzip</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Das Subsidiaritätsprinzip besagt, dass staatliches Handeln nur dann erfolgen soll, wenn private Akteure nicht in der Lage sind, eine Aufgabe zu erfüllen. Für das Sicherheitsgewerbe bedeutet dies:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Primäre Zuständigkeit der Polizei bei unmittelbaren Gefahren</li>
                    <li>Ergänzende Funktion privater Sicherheitsdienste</li>
                    <li>Klare Abgrenzung der Befugnisse zwischen staatlicher und privater Sicherheit</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Verhältnismäßigkeitsprinzip</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Das Verhältnismäßigkeitsprinzip verlangt, dass jede Maßnahme, die in Rechte eingreift:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Geeignet</strong> sein muss, um den angestrebten Zweck zu erreichen</li>
                    <li><strong>Erforderlich</strong> sein muss (kein milderes Mittel verfügbar)</li>
                    <li><strong>Angemessen</strong> sein muss (Verhältnis zwischen Eingriff und Zweck)</li>
                  </ul>
                  <p className="mt-2">
                    Für Sicherheitsmitarbeiter bedeutet dies, dass sie stets das mildeste Mittel wählen müssen, das zur Erreichung des Zwecks geeignet ist.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Gefahr und Störung</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Im rechtlichen Kontext unterscheidet man:
                  </p>
                  <div className="mt-2 space-y-2">
                    <div>
                      <p><strong>Gefahr:</strong> Sachlage, bei der im ungehinderten Ablauf des Geschehens ein Schaden für die öffentliche Sicherheit oder Ordnung eintreten würde.</p>
                      <p className="text-sm text-muted-foreground mt-1">Arten: Unmittelbare Gefahr, gegenwärtige Gefahr, erhebliche Gefahr, Gefahr im Verzug</p>
                    </div>
                    <div>
                      <p><strong>Störung:</strong> Bereits eingetretene Beeinträchtigung der öffentlichen Sicherheit oder Ordnung.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        {/* Gesetze und Normen */}
        <TabsContent value="gesetze" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Relevante Gesetze und Normen</h2>
            
            <p>
              Für das Sicherheitsgewerbe sind verschiedene Rechtsquellen von Bedeutung. Die wichtigsten sind:
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Grundgesetz (GG)
                </h3>
                <p className="text-sm mb-3">
                  Das Grundgesetz bildet die verfassungsrechtliche Grundlage und definiert die Grundrechte, die auch im Sicherheitsgewerbe zu beachten sind.
                </p>
                <div className="text-sm bg-muted p-3 rounded">
                  <strong>Prüfungsrelevant:</strong>
                  <ul className="list-disc list-inside mt-1">
                    <li>Art. 1 GG: Menschenwürde</li>
                    <li>Art. 2 GG: Allgemeines Persönlichkeitsrecht, körperliche Unversehrtheit</li>
                    <li>Art. 13 GG: Unverletzlichkeit der Wohnung</li>
                    <li>Art. 14 GG: Eigentum</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Polizei- und Ordnungsgesetze der Länder
                </h3>
                <p className="text-sm mb-3">
                  Die Polizeigesetze der Bundesländer regeln die Aufgaben und Befugnisse der Polizei. Sie sind für Sicherheitsmitarbeiter wichtig, um die Abgrenzung zwischen polizeilichen und privaten Sicherheitsaufgaben zu verstehen.
                </p>
                <div className="text-sm bg-muted p-3 rounded">
                  <strong>Prüfungsrelevant:</strong>
                  <ul className="list-disc list-inside mt-1">
                    <li>Polizeiliche Generalklausel</li>
                    <li>Standardmaßnahmen (Identitätsfeststellung, Durchsuchung, Beschlagnahme)</li>
                    <li>Unmittelbarer Zwang</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Gewerbeordnung und Bewachungsverordnung
                </h3>
                <p className="text-sm mb-3">
                  § 34a GewO und die Bewachungsverordnung bilden die gewerberechtliche Grundlage für das Sicherheitsgewerbe und definieren die Anforderungen an Sicherheitsunternehmen und -mitarbeiter.
                </p>
                <div className="text-sm bg-muted p-3 rounded">
                  <strong>Prüfungsrelevant:</strong>
                  <ul className="list-disc list-inside mt-1">
                    <li>Erlaubnispflicht nach § 34a GewO</li>
                    <li>Zuverlässigkeits- und Sachkundevoraussetzungen</li>
                    <li>Unterrichtungs- und Nachweispflichten</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Grundrechte */}
        <TabsContent value="grundrechte" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Grundrechte im Sicherheitskontext</h2>
            
            <p>
              Grundrechte sind für Sicherheitsmitarbeiter besonders wichtig, da ihre Tätigkeit oft an der Grenze zu Grundrechtseingriffen stattfindet. 
              Die Kenntnis der Grundrechte und ihrer Grenzen ist daher essentiell.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Art. 1 und 2 GG</Badge>
                  <CardTitle className="text-base">Menschenwürde und allgemeines Persönlichkeitsrecht</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Die Menschenwürde ist unantastbar und zu achten. Das allgemeine Persönlichkeitsrecht schützt die persönliche Entfaltung.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Praxisrelevanz:</strong> Respektvoller Umgang, Verhältnismäßigkeit bei Kontrollen, Achtung der Privatsphäre
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Art. 2 Abs. 2 GG</Badge>
                  <CardTitle className="text-base">Recht auf körperliche Unversehrtheit</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Jeder hat das Recht auf Leben und körperliche Unversehrtheit. Eingriffe sind nur auf gesetzlicher Grundlage zulässig.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Praxisrelevanz:</strong> Grenzen bei körperlicher Gewalt, Notwehr, Festhalterecht
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Art. 13 GG</Badge>
                  <CardTitle className="text-base">Unverletzlichkeit der Wohnung</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Die Wohnung ist unverletzlich. Durchsuchungen dürfen nur durch Richter, bei Gefahr im Verzug auch durch andere gesetzlich bestimmte Organe angeordnet werden.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Praxisrelevanz:</strong> Betreten von Wohnungen, Hausrecht, Zutrittskontrollen
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Art. 14 GG</Badge>
                  <CardTitle className="text-base">Eigentumsrecht</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Eigentum und Erbrecht werden gewährleistet. Eigentum verpflichtet; sein Gebrauch soll zugleich dem Wohle der Allgemeinheit dienen.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Praxisrelevanz:</strong> Eigentumsschutz, Hausrecht des Eigentümers, Besitzschutz
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Wichtig für die Prüfung</AlertTitle>
            <AlertDescription>
              In der Prüfung werden häufig Fallbeispiele gegeben, bei denen Sie beurteilen müssen, ob ein Grundrechtseingriff vorliegt und ob dieser gerechtfertigt ist. Achten Sie besonders auf die Verhältnismäßigkeit von Maßnahmen!
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Praxiswissen */}
        <TabsContent value="praxis" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Praxiswissen für den Berufsalltag</h2>
            
            <p>
              Die rechtlichen Grundlagen müssen im Berufsalltag praktisch angewendet werden. 
              Die folgenden Fallbeispiele zeigen typische Situationen und die rechtlich korrekten Handlungsweisen.
            </p>
            
            <div className="mt-6 space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Fallbeispiel 1: Zutrittskontrolle</CardTitle>
                  <CardDescription>Verweigerung des Zutritts zu einer Veranstaltung</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Ein Besucher möchte eine Veranstaltung in einem Club besuchen, der Türsteher verweigert den Zutritt.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Rechtliche Bewertung:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Grundlage: Hausrecht des Veranstalters/Betreibers (§ 903 BGB)</li>
                      <li>Der Sicherheitsmitarbeiter übt das Hausrecht im Auftrag des Inhabers aus</li>
                      <li>Zutrittsverbot grundsätzlich zulässig, ABER: keine Diskriminierung (AGG)</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Korrekte Vorgehensweise:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Höfliche, aber bestimmte Kommunikation</li>
                      <li>Sachliche Begründung (z.B. Überfüllung, Hausordnung)</li>
                      <li>Keine diskriminierenden Gründe (Hautfarbe, Herkunft, etc.)</li>
                      <li>Bei Eskalation: Deeskalationstechniken anwenden</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Fallbeispiel 2: Ladendiebstahl</CardTitle>
                  <CardDescription>Festhalten eines Ladendiebs</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Ein Kunde wird beim Diebstahl in einem Kaufhaus beobachtet. Der Sicherheitsmitarbeiter soll eingreifen.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Rechtliche Bewertung:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Grundlage: Vorläufige Festnahme nach § 127 StPO ("Jedermannsrecht")</li>
                      <li>Voraussetzungen: Ertappen auf frischer Tat oder Verfolgung und Fluchtgefahr oder unbekannte Identität</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Korrekte Vorgehensweise:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Person ansprechen und zum Mitgehen auffordern</li>
                      <li>Bei Weigerung: Verhältnismäßige Zwangsmaßnahmen (z.B. Festhalten)</li>
                      <li>Umgehende Übergabe an die Polizei</li>
                      <li>Keine eigenmächtige Durchsuchung (außer mit Einwilligung)</li>
                      <li>Dokumentation des Vorfalls</li>
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
                <span><strong>Öffentliche Sicherheit:</strong> Schutz der Rechtsordnung, individueller Rechtsgüter und staatlicher Einrichtungen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Öffentliche Ordnung:</strong> Ungeschriebene Regeln für das gesellschaftliche Zusammenleben</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Grundrechte:</strong> Verfassungsmäßig garantierte Rechte (Menschenwürde, Persönlichkeitsrecht, etc.)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Verhältnismäßigkeit:</strong> Geeignetheit, Erforderlichkeit und Angemessenheit von Maßnahmen</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Häufige Prüfungsfragen</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Definieren Sie den Begriff der öffentlichen Sicherheit.</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Welche Grundrechte sind bei der Kontrolle von Personen zu beachten?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Erläutern Sie das Verhältnismäßigkeitsprinzip anhand eines Beispiels.</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Was ist der Unterschied zwischen Gefahr und Störung?</span>
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
            href="/blog/Sachkunde34a/Gewerberecht"
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
            href="https://www.gesetze-im-internet.de/gg/BJNR000010949.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Grundgesetz (GG) im Volltext</span>
          </a>
          
          <a
            href="https://www.ihk.de"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>IHK Informationen zur Sachkundeprüfung</span>
          </a>
        </div>
      </div>
    </div>
  );
}

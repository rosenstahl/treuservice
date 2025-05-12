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
  title: "Gewerberecht | Sachkunde §34a",
  description: "Alles zum Thema Gewerberecht für die Sachkundeprüfung §34a GewO - Wichtige Gesetze, Verordnungen und Pflichten",
};

export default function GewerberechtPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-12">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <span>/</span>
          <span>Gewerberecht</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Gewerberecht im Sicherheitsgewerbe</h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Die rechtlichen Grundlagen für die Tätigkeit im Bewachungsgewerbe mit Fokus auf §34a GewO und die Bewachungsverordnung
        </p>
      </div>

      {/* Überblick und Wichtigkeit */}
      <Alert className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Prüfungsrelevanz: Sehr Hoch</AlertTitle>
        <AlertDescription>
          Dieser Themenbereich ist zentraler Bestandteil der §34a-Sachkundeprüfung und macht etwa 20-25% der schriftlichen Prüfungsfragen aus.
        </AlertDescription>
      </Alert>

      {/* Hauptinhalte mit Tabs */}
      <Tabs defaultValue="gewo" className="space-y-8">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="gewo">§34a GewO</TabsTrigger>
          <TabsTrigger value="bewachv">Bewachungsverordnung</TabsTrigger>
          <TabsTrigger value="pflichten">Pflichten</TabsTrigger>
          <TabsTrigger value="praxis">Praxiswissen</TabsTrigger>
        </TabsList>
        
        {/* §34a GewO */}
        <TabsContent value="gewo" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">§34a Gewerbeordnung - Die Grundlage</h2>
            
            <p>
              Der §34a der Gewerbeordnung (GewO) regelt die Bewachung fremden Lebens oder Eigentums 
              als gewerbliche Tätigkeit. Er bildet die gesetzliche Grundlage für das Bewachungsgewerbe 
              und legt fest, unter welchen Voraussetzungen diese Tätigkeit ausgeübt werden darf.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Erlaubnispflicht</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Wer gewerbsmäßig Leben oder Eigentum fremder Personen bewachen will, benötigt eine behördliche Erlaubnis.
                    Diese wird von der zuständigen Behörde (in der Regel Gewerbeamt/Ordnungsamt) erteilt.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Sachkundeprüfung</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Für bestimmte Bewachungstätigkeiten ist eine Sachkundeprüfung vor der Industrie- und Handelskammer (IHK) erforderlich.
                    Für andere Tätigkeiten reicht eine Unterrichtung nach §3 BewachV.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Wann ist die Sachkundeprüfung erforderlich?</h3>
            
            <p className="text-sm text-muted-foreground">
              Nach §34a Abs. 1 Satz 3 Nr. 1-4 GewO ist die Sachkundeprüfung für folgende Tätigkeiten erforderlich:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Kontroll- und Streifentätigkeiten</h4>
                  <p className="text-sm text-muted-foreground">
                    Im öffentlichen Verkehrsraum oder in Hausrechtsbereichen mit tatsächlich öffentlichem Verkehr
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Schutz im Einlassbereich</h4>
                  <p className="text-sm text-muted-foreground">
                    Von gastgewerblichen Diskotheken mit Gewinnerzielungsabsicht
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Bewachung von Flüchtlingsunterkünften</h4>
                  <p className="text-sm text-muted-foreground">
                    Schutz von Asylbewerberheimen und sonstigen Flüchtlingsunterkünften
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Schutz von Großveranstaltungen</h4>
                  <p className="text-sm text-muted-foreground">
                    Bewachung von zugangsgeschützten Großveranstaltungen mit mehr als 5.000 Besuchern
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p className="text-sm">
                <strong>Beachte:</strong> Für andere Bewachungstätigkeiten (z.B. einfacher Objektschutz) 
                reicht in der Regel die Unterrichtung nach §3 BewachV aus.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Voraussetzungen für die Erlaubniserteilung</h3>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Zuverlässigkeit</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Die Zuverlässigkeit ist eine zentrale Voraussetzung für die Erlaubniserteilung. Sie fehlt in der Regel bei:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Verurteilungen wegen Vorsatzstraftaten</li>
                    <li>Mitgliedschaft in verfassungsfeindlichen Organisationen</li>
                    <li>Schweren oder wiederholten Verstößen gegen gewerberechtliche Vorschriften</li>
                    <li>Übermäßigem Alkohol- oder Drogenkonsum</li>
                  </ul>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Die Behörde prüft die Zuverlässigkeit anhand von Führungszeugnis, Gewerbezentralregisterauszug 
                    und ggf. Auskünften des Verfassungsschutzes.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Sachkunde</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Die erforderliche Sachkunde wird durch eine erfolgreich abgelegte Sachkundeprüfung vor der IHK nachgewiesen.
                    Diese umfasst sowohl einen schriftlichen als auch einen mündlichen Teil.
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>Prüfungsinhalte:</strong>
                  </p>
                  <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                    <li>Recht der öffentlichen Sicherheit und Ordnung</li>
                    <li>Gewerberecht</li>
                    <li>Datenschutzrecht</li>
                    <li>Bürgerliches Gesetzbuch</li>
                    <li>Straf- und Strafverfahrensrecht</li>
                    <li>Umgang mit Waffen und Verteidigungsmitteln</li>
                    <li>Unfallverhütungsvorschriften</li>
                    <li>Umgang mit Menschen (Deeskalation)</li>
                    <li>Sicherheitstechnik</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Geordnete Vermögensverhältnisse</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Geordnete Vermögensverhältnisse sind eine weitere Voraussetzung für die Erlaubniserteilung.
                    Diese liegen in der Regel nicht vor bei:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Eröffnung eines Insolvenzverfahrens</li>
                    <li>Abgabe der Vermögensauskunft (früher: eidesstattliche Versicherung)</li>
                    <li>Erheblichen Steuerrückständen</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Haftpflichtversicherung</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Der Antragsteller muss eine Haftpflichtversicherung zur Deckung von Personen- und Sachschäden abgeschlossen haben.
                    Diese muss folgende Mindestversicherungssummen aufweisen:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>1.000.000 Euro für Personenschäden</li>
                    <li>500.000 Euro für Sachschäden</li>
                    <li>100.000 Euro für das Abhandenkommen bewachter Sachen</li>
                  </ul>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Der Versicherungsschutz muss während der gesamten Dauer der gewerblichen Tätigkeit bestehen.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        {/* Bewachungsverordnung */}
        <TabsContent value="bewachv" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Die Bewachungsverordnung (BewachV)</h2>
            
            <p>
              Die Bewachungsverordnung konkretisiert die Vorgaben des §34a GewO und regelt Details
              zur Ausübung des Bewachungsgewerbes. Sie enthält Vorschriften zu Unterrichtung, Sachkunde,
              Zuverlässigkeitsüberprüfung und weiteren Pflichten von Gewerbetreibenden und ihren Beschäftigten.
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Unterrichtung nach §3 BewachV
                </h3>
                <p className="text-sm mb-3">
                  Für einfache Bewachungstätigkeiten (z.B. Objektschutz) ist eine Unterrichtung
                  bei der IHK notwendig. Diese umfasst 40 Stunden theoretischen Unterricht zu den
                  prüfungsrelevanten Themen in vereinfachter Form.
                </p>
                <div className="text-sm bg-muted p-3 rounded">
                  <strong>Wichtig:</strong>
                  <ul className="list-disc list-inside mt-1">
                    <li>Die Unterrichtung ist keine Prüfung (reiner Besuch ausreichend)</li>
                    <li>Ein Nachweis über die Teilnahme muss dem Arbeitgeber vorgelegt werden</li>
                    <li>Der Nachweis berechtigt nicht zur Ausübung erlaubnispflichtiger Bewachungstätigkeiten</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Bewacherausweis nach §11 BewachV
                </h3>
                <p className="text-sm mb-3">
                  Jeder Gewerbetreibende und jeder Beschäftigte im Bewachungsgewerbe muss
                  bei der Ausübung der Tätigkeit einen Bewacherausweis mit sich führen.
                </p>
                <div className="text-sm bg-muted p-3 rounded">
                  <strong>Pflichtangaben auf dem Ausweis:</strong>
                  <ul className="list-disc list-inside mt-1">
                    <li>Bezeichnung "Bewachungsgewerbe"</li>
                    <li>Name und Anschrift des Gewerbetreibenden</li>
                    <li>Vor- und Nachname des Ausweisinhabers</li>
                    <li>Aktuelle Lichtbild des Ausweisinhabers</li>
                    <li>Ausstellungsdatum und Gültigkeit (max. 5 Jahre)</li>
                    <li>Hinweis auf Befugnisse (keine hoheitlichen Befugnisse)</li>
                  </ul>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Zuverlässigkeitsüberprüfung nach §9 BewachV
                </h3>
                <p className="text-sm mb-3">
                  Vor Beschäftigungsbeginn und danach mindestens alle fünf Jahre muss
                  der Gewerbetreibende die Zuverlässigkeit seiner Beschäftigten überprüfen.
                </p>
                <div className="text-sm bg-muted p-3 rounded">
                  <strong>Erforderliche Nachweise:</strong>
                  <ul className="list-disc list-inside mt-1">
                    <li>Führungszeugnis (bei bestimmten Tätigkeiten: erweitertes Führungszeugnis)</li>
                    <li>Auskunft aus dem Gewerbezentralregister</li>
                    <li>Bei sensiblen Tätigkeiten: Auskunft der Verfassungsschutzbehörde</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Pflichten */}
        <TabsContent value="pflichten" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Pflichten im Bewachungsgewerbe</h2>
            
            <p>
              Sowohl Gewerbetreibende als auch ihre Beschäftigten im Bewachungsgewerbe
              unterliegen zahlreichen gesetzlichen Pflichten. Diese dienen der Sicherstellung
              einer ordnungsgemäßen Durchführung der Bewachungstätigkeit.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">§12 BewachV</Badge>
                  <CardTitle className="text-base">Dokumentationspflichten</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Der Gewerbetreibende muss ein Wachbuch oder elektronisches Verzeichnis führen,
                    in dem Aufträge, eingesetzte Beschäftigte und besondere Vorkommnisse
                    dokumentiert werden.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Mindestinhalt:</strong> Auftraggeber, Einsatzort, Einsatzzeit, eingesetzte Beschäftigte,
                    besondere Vorkommnisse (z.B. Straftaten, Notfälle)
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">§13 BewachV</Badge>
                  <CardTitle className="text-base">Anzeigepflichten</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Der Einsatz von Waffen, Hunden und die Beschäftigung von neuem Personal
                    muss der zuständigen Behörde angezeigt werden.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Fristen:</strong> Einsatz von Waffen/Hunden: vorher anzeigen,
                    neue Beschäftigte: innerhalb eines Monats melden
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">§9 BewachV</Badge>
                  <CardTitle className="text-base">Führung und Aufbewahrung von Unterlagen</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Für jeden Beschäftigten müssen Unterlagen geführt und aufbewahrt werden,
                    aus denen die Zuverlässigkeitsüberprüfung hervorgeht.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Aufbewahrungsdauer:</strong> Mindestens für die Dauer der Beschäftigung
                    plus 3 Jahre nach Beschäftigungsende
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">§6 BewachV</Badge>
                  <CardTitle className="text-base">Fortbildungspflicht</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Gewerbetreibende und Beschäftigte müssen sich regelmäßig fortbilden,
                    um auf dem aktuellen Stand von Recht und Praxis zu bleiben.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Umfang:</strong> Mindestens 8 Stunden Fortbildung innerhalb
                    von 2 Jahren (ab 1.1.2024)
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Wichtig für die Prüfung</AlertTitle>
            <AlertDescription>
              Die Missachtung der gesetzlichen Pflichten im Bewachungsgewerbe kann zum Widerruf
              der Erlaubnis führen und ist teilweise bußgeldbewehrt. Achten Sie besonders auf
              den Bewacherausweis und die Zuverlässigkeitsüberprüfung!
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Praxiswissen */}
        <TabsContent value="praxis" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Praxiswissen für den Berufsalltag</h2>
            
            <p>
              Die Kenntnis der rechtlichen Grundlagen muss im beruflichen Alltag praktisch
              angewendet werden. Die folgenden Fallbeispiele zeigen typische Situationen und
              die rechtlich korrekten Handlungsweisen.
            </p>
            
            <div className="mt-6 space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Fallbeispiel 1: Bewacherausweis</CardTitle>
                  <CardDescription>Umgang mit dem Bewacherausweis im Dienst</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Ein Sicherheitsmitarbeiter beginnt seinen Dienst
                    in einem Einkaufszentrum und stellt fest, dass er seinen Bewacherausweis vergessen hat.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Rechtliche Bewertung:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Nach §11 BewachV muss der Ausweis bei der Tätigkeit mitgeführt werden</li>
                      <li>Das Fehlen des Ausweises stellt eine Ordnungswidrigkeit dar</li>
                      <li>Der Mitarbeiter darf ohne Ausweis nicht im Bewachungsgewerbe tätig werden</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Korrekte Vorgehensweise:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Sofortige Information des Arbeitgebers/Vorgesetzten</li>
                      <li>Kein Antritt des Dienstes ohne Bewacherausweis</li>
                      <li>Gegebenenfalls Beschaffung eines Ersatzausweises oder Ablösung durch anderen Mitarbeiter</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Fallbeispiel 2: Neue Beschäftigung</CardTitle>
                  <CardDescription>Einstellung eines neuen Mitarbeiters</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Ein Bewachungsunternehmen stellt einen neuen
                    Mitarbeiter für den Objektschutz ein.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Rechtliche Pflichten des Arbeitgebers:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Prüfung der Zuverlässigkeit anhand von Führungszeugnis und Auskunft aus dem Gewerbezentralregister</li>
                      <li>Sicherstellung, dass der Mitarbeiter eine Unterrichtung nach §3 BewachV nachweisen kann</li>
                      <li>Ausstellung eines Bewacherausweises</li>
                      <li>Anzeige der Beschäftigung bei der zuständigen Behörde innerhalb eines Monats</li>
                      <li>Führung und Aufbewahrung entsprechender Unterlagen</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Folgen bei Missachtung:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Bußgelder nach §144 GewO bzw. §17 BewachV</li>
                      <li>Bei schwerwiegenden oder wiederholten Verstößen: Widerruf der Erlaubnis</li>
                      <li>Zivilrechtliche Haftung bei Schäden durch ungeeignetes Personal</li>
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
                <span><strong>§34a GewO:</strong> Gesetzliche Grundlage für das Bewachungsgewerbe, regelt Erlaubnispflicht und Voraussetzungen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Bewachungsverordnung (BewachV):</strong> Konkretisiert die Vorgaben des §34a GewO in Detailfragen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Unterrichtung:</strong> 40-stündige Schulung für einfache Bewachungstätigkeiten (ohne Prüfung)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Sachkundeprüfung:</strong> Nachweis der fachlichen Qualifikation für spezielle Tätigkeiten (mit Prüfung)</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Häufige Prüfungsfragen</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Für welche Tätigkeiten ist eine Sachkundeprüfung nach §34a GewO erforderlich?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Welche Pflichtangaben muss ein Bewacherausweis enthalten?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Wie oft muss die Zuverlässigkeit der Beschäftigten überprüft werden?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Welche Nachweise müssen für die Erlaubniserteilung nach §34a GewO erbracht werden?</span>
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
            href="/blog/Sachkunde34a/Datenschutz"
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
            href="https://www.gesetze-im-internet.de/gewo/__34a.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>§34a GewO im Volltext</span>
          </a>
          
          <a
            href="https://www.gesetze-im-internet.de/bewachv_2019/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Bewachungsverordnung im Volltext</span>
          </a>
        </div>
      </div>
    </div>
  );
}

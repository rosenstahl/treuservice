import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, BookOpen, AlertTriangle, CheckCircle, HelpCircle, MousePointer, ExternalLink, FileText, AlertCircle, Lightbulb } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Umgang mit Menschen und Deeskalation | Sachkunde §34a",
  description: "Kommunikation, Konfliktmanagement und Deeskalationstechniken für die Sachkundeprüfung §34a GewO - Praktische Strategien für Sicherheitspersonal",
};

export default function DeeskalationPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-12">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <span>/</span>
          <span>Umgang mit Menschen und Deeskalation</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Umgang mit Menschen und Deeskalation</h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Kommunikation, Konfliktbewältigung und Deeskalationsstrategien für Sicherheitsmitarbeiter
        </p>
      </div>

      {/* Überblick und Wichtigkeit */}
      <Alert className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Prüfungsrelevanz: Hoch</AlertTitle>
        <AlertDescription>
          Dieser Themenbereich macht etwa 15-20% der schriftlichen Prüfungsfragen aus und ist ein wichtiger Teil der mündlichen Prüfung. 
          Die praktische Anwendung von Deeskalationstechniken ist im Sicherheitsgewerbe von zentraler Bedeutung für konfliktarme Einsätze.
        </AlertDescription>
      </Alert>

      {/* Hauptinhalte mit Tabs */}
      <Tabs defaultValue="grundlagen" className="space-y-8">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="grundlagen">Grundlagen</TabsTrigger>
          <TabsTrigger value="deeskalation">Deeskalation</TabsTrigger>
          <TabsTrigger value="kommunikation">Kommunikation</TabsTrigger>
          <TabsTrigger value="praxis">Praxisbeispiele</TabsTrigger>
        </TabsList>
        
        {/* Grundlagen */}
        <TabsContent value="grundlagen" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Grundlagen des Umgangs mit Menschen</h2>
            
            <p>
              Für Sicherheitsmitarbeiter ist der professionelle Umgang mit Menschen eine Kernkompetenz.
              Die richtige Kommunikation und das Verständnis menschlicher Verhaltensweisen sind entscheidend 
              für die erfolgreiche Bewältigung der täglichen Aufgaben.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Bedeutung im Sicherheitsgewerbe</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Sicherheitsmitarbeiter interagieren täglich mit einer Vielzahl von Menschen in unterschiedlichen Situationen:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Kontrolle von Personen (Einlasskontrollen, Zugangskontrollen)</li>
                    <li>Durchsetzung von Hausrecht und Vorschriften</li>
                    <li>Konfliktbewältigung (Streitigkeiten, Regelverstöße)</li>
                    <li>Hilfeleistung und Unterstützung (Notfälle, Orientierungshilfe)</li>
                    <li>Zusammenarbeit mit Kunden, Besuchern und anderen Dienstleistern</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Anforderungen an Sicherheitsmitarbeiter</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Für den erfolgreichen Umgang mit Menschen sind folgende Eigenschaften wichtig:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Kommunikationsfähigkeit (verbal und nonverbal)</li>
                    <li>Empathie und emotionale Intelligenz</li>
                    <li>Konfliktfähigkeit und Stressresistenz</li>
                    <li>Geduld und Selbstbeherrschung</li>
                    <li>Interkulturelle Kompetenz</li>
                    <li>Durchsetzungsvermögen und Autorität</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Konfliktursachen und -dynamik</h3>
            
            <p className="text-sm text-muted-foreground">
              Um Konflikte erfolgreich zu bewältigen, ist es wichtig, ihre Ursachen und Dynamik zu verstehen.
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Typische Konfliktursachen</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Konflikte im Sicherheitsgewerbe entstehen häufig aufgrund folgender Faktoren:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li><strong>Missverständnisse:</strong> Unklare Kommunikation oder falsche Interpretation von Regeln</li>
                    <li><strong>Interessenkonflikte:</strong> Widersprüchliche Ziele und Bedürfnisse</li>
                    <li><strong>Machtkonstellationen:</strong> Gefühl der Unterlegenheit oder Provokation durch Autoritäten</li>
                    <li><strong>Emotionale Faktoren:</strong> Stress, Angst, Frustration, Alkohol- oder Drogeneinfluss</li>
                    <li><strong>Kulturelle Unterschiede:</strong> Verschiedene Wertvorstellungen und Verhaltensweisen</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Eskalationsstufen nach Glasl</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Das Eskalationsmodell nach Friedrich Glasl beschreibt die Steigerung eines Konflikts in neun Stufen. 
                    Für Sicherheitsmitarbeiter sind besonders die ersten fünf Stufen relevant:
                  </p>
                  <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                    <li><strong>Verhärtung:</strong> Standpunkte prallen aufeinander, Spannung entsteht</li>
                    <li><strong>Debatte:</strong> Polarisierung im Denken, verbale Konfrontation</li>
                    <li><strong>Taten statt Worte:</strong> Reden hilft nicht mehr, Empathie geht verloren</li>
                    <li><strong>Images/Koalitionen:</strong> Suche nach Verbündeten, Stereotypisierung</li>
                    <li><strong>Gesichtsverlust:</strong> Öffentliche Angriffe, Bloßstellung</li>
                  </ol>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Je früher ein Konflikt erkannt wird, desto leichter ist die Deeskalation. Ab Stufe 3 wird es 
                    zunehmend schwieriger, den Konflikt friedlich zu lösen.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Aggressionsformen</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Aggression kann sich in verschiedenen Formen äußern:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="text-sm border p-2 rounded">
                      <p className="font-medium">Verbale Aggression</p>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                        <li>Beleidigungen und Beschimpfungen</li>
                        <li>Drohungen und Einschüchterungen</li>
                        <li>Lautstarkes Schreien</li>
                        <li>Abwertende Äußerungen</li>
                      </ul>
                    </div>
                    <div className="text-sm border p-2 rounded">
                      <p className="font-medium">Nonverbale Aggression</p>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                        <li>Bedrohliche Gestik (geballte Fäuste)</li>
                        <li>Eindringen in die persönliche Zone</li>
                        <li>Aggressiver Gesichtsausdruck</li>
                        <li>Provokatives Verhalten</li>
                      </ul>
                    </div>
                    <div className="text-sm border p-2 rounded">
                      <p className="font-medium">Körperliche Aggression</p>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                        <li>Stoßen und Schubsen</li>
                        <li>Schlagen und Treten</li>
                        <li>Werfen von Gegenständen</li>
                        <li>Einsatz von Waffen</li>
                      </ul>
                    </div>
                    <div className="text-sm border p-2 rounded">
                      <p className="font-medium">Passive Aggression</p>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                        <li>Verweigerung der Kooperation</li>
                        <li>Sabotage von Abläufen</li>
                        <li>Ignorieren von Anweisungen</li>
                        <li>Verdeckte Provokation</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Emotionale Zustände und Auslöser</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Verschiedene emotionale Zustände können zu konfliktträchtigem Verhalten führen:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li><strong>Angst und Unsicherheit:</strong> Defensive oder überreaktive Verhaltensweisen</li>
                    <li><strong>Frustration:</strong> Enttäuschung über nicht erfüllte Erwartungen</li>
                    <li><strong>Wut:</strong> Starke emotionale Reaktion auf tatsächliche oder empfundene Ungerechtigkeit</li>
                    <li><strong>Schmerz:</strong> Physisches oder psychisches Leid kann Aggression fördern</li>
                    <li><strong>Kontrollverlust:</strong> Gefühl der Ohnmacht oder Hilflosigkeit</li>
                  </ul>
                  <div className="mt-2 bg-muted/50 p-2 rounded">
                    <p className="text-xs">
                      <strong>Besondere Auslöser:</strong> Alkohol- oder Drogenkonsum, psychische Erkrankungen, 
                      extreme Stresssituationen und gruppendynamische Prozesse können die Eskalationsgefahr deutlich erhöhen.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        {/* Deeskalation */}
        <TabsContent value="deeskalation" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Deeskalationsstrategien</h2>
            
            <p>
              Deeskalation bezeichnet alle Maßnahmen, die zur Beruhigung einer angespannten 
              oder konfliktgeladenen Situation beitragen. Das Ziel ist, eine gewaltfreie Lösung 
              zu finden und die Situation zu entschärfen.
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-blue-600" />
                  Grundprinzipien der Deeskalation
                </h3>
                <div className="text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">1</Badge>
                    <div>
                      <p className="font-medium">Eigene Ruhe bewahren</p>
                      <p className="text-muted-foreground">Selbstkontrolle, ruhige Atmung, neutrale Körperhaltung und Stimmlage</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">2</Badge>
                    <div>
                      <p className="font-medium">Sicherheit priorisieren</p>
                      <p className="text-muted-foreground">Eigenschutz geht vor, angemessenen Sicherheitsabstand halten, Fluchtweg sichern</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">3</Badge>
                    <div>
                      <p className="font-medium">Respektvoller Umgang</p>
                      <p className="text-muted-foreground">Wertschätzende Haltung auch in Konfliktsituationen, keine Demütigung oder Bloßstellung</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">4</Badge>
                    <div>
                      <p className="font-medium">Aktives Zuhören</p>
                      <p className="text-muted-foreground">Aufmerksam zuhören, Aussagen zusammenfassen, Verständnis signalisieren</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">5</Badge>
                    <div>
                      <p className="font-medium">Sachlichkeit bewahren</p>
                      <p className="text-muted-foreground">Faktenorientiert bleiben, Emotionen nicht persönlich nehmen, objektiv argumentieren</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Konkrete Deeskalationstechniken
                </h3>
                <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <Card className="border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Verbale Techniken</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Umleiten:</strong> Thema oder Ort wechseln, um Distanz zu schaffen</li>
                        <li><strong>Ich-Botschaften:</strong> "Ich verstehe, dass Sie verärgert sind"</li>
                        <li><strong>Verständnisfragen:</strong> "Können Sie mir erklären, was genau Sie stört?"</li>
                        <li><strong>Perspektivwechsel anregen:</strong> "Stellen Sie sich vor, Sie wären in meiner Position"</li>
                        <li><strong>Gemeinsame Interessen betonen:</strong> "Wir beide wollen eine Lösung finden"</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Nonverbale Techniken</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Sicherheitsabstand:</strong> Mindestens Armlänge (1,5-2 Meter)</li>
                        <li><strong>Offene Körperhaltung:</strong> Keine verschränkten Arme, leichte Seitenstellung</li>
                        <li><strong>Blickkontakt:</strong> Nicht starren, aber aufmerksam zuwenden</li>
                        <li><strong>Ruhige Gestik:</strong> Langsame, kontrollierte Bewegungen</li>
                        <li><strong>Entspannte Mimik:</strong> Neutrale bis freundliche Gesichtsausdrücke</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Strategien für unterschiedliche Eskalationsstufen</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Frühe Phase:</strong> Offene Fragen, aktives Zuhören, Verständnis signalisieren</li>
                        <li><strong>Mittlere Phase:</strong> Klare Grenzen setzen, Optionen anbieten, Ausweichmöglichkeiten schaffen</li>
                        <li><strong>Fortgeschrittene Phase:</strong> Konsequenzen aufzeigen, Unterstützung holen, räumliche Trennung herbeiführen</li>
                      </ul>
                      <p className="text-muted-foreground mt-1">
                        Je früher deeskalierend eingegriffen wird, desto höher die Erfolgsaussichten!
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">LART-Prinzip</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p>Eine praktische Gedächtnisstütze für die Deeskalation:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>L</strong>okalisieren: Konflikt räumlich eingrenzen</li>
                        <li><strong>A</strong>nsprechen: Kontakt aufnehmen und Gespräch beginnen</li>
                        <li><strong>R</strong>uhig bleiben: Eigene Emotionen kontrollieren</li>
                        <li><strong>T</strong>rennen: Bei Bedarf Konfliktparteien räumlich trennen</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Umgang mit besonderen Personengruppen
                </h3>
                <p className="text-sm mb-3">
                  Je nach Personengruppe sind spezifische Deeskalationsansätze erforderlich:
                </p>
                <div className="text-sm space-y-3">
                  <div>
                    <p className="font-medium">Alkoholisierte oder drogenintoxikierte Personen</p>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                      <li>Einfache, klare Sprache verwenden</li>
                      <li>Mehr Zeit für Reaktionen einräumen</li>
                      <li>Weniger auf verbale Aussagen, mehr auf Verhalten achten</li>
                      <li>Größeren Sicherheitsabstand halten</li>
                      <li>Bei Bedarf frühzeitig Verstärkung hinzuziehen</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium">Psychisch auffällige Personen</p>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                      <li>Besonders ruhig und vorhersehbar handeln</li>
                      <li>Reizüberflutung vermeiden (ruhige Umgebung suchen)</li>
                      <li>Keine Diskussionen über Wahnvorstellungen oder Halluzinationen</li>
                      <li>Bei Eigen- oder Fremdgefährdung professionelle Hilfe hinzuziehen</li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium">Gruppen</p>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                      <li>Meinungsführer identifizieren und gezielt ansprechen</li>
                      <li>Einzelne aus der Gruppe herauslösen für Gespräche</li>
                      <li>Gruppendynamik berücksichtigen (Gesichtsverlust vermeiden)</li>
                      <li>Ausreichend Personal für die Situation bereitstellen</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Wichtig für die Prüfung</AlertTitle>
            <AlertDescription>
              Deeskalation hat immer Vorrang vor körperlichen Eingriffen! Physische Maßnahmen sind nur als letztes 
              Mittel einzusetzen, wenn alle Deeskalationsversuche gescheitert sind und eine konkrete Gefahr abgewehrt werden muss.
              In der Prüfung wird besonders Wert auf die Verhältnismäßigkeit der Maßnahmen gelegt.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Kommunikation */}
        <TabsContent value="kommunikation" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Professionelle Kommunikation</h2>
            
            <p>
              Eine klare, respektvolle und situationsangemessene Kommunikation ist ein Schlüsselelement
              für den erfolgreichen Umgang mit Menschen im Sicherheitsgewerbe. Sie bildet die Grundlage 
              für Deeskalation und Konfliktlösung.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Grundlagen</Badge>
                  <CardTitle className="text-base">Verbale Kommunikation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Die Art, wie wir sprechen, beeinflusst maßgeblich, wie unsere Botschaft ankommt:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Wortwahl:</strong> Einfach, klar, präzise, ohne Fachjargon</li>
                    <li><strong>Tonfall:</strong> Ruhig, bestimmt, nicht aggressiv oder herablassend</li>
                    <li><strong>Lautstärke:</strong> Angemessen, nicht zu leise (unsicher) oder zu laut (bedrohlich)</li>
                    <li><strong>Sprechtempo:</strong> Moderat, an die Situation angepasst</li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    <strong>TIPP:</strong> "Der Ton macht die Musik" - 38% der Kommunikationswirkung kommen vom Tonfall!
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Körpersprache</Badge>
                  <CardTitle className="text-base">Nonverbale Kommunikation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Körpersprache kann mehr aussagen als Worte:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Körperhaltung:</strong> Aufrecht, aber nicht steif; offen, nicht verschlossen</li>
                    <li><strong>Gestik:</strong> Ruhig, kontrolliert, keine hektischen oder aggressiven Bewegungen</li>
                    <li><strong>Mimik:</strong> Freundlich bis neutral, Blickkontakt halten</li>
                    <li><strong>Distanzzonen:</strong> Respektieren der persönlichen Zone (mind. 1,5 Meter)</li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    <strong>TIPP:</strong> Achten Sie auf Übereinstimmung von verbaler und nonverbaler Kommunikation!
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4 mt-6">
              <h3 className="text-xl font-semibold">Kommunikationstechniken für Sicherheitsmitarbeiter</h3>
              
              <div className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Aktives Zuhören</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Aktives Zuhören ist eine grundlegende Technik der Kommunikation und Deeskalation:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                        <li><strong>Aufmerksamkeit schenken:</strong> Volle Konzentration auf das Gegenüber</li>
                        <li><strong>Verbal begleiten:</strong> Kurze Bestätigungen wie "Ich verstehe", "Ja", "Hm"</li>
                        <li><strong>Paraphrasieren:</strong> Gehörtes in eigenen Worten wiedergeben</li>
                        <li><strong>Nachfragen:</strong> Unklarheiten klären, Interesse zeigen</li>
                        <li><strong>Zusammenfassen:</strong> Kernaussagen bündeln</li>
                      </ul>
                      <div className="mt-2 bg-muted/50 p-2 rounded">
                        <p className="text-xs">
                          <strong>Beispiel:</strong> "Wenn ich Sie richtig verstanden habe, ärgern Sie sich darüber, 
                          dass Sie trotz Ihrer Eintrittskarte nicht eingelassen werden. Ich kann Ihren Unmut verstehen. 
                          Lassen Sie mich erklären, warum wir momentan niemanden mehr einlassen können..."
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Ich-Botschaften</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Ich-Botschaften vermitteln die eigene Wahrnehmung ohne Vorwürfe oder Angriffe:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="border p-2 rounded bg-red-50 text-sm">
                          <p className="font-medium">Statt Du-Botschaft (vermeiden)</p>
                          <p className="text-xs mt-1">"Sie sind zu laut und stören die anderen Gäste."</p>
                          <p className="text-xs mt-1">"Sie haben die Regeln gebrochen."</p>
                          <p className="text-xs mt-1">"Sie verstehen das nicht richtig."</p>
                        </div>
                        <div className="border p-2 rounded bg-green-50 text-sm">
                          <p className="font-medium">Besser Ich-Botschaft (empfohlen)</p>
                          <p className="text-xs mt-1">"Ich bekomme Beschwerden von anderen Gästen wegen der Lautstärke."</p>
                          <p className="text-xs mt-1">"Ich muss darauf achten, dass die Regeln eingehalten werden."</p>
                          <p className="text-xs mt-1">"Ich glaube, ich habe mich nicht klar ausgedrückt."</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm">
                        Aufbau einer Ich-Botschaft: "Ich + Beobachtung/Wahrnehmung + Gefühl/Wirkung + Wunsch/Bitte"
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Klare Anweisungen und Grenzsetzung</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        In bestimmten Situationen ist eine direkte Kommunikation mit klaren Anweisungen nötig:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                        <li><strong>Kurze, präzise Sätze:</strong> "Bitte verlassen Sie den Bereich."</li>
                        <li><strong>Klare Begründung:</strong> "Dies ist ein Notausgang und muss frei bleiben."</li>
                        <li><strong>Handlungsalternativen aufzeigen:</strong> "Sie können sich dort drüben aufhalten."</li>
                        <li><strong>Bei Bedarf Konsequenzen benennen:</strong> "Wenn Sie nicht gehen, muss ich die Polizei rufen."</li>
                      </ul>
                      <div className="mt-2 bg-muted/50 p-2 rounded">
                        <p className="text-xs">
                          <strong>Wichtig:</strong> Grenzen sachlich und ohne persönliche Abwertung setzen. 
                          Auch bei Durchsetzung von Regeln respektvoll bleiben.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Interkulturelle Kommunikation</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Im Umgang mit Menschen aus verschiedenen Kulturen sind besondere Aspekte zu beachten:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                        <li><strong>Sprachbarrieren:</strong> Einfache Sprache, langsam sprechen, ggf. Gesten zur Unterstützung</li>
                        <li><strong>Kulturelle Unterschiede:</strong> Bewusstsein für unterschiedliche Normen und Werte</li>
                        <li><strong>Respekt:</strong> Vorschnelle Urteile vermeiden, Offenheit für andere Sichtweisen</li>
                        <li><strong>Missverständnisse:</strong> Häufiger nachfragen und zusammenfassen</li>
                      </ul>
                      <div className="mt-2 bg-muted/50 p-2 rounded">
                        <p className="text-xs">
                          <strong>Beispiel:</strong> In manchen Kulturen wird direkter Blickkontakt als unhöflich oder 
                          aggressiv empfunden, während er in Deutschland als Zeichen von Aufmerksamkeit und Ehrlichkeit gilt.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Praxisbeispiele */}
        <TabsContent value="praxis" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Praxisbeispiele für den Berufsalltag</h2>
            
            <p>
              Die folgenden Fallbeispiele verdeutlichen die Anwendung von Kommunikations- und 
              Deeskalationstechniken in typischen Situationen des Sicherheitsgewerbes.
            </p>
            
            <div className="mt-6 space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Fallbeispiel 1: Einlassverweigerung</CardTitle>
                  <CardDescription>Umgang mit einer Person, der der Eintritt verweigert wird</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> An einem Clubeingang muss einem bereits alkoholisierten Gast
                    der Eintritt verweigert werden. Die Person reagiert verärgert und fordert lautstark Einlass.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Herausforderung:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Wahrung des Hausrechts bei gleichzeitiger Deeskalation</li>
                      <li>Umgang mit alkoholbedingter eingeschränkter Einsichtsfähigkeit</li>
                      <li>Vermeidung einer Eskalation vor anderen wartenden Gästen</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Empfohlenes Vorgehen:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Ruhig und respektvoll bleiben, angemessenen Abstand halten</li>
                      <li>Person möglichst aus der Warteschlange herausführen (Vier-Augen-Gespräch)</li>
                      <li>Klare, kurze Begründung geben: "Ich kann Sie heute nicht einlassen, da Sie bereits deutlich alkoholisiert sind."</li>
                      <li>Alternative anbieten: "Vielleicht kommen Sie an einem anderen Abend wieder."</li>
                      <li>Bei anhaltender Aggression: Grenzen setzen, ggf. Kollegen hinzuziehen</li>
                      <li>Als letzte Option: Polizei verständigen</li>
                    </ol>
                  </div>
                  <div className="text-sm mt-3 bg-muted p-3 rounded">
                    <p className="font-medium">Deeskalative Formulierungen:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>"Ich verstehe, dass Sie enttäuscht sind, aber ich habe klare Anweisungen."</li>
                      <li>"Es tut mir leid, dass ich Ihnen heute keinen Einlass gewähren kann."</li>
                      <li>"Es geht dabei nicht um Sie persönlich, sondern um unsere Verantwortung für alle Gäste."</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Fallbeispiel 2: Konflikt zwischen Kunden</CardTitle>
                  <CardDescription>Schlichtung einer Auseinandersetzung</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> In einem Kaufhaus geraten zwei Kunden in einen heftigen verbalen Streit.
                    Die Situation droht zu eskalieren, andere Kunden fühlen sich bedroht oder gestört.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Herausforderung:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Neutrales Eingreifen ohne Partei zu ergreifen</li>
                      <li>Beruhigung beider Konfliktparteien</li>
                      <li>Schutz unbeteiligter Personen</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Empfohlenes Vorgehen:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Ruhig und bestimmt auftreten, ausreichend Abstand halten</li>
                      <li>Vorstellung als Sicherheitsmitarbeiter</li>
                      <li>Aufforderung zur Beruhigung: "Bitte senken Sie beide die Stimme."</li>
                      <li>Räumliche Trennung herbeiführen: "Würden Sie bitte mit mir hier herüberkommen?"</li>
                      <li>Einzelgespräche führen, beide Seiten anhören</li>
                      <li>Kompromissvorschläge oder Lösungen anbieten</li>
                    </ol>
                  </div>
                  <div className="text-sm mt-3 bg-muted p-3 rounded">
                    <p className="font-medium">Deeskalative Formulierungen:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>"Ich möchte Ihnen beiden helfen, diese Situation zu klären."</li>
                      <li>"Lassen Sie uns das ruhig und sachlich besprechen."</li>
                      <li>"Ich verstehe, dass Sie verärgert sind, aber so kommen wir nicht weiter."</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Fallbeispiel 3: Person in psychischem Ausnahmezustand</CardTitle>
                  <CardDescription>Umgang mit psychisch auffälligem Verhalten</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Eine Person verhält sich in einem Einkaufszentrum auffällig,
                    spricht mit sich selbst, gestikuliert wild und macht andere Besucher nervös.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Herausforderung:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Einschätzung der Situation und möglicher Gefährdung</li>
                      <li>Sensible Ansprache der betroffenen Person</li>
                      <li>Balance zwischen Schutz der Allgemeinheit und respektvollem Umgang</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Empfohlenes Vorgehen:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Beobachten aus der Distanz, Einschätzung der Lage</li>
                      <li>Ggf. Kollegen zur Unterstützung hinzuziehen</li>
                      <li>Behutsame Kontaktaufnahme, ruhige Ansprache</li>
                      <li>Einfache, klare Sätze verwenden</li>
                      <li>Begleitung in einen ruhigeren Bereich anbieten</li>
                      <li>Bei Bedarf professionelle Hilfe hinzuziehen (Notarzt, Psychiatrischer Dienst)</li>
                    </ol>
                  </div>
                  <div className="text-sm mt-3 bg-muted p-3 rounded">
                    <p className="font-medium">Deeskalative Formulierungen:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>"Guten Tag, ich bin vom Sicherheitsdienst. Darf ich Ihnen helfen?"</li>
                      <li>"Möchten Sie sich einen Moment in einem ruhigeren Bereich ausruhen?"</li>
                      <li>"Haben Sie jemanden, den wir für Sie anrufen können?"</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Fallbeispiel 4: Durchsetzung des Hausrechts</CardTitle>
                  <CardDescription>Aufforderung zum Verlassen des Gebäudes</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Eine Person verstößt wiederholt gegen die Hausordnung eines
                    Unternehmens und soll das Gebäude verlassen, weigert sich jedoch.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Herausforderung:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Konsequente Durchsetzung des Hausrechts</li>
                      <li>Vermeidung körperlicher Auseinandersetzungen</li>
                      <li>Rechtlich korrektes Handeln</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Empfohlenes Vorgehen:</strong></p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Höfliche, aber bestimmte Aufforderung zum Verlassen</li>
                      <li>Klare Begründung des Hausverweises</li>
                      <li>Angemessene Frist zum Verlassen setzen</li>
                      <li>Bei Weigerung: Hinweis auf mögliche Konsequenzen (Polizei, Straftatbestand Hausfriedensbruch)</li>
                      <li>Bei anhaltender Weigerung: Hinzuziehen der Polizei</li>
                    </ol>
                  </div>
                  <div className="text-sm mt-3 bg-muted p-3 rounded">
                    <p className="font-medium">Deeskalative Formulierungen:</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>"Ich muss Sie auffordern, das Gebäude zu verlassen. Sie haben wiederholt gegen unsere Hausordnung verstoßen."</li>
                      <li>"Bitte verlassen Sie das Gebäude jetzt. Wir können das Gespräch draußen fortsetzen."</li>
                      <li>"Wenn Sie jetzt gehen, können wir die Angelegenheit ohne weitere Konsequenzen beenden."</li>
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
                <span><strong>Deeskalation:</strong> Maßnahmen zur Beruhigung und Entspannung von Konfliktsituationen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Aktives Zuhören:</strong> Konzentrierte Aufmerksamkeit, Paraphrasieren und Nachfragen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Ich-Botschaften:</strong> Aussagen, die eigene Wahrnehmungen und Gefühle beschreiben statt Vorwürfe zu machen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Distanzzonen:</strong> Räumliche Abstände zwischen Personen (intime, persönliche, soziale und öffentliche Zone)</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Häufige Prüfungsfragen</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Nennen Sie fünf Deeskalationstechniken und erläutern Sie diese.</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Wie würden Sie eine Konfliktsituation zwischen zwei Personen entschärfen?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Was verstehen Sie unter dem Prinzip des aktiven Zuhörens?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Wie kann man professionell mit alkoholisierten Personen umgehen?</span>
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
            href="/blog/Sachkunde34a/Sicherheitstechnik"
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
            href="https://www.bdsw.de/aus-und-weiterbildung"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>BDSW: Weiterbildung im Sicherheitsgewerbe</span>
          </a>
          
          <a
            href="https://www.polizei-beratung.de/themen-und-tipps/gewalt/deeskalation/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Polizeiliche Beratung zur Deeskalation</span>
          </a>
        </div>
      </div>
    </div>
  );
}

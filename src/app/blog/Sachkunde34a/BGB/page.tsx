import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, BookOpen, AlertTriangle, CheckCircle, HelpCircle, MousePointer, ExternalLink, FileText, AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Bürgerliches Gesetzbuch (BGB) | Sachkunde §34a",
  description: "Alle wichtigen BGB-Grundlagen für die Sachkundeprüfung §34a GewO - Vertragsrecht, Haftungsrecht, Hausrecht und mehr",
};

export default function BGBPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-12">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <span>/</span>
          <span>Bürgerliches Gesetzbuch (BGB)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Bürgerliches Gesetzbuch (BGB)</h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Grundlegende Inhalte des Bürgerlichen Gesetzbuchs (BGB) mit Bezug zur Tätigkeit im Sicherheitsgewerbe
        </p>
      </div>

      {/* Überblick und Wichtigkeit */}
      <Alert className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Prüfungsrelevanz: Mittel bis Hoch</AlertTitle>
        <AlertDescription>
          Dieser Themenbereich macht etwa 10-15% der schriftlichen Prüfungsfragen aus. Besonders wichtig sind die Bereiche Vertragsrecht, Haftung und Hausrecht.
        </AlertDescription>
      </Alert>

      {/* Hauptinhalte mit Tabs */}
      <Tabs defaultValue="grundlagen" className="space-y-8">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="grundlagen">Grundlagen</TabsTrigger>
          <TabsTrigger value="vertragsrecht">Vertragsrecht</TabsTrigger>
          <TabsTrigger value="hausrecht">Hausrecht</TabsTrigger>
          <TabsTrigger value="haftung">Haftungsrecht</TabsTrigger>
        </TabsList>
        
        {/* Grundlagen */}
        <TabsContent value="grundlagen" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Das Bürgerliche Gesetzbuch - Grundlagen</h2>
            
            <p>
              Das Bürgerliche Gesetzbuch (BGB) ist das zentrale Gesetz des deutschen Privatrechts und regelt
              die Rechtsbeziehungen zwischen Privatpersonen. Für Sicherheitsmitarbeiter sind insbesondere
              Kenntnisse im Vertrags-, Haftungs- und Sachenrecht relevant.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Aufbau des BGB</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Das BGB ist in fünf Bücher gegliedert:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Allgemeiner Teil (§§ 1-240)</li>
                    <li>Schuldrecht (§§ 241-853)</li>
                    <li>Sachenrecht (§§ 854-1296)</li>
                    <li>Familienrecht (§§ 1297-1921)</li>
                    <li>Erbrecht (§§ 1922-2385)</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">
                    Für das Sicherheitsgewerbe sind vor allem der Allgemeine Teil, das Schuldrecht und das Sachenrecht relevant.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Grundsätzliche Bedeutung</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Das BGB regelt grundlegende Rechtsbeziehungen, die auch für das Sicherheitsgewerbe relevant sind:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Vertragsverhältnisse (z.B. Bewachungsvertrag)</li>
                    <li>Haftung für Schäden (z.B. bei Pflichtverletzungen)</li>
                    <li>Besitz und Eigentum (z.B. Hausrecht)</li>
                    <li>Geschäftsfähigkeit (z.B. bei Vertragsschluss)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Zentrale Begriffe im BGB</h3>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Natürliche und juristische Personen</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Natürliche Personen (§ 1 BGB)</p>
                      <p className="text-sm mt-1">
                        Menschen als Träger von Rechten und Pflichten. Die Rechtsfähigkeit beginnt mit der 
                        Vollendung der Geburt und endet mit dem Tod.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Juristische Personen</p>
                      <p className="text-sm mt-1">
                        Rechtlich selbständige Organisationen wie GmbHs, AGs, eingetragene Vereine oder 
                        Stiftungen. Sie können Verträge schließen, Eigentum besitzen und haften für Schäden.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Rechtsgeschäft und Willenserklärung</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Willenserklärung</p>
                      <p className="text-sm mt-1">
                        Eine Äußerung des Willens, die auf eine Rechtsfolge gerichtet ist. Sie kann 
                        ausdrücklich (mündlich/schriftlich) oder konkludent (durch schlüssiges Verhalten) erfolgen.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Rechtsgeschäft</p>
                      <p className="text-sm mt-1">
                        Ein oder mehrere Willenserklärungen, die auf die Herbeiführung eines rechtlichen 
                        Erfolgs gerichtet sind. Beispiele: Verträge, Kündigung, Vollmachtserteilung.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Geschäftsfähigkeit</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm">
                    Die Fähigkeit, Rechtsgeschäfte selbständig wirksam vorzunehmen. Das BGB unterscheidet:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li><strong>Geschäftsunfähig (§ 104 BGB):</strong> Kinder unter 7 Jahren und Personen mit krankhafter Störung der Geistestätigkeit</li>
                    <li><strong>Beschränkt geschäftsfähig (§ 106 BGB):</strong> Minderjährige zwischen 7 und 18 Jahren</li>
                    <li><strong>Voll geschäftsfähig:</strong> Volljährige ab 18 Jahren ohne geistige Einschränkungen</li>
                  </ul>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Im Sicherheitsgewerbe ist die Geschäftsfähigkeit z.B. relevant beim Abschluss von Verträgen oder 
                    der Erteilung von Einwilligungen (z.B. Durchsuchung).
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Besitz und Eigentum</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Besitz (§ 854 BGB)</p>
                      <p className="text-sm mt-1">
                        Die tatsächliche Herrschaft über eine Sache. Es handelt sich um ein faktisches Verhältnis, 
                        nicht um ein Recht. Beispiel: Mieter einer Wohnung.
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Eigentum (§ 903 BGB)</p>
                      <p className="text-sm mt-1">
                        Das umfassendste Recht an einer Sache. Der Eigentümer kann mit seiner Sache nach Belieben 
                        verfahren und andere von der Einwirkung ausschließen. Beispiel: Vermieter einer Wohnung.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 bg-muted/50 p-2 rounded">
                    <p className="text-xs">
                      <strong>Prüfungshinweis:</strong> Die Unterscheidung zwischen Besitz und Eigentum ist wichtig für das 
                      Verständnis des Hausrechts und die Befugnisse des Sicherheitspersonals.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </TabsContent>
        
        {/* Vertragsrecht */}
        <TabsContent value="vertragsrecht" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Vertragsrecht im Sicherheitsgewerbe</h2>
            
            <p>
              Verträge bilden die rechtliche Grundlage für die Tätigkeit im Sicherheitsgewerbe. 
              Sowohl das Verhältnis zwischen Sicherheitsunternehmen und Auftraggeber als auch 
              zwischen Sicherheitsunternehmen und Mitarbeitern ist vertraglich geregelt.
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Zustandekommen eines Vertrags
                </h3>
                <p className="text-sm mb-3">
                  Ein Vertrag kommt durch zwei übereinstimmende Willenserklärungen zustande:
                </p>
                <div className="text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">1</Badge>
                    <div>
                      <p className="font-medium">Angebot (§ 145 BGB)</p>
                      <p className="text-muted-foreground">Eine Willenserklärung, die auf den Abschluss eines Vertrags gerichtet ist und alle wesentlichen Vertragspunkte enthält.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Badge variant="outline">2</Badge>
                    <div>
                      <p className="font-medium">Annahme (§ 147 BGB)</p>
                      <p className="text-muted-foreground">Die Zustimmungserklärung des Empfängers zum Angebot. Mit Zugang der Annahme ist der Vertrag geschlossen.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded mt-3">
                  <p className="text-sm">
                    <strong>Beispiel:</strong> Ein Sicherheitsunternehmen unterbreitet einem Kaufhausbetreiber ein 
                    Angebot für Bewachungsdienstleistungen mit Angaben zu Preis, Leistungsumfang und Vertragsdauer. 
                    Mit Unterzeichnung des Angebots durch den Kaufhausbetreiber kommt der Vertrag zustande.
                  </p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Arten von Verträgen im Sicherheitsgewerbe
                </h3>
                <div className="text-sm grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Bewachungsvertrag</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p>
                        Vertrag zwischen Sicherheitsunternehmen und Auftraggeber über Bewachungsleistungen. 
                        Rechtlich handelt es sich um einen Dienstvertrag nach § 611 BGB.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Typische Inhalte:</strong> Art und Umfang der Bewachung, Befugnisse, Vergütung, 
                        Haftungsregelungen, Vertragsdauer, Kündigung
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Arbeitsvertrag</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p>
                        Vertrag zwischen Sicherheitsunternehmen und Mitarbeiter. Begründet ein 
                        Arbeitsverhältnis mit Rechten und Pflichten auf beiden Seiten.
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Typische Inhalte:</strong> Tätigkeit, Arbeitszeit, Vergütung, Urlaubsanspruch, 
                        Weisungsrecht, Verschwiegenheitspflicht, Kündigungsfristen
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Vollmacht und Vertretung
                </h3>
                <p className="text-sm mb-3">
                  Sicherheitspersonal handelt in der Regel im Namen und mit Vollmacht des Auftraggebers. 
                  Dabei sind die Grundsätze der Stellvertretung zu beachten:
                </p>
                <div className="text-sm space-y-2">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Stellvertretung (§ 164 BGB):</strong> Handeln im Namen eines anderen</li>
                    <li><strong>Vollmacht (§ 166 BGB):</strong> Befugnis, im Namen des Vollmachtgebers zu handeln</li>
                    <li><strong>Umfang der Vollmacht:</strong> Bestimmt die Grenzen des rechtmäßigen Handelns</li>
                  </ul>
                </div>
                <div className="bg-muted p-3 rounded mt-3">
                  <p className="text-sm">
                    <strong>Beispiel:</strong> Ein Sicherheitsmitarbeiter übt das Hausrecht im Namen des 
                    Eigentümers aus. Er kann daher Personen aus dem Objekt verweisen, wenn er dazu bevollmächtigt ist.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Hausrecht */}
        <TabsContent value="hausrecht" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Das Hausrecht</h2>
            
            <p>
              Das Hausrecht ist für Sicherheitsmitarbeiter von besonderer Bedeutung, da sie es häufig
              im Auftrag des Berechtigten ausüben. Es ermöglicht die Kontrolle darüber, wer ein Grundstück
              oder Gebäude betreten und sich dort aufhalten darf.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Grundlagen</Badge>
                  <CardTitle className="text-base">Definition und rechtliche Basis</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Das Hausrecht ist das Recht des Eigentümers oder Besitzers, zu bestimmen, wer sein
                    Grundstück oder Gebäude betreten und sich dort aufhalten darf.
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Rechtliche Grundlagen:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Eigentumsrecht (§ 903 BGB)</li>
                    <li>Besitzschutz (§§ 858 ff. BGB)</li>
                    <li>Strafrechtlicher Schutz (§ 123 StGB - Hausfriedensbruch)</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Berechtigte</Badge>
                  <CardTitle className="text-base">Wer hat das Hausrecht?</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Das Hausrecht steht grundsätzlich folgenden Personen zu:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Dem Eigentümer des Grundstücks/Gebäudes</li>
                    <li>Dem unmittelbaren Besitzer (z.B. Mieter)</li>
                    <li>Bevollmächtigten Personen (z.B. Sicherheitspersonal mit entsprechender Vollmacht)</li>
                  </ul>
                  <p className="text-muted-foreground mt-2">
                    <strong>Hinweis:</strong> Bei Mietverhältnissen geht das Hausrecht für die Mietzeit auf den Mieter über.
                    Der Vermieter behält jedoch das Hausrecht für gemeinschaftliche Bereiche (z.B. Treppenhaus).
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4 mt-6">
              <h3 className="text-xl font-semibold">Ausübung des Hausrechts</h3>
              
              <div className="space-y-4">
                <p>
                  Die Ausübung des Hausrechts durch Sicherheitsmitarbeiter umfasst verschiedene Maßnahmen,
                  die stets verhältnismäßig sein müssen.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Zutrittsregelung</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p>
                        Der Hausrechtsinhaber kann festlegen, wer das Grundstück/Gebäude betreten darf und unter welchen Bedingungen.
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Festlegung von Öffnungszeiten</li>
                        <li>Beschränkung auf bestimmte Personengruppen</li>
                        <li>Einrichtung von Zugangskontrollen</li>
                        <li>Zustimmungserfordernis zum Betreten</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Hausverbot</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p>
                        Untersagung des Betretens oder Aufenthalts auf dem Grundstück/im Gebäude.
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Kann für Einzelpersonen oder Personengruppen ausgesprochen werden</li>
                        <li>Zeitlich befristet oder unbefristet möglich</li>
                        <li>Muss nicht begründet werden (außer in bestimmten öffentlichen Einrichtungen)</li>
                        <li>Grundsätzlich formfrei, aus Beweisgründen jedoch schriftlich empfehlenswert</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Platzverweis</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p>
                        Aufforderung an eine Person, das Grundstück/Gebäude zu verlassen.
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Bei Störungen oder Verstößen gegen die Hausordnung</li>
                        <li>Bei unerlaubtem Betreten oder Verweilen</li>
                        <li>Bei Vorliegen eines Hausverbots</li>
                      </ul>
                      <p className="text-muted-foreground mt-1">
                        Bei Nichtbefolgung liegt ein Hausfriedensbruch vor.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Durchsetzungsmaßnahmen</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs space-y-2">
                      <p>
                        Bei Weigerung, einen Platzverweis zu befolgen, können weitere Maßnahmen erforderlich sein:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Erneute, bestimmte Aufforderung zum Verlassen</li>
                        <li>Ankündigung weiterer Maßnahmen</li>
                        <li>Hinzuziehung von Verstärkung</li>
                        <li>Als letztes Mittel: Anwendung verhältnismäßigen unmittelbaren Zwangs</li>
                        <li>Hinzuziehung der Polizei</li>
                      </ul>
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
              Das Hausrecht ist die wichtigste Rechtsgrundlage für viele Tätigkeiten im Sicherheitsgewerbe. 
              Beachten Sie jedoch stets die Grenzen: Das Hausrecht rechtfertigt keine übermäßige Gewalt und 
              muss verhältnismäßig ausgeübt werden. Zudem ist eine entsprechende Bevollmächtigung durch den 
              Hausrechtsinhaber erforderlich.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Haftungsrecht */}
        <TabsContent value="haftung" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Haftungsrecht im Sicherheitsgewerbe</h2>
            
            <p>
              Das Haftungsrecht regelt, wer unter welchen Voraussetzungen für einen entstandenen
              Schaden einzustehen hat. Im Sicherheitsgewerbe ist dies besonders relevant, da sowohl
              die eigene Haftung als auch die Haftung gegenüber Dritten eine Rolle spielen kann.
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Vertragliche Haftung
                </h3>
                <p className="text-sm mb-3">
                  Die vertragliche Haftung ergibt sich aus dem Schuldverhältnis zwischen den Vertragsparteien:
                </p>
                <div className="text-sm space-y-3">
                  <div>
                    <p className="font-medium">Pflichtverletzung (§ 280 BGB)</p>
                    <p className="mt-1">
                      Wer eine Pflicht aus einem Schuldverhältnis verletzt, ist zum Ersatz des daraus
                      entstehenden Schadens verpflichtet, wenn er die Pflichtverletzung zu vertreten hat.
                    </p>
                    <div className="bg-muted p-2 rounded mt-2">
                      <p className="text-xs">
                        <strong>Beispiel:</strong> Ein Sicherheitsunternehmen verletzt seine Pflicht zur ordnungsgemäßen
                        Bewachung, indem Mitarbeiter ihre Kontrollgänge nicht durchführen. In der Folge wird ein Diebstahl
                        nicht verhindert. Das Unternehmen haftet für den entstandenen Schaden.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium">Haftung für Erfüllungsgehilfen (§ 278 BGB)</p>
                    <p className="mt-1">
                      Der Schuldner (z.B. das Sicherheitsunternehmen) haftet für das Verschulden seiner
                      Erfüllungsgehilfen (z.B. Sicherheitsmitarbeiter) wie für eigenes Verschulden.
                    </p>
                    <div className="bg-muted p-2 rounded mt-2">
                      <p className="text-xs">
                        <strong>Beispiel:</strong> Ein Sicherheitsmitarbeiter beschädigt bei einem Kontrollgang fahrlässig
                        technische Geräte des bewachten Unternehmens. Das Sicherheitsunternehmen haftet für den Schaden,
                        als hätte es ihn selbst verursacht.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Deliktische Haftung (Außervertragliche Haftung)
                </h3>
                <p className="text-sm mb-3">
                  Die deliktische Haftung tritt ein, wenn jemand einem anderen widerrechtlich und schuldhaft
                  Schaden zufügt, ohne dass ein Vertragsverhältnis besteht:
                </p>
                <div className="text-sm space-y-3">
                  <div>
                    <p className="font-medium">Allgemeine deliktische Haftung (§ 823 Abs. 1 BGB)</p>
                    <p className="mt-1">
                      Wer vorsätzlich oder fahrlässig das Leben, den Körper, die Gesundheit, die Freiheit,
                      das Eigentum oder ein sonstiges Recht eines anderen widerrechtlich verletzt, ist zum
                      Ersatz des daraus entstehenden Schadens verpflichtet.
                    </p>
                  </div>
                  
                  <div>
                    <p className="font-medium">Haftung für Verrichtungsgehilfen (§ 831 BGB)</p>
                    <p className="mt-1">
                      Wer einen anderen zu einer Verrichtung bestellt, haftet für den Schaden, den dieser
                      in Ausführung der Verrichtung einem Dritten widerrechtlich zufügt. Die Haftung tritt
                      nicht ein, wenn der Geschäftsherr bei der Auswahl und Überwachung die im Verkehr
                      erforderliche Sorgfalt beachtet hat (Entlastungsmöglichkeit).
                    </p>
                  </div>
                </div>
                <div className="bg-muted p-3 rounded mt-3">
                  <p className="text-sm">
                    <strong>Beispiel:</strong> Ein Sicherheitsmitarbeiter wendet bei der Durchsetzung eines
                    Hausverbots übermäßige Gewalt an und verletzt einen Besucher. Der Besucher kann sowohl den
                    Mitarbeiter persönlich (§ 823 BGB) als auch unter Umständen das Sicherheitsunternehmen
                    (§ 831 BGB) auf Schadensersatz in Anspruch nehmen.
                  </p>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Haftungsausschluss und -begrenzung
                </h3>
                <p className="text-sm mb-3">
                  Das Haftungsrisiko kann durch vertragliche Vereinbarungen teilweise begrenzt werden:
                </p>
                <div className="text-sm space-y-2">
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <p><strong>Haftungsausschluss:</strong> Vertragliche Vereinbarung, nach der eine Partei für bestimmte Schäden nicht haftet.</p>
                      <p className="text-muted-foreground ml-5">Grenzen: Nicht möglich für Vorsatz (§ 276 Abs. 3 BGB); bei AGB weitere Einschränkungen (§ 309 Nr. 7 BGB)</p>
                    </li>
                    <li>
                      <p><strong>Haftungsbegrenzung:</strong> Begrenzung der Haftung auf einen bestimmten Höchstbetrag.</p>
                      <p className="text-muted-foreground ml-5">Oft in Bewachungsverträgen enthalten, z.B. Begrenzung auf die Versicherungssumme der Haftpflichtversicherung</p>
                    </li>
                    <li>
                      <p><strong>Haftpflichtversicherung:</strong> Absicherung gegen Schadensersatzansprüche Dritter.</p>
                      <p className="text-muted-foreground ml-5">Für Bewachungsunternehmen gesetzlich vorgeschrieben nach § 34a GewO</p>
                    </li>
                  </ul>
                </div>
              </div>
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
                <span><strong>Hausrecht:</strong> Recht des Eigentümers/Besitzers, zu bestimmen, wer ein Grundstück/Gebäude betreten und sich dort aufhalten darf</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Vertrag:</strong> Rechtsgeschäft zwischen mindestens zwei Parteien durch übereinstimmende Willenserklärungen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Besitz:</strong> Tatsächliche Herrschaft über eine Sache (faktisches Verhältnis)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Eigentum:</strong> Rechtliche Herrschaft über eine Sache (umfassendstes Recht an einer Sache)</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Häufige Prüfungsfragen</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Was verstehen Sie unter dem Hausrecht und wer kann es ausüben?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Erklären Sie den Unterschied zwischen Besitz und Eigentum.</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Nennen Sie die Voraussetzungen für das Zustandekommen eines Vertrags.</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Wann haftet ein Bewachungsunternehmen für Schäden, die durch seine Mitarbeiter verursacht werden?</span>
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
            href="/blog/Sachkunde34a/Strafrecht"
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
            href="https://www.gesetze-im-internet.de/bgb/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Bürgerliches Gesetzbuch (BGB) im Volltext</span>
          </a>
          
          <a
            href="https://www.bdu-online.de/aus-und-weiterbildung/sachkunde-paragraf-34a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Informationen des BDSW zur Sachkundeprüfung §34a</span>
          </a>
        </div>
      </div>
    </div>
  );
}

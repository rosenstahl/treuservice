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
  title: "Umgang mit Waffen und Verteidigungsmitteln | Sachkunde §34a",
  description: "Grundlagen zum Umgang mit Waffen und Verteidigungsmitteln im Sicherheitsgewerbe für die Sachkundeprüfung §34a GewO",
};

export default function WaffenPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-12">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <span>/</span>
          <span>Umgang mit Waffen und Verteidigungsmitteln</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Umgang mit Waffen und Verteidigungsmitteln</h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Rechtliche Grundlagen und praktisches Wissen zum Umgang mit Waffen, Hilfsmitteln 
          und Verteidigungsmitteln im Sicherheitsgewerbe
        </p>
      </div>

      {/* Überblick und Wichtigkeit */}
      <Alert className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Prüfungsrelevanz: Mittel bis Hoch</AlertTitle>
        <AlertDescription>
          Dieser Themenbereich macht etwa 10-15% der schriftlichen Prüfungsfragen aus. Besonders wichtig sind die Definitionen 
          der verschiedenen Waffen- und Verteidigungsmittelkategorien sowie die gesetzlichen Regelungen zu deren Einsatz.
        </AlertDescription>
      </Alert>

      {/* Hauptinhalte mit Tabs */}
      <Tabs defaultValue="grundlagen" className="space-y-8">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="grundlagen">Grundlagen</TabsTrigger>
          <TabsTrigger value="waffenarten">Waffenarten</TabsTrigger>
          <TabsTrigger value="recht">Waffenrecht</TabsTrigger>
          <TabsTrigger value="praxis">Praxiswissen</TabsTrigger>
        </TabsList>
        
        {/* Grundlagen */}
        <TabsContent value="grundlagen" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Grundlagen zu Waffen und Verteidigungsmitteln</h2>
            
            <p>
              Im Sicherheitsgewerbe kommen verschiedene Arten von Waffen und Verteidigungsmitteln zum Einsatz.
              Die Kenntnis ihrer rechtlichen Einordnung, Wirkungsweise und Handhabung ist für Sicherheitsmitarbeiter unerlässlich.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Der Waffenbegriff nach dem Waffengesetz</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Das Waffengesetz (WaffG) unterscheidet folgende Kategorien:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Schusswaffen</strong>: Gegenstände, die zum Angriff, zur Verteidigung oder zum Schießsport, zur Jagd oder zum Spiel bestimmt sind und bei denen Geschosse durch einen Lauf getrieben werden (§ 1 Abs. 2 Nr. 1 WaffG)</li>
                    <li><strong>Tragbare Gegenstände</strong>, die dazu bestimmt sind, durch Versprühen oder Ausstoßen Reizoder andere Wirkstoffe zu verbreiten (§ 1 Abs. 2 Nr. 2 WaffG)</li>
                    <li><strong>Tragbare Gegenstände</strong>, die dazu bestimmt sind, durch Aussenden elektrischer Impulse eine vorübergehende Handlungsunfähigkeit herbeizuführen (§ 1 Abs. 2 Nr. 2a WaffG)</li>
                    <li><strong>Hieb- und Stoßwaffen</strong>: Gegenstände, die dazu bestimmt sind, bei einem Angriff zur Verletzung von Menschen eingesetzt zu werden (§ 1 Abs. 2 Nr. 2b WaffG)</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Unterscheidung wichtiger Begriffe</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Waffen</strong>: Gegenstände, die nach ihrer Beschaffenheit, Handhabung oder Wirkungsweise geeignet sind, die Angriffs- oder Abwehrfähigkeit von Menschen zu beseitigen oder herabzusetzen</li>
                    <li><strong>Verteidigungsmittel</strong>: Gegenstände, die der Abwehr von Angriffen durch Menschen oder Tiere und überwiegend dem Selbstschutz dienen</li>
                    <li><strong>Hilfsmittel der körperlichen Gewalt</strong>: Gegenstände, die bei der Anwendung unmittelbaren Zwangs unterstützend eingesetzt werden (z.B. Handschellen, Einsatzstock)</li>
                    <li><strong>Gefährliche Gegenstände</strong>: Werkzeuge oder andere Gegenstände, die nach ihrer objektiven Beschaffenheit und nach der Art ihrer Verwendung im Einzelfall geeignet sind, erhebliche Verletzungen zuzufügen</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Waffen und Verteidigungsmittel im Sicherheitsgewerbe</h3>
            
            <p className="text-sm text-muted-foreground">
              Im Sicherheitsgewerbe kommen verschiedene Arten von Waffen und Verteidigungsmitteln zum Einsatz. 
              Der Umgang mit diesen Mitteln unterliegt besonderen rechtlichen und praktischen Anforderungen.
            </p>
            
            <div className="grid grid-cols-1 gap-4 mt-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Grundsätzliche Anforderungen</h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>Für den Einsatz von Waffen und Verteidigungsmitteln im Sicherheitsgewerbe gelten folgende Grundsätze:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Anzeigepflicht für den Einsatz von Waffen und Hunden gemäß § 34a Abs. 5 GewO</li>
                      <li>Einhaltung waffenrechtlicher Vorschriften (Erlaubnispflicht, Führen, Aufbewahrung)</li>
                      <li>Gründliche Schulung und regelmäßiges Training</li>
                      <li>Strenge Beachtung der Verhältnismäßigkeit bei der Anwendung</li>
                      <li>Dokumentation des Einsatzes von Waffen und Verteidigungsmitteln</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Besondere Regelungen für Tätigkeitsbereiche</h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>Je nach Einsatzbereich gelten unterschiedliche Regelungen:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li><strong>Diskotheken/Veranstaltungen</strong>: In vielen Bundesländern gilt ein Waffenverbot für Türsteher</li>
                      <li><strong>Werttransport</strong>: Besondere Regelungen für Schusswaffen (Waffenschein erforderlich)</li>
                      <li><strong>Objektschutz</strong>: Je nach Objekt und Gefährdungslage verschiedene Anforderungen</li>
                      <li><strong>Personenschutz</strong>: Spezielle Regelungen und Qualifikationsanforderungen</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Rechtliche Grenzen des Einsatzes</h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>Der Einsatz von Waffen und Verteidigungsmitteln ist nur unter engen Voraussetzungen rechtmäßig:</p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Vorliegen einer Notwehr-/Nothilfesituation (§ 32 StGB)</li>
                      <li>Vorliegen einer Notstandssituation (§ 34 StGB)</li>
                      <li>Beachtung des Verhältnismäßigkeitsgrundsatzes</li>
                      <li>Erforderlichkeit des Einsatzes (mildestes geeignetes Mittel)</li>
                      <li>Vorherige Androhung, soweit möglich und zumutbar</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg mt-4">
            <p className="text-sm">
              <strong>Beachte:</strong> Der Einsatz von Waffen und Verteidigungsmitteln im Sicherheitsgewerbe 
              birgt erhebliche rechtliche und praktische Risiken. Er sollte stets die letzte Option sein, wenn 
              andere Maßnahmen (z.B. Deeskalation, Rückzug) nicht mehr möglich oder nicht ausreichend sind.
            </p>
          </div>
        </TabsContent>
        
        {/* Waffenarten */}
        <TabsContent value="waffenarten" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Arten von Waffen und Verteidigungsmitteln</h2>
            
            <p>
              Im Folgenden werden die im Sicherheitsgewerbe relevanten Waffen- und Verteidigungsmittelarten vorgestellt. 
              Für jede Art werden die rechtliche Einordnung, Wirkungsweise und Besonderheiten erläutert.
            </p>
            
            <div className="mt-6 space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">1</Badge>
                      <span>Schlagstöcke und Tonfa</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p>
                          <strong>Definition:</strong> Schlagstöcke sind Hieb- und Stoßwaffen, die als verlängerter Arm dienen 
                          und die Schlagkraft erhöhen. Tonfa sind L-förmige Schlagstöcke mit einem seitlichen Griff.
                        </p>
                        <p>
                          <strong>Rechtliche Einordnung:</strong> Hieb- und Stoßwaffen nach § 1 Abs. 2 Nr. 2b WaffG
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm">
                          <li>Erwerb und Besitz grundsätzlich erlaubnisfrei (ab 18 Jahren)</li>
                          <li>Führen in der Öffentlichkeit verboten (§ 42a WaffG)</li>
                          <li>Ausnahme: Führen bei berechtigtem Interesse (z.B. Berufsausübung)</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <strong>Einsatz im Sicherheitsgewerbe:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm">
                          <li>Defensives Mittel zur Abwehr von Angriffen</li>
                          <li>Ermöglicht Abwehr, Hebel- und Transportgriffe</li>
                          <li>Nicht für den Einsatz gegen Kopf, Hals oder Genitalien konzipiert (lebensgefährlich)</li>
                          <li>Anzeigepflichtig nach § 34a Abs. 5 GewO</li>
                          <li>Regelmäßiges Training erforderlich</li>
                        </ul>
                        <div className="bg-muted p-2 rounded mt-2">
                          <p className="text-xs">
                            <strong>Prüfungshinweis:</strong> Teleskopschlagstöcke sind im Sicherheitsgewerbe besonders problematisch, 
                            da sie unter § 42a Abs. 1 Nr. 3 WaffG fallen und damit grundsätzlich einem Führungsverbot unterliegen.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">2</Badge>
                      <span>Reizstoffsprühgeräte (Pfefferspray, CS-Gas)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p>
                          <strong>Definition:</strong> Tragbare Gegenstände, die dazu bestimmt sind, durch Versprühen oder 
                          Ausstoßen von Reizstoffen (Pfefferspray = Oleoresin Capsicum, CS-Gas = 2-Chlorbenzylidenmalonsäuredinitril) 
                          die Angriffs- oder Abwehrfähigkeit von Menschen herabzusetzen.
                        </p>
                        <p>
                          <strong>Rechtliche Einordnung:</strong> Waffen nach § 1 Abs. 2 Nr. 2 WaffG
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm">
                          <li>Erwerb und Besitz grundsätzlich erlaubnisfrei (ab 14 Jahren mit Zustimmung der Erziehungsberechtigten, ab 18 Jahren ohne Zustimmung)</li>
                          <li>Führen erlaubnisfrei, wenn Zulassungszeichen vorhanden und Zweckbestimmung "Abwehr von Tieren" angegeben ist</li>
                          <li>Ohne entsprechende Kennzeichnung gelten die allgemeinen Regeln für Waffen</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <strong>Einsatz im Sicherheitsgewerbe:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm">
                          <li>Defensives Mittel zur Abwehr von Angriffen</li>
                          <li>Wirkung: Reizung der Augen- und Schleimhäute, Atemnot, vorübergehende Sehstörungen</li>
                          <li>Wirkungseintritt: sofort bis wenige Sekunden</li>
                          <li>Abstand zum Angreifer: mindestens 1-2 Meter</li>
                          <li>Anzeigepflichtig nach § 34a Abs. 5 GewO</li>
                        </ul>
                        <div className="bg-muted p-2 rounded mt-2">
                          <p className="text-xs">
                            <strong>Hinweis:</strong> Bei Reizstoffsprühgeräten ist auf die Windrichtung und den Einsatz in 
                            geschlossenen Räumen zu achten, da sonst auch unbeteiligte Personen oder der Anwender selbst 
                            betroffen sein können.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">3</Badge>
                      <span>Elektroimpulsgeräte (Taser)</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p>
                          <strong>Definition:</strong> Tragbare Gegenstände, die durch Aussenden elektrischer Impulse eine 
                          vorübergehende Handlungsunfähigkeit herbeiführen (Elektroschockpistolen, Distanz-Elektroimpulsgeräte).
                        </p>
                        <p>
                          <strong>Rechtliche Einordnung:</strong> Waffen nach § 1 Abs. 2 Nr. 2a WaffG
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm">
                          <li>Erwerb und Besitz erlaubnispflichtig (Waffenbesitzkarte erforderlich)</li>
                          <li>Führen nur mit Waffenschein zulässig</li>
                          <li>Ausnahme: Elektroschockgeräte, die keine erheblichen gesundheitlichen Schäden verursachen können</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <strong>Einsatz im Sicherheitsgewerbe:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm">
                          <li>In der Regel nur in speziellen Bereichen (z.B. Werttransport)</li>
                          <li>Wirkung: Muskelkontraktionen durch elektrische Impulse, vorübergehende Handlungsunfähigkeit</li>
                          <li>Wirkungseintritt: sofort</li>
                          <li>Anzeigepflichtig nach § 34a Abs. 5 GewO</li>
                          <li>Intensive Schulung und regelmäßiges Training erforderlich</li>
                        </ul>
                        <div className="bg-muted p-2 rounded mt-2">
                          <p className="text-xs">
                            <strong>Wichtig:</strong> Der Einsatz von Elektroimpulsgeräten kann bei bestimmten Personengruppen 
                            (z.B. Personen mit Herzschrittmacher, unter Drogeneinfluss oder mit Herzerkrankungen) lebensgefährlich sein.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">4</Badge>
                      <span>Schusswaffen im Sicherheitsgewerbe</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p>
                          <strong>Definition:</strong> Waffen, bei denen Geschosse durch einen Lauf getrieben werden (Feuerwaffen, 
                          Druckluftwaffen, Federdruckwaffen, Schreckschuss-, Reizstoff- und Signalwaffen).
                        </p>
                        <p>
                          <strong>Rechtliche Einordnung:</strong> Schusswaffen nach § 1 Abs. 2 Nr. 1 WaffG
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm">
                          <li>Erwerb und Besitz erlaubnispflichtig (Waffenbesitzkarte)</li>
                          <li>Führen nur mit Waffenschein zulässig</li>
                          <li>Strenge Aufbewahrungsvorschriften</li>
                          <li>Ausnahmen für bestimmte Waffen (z.B. Schreckschusswaffen mit PTB-Kennzeichen)</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <strong>Einsatz im Sicherheitsgewerbe:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm">
                          <li>Fast ausschließlich im Werttransport und speziellen Objektschutzbereichen</li>
                          <li>Besondere Schulung und Sachkunde erforderlich</li>
                          <li>Strenges Bedürfnisprinzip: Nachweis eines besonderen Bedürfnisses für Erwerbs- und Führungserlaubnis</li>
                          <li>Anzeigepflichtig nach § 34a Abs. 5 GewO</li>
                          <li>Regelmäßige Überprüfung der Zuverlässigkeit und persönlichen Eignung</li>
                        </ul>
                        <div className="bg-muted p-2 rounded mt-2">
                          <p className="text-xs">
                            <strong>Prüfungshinweis:</strong> Der Einsatz von Schusswaffen ist aufgrund der hohen Gefährdung und 
                            strengen rechtlichen Anforderungen im Sicherheitsgewerbe eher die Ausnahme als die Regel.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">5</Badge>
                      <span>Hilfsmittel der körperlichen Gewalt</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <p>
                        Neben den Waffen kommen im Sicherheitsgewerbe auch verschiedene Hilfsmittel der körperlichen Gewalt zum Einsatz:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card className="border">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Handfesseln/Handschellen</CardTitle>
                          </CardHeader>
                          <CardContent className="text-xs space-y-2">
                            <p>
                              Dienen zur vorübergehenden Fixierung einer Person, etwa bei einer vorläufigen Festnahme nach § 127 StPO.
                            </p>
                            <ul className="list-disc list-inside mt-1">
                              <li>Keine Waffen im Sinne des WaffG</li>
                              <li>Einsatz nur bei rechtmäßiger Festnahme oder zur Notwehr/Nothilfe</li>
                              <li>Beachtung der Verhältnismäßigkeit</li>
                              <li>Gesundheitliche Risiken beachten (Durchblutungsstörungen)</li>
                            </ul>
                          </CardContent>
                        </Card>
                        
                        <Card className="border">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Schutzausrüstung</CardTitle>
                          </CardHeader>
                          <CardContent className="text-xs space-y-2">
                            <p>
                              Passive Verteidigungsmittel zum Eigenschutz, wie Schutzwesten, Helme, Unterarmschützer etc.
                            </p>
                            <ul className="list-disc list-inside mt-1">
                              <li>Keine Waffen im Sinne des WaffG</li>
                              <li>Wichtig für den Eigenschutz in gefährlichen Einsatzbereichen</li>
                              <li>Beeinträchtigung der Beweglichkeit beachten</li>
                              <li>Angepasst an die jeweilige Gefährdungslage</li>
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="bg-muted p-3 rounded">
                        <p className="text-sm">
                          <strong>Rechtlicher Hinweis:</strong> Auch wenn diese Hilfsmittel keine Waffen im Sinne des WaffG sind, 
                          unterliegt ihr Einsatz den allgemeinen rechtlichen Grenzen (Notwehr, Notstand, Verhältnismäßigkeit). 
                          Der Einsatz von Handschellen ist insbesondere nur im Rahmen der vorläufigen Festnahme nach § 127 StPO 
                          oder in Notwehr-/Nothilfesituationen zulässig.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">6</Badge>
                      <span>Diensthunde im Sicherheitsgewerbe</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p>
                          <strong>Definition:</strong> Speziell ausgebildete Hunde, die im Sicherheitsgewerbe eingesetzt werden, 
                          z.B. für Schutzdienst, Objektbewachung, Personensuche oder Rauschgiftspürhunde.
                        </p>
                        <p>
                          <strong>Rechtliche Einordnung:</strong> Keine Waffen im Sinne des WaffG, aber:
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm">
                          <li>Anzeigepflichtig nach § 34a Abs. 5 GewO</li>
                          <li>Landesrechtliche Bestimmungen zu gefährlichen Hunden beachten</li>
                          <li>Besondere Anforderungen an Ausbildung und Führung</li>
                          <li>Tierschutzrechtliche Vorschriften beachten</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <strong>Einsatz im Sicherheitsgewerbe:</strong>
                        </p>
                        <ul className="list-disc list-inside mt-2 text-sm">
                          <li>Objektschutz und Streifendienst</li>
                          <li>Präventive Wirkung durch Anwesenheit</li>
                          <li>Unterstützung bei der Durchsetzung des Hausrechts</li>
                          <li>Schutz des Sicherheitsmitarbeiters</li>
                          <li>Besondere Sachkunde des Hundeführers erforderlich</li>
                        </ul>
                        <div className="bg-muted p-2 rounded mt-2">
                          <p className="text-xs">
                            <strong>Wichtig:</strong> Der Einsatz von Diensthunden erfordert eine spezielle Ausbildung sowohl des 
                            Hundes als auch des Hundeführers. Der Hund muss jederzeit unter Kontrolle des Hundeführers stehen.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Wichtig für die Prüfung</AlertTitle>
            <AlertDescription>
              Bei der Sachkundeprüfung ist die korrekte rechtliche Einordnung der verschiedenen Waffen- und 
              Verteidigungsmittelarten besonders wichtig. Achten Sie auf die Unterscheidung zwischen erlaubnisfreien 
              und erlaubnispflichtigen Waffen sowie auf die besonderen Anforderungen beim Führen von Waffen!
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Waffenrecht */}
        <TabsContent value="recht" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Grundzüge des Waffenrechts</h2>
            
            <p>
              Das Waffenrecht regelt den Umgang mit Waffen und Munition. Für Sicherheitsmitarbeiter 
              sind insbesondere die Regelungen zum Erwerb, Besitz und Führen von Waffen relevant.
            </p>
            
            <div className="mt-6 space-y-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Grundprinzipien des Waffenrechts
                </h3>
                <div className="text-sm space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">1</Badge>
                    <div>
                      <p className="font-medium">Erlaubnisprinzip</p>
                      <p className="text-muted-foreground">Umgang mit Waffen (Erwerb, Besitz, Führen) ist grundsätzlich erlaubnispflichtig, 
                      soweit nicht ausdrücklich eine Ausnahme vorgesehen ist.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">2</Badge>
                    <div>
                      <p className="font-medium">Bedürfnisprinzip</p>
                      <p className="text-muted-foreground">Waffenrechtliche Erlaubnisse werden nur erteilt, wenn ein Bedürfnis glaubhaft 
                      gemacht werden kann (z.B. berufliche Notwendigkeit im Bewachungsgewerbe).</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">3</Badge>
                    <div>
                      <p className="font-medium">Zuverlässigkeit und persönliche Eignung</p>
                      <p className="text-muted-foreground">Erlaubnisse werden nur an zuverlässige und persönlich geeignete Personen erteilt. 
                      Die Zuverlässigkeit wird anhand von Vorstrafen, Suchtverhalten etc. geprüft.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Badge variant="outline">4</Badge>
                    <div>
                      <p className="font-medium">Sachkundeerfordernis</p>
                      <p className="text-muted-foreground">Waffenrechtliche Erlaubnisse setzen den Nachweis ausreichender Sachkunde im 
                      Umgang mit Waffen voraus.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Wichtige waffenrechtliche Dokumente
                </h3>
                <div className="text-sm space-y-4">
                  <Card className="border overflow-hidden">
                    <CardHeader className="bg-muted py-2">
                      <CardTitle className="text-sm">Waffenbesitzkarte (WBK)</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <p className="mb-2">
                        Die Waffenbesitzkarte berechtigt zum <strong>Erwerb und Besitz</strong> von Schusswaffen. 
                        Sie berechtigt <strong>nicht</strong> zum Führen der Waffen!
                      </p>
                      <ul className="list-disc list-inside text-xs text-muted-foreground">
                        <li>Persönliche Voraussetzungen: Mindestalter 18 Jahre, Zuverlässigkeit, persönliche Eignung, Sachkunde</li>
                        <li>Bedürfnisnachweis erforderlich (z.B. als Bewachungsunternehmer für Werttransporte)</li>
                        <li>In der WBK werden die erlaubten Waffen eingetragen</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border overflow-hidden">
                    <CardHeader className="bg-muted py-2">
                      <CardTitle className="text-sm">Waffenschein</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <p className="mb-2">
                        Der Waffenschein berechtigt zum <strong>Führen</strong> von Schusswaffen, also zum Schussbereit- 
                        bei sich tragen außerhalb der eigenen Wohnung, Geschäftsräume oder des eigenen befriedeten Besitztums.
                      </p>
                      <ul className="list-disc list-inside text-xs text-muted-foreground">
                        <li>Voraussetzungen wie bei der WBK, jedoch deutlich strengere Bedürfnisprüfung</li>
                        <li>Wird nur erteilt, wenn besonderes Bedürfnis nachgewiesen wird (z.B. erhöhte Gefährdung)</li>
                        <li>Befristet gültig (in der Regel 1-3 Jahre)</li>
                        <li>Kann mit Auflagen verbunden sein</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border overflow-hidden">
                    <CardHeader className="bg-muted py-2">
                      <CardTitle className="text-sm">Kleiner Waffenschein</CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <p className="mb-2">
                        Der Kleine Waffenschein berechtigt zum <strong>Führen von Schreckschuss-, Reizstoff- und Signalwaffen</strong> 
                        mit PTB-Kennzeichen (Pfeffersprays mit Tierabwehrzweck sind ohne Kleinen Waffenschein führbar).
                      </p>
                      <ul className="list-disc list-inside text-xs text-muted-foreground">
                        <li>Voraussetzungen: Mindestalter 18 Jahre, Zuverlässigkeit, persönliche Eignung</li>
                        <li>Kein Bedürfnisnachweis erforderlich</li>
                        <li>Keine Sachkunde erforderlich</li>
                        <li>Unbefristet gültig</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-600" />
                  Besondere Regelungen für das Sicherheitsgewerbe
                </h3>
                <div className="text-sm space-y-3">
                  <p>
                    Für das Sicherheitsgewerbe gelten einige besondere waffenrechtliche Regelungen:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      <strong>Anzeigepflicht nach § 34a Abs. 5 GewO:</strong> Der Einsatz von Waffen und Hunden im Bewachungsgewerbe 
                      muss der zuständigen Behörde angezeigt werden.
                    </li>
                    <li>
                      <strong>Bedürfnisnachweis:</strong> Ein Bedürfnis für Schusswaffen wird im Sicherheitsgewerbe nur in 
                      besonderen Gefährdungslagen anerkannt, insbesondere im Werttransport und bei bestimmten Objektschutztätigkeiten.
                    </li>
                    <li>
                      <strong>Aufbewahrung:</strong> Besonders strenge Vorschriften zur sicheren Aufbewahrung von Waffen und Munition 
                      (verschließbare Waffenschränke bestimmter Sicherheitsstufen).
                    </li>
                    <li>
                      <strong>Ausbildung:</strong> Spezielle Schulungen für den Umgang mit Waffen im Sicherheitsgewerbe sind erforderlich.
                    </li>
                  </ul>
                  <div className="bg-muted p-3 rounded mt-2">
                    <p className="text-xs">
                      <strong>Wichtig für die Prüfung:</strong> Unterscheiden Sie genau zwischen den Begriffen "Besitz" und "Führen" 
                      von Waffen! Der Besitz einer Waffe ist das tatsächliche Herrschaftsverhältnis über die Waffe. Das Führen ist 
                      das Beisichtragen außerhalb der eigenen Wohnung, Geschäftsräume oder des befriedeten Besitztums in zugriffsbereit 
                      und einsatzbereitem Zustand.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Praxiswissen */}
        <TabsContent value="praxis" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Praxiswissen zum Umgang mit Waffen und Verteidigungsmitteln</h2>
            
            <p>
              Neben den rechtlichen Grundlagen ist auch praktisches Wissen zum sicheren und effektiven Umgang mit 
              Waffen und Verteidigungsmitteln für Sicherheitsmitarbeiter wichtig.
            </p>
            
            <div className="mt-6 space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Sicherer Umgang mit Waffen und Verteidigungsmitteln</CardTitle>
                  <CardDescription>Allgemeine Grundsätze</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>
                      <strong>Regelmäßiges Training:</strong> Sichere Handhabung und effektiver Einsatz erfordern regelmäßiges 
                      Training und Übung.
                    </li>
                    <li>
                      <strong>Waffenpflege und -kontrolle:</strong> Regelmäßige Überprüfung der Funktionsfähigkeit und ordnungsgemäße 
                      Pflege von Waffen und Verteidigungsmitteln.
                    </li>
                    <li>
                      <strong>Sichere Aufbewahrung:</strong> Waffen und Verteidigungsmittel müssen sicher und vor unbefugtem Zugriff 
                      geschützt aufbewahrt werden.
                    </li>
                    <li>
                      <strong>Kenntnisse zu Wirkungsweise und Risiken:</strong> Umfassende Kenntnisse über Wirkung und mögliche 
                      Risiken der eingesetzten Mittel.
                    </li>
                    <li>
                      <strong>Erste-Hilfe-Kenntnisse:</strong> Fähigkeit zur Ersten Hilfe bei Verletzungen, die durch den Einsatz 
                      von Waffen und Verteidigungsmitteln entstehen können.
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Entscheidungskriterien für den Einsatz</CardTitle>
                  <CardDescription>Wann ist der Einsatz von Waffen und Verteidigungsmitteln gerechtfertigt?</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2 text-sm">
                    <p>
                      Der Einsatz von Waffen und Verteidigungsmitteln sollte stets die <strong>ultima ratio</strong> (letztes Mittel) sein 
                      und nur erfolgen, wenn andere Maßnahmen nicht ausreichen. Folgende Kriterien sollten beachtet werden:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Rechtliche Grundlage:</strong> Liegt eine Notwehr-/Nothilfesituation oder eine Notstandslage vor?</li>
                      <li><strong>Verhältnismäßigkeit:</strong> Ist der Einsatz verhältnismäßig zur Abwehr der Gefahr?</li>
                      <li><strong>Eigensicherung:</strong> Besteht eine unmittelbare Gefahr für Leib und Leben?</li>
                      <li><strong>Deeskalationspotential:</strong> Sind deeskalierende Maßnahmen noch möglich?</li>
                      <li><strong>Kollateralschäden:</strong> Gefährdung unbeteiligter Dritter?</li>
                    </ul>
                  </div>
                  <div className="bg-muted p-3 rounded mt-2">
                    <p className="text-xs">
                      <strong>Handlungsgrundsatz:</strong> Bei Unsicherheit über die Rechtmäßigkeit des Einsatzes von Waffen und 
                      Verteidigungsmitteln sollte im Zweifel darauf verzichtet werden. Die Sicherheit von Personen hat stets Vorrang 
                      vor dem Schutz von Sachwerten.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Handlungsschema beim Einsatz</CardTitle>
                  <CardDescription>Vorgehensweise in der Praxis</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2 text-sm">
                    <p>
                      Beim Einsatz von Waffen und Verteidigungsmitteln ist ein strukturiertes Vorgehen wichtig:
                    </p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li><strong>Lagebeurteilung:</strong> Schnelle, aber gründliche Einschätzung der Situation</li>
                      <li><strong>Androhung:</strong> Deutliche verbale Androhung des Einsatzes (soweit möglich und zumutbar)</li>
                      <li><strong>Einsatz:</strong> Verhältnismäßiger Einsatz des Mittels (minimale erforderliche Gewalt)</li>
                      <li><strong>Beendigung:</strong> Sofortige Beendigung des Einsatzes, sobald der Zweck erreicht ist</li>
                      <li><strong>Erste Hilfe:</strong> Bei Verletzungen umgehende Leistung von Erster Hilfe</li>
                      <li><strong>Dokumentation:</strong> Genaue Dokumentation des Vorfalls und des Einsatzes</li>
                      <li><strong>Meldung:</strong> Information an Vorgesetzte und ggf. Polizei</li>
                    </ol>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Nach dem Einsatz</CardTitle>
                  <CardDescription>Wichtige Maßnahmen nach dem Einsatz von Waffen oder Verteidigungsmitteln</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2 text-sm">
                    <p>
                      Nach dem Einsatz von Waffen oder Verteidigungsmitteln sind folgende Maßnahmen wichtig:
                    </p>
                    <ul className="list-disc list-inside space-y-1">
                      <li><strong>Medizinische Versorgung:</strong> Sicherstellung der medizinischen Versorgung für verletzte Personen</li>
                      <li><strong>Polizei informieren:</strong> Bei schwerwiegenden Vorfällen umgehende Information der Polizei</li>
                      <li><strong>Beweissicherung:</strong> Sicherung von Beweismitteln und Protokollierung von Zeugenaussagen</li>
                      <li><strong>Detaillierte Dokumentation:</strong> Erstellung eines genauen Einsatzberichts mit allen relevanten Details</li>
                      <li><strong>Nachbereitung:</strong> Interne Nachbesprechung des Vorfalls zur Überprüfung der Vorgehensweise</li>
                      <li><strong>Psychologische Betreuung:</strong> Bei Bedarf Angebot psychologischer Unterstützung für beteiligte Mitarbeiter</li>
                    </ul>
                  </div>
                  <div className="bg-muted p-3 rounded mt-2">
                    <p className="text-xs">
                      <strong>Tipp für die Prüfung:</strong> Die Dokumentation des Einsatzes von Waffen und Verteidigungsmitteln ist nicht 
                      nur für die interne Nachbereitung wichtig, sondern kann auch bei eventuellen rechtlichen Auseinandersetzungen von 
                      entscheidender Bedeutung sein.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Wichtig für die Prüfung</AlertTitle>
            <AlertDescription>
              Bei der Sachkundeprüfung werden häufig Fallbeispiele zum Einsatz von Waffen und Verteidigungsmitteln abgefragt. 
              Dabei müssen Sie beurteilen können, ob der Einsatz rechtmäßig war und welche Alternativen es gegeben hätte. 
              Achten Sie besonders auf die Verhältnismäßigkeit der eingesetzten Mittel und die Rechtfertigungsgründe!
            </AlertDescription>
          </Alert>
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
                <span><strong>Waffe:</strong> Gegenstand, der nach Beschaffenheit, Handhabung oder Wirkungsweise geeignet ist, die Angriffs- oder Abwehrfähigkeit von Menschen zu beseitigen oder herabzusetzen</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Erlaubnispflicht:</strong> Grundsatz, dass der Umgang mit Waffen (Erwerb, Besitz, Führen) grundsätzlich einer behördlichen Erlaubnis bedarf</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Führen einer Waffe:</strong> Zugriffsbereit bei sich tragen außerhalb der eigenen Wohnung, Geschäftsräume oder des befriedeten Besitztums</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Anzeigepflicht nach § 34a GewO:</strong> Pflicht zur Anzeige des Einsatzes von Waffen und Hunden im Bewachungsgewerbe bei der zuständigen Behörde</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Häufige Prüfungsfragen</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Welche rechtlichen Voraussetzungen müssen für das Führen eines Reizstoffsprühgeräts erfüllt sein?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Was ist der Unterschied zwischen einem Waffenschein und einer Waffenbesitzkarte?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Welche Anzeigepflichten bestehen beim Einsatz von Waffen und Hunden im Bewachungsgewerbe?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Unter welchen Voraussetzungen darf ein Sicherheitsmitarbeiter einen Schlagstock einsetzen?</span>
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
            href="/blog/Sachkunde34a/UVV"
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
            href="https://www.gesetze-im-internet.de/waffg_2002/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Waffengesetz (WaffG) im Volltext</span>
          </a>
          
          <a
            href="https://www.gesetze-im-internet.de/awaffv/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Allgemeine Waffengesetz-Verordnung (AWaffV) im Volltext</span>
          </a>
        </div>
      </div>
    </div>
  );
}

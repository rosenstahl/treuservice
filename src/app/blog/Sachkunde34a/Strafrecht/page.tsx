import Link from "next/link";
import { Metadata } from "next";
import { ArrowLeft, BookOpen, AlertTriangle, CheckCircle, HelpCircle, MousePointer, ExternalLink, Gavel, AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Straf- und Strafverfahrensrecht | Sachkunde §34a",
  description: "Grundlagen des Straf- und Strafverfahrensrechts für die Sachkundeprüfung §34a GewO - Straftaten, Notwehr und Notstand, vorläufige Festnahme",
};

export default function StrafrechtPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-12">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <span>/</span>
          <span>Straf- und Strafverfahrensrecht</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Straf- und Strafverfahrensrecht</h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Strafrechtliche Grundlagen für Sicherheitsmitarbeiter mit Fokus auf Notwehr, Notstand und Festnahmerecht
        </p>
      </div>

      {/* Überblick und Wichtigkeit */}
      <Alert className="bg-primary/5 border-primary/20">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Prüfungsrelevanz: Sehr Hoch</AlertTitle>
        <AlertDescription>
          Dieser Themenbereich macht etwa 15-20% der schriftlichen Prüfungsfragen aus und ist auch in der mündlichen Prüfung von zentraler Bedeutung. Besonders wichtig: Notwehr und Notstand, Jedermannsrecht und relevante Straftatbestände.
        </AlertDescription>
      </Alert>

      {/* Hauptinhalte mit Tabs */}
      <Tabs defaultValue="grundlagen" className="space-y-8">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="grundlagen">Grundlagen</TabsTrigger>
          <TabsTrigger value="straftaten">Straftatbestände</TabsTrigger>
          <TabsTrigger value="notwehr">Notwehr/Notstand</TabsTrigger>
          <TabsTrigger value="festnahme">Festnahmerecht</TabsTrigger>
        </TabsList>
        
        {/* Grundlagen */}
        <TabsContent value="grundlagen" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Grundlagen des Strafrechts</h2>
            
            <p>
              Das Strafrecht umfasst die Normen, die festlegen, welche Handlungen als Straftaten gelten
              und wie diese sanktioniert werden. Für Sicherheitsmitarbeiter ist das Wissen über strafrechtliche
              Grundlagen essentiell, um rechtmäßig handeln zu können.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Rechtsquellen des Strafrechts</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Strafgesetzbuch (StGB)</strong>: Enthält die wichtigsten Straftatbestände und allgemeine Regelungen zum Strafrecht</li>
                    <li><strong>Strafprozessordnung (StPO)</strong>: Regelt das Verfahren der Strafverfolgung</li>
                    <li><strong>Jugendgerichtsgesetz (JGG)</strong>: Spezielle Regelungen für Jugendliche und Heranwachsende</li>
                    <li><strong>Nebenstrafrecht</strong>: Strafvorschriften in anderen Gesetzen (z.B. Betäubungsmittelgesetz)</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Voraussetzungen der Strafbarkeit</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    Damit eine Handlung strafbar ist, müssen folgende Voraussetzungen erfüllt sein:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li><strong>Tatbestandsmäßigkeit</strong>: Die Handlung entspricht einem gesetzlichen Straftatbestand</li>
                    <li><strong>Rechtswidrigkeit</strong>: Es liegt kein Rechtfertigungsgrund (z.B. Notwehr) vor</li>
                    <li><strong>Schuld</strong>: Dem Täter ist die Tat auch persönlich vorwerfbar</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Straf- und Prozessrecht in der Sicherheitsbranche</h3>
            
            <p className="text-sm text-muted-foreground">
              Für Sicherheitsmitarbeiter sind folgende Aspekte des Straf- und Strafverfahrensrechts besonders wichtig:
            </p>
            
            <div className="grid grid-cols-1 gap-4 mt-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Kenntnisse relevanter Straftatbestände</h4>
                  <p className="text-sm text-muted-foreground">
                    Sicherheitsmitarbeiter müssen die wichtigsten Straftatbestände kennen, um potenzielle 
                    Straftaten zu erkennen und angemessen zu reagieren (z.B. Diebstahl, Körperverletzung, Hausfriedensbruch).
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Rechtfertigungsgründe</h4>
                  <p className="text-sm text-muted-foreground">
                    Wissen über Notwehr, Nothilfe und Notstand ist unerlässlich, da diese Gründe auch bei Sicherheitsmitarbeitern 
                    unter bestimmten Umständen eine an sich strafbare Handlung rechtfertigen können.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Vorläufige Festnahme</h4>
                  <p className="text-sm text-muted-foreground">
                    Die Kenntnis des "Jedermannsrechts" zur vorläufigen Festnahme nach § 127 StPO ist für Sicherheitspersonal 
                    besonders wichtig, da es die Grundlage für das Festhalten von Straftätern bis zum Eintreffen der Polizei bildet.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-2">Grenzen der eigenen Befugnisse</h4>
                  <p className="text-sm text-muted-foreground">
                    Sicherheitsmitarbeiter müssen die Grenzen ihrer rechtlichen Befugnisse kennen, um nicht selbst straffällig zu werden. 
                    Sie haben grundsätzlich keine hoheitlichen Befugnisse wie die Polizei.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg mt-4">
            <p className="text-sm">
              <strong>Beachte:</strong> Als Sicherheitsmitarbeiter sind Sie kein hoheitlicher Amtsträger. 
              Ihre Befugnisse unterscheiden sich grundlegend von denen der Polizei und basieren in erster Linie 
              auf den "Jedermannsrechten", privatrechtlichen Grundlagen (wie dem Hausrecht) und der Notwehr/Nothilfe.
            </p>
          </div>
        </TabsContent>
        
        {/* Straftatbestände */}
        <TabsContent value="straftaten" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Wichtige Straftatbestände</h2>
            
            <p>
              Im Folgenden werden die für das Sicherheitsgewerbe besonders relevanten Straftatbestände vorgestellt. 
              Ein gutes Verständnis dieser Tatbestände hilft Sicherheitsmitarbeitern, potenzielle Straftaten zu 
              erkennen und richtig zu reagieren.
            </p>
            
            <div className="mt-6 space-y-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">§ 123 StGB</Badge>
                      <span>Hausfriedensbruch</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Definition:</strong> Wer in die Wohnung, in die Geschäftsräume oder in das befriedete Besitztum eines 
                        anderen oder in abgeschlossene Räume, welche zum öffentlichen Dienst oder Verkehr bestimmt sind, widerrechtlich 
                        eindringt oder wer, wenn er ohne Befugnis darin verweilt, auf die Aufforderung des Berechtigten sich nicht entfernt.
                      </p>
                      <p>
                        <strong>Strafmaß:</strong> Freiheitsstrafe bis zu einem Jahr oder Geldstrafe
                      </p>
                      <p>
                        <strong>Praxisrelevanz:</strong> Sehr hoch im Sicherheitsgewerbe, da häufig mit Hausverboten und der Durchsetzung 
                        des Hausrechts zu tun. Die Straftat wird nur auf Antrag verfolgt, es sei denn, die Strafverfolgungsbehörde hält ein 
                        Einschreiten wegen des besonderen öffentlichen Interesses für geboten.
                      </p>
                      <div className="bg-muted p-2 rounded mt-2">
                        <p className="text-xs">
                          <strong>Beispiel:</strong> Eine Person betritt trotz ausdrücklichen Hausverbots ein Kaufhaus oder weigert sich, 
                          nach Aufforderung durch einen bevollmächtigten Sicherheitsmitarbeiter, das Gebäude zu verlassen.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">§ 223-229 StGB</Badge>
                      <span>Körperverletzungsdelikte</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="mb-3">
                        <p>
                          <strong>Körperverletzung (§ 223 StGB):</strong> Wer eine andere Person körperlich misshandelt oder an der 
                          Gesundheit schädigt. Strafmaß: Freiheitsstrafe bis zu fünf Jahren oder Geldstrafe.
                        </p>
                      </div>
                      <div className="mb-3">
                        <p>
                          <strong>Gefährliche Körperverletzung (§ 224 StGB):</strong> Körperverletzung mittels einer Waffe, eines gefährlichen 
                          Werkzeugs, durch einen hinterlistigen Überfall, gemeinschaftlich oder mittels einer das Leben gefährdenden Behandlung. 
                          Strafmaß: Freiheitsstrafe von sechs Monaten bis zu zehn Jahren.
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Praxisrelevanz:</strong> Sicherheitsmitarbeiter müssen die Grenzen zulässiger körperlicher Einwirkung kennen. 
                          Bei Überschreitung droht eigene Strafbarkeit. Bei Notwehr/Nothilfe kann eine Körperverletzung gerechtfertigt sein.
                        </p>
                      </div>
                      <div className="bg-muted p-2 rounded mt-2">
                        <p className="text-xs">
                          <strong>Wichtig:</strong> Auch bei der Ausübung des Hausrechts oder der vorläufigen Festnahme darf nur das mildeste 
                          erforderliche Mittel angewandt werden. Übermäßige Gewalt kann zu eigener Strafbarkeit führen!
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">§ 242-244a StGB</Badge>
                      <span>Diebstahlsdelikte</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="mb-3">
                        <p>
                          <strong>Diebstahl (§ 242 StGB):</strong> Wer eine fremde bewegliche Sache einem anderen in der Absicht wegnimmt, die 
                          Sache sich oder einem Dritten rechtswidrig zuzueignen. Strafmaß: Freiheitsstrafe bis zu fünf Jahren oder Geldstrafe.
                        </p>
                      </div>
                      <div className="mb-3">
                        <p>
                          <strong>Besonders schwerer Fall des Diebstahls (§ 243 StGB):</strong> Qualifizierte Form z.B. bei Einbruch, 
                          Diebstahl aus verschlossenem Behältnis oder gewerbsmäßiger Begehung. Strafmaß: Freiheitsstrafe von drei Monaten 
                          bis zu zehn Jahren.
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Praxisrelevanz:</strong> Häufiger Anwendungsfall im Einzelhandel und bei der Objektsicherung. Bei 
                          Ladendiebstahl ist oft das Festnahmerecht nach § 127 StPO relevant.
                        </p>
                      </div>
                      <div className="bg-muted p-2 rounded mt-2">
                        <p className="text-xs">
                          <strong>Hinweis:</strong> Die Wegnahme einer Sache muss zur rechtmäßigen Festnahme bereits vollendet sein. 
                          Ein bloßer Versuch reicht für das Festnahmerecht nicht aus, kann aber als Hausrecht-Durchsetzung relevant sein.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">§ 239 StGB</Badge>
                      <span>Freiheitsberaubung</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Definition:</strong> Wer einen Menschen einsperrt oder auf andere Weise der Freiheit beraubt.
                      </p>
                      <p>
                        <strong>Strafmaß:</strong> Freiheitsstrafe bis zu fünf Jahren oder Geldstrafe
                      </p>
                      <p>
                        <strong>Praxisrelevanz:</strong> Sicherheitsmitarbeiter müssen darauf achten, dass eine Festhaltesituation 
                        nicht zur rechtswidrigen Freiheitsberaubung wird. Eine Freiheitsberaubung kann gerechtfertigt sein bei 
                        rechtmäßiger vorläufiger Festnahme nach § 127 StPO.
                      </p>
                      <div className="bg-muted p-2 rounded mt-2">
                        <p className="text-xs">
                          <strong>Beispiel:</strong> Ein Sicherheitsmitarbeiter sperrt eine Person in einen Raum ein, obwohl die 
                          Voraussetzungen des § 127 StPO nicht vorliegen oder die Freiheitsentziehung unverhältnismäßig lange dauert.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">§ 240 StGB</Badge>
                      <span>Nötigung</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Definition:</strong> Wer einen Menschen rechtswidrig mit Gewalt oder durch Drohung mit einem empfindlichen 
                        Übel zu einer Handlung, Duldung oder Unterlassung nötigt.
                      </p>
                      <p>
                        <strong>Strafmaß:</strong> Freiheitsstrafe bis zu drei Jahren oder Geldstrafe
                      </p>
                      <p>
                        <strong>Praxisrelevanz:</strong> Kann bei übermäßigem Zwang durch Sicherheitspersonal relevant werden. Wichtig ist 
                        die Verhältnismäßigkeit der angewandten Mittel.
                      </p>
                      <div className="bg-muted p-2 rounded mt-2">
                        <p className="text-xs">
                          <strong>Beispiel:</strong> Ein Sicherheitsmitarbeiter droht einem Besucher mit Gewalt, wenn dieser nicht freiwillig 
                          seine Taschen zur Kontrolle öffnet, obwohl dafür keine rechtliche Grundlage besteht.
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-2">§ 303-305a StGB</Badge>
                      <span>Sachbeschädigung</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Definition:</strong> Wer rechtswidrig eine fremde Sache beschädigt oder zerstört.
                      </p>
                      <p>
                        <strong>Strafmaß:</strong> Freiheitsstrafe bis zu zwei Jahren oder Geldstrafe
                      </p>
                      <p>
                        <strong>Praxisrelevanz:</strong> Häufig im Zusammenhang mit Vandalismus, Graffiti oder Beschädigungen an 
                        bewachten Objekten. Beim Einschreiten gegen Sachbeschädigung ist auf die Verhältnismäßigkeit zu achten.
                      </p>
                      <div className="bg-muted p-2 rounded mt-2">
                        <p className="text-xs">
                          <strong>Hinweis:</strong> Sachbeschädigung ist ein Antragsdelikt, wird also nur auf Antrag verfolgt, 
                          es sei denn, die Strafverfolgungsbehörde hält ein Einschreiten wegen des besonderen öffentlichen Interesses für geboten.
                        </p>
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
              Bei der Sachkundeprüfung ist es besonders wichtig, die Tatbestandsmerkmale der relevanten 
              Straftaten zu kennen und zu verstehen, wann sie vorliegen. Ebenso wichtig ist das Wissen, 
              wie Sicherheitsmitarbeiter bei Verdacht auf Straftaten korrekt handeln sollten, ohne selbst 
              strafbare Handlungen zu begehen.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Notwehr/Notstand */}
        <TabsContent value="notwehr" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Notwehr und Notstand</h2>
            
            <p>
              Notwehr und Notstand sind wichtige Rechtfertigungsgründe im Strafrecht. Sie können unter 
              bestimmten Voraussetzungen eine an sich strafbare Handlung rechtfertigen. Für Sicherheitsmitarbeiter 
              sind diese Rechtfertigungsgründe von besonderer Bedeutung.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">§ 32 StGB</Badge>
                  <CardTitle className="text-base">Notwehr</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    <strong>Definition:</strong> "Wer eine Tat begeht, die durch Notwehr geboten ist, handelt nicht rechtswidrig."
                  </p>
                  <p>
                    <strong>Notwehr ist die Verteidigung, die erforderlich ist, um einen gegenwärtigen rechtswidrigen Angriff 
                    von sich oder einem anderen abzuwenden.</strong>
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Voraussetzungen:</strong>
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Notwehrlage: gegenwärtiger rechtswidriger Angriff</li>
                    <li>Notwehrhandlung: erforderliche Verteidigung</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">§ 34 StGB</Badge>
                  <CardTitle className="text-base">Rechtfertigender Notstand</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    <strong>Definition:</strong> "Wer in einer gegenwärtigen, nicht anders abwendbaren Gefahr für Leben, Leib, Freiheit, 
                    Ehre, Eigentum oder ein anderes Rechtsgut eine Tat begeht, um die Gefahr von sich oder einem anderen abzuwenden, 
                    handelt nicht rechtswidrig, wenn bei Abwägung der widerstreitenden Interessen das geschützte Interesse das 
                    beeinträchtigte wesentlich überwiegt."
                  </p>
                  <p className="text-muted-foreground">
                    <strong>Voraussetzungen:</strong>
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground">
                    <li>Notstandslage: gegenwärtige Gefahr für ein Rechtsgut</li>
                    <li>Notstandshandlung: erforderliche Abwehr der Gefahr</li>
                    <li>Interessenabwägung: geschütztes Interesse überwiegt wesentlich</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4 mt-6">
              <h3 className="text-xl font-semibold">Besonderheiten der Notwehr</h3>
              
              <div className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Gegenwärtigkeit des Angriffs</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Ein Angriff ist gegenwärtig, wenn er:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                        <li><strong>Unmittelbar bevorsteht</strong> (Vorbereitungshandlungen, die unmittelbar in den Angriff übergehen)</li>
                        <li><strong>Gerade stattfindet</strong> (während der Durchführung des Angriffs)</li>
                        <li><strong>Noch fortdauert</strong> (Angriff ist noch nicht beendet oder abgeschlossen)</li>
                      </ul>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Keine Notwehr liegt vor bei bereits abgeschlossenen Angriffen (hier droht keine Gefahr mehr) 
                        oder bei zukünftigen Angriffen, die noch nicht unmittelbar bevorstehen.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Rechtswidrigkeit des Angriffs</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Der Angriff muss rechtswidrig sein, d.h. er darf nicht erlaubt oder gerechtfertigt sein.
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                        <li>Keine Notwehr gegen rechtmäßige Handlungen staatlicher Organe (z.B. Festnahme durch die Polizei)</li>
                        <li>Keine Notwehr gegen Notwehr (sog. Notwehrprovokation)</li>
                        <li>Keine Notwehr gegen Tiere (hier ggf. Notstand möglich)</li>
                      </ul>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Die Rechtswidrigkeit des Angriffs hängt nicht davon ab, ob der Angreifer schuldhaft handelt. 
                        Auch gegen Angriffe von Kindern oder geistig Kranken ist Notwehr zulässig, allerdings 
                        unter Umständen eingeschränkt (sozialethische Notwehrbeschränkungen).
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Erforderlichkeit der Verteidigung</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Die Verteidigung muss erforderlich sein, um den Angriff abzuwehren. Erforderlich ist diejenige 
                        Verteidigung, die eine sofortige und endgültige Beendigung des Angriffs erwarten lässt und 
                        dem Angegriffenen den geringsten Schaden zufügt.
                      </p>
                      <p className="mt-2 text-sm">
                        Zu berücksichtigen sind:
                      </p>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                        <li>Geeignetheit des Verteidigungsmittels</li>
                        <li>Intensität des Einsatzes</li>
                        <li>Verhältnismäßigkeit im weiteren Sinne (bei extremem Missverhältnis)</li>
                      </ul>
                      <p className="mt-2 text-sm text-muted-foreground">
                        <strong>Wichtig:</strong> Im Gegensatz zum Notstand muss bei der Notwehr grundsätzlich keine Verhältnismäßigkeit 
                        zwischen dem bedrohten und dem durch die Verteidigung verletzten Rechtsgut bestehen. Das Recht muss dem Unrecht 
                        nicht weichen. Ausnahmen gelten bei krassen Missverhältnissen (sozialethische Einschränkungen).
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Notwehrexzess (§ 33 StGB)</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        <strong>Definition:</strong> "Überschreitet der Täter die Grenzen der Notwehr aus Verwirrung, Furcht oder Schrecken, 
                        so wird er nicht bestraft."
                      </p>
                      <p className="mt-2 text-sm">
                        Ein Notwehrexzess liegt vor, wenn:
                      </p>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                        <li>Eine Notwehrlage grundsätzlich gegeben ist</li>
                        <li>Die Grenzen der Notwehr überschritten werden (z.B. durch zu intensive Verteidigung)</li>
                        <li>Dies aus einem asthenischen Affekt (Verwirrung, Furcht, Schrecken) geschieht</li>
                      </ul>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Der Notwehrexzess führt zu einem Entschuldigungsgrund, d.h. die Tat bleibt rechtswidrig, 
                        aber dem Täter wird kein Schuldvorwurf gemacht.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Nothilfe</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Nothilfe ist die Verteidigung zur Abwehr eines gegenwärtigen rechtswidrigen Angriffs auf einen anderen.
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Wichtig für Sicherheitsmitarbeiter:</strong>
                      </p>
                      <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                        <li>Sicherheitspersonal kann Nothilfe zugunsten des Auftraggebers, dessen Kunden oder sonstiger Personen leisten</li>
                        <li>Es gelten die gleichen Voraussetzungen wie bei der Notwehr</li>
                        <li>Besondere Vorsicht bei der Einschätzung der Situation (Wer ist Angreifer, wer Verteidiger?)</li>
                      </ul>
                      <p className="mt-2 text-sm text-muted-foreground">
                        <strong>Praxisbeispiel:</strong> Ein Sicherheitsmitarbeiter greift ein, um einen Kunden vor einem tätlichen Angriff zu schützen.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg mt-4">
            <p className="text-sm">
              <strong>Prüfungshinweis:</strong> Unterscheiden Sie klar zwischen Notwehr und Notstand! Bei Notwehr geht es um die 
              Abwehr eines rechtswidrigen menschlichen Angriffs. Beim Notstand hingegen geht es um die Abwendung einer Gefahr, 
              die nicht durch einen rechtswidrigen Angriff entstanden ist. Zudem muss beim Notstand immer eine Interessenabwägung stattfinden.
            </p>
          </div>
        </TabsContent>
        
        {/* Festnahmerecht */}
        <TabsContent value="festnahme" className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Das vorläufige Festnahmerecht</h2>
            
            <p>
              Das vorläufige Festnahmerecht nach § 127 StPO (auch "Jedermannsrecht" genannt) ist eine der 
              wichtigsten Rechtsgrundlagen für das Einschreiten von Sicherheitsmitarbeitern bei Straftaten. 
              Es erlaubt unter bestimmten Voraussetzungen, Personen auch ohne richterlichen Beschluss festzuhalten.
            </p>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <Gavel className="h-5 w-5 mr-2 text-blue-600" />
                § 127 Abs. 1 StPO - Vorläufige Festnahme
              </h3>
              <p className="text-md font-medium mb-3">
                "Wird jemand auf frischer Tat betroffen oder verfolgt, so ist, wenn er der Flucht verdächtig ist oder 
                seine Identität nicht sofort festgestellt werden kann, jedermann befugt, ihn auch ohne richterliche 
                Anordnung vorläufig festzunehmen."
              </p>
              <div className="text-sm space-y-4">
                <div>
                  <p className="font-medium">Voraussetzungen:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Auf frischer Tat betroffen oder verfolgt</strong> - Die Person wird bei der Tatbegehung oder unmittelbar danach angetroffen</li>
                    <li><strong>Fluchtgefahr oder unbekannte Identität</strong> - Die Person ist fluchtgefährdet oder ihre Identität kann nicht sofort festgestellt werden</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium">Befugnisse:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Festhalten der Person bis zum Eintreffen der Polizei</li>
                    <li>Erforderliche und verhältnismäßige Maßnahmen zur Sicherung der Festnahme</li>
                    <li>Keine Durchsuchungsbefugnis (außer bei Gefahr im Verzug)</li>
                  </ul>
                </div>
                
                <div>
                  <p className="font-medium">Einschränkungen:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Nur bei Straftaten, nicht bei Ordnungswidrigkeiten</li>
                    <li>Nur zur Identitätsfeststellung oder Verhinderung der Flucht</li>
                    <li>Verhältnismäßigkeit muss gewahrt bleiben</li>
                    <li>Schnellstmögliche Übergabe an die Polizei</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 space-y-6">
              <h3 className="text-xl font-semibold">Praxisanwendung des Festnahmerechts</h3>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Beispiel: Ladendiebstahl</CardTitle>
                  <CardDescription>Korrekte Anwendung des § 127 StPO im Einzelhandel</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> Ein Sicherheitsmitarbeiter beobachtet in einem Kaufhaus, wie eine Person 
                    Waren einsteckt und ohne zu bezahlen den Kassenbereich passiert.
                  </p>
                  <div className="text-sm space-y-2">
                    <p><strong>Rechtliche Bewertung:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Diebstahl nach § 242 StGB (Straftat)</li>
                      <li>Betroffensein auf frischer Tat</li>
                      <li>Identität in der Regel nicht sofort feststellbar</li>
                    </ul>
                  </div>
                  <div className="text-sm space-y-2">
                    <p><strong>Korrekte Vorgehensweise:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Ansprechen außerhalb des Kassenbereichs</li>
                      <li>Offenlegung der Funktion als Sicherheitsmitarbeiter</li>
                      <li>Hinweis auf beobachteten Diebstahl</li>
                      <li>Aufforderung, mit in das Büro zu kommen</li>
                      <li>Bei Weigerung: Hinweis auf Festnahmerecht</li>
                      <li>Verhältnismäßiger Zwang bei Widerstand</li>
                      <li>Verständigung der Polizei</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted">
                  <CardTitle className="text-base">Grenzen des Festnahmerechts</CardTitle>
                  <CardDescription>Typische Fehler in der Praxis</CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>
                      <strong>Festnahme bei bloßem Verdacht:</strong> Das Festnahmerecht setzt voraus, dass die Person auf frischer Tat 
                      betroffen oder verfolgt wird. Ein bloßer Verdacht reicht nicht aus.
                    </li>
                    <li>
                      <strong>Festnahme bei Ordnungswidrigkeiten:</strong> Das Festnahmerecht nach § 127 StPO gilt nur bei Straftaten, 
                      nicht bei Ordnungswidrigkeiten.
                    </li>
                    <li>
                      <strong>Übermäßige Gewaltanwendung:</strong> Bei der Festnahme darf nur verhältnismäßiger Zwang angewendet werden. 
                      Übermäßige Gewalt kann zu eigener Strafbarkeit führen.
                    </li>
                    <li>
                      <strong>Unterlassene Polizeibenachrichtigung:</strong> Die Polizei ist unverzüglich zu verständigen. Eine eigenmächtige 
                      "Vernehmung" oder längerfristige Festhaltung ist nicht zulässig.
                    </li>
                    <li>
                      <strong>Durchsuchung ohne Befugnis:</strong> Das Festnahmerecht beinhaltet keine generelle Durchsuchungsbefugnis. 
                      Eine Durchsuchung ist nur bei Gefahr im Verzug oder mit Einwilligung zulässig.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Wichtig für die Prüfung</AlertTitle>
            <AlertDescription>
              Das Festnahmerecht nach § 127 StPO ist ein häufiger Prüfungsgegenstand. Achten Sie darauf, 
              die Voraussetzungen präzise zu kennen. Insbesondere wird oft geprüft, ob die Situation ein 
              Einschreiten nach § 127 StPO rechtfertigt und welche Maßnahmen verhältnismäßig sind.
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
                <span><strong>Notwehr (§ 32 StGB):</strong> Verteidigung gegen einen gegenwärtigen rechtswidrigen Angriff</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Notstand (§ 34 StGB):</strong> Abwehr einer Gefahr für ein Rechtsgut, wobei das geschützte Interesse das beeinträchtigte wesentlich überwiegt</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Vorläufige Festnahme (§ 127 StPO):</strong> Jedermannsrecht zur Festnahme bei frischer Tat und Fluchtgefahr/unbekannter Identität</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <span><strong>Hausfriedensbruch (§ 123 StGB):</strong> Widerrechtliches Eindringen oder Verweilen in fremden Räumen/Besitztum</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Häufige Prüfungsfragen</h3>
            <ul className="space-y-1">
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Was sind die Voraussetzungen für Notwehr nach § 32 StGB?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Worin liegt der Unterschied zwischen Notwehr und Notstand?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Unter welchen Voraussetzungen ist eine vorläufige Festnahme nach § 127 StPO zulässig?</span>
              </li>
              <li className="flex items-start gap-2">
                <HelpCircle className="h-4 w-4 mt-1 text-orange-600 flex-shrink-0" />
                <span>Wann liegt ein Hausfriedensbruch vor und wie darf ein Sicherheitsmitarbeiter reagieren?</span>
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
            href="/blog/Sachkunde34a/Waffen"
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
            href="https://www.gesetze-im-internet.de/stgb/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Strafgesetzbuch (StGB) im Volltext</span>
          </a>
          
          <a
            href="https://www.gesetze-im-internet.de/stpo/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Strafprozessordnung (StPO) im Volltext</span>
          </a>
        </div>
      </div>
    </div>
  );
}

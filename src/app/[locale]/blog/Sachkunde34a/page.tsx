import Link from "next/link";
import { Metadata } from "next";
import { Shield, Book, MousePointer, Scale, Gavel, Users, AlertTriangle, Scroll, Brain, Briefcase, Check, Clock, GraduationCap, ChevronRight, HelpCircle, Share } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Sachkunde § 34a GewO | TreuService",
  description: "Alles zur Sachkundeprüfung nach § 34a GewO - Vorbereitung, Lerninhalte und kostenloser Prüfungssimulator",
};

export default function Sachkunde34a() {
  return (
    <div className="container py-8 max-w-5xl mx-auto space-y-12">
      {/* Tag und Teilen-Button */}
      <div className="flex justify-between items-center mb-4">
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 uppercase">Security</Badge>
        <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <Share className="w-4 h-4 mr-1" /> Teilen
        </button>
      </div>
      
      {/* Hero Section */}
      <section className="space-y-6 text-center">
        <Badge className="px-3 py-1 mb-4 text-sm font-medium" variant="outline">
          §34a SACHKUNDEPRÜFUNG
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight">
          Ihr Weg zur erfolgreichen Sachkundeprüfung
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Umfassendes Wissen, effektive Vorbereitung und kostenlose Tools für Ihre §34a-Sachkundeprüfung
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link 
            href="/blog/Sachkunde34a/PruefungsSimulator" 
            className={buttonVariants({ size: "lg" })}
          >
            <MousePointer className="mr-2 h-4 w-4" /> Zum Prüfungssimulator
          </Link>
          <Link 
            href="#themen" 
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <Book className="mr-2 h-4 w-4" /> Zu den Lernmaterialien
          </Link>
        </div>
      </section>

      {/* Tools und Hilfsmittel */}
      <section className="grid gap-6">
        <h2 className="text-3xl font-bold tracking-tight">Tools für Ihre Prüfungsvorbereitung</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5 text-blue-600" />
                Prüfungssimulator
              </CardTitle>
              <CardDescription>
                Testen Sie Ihr Wissen unter realistischen Bedingungen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm mb-4">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Über 300 prüfungsnahe Fragen</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Verschiedene Übungsmodi</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Detaillierte Auswertung</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link 
                href="/blog/Sachkunde34a/PruefungsSimulator" 
                className={buttonVariants({ className: "w-full" })}
              >
                <MousePointer className="mr-2 h-4 w-4" /> Jetzt testen
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-t-4 border-t-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-600" />
                Prüfungsablauf
              </CardTitle>
              <CardDescription>
                Alles zum Ablauf der schriftlichen und mündlichen Prüfung
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm mb-4">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Detaillierter Prüfungsablauf</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Tipps für die mündliche Prüfung</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Checkliste für den Prüfungstag</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link 
                href="/blog/Sachkunde34a/Pruefungsablauf/" 
                className={buttonVariants({ className: "w-full" })}
              >
                <Clock className="mr-2 h-4 w-4" /> Mehr erfahren
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="border-t-4 border-t-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-green-600" />
                Fachbegriff-Glossar
              </CardTitle>
              <CardDescription>
                Wichtige Begriffe einfach erklärt
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm mb-4">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Umfassende Fachbegriffe</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Verständliche Erklärungen</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                  <span>Nach Themenbereichen sortiert</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link 
                href="/blog/Sachkunde34a/Glossar/" 
                className={buttonVariants({ className: "w-full" })}
              >
                <Book className="mr-2 h-4 w-4" /> Zum Glossar
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Informationen zur Prüfung */}
      <section className="grid gap-6">
        <h2 className="text-3xl font-bold tracking-tight">Die Sachkundeprüfung auf einen Blick</h2>
        
        <Tabs defaultValue="was">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
            <TabsTrigger value="was">Was?</TabsTrigger>
            <TabsTrigger value="wer">Wer?</TabsTrigger>
            <TabsTrigger value="wie">Wie?</TabsTrigger>
            <TabsTrigger value="wo">Wo?</TabsTrigger>
            <TabsTrigger value="kosten">Kosten</TabsTrigger>
          </TabsList>
          
          <TabsContent value="was" className="space-y-4 p-4">
            <h3 className="text-lg font-medium">Was ist die §34a-Sachkundeprüfung?</h3>
            <p>
              Die Sachkundeprüfung nach §34a der Gewerbeordnung (GewO) ist eine gesetzlich vorgeschriebene 
              Prüfung für Personen, die im Bewachungsgewerbe tätig werden möchten. Sie stellt sicher, 
              dass Sicherheitspersonal über die notwendigen rechtlichen, fachlichen und sozialen 
              Kompetenzen verfügt.
            </p>
            <div className="flex justify-end mt-2">
              <Link href="/blog/Sachkunde34a/Pruefungsablauf/" className="text-sm text-primary hover:underline flex items-center">
                Details zum Prüfungsablauf <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="wer" className="space-y-4 p-4">
            <h3 className="text-lg font-medium">Wer benötigt die Sachkundeprüfung?</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Inhaber von Bewachungsunternehmen</li>
              <li>Leitende Angestellte im Sicherheitsgewerbe</li>
              <li>Sicherheitsmitarbeiter in bestimmten Bereichen (z.B. Kontrolltätigkeiten im öffentlichen Verkehrsraum, Diskotheken, Flüchtlingsunterkünfte)</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-2">
              Hinweis: Für einfache Objektschutztätigkeiten reicht in der Regel die 40-stündige Unterrichtung
            </p>
          </TabsContent>
          
          <TabsContent value="wie" className="space-y-4 p-4">
            <h3 className="text-lg font-medium">Wie läuft die Prüfung ab?</h3>
            <div className="space-y-2">
              <p><strong>Schriftlicher Teil:</strong> Multiple-Choice-Test mit 72 Fragen aus allen relevanten Themengebieten (120 Minuten)</p>
              <p><strong>Mündlicher Teil:</strong> Prüfungsgespräch von 15-20 Minuten vor einem Prüfungsausschuss</p>
              <p><strong>Bestehensgrenze:</strong> 50% der möglichen Punkte im schriftlichen Teil</p>
            </div>
            <div className="flex justify-end mt-2">
              <Link href="/blog/Sachkunde34a/Pruefungsablauf/" className="text-sm text-primary hover:underline flex items-center">
                Ausführliche Informationen <ChevronRight className="h-3 w-3 ml-1" />
              </Link>
            </div>
          </TabsContent>
          
          <TabsContent value="wo" className="space-y-4 p-4">
            <h3 className="text-lg font-medium">Wo kann die Prüfung abgelegt werden?</h3>
            <p>
              Die Sachkundeprüfung wird von den Industrie- und Handelskammern (IHK) durchgeführt. 
              Anmeldung und Prüfung erfolgen bei der für Ihren Wohnort zuständigen IHK.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <Link href="https://www.ihk.de" target="_blank" className="underline">
                Finden Sie Ihre zuständige IHK
              </Link>
            </p>
          </TabsContent>
          
          <TabsContent value="kosten" className="space-y-4 p-4">
            <h3 className="text-lg font-medium">Welche Kosten entstehen?</h3>
            <div className="space-y-2">
              <p><strong>Prüfungsgebühr:</strong> ca. 150-200 € (je nach IHK)</p>
              <p><strong>Vorbereitungskurse:</strong> ca. 350-600 € (optional)</p>
              <p><strong>Lernmaterialien:</strong> ca. 30-80 € (optional)</p>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Hinweis: Mit unserem kostenfreien Prüfungssimulator und den Lernmaterialien können Sie 
              sich auch effektiv im Selbststudium vorbereiten.
            </p>
          </TabsContent>
        </Tabs>
      </section>

      {/* Prüfungsbereiche */}
      <section id="themen" className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Prüfungsbereiche im Überblick</h2>
        <p className="text-lg text-muted-foreground">
          Die Sachkundeprüfung umfasst neun zentrale Themenbereiche. Klicken Sie auf einen Bereich, 
          um detaillierte Informationen und spezifische Lernmaterialien zu erhalten.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-blue-600" />
                <span>Recht der öffentlichen Sicherheit und Ordnung</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Grundlagen des Sicherheitsrechts, Polizei- und Ordnungsrecht, Grundrechte
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/blog/Sachkunde34a/Recht" className="text-sm text-primary hover:underline">
                Zum Lernbereich →
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-indigo-600" />
                <span>Gewerberecht</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gewerbeordnung, Bewachungsverordnung, gewerberechtliche Pflichten
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/blog/Sachkunde34a/Gewerberecht" className="text-sm text-primary hover:underline">
                Zum Lernbereich →
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Scroll className="h-5 w-5 text-teal-600" />
                <span>Datenschutzrecht</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                DSGVO, Bundesdatenschutzgesetz, Datenschutz im Sicherheitsgewerbe
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/blog/Sachkunde34a/Datenschutz" className="text-sm text-primary hover:underline">
                Zum Lernbereich →
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Scroll className="h-5 w-5 text-amber-600" />
                <span>Bürgerliches Gesetzbuch</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Vertragsrecht, Haftungsrecht, Schadensersatzrecht, Besitz- und Eigentumsrecht
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/blog/Sachkunde34a/BGB" className="text-sm text-primary hover:underline">
                Zum Lernbereich →
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-red-600" />
                <span>Straf- und Strafverfahrensrecht</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Strafrecht, Strafprozessrecht, Jedermannsrechte, Notwehr und Notstand
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/blog/Sachkunde34a/Strafrecht" className="text-sm text-primary hover:underline">
                Zum Lernbereich →
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span>Umgang mit Verteidigungswaffen</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Waffenrecht, Umgang mit Schutzwaffen, Rechtsgrundlagen für Waffeneinsatz
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/blog/Sachkunde34a/Waffen" className="text-sm text-primary hover:underline">
                Zum Lernbereich →
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span>Unfallverhütungsvorschriften</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Arbeitsschutz, Gefährdungsbeurteilung, Sicherheitsmaßnahmen
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/blog/Sachkunde34a/UVV" className="text-sm text-primary hover:underline">
                Zum Lernbereich →
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-violet-600" />
                <span>Umgang mit Menschen</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Deeskalation, Kommunikation, Konfliktmanagement, Verhalten in Krisensituationen
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/blog/Sachkunde34a/Deeskalation" className="text-sm text-primary hover:underline">
                Zum Lernbereich →
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-cyan-600" />
                <span>Sicherheitstechnik</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sicherungstechnik, Alarmanlagen, Zutrittskontrolle, technische Überwachung
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/blog/Sachkunde34a/Sicherheitstechnik" className="text-sm text-primary hover:underline">
                Zum Lernbereich →
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Prüfungssimulator Highlights */}
      <section className="space-y-6 bg-muted/50 p-8 rounded-lg">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Kostenfreier Prüfungssimulator</h2>
            <p className="text-lg">
              Testen Sie Ihr Wissen und bereiten Sie sich optimal auf Ihre §34a-Sachkundeprüfung vor.
              Unser Simulator bietet:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-primary/10 p-1 text-primary">✓</span>
                <span>Über 300 prüfungsrelevante Fragen aus allen Themenbereichen</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-primary/10 p-1 text-primary">✓</span>
                <span>Realistische Prüfungsbedingungen mit Zeitlimit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-primary/10 p-1 text-primary">✓</span>
                <span>Detaillierte Auswertung und Erklärungen zu allen Antworten</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="rounded-full bg-primary/10 p-1 text-primary">✓</span>
                <span>Gezieltes Üben nach Themen oder Schwierigkeitsgrad</span>
              </li>
            </ul>
            
            <div className="pt-4">
              <Link 
                href="/blog/Sachkunde34a/PruefungsSimulator" 
                className={buttonVariants({ size: "lg" })}
              >
                <MousePointer className="mr-2 h-4 w-4" /> Jetzt kostenlos testen
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 rounded-lg overflow-hidden shadow-lg bg-background">
            <div className="aspect-video relative">
              {/* Hier könnte ein Screenshot des Simulators eingebunden werden */}
              <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                <Shield className="h-16 w-16 text-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Karriere im Sicherheitsgewerbe */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Karriere im Sicherheitsgewerbe</h2>
        <p className="text-lg text-muted-foreground">
          Mit der bestandenen Sachkundeprüfung eröffnen sich verschiedene Karrierewege im Sicherheitsbereich.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Tätigkeitsfelder</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-green-600" />
                <span>Objekt- und Werkschutz</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-green-600" />
                <span>Veranstaltungssicherheit</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-green-600" />
                <span>Personenschutz</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-green-600" />
                <span>City-Streife und Revierschutz</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-green-600" />
                <span>Pförtnerdienste und Empfang</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-green-600" />
                <span>Kaufhausdetektiv</span>
              </li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Weiterbildungsmöglichkeiten</h3>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-green-600" />
                <span>Servicekraft für Schutz und Sicherheit (IHK)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-green-600" />
                <span>Geprüfte Schutz- und Sicherheitskraft (IHK)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-green-600" />
                <span>Meister für Schutz und Sicherheit (IHK)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-green-600" />
                <span>Fachwirt für Schutz und Sicherheit (IHK)</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-1 text-green-600" />
                <span>Studium: Sicherheitsmanagement (B.A./M.A.)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ-Bereich */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Häufig gestellte Fragen</h2>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="font-medium">Wie lange dauert die Vorbereitung auf die Sachkundeprüfung?</h3>
            <p className="text-muted-foreground">
              Die Vorbereitungszeit variiert je nach Vorkenntnissen und Lernintensität. Im Durchschnitt 
              sollten Sie mit 4-8 Wochen rechnen, wenn Sie regelmäßig lernen.
            </p>
          </div>
          
          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="font-medium">Ist die Sachkundeprüfung schwer zu bestehen?</h3>
            <p className="text-muted-foreground">
              Die Durchfallquote liegt bei etwa 30-40%. Mit guter Vorbereitung und gezieltem Üben 
              haben Sie jedoch gute Chancen, die Prüfung beim ersten Versuch zu bestehen.
            </p>
          </div>
          
          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="font-medium">Muss ich an einem Vorbereitungskurs teilnehmen?</h3>
            <p className="text-muted-foreground">
              Nein, ein Kurs ist nicht verpflichtend. Viele Kandidaten bereiten sich erfolgreich im 
              Selbststudium vor. Unsere Lernmaterialien und der Prüfungssimulator bieten hierfür eine 
              gute Grundlage.
            </p>
          </div>
          
          <div className="border rounded-lg p-4 space-y-2">
            <h3 className="font-medium">Wie oft kann ich die Prüfung wiederholen?</h3>
            <p className="text-muted-foreground">
              Bei Nichtbestehen können Sie die Prüfung beliebig oft wiederholen. Zwischen den 
              Prüfungsversuchen sollte jedoch genügend Zeit für die erneute Vorbereitung liegen.
            </p>
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <Link 
            href="/blog/Sachkunde34a/Pruefungsablauf/" 
            className={buttonVariants({ variant: "outline" })}
          >
            <HelpCircle className="mr-2 h-4 w-4" /> Mehr Fragen & Antworten
          </Link>
        </div>
      </section>

      {/* CTA-Bereich */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Bereit für Ihre §34a-Sachkundeprüfung?</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Nutzen Sie unsere kostenfreien Lernmaterialien und den Prüfungssimulator, 
          um Ihre Erfolgschancen zu maximieren.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link 
            href="/blog/Sachkunde34a/PruefungsSimulator" 
            className={buttonVariants({ size: "lg" })}
          >
            <MousePointer className="mr-2 h-4 w-4" /> Zum Prüfungssimulator
          </Link>
          <Link 
            href="/blog/Sachkunde34a/Recht" 
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <Book className="mr-2 h-4 w-4" /> Lernmaterialien starten
          </Link>
        </div>
      </section>
    </div>
  );
}
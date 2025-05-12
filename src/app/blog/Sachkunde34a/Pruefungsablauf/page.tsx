"use client";

import React from 'react';
import Link from "next/link";
import { ArrowLeft, ChevronRight, Book, CheckCircle, Clock, Calendar, FileText, MessageSquare, AlertTriangle, HelpCircle, UserCheck, Mic, X, MousePointer, AlertCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Pruefungsablauf() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-12">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground/70" />
          <span className="text-foreground">Prüfungsablauf</span>
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            §34a Sachkundeprüfung: Ablauf und Vorbereitung
          </h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Übersicht
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Alles, was Sie über die §34a-Sachkundeprüfung wissen müssen: Ablauf, Anforderungen, Vorbereitung und hilfreiche Tipps für beide Prüfungsteile.
        </p>
      </div>

      {/* Prüfungsüberblick */}
      <Card>
        <CardHeader>
          <CardTitle>Die Sachkundeprüfung im Überblick</CardTitle>
          <CardDescription>
            Die Sachkundeprüfung nach §34a GewO besteht aus einem schriftlichen und einem mündlichen Teil, die beide bestanden werden müssen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-3">
              <div className="text-lg font-medium flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" /> Schriftlicher Teil
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <span><strong>Dauer:</strong> 120 Minuten</span>
                </li>
                <li className="flex items-start gap-2">
                  <FileText className="h-4 w-4 mt-1 text-muted-foreground" />
                  <span><strong>Format:</strong> 72 Multiple-Choice-Fragen</span>
                </li>
                <li className="flex items-start gap-2">
                  <Book className="h-4 w-4 mt-1 text-muted-foreground" />
                  <span><strong>Themenbereiche:</strong> Alle 9 prüfungsrelevanten Bereiche</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-muted-foreground" />
                  <span><strong>Bestehensgrenze:</strong> 50% der möglichen Punkte</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col space-y-3">
              <div className="text-lg font-medium flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" /> Mündlicher Teil
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                  <span><strong>Dauer:</strong> ca. 15-20 Minuten pro Teilnehmer</span>
                </li>
                <li className="flex items-start gap-2">
                  <UserCheck className="h-4 w-4 mt-1 text-muted-foreground" />
                  <span><strong>Prüfer:</strong> Prüfungsausschuss (in der Regel 3 Personen)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Book className="h-4 w-4 mt-1 text-muted-foreground" />
                  <span><strong>Format:</strong> Freies Gespräch mit Fragen zu praxisnahen Situationen</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-muted-foreground" />
                  <span><strong>Bewertung:</strong> Bestanden / Nicht bestanden</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hauptinhalt mit Tabs */}
      <Tabs defaultValue="anmeldung" className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
          <TabsTrigger value="anmeldung">Anmeldung</TabsTrigger>
          <TabsTrigger value="schriftlich">Schriftliche Prüfung</TabsTrigger>
          <TabsTrigger value="muendlich">Mündliche Prüfung</TabsTrigger>
          <TabsTrigger value="vorbereitung">Vorbereitung</TabsTrigger>
          <TabsTrigger value="checkliste">Checkliste</TabsTrigger>
        </TabsList>
        
        {/* Anmeldung */}
        <TabsContent value="anmeldung" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Anmeldung zur Sachkundeprüfung</h2>
            <p className="mb-4">
              Die Anmeldung zur §34a-Sachkundeprüfung erfolgt bei der für Ihren Wohnort zuständigen Industrie- und Handelskammer (IHK). Hier erfahren Sie alles Wichtige zum Anmeldeverfahren.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Voraussetzungen</h3>
            <div className="space-y-4">
              <p>
                Um zur Sachkundeprüfung zugelassen zu werden, müssen folgende Voraussetzungen erfüllt sein:
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Persönliche Zuverlässigkeit</p>
                    <p className="text-sm text-muted-foreground">
                      Nachzuweisen durch ein aktuelles polizeiliches Führungszeugnis (nicht älter als drei Monate)
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Geordnete Vermögensverhältnisse</p>
                    <p className="text-sm text-muted-foreground">
                      Nachzuweisen durch eine Auskunft aus dem Schuldnerverzeichnis oder eine Auskunft der SCHUFA
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Auskunft aus dem Gewerbezentralregister</p>
                    <p className="text-sm text-muted-foreground">
                      Bei der zuständigen Gemeindeverwaltung zu beantragen (nicht älter als drei Monate)
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 mt-0.5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Identitätsnachweis</p>
                    <p className="text-sm text-muted-foreground">
                      Gültiger Personalausweis oder Reisepass
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Kosten</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kostenposition</TableHead>
                  <TableHead className="text-right">Betrag (ca.)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Prüfungsgebühr (schriftlich + mündlich)</TableCell>
                  <TableCell className="text-right">150-200 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Wiederholungsprüfung (schriftlich)</TableCell>
                  <TableCell className="text-right">80-120 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Wiederholungsprüfung (mündlich)</TableCell>
                  <TableCell className="text-right">60-100 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Führungszeugnis</TableCell>
                  <TableCell className="text-right">ca. 13 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Auskunft aus dem Gewerbezentralregister</TableCell>
                  <TableCell className="text-right">ca. 13 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SCHUFA-Auskunft</TableCell>
                  <TableCell className="text-right">kostenlos - ca. 30 €</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Gesamtkosten</TableCell>
                  <TableCell className="text-right font-medium">ca. 180-260 €</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-sm text-muted-foreground mt-2">
              Die genauen Kosten können je nach IHK variieren. Erkundigen Sie sich bei Ihrer zuständigen IHK nach den aktuellen Prüfungsgebühren.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Anmeldeablauf</h3>
            <ol className="list-decimal space-y-3 ml-5">
              <li>
                <strong>Zuständige IHK ermitteln:</strong> Über die Website der <Link href="https://www.ihk.de" target="_blank" className="text-primary hover:underline">IHK</Link> die für Ihren Wohnort zuständige Kammer finden
              </li>
              <li>
                <strong>Unterlagen besorgen:</strong> Alle erforderlichen Nachweise und Dokumente einholen
              </li>
              <li>
                <strong>Anmeldeformular ausfüllen:</strong> Das Anmeldeformular der IHK vollständig ausfüllen
              </li>
              <li>
                <strong>Einreichen der Unterlagen:</strong> Anmeldeformular und alle Nachweise bei der IHK einreichen
              </li>
              <li>
                <strong>Prüfungsgebühr bezahlen:</strong> Nach Erhalt der Rechnung die Prüfungsgebühr überweisen
              </li>
              <li>
                <strong>Prüfungstermin abwarten:</strong> Die IHK teilt Ihnen den Prüfungstermin schriftlich mit
              </li>
            </ol>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Termine und Fristen</h3>
            <div className="space-y-2">
              <p>
                Die Prüfungstermine werden von den IHKs individuell festgelegt. In der Regel finden mehrere Prüfungstermine pro Jahr statt.
              </p>
              
              <div className="bg-muted p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Zu beachten:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                    <span>Die Anmeldefrist endet üblicherweise 4-6 Wochen vor dem Prüfungstermin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                    <span>Bei großer Nachfrage können Wartezeiten entstehen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                    <span>Die Unterlagen müssen vollständig sein, sonst ist keine Zulassung möglich</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <Alert className="bg-blue-50 border-blue-200">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <AlertTitle>Tipp zur Anmeldung</AlertTitle>
            <AlertDescription>
              Planen Sie genügend Zeit für die Beschaffung aller Unterlagen ein. Insbesondere das Führungszeugnis und die Auskunft aus dem Gewerbezentralregister können mehrere Wochen Bearbeitungszeit in Anspruch nehmen.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Schriftliche Prüfung */}
        <TabsContent value="schriftlich" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Der schriftliche Prüfungsteil</h2>
            <p className="mb-4">
              Der schriftliche Teil der Sachkundeprüfung besteht aus 72 Multiple-Choice-Fragen, die in 120 Minuten zu bearbeiten sind. Sie müssen mindestens 50% der möglichen Punkte erreichen, um diesen Teil zu bestehen.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Verteilung der Themenbereiche</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Themenbereich</TableHead>
                  <TableHead className="text-right">Anteil der Fragen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Recht der öffentlichen Sicherheit und Ordnung</TableCell>
                  <TableCell className="text-right">ca. 15-20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gewerberecht</TableCell>
                  <TableCell className="text-right">ca. 10-15%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Datenschutzrecht</TableCell>
                  <TableCell className="text-right">ca. 5-10%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Bürgerliches Gesetzbuch</TableCell>
                  <TableCell className="text-right">ca. 10-15%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Straf- und Strafverfahrensrecht</TableCell>
                  <TableCell className="text-right">ca. 15-20%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Umgang mit Verteidigungswaffen</TableCell>
                  <TableCell className="text-right">ca. 5-10%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Unfallverhütungsvorschriften</TableCell>
                  <TableCell className="text-right">ca. 5-10%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Umgang mit Menschen</TableCell>
                  <TableCell className="text-right">ca. 10-15%</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sicherheitstechnik</TableCell>
                  <TableCell className="text-right">ca. 5-10%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Format der Prüfung</h3>
            <div className="space-y-3">
              <p>
                Die schriftliche Prüfung besteht aus Multiple-Choice-Fragen mit folgenden Besonderheiten:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Aufbau der Fragen</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <span>Pro Frage sind eine oder mehrere Antworten korrekt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <span>In der Regel 4 Antwortmöglichkeiten pro Frage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <span>Die Anzahl der richtigen Antworten wird meistens nicht angegeben</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Bewertung</h4>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <span>Volle Punktzahl nur bei vollständig korrekter Lösung</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <span>Teilpunkte werden in der Regel nicht vergeben</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                      <span>Bei falschen Antworten gibt es keine Punktabzüge</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Ablauf am Prüfungstag</h3>
            <ol className="list-decimal space-y-3 ml-5">
              <li>
                <strong>Ankunft:</strong> Erscheinen Sie mindestens 30 Minuten vor Prüfungsbeginn am Prüfungsort, um sich in Ruhe anmelden zu können.
              </li>
              <li>
                <strong>Identitätsprüfung:</strong> Ein gültiger Personalausweis oder Reisepass ist zur Identifikation erforderlich.
              </li>
              <li>
                <strong>Einweisung:</strong> Vor Beginn der Prüfung erhalten Sie eine kurze Einweisung zum Ablauf und zur Bearbeitung des Fragebogens.
              </li>
              <li>
                <strong>Prüfungsdurchführung:</strong> Sie haben 120 Minuten Zeit, um die 72 Multiple-Choice-Fragen zu beantworten.
              </li>
              <li>
                <strong>Abgabe:</strong> Nach Ablauf der Zeit oder wenn Sie früher fertig sind, geben Sie Ihre Prüfungsunterlagen ab.
              </li>
            </ol>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Tipps für die schriftliche Prüfung</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Zeitmanagement
                </h4>
                <p className="text-sm text-muted-foreground">
                  Sie haben durchschnittlich 1,5-2 Minuten pro Frage. Teilen Sie Ihre Zeit gut ein und bleiben Sie nicht zu lange an schwierigen Fragen hängen.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Leseverständnis
                </h4>
                <p className="text-sm text-muted-foreground">
                  Lesen Sie jede Frage und alle Antwortmöglichkeiten sorgfältig durch, bevor Sie Ihre Wahl treffen.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Ausschlussverfahren
                </h4>
                <p className="text-sm text-muted-foreground">
                  Bei Unsicherheit können Sie offensichtlich falsche Antworten ausschließen, um Ihre Chancen zu verbessern.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Überprüfung
                </h4>
                <p className="text-sm text-muted-foreground">
                  Nutzen Sie verbleibende Zeit, um Ihre Antworten zu überprüfen, insbesondere bei Fragen, bei denen Sie unsicher waren.
                </p>
              </div>
            </div>
          </div>
          
          <Alert className="bg-amber-50 border-amber-200">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertTitle>Wichtiger Hinweis</AlertTitle>
            <AlertDescription>
              Bei der schriftlichen Prüfung können je nach Frage eine oder mehrere Antworten richtig sein. Lesen Sie sorgfältig die Prüfungsanweisungen, um zu erfahren, wie die Antworten zu markieren sind.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Mündliche Prüfung */}
        <TabsContent value="muendlich" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Der mündliche Prüfungsteil</h2>
            <p className="mb-4">
              Die mündliche Prüfung findet in der Regel am selben Tag wie die schriftliche Prüfung statt oder an einem separaten Termin. Sie dauert etwa 15-20 Minuten pro Teilnehmer und findet vor einem Prüfungsausschuss statt.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Format und Ablauf</h3>
            <div className="space-y-4">
              <p>
                In der mündlichen Prüfung wird Ihr Wissen in den verschiedenen Themenbereichen der Sachkundeprüfung geprüft, wobei der Schwerpunkt oft auf praktischen Anwendungsfällen liegt. Der Ablauf gestaltet sich typischerweise wie folgt:
              </p>
              
              <ol className="list-decimal space-y-3 ml-5">
                <li>
                  <strong>Begrüßung und Vorstellung:</strong> Der Vorsitzende des Prüfungsausschusses begrüßt Sie und stellt die Prüfer vor.
                </li>
                <li>
                  <strong>Einleitende Fragen:</strong> Oft beginnt die Prüfung mit einfacheren Fragen, um Ihnen den Einstieg zu erleichtern.
                </li>
                <li>
                  <strong>Hauptteil:</strong> Es werden praxisnahe Situationen oder Fallbeispiele geschildert, zu denen Sie Stellung nehmen und Ihr Handeln erläutern sollen.
                </li>
                <li>
                  <strong>Vertiefende Fragen:</strong> Je nach Ihren Antworten können die Prüfer in bestimmte Themenbereiche tiefer einsteigen.
                </li>
                <li>
                  <strong>Abschluss:</strong> Die Prüfer werden Ihnen mitteilen, dass die Prüfung beendet ist. Die Bekanntgabe des Ergebnisses erfolgt in der Regel erst nach Beratung des Prüfungsausschusses.
                </li>
              </ol>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Häufige Themen der mündlichen Prüfung</h3>
            <div className="space-y-4">
              <p>
                Folgende Themenkomplexe werden in der mündlichen Prüfung besonders häufig behandelt:
              </p>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Notwehr- und Nothilfesituationen</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Die Prüfer beschreiben eine Konfliktsituation und fragen, wie Sie rechtlich korrekt reagieren würden.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Beispielfrage: &quot;Ein Besucher einer Veranstaltung wird von einem anderen Gast angegriffen. Wie reagieren Sie als Sicherheitsmitarbeiter und auf welcher rechtlichen Grundlage?&quot;
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Umgang mit schwierigen Personen</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Hier geht es darum, wie Sie in Konfliktsituationen deeskalierend wirken und angemessen reagieren.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Beispielfrage: &quot;Wie gehen Sie mit einer alkoholisierten, aggressiven Person um, die den Einlass zu einer Veranstaltung fordert?&quot;
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>Festnahme und Durchsuchung</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Die Prüfer möchten wissen, ob Sie die rechtlichen Grundlagen und Grenzen von Festnahmen und Durchsuchungen kennen.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Beispielfrage: &quot;In welchem Fall dürfen Sie als Sicherheitsmitarbeiter eine Person festhalten und was müssen Sie dabei beachten?&quot;
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>Hausrecht und Hausfriedensbruch</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Die korrekte Ausübung des Hausrechts und der Umgang mit Hausfriedensbrechern sind häufige Prüfungsthemen.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Beispielfrage: &quot;Ein Besucher weigert sich, das Gebäude zu verlassen, obwohl Sie ihn dazu aufgefordert haben. Wie gehen Sie vor?&quot;
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>Gewerberechtliche Pflichten</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">
                      Die Prüfer fragen nach Ihrem Wissen über die Pflichten, die sich aus dem Gewerberecht ergeben.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Beispielfrage: &quot;Welche Unterlagen müssen Sie als Mitarbeiter im Bewachungsgewerbe bei sich führen und was muss darauf zu sehen sein?&quot;
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Tipps für die mündliche Prüfung</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Ruhig und sachlich bleiben
                </h4>
                <p className="text-sm text-muted-foreground">
                  Nervosität ist normal, lassen Sie sich davon nicht verunsichern. Sprechen Sie klar, sachlich und in angemessener Lautstärke.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Gut zuhören
                </h4>
                <p className="text-sm text-muted-foreground">
                  Hören Sie den Fragen genau zu. Bei Unklarheiten zögern Sie nicht, höflich nachzufragen, bevor Sie antworten.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Strukturierte Antworten
                </h4>
                <p className="text-sm text-muted-foreground">
                  Antworten Sie strukturiert und auf den Punkt. Nennen Sie zuerst das Wichtigste und führen Sie dann ggf. weiter aus.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Bei Wissen bleiben
                </h4>
                <p className="text-sm text-muted-foreground">
                  Sprechen Sie nur über Themen, bei denen Sie sich sicher fühlen. Bei Wissenslücken ist es besser, dies ehrlich zuzugeben als zu spekulieren.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Beispielfragen für die mündliche Prüfung</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Rechtliche Grundlagen</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>&quot;Was verstehen Sie unter dem Begriff der öffentlichen Sicherheit?&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>&quot;Erläutern Sie das Subsidiaritätsprinzip im Kontext privater Sicherheitsdienste.&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>&quot;Wann liegt ein Notstand im Sinne des § 34 StGB vor und wie unterscheidet er sich von der Notwehr?&quot;</span>
                  </li>
                </ul>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Praxisnahe Situationen</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>&quot;Sie bemerken einen Ladendieb, der gerade das Geschäft verlassen will. Wie gehen Sie vor?&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>&quot;Wie gehen Sie mit einer stark alkoholisierten, aggressiven Person um, die in das von Ihnen bewachte Objekt eindringen will?&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span>&quot;Ein Besucher fotografiert in einem Einkaufszentrum andere Kunden. Ein Kunde beschwert sich bei Ihnen. Wie reagieren Sie?&quot;</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <Alert className="bg-blue-50 border-blue-200">
            <Mic className="h-5 w-5 text-blue-600" />
            <AlertTitle>Tipp für die mündliche Prüfung</AlertTitle>
            <AlertDescription>
              Die Prüfer schätzen einen respektvollen, professionellen Auftritt. Kleiden Sie sich angemessen (Business Casual) und achten Sie auf eine höfliche Kommunikation. Dies kann einen positiven Eindruck hinterlassen.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Vorbereitung */}
        <TabsContent value="vorbereitung" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Optimale Prüfungsvorbereitung</h2>
            <p className="mb-4">
              Die systematische Vorbereitung auf beide Prüfungsteile ist entscheidend für den Erfolg. Hier finden Sie einen strukturierten Vorbereitungsplan.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Zeitplanung</h3>
            <div className="space-y-4">
              <p>
                Kalkulieren Sie für die Prüfungsvorbereitung ausreichend Zeit ein. Je nach Vorkenntnissen und Lernintensität sollten Sie mit 4-8 Wochen rechnen.
              </p>
              
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <h4 className="font-medium">Empfohlener Zeitplan:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/10 text-primary px-2 rounded text-sm">Woche 1-2</span>
                    <span>Grundlagen aller Themenbereiche erarbeiten, Überblick verschaffen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/10 text-primary px-2 rounded text-sm">Woche 3-4</span>
                    <span>Vertiefung der rechtlichen Themen (Recht der öffentl. Sicherheit, Strafrecht, BGB)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/10 text-primary px-2 rounded text-sm">Woche 5-6</span>
                    <span>Praktische Themen und spezifische Bereiche (Umgang mit Menschen, Waffen, UVV)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-primary/10 text-primary px-2 rounded text-sm">Woche 7-8</span>
                    <span>Wiederholung aller Themen, gezielte Übung mit Prüfungssimulator</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Lernmethoden</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Für den schriftlichen Teil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                    <p><strong>Fragenkatalog bearbeiten:</strong> Nutzen Sie unseren Prüfungssimulator, um mit realistischen Fragen zu üben.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                    <p><strong>Lernkarten erstellen:</strong> Fassen Sie wichtige Begriffe und Definitionen auf Karteikarten zusammen.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                    <p><strong>Mind-Maps:</strong> Strukturieren Sie komplexe Zusammenhänge visuell, um sie besser zu verstehen und zu merken.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                    <p><strong>Regelmäßige Wiederholung:</strong> Planen Sie feste Wiederholungszeiten ein, um das Gelernte zu festigen.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Für den mündlichen Teil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                    <p><strong>Rollenspiele:</strong> Üben Sie typische Prüfungssituationen mit Freunden oder Kollegen.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                    <p><strong>Lautes Sprechen:</strong> Formulieren Sie Antworten laut, um sicherer im verbalen Ausdruck zu werden.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                    <p><strong>Fallbeispiele durchspielen:</strong> Denken Sie über typische Situationen im Sicherheitsgewerbe nach und überlegen Sie, wie Sie rechtlich korrekt handeln würden.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                    <p><strong>Fachbegriffe üben:</strong> Verwenden Sie in Ihren Antworten die korrekten Fachbegriffe, um Kompetenz zu demonstrieren.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Lernmaterialien</h3>
            <div className="space-y-4">
              <p>
                Nutzen Sie verschiedene Quellen, um sich umfassend vorzubereiten:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Book className="h-5 w-5 mt-1 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Unsere Lernmaterialien</p>
                    <p className="text-sm text-muted-foreground">
                      Alle Themenbereiche unserer Website bieten Ihnen strukturiertes Wissen für die Prüfung.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FileText className="h-5 w-5 mt-1 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Gesetzestexte</p>
                    <p className="text-sm text-muted-foreground">
                      Machen Sie sich mit den relevanten Paragraphen des StGB, der StPO, des BGB und der Gewerbeordnung vertraut.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MousePointer className="h-5 w-5 mt-1 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Prüfungssimulator</p>
                    <p className="text-sm text-muted-foreground">
                      Nutzen Sie unseren kostenlosen Prüfungssimulator mit über 300 realistischen Prüfungsfragen.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 mt-1 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">IHK-Informationen</p>
                    <p className="text-sm text-muted-foreground">
                      Die Websites der IHKs bieten oft hilfreiche Informationen zur Prüfung und zum Rahmenstoffplan.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Erfahrungsberichte von erfolgreichen Prüflingen</h3>
            <div className="space-y-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Michael K., 34 Jahre</CardTitle>
                  <CardDescription>Prüfung bestanden im März 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    &quot;Die mündliche Prüfung war entspannter als ich dachte. Die Prüfer waren freundlich und haben mich zunächst mit einfachen Fragen &apos;aufgewärmt&apos;. Dann kamen wir zu konkreten Szenarien: Wie ich auf einen aggressiven Betrunkenen reagieren würde und welche rechtlichen Grundlagen es für eine vorläufige Festnahme gibt. Wichtig war, dass ich nicht nur Paragraphen zitieren konnte, sondern auch erklären konnte, wie ich in der Praxis handeln würde.&quot;
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Sandra M., 28 Jahre</CardTitle>
                  <CardDescription>Prüfung bestanden im November 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    &quot;Ich war extrem nervös vor der Prüfung. Was mir sehr geholfen hat: Ich habe mit unserem Prüfungssimulator täglich geübt und meine Antworten für die mündliche Prüfung laut geübt – vor dem Spiegel und mit Freunden. Die Prüfer haben nachgehakt, wenn meine Antworten zu allgemein waren. Also nicht nur &apos;Ich würde deeskalierend einwirken&apos; sagen, sondern konkret erklären, wie genau! Am Ende zählt, dass man zeigt, dass man sein Wissen auch anwenden kann.&quot;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <AlertTitle>Erfolgstipp</AlertTitle>
            <AlertDescription>
              Lernen Sie regelmäßig in kürzeren Einheiten (30-60 Minuten) statt in wenigen langen Sessions. Das fördert die langfristige Merkfähigkeit und beugt Ermüdung vor.
            </AlertDescription>
          </Alert>
        </TabsContent>
        
        {/* Checkliste */}
        <TabsContent value="checkliste" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Checkliste für den Prüfungstag</h2>
            <p className="mb-4">
              Mit der richtigen Vorbereitung und den notwendigen Unterlagen steht einem erfolgreichen Prüfungstag nichts im Wege.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Mitzubringende Dokumente</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Personalausweis oder Reisepass</p>
                  <p className="text-sm text-muted-foreground">
                    Ein gültiges amtliches Ausweisdokument mit Lichtbild ist zwingend erforderlich.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Prüfungseinladung der IHK</p>
                  <p className="text-sm text-muted-foreground">
                    Das Einladungsschreiben enthält wichtige Informationen zum Prüfungsablauf und muss vorgelegt werden.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Zahlungsbeleg</p>
                  <p className="text-sm text-muted-foreground">
                    Falls die Prüfungsgebühr noch nicht bezahlt wurde oder der Nachweis verlangt wird.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 border rounded-lg">
                <X className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="font-medium">Nicht mitbringen!</p>
                  <p className="text-sm text-muted-foreground">
                    Elektronische Geräte wie Smartphones, Smartwatches, Taschenrechner, sowie Unterlagen und Bücher sind in der Regel nicht erlaubt.
                  </p>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Vorbereitung am Vortag</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Prüfungsort und Anfahrt klären
                </h4>
                <p className="text-sm text-muted-foreground">
                  Recherchieren Sie den genauen Prüfungsort und planen Sie Ihre Anreise. Kalkulieren Sie genügend Zeit für unvorhergesehene Verzögerungen ein.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Zeitplan festlegen
                </h4>
                <p className="text-sm text-muted-foreground">
                  Legen Sie fest, wann Sie aufstehen müssen und wann Sie spätestens losgehen sollten, um rechtzeitig am Prüfungsort zu sein.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Dokumente bereitlegen
                </h4>
                <p className="text-sm text-muted-foreground">
                  Legen Sie alle benötigten Dokumente bereit und überprüfen Sie deren Vollständigkeit und Gültigkeit.
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Kleidung vorbereiten
                </h4>
                <p className="text-sm text-muted-foreground">
                  Wählen Sie angemessene Kleidung (Business Casual). Ein gepflegtes Erscheinungsbild hinterlässt einen positiven Eindruck.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Am Prüfungstag</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <p><strong>Ausreichend früh aufstehen</strong>, um ohne Hektik in den Tag zu starten</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <p><strong>Gesundes Frühstück</strong> einnehmen für ausreichend Energie</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <p><strong>Genügend Wasser</strong> trinken, ggf. eine Wasserflasche für die Prüfung mitnehmen (falls erlaubt)</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <p><strong>Frühzeitig losfahren</strong>, um Stress durch Verkehrsprobleme zu vermeiden</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <p><strong>Alle Dokumente</strong> nochmals auf Vollständigkeit überprüfen</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                <p><strong>Schreibmaterial</strong> (Kugelschreiber, Bleistift) mitnehmen, falls nicht gestellt</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Nach der Prüfung</h3>
            <div className="space-y-3">
              <p>
                Nach erfolgreicher Absolvierung der Sachkundeprüfung erhalten Sie:
              </p>
              
              <div className="space-y-3 mt-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                  <p><strong>Sachkundenachweis (Zertifikat):</strong> Bescheinigung über das Bestehen der Sachkundeprüfung</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-1 text-green-600 flex-shrink-0" />
                  <p><strong>Eintrag im Bewachungsregister:</strong> Die Sachkunde wird im bundesweiten Bewachungsregister erfasst</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">
                Bewahren Sie den Sachkundenachweis sorgfältig auf - er ist die Grundlage für Ihre Tätigkeit im Bewachungsgewerbe und für die Beantragung eines Bewacherausweises.
              </p>
            </div>
          </div>
          
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <AlertTitle>Wichtiger Hinweis</AlertTitle>
            <AlertDescription>
              Erkundigen Sie sich vor der Prüfung bei Ihrer zuständigen IHK nach den genauen Regelungen bezüglich erlaubter Hilfsmittel und mitzubringender Unterlagen, da diese je nach IHK variieren können.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      {/* Statistiken zur Prüfung */}
      <Card className="bg-muted/30">
        <CardHeader>
          <CardTitle>Statistiken zur 34a-Sachkundeprüfung</CardTitle>
          <CardDescription>
            Informationen auf Basis der bundesweiten Prüfungsstatistiken
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-background p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">60-70%</p>
              <p className="text-sm text-muted-foreground">Durchschnittliche Bestehensquote</p>
            </div>
            <div className="bg-background p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">72</p>
              <p className="text-sm text-muted-foreground">Fragen im schriftlichen Teil</p>
            </div>
            <div className="bg-background p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">15-20 min</p>
              <p className="text-sm text-muted-foreground">Dauer der mündlichen Prüfung</p>
            </div>
            <div className="bg-background p-4 rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">50%</p>
              <p className="text-sm text-muted-foreground">Mindestpunktzahl zum Bestehen</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA-Bereich */}
      <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
        <div>
          <h3 className="text-lg font-medium mb-2">Optimal vorbereitet zur Prüfung</h3>
          <p className="text-sm text-muted-foreground">
            Nutzen Sie unseren Prüfungssimulator und die thematischen Lernmaterialien für eine umfassende Vorbereitung.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/blog/Sachkunde34a/Glossar"
            className={buttonVariants({ variant: "outline" })}
          >
            <Book className="mr-2 h-4 w-4" /> Zum Glossar
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
        <h3 className="text-lg font-medium">Weitere hilfreiche Informationen</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link 
            href="/blog/Sachkunde34a/Glossar" 
            className="flex items-center justify-between p-4 border rounded hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Book className="h-5 w-5 text-primary" />
              <span>Fachbegriffe im Glossar nachschlagen</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
          
          <Link 
            href="/blog/Sachkunde34a" 
            className="flex items-center justify-between p-4 border rounded hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <span>Überblick über alle Themenbereiche</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </div>
  );
}
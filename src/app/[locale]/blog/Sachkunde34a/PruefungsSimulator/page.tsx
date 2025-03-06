"use client"

import React from 'react'
import Link from "next/link"
import { ArrowLeft, ChevronRight, AlertTriangle, InfoIcon, CheckCircle, BookOpen, Shield, Timer, Users } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import PruefungsSimulator from './PruefungsSimulator'

export default function PruefungsSimulatorPage() {
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 sm:px-6">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <ChevronRight className="w-3 h-3 text-muted-foreground/70" />
          <span className="text-foreground">Prüfungssimulator</span>
        </div>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            §34a Sachkundeprüfungs-Simulator
          </h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück zur Übersicht
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-3xl">
          Bereiten Sie sich optimal auf Ihre §34a Sachkundeprüfung vor. Mit unserem kostenlosen Prüfungssimulator trainieren Sie unter realistischen Bedingungen.
        </p>
      </div>

      {/* Hauptinhalt mit Simulator und Seitenleiste */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Hauptbereich mit Simulator */}
        <div className="lg:col-span-8 space-y-8">
          {/* Hinweisbox */}
          <Alert className="bg-primary/5 border-primary/20">
            <InfoIcon className="h-5 w-5" />
            <AlertTitle>Über 300 Prüfungsfragen</AlertTitle>
            <AlertDescription>
              Der Simulator enthält Fragen aus allen prüfungsrelevanten Themenbereichen und wird regelmäßig aktualisiert.
            </AlertDescription>
          </Alert>

          {/* Prüfungssimulator Komponente */}
          <PruefungsSimulator />
          
          {/* Modi-Erklärungen */}
          <div className="mt-12 space-y-2">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Prüfungsmodi im Detail</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Empfohlen für Anfänger</Badge>
                  <CardTitle className="text-base">Trainingsmodus</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    <strong>10 Fragen | Keine Zeitbegrenzung</strong>
                  </p>
                  <p>
                    Idealer Einstieg in die Prüfungsvorbereitung. Lernen Sie die verschiedenen Themengebiete kennen und verstehen Sie die Antworten durch ausführliche Erklärungen.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                    <li>Ausführliche Erklärungen</li>
                    <li>Keine Stresssituation</li>
                    <li>Gezieltes Lernen</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-red-500">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Echte Prüfungsbedingungen</Badge>
                  <CardTitle className="text-base">Prüfungssimulation</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    <strong>30 Fragen | 60 Minuten</strong>
                  </p>
                  <p>
                    Testen Sie Ihre Vorbereitung unter realistischen Prüfungsbedingungen. Die Zeitbegrenzung und Fragenanzahl entsprechen der realen Sachkundeprüfung.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                    <li>Realistisches Zeitlimit</li>
                    <li>Gemischte Themengebiete</li>
                    <li>Authentisches Prüfungsgefühl</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Zielgerichtetes Lernen</Badge>
                  <CardTitle className="text-base">Nach Themenbereich</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    <strong>10 Fragen | Keine Zeitbegrenzung</strong>
                  </p>
                  <p>
                    Fokussieren Sie sich auf einzelne Themenbereiche, in denen Sie noch Unsicherheiten haben. So können Sie gezielt Schwächen ausgleichen.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                    <li>Recht der öffentlichen Sicherheit</li>
                    <li>Gewerberecht, Datenschutz, Strafrecht</li>
                    <li>Umgang mit Menschen und Sicherheitstechnik</li>
                    <li>Und alle weiteren Prüfungsthemen</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-amber-500">
                <CardHeader className="pb-2">
                  <Badge variant="outline" className="mb-1 w-fit">Individuelles Training</Badge>
                  <CardTitle className="text-base">Nach Schwierigkeit</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    <strong>10 Fragen | Keine Zeitbegrenzung</strong>
                  </p>
                  <p>
                    Steigern Sie allmählich den Schwierigkeitsgrad. Beginnen Sie mit leichten Fragen und arbeiten Sie sich zu den anspruchsvolleren Aufgaben vor.
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
                    <li>Leichte Fragen (Grundlagenwissen)</li>
                    <li>Mittlere Fragen (Standardwissen)</li>
                    <li>Schwere Fragen (Detailwissen)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Tipps zur Prüfungsvorbereitung */}
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold tracking-tight">Tipps für die Prüfungsvorbereitung</h2>
            
            <Tabs defaultValue="vor">
              <TabsList className="w-full">
                <TabsTrigger value="vor">Vor der Prüfung</TabsTrigger>
                <TabsTrigger value="waehrend">Während der Prüfung</TabsTrigger>
                <TabsTrigger value="nach">Nach der Prüfung</TabsTrigger>
              </TabsList>
              
              <TabsContent value="vor" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Optimale Vorbereitung für Ihre §34a-Sachkundeprüfung</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Frühzeitig beginnen:</strong>
                        <p className="text-sm text-muted-foreground">Planen Sie 4-8 Wochen für die Vorbereitung ein, je nach Vorkenntnissen.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Regelmäßig üben:</strong>
                        <p className="text-sm text-muted-foreground">Legen Sie einen festen Zeitplan fest. Tägliches Training von 30-60 Minuten ist effektiver als sporadisches Lernen.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Alle Themenbereiche abdecken:</strong>
                        <p className="text-sm text-muted-foreground">Nutzen Sie unsere thematisch gegliederten Lernmaterialien, um alle Prüfungsgebiete zu erfassen.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Prüfungssimulationen durchführen:</strong>
                        <p className="text-sm text-muted-foreground">Absolvieren Sie mehrere vollständige Prüfungssimulationen, um sich an das Zeitlimit zu gewöhnen.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="waehrend" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Strategien für den Prüfungstag</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Ruhe bewahren:</strong>
                        <p className="text-sm text-muted-foreground">Nervosität ist normal, lassen Sie sich davon nicht aus dem Konzept bringen.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Fragen sorgfältig lesen:</strong>
                        <p className="text-sm text-muted-foreground">Achten Sie auf wichtige Schlüsselwörter und verneinende Formulierungen.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Zeitmanagement:</strong>
                        <p className="text-sm text-muted-foreground">Etwa 1,5-2 Minuten pro Frage einplanen. Schwierige Fragen markieren und später bearbeiten.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Ausschlussverfahren:</strong>
                        <p className="text-sm text-muted-foreground">Bei Unsicherheit offensichtlich falsche Antworten ausschließen, um die Wahrscheinlichkeit zu erhöhen.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="nach" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Nach der Prüfung</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Ergebnis analysieren:</strong>
                        <p className="text-sm text-muted-foreground">Identifizieren Sie Ihre Stärken und Schwächen anhand der Auswertung.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Bei Nichtbestehen:</strong>
                        <p className="text-sm text-muted-foreground">Fokussieren Sie sich auf die Themenbereiche, in denen Sie Schwächen hatten, und versuchen Sie es erneut.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <strong>Nach Bestehen:</strong>
                        <p className="text-sm text-muted-foreground">Bereiten Sie sich auf den mündlichen Prüfungsteil vor, falls dieser noch ansteht.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Wichtiger Hinweis */}
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 mt-8">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Wichtiger Hinweis</AlertTitle>
            <AlertDescription>
              Der Prüfungssimulator ist ein Lernwerkzeug und kann die offizielle IHK-Sachkundeprüfung nicht ersetzen. Die Fragen entsprechen dem aktuellen Wissensstand, können aber von den tatsächlichen Prüfungsfragen abweichen.
            </AlertDescription>
          </Alert>
        </div>
        
        {/* Seitenleiste */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 space-y-6">
            {/* Prüfungsinformationen */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Über die Prüfung
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Timer className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Prüfungsdauer</p>
                    <p className="text-sm text-muted-foreground">120 Minuten (schriftlicher Teil)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Prüfungsformat</p>
                    <p className="text-sm text-muted-foreground">72 Multiple-Choice-Fragen (schriftlich) + 15-20 min. mündliche Prüfung</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Bestehensgrenze</p>
                    <p className="text-sm text-muted-foreground">Mindestens 50% der möglichen Punkte</p>
                  </div>
                </div>
                
                <Separator className="my-2" />
                
                <Link 
                  href="/blog/Sachkunde34a"
                  className="text-primary hover:underline text-sm flex items-center"
                >
                  <InfoIcon className="h-4 w-4 mr-1" /> Mehr Infos zur Prüfung
                </Link>
              </CardContent>
            </Card>
            
            {/* Thematische Lernmaterialien */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Lernmaterialien
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link 
                    href="/blog/Sachkunde34a/Recht" 
                    className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm">Recht der öffentlichen Sicherheit</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  
                  <Link 
                    href="/blog/Sachkunde34a/Gewerberecht" 
                    className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm">Gewerberecht</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                  
                  <div className="flex items-center justify-between p-2 text-sm text-muted-foreground">
                    <span>Weitere Themenbereiche</span>
                    <Badge variant="outline" className="text-xs">Demnächst</Badge>
                  </div>
                </div>
                
                <Separator className="my-3" />
                
                <Link
                  href="/blog/Sachkunde34a"
                  className="text-primary hover:underline text-sm flex items-center"
                >
                  <BookOpen className="h-4 w-4 mr-1" /> Alle Lernthemen anzeigen
                </Link>
              </CardContent>
            </Card>
            
            {/* Services Promotion */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Professionelle Sicherheitsdienste</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  TREU Service bietet professionelle Sicherheitsdienstleistungen für Unternehmen und Privatpersonen. Unsere Mitarbeiter sind nach §34a GewO qualifiziert und sorgen für Ihre Sicherheit.
                </p>
                <Link 
                  href="/security" 
                  className={buttonVariants({ variant: "outline", size: "sm", className: "w-full" })}
                >
                  Sicherheitsdienstleistungen anfragen
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

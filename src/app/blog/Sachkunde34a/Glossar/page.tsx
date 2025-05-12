"use client";

import React from 'react';
import Link from "next/link";
import { ArrowLeft, Search, Bookmark, FileText, ExternalLink, BookMarked } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GlossarPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto space-y-12">
      {/* Header mit Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/blog/Sachkunde34a" className="hover:text-primary transition-colors">
            Sachkunde §34a
          </Link>
          <span>/</span>
          <span>Glossar und Gesetzestexte</span>
        </div>
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Glossar und Gesetzestexte</h1>
          <Link
            href="/blog/Sachkunde34a"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Zurück
          </Link>
        </div>
        
        <p className="text-lg text-muted-foreground">
          Wichtige Fachbegriffe, Definitionen und relevante Gesetzestexte für die Sachkundeprüfung nach §34a GewO
        </p>
      </div>

      {/* Tabs für Glossar und Gesetzestexte */}
      <div className="space-y-8">
        <Tabs defaultValue="glossar">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2">
            <TabsTrigger value="glossar">
              Fachbegriffe & Definitionen
            </TabsTrigger>
            <TabsTrigger value="gesetze">
              Wichtige Gesetzestexte
            </TabsTrigger>
          </TabsList>
          
          {/* Glossar Tab */}
          <TabsContent value="glossar">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-10" placeholder="Nach Begriffen suchen..." />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="cursor-pointer hover:bg-muted/20 transition-colors">
                    <CardContent className="pt-6">
                      <h3 className="font-medium text-center">A-E</h3>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:bg-muted/20 transition-colors">
                    <CardContent className="pt-6">
                      <h3 className="font-medium text-center">F-L</h3>
                    </CardContent>
                  </Card>
                  
                  <Card className="cursor-pointer hover:bg-muted/20 transition-colors">
                    <CardContent className="pt-6">
                      <h3 className="font-medium text-center">M-Z</h3>
                    </CardContent>
                  </Card>
                </div>
                
                <ScrollArea className="h-[600px] rounded-md border p-4">
                  <div className="space-y-10">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight mb-4">A</h2>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Bookmark className="h-4 w-4 text-primary" />
                            Anscheinsgefahr
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Eine Situation, bei der nach den äußeren Umständen und dem Erkenntnisstand zum Zeitpunkt des Handelns alle Anhaltspunkte für eine Gefahr sprechen, sich jedoch später herausstellt, dass tatsächlich keine Gefahr bestand.
                          </p>
                          <Badge variant="outline" className="mt-1">Recht</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Bookmark className="h-4 w-4 text-primary" />
                            Arbeitsschutz
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Maßnahmen, Mittel und Methoden zum Schutz der Beschäftigten vor arbeitsbedingten Sicherheits- und Gesundheitsgefährdungen. Umfasst technische, organisatorische und personenbezogene Maßnahmen.
                          </p>
                          <Badge variant="outline" className="mt-1">UVV</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Bookmark className="h-4 w-4 text-primary" />
                            Aufenthaltsverbot
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Behördliche Anordnung, die einer Person das Verweilen an bestimmten Orten oder in bestimmten Gebieten untersagt. Zu unterscheiden vom privatrechtlichen Hausverbot.
                          </p>
                          <Badge variant="outline" className="mt-1">Recht</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight mb-4">B</h2>
                      
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Bookmark className="h-4 w-4 text-primary" />
                            Besitz
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Die tatsächliche Herrschaftsgewalt über eine Sache (faktisches Verhältnis). Zu unterscheiden vom Eigentum, das das rechtliche Verhältnis zur Sache beschreibt.
                          </p>
                          <Badge variant="outline" className="mt-1">BGB</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Bookmark className="h-4 w-4 text-primary" />
                            Bewachungsverordnung (BewachV)
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Rechtsverordnung, die Details zur Ausübung des Bewachungsgewerbes regelt. Sie konkretisiert die Anforderungen des §34a GewO bezüglich Unterrichtung, Sachkunde, Zuverlässigkeitsüberprüfung und weiterer Pflichten.
                          </p>
                          <Badge variant="outline" className="mt-1">Gewerberecht</Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Bookmark className="h-4 w-4 text-primary" />
                            Bewacherausweis
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Ausweis, den jeder im Bewachungsgewerbe Tätige nach §11 BewachV bei Ausübung seiner Tätigkeit mit sich führen muss. Muss u.a. die Bezeichnung &quot;Bewachungsgewerbe&quot;, Name und Anschrift des Gewerbetreibenden sowie Lichtbild des Inhabers enthalten.
                          </p>
                          <Badge variant="outline" className="mt-1">Gewerberecht</Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Weitere Glossareinträge hier... */}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </TabsContent>
          
          {/* Gesetzestexte Tab */}
          <TabsContent value="gesetze">
            <div className="space-y-8">
              <div className="space-y-4">
                <p>
                  Hier finden Sie die wichtigsten Gesetzestexte und Vorschriften für die Sachkundeprüfung nach §34a GewO.
                  Diese Texte sind prüfungsrelevant und sollten in ihren Grundzügen verstanden werden.
                </p>
                
                <div className="mt-6">
                  <Tabs defaultValue="gewo">
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                      <TabsTrigger value="gewo">
                        GewO/BewachV
                      </TabsTrigger>
                      <TabsTrigger value="stgb">
                        StGB/StPO
                      </TabsTrigger>
                      <TabsTrigger value="bgb">
                        BGB
                      </TabsTrigger>
                      <TabsTrigger value="dsgvo">
                        DSGVO/BDSG
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="gewo">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            § 34a Gewerbeordnung (GewO) - Bewachungsgewerbe
                          </CardTitle>
                          <CardDescription>
                            Zentrale gesetzliche Grundlage für das Bewachungsgewerbe
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm">
                            <strong>(1)</strong> Wer gewerbsmäßig Leben oder Eigentum fremder Personen bewachen will (Bewachungsgewerbe), bedarf der Erlaubnis der zuständigen Behörde. Die Erlaubnis kann mit Auflagen verbunden werden, soweit dies zum Schutze der Allgemeinheit oder der Auftraggeber erforderlich ist; unter denselben Voraussetzungen ist auch die nachträgliche Aufnahme, Änderung und Ergänzung von Auflagen zulässig. Die Erlaubnis ist zu versagen, wenn
                          </p>
                          <ol className="text-sm list-decimal list-inside space-y-2 ml-4">
                            <li>Tatsachen die Annahme rechtfertigen, dass der Antragsteller oder eine der mit der Leitung des Betriebes oder einer Zweigniederlassung beauftragten Personen die für den Gewerbebetrieb erforderliche Zuverlässigkeit nicht besitzt,</li>
                            <li>der Antragsteller oder eine der mit der Leitung des Betriebes oder einer Zweigniederlassung beauftragten Personen die für die Ausübung des Gewerbes notwendigen Fähigkeiten oder den Nachweis der Sachkunde (Sachkundeprüfung) nach § 7 der Bewachungsverordnung nicht erbracht hat oder</li>
                            <li>der Antragsteller nicht durch eine Bescheinigung einer Berufshaftpflichtversicherung oder durch eine gleichwertige Garantie nachweist, dass er über die zur Deckung von Schadenersatzansprüchen angemessenen finanziellen Mittel verfügt, die sich aus seiner Tätigkeit ergeben können.</li>
                          </ol>
                          <a 
                            href="https://www.gesetze-im-internet.de/gewo/__34a.html" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center text-sm"
                          >
                            Vollständiger Gesetzestext <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Bewachungsverordnung (BewachV)
                          </CardTitle>
                          <CardDescription>
                            Konkretisiert die Vorgaben des §34a GewO
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            Die Bewachungsverordnung (BewachV) konkretisiert die Anforderungen des §34a GewO. 
                            Sie regelt u.a. die Anforderungen an die Sachkundeprüfung, die Unterrichtung, 
                            die Zuverlässigkeitsüberprüfung, den Bewacherausweis und weitere Pflichten im Bewachungsgewerbe.
                          </p>
                          <a 
                            href="https://www.gesetze-im-internet.de/bewachv_2019/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center text-sm mt-4"
                          >
                            Vollständiger Gesetzestext <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="stgb">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Wichtige Paragraphen des Strafgesetzbuchs (StGB)
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium mb-1">§ 32 StGB - Notwehr</h3>
                            <p className="text-sm text-muted-foreground">
                              <strong>(1)</strong> Wer eine Tat begeht, die durch Notwehr geboten ist, handelt nicht rechtswidrig.<br />
                              <strong>(2)</strong> Notwehr ist die Verteidigung, die erforderlich ist, um einen gegenwärtigen rechtswidrigen Angriff von sich oder einem anderen abzuwenden.
                            </p>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-1">§ 33 StGB - Überschreitung der Notwehr</h3>
                            <p className="text-sm text-muted-foreground">
                              Überschreitet der Täter die Grenzen der Notwehr aus Verwirrung, Furcht oder Schrecken, so wird er nicht bestraft.
                            </p>
                          </div>
                          
                          <a 
                            href="https://www.gesetze-im-internet.de/stgb/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center text-sm"
                          >
                            StGB im Volltext <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="bgb">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Wichtige Paragraphen des Bürgerlichen Gesetzbuchs (BGB)
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium mb-1">§ 823 BGB - Schadensersatzpflicht</h3>
                            <p className="text-sm text-muted-foreground">
                              <strong>(1)</strong> Wer vorsätzlich oder fahrlässig das Leben, den Körper, die Gesundheit, die Freiheit, das Eigentum oder ein sonstiges Recht eines anderen widerrechtlich verletzt, ist dem anderen zum Ersatz des daraus entstehenden Schadens verpflichtet.<br />
                            </p>
                          </div>
                          
                          <a 
                            href="https://www.gesetze-im-internet.de/bgb/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center text-sm"
                          >
                            BGB im Volltext <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="dsgvo">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Datenschutz-Grundverordnung (DSGVO)
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm">
                            Die DSGVO ist die zentrale Rechtsgrundlage für den Datenschutz in der EU. 
                            Für das Sicherheitsgewerbe sind insbesondere folgende Artikel relevant:
                          </p>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-1">Art. 5 DSGVO - Grundsätze für die Verarbeitung personenbezogener Daten</h3>
                            <p className="text-sm text-muted-foreground">
                              Legt die Grundprinzipien für die Datenverarbeitung fest: Rechtmäßigkeit, Transparenz, Zweckbindung, Datenminimierung, Richtigkeit, Speicherbegrenzung, Integrität und Vertraulichkeit.
                            </p>
                          </div>
                          
                          <a 
                            href="https://dsgvo-gesetz.de/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center text-sm"
                          >
                            DSGVO im Volltext <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA-Bereich */}
      <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
        <div>
          <h3 className="text-lg font-medium mb-2">Bereit für die Prüfung?</h3>
          <p className="text-sm text-muted-foreground">
            Festigen Sie Ihr Wissen mit unserem Prüfungssimulator oder informieren Sie sich über den Ablauf der Prüfung.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/blog/Sachkunde34a/Pruefungsablauf"
            className={buttonVariants({ variant: "outline" })}
          >
            <FileText className="mr-2 h-4 w-4" /> Prüfungsablauf
          </Link>
          <Link
            href="/blog/Sachkunde34a/PruefungsSimulator"
            className={buttonVariants({})}
          >
            <BookMarked className="mr-2 h-4 w-4" /> Zum Prüfungssimulator
          </Link>
        </div>
      </div>

      {/* Weitere Ressourcen */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-medium">Weiterführende Ressourcen</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://www.gesetze-im-internet.de"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>Gesetze im Internet - Alle Bundesgesetze</span>
          </a>
          
          <a
            href="https://www.ihk.de"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded hover:bg-muted/50 transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-primary" />
            <span>IHK - Informationen zur §34a-Sachkundeprüfung</span>
          </a>
        </div>
      </div>
    </div>
  );
}
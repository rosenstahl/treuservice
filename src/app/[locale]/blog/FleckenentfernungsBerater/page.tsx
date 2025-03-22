"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  Share2, 
  Droplets, 
  Check, 
  AlertTriangle, 
  Info, 
  ShieldCheck, 
  ArrowRight, 
  Lightbulb,
  Phone,
  Mail,
  CheckCircle2,
  HelpCircle,
  ThumbsUp,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import loesungenData from './flecken-loesungen.json'

// Funktion zum Teilen des Inhalts
const ShareContent = (title: string, url: string) => {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    }).catch(error => {
      console.log('Error sharing', error);
    });
  } else {
    // Fallback für Browser ohne Web Share API
    navigator.clipboard.writeText(url).then(() => {
      alert('Link in die Zwischenablage kopiert!');
    });
  }
};

// Daten für Fleckentypen
const fleckentypen = [
  { id: "kaffee", name: "Kaffee & Tee", color: "amber" },
  { id: "rotwein", name: "Rotwein", color: "red" },
  { id: "blut", name: "Blut", color: "red" },
  { id: "tinte", name: "Tinte & Kugelschreiber", color: "blue" },
  { id: "fett", name: "Fett & Öl", color: "yellow" },
  { id: "schimmel", name: "Schimmel", color: "green" },
  { id: "urin", name: "Urin", color: "yellow" },
  { id: "schweiß", name: "Schweiß", color: "gray" },
  { id: "gras", name: "Gras & Pflanzen", color: "green" },
  { id: "kosmetik", name: "Make-up & Kosmetik", color: "pink" },
  { id: "kaugummi", name: "Kaugummi", color: "pink" },
  { id: "rost", name: "Rost", color: "orange" }
];

// Daten für Oberflächen
const oberflaechen = [
  { id: "teppich", name: "Teppich & Teppichboden" },
  { id: "polster", name: "Polstermöbel & Textilien" },
  { id: "hartboden", name: "Hartböden (Fliesen, Laminat)" },
  { id: "holz", name: "Holz & Furniere" },
  { id: "naturstein", name: "Marmor & Naturstein" },
  { id: "glas", name: "Glas & Spiegel" },
  { id: "metall", name: "Metall & Edelstahl" },
  { id: "kunststoff", name: "Kunststoff & Acryl" },
  { id: "leder", name: "Leder" },
  { id: "kleidung", name: "Kleidung" }
];

// Lösungen werden aus der JSON-Datei importiert
const loesungen = loesungenData;

export default function FleckenentfernungsBeraterPage() {
  const [fleckentyp, setFleckentyp] = useState<string>("");
  const [oberflaeche, setOberflaeche] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Funktion zum Abrufen der Lösung
  const getLoesung = () => {
    const key = `${fleckentyp}-${oberflaeche}`;
    return loesungen[key] || loesungen.default;
  };
  
  // Meta-Informationen für den Blog-Artikel
  const title = "Interaktiver Fleckenentfernungs-Berater";
  const subtitle = "Finden Sie die optimale Lösung für jeden Fleck auf jeder Oberfläche";
  const date = new Date('2025-03-21');
  const readingTime = "Interaktives Tool";
  const author = {
    name: "TREU Service Team",
    image: "/images/team/cleaning-expert.jpg"
  };
  
  // Funktion zum Zurücksetzen der Auswahl
  const resetSelection = () => {
    setFleckentyp("");
    setOberflaeche("");
    setShowResults(false);
  };
  
  // Einbindung des Beratungstools
  const handleSubmit = () => {
    if (fleckentyp && oberflaeche) {
      setShowResults(true);
    } else {
      alert("Bitte wählen Sie Fleckentyp und Oberfläche aus.");
    }
  };

  return (
    <div className="flex-1">
      <Section className="pt-0 pb-6 bg-gradient-to-b from-teal-50/50 to-background">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-teal-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog/reinigung" className="hover:text-teal-600">Reinigung</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Fleckenentfernung</span>
          </div>
          
          <div className="max-w-4xl">
            <Badge className="mb-3 bg-teal-50 text-teal-600 border border-teal-200">
              Interaktives Tool
            </Badge>
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              {subtitle}
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Flecken passieren – aber mit dem richtigen Wissen werden sie nicht zum Dauerproblem. Unser interaktiver Berater hilft Ihnen, die optimale Methode für die Entfernung verschiedenster Flecken auf allen Oberflächen zu finden.
            </Paragraph>
            
            <div className="flex items-center gap-6 text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-teal-50 p-2 rounded-full">
                  <Droplets className="h-4 w-4 text-teal-600" />
                </div>
                <span className="text-sm">{author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{format(date, 'dd. MMMM yyyy', { locale: de })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{readingTime}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Hauptinhalt */}
              <div className="prose max-w-none">
                <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-6">
                  <Image 
                    src="/images/blog/reinigung/flecken.jpg" 
                    alt="Fleckenentfernung"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <p className="text-white text-sm p-4">Die richtige Technik kann selbst hartnäckige Flecken beseitigen</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <Droplets className="w-6 h-6 mr-2 text-teal-600" />
                  Fleckenentfernung leicht gemacht
                </h2>
                
                <p>
                  Flecken gehören zu den häufigsten Reinigungsproblemen – ob auf Teppichen, Polstermöbeln, Kleidung oder anderen Oberflächen. Die gute Nachricht: Mit dem richtigen Ansatz lassen sich selbst hartnäckige Flecken oft vollständig entfernen, ohne teure Spezialreiniger oder professionelle Hilfe.
                </p>

                <p>
                  Der Schlüssel zum Erfolg liegt in drei Faktoren: <strong>schnelles Handeln</strong>, die <strong>richtige Methode</strong> und die <strong>richtigen Mittel</strong>. Unser interaktiver Berater hilft Ihnen, die optimale Lösung für Ihr spezifisches Fleckenproblem zu finden.
                </p>

                <Alert className="my-8 bg-teal-50 border-teal-200">
                  <Info className="h-5 w-5 text-teal-600" />
                  <AlertTitle className="text-teal-800">Gut zu wissen</AlertTitle>
                  <AlertDescription className="text-teal-700">
                    <p className="mt-2">Je früher Sie einen Fleck behandeln, desto höher sind die Erfolgschancen. Trockene, eingetrocknete Flecken sind deutlich schwieriger zu entfernen als frische.</p>
                  </AlertDescription>
                </Alert>

                <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 mr-2 text-teal-600" />
                  So funktioniert der Fleckenentfernungs-Berater
                </h2>
              </div>

              {/* Fleckenentfernungs-Berater Tool */}
              <Card className="shadow-md mt-6 border-t-4 border-t-teal-500">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-teal-600" />
                    <CardTitle className="text-lg">Fleckentyp und Oberfläche auswählen</CardTitle>
                  </div>
                  <CardDescription>
                    Wählen Sie den Fleckentyp und die betroffene Oberfläche aus, um maßgeschneiderte Lösungsvorschläge zu erhalten
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {/* Fleckentyp Auswahl */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">1. Um welchen Fleckentyp handelt es sich?</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {fleckentypen.map((typ) => (
                          <div key={typ.id} className="relative">
                            <input
                              type="radio"
                              id={typ.id}
                              name="fleckentyp"
                              className="peer absolute h-0 w-0 opacity-0"
                              checked={fleckentyp === typ.id}
                              onChange={() => setFleckentyp(typ.id)}
                            />
                            <Label
                              htmlFor={typ.id}
                              className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition-all text-sm
                                ${fleckentyp === typ.id 
                                  ? `bg-${typ.color}-100 border-${typ.color}-500 font-medium` 
                                  : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                            >
                              {typ.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Oberfläche Auswahl */}
                    <div>
                      <Label className="text-sm font-medium mb-3 block">2. Auf welcher Oberfläche befindet sich der Fleck?</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                        {oberflaechen.map((material) => (
                          <div key={material.id} className="relative">
                            <input
                              type="radio"
                              id={material.id}
                              name="oberflaeche"
                              className="peer absolute h-0 w-0 opacity-0"
                              checked={oberflaeche === material.id}
                              onChange={() => setOberflaeche(material.id)}
                            />
                            <Label
                              htmlFor={material.id}
                              className={`flex items-center justify-center p-3 border rounded-md cursor-pointer transition-all text-sm
                                ${oberflaeche === material.id 
                                  ? 'bg-teal-100 border-teal-500 font-medium' 
                                  : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                            >
                              {material.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Buttons */}
                    <div className="pt-4 flex flex-wrap gap-3">
                      <Button 
                        className="flex-1 min-w-[120px] bg-teal-600 hover:bg-teal-700"
                        onClick={handleSubmit}
                        disabled={!fleckentyp || !oberflaeche}
                      >
                        Lösungen anzeigen
                      </Button>
                      <Button
                        variant="outline"
                        className="min-w-[120px] border-teal-200 text-teal-700 hover:bg-teal-50"
                        onClick={resetSelection}
                      >
                        Zurücksetzen
                      </Button>
                    </div>
                  </div>
                  
                  {/* Ergebnisse */}
                  {showResults && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <div className="mb-4 flex items-center">
                        <ShieldCheck className="w-5 h-5 text-teal-600 mr-2" />
                        <h3 className="text-lg font-medium">Ihre maßgeschneiderten Lösungen</h3>
                      </div>
                      
                      <div className="bg-teal-50 p-4 rounded-lg border border-teal-100 mb-6">
                        <div className="flex items-start gap-2">
                          <ThumbsUp className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-teal-800">
                              Optimal für: {fleckentypen.find(f => f.id === fleckentyp)?.name} auf {oberflaechen.find(o => o.id === oberflaeche)?.name}
                            </p>
                            <p className="text-sm text-teal-700 mt-1">
                              Wir haben die besten Methoden für Ihre spezifische Situation zusammengestellt.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Tabs defaultValue="einfach">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="einfach">Einfache Lösung</TabsTrigger>
                          <TabsTrigger value="fortgeschritten">Fortgeschrittene Methode</TabsTrigger>
                          <TabsTrigger value="profi">Profi-Tipp</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="einfach" className="p-4 border rounded-md mt-2 bg-slate-50">
                          <h4 className="font-medium mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-teal-600 mr-2" />
                            Schnelle Soforthilfe
                          </h4>
                          <p className="text-sm">{getLoesung().einfach}</p>
                        </TabsContent>
                        
                        <TabsContent value="fortgeschritten" className="p-4 border rounded-md mt-2 bg-slate-50">
                          <h4 className="font-medium mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2" />
                            Für hartnäckigere Flecken
                          </h4>
                          <p className="text-sm">{getLoesung().fortgeschritten}</p>
                        </TabsContent>
                        
                        <TabsContent value="profi" className="p-4 border rounded-md mt-2 bg-slate-50">
                          <h4 className="font-medium mb-2 flex items-center">
                            <CheckCircle2 className="w-4 h-4 text-purple-600 mr-2" />
                            Profi-Methode für optimale Ergebnisse
                          </h4>
                          <p className="text-sm">{getLoesung().profi}</p>
                        </TabsContent>
                      </Tabs>
                      
                      <Alert className="mt-6 bg-amber-50 border-amber-200">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <AlertDescription className="text-sm text-amber-800">
                          {getLoesung().hinweis}
                        </AlertDescription>
                      </Alert>
                      
                      <div className="mt-6 p-4 border rounded-lg bg-blue-50 border-blue-200">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
                          Brauchen Sie professionelle Hilfe?
                        </h4>
                        <p className="text-sm mb-4">
                          Für besonders hartnäckige Flecken oder wertvolle Materialien bieten wir professionelle Fleckenentfernung durch unsere Experten an.
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <Link href="/reinigung#kontakt">
                            <Button size="sm" className="text-sm bg-teal-600 hover:bg-teal-700">
                              Professionelle Reinigung anfragen
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="prose max-w-none mt-12">
                <h2 className="text-2xl font-bold mb-6">Allgemeine Prinzipien der Fleckenentfernung</h2>
                
                <p>
                  Unabhängig vom spezifischen Fleck gibt es einige grundlegende Regeln, die bei jeder Fleckenbehandlung helfen:
                </p>
                
                <ul className="space-y-3 list-none pl-0 my-6">
                  <li className="flex items-start gap-3 bg-gray-50 p-3 rounded">
                    <Check className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Schnell handeln</span>: Je früher Sie einen Fleck behandeln, desto leichter lässt er sich entfernen.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-gray-50 p-3 rounded">
                    <Check className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Von außen nach innen</span>: Arbeiten Sie immer vom Rand des Flecks zur Mitte hin, um ein Ausbreiten zu verhindern.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-gray-50 p-3 rounded">
                    <Check className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Tupfen statt reiben</span>: Reiben kann den Fleck tiefer ins Material drücken und die Fasern beschädigen.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-gray-50 p-3 rounded">
                    <Check className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Materialverträglichkeit testen</span>: Testen Sie Reinigungsmittel immer zuerst an einer unauffälligen Stelle.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-gray-50 p-3 rounded">
                    <Check className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium">Geduldig sein</span>: Manche Flecken erfordern mehrere Behandlungen oder längere Einwirkzeiten.
                    </div>
                  </li>
                </ul>
                
                <h2 className="text-2xl font-bold mt-10 mb-6">Wann Sie professionelle Hilfe in Anspruch nehmen sollten</h2>
                
                <p>
                  Obwohl viele Flecken mit Hausmitteln entfernt werden können, gibt es Situationen, in denen professionelle Hilfe sinnvoll ist:
                </p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Bei sehr wertvollen oder empfindlichen Materialien (z.B. Seide, Antikholz, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Wenn Flecken bereits eingetrocknet und mehrere Wochen alt sind</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Bei großflächigen Verschmutzungen auf Teppichen oder Polstermöbeln</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Wenn eigene Reinigungsversuche die Situation verschlimmert haben</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Bei hartnäckigen Flecken unbekannter Herkunft</span>
                  </li>
                </ul>
                
                <p>
                  Unsere professionellen Reinigungsteams verfügen über spezielle Ausrüstung und Reinigungsmittel, die auch bei schwierigen Fällen zuverlässige Ergebnisse liefern.
                </p>
              </div>
              
              {/* Teilen-Button */}
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-gray-100"
                  onClick={() => ShareContent(title, window.location.href)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Teilen
                </Button>
                <Link href="/blog/reinigung">
                  <Button variant="ghost" size="sm">
                    Zurück zur Übersicht
                  </Button>
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Experten-Tipp Box */}
                <Card className="bg-teal-500/5 border-teal-500/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-6 w-6 text-yellow-500" />
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Für die meisten Flecken gilt: Je schneller Sie handeln, desto besser. Halten Sie daher immer ein grundlegendes Set an Fleckenentfernern bereit.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Ein Basis-Notfallset besteht aus: weißem Essig, Natron, Zitronensaft, Gallseife, Wasserstoffperoxid (3%) und einem enzymbasierten Fleckenmittel. Damit sind Sie für die meisten Alltagsflecken gerüstet.
                    </Paragraph>
                  </CardContent>
                </Card>
                
                {/* Verwandte Artikel */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Verwandte Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link 
                        href="/blog/NachhaltigeReinigung" 
                        className="block hover:bg-teal-50 p-2 rounded transition-colors text-sm"
                      >
                        Nachhaltige Reinigungsmethoden & Öko-Zertifizierungen
                      </Link>
                      <Link 
                        href="/blog/MaterialspezifischeReinigung" 
                        className="block hover:bg-teal-50 p-2 rounded transition-colors text-sm"
                      >
                        Materialspezifischer Reinigungsguide
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Checkliste Download */}
                <Card className="bg-teal-50 border-teal-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-teal-600" />
                      Kostenlose Ressourcen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Laden Sie unsere kostenlosen Reinigungsressourcen herunter:
                    </p>
                    <ul className="text-sm space-y-2 mb-4">
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
                        <span>Fleckenentfernungs-Checkliste zum Ausdrucken</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
                        <span>Die 10 häufigsten Flecken und ihre Lösung</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 text-teal-600 mr-2 flex-shrink-0" />
                        <span>Notfall-Fleckenentfernung für unterwegs</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-teal-200 text-teal-700 hover:bg-teal-100">
                      Checklisten herunterladen
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Kontakt-CTA */}
                <Card className="bg-teal-600 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Professionelle Reinigung benötigt?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm text-white/90 mb-4">
                      Manche Flecken erfordern professionelle Behandlung. Unsere Experten helfen Ihnen mit spezieller Ausrüstung und jahrelanger Erfahrung.
                    </Paragraph>
                    <div className="space-y-3">
                      <Link href="/reinigung#kontakt">
                        <Button className="w-full bg-white text-teal-700 hover:bg-white/90">
                          Kostenfreies Angebot anfordern
                        </Button>
                      </Link>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">Telefon</div>
                            <div className="text-sm font-medium">+49 (0) 123 456 78</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">E-Mail</div>
                            <div className="text-sm font-medium">info@treu-service.de</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
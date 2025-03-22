"use client"

import React, { useState } from 'react'
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
  PaintBucket, 
  Check, 
  AlertTriangle, 
  Info, 
  ArrowRight, 
  Lightbulb,
  Phone,
  Mail,
  CheckCircle2,
  HelpCircle,
  XCircle,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

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

// Daten für verschiedene Materialien und ihre Reinigungsmethoden
const materialData = [
  {
    id: "holz",
    name: "Holz & Furniere",
    image: "/images/blog/reinigung/holz.jpg",
    description: "Holzoberflächen verleihen Räumen Wärme und Natürlichkeit, benötigen aber spezielle Pflege, um ihre Schönheit zu erhalten.",
    geeignet: [
      "Milde pH-neutrale Reiniger",
      "Spezielle Holzpflegemittel",
      "Leicht feuchtes Mikrofasertuch",
      "Holzöle und -wachse"
    ],
    ungeeignet: [
      "Aggressive Reinigungsmittel",
      "Scheuermittel jeder Art",
      "Zu viel Feuchtigkeit",
      "Dampfreiniger",
      "Bleichmittel"
    ],
    routinePflege: "Regelmäßiges Staubwischen mit einem leicht angefeuchteten Mikrofasertuch. Verwenden Sie spezielle Holzpflegemittel gemäß Herstellerangaben für versiegelte Oberflächen etwa alle 2-3 Monate.",
    besondereHinweise: "Die Reinigung variiert je nach Holzart und Oberflächenbehandlung (geölt, gewachst, lackiert). Beachten Sie stets die spezifischen Pflegehinweise des Herstellers.",
    profiTipps: "Holzpolitur sollte in Richtung der Holzmaserung aufgetragen werden. Bei unbehandeltem Holz Flecken sofort behandeln, da es stark saugfähig ist."
  },
  {
    id: "naturstein",
    name: "Naturstein & Marmor",
    image: "/images/blog/reinigung/naturstein.jpg",
    description: "Naturstein wie Marmor, Granit oder Schiefer bringt Eleganz in jeden Raum, ist aber empfindlich gegenüber falscher Reinigung.",
    geeignet: [
      "Spezielle Natursteinreiniger",
      "pH-neutrale Reinigungsmittel",
      "Klares, warmes Wasser",
      "Weiche Mikrofasertücher"
    ],
    ungeeignet: [
      "Säurehaltige Reiniger (inkl. Essig, Zitrone)",
      "Scheuermittel",
      "Stark alkalische Reiniger",
      "Allzweckreiniger mit Zusatzstoffen"
    ],
    routinePflege: "Tägliches Abwischen mit einem weichen, feuchten Tuch. Wöchentliche Reinigung mit speziellen Natursteinreinigern. Alle 6-12 Monate eine Versiegelung je nach Nutzungsintensität.",
    besondereHinweise: "Besonders Marmor und Kalkstein reagieren empfindlich auf Säuren. Verschüttete Flüssigkeiten wie Wein, Saft oder Essig sofort aufwischen, um Ätzflecken zu vermeiden.",
    profiTipps: "Verwenden Sie Untersetzer für Gläser und heiße Gefäße. Bei stark frequentierten Bereichen wie Küchenarbeitsplatten empfiehlt sich eine häufigere Neuversiegelung."
  },
  {
    id: "glas",
    name: "Glas & Spiegel",
    image: "/images/blog/reinigung/glas.jpg",
    description: "Glasflächen und Spiegel können Räume optisch vergrößern und mehr Licht reflektieren, sind aber anfällig für Fingerabdrücke und Streifen.",
    geeignet: [
      "Spezielle Glasreiniger",
      "Isopropylalkohol verdünnt",
      "Mikrofasertücher",
      "Wasser mit etwas Essig"
    ],
    ungeeignet: [
      "Scheuernde Reinigungsmittel",
      "Stahlwolle oder harte Bürsten",
      "Stark alkalische Reiniger",
      "Papiertücher (können fusseln)"
    ],
    routinePflege: "Wöchentliche Reinigung mit Glasreiniger und fusselfreiem Mikrofasertuch. Bei täglicher Benutzung (wie Duschtüren) regelmäßiges Abziehen mit einem Fensterwischer nach jedem Gebrauch.",
    besondereHinweise: "Reinigen Sie Glas idealerweise nicht bei direkter Sonneneinstrahlung, da der Reiniger zu schnell trocknet und Streifen hinterlässt.",
    profiTipps: "Für streifenfreien Glanz erst mit Glasreiniger besprühen, dann mit einem feuchten Mikrofasertuch abwischen und sofort mit einem zweiten, trockenen Mikrofasertuch nachpolieren."
  },
  {
    id: "edelstahl",
    name: "Edelstahl",
    image: "/images/blog/reinigung/edelstahl.jpg",
    description: "Edelstahl findet sich in modernen Küchen und Bädern und besticht durch seine elegante Optik, zeigt aber leicht Fingerabdrücke und Wasserflecken.",
    geeignet: [
      "Spezielle Edelstahlreiniger",
      "Warmes Wasser mit mildem Spülmittel",
      "Mikrofasertücher",
      "Edelstahlpolitur"
    ],
    ungeeignet: [
      "Chlorhaltige Reiniger",
      "Scheuermittel",
      "Stahlwolle oder Metallschwämme",
      "Bleichmittel"
    ],
    routinePflege: "Tägliches Abwischen mit einem weichen, feuchten Tuch in Richtung der Maserung. Wöchentliche gründliche Reinigung mit speziellem Edelstahlreiniger oder mildem Spülmittel.",
    besondereHinweise: "Immer in Richtung der Metallmaserung wischen, um Kratzer zu vermeiden. Nach der Reinigung gründlich trocknen, um Wasserflecken zu verhindern.",
    profiTipps: "Für besonders hartnäckige Flecken kann Backpulver mit Wasser als Paste aufgetragen werden. Für zusätzlichen Glanz nach der Reinigung etwas Babyöl oder spezielle Edelstahlpolitur auftragen."
  },
  {
    id: "keramik",
    name: "Keramik & Fliesen",
    image: "/images/blog/reinigung/keramik.jpg",
    description: "Keramische Oberflächen und Fliesen sind langlebig und pflegeleicht, aber die Fugen können problematisch sein.",
    geeignet: [
      "Neutrale Allzweckreiniger",
      "Spezielle Fliesenreiniger",
      "Wasserdampfreiniger",
      "Mikrofasertücher"
    ],
    ungeeignet: [
      "Ölhaltige Reiniger (machen Boden rutschig)",
      "Stark säurehaltige Reiniger (für viele Fliesen)",
      "Stahlwolle",
      "Wachshaltige Produkte"
    ],
    routinePflege: "Regelmäßiges Kehren oder Staubsaugen, gefolgt von feuchtem Wischen mit einem milden Reinigungsmittel. Monatliche tiefere Reinigung der Fugen mit einer weichen Bürste.",
    besondereHinweise: "Die Reinigungsmethode hängt von der Art der Keramik ab. Glasierte Fliesen sind unempfindlicher als unglasierte. Matte Fliesen können empfindlicher auf bestimmte Reinigungsmittel reagieren.",
    profiTipps: "Fugen können mit einer Mischung aus Backpulver und Wasser gereinigt werden. Für besonders hartnäckige Flecken auf glasierten Fliesen eignet sich eine verdünnte Wasserstoffperoxidlösung."
  },
  {
    id: "teppich",
    name: "Teppiche & Textilien",
    image: "/images/blog/reinigung/teppich.jpg",
    description: "Teppiche und textile Bodenbeläge schaffen Behaglichkeit, können aber Staub und Schmutz ansammeln und Flecken aufnehmen.",
    geeignet: [
      "Spezielle Teppichreiniger",
      "Milde Wollwaschmittel (für Wollteppiche)",
      "Dampfreiniger (für synthetische Fasern)",
      "Enzymreiniger für organische Flecken"
    ],
    ungeeignet: [
      "Aggressive chemische Reiniger",
      "Bleichmittel",
      "Zu viel Wasser bei Wollteppichen",
      "Allzweckreiniger"
    ],
    routinePflege: "Regelmäßiges Staubsaugen (2-3 Mal pro Woche). Bei synthetischen Teppichen alle 12-18 Monate eine Tiefenreinigung, bei Naturfasern eher alle 2-3 Jahre oder bei Bedarf.",
    besondereHinweise: "Die Reinigungsmethode hängt stark vom Material ab (Wolle, Seide, Synthetik, Sisal etc.). Beachten Sie immer die Pflegehinweise des Herstellers.",
    profiTipps: "Flecken immer sofort behandeln und von außen nach innen abtupfen, nicht reiben. Rotieren Sie Teppiche regelmäßig, um eine gleichmäßige Abnutzung zu gewährleisten."
  },
  {
    id: "leder",
    name: "Leder",
    image: "/images/blog/reinigung/leder.jpg",
    description: "Lederoberflächen strahlen Eleganz und Wertigkeit aus, benötigen aber eine besondere Pflege, um ihre Qualität zu erhalten.",
    geeignet: [
      "Spezielle Lederreiniger",
      "Lederpflegemittel",
      "Weiche, leicht feuchte Tücher",
      "Sattelseife (für bestimmte Lederarten)"
    ],
    ungeeignet: [
      "Haushaltsweiniger jeder Art",
      "Lösungsmittel oder Alkohol",
      "Scheuermittel",
      "Zu viel Wasser"
    ],
    routinePflege: "Regelmäßiges Abstauben mit einem weichen Tuch. Alle 3-6 Monate mit speziellen Lederreinigern behandeln, gefolgt von einer Lederpflege zum Schutz und Erhalt der Geschmeidigkeit.",
    besondereHinweise: "Die Pflege variiert je nach Lederart (Anilin, Semi-Anilin, pigmentiert, Nubukleder etc.). UV-Strahlung kann Leder ausbleichen – direkte Sonneneinstrahlung vermeiden.",
    profiTipps: "Leder in regelmäßigen Abständen mit speziellen Lederpflegemitteln behandeln, um es geschmeidig zu halten. Flecken sofort entfernen, indem man sie vorsichtig abtupft, nicht reibt."
  },
  {
    id: "kunststoff",
    name: "Kunststoff & Acryl",
    image: "/images/blog/reinigung/kunststoff.jpg",
    description: "Kunststoffoberflächen finden sich in vielen Bereichen des Alltags und sind meist pflegeleicht, können aber mit der Zeit vergilben oder stumpf werden.",
    geeignet: [
      "Milde Allzweckreiniger",
      "Spülmittel mit warmem Wasser",
      "Kunststoffpflegemittel",
      "Mikrofasertücher"
    ],
    ungeeignet: [
      "Aggressive Lösungsmittel",
      "Scheuermittel",
      "Aceton (bei Acryl)",
      "Bleichmittel (bei farbigen Kunststoffen)"
    ],
    routinePflege: "Regelmäßiges Abwischen mit einem feuchten Tuch und mildem Reinigungsmittel. Bei matten Oberflächen spezielle Pflegemittel verwenden, um Glanzstellen zu vermeiden.",
    besondereHinweise: "Bei Acryl (z.B. Plexiglas) besonders vorsichtig sein, da es leicht zerkratzt. Für klare Kunststoffe spezielle Poliermittel verwenden, um Kratzer zu entfernen.",
    profiTipps: "Für vergilbte weiße Kunststoffe kann eine Mischung aus Backpulver und Wasser helfen. Acrylglas immer mit viel Wasser reinigen, um Kratzer durch Schmutzpartikel zu vermeiden."
  }
];

export default function MaterialspezifischerReinigungsguidePage() {
  const [selectedMaterial, setSelectedMaterial] = useState("holz");
  
  // Funktion zum Abrufen der aktuellen Materialdaten
  const getCurrentMaterial = () => {
    return materialData.find(material => material.id === selectedMaterial) || materialData[0];
  };
  
  // Meta-Informationen für den Blog-Artikel
  const title = "Materialspezifischer Reinigungsguide";
  const subtitle = "Die richtigen Reinigungsmethoden für verschiedene Oberflächen und Materialien";
  const date = new Date('2025-03-21');
  const readingTime = "12 min";
  const author = {
    name: "TREU Service Team",
    image: "/images/team/cleaning-expert.jpg"
  };
  
  // Aktuelles Material für die Anzeige

  return (
    <div className="flex-1">
      <Section className="pt-0 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog/reinigung" className="hover:text-primary">Reinigung</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Materialguide</span>
          </div>
          
          <div className="max-w-4xl">
            <Badge className="mb-3 bg-green-50 text-green-600 border border-green-200">
              Expertise
            </Badge>
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              {subtitle}
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Jedes Material hat seine eigenen Eigenschaften und benötigt eine spezifische Reinigung und Pflege. In diesem umfassenden Guide finden Sie detaillierte Anleitungen für verschiedene Oberflächen – von empfindlichem Naturstein bis hin zu pflegeleichtem Kunststoff.
            </Paragraph>
            
            <div className="flex items-center gap-6 text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-green-50 p-2 rounded-full">
                  <PaintBucket className="h-4 w-4 text-green-600" />
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
                    src="/images/blog/reinigung/materialien.jpg" 
                    alt="Verschiedene Materialien und Oberflächen"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <p className="text-white text-sm p-4">Die richtige Reinigungsmethode schützt und erhält die Schönheit verschiedener Materialien</p>
                  </div>
                </div>

                <h2 className="text-2xl font-bold mt-8 mb-4 flex items-center">
                  <PaintBucket className="w-6 h-6 mr-2 text-green-600" />
                  Warum die richtige Reinigungsmethode entscheidend ist
                </h2>
                
                <p>
                  Die falsche Reinigungsmethode kann Oberflächen nachhaltig schädigen, ihre Lebensdauer verkürzen und ihre ästhetische Qualität beeinträchtigen. Was für ein Material perfekt ist, kann für ein anderes schädlich sein – beispielsweise können säurehaltige Reiniger Naturstein ätzen, während sie für Glas hervorragend geeignet sind.
                </p>

                <p>
                  In diesem Guide finden Sie materialspezifische Empfehlungen, die auf unserem Fachwissen und langjähriger Erfahrung basieren. Wählen Sie einfach das gewünschte Material aus der Liste unten, um detaillierte Informationen zu erhalten.
                </p>

                <Alert className="my-8 bg-blue-50 border-blue-200">
                  <Info className="h-5 w-5 text-blue-600" />
                  <AlertTitle className="text-blue-800">Wichtig zu wissen</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    <p className="mt-2">Testen Sie jeden Reiniger zuerst an einer unauffälligen Stelle, besonders bei wertvollen oder empfindlichen Materialien. Beachten Sie stets die spezifischen Herstellerhinweise für Ihre Oberflächen.</p>
                  </AlertDescription>
                </Alert>

                <h2 className="text-2xl font-bold mt-8 mb-6 flex items-center">
                  <HelpCircle className="w-6 h-6 mr-2 text-green-600" />
                  Material auswählen
                </h2>
              </div>

              {/* Material-Auswahl-Tabs */}
              <div className="mt-2 mb-8">
                <Tabs 
                  value={selectedMaterial} 
                  onValueChange={setSelectedMaterial}
                  className="w-full"
                >
                  <TabsList className="w-full overflow-x-auto flex flex-nowrap whitespace-nowrap justify-start px-0">
                    {materialData.map(material => (
                      <TabsTrigger 
                        key={material.id} 
                        value={material.id}
                        className="px-3 py-2"
                      >
                        {material.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {materialData.map(material => (
                    <TabsContent key={material.id} value={material.id}>
                      <Card className="border-t-4 border-t-green-500 shadow-md">
                        <div className="relative h-[200px] w-full">
                          <Image 
                            src={material.image}
                            alt={material.name}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl flex items-center gap-2">
                            <PaintBucket className="h-5 w-5 text-green-600" />
                            {material.name}
                          </CardTitle>
                          <CardDescription>
                            {material.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                              <h4 className="font-medium text-green-800 mb-2 flex items-center">
                                <Check className="h-4 w-4 text-green-600 mr-2" />
                                Geeignete Reinigungsmittel & Methoden
                              </h4>
                              <ul className="space-y-1">
                                {material.geeignet.map((item, index) => (
                                  <li key={index} className="text-sm flex items-start">
                                    <CheckCircle2 className="h-3 w-3 text-green-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                              <h4 className="font-medium text-red-800 mb-2 flex items-center">
                                <XCircle className="h-4 w-4 text-red-600 mr-2" />
                                Zu vermeidende Reinigungsmittel
                              </h4>
                              <ul className="space-y-1">
                                {material.ungeeignet.map((item, index) => (
                                  <li key={index} className="text-sm flex items-start">
                                    <XCircle className="h-3 w-3 text-red-600 mr-2 mt-1 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <div className="space-y-4 mt-4">
                            <div>
                              <h4 className="font-medium mb-2">Routine-Pflege</h4>
                              <p className="text-sm bg-gray-50 p-3 rounded-lg">{material.routinePflege}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Besondere Hinweise</h4>
                              <p className="text-sm bg-gray-50 p-3 rounded-lg">{material.besondereHinweise}</p>
                            </div>
                            
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                              <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                                <Lightbulb className="h-4 w-4 text-blue-600 mr-2" />
                                Profi-Tipps
                              </h4>
                              <p className="text-sm text-blue-700">{material.profiTipps}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              <div className="prose max-w-none mt-12">
                <h2 className="text-2xl font-bold mb-6">Allgemeine Reinigungsprinzipien für alle Materialien</h2>
                
                <p>
                  Trotz der Unterschiede zwischen den verschiedenen Materialien gibt es einige allgemeine Grundsätze, die bei der Reinigung jeder Oberfläche berücksichtigt werden sollten:
                </p>
                
                <div className="overflow-x-auto my-6">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-medium">Prinzip</TableHead>
                        <TableHead className="font-medium">Beschreibung</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Vorbereitung</TableCell>
                        <TableCell>Entfernen Sie losen Schmutz und Staub, bevor Sie mit der Nassreinigung beginnen. Dies verhindert Kratzer durch Schmutzpartikel.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Methodentesten</TableCell>
                        <TableCell>Testen Sie Reinigungsmittel immer zuerst an einer unauffälligen Stelle, um unerwünschte Reaktionen auszuschließen.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Milde Lösungen</TableCell>
                        <TableCell>Beginnen Sie mit der mildesten Reinigungsmethode und steigern Sie die Intensität nur bei Bedarf.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Gründliches Spülen</TableCell>
                        <TableCell>Reinigungsmittelrückstände können Oberflächen mit der Zeit beschädigen. Spülen Sie daher gründlich nach.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Trocknung</TableCell>
                        <TableCell>Die meisten Materialien profitieren von einer gründlichen Trocknung nach der Reinigung, um Wasserflecken zu vermeiden.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Regelmäßigkeit</TableCell>
                        <TableCell>Regelmäßige leichte Reinigung ist oft schonender als seltene intensive Reinigungsaktionen.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <h2 className="text-2xl font-bold mt-10 mb-6">Wann professionelle Reinigung sinnvoll ist</h2>
                
                <p>
                  In bestimmten Situationen ist es ratsam, professionelle Reinigungsservices in Anspruch zu nehmen:
                </p>
                
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Bei sehr wertvollen oder antiken Materialien, die spezielle Behandlung erfordern</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Nach Wasserschäden, die tiefgreifende Reinigung und Trocknung erfordern</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Bei großflächiger Verschmutzung oder Verfleckung von Teppichen oder Polstermöbeln</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Bei hartnäckigen Flecken oder Verschmutzungen, die der Standardreinigung widerstehen</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Bei Naturstein, der poliert oder neu versiegelt werden muss</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Wenn Spezialtechniken und -geräte erforderlich sind, wie z.B. Dampfreinigung oder Heißwasserextraktion</span>
                  </li>
                </ul>
                
                <p>
                  Unsere professionellen Reinigungsteams verfügen über das Fachwissen, die Erfahrung und die spezialisierten Werkzeuge, um selbst die anspruchsvollsten Reinigungsaufgaben zu bewältigen, und können die Lebensdauer Ihrer wertvollen Materialien verlängern.
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
                {/* Inhaltsverzeichnis */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Materialien im Überblick</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1">
                      {materialData.map(material => (
                        <button
                          key={material.id}
                          onClick={() => setSelectedMaterial(material.id)}
                          className={`w-full text-left px-2 py-1.5 rounded-md transition-colors text-sm flex items-center ${selectedMaterial === material.id ? 'bg-green-50 text-green-700 font-medium' : 'hover:bg-gray-100'}`}
                        >
                          {selectedMaterial === material.id && (
                            <CheckCircle2 className="h-3 w-3 mr-2 text-green-600" />
                          )}
                          {material.name}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Experten-Tipp Box */}
                <Card className="bg-green-500/5 border-green-500/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-6 w-6 text-yellow-500" />
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Investieren Sie in hochwertige Mikrofasertücher in verschiedenen Farben, um Cross-Kontamination zu vermeiden. Verwenden Sie beispielsweise rote Tücher für Sanitärbereiche und blaue für Glasflächen.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Ein weiterer Tipp: Verzichten Sie auf zu viele Spezialreiniger. Mit einem pH-neutralen Allzweckreiniger, einem Entkalker, einem Glasreiniger und einem milden Scheuermittel bewältigen Sie die meisten Reinigungsaufgaben schonend und effizient.
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
                        href="/blog/ReinigungsplanGenerator" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Reinigungsplan-Generator
                      </Link>
                      <Link 
                        href="/blog/NachhaltigeReinigung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Nachhaltige Reinigungsmethoden & Öko-Zertifizierungen
                      </Link>
                      <Link
                        href="/blog/FleckenentfernungsBerater"
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Fleckenentfernungs-Berater
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Checkliste Download */}
                <Card className="bg-green-50 border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-green-600" />
                      Kostenlose Ressourcen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Laden Sie unsere kostenlosen Reinigungsressourcen herunter:
                    </p>
                    <ul className="text-sm space-y-2 mb-4">
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span>Materialspezifische Reinigungstabelle (PDF)</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span>Checkliste für die Pflege wertvoller Materialien</span>
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span>Einkaufsliste für Reinigungsmittel-Grundausstattung</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-100">
                      Ressourcen herunterladen
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Kontakt-CTA */}
                <Card className="bg-green-600 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Professionelle Reinigung benötigt?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm text-white/90 mb-4">
                      Unsere Experten bieten spezifische Reinigungslösungen für jedes Material. Profitieren Sie von unserer Erfahrung und schonenden Reinigungstechniken.
                    </Paragraph>
                    <div className="space-y-3">
                      <Link href="/reinigung#kontakt">
                        <Button className="w-full bg-white text-green-700 hover:bg-white/90">
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
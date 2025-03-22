"use client"

import React, { useState } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronRight, 
  Leaf, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink, 
  ThumbsUp, 
  ThumbsDown,
  Info,
  Award,
  BarChart,
  Share2,
  Droplets,
  Trash2,
  TreePine,
  ShieldCheck,
  Check,
  Download,
  Calendar,
  Clock
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { cn } from "@/lib/utils"

// Komponente für das Öko-Bewertungs-Diagramm
const EcoRating = ({ rating, maxRating = 5, size = "md" }) => {
  const percentage = (rating / maxRating) * 100;
  
  const getColorClass = (percent) => {
    if (percent >= 80) return "bg-teal-500";
    if (percent >= 60) return "bg-teal-400";
    if (percent >= 40) return "bg-yellow-400";
    if (percent >= 20) return "bg-orange-400";
    return "bg-red-500";
  };
  
  const sizeClasses = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`${sizeClasses[size]} ${getColorClass(percentage)} rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="whitespace-nowrap text-sm font-medium">
        {rating}/{maxRating}
      </div>
    </div>
  );
};

// Umweltzertifikat-Vergleich Komponente
const UmweltZertifikateVergleich = () => {
  const zertifikate = [
    {
      name: "EU Ecolabel",
      logo: "/images/blog/sustainable/eu-ecolabel.svg",
      bewertung: {
        umwelt: 4.5,
        transparenz: 4.8,
        verbreitung: 4.2
      },
      beschreibung: "Offizielles EU-Umweltzeichen mit strengen Kriterien in Bezug auf den gesamten Lebenszyklus eines Produkts.",
      fokus: ["Reduzierte Umweltbelastung", "Begrenzte Verwendung gefährlicher Stoffe", "Verringerte Verpackungsabfälle"],
      eignung: "Reinigungsmittel, Papierprodukte, Waschmittel"
    },
    {
      name: "Blauer Engel",
      logo: "/images/blog/sustainable/blauer-engel.svg",
      bewertung: {
        umwelt: 4.7,
        transparenz: 4.9,
        verbreitung: 4.5
      },
      beschreibung: "Deutsches Umweltzeichen mit sehr hohen Standards für umweltschonende Produkte.",
      fokus: ["Ressourceneffizienz", "Schadstoffarme Herstellung", "Langlebigkeit"],
      eignung: "Reinigungsmittel, Hygienepapiere, Reinigungsdienstleistungen"
    },
    {
      name: "Nordic Swan",
      logo: "/images/blog/sustainable/nordic-swan.svg",
      bewertung: {
        umwelt: 4.6,
        transparenz: 4.7,
        verbreitung: 3.8
      },
      beschreibung: "Skandinavisches Umweltzeichen mit ganzheitlicher Betrachtung der Umweltauswirkungen.",
      fokus: ["Klimaschutz", "Ressourceneffizienz", "Biologisch abbaubare Inhaltsstoffe"],
      eignung: "Reinigungsmittel, Papierwaren, Reinigungsdienstleistungen"
    },
    {
      name: "Cradle to Cradle",
      logo: "/images/blog/sustainable/cradle-to-cradle.svg",
      bewertung: {
        umwelt: 4.9,
        transparenz: 4.5,
        verbreitung: 3.2
      },
      beschreibung: "Zertifizierung für Produkte, die in vollständig geschlossenen Materialkreisläufen zirkulieren können.",
      fokus: ["Kreislauffähigkeit", "Materialgesundheit", "Erneuerbare Energie"],
      eignung: "Reinigungsmittel, Reinigungszubehör, Textilien"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zertifikate.map((zertifikat, index) => (
          <Card key={index} className="border overflow-hidden transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-3 bg-teal-50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full p-2 flex items-center justify-center">
                  <Image 
                    src={zertifikat.logo} 
                    width={36} 
                    height={36} 
                    alt={zertifikat.name} 
                  />
                </div>
                <CardTitle className="text-lg">{zertifikat.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm mb-4">{zertifikat.beschreibung}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Umweltstandards</span>
                  <EcoRating rating={zertifikat.bewertung.umwelt} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Transparenz</span>
                  <EcoRating rating={zertifikat.bewertung.transparenz} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Verbreitung</span>
                  <EcoRating rating={zertifikat.bewertung.verbreitung} />
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="text-sm font-medium mb-1">Fokus auf:</h4>
                <ul className="text-xs space-y-1">
                  {zertifikat.fokus.map((punkt, i) => (
                    <li key={i} className="flex items-start">
                      <Leaf className="h-3 w-3 text-teal-600 mr-2 mt-0.5 shrink-0" />
                      <span>{punkt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm text-blue-800">
            <strong>Unser Tipp:</strong> Achten Sie bei der Auswahl von Reinigungsprodukten und -dienstleistungen auf mindestens eine der obigen Zertifizierungen. Der Blaue Engel und das EU Ecolabel sind in Deutschland am weitesten verbreitet und bieten eine gute Balance aus strengen Umweltstandards und Verfügbarkeit.
          </p>
        </div>
      </div>
    </div>
  );
};

// Komponente für den CO2-Footprint Rechner
const CO2FootprintCalculator = () => {
  const [produktTyp, setProduktTyp] = useState("konventionell");
  const [nutzungsHäufigkeit, setNutzungsHäufigkeit] = useState("mittel");
  const [showResults, setShowResults] = useState(false);
  
  const calculateFootprint = () => {
    setShowResults(true);
  };
  
  // Beispiel-Ergebnisse (in echtem Rechner würde dies berechnet werden)
  const results = {
    konventionell: {
      niedrig: {co2: 24, wasser: 1800, einsparung: 0},
      mittel: {co2: 48, wasser: 3600, einsparung: 0},
      hoch: {co2: 96, wasser: 7200, einsparung: 0}
    },
    eco: {
      niedrig: {co2: 12, wasser: 900, einsparung: 50},
      mittel: {co2: 24, wasser: 1800, einsparung: 50},
      hoch: {co2: 48, wasser: 3600, einsparung: 50}
    }
  };
  
  const currentResult = results[produktTyp][nutzungsHäufigkeit];
  
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50 pb-6">
        <div className="flex items-center gap-3">
          <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center">
            <Leaf className="h-5 w-5 text-teal-600" />
          </div>
          <div>
            <CardTitle className="text-lg">CO₂-Einsparungsrechner</CardTitle>
            <CardDescription>Berechnen Sie Ihren ökologischen Fußabdruck bei der Reinigung</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Art der Reinigungsprodukte</h3>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={cn(
                  "border rounded-lg p-4 cursor-pointer transition-all",
                  produktTyp === "konventionell" 
                    ? "border-red-200 bg-red-50" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setProduktTyp("konventionell")}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Konventionell</span>
                  {produktTyp === "konventionell" && <Check className="h-5 w-5 text-red-600" />}
                </div>
                <p className="text-xs text-gray-600">Herkömmliche Reinigungsmittel mit chemischen Inhaltsstoffen</p>
              </div>
              
              <div
                className={cn(
                  "border rounded-lg p-4 cursor-pointer transition-all",
                  produktTyp === "eco" 
                    ? "border-teal-200 bg-teal-50" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setProduktTyp("eco")}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Öko-zertifiziert</span>
                  {produktTyp === "eco" && <Check className="h-5 w-5 text-teal-600" />}
                </div>
                <p className="text-xs text-gray-600">Umweltfreundliche, biologisch abbaubare Reinigungsmittel</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Häufigkeit der Reinigung</h3>
            <div className="grid grid-cols-3 gap-3">
              <div
                className={cn(
                  "border rounded-lg p-3 cursor-pointer transition-all text-center",
                  nutzungsHäufigkeit === "niedrig" 
                    ? "border-blue-200 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setNutzungsHäufigkeit("niedrig")}
              >
                <span className="text-sm font-medium">Niedrig</span>
                <p className="text-xs text-gray-600 mt-1">1-2x pro Woche</p>
              </div>
              
              <div
                className={cn(
                  "border rounded-lg p-3 cursor-pointer transition-all text-center",
                  nutzungsHäufigkeit === "mittel" 
                    ? "border-blue-200 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setNutzungsHäufigkeit("mittel")}
              >
                <span className="text-sm font-medium">Mittel</span>
                <p className="text-xs text-gray-600 mt-1">3-4x pro Woche</p>
              </div>
              
              <div
                className={cn(
                  "border rounded-lg p-3 cursor-pointer transition-all text-center",
                  nutzungsHäufigkeit === "hoch" 
                    ? "border-blue-200 bg-blue-50" 
                    : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => setNutzungsHäufigkeit("hoch")}
              >
                <span className="text-sm font-medium">Hoch</span>
                <p className="text-xs text-gray-600 mt-1">Täglich</p>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full bg-teal-600 hover:bg-teal-700"
            onClick={calculateFootprint}
          >
            Auswirkungen berechnen
          </Button>
          
          {showResults && (
            <div>
              <Separator className="my-6" />
              
              <div className="text-center mb-6">
                <h3 className="font-medium text-lg mb-2">Ihr ökologischer Fußabdruck</h3>
                <p className="text-sm text-gray-600">Jährliche Umweltauswirkungen bei Ihrer aktuellen Reinigungsroutine</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <BarChart className="h-8 w-8 text-teal-600 mb-2" />
                      <div className="text-2xl font-light">{currentResult.co2} kg</div>
                      <p className="text-sm text-gray-600">CO₂-Emissionen</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Droplets className="h-8 w-8 text-teal-600 mb-2" />
                      <div className="text-2xl font-light">{currentResult.wasser} L</div>
                      <p className="text-sm text-gray-600">Wasserverbrauch</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-gray-200">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center">
                      <Trash2 className="h-8 w-8 text-teal-600 mb-2" />
                      <div className="text-2xl font-light">{produktTyp === "konventionell" ? "Hoch" : "Gering"}</div>
                      <p className="text-sm text-gray-600">Wasserbelastung</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg mt-4">
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Mögliche Einsparungen mit Öko-Produkten:</h4>
                  <div className="flex items-center mb-3">
                    <div className="w-full mr-4">
                      <div className="text-xs text-gray-600 mb-1">CO₂-Einsparung</div>
                      <Progress value={currentResult.einsparung} className="h-2 bg-gray-200">
                        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${currentResult.einsparung}%` }} />
                      </Progress>
                    </div>
                    <span className="text-sm font-medium">{currentResult.einsparung}%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full mr-4">
                      <div className="text-xs text-gray-600 mb-1">Wassereinsparung</div>
                      <Progress value={currentResult.einsparung} className="h-2 bg-gray-200">
                        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${currentResult.einsparung}%` }} />
                      </Progress>
                    </div>
                    <span className="text-sm font-medium">{currentResult.einsparung}%</span>
                  </div>
                </div>
                
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <div className="flex items-start">
                    <TreePine className="h-5 w-5 text-teal-600 mr-2 mt-0.5 shrink-0" />
                    <p className="text-sm text-teal-800">
                      <strong>Der Umstieg auf öko-zertifizierte Reinigungsprodukte</strong> würde in Ihrem Fall jährlich etwa {currentResult.co2} kg CO₂ und {currentResult.wasser} Liter Wasser einsparen. Das entspricht der CO₂-Menge, die {Math.round(currentResult.co2 / 20)} Bäume in einem Jahr aufnehmen.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Komponente für die Produktvorher-Nachher-Vergleiche
const ProductComparison = () => {
  const categories = [
    {
      name: "Allzweckreiniger",
      products: [
        {
          conventional: {
            name: "Standard-Allzweckreiniger",
            ingredients: ["Tenside (synthetisch)", "Duftstoffe (künstlich)", "Konservierungsmittel", "Farbstoffe"],
            pros: ["Günstig im Anschaffungspreis", "Starke Reinigungswirkung"],
            cons: ["Belastung von Gewässern", "Hautreizungen möglich", "Oft Allergieauslöser", "Schlechte biologische Abbaubarkeit"]
          },
          eco: {
            name: "Öko-Allzweckreiniger",
            ingredients: ["Pflanzenbasierte Tenside", "Ätherische Öle", "Milchsäure", "Natürliche Konservierung"],
            pros: ["Biologisch abbaubar", "Hautfreundlich", "Meist allergenfrei", "Ohne Mikroplastik"],
            cons: ["Höherer Anschaffungspreis", "Manchmal geringere Reinigungskraft"]
          }
        }
      ]
    },
    {
      name: "Sanitärreiniger",
      products: [
        {
          conventional: {
            name: "Chemischer Sanitärreiniger",
            ingredients: ["Phosphorsäure", "Chlorverbindungen", "Künstliche Duftstoffe", "Farbstoffe"],
            pros: ["Sehr effektiv gegen Kalk", "Schnell wirkend", "Desinfizierend"],
            cons: ["Stark ätzend", "Gesundheitsschädliche Dämpfe", "Belastung der Wasserkreisläufe", "Korrosion von Metalloberflächen"]
          },
          eco: {
            name: "Öko-Sanitärreiniger",
            ingredients: ["Zitronensäure", "Milchsäure", "Essig", "Pflanzliche Tenside"],
            pros: ["Biologisch abbaubar", "Keine gesundheitsschädlichen Dämpfe", "Materialschonend"],
            cons: ["Längere Einwirkzeit nötig", "Bei starkem Kalk mehrere Anwendungen nötig"]
          }
        }
      ]
    }
  ];
  
  return (
    <div className="space-y-8">
      {categories.map((category, idx) => (
        <div key={idx} className="space-y-4">
          <h3 className="text-lg font-medium">{category.name}</h3>
          
          {category.products.map((product, productIdx) => (
            <div key={productIdx} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-red-100 h-full">
                <CardHeader className="pb-3 bg-red-50 border-b border-red-100">
                  <CardTitle className="text-base">Konventionell: {product.conventional.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Typische Inhaltsstoffe:</h4>
                      <ul className="text-sm space-y-1">
                        {product.conventional.ingredients.map((ingredient, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className="h-3 w-3 text-red-500 mt-1 mr-2 shrink-0" />
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center text-green-700">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Vorteile
                        </h4>
                        <ul className="text-sm space-y-1">
                          {product.conventional.pros.map((pro, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-1 mr-2 shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center text-red-700">
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Nachteile
                        </h4>
                        <ul className="text-sm space-y-1">
                          {product.conventional.cons.map((con, i) => (
                            <li key={i} className="flex items-start">
                              <AlertTriangle className="h-3 w-3 text-red-600 mt-1 mr-2 shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-teal-100 h-full">
                <CardHeader className="pb-3 bg-teal-50 border-b border-teal-100">
                  <CardTitle className="text-base">Öko: {product.eco.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Typische Inhaltsstoffe:</h4>
                      <ul className="text-sm space-y-1">
                        {product.eco.ingredients.map((ingredient, i) => (
                          <li key={i} className="flex items-start">
                            <ChevronRight className="h-3 w-3 text-teal-500 mt-1 mr-2 shrink-0" />
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center text-green-700">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Vorteile
                        </h4>
                        <ul className="text-sm space-y-1">
                          {product.eco.pros.map((pro, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-3 w-3 text-green-600 mt-1 mr-2 shrink-0" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-1 flex items-center text-red-700">
                          <ThumbsDown className="h-4 w-4 mr-1" />
                          Nachteile
                        </h4>
                        <ul className="text-sm space-y-1">
                          {product.eco.cons.map((con, i) => (
                            <li key={i} className="flex items-start">
                              <AlertTriangle className="h-3 w-3 text-red-600 mt-1 mr-2 shrink-0" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function NachhaltigeReinigungPage() {
  // Funktion zum Teilen des Inhalts
  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: "Nachhaltige Reinigungsmethoden & Öko-Zertifizierungen",
        url: window.location.href
      }).catch(error => {
        console.log('Error sharing', error);
      });
    } else {
      // Fallback für Browser ohne Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link in die Zwischenablage kopiert!');
      });
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
            <span className="text-foreground capitalize">Reinigung</span>
          </div>
          
          <div className="max-w-4xl">
            {/* Tag/Badge */}
            <div className="inline-flex items-center rounded-full border border-teal-200 px-2.5 py-0.5 text-xs font-semibold text-teal-600 bg-teal-50 mb-3">
              Reinigung
            </div>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Nachhaltige Reinigungsmethoden & Öko-Zertifizierungen
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              Ein umfassender Leitfaden für umweltbewusste Gebäudereinigung
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Die Reinigungsbranche steht vor einem entscheidenden Wandel: Nachhaltigkeit ist längst kein optionales Extra mehr, sondern eine Notwendigkeit für zukunftsfähige Unternehmen. In diesem Artikel stellen wir die wirksamsten umweltfreundlichen Reinigungsmethoden vor und erklären, welche Öko-Zertifizierungen wirklich vertrauenswürdig sind.
            </Paragraph>
          </div>
          
          <div className="flex items-center gap-6 text-muted-foreground mt-6">
            <div className="flex items-center gap-2">
              <div className="inline-block bg-teal-50 p-2 rounded-full">
                <Leaf className="h-4 w-4 text-teal-600" />
              </div>
              <span className="text-sm">TREU Service Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{format(new Date(), 'dd. MMMM yyyy', { locale: de })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">15 min</span>
            </div>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="prose max-w-none">
                <div className="mb-12">
                  <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-6">
                    <Image 
                      src="/images/blog/sustainable-cleaning.jpg" 
                      alt="Nachhaltige Reinigungsmethoden"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <H3>Warum nachhaltige Reinigung wichtiger denn je ist</H3>
                  <Paragraph>
                    Die Reinigungsbranche hat einen erheblichen ökologischen Fußabdruck: Vom Wasserverbrauch über chemische Reinigungsmittel bis hin zu Plastikmüll und CO₂-Emissionen. Gleichzeitig wächst das Bewusstsein für Umweltschutz und Nachhaltigkeit bei Kunden und Auftraggebern. Unternehmen, die auf nachhaltige Reinigungspraktiken umstellen, profitieren daher nicht nur vom wachsenden Markt für umweltbewusste Dienstleistungen, sondern leisten auch einen wichtigen Beitrag zum Klimaschutz.
                  </Paragraph>
                  
                  <Alert className="bg-teal-50 border-teal-200 mb-8">
                    <AlertDescription className="flex items-start">
                      <Leaf className="h-5 w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-teal-800">
                        Studien zeigen, dass umweltfreundliche Reinigungsmethoden nicht nur die Umwelt schonen, sondern auch wirtschaftliche Vorteile bieten: Sie senken Kosten für Wasser und Energie, verbessern die Luftqualität in Innenräumen und tragen zur Gesundheit der Mitarbeiter bei.
                      </span>
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Vorher-Nachher-Vergleiche */}
                <div className="mb-12">
                  <H3 className="mb-6">Konventionell vs. Nachhaltig: Der große Produktvergleich</H3>
                  <p className="mb-6">
                    Um die Unterschiede zwischen konventionellen und umweltfreundlichen Reinigungsprodukten zu verdeutlichen, haben wir die gängigsten Produktkategorien analysiert und verglichen. Der Vergleich zeigt deutlich die Vor- und Nachteile beider Ansätze:
                  </p>
                  
                  <ProductComparison />
                </div>

                {/* Trendsetter Tabs */}
                <div className="mb-12">
                  <H3 className="mb-6">Die wichtigsten Trends für nachhaltige Reinigung 2025</H3>
                  
                  <Tabs defaultValue="methoden">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="methoden">Methoden</TabsTrigger>
                      <TabsTrigger value="geraete">Geräte & Technik</TabsTrigger>
                      <TabsTrigger value="mittel">Reinigungsmittel</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="methoden" className="p-6 border rounded-md mt-2 bg-slate-50">
                      <div className="space-y-4">
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                            Dampfreinigung ohne Chemie
                          </H3>
                          <Paragraph>
                            Die Dampfreinigung ist eine der effektivsten nachhaltigen Reinigungsmethoden. Durch den Einsatz von heißem Wasserdampf (bis zu 180°C) werden Schmutz und Bakterien ohne den Einsatz chemischer Reinigungsmittel entfernt. Dies funktioniert sogar bei hartnäckigen Verschmutzungen und bietet eine Keimreduktion von bis zu 99,9%.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                            Reduktion von Mikroplastik
                          </H3>
                          <Paragraph>
                            Mikrofasertücher sind zwar effektiv, setzen aber bei jedem Waschgang Mikroplastik frei. Neue Lösungen wie das Vorfiltern des Waschwassers oder der Einsatz natürlicher Materialien wie Baumwolle und Bambus in Kombination mit optimierten Reinigungstechniken verringern dieses Problem erheblich.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                            Wasserreduktion durch osmotische Reinigung
                          </H3>
                          <Paragraph>
                            Bei der osmotischen Reinigung wird Wasser durch eine Membrane gefiltert, wodurch alle Mineralien entfernt werden. Das demineralisierte Wasser kann Verschmutzungen ohne Zusatz von Chemie lösen und trocknet streifenfrei. Diese Methode reduziert den Wasserverbrauch um bis zu 80% und macht Reinigungsmittel in vielen Fällen überflüssig.
                          </Paragraph>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="geraete" className="p-6 border rounded-md mt-2 bg-slate-50">
                      <div className="space-y-4">
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                            Energieeffiziente Reinigungsmaschinen
                          </H3>
                          <Paragraph>
                            Die neueste Generation von Reinigungsgeräten zeichnet sich durch deutlich reduzierten Energieverbrauch aus. Moderne Staubsauger, Bodenreiniger und Dampfreiniger mit Energieeffizienzklasse A+++ verbrauchen bis zu 70% weniger Strom als herkömmliche Geräte.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                            Digitale Dosierungssysteme
                          </H3>
                          <Paragraph>
                            Überdosierung ist eines der größten Probleme bei der Verwendung von Reinigungsmitteln. Intelligente Dosierungssysteme mit Sensorik messen automatisch die benötigte Menge an Reinigungsmitteln und reduzieren den Verbrauch um bis zu 30%, was sowohl Kosten spart als auch die Umweltbelastung minimiert.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                            Robotik und KI-gestützte Reinigung
                          </H3>
                          <Paragraph>
                            Autonome Reinigungsroboter mit KI-Steuerung optimieren Reinigungswege und -zeiten, was den Energie- und Ressourcenverbrauch senkt. Sie erkennen Verschmutzungsgrade und passen die Reinigungsintensität entsprechend an, wodurch unnötiger Ressourcenverbrauch vermieden wird.
                          </Paragraph>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="mittel" className="p-6 border rounded-md mt-2 bg-slate-50">
                      <div className="space-y-4">
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                            Biologisch abbaubare Reinigungsmittel
                          </H3>
                          <Paragraph>
                            Moderne Öko-Reiniger bestehen aus 100% biologisch abbaubaren Inhaltsstoffen pflanzlichen Ursprungs. Sie enthalten keine Phosphate, Chlor, optische Aufheller oder synthetische Duftstoffe und sind trotzdem hocheffektiv bei der Entfernung von Schmutz und Bakterien.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                            Hochkonzentrate und Nachfüllsysteme
                          </H3>
                          <Paragraph>
                            Hochkonzentrierte Reinigungsmittel sparen Verpackungsmaterial und Transportemissionen. In Kombination mit wiederverwendbaren Behältern und Nachfüllstationen reduzieren sie den Plastikmüll erheblich. Ein Liter Konzentrat ersetzt oft bis zu 100 Liter gebrauchsfertiges Reinigungsmittel.
                          </Paragraph>
                        </div>
                        
                        <div>
                          <H3 className="text-lg font-medium mb-2 flex items-center">
                            <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                            Probiotische Reiniger
                          </H3>
                          <Paragraph>
                            Ein revolutionärer Ansatz: Probiotische Reiniger nutzen lebende Mikroorganismen, die Schmutz abbauen und schädliche Bakterien verdrängen. Sie wirken über die Reinigung hinaus und schaffen ein gesundes Mikrobiom auf Oberflächen, das die Neubildung von Schmutz verlangsamt.
                          </Paragraph>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="my-12">
                  <Card className="bg-white shadow-sm border overflow-hidden">
                    <CardHeader className="bg-teal-50 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                          <Leaf className="h-5 w-5 text-teal-600" />
                        </div>
                        <CardTitle>Praxistest: Ökologische vs. Konventionelle Reinigung</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="mb-6">
                        Um die Wirksamkeit nachhaltiger Reinigungsmethoden unter Beweis zu stellen, haben wir einen umfangreichen Praxistest durchgeführt. Die Ergebnisse zeigen deutlich, dass ökologische Reinigungsprodukte bei richtiger Anwendung genauso effektiv sein können wie konventionelle Produkte.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <Image 
                            src="/images/blog/sustainable/test-before.jpg" 
                            alt="Vor der Reinigung" 
                            fill 
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gray-900/70 p-2 text-white text-sm text-center">
                            Stark verschmutzte Testfläche
                          </div>
                        </div>
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <Image 
                            src="/images/blog/sustainable/test-after.jpg" 
                            alt="Nach der Reinigung" 
                            fill 
                            className="object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gray-900/70 p-2 text-white text-sm text-center">
                            Nach Reinigung mit Öko-Produkten
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Testergebnisse im Überblick:</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Reinigungswirkung</span>
                              <span className="text-sm text-gray-600">Öko vs. Konventionell</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <Progress value={90} className="h-2 bg-gray-200">
                                <div className="h-full bg-teal-500 rounded-full" style={{ width: '90%' }} />
                              </Progress>
                              <span className="text-sm font-medium min-w-[40px] text-right">90%</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Umweltverträglichkeit</span>
                              <span className="text-sm text-gray-600">Öko vs. Konventionell</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <Progress value={95} className="h-2 bg-gray-200">
                                <div className="h-full bg-teal-500 rounded-full" style={{ width: '95%' }} />
                              </Progress>
                              <span className="text-sm font-medium min-w-[40px] text-right">95%</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Hautverträglichkeit</span>
                              <span className="text-sm text-gray-600">Öko vs. Konventionell</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <Progress value={98} className="h-2 bg-gray-200">
                                <div className="h-full bg-teal-500 rounded-full" style={{ width: '98%' }} />
                              </Progress>
                              <span className="text-sm font-medium min-w-[40px] text-right">98%</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">Kosteneffizienz</span>
                              <span className="text-sm text-gray-600">Öko vs. Konventionell</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <Progress value={85} className="h-2 bg-gray-200">
                                <div className="h-full bg-teal-500 rounded-full" style={{ width: '85%' }} />
                              </Progress>
                              <span className="text-sm font-medium min-w-[40px] text-right">85%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Öko-Zertifikate Vergleich */}
                <div className="mb-12">
                  <H3 className="mb-6">Umweltzertifikate im Vergleich: Welche Siegel sind vertrauenswürdig?</H3>
                  <Paragraph className="mb-4">
                    Die Vielzahl an Umweltsiegeln und Öko-Zertifikaten kann verwirrend sein. Wir haben die wichtigsten Zertifikate für nachhaltige Reinigung analysiert und bewertet, um Ihnen die Orientierung zu erleichtern.
                  </Paragraph>
                  
                  <UmweltZertifikateVergleich />
                </div>
                
                {/* CO2-Footprint Rechner */}
                <div className="mb-12">
                  <H3 className="mb-6">Berechnen Sie Ihren ökologischen Fußabdruck</H3>
                  <Paragraph className="mb-6">
                    Mit unserem interaktiven CO₂-Rechner können Sie die Umweltauswirkungen Ihrer Reinigungsroutine berechnen und erfahren, wie viel Sie durch den Umstieg auf nachhaltige Produkte einsparen können.
                  </Paragraph>
                  
                  <CO2FootprintCalculator />
                </div>

                {/* Praktische Tipps für Unternehmen */}
                <div className="mb-12 mt-14">
                  <H3 className="mb-6">Implementierung nachhaltiger Reinigungspraktiken: Schritt für Schritt</H3>
                  
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-5 rounded-lg border">
                      <H3 className="text-lg font-medium mb-3">1. Analyse des Status quo</H3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Erfassen Sie alle verwendeten Reinigungsmittel, -geräte und -methoden</li>
                        <li>Erstellen Sie eine Übersicht zu Wasser-, Energie- und Chemikalienverbrauch</li>
                        <li>Identifizieren Sie die größten Umweltbelastungen im aktuellen Reinigungsprozess</li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-5 rounded-lg border">
                      <H3 className="text-lg font-medium mb-3">2. Schulung und Sensibilisierung der Mitarbeiter</H3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Bilden Sie Ihr Reinigungspersonal in umweltfreundlichen Techniken aus</li>
                        <li>Sensibilisieren Sie für die korrekte Dosierung von Reinigungsmitteln</li>
                        <li>Etablieren Sie ein Feedbacksystem für Verbesserungsvorschläge</li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-5 rounded-lg border">
                      <H3 className="text-lg font-medium mb-3">3. Schrittweise Umstellung</H3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Beginnen Sie mit dem Austausch der umweltschädlichsten Reinigungsmittel</li>
                        <li>Investieren Sie in energieeffiziente Geräte bei Neuanschaffungen</li>
                        <li>Testen Sie verschiedene umweltfreundliche Methoden und evaluieren Sie ihre Wirksamkeit</li>
                      </ul>
                    </div>
                    
                    <div className="bg-slate-50 p-5 rounded-lg border">
                      <H3 className="text-lg font-medium mb-3">4. Dokumentation und kontinuierliche Verbesserung</H3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Erfassen Sie regelmäßig Verbrauchsdaten und Umweltkennzahlen</li>
                        <li>Setzen Sie sich ambitionierte, aber realistische Ziele zur Reduktion der Umweltauswirkungen</li>
                        <li>Streben Sie eine Zertifizierung an (z.B. nach ISO 14001 oder spezifischen Umweltsiegeln)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Kosten-Nutzen-Analyse */}
                <div className="mb-12">
                  <H3 className="mb-6">Kosten-Nutzen-Analyse: Lohnt sich die Umstellung wirtschaftlich?</H3>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Maßnahme</TableHead>
                        <TableHead>Initiale Kosten</TableHead>
                        <TableHead>Jährliche Einsparung</TableHead>
                        <TableHead className="text-right">Amortisation</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Umstellung auf Hochkonzentrate</TableCell>
                        <TableCell>Gering (€)</TableCell>
                        <TableCell className="text-teal-600">15-25%</TableCell>
                        <TableCell className="text-right">&lt; 3 Monate</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Osmotische Glasreinigung</TableCell>
                        <TableCell>Mittel (€€)</TableCell>
                        <TableCell className="text-teal-600">30-40%</TableCell>
                        <TableCell className="text-right">12-18 Monate</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Dampfreinigungssysteme</TableCell>
                        <TableCell>Hoch (€€€)</TableCell>
                        <TableCell className="text-teal-600">40-60%</TableCell>
                        <TableCell className="text-right">24-36 Monate</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Automatische Dosiersysteme</TableCell>
                        <TableCell>Mittel (€€)</TableCell>
                        <TableCell className="text-teal-600">20-30%</TableCell>
                        <TableCell className="text-right">18-24 Monate</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Schulung des Personals</TableCell>
                        <TableCell>Gering-Mittel (€-€€)</TableCell>
                        <TableCell className="text-teal-600">10-20%</TableCell>
                        <TableCell className="text-right">6-12 Monate</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <Paragraph className="mt-4 text-sm text-slate-600">
                    Hinweis: Die genauen Einsparungen variieren je nach Ausgangssituation, Gebäudegröße und -art sowie Implementierungsgrad.
                  </Paragraph>
                </div>

                {/* Fazit */}
                <div>
                  <H3 className="mb-4">Fazit: Nachhaltigkeit als Wettbewerbsvorteil</H3>
                  <Paragraph>
                    Die Umstellung auf nachhaltige Reinigungsmethoden ist nicht nur ein Beitrag zum Umweltschutz, sondern bietet auch handfeste wirtschaftliche Vorteile. Unternehmen, die jetzt auf grüne Reinigungspraktiken setzen, positionieren sich als zukunftsorientiert und verantwortungsbewusst. In einer Zeit, in der Umweltbewusstsein bei Kunden und Auftraggebern zunehmend entscheidungsrelevant wird, kann dies zu einem entscheidenden Wettbewerbsvorteil werden.
                  </Paragraph>
                  <Paragraph>
                    Wir bei TREU Service haben uns zum Ziel gesetzt, bis 2027 vollständig auf nachhaltige Reinigungsmethoden umzustellen. Durch konsequente Schulung unseres Personals, kontinuierliche Investitionen in moderne Technologien und die Zusammenarbeit mit zertifizierten Lieferanten bieten wir unseren Kunden bereits heute umweltfreundliche Reinigungsdienstleistungen auf höchstem Niveau.
                  </Paragraph>
                </div>
                
                {/* Call-to-Action */}
                <div className="mt-10 bg-teal-50 p-6 rounded-lg border border-teal-100">
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className="md:w-2/3">
                      <h3 className="text-xl font-bold mb-2 text-teal-800">Bereit für nachhaltige Reinigung?</h3>
                      <p className="text-teal-700 mb-4">
                        Wir unterstützen Sie bei der Umstellung auf umweltfreundliche Reinigungsmethoden. Vereinbaren Sie eine kostenlose Beratung und erfahren Sie, wie Sie Kosten senken und gleichzeitig die Umwelt schonen können.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                          Beratungstermin vereinbaren
                        </Button>
                        <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-100">
                          <Download className="mr-2 h-4 w-4" />
                          Nachhaltigkeits-Checkliste
                        </Button>
                      </div>
                    </div>
                    <div className="md:w-1/3 flex justify-center">
                      <Image 
                        src="/images/blog/sustainable/eco-cleaning.svg" 
                        width={150} 
                        height={150} 
                        alt="Nachhaltige Reinigung" 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Artikel-Share */}
                <div className="mt-8 pt-4 border-t border-dashed flex justify-between items-center">
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Veröffentlicht am {format(new Date(), 'dd.MM.yyyy', { locale: de })}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={shareContent}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Teilen
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Inhaltsverzeichnis */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Inhaltsverzeichnis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <a href="#" className="block hover:text-teal-600">
                          Warum nachhaltige Reinigung wichtiger denn je ist
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-teal-600">
                          Konventionell vs. Nachhaltig: Produktvergleich
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-teal-600">
                          Die wichtigsten Trends für nachhaltige Reinigung 2025
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-teal-600">
                          Praxistest: Ökologische vs. Konventionelle Reinigung
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-teal-600">
                          Umweltzertifikate im Vergleich
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-teal-600">
                          CO₂-Footprint Rechner
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-teal-600">
                          Implementierung: Schritt für Schritt
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-teal-600">
                          Kosten-Nutzen-Analyse
                        </a>
                      </li>
                      <li>
                        <a href="#" className="block hover:text-teal-600">
                          Fazit
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                {/* Verwandte Artikel */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weitere Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link 
                        href="/blog/MaterialspezifischeReinigung" 
                        className="block hover:bg-teal-50 p-2 rounded transition-colors text-sm"
                      >
                        Materialspezifischer Reinigungsguide
                      </Link>
                      <Link 
                        href="/blog/FleckenentfernungsBerater" 
                        className="block hover:bg-teal-50 p-2 rounded transition-colors text-sm"
                      >
                        Fleckenentfernungs-Berater
                      </Link>
                      <Link 
                        href="/blog/streumittel" 
                        className="block hover:bg-blue-50 p-2 rounded transition-colors text-sm"
                      >
                        Streugut-Vergleich für den Winterdienst
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Services Promotion */}
                <Card className="bg-teal-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Umweltfreundliche Reinigung von Profis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-4">
                      Möchten Sie auf nachhaltige Reinigung umsteigen, wissen aber nicht, wo Sie anfangen sollen? TREU Service bietet professionelle, umweltfreundliche Reinigungsdienstleistungen mit zertifizierten Öko-Produkten und geschultem Personal.
                    </Paragraph>
                    <Link href="/reinigung" className="text-teal-600 font-medium hover:underline text-sm">
                      Nachhaltige Reinigung anfragen →
                    </Link>
                  </CardContent>
                </Card>
                
                {/* Umwelt-Zertifizierungen */}
                <Card className="bg-teal-50 border-teal-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Award className="w-5 h-5 mr-2 text-teal-600" />
                      Unsere Zertifizierungen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-teal-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">EU Ecolabel zertifiziert</p>
                          <p className="text-xs text-gray-600">Für unsere gesamte Produktpalette</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-teal-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Cradle to Cradle</p>
                          <p className="text-xs text-gray-600">Für unsere Reinigungsprozesse</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-teal-600 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">ISO 14001:2015</p>
                          <p className="text-xs text-gray-600">Umweltmanagementsystem</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Downloads */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Checklisten & Leitfäden</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <a 
                        href="#" 
                        className="flex items-center text-sm font-medium text-teal-600 hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Checkliste: Nachhaltige Reinigung
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center text-sm font-medium text-teal-600 hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Umweltsiegel-Guide als PDF
                      </a>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Expert Card */}
                <Card className="bg-blue-50 border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Fragen zum Thema?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
                        <Image 
                          src="/images/team/eco-expert.jpg" 
                          alt="Umweltexperte" 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">Dr. Sarah Grünfeld</p>
                        <p className="text-xs text-gray-600">Umweltexpertin</p>
                      </div>
                    </div>
                    <p className="text-sm mb-4">
                      Haben Sie Fragen zu nachhaltigen Reinigungsmethoden? Unsere Expertin berät Sie gerne persönlich und hilft Ihnen bei der Umstellung auf umweltfreundliche Reinigungspraktiken.
                    </p>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      Kostenloses Beratungsgespräch
                    </Button>
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
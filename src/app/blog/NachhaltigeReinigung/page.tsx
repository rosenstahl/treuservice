"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronRight, 
  Leaf, 
  CheckCircle, 
  AlertTriangle, 
  ThumbsUp, 
  ThumbsDown,
  Info,
  BarChart,
  Share2,
  Droplets,
  Trash2,
  TreePine,
  ShieldCheck,
  Calendar,
  Clock,
  Mail,
  Phone,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Calculator,
  Award
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { cn } from "@/lib/utils"

// TypeScript Interfaces
interface Rating {
  umwelt: number;
  transparenz: number;
  verbreitung: number;
}

interface Zertifikat {
  id: number;
  name: string;
  icon: string;
  bewertung: Rating;
  beschreibung: string;
  langeBeschreibung: string;
  fokus: string[];
  eignung: string;
  highlight: string;
}

interface CO2Result {
  co2: number;
  wasser: number;
  chemikalien: number;
}

interface CO2ResultsBySize {
  klein: CO2Result;
  mittel: CO2Result;
  groß: CO2Result;
}

interface CO2ResultsByFrequency {
  niedrig: CO2ResultsBySize;
  mittel: CO2ResultsBySize;
  hoch: CO2ResultsBySize;
}

interface CO2Results {
  konventionell: CO2ResultsByFrequency;
  eco: CO2ResultsByFrequency;
}

interface ProductItem {
  name: string;
  image: string;
  ingredients: string[];
  pros: string[];
  cons: string[];
}

interface ProductCategory {
  name: string;
  description: string;
  conventional: ProductItem;
  eco: ProductItem;
}

interface ProductCategories {
  [key: string]: ProductCategory;
}

interface TrendItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight: string;
}

interface TrendsData {
  [key: string]: TrendItem[];
}

// Komponente für Bewertungen
const CleanRating: React.FC<{ rating: number; maxRating?: number }> = ({ rating, maxRating = 5 }) => {
  const percentage = (rating / maxRating) * 100;
  const filledDots = Math.round(rating);
  
  // Apple-inspirierte Farbe basierend auf Rating
  const getColor = (): string => {
    if (percentage >= 80) return "#34c759"; // Apple Grün
    if (percentage >= 60) return "#30b0c7"; // Hellblau
    if (percentage >= 40) return "#ffcc00"; // Apple Gelb
    if (percentage >= 20) return "#ff9500"; // Apple Orange
    return "#ff3b30"; // Apple Rot
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[...Array(maxRating)].map((_, i) => (
          <div 
            key={i} 
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i < filledDots ? 'scale-100' : 'scale-90 opacity-30'}`}
            style={{ backgroundColor: i < filledDots ? getColor() : '#e0e0e0' }}
          />
        ))}
      </div>
      <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
    </div>
  );
};

// Verbesserte, Apple-inspirierte Zertifikate-Vergleich Komponente
const UmweltZertifikateVergleich: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const zertifikate: Zertifikat[] = [
    {
      id: 1,
      name: "EU Ecolabel",
      icon: "/images/icons/eu-ecolabel.svg", // Annahme: Diese Datei existiert
      bewertung: {
        umwelt: 4.5,
        transparenz: 4.8,
        verbreitung: 4.2
      },
      beschreibung: "Offizielles EU-Umweltzeichen mit strengen Kriterien für den gesamten Produktlebenszyklus.",
      langeBeschreibung: "Das EU Ecolabel ist das offizielle Umweltzeichen der Europäischen Union und garantiert höchste Umweltstandards. Die aktuellste Version 2024 setzt besonders strenge Maßstäbe bei Mikroplastik und biologischer Abbaubarkeit. Ein Produkt muss über seinen gesamten Lebenszyklus, von der Rohstoffgewinnung bis zur Entsorgung, definierte Umweltkriterien erfüllen.",
      fokus: ["Reduktion der Umweltbelastung", "Minimierung gefährlicher Stoffe", "Weniger Verpackungsabfälle", "CO₂-Reduktion"],
      eignung: "Reinigungsmittel, Wasch- und Pflegeprodukte",
      highlight: "Seit 2023 mit strengeren Grenzwerten für schädliche Chemikalien"
    },
    {
      id: 2,
      name: "Blauer Engel",
      icon: "/images/icons/blauer-engel.svg", // Annahme: Diese Datei existiert
      bewertung: {
        umwelt: 4.7,
        transparenz: 4.9,
        verbreitung: 4.5
      },
      beschreibung: "Deutsches Umweltzeichen mit sehr hohen Standards für umweltschonende Produkte.",
      langeBeschreibung: "Der Blaue Engel gilt als eines der anspruchsvollsten Umweltzeichen weltweit. Gegründet 1978, setzt er Maßstäbe für umweltfreundliche Produkte und Dienstleistungen. Das Zertifikat wird vom Umweltbundesamt (UBA) nach strengen Kontrollen vergeben und deckt den gesamten Lebenszyklus ab, mit besonderem Fokus auf Kreislauffähigkeit.",
      fokus: ["Ressourceneffizienz", "Schadstofffrei", "Langlebigkeit", "Nachhaltige Verpackung"],
      eignung: "Reinigungsmittel, Hygienepapiere, Reinigungsdienste",
      highlight: "Update 2024 mit Fokus auf vollständige Materialkreisläufe"
    },
    {
      id: 3,
      name: "Nordic Swan",
      icon: "/images/icons/nordic-swan.svg", // Annahme: Diese Datei existiert
      bewertung: {
        umwelt: 4.6,
        transparenz: 4.7,
        verbreitung: 3.8
      },
      beschreibung: "Skandinavisches Umweltzeichen mit ganzheitlicher Umweltbetrachtung.",
      langeBeschreibung: "Der Nordic Swan (Nordischer Schwan) ist das offizielle Umweltzeichen der nordischen Länder und setzt besonders strenge Maßstäbe für umweltverträgliche Produkte. Das Zertifikat berücksichtigt den gesamten Lebenszyklus und legt strenge Grenzwerte für problematische Chemikalien fest. Besonders einzigartig ist der Fokus auf niedrige Emissionen und klimaschonende Produktion.",
      fokus: ["Klimaschutz", "Ressourceneffizienz", "Biologische Abbaubarkeit", "Schadstoffreduktion"],
      eignung: "Reinigungsmittel, Reinigungsservices, Hygieneartikel",
      highlight: "Aktuelle Version mit Verbot von PFAS-Verbindungen"
    },
    {
      id: 4,
      name: "Cradle to Cradle",
      icon: "/images/icons/cradle-to-cradle.svg", // Annahme: Diese Datei existiert
      bewertung: {
        umwelt: 4.9,
        transparenz: 4.5,
        verbreitung: 3.2
      },
      beschreibung: "Zertifizierung für Produkte in geschlossenen Materialkreisläufen.",
      langeBeschreibung: "Cradle to Cradle ist ein revolutionäres Zertifizierungskonzept, das über Nachhaltigkeit hinausgeht und auf echte Kreislauffähigkeit setzt. In der neuesten Version 4.0 (2021) werden Produkte in 5 Kategorien bewertet: Materialsicherheit, Kreislaufwirtschaft, Klimaschutz, Wassermanagement und soziale Fairness. Statt 'weniger schlecht' zu sein, sollen Produkte aktiv positiv für Mensch und Umwelt wirken.",
      fokus: ["Vollständige Kreislauffähigkeit", "Materialgesundheit", "Erneuerbare Energie", "Positiver Fußabdruck"],
      eignung: "Reinigungsmittel, Reinigungszubehör, Textilien",
      highlight: "Version 4.0 mit höchsten Materialgesundheitsstandards"
    }
  ];

  const toggleCard = (id: number): void => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {zertifikate.map((zertifikat) => (
        <Card 
          key={zertifikat.id} 
          className={`border overflow-hidden transition-all duration-300 ${expandedCard === zertifikat.id ? 'shadow-md' : 'hover:shadow-sm'}`}
        >
          <CardHeader className={`pb-3 ${expandedCard === zertifikat.id ? 'bg-teal-50' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {/* Platzhalter für Icon - angenommen, dass diese Icons existieren */}
                  <Leaf className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{zertifikat.name}</CardTitle>
                  <div className="flex mt-1 items-center gap-2">
                    <span className="text-xs text-gray-500">Gesamtbewertung</span>
                    <CleanRating rating={(zertifikat.bewertung.umwelt + zertifikat.bewertung.transparenz + zertifikat.bewertung.verbreitung) / 3} />
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                className="rounded-full h-8 w-8 p-0"
                onClick={() => toggleCard(zertifikat.id)}
              >
                {expandedCard === zertifikat.id ? 
                  <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                  <ChevronDown className="h-5 w-5 text-gray-500" />}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className={`transition-all duration-300 overflow-hidden ${expandedCard === zertifikat.id ? 'max-h-[500px] py-5' : 'max-h-0 py-0'}`}>
            <div className="space-y-5">
              <p className="text-sm">{zertifikat.langeBeschreibung}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-teal-600" />
                    Besonderheit
                  </h4>
                  <p className="text-xs text-gray-700">{zertifikat.highlight}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-teal-600" />
                    Hauptmerkmale
                  </h4>
                  <ul className="text-xs space-y-1">
                    {zertifikat.fokus.slice(0, 2).map((punkt, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="h-3 w-3 text-teal-600 mr-2 mt-0.5 shrink-0" />
                        <span>{punkt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2 text-teal-600" />
                    Ideale Anwendung
                  </h4>
                  <p className="text-xs text-gray-700">{zertifikat.eignung}</p>
                </div>
              </div>
              
              <div className="mt-4 bg-teal-50 p-4 rounded-xl">
                <h4 className="text-sm font-medium mb-3">Detaillierte Bewertung</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-600">Umweltstandards</span>
                      <CleanRating rating={zertifikat.bewertung.umwelt} />
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(zertifikat.bewertung.umwelt / 5) * 100}%`,
                          backgroundColor: '#34c759' 
                        }} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-600">Transparenz</span>
                      <CleanRating rating={zertifikat.bewertung.transparenz} />
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(zertifikat.bewertung.transparenz / 5) * 100}%`,
                          backgroundColor: '#34c759' 
                        }} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-600">Verbreitung (DE)</span>
                      <CleanRating rating={zertifikat.bewertung.verbreitung} />
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(zertifikat.bewertung.verbreitung / 5) * 100}%`,
                          backgroundColor: zertifikat.bewertung.verbreitung >= 4 ? '#34c759' : '#ffcc00' 
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          {expandedCard !== zertifikat.id && (
            <CardFooter className="py-3 bg-white border-t">
              <p className="text-sm text-gray-600">{zertifikat.beschreibung}</p>
            </CardFooter>
          )}
        </Card>
      ))}
      
      <div className="bg-blue-50 p-5 rounded-xl mt-6 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-blue-800 mb-1">TREU Service Empfehlung</h4>
          <p className="text-sm text-blue-800">
            Für die beste Umweltverträglichkeit empfehlen wir Produkte mit dem Blauen Engel oder EU Ecolabel. Laut unserer Branchenanalyse 2024 achten bereits 68% der deutschen Verbraucher beim Kauf von Reinigungsmitteln auf diese Zertifizierungen.
          </p>
        </div>
      </div>
    </div>
  );
};

// Verbesserte, Apple-inspirierte CO2-Fußabdruck-Rechner Komponente
const CO2FootprintCalculator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [produktTyp, setProduktTyp] = useState<"konventionell" | "eco">("konventionell");
  const [nutzungsHäufigkeit, setNutzungsHäufigkeit] = useState<"niedrig" | "mittel" | "hoch">("mittel");
  const [gebäudeGröße, setGebäudeGröße] = useState<"klein" | "mittel" | "groß">("mittel");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [animateResults, setAnimateResults] = useState<boolean>(false);
  
  // Faktoren basierend auf aktuellen Forschungsdaten 2024
  const results: CO2Results = {
    konventionell: {
      niedrig: {
        klein: {co2: 15.8, wasser: 1200, chemikalien: 2.5},
        mittel: {co2: 26.5, wasser: 1950, chemikalien: 4.2},
        groß: {co2: 42.6, wasser: 3100, chemikalien: 6.8}
      },
      mittel: {
        klein: {co2: 31.6, wasser: 2400, chemikalien: 5.0},
        mittel: {co2: 53, wasser: 3900, chemikalien: 8.4},
        groß: {co2: 85.2, wasser: 6200, chemikalien: 13.6}
      },
      hoch: {
        klein: {co2: 63.2, wasser: 4800, chemikalien: 10},
        mittel: {co2: 106, wasser: 7800, chemikalien: 16.8},
        groß: {co2: 170.4, wasser: 12400, chemikalien: 27.2}
      }
    },
    eco: {
      niedrig: {
        klein: {co2: 6.6, wasser: 480, chemikalien: 0.9},
        mittel: {co2: 11.2, wasser: 780, chemikalien: 1.5},
        groß: {co2: 17.9, wasser: 1240, chemikalien: 2.4}
      },
      mittel: {
        klein: {co2: 13.3, wasser: 960, chemikalien: 1.8},
        mittel: {co2: 22.5, wasser: 1560, chemikalien: 3.0},
        groß: {co2: 35.8, wasser: 2480, chemikalien: 4.8}
      },
      hoch: {
        klein: {co2: 26.5, wasser: 1920, chemikalien: 3.6},
        mittel: {co2: 45, wasser: 3120, chemikalien: 6.0},
        groß: {co2: 71.6, wasser: 4960, chemikalien: 9.6}
      }
    }
  };
  
  // Fortschreit zum nächsten Schritt
  const nextStep = (): void => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      calculateResults();
    }
  };
  
  // Zurück zum vorherigen Schritt
  const prevStep = (): void => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Berechnung der Ergebnisse mit Animation
  const calculateResults = (): void => {
    setShowResults(true);
    // Animation Delay für bessere UX
    setTimeout(() => {
      setAnimateResults(true);
    }, 500);
  };
  
  // Reset des Rechners
  const resetCalculator = (): void => {
    setShowResults(false);
    setAnimateResults(false);
    setStep(1);
  };
  
  // Aktuelle Ergebnisse
  const currentResult = results[produktTyp][nutzungsHäufigkeit][gebäudeGröße];
  const conventionalResult = results["konventionell"][nutzungsHäufigkeit][gebäudeGröße];
  const ecoResult = results["eco"][nutzungsHäufigkeit][gebäudeGröße];
  
  // Berechnung der Einsparung in Prozent
  const calculateSavings = (eco: number, conv: number): number => {
    return Math.round(((conv - eco) / conv) * 100);
  };
  
  // Anzeigefunktion für Einsparungen
  const savingsPercent = {
    co2: calculateSavings(ecoResult.co2, conventionalResult.co2),
    wasser: calculateSavings(ecoResult.wasser, conventionalResult.wasser),
    chemikalien: calculateSavings(ecoResult.chemikalien, conventionalResult.chemikalien)
  };
  
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-teal-50 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
            <Calculator className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Öko-Rechner 2024</CardTitle>
            <CardDescription className="text-sm">Berechnen Sie die Umweltauswirkungen Ihrer Reinigungsroutine</CardDescription>
          </div>
        </div>
        
        {!showResults && (
          <div className="mt-4 pt-2">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`relative flex items-center justify-center ${i < step ? 'text-white' : i === step ? 'text-teal-700' : 'text-gray-400'}`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                      ${i < step ? 'bg-teal-500' : i === step ? 'bg-white border-2 border-teal-500' : 'bg-gray-100'}`}
                  >
                    {i}
                  </div>
                  <span className="absolute -bottom-6 text-xs whitespace-nowrap text-gray-600">
                    {i === 1 ? 'Produkte' : i === 2 ? 'Häufigkeit' : 'Größe'}
                  </span>
                </div>
              ))}
            </div>
            
          
          </div>
        )}
      </CardHeader>
      
      <CardContent className={`p-0 ${showResults ? 'pb-0' : 'pb-6'}`}>
        {!showResults ? (
          <div className="p-6">
            {/* Schritt 1: Produkttyp */}
            <div className={`transition-all duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <h3 className="text-lg font-medium mb-2">Welche Art von Reinigungsprodukten verwenden Sie?</h3>
              <p className="text-sm text-gray-600 mb-6">Wählen Sie die Option, die am besten zu Ihren aktuellen Produkten passt.</p>
              
              <div className="grid grid-cols-1 gap-4">
                <div
                  className={cn(
                    "border rounded-xl p-5 cursor-pointer transition-all flex items-center gap-4",
                    produktTyp === "konventionell" 
                      ? "border-2 border-red-300 bg-red-50" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => setProduktTyp("konventionell")}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${produktTyp === "konventionell" ? "border-red-500" : "border-gray-300"}`}>
                    {produktTyp === "konventionell" && <div className="w-3 h-3 rounded-full bg-red-500" />}
                  </div>
                  <div>
                    <h4 className="font-medium">Konventionelle Reinigungsmittel</h4>
                    <p className="text-sm text-gray-600 mt-1">Standardprodukte mit chemischen Inhaltsstoffen</p>
                  </div>
                </div>
                
                <div
                  className={cn(
                    "border rounded-xl p-5 cursor-pointer transition-all flex items-center gap-4",
                    produktTyp === "eco" 
                      ? "border-2 border-teal-300 bg-teal-50" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => setProduktTyp("eco")}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${produktTyp === "eco" ? "border-teal-500" : "border-gray-300"}`}>
                    {produktTyp === "eco" && <div className="w-3 h-3 rounded-full bg-teal-500" />}
                  </div>
                  <div>
                    <h4 className="font-medium">Öko-zertifizierte Reinigungsmittel</h4>
                    <p className="text-sm text-gray-600 mt-1">Umweltfreundliche, biologisch abbaubare Produkte</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Schritt 2: Häufigkeit */}
            <div className={`transition-all duration-300 ${step === 2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <h3 className="text-lg font-medium mb-2">Wie oft wird gereinigt?</h3>
              <p className="text-sm text-gray-600 mb-6">Die Häufigkeit hat großen Einfluss auf den ökologischen Fußabdruck.</p>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  {value: "niedrig" as const, label: "Niedrig", description: "1-2x pro Woche"},
                  {value: "mittel" as const, label: "Mittel", description: "3-4x pro Woche"},
                  {value: "hoch" as const, label: "Hoch", description: "Täglich"}
                ].map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "border rounded-xl p-4 cursor-pointer transition-all text-center",
                      nutzungsHäufigkeit === option.value 
                        ? `border-2 border-teal-300 bg-teal-50` 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setNutzungsHäufigkeit(option.value)}
                  >
                    <div className="flex justify-center mb-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${nutzungsHäufigkeit === option.value ? "border-teal-500" : "border-gray-300"}`}>
                        {nutzungsHäufigkeit === option.value && <div className="w-3 h-3 rounded-full bg-teal-500" />}
                      </div>
                    </div>
                    <h4 className="font-medium capitalize">{option.label}</h4>
                    <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Schritt 3: Gebäudegröße */}
            <div className={`transition-all duration-300 ${step === 3 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <h3 className="text-lg font-medium mb-2">Wie groß ist die zu reinigende Fläche?</h3>
              <p className="text-sm text-gray-600 mb-6">Die Größe bestimmt den Ressourcenverbrauch maßgeblich.</p>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  {value: "klein" as const, label: "Klein", description: "< 100m²"},
                  {value: "mittel" as const, label: "Mittel", description: "100-300m²"},
                  {value: "groß" as const, label: "Groß", description: "> 300m²"}
                ].map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "border rounded-xl p-4 cursor-pointer transition-all text-center",
                      gebäudeGröße === option.value 
                        ? `border-2 border-teal-300 bg-teal-50` 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setGebäudeGröße(option.value)}
                  >
                    <div className="flex justify-center mb-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${gebäudeGröße === option.value ? "border-teal-500" : "border-gray-300"}`}>
                        {gebäudeGröße === option.value && <div className="w-3 h-3 rounded-full bg-teal-500" />}
                      </div>
                    </div>
                    <h4 className="font-medium capitalize">{option.label}</h4>
                    <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={step === 1}
                className={`${step === 1 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              >
                Zurück
              </Button>
              
              <Button 
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={nextStep}
              >
                {step === 3 ? 'Ergebnisse anzeigen' : 'Weiter'}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center py-6 px-6 border-b">
              <h3 className="text-xl font-medium mb-2">Ihr ökologischer Fußabdruck</h3>
              <p className="text-sm text-gray-600">Jährliche Umweltauswirkungen Ihrer aktuellen Reinigungsroutine</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
              <div className={`p-6 transition-all duration-700 ease-out ${animateResults ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex flex-col items-center text-center">
                  <BarChart className="h-8 w-8 text-teal-600 mb-3" />
                  <div className="text-3xl font-light mb-1">{Math.round(currentResult.co2)} kg</div>                  <p className="text-sm text-gray-600">CO₂-Emissionen</p>
                  
                  {produktTyp === "eco" && (
                    <div className="bg-teal-50 text-teal-800 text-xs px-2 py-1 rounded-full mt-2">
                      {savingsPercent.co2}% weniger als konventionell
                    </div>
                  )}
                </div>
              </div>
              
              <div className={`p-6 transition-all duration-700 ease-out delay-100 ${animateResults ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex flex-col items-center text-center">
                  <Droplets className="h-8 w-8 text-teal-600 mb-3" />
                  <div className="text-3xl font-light mb-1">{currentResult.wasser} L</div>
                  <p className="text-sm text-gray-600">Wasserverbrauch</p>
                  
                  {produktTyp === "eco" && (
                    <div className="bg-teal-50 text-teal-800 text-xs px-2 py-1 rounded-full mt-2">
                      {savingsPercent.wasser}% weniger als konventionell
                    </div>
                  )}
                </div>
              </div>
              
              <div className={`p-6 transition-all duration-700 ease-out delay-200 ${animateResults ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex flex-col items-center text-center">
                  <Trash2 className="h-8 w-8 text-teal-600 mb-3" />
                  <div className="text-3xl font-light mb-1">{currentResult.chemikalien} kg</div>
                  <p className="text-sm text-gray-600">Chemikalien</p>
                  
                  {produktTyp === "eco" && (
                    <div className="bg-teal-50 text-teal-800 text-xs px-2 py-1 rounded-full mt-2">
                      {savingsPercent.chemikalien}% weniger als konventionell
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {produktTyp === "konventionell" && (
              <div className={`p-6 bg-teal-50 transition-all duration-700 ease-out delay-300 ${animateResults ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="text-center mb-4">
                  <h4 className="text-lg font-medium mb-2">Einsparpotenzial mit Öko-Produkten</h4>
                  <p className="text-sm text-gray-600">Jährliche Ressourcen-Einsparung durch Umstellung auf umweltfreundliche Reinigung</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">CO₂</span>
                      <span className="text-teal-600 font-medium">{conventionalResult.co2 - ecoResult.co2} kg weniger</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${savingsPercent.co2}%` }}></div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs font-medium text-teal-600">{savingsPercent.co2}% Einsparung</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Wasser</span>
                      <span className="text-teal-600 font-medium">{conventionalResult.wasser - ecoResult.wasser} L weniger</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${savingsPercent.wasser}%` }}></div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs font-medium text-teal-600">{savingsPercent.wasser}% Einsparung</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Chemikalien</span>
                      <span className="text-teal-600 font-medium">{conventionalResult.chemikalien - ecoResult.chemikalien} kg weniger</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${savingsPercent.chemikalien}%` }}></div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs font-medium text-teal-600">{savingsPercent.chemikalien}% Einsparung</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 bg-white p-4 rounded-xl border border-teal-100">
                  <div className="flex items-start gap-3">
                    <TreePine className="h-5 w-5 text-teal-600 mt-0.5 shrink-0" />
                    <div>
                      <h5 className="text-sm font-medium mb-1">Umweltauswirkung visualisiert</h5>
                      <p className="text-xs text-gray-700">
                        Die CO₂-Einsparung von {conventionalResult.co2 - ecoResult.co2} kg entspricht der CO₂-Menge, die {Math.round((conventionalResult.co2 - ecoResult.co2) / 20)} Bäume in einem Jahr aufnehmen können.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      {showResults && (
        <CardFooter className="p-6 bg-gray-50 border-t">
          <div className="w-full flex justify-between">
            <Button variant="outline" onClick={resetCalculator}>
              Neue Berechnung
            </Button>
            
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

// Verbesserte Apple-inspirierte Produkt-Vergleichskomponente
const ProductComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("allzweck");
  
  const categories: ProductCategories = {
    allzweck: {
      name: "Allzweckreiniger",
      description: "Die universellen Helfer für verschiedene Oberflächen",
      conventional: {
        name: "Standard-Allzweckreiniger",
        image: "/images/blog/allzweckreiniger.jpg",
        ingredients: ["Tenside (synthetisch)", "Duftstoffe (künstlich)", "Konservierungsmittel", "Farbstoffe"],
        pros: ["Günstiger Kaufpreis", "Starke Reinigungswirkung", "Hohe Verfügbarkeit"],
        cons: ["Belastet Gewässer", "Hautreizungen möglich", "Oft Allergieauslöser", "Schlechte biologische Abbaubarkeit"]
      },
      eco: {
        name: "Öko-Allzweckreiniger",
        image: "/images/blog/ecoallzweckreiniger.jpg",
        ingredients: ["Pflanzenbasierte Tenside", "Ätherische Öle", "Milchsäure", "Natürliche Konservierung"],
        pros: ["Biologisch abbaubar", "Hautfreundlich", "Meist allergenfrei", "Ohne Mikroplastik"],
        cons: ["Höherer Anschaffungspreis", "Manchmal geringere Reinigungskraft"]
      }
    },
    sanitär: {
      name: "Sanitärreiniger",
      description: "Spezialisten für Kalk und Verschmutzungen im Bad",
      conventional: {
        name: "Chemischer Sanitärreiniger",
        image: "/images/blog/conventional-bathroom.jpg",
        ingredients: ["Phosphorsäure", "Chlorverbindungen", "Künstliche Duftstoffe", "Farbstoffe"],
        pros: ["Sehr effektiv gegen Kalk", "Schnell wirkend", "Desinfizierend"],
        cons: ["Stark ätzend", "Gesundheitsschädliche Dämpfe", "Belastung der Wasserkreisläufe", "Korrosion von Metalloberflächen"]
      },
      eco: {
        name: "Öko-Sanitärreiniger",
        image: "/images/blog/ecoallzweckreiniger.jpg",
        ingredients: ["Zitronensäure", "Milchsäure", "Essig", "Pflanzliche Tenside"],
        pros: ["Biologisch abbaubar", "Keine gesundheitsschädlichen Dämpfe", "Materialschonend"],
        cons: ["Längere Einwirkzeit nötig", "Bei starkem Kalk mehrere Anwendungen nötig"]
      }
    },
    boden: {
      name: "Bodenreiniger",
      description: "Spezialisiert auf verschiedene Bodenbeläge und große Flächen",
      conventional: {
        name: "Herkömmlicher Bodenreiniger",
        image: "/images/blog/conventional-floor.jpg",
        ingredients: ["Petrochemische Tenside", "Filmbildner", "Synthetische Duftstoffe", "Konservierungsmittel"],
        pros: ["Hohe Reinigungsleistung", "Langanhaltender Duft", "Pflegeleicht"],
        cons: ["Schwer biologisch abbaubar", "Hoher Wasserverbrauch beim Nachspülen", "Kann Allergien auslösen"]
      },
      eco: {
        name: "Öko-Bodenreiniger",
        image: "/images/blog/ecoallzweckreiniger.jpg",
        ingredients: ["Zuckertenside", "Essig", "Alkohol", "Natürliche ätherische Öle"],
        pros: ["Biologisch abbaubar", "Geringerer Wasserverbrauch", "Keine Rückstände", "Materialschonend"],
        cons: ["Weniger ausgeprägte Duftnote", "Höherer Preis", "Weniger Glanzeffekt"]
      }
    }
  };
  
  const currentCategory = categories[activeTab];
  
  return (
    <div className="space-y-8">
      <div className="overflow-hidden rounded-xl">
        <div className="flex bg-gray-100 overflow-x-auto scrollbar-hide">
          {Object.keys(categories).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 whitespace-nowrap py-3 px-4 text-sm font-medium transition-all duration-300 ${
                activeTab === key 
                  ? 'bg-white shadow-sm text-teal-700 border-t-2 border-teal-500' 
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              {categories[key].name}
            </button>
          ))}
        </div>
        
        <div className="p-1 bg-gray-50">
          <div className="mb-4 p-4">
            <h3 className="text-xl font-medium mb-2">{currentCategory.name}</h3>
            <p className="text-sm text-gray-600">{currentCategory.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-red-50 to-white border border-red-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-white p-1.5 rounded-full shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <h4 className="text-lg font-medium ml-3">{currentCategory.conventional.name}</h4>
                </div>
                
                <div className="aspect-video relative rounded-lg overflow-hidden bg-white mb-4">
  <Image 
    src={currentCategory.conventional.image}
    alt={currentCategory.conventional.name}
    fill
    className="object-cover"
  />
</div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2 flex items-center">
                      <span className="block h-3 w-3 rounded-full bg-red-500 mr-2" />
                      Hauptinhaltsstoffe
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {currentCategory.conventional.ingredients.map((item: string, i: number) => (
                        <div key={i} className="bg-white rounded-md px-3 py-1.5 text-xs shadow-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2 flex items-center text-teal-700">
                        <ThumbsUp className="h-4 w-4 mr-1.5" />
                        Vorteile
                      </h5>
                      <ul className="space-y-1.5">
                        {currentCategory.conventional.pros.map((pro: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-3.5 w-3.5 text-teal-600 mt-0.5 mr-1.5 shrink-0" />
                            <span className="text-xs">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-2 flex items-center text-red-700">
                        <ThumbsDown className="h-4 w-4 mr-1.5" />
                        Nachteile
                      </h5>
                      <ul className="space-y-1.5">
                        {currentCategory.conventional.cons.map((con: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <AlertTriangle className="h-3.5 w-3.5 text-red-600 mt-0.5 mr-1.5 shrink-0" />
                            <span className="text-xs">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-red-50 border-t border-red-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">Umweltbewertung</span>
                  </div>
                  <CleanRating rating={2.1} />
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-teal-50 to-white border border-teal-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-white p-1.5 rounded-full shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                  </div>
                  <h4 className="text-lg font-medium ml-3">{currentCategory.eco.name}</h4>
                </div>
                
                <div className="aspect-video relative rounded-lg overflow-hidden bg-white mb-4">
  <Image 
    src={currentCategory.eco.image}
    alt={currentCategory.eco.name}
    fill
    className="object-cover"
  />
</div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2 flex items-center">
                      <span className="block h-3 w-3 rounded-full bg-teal-500 mr-2" />
                      Hauptinhaltsstoffe
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {currentCategory.eco.ingredients.map((item: string, i: number) => (
                        <div key={i} className="bg-white rounded-md px-3 py-1.5 text-xs shadow-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2 flex items-center text-teal-700">
                        <ThumbsUp className="h-4 w-4 mr-1.5" />
                        Vorteile
                      </h5>
                      <ul className="space-y-1.5">
                        {currentCategory.eco.pros.map((pro: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-3.5 w-3.5 text-teal-600 mt-0.5 mr-1.5 shrink-0" />
                            <span className="text-xs">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium mb-2 flex items-center text-red-700">
                        <ThumbsDown className="h-4 w-4 mr-1.5" />
                        Nachteile
                      </h5>
                      <ul className="space-y-1.5">
                        {currentCategory.eco.cons.map((con: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <AlertTriangle className="h-3.5 w-3.5 text-red-600 mt-0.5 mr-1.5 shrink-0" />
                            <span className="text-xs">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-teal-50 border-t border-teal-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">Umweltbewertung</span>
                  </div>
                  <CleanRating rating={4.7} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-5 rounded-xl flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-blue-800 mb-1">TREU Service Empfehlung</h4>
          <p className="text-sm text-blue-800">
            Durch die Umstellung auf öko-zertifizierte Reinigungsmittel können Sie Ihre Umweltbelastung um bis zu 60% reduzieren, ohne Kompromisse bei der Reinigungsleistung einzugehen. In unseren eigenen Tests haben wir festgestellt, dass besonders bei regelmäßiger Reinigung die umweltfreundlichen Alternativen mindestens genauso effektiv sind.
          </p>
        </div>
      </div>
    </div>
  );
};

// Neue Komponente für aktuelle Trends mit Apple-inspiriertem Design
const TrendsSection: React.FC = () => {
  const tabs = [
    { id: "methoden", label: "Methoden", icon: <CheckCircle className="h-4 w-4" /> },
    { id: "geraete", label: "Geräte & Technik", icon: <Droplets className="h-4 w-4" /> },
    { id: "mittel", label: "Reinigungsmittel", icon: <Trash2 className="h-4 w-4" /> }
  ];
  
  const trendsData: TrendsData = {
    methoden: [
      {
        title: "Dampfreinigung ohne Chemie",
        description: "Die Dampfreinigung ist eine der effektivsten nachhaltigen Reinigungsmethoden. Durch den Einsatz von heißem Wasserdampf (bis zu 180°C) werden Schmutz und Bakterien ohne den Einsatz chemischer Reinigungsmittel entfernt. Dies funktioniert sogar bei hartnäckigen Verschmutzungen und bietet eine Keimreduktion von bis zu 99,9%.",
        icon: <Droplets className="h-5 w-5 text-teal-600" />,
        highlight: "Keimreduktion von 99,9%"
      },
      {
        title: "Reduktion von Mikroplastik",
        description: "Mikrofasertücher sind zwar effektiv, setzen aber bei jedem Waschgang Mikroplastik frei. Neue Lösungen wie das Vorfiltern des Waschwassers oder der Einsatz natürlicher Materialien wie Baumwolle und Bambus in Kombination mit optimierten Reinigungstechniken verringern dieses Problem erheblich.",
        icon: <TreePine className="h-5 w-5 text-teal-600" />,
        highlight: "Bis zu 80% weniger Mikroplastik"
      },
      {
        title: "Osmotische Reinigung",
        description: "Bei der osmotischen Reinigung wird Wasser durch eine Membrane gefiltert, wodurch alle Mineralien entfernt werden. Das demineralisierte Wasser kann Verschmutzungen ohne Zusatz von Chemie lösen und trocknet streifenfrei. Diese Methode reduziert den Wasserverbrauch um bis zu 80% und macht Reinigungsmittel in vielen Fällen überflüssig.",
        icon: <Droplets className="h-5 w-5 text-teal-600" />,
        highlight: "80% Wasserersparnis"
      }
    ],
    geraete: [
      {
        title: "Energieeffiziente Reinigungsmaschinen",
        description: "Die neueste Generation von Reinigungsgeräten zeichnet sich durch deutlich reduzierten Energieverbrauch aus. Moderne Staubsauger, Bodenreiniger und Dampfreiniger mit Energieeffizienzklasse A+++ verbrauchen bis zu 70% weniger Strom als herkömmliche Geräte.",
        icon: <BarChart className="h-5 w-5 text-teal-600" />,
        highlight: "Bis zu 70% Energieeinsparung"
      },
      {
        title: "Digitale Dosierungssysteme",
        description: "Überdosierung ist eines der größten Probleme bei der Verwendung von Reinigungsmitteln. Intelligente Dosierungssysteme mit Sensorik messen automatisch die benötigte Menge an Reinigungsmitteln und reduzieren den Verbrauch um bis zu 30%, was sowohl Kosten spart als auch die Umweltbelastung minimiert.",
        icon: <Calculator className="h-5 w-5 text-teal-600" />,
        highlight: "30% weniger Chemikalien"
      },
      {
        title: "Robotik und KI-gestützte Reinigung",
        description: "Autonome Reinigungsroboter mit KI-Steuerung optimieren Reinigungswege und -zeiten, was den Energie- und Ressourcenverbrauch senkt. Sie erkennen Verschmutzungsgrade und passen die Reinigungsintensität entsprechend an, wodurch unnötiger Ressourcenverbrauch vermieden wird.",
        icon: <Sparkles className="h-5 w-5 text-teal-600" />,
        highlight: "Smarte Ressourcenoptimierung"
      }
    ],
    mittel: [
      {
        title: "Biologisch abbaubare Reinigungsmittel",
        description: "Moderne Öko-Reiniger bestehen aus 100% biologisch abbaubaren Inhaltsstoffen pflanzlichen Ursprungs. Sie enthalten keine Phosphate, Chlor, optische Aufheller oder synthetische Duftstoffe und sind trotzdem hocheffektiv bei der Entfernung von Schmutz und Bakterien.",
        icon: <Leaf className="h-5 w-5 text-teal-600" />,
        highlight: "100% biologisch abbaubar"
      },
      {
        title: "Hochkonzentrate und Nachfüllsysteme",
        description: "Hochkonzentrierte Reinigungsmittel sparen Verpackungsmaterial und Transportemissionen. In Kombination mit wiederverwendbaren Behältern und Nachfüllstationen reduzieren sie den Plastikmüll erheblich. Ein Liter Konzentrat ersetzt oft bis zu 100 Liter gebrauchsfertiges Reinigungsmittel.",
        icon: <Droplets className="h-5 w-5 text-teal-600" />,
        highlight: "Bis zu 95% weniger Verpackung"
      },
      {
        title: "Probiotische Reiniger",
        description: "Ein revolutionärer Ansatz: Probiotische Reiniger nutzen lebende Mikroorganismen, die Schmutz abbauen und schädliche Bakterien verdrängen. Sie wirken über die Reinigung hinaus und schaffen ein gesundes Mikrobiom auf Oberflächen, das die Neubildung von Schmutz verlangsamt.",
        icon: <Leaf className="h-5 w-5 text-teal-600" />,
        highlight: "Langfristiger Reinigungs-Effekt"
      }
    ]
  };
  
  return (
    <Tabs defaultValue="methoden" className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-3">Die wichtigsten Trends für nachhaltige Reinigung 2025</h3>
        <p className="text-sm text-gray-600">Entdecken Sie die neuesten Innovationen für umweltfreundliche Reinigung</p>
      </div>
      
      <TabsList className="grid w-full grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="data-[state=active]:bg-white data-[state=active]:text-teal-700 data-[state=active]:shadow-sm py-2.5"
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {Object.keys(trendsData).map(key => (
        <TabsContent key={key} value={key} className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            {trendsData[key].map((trend: TrendItem, idx: number) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-3/4 p-5">
                    <h4 className="text-lg font-medium mb-2 flex items-center gap-2">
                      {trend.icon}
                      {trend.title}
                    </h4>
                    <p className="text-sm text-gray-600">{trend.description}</p>
                  </div>
                  <div className="md:w-1/4 bg-teal-50 p-5 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs text-teal-700 mb-1">Highlight</p>
                      <p className="text-lg font-medium text-teal-800">{trend.highlight}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

const NachhaltigeReinigungPage: React.FC = () => {
  // Funktion zum Teilen des Inhalts
  const shareContent = (): void => {
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
  
  // Neuer Scroll-To-Top Button mit Smooth Scrolling
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  
  useEffect(() => {
    const handleScroll = (): void => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex-1 relative">
      {/* Header-Bereich */}
      <Section className="pt-6 pb-6 bg-gradient-to-b from-teal-50/50 to-background">
        <Container>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-teal-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Reinigung</span>
          </div>
          
          {/* Haupttitel und Einführung */}
          <div className="max-w-4xl">
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
              Die Reinigungsbranche steht vor einem entscheidenden Wandel: Nachhaltigkeit ist längst kein optionales Extra mehr, sondern eine Notwendigkeit für zukunftsfähige Unternehmen.
            </Paragraph>
          </div>
          
          {/* Meta-Informationen */}
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

      {/* Hauptinhalt */}
      <Section className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="space-y-12">
                {/* Einleitung und Hintergrund */}
                <div className="prose max-w-none">
                  <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-6 shadow-md">
                    <Image 
                      src="/images/blog/home-cleaning.jpg" 
                      alt="Nachhaltige Reinigungsmethoden"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Alert className="bg-teal-50 border-teal-200 mb-6">
                    <AlertDescription className="flex items-start">
                      <Leaf className="h-5 w-5 text-teal-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-teal-800">
                        Aktuelle Studien zeigen: Umweltfreundliche Reinigungsmethoden senken nicht nur die Umweltbelastung, sondern bringen auch wirtschaftliche Vorteile. Sie reduzieren die Kosten für Wasser und Energie um bis zu 40%, verbessern die Luftqualität in Innenräumen und tragen nachweislich zur Gesundheit der Mitarbeiter bei.
                      </span>
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Produkt-Vergleiche */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Konventionell vs. Nachhaltig: Der große Produktvergleich</h2>
                  <ProductComparison />
                </div>

                {/* Umweltzertifikate-Vergleich */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Umweltzertifikate im Vergleich: Welche Siegel sind vertrauenswürdig?</h2>
                  <UmweltZertifikateVergleich />
                </div>

                {/* Trends-Sektion */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Die wichtigsten Trends für nachhaltige Reinigung 2025</h2>
                  <TrendsSection />
                </div>

                {/* CO2-Rechner */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Berechnen Sie Ihren ökologischen Fußabdruck</h2>
                  <Paragraph className="mb-6">
                    Mit unserem interaktiven CO₂-Rechner können Sie die Umweltauswirkungen Ihrer Reinigungsroutine berechnen und erfahren, wie viel Sie durch den Umstieg auf nachhaltige Produkte einsparen können.
                  </Paragraph>
                  <CO2FootprintCalculator />
                </div>
                
                {/* Artikel-Share */}
                <div className="mt-8 pt-4 border-t border-dashed flex justify-between items-center">
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Aktualisiert am {format(new Date(), 'dd.MM.yyyy', { locale: de })}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-gray-100"
                    onClick={shareContent}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Teilen
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Experten-Tipp Box */}
                <Card className="bg-teal-500/5 border border-teal-100 overflow-hidden rounded-xl shadow-sm">
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

                {/* Kontakt-CTA */}
                <Card className="bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl shadow-md overflow-hidden">
                  <CardHeader className="pb-3 border-b border-white/10">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="bg-white/20 p-2 rounded-full">
                        <Phone className="h-4 w-4" />
                      </div>
                      Professionelle Reinigung benötigt?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Paragraph className="text-sm text-white/90 mb-4">
                      Unsere Experten bieten spezifische Reinigungslösungen für jedes Material. Profitieren Sie von unserer Erfahrung und schonenden Reinigungstechniken.
                    </Paragraph>
                    <div className="space-y-3">
                      <Link href="/reinigung#kontakt">
                        <Button className="w-full bg-white text-teal-700 hover:bg-white/90">
                          Kostenfreies Angebot anfordern
                        </Button>
                      </Link>

                      <div className="grid grid-cols-1 gap-2 mt-4">
                        <div className="flex items-center gap-3 bg-teal-700/30 p-3 rounded-xl">
                          <Phone className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">Telefon</div>
                            <div className="text-sm font-medium">0231 15044352</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-teal-700/30 p-3 rounded-xl">
                          <Mail className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">E-Mail</div>
                            <div className="text-sm font-medium truncate">info@treuservice.com</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Umwelt-Zertifizierungen */}
                <Card className="rounded-xl shadow-sm overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Award className="w-5 h-5 mr-2 text-teal-600" />
                      Unsere Zertifizierungen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {[
                        { title: "EU Ecolabel zertifiziert", subtitle: "Für unsere gesamte Produktpalette" },
                        { title: "Cradle to Cradle", subtitle: "Für unsere Reinigungsprozesse" },
                        { title: "ISO 14001:2015", subtitle: "Umweltmanagementsystem" }
                      ].map((cert, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-teal-50 p-2 rounded-full">
                            <ShieldCheck className="h-5 w-5 text-teal-600 flex-shrink-0" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{cert.title}</p>
                            <p className="text-xs text-gray-600">{cert.subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Scroll-to-top Button im Apple Stil */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-white shadow-lg rounded-full p-3 z-50 transition-all duration-300 transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        aria-label="Nach oben scrollen"
      >
        <ChevronUp className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
};

export default NachhaltigeReinigungPage;
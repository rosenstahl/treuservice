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
  Sun, 
  CheckCircle, 
  AlertTriangle, 
  ThumbsUp, 
  ThumbsDown,
  Info,
  Share2,
  Zap,
  BatteryCharging,
  CloudSun,
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
  Home,
  LineChart,
  PanelTop,
  Euro
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { cn } from "@/lib/utils"

// TypeScript Interfaces
interface Rating {
  effizienz: number;
  haltbarkeit: number;
  preis: number;
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

interface RoIResult {
  stromerzeugung: number;
  einsparung: number;
  amortisation: number;
}

interface RoIResultsBySize {
  klein: RoIResult;
  mittel: RoIResult;
  groß: RoIResult;
}

interface RoIResultsBySunlight {
  niedrig: RoIResultsBySize;
  mittel: RoIResultsBySize;
  hoch: RoIResultsBySize;
}

interface RoIResults {
  standard: RoIResultsBySunlight;
  premium: RoIResultsBySunlight;
}

interface PanelItem {
  name: string;
  image: string;
  specifications: string[];
  pros: string[];
  cons: string[];
}

interface PanelCategory {
  name: string;
  description: string;
  standard: PanelItem;
  premium: PanelItem;
}

interface PanelCategories {
  [key: string]: PanelCategory;
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
const SolarRating: React.FC<{ rating: number; maxRating?: number }> = ({ rating, maxRating = 5 }) => {
  const percentage = (rating / maxRating) * 100;
  const filledDots = Math.round(rating);
  
  // Apple-inspirierte Farbe basierend auf Rating
  const getColor = (): string => {
    if (percentage >= 80) return "#fbbf24"; // Gelb/Gold für Top-Rating
    if (percentage >= 60) return "#fdba74"; // Helles Orange
    if (percentage >= 40) return "#f97316"; // Orange
    if (percentage >= 20) return "#ef4444"; // Rot-Orange
    return "#dc2626"; // Rot
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
const PVZertifikateVergleich: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  
  const zertifikate: Zertifikat[] = [
    {
      id: 1,
      name: "IEC 61215",
      icon: "/images/icons/iec-standard.svg", // Annahme: Diese Datei existiert
      bewertung: {
        effizienz: 4.2,
        haltbarkeit: 4.8,
        preis: 3.8
      },
      beschreibung: "Internationaler Standard für die Qualifizierung der Bauart von kristallinen Photovoltaikmodulen.",
      langeBeschreibung: "Der IEC 61215 Standard ist eine weltweit anerkannte Richtlinie, die sicherstellt, dass PV-Module hohen Qualitätsstandards entsprechen. Er umfasst Tests für mechanische Belastungen, Feuchtigkeitsschutz, Temperaturbeständigkeit und langfristige Leistungsstabilität. Module, die nach diesem Standard zertifiziert sind, wurden strengen Tests unterzogen, um ihre Langlebigkeit unter verschiedenen Umweltbedingungen zu gewährleisten.",
      fokus: ["Mechanische Stabilität", "Umweltverträglichkeit", "Langlebigkeit", "Leistungsstabilität"],
      eignung: "Kristalline Silizium-Solarmodule",
      highlight: "Goldstandard für langlebige Solarmodule"
    },
    {
      id: 2,
      name: "TÜV Zertifizierung",
      icon: "/images/icons/tuev-standard.svg", // Annahme: Diese Datei existiert
      bewertung: {
        effizienz: 4.5,
        haltbarkeit: 4.7,
        preis: 3.5
      },
      beschreibung: "Deutsche Qualitätszertifizierung für Sicherheit und Leistungsfähigkeit von PV-Anlagen.",
      langeBeschreibung: "Die TÜV-Zertifizierung gilt in Deutschland als wichtigstes Qualitätssiegel für Solarmodule. Sie umfasst umfangreiche Prüfungen zur elektrischen Sicherheit, mechanischen Belastbarkeit und zur Einhaltung der Leistungsangaben. TÜV-geprüfte Module bieten zusätzliche Sicherheit, da sie regelmäßigen Kontrollen unterzogen werden und die Hersteller ihre Produktionsprozesse entsprechend anpassen müssen.",
      fokus: ["Elektrische Sicherheit", "Mechanische Belastbarkeit", "Einhaltung von Leistungsangaben", "Produktionsqualität"],
      eignung: "Alle Arten von PV-Modulen und Wechselrichtern",
      highlight: "Strengste Sicherheitskontrollen im deutschen Markt"
    },
    {
      id: 3,
      name: "MCS (Mikrogeneration)",
      icon: "/images/icons/mcs-standard.svg", // Annahme: Diese Datei existiert
      bewertung: {
        effizienz: 4.3,
        haltbarkeit: 4.2,
        preis: 4.0
      },
      beschreibung: "Britischer Standard für kleine erneuerbare Energiesysteme inkl. Solaranlagen.",
      langeBeschreibung: "Das Microgeneration Certification Scheme (MCS) ist ein britisches Qualitätssicherungsprogramm, das speziell für kleine erneuerbare Energiesysteme entwickelt wurde. Es zertifiziert sowohl Produkte als auch Installateure und stellt sicher, dass Solaranlagen nach höchsten Standards installiert werden. MCS-Zertifizierung ist oft Voraussetzung für staatliche Förderungen und Feed-in-Tarife im Vereinigten Königreich.",
      fokus: ["Produktqualität", "Installationsstandards", "Verbraucherschutz", "Förderungsfähigkeit"],
      eignung: "Kleinere PV-Anlagen für Privathaushalte",
      highlight: "Voraussetzung für UK-Förderprogramme"
    },
    {
      id: 4,
      name: "CEC-Listing",
      icon: "/images/icons/cec-standard.svg", // Annahme: Diese Datei existiert
      bewertung: {
        effizienz: 4.6,
        haltbarkeit: 4.1,
        preis: 4.2
      },
      beschreibung: "Australisches Zertifikat für Photovoltaik-Produkte und Effizienzstandards.",
      langeBeschreibung: "Das Clean Energy Council (CEC) Listing ist ein Qualitätsstandard aus Australien, der sicherstellt, dass Solarmodule und Wechselrichter die australischen Standards erfüllen. CEC-gelistete Produkte wurden auf ihre Leistungsfähigkeit, Sicherheit und Qualität geprüft und sind Voraussetzung für die Teilnahme an australischen Förderprogrammen. Die Zertifizierung umfasst auch strenge Anforderungen an die Energieeffizienz.",
      fokus: ["Energieeffizienz", "Australische Standardkonformität", "Leistungsgarantie", "Förderungsfähigkeit"],
      eignung: "PV-Module und Wechselrichter für den australischen Markt",
      highlight: "Hohe Effizienzstandards für sonnige Regionen"
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
          <CardHeader className={`pb-3 ${expandedCard === zertifikat.id ? 'bg-amber-50' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                  {/* Platzhalter für Icon - angenommen, dass diese Icons existieren */}
                  <Sun className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">{zertifikat.name}</CardTitle>
                  <div className="flex mt-1 items-center gap-2">
                    <span className="text-xs text-gray-500">Gesamtbewertung</span>
                    <SolarRating rating={(zertifikat.bewertung.effizienz + zertifikat.bewertung.haltbarkeit + zertifikat.bewertung.preis) / 3} />
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
                    <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                    Besonderheit
                  </h4>
                  <p className="text-xs text-gray-700">{zertifikat.highlight}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-amber-500" />
                    Hauptmerkmale
                  </h4>
                  <ul className="text-xs space-y-1">
                    {zertifikat.fokus.slice(0, 2).map((punkt, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="h-3 w-3 text-amber-500 mr-2 mt-0.5 shrink-0" />
                        <span>{punkt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <ShieldCheck className="h-4 w-4 mr-2 text-amber-500" />
                    Ideale Anwendung
                  </h4>
                  <p className="text-xs text-gray-700">{zertifikat.eignung}</p>
                </div>
              </div>
              
              <div className="mt-4 bg-amber-50 p-4 rounded-xl">
                <h4 className="text-sm font-medium mb-3">Detaillierte Bewertung</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-600">Effizienz</span>
                      <SolarRating rating={zertifikat.bewertung.effizienz} />
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(zertifikat.bewertung.effizienz / 5) * 100}%`,
                          backgroundColor: '#f59e0b' 
                        }} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-600">Haltbarkeit</span>
                      <SolarRating rating={zertifikat.bewertung.haltbarkeit} />
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(zertifikat.bewertung.haltbarkeit / 5) * 100}%`,
                          backgroundColor: '#f59e0b' 
                        }} 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-gray-600">Preis-Leistung</span>
                      <SolarRating rating={zertifikat.bewertung.preis} />
                    </div>
                    <div className="bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(zertifikat.bewertung.preis / 5) * 100}%`,
                          backgroundColor: zertifikat.bewertung.preis >= 4 ? '#f59e0b' : '#fb923c' 
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
            Für maximale Sicherheit und Qualität empfehlen wir PV-Module mit IEC 61215 Zertifizierung und TÜV-Prüfsiegel. Diese Kombination garantiert langlebige Solarmodule mit stabiler Leistung über die gesamte Lebensdauer.
          </p>
        </div>
      </div>
    </div>
  );
};

// Verbesserte, Apple-inspirierte PV-Rentabilitätsrechner Komponente
const PVRoICalculator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [modulTyp, setModulTyp] = useState<"standard" | "premium">("standard");
  const [sonnenEinstrahlung, setSonnenEinstrahlung] = useState<"niedrig" | "mittel" | "hoch">("mittel");
  const [dachGröße, setDachGröße] = useState<"klein" | "mittel" | "groß">("mittel");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [animateResults, setAnimateResults] = useState<boolean>(false);
  
  // Faktoren basierend auf aktuellen Daten 2024
  const results: RoIResults = {
    standard: {
      niedrig: {
        klein: {stromerzeugung: 2800, einsparung: 840, amortisation: 12.5},
        mittel: {stromerzeugung: 4900, einsparung: 1470, amortisation: 11.2},
        groß: {stromerzeugung: 8400, einsparung: 2520, amortisation: 10.4}
      },
      mittel: {
        klein: {stromerzeugung: 3400, einsparung: 1020, amortisation: 10.3},
        mittel: {stromerzeugung: 5800, einsparung: 1740, amortisation: 9.5},
        groß: {stromerzeugung: 9800, einsparung: 2940, amortisation: 8.9}
      },
      hoch: {
        klein: {stromerzeugung: 4200, einsparung: 1260, amortisation: 8.3},
        mittel: {stromerzeugung: 6900, einsparung: 2070, amortisation: 8.0},
        groß: {stromerzeugung: 11500, einsparung: 3450, amortisation: 7.6}
      }
    },
    premium: {
      niedrig: {
        klein: {stromerzeugung: 3300, einsparung: 990, amortisation: 13.2},
        mittel: {stromerzeugung: 5600, einsparung: 1680, amortisation: 12.5},
        groß: {stromerzeugung: 9800, einsparung: 2940, amortisation: 11.8}
      },
      mittel: {
        klein: {stromerzeugung: 4000, einsparung: 1200, amortisation: 11.8},
        mittel: {stromerzeugung: 6800, einsparung: 2040, amortisation: 10.9},
        groß: {stromerzeugung: 11400, einsparung: 3420, amortisation: 10.2}
      },
      hoch: {
        klein: {stromerzeugung: 4900, einsparung: 1470, amortisation: 10.1},
        mittel: {stromerzeugung: 8100, einsparung: 2430, amortisation: 9.5},
        groß: {stromerzeugung: 13600, einsparung: 4080, amortisation: 9.0}
      }
    }
  };
  
  // Nächster Schritt
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
  const currentResult = results[modulTyp][sonnenEinstrahlung][dachGröße];
  const standardResult = results["standard"][sonnenEinstrahlung][dachGröße];
  const premiumResult = results["premium"][sonnenEinstrahlung][dachGröße];
  
  // Berechnung des Vorteils in Prozent
  const calculateAdvantage = (premium: number, standard: number, isAmortisation = false): number => {
    if (isAmortisation) {
      // Bei Amortisation ist kleiner besser
      return Math.round(((standard - premium) / standard) * 100);
    }
    // Bei Stromerzeugung und Einsparung ist größer besser
    return Math.round(((premium - standard) / standard) * 100);
  };
  
  // Anzeigefunktion für Vorteile
  const advantagePercent = {
    stromerzeugung: calculateAdvantage(premiumResult.stromerzeugung, standardResult.stromerzeugung),
    einsparung: calculateAdvantage(premiumResult.einsparung, standardResult.einsparung),
    amortisation: calculateAdvantage(premiumResult.amortisation, standardResult.amortisation, true)
  };
  
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-amber-50 pb-4">
        <div className="flex items-center gap-3">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
            <Calculator className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <CardTitle className="text-xl">Solar-Rentabilitätsrechner</CardTitle>
            <CardDescription className="text-sm">Berechnen Sie Ihre möglichen Einsparungen mit Photovoltaik</CardDescription>
          </div>
        </div>
        
        {!showResults && (
          <div className="mt-4 pt-2">
            <div className="flex justify-between items-center">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`relative flex items-center justify-center ${i < step ? 'text-white' : i === step ? 'text-amber-700' : 'text-gray-400'}`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                      ${i < step ? 'bg-amber-500' : i === step ? 'bg-white border-2 border-amber-500' : 'bg-gray-100'}`}
                  >
                    {i}
                  </div>
                  <span className="absolute -bottom-6 text-xs whitespace-nowrap text-gray-600">
                    {i === 1 ? 'Modultyp' : i === 2 ? 'Sonneneinstrahlung' : 'Dachgröße'}
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
            {/* Schritt 1: Modultyp */}
            <div className={`transition-all duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <h3 className="text-lg font-medium mb-2">Welche Art von Solarmodulen möchten Sie verwenden?</h3>
              <p className="text-sm text-gray-600 mb-6">Wählen Sie die Option, die am besten zu Ihren Bedürfnissen passt.</p>
              
              <div className="grid grid-cols-1 gap-4">
                <div
                  className={cn(
                    "border rounded-xl p-5 cursor-pointer transition-all flex items-center gap-4",
                    modulTyp === "standard" 
                      ? "border-2 border-amber-300 bg-amber-50" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => setModulTyp("standard")}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${modulTyp === "standard" ? "border-amber-500" : "border-gray-300"}`}>
                    {modulTyp === "standard" && <div className="w-3 h-3 rounded-full bg-amber-500" />}
                  </div>
                  <div>
                    <h4 className="font-medium">Standard-Module</h4>
                    <p className="text-sm text-gray-600 mt-1">Polykristaline Module mit guter Leistung und Preis-Leistungs-Verhältnis</p>
                  </div>
                </div>
                
                <div
                  className={cn(
                    "border rounded-xl p-5 cursor-pointer transition-all flex items-center gap-4",
                    modulTyp === "premium" 
                      ? "border-2 border-amber-300 bg-amber-50" 
                      : "border-gray-200 hover:border-gray-300"
                  )}
                  onClick={() => setModulTyp("premium")}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${modulTyp === "premium" ? "border-amber-500" : "border-gray-300"}`}>
                    {modulTyp === "premium" && <div className="w-3 h-3 rounded-full bg-amber-500" />}
                  </div>
                  <div>
                    <h4 className="font-medium">Premium-Module</h4>
                    <p className="text-sm text-gray-600 mt-1">Monokristalline Hochleistungsmodule mit maximaler Effizienz</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Schritt 2: Sonneneinstrahlung */}
            <div className={`transition-all duration-300 ${step === 2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <h3 className="text-lg font-medium mb-2">Wie ist die Sonneneinstrahlung an Ihrem Standort?</h3>
              <p className="text-sm text-gray-600 mb-6">Die Sonneneinstrahlung hat großen Einfluss auf den Ertrag Ihrer PV-Anlage.</p>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  {value: "niedrig" as const, label: "Niedrig", description: "Nord-/Ostdeutschland"},
                  {value: "mittel" as const, label: "Mittel", description: "Mitteldeutschland"},
                  {value: "hoch" as const, label: "Hoch", description: "Süddeutschland/Alpen"}
                ].map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "border rounded-xl p-4 cursor-pointer transition-all text-center",
                      sonnenEinstrahlung === option.value 
                        ? `border-2 border-amber-300 bg-amber-50` 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setSonnenEinstrahlung(option.value)}
                  >
                    <div className="flex justify-center mb-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${sonnenEinstrahlung === option.value ? "border-amber-500" : "border-gray-300"}`}>
                        {sonnenEinstrahlung === option.value && <div className="w-3 h-3 rounded-full bg-amber-500" />}
                      </div>
                    </div>
                    <h4 className="font-medium capitalize">{option.label}</h4>
                    <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Schritt 3: Dachgröße */}
            <div className={`transition-all duration-300 ${step === 3 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <h3 className="text-lg font-medium mb-2">Wie groß ist die verfügbare Dachfläche?</h3>
              <p className="text-sm text-gray-600 mb-6">Die Dachgröße bestimmt die maximal mögliche Anlagengröße.</p>
              
              <div className="grid grid-cols-3 gap-4">
                {[
                  {value: "klein" as const, label: "Klein", description: "< 30m² (~3-4 kWp)"},
                  {value: "mittel" as const, label: "Mittel", description: "30-60m² (~5-8 kWp)"},
                  {value: "groß" as const, label: "Groß", description: "> 60m² (~9-15 kWp)"}
                ].map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "border rounded-xl p-4 cursor-pointer transition-all text-center",
                      dachGröße === option.value 
                        ? `border-2 border-amber-300 bg-amber-50` 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setDachGröße(option.value)}
                  >
                    <div className="flex justify-center mb-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${dachGröße === option.value ? "border-amber-500" : "border-gray-300"}`}>
                        {dachGröße === option.value && <div className="w-3 h-3 rounded-full bg-amber-500" />}
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
                className="bg-amber-500 hover:bg-amber-600 text-white"
                onClick={nextStep}
              >
                {step === 3 ? 'Ergebnisse anzeigen' : 'Weiter'}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center py-6 px-6 border-b">
              <h3 className="text-xl font-medium mb-2">Ihre PV-Rentabilitätsberechnung</h3>
              <p className="text-sm text-gray-600">Jährliche Erträge und Einsparungen mit Ihrer Photovoltaikanlage</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
              <div className={`p-6 transition-all duration-700 ease-out ${animateResults ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex flex-col items-center text-center">
                  <Zap className="h-8 w-8 text-amber-500 mb-3" />
                  <div className="text-3xl font-light mb-1">{currentResult.stromerzeugung} kWh</div>
                  <p className="text-sm text-gray-600">Jährliche Stromerzeugung</p>
                  
                  {modulTyp === "premium" && (
                    <div className="bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded-full mt-2">
                      {advantagePercent.stromerzeugung}% mehr als Standard
                    </div>
                  )}
                </div>
              </div>
              
              <div className={`p-6 transition-all duration-700 ease-out delay-100 ${animateResults ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex flex-col items-center text-center">
                  <Euro className="h-8 w-8 text-amber-500 mb-3" />
                  <div className="text-3xl font-light mb-1">{currentResult.einsparung} €</div>
                  <p className="text-sm text-gray-600">Jährliche Einsparung</p>
                  
                  {modulTyp === "premium" && (
                    <div className="bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded-full mt-2">
                      {advantagePercent.einsparung}% mehr als Standard
                    </div>
                  )}
                </div>
              </div>
              
              <div className={`p-6 transition-all duration-700 ease-out delay-200 ${animateResults ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex flex-col items-center text-center">
                  <LineChart className="h-8 w-8 text-amber-500 mb-3" />
                  <div className="text-3xl font-light mb-1">{currentResult.amortisation} Jahre</div>
                  <p className="text-sm text-gray-600">Amortisationszeit</p>
                  
                  {modulTyp === "premium" && (
                    <div className="bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded-full mt-2">
                      {Math.abs(advantagePercent.amortisation)}% {advantagePercent.amortisation >= 0 ? 'schneller' : 'langsamer'} als Standard
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {modulTyp === "standard" && (
              <div className={`p-6 bg-amber-50 transition-all duration-700 ease-out delay-300 ${animateResults ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="text-center mb-4">
                  <h4 className="text-lg font-medium mb-2">Potenzial mit Premium-Modulen</h4>
                  <p className="text-sm text-gray-600">Höhere Anfangsinvestition, aber bessere langfristige Erträge</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Stromerzeugung</span>
                      <span className="text-amber-600 font-medium">+{premiumResult.stromerzeugung - standardResult.stromerzeugung} kWh</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${advantagePercent.stromerzeugung}%` }}></div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs font-medium text-amber-600">{advantagePercent.stromerzeugung}% mehr</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Einsparung</span>
                      <span className="text-amber-600 font-medium">+{premiumResult.einsparung - standardResult.einsparung} €</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${advantagePercent.einsparung}%` }}></div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs font-medium text-amber-600">{advantagePercent.einsparung}% mehr</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Amortisationszeit</span>
                      <span className={`font-medium ${advantagePercent.amortisation >= 0 ? 'text-amber-600' : 'text-red-500'}`}>
                        {advantagePercent.amortisation >= 0 ? '-' : '+'}{Math.abs(premiumResult.amortisation - standardResult.amortisation).toFixed(1)} Jahre
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div className={`${advantagePercent.amortisation >= 0 ? 'bg-amber-500' : 'bg-red-500'} h-2 rounded-full`} 
                             style={{ width: `${Math.abs(advantagePercent.amortisation)}%` }}></div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className={`text-xs font-medium ${advantagePercent.amortisation >= 0 ? 'text-amber-600' : 'text-red-500'}`}>
                          {Math.abs(advantagePercent.amortisation)}% {advantagePercent.amortisation >= 0 ? 'schneller' : 'langsamer'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 bg-white p-4 rounded-xl border border-amber-100">
                  <div className="flex items-start gap-3">
                    <Sun className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <h5 className="text-sm font-medium mb-1">Langfristige Betrachtung</h5>
                      <p className="text-xs text-gray-700">
                        Premium-Module erzeugen über 25 Jahre etwa {(premiumResult.stromerzeugung - standardResult.stromerzeugung) * 25} kWh mehr Strom als Standard-Module, was einer zusätzlichen Einsparung von ca. {((premiumResult.einsparung - standardResult.einsparung) * 25).toLocaleString()} € entspricht.
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
            
            {modulTyp === "standard" && (
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Mehr über Premium-Module erfahren
              </Button>
            )}
            
            {modulTyp === "premium" && (
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                Angebot anfordern
              </Button>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

// Verbesserte Apple-inspirierte Paneltypen-Vergleichskomponente
const PanelComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("mono");
  
  const categories: PanelCategories = {
    mono: {
      name: "Monokristalline Module",
      description: "Hocheffiziente Solarmodule mit optimal ausgerichteten Siliziumkristallen",
      standard: {
        name: "Standard-Monokristalline Module",
        image: "/images/blog/standard-mono.jpg",
        specifications: ["Wirkungsgrad: 19-20%", "Leistung: 330-380 Wp", "Schwarz-blau", "25-30 Jahre Lebensdauer"],
        pros: ["Hoher Wirkungsgrad", "Geringer Platzbedarf", "Gute Leistung auch bei diffusem Licht", "Moderne Optik"],
        cons: ["Höherer Preis", "Leistungsverlust bei hohen Temperaturen", "Oft höherer CO2-Fußabdruck in der Produktion"]
      },
      premium: {
        name: "Premium-Monokristalline Module",
        image: "/images/blog/premium-mono.jpg",
        specifications: ["Wirkungsgrad: 21-23%", "Leistung: 390-450 Wp", "All-Black Design", "30-35 Jahre Lebensdauer"],
        pros: ["Höchster Wirkungsgrad", "Maximale Leistung auf kleiner Fläche", "Elegantes Design", "Sehr lange Garantie"],
        cons: ["Deutlich höherer Anschaffungspreis", "Preisleistungsverhältnis oft schlechter", "Längere Amortisationszeit"]
      }
    },
    poly: {
      name: "Polykristalline Module",
      description: "Kosteneffiziente Solarmodule mit guter Leistung für größere Dachflächen",
      standard: {
        name: "Standard-Polykristalline Module",
        image: "/images/blog/standard-poly.jpg",
        specifications: ["Wirkungsgrad: 15-17%", "Leistung: 280-320 Wp", "Bläulich schimmernd", "25 Jahre Lebensdauer"],
        pros: ["Günstiger Anschaffungspreis", "Gutes Preis-Leistungs-Verhältnis", "Geringere Produktionskosten", "Breite Verfügbarkeit"],
        cons: ["Geringerer Wirkungsgrad", "Mehr Fläche für gleiche Leistung nötig", "Weniger ästhetisch"]
      },
      premium: {
        name: "Premium-Polykristalline Module",
        image: "/images/blog/premium-poly.jpg",
        specifications: ["Wirkungsgrad: 17-19%", "Leistung: 320-350 Wp", "Gleichmäßiges Erscheinungsbild", "25-30 Jahre Lebensdauer"],
        pros: ["Guter Wirkungsgrad", "Verbesserte Optik", "Ausgewogenes Preis-Leistungs-Verhältnis", "Geringerer Leistungsverlust bei hohen Temperaturen"],
        cons: ["Immer noch weniger effizient als Mono", "Benötigt mehr Platz als Monokristallin", "Meist weniger elegant"]
      }
    },
    dünn: {
      name: "Dünnschichtmodule",
      description: "Flexible, leichte Solarmodule für besondere Anwendungen und Designs",
      standard: {
        name: "Standard-Dünnschichtmodule",
        image: "/images/blog/standard-thin.jpg",
        specifications: ["Wirkungsgrad: 10-12%", "Leistung: 100-140 Wp/m²", "Homogenes Erscheinungsbild", "20-25 Jahre Lebensdauer"],
        pros: ["Flexibel & leicht", "Bessere Leistung bei diffusem Licht", "Geringerer Temperatureffekt", "Designfreundlich"],
        cons: ["Niedriger Wirkungsgrad", "Deutlich größere Fläche nötig", "Schnellerer Leistungsabfall", "Begrenzte Verfügbarkeit"]
      },
      premium: {
        name: "Premium-Dünnschichtmodule (CIS/CIGS)",
        image: "/images/blog/premium-thin.jpg",
        specifications: ["Wirkungsgrad: 13-15%", "Leistung: 150-180 Wp/m²", "Einheitlich schwarz", "25 Jahre Lebensdauer"],
        pros: ["Elegante Integration möglich", "Sehr gute Schwachlichtleistung", "Homogene Optik", "Temperaturstabil"],
        cons: ["Höhere Kosten bei niedriger Effizienz", "Größerer Flächenbedarf", "Höhere Installationskosten pro kWp", "Weniger erprobt"]
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
                  ? 'bg-white shadow-sm text-amber-700 border-t-2 border-amber-500' 
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
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-blue-50 to-white border border-blue-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-white p-1.5 rounded-full shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
                  <h4 className="text-lg font-medium ml-3">{currentCategory.standard.name}</h4>
                </div>
                
                <div className="aspect-video relative rounded-lg overflow-hidden bg-white mb-4">
  <Image
    src={currentCategory.standard.image}
    alt={currentCategory.standard.name}
    fill
    className="object-cover"
  />
</div>                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2 flex items-center">
                      <span className="block h-3 w-3 rounded-full bg-blue-500 mr-2" />
                      Spezifikationen
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {currentCategory.standard.specifications.map((item: string, i: number) => (
                        <div key={i} className="bg-white rounded-md px-3 py-1.5 text-xs shadow-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2 flex items-center text-amber-700">
                        <ThumbsUp className="h-4 w-4 mr-1.5" />
                        Vorteile
                      </h5>
                      <ul className="space-y-1.5">
                        {currentCategory.standard.pros.map((pro: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 mr-1.5 shrink-0" />
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
                        {currentCategory.standard.cons.map((con: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <AlertTriangle className="h-3.5 w-3.5 text-red-500 mt-0.5 mr-1.5 shrink-0" />
                            <span className="text-xs">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 border-t border-blue-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">Preis-Leistung</span>
                  </div>
                  <SolarRating rating={4.2} />
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-amber-50 to-white border border-amber-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="bg-white p-1.5 rounded-full shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                  </div>
                  <h4 className="text-lg font-medium ml-3">{currentCategory.premium.name}</h4>
                </div>
                
                <div className="aspect-video relative rounded-lg overflow-hidden bg-white mb-4">
  <Image
    src={currentCategory.premium.image}
    alt={currentCategory.premium.name}
    fill
    className="object-cover"
  />
</div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2 flex items-center">
                      <span className="block h-3 w-3 rounded-full bg-amber-500 mr-2" />
                      Spezifikationen
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {currentCategory.premium.specifications.map((item: string, i: number) => (
                        <div key={i} className="bg-white rounded-md px-3 py-1.5 text-xs shadow-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2 flex items-center text-amber-700">
                        <ThumbsUp className="h-4 w-4 mr-1.5" />
                        Vorteile
                      </h5>
                      <ul className="space-y-1.5">
                        {currentCategory.premium.pros.map((pro: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 mr-1.5 shrink-0" />
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
                        {currentCategory.premium.cons.map((con: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <AlertTriangle className="h-3.5 w-3.5 text-red-500 mt-0.5 mr-1.5 shrink-0" />
                            <span className="text-xs">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-amber-50 border-t border-amber-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-xs text-gray-500">Preis-Leistung</span>
                  </div>
                  <SolarRating rating={3.8} />
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
            Für die meisten Privathaushalte bieten Standard-Monokristalline Module das beste Gesamtpaket aus Effizienz und Kosten. Bei begrenzter Dachfläche empfehlen wir Premium-Module mit höherem Wirkungsgrad, um die verfügbare Fläche optimal zu nutzen.
          </p>
        </div>
      </div>
    </div>
  );
};

// Neue Komponente für aktuelle Trends mit Apple-inspiriertem Design
const TrendsSection: React.FC = () => {
  const tabs = [
    { id: "technologie", label: "Technologie", icon: <Sparkles className="h-4 w-4" /> },
    { id: "integration", label: "Gebäudeintegration", icon: <Home className="h-4 w-4" /> },
    { id: "speicher", label: "Speicherlösungen", icon: <BatteryCharging className="h-4 w-4" /> }
  ];
  
  const trendsData: TrendsData = {
    technologie: [
      {
        title: "Bifaziale Solarmodule",
        description: "Bifaziale Module nutzen sowohl direktes Sonnenlicht als auch reflektiertes Licht auf der Rückseite. Dies steigert den Energieertrag je nach Installationsbedingungen um 5-30%. Besonders effizient sind sie bei hellen Untergründen, über Wasserflächen oder bei aufgeständerten Anlagen, die dem Licht eine Reflektion auf die Rückseite ermöglichen.",
        icon: <PanelTop className="h-5 w-5 text-amber-500" />,
        highlight: "Bis zu 30% mehr Ertrag"
      },
      {
        title: "Perowskit-Solarzellen",
        description: "Perowskit-Solarzellen sind der vielversprechendste neue Ansatz in der Photovoltaik. Diese Technologie hat in nur einem Jahrzehnt Forschung Wirkungsgrade von über 25% erreicht – vergleichbar mit etablierten Silizium-Solarzellen. Sie sind leichter, flexibler und potenziell deutlich günstiger in der Herstellung.",
        icon: <Zap className="h-5 w-5 text-amber-500" />,
        highlight: "Revolution bei Kosten und Flexibilität"
      },
      {
        title: "Tandem-Solarzellen",
        description: "Tandem-Solarzellen kombinieren zwei unterschiedliche Solarzelltypen, um einen breiteren Teil des Sonnenspektrums zu nutzen. Die neueste Generation aus Silizium und Perowskit erreicht Wirkungsgrade von über 29% im Labormaßstab und durchbricht damit theoretische Grenzen konventioneller Siliziumzellen.",
        icon: <Sun className="h-5 w-5 text-amber-500" />,
        highlight: "Effizienz über 29%"
      }
    ],
    integration: [
      {
        title: "Solardachziegel",
        description: "Moderne Solardachziegel integrieren sich nahtlos ins Dachbild und ersetzen konventionelle Dachziegel. Im Gegensatz zu frühen Modellen erreichen aktuelle Produkte Wirkungsgrade von bis zu 20% und sind kaum von normalen Dachziegeln zu unterscheiden. Damit vereinen sie Ästhetik und Funktionalität.",
        icon: <Home className="h-5 w-5 text-amber-500" />,
        highlight: "Ästhetisch und funktional"
      },
      {
        title: "Transparente Solarmodule",
        description: "Semitransparente PV-Module ermöglichen die Integration von Photovoltaik in Fenster, Glasfassaden und Wintergärten. Die neueste Generation mit selektiven Beschichtungen lässt sichtbares Licht durch, während infrarotes und UV-Licht in Strom umgewandelt wird – bei bis zu 50% Transparenz.",
        icon: <Sun className="h-5 w-5 text-amber-500" />,
        highlight: "Lichtdurchlässig mit 10-15% Effizienz"
      },
      {
        title: "Solar-Carports",
        description: "Integrierte Solar-Carports verbinden Fahrzeugschutz mit Stromproduktion und optional Ladeinfrastruktur für E-Fahrzeuge. Moderne Systeme nutzen bifaziale Module, um auch reflektiertes Licht vom Boden oder Fahrzeug einzufangen und bieten ein komplettes Energiemanagement mit intelligenter Steuerung der Ladevorgänge.",
        icon: <Zap className="h-5 w-5 text-amber-500" />,
        highlight: "Laden mit Sonnenstrom"
      }
    ],
    speicher: [
      {
        title: "Salzwasser-Batterien",
        description: "Salzwasser-Batterien sind eine umweltfreundliche Alternative zu Lithium-Ionen-Akkus. Sie basieren auf ungiftigen Materialien wie Salzwasser, Kohlenstoff und Mangan, enthalten keine seltenen Erden und sind vollständig recyclebar. Obwohl sie eine geringere Energiedichte aufweisen, bieten sie eine längere Lebensdauer und höhere Sicherheit.",
        icon: <BatteryCharging className="h-5 w-5 text-amber-500" />,
        highlight: "100% umweltfreundlich"
      },
      {
        title: "Virtuelle Stromspeicher",
        description: "Virtuelle Speicher vernetzen zahlreiche dezentrale Heimspeicher zu einem Großspeicher. Die teilnehmenden Haushalte stellen einen Teil ihrer Speicherkapazität für das Netz zur Verfügung und profitieren im Gegenzug von optimierten Strompreisen und Netzentgelten. Diese Gemeinschaftsspeicher helfen, erneuerbare Energie effektiver zu nutzen.",
        icon: <CloudSun className="h-5 w-5 text-amber-500" />,
        highlight: "Gemeinschaftliche Energienutzung"
      },
      {
        title: "Bidirektionales Laden",
        description: "Bidirektionales Laden ermöglicht E-Autos, nicht nur Strom zu laden, sondern bei Bedarf auch ins Hausnetz zurückzuspeisen. Diese Vehicle-to-Home (V2H) Technologie verwandelt Elektrofahrzeuge in mobile Stromspeicher, die nachts den tagsüber erzeugten Solarstrom bereitstellen oder bei Stromausfällen als Notstromaggregat dienen können.",
        icon: <Zap className="h-5 w-5 text-amber-500" />,
        highlight: "E-Autos als Stromspeicher"
      }
    ]
  };
  
  return (
    <Tabs defaultValue="technologie" className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-3">Die wichtigsten Photovoltaik-Trends 2025</h3>
        <p className="text-sm text-gray-600">Entdecken Sie die neuesten Innovationen für maximale Solarstromnutzung</p>
      </div>
      
      <TabsList className="grid w-full grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm py-2.5"
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
                  <div className="md:w-1/4 bg-amber-50 p-5 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs text-amber-700 mb-1">Highlight</p>
                      <p className="text-lg font-medium text-amber-800">{trend.highlight}</p>
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

const PVGuidePage: React.FC = () => {
  // Funktion zum Teilen des Inhalts
  const shareContent = (): void => {
    if (navigator.share) {
      navigator.share({
        title: "Photovoltaik-Guide: Alles über Solaranlagen",
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
      <Section className="pt-6 pb-6 bg-gradient-to-b from-amber-50/50 to-background">
        <Container>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-amber-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-amber-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Photovoltaik</span>
          </div>
          
          {/* Haupttitel und Einführung */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-amber-200 px-2.5 py-0.5 text-xs font-semibold text-amber-600 bg-amber-50 mb-3">
              Photovoltaik
            </div>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Photovoltaikmodul-Vergleich & Rechner
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              Der ultimative Ratgeber für Photovoltaikmodule
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Photovoltaik wird zur tragenden Säule der Energiewende. Dieser Guide fasst alles Wichtige zu Technologien, Kosten und Vorteilen zusammen – für Einsteiger und Fortgeschrittene, die vom Sonnenstrom profitieren möchten.
            </Paragraph>
          </div>
          
          {/* Meta-Informationen */}
          <div className="flex items-center gap-6 text-muted-foreground mt-6">
            <div className="flex items-center gap-2">
              <div className="inline-block bg-amber-50 p-2 rounded-full">
                <Sun className="h-4 w-4 text-amber-600" />
              </div>
              <span className="text-sm">TREU Energy Team</span>
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
                      src="/images/blog/pv.jpg" 
                      alt="Moderne Photovoltaikanlage auf einem Hausdach"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Alert className="bg-amber-50 border-amber-200 mb-6">
                    <AlertDescription className="flex items-start">
                      <Sun className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-amber-800">
                        Aktuelle Statistik: In Deutschland wurden 2024 bereits über 5 GW neue PV-Leistung installiert. Bei durchschnittlichen Strompreisen von 35-40 Cent/kWh amortisiert sich eine Photovoltaikanlage je nach Standort bereits nach 8-12 Jahren – bei einer Lebensdauer von 25-30 Jahren.
                      </span>
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Panel-Vergleiche */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Die verschiedenen Solarmodultypen im Vergleich</h2>
                  <PanelComparison />
                </div>

                {/* Zertifikate-Vergleich */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Qualitätsstandards und Zertifizierungen für Solarmodule</h2>
                  <PVZertifikateVergleich />
                </div>

                {/* Trends-Sektion */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Die wichtigsten Photovoltaik-Trends 2025</h2>
                  <TrendsSection />
                </div>

                {/* Rentabilitätsrechner */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Berechnen Sie Ihre Rentabilität mit Photovoltaik</h2>
                  <Paragraph className="mb-6">
                    Mit unserem interaktiven PV-Rechner können Sie die zu erwartenden Erträge und Amortisationszeiten für Ihre individuelle Situation berechnen.
                  </Paragraph>
                  <PVRoICalculator />
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
                <Card className="bg-amber-500/5 border border-amber-100 overflow-hidden rounded-xl shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-6 w-6 text-yellow-500" />
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Kombinieren Sie Ihre PV-Anlage mit einem passenden Stromspeicher, um den Eigenverbrauchsanteil von 30% auf über 70% zu steigern. So maximieren Sie Ihre Einsparungen bei steigenden Strompreisen.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Lassen Sie auch die Dachausrichtung professionell bewerten: Während Südausrichtung optimal ist, können heute auch Ost-West-Anlagen dank moderner Modultechnologie wirtschaftlich sein und eine gleichmäßigere Stromerzeugung über den Tag bieten.
                    </Paragraph>
                  </CardContent>
                </Card>

                {/* Kontakt-CTA */}
                <Card className="bg-amber-500 text-white rounded-xl shadow-md overflow-hidden">
                  <CardHeader className="pb-2 border-b border-amber-400/30">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="p-1 bg-white/20 rounded-full">
                        <Phone className="h-4 w-4" />
                      </div>
                      Persönliche PV-Beratung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Paragraph className="text-sm text-white/90 mb-4">
                      Unsere Solarexperten beraten Sie umfassend zu Ihrer individuellen Situation und erstellen ein maßgeschneidertes Angebot für Ihre optimale PV-Anlage.
                    </Paragraph>
                    <div className="space-y-3">
                    <Link href="/pv-montage#kontakt">
                    <Button className="w-full bg-white text-amber-700 hover:bg-white/90">
                          Kostenfreies Angebot anfordern
                        </Button>
                      </Link>

                      <div className="grid grid-cols-1 gap-2 mt-4">
                        <div className="flex items-center gap-3 bg-amber-600/30 p-3 rounded-lg">
                          <Phone className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">Telefon</div>
                            <div className="text-sm font-medium">0231 15044352</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-amber-600/30 p-3 rounded-lg">
                          <Mail className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">E-Mail</div>
                            <div className="text-sm font-medium">info@treuservice.com</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Verwandte Artikel */}
                <Card className="rounded-xl shadow-sm overflow-hidden">
                <CardHeader className="pb-2 bg-gray-50">
                <CardTitle className="text-lg">Verwandte Artikel</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="divide-y">
                      {[
                        { url: "/reinigung", title: "Reinigung und Wartung von PV-Anlagen" },
                        { url: "/blog/PVGuide", title: "Photovoltaik-Montage Guide" }
                      ].map((article, idx) => (
                        <Link 
                          key={idx}
                          href={article.url} 
                          className="flex items-center py-3 group"
                        >
                          <ArrowRight className="h-4 w-4 text-yellow-500 mr-2 transform group-hover:translate-x-1 transition-transform" />
                          <span className="text-sm group-hover:text-yellow-600 transition-colors">{article.title}</span>
                        </Link>
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

export default PVGuidePage;
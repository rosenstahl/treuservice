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
  CheckCircle, 
  Info,
  Share2,
  Home,
  Trash,
  Truck,
  Calendar,
  Clock,
  Mail,
  Phone,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Trash2,
  HelpCircle,
  PenTool,
  PieChart,
  CreditCard,
  DollarSign,
  Tag,
  CheckSquare,
  Calculator,
  Sofa,
  CookingPot,
  Building,
  LampDesk,
  DoorOpen,
  BedDouble,
  Toilet,
  Warehouse,
  Archive,
  Droplets,
  Armchair
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// TypeScript Interfaces
interface PriceRange {
  min: number;
  max: number;
}

interface VolumePrice {
  small: PriceRange;
  medium: PriceRange;
  large: PriceRange;
  xl: PriceRange;
}

interface AccessFactor {
  [key: string]: number;
}

interface PropertyType {
  name: string;
  icon: React.ReactNode;
  description: string;
}

interface RoomData {
  name: string;
  icon: React.ReactNode;
  baseVolume: number;
  volumeDescription: string;
}

interface ExtraService {
  id: string;
  name: string;
  description: string;
  priceRange: PriceRange;
  icon: React.ReactNode;
}

interface ResultsSummary {
  volumeEstimate: number;
  basePrice: PriceRange;
  accessPrice: number;
  extraServicesPrice: number;
  totalPrice: PriceRange;
  durationEstimate: string;
}

// Bewertungs-Komponente (ähnlich wie in NachhaltigeReinigung, aber mit roter Farbpalette)
const PriceIndicator: React.FC<{ value: number; maxValue?: number }> = ({ value, maxValue = 5 }) => {
  const percentage = (value / maxValue) * 100;
  const filledDots = Math.round(value);
  
  // Rot-inspirierte Farbe basierend auf Preis
  const getColor = (): string => {
    if (percentage >= 80) return "#ef4444"; // Teuer - kräftiges Rot
    if (percentage >= 60) return "#f97316"; // Moderat - Orange
    if (percentage >= 40) return "#f59e0b"; // Günstig - Bernstein
    if (percentage >= 20) return "#84cc16"; // Sehr günstig - Limette
    return "#22c55e"; // Extrem günstig - Grün
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {[...Array(maxValue)].map((_, i) => (
          <div 
            key={i} 
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i < filledDots ? 'scale-100' : 'scale-90 opacity-30'}`}
            style={{ backgroundColor: i < filledDots ? getColor() : '#e0e0e0' }}
          />
        ))}
      </div>
      <span className="text-sm font-medium ml-1">€€ {value}</span>
    </div>
  );
};

// Entrümpelungs-Kostenrechner Komponente
const EntruemplungCalculator: React.FC = () => {
  // Schritte des Rechners
  const [step, setStep] = useState<number>(1);
  const [animateResults, setAnimateResults] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Kundeninformationen
  const [propertyType, setPropertyType] = useState<string>("apartment");
  const [accessDifficulty, setAccessDifficulty] = useState<string>("easy");
  const [rooms, setRooms] = useState<{[key: string]: number}>({
    livingRoom: 0,
    bedroom: 0,
    kitchen: 0,
    bathroom: 0,
    basement: 0,
    attic: 0,
    garage: 0
  });
  const [squareMeters, setSquareMeters] = useState<number>(60);
  const [selectedExtraServices, setSelectedExtraServices] = useState<string[]>([]);
  const [urgentService, setUrgentService] = useState<boolean>(false);
  
  // Preisdaten
  const volumePrices: VolumePrice = {
    small: { min: 250, max: 450 }, // unter 10m³
    medium: { min: 450, max: 750 }, // 10-20m³
    large: { min: 750, max: 1200 }, // 20-30m³
    xl: { min: 1200, max: 2000 } // über 30m³
  };
  
  const accessFactors: AccessFactor = {
    easy: 1.0,    // ebenerdig, guter Zugang
    moderate: 1.2, // einige Treppen oder enge Gänge
    difficult: 1.4, // viele Treppen, sehr enge Zugänge
    elevator: 1.3  // Aufzug verfügbar aber klein
  };
  
  const propertyTypes: {[key: string]: PropertyType} = {
    apartment: {
      name: "Wohnung",
      icon: <Building className="h-5 w-5 text-red-600" />,
      description: "Wohnung in einem Mehrfamilienhaus"
    },
    house: {
      name: "Haus",
      icon: <Home className="h-5 w-5 text-red-600" />,
      description: "Einfamilienhaus mit mehreren Räumen"
    },
    office: {
      name: "Büro",
      icon: <LampDesk className="h-5 w-5 text-red-600" />,
      description: "Geschäftsräume oder Büroflächen"
    },
    storage: {
      name: "Lager/Keller",
      icon: <DoorOpen className="h-5 w-5 text-red-600" />,
      description: "Keller, Dachboden oder Lagerraum"
    }
  };
  
  const roomsData: {[key: string]: RoomData} = {
    livingRoom: {
      name: "Wohnzimmer",
      icon: <Sofa className="h-4 w-4 text-red-600" />,
      baseVolume: 8,
      volumeDescription: "Sofa, Schränke, Tische, Deko"
    },
    bedroom: {
      name: "Schlafzimmer",
      icon: <BedDouble className="h-4 w-4 text-red-600" />,
      baseVolume: 6,
      volumeDescription: "Bett, Kleiderschrank, Kommode"
    },
    kitchen: {
      name: "Küche",
      icon: <CookingPot className="h-4 w-4 text-red-600" />,
      baseVolume: 5,
      volumeDescription: "Küchenmöbel, Geräte, Geschirr"
    },
    bathroom: {
      name: "Badezimmer",
      icon: <Toilet className="h-4 w-4 text-red-600" />,
      baseVolume: 3,
      volumeDescription: "Sanitärobjekte, Schränke"
    },
    basement: {
      name: "Keller",
      icon: <DoorOpen className="h-4 w-4 text-red-600" />,
      baseVolume: 10,
      volumeDescription: "Einlagerungen, alte Möbel"
    },
    attic: {
      name: "Dachboden",
      icon: <Archive className="h-4 w-4 text-red-600" />,
      baseVolume: 9,
      volumeDescription: "Einlagerungen, Kisten, Möbel"
    },
    garage: {
      name: "Garage/Carport",
      icon: <Warehouse className="h-4 w-4 text-red-600" />,
      baseVolume: 12,
      volumeDescription: "Werkzeug, Möbel, Geräte"
    }
  };
  
  const extraServices: ExtraService[] = [
    {
      id: "disposal",
      name: "Fachgerechte Entsorgung",
      description: "Umweltgerechte Entsorgung inkl. Sondermüll",
      priceRange: { min: 100, max: 300 },
      icon: <Trash className="h-4 w-4 text-red-600" />
    },
    {
      id: "cleaning",
      name: "Endreinigung",
      description: "Besenreine Reinigung nach der Entrümpelung",
      priceRange: { min: 80, max: 250 },
      icon: <Droplets className="h-4 w-4 text-red-600" />
    },
    {
      id: "furniture",
      name: "Möbeldemontage",
      description: "Abbau von Schränken, Betten und anderen Möbeln",
      priceRange: { min: 50, max: 200 },
      icon: <Armchair className="h-4 w-4 text-red-600" />
    },
    {
      id: "valuation",
      name: "Wertanrechnung",
      description: "Anrechnung wertvoller Gegenstände auf den Preis",
      priceRange: { min: -300, max: -50 },
      icon: <Tag className="h-4 w-4 text-red-600" />
    }
  ];
  
  // Berechnungsfunktionen
  const estimateVolume = (): number => {
    let totalVolume = 0;
    
    // Basisvolumen basierend auf den Räumen
    Object.entries(rooms).forEach(([roomType, count]) => {
      if (roomsData[roomType]) {
        totalVolume += roomsData[roomType].baseVolume * count;
      }
    });
    
    // Anpassung basierend auf Quadratmetern
    const volumeAdjustment = squareMeters / 100 * 5; // 5m³ pro 100m²
    totalVolume += volumeAdjustment;
    
    return Math.round(totalVolume);
  };
  
  const getPriceRangeForVolume = (volume: number): PriceRange => {
    if (volume < 10) return volumePrices.small;
    if (volume < 20) return volumePrices.medium;
    if (volume < 30) return volumePrices.large;
    return volumePrices.xl;
  };
  
  const calculateExtraServicesPrice = (): number => {
    let total = 0;
    selectedExtraServices.forEach(serviceId => {
      const service = extraServices.find(s => s.id === serviceId);
      if (service) {
        // Nehmen wir den Mittelwert aus der Preisspanne
        total += (service.priceRange.min + service.priceRange.max) / 2;
      }
    });
    return total;
  };
  
  const estimateDuration = (volume: number): string => {
    if (volume < 10) return "2-4 Stunden";
    if (volume < 20) return "4-6 Stunden";
    if (volume < 30) return "1 Tag";
    return "1-2 Tage";
  };
  
  // Berechnung des Gesamtergebnisses
  const calculateResults = (): ResultsSummary => {
    const volumeEstimate = estimateVolume();
    const basePrice = getPriceRangeForVolume(volumeEstimate);
    
    // Preis Modulatoren
    const accessFactor = accessFactors[accessDifficulty] || 1.0;
    const urgencyFactor = urgentService ? 1.3 : 1.0;
    
    // Access Aufpreis berechnen
    const accessPrice = Math.round(((basePrice.min + basePrice.max) / 2) * (accessFactor - 1));
    
    // Extraleistungen
    const extraServicesPrice = calculateExtraServicesPrice();
    
    // Gesamtpreis
    const totalMin = Math.round((basePrice.min * accessFactor * urgencyFactor) + extraServicesPrice);
    const totalMax = Math.round((basePrice.max * accessFactor * urgencyFactor) + extraServicesPrice);
    
    return {
      volumeEstimate,
      basePrice,
      accessPrice,
      extraServicesPrice,
      totalPrice: { min: totalMin, max: totalMax },
      durationEstimate: estimateDuration(volumeEstimate)
    };
  };
  
  // Schritt-Navigation
  const nextStep = (): void => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      showCalculationResults();
    }
  };
  
  const prevStep = (): void => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  // Ergebnisberechnung und -anzeige
  const showCalculationResults = (): void => {
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
    setPropertyType("apartment");
    setAccessDifficulty("easy");
    setRooms({
      livingRoom: 0,
      bedroom: 0,
      kitchen: 0,
      bathroom: 0,
      basement: 0,
      attic: 0,
      garage: 0
    });
    setSquareMeters(60);
    setSelectedExtraServices([]);
    setUrgentService(false);
  };
  
  // Event Handlers
  const handleRoomCountChange = (roomType: string, value: number): void => {
    setRooms({
      ...rooms,
      [roomType]: value
    });
  };
  
  const handleExtraServiceToggle = (serviceId: string): void => {
    if (selectedExtraServices.includes(serviceId)) {
      setSelectedExtraServices(selectedExtraServices.filter(id => id !== serviceId));
    } else {
      setSelectedExtraServices([...selectedExtraServices, serviceId]);
    }
  };
  
  // Format Preis für Anzeige
  const formatPrice = (price: number): string => {
    return `${price.toLocaleString('de-DE')}€`;
  };
  
  // Berechnung der Ergebnisse für die Anzeige
  const results = showResults ? calculateResults() : null;
  
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-sm">
            <Calculator className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Entrümpelungs-Kostenrechner</CardTitle>
            <CardDescription className="text-sm">Berechnen Sie die Kosten für Ihre Entrümpelung</CardDescription>
          </div>
        </div>
        
        {!showResults && (
          <div className="mt-4 pt-2">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`relative flex items-center justify-center ${i < step ? 'text-white' : i === step ? 'text-red-700' : 'text-gray-400'}`}
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                      ${i < step ? 'bg-red-500' : i === step ? 'bg-white border-2 border-red-500' : 'bg-gray-100'}`}
                  >
                    {i}
                  </div>
                  <span className="absolute -bottom-6 text-xs whitespace-nowrap text-gray-600">
                    {i === 1 ? 'Objekttyp' : i === 2 ? 'Räume' : i === 3 ? 'Zugang' : 'Extras'}
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
            {/* Schritt 1: Objekttyp */}
            <div className={`transition-all duration-300 ${step === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <h3 className="text-lg font-medium mb-2">Was soll entrümpelt werden?</h3>
              <p className="text-sm text-gray-600 mb-6">Wählen Sie die Art des Objekts und geben Sie die ungefähre Größe an.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {Object.entries(propertyTypes).map(([key, type]) => (
                  <div
                    key={key}
                    className={cn(
                      "border rounded-xl p-4 cursor-pointer transition-all",
                      propertyType === key 
                        ? "border-2 border-red-300 bg-red-50" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setPropertyType(key)}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${propertyType === key ? "bg-red-100" : "bg-gray-100"}`}>
                        {type.icon}
                      </div>
                      <h4 className="font-medium ml-3">{type.name}</h4>
                    </div>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="squareMeters" className="text-sm font-medium mb-1 flex justify-between">
                    <span>Größe in Quadratmetern: {squareMeters} m²</span>
                    <span className="text-xs text-gray-500">(ca. {Math.round(squareMeters * 0.1)} m³ Volumen)</span>
                  </Label>
                  <div className="relative py-6 mt-2 px-1">
  {/* Benutzerdefinierte Linie im Hintergrund */}
  <div className="absolute h-2 left-0 right-0 top-1/2 -translate-y-1/2 rounded-full bg-gray-200">
    {/* Gefüllter Bereich basierend auf dem Wert */}
    <div 
      className="absolute h-2 left-0 rounded-full bg-red-500" 
      style={{ width: `${((squareMeters - 20) / (300 - 20)) * 100}%` }}
    />
  </div>
  
  {/* Der Slider selbst mit direkt überschriebenen Stilen */}
  <Slider 
    id="squareMeters"
    value={[squareMeters]} 
    min={20} 
    max={300}
    step={5}
    onValueChange={(value) => setSquareMeters(value[0])}
    className="relative z-10 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-red-500 [&_[role=slider]]:bg-white [&_[data-orientation=horizontal]]:h-2 [&_[data-orientation=horizontal]]:bg-transparent [&_[data-orientation=horizontal]_[data-orientation=horizontal]]:bg-transparent"
  />
</div>                  <div className="flex justify-between text-xs text-gray-500">
                    <span>20 m²</span>
                    <span>150 m²</span>
                    <span>300 m²</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Schritt 2: Räume */}
            <div className={`transition-all duration-300 ${step === 2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <h3 className="text-lg font-medium mb-2">Welche Räume sollen entrümpelt werden?</h3>
              <p className="text-sm text-gray-600 mb-6">Geben Sie an, wie viele Räume jedes Typs entrümpelt werden sollen.</p>
              
              <div className="space-y-4">
                {Object.entries(roomsData).map(([roomType, room]) => (
                  <div key={roomType} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm mr-3">
                          {room.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{room.name}</h4>
                          <p className="text-xs text-gray-500">{room.volumeDescription}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleRoomCountChange(roomType, Math.max(0, rooms[roomType] - 1))}
                          disabled={rooms[roomType] === 0}
                        >
                          <span className="text-lg font-bold">-</span>
                        </Button>
                        <span className="w-8 text-center font-medium">{rooms[roomType]}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => handleRoomCountChange(roomType, rooms[roomType] + 1)}
                        >
                          <span className="text-lg font-bold">+</span>
                        </Button>
                      </div>
                    </div>
                    
                    {rooms[roomType] > 0 && (
                      <div className="bg-white px-3 py-2 rounded-md text-xs text-gray-700">
                        <span className="font-medium">Geschätztes Volumen:</span> ca. {room.baseVolume * rooms[roomType]} m³
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Schritt 3: Zugang */}
            <div className={`transition-all duration-300 ${step === 3 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <h3 className="text-lg font-medium mb-2">Wie ist der Zugang zum Objekt?</h3>
              <p className="text-sm text-gray-600 mb-6">Die Zugangsmöglichkeiten beeinflussen den Aufwand und damit den Preis.</p>
              
              <div className="grid grid-cols-1 gap-3">
                {[
                  {value: "easy", label: "Einfacher Zugang", description: "Ebenerdig oder mit wenigen Stufen, gute Parkmöglichkeit"},
                  {value: "elevator", label: "Mit Aufzug", description: "Aufzug vorhanden, aber evtl. klein oder mit Einschränkungen"},
                  {value: "moderate", label: "Mittelschwerer Zugang", description: "Mehrere Treppenstufen oder schmale Durchgänge"},
                  {value: "difficult", label: "Schwieriger Zugang", description: "Viele Treppen, sehr enge Gänge, keine direkte Anfahrt"}
                ].map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "border rounded-xl p-4 cursor-pointer transition-all flex items-center",
                      accessDifficulty === option.value 
                        ? "border-2 border-red-300 bg-red-50" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setAccessDifficulty(option.value)}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 mr-3 ${accessDifficulty === option.value ? "border-red-500" : "border-gray-300"}`}>
                      {accessDifficulty === option.value && <div className="w-3 h-3 rounded-full bg-red-500" />}
                    </div>
                    <div>
                      <h4 className="font-medium">{option.label}</h4>
                      <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                      <div className="flex items-center mt-1 text-xs text-red-600">
                        <span className="mr-1">Preisfaktor:</span>
                        <PriceIndicator value={accessFactors[option.value] * 2.5} maxValue={5} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Schritt 4: Zusatzleistungen */}
            <div className={`transition-all duration-300 ${step === 4 ? 'opacity-100' : 'opacity-0 hidden'}`}>
              <h3 className="text-lg font-medium mb-2">Zusätzliche Leistungen</h3>
              <p className="text-sm text-gray-600 mb-6">Wählen Sie gewünschte Zusatzleistungen und Optionen aus.</p>
              
              <div className="space-y-4 mb-6">
                {extraServices.map((service) => (
                  <div
                    key={service.id}
                    className={cn(
                      "border rounded-xl p-4 cursor-pointer transition-all",
                      selectedExtraServices.includes(service.id) 
                        ? "border-2 border-red-300 bg-red-50" 
                        : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => handleExtraServiceToggle(service.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedExtraServices.includes(service.id) ? "bg-red-100" : "bg-gray-100"} mr-3`}>
                          {service.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{service.name}</h4>
                          <p className="text-xs text-gray-600 mt-1">{service.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="mr-2 text-sm">
                          {service.priceRange.min < 0 
                            ? `${formatPrice(service.priceRange.min)} bis ${formatPrice(service.priceRange.max)}`
                            : `${formatPrice(service.priceRange.min)} - ${formatPrice(service.priceRange.max)}`
                          }
                        </div>
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${selectedExtraServices.includes(service.id) ? "bg-red-500 border-red-500" : "border-gray-300"}`}>
                          {selectedExtraServices.includes(service.id) && <CheckCircle className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Express-Service (innerhalb 48h)</h4>
                      <p className="text-xs text-gray-600 mt-1">Schnelle Durchführung mit Priorität (+30% Aufpreis)</p>
                    </div>
                  </div>
                  
                  <Switch 
                    checked={urgentService} 
                    onCheckedChange={setUrgentService}
                    className="data-[state=checked]:bg-red-500"
                  />
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <Info className="w-4 h-4 text-red-600 mr-2" />
                  Vorläufige Schätzung
                </h4>
                <p className="text-sm text-gray-700 mb-2">
                  Basierend auf Ihren Angaben schätzen wir ein Entrümpelungsvolumen von ca. <strong>{estimateVolume()} m³</strong>.
                </p>
                <p className="text-xs text-gray-600">
                  Die genaue Berechnung folgt im nächsten Schritt. Klicken Sie auf &quot;Kosten berechnen&quot;, um eine detaillierte Aufschlüsselung zu erhalten.
                </p>
              </div>
            </div>
            
            {/* Navigation Buttons */}
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
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={nextStep}
              >
                {step === 4 ? 'Kosten berechnen' : 'Weiter'}
              </Button>
            </div>
          </div>
        ) : (
          // Ergebnisse anzeigen
          <div>
            <div className="text-center py-6 px-6 border-b">
              <h3 className="text-xl font-medium mb-2">Ihre Kostenübersicht</h3>
              <p className="text-sm text-gray-600">
                Basierend auf einem geschätzten Volumen von {results?.volumeEstimate} m³
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 p-6">
              {/* Hauptpreis */}
              <div className={`bg-red-50 border border-red-100 rounded-xl p-5 transition-all duration-700 ease-out ${animateResults ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium">Gesamtkosten (Schätzung)</h4>
                    <p className="text-sm text-gray-600">Inkl. aller gewählten Leistungen & Faktoren</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-700">
                      {formatPrice(results?.totalPrice.min || 0)} - {formatPrice(results?.totalPrice.max || 0)}
                    </div>
                    <p className="text-xs text-gray-600">inkl. MwSt.</p>
                  </div>
                </div>
                
                <div className="text-sm flex justify-between items-center">
                  <span>Voraussichtliche Dauer:</span>
                  <span className="font-medium">{results?.durationEstimate}</span>
                </div>
              </div>
              
              {/* Kostenaufschlüsselung */}
              <div className={`transition-all duration-700 ease-out delay-100 ${animateResults ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h4 className="font-medium mb-3">Kostenaufschlüsselung</h4>
                
                <div className="space-y-3">
                  <div className="bg-white border rounded-lg p-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Basispreis (Volumen)</span>
                      <span className="text-sm font-medium">
                        {formatPrice(results?.basePrice.min || 0)} - {formatPrice(results?.basePrice.max || 0)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">Basierend auf {results?.volumeEstimate} m³ Entrümpelungsvolumen</p>
                  </div>
                  
                  {(results?.accessPrice || 0) > 0 && (
                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Zugangsaufpreis</span>
                        <span className="text-sm font-medium">+ {formatPrice(results?.accessPrice || 0)}</span>
                      </div>
                      <p className="text-xs text-gray-600">
                        Aufpreis aufgrund von {
                          accessDifficulty === "easy" ? "einfachem Zugang" :
                          accessDifficulty === "moderate" ? "mittelschweren Zugangsbedingungen" :
                          accessDifficulty === "difficult" ? "schwierigen Zugangsbedingungen" :
                          "Aufzug-Nutzung"
                        }
                      </p>
                    </div>
                  )}
                  
                  {selectedExtraServices.length > 0 && (
                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Zusatzleistungen</span>
                        <span className="text-sm font-medium">
                          {results?.extraServicesPrice && results.extraServicesPrice >= 0 ? '+' : ''}
                          {formatPrice(results?.extraServicesPrice || 0)}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {selectedExtraServices.map(serviceId => {
                          const service = extraServices.find(s => s.id === serviceId);
                          if (!service) return null;
                          const avgPrice = (service.priceRange.min + service.priceRange.max) / 2;
                          return (
                            <div key={serviceId} className="flex justify-between text-xs text-gray-600">
                              <span>{service.name}</span>
                              <span>{avgPrice >= 0 ? '+' : ''}{formatPrice(avgPrice)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {urgentService && (
                    <div className="bg-white border rounded-lg p-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Express-Aufschlag (30%)</span>
                        <span className="text-sm font-medium text-red-600">+ {formatPrice(((results?.totalPrice.min || 0) + (results?.totalPrice.max || 0)) / 2 * 0.3)}</span>
                      </div>
                      <p className="text-xs text-gray-600">Prioritätsbearbeitung innerhalb von 48 Stunden</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tipps */}
              <div className={`bg-blue-50 border border-blue-100 rounded-xl p-4 transition-all duration-700 ease-out delay-200 ${animateResults ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                  <div>
                    <h5 className="text-sm font-medium text-blue-800 mb-1">Tipps zur Kostenreduzierung</h5>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-blue-600 mt-0.5 mr-1.5 shrink-0" />
                        <span>Sortieren Sie wertvollen Hausrat vor - dies kann den Preis reduzieren.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-blue-600 mt-0.5 mr-1.5 shrink-0" />
                        <span>Flexible Terminplanung ohne Express-Service spart bis zu 30%.</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-blue-600 mt-0.5 mr-1.5 shrink-0" />
                        <span>Gewähren Sie guten Zugang zum Objekt, wenn möglich.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      {showResults && (
        <CardFooter className="p-6 bg-gray-50 border-t">
          <div className="w-full flex justify-between">
            <Button variant="outline" onClick={resetCalculator}>
              Neue Berechnung
            </Button>
            <Link href="/entruempelung#kontakt">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Angebot anfordern
            </Button>
            </Link>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

// Entrümplungs-Tipps Komponente
const EntruemplungTipps: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Tipps für eine erfolgreiche Entrümpelung</h2>
      
      <Tabs defaultValue="vorbereitung" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl">
          <TabsTrigger
            value="vorbereitung"
            className="data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-sm py-2.5"
          >
            Vorbereitung
          </TabsTrigger>
          <TabsTrigger
            value="durchfuehrung"
            className="data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-sm py-2.5"
          >
            Durchführung
          </TabsTrigger>
          <TabsTrigger
            value="nachbereitung"
            className="data-[state=active]:bg-white data-[state=active]:text-red-700 data-[state=active]:shadow-sm py-2.5"
          >
            Nachbereitung
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vorbereitung" className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "Inventur durchführen",
                description: "Erstellen Sie eine Liste aller zu entrümpelnden Gegenstände. Markieren Sie, was behalten, verkauft, gespendet oder entsorgt werden soll.",
                icon: <PenTool className="h-5 w-5 text-red-600" />
              },
              {
                title: "Wertgegenstände identifizieren",
                description: "Achten Sie auf möglicherweise wertvolle Gegenstände wie Antiquitäten, Schmuck oder Sammlerstücke, die vor der Entrümpelung separat begutachtet werden sollten.",
                icon: <Tag className="h-5 w-5 text-red-600" />
              },
              {
                title: "Dokumente sichern",
                description: "Wichtige Dokumente wie Urkunden, Verträge oder persönliche Unterlagen sollten vorab aussortiert und sicher aufbewahrt werden.",
                icon: <CheckSquare className="h-5 w-5 text-red-600" />
              }
            ].map((tip, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4 p-5">
                  <div className="bg-red-50 p-2 rounded-full">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-medium mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="durchfuehrung" className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "Nach Kategorien sortieren",
                description: "Sortieren Sie Gegenstände in Kategorien wie 'Behalten', 'Verkaufen', 'Spenden' und 'Entsorgen'. Verwenden Sie farbige Aufkleber zur Kennzeichnung.",
                icon: <PieChart className="h-5 w-5 text-red-600" />
              },
              {
                title: "Raum für Raum vorgehen",
                description: "Arbeiten Sie methodisch einen Raum nach dem anderen ab, statt zwischen verschiedenen Bereichen zu wechseln. Das verhindert Chaos und Überforderung.",
                icon: <Home className="h-5 w-5 text-red-600" />
              },
              {
                title: "Hilfe organisieren",
                description: "Entrümpelung ist physisch und emotional anstrengend. Organisieren Sie Freunde oder Familie, die bei der Arbeit helfen und emotionale Unterstützung bieten können.",
                icon: <CheckCircle className="h-5 w-5 text-red-600" />
              }
            ].map((tip, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4 p-5">
                  <div className="bg-red-50 p-2 rounded-full">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-medium mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="nachbereitung" className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                title: "Professionelle Reinigung",
                description: "Nach der Entrümpelung empfiehlt sich eine gründliche Reinigung der Räume, um Staub und Schmutz zu beseitigen. Dies ist besonders wichtig bei Haushaltsauflösungen.",
                icon: <CheckSquare className="h-5 w-5 text-red-600" />
              },
              {
                title: "Verwertungsnachweise sammeln",
                description: "Bei umweltsensiblen Gegenständen wie Elektrogeräten sollten Sie sich Entsorgungsnachweise vom Entrümpelungsunternehmen geben lassen.",
                icon: <Trash className="h-5 w-5 text-red-600" />
              },
              {
                title: "Letzte Kontrolle durchführen",
                description: "Überprüfen Sie alle Räume ein letztes Mal auf übersehene Gegenstände, insbesondere kleine Wertsachen oder persönliche Erinnerungsstücke.",
                icon: <HelpCircle className="h-5 w-5 text-red-600" />
              }
            ].map((tip, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4 p-5">
                  <div className="bg-red-50 p-2 rounded-full">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-medium mb-1">{tip.title}</h4>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Alert className="bg-red-50 border-red-200">
        <AlertDescription className="flex items-start">
          <Info className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-red-800">
            <strong>Expertentipp:</strong> Machen Sie Fotos vom Zustand der Räume vor der Entrümpelung, besonders wenn Sie ein professionelles Unternehmen beauftragen. Dies kann bei etwaigen Unstimmigkeiten oder Schäden als Dokumentation dienen.
          </span>
        </AlertDescription>
      </Alert>
    </div>
  );
};

// FAQ-Komponente
const EntruemplungFAQ: React.FC = () => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  
  const toggleQuestion = (id: number): void => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };
  
  const faqs = [
    {
      id: 1,
      question: "Was kostet eine professionelle Entrümpelung?",
      answer: "Die Kosten für eine professionelle Entrümpelung variieren je nach Umfang, Volumen und Zugänglichkeit. Typischerweise liegen die Preise zwischen 250€ für kleine Projekte (unter 10m³) und 2.000€ für große Entrümpelungen (über 30m³). Zusätzliche Faktoren wie schwierige Zugangsbedingungen, Sperrmüll oder Express-Service können die Kosten erhöhen. Für eine genaue Schätzung nutzen Sie unseren Kostenrechner oder fordern ein individuelles Angebot an."
    },
    {
      id: 2,
      question: "Wie lange dauert eine durchschnittliche Entrümpelung?",
      answer: "Die Dauer einer Entrümpelung hängt von verschiedenen Faktoren ab: dem Volumen der zu entsorgenden Gegenstände, der Anzahl der Räume, der Zugänglichkeit und dem Zustand des Objekts. Typischerweise dauert eine Wohnungsentrümpelung zwischen 4 und 8 Stunden, während größere Objekte wie Häuser oder Gewerbeflächen 1-3 Tage in Anspruch nehmen können. Bei der Planung sollten Sie auch Zeit für Vorbereitung und Nachbereitung einkalkulieren."
    },
    {
      id: 3,
      question: "Was passiert mit noch brauchbaren Gegenständen?",
      answer: "Professionelle Entrümpelungsunternehmen sortieren brauchbare Gegenstände aus und führen sie einer Wiederverwertung zu. Je nach Vereinbarung können diese Gegenstände gespendet, verkauft oder in Second-Hand-Läden angeboten werden. Wertvolle Gegenstände werden oft in die Preiskalkulation einbezogen und können den Gesamtpreis reduzieren. Sprechen Sie mit uns über die Option der Wertanrechnung, wenn Sie glauben, dass sich unter den zu entrümpelnden Gegenständen noch Wertvolles befindet."
    },
    {
      id: 4,
      question: "Muss ich bei der Entrümpelung anwesend sein?",
      answer: "Es ist nicht zwingend erforderlich, dass Sie während der gesamten Entrümpelung anwesend sind, aber wir empfehlen, zumindest zu Beginn vor Ort zu sein. So können Sie dem Entrümpelungsteam Zugang verschaffen, spezifische Anweisungen geben und eventuelle Fragen klären. Bei wertvollen oder persönlichen Gegenständen ist Ihre Anwesenheit ratsam, um sicherzustellen, dass diese entsprechend behandelt werden. Nach einer Einweisung können Sie die weitere Durchführung aber dem Fachpersonal überlassen."
    },
    {
      id: 5,
      question: "Wie umweltfreundlich ist eine professionelle Entrümpelung?",
      answer: "Moderne Entrümpelungsunternehmen legen großen Wert auf umweltfreundliche Entsorgung. Materialien werden nach Möglichkeit getrennt und dem Recycling zugeführt. Sperrmüll, Elektronikschrott und Sondermüll werden fachgerecht und gemäß den gesetzlichen Vorschriften entsorgt. Unsere Dienstleistung umfasst auf Wunsch die Bereitstellung von Entsorgungsnachweisen für umweltsensible Materialien. Durch die professionelle Sortierung und fachgerechte Entsorgung ist eine professionelle Entrümpelung in der Regel umweltfreundlicher als eine Eigenentsorgung."
    }
  ];
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Häufig gestellte Fragen zur Entrümpelung</h2>
      
      {faqs.map((faq) => (
        <div 
          key={faq.id} 
          className={`border rounded-xl overflow-hidden transition-all duration-300 ${
            expandedQuestion === faq.id ? 'shadow-md border-red-200' : 'hover:shadow-sm'
          }`}
        >
          <div 
            className={`p-4 flex items-center justify-between cursor-pointer ${
              expandedQuestion === faq.id ? 'bg-red-50' : 'bg-white'
            }`}
            onClick={() => toggleQuestion(faq.id)}
          >
            <h3 className="font-medium text-base">{faq.question}</h3>
            <Button 
              variant="ghost" 
              size="sm"
              className="rounded-full h-8 w-8 p-0"
            >
              {expandedQuestion === faq.id ? 
                <ChevronUp className="h-5 w-5 text-red-500" /> : 
                <ChevronDown className="h-5 w-5 text-gray-500" />}
            </Button>
          </div>
          
          <div 
            className={`transition-all duration-300 overflow-hidden ${
              expandedQuestion === faq.id ? 'max-h-96 py-4 px-4 border-t' : 'max-h-0 py-0 px-4'
            }`}
          >
            <p className="text-sm text-gray-700">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Hauptkomponente
const EntruemplungsKostenRechnerPage: React.FC = () => {
  // Funktion zum Teilen des Inhalts
  const shareContent = (): void => {
    if (navigator.share) {
      navigator.share({
        title: "Entrümpelungs-Kostenrechner",
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
  
  // Scrolling-Funktion
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
      <Section className="pt-6 pb-6 bg-gradient-to-b from-red-50/50 to-background">
        <Container>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-red-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-red-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Entrümpelung</span>
          </div>
          
          {/* Haupttitel und Einführung */}
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-red-200 px-2.5 py-0.5 text-xs font-semibold text-red-600 bg-red-50 mb-3">
              Entrümpelung
            </div>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Entrümpelungs-Kostenrechner: Preis einfach ermitteln
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              Berechnen Sie die Kosten für Ihre Entrümpelung schnell und transparent
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Eine professionelle Entrümpelung schafft Platz und erleichtert Umzüge, Haushaltsauflösungen oder Renovierungen. Mit unserem interaktiven Kostenrechner können Sie in wenigen Schritten ermitteln, mit welchen Kosten Sie für Ihr individuelles Entrümpelungsprojekt rechnen müssen.
            </Paragraph>
          </div>
          
          {/* Meta-Informationen */}
          <div className="flex items-center gap-6 text-muted-foreground mt-6">
            <div className="flex items-center gap-2">
              <div className="inline-block bg-red-50 p-2 rounded-full">
                <Trash2 className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm">TREU Service Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{format(new Date(), 'dd. MMMM yyyy', { locale: de })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">10 min</span>
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
                {/* Einleitung und Calculator */}
                <div className="prose max-w-none">
                  <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-6 shadow-md">
                    <Image 
                      src="/images/entruempelung.jpg" 
                      alt="Professionelle Entrümpelung"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <Alert className="bg-red-50 border-red-200 mb-6">
                    <AlertDescription className="flex items-start">
                      <Info className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-red-800">
                        Aktuelle Studie 2024: Die Kosten einer professionellen Entrümpelung amortisieren sich oft durch den Zeitgewinn und die korrekte Entsorgung von Problemstoffen. Im Durchschnitt sparen Kunden 12 Stunden Eigenarbeit und vermeiden Entsorgungsfehler.
                      </span>
                    </AlertDescription>
                  </Alert>
                </div>

                {/* Kostenrechner */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Entrümpelungskosten berechnen</h2>
                  <EntruemplungCalculator />
                </div>

                {/* Entrümpelungs-Tipps */}
                <div>
                  <EntruemplungTipps />
                </div>

                {/* FAQ-Sektion */}
                <div>
                  <EntruemplungFAQ />
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
                <Card className="bg-red-500/5 border border-red-100 overflow-hidden rounded-xl shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-6 w-6 text-yellow-500" />
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Inventarisieren Sie wertvolle Gegenstände vor der Entrümpelung. Dies kann den Preis erheblich reduzieren, da viele Dienstleister den Wert noch nutzbarer Möbel, Antiquitäten oder Sammlerstücke anrechnen.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Die beste Zeit für eine Entrümpelung ist übrigens außerhalb der Hauptumzugssaison (Mai-September). In den Wintermonaten sind die Preise oft günstiger und die Terminverfügbarkeit höher.
                    </Paragraph>
                  </CardContent>
                </Card>

                {/* Kontakt-CTA */}
                <Card className="bg-red-600 text-white rounded-xl shadow-md overflow-hidden">
                  <CardHeader className="pb-3 border-b border-red-500/30">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="p-2 bg-white/20 rounded-full">
                        <Phone className="h-4 w-4" />
                      </div>
                      Entrümpelung anfragen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Paragraph className="text-sm text-white/90 mb-4">
                      Unsere Entrümpelungs-Experten stehen Ihnen für ein kostenloses Beratungsgespräch zur Verfügung. Profitieren Sie von unserer Erfahrung und erhalten Sie ein maßgeschneidertes Angebot.
                    </Paragraph>
                    <div className="space-y-3">
                      <Link href="/entruempelung#kontakt">
                        <Button className="w-full bg-white text-red-700 hover:bg-white/90">
                          Kostenfreies Angebot anfordern
                        </Button>
                      </Link>

                      <div className="grid grid-cols-1 gap-2 mt-4">
                        <div className="flex items-center gap-3 bg-red-700/30 p-3 rounded-lg">
                          <Phone className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">Telefon</div>
                            <div className="text-sm font-medium">0231 15044352</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-red-700/30 p-3 rounded-lg">
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
                
                {/* Referenzen */}
                <Card className="rounded-xl shadow-sm overflow-hidden">
                  <CardHeader className="bg-gray-50 pb-2">
                    <CardTitle className="text-lg flex items-center">
                      <Truck className="w-5 h-5 mr-2 text-red-600" />
                      Unsere Leistungen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      {[
                        { title: "Wohnungsentrümpelung", subtitle: "Schnell, diskret und zuverlässig" },
                        { title: "Haushaltsauflösungen", subtitle: "Komplette Abwicklung inkl. Wertanrechnung" },
                        { title: "Messie-Wohnungen", subtitle: "Spezialisten für schwierige Fälle" }
                      ].map((service, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="bg-red-50 p-2 rounded-full">
                            <CheckCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{service.title}</p>
                            <p className="text-xs text-gray-600">{service.subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-dashed">
                      <h4 className="text-sm font-medium mb-2">Zahlungsoptionen</h4>
                      <div className="flex gap-2">
                        <div className="bg-gray-100 p-2 rounded-md">
                          <CreditCard className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="bg-gray-100 p-2 rounded-md">
                          <DollarSign className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="bg-gray-100 p-2 rounded-md">
                          <Truck className="h-5 w-5 text-gray-600" />
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

export default EntruemplungsKostenRechnerPage;
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Home,
  Warehouse,
  Package,
  Calculator,
  CalculatorIcon,
  Trash2,
  RefreshCcw,
  Euro,
  Clock,
  Info,
  AlertTriangle,
  Truck,
  Scale,
  BedDouble,
  BookOpen,
  Tv,
  Sofa,
  Clock4,
  Refrigerator,
  FileText,
  HardHat,
  Leaf
} from "lucide-react";
import { H3, Paragraph } from "@/components/ui/typography";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Typdefinitionen
type RoomType = 'wohnzimmer' | 'schlafzimmer' | 'kueche' | 'bad' | 'flur' | 'keller' | 'dachboden' | 'garage' | 'garten';
type ItemCategory = 'moebel' | 'elektro' | 'hausrat' | 'kleidung' | 'spielzeug' | 'buecher' | 'werkzeug' | 'sonstiges';
type ObjectSize = 'klein' | 'mittel' | 'gross' | 'sehr_gross';
type FillLevel = 'gering' | 'mittel' | 'hoch' | 'sehr_hoch';
type MessiGrade = 'nein' | 'leicht' | 'mittel' | 'stark';

interface RoomData {
  name: string;
  size: number;
  fillLevel: FillLevel;
  hasHazardousMaterials: boolean;
  hasLargeAppliances: boolean;
  hasElectronics: boolean;
  hasHeavyFurniture: boolean;
}

interface ItemData {
  category: ItemCategory;
  count: number;
  hasSpecialDisposal: boolean;
}

// Preisdaten für Deutschland (aktualisiert 2025)
const PRICE_DATA = {
  baseRates: {
    wohnung: 25, // €/m²
    haus: 22,    // €/m²
    keller: 30,  // €/m²
    dachboden: 28, // €/m²
    garage: 20,  // €/m²
  },
  fillLevelMultiplier: {
    gering: 0.7,
    mittel: 1.0,
    hoch: 1.3,
    sehr_hoch: 1.7
  },
  messiGradeMultiplier: {
    nein: 1.0,
    leicht: 1.3,
    mittel: 1.9,
    stark: 2.8
  },
  additionalCosts: {
    hazardousMaterials: 150, // €
    elevator: 100, // € pauschal für Aufzug
    floors: 60,   // € pro Stockwerk (ohne Aufzug)
    largeAppliances: 40, // € pro Großgerät
    electronics: 30, // € für Elektroschrott
    heavyFurniture: 120, // € pauschal für schwere Möbel
    disposal: {
      standard: 120, // € pro Tonne
      special: 220  // € pro Tonne Sondermüll
    },
    transportDistance: 2.50 // € pro km (über 30km)
  },
  regionalFactors: {
    'bayern': 1.15,
    'berlin': 1.20,
    'brandenburg': 0.95,
    'bremen': 1.05,
    'hamburg': 1.25,
    'hessen': 1.10,
    'mecklenburg_vorpommern': 0.90,
    'niedersachsen': 1.00,
    'nordrhein_westfalen': 1.05,
    'rheinland_pfalz': 1.00,
    'saarland': 0.95,
    'sachsen': 0.90,
    'sachsen_anhalt': 0.85,
    'schleswig_holstein': 1.05,
    'thueringen': 0.90,
    'baden_wuerttemberg': 1.15
  },
  discounts: {
    valuables: {
      none: 0,
      low: 0.05,  // 5% Rabatt
      medium: 0.10, // 10% Rabatt
      high: 0.20  // 20% Rabatt
    },
    selfHelp: 0.15  // 15% Rabatt bei Mithilfe
  }
};

// Vorschau-Preisdaten für typische Objekte
const SAMPLE_PRICES = {
  'einzimmerwohnung': { size: 30, price: '750 - 1.200 €' },
  'zweizimmerwohnung': { size: 50, price: '1.200 - 2.000 €' },
  'dreizimmerwohnung': { size: 70, price: '1.700 - 2.800 €' },
  'vierzimmerwohnung': { size: 90, price: '2.200 - 3.600 €' },
  'einfamilienhaus_klein': { size: 120, price: '2.600 - 4.500 €' },
  'einfamilienhaus_mittel': { size: 160, price: '3.500 - 6.000 €' },
  'einfamilienhaus_gross': { size: 220, price: '4.800 - 8.500 €' },
  'keller_klein': { size: 15, price: '450 - 700 €' },
  'keller_gross': { size: 30, price: '900 - 1.400 €' },
  'dachboden_klein': { size: 20, price: '550 - 900 €' },
  'dachboden_gross': { size: 40, price: '1.100 - 1.800 €' },
  'garage': { size: 20, price: '400 - 800 €' },
};

// Gewichte für typische Gegenstände
const ITEM_WEIGHTS = {
  moebel: {
    name: 'Möbel',
    items: {
      'Sofa': 60,
      'Sessel': 30,
      'Schrank (groß)': 80,
      'Kommode': 40,
      'Bett (inkl. Lattenrost)': 60,
      'Tisch': 30,
      'Stuhl': 8,
      'Regal': 25
    }
  },
  elektro: {
    name: 'Elektrogeräte',
    items: {
      'Kühlschrank': 70,
      'Waschmaschine': 75,
      'Herd': 45,
      'Fernseher (alt)': 30,
      'Fernseher (flach)': 15,
      'Computer/PC': 10,
      'Mikrowelle': 15,
      'Kleingeräte': 5
    }
  },
  hausrat: {
    name: 'Hausrat',
    items: {
      'Geschirr (Kiste)': 15,
      'Kleiderschrank Inhalt': 50,
      'Bettwäsche/Handtücher': 20,
      'Vorhänge': 5,
      'Teppich (groß)': 25,
      'Lampen': 7,
      'Dekoartikel (Kiste)': 10
    }
  },
  sonstiges: {
    name: 'Sonstiges',
    items: {
      'Karton mit Büchern': 20,
      'Fahrrad': 15,
      'Werkzeugkiste': 25,
      'Gartenmöbel-Set': 40,
      'Kisten mit Kleidung': 15,
      'Spielzeug (Kiste)': 10,
      'Sportgeräte': 30,
      'Umzugskarton gemischt': 15
    }
  }
};

// Schätzwert-Beispiele für potentiell wertvolle Gegenstände
const VALUABLE_ITEMS = [
  { name: 'Antiquitäten', desc: 'Alte Möbel, Uhren, Schmuck' },
  { name: 'Sammlerstücke', desc: 'Briefmarken, Münzen, Figuren' },
  { name: 'Kunst', desc: 'Gemälde, Skulpturen, Drucke' },
  { name: 'Vintage-Elektronik', desc: 'Alte Kameras, Radios, Instrumente' },
  { name: 'Designer-Möbel', desc: 'Bekannte Marken, besondere Stücke' },
  { name: 'Teppiche', desc: 'Handgeknüpfte oder antike Teppiche' }
];

// Hauptkomponente
const EntruemplungsKostenRechner = () => {
  // States für die verschiedenen Berechnungsmethoden
  const [calculationMethod, setCalculationMethod] = useState<'flaeche' | 'raeume' | 'gegenstaende'>('flaeche');
  const [objectType, setObjectType] = useState<'wohnung' | 'haus' | 'keller' | 'dachboden' | 'garage'>('wohnung');
  const [objectSize, setObjectSize] = useState<number>(70); // in m²
  const [fillLevel, setFillLevel] = useState<FillLevel>('mittel');
  const [messiGrade, setMessiGrade] = useState<MessiGrade>('nein');
  const [floors, setFloors] = useState<number>(0);
  const [hasElevator, setHasElevator] = useState<boolean>(false);
  const [transportDistance, setTransportDistance] = useState<number>(20);
  const [bundesland, setBundesland] = useState<string>('bayern');
  const [hasHazardousMaterials, setHasHazardousMaterials] = useState<boolean>(false);
  const [hasLargeAppliances, setHasLargeAppliances] = useState<boolean>(false);
  const [hasElectronics, setHasElectronics] = useState<boolean>(true);
  const [hasHeavyFurniture, setHasHeavyFurniture] = useState<boolean>(true);
  const [valuablesLevel, setValuablesLevel] = useState<'none' | 'low' | 'medium' | 'high'>('none');
  const [selfHelp, setSelfHelp] = useState<boolean>(false);
  
  // Raumspezifische States
  const [rooms, setRooms] = useState<RoomData[]>([
    { name: 'Wohnzimmer', size: 25, fillLevel: 'mittel', hasHazardousMaterials: false, hasLargeAppliances: false, hasElectronics: true, hasHeavyFurniture: true },
    { name: 'Schlafzimmer', size: 20, fillLevel: 'mittel', hasHazardousMaterials: false, hasLargeAppliances: false, hasElectronics: false, hasHeavyFurniture: true },
  ]);

  // Gegenstandsspezifische States
  const [items, setItems] = useState<ItemData[]>([
    { category: 'moebel', count: 5, hasSpecialDisposal: false },
    { category: 'elektro', count: 3, hasSpecialDisposal: false },
  ]);
  
  // State für das Berechnungsergebnis
  const [result, setResult] = useState({
    totalCost: 0,
    baseCost: 0,
    additionalCosts: 0,
    discounts: 0,
    estimatedTime: '',
    wasteVolume: 0,
    priceDetails: {
      basePrice: 0,
      fillLevelCost: 0,
      messiCost: 0,
      transportCost: 0,
      disposalCost: 0,
      specialItemsCost: 0,
      floorsCost: 0,
      regionalFactor: 0,
      valueDiscount: 0,
      selfHelpDiscount: 0
    }
  });

  // Kostenberechnung basierend auf ausgewählter Methode
  useEffect(() => {
    const calculateCosts = () => {
      let baseCost = 0;
      let additionalCosts = 0;
      let discounts = 0;
      let estimatedTime = '';
      let wasteVolume = 0;
      let priceDetails = {
        basePrice: 0,
        fillLevelCost: 0,
        messiCost: 0,
        transportCost: 0,
        disposalCost: 0,
        specialItemsCost: 0,
        floorsCost: 0,
        regionalFactor: 0,
        valueDiscount: 0,
        selfHelpDiscount: 0
      };

      // Faktor für Bundesland anwenden
      const regionalFactor = PRICE_DATA.regionalFactors[bundesland as keyof typeof PRICE_DATA.regionalFactors] || 1.0;
      priceDetails.regionalFactor = regionalFactor;

      // Berechnung basierend auf Flächenmethode
      if (calculationMethod === 'flaeche') {
        // Basispreis nach Objekttyp und Größe
        const baseRate = PRICE_DATA.baseRates[objectType];
        baseCost = objectSize * baseRate;
        priceDetails.basePrice = baseCost;

        // Füllgrad-Faktor anwenden
        const fillLevelFactor = PRICE_DATA.fillLevelMultiplier[fillLevel];
        baseCost = baseCost * fillLevelFactor;
        priceDetails.fillLevelCost = baseCost - priceDetails.basePrice;

        // Messie-Faktor anwenden, falls ausgewählt
        if (messiGrade !== 'nein') {
          const messieFactor = PRICE_DATA.messiGradeMultiplier[messiGrade];
          const messieCost = baseCost * (messieFactor - 1);
          baseCost = baseCost * messieFactor;
          priceDetails.messiCost = messieCost;
        }

        // Müllvolumen abschätzen basierend auf Größe und Füllgrad
        wasteVolume = objectSize * 0.15 * PRICE_DATA.fillLevelMultiplier[fillLevel];
        if (messiGrade !== 'nein') {
          wasteVolume = wasteVolume * PRICE_DATA.messiGradeMultiplier[messiGrade];
        }
      }
      // Berechnung basierend auf Raummethode
      else if (calculationMethod === 'raeume') {
        rooms.forEach(room => {
          // Basispreis für jeden Raum berechnen
          let roomBaseCost = room.size * PRICE_DATA.baseRates['wohnung']; // Standardpreis für Wohnung verwenden
          baseCost += roomBaseCost;
          
          // Füllgrad-Faktor für jeden Raum anwenden
          const fillLevelFactor = PRICE_DATA.fillLevelMultiplier[room.fillLevel];
          roomBaseCost = roomBaseCost * fillLevelFactor;
          baseCost += (roomBaseCost - baseCost);
          
          // Zusätzliche Kosten für Sondergegenstände
          if (room.hasHazardousMaterials) {
            additionalCosts += PRICE_DATA.additionalCosts.hazardousMaterials;
            priceDetails.specialItemsCost += PRICE_DATA.additionalCosts.hazardousMaterials;
          }
          if (room.hasLargeAppliances) {
            additionalCosts += PRICE_DATA.additionalCosts.largeAppliances;
            priceDetails.specialItemsCost += PRICE_DATA.additionalCosts.largeAppliances;
          }
          if (room.hasElectronics) {
            additionalCosts += PRICE_DATA.additionalCosts.electronics;
            priceDetails.specialItemsCost += PRICE_DATA.additionalCosts.electronics;
          }
          if (room.hasHeavyFurniture) {
            additionalCosts += PRICE_DATA.additionalCosts.heavyFurniture;
            priceDetails.specialItemsCost += PRICE_DATA.additionalCosts.heavyFurniture;
          }
          
          // Müllvolumen pro Raum abschätzen
          wasteVolume += room.size * 0.15 * PRICE_DATA.fillLevelMultiplier[room.fillLevel];
        });
        
        priceDetails.basePrice = baseCost;
      } 
      // Berechnung basierend auf Gegenständen
      else if (calculationMethod === 'gegenstaende') {
        // Preisberechnung basierend auf Gegenstandsanzahl und -kategorien
        items.forEach(item => {
          let categoryBaseCost = 0;
          
          switch(item.category) {
            case 'moebel':
              categoryBaseCost = item.count * 80; // Durchschnittspreis pro Möbelstück
              break;
            case 'elektro':
              categoryBaseCost = item.count * 60; // Durchschnittspreis pro Elektrogerät
              break;
            case 'hausrat':
              categoryBaseCost = item.count * 40; // Durchschnittspreis pro Hausratseinheit
              break;
            case 'kleidung':
              categoryBaseCost = item.count * 30; // Durchschnittspreis pro Kleidungseinheit
              break;
            case 'spielzeug':
              categoryBaseCost = item.count * 25; // Durchschnittspreis pro Spielzeugeinheit
              break;
            case 'buecher':
              categoryBaseCost = item.count * 35; // Durchschnittspreis pro Büchereinheit
              break;
            case 'werkzeug':
              categoryBaseCost = item.count * 50; // Durchschnittspreis pro Werkzeugeinheit
              break;
            case 'sonstiges':
              categoryBaseCost = item.count * 45; // Durchschnittspreis pro sonstige Einheit
              break;
          }
          
          baseCost += categoryBaseCost;
          
          // Zusätzliche Kosten für Sonderentsorgung
          if (item.hasSpecialDisposal) {
            additionalCosts += item.count * 40; // Zusätzliche Kosten für Sonderentsorgung
            priceDetails.specialItemsCost += item.count * 40;
          }
          
          // Grobe Abschätzung des Müllvolumens basierend auf Gegenstandstyp und Anzahl
          let itemVolume = 0;
          switch(item.category) {
            case 'moebel': itemVolume = item.count * 0.8; break;
            case 'elektro': itemVolume = item.count * 0.5; break;
            case 'hausrat': itemVolume = item.count * 0.3; break;
            case 'kleidung': itemVolume = item.count * 0.2; break;
            case 'spielzeug': itemVolume = item.count * 0.3; break;
            case 'buecher': itemVolume = item.count * 0.2; break;
            case 'werkzeug': itemVolume = item.count * 0.4; break;
            case 'sonstiges': itemVolume = item.count * 0.3; break;
          }
          wasteVolume += itemVolume;
        });
        
        priceDetails.basePrice = baseCost;
      }

      // Gemeinsame Zusatzkosten für alle Berechnungsmethoden
      
      // Zuschlag für Stockwerke ohne Aufzug oder Pauschalpreis für Aufzug
      if (hasElevator) {
        additionalCosts += PRICE_DATA.additionalCosts.elevator;
        priceDetails.floorsCost = PRICE_DATA.additionalCosts.elevator;
      } else if (floors > 0) {
        const floorCost = floors * PRICE_DATA.additionalCosts.floors;
        additionalCosts += floorCost;
        priceDetails.floorsCost = floorCost;
      }
      
      // Transportkosten für Entfernungen über 30km
      if (transportDistance > 30) {
        const extraDistance = transportDistance - 30;
        const transportCost = extraDistance * PRICE_DATA.additionalCosts.transportDistance;
        additionalCosts += transportCost;
        priceDetails.transportCost = transportCost;
      }
      
      // Entsorgungskosten basierend auf geschätztem Müllvolumen
      const disposalCost = wasteVolume * PRICE_DATA.additionalCosts.disposal.standard;
      additionalCosts += disposalCost;
      priceDetails.disposalCost = disposalCost;
      
      // Zusätzliche Kosten für Gefahrstoffe, Elektrogeräte usw. (nur bei Flächenmethode)
      if (calculationMethod === 'flaeche') {
        if (hasHazardousMaterials) {
          additionalCosts += PRICE_DATA.additionalCosts.hazardousMaterials;
          priceDetails.specialItemsCost += PRICE_DATA.additionalCosts.hazardousMaterials;
        }
        if (hasLargeAppliances) {
          additionalCosts += PRICE_DATA.additionalCosts.largeAppliances;
          priceDetails.specialItemsCost += PRICE_DATA.additionalCosts.largeAppliances;
        }
        if (hasElectronics) {
          additionalCosts += PRICE_DATA.additionalCosts.electronics;
          priceDetails.specialItemsCost += PRICE_DATA.additionalCosts.electronics;
        }
        if (hasHeavyFurniture) {
          additionalCosts += PRICE_DATA.additionalCosts.heavyFurniture;
          priceDetails.specialItemsCost += PRICE_DATA.additionalCosts.heavyFurniture;
        }
      }
      
      // Rabatte berechnen
      
      // Rabatt für wertvolle Gegenstände
      const valueDiscount = (baseCost + additionalCosts) * PRICE_DATA.discounts.valuables[valuablesLevel];
      discounts += valueDiscount;
      priceDetails.valueDiscount = valueDiscount;
      
      // Rabatt für Mithilfe
      if (selfHelp) {
        const selfHelpDiscount = (baseCost + additionalCosts) * PRICE_DATA.discounts.selfHelp;
        discounts += selfHelpDiscount;
        priceDetails.selfHelpDiscount = selfHelpDiscount;
      }
      
      // Regionalen Faktor auf die Gesamtkosten anwenden
      const totalBeforeRegion = (baseCost + additionalCosts - discounts);
      const totalCost = totalBeforeRegion * regionalFactor;
      
      // Geschätzte Zeit berechnen basierend auf Gesamtaufwand
      let hours = 0;
      if (calculationMethod === 'flaeche') {
        hours = objectSize * 0.1 * PRICE_DATA.fillLevelMultiplier[fillLevel];
        if (messiGrade !== 'nein') {
          hours *= PRICE_DATA.messiGradeMultiplier[messiGrade];
        }
      } else if (calculationMethod === 'raeume') {
        rooms.forEach(room => {
          hours += room.size * 0.1 * PRICE_DATA.fillLevelMultiplier[room.fillLevel];
        });
      } else {
        hours = items.reduce((sum, item) => sum + item.count * 0.5, 0);
      }
      
      // Zeitangabe formatieren
      const fullHours = Math.floor(hours);
      const minutes = Math.round((hours - fullHours) * 60);
      estimatedTime = `ca. ${fullHours} Std. ${minutes > 0 ? `${minutes} Min.` : ''}`;
      
      // Ergebnis aktualisieren
      setResult({
        totalCost: Math.round(totalCost),
        baseCost: Math.round(baseCost),
        additionalCosts: Math.round(additionalCosts),
        discounts: Math.round(discounts),
        estimatedTime,
        wasteVolume: Math.round(wasteVolume * 10) / 10, // Auf eine Nachkommastelle runden
        priceDetails
      });
    };
    
    calculateCosts();
  }, [
    calculationMethod, objectType, objectSize, fillLevel, messiGrade, 
    floors, hasElevator, transportDistance, bundesland, 
    hasHazardousMaterials, hasLargeAppliances, hasElectronics, hasHeavyFurniture,
    valuablesLevel, selfHelp, rooms, items
  ]);
  
  // Raum hinzufügen
  const addRoom = () => {
    setRooms([
      ...rooms, 
      { 
        name: `Raum ${rooms.length + 1}`, 
        size: 15, 
        fillLevel: 'mittel', 
        hasHazardousMaterials: false, 
        hasLargeAppliances: false, 
        hasElectronics: false, 
        hasHeavyFurniture: false 
      }
    ]);
  };
  
  // Raum entfernen
  const removeRoom = (index: number) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };
  
  // Raum aktualisieren
  const updateRoom = (index: number, field: keyof RoomData, value: any) => {
    const updatedRooms = [...rooms];
    updatedRooms[index] = {
      ...updatedRooms[index],
      [field]: value
    };
    setRooms(updatedRooms);
  };
  
  // Gegenstand hinzufügen
  const addItem = () => {
    setItems([
      ...items,
      { category: 'moebel', count: 1, hasSpecialDisposal: false }
    ]);
  };
  
  // Gegenstand entfernen
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  // Gegenstand aktualisieren
  const updateItem = (index: number, field: keyof ItemData, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    setItems(updatedItems);
  };

  // Zurücksetzen aller Eingaben
  const resetCalculator = () => {
    setCalculationMethod('flaeche');
    setObjectType('wohnung');
    setObjectSize(70);
    setFillLevel('mittel');
    setMessiGrade('nein');
    setFloors(0);
    setHasElevator(false);
    setTransportDistance(20);
    setBundesland('bayern');
    setHasHazardousMaterials(false);
    setHasLargeAppliances(false);
    setHasElectronics(true);
    setHasHeavyFurniture(true);
    setValuablesLevel('none');
    setSelfHelp(false);
    setRooms([
      { name: 'Wohnzimmer', size: 25, fillLevel: 'mittel', hasHazardousMaterials: false, hasLargeAppliances: false, hasElectronics: true, hasHeavyFurniture: true },
      { name: 'Schlafzimmer', size: 20, fillLevel: 'mittel', hasHazardousMaterials: false, hasLargeAppliances: false, hasElectronics: false, hasHeavyFurniture: true },
    ]);
    setItems([
      { category: 'moebel', count: 5, hasSpecialDisposal: false },
      { category: 'elektro', count: 3, hasSpecialDisposal: false },
    ]);
  };
  
  // Hilfsfunktion für Füllgrad-Text
  const getFillLevelText = (level: FillLevel) => {
    switch (level) {
      case 'gering': return 'Gering (wenige Gegenstände)';
      case 'mittel': return 'Mittel (normal möbliert)';
      case 'hoch': return 'Hoch (viele Gegenstände)';
      case 'sehr_hoch': return 'Sehr hoch (überfüllt)';
    }
  };
  
  // Hilfsfunktion für Messie-Grad-Text
  const getMessiGradeText = (grade: MessiGrade) => {
    switch (grade) {
      case 'nein': return 'Nein (normale Wohnsituation)';
      case 'leicht': return 'Leicht (unordentlich, viele Gegenstände)';
      case 'mittel': return 'Mittel (starke Unordnung, Anhäufungen)';
      case 'stark': return 'Stark (klassischer Messie-Fall)';
    }
  };
  
  // Hilfsfunktion für Kategorie-Text
  const getCategoryText = (category: ItemCategory) => {
    switch (category) {
      case 'moebel': return 'Möbel';
      case 'elektro': return 'Elektrogeräte';
      case 'hausrat': return 'Hausrat';
      case 'kleidung': return 'Kleidung';
      case 'spielzeug': return 'Spielzeug';
      case 'buecher': return 'Bücher';
      case 'werkzeug': return 'Werkzeug';
      case 'sonstiges': return 'Sonstiges';
    }
  };
  
  // Hilfsfunktion für Bundesland-Text
  const getBundeslandText = (bundesland: string) => {
    const names: {[key: string]: string} = {
      'bayern': 'Bayern',
      'berlin': 'Berlin',
      'brandenburg': 'Brandenburg',
      'bremen': 'Bremen',
      'hamburg': 'Hamburg',
      'hessen': 'Hessen',
      'mecklenburg_vorpommern': 'Mecklenburg-Vorpommern',
      'niedersachsen': 'Niedersachsen',
      'nordrhein_westfalen': 'Nordrhein-Westfalen',
      'rheinland_pfalz': 'Rheinland-Pfalz',
      'saarland': 'Saarland',
      'sachsen': 'Sachsen',
      'sachsen_anhalt': 'Sachsen-Anhalt',
      'schleswig_holstein': 'Schleswig-Holstein',
      'thueringen': 'Thüringen',
      'baden_wuerttemberg': 'Baden-Württemberg'
    };
    return names[bundesland] || bundesland;
  };
  
  return (
    <Card className="shadow-xl">
      <CardHeader className="border-b">
        <div className="flex items-center gap-2">
          <CalculatorIcon className="h-6 w-6 text-primary" />
          <CardTitle>Entrümpelungskosten-Rechner 2025</CardTitle>
        </div>
        <CardDescription>
          Berechnen Sie die voraussichtlichen Kosten für Ihre Entrümpelung mit diesem interaktiven Tool. Alle Preise basieren auf aktuellen Durchschnittswerten für Deutschland (Stand: März 2025).
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {/* Berechnungsmethode auswählen */}
        <div className="mb-8">
          <Label className="text-base font-medium mb-3 block">Wie möchten Sie die Kosten berechnen?</Label>
          <Tabs 
            defaultValue="flaeche" 
            value={calculationMethod}
            onValueChange={(value) => setCalculationMethod(value as 'flaeche' | 'raeume' | 'gegenstaende')}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="flaeche" className="flex items-center gap-1">
                <Home className="w-4 h-4" /> Nach Fläche
              </TabsTrigger>
              <TabsTrigger value="raeume" className="flex items-center gap-1">
                <Warehouse className="w-4 h-4" /> Nach Räumen
              </TabsTrigger>
              <TabsTrigger value="gegenstaende" className="flex items-center gap-1">
                <Package className="w-4 h-4" /> Nach Gegenständen
              </TabsTrigger>
            </TabsList>
            
            {/* Inhalt für "Nach Fläche" */}
            <TabsContent value="flaeche" className="pt-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="objectType">Art des Objekts</Label>
                    <Select 
                      value={objectType} 
                      onValueChange={(value) => setObjectType(value as 'wohnung' | 'haus' | 'keller' | 'dachboden' | 'garage')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie den Objekttyp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wohnung">Wohnung</SelectItem>
                        <SelectItem value="haus">Haus</SelectItem>
                        <SelectItem value="keller">Keller</SelectItem>
                        <SelectItem value="dachboden">Dachboden</SelectItem>
                        <SelectItem value="garage">Garage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="objectSize">Größe in m²</Label>
                      <span className="text-sm text-muted-foreground">{objectSize} m²</span>
                    </div>
                    <Slider
                      id="objectSize"
                      min={5}
                      max={300}
                      step={5}
                      value={[objectSize]}
                      onValueChange={(value) => setObjectSize(value[0])}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fillLevel">Füllgrad</Label>
                    <Select 
                      value={fillLevel} 
                      onValueChange={(value) => setFillLevel(value as FillLevel)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie den Füllgrad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gering">{getFillLevelText('gering')}</SelectItem>
                        <SelectItem value="mittel">{getFillLevelText('mittel')}</SelectItem>
                        <SelectItem value="hoch">{getFillLevelText('hoch')}</SelectItem>
                        <SelectItem value="sehr_hoch">{getFillLevelText('sehr_hoch')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="messiGrade">Messie-Grad</Label>
                    <Select 
                      value={messiGrade} 
                      onValueChange={(value) => setMessiGrade(value as MessiGrade)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie den Messie-Grad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nein">{getMessiGradeText('nein')}</SelectItem>
                        <SelectItem value="leicht">{getMessiGradeText('leicht')}</SelectItem>
                        <SelectItem value="mittel">{getMessiGradeText('mittel')}</SelectItem>
                        <SelectItem value="stark">{getMessiGradeText('stark')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-lg mb-2">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Info className="w-4 h-4 text-primary mr-2" />
                      Besonderheiten
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="hazardousMaterials" className="flex items-center cursor-pointer">
                          <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" />
                          <span>Gefahrstoffe vorhanden</span>
                        </Label>
                        <Switch
                          id="hazardousMaterials"
                          checked={hasHazardousMaterials}
                          onCheckedChange={setHasHazardousMaterials}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="largeAppliances" className="flex items-center cursor-pointer">
                          <Refrigerator className="w-4 h-4 text-slate-600 mr-2" />
                          <span>Großgeräte (Kühlschrank, Waschmaschine)</span>
                        </Label>
                        <Switch
                          id="largeAppliances"
                          checked={hasLargeAppliances}
                          onCheckedChange={setHasLargeAppliances}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="electronics" className="flex items-center cursor-pointer">
                          <Tv className="w-4 h-4 text-slate-600 mr-2" />
                          <span>Elektrogeräte/Elektroschrott</span>
                        </Label>
                        <Switch
                          id="electronics"
                          checked={hasElectronics}
                          onCheckedChange={setHasElectronics}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="heavyFurniture" className="flex items-center cursor-pointer">
                          <Sofa className="w-4 h-4 text-slate-600 mr-2" />
                          <span>Schwere Möbel (Schränke, Sofas)</span>
                        </Label>
                        <Switch
                          id="heavyFurniture"
                          checked={hasHeavyFurniture}
                          onCheckedChange={setHasHeavyFurniture}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Inhalt für "Nach Räumen" */}
            <TabsContent value="raeume" className="pt-4 space-y-6">
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-800">
                  Mit dieser Methode können Sie detaillierte Angaben für jeden Raum machen und erhalten ein präziseres Ergebnis.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                {rooms.map((room, index) => (
                  <Card key={index} className="border-slate-200">
                    <CardHeader className="py-3 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-primary" />
                        <Input 
                          value={room.name} 
                          onChange={(e) => updateRoom(index, 'name', e.target.value)}
                          className="h-8 w-40 font-medium"
                        />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeRoom(index)}
                        className="h-7 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="pb-4 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <Label htmlFor={`roomSize${index}`}>Größe in m²</Label>
                            <span className="text-sm text-muted-foreground">{room.size} m²</span>
                          </div>
                          <Slider
                            id={`roomSize${index}`}
                            min={5}
                            max={100}
                            step={1}
                            value={[room.size]}
                            onValueChange={(value) => updateRoom(index, 'size', value[0])}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`roomFillLevel${index}`}>Füllgrad</Label>
                          <Select 
                            value={room.fillLevel} 
                            onValueChange={(value) => updateRoom(index, 'fillLevel', value as FillLevel)}
                          >
                            <SelectTrigger id={`roomFillLevel${index}`}>
                              <SelectValue placeholder="Füllgrad wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="gering">{getFillLevelText('gering')}</SelectItem>
                              <SelectItem value="mittel">{getFillLevelText('mittel')}</SelectItem>
                              <SelectItem value="hoch">{getFillLevelText('hoch')}</SelectItem>
                              <SelectItem value="sehr_hoch">{getFillLevelText('sehr_hoch')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            id={`roomHazardous${index}`}
                            checked={room.hasHazardousMaterials}
                            onCheckedChange={(checked) => updateRoom(index, 'hasHazardousMaterials', checked)}
                            className="data-[state=checked]:bg-amber-500"
                          />
                          <Label htmlFor={`roomHazardous${index}`} className="text-sm cursor-pointer">
                            Gefahrstoffe
                          </Label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch
                            id={`roomLargeAppliances${index}`}
                            checked={room.hasLargeAppliances}
                            onCheckedChange={(checked) => updateRoom(index, 'hasLargeAppliances', checked)}
                          />
                          <Label htmlFor={`roomLargeAppliances${index}`} className="text-sm cursor-pointer">
                            Großgeräte
                          </Label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch
                            id={`roomElectronics${index}`}
                            checked={room.hasElectronics}
                            onCheckedChange={(checked) => updateRoom(index, 'hasElectronics', checked)}
                          />
                          <Label htmlFor={`roomElectronics${index}`} className="text-sm cursor-pointer">
                            Elektronik
                          </Label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch
                            id={`roomHeavyFurniture${index}`}
                            checked={room.hasHeavyFurniture}
                            onCheckedChange={(checked) => updateRoom(index, 'hasHeavyFurniture', checked)}
                          />
                          <Label htmlFor={`roomHeavyFurniture${index}`} className="text-sm cursor-pointer">
                            Schwere Möbel
                          </Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={addRoom}
                  className="w-full mt-2"
                >
                  Raum hinzufügen
                </Button>
              </div>
            </TabsContent>
            
            {/* Inhalt für "Nach Gegenständen" */}
            <TabsContent value="gegenstaende" className="pt-4 space-y-6">
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-800">
                  Diese Methode eignet sich besonders für kleinere Entrümpelungen oder wenn Sie genau wissen, welche Gegenstände entsorgt werden sollen.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                {items.map((item, index) => (
                  <Card key={index} className="border-slate-200">
                    <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-primary" />
                        <Select 
                          value={item.category} 
                          onValueChange={(value) => updateItem(index, 'category', value as ItemCategory)}
                        >
                          <SelectTrigger className="h-8 w-48">
                            <SelectValue placeholder="Kategorie wählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="moebel">Möbel</SelectItem>
                            <SelectItem value="elektro">Elektrogeräte</SelectItem>
                            <SelectItem value="hausrat">Hausrat</SelectItem>
                            <SelectItem value="kleidung">Kleidung</SelectItem>
                            <SelectItem value="spielzeug">Spielzeug</SelectItem>
                            <SelectItem value="buecher">Bücher</SelectItem>
                            <SelectItem value="werkzeug">Werkzeug</SelectItem>
                            <SelectItem value="sonstiges">Sonstiges</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeItem(index)}
                        className="h-7 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="pb-4 pt-0 px-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <Label htmlFor={`itemCount${index}`}>Anzahl</Label>
                            <span className="text-sm text-muted-foreground">{item.count} Stück</span>
                          </div>
                          <Slider
                            id={`itemCount${index}`}
                            min={1}
                            max={20}
                            step={1}
                            value={[item.count]}
                            onValueChange={(value) => updateItem(index, 'count', value[0])}
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch
                            id={`itemSpecialDisposal${index}`}
                            checked={item.hasSpecialDisposal}
                            onCheckedChange={(checked) => updateItem(index, 'hasSpecialDisposal', checked)}
                            className="data-[state=checked]:bg-amber-500"
                          />
                          <Label htmlFor={`itemSpecialDisposal${index}`} className="text-sm cursor-pointer">
                            Sonderentsorgung erforderlich
                          </Label>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-xs text-slate-500">
                        <p>Beispiele für {getCategoryText(item.category)}:</p>
                        <p className="mt-1">
                          {Object.entries(ITEM_WEIGHTS[item.category as keyof typeof ITEM_WEIGHTS]?.items || ITEM_WEIGHTS.sonstiges.items)
                            .slice(0, 4)
                            .map(([name]) => name)
                            .join(', ')}
                          {Object.keys(ITEM_WEIGHTS[item.category as keyof typeof ITEM_WEIGHTS]?.items || ITEM_WEIGHTS.sonstiges.items).length > 4 ? '...' : ''}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button 
                  variant="outline" 
                  onClick={addItem}
                  className="w-full mt-2"
                >
                  Gegenstand hinzufügen
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Allgemeine Faktoren für alle Berechnungsmethoden */}
        <div className="space-y-6 mt-8">
          <H3 className="text-lg font-semibold mb-2">Weitere Faktoren</H3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="bundesland">Bundesland</Label>
                <Select 
                  value={bundesland} 
                  onValueChange={setBundesland}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bundesland wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baden_wuerttemberg">Baden-Württemberg</SelectItem>
                    <SelectItem value="bayern">Bayern</SelectItem>
                    <SelectItem value="berlin">Berlin</SelectItem>
                    <SelectItem value="brandenburg">Brandenburg</SelectItem>
                    <SelectItem value="bremen">Bremen</SelectItem>
                    <SelectItem value="hamburg">Hamburg</SelectItem>
                    <SelectItem value="hessen">Hessen</SelectItem>
                    <SelectItem value="mecklenburg_vorpommern">Mecklenburg-Vorpommern</SelectItem>
                    <SelectItem value="niedersachsen">Niedersachsen</SelectItem>
                    <SelectItem value="nordrhein_westfalen">Nordrhein-Westfalen</SelectItem>
                    <SelectItem value="rheinland_pfalz">Rheinland-Pfalz</SelectItem>
                    <SelectItem value="saarland">Saarland</SelectItem>
                    <SelectItem value="sachsen">Sachsen</SelectItem>
                    <SelectItem value="sachsen_anhalt">Sachsen-Anhalt</SelectItem>
                    <SelectItem value="schleswig_holstein">Schleswig-Holstein</SelectItem>
                    <SelectItem value="thueringen">Thüringen</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Die Preise variieren je nach Bundesland aufgrund regionaler Kostenunterschiede.
                </p>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label htmlFor="transportDistance">Transportentfernung</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="max-w-xs text-xs">
                          Die Entfernung zur nächsten Entsorgungsanlage. Zusätzliche Kosten fallen in der Regel erst ab 30 km an.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-2">
                  <Slider
                    id="transportDistance"
                    min={5}
                    max={100}
                    step={5}
                    value={[transportDistance]}
                    onValueChange={(value) => setTransportDistance(value[0])}
                    className="flex-grow"
                  />
                  <span className="w-16 text-right">{transportDistance} km</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="floor">Stockwerk (ohne Aufzug)</Label>
                <div className="flex items-center gap-2">
                  <Slider
                    id="floor"
                    min={0}
                    max={8}
                    step={1}
                    value={[floors]}
                    onValueChange={(value) => setFloors(value[0])}
                    disabled={hasElevator}
                    className="flex-grow"
                  />
                  <span className="w-8 text-right">{floors}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <Label htmlFor="hasElevator" className="flex items-center cursor-pointer">
                  <div className="mr-2">🛗</div>
                  <span>Aufzug vorhanden</span>
                </Label>
                <Switch
                  id="hasElevator"
                  checked={hasElevator}
                  onCheckedChange={setHasElevator}
                />
              </div>
              
              <div>
                <Label htmlFor="valuablesLevel" className="mb-2 block">Wertgegenstände vorhanden?</Label>
                <Select 
                  value={valuablesLevel} 
                  onValueChange={(value) => setValuablesLevel(value as 'none' | 'low' | 'medium' | 'high')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wertgegenstände" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Keine Wertgegenstände</SelectItem>
                    <SelectItem value="low">Einzelne, geringer Wert</SelectItem>
                    <SelectItem value="medium">Mehrere, mittlerer Wert</SelectItem>
                    <SelectItem value="high">Viele, hoher Wert</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-500 mt-1">
                  Bei verwertbaren Gegenständen kann ein Rabatt gewährt werden.
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <Label htmlFor="selfHelp" className="flex items-center cursor-pointer">
                  <HardHat className="w-4 h-4 text-slate-600 mr-2" />
                  <span>Eigenleistung/Mithilfe möglich</span>
                </Label>
                <Switch
                  id="selfHelp"
                  checked={selfHelp}
                  onCheckedChange={setSelfHelp}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Ergebnisse */}
        <div className="mt-10">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Kostenübersicht
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold">Gesamtkosten:</span>
                      <span className="font-bold text-2xl text-primary">
                        {result.totalCost.toLocaleString('de-DE')} €
                      </span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between items-center">
                      <span>Grundkosten:</span>
                      <span className="font-medium">{result.baseCost.toLocaleString('de-DE')} €</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>+ Zusätzliche Kosten:</span>
                      <span className="font-medium">{result.additionalCosts.toLocaleString('de-DE')} €</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>- Rabatte/Anrechnungen:</span>
                      <span className="font-medium text-green-600">
                        {result.discounts > 0 ? '-' : ''}{result.discounts.toLocaleString('de-DE')} €
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span>× Regionaler Faktor ({getBundeslandText(bundesland)}):</span>
                      <span className="font-medium">{PRICE_DATA.regionalFactors[bundesland as keyof typeof PRICE_DATA.regionalFactors] || 1.0}</span>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm">Geschätzte Dauer:</span>
                      </div>
                      <div className="text-sm font-medium text-right">
                        {result.estimatedTime}
                      </div>
                      
                      <div className="flex items-center">
                        <Truck className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm">Transport:</span>
                      </div>
                      <div className="text-sm font-medium text-right">
                        {transportDistance} km
                      </div>
                      
                      <div className="flex items-center">
                        <Scale className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm">Geschätztes Abfallvolumen:</span>
                      </div>
                      <div className="text-sm font-medium text-right">
                        {result.wasteVolume} m³
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm text-primary mb-2 font-medium">Kostenaufstellung im Detail:</div>
                  
                  {result.priceDetails.basePrice > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Basispreis:</span>
                      <span>{Math.round(result.priceDetails.basePrice)} €</span>
                    </div>
                  )}
                  
                  {result.priceDetails.fillLevelCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Füllgrad-Zuschlag:</span>
                      <span>{Math.round(result.priceDetails.fillLevelCost)} €</span>
                    </div>
                  )}
                  
                  {result.priceDetails.messiCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Mehraufwand Messie-Situation:</span>
                      <span>{Math.round(result.priceDetails.messiCost)} €</span>
                    </div>
                  )}
                  
                  {result.priceDetails.floorsCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>{hasElevator ? 'Aufzug-Pauschale' : `Stockwerks-Zuschlag (${floors})`}:</span>
                      <span>{Math.round(result.priceDetails.floorsCost)} €</span>
                    </div>
                  )}
                  
                  {result.priceDetails.transportCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Transport-Zuschlag ({transportDistance - 30} km):</span>
                      <span>{Math.round(result.priceDetails.transportCost)} €</span>
                    </div>
                  )}
                  
                  {result.priceDetails.disposalCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Entsorgungskosten ({result.wasteVolume} m³):</span>
                      <span>{Math.round(result.priceDetails.disposalCost)} €</span>
                    </div>
                  )}
                  
                  {result.priceDetails.specialItemsCost > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Sondergegenstände (Gefahrstoffe, Elektro, etc.):</span>
                      <span>{Math.round(result.priceDetails.specialItemsCost)} €</span>
                    </div>
                  )}
                  
                  {result.priceDetails.valueDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Rabatt für Wertgegenstände:</span>
                      <span>-{Math.round(result.priceDetails.valueDiscount)} €</span>
                    </div>
                  )}
                  
                  {result.priceDetails.selfHelpDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Rabatt für Eigenleistung:</span>
                      <span>-{Math.round(result.priceDetails.selfHelpDiscount)} €</span>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <Alert className="bg-blue-50/50 border-blue-100">
                    <Leaf className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-sm text-slate-600">
                      Umweltfreundliche Entsorgung inklusive – wir achten auf fachgerechtes Recycling und Wiederverwertung.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Vergleichspreise für typische Objekte */}
          <div className="mt-8">
            <H3 className="text-lg font-semibold mb-4">Typische Preisbeispiele zum Vergleich</H3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(SAMPLE_PRICES).slice(0, 6).map(([key, data]) => (
                <div key={key} className="p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="font-medium">
                    {key.replace(/_/g, ' ').replace(/(\w)(\w*)/g, (_, first, rest) => first.toUpperCase() + rest)}
                  </div>
                  <div className="text-sm text-muted-foreground">{data.size} m²</div>
                  <div className="font-medium text-primary mt-1">{data.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-slate-50 p-4 rounded-b-lg border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-slate-600">
          <p>Die berechneten Preise basieren auf Durchschnittswerten (Stand: März 2025) und können je nach genauem Umfang und Aufwand variieren.</p>
        </div>
        <Button 
          onClick={resetCalculator} 
          variant="outline"
          className="shrink-0 flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          <span>Zurücksetzen</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EntruemplungsKostenRechner;
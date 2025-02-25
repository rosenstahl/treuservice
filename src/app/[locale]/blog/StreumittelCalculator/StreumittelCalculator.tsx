"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { 
  AlertTriangle, 
  Calculator,
  Snowflake, 
  Droplets, 
  Thermometer, 
  SquareSlash,
  Leaf,
  Euro,
  RefreshCcw
} from "lucide-react";
import { H3, Paragraph } from "@/components/ui/typography";

// Streumitteltypen definieren
type Streumittel = {
  name: string;
  preis: number;
  umweltauswirkung: number;
  tauwirkung: number;
  wirkungsbereich: number;
  dosierung: {
    leicht: number;
    mittel: number;
    stark: number;
  };
  mischungsverhältnis?: string;
};

type StreumittelKategorie = Record<string, Streumittel>;

// Aktuelle Streumittelpreise (Stand: Februar 2025)
// Basierend auf Recherche verschiedener kommerzieller Anbieter
const STREUMITTEL_PREISE: {
  salz: StreumittelKategorie;
  abstumpfend: StreumittelKategorie;
  mischungen: StreumittelKategorie;
} = {
  // Streusalz
  salz: {
    "natriumchlorid": {
      name: "Natriumchlorid (Standard)",
      preis: 0.45, // €/kg
      umweltauswirkung: 8, // 1-10, hoher Wert = schlechter für die Umwelt
      tauwirkung: 7, // 1-10, hoher Wert = bessere Tauwirkung
      wirkungsbereich: -12, // Wirksam bis ca. -12°C
      dosierung: { 
        leicht: 15, // g/m²
        mittel: 25, // g/m²
        stark: 40 // g/m²
      }
    },
    "calciumchlorid": {
      name: "Calciumchlorid (Premium)",
      preis: 0.95, // €/kg
      umweltauswirkung: 7,
      tauwirkung: 9,
      wirkungsbereich: -25, // Wirksam bis ca. -25°C
      dosierung: {
        leicht: 12, // g/m²
        mittel: 20, // g/m²
        stark: 35 // g/m²
      }
    },
    "magnesiumchlorid": {
      name: "Magnesiumchlorid",
      preis: 0.75, // €/kg
      umweltauswirkung: 7.5,
      tauwirkung: 8,
      wirkungsbereich: -15, // Wirksam bis ca. -15°C
      dosierung: {
        leicht: 14, // g/m²
        mittel: 22, // g/m²
        stark: 38 // g/m²
      }
    }
  },
  
  // Abstumpfende Mittel / Granulate
  abstumpfend: {
    "splitt": {
      name: "Splitt/Kies",
      preis: 0.25, // €/kg
      umweltauswirkung: 3,
      tauwirkung: 1, // Keine Tauwirkung, nur für Trittsicherheit
      wirkungsbereich: -100, // Funktioniert bei jeder Temperatur
      dosierung: {
        leicht: 100, // g/m²
        mittel: 150, // g/m²
        stark: 200 // g/m²
      }
    },
    "sand": {
      name: "Sand",
      preis: 0.15, // €/kg
      umweltauswirkung: 2,
      tauwirkung: 0, // Keine Tauwirkung, nur für Trittsicherheit
      wirkungsbereich: -100, // Funktioniert bei jeder Temperatur
      dosierung: {
        leicht: 120, // g/m²
        mittel: 180, // g/m²
        stark: 250 // g/m²
      }
    },
    "sägespäne": {
      name: "Sägespäne",
      preis: 0.12, // €/kg
      umweltauswirkung: 1,
      tauwirkung: 0,
      wirkungsbereich: -100, // Funktioniert bei jeder Temperatur
      dosierung: {
        leicht: 80, // g/m²
        mittel: 120, // g/m²
        stark: 160 // g/m²
      }
    }
  },
  
  // Mischungen (umweltfreundlicher)
  mischungen: {
    "salz_sand": {
      name: "Salz-Sand-Gemisch",
      preis: 0.30, // €/kg
      umweltauswirkung: 5,
      tauwirkung: 5,
      wirkungsbereich: -10, // Wirksam bis ca. -10°C
      dosierung: {
        leicht: 60, // g/m²
        mittel: 90, // g/m²
        stark: 120 // g/m²
      },
      mischungsverhältnis: "1:3 (Salz:Sand)"
    },
    "umweltfreundlich": {
      name: "Umweltschonendes Granulat",
      preis: 0.80, // €/kg
      umweltauswirkung: 2,
      tauwirkung: 4,
      wirkungsbereich: -7, // Wirksam bis ca. -7°C
      dosierung: {
        leicht: 40, // g/m²
        mittel: 70, // g/m²
        stark: 100 // g/m²
      }
    }
  }
};

// Flächenbedarf für typische Anwendungsfälle
const TYPISCHE_FLAECHEN: Record<string, { name: string; flaeche: number }> = {
  "einfamilienhaus": {
    name: "Einfamilienhaus (Gehweg & Einfahrt)",
    flaeche: 50 // m²
  },
  "mehrfamilienhaus_klein": {
    name: "Mehrfamilienhaus (klein)",
    flaeche: 150 // m²
  },
  "mehrfamilienhaus_gross": {
    name: "Mehrfamilienhaus (groß)",
    flaeche: 300 // m²
  },
  "gewerbe_klein": {
    name: "Kleine Gewerbefläche",
    flaeche: 500 // m²
  },
  "gewerbe_mittel": {
    name: "Mittlere Gewerbefläche",
    flaeche: 1000 // m²
  },
  "gewerbe_gross": {
    name: "Große Gewerbefläche",
    flaeche: 2500 // m²
  }
};

// Komponente: Verbesserter Streumittelrechner
export default function StreumittelRechnerBlog() {
  // Zustand für die Eingaben
  const [activeTab, setActiveTab] = useState("abstumpfend");
  const [selectedStreumittel, setSelectedStreumittel] = useState("");
  const [manuelleFlaeche, setManuelleFlaeche] = useState(50);
  const [selectedFlaechenTyp, setSelectedFlaechenTyp] = useState("einfamilienhaus");
  const [flaechenTyp, setFlaechenTyp] = useState<"preset" | "manuell">("preset");
  const [eisstaerke, setEisstaerke] = useState<"leicht" | "mittel" | "stark">("mittel");
  const [temperatur, setTemperatur] = useState(-3);
  
  // Zustand für die Ergebnisse
  const [ergebnisse, setErgebnisse] = useState({
    menge: 0,
    kosten: 0,
    umweltauswirkung: 0,
    wirksamkeit: 0,
    warnungen: [] as string[]
  });
  
  // Streumitteloptionen für den aktuellen Tab
  const getAktuelleStreumittelOptionen = (): StreumittelKategorie => {
    if (activeTab === "salz") {
      return STREUMITTEL_PREISE.salz;
    } else if (activeTab === "abstumpfend") {
      return STREUMITTEL_PREISE.abstumpfend;
    } else {
      return STREUMITTEL_PREISE.mischungen;
    }
  };
  
  // Setzen eines Standard-Streumittels beim Tab-Wechsel
  useEffect(() => {
    const optionen = getAktuelleStreumittelOptionen();
    // Wählt den ersten Schlüssel aus dem Objekt
    setSelectedStreumittel(Object.keys(optionen)[0]);
  }, [activeTab, getAktuelleStreumittelOptionen]);
  
  // Berechnung der Streumittel-Menge
  useEffect(() => {
    if (!selectedStreumittel) return;
    
    const berechneErgebnisse = () => {
      // Bestimme die Fläche
      const flaeche = flaechenTyp === "preset" 
        ? TYPISCHE_FLAECHEN[selectedFlaechenTyp as keyof typeof TYPISCHE_FLAECHEN].flaeche
        : manuelleFlaeche;
      
      // Bestimme das ausgewählte Streumittel
      const streumittelOptionen = getAktuelleStreumittelOptionen();
      const streumittel = streumittelOptionen[selectedStreumittel as keyof typeof streumittelOptionen];
      
      // Dosierung basierend auf Eis-Stärke
      const dosierung = streumittel.dosierung[eisstaerke]; // g/m²
      
      // Gesamtmenge berechnen (kg)
      const menge = (flaeche * dosierung) / 1000;
      
      // Kosten berechnen
      const kosten = menge * streumittel.preis;
      
      // Prüfen auf Warnhinweise
      const warnungen = [];
      
      // Warnung 1: Temperatur zu niedrig für Tausalz
      if (activeTab === "salz" && temperatur < streumittel.wirkungsbereich) {
        warnungen.push(`${streumittel.name} ist bei ${temperatur}°C nicht mehr effektiv (Wirkungsgrenze: ${streumittel.wirkungsbereich}°C). Bitte verwenden Sie Alternativen.`);
      }
      
      // Warnung 2: Umweltschutzgebiete
      if (activeTab === "salz" && streumittel.umweltauswirkung > 6) {
        warnungen.push("Vorsicht in Umweltschutzzonen! Die Verwendung dieses Tausalzes kann in bestimmten Gebieten (z.B. in der Nähe von Bäumen, Gewässern oder in Naturschutzgebieten) eingeschränkt oder verboten sein.");
      }
      
      // Setze die berechneten Ergebnisse
      setErgebnisse({
        menge: parseFloat(menge.toFixed(2)),
        kosten: parseFloat(kosten.toFixed(2)),
        umweltauswirkung: streumittel.umweltauswirkung,
        wirksamkeit: streumittel.tauwirkung,
        warnungen
      });
    };
    
    berechneErgebnisse();
  }, [
    activeTab, 
    selectedStreumittel, 
    flaechenTyp, 
    selectedFlaechenTyp, 
    manuelleFlaeche, 
    eisstaerke,
    temperatur,
    getAktuelleStreumittelOptionen
  ]);
  
  // Formatieren der Umweltauswirkung
  const getUmweltLabel = (wert: number) => {
    if (wert <= 3) return { label: "Gering", color: "text-green-600" };
    if (wert <= 6) return { label: "Mittel", color: "text-yellow-600" };
    return { label: "Hoch", color: "text-red-600" };
  };
  
  // Formatieren der Wirksamkeit
  const getWirksamkeitLabel = (wert: number) => {
    if (wert <= 2) return { label: "Nur abstumpfend", color: "text-blue-600" };
    if (wert <= 5) return { label: "Mäßig", color: "text-yellow-600" };
    return { label: "Stark", color: "text-green-600" };
  };
  
  return (
    <div className="max-w-4xl mx-auto my-8">
      <Card className="bg-white shadow-lg">
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-primary" />
            <CardTitle>Professioneller Streumittelrechner</CardTitle>
          </div>
          <CardDescription>
            Berechnen Sie den optimalen Streumittelbedarf für Ihre Flächen mit aktuellen Daten und professionellen Empfehlungen.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          {/* Streumittelauswahl */}
          <div className="space-y-4 mb-6">
            <H3 className="text-lg font-semibold flex items-center gap-2">
              <SquareSlash className="h-5 w-5 text-primary" />
              Streumitteltyp
            </H3>
            
            <Tabs defaultValue={activeTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="abstumpfend" onClick={() => setActiveTab("abstumpfend")}>Abstumpfende Mittel</TabsTrigger>
                <TabsTrigger value="salz" onClick={() => setActiveTab("salz")}>Tausalze</TabsTrigger>
                <TabsTrigger value="mischungen" onClick={() => setActiveTab("mischungen")}>Mischungen</TabsTrigger>
              </TabsList>
              
              <TabsContent value="abstumpfend" className="pt-4">
                <div className="space-y-2">
                  <Paragraph className="text-sm text-muted-foreground">
                    Abstumpfende Mittel wie Splitt, Sand oder Granulat sorgen für Trittsicherheit und sind umweltfreundlicher als Tausalze.
                  </Paragraph>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                    {Object.entries(STREUMITTEL_PREISE.abstumpfend).map(([key, mittel]) => (
                      <div 
                        key={key}
                        onClick={() => setSelectedStreumittel(key)}
                        className={`p-3 border rounded-md cursor-pointer transition-colors
                          ${selectedStreumittel === key ? 'border-primary bg-primary/5' : 'hover:bg-slate-50'}`}
                      >
                        <div className="font-medium">{mittel.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {mittel.preis.toFixed(2)}€/kg
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="salz" className="pt-4">
                <div className="space-y-2">
                  <Paragraph className="text-sm text-muted-foreground">
                    Tausalze schmelzen Eis und Schnee effektiv, sind aber umweltbelastender. Nur bei starker Glätte empfohlen.
                  </Paragraph>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                    {Object.entries(STREUMITTEL_PREISE.salz).map(([key, mittel]) => (
                      <div 
                        key={key}
                        onClick={() => setSelectedStreumittel(key)}
                        className={`p-3 border rounded-md cursor-pointer transition-colors
                          ${selectedStreumittel === key ? 'border-primary bg-primary/5' : 'hover:bg-slate-50'}`}
                      >
                        <div className="font-medium">{mittel.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {mittel.preis.toFixed(2)}€/kg • Bis {mittel.wirkungsbereich}°C
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="mischungen" className="pt-4">
                <div className="space-y-2">
                  <Paragraph className="text-sm text-muted-foreground">
                    Mischungen kombinieren Tauwirkung und Trittsicherheit bei geringerer Umweltbelastung.
                  </Paragraph>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                    {Object.entries(STREUMITTEL_PREISE.mischungen).map(([key, mittel]) => (
                      <div 
                        key={key}
                        onClick={() => setSelectedStreumittel(key)}
                        className={`p-3 border rounded-md cursor-pointer transition-colors
                          ${selectedStreumittel === key ? 'border-primary bg-primary/5' : 'hover:bg-slate-50'}`}
                      >
                        <div className="font-medium">{mittel.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {mittel.preis.toFixed(2)}€/kg • Bis {mittel.wirkungsbereich}°C
                        </div>
                        {'mischungsverhältnis' in mittel && mittel.mischungsverhältnis && (
                          <div className="text-xs text-primary mt-1">
                            {mittel.mischungsverhältnis}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <Separator className="my-6" />
          
          {/* Flächenauswahl */}
          <div className="space-y-4 mb-6">
            <H3 className="text-lg font-semibold flex items-center gap-2">
              <Snowflake className="h-5 w-5 text-primary" />
              Fläche & Bedingungen
            </H3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fläche */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="flaechentyp">Flächen-Typ</Label>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="preset" className="text-sm cursor-pointer">Voreinstellung</Label>
                    <input
                      type="radio"
                      id="preset"
                      name="flaechentyp"
                      checked={flaechenTyp === "preset"}
                      onChange={() => setFlaechenTyp("preset")}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="manuell" className="text-sm cursor-pointer">Manuell</Label>
                    <input
                      type="radio"
                      id="manuell"
                      name="flaechentyp"
                      checked={flaechenTyp === "manuell"}
                      onChange={() => setFlaechenTyp("manuell")}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                
                {flaechenTyp === "preset" ? (
                  <div className="space-y-2">
                    <select
                      value={selectedFlaechenTyp}
                      onChange={(e) => setSelectedFlaechenTyp(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {Object.entries(TYPISCHE_FLAECHEN).map(([key, flaeche]) => (
                        <option key={key} value={key}>
                          {flaeche.name} ({flaeche.flaeche} m²)
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Input
                        id="manuelle-flaeche"
                        type="number"
                        min="1"
                        value={manuelleFlaeche}
                        onChange={(e) => setManuelleFlaeche(parseInt(e.target.value) || 1)}
                        className="w-full"
                      />
                      <span className="ml-2">m²</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Eisbedingungen */}
              <div className="space-y-4">
                <div>
                  <Label>Temperatur</Label>
                  <div className="flex items-center mt-2">
                    <Thermometer className="w-5 h-5 text-blue-500 mr-2" />
                    <Slider
                      value={[temperatur]}
                      min={-20}
                      max={5}
                      step={1}
                      onValueChange={(value: number[]) => setTemperatur(value[0])}
                      className="flex-1"
                    />
                    <span className="ml-4 w-16 text-center font-medium">{temperatur}°C</span>
                  </div>
                </div>
                
                <div>
                  <Label>Eisstärke/Glättegrad</Label>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <Button
                      variant={eisstaerke === "leicht" ? "default" : "outline"}
                      className={eisstaerke === "leicht" ? "" : "border-dashed"}
                      onClick={() => setEisstaerke("leicht")}
                    >
                      Leichte Glätte
                    </Button>
                    <Button
                      variant={eisstaerke === "mittel" ? "default" : "outline"}
                      className={eisstaerke === "mittel" ? "" : "border-dashed"}
                      onClick={() => setEisstaerke("mittel")}
                    >
                      Mittlere Glätte
                    </Button>
                    <Button
                      variant={eisstaerke === "stark" ? "default" : "outline"}
                      className={eisstaerke === "stark" ? "" : "border-dashed"}
                      onClick={() => setEisstaerke("stark")}
                    >
                      Starke Glätte
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Warnhinweise */}
          {ergebnisse.warnungen.length > 0 && (
            <div className="mb-6">
              {ergebnisse.warnungen.map((warnung, index) => (
                <div key={index} className="bg-yellow-100 border border-yellow-200 p-3 rounded-md flex items-start mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-yellow-800">{warnung}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Ergebnisse */}
          <div className="bg-slate-50 p-5 rounded-lg">
            <H3 className="text-lg font-semibold mb-4">Berechnete Ergebnisse</H3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-4">
                  {/* Menge */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">Benötigte Menge:</div>
                    <div className="font-semibold text-xl">{ergebnisse.menge} kg</div>
                  </div>
                  
                  {/* Kosten */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600 flex items-center">
                      <Euro className="h-4 w-4 mr-1" /> Kosten:
                    </div>
                    <div className="font-semibold text-xl">{ergebnisse.kosten.toFixed(2)} €</div>
                  </div>
                  
                  {/* Fläche */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">Fläche:</div>
                    <div className="font-medium">
                      {flaechenTyp === "preset" 
                        ? TYPISCHE_FLAECHEN[selectedFlaechenTyp as keyof typeof TYPISCHE_FLAECHEN].flaeche 
                        : manuelleFlaeche} m²
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="space-y-4">
                  {/* Umweltauswirkung */}
                  <div>
                    <div className="text-sm text-slate-600 flex items-center mb-1">
                      <Leaf className="h-4 w-4 mr-1" /> Umweltauswirkung:
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            ergebnisse.umweltauswirkung <= 3 ? 'bg-green-500' : 
                            ergebnisse.umweltauswirkung <= 6 ? 'bg-yellow-500' : 
                            'bg-red-500'
                          }`}
                          style={{ width: `${ergebnisse.umweltauswirkung * 10}%` }}
                        ></div>
                      </div>
                      <span className={`ml-3 font-medium ${getUmweltLabel(ergebnisse.umweltauswirkung).color}`}>
                        {getUmweltLabel(ergebnisse.umweltauswirkung).label}
                      </span>
                    </div>
                  </div>
                  
                  {/* Wirksamkeit */}
                  <div>
                    <div className="text-sm text-slate-600 flex items-center mb-1">
                      <Droplets className="h-4 w-4 mr-1" /> Tauwirkung:
                    </div>
                    <div className="flex items-center">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            ergebnisse.wirksamkeit <= 2 ? 'bg-blue-500' : 
                            ergebnisse.wirksamkeit <= 5 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${ergebnisse.wirksamkeit * 10}%` }}
                        ></div>
                      </div>
                      <span className={`ml-3 font-medium ${getWirksamkeitLabel(ergebnisse.wirksamkeit).color}`}>
                        {getWirksamkeitLabel(ergebnisse.wirksamkeit).label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-slate-50 p-4 rounded-b-lg border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-slate-600">
            <p>Alle Preise und Daten wurden im Februar 2025 aktualisiert. Die empfohlenen Dosierungen basieren auf professionellen Winterdienstanforderungen.</p>
          </div>
          <Button onClick={() => window.print()} className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            <span>Neu berechnen</span>
          </Button>
        </CardFooter>
      </Card>
      
      {/* Zusätzliche Informationen */}
      <div className="mt-6 space-y-6">
        <div>
          <H3 className="text-xl font-semibold mb-3">Tipps für effektiven Winterdienst</H3>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li>Streuen Sie vorzugsweise präventiv vor erwartetem Schneefall oder Frost.</li>
            <li>Entfernen Sie zunächst den Schnee mechanisch (Schieben), bevor Sie Streumittel auftragen.</li>
            <li>Achten Sie auf lokale Verordnungen - in vielen Kommunen ist die Verwendung von Streusalz eingeschränkt oder verboten.</li>
            <li>In umweltsensiblen Bereichen (nahe Bäumen, Gewässern) sollten Sie auf abstumpfende Mittel zurückgreifen.</li>
            <li>Bei Temperaturen unter -10°C verliert Standardstreusalz stark an Wirksamkeit.</li>
          </ul>
        </div>
        
        <div>
          <H3 className="text-xl font-semibold mb-3">Umweltfreundlicher Winterdienst</H3>
          <Paragraph className="text-slate-700">
            Streusalz belastet Böden, Grundwasser und Pflanzen. Wann immer möglich, nutzen Sie umweltfreundliche Alternativen wie Splitt, Sand oder spezielle umweltverträgliche Granulate. Diese bieten zwar keine Tauwirkung, sorgen aber für ausreichende Trittsicherheit. Ein verantwortungsvoller Umgang mit Streumitteln schont die Umwelt und erfüllt dennoch die gesetzliche Verkehrssicherungspflicht.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
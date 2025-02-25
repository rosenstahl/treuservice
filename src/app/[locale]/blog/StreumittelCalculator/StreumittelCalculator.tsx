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
  RefreshCcw,
  CloudSnow,
  BadgeInfo
} from "lucide-react";
import { H3, Paragraph } from "@/components/ui/typography";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  info?: string;
  nachhaltig?: boolean;
};

type StreumittelKategorie = Record<string, Streumittel>;

// Aktuelle Streumittelpreise (Stand: Februar 2025)
// Basierend auf Recherche verschiedener kommerzieller Anbieter
const STREUMITTEL_PREISE: {
  salz: StreumittelKategorie;
  abstumpfend: StreumittelKategorie;
  mischungen: StreumittelKategorie;
  nachhaltig: StreumittelKategorie;
} = {
  // Streusalz
  salz: {
    "natriumchlorid": {
      name: "Natriumchlorid (Standard)",
      preis: 0.48, // €/kg (2025 aktualisiert)
      umweltauswirkung: 8, // 1-10, hoher Wert = schlechter für die Umwelt
      tauwirkung: 7, // 1-10, hoher Wert = bessere Tauwirkung
      wirkungsbereich: -12, // Wirksam bis ca. -12°C
      dosierung: { 
        leicht: 15, // g/m²
        mittel: 25, // g/m²
        stark: 40 // g/m²
      },
      info: "In vielen Kommunen verboten oder stark eingeschränkt."
    },
    "calciumchlorid": {
      name: "Calciumchlorid (Premium)",
      preis: 0.98, // €/kg (2025 aktualisiert)
      umweltauswirkung: 7,
      tauwirkung: 9,
      wirkungsbereich: -25, // Wirksam bis ca. -25°C
      dosierung: {
        leicht: 12, // g/m²
        mittel: 20, // g/m²
        stark: 35 // g/m²
      },
      info: "Effektiv bei sehr niedrigen Temperaturen, aber umweltbelastend."
    },
    "magnesiumchlorid": {
      name: "Magnesiumchlorid",
      preis: 0.85, // €/kg (2025 aktualisiert)
      umweltauswirkung: 7.5,
      tauwirkung: 8,
      wirkungsbereich: -15, // Wirksam bis ca. -15°C
      dosierung: {
        leicht: 14, // g/m²
        mittel: 22, // g/m²
        stark: 38 // g/m²
      },
      info: "Mittlere Wirksamkeit, schont Beton besser als Natriumchlorid."
    }
  },
  
  // Abstumpfende Mittel / Granulate
  abstumpfend: {
    "splitt": {
      name: "Splitt/Kies",
      preis: 0.28, // €/kg (2025 aktualisiert)
      umweltauswirkung: 3,
      tauwirkung: 1, // Keine Tauwirkung, nur für Trittsicherheit
      wirkungsbereich: -100, // Funktioniert bei jeder Temperatur
      dosierung: {
        leicht: 100, // g/m²
        mittel: 150, // g/m²
        stark: 200 // g/m²
      },
      info: "Muss nach dem Winter aufgekehrt werden. Kann Schäden an Bodenbelägen verursachen."
    },
    "sand": {
      name: "Sand",
      preis: 0.18, // €/kg (2025 aktualisiert)
      umweltauswirkung: 2,
      tauwirkung: 0, // Keine Tauwirkung, nur für Trittsicherheit
      wirkungsbereich: -100, // Funktioniert bei jeder Temperatur
      dosierung: {
        leicht: 120, // g/m²
        mittel: 180, // g/m²
        stark: 250 // g/m²
      },
      info: "Kostengünstig und umweltfreundlich, aber höherer Verbrauch."
    },
    "sägespäne": {
      name: "Sägespäne",
      preis: 0.14, // €/kg (2025 aktualisiert)
      umweltauswirkung: 1,
      tauwirkung: 0,
      wirkungsbereich: -100, // Funktioniert bei jeder Temperatur
      dosierung: {
        leicht: 80, // g/m²
        mittel: 120, // g/m²
        stark: 160 // g/m²
      },
      info: "Vollständig biologisch abbaubar, aber begrenzte Wirkungsdauer."
    }
  },
  
  // Mischungen (umweltfreundlicher)
  mischungen: {
    "salz_sand": {
      name: "Salz-Sand-Gemisch",
      preis: 0.33, // €/kg (2025 aktualisiert)
      umweltauswirkung: 5,
      tauwirkung: 5,
      wirkungsbereich: -10, // Wirksam bis ca. -10°C
      dosierung: {
        leicht: 60, // g/m²
        mittel: 90, // g/m²
        stark: 120 // g/m²
      },
      mischungsverhältnis: "1:3 (Salz:Sand)",
      info: "Kompromisslösung zwischen Tauwirkung und Umweltbelastung."
    },
    "umweltfreundlich": {
      name: "Umweltschonendes Granulat",
      preis: 0.95, // €/kg (2025 aktualisiert)
      umweltauswirkung: 2,
      tauwirkung: 4,
      wirkungsbereich: -7, // Wirksam bis ca. -7°C
      dosierung: {
        leicht: 40, // g/m²
        mittel: 70, // g/m²
        stark: 100 // g/m²
      },
      info: "Oft auf Calcium-Magnesium-Acetat-Basis, weniger schädlich für Pflanzen.",
      nachhaltig: true
    }
  },
  
  // Neue Kategorie: Nachhaltige Alternativen
  nachhaltig: {
    "lavagranulat": {
      name: "Lavagranulat",
      preis: 1.25, // €/kg
      umweltauswirkung: 1,
      tauwirkung: 1,
      wirkungsbereich: -100,
      dosierung: {
        leicht: 70, // g/m²
        mittel: 120, // g/m²
        stark: 180 // g/m²
      },
      info: "Natürliches Vulkangestein, nimmt Schmelzwasser auf, wiederverwendbar.",
      nachhaltig: true
    },
    "formiat": {
      name: "Formiat-Lösung",
      preis: 2.35, // €/kg
      umweltauswirkung: 1,
      tauwirkung: 7,
      wirkungsbereich: -20,
      dosierung: {
        leicht: 20, // g/m²
        mittel: 35, // g/m²
        stark: 50 // g/m²
      },
      info: "Biologisch abbaubar, chloridfrei, keine Rückstände, sehr umweltfreundlich.",
      nachhaltig: true
    },
    "holzspäne_salz": {
      name: "Holzspäne mit Salzlösung",
      preis: 0.75, // €/kg
      umweltauswirkung: 3,
      tauwirkung: 4,
      wirkungsbereich: -10,
      dosierung: {
        leicht: 50, // g/m²
        mittel: 90, // g/m²
        stark: 130 // g/m²
      },
      info: "Kombiniert abstumpfende Wirkung mit leichter Tauwirkung, biologisch abbaubar.",
      nachhaltig: true
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
  const [nurNachhaltig, setNurNachhaltig] = useState(false);
  
  // Zustand für die Ergebnisse
  const [ergebnisse, setErgebnisse] = useState({
    menge: 0,
    kosten: 0,
    umweltauswirkung: 0,
    wirksamkeit: 0,
    warnungen: [] as string[],
    hinweise: [] as string[]
  });
  
  // Streumitteloptionen für den aktuellen Tab
  const getAktuelleStreumittelOptionen = (): StreumittelKategorie => {
    let optionen: StreumittelKategorie = {};
    
    if (activeTab === "salz") {
      optionen = STREUMITTEL_PREISE.salz;
    } else if (activeTab === "abstumpfend") {
      optionen = STREUMITTEL_PREISE.abstumpfend;
    } else if (activeTab === "mischungen") {
      optionen = STREUMITTEL_PREISE.mischungen;
    } else if (activeTab === "nachhaltig") {
      optionen = STREUMITTEL_PREISE.nachhaltig;
    }
    
    // Filter für nachhaltige Optionen
    if (nurNachhaltig && activeTab !== "nachhaltig") {
      const gefiltert: StreumittelKategorie = {};
      Object.entries(optionen).forEach(([key, mittel]) => {
        if (mittel.nachhaltig) {
          gefiltert[key] = mittel;
        }
      });
      return gefiltert;
    }
    
    return optionen;
  };
  
  // Setzen eines Standard-Streumittels beim Tab-Wechsel
  useEffect(() => {
    const optionen = getAktuelleStreumittelOptionen();
    const keys = Object.keys(optionen);
    
    if (keys.length > 0) {
      // Wählt den ersten Schlüssel aus dem Objekt
      setSelectedStreumittel(keys[0]);
    } else if (nurNachhaltig) {
      // Wenn keine nachhaltigen Optionen in diesem Tab, wechsle zu "nachhaltig" Tab
      setActiveTab("nachhaltig");
    }
  }, [activeTab, nurNachhaltig]);
  
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
      
      if (!streumittel) return; // Falls kein Streumittel ausgewählt
      
      // Dosierung basierend auf Eis-Stärke
      const dosierung = streumittel.dosierung[eisstaerke]; // g/m²
      
      // Gesamtmenge berechnen (kg)
      const menge = (flaeche * dosierung) / 1000;
      
      // Kosten berechnen
      const kosten = menge * streumittel.preis;
      
      // Prüfen auf Warnhinweise
      const warnungen = [];
      const hinweise = [];
      
      // Warnung 1: Temperatur zu niedrig für Tausalz
      if ((activeTab === "salz" || activeTab === "mischungen") && temperatur < streumittel.wirkungsbereich) {
        warnungen.push(`${streumittel.name} ist bei ${temperatur}°C nicht mehr effektiv (Wirkungsgrenze: ${streumittel.wirkungsbereich}°C). Bitte verwenden Sie Alternativen.`);
      }
      
      // Warnung 2: Umweltschutzgebiete
      if (activeTab === "salz" && streumittel.umweltauswirkung > 6) {
        warnungen.push("Vorsicht in Umweltschutzzonen! Die Verwendung dieses Tausalzes kann in bestimmten Gebieten (z.B. in der Nähe von Bäumen, Gewässern oder in Naturschutzgebieten) eingeschränkt oder verboten sein.");
      }
      
      // Warnung 3: Gesetzliche Regelungen
      if (activeTab === "salz") {
        warnungen.push("In vielen deutschen Kommunen ist die private Verwendung von Streusalz verboten oder stark eingeschränkt. Bitte informieren Sie sich über lokale Vorschriften.");
      }
      
      // Hinweis hinzufügen, wenn vorhanden
      if (streumittel.info) {
        hinweise.push(streumittel.info);
      }
      
      // Setze die berechneten Ergebnisse
      setErgebnisse({
        menge: parseFloat(menge.toFixed(2)),
        kosten: parseFloat(kosten.toFixed(2)),
        umweltauswirkung: streumittel.umweltauswirkung,
        wirksamkeit: streumittel.tauwirkung,
        warnungen,
        hinweise
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
    temperatur
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
  
  // Prüfen, ob es nachhaltige Optionen in aktueller Kategorie gibt
  const hatNachhaltigeOptionen = () => {
    if (activeTab === "nachhaltig") return true;
    
    const optionen = activeTab === "salz" 
      ? STREUMITTEL_PREISE.salz 
      : activeTab === "abstumpfend" 
        ? STREUMITTEL_PREISE.abstumpfend 
        : STREUMITTEL_PREISE.mischungen;
    
    return Object.values(optionen).some(mittel => mittel.nachhaltig);
  };
  
  return (
    <div className="mx-auto">
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
            <div className="flex justify-between items-center">
              <H3 className="text-lg font-semibold flex items-center gap-2">
                <SquareSlash className="h-5 w-5 text-primary" />
                Streumitteltyp
              </H3>
              
              {/* Nachhaltigkeits-Schalter */}
              <div className="flex items-center gap-2">
                <label className="text-sm flex items-center gap-1 cursor-pointer">
                  <Leaf className="h-4 w-4 text-green-600" />
                  <span className="text-green-700">Nur nachhaltige Optionen</span>
                  <input
                    type="checkbox"
                    checked={nurNachhaltig}
                    onChange={(e) => setNurNachhaltig(e.target.checked)}
                    className="ml-1 cursor-pointer"
                  />
                </label>
              </div>
            </div>
            
            <Tabs defaultValue={activeTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger 
                  value="abstumpfend" 
                  onClick={() => setActiveTab("abstumpfend")}
                  disabled={nurNachhaltig && !hatNachhaltigeOptionen()}
                >
                  Abstumpfend
                </TabsTrigger>
                <TabsTrigger 
                  value="salz" 
                  onClick={() => setActiveTab("salz")}
                  disabled={nurNachhaltig && !hatNachhaltigeOptionen()}
                >
                  Tausalze
                </TabsTrigger>
                <TabsTrigger 
                  value="mischungen" 
                  onClick={() => setActiveTab("mischungen")}
                  disabled={nurNachhaltig && !hatNachhaltigeOptionen()}
                >
                  Mischungen
                </TabsTrigger>
                <TabsTrigger 
                  value="nachhaltig" 
                  onClick={() => setActiveTab("nachhaltig")}
                >
                  Nachhaltig
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="abstumpfend" className="pt-4">
                <div className="space-y-2">
                  <Paragraph className="text-sm text-muted-foreground">
                    Abstumpfende Mittel wie Splitt, Sand oder Granulat sorgen für Trittsicherheit und sind umweltfreundlicher als Tausalze.
                  </Paragraph>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                    {Object.entries(nurNachhaltig 
                      ? Object.fromEntries(Object.entries(STREUMITTEL_PREISE.abstumpfend).filter(([_, mittel]) => mittel.nachhaltig))
                      : STREUMITTEL_PREISE.abstumpfend
                    ).map(([key, mittel]) => (
                      <div 
                        key={key}
                        onClick={() => setSelectedStreumittel(key)}
                        className={`p-3 border rounded-md cursor-pointer transition-colors relative
                          ${selectedStreumittel === key ? 'border-primary bg-primary/5' : 'hover:bg-slate-50'}`}
                      >
                        <div className="font-medium">{mittel.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {mittel.preis.toFixed(2)}€/kg
                        </div>
                        {mittel.nachhaltig && (
                          <span className="absolute top-2 right-2 text-green-600">
                            <Leaf className="h-4 w-4" />
                          </span>
                        )}
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
                    {Object.entries(nurNachhaltig 
                      ? Object.fromEntries(Object.entries(STREUMITTEL_PREISE.salz).filter(([_, mittel]) => mittel.nachhaltig))
                      : STREUMITTEL_PREISE.salz
                    ).map(([key, mittel]) => (
                      <div 
                        key={key}
                        onClick={() => setSelectedStreumittel(key)}
                        className={`p-3 border rounded-md cursor-pointer transition-colors relative
                          ${selectedStreumittel === key ? 'border-primary bg-primary/5' : 'hover:bg-slate-50'}`}
                      >
                        <div className="font-medium">{mittel.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {mittel.preis.toFixed(2)}€/kg • Bis {mittel.wirkungsbereich}°C
                        </div>
                        {mittel.nachhaltig && (
                          <span className="absolute top-2 right-2 text-green-600">
                            <Leaf className="h-4 w-4" />
                          </span>
                        )}
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
                    {Object.entries(nurNachhaltig 
                      ? Object.fromEntries(Object.entries(STREUMITTEL_PREISE.mischungen).filter(([_, mittel]) => mittel.nachhaltig))
                      : STREUMITTEL_PREISE.mischungen
                    ).map(([key, mittel]) => (
                      <div 
                        key={key}
                        onClick={() => setSelectedStreumittel(key)}
                        className={`p-3 border rounded-md cursor-pointer transition-colors relative
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
                        {mittel.nachhaltig && (
                          <span className="absolute top-2 right-2 text-green-600">
                            <Leaf className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="nachhaltig" className="pt-4">
                <div className="space-y-2">
                  <Paragraph className="text-sm text-muted-foreground">
                    Nachhaltige Streumittel bieten eine umweltfreundliche Alternative mit minimalen Auswirkungen auf Boden, Pflanzen und Infrastruktur.
                  </Paragraph>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                    {Object.entries(STREUMITTEL_PREISE.nachhaltig).map(([key, mittel]) => (
                      <div 
                        key={key}
                        onClick={() => setSelectedStreumittel(key)}
                        className={`p-3 border rounded-md cursor-pointer transition-colors relative
                          ${selectedStreumittel === key ? 'border-primary bg-primary/5' : 'hover:bg-slate-50'}`}
                      >
                        <div className="font-medium">{mittel.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {mittel.preis.toFixed(2)}€/kg • {mittel.tauwirkung > 2 ? `Bis ${mittel.wirkungsbereich}°C` : 'Nur abstumpfend'}
                        </div>
                        <span className="absolute top-2 right-2 text-green-600">
                          <Leaf className="h-4 w-4" />
                        </span>
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
          
          {/* Hinweise */}
          {ergebnisse.hinweise.length > 0 && (
            <div className="mb-4">
              {ergebnisse.hinweise.map((hinweis, index) => (
                <div key={index} className="bg-blue-50 border border-blue-200 p-3 rounded-md flex items-start mb-2">
                  <BadgeInfo className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-blue-800">{hinweis}</span>
                </div>
              ))}
            </div>
          )}
          
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
                  
                  {/* Temperatureignung */}
                  <div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center text-sm text-slate-600 cursor-help">
                            <CloudSnow className="h-4 w-4 mr-1" /> Temperatureinsatzbereich
                            <BadgeInfo className="h-3 w-3 ml-1 text-slate-400" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="text-xs max-w-xs">
                            Zeigt den Temperaturbereich an, in dem das Streumittel effektiv wirkt. Abstumpfende Mittel wirken bei allen Temperaturen.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <div className="mt-1 font-medium">
                      {getAktuelleStreumittelOptionen()[selectedStreumittel]?.wirkungsbereich === -100 
                        ? "Wirksam bei allen Temperaturen" 
                        : `Wirksam bis ${getAktuelleStreumittelOptionen()[selectedStreumittel]?.wirkungsbereich}°C`
                      }
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
          <Button onClick={() => window.location.reload()} className="flex items-center gap-2">
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
            <li>Für Gehwege und Zufahrten sind oft abstumpfende Mittel völlig ausreichend.</li>
          </ul>
        </div>
        
        <div>
          <H3 className="text-xl font-semibold mb-3">Umweltfreundlicher Winterdienst</H3>
          <Paragraph className="text-slate-700">
            Streusalz belastet Böden, Grundwasser und Pflanzen. Wann immer möglich, nutzen Sie umweltfreundliche Alternativen wie Splitt, Sand, Lavagranulat oder spezielle umweltverträgliche Granulate. Diese bieten zwar keine oder nur geringe Tauwirkung, sorgen aber für ausreichende Trittsicherheit. Ein verantwortungsvoller Umgang mit Streumitteln schont die Umwelt und erfüllt dennoch die gesetzliche Verkehrssicherungspflicht.
          </Paragraph>
        </div>
        
        <div>
          <H3 className="text-xl font-semibold mb-3">Gesetzliche Situation in Deutschland</H3>
          <Paragraph className="text-slate-700">
            Die Verwendung von Streusalz im privaten Bereich ist in vielen deutschen Kommunen verboten oder stark eingeschränkt. Erlaubt sind oft nur abstumpfende Mittel wie Sand, Splitt oder umweltfreundliche Alternativen. Ausnahmen gelten meist nur bei extremer Glätte wie Eisregen. Bei Nichteinhaltung drohen Bußgelder bis zu 10.000 Euro. Informieren Sie sich vor dem Einsatz von Streumitteln über die lokalen Vorschriften Ihrer Gemeinde.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H3 } from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Thermometer, Droplets, AlertTriangle } from "lucide-react";
import { calculateIceRisk } from './brightsky';

interface StreumittelCalculatorProps {
  temperature?: number | null;
  humidity?: number;
  precipitation?: number;
  precipitationProbability?: number;
  defaultArea?: number;
}

export const StreumittelCalculator = ({ 
  temperature = 0, 
  humidity = 50, 
  precipitation = 0,
  precipitationProbability = 0,
  defaultArea = 100
}: StreumittelCalculatorProps) => {
  // Zustand für die Berechnungen
  const [area, setArea] = useState(defaultArea);
  const [streumittelType, setStreumittelType] = useState<'salt' | 'grit' | 'mix'>('grit');
  const [manualInputs, setManualInputs] = useState({
    temperature: temperature ?? 0,
    humidity: humidity ?? 50,
    precipitation: precipitation ?? 0
  });
  const [results, setResults] = useState({
    amount: 0,
    cost: 0,
    environmentalImpact: 0,
    iceRisk: { risk: 'low' as 'low' | 'medium' | 'high', description: '' }
  });
  const [useCurrentWeather, setUseCurrentWeather] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("current");

  // Funktion zur Berechnung der Ergebnisse
  const calculateResults = () => {
    // Entweder aktuelle Wetterdaten oder manuelle Eingaben verwenden
    const tempToUse = useCurrentWeather ? (temperature ?? 0) : manualInputs.temperature;
    const humidityToUse = useCurrentWeather ? (humidity ?? 50) : manualInputs.humidity;
    const precipToUse = useCurrentWeather ? (precipitation ?? 0) : manualInputs.precipitation;
    
    // Glätterisiko berechnen
    const iceRisk = calculateIceRisk(tempToUse, precipToUse, humidityToUse);
    
    // Dosierung pro m² basierend auf Risiko und Streumitteltyp
    const dosageMap = {
      salt: {
        low: 15,     // g/m²
        medium: 25,   // g/m²
        high: 40      // g/m²
      },
      grit: {
        low: 40,     // g/m²
        medium: 80,   // g/m²
        high: 120     // g/m²
      },
      mix: {
        low: 30,     // g/m²
        medium: 50,   // g/m²
        high: 80      // g/m²
      }
    };
    
    // Basiskosten pro kg
    const costMap = {
      salt: 0.50,    // €/kg
      grit: 0.30,    // €/kg
      mix: 0.40      // €/kg
    };
    
    // Umweltauswirkung (1-10 Skala, 10 ist am schädlichsten)
    const environmentalImpactMap = {
      salt: 8,
      grit: 3,
      mix: 6
    };
    
    // Berechnung der Menge in kg
    const dosage = dosageMap[streumittelType][iceRisk.risk];
    const amount = (area * dosage) / 1000; // Umrechnung von g in kg
    
    // Berechnung der Kosten
    const cost = amount * costMap[streumittelType];
    
    // Umweltauswirkung anhand der Menge anpassen
    const environmentalImpact = 
      (environmentalImpactMap[streumittelType] * amount) / (area / 100);
    
    // Ergebnisse aktualisieren
    setResults({
      amount: parseFloat(amount.toFixed(2)),
      cost: parseFloat(cost.toFixed(2)),
      environmentalImpact: Math.min(10, parseFloat(environmentalImpact.toFixed(1))),
      iceRisk
    });
  };

  // Effekt für die Neuberechnung bei Änderungen
  useEffect(() => {
    calculateResults();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    area, 
    streumittelType, 
    temperature, 
    humidity, 
    precipitation, 
    precipitationProbability,
    manualInputs,
    useCurrentWeather
  ]);

  // Hilfsfunktion für die Anzeige der Umweltauswirkung
  const getEnvironmentalImpactLabel = (value: number) => {
    if (value <= 3) return "Gering";
    if (value <= 7) return "Mittel";
    return "Hoch";
  };

  const getEnvironmentalImpactColor = (value: number) => {
    if (value <= 3) return "text-green-600";
    if (value <= 7) return "text-yellow-600";
    return "text-red-600";
  };

  // Tab-Wechsel Handler
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setUseCurrentWeather(value === "current");
  };

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        <H3 className="text-xl font-semibold mb-4">Streumittel-Rechner</H3>
        
        {/* Tabs für aktuelle Wetterdaten vs. manuelle Eingabe */}
        <Tabs 
          defaultValue={useCurrentWeather ? "current" : "manual"}
          value={activeTab}
          className="mb-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current" onClick={() => handleTabChange("current")}>
              Aktuelle Wetterdaten
            </TabsTrigger>
            <TabsTrigger value="manual" onClick={() => handleTabChange("manual")}>
              Manuelle Eingabe
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="pt-4">
            {temperature === null ? (
              <div className="bg-yellow-100 text-yellow-800 border border-yellow-200 p-3 rounded-lg mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                  <span>Keine aktuellen Wetterdaten verfügbar. Bitte nutzen Sie die manuelle Eingabe.</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center">
                  <Thermometer className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Temperatur: {temperature?.toFixed(1)}°C</span>
                </div>
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Luftfeuchtigkeit: {humidity}%</span>
                </div>
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Niederschlagswahrsch.: {precipitationProbability}%</span>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="manual" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <Label htmlFor="manual-temp">Temperatur (°C)</Label>
                <Input
                  id="manual-temp"
                  type="number"
                  min="-20"
                  max="40"
                  step="0.1"
                  value={manualInputs.temperature}
                  onChange={(e) => setManualInputs({
                    ...manualInputs,
                    temperature: parseFloat(e.target.value) || 0
                  })}
                />
              </div>
              <div>
                <Label htmlFor="manual-humidity">Luftfeuchtigkeit (%)</Label>
                <Input
                  id="manual-humidity"
                  type="number"
                  min="0"
                  max="100"
                  value={manualInputs.humidity}
                  onChange={(e) => setManualInputs({
                    ...manualInputs,
                    humidity: parseInt(e.target.value) || 0
                  })}
                />
              </div>
              <div>
                <Label htmlFor="manual-precip">Niederschlag (mm)</Label>
                <Input
                  id="manual-precip"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={manualInputs.precipitation}
                  onChange={(e) => setManualInputs({
                    ...manualInputs,
                    precipitation: parseFloat(e.target.value) || 0
                  })}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Eingabebereich für die Berechnung */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <Label htmlFor="area">Fläche (m²)</Label>
            <Input
              id="area"
              type="number"
              min="1"
              value={area}
              onChange={(e) => setArea(parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div>
            <Label htmlFor="streumittel-type">Streumitteltyp</Label>
            <select
              id="streumittel-type"
              className="w-full p-2 border rounded"
              value={streumittelType}
              onChange={(e) => setStreumittelType(e.target.value as 'salt' | 'grit' | 'mix')}
            >
              <option value="salt">Streusalz</option>
              <option value="grit">Granulat/Splitt</option>
              <option value="mix">Mischung (Salz + Granulat)</option>
            </select>
          </div>
        </div>
        
        {/* Risikobewertung */}
        <div className={`p-4 rounded-lg mb-6 ${
          results.iceRisk.risk === 'high' 
            ? 'bg-red-100 border border-red-200' 
            : results.iceRisk.risk === 'medium' 
              ? 'bg-yellow-100 border border-yellow-200' 
              : 'bg-green-100 border border-green-200'
        }`}>
          <div className="font-medium mb-1">Glätterisiko:</div>
          <div className="text-sm">
            {results.iceRisk.description || 'Risikobewertung nicht verfügbar'}
          </div>
        </div>
        
        {/* Ergebnisbereich */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-700 mb-1">Benötigte Menge:</div>
            <div className="text-2xl font-bold">{results.amount} kg</div>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="text-sm text-gray-700 mb-1">Ungefähre Kosten:</div>
            <div className="text-2xl font-bold">{results.cost} €</div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <div className="text-sm text-amber-700 mb-1">Umweltauswirkung:</div>
            <div className={`text-2xl font-bold ${getEnvironmentalImpactColor(results.environmentalImpact)}`}>
              {getEnvironmentalImpactLabel(results.environmentalImpact)}
            </div>
          </div>
        </div>
        
        {/* Hinweise und Tipps */}
        <div className="mt-6 text-sm text-gray-600 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-base font-medium mb-2">Hinweise zum Streuen:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Streuen Sie gezielt auf Gehwegen, Einfahrten und Treppen.</li>
            <li>Bei Temperaturen unter -10°C wirkt Streusalz kaum noch.</li>
            <li>Umweltfreundlicher Splitt oder Granulat ist in vielen Fällen ausreichend.</li>
            <li>Übermäßiges Streuen belastet die Umwelt unnötig.</li>
            <li>Schneeschieben vor dem Streuen reduziert den Streumittelbedarf erheblich.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
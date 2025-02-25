"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { H3, Paragraph } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, ThermometerSnowflake } from "lucide-react";

interface StreumittelProps {
  temperature: number;
  precipitationProbability: number;
}

export const StreumittelCalculator = ({ temperature, precipitationProbability }: StreumittelProps) => {
  const [area, setArea] = useState<number>(100);
  const [streumittel, setStreumittel] = useState<string>('salz');
  const [recommendation, setRecommendation] = useState<{
    amount: number;
    type: string;
    explanation: string;
  }>({ amount: 0, type: '', explanation: '' });

  // Berechnung der benötigten Streumenge
  useEffect(() => {
    // Basiswerte für verschiedene Streumittel (g/m²)
    const baseAmounts = {
      salz: 20,
      splitt: 100,
      sand: 120,
      granulat: 40
    };

    // Temperaturanpassung
    let tempFactor = 1;
    if (temperature <= -5) {
      tempFactor = 1.5; // Bei sehr niedrigen Temperaturen mehr Streumittel
    } else if (temperature <= 0) {
      tempFactor = 1.2;
    }

    // Niederschlagsanpassung
    let precipFactor = 1;
    if (precipitationProbability >= 70) {
      precipFactor = 1.4;
    } else if (precipitationProbability >= 40) {
      precipFactor = 1.2;
    }

    // Streumitteltyp-Empfehlung
    let recommendedType = 'salz';
    let explanation = '';

    if (temperature < -10) {
      recommendedType = 'granulat';
      explanation = 'Bei Temperaturen unter -10°C ist Granulat wirksamer als Salz.';
    } else if (temperature < -5) {
      recommendedType = 'splitt';
      explanation = 'Bei Temperaturen unter -5°C bietet Splitt besseren Halt.';
    } else if (temperature >= 2) {
      recommendedType = 'reduziert';
      explanation = 'Bei Temperaturen über 2°C ist nur bei aktuellem Niederschlag Streuen notwendig.';
    }

    // Umweltschutz-Hinweis
    if (streumittel === 'salz' && (area > 200 || temperature > -3)) {
      explanation += ' Bitte bedenken Sie: Salz kann Pflanzen und Gewässer schädigen. Erwägen Sie umweltfreundlichere Alternativen.';
    }

    // Berechnung der Gesamtmenge
    const baseAmount = baseAmounts[streumittel as keyof typeof baseAmounts] || 20;
    const totalAmount = baseAmount * tempFactor * precipFactor * area / 1000; // in kg

    setRecommendation({
      amount: parseFloat(totalAmount.toFixed(2)),
      type: recommendedType,
      explanation
    });
  }, [temperature, precipitationProbability, area, streumittel]);

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        <H3 className="text-xl font-semibold mb-4">Streumittel-Rechner</H3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="area">Zu streuende Fläche (m²)</Label>
            <div className="flex items-center">
              <span className="w-5 h-5 mr-2 text-accent">m²</span>
              <Input
                id="area"
                type="number"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value) || 0)}
                min="1"
                className="w-full"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="streumittel">Streumittel-Art</Label>
            <div className="flex items-center">
              <img src="/path/to/road-icon.png" alt="Road Icon" className="w-5 h-5 mr-2 text-accent" />
              <select
                id="streumittel"
                value={streumittel}
                onChange={(e) => setStreumittel(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
              >
                <option value="salz">Streusalz</option>
                <option value="splitt">Splitt</option>
                <option value="sand">Sand</option>
                <option value="granulat">Umweltgranulat</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start mb-4">
            <ThermometerSnowflake className="w-5 h-5 text-blue-600 mr-2 mt-1" />
            <div>
              <H3 className="text-lg font-medium">Aktuelle Wetterbedingungen</H3>
              <Paragraph className="text-sm text-muted-foreground">
                Temperatur: {temperature}°C | Niederschlagswahrscheinlichkeit: {precipitationProbability}%
              </Paragraph>
            </div>
          </div>
          
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <H3 className="text-lg font-medium mb-2">Empfohlene Streumenge</H3>
            <div className="flex items-center text-xl font-bold text-accent mb-3">
              {recommendation.amount} kg {streumittel}
            </div>
            
            {recommendation.type !== streumittel && recommendation.type !== 'reduziert' && (
              <div className="flex items-start mt-2 bg-amber-50 p-3 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                <div>
                  <span className="font-medium">Empfehlung:</span> Bei diesen Wetterbedingungen wäre {recommendation.type} effektiver.
                </div>
              </div>
            )}
            
            {recommendation.explanation && (
              <Paragraph className="text-sm text-muted-foreground mt-2">
                {recommendation.explanation}
              </Paragraph>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
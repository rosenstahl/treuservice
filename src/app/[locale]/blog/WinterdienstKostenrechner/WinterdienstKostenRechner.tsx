"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H3, Paragraph } from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { 
  Calculator,
  Euro,
  Calendar,
  Clock,
  Snowflake,
  User,
  LucideHardHat,
  Info,
  ArrowRight,
  AlertTriangle
} from "lucide-react";

// Typendefinitionen
interface CostCalculation {
  professional: {
    seasonRate: number;
    perServiceRate: number;
    estimatedTotalCost: number;
  };
  diy: {
    equipmentCost: number;
    materialCost: number;
    timeValue: number;
    healthRisk: number;
    liabilityRisk: number;
    estimatedTotalCost: number;
  };
  savings: number;
  recommendation: string;
}

const WinterdienstKostenRechner: React.FC = () => {
  // Zustandsvariablen für Eingabefelder
  const [areaSize, setAreaSize] = useState<number>(100);
  const [propertyType, setPropertyType] = useState<string>("residential");
  const [serviceType, setServiceType] = useState<string>("seasonal");
  const [expectedSnowDays, setExpectedSnowDays] = useState<number>(20);
  const [hourlyRate, setHourlyRate] = useState<number>(25);
  const [locationFactor, setLocationFactor] = useState<number>(1);
  const [hasEquipment, setHasEquipment] = useState<boolean>(false);
  const [includeTimeValue, setIncludeTimeValue] = useState<boolean>(true);
  const [includeRisks, setIncludeRisks] = useState<boolean>(true);
  
  // Berechnete Werte
  const [costCalculation, setCostCalculation] = useState<CostCalculation | null>(null);

  // Berechnung durchführen, wenn sich Eingabewerte ändern
  useEffect(() => {
    calculateCosts();
  }, [
    areaSize, 
    propertyType, 
    serviceType, 
    expectedSnowDays, 
    hourlyRate, 
    locationFactor, 
    hasEquipment,
    includeTimeValue,
    includeRisks
  ]);

  // Berechnung der Kosten
  const calculateCosts = () => {
    // Basiskostenfaktoren
    const basePricePerSqm = propertyType === "residential" ? 1.5 : 1.2;
    const baseHourlyServiceTime = (areaSize / 100) * 0.5; // Zeit in Stunden
    
    // Professional Service Berechnung
    const seasonalBasePrice = areaSize * basePricePerSqm * locationFactor;
    const perServicePrice = (areaSize / 100) * 15 * locationFactor; // €15 pro 100m²
    
    // DIY Kostenberechnung
    const equipmentBaseCost = hasEquipment ? 0 : 300; // Schneeschieber, Streugut-Streuer, etc.
    const equipmentMaintenanceCost = hasEquipment ? 50 : 80; // Wartungskosten
    const materialCostPerDay = (areaSize / 100) * 5; // Streugut pro Tag
    
    // Zeitwert-Berechnung
    const timePerService = baseHourlyServiceTime; // Stunden pro Räumung
    const totalTimeValue = includeTimeValue 
      ? timePerService * expectedSnowDays * hourlyRate 
      : 0;
    
    // Risiko-Berechnung
    const healthRiskFactor = includeRisks ? (propertyType === "residential" ? 200 : 300) : 0;
    const liabilityRiskFactor = includeRisks ? (areaSize / 100) * 100 : 0; // Größere Fläche = höheres Risiko
    
    // Berechnung der Gesamtkosten
    const professionalCosts = {
      seasonRate: Math.round(seasonalBasePrice),
      perServiceRate: Math.round(perServicePrice),
      estimatedTotalCost: serviceType === "seasonal" 
        ? Math.round(seasonalBasePrice)
        : Math.round(perServicePrice * expectedSnowDays)
    };
    
    const diyCosts = {
      equipmentCost: Math.round(equipmentBaseCost + equipmentMaintenanceCost),
      materialCost: Math.round(materialCostPerDay * expectedSnowDays),
      timeValue: Math.round(totalTimeValue),
      healthRisk: Math.round(healthRiskFactor),
      liabilityRisk: Math.round(liabilityRiskFactor),
      estimatedTotalCost: Math.round(
        equipmentBaseCost + 
        equipmentMaintenanceCost + 
        (materialCostPerDay * expectedSnowDays) +
        totalTimeValue +
        healthRiskFactor +
        liabilityRiskFactor
      )
    };
    
    // Differenz berechnen und Empfehlung aussprechen
    const savingsAmount = diyCosts.estimatedTotalCost - professionalCosts.estimatedTotalCost;
    
    let recommendation = "";
    if (savingsAmount > 500) {
      recommendation = "Die professionelle Lösung bietet erhebliche Kosteneinsparungen und Sicherheit.";
    } else if (savingsAmount > 0) {
      recommendation = "Die professionelle Lösung ist etwas günstiger und bietet mehr Sicherheit.";
    } else if (savingsAmount > -200) {
      recommendation = "Die Kosten sind ähnlich - der Komfort und die Sicherheit sprechen für die professionelle Lösung.";
    } else {
      recommendation = "Die Eigenleistung ist günstiger, bedenken Sie aber den Zeitaufwand und die Risiken.";
    }
    
    setCostCalculation({
      professional: professionalCosts,
      diy: diyCosts,
      savings: savingsAmount,
      recommendation
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Kostenrechner: Winterdienst-Outsourcing vs. Eigenleistung
        </CardTitle>
        <CardDescription>
          Berechnen Sie die Kosten für professionellen Winterdienst im Vergleich zur Eigenleistung
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <Tabs defaultValue="eingabe">
          <TabsList className="w-full">
            <TabsTrigger value="eingabe">1. Eingabe</TabsTrigger>
            <TabsTrigger value="berechnung">2. Kostenvergleich</TabsTrigger>
          </TabsList>
          
          <TabsContent value="eingabe" className="space-y-8 pt-4">
            {/* Grunddaten Immobilie und Fläche */}
            <div>
              <H3 className="mb-4 flex items-center gap-2">
                <Snowflake className="w-5 h-5 text-primary" />
                Grunddaten
              </H3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="area-size">Zu räumende Fläche (m²)</Label>
                    <div className="flex items-center mt-2">
                      <Input 
                        id="area-size"
                        type="number" 
                        min="10" 
                        max="2000" 
                        value={areaSize}
                        onChange={(e) => setAreaSize(parseInt(e.target.value) || 10)}
                        className="mr-4"
                      />
                      <Slider
                        min={10}
                        max={1000}
                        step={10}
                        value={[areaSize]}
                        onValueChange={(value: number[]) => setAreaSize(value[0])}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Immobilientyp</Label>
                    <RadioGroup 
                      value={propertyType} 
                      onValueChange={setPropertyType}
                      className="grid grid-cols-2 gap-4 mt-2"
                    >
                      <div>
                        <RadioGroupItem 
                          value="residential" 
                          id="residential"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="residential"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <User className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Privat/Wohnimmobilie</span>
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem 
                          value="commercial" 
                          id="commercial"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="commercial"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <LucideHardHat className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Gewerbeimmobilie</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Regionale Lage</Label>
                    <RadioGroup 
                      value={locationFactor.toString()} 
                      onValueChange={(value) => setLocationFactor(parseFloat(value))}
                      className="grid grid-cols-3 gap-2 mt-2"
                    >
                      <div>
                        <RadioGroupItem 
                          value="0.9" 
                          id="rural"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="rural"
                          className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-sm"
                        >
                          Ländlich
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem 
                          value="1" 
                          id="suburban"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="suburban"
                          className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-sm"
                        >
                          Stadtrand
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem 
                          value="1.2" 
                          id="urban"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="urban"
                          className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer text-sm"
                        >
                          Stadtgebiet
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <Label>Vertragsvariante</Label>
                    <RadioGroup 
                      value={serviceType} 
                      onValueChange={setServiceType}
                      className="grid grid-cols-2 gap-4 mt-2"
                    >
                      <div>
                        <RadioGroupItem 
                          value="seasonal" 
                          id="seasonal"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="seasonal"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <Calendar className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Saisonpauschale</span>
                        </Label>
                      </div>
                      
                      <div>
                        <RadioGroupItem 
                          value="per-service" 
                          id="per-service"
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor="per-service"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <Clock className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Pro Einsatz</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Erweiterte Einstellungen */}
            <div>
              <H3 className="mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Erweiterte Einstellungen
              </H3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="snow-days">Erwartete Tage mit Schneefall/Jahr</Label>
                    <div className="flex items-center mt-2">
                      <Input 
                        id="snow-days"
                        type="number" 
                        min="5" 
                        max="60" 
                        value={expectedSnowDays}
                        onChange={(e) => setExpectedSnowDays(parseInt(e.target.value) || 10)}
                        className="mr-4"
                      />
                      <Slider
                        min={5}
                        max={60}
                        step={1}
                        value={[expectedSnowDays]}
                        onValueChange={(value: number[]) => setExpectedSnowDays(value[0])}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="hourly-rate">Ihr Stundenlohn/Zeitwert (€)</Label>
                    <div className="flex items-center mt-2">
                      <Input 
                        id="hourly-rate"
                        type="number" 
                        min="0" 
                        max="100" 
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(parseInt(e.target.value) || 0)}
                        className="mr-4"
                      />
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={[hourlyRate]}
                        onValueChange={(value: number[]) => setHourlyRate(value[0])}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Besitzen bereits Räumgeräte</Label>
                      <p className="text-sm text-muted-foreground">Schneeschieber, Streuwagen etc.</p>
                    </div>
                    <Switch
                      checked={hasEquipment}
                      onCheckedChange={setHasEquipment}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Zeitwert berücksichtigen</Label>
                      <p className="text-sm text-muted-foreground">Ihre eigene Zeit in Geldwert umrechnen</p>
                    </div>
                    <Switch
                      checked={includeTimeValue}
                      onCheckedChange={setIncludeTimeValue}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Risikofaktoren einbeziehen</Label>
                      <p className="text-sm text-muted-foreground">Gesundheits- und Haftungsrisiken</p>
                    </div>
                    <Switch
                      checked={includeRisks}
                      onCheckedChange={setIncludeRisks}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              className="w-full mt-6"
              onClick={() => document.querySelector('[data-value="berechnung"]')?.click()}
            >
              Kosten berechnen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </TabsContent>
          
          <TabsContent value="berechnung" className="pt-4">
            {costCalculation && (
              <div className="space-y-8">
                {/* Empfehlungsbereich */}
                <Alert className={
                  costCalculation.savings > 0 
                    ? "bg-green-50 border border-green-200" 
                    : costCalculation.savings > -200
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-amber-50 border border-amber-200"
                }>
                  <AlertDescription className="flex items-center gap-2">
                    <AlertTriangle className={
                      costCalculation.savings > 0 
                        ? "text-green-600" 
                        : costCalculation.savings > -200
                          ? "text-blue-600"
                          : "text-amber-600"
                    } />
                    <span className="font-medium">{costCalculation.recommendation}</span>
                  </AlertDescription>
                </Alert>
                
                {/* Kostenzusammenfassung */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Professioneller Winterdienst */}
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Professioneller Winterdienst</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {serviceType === "seasonal" ? (
                          <div className="flex justify-between items-center">
                            <span>Saisonpauschale:</span>
                            <span className="font-bold">{costCalculation.professional.seasonRate} €</span>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-center">
                              <span>Kosten pro Einsatz:</span>
                              <span className="font-medium">{costCalculation.professional.perServiceRate} €</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Anzahl der Einsätze:</span>
                              <span className="font-medium">{expectedSnowDays}</span>
                            </div>
                          </>
                        )}
                        
                        <Separator />
                        
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Geschätzte Gesamtkosten:</span>
                          <span className="text-2xl font-bold">{costCalculation.professional.estimatedTotalCost} €</span>
                        </div>
                        
                        <div className="bg-white p-3 rounded-md text-sm border border-blue-200 mt-2">
                          <div className="font-medium mb-1">Vorteile:</div>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Rechtssicherheit durch Dokumentation</li>
                            <li>Keine eigene körperliche Belastung</li>
                            <li>Keine Ausrüstung/Lagerung notwendig</li>
                            <li>Zuverlässige Ausführung auch bei Abwesenheit</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Eigenleistung */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Winterdienst in Eigenleistung</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Ausrüstungskosten:</span>
                          <span className="font-medium">{costCalculation.diy.equipmentCost} €</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Materialkosten (Streugut):</span>
                          <span className="font-medium">{costCalculation.diy.materialCost} €</span>
                        </div>
                        
                        {includeTimeValue && (
                          <div className="flex justify-between items-center">
                            <span>Zeitwert Ihrer Arbeit:</span>
                            <span className="font-medium">{costCalculation.diy.timeValue} €</span>
                          </div>
                        )}
                        
                        {includeRisks && (
                          <>
                            <div className="flex justify-between items-center">
                              <span>Gesundheitsrisiko (geschätzt):</span>
                              <span className="font-medium">{costCalculation.diy.healthRisk} €</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Haftungsrisiko (geschätzt):</span>
                              <span className="font-medium">{costCalculation.diy.liabilityRisk} €</span>
                            </div>
                          </>
                        )}
                        
                        <Separator />
                        
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">Geschätzte Gesamtkosten:</span>
                          <span className="text-2xl font-bold">{costCalculation.diy.estimatedTotalCost} €</span>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md text-sm border border-gray-200 mt-2">
                          <div className="font-medium mb-1">Nachteile:</div>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Zeitaufwand am frühen Morgen/Wochenende</li>
                            <li>Körperliche Belastung</li>
                            <li>Geräte und Streugut müssen gelagert werden</li>
                            <li>Volle persönliche Haftung bei Unfällen</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Gesamtvergleich */}
                <div className="bg-slate-50 p-6 rounded-lg border">
                  <H3 className="text-lg mb-4 flex items-center gap-2">
                    <Euro className="h-5 w-5 text-primary" />
                    Kostenvergleich
                  </H3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Professioneller Winterdienst:</span>
                        <span className="font-bold">{costCalculation.professional.estimatedTotalCost} €</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Eigenleistung:</span>
                        <span className="font-bold">{costCalculation.diy.estimatedTotalCost} €</span>
                      </div>
                      <Separator className="my-3" />
                      <div className="flex justify-between">
                        <span className="font-semibold">Differenz:</span>
                        <span className={`font-bold ${costCalculation.savings > 0 ? "text-green-600" : "text-red-600"}`}>
                          {costCalculation.savings > 0 ? "+" : ""}{costCalculation.savings} €
                        </span>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded border">
                      <div className="font-medium mb-2">Wichtige Hinweise:</div>
                      <ul className="text-sm space-y-2">
                        <li>Die Berechnung basiert auf Durchschnittswerten und kann je nach Region variieren.</li>
                        <li>Bei der Eigenleistung können unerwartete Kosten wie Geräteschäden auftreten.</li>
                        <li>Die Haftungsrisiken bei unzureichender Räumung können erheblich sein.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => document.querySelector('[data-value="eingabe"]')?.click()}
                  >
                    Eingabedaten anpassen
                  </Button>
                  
                  <Button as="a" href="/winterdienst" className="bg-primary hover:bg-primary/90">
                    Winterdienst-Angebot anfragen
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WinterdienstKostenRechner;
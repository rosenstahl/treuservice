"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Home, 
  Building, 
  Snowflake, 
  Ruler, 
  Map, 
  Users, 
  FileText, 
  RefreshCw, 
  CheckCircle2,
  Clock,
  Calendar,
  ArrowRight,
  AlertTriangle
} from "lucide-react";
import { H3, Paragraph } from "@/components/ui/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Hilfs-Interfaces für unsere State-Typen
interface FormData {
  gebäudetyp: string;
  eigentumsverhältnis: string;
  region: string;
  lage: string;
  gehwegbreite: string;
  nutzungsfrequenz: string;
  vertragliche_regelung: string;
}

interface Assessment {
  pflicht: string;
  zeitraum: string;
  häufigkeit: string;
  breite: string;
  zusätzliche_hinweise: string[];
  risiko_level: 'niedrig' | 'mittel' | 'hoch';
}

const RaeumpflichtRechner: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    gebäudetyp: '',
    eigentumsverhältnis: '',
    region: '',
    lage: '',
    gehwegbreite: '',
    nutzungsfrequenz: '',
    vertragliche_regelung: '',
  });
  
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [progress, setProgress] = useState<number>(0);
  
  // Zur besseren User Experience den Fortschritt anzeigen
  React.useEffect(() => {
    const progressValue = ((activeStep - 1) / 6) * 100;
    setProgress(progressValue);
  }, [activeStep]);

  // Formular-Änderungen verarbeiten
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Zum nächsten Schritt gehen
  const goToNextStep = () => {
    if (activeStep < 7) {
      window.scrollTo(0, 0);
      setActiveStep(activeStep + 1);
    }
    if (activeStep === 6) {
      calculateAssessment();
    }
  };

  // Zum vorherigen Schritt gehen
  const goToPreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  // Formular zurücksetzen
  const resetForm = () => {
    setFormData({
      gebäudetyp: '',
      eigentumsverhältnis: '',
      region: '',
      lage: '',
      gehwegbreite: '',
      nutzungsfrequenz: '',
      vertragliche_regelung: '',
    });
    setAssessment(null);
    setActiveStep(1);
  };

  // Berechnung der Räumpflichtbewertung
  const calculateAssessment = () => {
    let pflicht = "Grundsätzlich besteht eine Räum- und Streupflicht";
    let zeitraum = "Werktags von 7 bis 20 Uhr, Sonn- und Feiertags von 9 bis 20 Uhr";
    let häufigkeit = "Bei Schneefall oder Glatteis, in angemessenen Zeitabständen";
    let breite = "Mindestens 1 Meter bzw. die Hälfte des Gehwegs";
    let risiko_level: 'niedrig' | 'mittel' | 'hoch' = 'mittel';
    const zusätzliche_hinweise: string[] = [];

    // Eigentum und Vertragliche Regelungen
    if (formData.eigentumsverhältnis === 'mieter') {
      if (formData.vertragliche_regelung === 'vermieter_zuständig') {
        pflicht = "Die Räum- und Streupflicht wurde laut Mietvertrag auf den Vermieter übertragen";
        zusätzliche_hinweise.push("Prüfen Sie, ob diese Übertragung auch in Bezug auf die Verkehrssicherungspflicht gegenüber Dritten wirksam ist");
        risiko_level = 'niedrig';
      } else if (formData.vertragliche_regelung === 'mieter_zuständig') {
        pflicht = "Sie sind als Mieter laut Mietvertrag zur Räumung und Streuung verpflichtet";
        zusätzliche_hinweise.push("Achten Sie auf die genauen Vorgaben im Mietvertrag bezüglich Zeiten und Umfang");
        risiko_level = 'mittel';
      } else {
        pflicht = "Die Zuständigkeit ist nicht eindeutig geregelt - Vorsicht!";
        zusätzliche_hinweise.push("Klären Sie die Verantwortlichkeit dringend mit Ihrem Vermieter und lassen Sie dies schriftlich festhalten");
        risiko_level = 'hoch';
      }
    } 
    else {
      pflicht = "Als Eigentümer sind Sie grundsätzlich für den Winterdienst verantwortlich";
      risiko_level = 'mittel';
    }

    // Regionale Besonderheiten
    if (formData.region === 'süddeutschland' || formData.region === 'mittelgebirge') {
      häufigkeit = "Bei erhöhtem Schneeaufkommen ggf. mehrmals täglich";
      zusätzliche_hinweise.push("In schneereichen Regionen sind die Anforderungen an den Winterdienst in der Regel höher");
      if (risiko_level === 'mittel') risiko_level = 'hoch';
    }

    // Lage und Nutzungsfrequenz
    if (formData.lage === 'hauptstrasse' || formData.nutzungsfrequenz === 'hoch') {
      zeitraum = "Werktags von 7 bis 21 Uhr, Sonn- und Feiertags von 8 bis 21 Uhr";
      häufigkeit = "Bei Bedarf mehrmals täglich, besonders in Stoßzeiten";
      breite = "Mindestens 1,5 Meter für sicheren Fußgängerverkehr";
      zusätzliche_hinweise.push("Bei stark frequentierten Bereichen gelten erhöhte Sorgfaltspflichten");
      if (risiko_level !== 'hoch') risiko_level = 'hoch';
    }
    else if (formData.lage === 'nebenstrasse' && formData.nutzungsfrequenz === 'niedrig') {
      if (risiko_level === 'mittel') risiko_level = 'niedrig';
    }

    // Gebäudetyp-spezifische Hinweise
    if (formData.gebäudetyp === 'gewerbeimmobilie') {
      zusätzliche_hinweise.push("Bei Gewerbeimmobilien besteht oft eine erweiterte Streupflicht während der Öffnungszeiten");
      zusätzliche_hinweise.push("Dokumentieren Sie Ihre Winterdienstmaßnahmen lückenlos zur Absicherung");
      if (risiko_level !== 'hoch') risiko_level = 'hoch';
    }
    else if (formData.gebäudetyp === 'mehrfamilienhaus' && formData.eigentumsverhältnis === 'eigentümer') {
      zusätzliche_hinweise.push("Als Eigentümer können Sie die Räumpflicht auf die Mieter übertragen, bleiben aber letztendlich verantwortlich");
    }

    // Breite des Gehwegs
    if (formData.gehwegbreite === 'sehr_schmal') {
      breite = "Der gesamte Gehweg muss geräumt werden";
    } 
    else if (formData.gehwegbreite === 'sehr_breit') {
      breite = "Ein ausreichend breiter Streifen von mindestens 1,5 Metern";
    }

    // Assessment setzen
    setAssessment({
      pflicht,
      zeitraum,
      häufigkeit,
      breite,
      zusätzliche_hinweise,
      risiko_level
    });
  };

  // Check ob der aktuelle Schritt vollständig ist
  const isStepComplete = (): boolean => {
    switch (activeStep) {
      case 1:
        return !!formData.gebäudetyp;
      case 2:
        return !!formData.eigentumsverhältnis;
      case 3:
        return !!formData.region;
      case 4:
        return !!formData.lage && !!formData.gehwegbreite;
      case 5:
        return !!formData.nutzungsfrequenz;
      case 6:
        return formData.eigentumsverhältnis !== 'mieter' || !!formData.vertragliche_regelung;
      default:
        return true;
    }
  };

  // Rendert den aktuellen Formularschritt
  const renderStep = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-5">
            <H3 className="flex items-center gap-2">
              <Home className="h-5 w-5 text-primary" />
              <span>Art des Gebäudes</span>
            </H3>
            <RadioGroup 
              value={formData.gebäudetyp} 
              onValueChange={(value) => handleChange('gebäudetyp', value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem 
                  value="einfamilienhaus" 
                  id="einfamilienhaus"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="einfamilienhaus"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Home className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Einfamilienhaus</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="mehrfamilienhaus" 
                  id="mehrfamilienhaus"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="mehrfamilienhaus"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Building className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Mehrfamilienhaus</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="gewerbeimmobilie" 
                  id="gewerbeimmobilie"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="gewerbeimmobilie"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Building className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Gewerbeimmobilie</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="sonstiges" 
                  id="sonstiges"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="sonstiges"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Building className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Sonstiges Gebäude</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-5">
            <H3 className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Eigentumsverhältnis</span>
            </H3>
            <RadioGroup 
              value={formData.eigentumsverhältnis} 
              onValueChange={(value) => handleChange('eigentumsverhältnis', value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem 
                  value="eigentümer" 
                  id="eigentümer"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="eigentümer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Home className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Eigentümer</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="mieter" 
                  id="mieter"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="mieter"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Users className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Mieter</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-5">
            <H3 className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              <span>Region</span>
            </H3>
            <RadioGroup 
              value={formData.region} 
              onValueChange={(value) => handleChange('region', value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem 
                  value="norddeutschland" 
                  id="norddeutschland"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="norddeutschland"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Map className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Norddeutschland</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="ostdeutschland" 
                  id="ostdeutschland"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="ostdeutschland"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Map className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Ostdeutschland</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="süddeutschland" 
                  id="süddeutschland"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="süddeutschland"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Map className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Süddeutschland</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="westdeutschland" 
                  id="westdeutschland"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="westdeutschland"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Map className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Westdeutschland</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="mittelgebirge" 
                  id="mittelgebirge"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="mittelgebirge"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Map className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Mittelgebirge/Alpen</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <H3 className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              <span>Lage und Gehwegbreite</span>
            </H3>
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium mb-2">Lage der Immobilie</h4>
              <RadioGroup 
                value={formData.lage} 
                onValueChange={(value) => handleChange('lage', value)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem 
                    value="hauptstrasse" 
                    id="hauptstrasse"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="hauptstrasse"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Map className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Hauptstraße</span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem 
                    value="nebenstrasse" 
                    id="nebenstrasse"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="nebenstrasse"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Map className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Nebenstraße</span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem 
                    value="wohngebiet" 
                    id="wohngebiet"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="wohngebiet"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Home className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Wohngebiet</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium mb-2">Breite des Gehwegs</h4>
              <RadioGroup 
                value={formData.gehwegbreite} 
                onValueChange={(value) => handleChange('gehwegbreite', value)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div>
                  <RadioGroupItem 
                    value="sehr_schmal" 
                    id="sehr_schmal"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="sehr_schmal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Ruler className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Unter 1,5m</span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem 
                    value="normal" 
                    id="normal"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="normal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Ruler className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">1,5m bis 3m</span>
                  </Label>
                </div>

                <div>
                  <RadioGroupItem 
                    value="sehr_breit" 
                    id="sehr_breit"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="sehr_breit"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <Ruler className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">Über 3m</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-5">
            <H3 className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Nutzungsfrequenz des Gehwegs</span>
            </H3>
            <RadioGroup 
              value={formData.nutzungsfrequenz} 
              onValueChange={(value) => handleChange('nutzungsfrequenz', value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem 
                  value="niedrig" 
                  id="niedrig"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="niedrig"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Users className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Niedrig</span>
                  <span className="text-xs text-muted-foreground mt-1">Wenige Fußgänger</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="mittel" 
                  id="mittel"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="mittel"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Users className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Mittel</span>
                  <span className="text-xs text-muted-foreground mt-1">Regelmäßiger Verkehr</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="hoch" 
                  id="hoch"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="hoch"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <Users className="mb-3 h-6 w-6" />
                  <span className="text-sm font-medium">Hoch</span>
                  <span className="text-xs text-muted-foreground mt-1">Stark frequentiert</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        );
      
      case 6:
        return formData.eigentumsverhältnis === 'mieter' ? (
          <div className="space-y-5">
            <H3 className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Vertragliche Regelung (Mietvertrag)</span>
            </H3>
            <RadioGroup 
              value={formData.vertragliche_regelung} 
              onValueChange={(value) => handleChange('vertragliche_regelung', value)}
              className="grid grid-cols-1 gap-4"
            >
              <div>
                <RadioGroupItem 
                  value="mieter_zuständig" 
                  id="mieter_zuständig"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="mieter_zuständig"
                  className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 mr-2" />
                    <span className="font-medium">Mieter ist für Winterdienst zuständig</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Im Mietvertrag ist festgelegt, dass Sie als Mieter für den Winterdienst verantwortlich sind</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="vermieter_zuständig" 
                  id="vermieter_zuständig"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="vermieter_zuständig"
                  className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 mr-2" />
                    <span className="font-medium">Vermieter/Hausverwaltung ist zuständig</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Der Vermieter oder die Hausverwaltung übernimmt den Winterdienst (z.B. durch externe Dienstleister)</span>
                </Label>
              </div>

              <div>
                <RadioGroupItem 
                  value="nicht_geregelt" 
                  id="nicht_geregelt"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="nicht_geregelt"
                  className="flex flex-col items-start justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <div className="flex items-center mb-2">
                    <FileText className="h-5 w-5 mr-2" />
                    <span className="font-medium">Nicht eindeutig geregelt</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Im Mietvertrag gibt es keine klare Regelung zur Räum- und Streupflicht</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        ) : (
          <div className="space-y-4">
            <H3 className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>Zusammenfassung</span>
            </H3>
            
            <Alert>
              <AlertTitle>Als Eigentümer sind Sie grundsätzlich für den Winterdienst verantwortlich</AlertTitle>
              <AlertDescription>
                Die Verkehrssicherungspflicht obliegt Ihnen als Eigentümer. Sie können diese Pflicht durch vertragliche Vereinbarungen auf Dritte (z.B. Mieter oder einen professionellen Winterdienst) übertragen, bleiben aber letztendlich verantwortlich für die ordnungsgemäße Durchführung.
              </AlertDescription>
            </Alert>
            
            <Paragraph>
              Klicken Sie auf &quot;Weiter&quot;, um Ihre individuelle Räumpflicht-Bewertung zu erhalten.
            </Paragraph>
          </div>
        );
      
      case 7:
        return assessment ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <H3 className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>Ihre Räumpflicht-Bewertung</span>
              </H3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetForm}
                className="flex items-center gap-1"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Neu starten</span>
              </Button>
            </div>
            
            <Tabs defaultValue="übersicht" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="übersicht">Übersicht</TabsTrigger>
                <TabsTrigger value="details">Detailierte Pflichten</TabsTrigger>
              </TabsList>
              <TabsContent value="übersicht" className="p-4 border rounded-md mt-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">Risiko-Level:</div>
                    <div className={
                      assessment.risiko_level === 'niedrig' ? 'text-green-600 font-bold' :
                      assessment.risiko_level === 'mittel' ? 'text-amber-600 font-bold' :
                      'text-red-600 font-bold'
                    }>
                      {assessment.risiko_level === 'niedrig' ? 'Niedrig' :
                       assessment.risiko_level === 'mittel' ? 'Mittel' :
                       'Hoch'}
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-md">
                    <div className="font-medium mb-2">Zusammenfassung:</div>
                    <Paragraph>{assessment.pflicht}</Paragraph>
                  </div>
                  
                  {assessment.zusätzliche_hinweise.length > 0 && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                      <div className="font-medium mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />
                        Wichtige Hinweise:
                      </div>
                      <ul className="space-y-2">
                        {assessment.zusätzliche_hinweise.map((hinweis, idx) => (
                          <li key={idx} className="text-sm">{hinweis}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <Button className="w-full" onClick={() => window.location.href = "/winterdienst"}>
                      Winterdienst-Angebot anfragen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="details" className="space-y-4 p-4 border rounded-md mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-4 rounded-md">
                    <div className="flex items-center text-primary font-medium mb-2">
                      <Clock className="h-4 w-4 mr-2" />
                      Zeitliche Verpflichtung:
                    </div>
                    <Paragraph className="text-sm">{assessment.zeitraum}</Paragraph>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-md">
                    <div className="flex items-center text-primary font-medium mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      Häufigkeit:
                    </div>
                    <Paragraph className="text-sm">{assessment.häufigkeit}</Paragraph>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-md">
                  <div className="flex items-center text-primary font-medium mb-2">
                    <Ruler className="h-4 w-4 mr-2" />
                    Räumbreite:
                  </div>
                  <Paragraph className="text-sm">{assessment.breite}</Paragraph>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-md border border-primary/10">
                  <div className="font-medium mb-2">Allgemeine Hinweise:</div>
                  <ul className="space-y-2 text-sm">
                    <li>Bei extrem widrigen Wetterbedingungen (z.B. Blitzeis, Dauerschneefall) sind die Anforderungen an den Winterdienst angemessen zu reduzieren.</li>
                    <li>Die Räum- und Streupflicht beginnt erst, wenn der Schneefall aufgehört hat oder eine Pause eintritt.</li>
                    <li>Besonders gefährliche Stellen wie Treppen oder Gefällstrecken sollten besonders sorgfältig behandelt werden.</li>
                    <li>In vielen Kommunen ist die Verwendung von Streusalz eingeschränkt oder verboten. Informieren Sie sich über lokale Vorschriften.</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <Paragraph>Ihre Bewertung wird berechnet...</Paragraph>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Snowflake className="h-5 w-5 text-primary" />
          Räumpflicht-Assistent
        </CardTitle>
        <CardDescription>
          Beantworten Sie die folgenden Fragen, um Ihre individuellen Räum- und Streupflichten zu ermitteln.
        </CardDescription>
        <Progress value={progress} className="w-full h-2" />
      </CardHeader>
      
      <CardContent>
        {renderStep()}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {activeStep > 1 && activeStep < 7 && (
          <Button 
            variant="outline" 
            onClick={goToPreviousStep}
          >
            Zurück
          </Button>
        )}
        
        {activeStep === 1 && <div></div>}
        
        {activeStep < 7 && (
          <Button 
            onClick={goToNextStep}
            disabled={!isStepComplete()}
          >
            {activeStep === 6 ? 'Bewertung anzeigen' : 'Weiter'}
          </Button>
        )}
        
        {activeStep === 7 && <div></div>}
      </CardFooter>
    </Card>
  );
};

export default RaeumpflichtRechner;
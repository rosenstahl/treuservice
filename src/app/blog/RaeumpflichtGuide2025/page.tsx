"use client"

import React, { useState } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { 
  Check, 
  ChevronRight, 
  AlertTriangle, 
  MapPin, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Shield, 
  FileCheck, 
  Info, 
  Gavel, 
  CalendarDays, 
  HelpCircle, 
  Shovel,
  Home,
  Building,
  Calendar,
  User,
  Share2,
  ExternalLink,
  Mail,
  Phone,
  Calculator
} from 'lucide-react'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import Image from "next/image"
import { title } from 'process'

// Typdefinitionen
interface Region {
  name: string;
  werktagszeiten: string;
  wochenendezeiten: string;
  besonderheiten: string;
  raeumpflichtbreite: string;
  zeitfrist: string;
  gemeinden: string[];
}

interface Urteil {
  id: number;
  instanz: string;
  datum: string;
  aktenzeichen: string;
  thema: string;
  beschreibung: string;
  bedeutung: string;
}

interface FormState {
  role: string;
  propertyType: string;
  region: string;
  specialCircumstances: string[];
  agreement: string;
}

interface PersonalizedState {
  eigentuemer: boolean;
  mieter: boolean;
  delegiert: boolean;
  wohngebaeude: boolean;
  gewerbegebaeude: boolean;
  besondereUmstaende: string[];
  region: Region;
}

interface Recommendation {
  title: string;
  description: string;
}

interface ResultState {
  personalized: PersonalizedState;
  riskLevel: string;
  recommendations: Recommendation[];
  notice: string;
}

// Regionale Daten und Pflichten
const regionen: Region[] = [
  {
    name: "Baden-Württemberg",
    werktagszeiten: "7:00 - 21:00 Uhr",
    wochenendezeiten: "8:00 - 21:00 Uhr",
    besonderheiten: "Vielerorts Streusalzverbot für Privatpersonen, stattdessen abstumpfende Mittel vorgeschrieben.",
    raeumpflichtbreite: "1,20 m (bzw. 2/3 des Gehwegs)",
    zeitfrist: "nach Schneefall: 30 Minuten",
    gemeinden: ["Stuttgart", "Karlsruhe", "Freiburg", "Heidelberg", "Mannheim"]
  },
  {
    name: "Bayern",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "8:00 - 20:00 Uhr",
    besonderheiten: "In München generelles Streusalzverbot, stattdessen werden kostenlose Granulate zur Verfügung gestellt.",
    raeumpflichtbreite: "1,00 m",
    zeitfrist: "nach Schneefall: 30-60 Minuten",
    gemeinden: ["München", "Nürnberg", "Augsburg", "Regensburg", "Würzburg"]
  },
  {
    name: "Berlin",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "9:00 - 20:00 Uhr",
    besonderheiten: "Generelles Verbot von Auftausalzen auf öffentlichen Gehwegen. Bei Schneefall muss innerhalb von drei Stunden geräumt werden.",
    raeumpflichtbreite: "1,50 m",
    zeitfrist: "nach Schneefall: 3 Stunden",
    gemeinden: ["Berlin-Mitte", "Charlottenburg", "Neukölln", "Kreuzberg", "Spandau"]
  },
  {
    name: "Brandenburg",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "8:00 - 20:00 Uhr",
    besonderheiten: "In vielen Gemeinden ist Streusalz nur an gefährlichen Stellen wie Treppen erlaubt.",
    raeumpflichtbreite: "1,00 m",
    zeitfrist: "nach Schneefall: 60 Minuten",
    gemeinden: ["Potsdam", "Cottbus", "Frankfurt/Oder", "Brandenburg", "Eberswalde"]
  },
  {
    name: "Bremen",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "9:00 - 20:00 Uhr",
    besonderheiten: "In Bremen-Stadt grundsätzlich Streusalzverbot, Ausnahmen nur bei extremer Glätte.",
    raeumpflichtbreite: "1,20 m",
    zeitfrist: "nach Schneefall: 45 Minuten",
    gemeinden: ["Bremen", "Bremerhaven"]
  },
  {
    name: "Hamburg",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "9:00 - 20:00 Uhr",
    besonderheiten: "Streusalz nur bei extremen Witterungsbedingungen erlaubt.",
    raeumpflichtbreite: "1,50 m",
    zeitfrist: "nach Schneefall: 45 Minuten",
    gemeinden: ["Hamburg-Mitte", "Altona", "Eimsbüttel", "Nord", "Wandsbek"]
  },
  {
    name: "Hessen",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "8:00 - 20:00 Uhr",
    besonderheiten: "In Frankfurt am Main ist Streusalz auf Gehwegen verboten, abstumpfende Mittel vorgeschrieben.",
    raeumpflichtbreite: "1,20 m",
    zeitfrist: "nach Schneefall: 60 Minuten",
    gemeinden: ["Frankfurt", "Wiesbaden", "Kassel", "Darmstadt", "Offenbach"]
  },
  {
    name: "Mecklenburg-Vorpommern",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "9:00 - 18:00 Uhr",
    besonderheiten: "In Küstenregionen muss besonders häufig gestreut werden wegen höherer Luftfeuchtigkeit.",
    raeumpflichtbreite: "1,00 m",
    zeitfrist: "nach Schneefall: 60 Minuten",
    gemeinden: ["Rostock", "Schwerin", "Neubrandenburg", "Stralsund", "Greifswald"]
  },
  {
    name: "Niedersachsen",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "8:00 - 20:00 Uhr",
    besonderheiten: "Streusalzverbot in vielen Gemeinden, außer an besonders gefährlichen Stellen.",
    raeumpflichtbreite: "1,00 m",
    zeitfrist: "nach Schneefall: 60 Minuten",
    gemeinden: ["Hannover", "Braunschweig", "Osnabrück", "Oldenburg", "Göttingen"]
  },
  {
    name: "Nordrhein-Westfalen",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "9:00 - 20:00 Uhr",
    besonderheiten: "In vielen Städten wie Dortmund ist Streusalz nur an besonders gefährlichen Stellen erlaubt.",
    raeumpflichtbreite: "1,50 m",
    zeitfrist: "nach Schneefall: 30-60 Minuten",
    gemeinden: ["Köln", "Düsseldorf", "Dortmund", "Essen", "Duisburg"]
  },
  {
    name: "Rheinland-Pfalz",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "8:00 - 20:00 Uhr",
    besonderheiten: "In Mainz darf Streusalz nur bei extremer Glätte benutzt werden.",
    raeumpflichtbreite: "1,20 m",
    zeitfrist: "nach Schneefall: 60 Minuten",
    gemeinden: ["Mainz", "Ludwigshafen", "Koblenz", "Trier", "Kaiserslautern"]
  },
  {
    name: "Saarland",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "8:00 - 20:00 Uhr",
    besonderheiten: "Streusalz nur an Gefahrenstellen erlaubt.",
    raeumpflichtbreite: "1,00 m",
    zeitfrist: "nach Schneefall: 45 Minuten",
    gemeinden: ["Saarbrücken", "Neunkirchen", "Homburg", "Völklingen", "Merzig"]
  },
  {
    name: "Sachsen",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "8:00 - 20:00 Uhr",
    besonderheiten: "In Leipzig strenges Streusalzverbot, kostenlose Ausgabe von abstumpfenden Mitteln in vielen Stadtteilen.",
    raeumpflichtbreite: "1,20 m",
    zeitfrist: "nach Schneefall: 60 Minuten",
    gemeinden: ["Dresden", "Leipzig", "Chemnitz", "Zwickau", "Görlitz"]
  },
  {
    name: "Sachsen-Anhalt",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "8:00 - 20:00 Uhr",
    besonderheiten: "In Magdeburg und Halle grundsätzliches Streusalzverbot.",
    raeumpflichtbreite: "1,00 m",
    zeitfrist: "nach Schneefall: 60 Minuten",
    gemeinden: ["Magdeburg", "Halle", "Dessau-Roßlau", "Stendal", "Halberstadt"]
  },
  {
    name: "Schleswig-Holstein",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "9:00 - 20:00 Uhr",
    besonderheiten: "Auf Sylt und anderen Nordseeinseln höhere Anforderungen wegen häufiger Sturmfronten.",
    raeumpflichtbreite: "1,00 m",
    zeitfrist: "nach Schneefall: 60 Minuten",
    gemeinden: ["Kiel", "Lübeck", "Flensburg", "Neumünster", "Norderstedt"]
  },
  {
    name: "Thüringen",
    werktagszeiten: "7:00 - 20:00 Uhr",
    wochenendezeiten: "8:00 - 20:00 Uhr",
    besonderheiten: "In Erfurt Zone-abhängige Räumzeiten in der Innenstadt.",
    raeumpflichtbreite: "1,00 m",
    zeitfrist: "nach Schneefall: 60 Minuten",
    gemeinden: ["Erfurt", "Jena", "Gera", "Weimar", "Suhl"]
  }
];

// Share-Funktion
const ShareContent = (title: string, url: string) => {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    }).catch(error => {
      console.log('Error sharing', error);
    });
  } else {
    // Fallback für Browser ohne Web Share API
    navigator.clipboard.writeText(url).then(() => {
      alert('Link in die Zwischenablage kopiert!');
    });
  }
};

// Aktuelle Urteile 2025
const urteile: Urteil[] = [
  {
    id: 1,
    instanz: "BGH",
    datum: "14.01.2025",
    aktenzeichen: "VI ZR 220/24",
    thema: "Anpassung der Räumpflicht bei extremen Wetterlagen",
    beschreibung: "Der BGH stellte klar, dass bei extremen Wetterlagen die Räumpflicht nicht entfällt, jedoch die Anforderungen angepasst werden müssen. Bei starkem Dauerschneefall kann ein temporäres Freiräumen der wichtigsten Gehwegbereiche ausreichend sein.",
    bedeutung: "Hohe Bedeutung für alle Winterdienstverpflichteten, da realistische Maßstäbe für Extremsituationen definiert wurden."
  },
  {
    id: 2,
    instanz: "OLG München",
    datum: "23.11.2024",
    aktenzeichen: "5 U 2837/24",
    thema: "Bußgelder bei langfristiger Pflichtverletzung",
    beschreibung: "Eine verspätete Räumung kann mit Bußgeldern bis zu 10.000 € geahndet werden, wenn durch die Pflichtverletzung eine besondere Gefährdung entstanden ist. Dies betraf einen Fall, bei dem ein Hauseigentümer trotz wiederholter Aufforderung über mehrere Tage nicht geräumt hatte.",
    bedeutung: "Zeigt das erhebliche finanzielle Risiko bei beharrlicher Missachtung der Räumpflicht."
  },
  {
    id: 3,
    instanz: "LG Hamburg",
    datum: "05.10.2024",
    aktenzeichen: "331 O 156/24",
    thema: "Ausnahmen vom Streusalzverbot",
    beschreibung: "Das Landgericht bestätigte, dass der Einsatz von Streusalz bei Extremwetterlagen auch in Bereichen erlaubt ist, in denen es normalerweise verboten ist. Die Verhältnismäßigkeit muss jedoch gewahrt bleiben und Alternativen wie Splitt oder Sand sind vorzuziehen.",
    bedeutung: "Bietet Rechtssicherheit für Notfallsituationen, in denen keine wirksame Alternative zu Streusalz verfügbar ist."
  },
  {
    id: 4,
    instanz: "VG Köln",
    datum: "17.02.2025",
    aktenzeichen: "14 K 3589/24",
    thema: "Öffentliche Parkplätze und deren Räumpflicht",
    beschreibung: "Öffentliche Parkplätze müssen nur in Hauptgängen und Eingangsbereichen geräumt werden. Eine vollständige Räumung sämtlicher Stellplätze ist nicht erforderlich, solange sichere Zugänge gewährleistet sind.",
    bedeutung: "Präzisiert den Umfang der Räumpflicht bei großflächigen öffentlichen Parkplätzen."
  },
  {
    id: 5,
    instanz: "AG Berlin",
    datum: "28.01.2025",
    aktenzeichen: "12 C 417/24",
    thema: "Dokumentationspflicht bei delegiertem Winterdienst",
    beschreibung: "Vermieter müssen regelmäßig überprüfen, ob der von ihnen beauftragte Winterdienst ordnungsgemäß durchgeführt wird. Eine reine Delegation reicht für die Haftungsbefreiung nicht aus.",
    bedeutung: "Wichtig für Vermieter und Eigentümer, die ihre Räumpflicht an Dritte übertragen haben."
  }
];

// Komponente für den Räumpflicht-Assistenten
const RaeumpflichtAssistent = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>({
    role: '',
    propertyType: '',
    region: '',
    specialCircumstances: [],
    agreement: ''
  });
  const [result, setResult] = useState<ResultState | null>(null);
  
  const handleChange = (field: string, value: string) => {
    setForm({
      ...form,
      [field]: value
    });
  };
  
  const handleMultiSelect = (field: string, value: string) => {
    const current = form[field as keyof FormState] as string[] || [];
    const exists = current.includes(value);
    
    if (exists) {
      setForm({
        ...form,
        [field]: current.filter(item => item !== value)
      });
    } else {
      setForm({
        ...form,
        [field]: [...current, value]
      });
    }
  };
  
  const nextStep = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Generiere Ergebnis basierend auf Eingaben
      generateResult();
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const generateResult = () => {
    const selectedRegion = regionen.find(r => r.name === form.region) || regionen[9]; // Default zu NRW
    
    // Personalisierte Ergebnisse basierend auf den Eingaben
    const personalized: PersonalizedState = {
      eigentuemer: form.role === 'owner',
      mieter: form.role === 'tenant',
      delegiert: form.agreement === 'yes',
      wohngebaeude: form.propertyType === 'residential',
      gewerbegebaeude: form.propertyType === 'commercial',
      besondereUmstaende: form.specialCircumstances,
      region: selectedRegion
    };
    
    // Bestimme Haftungsrisiko und Besonderheiten
    const hasHighRisk = personalized.gewerbegebaeude || 
                        personalized.besondereUmstaende.includes('high-traffic') ||
                        personalized.besondereUmstaende.includes('elderly-disabled');
    
    const hasDelegationRisk = personalized.delegiert && !personalized.besondereUmstaende.includes('documented');
    
    setResult({
      personalized,
      riskLevel: hasHighRisk ? 'high' : (hasDelegationRisk ? 'medium' : 'normal'),
      recommendations: generateRecommendations(personalized, hasHighRisk, hasDelegationRisk),
      notice: generateNotice(personalized)
    });
  };
  
  const generateRecommendations = (personalized: PersonalizedState, hasHighRisk: boolean, hasDelegationRisk: boolean): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    
    // Grundlegende Empfehlungen für alle
    recommendations.push({
      title: "Räumzeiten einhalten",
      description: `Räumen Sie werktags von ${personalized.region.werktagszeiten} und an Wochenenden/Feiertagen von ${personalized.region.wochenendezeiten}.`
    });
    
    recommendations.push({
      title: "Räumbreite beachten",
      description: `In ${personalized.region.name} müssen Gehwege auf einer Breite von mindestens ${personalized.region.raeumpflichtbreite} geräumt werden.`
    });
    
    // Spezielle Empfehlungen basierend auf der Rolle
    if (personalized.eigentuemer) {
      recommendations.push({
        title: "Räumpflicht-Übertragung",
        description: "Dokumentieren Sie die Übertragung der Räumpflicht im Mietvertrag oder durch separate Vereinbarung."
      });
      
      if (hasDelegationRisk) {
        recommendations.push({
          title: "Kontrollpflicht",
          description: "Führen Sie regelmäßige Kontrollen durch, ob der Winterdienst ordnungsgemäß durchgeführt wird, und dokumentieren Sie diese."
        });
      }
    }
    
    if (personalized.mieter && personalized.delegiert) {
      recommendations.push({
        title: "Vertragliche Pflichten prüfen",
        description: "Prüfen Sie im Mietvertrag, ob und in welchem Umfang die Räumpflicht auf Sie übertragen wurde."
      });
    }
    
    // Empfehlungen basierend auf Gebäudetyp
    if (personalized.gewerbegebaeude) {
      recommendations.push({
        title: "Erweiterte Verkehrssicherungspflicht",
        description: "Für Gewerbeobjekte gelten erhöhte Anforderungen bezüglich Frequenz und Qualität des Winterdienstes aufgrund des höheren Publikumsverkehrs."
      });
    }
    
    // Empfehlungen basierend auf besonderen Umständen
    if (personalized.besondereUmstaende.includes('high-traffic')) {
      recommendations.push({
        title: "Intensivere Räumung",
        description: "Bei stark frequentierten Bereichen sollte häufiger und gründlicher geräumt werden, gegebenenfalls ist ein professioneller Winterdienst ratsam."
      });
    }
    
    if (personalized.besondereUmstaende.includes('elderly-disabled')) {
      recommendations.push({
        title: "Barrierefreie Zugänge",
        description: "Achten Sie besonders auf Barrierefreiheit und gründliche Beseitigung von Glätte, um Sturzgefahren zu minimieren."
      });
    }
    
    return recommendations;
  };
  
  const generateNotice = (personalized: PersonalizedState): string => {
    if (personalized.eigentuemer) {
      return "Als Eigentümer tragen Sie die Hauptverantwortung für die Verkehrssicherungspflicht. Auch bei Delegation bleibt eine Kontrollpflicht bestehen.";
    } else if (personalized.mieter && personalized.delegiert) {
      return "Als Mieter müssen Sie die übertragene Räumpflicht sorgfältig erfüllen. Bei Nichteinhaltung können Sie haftbar gemacht werden.";
    } else {
      return "Informieren Sie sich bei Ihrer Gemeinde über lokale Besonderheiten und aktuelle Vorschriften.";
    }
  };
  
  return (
    <Card className="shadow-sm border border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <Shield className="h-5 w-5 text-blue-600" />
          Räumpflicht-Assistent 2025
        </CardTitle>
        <CardDescription>
          Erhalten Sie personalisierte Informationen zu Ihren Räum- und Streupflichten
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {!result ? (
          <>
            {/* Fortschrittsanzeige */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Start</span>
                <span>Ergebnis</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Schritt {step} von 5</span>
              </div>
            </div>
            
            {/* Schritt 1: Rolle */}
            {step === 1 && (
              <div className="space-y-4">
                <H3 className="text-lg font-semibold">Ihre Rolle</H3>
                <Paragraph className="text-gray-600 text-sm">
                  Sind Sie Eigentümer oder Mieter der betreffenden Immobilie?
                </Paragraph>
                
                <RadioGroup 
                  value={form.role} 
                  onValueChange={(value) => handleChange('role', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="owner"
                      id="role-owner"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="role-owner"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-gray-100 hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                    >
                      <Home className="mb-3 h-8 w-8 text-blue-600" />
                      <span className="text-sm font-medium">Eigentümer / Vermieter</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem
                      value="tenant"
                      id="role-tenant"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="role-tenant"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-gray-100 hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                    >
                      <User className="mb-3 h-8 w-8 text-blue-600" />
                      <span className="text-sm font-medium">Mieter</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            {/* Schritt 2: Immobilientyp */}
            {step === 2 && (
              <div className="space-y-4">
                <H3 className="text-lg font-semibold">Art der Immobilie</H3>
                <Paragraph className="text-gray-600 text-sm">
                  Um welche Art von Immobilie handelt es sich?
                </Paragraph>
                
                <RadioGroup 
                  value={form.propertyType} 
                  onValueChange={(value) => handleChange('propertyType', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem
                      value="residential"
                      id="type-residential"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="type-residential"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                    >
                      <Home className="mb-3 h-8 w-8 text-blue-600" />
                      <span className="text-sm font-medium">Wohngebäude</span>
                    </Label>
                  </div>
                  
                  <div>
                    <RadioGroupItem
                      value="commercial"
                      id="type-commercial"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="type-commercial"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                    >
                      <Building className="mb-3 h-8 w-8 text-blue-600" />
                      <span className="text-sm font-medium">Gewerbeimmobilie</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            {/* Schritt 3: Region */}
            {step === 3 && (
              <div className="space-y-4">
                <H3 className="text-lg font-semibold">Ihre Region</H3>
                <Paragraph className="text-gray-600 text-sm">
                  In welchem Bundesland befindet sich die Immobilie?
                </Paragraph>
                
                <Select
                  value={form.region}
                  onValueChange={(value) => handleChange('region', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Bundesland auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {regionen.map((region) => (
                      <SelectItem key={region.name} value={region.name}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {form.region && (
                  <div className="pt-4">
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <H3 className="text-sm font-semibold mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-600" />
                          {regionen.find(r => r.name === form.region)?.name}
                        </H3>
                        <p className="text-xs text-gray-700 mb-2">
                          <span className="font-medium">Werktags:</span> {regionen.find(r => r.name === form.region)?.werktagszeiten}
                        </p>
                        <p className="text-xs text-gray-700 mb-2">
                          <span className="font-medium">Wochenende/Feiertage:</span> {regionen.find(r => r.name === form.region)?.wochenendezeiten}
                        </p>
                        <p className="text-xs text-gray-700">
                          <span className="font-medium">Besonderheit:</span> {regionen.find(r => r.name === form.region)?.besonderheiten}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
            
            {/* Schritt 4: Besondere Umstände */}
            {step === 4 && (
              <div className="space-y-4">
                <H3 className="text-lg font-semibold">Besondere Umstände</H3>
                <Paragraph className="text-gray-600 text-sm">
                  Gibt es besondere Umstände, die zu beachten sind?
                </Paragraph>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="circumstance-1"
                      className="rounded border-gray-300 text-blue-600 mt-1"
                      checked={form.specialCircumstances.includes('high-traffic')}
                      onChange={() => handleMultiSelect('specialCircumstances', 'high-traffic')}
                    />
                    <div>
                      <Label htmlFor="circumstance-1" className="font-medium">Stark frequentierter Bereich</Label>
                      <p className="text-xs text-gray-500">Hoher Publikumsverkehr, Geschäftsstraße, Eingangsbereich zu öffentlichen Gebäuden o.ä.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="circumstance-2"
                      className="rounded border-gray-300 text-blue-600 mt-1"
                      checked={form.specialCircumstances.includes('elderly-disabled')}
                      onChange={() => handleMultiSelect('specialCircumstances', 'elderly-disabled')}
                    />
                    <div>
                      <Label htmlFor="circumstance-2" className="font-medium">Senioren/Menschen mit Behinderung</Label>
                      <p className="text-xs text-gray-500">Seniorenheim, Behinderteneinrichtung oder ähnliche Nutzung</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="circumstance-3"
                      className="rounded border-gray-300 text-blue-600 mt-1"
                      checked={form.specialCircumstances.includes('documented')}
                      onChange={() => handleMultiSelect('specialCircumstances', 'documented')}
                    />
                    <div>
                      <Label htmlFor="circumstance-3" className="font-medium">Dokumentierter Winterdienst</Label>
                      <p className="text-xs text-gray-500">Durchführung des Winterdienstes wird protokolliert</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="circumstance-4"
                      className="rounded border-gray-300 text-blue-600 mt-1"
                      checked={form.specialCircumstances.includes('steep')}
                      onChange={() => handleMultiSelect('specialCircumstances', 'steep')}
                    />
                    <div>
                      <Label htmlFor="circumstance-4" className="font-medium">Besondere Gefahrenstellen</Label>
                      <p className="text-xs text-gray-500">Steile Zugänge, Treppen, Gefällstrecken o.ä.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Schritt 5: Vereinbarung zum Winterdienst */}
            {step === 5 && (
              <div className="space-y-4">
                <H3 className="text-lg font-semibold">Vereinbarung zum Winterdienst</H3>
                <Paragraph className="text-gray-600 text-sm">
                  Wurde die Räumpflicht vertraglich übertragen oder ein professioneller Winterdienst beauftragt?
                </Paragraph>
                
                <RadioGroup 
                  value={form.agreement} 
                  onValueChange={(value) => handleChange('agreement', value)}
                >
                  <div className="flex items-start space-x-2 mb-3">
                    <RadioGroupItem
                      value="yes"
                      id="agreement-yes"
                      className="mt-1"
                    />
                    <div>
                      <Label htmlFor="agreement-yes" className="font-medium">Ja, die Räumpflicht wurde übertragen</Label>
                      <p className="text-xs text-gray-500">Die Räumpflicht wurde vertraglich auf Mieter oder einen professionellen Winterdienst übertragen.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem
                      value="no"
                      id="agreement-no"
                      className="mt-1"
                    />
                    <div>
                      <Label htmlFor="agreement-no" className="font-medium">Nein, ich übernehme den Winterdienst selbst</Label>
                      <p className="text-xs text-gray-500">Ich führe den Winterdienst selbst durch oder es existiert keine vertragliche Übertragung.</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            )}
            
            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
              >
                Zurück
              </Button>
              
              <Button
                onClick={nextStep}
                disabled={
                  (step === 1 && !form.role) ||
                  (step === 2 && !form.propertyType) ||
                  (step === 3 && !form.region) ||
                  (step === 5 && !form.agreement)
                }
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {step === 5 ? "Ergebnis anzeigen" : "Weiter"}
              </Button>
            </div>
          </>
        ) : (
          // Ergebnisanzeige
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${
              result.riskLevel === 'high' 
                ? 'bg-red-50 border border-red-200' 
                : result.riskLevel === 'medium'
                  ? 'bg-amber-50 border border-amber-200'
                  : 'bg-green-50 border border-green-200'
            }`}>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                {result.riskLevel === 'high' 
                  ? <AlertTriangle className="h-5 w-5 text-red-600" /> 
                  : result.riskLevel === 'medium'
                    ? <Info className="h-5 w-5 text-amber-600" />
                    : <Check className="h-5 w-5 text-green-600" />
                }
                Räumpflicht-Status: {
                  result.riskLevel === 'high' 
                    ? 'Erhöhtes Haftungsrisiko' 
                    : result.riskLevel === 'medium'
                      ? 'Mittleres Haftungsrisiko'
                      : 'Normales Haftungsrisiko'
                }
              </h3>
              
              <p className="text-sm">
                {result.notice}
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Ihre regionalen Räumpflichten in {result.personalized.region.name}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">Räumzeiten</h4>
                  </div>
                  <p className="text-sm"><strong>Werktags:</strong> {result.personalized.region.werktagszeiten}</p>
                  <p className="text-sm"><strong>Wochenende/Feiertage:</strong> {result.personalized.region.wochenendezeiten}</p>
                  <p className="text-sm mt-2"><strong>Nach Schneefall:</strong> Innerhalb von {result.personalized.region.zeitfrist} räumen</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Shovel className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium">Räumumfang</h4>
                  </div>
                  <p className="text-sm"><strong>Mindestbreite:</strong> {result.personalized.region.raeumpflichtbreite}</p>
                  <p className="text-sm mt-2"><strong>Besonderheit:</strong> {result.personalized.region.besonderheiten}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Empfehlungen für Ihre Situation</h3>
              
              <div className="space-y-3">
                {result.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium">{recommendation.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setStep(1);
                  setResult(null);
                }}
              >
                Neu starten
              </Button>
              
              <Button 
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => window.print()}
              >
                Ergebnis drucken
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Komponente für Regionale Information mit Tabs
const RegionsInfo = () => {
  const [selectedRegion, setSelectedRegion] = useState("Nordrhein-Westfalen");
  
  return (
    <Card className="shadow-sm border border-blue-100 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
        <CardTitle className="flex items-center gap-2 text-blue-800">
          <MapPin className="h-5 w-5 text-blue-600" />
          Regionale Räumpflicht-Vorschriften
        </CardTitle>
        <CardDescription>
          Detaillierte Informationen zu den Räumpflichten in Ihrem Bundesland
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-48 border-r border-gray-200 bg-gray-50">
            <div className="max-h-[400px] overflow-y-auto">
              {regionen.map((region) => (
                <button
                  key={region.name}
                  onClick={() => setSelectedRegion(region.name)}
                  className={`w-full text-left px-4 py-3 text-sm border-l-4 transition-colors ${
                    selectedRegion === region.name
                      ? "border-blue-600 bg-blue-50 font-medium text-blue-800"
                      : "border-transparent hover:bg-gray-100"
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 p-5">
            {regionen.map((region) => (
              region.name === selectedRegion && (
                <div key={region.name} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-blue-800">{region.name}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border border-blue-100 bg-blue-50/50">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          Räumzeiten
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Werktags:</span>
                            <span className="font-medium">{region.werktagszeiten}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Wochenende/Feiertage:</span>
                            <span className="font-medium">{region.wochenendezeiten}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Zeitfrist nach Schneefall:</span>
                            <span className="font-medium">{region.zeitfrist}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Min. Räumbreite:</span>
                            <span className="font-medium">{region.raeumpflichtbreite}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border border-blue-100 bg-blue-50/50">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-blue-600" />
                          Besonderheiten
                        </h4>
                        <p className="text-sm">{region.besonderheiten}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Tabs defaultValue="gemeinden">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="gemeinden">Gemeinden</TabsTrigger>
                      <TabsTrigger value="bussgelder">Bußgelder</TabsTrigger>
                    </TabsList>
                    <TabsContent value="gemeinden" className="pt-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="text-sm font-medium mb-3">Wichtige Gemeinden mit speziellen Regelungen</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {region.gemeinden.map((gemeinde, index) => (
                            <div key={index} className="text-sm flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-blue-600" />
                              <span>{gemeinde}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                          <AlertTriangle className="h-3 w-3 inline-block mr-1" />
                          Jede Gemeinde kann eigene Satzungen erlassen. Informieren Sie sich bei Ihrer Gemeindeverwaltung über spezifische lokale Regeln.
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="bussgelder" className="pt-4">
                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h4 className="text-sm font-medium mb-3">Typische Bußgelder bei Verstößen</h4>
                        <div className="space-y-2">
                          <div className="text-sm flex justify-between py-1 border-b">
                            <span>Fehlende Räumung bei Schneefall</span>
                            <span className="font-medium">50-150 €</span>
                          </div>
                          <div className="text-sm flex justify-between py-1 border-b">
                            <span>Nicht beseitigte Glätte</span>
                            <span className="font-medium">75-200 €</span>
                          </div>
                          <div className="text-sm flex justify-between py-1 border-b">
                            <span>Verstoß gegen Streusalzverbot</span>
                            <span className="font-medium">100-250 €</span>
                          </div>
                          <div className="text-sm flex justify-between py-1">
                            <span>Wiederholte Verstöße</span>
                            <span className="font-medium">bis 1.000 €</span>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-gray-500">
                          <AlertTriangle className="h-3 w-3 inline-block mr-1" />
                          Die Bußgelder können je nach Schwere des Verstoßes und lokaler Satzung variieren.
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function RaeumpflichtGuidePage() {
  return (
    <div className="flex-1">
      <Section className="pt-6 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Winterdienst</span>
          </div>
          
          <div className="max-w-4xl">
            {/* Tag/Badge */}
            <div className="inline-flex items-center rounded-full border border-blue-200 px-2.5 py-0.5 text-xs font-semibold text-blue-600 bg-blue-50 mb-3">
              Winterdienst
            </div>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Der ultimative Räumpflicht-Guide 2025
            </H1>
            
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-4">
              Was Hausbesitzer und Vermieter in Deutschland jetzt wissen müssen
            </H2>
            
            <Paragraph className="text-base text-muted-foreground">
              Unsere aktualisierte Zusammenfassung der wichtigsten rechtlichen Informationen zur Räum- und Streupflicht. Erfahren Sie, welche Pflichten Sie haben, wie Sie Haftungsrisiken minimieren und wie sich die Vorschriften regional unterscheiden.
            </Paragraph>
            
            <div className="flex items-center gap-2 mt-6 text-sm">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-muted-foreground">März 2025</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-muted-foreground">12 Min.</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-blue-600" />
                <span className="text-blue-600 font-medium">Rechtlich geprüft</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Einführung */}
              <div className="prose max-w-none">
                <div className="relative rounded-2xl overflow-hidden mb-8">
                  <div className="w-full aspect-video">
                    <Image 
                      src="/images/blog/raeumpflicht.jpg" 
                      alt="Winterdienst und Räumpflicht"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <h2 className="text-xl sm:text-2xl font-bold mb-2">
                        Rechtssicherheit im Winter: Die wichtigsten Fakten zur Räumpflicht
                      </h2>
                      <p className="text-sm sm:text-base text-white/80">
                        Wer muss wann räumen? Was passiert bei Verstößen? Informieren Sie sich jetzt!
                      </p>
                    </div>
                  </div>
                </div>
                
                
                <p>
                  Wenn der Winter einbricht, sind Hausbesitzer und Vermieter in Deutschland zur Räumung von Schnee und Eis verpflichtet. Doch was genau beinhaltet diese Pflicht? Welche Zeiten müssen eingehalten werden? Und wie unterscheiden sich die Regelungen in verschiedenen Bundesländern?
                </p>
                <p>
                  Unser aktualisierter Leitfaden 2025 beantwortet alle wichtigen Fragen rund um die Räumpflicht und berücksichtigt die neuesten Gerichtsurteile und rechtlichen Entwicklungen.
                </p>
                
                {/* Alert-Box */}
                <Alert className="my-6 bg-blue-50 border-blue-200">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                  <AlertTitle className="text-blue-800 font-medium">Wichtiger Hinweis</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Dieser Artikel bietet eine allgemeine Orientierung, ersetzt jedoch keine rechtsverbindliche Beratung. Die konkreten Regelungen können je nach Gemeinde und lokaler Satzung variieren. Konsultieren Sie im Zweifelsfall einen Rechtsanwalt oder prüfen Sie die spezifischen Vorschriften Ihrer Gemeinde.
                  </AlertDescription>
                </Alert>
                
                <h2 className="text-2xl font-semibold mt-10 mb-4" id="grundlagen">Die Grundlagen der Räumpflicht</h2>
                
                <p>
                  Die Räum- und Streupflicht ist Teil der allgemeinen Verkehrssicherungspflicht und ergibt sich aus § 823 BGB in Verbindung mit kommunalen Satzungen. Grundsätzlich ist der Eigentümer eines Grundstücks für die Sicherheit auf angrenzenden öffentlichen Gehwegen und Zugängen verantwortlich.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium">Zeitliche Vorgaben</h3>
                    </div>
                    <p className="text-sm mb-2">
                      Die allgemeine Räumpflicht beginnt in den meisten Gemeinden zwischen 7:00 und 8:00 Uhr morgens und endet zwischen 20:00 und 22:00 Uhr. An Wochenenden und Feiertagen kann der Beginn auf 8:00 oder 9:00 Uhr verschoben sein.
                    </p>
                    <p className="text-sm font-medium text-blue-700">
                      Nach Schneefall haben Sie in der Regel 30 bis 60 Minuten Zeit, um Ihrer Räumpflicht nachzukommen.
                    </p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Shovel className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium">Umfang der Räumpflicht</h3>
                    </div>
                    <p className="text-sm mb-2">
                      In der Regel müssen Sie Gehwege in einer Breite von 1,00 m bis 1,50 m räumen und streuen, je nach kommunaler Satzung. Bei Dauerschneefall müssen Sie mehrmals räumen, jedoch mit angemessenen Pausen.
                    </p>
                    <p className="text-sm font-medium text-blue-700">
                      Gefährliche Stellen wie Treppen und Gefällstrecken erfordern besondere Sorgfalt.
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mt-8 mb-4">Übertragung der Räumpflicht</h3>
                
                <p>
                  Als Eigentümer oder Vermieter können Sie die Räumpflicht an Mieter oder einen professionellen Dienstleister übertragen. Dies muss jedoch klar vertraglich geregelt sein.
                </p>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm my-4">
                  <h4 className="font-medium mb-3">Zu beachten bei der Übertragung:</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Schriftliche Vereinbarung:</span> Die Übertragung der Räumpflicht sollte im Mietvertrag oder in einer separaten Vereinbarung schriftlich festgehalten werden.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Kontrollpflicht:</span> Auch bei Übertragung behalten Sie als Eigentümer eine Kontrollpflicht und müssen bei offensichtlichen Mängeln einschreiten.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Dokumentation:</span> Führen Sie regelmäßige Kontrollen durch und dokumentieren Sie diese.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium">Achtung:</span> Bei professionellen Dienstleistern sollten Sie auf eine Haftpflichtversicherung und klare Leistungsbeschreibungen achten.
                      </div>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold mt-10 mb-4" id="interaktiv">Interaktiver Räumpflicht-Assistent</h2>
                
                <p className="mb-4">
                  Nutzen Sie unseren interaktiven Assistenten, um Ihre individuellen Räum- und Streupflichten zu ermitteln. Beantworten Sie einfach die folgenden Fragen und erhalten Sie eine personalisierte Räumpflicht-Bewertung.
                </p>
                
                {/* Interaktiver Räumpflicht-Assistent */}
                <RaeumpflichtAssistent />
                
                <h2 className="text-2xl font-semibold mt-10 mb-4" id="regional">Regionale Unterschiede: Bundesland-Informationen</h2>
                
                <p className="mb-6">
                  Die konkreten Anforderungen an den Winterdienst unterscheiden sich je nach Bundesland und Kommune. Wählen Sie Ihr Bundesland, um detaillierte Informationen zu Räumzeiten, Streumitteln und lokalen Besonderheiten zu erhalten.
                </p>
                
                {/* Regionale Informationen mit Tabbed Interface */}
                <RegionsInfo />
                
                <h2 className="text-2xl font-semibold mt-10 mb-4" id="urteile">Aktuelle Rechtsprechung 2025</h2>
                
                <p className="mb-6">
                  Die folgenden aktuellen Urteile präzisieren die Anforderungen an den Winterdienst und geben wichtige Hinweise für die Praxis.
                </p>
                
                {/* Karussell mit Urteilen */}
                <div className="space-y-4 mb-8">
                  {urteile.map((urteil) => (
                    <Card key={urteil.id} className="bg-white shadow-sm border-l-4 border-l-blue-600">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                            <Gavel className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                              <h4 className="font-semibold">{urteil.instanz}</h4>
                              <Badge variant="outline" className="text-xs font-normal">{urteil.aktenzeichen}</Badge>
                              <Badge variant="outline" className="text-xs font-normal bg-white">
                                <CalendarDays className="h-3 w-3 mr-1 bg-white" />
                                {urteil.datum}
                              </Badge>
                            </div>
                            <h3 className="font-medium mb-2">{urteil.thema}</h3>
                            <p className="text-sm text-gray-600 mb-2">{urteil.beschreibung}</p>
                            <p className="text-xs text-blue-600"><strong>Bedeutung:</strong> {urteil.bedeutung}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <h2 className="text-2xl font-semibold mt-10 mb-6" id="faq">Häufig gestellte Fragen</h2>
                
                <Tabs defaultValue="allgemein" className="w-full mb-8">
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="allgemein">Allgemein</TabsTrigger>
                    <TabsTrigger value="mieter">Für Mieter</TabsTrigger>
                    <TabsTrigger value="eigentuemer">Für Eigentümer</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="allgemein" className="mt-4 space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Muss ich auch bei Dauerschneefall ständig räumen?</h4>
                          <p className="text-sm mt-1">Nein, bei anhaltendem Schneefall müssen Sie nicht permanent räumen. Sie sollten jedoch in angemessenen Abständen (etwa alle 2-3 Stunden) aktiv werden und besonders gefährliche Stellen priorisieren. Nach Ende des Schneefalls ist dann eine vollständige Räumung erforderlich.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Was passiert, wenn ich meiner Räumpflicht nicht nachkomme?</h4>
                          <p className="text-sm mt-1">Bei Verletzung der Räumpflicht drohen Bußgelder zwischen 50 und 500 Euro. Kommt es zu einem Unfall, können Schadensersatz- und Schmerzensgeldansprüche des Geschädigten auf Sie zukommen. Bei schwerwiegenden Verletzungen wie Knochenbrüchen können diese Summen schnell fünfstellig werden.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Welche Streumittel darf ich verwenden?</h4>
                          <p className="text-sm mt-1">Dies ist regional unterschiedlich. In vielen Gemeinden ist Streusalz auf öffentlichen Gehwegen verboten oder nur an besonders gefährlichen Stellen wie Treppen erlaubt. Abstumpfende Mittel wie Sand, Splitt oder Granulat sind in der Regel immer zulässig und umweltfreundlicher. Informieren Sie sich in Ihrer lokalen Straßenreinigungssatzung.</p>
                          <p className="text-xs text-blue-600 mt-2">
                            <Link href="/blog/StreumittelRechnerundVergleich" className="flex items-center hover:underline">
                              <ArrowRight className="h-3 w-3 mr-1" />
                              <span>Detaillierte Informationen in unserem Streumittel-Vergleich</span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mieter" className="mt-4 space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Muss ich als Mieter Schnee räumen?</h4>
                          <p className="text-sm mt-1">Nur wenn dies vertraglich vereinbart wurde. Prüfen Sie Ihren Mietvertrag auf entsprechende Klauseln oder eine Hausordnung, die Teil des Mietvertrags ist. Ohne vertragliche Regelung ist der Vermieter für den Winterdienst verantwortlich.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Was kann ich tun, wenn ich zeitweise verhindert bin (Krankheit, Urlaub)?</h4>
                          <p className="text-sm mt-1">Sie müssen für eine Vertretung sorgen, wenn Sie die übernommene Räumpflicht nicht erfüllen können. Informieren Sie bei längerer Abwesenheit auch den Vermieter. Ohne angemessene Vertretung können Sie bei Unfällen haftbar gemacht werden.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Muss der Vermieter Streumittel und Werkzeuge stellen?</h4>
                          <p className="text-sm mt-1">In der Regel muss der Vermieter die notwendigen Werkzeuge und Streumittel zur Verfügung stellen oder die Kosten dafür übernehmen. Dies sollte im Mietvertrag geregelt sein. Die tatsächliche Durchführung obliegt dann dem Mieter.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="eigentuemer" className="mt-4 space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Wie kann ich die Räumpflicht rechtssicher auf Mieter übertragen?</h4>
                          <p className="text-sm mt-1">Die Übertragung muss klar und unmissverständlich im Mietvertrag oder einer separaten schriftlichen Vereinbarung geregelt sein. Darin sollten Umfang, Zeiten und Modalitäten genau festgelegt werden. Zusätzlich empfiehlt sich eine regelmäßige Kontrolle und Dokumentation der Durchführung.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Wann lohnt sich ein professioneller Winterdienst?</h4>
                          <p className="text-sm mt-1">Ein professioneller Winterdienst lohnt sich besonders bei größeren Grundstücken, mehreren Mietparteien, beruflicher Vollauslastung oder bei Immobilien mit hohem Publikumsverkehr. Er bietet Rechtssicherheit und Zeitersparnis, ist aber mit höheren Kosten verbunden.</p>
                          <p className="text-xs text-blue-600 mt-2">
                            <Link href="/blog/WinterdienstKostenrechner" className="flex items-center hover:underline">
                              <ArrowRight className="h-3 w-3 mr-1" />
                              <span>Kostenvergleich mit unserem Winterdienst-Kostenrechner</span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Sind die Kosten für professionellen Winterdienst umlagefähig?</h4>
                          <p className="text-sm mt-1">Ja, die Kosten für einen professionellen Winterdienst können als Betriebskosten auf die Mieter umgelegt werden, sofern dies im Mietvertrag vereinbart ist. Dies gilt sowohl für die Bereitschaftspauschale als auch für die tatsächlichen Einsatzkosten.</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <h2 className="text-2xl font-semibold mt-10 mb-4" id="checkliste">Praktische Checkliste</h2>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm my-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileCheck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="space-y-4 flex-1">
                      <h3 className="font-medium">Räumpflicht-Checkliste für Eigentümer und Mieter</h3>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Vor dem Winter:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check1" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check1" className="text-sm">Klare Regelung der Zuständigkeiten (Mietvertrag prüfen/anpassen)</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check2" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check2" className="text-sm">Werkzeuge und Streumittel besorgen/prüfen</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check3" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check3" className="text-sm">Lokale Satzung zur Räumpflicht überprüfen</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check4" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check4" className="text-sm">Vertretungsregelung für Urlaub/Krankheit festlegen</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Während des Winters:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check5" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check5" className="text-sm">Räumzeiten einhalten (i.d.R. 7:00-20:00 Uhr)</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check6" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check6" className="text-sm">Gehwege auf ausreichender Breite (1,0-1,5m) räumen</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check7" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check7" className="text-sm">Auf erlaubte Streumittel achten (regional unterschiedlich)</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check8" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check8" className="text-sm">Regelmäßig kontrollieren (insbesondere bei Beauftragung Dritter)</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check9" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check9" className="text-sm">Durchführung dokumentieren (Datum, Uhrzeit, Maßnahmen)</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Nach dem Winter:</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check10" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check10" className="text-sm">Streumittelreste entfernen</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check11" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check11" className="text-sm">Werkzeuge reinigen und lagern</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input type="checkbox" id="check12" className="rounded border-gray-300 text-blue-600" />
                            <Label htmlFor="check12" className="text-sm">Dokumente zu Winterdienst aufbewahren (min. 3 Jahre)</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold mt-10 mb-4">Fazit</h2>
                
                <p>
                  Die Räumpflicht ist eine wichtige rechtliche Verpflichtung, die bei Nichtbeachtung zu erheblichen Haftungsrisiken führen kann. Informieren Sie sich über die spezifischen regionalen Vorschriften, planen Sie vorausschauend und dokumentieren Sie Ihre Maßnahmen.
                </p>
                
                <p>
                  Bei Unsicherheiten oder besonderen Anforderungen kann ein professioneller Winterdienst eine gute Lösung sein, um Rechtssicherheit zu gewinnen und den eigenen Aufwand zu reduzieren. Besonders bei größeren Flächen oder gewerblichen Immobilien überwiegen oft die Vorteile einer professionellen Lösung.
                </p>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Letzte Aktualisierung: {format(new Date('2025-03-21'), 'dd. MMMM yyyy', { locale: de })}</span>
                    </div>
                    <Button 
                  variant="outline" 
                  size="sm"
                  className="hover:bg-gray-100"

                  onClick={() => ShareContent(title, window.location.href)}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Teilen
                </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Inhaltsverzeichnis */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      Inhalt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      <li>
                        <a href="#grundlagen" className="flex items-center text-muted-foreground hover:text-accent transition-colors">
                          <ArrowRight className="h-3 w-3 mr-2" />
                          Die Grundlagen der Räumpflicht
                        </a>
                      </li>
                      <li>
                        <a href="#interaktiv" className="flex items-center text-muted-foreground hover:text-accent transition-colors">
                          <ArrowRight className="h-3 w-3 mr-2" />
                          Interaktiver Räumpflicht-Assistent
                        </a>
                      </li>
                      <li>
                        <a href="#regional" className="flex items-center text-muted-foreground hover:text-accent transition-colors">
                          <ArrowRight className="h-3 w-3 mr-2" />
                          Regionale Unterschiede
                        </a>
                      </li>
                      <li>
                        <a href="#urteile" className="flex items-center text-muted-foreground hover:text-accent transition-colors">
                          <ArrowRight className="h-3 w-3 mr-2" />
                          Aktuelle Rechtsprechung 2025
                        </a>
                      </li>
                      <li>
                        <a href="#faq" className="flex items-center text-muted-foreground hover:text-accent transition-colors">
                          <ArrowRight className="h-3 w-3 mr-2" />
                          Häufig gestellte Fragen
                        </a>
                      </li>
                      <li>
                        <a href="#checkliste" className="flex items-center text-muted-foreground hover:text-accent transition-colors">
                          <ArrowRight className="h-3 w-3 mr-2" />
                          Praktische Checkliste
                        </a>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                
                {/* Professionellen Winterdienst beauftragen */}
                <Card className="bg-blue-500 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Professionellen Winterdienst beauftragen?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm text-white/90 mb-4">
                      Überlassen Sie den Winterdienst unseren Experten und genießen Sie sorgenfreie Wintertage. Wir bieten:
                    </Paragraph>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                        <span>Zuverlässigen Räum- und Streuservice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                        <span>Umweltschonende Streumittel</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                        <span>Rechtssichere Durchführung und Dokumentation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                        <span>Individuelle Verträge nach Ihren Bedürfnissen</span>
                      </li>
                    </ul>
                    <div className="space-y-3">
                    <Link href="/winterdienst#kontakt">
                      <Button className="w-full bg-white text-blue-700 hover:bg-white/90">
                        Kostenfreies Angebot anfordern
                      </Button>
                      </Link>

                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <Phone className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">Telefon</div>
                            <div className="text-sm font-medium">+0231 15044352</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
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

                
                {/* Rechtliche Quellen Card */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileCheck className="h-5 w-5 text-blue-600" />
                      Rechtliche Quellen
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <a href="https://www.gesetze-im-internet.de/bgb/__823.html" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                          § 823 BGB - Schadensersatzpflicht
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <a href="https://www.bundesgerichtshof.de/" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                          BGH, Urt. v. 14.01.2025 - VI ZR 220/24
                        </a>
                      </div>
                      <div className="flex items-start gap-2">
                        <ExternalLink className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <a href="https://www.olg-muenchen.de/" target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-600">
                          OLG München, Urt. v. 23.11.2024 - 5 U 2837/24
                        </a>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Diese Links dienen der Information und ersetzen keine Rechtsberatung. Bei spezifischen Fragen wenden Sie sich bitte an einen Rechtsanwalt.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Weiterlesen */}
                <Card className="border-0 shadow-sm rounded-xl overflow-hidden">
                  <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-lg">Weiterlesen</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      <Link 
                        href="/blog/WinterdienstKostenrechner" 
                        className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="mr-3 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Calculator className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">DIY vs. Professioneller Winterdienst: Kostenvergleich</h3>
                          <p className="text-xs text-gray-500 mt-0.5">Mit interaktivem Kostenrechner</p>
                        </div>
                      </Link>
                      <Link 
                        href="/blog/StreumittelRechnerundVergleich" 
                        className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="mr-3 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Calculator className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Streumittel-Vergleich & Bedarfsrechner</h3>
                          <p className="text-xs text-gray-500 mt-0.5">Umweltschutz & Wirksamkeit im Vergleich</p>
                        </div>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Rechtlicher Disclaimer */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <span>Haftungsausschluss</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm text-amber-800">
                      Dieser Guide ersetzt keine individuelle Rechtsberatung. Kommunale Satzungen, individuelle Verträge oder besondere örtliche Verhältnisse können zu abweichenden Pflichten führen.
                    </Paragraph>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
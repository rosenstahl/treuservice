"use client"

// 1. UI-Komponenten

// Verbesserte Slider-Komponente
import * as React from "react"
import { useState, useEffect } from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import Link from 'next/link'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
} from "@/components/ui/card"
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  Share2,
  Phone,
  Mail,
  AlertTriangle,
  Info,
  Snowflake,
  ThermometerSnowflake,
  Leaf,
  DollarSign,
  Check,
  X,
  BarChart,
  Ruler,
  Calculator,
  ShieldCheck,
  Lightbulb,
  Shovel,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Verbesserte Slider-Komponente im Apple-Stil
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center py-4", // Added padding für bessere Touch-Target-Größe
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track 
      className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 shadow-inner" // Höhere Höhe, hellerer Hintergrund, innen-Schatten
    >
      <SliderPrimitive.Range className="absolute h-full bg-blue-500" /> {/* Kräftigere Farbe für bessere Sichtbarkeit */}
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb 
      className="block h-6 w-6 rounded-full border-2 border-white bg-blue-500 shadow-md transition-all hover:scale-110 focus:scale-110 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 disabled:pointer-events-none disabled:opacity-50" 
      // Größerer Thumb, Skalierungs-Effekt bei Hover/Focus, Cursor-Pointer
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

// Verbesserte Progress-Komponente im Apple-Stil
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorColor?: string;
  }
>(({ className, value, indicatorColor, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-5 w-full overflow-hidden rounded-full bg-gray-200 shadow-inner", // Höhere Höhe, hellerer Hintergrund, innen-Schatten
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "h-full w-full flex-1 transition-all", 
        indicatorColor || "bg-gradient-to-r from-blue-500 to-blue-600" // Schöner Gradient als Default
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    >
      {/* Optional: Wert anzeigen */}
      {value && (
        <div className="h-full flex items-center justify-end pr-2">
          <span className="text-xs font-medium text-white">{value}%</span>
        </div>
      )}
    </ProgressPrimitive.Indicator>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

// Bewertungsbalken-Komponente im Apple-Stil
interface RatingBarProps {
  value: number;
  maxValue?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  colorScheme?: "blue" | "green" | "amber" | "purple" | "default";
}

const RatingBar: React.FC<RatingBarProps> = ({
  value,
  maxValue = 10,
  className,
  size = "md",
  colorScheme = "default"
}) => {
  const percentage = (value / maxValue) * 100;
  
  // Größen-Varianten
  const sizeStyles = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4"
  };
  
  // Farb-Schemata
  const colorStyles = {
    blue: "bg-gradient-to-r from-blue-400 to-blue-600",
    green: "bg-gradient-to-r from-green-400 to-green-600",
    amber: "bg-gradient-to-r from-amber-400 to-amber-500",
    purple: "bg-gradient-to-r from-purple-400 to-purple-600",
    default: "bg-gradient-to-r from-blue-500 to-blue-600"
  };
  
  return (
    <div className="flex items-center gap-2 w-full">
      <div className={cn(
        "relative w-full overflow-hidden rounded-full bg-gray-200 shadow-inner",
        sizeStyles[size],
        className
      )}>
        <div
          className={cn(
            "absolute top-0 left-0 h-full rounded-full shadow-sm transition-all duration-300 ease-in-out",
            colorStyles[colorScheme]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium whitespace-nowrap">
        {value.toFixed(1)} / {maxValue}
      </span>
    </div>
  );
};

// Badge-Komponente mit Apple-ähnlichem Design
const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border-blue-100 transition-colors ${className}`}>
    {children}
  </span>
);

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

// 2. Streumittel-Daten und Haupt-Komponente

// Optionen für Streumittel
interface StreumittelOption {
  id: string;
  name: string;
  description: string;
  effectiveness: number; // 1-10
  environmental: number; // 1-10 (10 ist am umweltfreundlichsten)
  cost: number; // 1-10 (10 ist am günstigsten)
  minTemp: number; // Minimale Wirktemperatur in °C
  coverage: number; // m² pro kg
  colorClass: string;
  pros: string[];
  cons: string[];
  usage: string;
  storage: string;
}

const streumittelOptions: StreumittelOption[] = [
  {
    id: "streusalz",
    name: "Streusalz (Natriumchlorid)",
    description: "Klassisches und weit verbreitetes Auftaumittel. Wirksam, aber umweltbelastend.",
    effectiveness: 9,
    environmental: 2,
    cost: 8,
    minTemp: -8,
    coverage: 20,
    colorClass: "bg-red-50 border-red-100",
    pros: [
      "Hohe Effektivität bei Eisbeseitigung",
      "Schnelle Wirkung",
      "Kostengünstig",
      "Einfache Anwendung"
    ],
    cons: [
      "Schädigt Pflanzen und Bäume",
      "Belastet Gewässer",
      "Beschädigt Beton und Metalle",
      "Schadet Tierpfoten"
    ],
    usage: "20-40 g/m² gleichmäßig streuen. Bei starker Vereisung bis zu 60 g/m².",
    storage: "Trocken und verschlossen lagern. Vor Feuchtigkeit schützen."
  },
  {
    id: "splitt",
    name: "Granitsplitt",
    description: "Abstumpfendes Streumittel aus kleinen Gesteinsstücken. Umweltfreundlich, aber reinigungsintensiv.",
    effectiveness: 6,
    environmental: 7,
    cost: 7,
    minTemp: -20,
    coverage: 15,
    colorClass: "bg-amber-50 border-amber-100",
    pros: [
      "Keine Umweltbelastung",
      "Wirkt bei jeder Temperatur",
      "Keine Schäden an Bausubstanz",
      "Wiederverwendbar"
    ],
    cons: [
      "Keine Schmelzwirkung",
      "Verschmutzung von Innenräumen",
      "Aufwändige Entsorgung im Frühjahr",
      "Kann Kanalisation verstopfen"
    ],
    usage: "100-150 g/m² gleichmäßig verteilen. Mit leichtem Druck in die Eisfläche einarbeiten.",
    storage: "Trocken lagern. Nach Winterende einsammeln, sieben und wiederverwenden."
  },
  {
    id: "sand",
    name: "Streusand",
    description: "Feiner Sand zur Erhöhung der Rutschfestigkeit. Sehr umweltfreundlich, aber begrenzt wirksam.",
    effectiveness: 5,
    environmental: 9,
    cost: 10,
    minTemp: -30,
    coverage: 12,
    colorClass: "bg-yellow-50 border-yellow-100",
    pros: [
      "Sehr umweltfreundlich",
      "Besonders günstig",
      "Auch bei extremer Kälte wirksam",
      "Keine Schäden an Bauwerken oder Pflanzen"
    ],
    cons: [
      "Begrenzte Wirksamkeit bei Glätte",
      "Wird leicht verweht",
      "Muss häufiger nachgestreut werden",
      "Kann Böden versanden"
    ],
    usage: "150-200 g/m² auftragen. Bei Verwehung oder Niederschlag erneuern.",
    storage: "Trocken lagern. Sand kann über mehrere Jahre gelagert werden."
  },
  {
    id: "lavagranulat",
    name: "Lavagranulat",
    description: "Natürliches vulkanisches Gestein. Hohe Wirksamkeit und umweltfreundlich, aber teurer.",
    effectiveness: 7,
    environmental: 9,
    cost: 5,
    minTemp: -20,
    coverage: 18,
    colorClass: "bg-orange-50 border-orange-100",
    pros: [
      "Sehr umweltfreundlich",
      "Hohe Griffigkeit",
      "Nimmt Tauwasser auf",
      "Langfristige Wirkung"
    ],
    cons: [
      "Höhere Anschaffungskosten",
      "Keine auftauende Wirkung",
      "Schwerer als andere Streumittel",
      "Begrenzte Verfügbarkeit"
    ],
    usage: "80-120 g/m² aufbringen. Durch poröse Struktur bleibt es gut haften.",
    storage: "Trocken lagern. Nach Winterende sammeln und wiederverwenden."
  },
  {
    id: "kaliumformiat",
    name: "Kaliumformiat",
    description: "Biologisch abbaubares Auftaumittel. Hohe Wirksamkeit bei geringerer Umweltbelastung als Streusalz.",
    effectiveness: 8,
    environmental: 7,
    cost: 4,
    minTemp: -15,
    coverage: 25,
    colorClass: "bg-green-50 border-green-100",
    pros: [
      "Biologisch abbaubar",
      "Weniger korrosiv als Streusalz",
      "Effektive Schmelzwirkung",
      "Auch bei tieferen Temperaturen wirksam"
    ],
    cons: [
      "Deutlich teurer als Streusalz",
      "Belastet Gewässer in höherer Konzentration",
      "Geringe Verfügbarkeit für Privathaushalte",
      "Spezielle Lagerung erforderlich"
    ],
    usage: "20-30 g/m² ausbringen. Sparsam anwenden für beste Umweltverträglichkeit.",
    storage: "Kühl und trocken lagern. Behälter stets gut verschließen."
  },
  {
    id: "holzspäne",
    name: "Holzspäne/Sägemehl",
    description: "Natürliche, vollständig abbaubare Alternative. Umweltfreundlich, aber am wenigsten wirksam.",
    effectiveness: 3,
    environmental: 10,
    cost: 9,
    minTemp: -30,
    coverage: 10,
    colorClass: "bg-emerald-50 border-emerald-100",
    pros: [
      "Vollständig biologisch abbaubar",
      "Sehr kostengünstig",
      "Kann im Frühjahr einfach kompostiert werden",
      "Keine negativen Umweltauswirkungen"
    ],
    cons: [
      "Geringe Wirksamkeit bei Eisglätte",
      "Wird leicht verweht",
      "Muss sehr häufig erneuert werden",
      "Bei Nässe quillt es auf"
    ],
    usage: "200-300 g/m² großzügig ausstreuen. Nach Schneefall oder Regen erneuern.",
    storage: "Trocken lagern, um Schimmelbildung zu vermeiden."
  }
];

export default function StreumittelCalculatorPage() {
  const title = "Streumittel-Vergleich 2025: Der ultimative Guide mit interaktivem Bedarfsrechner"
  const subtitle = "Alle Streumittel im umfassenden Vergleich plus personalisierter Bedarfsrechner"
  const date = new Date('2025-03-21');
  const readingTime = "8 min + Rechner";
  const author = {
    name: "TREU Service Team",
    image: "/images/blog/streumittel.jpg"
  };

  // Zustände für den Rechner
  const [flaeche, setFlaeche] = useState<number>(100);
  const [flaecheInput, setFlaecheInput] = useState<string>("100");
  const [priorityFactor, setPriorityFactor] = useState<string>("balanced");
  const [selectedStreumittel, setSelectedStreumittel] = useState<string>("streusalz");
  const [vergleichsmodus, setVergleichsmodus] = useState<boolean>(false);
  const [temperatur, setTemperatur] = useState<number>(-5);
  const [showResults, setShowResults] = useState<boolean>(false);
  
  // Berechnete Ergebnisse
  const [ergebnisse, setErgebnisse] = useState<Record<string, {
    menge: number;
    kosten: number;
    empfehlung: number;
  }>>({});

  // Flächenwert aktualisieren, wenn das Eingabefeld geändert wird
  const handleFlaecheInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFlaecheInput(value);
    
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue) && parsedValue > 0) {
      // Keine Begrenzung auf 1000 mehr
      setFlaeche(parsedValue);
    }
  };

  // Wenn der Slider bewegt wird, aktualisiere auch das Eingabefeld
  const handleSliderChange = (values: number[]) => {
    setFlaeche(values[0]);
    setFlaecheInput(values[0].toString());
  };

  // Berechnung bei Änderungen durchführen
  useEffect(() => {
    const resultate: Record<string, { menge: number; kosten: number; empfehlung: number }> = {};
    
    const mittelZuBerechnen = vergleichsmodus 
      ? streumittelOptions.map(opt => opt.id) 
      : [selectedStreumittel];
    
    mittelZuBerechnen.forEach(mittelId => {
      const mittel = streumittelOptions.find(m => m.id === mittelId);
      if (!mittel) return;
      
      // Basis-Mengenkalkulation
      const basismenge = flaeche / mittel.coverage;
      
      // Temperatur-Faktor (mehr Streumittel bei niedrigeren Temperaturen)
      let tempFaktor = 1;
      if (mittel.id === "streusalz" || mittel.id === "kaliumformiat") {
        if (temperatur < -5) tempFaktor = 1.2;
        if (temperatur < -10) tempFaktor = 1.5;
      }
      
      const menge = Math.round(basismenge * tempFaktor * 10) / 10; // auf 1 Nachkommastelle runden
      
      // Kosten berechnen (fiktive Kosten pro kg)
      const preisMap: Record<string, number> = {
        "streusalz": 0.50,
        "splitt": 0.65,
        "sand": 0.30,
        "lavagranulat": 1.20,
        "kaliumformiat": 2.50,
        "holzspäne": 0.35
      };
      
      const preisProKg = preisMap[mittelId] || 1.0;
      const kosten = Math.round(menge * preisProKg * 100) / 100;
      
      // Empfehlungsfaktor basierend auf Prioritäten
      let empfehlung = 0;
      if (priorityFactor === "umwelt") {
        empfehlung = (mittel.environmental * 0.7) + (mittel.effectiveness * 0.2) + (mittel.cost * 0.1);
      } else if (priorityFactor === "wirksamkeit") {
        empfehlung = (mittel.effectiveness * 0.7) + (mittel.environmental * 0.1) + (mittel.cost * 0.2);
      } else if (priorityFactor === "kosten") {
        empfehlung = (mittel.cost * 0.7) + (mittel.effectiveness * 0.2) + (mittel.environmental * 0.1);
      } else { // balanced
        empfehlung = (mittel.environmental * 0.33) + (mittel.effectiveness * 0.34) + (mittel.cost * 0.33);
      }
      
      // Temperatur-Einschränkung berücksichtigen
      if (temperatur < mittel.minTemp) {
        empfehlung = empfehlung * 0.5; // 50% Reduktion der Empfehlung bei zu tiefen Temperaturen
      }
      
      resultate[mittelId] = {
        menge,
        kosten,
        empfehlung: Math.round(empfehlung * 10) / 10
      };
    });
    
    setErgebnisse(resultate);
  }, [flaeche, selectedStreumittel, vergleichsmodus, priorityFactor, temperatur]);

  // Beste Empfehlung bestimmen für Vergleichsmodus
  const besteEmpfehlung = vergleichsmodus ? 
    Object.entries(ergebnisse).reduce((best, [id, data]) => 
      data.empfehlung > best.score ? {id, score: data.empfehlung} : best, 
      {id: "", score: 0}
    ).id : "";

  // Farbschema für jedes Streumittel
  const getColorSchemeForStreumittel = (id: string): "blue" | "green" | "amber" | "purple" | "default" => {
    switch(id) {
      case "streusalz": return "blue";
      case "holzspäne": return "green";
      case "sand": return "amber";
      case "lavagranulat": return "purple";
      default: return "default";
    }
  };

  return (
    <div className="flex-1 pb-10">
      <Section className="pt-6 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-blue-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Streumittel</span>
          </div>
          
          <div className="max-w-4xl">
            {/* Tag/Badge */}
            <Badge className="mb-3">
              Winterdienst
            </Badge>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </H1>
            
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              {subtitle}
            </H2>
            
            <div className="flex items-center gap-6 text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <div className="inline-block bg-blue-50 p-2 rounded-full">
                  <Snowflake className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm">{author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{format(date, 'dd. MMMM yyyy', { locale: de })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{readingTime}</span>
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
              {/* Hauptinhalt */}
              <div className="mb-8">
                <Card className="bg-white shadow-sm rounded-xl overflow-hidden border-0">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200 py-6">
                    <div className="flex items-center justify-center">
                      <div className="bg-white p-3 rounded-full shadow-sm mr-4">
                        <Calculator className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-blue-800">Streumittel-Bedarfsrechner</CardTitle>
                        <p className="text-blue-600 text-sm mt-1">Einfach Fläche und Prioritäten wählen – wir empfehlen das optimale Streumittel</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {/* Flächeneingabe mit Slider und manuellem Input */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="flaeche" className="text-sm font-medium">Zu streuende Fläche</Label>
                          <div className="flex items-center">
                            <Input
                              type="number"
                              value={flaecheInput}
                              onChange={handleFlaecheInputChange}
                              min="10"
                              className="w-20 h-8 text-center mr-2"
                            />
                            <span className="text-sm font-medium">m²</span>
                          </div>
                        </div>
                        <div className="flex gap-3 items-center">
                          <Ruler className="h-5 w-5 text-blue-600" />
                          <Slider
                            id="flaeche"
                            value={[Math.min(flaeche, 1000)]} // Slider zeigt max. 1000, aber Wert kann höher sein
                            min={10}
                            max={1000}
                            step={1}
                            onValueChange={handleSliderChange}
                            className="flex-1"
                          />
                        </div>
                        {flaeche > 1000 && (
                          <div className="mt-2 text-xs text-blue-600 flex items-center">
                            <Info className="h-3 w-3 mr-1 flex-shrink-0" />
                            Große Fläche: {flaeche} m² wird berechnet, Slider zeigt max. 1000 m²
                          </div>
                        )}
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>Klein (10 m²)</span>
                          <span>Mittel (100 m²)</span>
                          <span>Groß (1000+ m²)</span>
                        </div>
                      </div>
                      
                      {/* Temperatur */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label htmlFor="temperatur" className="text-sm font-medium">Außentemperatur</Label>
                          <span className="text-sm font-medium">{temperatur} °C</span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <ThermometerSnowflake className="h-5 w-5 text-blue-600" />
                          <Slider
                            id="temperatur"
                            value={[temperatur]}
                            min={-20}
                            max={0}
                            step={1}
                            onValueChange={(values) => setTemperatur(values[0])}
                            className="flex-1"
                          />
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>-20 °C</span>
                          <span>-10 °C</span>
                          <span>0 °C</span>
                        </div>
                      </div>
                      
                      {/* Prioritäten */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Ihre Priorität</Label>
                        <RadioGroup 
                          defaultValue="balanced" 
                          onValueChange={setPriorityFactor}
                          className="grid grid-cols-2 md:grid-cols-4 gap-2"
                        >
                          <div>
                            <RadioGroupItem
                              value="balanced"
                              id="balanced"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="balanced"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-gray-100 hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                            >
                              <BarChart className="mb-1 h-5 w-5" />
                              <span className="text-xs font-medium">Ausgewogen</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="umwelt"
                              id="umwelt"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="umwelt"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-gray-100 hover:text-accent-foreground peer-data-[state=checked]:border-green-600 [&:has([data-state=checked])]:border-green-600"
                            >
                              <Leaf className="mb-1 h-5 w-5" />
                              <span className="text-xs font-medium">Umwelt</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="wirksamkeit"
                              id="wirksamkeit"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="wirksamkeit"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-gray-100 hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-amber-600"
                            >
                              <Snowflake className="mb-1 h-5 w-5" />
                              <span className="text-xs font-medium">Wirksamkeit</span>
                            </Label>
                          </div>
                          <div>
                            <RadioGroupItem
                              value="kosten"
                              id="kosten"
                              className="peer sr-only"
                            />
                            <Label
                              htmlFor="kosten"
                              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-gray-100 hover:text-accent-foreground peer-data-[state=checked]:border-green-600 [&:has([data-state=checked])]:border-blue-600"
                            >
                              <DollarSign className="mb-1 h-5 w-5" />
                              <span className="text-xs font-medium">Kosten</span>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {/* Auswahl des Streumittels oder Vergleichsmodus */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <Label className="text-sm font-medium">Streumittel wählen</Label>
                          <div className="flex items-center">
                            <span className="text-xs text-muted-foreground mr-2">Alle vergleichen</span>
                            <input 
                              type="checkbox" 
                              checked={vergleichsmodus}
                              onChange={(e) => setVergleichsmodus(e.target.checked)}
                              className="toggle toggle-blue-600"
                            />
                          </div>
                        </div>
                        
                        {!vergleichsmodus ? (
                          <RadioGroup 
                            defaultValue="streusalz" 
                            onValueChange={setSelectedStreumittel}
                            className="grid grid-cols-1 md:grid-cols-2 gap-2"
                          >
                            {streumittelOptions.map(option => (
                              <div key={option.id}>
                                <RadioGroupItem
                                  value={option.id}
                                  id={option.id}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={option.id}
                                  className={`flex items-center justify-between rounded-md border-2 border-muted ${option.colorClass} p-3 hover:bg-gray-50 hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600`}
                                >
                                  <span className="font-medium">{option.name}</span>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        ) : (
                          <div className="text-center p-3 bg-blue-50 rounded-lg text-blue-600 text-sm">
                            <Info className="inline-block h-4 w-4 mr-1" />
                            Vergleichsmodus aktiv - alle Streumittel werden verglichen
                          </div>
                        )}
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5"
                          onClick={() => setShowResults(true)}
                        >
                          Berechnung starten
                        </Button>
                      </div>
                    </div>
                    
                    {/* Ergebnisse */}
                    {showResults && (
                      <div className="mt-8 border-t border-blue-100 pt-6">
                        <h3 className="text-lg font-medium mb-4">Ihre persönliche Streumittel-Empfehlung</h3>
                        
                        {vergleichsmodus ? (
                          <div className="space-y-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <div className="flex items-start gap-3">
                                <div className="bg-white p-2 rounded-full">
                                  <Check className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium">Beste Empfehlung für Ihre Situation:</h4>
                                  <p className="text-blue-800 text-lg font-medium">
                                    {streumittelOptions.find(o => o.id === besteEmpfehlung)?.name}
                                  </p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              {streumittelOptions
                                .sort((a, b) => 
                                  (ergebnisse[b.id]?.empfehlung || 0) - (ergebnisse[a.id]?.empfehlung || 0)
                                )
                                .map(option => {
                                  const result = ergebnisse[option.id];
                                  if (!result) return null;
                                  
                                  const isRecommended = option.id === besteEmpfehlung;
                                  
                                  return (
                                    <div 
                                      key={option.id} 
                                      className={`p-4 rounded-lg border ${isRecommended ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
                                    >
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="font-medium flex items-center">
                                          {isRecommended && <Check className="h-4 w-4 text-green-600 mr-1" />}
                                          {option.name}
                                        </h5>
                                      </div>
                                      
                                      <RatingBar 
                                        value={result.empfehlung} 
                                        maxValue={10}
                                        colorScheme={getColorSchemeForStreumittel(option.id)}
                                      />
                                      
                                      <div className="grid grid-cols-3 gap-2 text-sm mt-3">
                                        <div>
                                          <span className="text-muted-foreground">Menge:</span>
                                          <div className="font-medium">{result.menge} kg</div>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Kosten:</span>
                                          <div className="font-medium">{result.kosten.toFixed(2)} €</div>
                                        </div>
                                        <div>
                                          <span className="text-muted-foreground">Min. Temp:</span>
                                          <div className="font-medium">{option.minTemp} °C</div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div>
                            {/* Einzelergebnis */}
                            {selectedStreumittel && ergebnisse[selectedStreumittel] && (
                              <div className="space-y-6">
                                <div className="bg-blue-50 p-5 rounded-lg">
                                  <div className="text-center mb-4">
                                    <h4 className="text-lg font-medium text-blue-800">
                                      {streumittelOptions.find(o => o.id === selectedStreumittel)?.name}
                                    </h4>
                                    <p className="text-sm text-blue-600">
                                      {streumittelOptions.find(o => o.id === selectedStreumittel)?.description}
                                    </p>
                                  </div>
                                  
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                      <h5 className="text-xs text-muted-foreground mb-1">Benötigte Menge</h5>
                                      <p className="text-xl font-semibold">{ergebnisse[selectedStreumittel].menge} kg</p>
                                    </div>
                                    
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                      <h5 className="text-xs text-muted-foreground mb-1">Geschätzte Kosten</h5>
                                      <p className="text-xl font-semibold">{ergebnisse[selectedStreumittel].kosten.toFixed(2)} €</p>
                                    </div>
                                    
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                      <h5 className="text-xs text-muted-foreground mb-1">Min. Temperatur</h5>
                                      <p className="text-xl font-semibold">{streumittelOptions.find(o => o.id === selectedStreumittel)?.minTemp} °C</p>
                                    </div>
                                    
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                      <h5 className="text-xs text-muted-foreground mb-1">Reichweite pro kg</h5>
                                      <p className="text-xl font-semibold">{streumittelOptions.find(o => o.id === selectedStreumittel)?.coverage} m²</p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="border border-green-100 rounded-lg p-4">
                                    <h5 className="font-medium flex items-center text-green-700 mb-2">
                                      <Check className="h-4 w-4 mr-2" />
                                      Vorteile
                                    </h5>
                                    <ul className="space-y-1 text-sm">
                                      {streumittelOptions.find(o => o.id === selectedStreumittel)?.pros.map((pro, i) => (
                                        <li key={i} className="flex items-center">
                                          <Check className="h-3 w-3 text-green-600 mr-2 flex-shrink-0" />
                                          <span>{pro}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div className="border border-red-100 rounded-lg p-4">
                                    <h5 className="font-medium flex items-center text-red-700 mb-2">
                                      <X className="h-4 w-4 mr-2" />
                                      Nachteile
                                    </h5>
                                    <ul className="space-y-1 text-sm">
                                      {streumittelOptions.find(o => o.id === selectedStreumittel)?.cons.map((con, i) => (
                                        <li key={i} className="flex items-center">
                                          <X className="h-3 w-3 text-red-600 mr-2 flex-shrink-0" />
                                          <span>{con}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="bg-blue-50 p-4 rounded-lg">
                                    <h5 className="font-medium mb-2">Anwendungshinweise</h5>
                                    <p className="text-sm">
                                      {streumittelOptions.find(o => o.id === selectedStreumittel)?.usage}
                                    </p>
                                  </div>
                                  
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <h5 className="font-medium mb-2">Lagerung</h5>
                                    <p className="text-sm">
                                      {streumittelOptions.find(o => o.id === selectedStreumittel)?.storage}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="text-center">
                                  <Button
                                    variant="outline"
                                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                                    onClick={() => setVergleichsmodus(true)}
                                  >
                                    Mit anderen Streumitteln vergleichen
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              {/* Streumittel im direkten Vergleich */}
              <div className="space-y-6 mt-8">
                <H3 className="text-2xl font-semibold">Streumittel im direkten Vergleich</H3>
                <Card>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-blue-50">
                            <th className="p-2 border text-left">Streumittel</th>
                            <th className="p-2 border text-center">Wirksamkeit</th>
                            <th className="p-2 border text-center">Umwelt</th>
                            <th className="p-2 border text-center">Kosten</th>
                            <th className="p-2 border text-center">Min. Temp.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {streumittelOptions.map(option => (
                            <tr key={option.id} className="hover:bg-gray-50">
                              <td className="p-2 border font-medium">{option.name}</td>
                              <td className="p-2 border">
                                <RatingBar 
                                  value={option.effectiveness} 
                                  size="sm" 
                                  colorScheme="amber" 
                                />
                              </td>
                              <td className="p-2 border">
                                <RatingBar 
                                  value={option.environmental} 
                                  size="sm" 
                                  colorScheme="green" 
                                />
                              </td>
                              <td className="p-2 border">
                                <RatingBar 
                                  value={option.cost} 
                                  size="sm" 
                                  colorScheme="blue" 
                                />
                              </td>
                              <td className="p-2 border text-center">{option.minTemp} °C</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 bg-amber-50 p-4 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="bg-white p-1.5 rounded-full">
                          <Info className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-amber-800 mb-1">Bewertungskriterien</h4>
                          <ul className="space-y-1 text-sm text-amber-700">
                            <li><strong>Wirksamkeit:</strong> Fähigkeit, Schnee und Eis zu entfernen oder die Rutschgefahr zu reduzieren</li>
                            <li><strong>Umwelt:</strong> Auswirkungen auf Pflanzen, Böden, Gewässer und Infrastruktur</li>
                            <li><strong>Kosten:</strong> Preis-Leistungs-Verhältnis unter Berücksichtigung von Anschaffung und Menge</li>
                            <li><strong>Minimum-Temperatur:</strong> Niedrigste Temperatur, bei der das Streumittel noch wirksam ist</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Umweltauswirkungen von Streumitteln */}
              <div className="space-y-6 mt-10">
                <H3 className="text-2xl font-semibold">Umweltauswirkungen von Streumitteln</H3>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-sm">
                      Die Wahl des richtigen Streumittels hat erhebliche Auswirkungen auf die Umwelt. Besonders klassisches Streusalz (Natriumchlorid) steht in der Kritik wegen seiner schädlichen Effekte.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <h4 className="font-medium text-red-800 mb-2 flex items-center">
                          <AlertTriangle className="h-4 w-4 mr-2 text-red-600" />
                          Negative Umweltauswirkungen von Streusalz
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Pflanzenschäden:</span> Salzkonzentrationen im Boden schädigen Wurzeln und führen zu Trockenstress bei Bäumen und Pflanzen
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Gewässerbelastung:</span> Erhöhte Salzgehalte in Gewässern schädigen Mikroorganismen und Fische
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Infrastrukturschäden:</span> Korrosion an Fahrzeugen, Brücken und Betonbauten verursacht hohe Folgekosten
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Tierleid:</span> Schmerzhaftes Brennen an Pfoten von Haustieren und Wildtieren
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h4 className="font-medium text-green-800 mb-2 flex items-center">
                          <Leaf className="h-4 w-4 mr-2 text-green-600" />
                          Umweltfreundliche Alternativen
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Abstumpfende Mittel:</span> Splitt, Sand und Lavagranulat führen zu keiner chemischen Belastung und können wiederverwendet werden
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Organische Taumittel:</span> Kaliumformiat und Kaliumacetat sind biologisch abbaubar und weniger korrosiv
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Natürliche Materialien:</span> Holzspäne und Sägemehl sind vollständig biologisch abbaubar
                            </div>
                          </li>
                          <li className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium">Gemischte Verfahren:</span> Optimierte Salzlösungen mit geringerem Salzanteil und Vorbehandlung mit Sole
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Kommunale Streusalz-Verbote</h4>
                      <p className="text-sm mb-3">
                        Viele Gemeinden haben den Einsatz von Streusalz für Privathaushalte bereits verboten oder stark eingeschränkt. In der Regel ist der Einsatz nur noch an besonders gefährlichen Stellen wie Treppen oder steilen Gefällen erlaubt.
                      </p>
                      <div className="bg-blue-50 p-3 rounded-lg text-sm border border-blue-100">
                        <strong>Tipp:</strong> Informieren Sie sich auf der Website Ihrer Gemeinde über lokale Vorschriften zu erlaubten Streumitteln. Bei Verstößen drohen Bußgelder von 35 bis 500 Euro.
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Der Blaue Engel für Streumittel</h4>
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <ShieldCheck className="h-10 w-10 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            Achten Sie beim Kauf auf Streumittel mit dem Blauen Engel (Umweltzeichen RAL-UZ 13). Diese Produkte erfüllen strenge Umweltkriterien:
                          </p>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li className="flex items-center">
                              <Check className="h-3 w-3 text-green-600 mr-2" />
                              <span>Keine toxischen Bestandteile</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-3 w-3 text-green-600 mr-2" />
                              <span>Keine gefährlichen Verunreinigungen</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-3 w-3 text-green-600 mr-2" />
                              <span>Keine Gefährdung von Pflanzen und Bodenlebewesen</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="h-3 w-3 text-green-600 mr-2" />
                              <span>Keine Staubbelastung durch Feinstaubanteil</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Rechtliche Aspekte */}
              <div className="space-y-6 mt-10">
                <H3 className="text-2xl font-semibold">Rechtliche Aspekte zum Streumitteleinsatz</H3>
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <p className="text-sm">
                      Der Einsatz von Streumitteln unterliegt in Deutschland verschiedenen rechtlichen Regelungen, die je nach Bundesland und Kommune variieren können. Hier finden Sie die wichtigsten rechtlichen Grundlagen und regionale Besonderheiten.
                    </p>
                    
                    <div className="border border-blue-100 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-blue-800 mb-2">Kommunale Satzungen</h4>
                      <p className="text-sm">
                        Die meisten Städte und Gemeinden haben konkrete Vorgaben zu erlaubten Streumitteln in ihren Straßenreinigungssatzungen festgelegt. Typisch sind folgende Regelungen:
                      </p>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Verbot oder Einschränkung von Streusalz auf öffentlichen Gehwegen, oft mit Ausnahme für besondere Gefahrenstellen</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Vorschriften zum Einsatz abstumpfender Streumittel (Sand, Splitt, etc.)</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span>Festlegung von Winterdienstzeiten und Räumpflichten</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Link href="/blog/RaeumpflichtGuide2025">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Mehr zur Räumpflicht im Räumpflicht-Guide 2025
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Letzte Aktualisierung: {format(date, 'dd. MMMM yyyy', { locale: de })}</span>
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

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Experten-Tipp Box */}
                <Card className="bg-blue-500/5 border-blue-500/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-6 w-6 text-yellow-400" />
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Mischen Sie verschiedene Streumittel für optimale Ergebnisse: Verwenden Sie eine Basis aus Sand oder Splitt für sofortige Rutschsicherheit und ergänzen Sie bei besonders kritischen Stellen mit etwas Streusalz-Alternative.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Besonders wichtig: Entfernen Sie Sand und Splitt im Frühjahr, um Schäden an Rasenmähern und Kanalisation zu vermeiden. Gesammeltes Material kann für die nächste Saison wiederverwendet werden!
                    </Paragraph>
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
                            <div className="text-sm font-medium">0231 15044352</div>
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
              
                {/* Material-Kosten */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      Kostentabelle (2025)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Streusalz</span>
                        <span className="font-medium">0,50 € pro kg</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Granitsplitt</span>
                        <span className="font-medium">0,65 € pro kg</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Streusand</span>
                        <span className="font-medium">0,30 € pro kg</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Lavagranulat</span>
                        <span className="font-medium">1,20 € pro kg</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Kaliumformiat</span>
                        <span className="font-medium">2,50 € pro kg</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span>Holzspäne/Sägemehl</span>
                        <span className="font-medium">0,35 € pro kg</span>
                      </div>
                      <Paragraph className="text-xs text-muted-foreground mt-2">
                        Hinweis: Die Preise sind Durchschnittswerte und können je nach Region, Anbieter und Abnahmemenge variieren. Größere Mengen sind oft deutlich günstiger.
                      </Paragraph>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Rechtliche Hinweise */}
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      Rechtlicher Hinweis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Prüfen Sie die lokalen Vorschriften zu erlaubten Streumitteln in Ihrer Gemeinde</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>In vielen Gemeinden ist der Einsatz von Streusalz verboten oder eingeschränkt</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>Bei Missachtung drohen Bußgelder zwischen 35 und 500 Euro</span>
                      </li>
                    </ul>
                    <div className="mt-4 text-sm">
                      <div className="font-medium">Zum 01.01.2025 neu:</div>
                      <p className="text-xs text-muted-foreground">Umweltbonus: Einige Gemeinden bieten Steuerermäßigungen für den Einsatz umweltfreundlicher Streumittel an</p>
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
                        href="/blog/RaeumpflichtGuide2025" 
                        className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="mr-3 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Shovel className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">Räumpflicht-Guide 2025</h3>
                          <p className="text-xs text-gray-500 mt-0.5">Aktuelle Rechtslage</p>
                        </div>
                      </Link>
                    </div>
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
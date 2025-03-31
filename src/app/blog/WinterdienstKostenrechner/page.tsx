"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { 
  CheckCircle2, 
  Users, 
  Lightbulb,
  ChevronRight, 
  Calendar, 
  Clock, 
  Share2,
  Phone,
  Mail,
  Shovel,
  Snowflake,
  Calculator,
  DollarSign,
  BarChart,
  Check,
  X,
  Info,
  SlidersHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { Separator } from "@/components/ui/separator"

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

// Definieren wir die TypeScript-Typen für die Berechnungsergebnisse
interface DiyResults {
  equipment: number;
  perUse: number;
  seasonal: number;
  firstYear: number;
  timePerSeason: number;
  debris: number;
}

interface ProfessionalResults {
  area: number;
  costPerSqm: string;
  setup: number;
  perVisit: number;
  monthly: number;
  seasonal: number;
  debris: number;
}

// Kostenkalkulator-Komponente
const CostCalculator = () => {
  const [area, setArea] = useState(1500);
  const [snowDepth, setSnowDepth] = useState<"leicht" | "mittel" | "stark">("mittel");
  const [frequency, setFrequency] = useState(20);
  const [showResults, setShowResults] = useState(false);
  
  // Initialisieren mit leeren Objekten statt null
  const [diyResults, setDiyResults] = useState<DiyResults>({
    equipment: 0,
    perUse: 0,
    seasonal: 0,
    firstYear: 0,
    timePerSeason: 0,
    debris: 0
  });
  
  const [professionalResults, setProfessionalResults] = useState<ProfessionalResults>({
    area: 0,
    costPerSqm: "0",
    setup: 0,
    perVisit: 0,
    monthly: 0,
    seasonal: 0,
    debris: 0
  });
  
  const [costDifference, setCostDifference] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateCosts = async () => {
    setIsCalculating(true);
    
    try {
      const response = await fetch('/api/winterdienst/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          area,
          snowDepth,
          frequency
        }),
      });

      if (!response.ok) {
        throw new Error('Fehler bei der Berechnung');
      }

      const data = await response.json();
      
      if (data.success) {
        setDiyResults(data.diyResults);
        setProfessionalResults(data.professionalResults);
        setCostDifference(data.costDifference);
        setShowResults(true);
      } else {
        alert('Bei der Berechnung ist ein Fehler aufgetreten.');
      }
    } catch (error) {
      console.error('Berechnungsfehler:', error);
      alert('Bei der Berechnung ist ein Fehler aufgetreten.');
    } finally {
      setIsCalculating(false);
    }
  };
  
  return (
    <Card className="shadow-sm mt-6">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center gap-3">
          <Calculator className="w-5 h-5 text-blue-600" />
          <CardTitle className="text-lg">Kosten-Rechner: DIY vs. Professioneller Winterdienst</CardTitle>
        </div>
        <CardDescription>
          Berechnen Sie, was für Ihre Situation kostengünstiger ist
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Zu räumende Fläche</label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <input 
                  type="range" 
                  min="1000" 
                  max="10000" 
                  value={Math.min(area, 10000)} 
                  onChange={(e) => setArea(parseInt(e.target.value))}
                  className="w-full" 
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Minimum (1.000m²)</span>
                  <span>Mittel (5.000m²)</span>
                  <span>Groß (10.000m²)</span>
                </div>
              </div>
              <div className="w-24 flex items-center">
                <input 
                  type="number" 
                  min="1000" 
                  max="15000" 
                  value={area} 
                  onChange={(e) => setArea(parseInt(e.target.value))}
                  className="w-20 h-9 rounded-md border border-gray-300 text-center" 
                />
                <span className="ml-1">m²</span>
              </div>
            </div>
            {area > 10000 && (
              <div className="mt-2 text-xs text-blue-600 flex items-center">
                <Info className="h-3 w-3 mr-1 flex-shrink-0" />
                Große Fläche: Für Flächen {'>'}10.000m² erstellen wir individuelle Angebote
              </div>
            )}
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">Schneehöhe/Intensität</label>
            <div className="grid grid-cols-3 gap-2">
              <button 
                className={`p-2 rounded-md border text-sm ${snowDepth === 'leicht' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                onClick={() => setSnowDepth('leicht')}
              >
                Leicht
              </button>
              <button 
                className={`p-2 rounded-md border text-sm ${snowDepth === 'mittel' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                onClick={() => setSnowDepth('mittel')}
              >
                Mittel
              </button>
              <button 
                className={`p-2 rounded-md border text-sm ${snowDepth === 'stark' ? 'bg-blue-100 border-blue-500' : 'border-gray-300'}`}
                onClick={() => setSnowDepth('stark')}
              >
                Stark
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1.5 block">Einsätze pro Saison</label>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <input 
                  type="range" 
                  min="5" 
                  max="40" 
                  value={frequency} 
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                  className="w-full" 
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Selten (5)</span>
                  <span>Durchschnitt (15)</span>
                  <span>Häufig (40)</span>
                </div>
              </div>
              <div className="w-20">
                <input 
                  type="number" 
                  min="1" 
                  max="100" 
                  value={frequency} 
                  onChange={(e) => setFrequency(parseInt(e.target.value))}
                  className="w-20 h-9 rounded-md border border-gray-300 text-center" 
                />
              </div>
            </div>
          </div>
          
          <div className="pt-3">
            <Button 
              className="w-full bg-blue-600 text-white"
              onClick={calculateCosts}
              disabled={isCalculating}
            >
              {isCalculating ? 'Berechne...' : 'Kosten berechnen'}
            </Button>
          </div>
        </div>
        
                    {showResults && (
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Ergebnis der Kostenanalyse</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shovel className="h-4 w-4 text-blue-600" />
                    DIY-Winterdienst
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Ausrüstungskosten:</span>
                    <span className="font-medium">{diyResults.equipment.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kosten pro Einsatz:</span>
                    <span className="font-medium">{diyResults.perUse.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zeitaufwand pro Saison:</span>
                    <span className="font-medium">{diyResults.timePerSeason.toFixed(1)} Stunden</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Kosten erste Saison:</span>
                      <span className="text-blue-700">{diyResults.firstYear.toFixed(2)} €</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-blue-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    Professioneller Dienst
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Fläche:</span>
                    <span className="font-medium">{professionalResults.area.toFixed(0)} m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Einrichtungsgebühr:</span>
                    <span className="font-medium">{professionalResults.setup.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monatliche Bereitschaftsgebühr:</span>
                    <span className="font-medium">{professionalResults.monthly.toFixed(2)} €</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Gesamtkosten pro Saison:</span>
                      <span className="text-blue-700">{professionalResults.seasonal.toFixed(2)} €</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className={`p-4 rounded-lg ${costDifference > 0 && area < 1000 ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}`}>
                <h4 className="font-medium mb-2">Fazit:</h4>
                {costDifference > 0 && area < 1000 ? (
                  <p>
                    Der <strong>DIY-Winterdienst</strong> könnte in Ihrem Fall um <strong>{Math.abs(costDifference).toFixed(2)} €</strong> günstiger sein als die professionelle Lösung im ersten Jahr. Bedenken Sie jedoch den erheblichen Zeitaufwand von {diyResults.timePerSeason.toFixed(1)} Stunden pro Saison und die physische Belastung, besonders bei unerwarteten Schneefällen oder frühen Morgenstunden.
                  </p>
                ) : (
                  <p>
                    Der <strong>professionelle Winterdienst</strong> bietet Ihnen erhebliche Vorteile: Sie sparen wertvolle Zeit ({diyResults.timePerSeason.toFixed(1)} Stunden pro Saison), vermeiden körperliche Belastung und sind rechtlich abgesichert. Für Flächen Ihrer Größenordnung ist die professionelle Lösung besonders wirtschaftlich und verschafft Ihnen Sicherheit und Komfort während der gesamten Wintersaison.
                  </p>
                )}
                
                <div className="mt-3 text-sm text-gray-600">
                  <Info className="h-3.5 w-3.5 inline-block mr-1 mb-0.5" />
                  In Folgejahren fallen bei DIY keine Ausrüstungskosten mehr an, sofern die Werkzeuge in gutem Zustand bleiben.
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Hauptkomponente für die Seite
export default function WinterdienstDIYPage() {
  const title = "Winterdienst: DIY vs. Professionell - Was lohnt sich wirklich?"
  const subtitle = "Ein umfassender Vergleich von Kosten, Aufwand und Umweltaspekten mit interaktivem Kostenrechner"
  const date = new Date('2025-03-21');
  const readingTime = "10 min + Rechner";
  const author = {
    name: "TREU Service Team",
    image: "/images/blog/winter.jpg"
  };
  
  // DIY-Daten aus der JSON-Datei
  const diyWinterserviceTipps = {
    "title": "DIY-Winterdienst Tipps",
    "subtitle": "Winterdienst leicht gemacht: Tipps für zu Hause",
    "steps": [
      {
        "number": 1,
        "title": "Sicherheitsmaßnahmen",
        "intro": "Bevor Sie mit dem Winterdienst beginnen, ist es wichtig, die Sicherheit an erste Stelle zu setzen:",
        "items": [
          {
            "title": "Rutschfeste Schuhe",
            "description": "Tragen Sie Schuhe mit einer guten Profilsohle, um ein Ausrutschen auf glatten Flächen zu vermeiden."
          },
          {
            "title": "Warme Kleidung",
            "description": "Ziehen Sie sich warm und wasserdicht an, um vor Kälte und Nässe geschützt zu sein. Handschuhe, Mützen und Schals sind ebenfalls empfehlenswert."
          },
          {
            "title": "Beleuchtung",
            "description": "Wenn Sie bei Dunkelheit arbeiten müssen, stellen Sie sicher, dass der Arbeitsbereich gut beleuchtet ist, um Unfälle zu vermeiden."
          }
        ]
      },
      {
        "number": 2,
        "title": "Planung",
        "intro": "Eine gute Planung ist entscheidend, um den Winterdienst effizient durchzuführen:",
        "items": [
          {
            "title": "Zeitplan",
            "description": "Erstellen Sie einen genauen Zeitplan, wann und wie oft Sie die Schneeräumung und Streuung durchführen. Besonders bei starkem Schneefall ist es wichtig, regelmäßig zu räumen."
          },
          {
            "title": "Helfer",
            "description": "Wenn Sie Hilfe benötigen, fragen Sie frühzeitig Freunde, Familie oder Nachbarn. Ein zusätzlicher Helfer kann die Arbeit erleichtern und beschleunigen."
          },
          {
            "title": "Kontrolle & Überwachung",
            "description": "Überwachen Sie kontinuierlich die Wetterbedingungen und reagieren Sie schnell auf Schneefall, Glätte oder andere winterliche Witterungsverhältnisse."
          }
        ]
      },
      {
        "number": 3,
        "title": "Werkzeuge",
        "items": [
          {
            "title": "Schaufel",
            "description": "Eine robuste Schneeschaufel aus Metall. Für den nächtlichen Einsatz eine robuste Holzschaufel ohne Metalleiste um Lärm zu minimieren."
          },
          {
            "title": "Schneeschieber",
            "description": "Stabil und effizient, besonders für größere Schneemengen auf Gehwegen und Einfahrten. Varianten aus Metall sind ideal für härteren Schnee."
          },
          {
            "title": "Schneeade",
            "description": "Ein speziell für schmale Gehwege entwickelter Schneeschieber, der enge Flächen schnell und präzise freiräumt."
          },
          {
            "title": "Streuwagen",
            "description": "Ein Streuwagen hilft, Salz und Streugut gleichmäßig zu verteilen, was besonders auf größeren Flächen wie Parkplätzen wichtig ist."
          },
          {
            "title": "Schneekehrmaschine",
            "description": "Benzinbetriebene Modelle sind ideal für lange Flächen, die schwer zugänglich sind. Sie halten länger durch als akkubetriebene Maschinen."
          },
          {
            "title": "Kehrbesen",
            "description": "Perfekt, um nach der Wintersaison den Streusplitt aufzufegen und Flächen zu reinigen."
          },
          {
            "title": "Pkw im Winterdienst",
            "description": "Wenn Sie einen Pkw für den Winterdienst nutzen, können Sie einen Schneepflug vorne und einen Streuwagen hinten anbringen. Achten Sie auf die Eignung der Geräte."
          }
        ]
      }
    ],
    "conclusion": {
      "text": "Mit der richtigen Planung und den passenden Werkzeugen können Sie Ihren Winterdienst zu Hause effizient und sicher durchführen. Sollten Sie dennoch Unterstützung benötigen oder Fragen haben, stehen wir von TREU Service GmbH Ihnen jederzeit zur Verfügung.",
      "closing": "Bleiben Sie sicher und genießen Sie den Winter!"
    }
  };
  
  // Vergleichsdaten für Professionelle vs. DIY-Tabelle
  const vergleichsDaten = {
    "diy": {
      "kosten": [
        "Einmalige Anschaffung der Ausrüstung (ca. 70-500€)",
        "Laufende Kosten für Streumittel (ca. 0,30-2,50€ pro kg)",
        "Geringe laufende Kosten, aber Zeitaufwand"
      ],
      "vorteile": [
        "Zeitlich flexibel einsetzbar",
        "Langfristig kostengünstiger",
        "Individuelle Streumittelwahl",
        "Keine Abhängigkeit von externen Dienstleistern"
      ],
      "nachteile": [
        "Hoher Zeitaufwand (ca. 30-100 Stunden pro Saison)",
        "Physisch anstrengend",
        "Früh aufstehen bei Schneefall nötig",
        "Eigenverantwortung für Qualität",
        "Rechtliches Risiko bei mangelhafter Durchführung"
      ]
    },
    "professional": {
      "kosten": [
        "Einrichtungsgebühr (ca. 80-120€)",
        "Kosten pro Einsatz (ca. 30-100€)",
        "Monatliche Bereitschaftspauschale (ca. 30-60€)"
      ],
      "vorteile": [
        "Professionelle Ausführung",
        "Zeitsparend für Sie",
        "Haftungsübernahme durch den Dienstleister",
        "Auch bei Abwesenheit gesichert",
        "Einsatz professioneller Geräte und Techniken"
      ],
      "nachteile": [
        "Höhere laufende Kosten",
        "Abhängigkeit vom Serviceanbieter",
        "Begrenzte Kontrolle über Zeitpunkt",
        "Möglicherweise standardisierte Streumittelwahl"
      ]
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
            <span className="text-foreground capitalize">Winterdienst</span>
          </div>
          
          <div className="max-w-4xl">
            {/* Tag/Badge */}
            <div className="inline-flex items-center rounded-full border border-blue-200 px-2.5 py-0.5 text-xs font-semibold text-blue-600 bg-blue-50 mb-3">
              Winterdienst
            </div>
            
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
              {/* Einführung */}
              <div className="prose max-w-none mb-8">
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="text-blue-800">
                    Wenn der Winter kommt, stellt sich für Hausbesitzer und Mieter gleichermaßen die Frage: Soll ich den Winterdienst selbst erledigen oder lieber einen professionellen Dienstleister beauftragen? In diesem ausführlichen Vergleich beleuchten wir alle wichtigen Aspekte – von den Kosten über den Zeitaufwand bis hin zu praktischen Überlegungen – um Ihnen eine fundierte Entscheidungsgrundlage zu bieten.
                  </p>
                </div>
                
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">DIY-Winterdienst: Was benötigen Sie?</h2>
                
                <p>
                  Wenn Sie sich für den DIY-Winterdienst entscheiden, benötigen Sie eine grundlegende Ausrüstung. Die Anschaffungskosten variieren je nach Flächengröße und Anspruch an die Qualität.
                </p>
                
                <div className="space-y-5 my-6">
                  {diyWinterserviceTipps.steps.map((step, index) => (
                    <div key={index} className={`bg-white shadow-sm rounded-lg p-5 border ${step.number === 3 ? 'border-blue-200' : 'border-gray-200'}`}>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-semibold mr-3">
                          {step.number}
                        </div>
                        {step.title}
                      </h3>
                      
                      {step.intro && <p className="mb-4 text-gray-700">{step.intro}</p>}
                      
                      <div className="space-y-3">
                        {step.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-2">
                            <div className="p-1 rounded-full bg-blue-50 text-blue-600 mt-0.5 flex-shrink-0">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="font-medium">{item.title}:</span> {item.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Kostenvergleich: DIY vs. professioneller Winterdienst</h2>
                
                <p>
                  Ein zentraler Aspekt bei der Entscheidung zwischen Eigenleistung und professionellem Winterdienst sind die Kosten. Hier bieten wir einen detaillierten Vergleich für verschiedene Grundstücksgrößen.
                </p>
                
                <div className="space-y-4 my-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                      Kostenfaktoren für den DIY-Winterdienst
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Einmalige Kosten (Ausrüstung)</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span>Schneeschieber:</span>
                            <span className="font-medium">30-60 €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Schneeschaufel:</span>
                            <span className="font-medium">25-40 €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Streuwagen (optional):</span>
                            <span className="font-medium">60-120 €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Winterkleidung/Handschuhe:</span>
                            <span className="font-medium">60-150 €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Schneefräse (optional):</span>
                            <span className="font-medium">300-1.500 €</span>
                          </div>
                          <div className="pt-2 border-t border-gray-100 mt-1">
                            <div className="flex justify-between font-medium">
                              <span>Gesamt (Basis):</span>
                              <span>115-250 €</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Laufende Kosten (pro Saison)</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span>Streumittel:</span>
                            <span className="font-medium">0,30-2,50 € pro kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kleinere Reparaturen:</span>
                            <span className="font-medium">~15 €</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Zeit (15-20 Einsätze):</span>
                            <span className="font-medium">30-100 Stunden</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Wert der Zeit (25 €/h):</span>
                            <span className="font-medium">750-2.500 €</span>
                          </div>
                          <div className="pt-2 border-t border-gray-100 mt-1">
                            <div className="flex justify-between font-medium">
                              <span>Saison (ohne Zeitwert):</span>
                              <span>65-120 €</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                      Kosten für professionellen Winterdienst (Marktpreise 2025)
                    </h3>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span>Einrichtungsgebühr (einmalig):</span>
                          <span className="font-medium">80-120 €</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span>Bereitschaftspauschale:</span>
                          <span className="font-medium">20-100 € pro Monat</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span>Kosten pro Einsatz (kleine Fläche):</span>
                          <span className="font-medium">30-50 €</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span>Kosten pro Einsatz (mittlere Fläche):</span>
                          <span className="font-medium">50-80 €</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                          <span>Kosten pro Einsatz (große Fläche):</span>
                          <span className="font-medium">80-130 €</span>
                        </div>
                        <div className="pt-2">
                          <h4 className="font-medium mb-2">Gesamtkosten für eine Saison (15-20 Einsätze):</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="text-center">
                                <div className="text-sm text-gray-600 mb-1">Kleine Fläche</div>
                                <div className="text-xl font-bold text-blue-700">
                                  800-1.200 €
                                </div>
                              </div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="text-center">
                                <div className="text-sm text-gray-600 mb-1">Mittlere Fläche</div>
                                <div className="text-xl font-bold text-blue-700">
                                  1.000-1.700 €
                                </div>
                              </div>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="text-center">
                                <div className="text-sm text-gray-600 mb-1">Große Fläche</div>
                                <div className="text-xl font-bold text-blue-700">
                                  1.500-2.800 €
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Marktpreisbeispiel 2025 */}
                <div className="bg-blue-50 p-5 rounded-lg my-6 border border-blue-100">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <BarChart className="h-5 w-5 text-blue-600 mr-2" />
                    Aktuelle Marktpreise 2025 - Fallbeispiel
                  </h3>
                  
                  <div className="space-y-3">
                    <p>
                      Für ein typisches Mehrparteienhaus mit einem Fußweg, einer Einfahrt und einem kleinen Parkplatz (insgesamt 60 m²) liegen die Kosten für professionellen Winterdienst bei durchschnittlich:
                    </p>
                    <ul className="space-y-2 pl-5 list-disc">
                      <li>Einrichtungsgebühr: 90 €</li>
                      <li>Preis pro m²: 2 € für maschinelle Räumung</li>
                      <li>Bereitschaftspauschale: 40 € pro Monat (200 € für 5 Monate)</li>
                      <li>Bei 15 Einsätzen pro Saison: 15 × 60m² × 2€/m² = 1.800 €</li>
                      <li><strong>Gesamtkosten erste Saison: ca. 2.090 €</strong></li>
                    </ul>
                    <p>
                      Die DIY-Alternative würde kosten:
                    </p>
                    <ul className="space-y-2 pl-5 list-disc">
                      <li>Basisausrüstung: 200 €</li>
                      <li>Streumittel: 60 € pro Saison</li>
                      <li>Zeitaufwand: ca. 45 Stunden pro Saison</li>
                      <li><strong>Gesamtkosten erste Saison: ca. 260 € (ohne Zeitbewertung)</strong></li>
                      <li>Bei Bewertung der Arbeitszeit mit 25€/h: zusätzlich 1.125 €</li>
                    </ul>
                  </div>
                </div>
                
                {/* Interaktiver Kostenrechner */}
                <h2 className="text-2xl font-semibold mt-10 mb-4">Interaktiver Kostenrechner</h2>
                <p className="mb-4">
                  Nutzen Sie unseren interaktiven Rechner, um die Kosten für Ihre spezifische Situation zu ermitteln. Passen Sie die Parameter an Ihre Bedürfnisse an.
                </p>
                
                <CostCalculator />
                
                <h2 className="text-2xl font-semibold mt-10 mb-4">Vor- und Nachteile im Überblick</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                    <h3 className="text-lg font-semibold mb-3 text-green-800">DIY-Winterdienst</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          Vorteile
                        </h4>
                        <ul className="space-y-2 pl-7 list-disc text-sm">
                          {vergleichsDaten.diy.vorteile.map((vorteil, index) => (
                            <li key={index}>{vorteil}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          <X className="h-4 w-4 text-red-600 mr-2" />
                          Nachteile
                        </h4>
                        <ul className="space-y-2 pl-7 list-disc text-sm">
                          {vergleichsDaten.diy.nachteile.map((nachteil, index) => (
                            <li key={index}>{nachteil}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-semibold mb-3 text-blue-800">Professioneller Winterdienst</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          Vorteile
                        </h4>
                        <ul className="space-y-2 pl-7 list-disc text-sm">
                          {vergleichsDaten.professional.vorteile.map((vorteil, index) => (
                            <li key={index}>{vorteil}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          <X className="h-4 w-4 text-red-600 mr-2" />
                          Nachteile
                        </h4>
                        <ul className="space-y-2 pl-7 list-disc text-sm">
                          {vergleichsDaten.professional.nachteile.map((nachteil, index) => (
                            <li key={index}>{nachteil}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg my-6 border border-amber-200">
                  <div className="flex items-start gap-3">
                    <SlidersHorizontal className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-2">Entscheidungshilfe: Wann lohnt sich welche Option?</h4>
                      <p className="mb-3 text-sm">Die richtige Wahl hängt von verschiedenen persönlichen Faktoren ab:</p>
                      
                      <div className="space-y-1 text-sm">
                        <p><strong>DIY-Winterdienst empfehlenswert bei:</strong></p>
                        <ul className="pl-5 list-disc space-y-1 mb-3">
                          <li>Kleinen bis mittleren Flächen (bis ca. 100 m²)</li>
                          <li>Guter körperlicher Fitness und gesundheitlicher Verfassung</li>
                          <li>Flexiblen Arbeitszeiten oder Home-Office</li>
                          <li>Geringem oder mittlerem Schneeaufkommen in Ihrer Region</li>
                          <li>Wenn Sie ohnehin früh aufstehen und Zeit haben</li>
                        </ul>
                        
                        <p><strong>Professioneller Winterdienst empfehlenswert bei:</strong></p>
                        <ul className="pl-5 list-disc space-y-1">
                          <li>Größeren Flächen (über 100 m²)</li>
                          <li>Eingeschränkter Mobilität oder gesundheitlichen Einschränkungen</li>
                          <li>Berufstätigkeit mit wenig zeitlicher Flexibilität</li>
                          <li>Häufiger Abwesenheit oder Reisen</li>
                          <li>Erhöhtem Haftungsrisiko (z.B. bei Geschäftsgrundstücken)</li>
                          <li>Regionen mit starkem Schneeaufkommen</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Umweltaspekte</h2>
                <p className="mb-4">
                  Neben Kosten und Aufwand spielen auch Umweltaspekte bei der Winterdienstentscheidung eine Rolle. Professionelle Dienste verfügen oft über effizientere Geräte und optimierte Streumethoden, während beim DIY-Ansatz die freie Wahl umweltfreundlicher Streumittel möglich ist.
                </p>
                <p>
                  <strong>Detaillierte Informationen zu umweltfreundlichen Streumitteln</strong> und deren Vor- und Nachteilen finden Sie in unserem separaten Artikel: 
                  <Link href="/blog/StreumittelRechnerundVergleich" className="text-blue-600 hover:underline ml-1">
                    Streumittel-Vergleich 2025 mit interaktivem Bedarfsrechner
                  </Link>
                </p>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Rechtliche Hinweise</h2>
                
                <p className="mb-4">
                  Unabhängig davon, ob Sie selbst räumen oder einen Dienstleister beauftragen – als Eigentümer bleiben Sie für die ordnungsgemäße Erfüllung der Räumpflicht verantwortlich. Bei Beauftragung eines professionellen Dienstes sollten Sie auf einen schriftlichen Vertrag mit klaren Leistungsbeschreibungen und Haftungsregelungen bestehen.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                  <p className="text-sm">
                    <strong>Wichtig:</strong> Die Räum- und Streupflicht sowie die zeitlichen Vorgaben variieren je nach Bundesland und Kommune. Für detaillierte rechtliche Informationen und regionale Besonderheiten lesen Sie bitte unseren ausführlichen Artikel: 
                    <Link href="/blog/RaeumpflichtGuide2025" className="text-blue-600 hover:underline ml-1">
                      Räumpflicht-Guide 2025
                    </Link>
                  </p>
                </div>
                
                <h2 className="text-2xl font-semibold mt-8 mb-4">Fazit</h2>
                
                <p className="mb-4">
                  Die Entscheidung für DIY-Winterdienst oder einen professionellen Service hängt letztlich von Ihren individuellen Umständen ab. Während der Selbst-Winterdienst langfristig kostengünstiger sein kann, bietet die professionelle Lösung erhebliche Zeitersparnis und rechtliche Sicherheit.
                </p>
                
                <p className="mb-4">
                  Für kleine Flächen und Personen mit flexiblen Zeitplänen kann DIY die wirtschaftlichere Option sein. Für größere Flächen, Personen mit begrenzter Zeit oder körperlichen Einschränkungen und in Regionen mit starkem Schneefall überwiegen oft die Vorteile eines professionellen Dienstes.
                </p>
                
                <p>
                  Mit unserem Kostenrechner können Sie einen ersten Überblick gewinnen, welche Option für Ihre spezifische Situation wirtschaftlicher ist. Berücksichtigen Sie neben den reinen Kosten aber auch den Zeitaufwand und Ihren persönlichen Komfort in Ihrer Entscheidung.
                </p>
                
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
                      Wer den Winterdienst selbst erledigen möchte, sollte bei der Anschaffung der Ausrüstung auf Qualität achten. Ein ergonomischer Schneeschieber mit verstellbarem Stiel schont den Rücken und macht die Arbeit effizienter.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Besonders wichtig: Bereiten Sie sich rechtzeitig auf den Winter vor! Beschaffen Sie Streumittel und Equipment bereits im Herbst – bei Wintereinbruch sind die Preise höher und die Verfügbarkeit schlechter.
                    </Paragraph>
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
                        href="/blog/StreumittelRechnerundVergleich" 
                        className="flex items-center p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="mr-3 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                          <Calculator className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">                        Streumittel-Vergleich mit interaktivem Rechner
                          </h3>
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
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
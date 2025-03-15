"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { H3, Paragraph } from "@/components/ui/typography";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Cpu,
  Camera,
  Users,
  Radio,
  Smartphone,
  Building,
  BarChart3,
  Download,
  Send,
  Award,
  AlertTriangle,
  ThumbsUp,
  Server,
  Eye,
  HardDrive,
  FileQuestion,
  MapPin
} from "lucide-react";

// Typen für das Bewertungssystem
type SecurityCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  questions: {
    id: string;
    question: string;
    tooltip?: string;
    type: 'yesno' | 'scale' | 'multiple';
    options?: { value: string; label: string; points: number }[];
    maxPoints: number;
  }[];
};

type Assessment = {
  [categoryId: string]: {
    [questionId: string]: number | string;
  };
};

type Results = {
  categoryScores: {
    [categoryId: string]: {
      score: number;
      maxPossible: number;
      percentage: number;
    };
  };
  overallScore: number;
  overallPercentage: number;
  riskLevel: 'Niedrig' | 'Mittel' | 'Hoch' | 'Kritisch';
  recommendations: string[];
};

// Bewertungsmatrix für die Gebäudesicherheit
const securityCategories: SecurityCategory[] = [
  {
    id: 'physical',
    name: 'Physische Sicherheit',
    icon: <Building className="h-5 w-5" />,
    description: 'Bewertung der physischen Zugangskontrollen und Schutzmaßnahmen des Gebäudes',
    questions: [
      {
        id: 'access_control',
        question: 'Welche Art von Zugangskontrollsystem wird verwendet?',
        type: 'multiple',
        options: [
          { value: 'none', label: 'Keine elektronische Zugangskontrolle', points: 0 },
          { value: 'basic', label: 'Einfache Schlüsselkartensysteme', points: 5 },
          { value: 'advanced', label: 'Biometrische Systeme (Fingerabdruck, Gesichtserkennung)', points: 10 },
          { value: 'integrated', label: 'Integriertes System mit Multi-Faktor-Authentifizierung', points: 15 }
        ],
        maxPoints: 15
      },
      {
        id: 'perimeter',
        question: 'Ist das Gebäudeumfeld (Perimeter) gesichert?',
        tooltip: 'z.B. durch Zäune, Barrieren, Beleuchtung',
        type: 'yesno',
        maxPoints: 10
      },
      {
        id: 'cctv',
        question: 'Wie umfassend ist die Videoüberwachung?',
        type: 'scale',
        maxPoints: 15
      },
      {
        id: 'security_personnel',
        question: 'Gibt es Sicherheitspersonal vor Ort?',
        type: 'multiple',
        options: [
          { value: 'none', label: 'Nein', points: 0 },
          { value: 'limited', label: 'Teilweise (nicht rund um die Uhr)', points: 5 },
          { value: 'fulltime', label: '24/7 Anwesenheit', points: 10 }
        ],
        maxPoints: 10
      },
      {
        id: 'emergency_exits',
        question: 'Sind Notausgänge angemessen gesichert und überwacht?',
        type: 'yesno',
        maxPoints: 10
      }
    ]
  },
  {
    id: 'cyber',
    name: 'Cybersicherheit',
    icon: <Cpu className="h-5 w-5" />,
    description: 'Bewertung der digitalen Sicherheitsmaßnahmen und Netzwerkinfrastruktur',
    questions: [
      {
        id: 'network_security',
        question: 'Wie stark ist die Netzwerksicherheit?',
        tooltip: 'Firewalls, VPN, segmentierte Netzwerke',
        type: 'scale',
        maxPoints: 15
      },
      {
        id: 'device_security',
        question: 'Werden IoT-Geräte und Sensoren regelmäßig aktualisiert und gesichert?',
        type: 'yesno',
        maxPoints: 10
      },
      {
        id: 'data_encryption',
        question: 'Werden Daten verschlüsselt übertragen und gespeichert?',
        type: 'multiple',
        options: [
          { value: 'none', label: 'Keine Verschlüsselung', points: 0 },
          { value: 'partial', label: 'Teilweise Verschlüsselung', points: 5 },
          { value: 'full', label: 'Vollständige Verschlüsselung', points: 10 }
        ],
        maxPoints: 10
      },
      {
        id: 'system_isolation',
        question: 'Sind kritische Gebäudesysteme vom allgemeinen Netzwerk isoliert?',
        type: 'yesno',
        maxPoints: 10
      },
      {
        id: 'penetration_tests',
        question: 'Werden regelmäßig Sicherheitsaudits und Penetrationstests durchgeführt?',
        type: 'yesno',
        maxPoints: 10
      }
    ]
  },
  {
    id: 'surveillance',
    name: 'Überwachungssysteme',
    icon: <Camera className="h-5 w-5" />,
    description: 'Bewertung der Überwachungstechnologien und -abdeckung',
    questions: [
      {
        id: 'camera_coverage',
        question: 'Wie umfassend ist die Kameraabdeckung im Gebäude?',
        type: 'scale',
        maxPoints: 15
      },
      {
        id: 'intelligent_surveillance',
        question: 'Werden KI-basierte Überwachungssysteme eingesetzt?',
        tooltip: 'z.B. Anomalieerkennung, Gesichtserkennung, Objekt-Tracking',
        type: 'multiple',
        options: [
          { value: 'none', label: 'Keine intelligenten Systeme', points: 0 },
          { value: 'basic', label: 'Einfache Bewegungserkennung', points: 5 },
          { value: 'advanced', label: 'Fortschrittliche KI-Analyse', points: 10 }
        ],
        maxPoints: 10
      },
      {
        id: 'data_retention',
        question: 'Wie lange werden Überwachungsdaten gespeichert?',
        type: 'multiple',
        options: [
          { value: 'short', label: 'Weniger als 1 Woche', points: 3 },
          { value: 'medium', label: '1-4 Wochen', points: 7 },
          { value: 'long', label: 'Mehr als 1 Monat', points: 10 }
        ],
        maxPoints: 10
      },
      {
        id: 'remote_monitoring',
        question: 'Ist eine Fernüberwachung möglich?',
        type: 'yesno',
        maxPoints: 5
      },
      {
        id: 'privacy_compliance',
        question: 'Entsprechen die Überwachungssysteme den Datenschutzbestimmungen?',
        tooltip: 'DSGVO, Betriebsvereinbarungen, Informationspflichten',
        type: 'yesno',
        maxPoints: 10
      }
    ]
  },
  {
    id: 'integration',
    name: 'Systemintegration',
    icon: <Server className="h-5 w-5" />,
    description: 'Bewertung der Integration verschiedener Sicherheitssysteme',
    questions: [
      {
        id: 'central_management',
        question: 'Gibt es ein zentrales Management-System für alle Sicherheitskomponenten?',
        type: 'yesno',
        maxPoints: 10
      },
      {
        id: 'api_integration',
        question: 'Wie gut sind Sicherheitssysteme mit anderen Gebäudesystemen integriert?',
        tooltip: 'z.B. HVAC, Aufzüge, Brandschutz',
        type: 'scale',
        maxPoints: 15
      },
      {
        id: 'mobile_integration',
        question: 'Gibt es mobile Anwendungen für die Sicherheitsüberwachung?',
        type: 'yesno',
        maxPoints: 5
      },
      {
        id: 'interoperability',
        question: 'Welche Interoperabilität besteht zwischen verschiedenen Herstellern/Systemen?',
        type: 'multiple',
        options: [
          { value: 'none', label: 'Keine Interoperabilität', points: 0 },
          { value: 'limited', label: 'Begrenzte Interoperabilität', points: 5 },
          { value: 'full', label: 'Vollständige Interoperabilität', points: 10 }
        ],
        maxPoints: 10
      },
      {
        id: 'future_expandability',
        question: 'Ist das System für zukünftige Erweiterungen ausgelegt?',
        type: 'yesno',
        maxPoints: 10
      }
    ]
  },
  {
    id: 'emergency',
    name: 'Notfallmanagement',
    icon: <AlertTriangle className="h-5 w-5" />,
    description: 'Bewertung der Notfallpläne und -systeme',
    questions: [
      {
        id: 'emergency_plan',
        question: 'Existiert ein detaillierter Notfallplan?',
        type: 'yesno',
        maxPoints: 10
      },
      {
        id: 'automatic_alerts',
        question: 'Gibt es automatisierte Alarmsysteme bei Sicherheitsvorfällen?',
        type: 'multiple',
        options: [
          { value: 'none', label: 'Keine automatisierten Alarme', points: 0 },
          { value: 'basic', label: 'Grundlegende Alarmierung', points: 5 },
          { value: 'advanced', label: 'Fortschrittliche prädiktive Alarme', points: 10 }
        ],
        maxPoints: 10
      },
      {
        id: 'backup_systems',
        question: 'Gibt es Backup-Systeme für Stromversorgung und Kommunikation?',
        type: 'yesno',
        maxPoints: 10
      },
      {
        id: 'drills',
        question: 'Wie oft werden Notfallübungen durchgeführt?',
        type: 'multiple',
        options: [
          { value: 'never', label: 'Nie', points: 0 },
          { value: 'rare', label: 'Selten (weniger als jährlich)', points: 3 },
          { value: 'yearly', label: 'Jährlich', points: 7 },
          { value: 'regular', label: 'Regelmäßig (mehrmals pro Jahr)', points: 10 }
        ],
        maxPoints: 10
      },
      {
        id: 'emergency_response',
        question: 'Wie schnell ist die Reaktionszeit bei Notfällen?',
        type: 'scale',
        maxPoints: 15
      }
    ]
  }
];

// Generiere Empfehlungen basierend auf den Ergebnissen
const generateRecommendations = (results: Results): string[] => {
  const recommendations: string[] = [];
  const categories = Object.keys(results.categoryScores);
  
  categories.forEach(categoryId => {
    const score = results.categoryScores[categoryId].percentage;
    const category = securityCategories.find(c => c.id === categoryId);
    
    if (!category) return;
    
    if (score < 40) {
      recommendations.push(`Kritische Verbesserungen im Bereich ${category.name} erforderlich. Eine umfassende Überarbeitung wird empfohlen.`);
    } else if (score < 70) {
      recommendations.push(`Verbesserungen im Bereich ${category.name} sollten priorisiert werden.`);
    } else if (score < 90) {
      recommendations.push(`Gezielte Optimierungen im Bereich ${category.name} könnten die Sicherheit weiter verbessern.`);
    }
  });
  
  // Allgemeine Empfehlungen basierend auf dem Gesamtergebnis
  if (results.overallPercentage < 50) {
    recommendations.push('Es wird dringend empfohlen, eine professionelle Sicherheitsbewertung durchführen zu lassen.');
  }
  
  if (results.overallPercentage < 70) {
    recommendations.push('Ziehen Sie die Implementierung eines integrierten Sicherheitsmanagementsystems in Betracht.');
  }
  
  // Ergänzung mit allgemeinen Smart Building Sicherheitsempfehlungen
  recommendations.push('Implementieren Sie regelmäßige Sicherheitsaudits, um mit neuen Bedrohungen Schritt zu halten.');
  recommendations.push('Schulen Sie alle Mitarbeiter regelmäßig zu Sicherheitsprotokollen und Bedrohungserkennung.');
  
  return recommendations;
};

// Bewertungsstufen
const getRiskLevel = (percentage: number): 'Niedrig' | 'Mittel' | 'Hoch' | 'Kritisch' => {
  if (percentage >= 80) return 'Niedrig';
  if (percentage >= 60) return 'Mittel';
  if (percentage >= 40) return 'Hoch';
  return 'Kritisch';
};

// Farben für die verschiedenen Risikostufen
const getRiskColor = (riskLevel: 'Niedrig' | 'Mittel' | 'Hoch' | 'Kritisch'): string => {
  switch (riskLevel) {
    case 'Niedrig': return 'bg-green-500';
    case 'Mittel': return 'bg-yellow-500';
    case 'Hoch': return 'bg-orange-500';
    case 'Kritisch': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

// Hauptkomponente: Sicherheitscheck-Tool
const SecurityCheckTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('intro');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [assessment, setAssessment] = useState<Assessment>({});
  const [results, setResults] = useState<Results | null>(null);
  const [buildingInfo, setBuildingInfo] = useState({
    name: '',
    address: '',
    type: '',
    size: '',
    contact: ''
  });
  
  // Funktion zum Verarbeiten der Antworten
  const handleAnswer = (categoryId: string, questionId: string, value: number | string) => {
    setAssessment(prev => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [questionId]: value
      }
    }));
  };
  
  // Berechnung der Ergebnisse
  const calculateResults = () => {
    const categoryScores: {
      [categoryId: string]: {
        score: number;
        maxPossible: number;
        percentage: number;
      };
    } = {};
    
    let totalScore = 0;
    let totalPossible = 0;
    
    securityCategories.forEach(category => {
      let categoryScore = 0;
      let categoryMaxPossible = 0;
      
      category.questions.forEach(question => {
        const answer = assessment[category.id]?.[question.id];
        let points = 0;
        
        if (question.type === 'yesno') {
          points = answer === 'yes' ? question.maxPoints : 0;
        } else if (question.type === 'scale') {
          const value = Number(answer) || 0;
          points = Math.round((value / 100) * question.maxPoints);
        } else if (question.type === 'multiple' && question.options) {
          const selectedOption = question.options.find(opt => opt.value === answer);
          points = selectedOption ? selectedOption.points : 0;
        }
        
        categoryScore += points;
        categoryMaxPossible += question.maxPoints;
      });
      
      const percentage = categoryMaxPossible > 0 ? Math.round((categoryScore / categoryMaxPossible) * 100) : 0;
      
      categoryScores[category.id] = {
        score: categoryScore,
        maxPossible: categoryMaxPossible,
        percentage
      };
      
      totalScore += categoryScore;
      totalPossible += categoryMaxPossible;
    });
    
    const overallPercentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
    const riskLevel = getRiskLevel(overallPercentage);
    
    const results: Results = {
      categoryScores,
      overallScore: totalScore,
      overallPercentage,
      riskLevel,
      recommendations: generateRecommendations({
        categoryScores,
        overallScore: totalScore,
        overallPercentage,
        riskLevel,
        recommendations: []
      })
    };
    
    setResults(results);
    setActiveTab('results');
  };
  
  // Navigieren durch die Bewertungskategorien
  const goToNextStep = () => {
    if (currentStep < securityCategories.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults();
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setActiveTab('intro');
    }
  };
  
  // Generiere ein PDF mit den Ergebnissen (simuliert)
  const generateReport = () => {
    alert('Der Bericht wird generiert und steht in Kürze zum Download bereit.');
    // In einer realen Implementierung würde hier die PDF-Generierung angestoßen
  };
  
  // Einführungsabschnitt des Tools
  const renderIntro = () => (
    <div className="space-y-6">
      <div className="text-center">
        <H3 className="text-xl font-bold mb-2">Smart Building Sicherheits-Check</H3>
        <Paragraph>Bewerten Sie die Sicherheit Ihres intelligenten Gebäudes mit unserem umfassenden Bewertungstool.</Paragraph>
      </div>
      
      <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
        <h4 className="font-semibold text-blue-800 flex items-center"><FileQuestion className="h-5 w-5 mr-2" /> Über dieses Tool</h4>
        <p className="text-sm text-blue-700 mt-1">
          Diese Bewertung umfasst fünf kritische Bereiche der Gebäudesicherheit und dauert etwa 10-15 Minuten. Nach Abschluss erhalten Sie eine detaillierte Auswertung mit personalisierten Empfehlungen.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gebäudeinformationen</CardTitle>
          <CardDescription>Geben Sie grundlegende Informationen über das zu bewertende Gebäude ein</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="building-name">Gebäudename</Label>
              <Input 
                id="building-name" 
                placeholder="z.B. Hauptverwaltung Nord" 
                value={buildingInfo.name}
                onChange={(e) => setBuildingInfo({...buildingInfo, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="building-type">Gebäudetyp</Label>
              <Input 
                id="building-type" 
                placeholder="z.B. Bürogebäude, Lager, Produktionsstätte" 
                value={buildingInfo.type}
                onChange={(e) => setBuildingInfo({...buildingInfo, type: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="building-address">Adresse</Label>
              <Input 
                id="building-address" 
                placeholder="Vollständige Adresse" 
                value={buildingInfo.address}
                onChange={(e) => setBuildingInfo({...buildingInfo, address: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="building-size">Gebäudegröße</Label>
              <Input 
                id="building-size" 
                placeholder="z.B. 5000 m², 3 Etagen" 
                value={buildingInfo.size}
                onChange={(e) => setBuildingInfo({...buildingInfo, size: e.target.value})}
              />
            </div>
            
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contact-info">Kontaktperson</Label>
              <Input 
                id="contact-info" 
                placeholder="Name und Funktion" 
                value={buildingInfo.contact}
                onChange={(e) => setBuildingInfo({...buildingInfo, contact: e.target.value})}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => { setActiveTab('assessment'); setCurrentStep(0); }} className="w-full md:w-auto">
            Bewertung beginnen
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">Diese Bewertung basiert auf Best Practices und Branchenstandards für intelligente Gebäudesicherheit. Sie ersetzt keine professionelle Sicherheitsberatung.</p>
        <p>Alle eingegebenen Daten werden nur lokal in Ihrem Browser verarbeitet und nicht an Server übermittelt.</p>
      </div>
    </div>
  );
  
  // Bewertungsfragen rendern
  const renderAssessment = () => {
    const currentCategory = securityCategories[currentStep];
    
    if (!currentCategory) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="w-1/3">
            <div className="flex flex-col items-center">
              {currentCategory.icon}
              <span className="mt-2 text-center font-medium">{currentCategory.name}</span>
            </div>
          </div>
          <div className="w-2/3">
            <Progress value={((currentStep + 1) / securityCategories.length) * 100} className="h-2" />
            <div className="mt-2 text-sm text-muted-foreground text-right">
              Schritt {currentStep + 1} von {securityCategories.length}
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{currentCategory.name}</CardTitle>
            <CardDescription>{currentCategory.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {currentCategory.questions.map((question) => (
                <div key={question.id} className="space-y-3">
                  <div className="flex items-center">
                    <Label className="text-base">
                      {question.question}
                      {question.tooltip && (
                        <span className="ml-2 text-xs text-muted-foreground italic">
                          ({question.tooltip})
                        </span>
                      )}
                    </Label>
                  </div>
                  
                  {question.type === 'yesno' && (
                    <RadioGroup
                      value={(assessment[currentCategory.id]?.[question.id] as string) || ''}
                      onValueChange={(value) => handleAnswer(currentCategory.id, question.id, value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id={`${question.id}-yes`} />
                        <Label htmlFor={`${question.id}-yes`}>Ja</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id={`${question.id}-no`} />
                        <Label htmlFor={`${question.id}-no`}>Nein</Label>
                      </div>
                    </RadioGroup>
                  )}
                  
                  {question.type === 'scale' && (
                    <div className="space-y-2">
                      <Slider
                        value={[Number(assessment[currentCategory.id]?.[question.id] || 0)]}
                        min={0}
                        max={100}
                        step={10}
                        onValueChange={(values) => handleAnswer(currentCategory.id, question.id, values[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Niedrig</span>
                        <span>Mittel</span>
                        <span>Hoch</span>
                      </div>
                    </div>
                  )}
                  
                  {question.type === 'multiple' && question.options && (
                    <RadioGroup
                      value={(assessment[currentCategory.id]?.[question.id] as string) || ''}
                      onValueChange={(value) => handleAnswer(currentCategory.id, question.id, value)}
                      className="space-y-2"
                    >
                      {question.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                          <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={goToPreviousStep}>
              Zurück
            </Button>
            <Button onClick={goToNextStep}>
              {currentStep < securityCategories.length - 1 ? 'Weiter' : 'Ergebnisse anzeigen'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  // Ergebnisse rendern
  const renderResults = () => {
    if (!results) return null;
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <H3 className="text-xl font-bold mb-2">Ihre Sicherheitsbewertung</H3>
          <Paragraph>
            {buildingInfo.name ? buildingInfo.name + ' - ' : ''}
            Generiert am {new Date().toLocaleDateString()}
          </Paragraph>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Gesamtergebnis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-gray-100">
                <div 
                  className={`absolute inset-0 rounded-full ${getRiskColor(results.riskLevel)}`} 
                  style={{ clipPath: `polygon(50% 50%, 50% 0%, ${50 + results.overallPercentage / 2}% 0%, 100% ${results.overallPercentage}%, 50% 50%)` }}
                ></div>
                <div className="relative text-3xl font-bold">{results.overallPercentage}%</div>
              </div>
              
              <Badge className={`text-white ${getRiskColor(results.riskLevel)} px-3 py-1 text-sm`}>
                Risikostufe: {results.riskLevel}
              </Badge>
              
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {securityCategories.map((category) => {
                  const score = results.categoryScores[category.id];
                  if (!score) return null;
                  
                  return (
                    <div key={category.id} className="border rounded-md p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-2 font-medium">{category.name}</span>
                        </div>
                        <span className="font-bold">{score.percentage}%</span>
                      </div>
                      <Progress value={score.percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ThumbsUp className="h-5 w-5 mr-2" />
              Empfehlungen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 rounded-md border p-4">
              <ul className="space-y-3">
                {results.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex">
                    <ShieldCheck className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button onClick={generateReport} className="w-full sm:w-auto flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Bericht herunterladen
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setActiveTab('intro');
                setAssessment({});
                setResults(null);
                setBuildingInfo({
                  name: '',
                  address: '',
                  type: '',
                  size: '',
                  contact: ''
                });
              }} 
              className="w-full sm:w-auto"
            >
              Neue Bewertung starten
            </Button>
          </CardFooter>
        </Card>
        
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
          <h4 className="font-semibold text-amber-800 flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" /> Haftungsausschluss
          </h4>
          <p className="text-sm text-amber-700 mt-1">
            Diese Bewertung dient nur zur Orientierung und ersetzt keine professionelle Sicherheitsanalyse. Für eine vollständige Bewertung wenden Sie sich bitte an Sicherheitsexperten.
          </p>
        </div>
      </div>
    );
  };
  
  // Hauptrender-Funktion
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border border-primary/20 shadow-lg">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="flex items-center">
            <Shield className="h-6 w-6 mr-2 text-primary" />
            Smart Building Sicherheits-Check 2025
          </CardTitle>
          <CardDescription>
            Bewerten Sie die Sicherheit Ihrer intelligenten Gebäudesysteme und identifizieren Sie potenzielle Schwachstellen
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="intro" className="mt-0 p-0">
              {renderIntro()}
            </TabsContent>
            <TabsContent value="assessment" className="mt-0 p-0">
              {renderAssessment()}
            </TabsContent>
            <TabsContent value="results" className="mt-0 p-0">
              {renderResults()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>Entwickelt von TREU Service | Letzte Aktualisierung: März 2025</p>
      </div>
    </div>
  );
};

export default SecurityCheckTool;
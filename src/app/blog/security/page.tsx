"use client"

import React, { useState, useEffect } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronRight, 
  Lock,
  CheckCircle, 
  FileCheck,
  Info,
  Download,
  BarChart,
  Share2,
  ShieldCheck,
  Check,
  Calendar,
  Clock,
  Mail,
  Phone,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Users,
  AlertCircle,
  BookOpen,
  Network,
  Shield,
  Server,
  Workflow
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import blogData from "@/i18n/de/blog.json"

// Interface für die Strukturen
interface LegalSource {
  name: string;
  section?: string;
  content: string;
}

interface EmergencyPlanStep {
  number: number;
  title: string;
  tasks: string[];
}

interface EmergencyPlanItem {
  title: string;
  description: string;
}

// Rating für Wichtigkeit
const PriorityRating = ({ value, maxValue = 5 }: { value: number, maxValue?: number }) => {
  const percentage = (value / maxValue) * 100;
  
  // Apple-inspirierte Farbe basierend auf Priorität
  const getColor = () => {
    if (percentage >= 80) return "#ff3b30"; // Apple Rot für höchste Priorität
    if (percentage >= 60) return "#ff9500"; // Apple Orange
    if (percentage >= 40) return "#ffcc00"; // Apple Gelb
    if (percentage >= 20) return "#30b0c7"; // Hellblau
    return "#34c759"; // Apple Grün für niedrige Priorität
  };
  
  return (
    <div className="flex items-center gap-2">
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: getColor() }}
        />
      </div>
      <div className="whitespace-nowrap text-xs font-medium">
        {value}/{maxValue}
      </div>
    </div>
  );
};

// Komponente für Notfallplan-Schritt mit Apple-Style
const EmergencyPlanStep = ({ 
  step, 
  isExpanded, 
  onToggle 
}: { 
  step: EmergencyPlanStep; 
  isExpanded: boolean; 
  onToggle: () => void;
}) => {
  return (
    <Card 
      className={`mb-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'shadow-md' : 'hover:shadow-sm'}`}
    >
      <CardHeader className={`pb-3 ${isExpanded ? 'bg-accent/10' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="text-accent font-semibold">{step.number}</span>
            </div>
            <CardTitle className="text-lg">{step.title}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="rounded-full h-8 w-8 p-0"
            onClick={onToggle}
          >
            {isExpanded ? 
              <ChevronUp className="h-5 w-5 text-gray-500" /> : 
              <ChevronDown className="h-5 w-5 text-gray-500" />}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[500px] py-4' : 'max-h-0 py-0'}`}>
        <ul className="space-y-2">
          {step.tasks.map((task: string, index: number) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 shrink-0" />
              <span className="text-sm">{task}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

// Komponente für Notfallplan-Element mit Apple-Style
const EmergencyPlanItem = ({ item }: { item: EmergencyPlanItem }) => {
  return (
    <Card className="border overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-3 bg-gray-50">
        <CardTitle className="text-base flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
            {item.title.includes("Notfall") && <AlertCircle className="h-4 w-4 text-accent" />}
            {item.title.includes("Verantwort") && <Users className="h-4 w-4 text-accent" />}
            {item.title.includes("Kommunikation") && <Network className="h-4 w-4 text-accent" />}
            {item.title.includes("Kontakt") && <Phone className="h-4 w-4 text-accent" />}
            {item.title.includes("Evakuierung") && <FileCheck className="h-4 w-4 text-accent" />}
            {item.title.includes("Wiederherstellung") && <Server className="h-4 w-4 text-accent" />}
            {!item.title.includes("Notfall") && 
             !item.title.includes("Verantwort") && 
             !item.title.includes("Kommunikation") && 
             !item.title.includes("Kontakt") && 
             !item.title.includes("Evakuierung") && 
             !item.title.includes("Wiederherstellung") && 
             <FileText className="h-4 w-4 text-accent" />}
          </div>
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600">{item.description}</p>
      </CardContent>
    </Card>
  );
};

// Legal Source Component mit Apple-Style
const LegalSourceCard = ({ source, priority = 3 }: { source: LegalSource; priority?: number }) => {
  return (
    <Card className="border-l-4 border-accent overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-medium text-base flex items-center">
            {source.name} {source.section && <span className="text-gray-500 ml-1">({source.section})</span>}
          </h4>
          <div className="w-24">
            <PriorityRating value={priority} />
          </div>
        </div>
        <p className="text-sm text-gray-600">{source.content}</p>
      </CardContent>
    </Card>
  );
};

// Hauptkomponente
export default function SecurityBlogPage() {
  // State für expandierte Schritte
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Daten aus der JSON-Datei
  const data = blogData.blog.emergency_plan;

  // Toggle für Schritte
  const toggleStep = (stepNumber: number) => {
    setExpandedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };
  
  // Scroll-to-top Funktionalität
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Funktion zum Teilen des Inhalts
  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: data.title,
        url: window.location.href
      }).catch(error => {
        console.log('Error sharing', error);
      });
    } else {
      // Fallback für Browser ohne Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link in die Zwischenablage kopiert!');
      });
    }
  };

  return (
    <div className="flex-1 relative">
      <Section className="pt-6 pb-6 bg-gradient-to-b from-accent/5 to-background">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-accent">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Sicherheit</span>
          </div>
          
          <div className="max-w-4xl">
            {/* Tag/Badge - Hier wird accent statt teal verwendet */}
            <div className="inline-flex items-center rounded-full border border-accent/30 px-2.5 py-0.5 text-xs font-semibold text-accent bg-accent/5 mb-3">
              Sicherheit
            </div>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {data.title}
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              {data.subtitle}
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              {data.intro}
            </Paragraph>
          </div>
          
          <div className="flex items-center gap-6 text-muted-foreground mt-6">
            <div className="flex items-center gap-2">
              <div className="inline-block bg-accent/10 p-2 rounded-full">
                <Lock className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm">TREU Security Team</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{format(new Date('2024-02-20'), 'dd. MMMM yyyy', { locale: de })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">10 min</span>
            </div>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="prose max-w-none">
                <div className="mb-12">
                  <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-6 shadow-md">
                    <Image 
                      src="/images/blog/security.jpg" 
                      alt="Notfallpläne für Unternehmen"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-medium mb-2">Vorbereitet sein ist alles</h3>
                      <p className="text-sm text-white/80">Ein ausgereifter Notfallplan kann den Unterschied zwischen einer kleinen Störung und einer existenzbedrohenden Krise ausmachen.</p>
                    </div>
                  </div>

                  <Alert className="bg-accent/5 border-accent/20 mb-8">
                    <AlertDescription className="flex items-start">
                      <Info className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium mb-1">Warum Sie diesen Artikel lesen sollten:</p>
                        <p className="text-sm text-gray-700">
                          Notfallpläne sind nicht nur eine gesetzliche Anforderung, sondern ein essentielles Werkzeug für jedes Unternehmen. In diesem Artikel erfahren Sie, wie Sie einen effektiven Notfallplan erstellen, der sowohl den gesetzlichen Vorgaben entspricht als auch in der Praxis funktioniert.
                        </p>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>

                {/* PDF Notfallplan-Muster */}
                <div className="mb-12" id="notfallplan-pdf">
                  <div className="flex items-center justify-between mb-4">
                    <H2 className="text-2xl">Notfallplan-Muster</H2>
                    <a 
                      href="/pdfs/notfallplan-muster.pdf" 
                      download 
                      className="flex items-center bg-accent hover:bg-accent/90 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      PDF herunterladen
                    </a>
                  </div>
                  
                  <Card className="overflow-hidden border shadow-sm mb-6">
                    <CardContent className="p-0">
                      <object 
                        data="/pdfs/notfallplan-muster.pdf" 
                        type="application/pdf" 
                        width="100%" 
                        height="500px" 
                        className="rounded"
                      >
                        <p className="p-4">
                          Ihr Browser kann PDFs nicht anzeigen. 
                          <a href="/pdfs/notfallplan-muster.pdf" download className="text-accent hover:underline ml-1">
                            Klicken Sie hier, um das PDF herunterzuladen
                          </a>
                        </p>
                      </object>
                    </CardContent>
                  </Card>
                  
                  <Paragraph className="text-sm text-gray-600 italic">
                    Dieses Muster dient als Ausgangspunkt. Passen Sie es an die spezifischen Anforderungen und Risiken Ihres Unternehmens an.
                  </Paragraph>
                </div>

                {/* Gesetzliche Grundlagen mit neuer Komponente */}
                {data.legal_basis && (
                  <div className="mb-12" id="legal_basis">
                    <H2 className="mb-6 text-2xl">{data.legal_basis.title}</H2>
                    
                    <div className="flex gap-4 mb-6">
                      <div className="bg-accent/5 p-5 rounded-xl border border-accent/10 flex-1">
                        <h3 className="text-lg font-medium mb-3 flex items-center">
                          <AlertCircle className="h-5 w-5 text-accent mr-2" />
                          Wann ist ein Notfallplan notwendig?
                        </h3>
                        <p className="text-sm text-gray-700">{data.legal_basis.requirements.when_needed}</p>
                      </div>
                      
                      <div className="bg-accent/5 p-5 rounded-xl border border-accent/10 flex-1">
                        <h3 className="text-lg font-medium mb-3 flex items-center">
                          <Shield className="h-5 w-5 text-accent mr-2" />
                          Vorbereitung auf den Ernstfall
                        </h3>
                        <p className="text-sm text-gray-700">{data.legal_basis.requirements.preparation}</p>
                      </div>
                    </div>
                    
                    <H3 className="mb-4 text-xl">Gesetzliche Grundlagen</H3>
                    <div className="space-y-4">
                      <LegalSourceCard source={data.legal_basis.legal_sources[0]} priority={5} />
                      <LegalSourceCard source={data.legal_basis.legal_sources[1]} priority={4} />
                      <LegalSourceCard source={data.legal_basis.legal_sources[2]} priority={3} />
                      <LegalSourceCard source={data.legal_basis.legal_sources[3]} priority={3} />
                    </div>
                  </div>
                )}

                {/* Vorgaben - Was muss in einem Notfallplan stehen */}
                {data.required_content && (
                  <div className="mb-12" id="required_content">
                    <H2 className="mb-5 text-2xl flex items-center">
                      <FileCheck className="h-6 w-6 text-accent mr-3" />
                      {data.required_content.title}
                    </H2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {data.required_content.items.map((item, index) => (
                        <EmergencyPlanItem key={index} item={item} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Schritt-für-Schritt-Anleitung */}
                {data.creation_steps && (
                  <div className="mb-12" id="creation_steps">
                    <H2 className="mb-5 text-2xl flex items-center">
                      <Workflow className="h-6 w-6 text-accent mr-3" />
                      {data.creation_steps.title}
                    </H2>
                    
                    <div className="space-y-4">
                      {data.creation_steps.steps.map((step) => (
                        <EmergencyPlanStep 
                          key={step.number} 
                          step={step} 
                          isExpanded={!!expandedSteps[step.number]} 
                          onToggle={() => toggleStep(step.number)} 
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Digitaler Notfallplan */}
                <div className="mb-12" id="digital_emergency_plan">
                  <H2 className="mb-5 text-2xl">Moderne digitale Notfallpläne</H2>
                  
                  <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-md overflow-hidden mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Server className="h-5 w-5 text-accent" />
                        Vorteile digitaler Notfallpläne
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <h4 className="font-medium mb-2 flex items-center">
                            <CheckCircle className="h-4 w-4 text-accent mr-2" />
                            Echtzeit-Aktualisierung
                          </h4>
                          <p className="text-sm text-gray-600">
                            Digitale Notfallpläne können in Echtzeit aktualisiert werden, sodass alle relevanten Personen immer Zugriff auf die neueste Version haben.
                          </p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <h4 className="font-medium mb-2 flex items-center">
                            <CheckCircle className="h-4 w-4 text-accent mr-2" />
                            Schneller Zugriff
                          </h4>
                          <p className="text-sm text-gray-600">
                            Im Notfall kann über mobile Geräte sofort auf den Plan zugegriffen werden - unabhängig vom Standort der Verantwortlichen.
                          </p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <h4 className="font-medium mb-2 flex items-center">
                            <CheckCircle className="h-4 w-4 text-accent mr-2" />
                            Integration mit Warnsystemen
                          </h4>
                          <p className="text-sm text-gray-600">
                            Moderne digitale Notfallpläne können in Alarmsysteme integriert werden und automatisch bei bestimmten Ereignissen aktiviert werden.
                          </p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <h4 className="font-medium mb-2 flex items-center">
                            <CheckCircle className="h-4 w-4 text-accent mr-2" />
                            Analyse und Verbesserung
                          </h4>
                          <p className="text-sm text-gray-600">
                            Nach einem Notfall können digitale Pläne einfacher analysiert und verbessert werden, basierend auf den gesammelten Daten.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-white rounded-xl shadow-sm">
                        <h4 className="font-medium mb-2">Implementierungstipps:</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent mr-2 mt-1 shrink-0" />
                            <span className="text-sm">Wählen Sie eine zuverlässige Plattform mit End-to-End-Verschlüsselung</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent mr-2 mt-1 shrink-0" />
                            <span className="text-sm">Stellen Sie sicher, dass der Plan auch offline verfügbar ist</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent mr-2 mt-1 shrink-0" />
                            <span className="text-sm">Implementieren Sie ein Berechtigungssystem für verschiedene Zugriffsebenen</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="h-4 w-4 text-accent mr-2 mt-1 shrink-0" />
                            <span className="text-sm">Führen Sie regelmäßige Tests durch, um die Funktionalität zu überprüfen</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* ISO 22301 Abschnitt */}
                <div className="mb-12" id="iso_22301">
                  <H2 className="mb-5 text-2xl">Notfallpläne nach ISO 22301</H2>
                  
                  <Card className="border shadow-sm overflow-hidden mb-6">
                    <CardHeader className="bg-accent/5 border-b">
                      <CardTitle className="text-lg">Business Continuity Management</CardTitle>
                      <CardDescription>
                        Der internationale Standard für Notfallmanagement und Geschäftskontinuität
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-5">
                      <p className="text-sm text-gray-700 mb-4">
                        ISO 22301 legt die Anforderungen an ein Business Continuity Management System (BCMS) fest. 
                        Die Implementierung dieses Standards hilft Unternehmen, auf potenzielle Störungen und 
                        Ausfälle vorbereitet zu sein und den Geschäftsbetrieb schnellstmöglich wiederherzustellen.
                      </p>
                      
                      <div className="space-y-4 mt-6">
                        <div>
                          <h4 className="font-medium text-base mb-2">Kernelemente eines ISO 22301-konformen Notfallplans:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-3 rounded-lg border">
                              <h5 className="font-medium text-sm mb-1.5 flex items-center">
                                <BarChart className="h-4 w-4 text-accent mr-2" />
                                Business Impact Analysis
                              </h5>
                              <p className="text-xs text-gray-600">
                                Identifizierung kritischer Geschäftsprozesse und Bewertung potenzieller Auswirkungen von Störungen
                              </p>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-lg border">
                              <h5 className="font-medium text-sm mb-1.5 flex items-center">
                                <ShieldCheck className="h-4 w-4 text-accent mr-2" />
                                Risikobewertung
                              </h5>
                              <p className="text-xs text-gray-600">
                                Systematische Identifizierung und Bewertung potenzieller Bedrohungen und Schwachstellen
                              </p>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-lg border">
                              <h5 className="font-medium text-sm mb-1.5 flex items-center">
                                <Workflow className="h-4 w-4 text-accent mr-2" />
                                Business Continuity Strategie
                              </h5>
                              <p className="text-xs text-gray-600">
                                Definierte Strategien und Methoden zur Wiederherstellung kritischer Geschäftsaktivitäten
                              </p>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-lg border">
                              <h5 className="font-medium text-sm mb-1.5 flex items-center">
                                <FileCheck className="h-4 w-4 text-accent mr-2" />
                                Kontinuitätspläne
                              </h5>
                              <p className="text-xs text-gray-600">
                                Detaillierte Pläne und Verfahren für Notfälle und die Wiederherstellung des Betriebs
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <Alert className="bg-accent/5 border-accent/20">
                          <AlertDescription className="text-sm">
                            <p className="font-medium">Vorteile der ISO 22301-Zertifizierung:</p>
                            <ul className="mt-2 space-y-1">
                              <li className="flex items-start">
                                <Check className="h-4 w-4 text-accent mr-2 mt-0.5" />
                                <span>Nachweisbare Resilienz gegenüber Geschäftsunterbrechungen</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-4 w-4 text-accent mr-2 mt-0.5" />
                                <span>Wettbewerbsvorteil durch demonstrierte Zuverlässigkeit</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-4 w-4 text-accent mr-2 mt-0.5" />
                                <span>Reduzierung von Ausfallzeiten und finanziellen Verlusten</span>
                              </li>
                              <li className="flex items-start">
                                <Check className="h-4 w-4 text-accent mr-2 mt-0.5" />
                                <span>Erfüllung vertraglicher und regulatorischer Anforderungen</span>
                              </li>
                            </ul>
                          </AlertDescription>
                        </Alert>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Fazit am Ende */}
                {data.conclusion && (
                  <div className="mb-12 bg-gradient-to-r from-accent/5 to-gray-50 p-6 rounded-xl shadow-sm" id="conclusion">
                    <H2 className="mb-4 text-2xl">Fazit</H2>
                    
                    {data.conclusion.summary && (
                      <Paragraph className="text-base mb-4">{data.conclusion.summary}</Paragraph>
                    )}
                    
                    {data.conclusion.benefits && (
                      <div className="mb-5">
                        <H3 className="text-lg mb-3">Vorteile eines effektiven Notfallplans:</H3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {data.conclusion.benefits.map((benefit, index) => (
                            <div 
                              key={index} 
                              className="bg-white p-3 rounded-lg border shadow-sm flex items-start"
                            >
                              <CheckCircle className="h-5 w-5 text-accent mt-0.5 mr-3 shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {data.conclusion.final_note && (
                      <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                          Denken Sie daran:
                        </h4>
                        <p className="text-sm text-gray-700">{data.conclusion.final_note}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Artikel-Share */}
                <div className="mt-8 pt-4 border-t border-dashed flex justify-between items-center">
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Aktualisiert am {format(new Date(), 'dd.MM.yyyy', { locale: de })}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-gray-100"
                    onClick={shareContent}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Teilen
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Inhaltsverzeichnis */}
                <Card className="overflow-hidden shadow-sm rounded-xl border border-gray-200">
                  <CardHeader className="bg-gray-50 pb-2 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-accent" />
                      Inhaltsverzeichnis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[300px]">
                      <nav className="p-4">
                        <div className="space-y-1">
                          <a
                            href="#notfallplan-pdf"
                            className="flex items-center py-1.5 px-3 rounded-lg text-sm hover:bg-accent/5 transition-colors"
                          >
                            <Download className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                            Notfallplan-Muster
                          </a>
                          <a
                            href="#legal_basis"
                            className="flex items-center py-1.5 px-3 rounded-lg text-sm hover:bg-accent/5 transition-colors"
                          >
                            <FileText className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                            Gesetzliche Grundlagen
                          </a>
                          <a
                            href="#required_content"
                            className="flex items-center py-1.5 px-3 rounded-lg text-sm hover:bg-accent/5 transition-colors"
                          >
                            <FileCheck className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                            Vorgaben für Notfallpläne
                          </a>
                          <a
                            href="#creation_steps"
                            className="flex items-center py-1.5 px-3 rounded-lg text-sm hover:bg-accent/5 transition-colors"
                          >
                            <Workflow className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                            Schritt-für-Schritt Anleitung
                          </a>
                          <a
                            href="#digital_emergency_plan"
                            className="flex items-center py-1.5 px-3 rounded-lg text-sm hover:bg-accent/5 transition-colors"
                          >
                            <Server className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                            Digitale Notfallpläne
                          </a>
                          <a
                            href="#iso_22301"
                            className="flex items-center py-1.5 px-3 rounded-lg text-sm hover:bg-accent/5 transition-colors"
                          >
                            <ShieldCheck className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                            ISO 22301 Standard
                          </a>
                          <a
                            href="#conclusion"
                            className="flex items-center py-1.5 px-3 rounded-lg text-sm hover:bg-accent/5 transition-colors"
                          >
                            <Info className="h-4 w-4 text-accent mr-3 flex-shrink-0" />
                            Fazit
                          </a>
                        </div>
                      </nav>
                    </ScrollArea>
                  </CardContent>
                </Card>

                {/* Experten-Tipp Box */}
                <Card className="bg-accent/5 border-accent/20 overflow-hidden rounded-xl shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-6 w-6 text-yellow-500" />
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Führen Sie mindestens zweimal jährlich Notfallübungen durch, um sicherzustellen, dass alle Mitarbeiter wissen, was im Ernstfall zu tun ist. Dokumentieren Sie die Ergebnisse und passen Sie Ihren Notfallplan entsprechend an.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Tipp: Erstellen Sie zusätzlich zu Ihrem umfassenden Notfallplan auch kompakte &quot;Quick-Reference-Cards&quot; für verschiedene Notfallszenarien, die an strategischen Punkten im Unternehmen aufgehängt werden können.
                    </Paragraph>
                  </CardContent>
                </Card>
                
                {/* Verwandte Artikel */}
                <Card className="overflow-hidden rounded-xl shadow-sm">
                  <CardHeader className="bg-gray-50 pb-2 border-b">
                    <CardTitle className="text-lg">Weitere Artikel</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-1">
                      <Link 
                        href="/blog/reinigung" 
                        className="flex items-center py-2 px-3 rounded-lg hover:bg-accent/5 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                        <span className="text-sm">Reinigungsprobleme und Lösungen</span>
                      </Link>
                      <Link 
                        href="/blog/streumittel" 
                        className="flex items-center py-2 px-3 rounded-lg hover:bg-accent/5 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                        <span className="text-sm">Streugut-Vergleich für den Winterdienst</span>
                      </Link>
                      <Link 
                        href="/blog/StreumittelCalculator" 
                        className="flex items-center py-2 px-3 rounded-lg hover:bg-accent/5 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                        <span className="text-sm font-medium text-accent">Streumittel-Rechner (NEU)</span>
                      </Link>
                      <Link 
                        href="/blog/winterdienst" 
                        className="flex items-center py-2 px-3 rounded-lg hover:bg-accent/5 transition-colors"
                      >
                        <ArrowRight className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                        <span className="text-sm">DIY-Winterdienst Tipps</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Kontakt-CTA */}
                <Card className="bg-accent text-white rounded-xl shadow-md overflow-hidden">
                  <CardHeader className="pb-3 border-b border-white/20">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div className="p-2 bg-white/20 rounded-full">
                        <Phone className="h-4 w-4" />
                      </div>
                      Sicherheitsberatung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Paragraph className="text-sm text-white/90 mb-4">
                      Unsere Sicherheitsexperten bieten maßgeschneiderte Beratung für Ihr Unternehmen. Profitieren Sie von unserer Erfahrung im Bereich Notfallplanung und Sicherheitsmanagement.
                    </Paragraph>
                    <div className="space-y-3">
                      <Link href="/security#kontakt">
                        <Button className="w-full bg-white text-accent hover:bg-white/90">
                          Kostenfreies Beratungsgespräch
                        </Button>
                      </Link>

                      <div className="grid grid-cols-1 gap-2 mt-4">
                        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                          <Phone className="h-5 w-5 text-white" />
                          <div>
                            <div className="text-xs text-white/70">Telefon</div>
                            <div className="text-sm font-medium">0231 15044352</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
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
      
      {/* Scroll-to-top Button im Apple Stil */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-white shadow-lg rounded-full p-3 z-50 transition-all duration-300 transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        aria-label="Nach oben scrollen"
      >
        <ChevronUp className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  )
}
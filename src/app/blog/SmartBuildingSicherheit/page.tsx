"use client"

import React, { useState, useEffect, ReactNode } from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, Paragraph } from "@/components/ui/typography"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card"
import Link from 'next/link'
import Image from 'next/image'
import { 
  Shield, 
  CheckCircle, 
  Info, 
  Share2,
  Lock,
  Fingerprint,
  Eye,
  ShieldCheck,
  Calendar,
  Clock,
  Mail,
  Phone,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Bell,
  WifiOff,
  Plus,
  X,
  PieChart,
  Users
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import { cn } from "@/lib/utils"

// Typdefinitionen
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}

// Elegante, Apple-inspirierte Sicherheitsvorteile-Karte
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, index }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className={`bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 ${expanded ? 'shadow-md' : 'shadow-sm hover:shadow'}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent/10">
              {icon}
            </div>
            <h4 className="text-lg font-medium">{title}</h4>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-400 hover:text-accent hover:border-accent transition-colors"
          >
            {expanded ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
        
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        </div>
      </div>
    </div>
  );
};

interface StatisticCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

// Statistik-Komponente im Apple-Stil
const StatisticCard: React.FC<StatisticCardProps> = ({ value, label, icon, delay = 0 }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-6 flex flex-col items-center text-center transform transition-all duration-700 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <span className="text-3xl font-light tracking-tight mb-1">{value}</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
};

interface SecurityCategoryProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  className?: string;
}

// SecurityCategory Komponente im Apple-Stil
const SecurityCategory: React.FC<SecurityCategoryProps> = ({ title, subtitle, children, className }) => {
  return (
    <div className={cn("mb-16", className)}>
      <div className="mb-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

interface SecuritySolutionProps {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
}

// SecuritySolution Komponente im Apple-Stil
const SecuritySolution: React.FC<SecuritySolutionProps> = ({ title, description, features, icon }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className={`overflow-hidden transition-all duration-300 ${expanded ? 'shadow-md' : 'hover:shadow-sm border-accent/10'}`}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              {icon}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="rounded-full h-8 w-8 p-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className={`transition-all duration-500 ${expanded ? 'pb-5' : 'pb-0'}`}>
        <div className={`overflow-hidden transition-all duration-500 ${expanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          
          <div className="space-y-3 mt-4">
            <h4 className="text-sm font-medium mb-2">Hauptmerkmale:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4 text-accent" />
                  </div>
                  <p className="text-sm text-gray-600">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface SlideInSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// SlideInSection Komponente für Animation
const SlideInSection: React.FC<SlideInSectionProps> = ({ children, delay = 0, className = "" }) => {
  return (
    <div 
      className={cn("transform transition-all duration-1000 animate-fade-in-up", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function SmartBuildingSecurityPage() {
  // Funktion zum Teilen des Inhalts
  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: "Smart Building Sicherheitstechnologien für moderne Gebäude",
        url: window.location.href
      }).catch(error => {
        console.log('Error sharing', error);
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link in die Zwischenablage kopiert!');
      });
    }
  };
  
  // Scroll-To-Top Button mit Smooth Scrolling
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
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

  return (
    <div className="flex-1 relative bg-[#FAFAFA]">
      <Section className="pt-16 pb-16 bg-white border-b border-gray-200">
        <Container>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-accent/20 px-3 py-1 text-xs font-medium text-accent bg-accent/5 mb-6">
              Security
            </div>
            
            <SlideInSection delay={200} className="w-full">
              <H1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Smarte Sicherheitstechnologien für zeitgemäße Gebäude
              </H1>
            </SlideInSection>
            
            <SlideInSection delay={400} className="w-full">
              <Paragraph className="text-xl text-gray-500 mb-8 max-w-2xl">
                Entdecken Sie, wie moderne Sicherheitssysteme das Gebäudemanagement revolutionieren – intelligent, integriert und unsichtbar.
              </Paragraph>
            </SlideInSection>
            
            <div className="flex items-center gap-8 text-gray-500 mt-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{format(new Date(), 'dd. MMMM yyyy', { locale: de })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">12 min</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      
      <Section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <SlideInSection delay={600} className="w-full">
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-lg">
                  <Image 
                    src="/images/blog/smart-building.jpg" 
                    alt="Smart Building Sicherheitstechnologien"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </SlideInSection>

              {/* Einleitung */}
              <SlideInSection delay={800} className="w-full">
                <div className="mb-16">
                  <H2 className="text-3xl font-semibold mb-6">Die Renaissance der Gebäudesicherheit</H2>
                  <Paragraph className="text-lg text-gray-700 mb-6">
                    Smart Buildings sind weit mehr als nur intelligente Gebäudesteuerung. Sie repräsentieren eine fundamentale Neukonzeption dessen, was Sicherheit im 21. Jahrhundert bedeutet: proaktiv statt reaktiv, integriert statt isoliert, unsichtbar statt aufdringlich.
                  </Paragraph>
                  
                  <Paragraph className="text-lg text-gray-700 mb-6">
                    Die digitale Transformation hat eine neue Ära der Gebäudesicherheit eingeläutet, in der Echtzeitdaten, künstliche Intelligenz und nahtlose Integration die Grundpfeiler bilden. Diese Evolution schafft nicht nur sicherere Umgebungen, sondern verbessert auch das Nutzererlebnis und die betriebliche Effizienz.
                  </Paragraph>
                  
                  <div className="bg-accent/5 border border-accent/10 rounded-xl p-6 flex gap-4 items-start">
                    <Info className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Aktuelle Zahlen sprechen für sich:</span> Gebäude mit integrierten Sicherheitssystemen verzeichnen durchschnittlich 84% weniger Sicherheitsvorfälle, 60% schnellere Reaktionszeiten und eine um 76% höhere Nutzerzufriedenheit im Vergleich zu Gebäuden mit konventionellen Sicherheitslösungen.
                    </p>
                  </div>
                </div>
              </SlideInSection>

              {/* Statistik-Bereich */}
              <SlideInSection delay={1000} className="w-full">
                <div className="mb-16">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatisticCard 
                      value="93%" 
                      label="höhere Erkennnungsrate" 
                      icon={<Eye className="h-6 w-6 text-accent" />}
                      delay={0}
                    />
                    <StatisticCard 
                      value="78%" 
                      label="weniger falsche Alarme" 
                      icon={<Bell className="h-6 w-6 text-accent" />}
                      delay={200}
                    />
                    <StatisticCard 
                      value="3.4×" 
                      label="schnellere Reaktionszeit" 
                      icon={<PieChart className="h-6 w-6 text-accent" />}
                      delay={400}
                    />
                  </div>
                </div>
              </SlideInSection>

              {/* Zugangskontrolle */}
              <SecurityCategory
                title="Intelligente Zugangskontrolle"
                subtitle="Die erste Verteidigungslinie eines jeden Gebäudes neu gedacht"
                className="w-full"
              >
                <SecuritySolution
                  title="Biometrische Mehrfaktor-Authentifizierung"
                  description="Moderne biometrische Systeme haben die Welt der Zugangskontrolle revolutioniert. Anstatt sich auf etwas zu verlassen, das man besitzt (eine Karte) oder etwas, das man weiß (ein Passwort), nutzen biometrische Systeme das, was man ist – einzigartige biologische Merkmale, die nicht gefälscht oder gestohlen werden können."
                  features={[
                    "3D-Gesichtserkennung mit Lebenderkennungstechnologie",
                    "Multimodale Authentifizierung (Kombination mehrerer biometrischer Faktoren)",
                    "Verschlüsselte, dezentrale Speicherung biometrischer Templates",
                    "Kontinuierliche Authentifizierung durch Verhaltensmuster",
                    "Nahtlose Integration in Gebäudemanagementsysteme"
                  ]}
                  icon={<Fingerprint className="h-5 w-5 text-accent" />}
                />
                
                <SecuritySolution
                  title="Mobile Zutrittslösungen"
                  description="Smartphones haben physische Ausweise in vielen modernen Gebäuden obsolet gemacht. Mobile Zutrittslösungen verwandeln das Smartphone in einen sicheren, intelligenten Schlüssel mit erweiterten Funktionen weit über das hinaus, was traditionelle Zugangssysteme bieten können."
                  features={[
                    "Sichere, verschlüsselte Credentials auf dem Smartphone",
                    "Kontaktloser Zugang via BLE und NFC-Technologie",
                    "Dynamische Zugriffsrechte mit zeitlicher und räumlicher Begrenzung",
                    "Push-Benachrichtigungen bei Zugriffsversuchen",
                    "Integration mit biometrischer Authentifizierung des Smartphones"
                  ]}
                  icon={<Lock className="h-5 w-5 text-accent" />}
                />
                
                <SecuritySolution
                  title="Besuchermanagementsysteme"
                  description="Moderne Besuchermanagementsysteme haben den gesamten Gästeprozess digitalisiert – von der Voranmeldung bis zum Check-out. Sie verbinden nahtlos physische Sicherheit mit digitaler Effizienz und schaffen ein professionelles, reibungsloses Erlebnis für Besucher."
                  features={[
                    "Digitale Voranmeldung und Selbstregistrierung",
                    "Automatisierte Hintergrundprüfungen in Echtzeit",
                    "QR-Code basierte temporäre Zugriffsberechtigungen",
                    "Digitale Einweisung zu Sicherheitsvorschriften",
                    "Vollständiger Audit-Trail aller Besucherbewegungen"
                  ]}
                  icon={<Users className="h-5 w-5 text-accent" />}
                />
              </SecurityCategory>

              {/* Überwachung */}
              <SecurityCategory
                title="Intelligente Überwachungssysteme"
                subtitle="Von passiver Beobachtung zu aktiver Prävention"
                className="w-full"
              >
                <SecuritySolution
                  title="KI-gestützte Videoanalyse"
                  description="Künstliche Intelligenz transformiert Videoüberwachung von einem passiven Aufzeichnungssystem zu einem proaktiven Sicherheitsinstrument. Moderne Systeme können Verhaltensanalysen in Echtzeit durchführen und potenzielle Sicherheitsbedrohungen erkennen, bevor sie zu tatsächlichen Vorfällen werden."
                  features={[
                    "Echtzeit-Analyse von Bewegungsmustern und Verhaltensanomalien",
                    "Präzise Personenerkennung mit Gesichts- und Silhouettenanalyse",
                    "Automatische Objektklassifizierung und -verfolgung",
                    "Abgleich mit Zugangsberechtigungen in Echtzeit",
                    "Selbstlernende Algorithmen zur kontinuierlichen Verbesserung"
                  ]}
                  icon={<Eye className="h-5 w-5 text-accent" />}
                />
                
                <SecuritySolution
                  title="Integrierte Perimetersicherung"
                  description="Die Sicherung des Gebäudeumfelds ist der erste Schritt zu einem umfassenden Schutzkonzept. Moderne Perimetersicherungssysteme kombinieren physische Barrieren mit elektronischer Überwachung für einen mehrschichtigen Schutzansatz."
                  features={[
                    "Hochsensible Erschütterungs- und Bewegungssensoren",
                    "Intelligente Videoanalyse der Grundstücksgrenzen",
                    "Automatische Kameraausrichtung auf detektierte Anomalien",
                    "Integrierte Beleuchtungssteuerung bei Alarmauslösung",
                    "Sofortige Alarmierung des Sicherheitspersonals"
                  ]}
                  icon={<ShieldCheck className="h-5 w-5 text-accent" />}
                />
                
                <SecuritySolution
                  title="Drahtlose Sensornetzwerke"
                  description="Leistungsstarke, energieeffiziente Sensornetzwerke bilden das Rückgrat moderner Gebäudeüberwachung. Sie erfassen kontinuierlich kritische Parameter und erkennen ungewöhnliche Muster, die auf potenzielle Sicherheitsrisiken hindeuten könnten."
                  features={[
                    "Batteriebetriebene, drahtlose Sensoren mit mehrjähriger Laufzeit",
                    "Selbstheilende Mesh-Netzwerktechnologie für maximale Zuverlässigkeit",
                    "Multifunktionale Sensoren (Bewegung, Temperatur, Luftqualität, Licht)",
                    "Echtzeit-Datenübertragung und -analyse",
                    "Nahtlose Integration in bestehende Gebäudemanagement-Plattformen"
                  ]}
                  icon={<WifiOff className="h-5 w-5 text-accent" />}
                />
              </SecurityCategory>

              {/* Vorteile im Apple-Stil */}
              <div className="mb-16">
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-2">Die Vorteile integrierter Sicherheit</h3>
                  <p className="text-gray-500">Warum fortschrittliche Sicherheitssysteme mehr als nur Sicherheit bieten</p>
                </div>
                
                <div className="space-y-4">
                  <FeatureCard 
                    icon={<Shield className="h-5 w-5 text-accent" />}
                    title="Ganzheitlicher Schutz"
                    description="Moderne Sicherheitssysteme arbeiten als integriertes Ökosystem statt als isolierte Komponenten. Wenn ein Sicherheitssystem eine potenzielle Bedrohung identifiziert, aktivieren sich sofort weitere Schutzmechanismen. Beispielsweise kann eine ungewöhnliche Aktivität, die von Sensoren erkannt wird, automatisch eine Videoüberwachungskamera auf den betreffenden Bereich fokussieren, während gleichzeitig Sicherheitspersonal alarmiert wird. Diese orchestrierte Reaktion minimiert blinde Flecken und maximiert die Reaktionsgeschwindigkeit."
                    index={0}
                  />
                  
                  <FeatureCard 
                    icon={<Eye className="h-5 w-5 text-accent" />}
                    title="Proaktive statt reaktive Sicherheit"
                    description="Traditionelle Sicherheitssysteme reagieren erst auf Vorfälle, nachdem sie eingetreten sind. Im Gegensatz dazu nutzen intelligente Sicherheitssysteme prädiktive Analysen und Echtzeitdaten, um potenzielle Bedrohungen zu erkennen, bevor sie zu tatsächlichen Vorfällen werden. KI-Algorithmen erkennen Anomalien in Bewegungsmustern oder ungewöhnliche Aktivitäten, die menschlichen Beobachtern entgehen könnten. So können Sicherheitsteams proaktiv eingreifen, bevor ein Schaden entsteht."
                    index={1}
                  />
                  
                  <FeatureCard 
                    icon={<Users className="h-5 w-5 text-accent" />}
                    title="Verbesserte Nutzererfahrung"
                    description="Die beste Sicherheit ist die, die man nicht bemerkt. Moderne Sicherheitstechnologien integrieren sich nahtlos in den Gebäudealltag und verbessern sogar das Nutzererlebnis, anstatt es zu beeinträchtigen. Biometrische Zugangssysteme ermöglichen beispielsweise ein berührungsloses Eintreten ohne lästiges Suchen nach Ausweisen. Personalisierte Begrüßungen und automatische Anpassungen der Umgebung (Beleuchtung, Temperatur) basierend auf Nutzererkennungen schaffen eine angenehme und gleichzeitig sichere Umgebung."
                    index={2}
                  />
                  
                  <FeatureCard 
                    icon={<PieChart className="h-5 w-5 text-accent" />}
                    title="Datengestützte Entscheidungsprozesse"
                    description="Intelligente Sicherheitssysteme generieren wertvolle Daten weit über ihren ursprünglichen Sicherheitszweck hinaus. Die Analyse von Bewegungsmustern und Raumnutzung kann Optimierungspotenziale für Gebäudebetrieb, Energiemanagement und Flächennutzung aufzeigen. Sicherheitsdaten werden so zu einer strategischen Ressource für bessere betriebliche Entscheidungen und können die Gebäudeeffizienz signifikant verbessern."
                    index={3}
                  />
                </div>
              </div>

              {/* Call-to-Action */}
              <div className="mb-16 bg-gradient-to-r from-gray-50 to-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-semibold mb-4">Entdecken Sie Ihr Sicherheitspotential</h3>
                    <p className="text-gray-600 mb-6">
                      Jedes Gebäude ist einzigartig und verdient eine maßgeschneiderte Sicherheitslösung. Unsere Experten führen eine umfassende Analyse Ihrer Anforderungen durch und entwickeln ein integriertes Sicherheitskonzept, das perfekt zu Ihren Bedürfnissen passt.
                    </p>
                    <Button className="bg-accent hover:bg-accent/90 text-white">
                      Kostenlose Sicherheitsanalyse anfordern
                    </Button>
                  </div>
                  <div className="md:w-1/3 bg-accent/5 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Shield className="h-16 w-16 text-accent mx-auto mb-4" />
                      <p className="text-sm text-accent font-medium">
                        Maßgeschneiderte Konzepte<br />für maximale Sicherheit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
                
              {/* Artikel-Share */}
              <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
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
            
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Experten-Tipp Box */}
                <Card className="bg-gradient-to-br from-[#FCFCFC] to-[#F5F7FA] border-accent/10 rounded-xl shadow-sm overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Planen Sie Sicherheitssysteme von Anfang an als integrierte Lösung statt als Ansammlung einzelner Komponenten. Sicherheit ist kein isoliertes Element, sondern ein grundlegender Aspekt Ihres gesamten Smart Building Konzepts.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Beginnen Sie die Sicherheitsplanung bereits in der Entwurfsphase Ihres Gebäudes. Nachträgliche Implementierungen sind oft kostspieler und weniger effektiv als integrierte Lösungen.
                    </Paragraph>
                  </CardContent>
                </Card>

                {/* Verwandte Artikel */}
                <Card className="rounded-xl shadow-sm overflow-hidden">
                  <CardHeader className="bg-[#FCFCFC] pb-2">
                    <CardTitle className="text-base">Verwandte Artikel</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-1">
                      {[
                        { url: "/blog/security", title: "Notfallpläne für Unternehmen" },
                        { url: "/blog/NachhaltigeReinigung", title: "Nachhaltige Reinigungsmethoden" },
                        { url: "/blog/winterdienst", title: "DIY-Winterdienst Tipps" }
                      ].map((article, idx) => (
                        <Link 
                          key={idx}
                          href={article.url} 
                          className="flex items-center py-2.5 px-3 rounded-lg hover:bg-accent/5 transition-colors"
                        >
                          <ArrowRight className="h-4 w-4 text-accent mr-2 flex-shrink-0" />
                          <span className="text-sm">{article.title}</span>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                                
                {/* Kontakt-CTA */}
                <Card className="bg-accent text-white rounded-xl shadow-md overflow-hidden">
                  <CardHeader className="pb-3 border-b border-white/10">
                    <CardTitle className="text-base flex items-center gap-2">
                      <div className="p-2 bg-white/20 rounded-full">
                        <Phone className="h-4 w-4" />
                      </div>
                      Nehmen Sie Kontakt auf
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Paragraph className="text-sm text-white/90 mb-4">
                      Unsere Sicherheitsexperten stehen Ihnen für eine persönliche Beratung jederzeit zur Verfügung.
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
        className={`fixed bottom-6 right-6 bg-white shadow-md rounded-full p-3 z-50 transition-all duration-300 transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        aria-label="Nach oben scrollen"
      >
        <ChevronUp className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  )
}
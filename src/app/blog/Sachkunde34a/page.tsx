"use client"

import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { 
  Shield, 
  Book, 
  MousePointer, 
  Scale, 
  Gavel, 
  Users, 
  AlertTriangle, 
  Scroll, 
  Brain, 
  Briefcase, 
  Clock, 
  GraduationCap, 
  ChevronRight, 
  HelpCircle, 
  Share,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  ExternalLink,
  Info
} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Definieren der Typen für die Komponenten
interface FaqItemProps {
  question: string;
  answer: string;
}

interface TopicCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  url: string;
}

interface FeatureCardProps {
  color: "blue" | "amber" | "green" | "accent";
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  url: string;
  urlText: string;
  urlIcon: React.ElementType;
}

// Neue Apple-inspirierte Komponente für FAQ Items
const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-sm">
      <button
        className="w-full p-4 text-left flex justify-between items-center gap-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-medium">{question}</h3>
        <span className="text-accent">
          {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 bg-muted/30 ${
          isOpen ? 'max-h-96 p-4 border-t' : 'max-h-0'
        }`}
      >
        <p className="text-muted-foreground">{answer}</p>
      </div>
    </div>
  )
}

// Neue Apple-inspirierte Komponente für Themen-Karten
const TopicCard: React.FC<TopicCardProps> = ({ icon, title, description, url }) => {
  const Icon = icon
  
  return (
    <Card className="rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-md group">
      <CardHeader className="pb-2 group-hover:bg-accent/5">
        <CardTitle className="flex items-center gap-2">
          <div className="bg-accent/10 p-2 rounded-full">
            <Icon className="h-5 w-5 text-accent" />
          </div>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Link 
          href={url} 
          className="text-sm text-accent hover:underline flex items-center group-hover:translate-x-0.5 transition-transform"
        >
          Zum Lernbereich <ArrowRight className="ml-1 h-3.5 w-3.5" />
        </Link>
      </CardFooter>
    </Card>
  )
}

// Neue Komponente für Feature-Karten
const FeatureCard: React.FC<FeatureCardProps> = ({ color, icon, title, description, features, url, urlText, urlIcon }) => {
  const Icon = icon
  const UrlIcon = urlIcon
  
  const colors = {
    blue: "border-t-blue-500 bg-gradient-to-b from-blue-50/50 to-transparent",
    amber: "border-t-amber-500 bg-gradient-to-b from-amber-50/50 to-transparent",
    green: "border-t-green-500 bg-gradient-to-b from-green-50/50 to-transparent",
    accent: "border-t-accent bg-gradient-to-b from-accent/5 to-transparent"
  }
  
  const iconColors = {
    blue: "text-blue-600",
    amber: "text-amber-600",
    green: "text-green-600",
    accent: "text-accent"
  }
  
  return (
    <Card className={`rounded-xl overflow-hidden border-t-4 ${colors[color]}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className={`h-5 w-5 ${iconColors[color]}`} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-sm mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CircleCheck className={`h-4 w-4 mt-0.5 ${iconColors[color]} flex-shrink-0`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link 
          href={url} 
          className={buttonVariants({ className: "w-full gap-2" })}
        >
          <UrlIcon className="h-4 w-4" /> {urlText}
        </Link>
      </CardFooter>
    </Card>
  )
}

export default function Sachkunde34a() {
  // Scroll-To-Top Button mit Smooth Scrolling
  const [showScrollTop, setShowScrollTop] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Funktion zum Teilen des Inhalts
  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: "Sachkunde § 34a GewO | TreuService",
        url: window.location.href
      }).catch(error => {
        console.log('Error sharing', error)
      })
    } else {
      // Fallback für Browser ohne Web Share API
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link in die Zwischenablage kopiert!')
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-16">
      {/* Header mit Tag und Teilen-Button */}
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="bg-accent/10 text-accent uppercase px-2.5 py-1">
          Security
        </Badge>
        <button 
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={shareContent}  
        >
          <Share className="w-4 h-4" /> Teilen
        </button>
      </div>
      
      {/* Hero Section */}
      <section className="space-y-8 text-center">
        <div className="inline-flex items-center rounded-full border border-accent/20 px-3 py-1 text-xs font-semibold text-accent bg-accent/5">
          §34a SACHKUNDEPRÜFUNG
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Ihr Weg zur erfolgreichen Sachkundeprüfung
          </h1>
          <p className="text-xl text-muted-foreground">
            Umfassendes Wissen, effektive Vorbereitung und kostenlose Tools für Ihre §34a-Sachkundeprüfung
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link 
            href="/blog/Sachkunde34a/PruefungsSimulator" 
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full font-medium transition-transform active:scale-95"
            )}
          >
            <MousePointer className="mr-2 h-4 w-4" /> Zum Prüfungssimulator
          </Link>
          <Link 
            href="#themen" 
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full font-medium transition-transform active:scale-95"
            )}
          >
            <Book className="mr-2 h-4 w-4" /> Zu den Lernmaterialien
          </Link>
        </div>
      </section>

      {/* Tools und Hilfsmittel - Mit Apple-inspiriertem Design */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Tools für Ihre Prüfungsvorbereitung
          </h2>
          <p className="text-muted-foreground">
            Mit diesen Hilfsmitteln verbessern Sie Ihre Erfolgschancen erheblich
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            color="blue"
            icon={MousePointer}
            title="Prüfungssimulator"
            description="Testen Sie Ihr Wissen unter realistischen Bedingungen"
            features={[
              "Über 300 prüfungsnahe Fragen",
              "Verschiedene Übungsmodi",
              "Detaillierte Auswertung"
            ]}
            url="/blog/Sachkunde34a/PruefungsSimulator"
            urlText="Jetzt testen"
            urlIcon={MousePointer}
          />
          
          <FeatureCard 
            color="amber"
            icon={Clock}
            title="Prüfungsablauf"
            description="Alles zum Ablauf der schriftlichen und mündlichen Prüfung"
            features={[
              "Detaillierter Prüfungsablauf",
              "Tipps für die mündliche Prüfung",
              "Checkliste für den Prüfungstag"
            ]}
            url="/blog/Sachkunde34a/Pruefungsablauf/"
            urlText="Mehr erfahren"
            urlIcon={Clock}
          />
          
          <FeatureCard 
            color="green"
            icon={GraduationCap}
            title="Fachbegriff-Glossar"
            description="Wichtige Begriffe einfach erklärt"
            features={[
              "Umfassende Fachbegriffe",
              "Verständliche Erklärungen",
              "Nach Themenbereichen sortiert"
            ]}
            url="/blog/Sachkunde34a/Glossar/"
            urlText="Zum Glossar"
            urlIcon={Book}
          />
        </div>
      </section>

      {/* Informationen zur Prüfung - Mit Apple-inspiriertem Tab-Design */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Die Sachkundeprüfung auf einen Blick
          </h2>
          <p className="text-muted-foreground">
            Alle wichtigen Informationen zu Ihrer §34a-Prüfung
          </p>
        </div>
        
        <Tabs defaultValue="was" className="w-full">
          <div className="mb-6">
            <TabsList className="w-full flex bg-muted/50 p-1 rounded-xl h-auto">
              {[
                {value: "was", label: "Was?"},
                {value: "wer", label: "Wer?"},
                {value: "wie", label: "Wie?"},
                {value: "wo", label: "Wo?"},
                {value: "kosten", label: "Kosten"}
              ].map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex-1 py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow rounded-lg transition-all duration-200"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="was" className="rounded-xl border p-6 bg-gradient-to-b from-accent/5 to-transparent">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Was ist die §34a-Sachkundeprüfung?</h3>
              <p className="text-muted-foreground">
                Die Sachkundeprüfung nach §34a der Gewerbeordnung (GewO) ist eine gesetzlich vorgeschriebene 
                Prüfung für Personen, die im Bewachungsgewerbe tätig werden möchten. Sie stellt sicher, 
                dass Sicherheitspersonal über die notwendigen rechtlichen, fachlichen und sozialen 
                Kompetenzen verfügt.
              </p>
              <div className="flex justify-end mt-2">
                <Link href="/blog/Sachkunde34a/Pruefungsablauf/" className="text-sm text-accent hover:underline flex items-center group">
                  Details zum Prüfungsablauf <ChevronRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="wer" className="rounded-xl border p-6 bg-gradient-to-b from-accent/5 to-transparent">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Wer benötigt die Sachkundeprüfung?</h3>
              <ul className="space-y-2">
                {[
                  "Inhaber von Bewachungsunternehmen", 
                  "Leitende Angestellte im Sicherheitsgewerbe", 
                  "Sicherheitsmitarbeiter in bestimmten Bereichen (z.B. Kontrolltätigkeiten im öffentlichen Verkehrsraum, Diskotheken, Flüchtlingsunterkünfte)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CircleCheck className="h-4 w-4 mt-1 text-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/10">
                <p className="text-sm">
                  <strong>Hinweis:</strong> Für einfache Objektschutztätigkeiten reicht in der Regel die 40-stündige Unterrichtung
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="wie" className="rounded-xl border p-6 bg-gradient-to-b from-accent/5 to-transparent">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Wie läuft die Prüfung ab?</h3>
              <div className="space-y-4">
                <div className="bg-background p-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/10 p-2 rounded-full">
                      <Book className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">Schriftlicher Teil</h4>
                      <p className="text-sm text-muted-foreground">Multiple-Choice-Test mit 72 Fragen aus allen relevanten Themengebieten (120 Minuten)</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background p-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/10 p-2 rounded-full">
                      <Users className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">Mündlicher Teil</h4>
                      <p className="text-sm text-muted-foreground">Prüfungsgespräch von 15-20 Minuten vor einem Prüfungsausschuss</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background p-4 rounded-lg shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/10 p-2 rounded-full">
                      <Shield className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium">Bestehensgrenze</h4>
                      <p className="text-sm text-muted-foreground">50% der möglichen Punkte im schriftlichen Teil</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-2">
                <Link href="/blog/Sachkunde34a/Pruefungsablauf/" className="text-sm text-accent hover:underline flex items-center group">
                  Ausführliche Informationen <ChevronRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="wo" className="rounded-xl border p-6 bg-gradient-to-b from-accent/5 to-transparent">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Wo kann die Prüfung abgelegt werden?</h3>
              <p className="text-muted-foreground">
                Die Sachkundeprüfung wird von den Industrie- und Handelskammern (IHK) durchgeführt. 
                Anmeldung und Prüfung erfolgen bei der für Ihren Wohnort zuständigen IHK.
              </p>
              
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                <Link href="https://www.ihk.de" target="_blank" className="text-accent hover:underline flex items-center justify-between">
                  <span>Finden Sie Ihre zuständige IHK</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="kosten" className="rounded-xl border p-6 bg-gradient-to-b from-accent/5 to-transparent">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Welche Kosten entstehen?</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-medium">Prüfungsgebühr</span>
                  <span className="bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">ca. 150-200 €</span>
                </div>
                
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-medium">Vorbereitungskurse (optional)</span>
                  <span className="bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">ca. 350-600 €</span>
                </div>
                
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-medium">Lernmaterialien (optional)</span>
                  <span className="bg-accent/10 text-accent rounded-full px-3 py-1 text-sm">ca. 30-80 €</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 mt-4">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-sm text-blue-800">
                  Mit unserem kostenfreien Prüfungssimulator und den Lernmaterialien können Sie 
                  sich auch effektiv im Selbststudium vorbereiten.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Prüfungsbereiche - Apple-inspired grid mit hover Effekten */}
      <section id="themen" className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Prüfungsbereiche im Überblick
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Die Sachkundeprüfung umfasst neun zentrale Themenbereiche. Klicken Sie auf einen Bereich, 
            um detaillierte Informationen und spezifische Lernmaterialien zu erhalten.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <TopicCard 
            icon={Gavel}
            title="Recht der öffentlichen Sicherheit"
            description="Grundlagen des Sicherheitsrechts, Polizei- und Ordnungsrecht, Grundrechte"
            url="/blog/Sachkunde34a/Recht"
          />
          
          <TopicCard 
            icon={Scale}
            title="Gewerberecht"
            description="Gewerbeordnung, Bewachungsverordnung, gewerberechtliche Pflichten"
            url="/blog/Sachkunde34a/Gewerberecht"
          />
          
          <TopicCard 
            icon={Scroll}
            title="Datenschutzrecht"
            description="DSGVO, Bundesdatenschutzgesetz, Datenschutz im Sicherheitsgewerbe"
            url="/blog/Sachkunde34a/Datenschutz"
          />
          
          <TopicCard 
            icon={Book}
            title="Bürgerliches Gesetzbuch"
            description="Vertragsrecht, Haftungsrecht, Schadensersatzrecht, Besitz- und Eigentumsrecht"
            url="/blog/Sachkunde34a/BGB"
          />
          
          <TopicCard 
            icon={Gavel}
            title="Straf- und Strafverfahrensrecht"
            description="Strafrecht, Strafprozessrecht, Jedermannsrechte, Notwehr und Notstand"
            url="/blog/Sachkunde34a/Strafrecht"
          />
          
          <TopicCard 
            icon={AlertTriangle}
            title="Umgang mit Verteidigungswaffen"
            description="Waffenrecht, Umgang mit Schutzwaffen, Rechtsgrundlagen für Waffeneinsatz"
            url="/blog/Sachkunde34a/Waffen"
          />
          
          <TopicCard 
            icon={Shield}
            title="Unfallverhütungsvorschriften"
            description="Arbeitsschutz, Gefährdungsbeurteilung, Sicherheitsmaßnahmen"
            url="/blog/Sachkunde34a/UVV"
          />
          
          <TopicCard 
            icon={Users}
            title="Umgang mit Menschen"
            description="Deeskalation, Kommunikation, Konfliktmanagement, Verhalten in Krisensituationen"
            url="/blog/Sachkunde34a/Deeskalation"
          />
          
          <TopicCard 
            icon={Brain}
            title="Sicherheitstechnik"
            description="Sicherungstechnik, Alarmanlagen, Zutrittskontrolle, technische Überwachung"
            url="/blog/Sachkunde34a/Sicherheitstechnik"
          />
        </div>
      </section>

      {/* Prüfungssimulator Highlights - Mit Apple-inspiriertem visuellem Design */}
      <section className="rounded-2xl bg-gradient-to-r from-accent/5 to-blue-50/50 overflow-hidden shadow">
        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-accent/10 p-2 rounded-full">
                    <MousePointer className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Prüfungssimulator</h2>
                </div>
                <p className="text-lg">
                  Testen Sie Ihr Wissen und bereiten Sie sich optimal auf Ihre §34a-Sachkundeprüfung vor.
                </p>
              </div>
              
              <div className="space-y-3 mt-4">
                {[
                  "Über 300 prüfungsrelevante Fragen aus allen Themenbereichen",
                  "Realistische Prüfungsbedingungen mit Zeitlimit",
                  "Detaillierte Auswertung und Erklärungen zu allen Antworten",
                  "Gezieltes Üben nach Themen oder Schwierigkeitsgrad"
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/80 p-3 rounded-xl shadow-sm">
                    <CircleCheck className="h-5 w-5 mt-0.5 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 flex justify-center md:justify-start">
                <Link 
                  href="/blog/Sachkunde34a/PruefungsSimulator" 
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "rounded-full font-medium transition-transform active:scale-95"
                  )}
                >
                  <MousePointer className="mr-2 h-4 w-4" /> Jetzt kostenlos testen
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg bg-white">
                <div className="bg-gray-100 p-2 flex items-center gap-2 border-b">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-center w-full font-medium text-gray-600">
                    §34a Prüfungssimulator - Frage 24/72
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">Strafrecht</span>
                    <h3 className="font-medium mt-2">Was versteht man unter &quot;Jedermannsrecht&quot;?</h3>
                  </div>
                  
                  <div className="space-y-3 mt-6">
                    {[
                      "Das Recht, als Privatperson einen Tatverdächtigen vorläufig festzunehmen",
                      "Das Recht auf freie Meinungsäußerung nach Art. 5 GG",
                      "Die allgemeinen Bürgerrechte nach dem Grundgesetz",
                      "Das Recht, bei Gefahr im Verzug polizeiliche Befugnisse auszuüben"
                    ].map((answer, i) => (
                      <div 
                        key={i} 
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          i === 0 ? "border-accent bg-accent/5" : "hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                            i === 0 ? "border-accent" : "border-gray-300"
                          }`}>
                            {i === 0 && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                          </div>
                          <span className="text-sm">{answer}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <div className="text-sm text-muted-foreground">Verbleibende Zeit: 08:42</div>
                    <button className="text-sm text-accent hover:underline">Nächste Frage</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Karriere im Sicherheitsgewerbe - Mit Apple-inspiriertem visuellem Design */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Karriere im Sicherheitsgewerbe
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Mit der bestandenen Sachkundeprüfung eröffnen sich verschiedene Karrierewege im Sicherheitsbereich
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="rounded-xl overflow-hidden shadow-sm bg-gradient-to-b from-blue-50/50 to-transparent border">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Tätigkeitsfelder</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Objekt- und Werkschutz",
                  "Veranstaltungssicherheit",
                  "Personenschutz",
                  "City-Streife und Revierschutz",
                  "Pförtnerdienste und Empfang",
                  "Kaufhausdetektiv"
                ].map((field, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white/80 p-2 rounded-lg shadow-sm">
                    <CircleCheck className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">{field}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="rounded-xl overflow-hidden shadow-sm bg-gradient-to-b from-green-50/50 to-transparent border">
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Weiterbildungsmöglichkeiten</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Servicekraft für Schutz und Sicherheit (IHK)",
                  "Geprüfte Schutz- und Sicherheitskraft (IHK)",
                  "Meister für Schutz und Sicherheit (IHK)",
                  "Fachwirt für Schutz und Sicherheit (IHK)",
                  "Studium: Sicherheitsmanagement (B.A./M.A.)"
                ].map((option, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white/80 p-2 rounded-lg shadow-sm">
                    <CircleCheck className="h-4 w-4 mt-0.5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ-Bereich - Mit Apple-inspiriertem Accordion */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Häufig gestellte Fragen
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Antworten auf die wichtigsten Fragen zur §34a-Sachkundeprüfung
          </p>
        </div>
        
        <div className="space-y-3 max-w-3xl mx-auto">
          <FaqItem 
            question="Wie lange dauert die Vorbereitung auf die Sachkundeprüfung?"
            answer="Die Vorbereitungszeit variiert je nach Vorkenntnissen und Lernintensität. Im Durchschnitt sollten Sie mit 4-8 Wochen rechnen, wenn Sie regelmäßig lernen."
          />
          
          <FaqItem 
            question="Ist die Sachkundeprüfung schwer zu bestehen?"
            answer="Die Durchfallquote liegt bei etwa 30-40%. Mit guter Vorbereitung und gezieltem Üben haben Sie jedoch gute Chancen, die Prüfung beim ersten Versuch zu bestehen."
          />
          
          <FaqItem 
            question="Muss ich an einem Vorbereitungskurs teilnehmen?"
            answer="Nein, ein Kurs ist nicht verpflichtend. Viele Kandidaten bereiten sich erfolgreich im Selbststudium vor. Unsere Lernmaterialien und der Prüfungssimulator bieten hierfür eine gute Grundlage."
          />
          
          <FaqItem 
            question="Wie oft kann ich die Prüfung wiederholen?"
            answer="Bei Nichtbestehen können Sie die Prüfung beliebig oft wiederholen. Zwischen den Prüfungsversuchen sollte jedoch genügend Zeit für die erneute Vorbereitung liegen."
          />
        </div>
        
        <div className="flex justify-center mt-6">
          <Link 
            href="/blog/Sachkunde34a/Pruefungsablauf/" 
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full font-medium transition-transform active:scale-95"
            )}
          >
            <HelpCircle className="mr-2 h-4 w-4" /> Mehr Fragen & Antworten
          </Link>
        </div>
      </section>

      {/* CTA-Bereich - Mit Apple-inspiriertem visuellem Design */}
      <section className="text-center space-y-6 bg-gradient-to-r from-accent/10 to-blue-50/50 p-10 rounded-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Bereit für Ihre §34a-Sachkundeprüfung?
        </h2>
        <p className="text-xl max-w-3xl mx-auto">
          Nutzen Sie unsere kostenfreien Lernmaterialien und den Prüfungssimulator, 
          um Ihre Erfolgschancen zu maximieren.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link 
            href="/blog/Sachkunde34a/PruefungsSimulator" 
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full font-medium transition-transform active:scale-95"
            )}
          >
            <MousePointer className="mr-2 h-4 w-4" /> Zum Prüfungssimulator
          </Link>
          <Link 
            href="/blog/Sachkunde34a/Recht" 
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full font-medium transition-transform active:scale-95 bg-white"
            )}
          >
            <Book className="mr-2 h-4 w-4" /> Lernmaterialien starten
          </Link>
        </div>
      </section>
      
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
  );
}
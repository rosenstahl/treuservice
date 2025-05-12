"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  ChevronRight, 
  Flame, 
  Droplet,
  AlertTriangle,
  Bug,
  Home,
  Info,
  PhoneCall,
  Megaphone,
  ShieldAlert,
  Calendar,
  Clock,
  Share2,
  Lightbulb,
  Paintbrush,
  Phone,
  Mail,
  Check
} from "lucide-react"
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import sanierungData from "@/i18n/de/sanierung.json"

// Benutzerdefinierte Badge-Komponente
const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-purple-500 bg-purple-500/10 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
    {children}
  </span>
);

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

export default function SanierungPraeventionPage() {
  const title = "Schadensprävention und Erste Hilfe bei Gebäudeschäden"
  const subtitle = "Tipps zur Vorbeugung und zum richtigen Handeln im Brand-, Wasser- und Schimmelschadensfall"
  const date = new Date('2025-03-15');
  const readingTime = "10 min";
  const author = {
    name: "TREU Service Sanierungsteam",
    image: "/images/blog/sanierung1.jpg"
  };

  return (
    <div className="flex-1 pb-10">
      <Section className="pt-6 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-purple-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Schadensanierung</span>
          </div>
          
          <div className="max-w-4xl">
            {/* Tag/Badge */}
            <Badge className="mb-3">
              Schadensanierung
            </Badge>
            
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              {title}
            </H1>
            
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              {subtitle}
            </H2>
            
            <div className="flex items-center gap-6 text-muted-foreground mt-6">
              <div className="flex items-center gap-2">
                <div>
                  <Paintbrush className="h-5 w-5 text-purple-500" />
                </div>
                <span className="text-sm">{author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{format(date, 'dd. MMMM yyyy', { locale: de })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{readingTime} Lesezeit</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Tabs Navigation */}
              <Tabs defaultValue="brand" className="w-full mb-8">
                <TabsList className="grid grid-cols-3 w-full mb-6">
                  <TabsTrigger value="brand" className="text-sm">Brandschäden</TabsTrigger>
                  <TabsTrigger value="wasser" className="text-sm">Wasserschäden</TabsTrigger>
                  <TabsTrigger value="schimmel" className="text-sm">Schimmelschäden</TabsTrigger>
                </TabsList>
                
                {/* Tab 1: Brandschäden */}
                <TabsContent value="brand">
                  <div className="space-y-6">
                    <div className="rounded-xl overflow-hidden relative h-[200px] md:h-[300px] shadow-md mb-6">
                      <Image
                        src="/images/blog/sanierung.jpg"
                        fill
                        className="object-cover"
                        alt="Brandschadensprävention"
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-full">
                            <Flame className="h-6 w-6 text-red-500" />
                          </div>
                          <H3 className="text-white text-lg font-bold">Brandschaden vorbeugen und bekämpfen</H3>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="inline-block bg-primary/10 px-4 py-2 rounded-lg text-primary font-semibold mb-2">
                        Warum ist dies wichtig?
                      </div>
                      <Paragraph>
                        Brände können binnen Minuten ganze Gebäude zerstören und Menschenleben gefährden. Durch richtige Prävention und schnelles Handeln können Sie fatale Folgen verhindern.
                      </Paragraph>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                        <H3 className="font-semibold">Häufige Risikofaktoren:</H3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                        {["Defekte Elektrogeräte", "Überlastete Steckdosen", "Unbeaufsichtigte Kerzen", "Fehlerhafte Elektroinstallationen", "Brennbare Materialien nahe Wärmequellen", "Fehlende Rauchmelder"].map((risk, i) => (
                          <div key={i} className="bg-red-50 p-3 rounded-md">
                            <div className="flex items-start gap-2">
                              <ShieldAlert className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-red-700">{risk}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="p-6 rounded-xl shadow-sm border bg-blue-50 border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-full bg-blue-100">
                            <Home className="h-5 w-5 text-blue-500" />
                          </div>
                          <H3 className="text-lg font-semibold text-blue-700">Prävention</H3>
                        </div>
                        <ul className="space-y-3">
                          {sanierungData.praevention.sections[0].subsections[0].items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-6 text-blue-500">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                              <Paragraph className="text-sm">{item}</Paragraph>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-6 rounded-xl shadow-sm border bg-orange-50 border-orange-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-full bg-orange-100">
                            <Megaphone className="h-5 w-5 text-red-500" />
                          </div>
                          <H3 className="text-lg font-semibold text-orange-700">Bekämpfung</H3>
                        </div>
                        <ul className="space-y-3">
                          {sanierungData.praevention.sections[0].subsections[1].items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-6 text-orange-500">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                              <Paragraph className="text-sm">{item}</Paragraph>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 2: Wasserschäden */}
                <TabsContent value="wasser">
                  <div className="space-y-6">
                    <div className="rounded-xl overflow-hidden relative h-[200px] md:h-[300px] shadow-md mb-6">
                      <Image
                        src="/images/sanierung/hero.jpg"
                        fill
                        className="object-cover"
                        alt="Wasserschadenprävention"
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-full">
                            <Droplet className="h-6 w-6 text-blue-500" />
                          </div>
                          <H3 className="text-white text-lg font-bold">Wasserschaden vorbeugen und bekämpfen</H3>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="inline-block bg-primary/10 px-4 py-2 rounded-lg text-primary font-semibold mb-2">
                        Warum ist dies wichtig?
                      </div>
                      <Paragraph>
                        Wasserschäden verursachen nicht nur hohe Kosten, sondern können auch zu Schimmelbildung und Strukturschäden führen. Eine schnelle Erkennung und Reaktion ist entscheidend.
                      </Paragraph>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                        <H3 className="font-semibold">Häufige Risikofaktoren:</H3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                        {["Alte oder marode Rohrleitungen", "Verstopfte Dachrinnen", "Unbemerkte Leckagen", "Defekte Haushaltsgeräte mit Wasserzulauf", "Mangelnde Abdichtung im Sanitärbereich", "Fehlendes Notfallwissen"].map((risk, i) => (
                          <div key={i} className="bg-blue-50 p-3 rounded-md">
                            <div className="flex items-start gap-2">
                              <ShieldAlert className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                              <span className="text-sm text-blue-700">{risk}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="p-6 rounded-xl shadow-sm border bg-blue-50 border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-full bg-blue-100">
                            <Home className="h-5 w-5 text-blue-500" />
                          </div>
                          <H3 className="text-lg font-semibold text-blue-700">Prävention</H3>
                        </div>
                        <ul className="space-y-3">
                          {sanierungData.praevention.sections[1].subsections[0].items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-6 text-blue-500">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                              <Paragraph className="text-sm">{item}</Paragraph>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-6 rounded-xl shadow-sm border bg-orange-50 border-orange-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-full bg-orange-100">
                            <Megaphone className="h-5 w-5 text-orange-500" />
                          </div>
                          <H3 className="text-lg font-semibold text-orange-700">Bekämpfung</H3>
                        </div>
                        <ul className="space-y-3">
                          {sanierungData.praevention.sections[1].subsections[1].items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-6 text-orange-500">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                              <Paragraph className="text-sm">{item}</Paragraph>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Tab 3: Schimmelschäden */}
                <TabsContent value="schimmel">
                  <div className="space-y-6">
                    <div className="rounded-xl overflow-hidden relative h-[200px] md:h-[300px] shadow-md mb-6">
                      <Image
                        src="/images/blog/prevention.jpg"
                        fill
                        className="object-cover"
                        alt="Schimmelprävention"
                        sizes="(max-width: 768px) 100vw, 66vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-full">
                            <Bug className="h-6 w-6 text-green-600" />
                          </div>
                          <H3 className="text-white text-lg font-bold">Schimmelpilz vorbeugen und bekämpfen</H3>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="inline-block bg-primary/10 px-4 py-2 rounded-lg text-primary font-semibold mb-2">
                        Warum ist dies wichtig?
                      </div>
                      <Paragraph>
                        Schimmelpilze stellen ein ernsthaftes Gesundheitsrisiko dar und können Allergien und Atemwegserkrankungen verursachen. Die richtige Prävention beginnt bei der Kontrolle der Luftfeuchtigkeit.
                      </Paragraph>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-full">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        </div>
                        <H3 className="font-semibold">Häufige Risikofaktoren:</H3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-4">
                        {["Hohe Luftfeuchtigkeit", "Mangelnde Lüftung", "Wärmebrücken", "Wasserschäden", "Undichte Fenster und Dächer", "Falsche Möbelplatzierung an Außenwänden"].map((risk, i) => (
                          <div key={i} className="bg-green-50 p-3 rounded-md">
                            <div className="flex items-start gap-2">
                              <ShieldAlert className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-green-700">{risk}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="p-6 rounded-xl shadow-sm border bg-blue-50 border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-full bg-blue-100">
                            <Home className="h-5 w-5 text-blue-600" />
                          </div>
                          <H3 className="text-lg font-semibold text-blue-700">Prävention</H3>
                        </div>
                        <ul className="space-y-3">
                          {sanierungData.praevention.sections[2].subsections[0].items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-6 text-blue-500">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                              <Paragraph className="text-sm">{item}</Paragraph>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="p-6 rounded-xl shadow-sm border bg-orange-50 border-orange-200">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 rounded-full bg-orange-100">
                            <Megaphone className="h-5 w-5 text-orange-600" />
                          </div>
                          <H3 className="text-lg font-semibold text-orange-700">Bekämpfung</H3>
                        </div>
                        <ul className="space-y-3">
                          {sanierungData.praevention.sections[2].subsections[1].items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="mt-6 text-orange-500">
                                <CheckCircle2 className="w-5 h-5" />
                              </div>
                              <Paragraph className="text-sm">{item}</Paragraph>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Notfallkontakte */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">Wichtige Notfallkontakte</CardTitle>
                  <CardDescription>Im Notfall zählt jede Sekunde. Speichern Sie diese Kontakte.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border-l-4 border-l-red-500 p-4 bg-gray-50 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Flame className="h-5 w-5 text-red-500" />
                        <h3 className="font-medium">Feuer & Notfall</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <PhoneCall className="h-4 w-4 text-red-500" />
                        <span className="font-bold">112</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Für Brände, medizinische Notfälle und akute Gefahrensituationen
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-l-blue-500 p-4 bg-gray-50 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Droplet className="h-5 w-5 text-blue-500" />
                        <h3 className="font-medium">Wasserschäden</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <PhoneCall className="h-4 w-4 text-blue-500" />
                        <span className="font-bold">Installateurnotdienst</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Lokalen Notdienst für Wasserschäden kontaktieren
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-l-green-500 p-4 bg-gray-50 rounded-r-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Info className="h-5 w-5 text-green-500" />
                        <h3 className="font-medium">TREU Service Notdienst</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <PhoneCall className="h-4 w-4 text-green-500" />
                        <span className="font-bold">0231 15044352</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        24/7 verfügbar für Notfallsanierungen
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
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
                <Card className="bg-primary/5 border-primary/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-yellow-400" />
                      Experten-Tipp
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm mb-3">
                      Erstellen Sie für Ihr Zuhause einen Notfallplan, der allen Bewohnern bekannt ist. Darin sollten Fluchtwege, Sammelplätze und die Standorte wichtiger Absperrventile (Wasser, Gas) vermerkt sein.
                    </Paragraph>
                    <Paragraph className="text-sm font-medium">
                      Besonders wichtig: Prüfen Sie regelmäßig die Funktionsfähigkeit Ihrer Rauchmelder!
                    </Paragraph>
                  </CardContent>
                </Card>
                
                {/* Maßnahmen im Überblick */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Präventionsmaßnahmen im Überblick</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-red-500" />
                          <span>Brandprävention</span>
                        </span>
                        <span className="font-medium text-red-500">Priorität hoch</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="flex items-center gap-2">
                          <Droplet className="w-4 h-4 text-blue-500" />
                          <span>Wasserschadenprävention</span>
                        </span>
                        <span className="font-medium text-blue-500">Priorität mittel</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="flex items-center gap-2">
                          <Bug className="w-4 h-4 text-green-600" />
                          <span>Schimmelprävention</span>
                        </span>
                        <span className="font-medium text-green-600">Kontinuierlich</span>
                      </div>
                      <Paragraph className="text-xs text-muted-foreground mt-2">
                        Hinweis: Die Prioritäten können je nach individueller Situation variieren. Für eine maßgeschneiderte Beratung kontaktieren Sie uns bitte.
                      </Paragraph>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Professionellen Winterdienst beauftragen */}
                <Card className="bg-purple-500 text-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Professionellen Sanierung beauftragen?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Paragraph className="text-sm text-white/90 mb-4">
                      Überlassen Sie die Schadensanierung unseren Experten. Wir bieten:
                    </Paragraph>
                    <ul className="space-y-2 text-sm mb-4">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                        <span>Brandschadensanierung</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                        <span>Wasserschadensanierung</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                        <span>Schimmelsanierung</span>
                      </li>
                    </ul>
                    <div className="space-y-3">
                    <Link href="/sanierung#kontakt">
                      <Button className="w-full bg-white text-purple-700 hover:bg-white/90">
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

                {/* Weitere Artikel */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weitere Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link 
                        href="/blog/EntkernungsGuide" 
                        className="block hover:bg-primary/5 p-2 rounded transition-colors text-sm"
                      >
                        Entkernungs-Guide: Prozess, Entscheidungen & Vorbereitung
                      </Link>
                      <Link 
                        href="/blog/EntruemplungsKostenRechner" 
                        className="block hover:bg-primary/5 p-2 rounded transition-colors text-sm"
                      >
                        Entrümpelungskosten-Rechner 2025
                      </Link>
                      <Link 
                        href="/sanierung" 
                        className="block hover:bg-primary/5 p-2 rounded transition-colors text-sm"
                      >
                        Unsere professionellen Sanierungsleistungen
                      </Link>
                      <Link 
                        href="/kontakt" 
                        className="block hover:bg-primary/5 p-2 rounded transition-colors text-sm"
                      >
                        Kostenlose Schadensprävention-Beratung anfragen
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
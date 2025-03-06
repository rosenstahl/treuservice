"use client"

import React from 'react'
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { H1, H2, H3, Paragraph } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SecurityCheckTool from './SecurityCheckTool'
import Link from 'next/link'
import Image from 'next/image'
import { 
  ChevronRight, 
  Info, 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Brain, 
  Cpu, 
  Network, 
  Lock, 
  AlertTriangle,
  Server,
  Workflow,
  Clock,
  Download,
  Camera
} from 'lucide-react'

export default function SmartBuildingSicherheitPage() {
  return (
    <div className="flex-1">
      <Section className="pt-0 pb-6 bg-gradient-to-b from-primary/5 to-background">
        <Container>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground capitalize">Security</span>
          </div>
          
          <div className="max-w-4xl">
            <Badge className="mb-3 bg-red-50 text-red-600 border-red-200 hover:bg-red-100">
              Security
            </Badge>
            <H1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Intelligente Gebäudesicherheit 2025: IoT, KI und vernetzte Sicherheitssysteme
            </H1>
            <H2 className="text-xl lg:text-2xl text-muted-foreground mb-3">
              Wie moderne Technologien die Gebäudesicherheit revolutionieren und welche Risiken sie mit sich bringen
            </H2>
            <Paragraph className="text-base text-muted-foreground">
              Smart Buildings bieten erweiterte Funktionalität und Effizienz, eröffnen jedoch auch neue Angriffsvektoren. Dieser Artikel untersucht aktuelle Trends in der intelligenten Gebäudesicherheit, Herausforderungen und Lösungsansätze für die Zukunft – inklusive eines interaktiven Tools zur Bewertung Ihrer eigenen Gebäudesicherheit.
            </Paragraph>
          </div>
        </Container>
      </Section>

      <Separator />
      
      <Section className="py-6">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              {/* Hauptbildbereich */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                <Image
                  src="/images/blog/security/smart-building.jpg"
                  fill
                  className="object-cover"
                  alt="Smart Building Security Systems"
                  priority
                />
              </div>
              
              {/* Einführung */}
              <div className="prose prose-base max-w-none mb-10">
                <H2 className="text-2xl font-bold">Die Evolution der Gebäudesicherheit</H2>
                <Paragraph>
                  Die Integration von Internet of Things (IoT), künstlicher Intelligenz (KI) und Cloud-Computing hat die Art und Weise, wie wir Gebäudesicherheit verstehen und implementieren, grundlegend verändert. Moderne Smart Buildings sind nicht mehr nur physische Strukturen, sondern komplexe, vernetzte Ökosysteme aus Sensoren, Steuerungsgeräten und intelligenten Systemen.
                </Paragraph>
                
                <Paragraph>
                  Diese technologische Revolution bietet beispiellose Möglichkeiten zur Verbesserung der Sicherheit, Effizienz und des Nutzungskomforts. Gleichzeitig entstehen jedoch neue Herausforderungen in Bezug auf Cybersicherheit, Datenschutz und Systemintegration, die ein ganzheitliches Sicherheitskonzept erfordern.
                </Paragraph>
                
                <div className="my-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-800">Was ist ein Smart Building?</h4>
                      <p className="text-blue-700 mt-1">
                        Ein Smart Building verwendet Automatisierungstechnologien und IoT-Geräte, um verschiedene Gebäudesysteme wie Heizung, Belüftung, Klimaanlage, Beleuchtung, Sicherheit und mehr zu steuern und zu optimieren. Diese Systeme sammeln und analysieren Daten, um Effizienz zu steigern, Kosten zu senken und den Komfort zu verbessern.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-6 rounded-xl mb-8">
                  <h3 className="text-xl font-bold mb-4">Wichtige Zahlen zur Smart Building Sicherheit</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">27B</span>
                      <div>
                        <p className="font-medium">27 Milliarden IoT-Geräte weltweit bis 2025</p>
                        <p className="text-sm text-gray-600">Quelle: IoT Analytics, 2023</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">82%</span>
                      <div>
                        <p className="font-medium">82% der Gebäudemanagementsysteme haben Sicherheitslücken</p>
                        <p className="text-sm text-gray-600">Quelle: Building Security Research Institute, 2024</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold flex-shrink-0">60%</span>
                      <div>
                        <p className="font-medium">60% schnellere Reaktionszeit bei Sicherheitsvorfällen mit KI-gestützten Systemen</p>
                        <p className="text-sm text-gray-600">Quelle: Smart Building Technology Review, 2025</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Haupttrends */}
              <div className="prose prose-base max-w-none mb-10">
                <H2 className="text-2xl font-bold">Top-Trends in der Smart Building Sicherheit 2025</H2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">KI-gestützte Bedrohungserkennung</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Moderne Sicherheitssysteme nutzen KI und maschinelles Lernen, um Anomalien zu erkennen, Verhaltensmuster zu analysieren und Bedrohungen in Echtzeit zu identifizieren, bevor diese zu Sicherheitsvorfällen führen können.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Camera className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Intelligente Videoüberwachung</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Fortschrittliche Kamerasysteme mit Gesichtserkennung, Objektverfolgung und kontextbezogener Analyse revolutionieren die visuelle Überwachung und reduzieren falsche Alarme erheblich.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Workflow className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Integrierte Sicherheitsplattformen</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Die Konvergenz von physischer und digitaler Sicherheit auf einheitlichen Plattformen ermöglicht ein ganzheitliches Sicherheitsmanagement und verbesserte Reaktionsfähigkeit bei Vorfällen.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Network className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">Zero-Trust-Sicherheitsmodelle</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">
                        Innovative Zugangskontrollen basieren auf dem Prinzip "Vertraue niemandem" und erfordern kontinuierliche Authentifizierung für alle Benutzer und Geräte, unabhängig vom Standort oder Netzwerk.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <H3 className="text-xl font-bold">Herausforderungen bei der Sicherheit vernetzter Gebäude</H3>
                
                <Paragraph>
                  Mit zunehmender Vernetzung und Automatisierung von Gebäuden entstehen neue Angriffsvektoren und Schwachstellen, die traditionelle Sicherheitskonzepte überfordern können.
                </Paragraph>
                
                <div className="my-6 space-y-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-start gap-3">
                      <ShieldAlert className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-red-700">Erhöhte Angriffsfläche</h4>
                        <p className="text-red-600 mt-1">
                          Jedes mit dem Internet verbundene Gerät stellt einen potenziellen Einstiegspunkt für Angreifer dar. Die steigende Anzahl von IoT-Geräten in Smart Buildings vergrößert die potenzielle Angriffsfläche erheblich.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-orange-700">Interoperabilitätsprobleme</h4>
                        <p className="text-orange-600 mt-1">
                          Die Integration verschiedener Technologien und Lösungen von unterschiedlichen Herstellern kann zu Sicherheitslücken führen, besonders wenn Systeme nicht für das Zusammenspiel konzipiert wurden.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-amber-200 rounded-lg bg-amber-50">
                    <div className="flex items-start gap-3">
                      <Lock className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-amber-700">Datenschutzbedenken</h4>
                        <p className="text-amber-600 mt-1">
                          Die umfangreiche Datenerhebung durch Smart Building Systeme wirft wichtige Fragen zum Datenschutz auf, insbesondere in Bezug auf biometrische Daten und Bewegungsprofile von Gebäudenutzern.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <H3 className="text-xl font-bold">Best Practices für die Sicherheit intelligenter Gebäude</H3>
                
                <div className="my-6 space-y-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="rounded-full bg-blue-100 p-3 flex-shrink-0">
                      <Server className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Segmentierung von Netzwerken</h4>
                      <p className="text-gray-600 mt-1">
                        Trennen Sie kritische Systeme (wie Zugangskontrollen oder Brandmeldeanlagen) von allgemeinen Netzwerken und implementieren Sie VLANs, um die Ausbreitung von Kompromittierungen zu verhindern.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="rounded-full bg-green-100 p-3 flex-shrink-0">
                      <ShieldCheck className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Ganzheitliches Sicherheitskonzept</h4>
                      <p className="text-gray-600 mt-1">
                        Entwickeln Sie eine umfassende Sicherheitsstrategie, die physische Sicherheit, Cybersicherheit und organisatorische Maßnahmen integriert und aufeinander abstimmt.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="rounded-full bg-purple-100 p-3 flex-shrink-0">
                      <Clock className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Regelmäßige Sicherheitsaudits</h4>
                      <p className="text-gray-600 mt-1">
                        Führen Sie periodische Überprüfungen Ihrer Systeme durch, einschließlich Penetrationstests und Schwachstellenanalysen, um potenzielle Sicherheitslücken frühzeitig zu identifizieren.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Interaktives Tool */}
              <div className="mb-10">
                <div className="text-center mb-6">
                  <H2 className="text-2xl font-bold">Smart Building Sicherheits-Check</H2>
                  <Paragraph className="mt-2 max-w-2xl mx-auto">
                    Bewerten Sie die Sicherheit Ihres intelligenten Gebäudes mit unserem interaktiven Tool. Erhalten Sie personalisierte Empfehlungen zur Verbesserung Ihrer Sicherheitsmaßnahmen.
                  </Paragraph>
                </div>
                
                <SecurityCheckTool />
              </div>
              
              {/* Ausblick */}
              <div className="prose prose-base max-w-none mb-10">
                <H2 className="text-2xl font-bold">Die Zukunft der Smart Building Sicherheit</H2>
                
                <Paragraph>
                  Die Sicherheit intelligenter Gebäude wird sich weiterhin rasant entwickeln. Quantum Computing, prädiktive Sicherheitsanalysen und autonome Sicherheitssysteme werden die nächste Generation von Schutzmaßnahmen prägen.
                </Paragraph>
                
                <Paragraph>
                  Organisationen, die heute in zukunftssichere Sicherheitsarchitekturen investieren und einen ganzheitlichen Ansatz verfolgen, werden am besten positioniert sein, um von den Vorteilen der Smart Building Technologie zu profitieren, während sie gleichzeitig die damit verbundenen Risiken minimieren.
                </Paragraph>
                
                <div className="my-6 p-5 bg-primary/5 rounded-lg border border-primary/10">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Fazit
                  </h4>
                  <p className="mt-2">
                    Die Integration intelligenter Technologien in Gebäude bietet enorme Chancen zur Verbesserung der Sicherheit, Effizienz und des Komforts. Um diese Vorteile voll auszuschöpfen, müssen jedoch die damit verbundenen Sicherheitsherausforderungen proaktiv adressiert werden. Ein ganzheitlicher Ansatz, der physische und digitale Sicherheit vereint, ist der Schlüssel zum Erfolg in der Ära der intelligenten Gebäude.
                  </p>
                </div>
                
                <div className="mt-8">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <div className="text-primary">Quellen:</div>
                  </div>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>IoT Analytics, "IoT Market Report 2023-2025"</li>
                    <li>Building Security Research Institute, "Smart Building Vulnerabilities Report 2024"</li>
                    <li>Smart Building Technology Review, "The Impact of AI on Building Security Response Times, 2025"</li>
                    <li>European Union Agency for Cybersecurity, "Guidelines on Securing Smart Buildings, 2025"</li>
                    <li>International Building Security Standards Organization, "Best Practices for Integrated Security Systems, 2024"</li>
                  </ul>
                </div>
              </div>
              
              {/* CTA am Ende */}
              <div className="bg-accent/5 p-6 rounded-lg border border-accent/20">
                <h3 className="text-xl font-bold mb-2">Professionelle Sicherheitslösungen für Ihre Immobilie</h3>
                <p className="mb-4 text-muted-foreground">
                  TREU Service bietet maßgeschneiderte Sicherheitslösungen für Gewerbeimmobilien jeder Größe. Von modernen Zutrittskontrollsystemen bis hin zu umfassenden Sicherheitsanalysen – wir helfen Ihnen, Ihre Gebäude und Anlagen optimal zu schützen.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/security">
                    <Button className="w-full">Sicherheitsdienste entdecken</Button>
                  </Link>
                  <Link href="/kontakt">
                    <Button variant="outline" className="w-full">Beratungsgespräch vereinbaren</Button>
                  </Link>
                </div>
              </div>
              
              {/* Share Button */}
              <div className="flex items-center gap-4 mt-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "Intelligente Gebäudesicherheit 2025: IoT, KI und vernetzte Sicherheitssysteme",
                        url: window.location.href
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('Link in die Zwischenablage kopiert!');
                      });
                    }
                  }}
                >
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Teilen
                </Button>
                
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  alert('Der Whitepaper-Download wird vorbereitet...');
                }}>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Whitepaper herunterladen
                  </Button>
                </a>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                {/* Inhaltsverzeichnis */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Inhaltsverzeichnis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav className="space-y-1 text-sm">
                      <a
                        href="#"
                        className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelector('h2')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Die Evolution der Gebäudesicherheit
                      </a>
                      <a
                        href="#"
                        className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelectorAll('h2')[1]?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Top-Trends in der Smart Building Sicherheit 2025
                      </a>
                      <a
                        href="#"
                        className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2 ml-2"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelectorAll('h3')[0]?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Herausforderungen bei der Sicherheit vernetzter Gebäude
                      </a>
                      <a
                        href="#"
                        className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2 ml-2"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelectorAll('h3')[1]?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Best Practices für die Sicherheit intelligenter Gebäude
                      </a>
                      <a
                        href="#"
                        className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelectorAll('h2')[2]?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Smart Building Sicherheits-Check
                      </a>
                      <a
                        href="#"
                        className="block py-1.5 hover:text-accent transition-colors border-l-2 border-transparent hover:border-accent pl-2"
                        onClick={(e) => {
                          e.preventDefault();
                          document.querySelectorAll('h2')[3]?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Die Zukunft der Smart Building Sicherheit
                      </a>
                    </nav>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Weitere Artikel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link 
                        href="/blog/security" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Sicherheitskonzepte und Notfallpläne
                      </Link>
                      <Link 
                        href="/blog/winterdienst" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Winterdienst-Tipps
                      </Link>
                      <Link 
                        href="/blog/reinigung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                      >
                        Reinigungslösungen
                      </Link>
                      <Link 
                        href="/blog/NachhaltigeReinigung" 
                        className="block hover:bg-accent/5 p-2 rounded transition-colors text-sm font-medium text-primary"
                      >
                        Nachhaltige Reinigungsmethoden
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Experten-Box */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Unser Sicherheitsexperte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                          src="/images/team/security-expert.jpg"
                          fill
                          className="object-cover"
                          alt="Sicherheitsexperte"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold">Thomas Müller</h4>
                        <p className="text-sm text-muted-foreground">Leiter Sicherheitsdienste</p>
                      </div>
                    </div>
                    <Paragraph className="text-sm">
                      "Smart Building Technologien bieten enorme Chancen, erfordern aber ein durchdachtes Sicherheitskonzept. Wir unterstützen Sie dabei, die richtige Balance zwischen Innovation und Schutz zu finden."
                    </Paragraph>
                    <div className="mt-4">
                      <Link href="/kontakt">
                        <Button variant="outline" size="sm" className="w-full">
                          Kontakt aufnehmen
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Downloads */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Downloads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <a 
                        href="#" 
                        className="flex items-center gap-2 hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Der Download wird vorbereitet...');
                        }}
                      >
                        <Download className="h-4 w-4 text-primary" />
                        <span>Sicherheits-Checkliste PDF</span>
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center gap-2 hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Der Download wird vorbereitet...');
                        }}
                      >
                        <Download className="h-4 w-4 text-primary" />
                        <span>Whitepaper: Smart Building Risiken</span>
                      </a>
                      <a 
                        href="#" 
                        className="flex items-center gap-2 hover:bg-accent/5 p-2 rounded transition-colors text-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Der Download wird vorbereitet...');
                        }}
                      >
                        <Download className="h-4 w-4 text-primary" />
                        <span>Infografik: IoT Sicherheitskonzepte</span>
                      </a>
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
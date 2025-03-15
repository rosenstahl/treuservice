"use client"

import React, { useState } from 'react'
import { H1 } from "@/components/ui/typography"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from 'next/image'
import { CalendarDays, Clock, ArrowRight, Search, Phone, Mail, Calculator, FileText, SnowflakeIcon, ClipboardList, Leaf, DollarSign, Shield, BadgeCheck, Cpu, BookOpen, Flame, Droplet, Bug, Tool, HardHat, Sun, HomeIcon } from "lucide-react"
import blogData from "@/i18n/de/blog.json"

// Define a type for the valid categories
type Category = 'Winterdienst' | 'Reinigung' | 'Security' | 'Entrümpelung' | 'Sanierung' | 'PV-Montage' | 'Entkernung';

// Ensure article.category is of type Category
const categoryColors: Record<Category, string> = {
  Winterdienst: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100",
  Reinigung: "bg-green-50 text-green-600 border-green-200 hover:bg-green-100",
  Security: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100",
  Entrümpelung: "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100",
  Sanierung: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100",
  "PV-Montage": "bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100",
  Entkernung: "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100"
};

const categoryButtonColors = {
  "Winterdienst": {
    active: "bg-blue-600 text-white",
    inactive: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
  },
  "Reinigung": {
    active: "bg-green-600 text-white",
    inactive: "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
  },
  "Security": {
    active: "bg-red-600 text-white",
    inactive: "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
  },
  "Entrümpelung": {
    active: "bg-amber-600 text-white",
    inactive: "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
  },
  "Sanierung": {
    active: "bg-purple-600 text-white",
    inactive: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100"
  },
  "PV-Montage": {
    active: "bg-yellow-600 text-white",
    inactive: "bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100"
  },
  "Entkernung": {
    active: "bg-orange-600 text-white",
    inactive: "bg-orange-50 text-orange-600 border-orange-200 hover:bg-orange-100"
  }
}

const articles = [
  {
    title: "§34a Sachkundeprüfung: Der ultimative Vorbereitungsguide",
    description: "Alles was Sie für eine erfolgreiche Sachkundeprüfung im Bewachungsgewerbe wissen müssen - mit interaktivem Prüfungssimulator und kompletten Lernmaterialien",
    category: "Security",
    slug: "Sachkunde34a",
    image: "/images/blog/security/34a-hero.jpg",
    date: "01.03.2025",
    readingTime: "15 min + Simulator",
    featured: true,
    icon: <Shield className="h-5 w-5 text-red-600" />
  },
  {
    title: "Intelligente Gebäudesicherheit 2025: IoT, KI und vernetzte Sicherheitssysteme",
    description: "Wie moderne Technologien die Gebäudesicherheit revolutionieren, welche Risiken sie mit sich bringen und wie Sie Ihre Smart Building Sicherheit bewerten können.",
    category: "Security",
    slug: "SmartBuildingSicherheit",
    image: "/images/blog/security/smart-building.jpg",
    date: "01.03.2025",
    readingTime: "15 min + Tool",
    featured: true,
    icon: <Cpu className="h-5 w-5 text-red-600" />
  },
  {
    title: "Der ultimative Räumpflicht-Guide 2025",
    description: "Was Hausbesitzer und Vermieter in Deutschland jetzt über Räum- und Streupflichten wissen müssen - mit interaktivem Pflicht-Checker und aktuellen Gerichtsurteilen",
    category: "Winterdienst",
    slug: "RaeumpflichtGuide2025",
    image: "/images/blog/winter.jpg",
    date: "01.03.2025",
    readingTime: "12 min + Tool",
    featured: true,
    new: true,
    icon: <BadgeCheck className="h-5 w-5 text-blue-600" />
  },
  {
    title: "Kostenrechner für Winterdienst-Outsourcing",
    description: "Berechnen Sie die Kosten für professionellen Winterdienst im Vergleich zur Eigenleistung mit unserem interaktiven Rechner",
    category: "Winterdienst",
    slug: "WinterdienstKostenrechner",
    image: "/images/blog/winter.jpg",
    date: "01.03.2025",
    readingTime: "Interaktives Tool",
    featured: true,
    icon: <DollarSign className="h-5 w-5 text-blue-600" />
  },
  {
    title: "Nachhaltige Reinigungsmethoden & Öko-Zertifizierungen",
    description: "Ein umfassender Leitfaden für umweltbewusste Gebäudereinigung mit Vergleich der relevantesten Umweltsiegel und praktischen Tipps zur Implementierung",
    category: "Reinigung",
    slug: "NachhaltigeReinigung",
    image: "/images/blog/cleaning.jpg",
    date: "01.03.2025",
    readingTime: "15 min",
    featured: true,
    icon: <Leaf className="h-5 w-5 text-green-600" />
  },
  {
    title: "Reinigungsplan-Generator",
    description: "Erstellen Sie individuelle Reinigungspläne für Ihre spezifischen Anforderungen mit unserem interaktiven Generator",
    category: "Reinigung",
    slug: "ReinigungsplanGenerator",
    image: "/images/blog/cleaning.jpg",
    date: "01.03.2025",
    readingTime: "Interaktives Tool",
    featured: true,
    icon: <ClipboardList className="h-5 w-5 text-green-600" />
  },
  {
    title: "Professioneller Entkernungsprozess in 10 Schritten",
    description: "Ein detaillierter Leitfaden zum Ablauf einer professionellen Entkernung - von der Planung bis zur Entsorgung mit wichtigen Hinweisen zur Sicherheit",
    category: "Entkernung",
    slug: "EntkernungsGuide",
    image: "/images/entkernung/process.jpg",
    date: "04.03.2025",
    readingTime: "15 min",
    featured: true,
    new: true,
    icon: <HardHat className="h-5 w-5 text-orange-600" />
  },
  {
    title: "Schadensprävention und Erste Hilfe bei Brand-, Wasser- und Schimmelschäden",
    description: "Wertvolle Tipps zur Vorbeugung von Gebäudeschäden und Anleitung zum richtigen Handeln im Schadensfall mit Notfallkontakten",
    category: "Sanierung",
    slug: "SanierungPraevention",
    image: "/images/sanierung/prevention-1.jpg",
    date: "04.03.2025",
    readingTime: "12 min",
    featured: true,
    new: true,
    icon: <Flame className="h-5 w-5 text-purple-600" />
  },
  {
    title: "Aufbau einer Photovoltaikanlage & Montagearten",
    description: "Umfassender Guide zu allen Komponenten moderner Photovoltaikanlagen und verschiedenen Montagearten inkl. IBC TOPFIX200 Montageanleitung",
    category: "PV-Montage",
    slug: "PVAnlagenAufbau",
    image: "/images/pv-montage/components.jpg",
    date: "04.03.2025",
    readingTime: "15 min + Anleitung",
    featured: true,
    new: true,
    icon: <Sun className="h-5 w-5 text-yellow-600" />
  },
  {
    title: "Smarter Winterdienst mit Wetterdaten",
    description: "Wie intelligente Wetterdaten und Prognosemodelle den Winterdienst effizienter und umweltfreundlicher machen",
    category: "Winterdienst",
    slug: "WetterDatenWinterdienst",
    image: "/images/blog/winter.jpg",
    date: "01.03.2025",
    readingTime: "10 min",
    featured: false
  },
  {
    title: blogData.blog.diy_winterservice.title,
    description: blogData.blog.diy_winterservice.subtitle,
    category: "Winterdienst",
    slug: "winterdienst",
    image: "/images/blog/winter.jpg",
    date: "23.02.2024",
    readingTime: "10 min"
  },
  {
    title: blogData.blog.streumittel.title,
    description: blogData.blog.streumittel.subtitle,
    category: "Winterdienst",
    slug: "streumittel",
    image: "/images/blog/winter.jpg",
    date: "24.02.2024",
    readingTime: "8 min"
  },
  {
    title: "Streumittel-Rechner",
    description: "Interaktives Tool zur Berechnung des optimalen Streumittelbedarfs und Kostenübersicht",
    category: "Winterdienst",
    slug: "StreumittelCalculator",
    image: "/images/blog/winter.jpg",
    date: "25.02.2025",
    readingTime: "Interaktives Tool",
    featured: true,
    icon: <Calculator className="h-5 w-5 text-blue-600" />
  },
  {
    title: "Professionelle Reinigungstipps",
    description: "Professionelle Reinigungstipps und Problemlösungen",
    category: "Reinigung",
    slug: "reinigung",
    image: "/images/blog/cleaning.jpg",
    date: "22.02.2024",
    readingTime: "12 min"
  },
  {
    title: "Sicherheitskonzepte",
    description: "Sicherheitskonzepte und Notfallplan-Erstellung",
    category: "Security",
    slug: "security",
    image: "/images/blog/security.jpg",
    date: "21.02.2024",
    readingTime: "15 min"
  },
  {
    title: "Entrümpelungskosten-Rechner 2025",
    description: "Berechnen Sie die Kosten für Ihre Entrümpelung mit unserem interaktiven Tool",
    category: "Entrümpelung",
    slug: "EntruemplungsKostenRechner",
    image: "/images/blog/entruempelung.jpg",
    date: "01.03.2025",
    readingTime: "Interaktives Tool",
    featured: true,
    icon: <Calculator className="h-5 w-5 text-amber-600" />
  }
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtern der Artikel basierend auf Kategorie und Suchbegriff
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === "Alle" || article.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sortieren - Featured-Artikel zuerst
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    // Neue Artikel immer ganz oben
    if (a.new && !b.new) return -1;
    if (!a.new && b.new) return 1;
    
    // Dann Featured Artikel
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Sekundäres Sortierkriterium: Datum (neuestes zuerst)
    const dateA = new Date(a.date.split('.').reverse().join('-'));
    const dateB = new Date(b.date.split('.').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <H1 className="text-4xl md:text-5xl text-center font-bold mb-6">TREU Service Blog</H1>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Expertenratgeber für Reinigung, Sicherheitsdienste, Entrümpelung, Winterdienst, Sanierung, PV-Montage und Entkernung
        </p>
        
        {/* Suchleiste */}
        <div className="relative max-w-md mx-auto mb-10">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-white focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Blog durchsuchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Kategorie-Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "Alle" ? "bg-primary text-black" : ""}`}
            onClick={() => setSelectedCategory("Alle")}
          >
            Alle Beiträge
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "Winterdienst" ? categoryButtonColors["Winterdienst"].active : categoryButtonColors["Winterdienst"].inactive}`}
            onClick={() => setSelectedCategory("Winterdienst")}
          >
            Winterdienst
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "Reinigung" ? categoryButtonColors["Reinigung"].active : categoryButtonColors["Reinigung"].inactive}`}
            onClick={() => setSelectedCategory("Reinigung")}
          >
            Reinigung
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "Security" ? categoryButtonColors["Security"].active : categoryButtonColors["Security"].inactive}`}
            onClick={() => setSelectedCategory("Security")}
          >
            Security
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "Entrümpelung" ? categoryButtonColors["Entrümpelung"].active : categoryButtonColors["Entrümpelung"].inactive}`}
            onClick={() => setSelectedCategory("Entrümpelung")}
          >
            Entrümpelung
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "Sanierung" ? categoryButtonColors["Sanierung"].active : categoryButtonColors["Sanierung"].inactive}`}
            onClick={() => setSelectedCategory("Sanierung")}
          >
            Sanierung
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "PV-Montage" ? categoryButtonColors["PV-Montage"].active : categoryButtonColors["PV-Montage"].inactive}`}
            onClick={() => setSelectedCategory("PV-Montage")}
          >
            PV-Montage
          </Button>
          <Button 
            variant="outline" 
            className={`rounded-full transition-all ${selectedCategory === "Entkernung" ? categoryButtonColors["Entkernung"].active : categoryButtonColors["Entkernung"].inactive}`}
            onClick={() => setSelectedCategory("Entkernung")}
          >
            Entkernung
          </Button>
        </div>

        {/* Ergebnismeldung */}
        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            {sortedArticles.length} {sortedArticles.length === 1 ? "Artikel" : "Artikel"} gefunden
            {selectedCategory !== "Alle" && ` in der Kategorie "${selectedCategory}"`}
            {searchQuery && ` mit dem Suchbegriff "${searchQuery}"`}
          </p>
        </div>

        {/* Blog-Kartengitter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedArticles.map((article) => (
            <Card 
              key={article.slug} 
              className={`overflow-hidden shadow-md border-t-4 border-t-primary flex flex-col h-full ${article.featured ? 'ring-2 ring-offset-2 ring-primary/20' : ''} ${article.new ? 'ring-2 ring-offset-4 ring-blue-500 shadow-lg' : ''}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image 
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div 
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[article.category as Category] || "bg-gray-100 text-gray-600 border-gray-200"} border shadow-sm`}
                >
                  {article.category}
                </div>
                {article.new && (
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1">
                    <BadgeCheck className="w-4 h-4 text-white" />
                    <span>NEU 2025</span>
                  </div>
                )}
                {article.featured && !article.new && (
                  <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded-full text-xs font-semibold border shadow-sm flex items-center gap-1">
                    {article.icon || <BadgeCheck className="w-4 h-4 text-primary" />}
                    <span>Empfohlen</span>
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  <Link href={`/blog/${article.slug}`} className="hover:underline decoration-primary decoration-2 underline-offset-4">
                    {article.title}
                  </Link>
                </CardTitle>
                <CardDescription className="mt-2 line-clamp-3 text-gray-600">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm flex flex-wrap gap-4 mt-auto">
                <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                  <CalendarDays className="w-4 h-4 mr-1" />
                  {article.date}
                </div>
                <div className="flex items-center bg-primary/10 px-2 py-1 rounded-full text-gray-700">
                  <Clock className="w-4 h-4 mr-1" />
                  {article.readingTime}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="w-full flex flex-col gap-2">
                  <Link href={`/blog/${article.slug}`} className="w-full">
                    <Button className="w-full group hover:bg-primary">
                      {article.slug === "StreumittelCalculator" || 
                       article.slug === "RaeumpflichtGuide" || 
                       article.slug === "RaeumpflichtGuide2025" ||
                       article.slug === "ReinigungsplanGenerator" ||
                       article.slug === "WinterdienstKostenrechner" ||
                       article.slug === "SmartBuildingSicherheit" ||
                       article.slug === "EntruemplungsKostenRechner" ||
                       article.slug === "Sachkunde34a" ? 
                        "Zum Interaktiven Tool" : "Artikel lesen"}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  
                  {/* CTA-Buttons basierend auf der Kategorie */}
                  {article.category === "Winterdienst" && (
                    <Link href="/winterdienst" className="w-full">
                      <Button variant="outline" className={`w-full ${categoryButtonColors["Winterdienst"].inactive}`}>
                        Winterdienst-Angebot
                      </Button>
                    </Link>
                  )}
                  {article.category === "Reinigung" && (
                    <Link href="/reinigung" className="w-full">
                      <Button variant="outline" className={`w-full ${categoryButtonColors["Reinigung"].inactive}`}>
                        Reinigungsservice anfragen
                      </Button>
                    </Link>
                  )}
                  {article.category === "Security" && (
                    <Link href="/security" className="w-full">
                      <Button variant="outline" className={`w-full ${categoryButtonColors["Security"].inactive}`}>
                        Sicherheitsdienst buchen
                      </Button>
                    </Link>
                  )}
                  {article.category === "Entrümpelung" && (
                    <Link href="/entruempelung" className="w-full">
                      <Button variant="outline" className={`w-full ${categoryButtonColors["Entrümpelung"].inactive}`}>
                        Entrümpelung anfragen
                      </Button>
                    </Link>
                  )}
                  {article.category === "Sanierung" && (
                    <Link href="/sanierung" className="w-full">
                      <Button variant="outline" className={`w-full ${categoryButtonColors["Sanierung"].inactive}`}>
                        Sanierungsberatung anfragen
                      </Button>
                    </Link>
                  )}
                  {article.category === "PV-Montage" && (
                    <Link href="/pv-montage" className="w-full">
                      <Button variant="outline" className={`w-full ${categoryButtonColors["PV-Montage"].inactive}`}>
                        PV-Installation anfragen
                      </Button>
                    </Link>
                  )}
                  {article.category === "Entkernung" && (
                    <Link href="/entkernung" className="w-full">
                      <Button variant="outline" className={`w-full ${categoryButtonColors["Entkernung"].inactive}`}>
                        Entkernungsangebot anfordern
                      </Button>
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* "Keine Artikel gefunden" Meldung */}
        {sortedArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Keine Artikel gefunden</h3>
            <p className="text-muted-foreground mb-6">
              Versuchen Sie es mit anderen Suchbegriffen oder wählen Sie eine andere Kategorie.
            </p>
            <Button onClick={() => {setSelectedCategory("Alle"); setSearchQuery("")}}>
              Alle Artikel anzeigen
            </Button>
          </div>
        )}
        
        {/* Kontakt CTA-Bereich */}
        <div className="mt-16 bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-3 text-center">Haben Sie Fragen?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto text-center">
            Unser Team steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns für eine persönliche Beratung zu unseren Dienstleistungen.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 max-w-3xl mx-auto">
            <Link href="/kontakt" className="w-full md:w-auto">
              <Button className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 py-6">
                <Mail className="w-5 h-5" />
                <span>Kontaktformular</span>
              </Button>
            </Link>
            <Link href="tel:+4912345678" className="w-full md:w-auto">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-accent text-accent hover:bg-accent/10 py-6">
                <Phone className="w-5 h-5" />
                <span>+49 (0) 123 456 78</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
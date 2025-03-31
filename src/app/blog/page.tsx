"use client"

import React, { useState, useEffect, useRef, useMemo } from 'react'
import Link from "next/link"
import Image from 'next/image'
import { 
  Search, 
  Phone, 
  Mail, 
  ArrowUpRight,
  ChevronDown,
  Leaf,
  Shield,
  Snowflake,
  Paintbrush,
  Sun,
  HardHat,
  Users,
  Trash2,
  Clock
} from "lucide-react"

type CategoryKey = 'Winterdienst' | 'Reinigung' | 'Security' | 'Entrümpelung' | 
                  'Sanierung' | 'PV-Montage' | 'Entkernung' | 'Leiharbeit';

type CategoryConfig = {
  [key in CategoryKey]: {
    color: string;
    icon: React.ReactNode;
    gradient: string;
    textColor: string;
    borderColor: string;
    darkColor: string;
    lightColor: string;
  }
}

// Sorgfältig ausgewählte Kategoriefarben im Apple-Stil
const CATEGORY_CONFIG: CategoryConfig = {
  Winterdienst: {
    color: "blue",
    icon: <Snowflake className="h-4 w-4" />,
    gradient: "from-blue-50 to-blue-100",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    darkColor: "bg-blue-600",
    lightColor: "bg-blue-50"
  },
  Reinigung: {
    color: "teal",
    icon: <Leaf className="h-4 w-4" />,
    gradient: "from-teal-50 to-teal-100",
    textColor: "text-teal-600",
    borderColor: "border-teal-200",
    darkColor: "bg-teal-600", 
    lightColor: "bg-teal-50"
  },
  Security: {
    color: "accent", 
    icon: <Shield className="h-4 w-4" />,
    gradient: "from-blue-50 to-blue-100",
    textColor: "text-blue-600",
    borderColor: "border-blue-200",
    darkColor: "bg-blue-600",
    lightColor: "bg-blue-50"
  },
  Entrümpelung: {
    color: "red",
    icon: <Trash2 className="h-4 w-4" />,
    gradient: "from-red-50 to-red-100",
    textColor: "text-red-600",
    borderColor: "border-red-200",
    darkColor: "bg-red-600",
    lightColor: "bg-red-50"
  },
  Sanierung: {
    color: "purple",
    icon: <Paintbrush className="h-4 w-4" />,
    gradient: "from-purple-50 to-purple-100",
    textColor: "text-purple-600",
    borderColor: "border-purple-200",
    darkColor: "bg-purple-600",
    lightColor: "bg-purple-50"
  },
  "PV-Montage": {
    color: "yellow",
    icon: <Sun className="h-4 w-4" />,
    gradient: "from-yellow-50 to-yellow-100",
    textColor: "text-yellow-600",
    borderColor: "border-yellow-200",
    darkColor: "bg-yellow-600",
    lightColor: "bg-yellow-50"
  },
  Entkernung: {
    color: "orange",
    icon: <HardHat className="h-4 w-4" />,
    gradient: "from-orange-50 to-orange-100",
    textColor: "text-orange-600",
    borderColor: "border-orange-200",
    darkColor: "bg-orange-600",
    lightColor: "bg-orange-50"
  },
  Leiharbeit: {
    color: "pink",
    icon: <Users className="h-4 w-4" />,
    gradient: "from-pink-50 to-pink-100",
    textColor: "text-pink-600",
    borderColor: "border-pink-200",
    darkColor: "bg-pink-600",
    lightColor: "bg-pink-50"
  }
};

type Article = {
  title: string;
  description: string;
  category: CategoryKey;
  slug: string;
  image: string;
  date: string;
  readingTime: string;
  featured?: boolean;
  new?: boolean;
  interactive?: boolean;
  icon?: React.ReactNode;
}

// Artikeldaten
const articles: Article[] = [
  // Security
  {
    title: "Smart-Building Sicherheit: IoT, KI und vernetzte Sicherheitssysteme",
    description: "Wie moderne Technologien die Gebäudesicherheit revolutionieren, welche Risiken sie mit sich bringen und wie Sie Ihre Smart Building Sicherheit bewerten können.",
    category: "Security",
    slug: "SmartBuildingSicherheit",
    image: "/images/blog/smart-building.jpg",
    date: "01.03.2025",
    readingTime: "15 min",
    featured: true,
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Notfallplan für Ihr Unternehmen",
    description: "Erstellen Sie einen umfassenden Notfallplan mit unserer Schritt-für-Schritt Anleitung und Checklisten für verschiedene Szenarien.",
    category: "Security",
    slug: "security",
    image: "/images/blog/home-security.jpg",
    date: "21.02.2024",
    readingTime: "15 min"
  },
  {
    title: "§34a Sachkundeprüfung: Der ultimative Vorbereitungsguide",
    description: "Alles was Sie für eine erfolgreiche Sachkundeprüfung im Bewachungsgewerbe wissen müssen - mit interaktivem Prüfungssimulator und kompletten Lernmaterialien",
    category: "Security",
    slug: "Sachkunde34a",
    image: "/images/blog/34a-hero.jpg",
    date: "01.03.2025",
    readingTime: "15 min + Simulator",
    featured: true,
    interactive: true,
    icon: <Shield className="h-5 w-5" />
  },
  
  // Reinigung
  {
    title: "Nachhaltige Reinigungsmethoden & Öko-Zertifizierungen",
    description: "Ein umfassender Leitfaden für umweltbewusste Gebäudereinigung mit Vergleich der relevantesten Umweltsiegel und praktischen Tipps zur Implementierung",
    category: "Reinigung",
    slug: "NachhaltigeReinigung",
    image: "/images/blog/home-cleaning.jpg",
    date: "01.03.2025",
    readingTime: "15 min",
    featured: true,
    icon: <Leaf className="h-5 w-5" />
  },
  {
    title: "Fleckenentfernungs-Berater: Der ultimative Guide",
    description: "Interaktiver Berater für die Entfernung aller Arten von Flecken auf verschiedensten Oberflächen - mit chemischen Hintergründen und Schritt-für-Schritt Anleitungen",
    category: "Reinigung",
    slug: "FleckenentfernungsBerater",
    image: "/images/blog/flecken.jpg",
    date: "18.03.2025",
    readingTime: "10 min + Tool",
    featured: true,
    new: true,
    interactive: true,
    icon: <Leaf className="h-5 w-5" />
  },
  {
    title: "Materialspezifischer Reinigungsguide",
    description: "Umfassender Leitfaden für die optimale Reinigung verschiedener Materialien - von Marmor über Holz bis zu Edelstahl und mehr",
    category: "Reinigung",
    slug: "MaterialspezifischeReinigung",
    image: "/images/blog/materialien.jpg",
    date: "15.03.2025",
    readingTime: "12 min",
    featured: true,
    new: true,
    icon: <Leaf className="h-5 w-5" />
  },
  
  // Weitere Artikel...
  {
    title: "Winterdienst: DIY vs. Professionell - Was lohnt sich wirklich?",
    description: "Berechnen Sie die Kosten für professionellen Winterdienst im Vergleich zur Eigenleistung mit unserem interaktiven Rechner",
    category: "Winterdienst",
    slug: "WinterdienstKostenrechner",
    image: "/images/blog/winter.jpg",
    date: "01.03.2025",
    readingTime: "Interaktives Tool",
    featured: true,
    interactive: true,
    icon: <Snowflake className="h-5 w-5" />
  },
  {
    title: "Streumittel-Vergleich 2025 mit interaktivem Bedarfsrechner",
    description: "Alle Streumittel im umfassenden Vergleich plus personalisierter Bedarfsrechner für optimale Winterdienst-Planung",
    category: "Winterdienst",
    slug: "StreumittelRechnerundVergleich",
    image: "/images/blog/streumittel.jpg",
    date: "21.03.2025",
    readingTime: "8 min + Rechner",
    featured: true,
    new: true,
    interactive: true,
    icon: <Snowflake className="h-5 w-5" />
  },
  {
    title: "Der ultimative Räumpflicht-Guide 2025",
    description: "Was Hausbesitzer und Vermieter in Deutschland jetzt über Räum- und Streupflichten wissen müssen - mit interaktivem Pflicht-Checker und aktuellen Gerichtsurteilen",
    category: "Winterdienst",
    slug: "RaeumpflichtGuide2025",
    image: "/images/blog/raeumpflicht.jpg",
    date: "01.03.2025",
    readingTime: "12 min + Tool",
    featured: true,
    new: true,
    interactive: true,
    icon: <Snowflake className="h-5 w-5" />
  },
  {
    title: "Der ultimative Sanierungsguide",
    description: "Ihr umfassender Leitfaden für erfolgreiche Sanierungen nach Wasser-, Brand- und Schimmelschäden mit praktischen Checklisten und Entscheidungshilfen",
    category: "Sanierung",
    slug: "SanierungsGuide",
    image: "/images/blog/sanierung.jpg",
    date: "20.03.2025",
    readingTime: "18 min",
    featured: true,
    new: true,
    icon: <Paintbrush className="h-5 w-5" />
  },
  {
    title: "Schadensprävention und Erste Hilfe",
    description: "Wertvolle Tipps zur Vorbeugung von Gebäudeschäden und Anleitung zum richtigen Handeln im Schadensfall mit Notfallkontakten",
    category: "Sanierung",
    slug: "SanierungPraevention",
    image: "/images/blog/prevention.jpg",
    date: "04.03.2025",
    readingTime: "12 min",
    featured: true,
    new: true,
    icon: <Paintbrush className="h-5 w-5" />
  },
  {
    title: "Entkernungs-Guide: Professioneller Prozess & Entscheidungshilfen",
    description: "Der umfassende Leitfaden zur professionellen Entkernung - von der Planung bis zur Umsetzung mit wichtigen Entscheidungshilfen und praktischen Tipps",
    category: "Entkernung",
    slug: "EntkernungsGuide",
    image: "/images/blog/entkernung.jpg",
    date: "19.03.2025",
    readingTime: "8 min",
    featured: true,
    new: true,
    icon: <HardHat className="h-5 w-5" />
  },
  {
    title: "Entrümpelungs-Guide: Professionell, effizient und stressfrei",
    description: "Der ultimative Leitfaden zur Entrümpelung mit Prozessübersicht, Materialguide, Vorbereitungschecklisten und psychologischen Aspekten des Loslassens",
    category: "Entrümpelung",
    slug: "EntruempelungsGuide",
    image: "/images/entruempelung/hero.jpg",
    date: "20.03.2025",
    readingTime: "10 min",
    featured: true,
    new: true,
    icon: <Trash2 className="h-5 w-5" />
  },
  {
    title: "Entrümpelungskosten-Rechner 2025",
    description: "Berechnen Sie die Kosten für Ihre Entrümpelung mit unserem interaktiven Tool basierend auf Volumen, Material und Aufwand",
    category: "Entrümpelung",
    slug: "EntruemplungsKostenRechner",
    image: "/images/entruempelung/about.jpg",
    date: "01.03.2025",
    readingTime: "Interaktives Tool",
    featured: true,
    interactive: true,
    icon: <Trash2 className="h-5 w-5" />
  },
  {
    title: "Leiharbeits-Guide: Vorteile, Planung & rechtskonformer Einsatz",
    description: "Der ultimative Leitfaden für Unternehmen zum Einsatz von Leiharbeitern - mit Rechtsgrundlagen, Prozessanleitungen und Best Practices für erfolgreiche Integration",
    category: "Leiharbeit",
    slug: "LeiharbeitGuide",
    image: "/images/blog/leiharbeit.jpg",
    date: "20.03.2025",
    readingTime: "12 min",
    featured: true,
    new: true,
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Photovoltaik-Montage Guide",
    description: "Der ultimative Leitfaden zur fachgerechten Montage von PV-Anlagen für maximale Leistung und Lebensdauer - Mit Checklisten und Expertenempfehlungen",
    category: "PV-Montage",
    slug: "PVGuide",
    image: "/images/blog/guide.jpg",
    date: "20.03.2025",
    readingTime: "15 min",
    featured: true,
    new: true,
    icon: <Sun className="h-5 w-5" />
  },
  {
    title: "PV-Modul Vergleich: Effizienz, Kosten und Haltbarkeit",
    description: "Ein umfassender Vergleich verschiedener Photovoltaik-Module mit Fokus auf Effizienz, Langlebigkeit und Preis-Leistungs-Verhältnis",
    category: "PV-Montage",
    slug: "PVVergleich",
    image: "/images/blog/modules.jpg",
    date: "22.03.2025",
    readingTime: "10 min",
    new: true,
    icon: <Sun className="h-5 w-5" />
  }
];

// Hilfsfunktion für sicheren Zugriff auf Kategoriekonfiguration
const getCategoryConfig = (category: CategoryKey, property: keyof CategoryConfig[CategoryKey]) => {
  return CATEGORY_CONFIG[category]?.[property] || '';
};

// Extrahiere alle Kategorien
const allCategories = Array.from(new Set(articles.map(article => article.category)));

export default function BlogPage() {
  // State für UI-Elemente
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  
  // Apple-typischer Intro-Effekt
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Scroll-Tracking für Parallax-Effekte
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Focus auf Sucheingabe, wenn Suche angezeigt wird
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [showSearch]);

  // Filterfunktion für Artikel
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
      const matchesSearch = searchTerm ? 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);
  
  // Gruppieren von Artikeln nach Kategorie für optimierte Anzeige
  const articlesByCategory = useMemo(() => {
    return allCategories.reduce((acc, category) => {
      acc[category] = articles.filter(article => article.category === category);
      return acc;
    }, {} as Record<CategoryKey, Article[]>);
  }, []);
  
  // Suchfunktionalität
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setHighlightedIndex(-1);
  };
  
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => 
        prev < filteredArticles.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      window.location.href = `/blog/${filteredArticles[highlightedIndex].slug}`;
    } else if (e.key === 'Escape') {
      setShowSearch(false);
    }
  };
  
  // Scrollt zum hervorgehobenen Suchergebnis
  useEffect(() => {
    if (highlightedIndex >= 0 && searchResultsRef.current) {
      const resultElement = searchResultsRef.current.children[highlightedIndex] as HTMLElement;
      if (resultElement) {
        resultElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [highlightedIndex]);
  
  // Get Featured and New Articles
  const featuredArticles = useMemo(() => 
    articles.filter(article => article.new || article.featured)
           .sort((a, b) => {
             if (a.new && !b.new) return -1;
             if (!a.new && b.new) return 1;
             return 0;
           })
           .slice(0, 3),
  []);
  
  const interactiveTools = useMemo(() => 
    articles.filter(article => article.interactive).slice(0, 6),
  []);
  
  // Dynamischer Wert für Parallax-Effekte
  const heroOffset = useMemo(() => 
    Math.min(scrollPosition * 0.4, 100),
  [scrollPosition]);
  
  const opacity = useMemo(() => 
    Math.max(1 - scrollPosition / 500, 0),
  [scrollPosition]);
  
  const blurValue = useMemo(() => 
    Math.min(scrollPosition / 100, 10),
  [scrollPosition]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Steve Jobs würdiger Intro-Effekt */}
      {!introComplete && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center animate-fadeOut">
          <div className="text-4xl font-light text-gray-900 animate-scaleUp">
            TREU<span className="text-accent">Blog</span>
          </div>
        </div>
      )}
      
      {/* Apple-Stil Suchoberfläche */}
      {showSearch && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh] animate-fadeIn"
          onClick={() => setShowSearch(false)}
        >
          <div 
            className="w-full max-w-2xl mx-4 bg-white rounded-xl shadow-2xl overflow-hidden animate-slideDown"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Suchen Sie nach Artikeln und Tools..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-accent"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                />
              </div>
            </div>
            
            {searchTerm && (
              <div 
                ref={searchResultsRef}
                className="max-h-[60vh] overflow-y-auto p-2"
              >
                {filteredArticles.length > 0 ? (
                  <>
                    <div className="px-4 py-2 text-xs text-gray-500">
                      {filteredArticles.length} {filteredArticles.length === 1 ? 'Ergebnis' : 'Ergebnisse'} gefunden
                    </div>
                    {filteredArticles.map((article, index) => (
                      <Link
                        key={article.slug}
                        href={`/blog/${article.slug}`}
                        className={`flex items-center p-4 rounded-lg transition-colors ${
                          index === highlightedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`p-2 rounded-full mr-3 ${getCategoryConfig(article.category, 'lightColor')}`}>
                          {article.icon || getCategoryConfig(article.category, 'icon')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm text-gray-900 truncate">{article.title}</h3>
                          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
                            <span>{article.category}</span>
                            <span>•</span>
                            <span>{article.readingTime}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-gray-600 font-medium">Keine Ergebnisse gefunden</p>
                    <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">
                      Versuchen Sie es mit einem anderen Suchbegriff oder entdecken Sie unsere Kategorien.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Hero-Bereich im Apple-Vision Pro Stil */}
      <section 
        className="relative min-h-[75vh] flex items-center text-white overflow-hidden"
        style={{ 
          background: 'linear-gradient(135deg, #000 0%, #333 100%)',
        }}
      >
        <div 
          className="absolute inset-0 z-0 bg-center bg-cover opacity-30"
          style={{ 
            backgroundImage: "url('/images/blog/hero-pattern.jpg')",
            transform: `translateY(${heroOffset}px)`,
            filter: `blur(${blurValue}px)`
          }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            <div 
              className="transform transition-transform duration-700 translate-y-0"
              style={{ 
                opacity,
                transform: `translateY(${Math.min(scrollPosition * 0.2, 40)}px)`
              }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                Entdecken Sie <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">bessere Lösungen</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Expertenwissen und interaktive Tools, die Ihren Alltag vereinfachen
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setShowSearch(true)}
                  className="px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl flex items-center"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Artikel durchsuchen
                </button>
                
                <Link href="#categories" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-full font-medium hover:bg-white/20 transition-colors flex items-center">
                  Kategorien entdecken
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10" />
      </section>
      
      {/* Hauptinhalt */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pb-20">
        {/* Ausgewählte Artikel - Apple TV+ Stil */}
        <section className="my-16">
          <h2 className="text-2xl font-semibold mb-8">Ausgewählte Artikel</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <Link 
                key={article.slug}
                href={`/blog/${article.slug}`}
                className={`group block overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ${
                  index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={article.image} 
                    alt={article.title}
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                    <div className={`px-3 py-1 rounded-full text-xs text-white font-medium ${getCategoryConfig(article.category, 'darkColor')}`}>
                      {article.category}
                    </div>
                    
                    {article.new && (
                      <div className="px-3 py-1 rounded-full bg-accent text-white text-xs font-medium">
                        Neu
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl text-white font-medium mb-2 group-hover:underline decoration-1 underline-offset-2">
                      {article.title}
                    </h3>
                    
                    <div className="flex items-center text-white/70 text-sm">
                      <Clock className="h-4 w-4 mr-2" />
                      {article.readingTime}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Interaktive Tools im macOS Big Sur Stil */}
        <section className="my-20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">Interaktive Tools</h2>
            <Link href="#all-tools" className="text-accent hover:underline text-sm font-medium flex items-center">
              Alle Tools anzeigen
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {interactiveTools.map((tool) => (
              <Link 
                key={tool.slug}
                href={`/blog/${tool.slug}`}
                className="group block"
              >
                <div className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors h-full flex flex-col">
                  <div className="flex items-start mb-4">
                    <div className={`p-2.5 rounded-full ${getCategoryConfig(tool.category, 'lightColor')} mr-3`}>
                      {tool.icon || getCategoryConfig(tool.category, 'icon')}
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-accent transition-colors line-clamp-2">
                        {tool.title}
                      </h3>
                      <div className="text-xs text-gray-500 mt-1">{tool.category}</div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                    {tool.description}
                  </p>
                  
                  <div className="mt-auto pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-xs text-gray-500">{tool.readingTime}</span>
                    <span className="text-accent text-sm font-medium group-hover:underline">
                      Tool starten
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        
        {/* Kategoriebrowser - iPadOS Stil */}
        <section id="categories" className="my-20 scroll-mt-16">
          <h2 className="text-2xl font-semibold mb-8">Nach Kategorie durchsuchen</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allCategories.map(category => (
              <div key={category} className="mb-10">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getCategoryConfig(category, 'lightColor')}`}>
                    {getCategoryConfig(category, 'icon')}
                  </div>
                  <h3 className="text-xl font-medium ml-3">{category}</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {articlesByCategory[category].slice(0, 3).map(article => (
                    <Link
                      key={article.slug}
                      href={`/blog/${article.slug}`}
                      className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                    >
                      <div className="relative overflow-hidden rounded-lg flex-shrink-0 w-16 h-16 bg-gray-100">
                        <Image 
                          src={article.image} 
                          alt={article.title}
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1 group-hover:text-accent transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                          {article.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                  
                  {articlesByCategory[category].length > 3 && (
                    <Link
                      href={`#${category}`}
                      onClick={() => setSelectedCategory(category)}
                      className={`text-sm font-medium ${getCategoryConfig(category, 'textColor')} hover:underline flex items-center p-3`}
                    >
                      Alle {articlesByCategory[category].length} Artikel anzeigen
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="my-20">
          <div className="bg-gray-900 text-white rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-semibold mb-4">Bereit für den nächsten Schritt?</h2>
                <p className="text-gray-300 mb-8">
                  Unser Expertenteam steht bereit, um Ihre Fragen zu beantworten und Ihnen bei der Auswahl der richtigen Dienstleistung zu helfen.
                </p>
                
                <div className="flex flex-col gap-4">
                <Link href="/contact">
                    <button className="w-full bg-white text-gray-900 py-4 px-6 rounded-full hover:bg-gray-100 transition-colors font-medium flex items-center justify-center">
                      <Mail className="h-5 w-5 mr-2" />
                      Kontakt aufnehmen
                    </button>
                  </Link>
                  
                  <Link href="tel:+4923115044352">
                    <button className="w-full bg-white/10 backdrop-blur-sm text-white py-4 px-6 rounded-full hover:bg-white/20 transition-colors font-medium border border-white/30 flex items-center justify-center">
                      <Phone className="h-5 w-5 mr-2" />
                      0231 15044352
                    </button>
                  </Link>
                </div>
              </div>
              
              <div className="relative hidden lg:block">
                <div 
                  className="absolute inset-0 bg-center bg-cover"
                  style={{ backgroundImage: "url('/images/contact-bg.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent" />
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Schwebendes Suchfeld, das beim Scrollen erscheint - ähnlich wie in Safari */}
      {scrollPosition > 300 && (
        <div className="fixed bottom-6 right-6 z-40 flex space-x-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            aria-label="Nach oben"
          >
            <ChevronDown className="h-5 w-5 transform rotate-180" />
          </button>
          
          <button
            onClick={() => setShowSearch(true)}
            className="h-12 px-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center hover:bg-white transition-colors"
          >
            <Search className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Suchen</span>
          </button>
        </div>
      )}
    </div>
  );
}
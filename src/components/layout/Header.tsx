"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Globe, Cloud, CloudSnow, Sun, CloudRain, AlertTriangle, Calculator, MapPin } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Container } from "./Container"
import { cn } from "@/lib/utils"

// Importiere den Weather-Context und Utility-Funktionen
import { useWeather } from '@/components/weather/WeatherContext';
import { formatTemperature } from '@/components/weather/utils';
import { navigation } from "@/config/navigation"

interface Category {
  title: string
  slug: string
}

interface BlogSection {
  title: string
  categories: Category[]
}

interface Navigation {
  services: {
    reinigung: {
      title: string
      href: string
      items: string[]
    }
    security: {
      title: string
      href: string
      items: string[]
    }
    winterdienst: {
      title: string
      href: string
    }
  }
  weitere_leistungen: {
    title: string
    href: string
    description: string
  }[]
  menu: {
    about: string
    contact: string
    blog: string
  }
}

interface Blog {
  winterdienst: BlogSection
  reinigung: BlogSection
  security: BlogSection
}

// Stelle sicher, dass deine Übersetzungsdateien die blog-Struktur enthalten
// Wenn nicht, müssen wir fallback-Daten verwenden
const blogFallbackData: Blog = {
  winterdienst: {
    title: "Winterdienst",
    categories: [
      { title: "Schneeräumung", slug: "schneeraeumung" },
      { title: "Streumittel", slug: "streumittel" }
    ]
  },
  reinigung: {
    title: "Reinigung",
    categories: [
      { title: "Gebäudereinigung", slug: "gebaeudereinigung" },
      { title: "Industriereinigung", slug: "industriereinigung" }
    ]
  },
  security: {
    title: "Security",
    categories: [
      { title: "Objektschutz", slug: "objektschutz" },
      { title: "Personenschutz", slug: "personenschutz" }
    ]
  }
};

import deNavigation from "@/i18n/de/de.json"
import enNavigation from "@/i18n/en/en.json"

const navigations = {
  de: deNavigation,
  en: enNavigation
} as const

// Standort-Picker Komponente
const LocationPicker = () => {
  const params = useParams();
  const locale = (params.locale as string) || "de";
  
  // Weather Context verwenden
  const { 
    isLoading, 
    error, 
    location, 
    searchLocation, 
    detectLocation 
  } = useWeather();
  
  // Lokaler State nur für das Eingabefeld
  const [inputValue, setInputValue] = React.useState('');
  const [popoverOpen, setPopoverOpen] = React.useState(false);

  // Wenn sich der globale Location-Wert ändert, updaten wir auch das Eingabefeld
  React.useEffect(() => {
    if (location) {
      setInputValue(location);
    }
  }, [location]);

  // Funktion zum Suchen eines Ortes
  const handleSearch = async () => {
    if (!inputValue.trim()) return;
    await searchLocation(inputValue);
    setPopoverOpen(false);
  };

  // Enter-Taste für die Suche
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Standorterkennung mit Context-Funktion
  const handleDetectLocation = async () => {
    await detectLocation();
    setPopoverOpen(false);
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8 rounded-full border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-3">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">
            {locale === 'de' ? 'Standort wählen' : 'Choose location'}
          </h3>
          <div className="flex gap-2">
            <Input
              placeholder={locale === 'de' ? "PLZ oder Ort eingeben..." : "Enter ZIP or city..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow text-sm h-8"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSearch} 
              disabled={isLoading || !inputValue.trim()} 
              className="h-8 px-3 bg-blue-600 hover:bg-blue-700"
              size="sm"
            >
              {isLoading ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span>{locale === 'de' ? 'OK' : 'OK'}</span>
              )}
            </Button>
          </div>
          
          <Button 
            onClick={handleDetectLocation} 
            disabled={isLoading}
            variant="outline"
            className="w-full h-8 text-sm flex items-center justify-center gap-2"
            size="sm"
          >
            <MapPin className="w-3 h-3" />
            <span>{locale === 'de' ? 'Meinen Standort verwenden' : 'Use my location'}</span>
          </Button>
          
          {error && (
            <div className="mt-2 text-xs text-red-600 py-1 px-2 bg-red-50 rounded border border-red-200">
              <div className="flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1 flex-shrink-0" />
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Wetter-Widget Komponente
const WeatherWidget = () => {
  const params = useParams();
  const locale = (params.locale as string) || "de";
  
  // Weather Context verwenden
  const { weatherData, location } = useWeather();
  
  // Beim ersten Laden oder wenn keine Daten vorhanden, zeige Lade-Indikator
  if (!weatherData || !weatherData.currentConditions) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-md border text-sm bg-slate-50 border-slate-200">
        <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
        <span>Laden...</span>
      </div>
    );
  }

  // Status basierend auf Temperatur und Niederschlag berechnen
  const temp = weatherData.currentConditions.temperature;
  const precipProb = weatherData.currentConditions.precipitationProbability;
  
  let status: 'required' | 'standby' | 'not-required' = 'not-required';
  
  if (temp < 0 || precipProb > 70) {
    status = 'required'; // Rot - Winterdienst erforderlich
  } else if (temp <= 3 || precipProb > 40) {
    status = 'standby'; // Gelb - Bereitschaft
  }

  // Wetter-Icon auswählen
  const getWeatherIcon = () => {
    const icon = weatherData.currentConditions.icon.toLowerCase();
    
    switch(icon) {
      case 'clear-day':
      case 'clear-night':
        return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
      case 'cloudy':
        return <Cloud className="w-4 h-4 text-gray-500" />;
      case 'rain':
        return <CloudRain className="w-4 h-4 text-blue-500" />;
      case 'snow':
      case 'sleet':
        return <CloudSnow className="w-4 h-4 text-blue-300" />;
      default:
        return <Cloud className="w-4 h-4" />;
    }
  };
  
  // Status-Texte basierend auf Sprache
  const statusText = {
    de: {
      required: "Winterdienst erforderlich",
      standby: "Winterdienst in Bereitschaft",
      "not-required": "Kein Winterdienst nötig"
    },
    en: {
      required: "Winter service required",
      standby: "Winter service on standby",
      "not-required": "No winter service needed"
    }
  };
  
  // Status-Farben
  const statusColors = {
    required: "bg-red-100 border-red-200 text-red-800",
    standby: "bg-yellow-100 border-yellow-200 text-yellow-800",
    "not-required": "bg-green-100 border-green-200 text-green-800"
  };
  
  // Status-Icons
  const statusIcons = {
    required: <AlertTriangle className="w-3 h-3" />,
    standby: <CloudSnow className="w-3 h-3" />,
    "not-required": <Sun className="w-3 h-3" />
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-md border text-sm cursor-pointer
            ${statusColors[status]}`}>
            {getWeatherIcon()}
            <span className="flex items-center gap-1">
              <span>{formatTemperature(temp)}°C</span>
              <span className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: 
                    status === 'required' ? 'rgb(220, 38, 38)' : 
                    status === 'standby' ? 'rgb(234, 179, 8)' : 
                    'rgb(22, 163, 74)'
                }}
              />
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="p-3 max-w-xs">
          <div className="space-y-2">
            <div className="font-medium flex items-center gap-2">
              {statusIcons[status]}
              {statusText[locale as 'de' | 'en'][status]}
            </div>
            <div className="text-xs">
              {weatherData.notifications.iceRisk.description}
            </div>
            
            {/* Zeige den Ortsnamen an, wenn verfügbar */}
            {location && (
              <div className="text-xs font-medium text-blue-600">
                {locale === 'de' ? 'Standort' : 'Location'}: {location}
              </div>
            )}
            
            <div className="text-xs pt-1 border-t border-gray-200 mt-1">
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <span>Temperatur:</span>
                <span>{formatTemperature(temp)}°C</span>
                <span>Feuchtigkeit:</span>
                <span>{weatherData.currentConditions.humidity}%</span>
                <span>Niederschlag:</span>
                <span>{formatTemperature(weatherData.currentConditions.precipitation)} mm</span>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Funktion zum Entfernen des Locale-Präfixes aus dem Pfad
function removeLocalePrefix(path: string): string {
  // Wenn der Pfad mit /de/ oder /en/ beginnt, entferne die ersten 3 Zeichen
  if (path.startsWith('/de/') || path.startsWith('/en/')) {
    return path.substring(3);
  }
  // Wenn der Pfad nur aus /de oder /en besteht, gib leer zurück
  if (path === '/de' || path === '/en') {
    return '';
  }
  return path;
}

export function Header() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as keyof typeof navigations) || "de";
  
  const nav = navigations[locale].navigation as Navigation;
  
  // Füge Fallback-Daten hinzu, falls Blog nicht vorhanden ist
  const blogData = (navigations[locale] as Record<string, unknown>)?.blog as Blog || blogFallbackData;
  
  // Nutze die Hilfsfunktion statt RegExp
  const currentPath = removeLocalePrefix(pathname);

  // Wir laden die Daten direkt aus der navigation.ts statt von den JSON-Dateien
  const currentNavigation = navigation[locale as 'de' | 'en'];

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center">
          {/* Logo */}
          <div className="mr-8">
            <Link href={`/${locale}`}>
              <div className="relative h-8 w-28">
                <Image
                  src="/images/treu-header.svg"
                  alt="TREU Service Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Hauptnavigation */}
          <div className="flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Reinigung */}
                <NavigationMenuItem>
                  <Link href={nav.services.reinigung.href}>
                    <NavigationMenuTrigger className="px-3 hover:bg-slate-100">
                      {nav.services.reinigung.title}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-4 bg-white">
                      <div className="grid grid-cols-2 gap-3">
                        {nav.services.reinigung.items.map((item: string, index: number) => (
                          <Link 
                            key={index}
                            href={`${nav.services.reinigung.href}?service=${item.toLowerCase().replace(/\s+/g, '-')}#services`}
                            className="p-2 rounded-md hover:bg-slate-100 transition-colors"
                          >
                            <span className="text-sm">{item}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Security */}
                <NavigationMenuItem>
                  <Link href={nav.services.security.href}>
                    <NavigationMenuTrigger className="px-3 hover:bg-slate-100">
                      {nav.services.security.title}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-4 bg-white">
                      <div className="grid grid-cols-2 gap-3">
                        {nav.services.security.items.map((item: string, index: number) => (
                          <Link 
                            key={index}
                            href={`${nav.services.security.href}?service=${item.toLowerCase().replace(/\s+/g, '-')}#services`}
                            className="p-2 rounded-md hover:bg-slate-100 transition-colors"
                          >
                            <span className="text-sm">{item}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Winterdienst */}
                <NavigationMenuItem>
                  <Link href={nav.services.winterdienst.href}>
                    <NavigationMenuTrigger className="px-3 hover:bg-slate-100">
                      {nav.services.winterdienst.title}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-white">
                      <div className="grid gap-3">
                        <Link 
                          href={nav.services.winterdienst.href}
                          className="p-2 rounded-md hover:bg-slate-100 transition-colors"
                        >
                          <span className="text-sm font-medium">Winterdienst-Services</span>
                        </Link>
                        <Link 
                          href={`/${locale}/blog/winterdienst`}
                          className="p-2 rounded-md hover:bg-slate-100 transition-colors"
                        >
                          <span className="text-sm">DIY-Winterdienst Tipps</span>
                        </Link>
                        <Link 
                          href={`/${locale}/blog/streumittel`}
                          className="p-2 rounded-md hover:bg-slate-100 transition-colors"
                        >
                          <span className="text-sm">Streugut-Vergleich</span>
                        </Link>
                        <Link 
                          href={`/${locale}/blog/StreumittelCalculator`}
                          className="p-2 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Calculator className="h-4 w-4 text-blue-600" /> 
                            Streumittel-Rechner
                          </span>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Weitere Leistungen Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 hover:bg-slate-100">
                    {locale === "de" ? "Weitere Leistungen" : "More Services"}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-white">
                      <div className="grid gap-3">
                        {currentNavigation.weitere_leistungen.map((service, index) => (
                          <Link 
                            key={index}
                            href={service.href}
                            className="p-3 rounded-md hover:bg-slate-100 transition-colors"
                          >
                            <span className="text-sm font-medium">{service.title}</span>
                            <p className="text-xs text-muted-foreground mt-1">{service.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Wetter-Widget mit Winterdienst-Status und Standortauswahl */}
          <div className="mr-3 flex items-center gap-2">
            <LocationPicker />
            {/* WICHTIG: Link zum Wetter-Widget entfernt, um Weiterleitungsproblem zu lösen */}
            <WeatherWidget />
          </div>

          {/* Rechte Navigation */}
          <div className="flex items-center space-x-2">
            {/* Blog Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href={`/${locale}/blog`}>
                    <NavigationMenuTrigger className="px-3 hover:bg-slate-100">
                      {nav.menu.blog}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4 bg-white">
                      <div className="flex flex-col">
                        {blogData.winterdienst.categories.map((category: Category) => (
                          <Link
                            key={category.slug}
                            href={`/${locale}/blog/${category.slug === 'streumittel' ? 'streumittel' : 'winterdienst'}`}
                            className="block p-2 text-sm hover:bg-slate-100 rounded-md transition-colors"
                          >
                            {category.title}
                          </Link>
                        ))}
                        {/* Streumittel-Rechner Eintrag */}
                        <Link
                          href={`/${locale}/blog/StreumittelCalculator`}
                          className="block p-2 text-sm hover:bg-blue-50 rounded-md transition-colors mt-1 bg-blue-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <Calculator className="h-4 w-4 text-blue-600" /> 
                            Streumittel-Rechner
                          </span>
                        </Link>
                        {blogData.reinigung.categories.map((category: Category) => (
                          <Link
                            key={category.slug}
                            href={`/${locale}/blog/reinigung`}
                            className="block p-2 text-sm hover:bg-slate-100 rounded-md transition-colors"
                          >
                            {category.title}
                          </Link>
                        ))}
                        {blogData.security.categories.map((category: Category) => (
                          <Link
                            key={category.slug}
                            href={`/${locale}/blog/security`}
                            className="block p-2 text-sm hover:bg-slate-100 rounded-md transition-colors"
                          >
                            {category.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Über uns */}
            <Link 
              href={`/${locale}/about`}
              className={cn(
                navigationMenuTriggerStyle(),
                "px-3 hover:bg-slate-100"
              )}
            >
              {nav.menu.about}
            </Link>

            {/* Kontakt */}
            <Link 
              href={`/${locale}/contact`}
              className={cn(
                navigationMenuTriggerStyle(),
                "px-3 hover:bg-slate-100"
              )}
            >
              {nav.menu.contact}
            </Link>

            {/* Sprache */}
            <Link
              href={locale === "de" ? `/en${currentPath}` : `/de${currentPath}`}
              className={cn(
                navigationMenuTriggerStyle(),
                "flex items-center gap-2 px-3 hover:bg-slate-100"
              )}
            >
              <Globe className="w-4 h-4" />
              {locale === "de" ? "DE" : "EN"}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}
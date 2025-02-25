"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Globe, Cloud, CloudSnow, Sun, CloudRain, AlertTriangle, Calculator } from "lucide-react"
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
import { Container } from "./Container"
import { cn } from "@/lib/utils"
import { getCurrentWeather, calculateIceRisk } from "@/components/weather/brightsky"
import { Badge } from "@/components/ui/badge"

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
    entruempelung: {
      title: string
      href: string
    }
  }
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

// Wetter-Widget Komponente
const WeatherWidget = () => {
  const params = useParams();
  const locale = (params.locale as string) || "de";
  const [weather, setWeather] = React.useState<{
    temperature: number | null;
    condition: string;
    icon: string;
    humidity: number;
    precipitation: number;
    status: 'required' | 'standby' | 'not-required';
    riskDescription: string;
  } | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Koordinaten für Mittel-Deutschland
        const data = await getCurrentWeather({
          lat: 51.1657,
          lon: 10.4515
        });
        
        if (data) {
          // Status basierend auf Temperatur und Niederschlag berechnen
          const temp = data.temperature ?? 0;
          const precip = data.precipitation ?? 0;
          const humidity = data.relative_humidity ?? 70;
          
          let status: 'required' | 'standby' | 'not-required' = 'not-required';
          
          // Eis-Risiko berechnen
          const iceRisk = calculateIceRisk(temp, precip, humidity);
          
          if (temp < 0 || (temp <= 2 && precip > 0)) {
            status = 'required'; // Rot - Winterdienst erforderlich
          } else if (temp <= 3 || precip > 0.5) {
            status = 'standby'; // Gelb - Bereitschaft
          }
          
          setWeather({
            temperature: data.temperature || null,
            condition: data.condition || 'unknown',
            icon: data.icon || 'cloud',
            humidity: humidity,
            precipitation: precip,
            status: status,
            riskDescription: iceRisk.description
          });
        }
      } catch (error) {
        console.error("Fehler beim Abrufen des Wetters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Wetter-Icon auswählen
  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="w-4 h-4" />;
    
    switch(weather.icon.toLowerCase()) {
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
            ${weather ? statusColors[weather.status] : "bg-slate-50 border-slate-200"}`}>
            {isLoading ? (
              <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-blue-500 animate-spin"></div>
            ) : (
              <>
                {weather && (
                  <>
                    {getWeatherIcon()}
                    <span className="flex items-center gap-1">
                      {weather.temperature !== null && (
                        <span>{weather.temperature.toFixed(1)}°C</span>
                      )}
                      <span className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: 
                            weather.status === 'required' ? 'rgb(220, 38, 38)' : 
                            weather.status === 'standby' ? 'rgb(234, 179, 8)' : 
                            'rgb(22, 163, 74)'
                        }}
                      />
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="p-3 max-w-xs">
          {weather && (
            <div className="space-y-2">
              <div className="font-medium flex items-center gap-2">
                {statusIcons[weather.status]}
                {statusText[locale as 'de' | 'en'][weather.status]}
              </div>
              <div className="text-xs">
                {weather.riskDescription}
              </div>
              <div className="text-xs pt-1 border-t border-gray-200 mt-1">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <span>Temperatur:</span>
                  <span>{weather.temperature?.toFixed(1)}°C</span>
                  <span>Feuchtigkeit:</span>
                  <span>{weather.humidity}%</span>
                  <span>Niederschlag:</span>
                  <span>{weather.precipitation} mm</span>
                </div>
              </div>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export function Header() {
  const params = useParams()
  const pathname = usePathname()
  const locale = (params.locale as keyof typeof navigations) || "de"
  
  const nav = navigations[locale].navigation as Navigation
  
  // Füge Fallback-Daten hinzu, falls blog nicht vorhanden ist
  const blogData = (navigations[locale] as any).blog || blogFallbackData
  
  const currentPath = pathname.replace(/^\/[a-z]{2}/, "")

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center">
          {/* Logo */}
          <div className="w-32 mr-8">
            <Link href={`/${locale}`}>
              <div className="relative h-10 w-32">
                <Image
                  src="/images/treu-logo.svg"
                  alt="TREU Service Logo"
                  fill
                  className="object-contain"
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
                          className="p-2 rounded-md hover:bg-blue-50 transition-colors flex items-center justify-between"
                        >
                          <span className="text-sm font-medium flex items-center gap-1">
                            <Calculator className="h-4 w-4 text-primary" /> 
                            Streumittel-Rechner
                          </span>
                          <Badge variant="outline" className="text-[10px] bg-primary text-white border-primary">
                            NEU
                          </Badge>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Entrümpelung */}
                <NavigationMenuItem>
                  <Link 
                    href={nav.services.entruempelung.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "px-3 hover:bg-slate-100"
                    )}
                  >
                    {nav.services.entruempelung.title}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Wetter-Widget mit Winterdienst-Status */}
          <div className="mr-3">
            <Link href={`/${locale}/winterdienst`}>
              <WeatherWidget />
            </Link>
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
                        {/* Neuer hervorgehobener Eintrag für den Streumittel-Rechner */}
                        <Link
                          href={`/${locale}/blog/StreumittelCalculator`}
                          className="block p-2 text-sm hover:bg-blue-50 rounded-md transition-colors mt-1 bg-blue-50/50 font-medium flex items-center justify-between"
                        >
                          <span className="flex items-center gap-1">
                            <Calculator className="h-4 w-4 text-primary" /> 
                            Streumittel-Rechner
                          </span>
                          <Badge variant="outline" className="text-[10px] bg-primary text-white border-primary">
                            NEU
                          </Badge>
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
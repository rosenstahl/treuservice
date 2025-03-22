"use client"

// Reduzierter Import, nur das was wirklich benötigt wird
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Globe, Calculator, HardHat, Trash2, Users, Sun, Paintbrush, Snowflake, Leaf, Droplets, PaintBucket, Shovel } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Container } from "./Container"
import { cn } from "@/lib/utils"

// Importiere die neue WeatherHeader-Komponente
import WeatherHeader from '@/components/weather/WeatherHeader';
import { navigation } from "@/config/navigation"



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


// Fallback-Daten für Blog-Struktur



import deNavigation from "@/i18n/de/de.json"
import enNavigation from "@/i18n/en/en.json"

const navigations = {
  de: deNavigation,
  en: enNavigation
} as const

// Funktion zum Entfernen des Locale-Präfixes aus dem Pfad
function removeLocalePrefix(path: string): string {
  if (path.startsWith('/de/') || path.startsWith('/en/')) {
    return path.substring(3);
  }
  if (path === '/de' || path === '/en') {
    return '';
  }
  return path;
}

// Header-Komponente
export function Header() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as keyof typeof navigations) || "de";
  
  const nav = navigations[locale].navigation as Navigation;
  const currentPath = removeLocalePrefix(pathname);
  const currentNavigation = navigation[locale as 'de' | 'en'];

  // Handler für Winterdienst-Anfragen
  const handleServiceRequest = () => {
    // Navigiere zur Winterdienst-Seite mit korrektem Kontaktformular-Anker ('kontakt' statt 'contact')
    window.location.href = `/${locale}/winterdienst#kontakt`;
  };

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
                
                <Link 
              href={`/${locale}/winterdienst`}
              className={cn(
                navigationMenuTriggerStyle(),
                "px-3 hover:bg-slate-100"
              )}
            >
            {nav.services.winterdienst.title}
            </Link>

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

          {/* Neue WeatherHeader-Komponente */}
          <div className="mr-3">
            <WeatherHeader onRequestService={handleServiceRequest} />
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
                    
                        {/* Winterdienst-Einträge */}
                        <div className=" mb-1 border-gray-100 pt-2 text-xs text-gray-500 px-2">
                          Winterdienstwissen & Tools
                        </div>
                        <Link
                          href={`/${locale}/blog/WinterdienstKostenrechner`}
                          className="block p-2 text-sm hover:bg-blue-50 rounded-md transition-colors mt-1 bg-blue-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <Snowflake className="h-4 w-4 text-blue-600" /> 
                            Winterdienst Rechner: DIY vs. Professionell
                            <Calculator className="h-4 w-4 text-blue-600" /> 
                          </span>
                        </Link>

                        <Link
                          href={`/${locale}/blog/StreumittelRechnerundVergleich`}
                          className="block p-2 text-sm hover:bg-blue-50 rounded-md transition-colors mt-1 bg-blue-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <Snowflake className="h-4 w-4 text-blue-600" /> 
                            Streumittel-Vergleich & Rechner
                            <Calculator className="h-4 w-4 text-blue-600" /> 
                          </span>
                        </Link>

                        <Link
                          href={`/${locale}/blog/RaeumpflichtGuide2025`}
                          className="block p-2 text-sm hover:bg-blue-50 rounded-md transition-colors mt-1 bg-blue-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <Shovel className="h-4 w-4 text-blue-600" /> 
                              Räumpflicht-Guide 2025
                          </span>
                        </Link>
                        
                        {/* Reinigungseinträge - AKTUALISIERT */}
                        <div className="mt-3 mb-1 border-t border-gray-100 pt-2 text-xs text-gray-500 px-2">
                          Reinigungswissen & Tools
                        </div>
                        
                        

                        <Link
                          href={`/${locale}/blog/NachhaltigeReinigung`}
                          className="block p-2 text-sm hover:bg-teal-50 rounded-md transition-colors mt-1 bg-teal-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <Leaf className="h-4 w-4 text-teal-600" /> 
                            Nachhaltige Reinigungsmethoden
                          </span>
                        </Link>

                        <Link
                          href={`/${locale}/blog/FleckenentfernungsBerater`}
                          className="block p-2 text-sm hover:bg-teal-50 rounded-md transition-colors mt-1 bg-teal-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <Droplets className="h-4 w-4 text-teal-600" /> 
                            Fleckenentfernungs-Berater
                          </span>
                        </Link>

                        <Link
                          href={`/${locale}/blog/MaterialspezifischeReinigung`}
                          className="block p-2 text-sm hover:bg-teal-50 rounded-md transition-colors mt-1 bg-teal-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <PaintBucket className="h-4 w-4 text-teal-600" /> 
                            Materialspezifischer Reinigungsguide
                          </span>
                        </Link>
                        
                        {/* Sanierungsguide Eintrag - NEU */}
                        <div className="mt-3 mb-1 border-t border-gray-100 pt-2 text-xs text-gray-500 px-2">
                          Weitere Fachthemen
                        </div>
                        
                        <Link
                          href={`/${locale}/blog/SanierungsGuide`}
                          className="block p-2 text-sm hover:bg-purple-50 rounded-md transition-colors mt-1 bg-purple-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <Paintbrush className="h-4 w-4 text-purple-600" /> 
                            Sanierungs-Guide
                          </span>
                        </Link>
                        
                        {/* Entkernung Guide Eintrag */}
                        <Link
                          href={`/${locale}/blog/EntkernungsGuide`}
                          className="block p-2 text-sm hover:bg-orange-50 rounded-md transition-colors mt-1 bg-orange-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <HardHat className="h-4 w-4 text-orange-600" /> 
                            Entkernungs-Guide
                          </span>
                        </Link>

                        {/* Entrümpelung Guide Eintrag */}
                        <Link
                          href={`/${locale}/blog/EntruempelungsGuide`}
                          className="block p-2 text-sm hover:bg-red-50 rounded-md transition-colors mt-1 bg-red-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <Trash2 className="h-4 w-4 text-red-700" /> 
                            Entruempelungs-Guide
                          </span>
                        </Link>

                        <Link
                          href={`/${locale}/blog/LeiharbeitGuide`}
                          className="block p-2 text-sm hover:bg-pink-50 rounded-md transition-colors mt-1 bg-pink-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-pink-600" /> 
                            Leiharbeit-Guide
                          </span>
                        </Link>

                        <Link
                          href={`/${locale}/blog/PVGuide`}
                          className="block p-2 text-sm hover:bg-yellow-50 rounded-md transition-colors mt-1 bg-yellow-50/50 font-medium"
                        >
                          <span className="flex items-center gap-1">
                            <Sun className="h-4 w-4 text-yellow-600" /> 
                            PV-Montage-Guide
                          </span>
                        </Link>
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
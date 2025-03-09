"use client"

// Reduzierter Import, nur das was wirklich benötigt wird
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Globe, Calculator } from "lucide-react"
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

// Typen für Navigation
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

// Fallback-Daten für Blog-Struktur
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
  const blogData = (navigations[locale] as Record<string, unknown>)?.blog as Blog || blogFallbackData;
  const currentPath = removeLocalePrefix(pathname);
  const currentNavigation = navigation[locale as 'de' | 'en'];

  // Handler für Winterdienst-Anfragen
  const handleServiceRequest = () => {
    // Navigiere zur Winterdienst-Seite mit Kontaktformular-Anker
    window.location.href = `/${locale}/winterdienst#contact`;
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
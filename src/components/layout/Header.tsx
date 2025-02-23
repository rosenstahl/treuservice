"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { Globe } from "lucide-react"
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

import deNavigation from "@/i18n/de/de.json"
import enNavigation from "@/i18n/en/en.json"

const navigations = {
  de: deNavigation,
  en: enNavigation
} as const

export function Header() {
  const params = useParams()
  const pathname = usePathname()
  const locale = (params.locale as keyof typeof navigations) || "de"
  
  const nav = navigations[locale].navigation as Navigation
  const blogData = navigations[locale].blog as Blog
  
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
                  <Link 
                    href={nav.services.winterdienst.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "px-3 hover:bg-slate-100"
                    )}
                  >
                    {nav.services.winterdienst.title}
                  </Link>
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

          {/* Rechte Navigation */}
          <div className="flex items-center space-x-2">
            {/* Blog Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="px-3 hover:bg-slate-100">
                    {nav.menu.blog}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
  <div className="w-[400px] p-4 bg-white">
    <div className="flex flex-col">
      {blogData.winterdienst.categories.map((category: Category) => (
        <Link
  key={category.slug}
  href={`/${locale}/blog/winterdienst${category.slug === 'streumittel' ? '#streumittel' : '#diy'}`}
  className="block p-2 text-sm hover:bg-slate-100 rounded-md transition-colors"
>
  {category.title}
</Link>
      ))}
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
</NavigationMenuContent>                </NavigationMenuItem>
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
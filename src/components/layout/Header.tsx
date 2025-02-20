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

type ServiceItem = {
  title: string
  href: string
  description: string
  items: string[]
}

type WinterServiceItem = {
  title: string
  content: string[] | {
    diy: string[]
    pro: string[]
  }
}

type NavigationContent = {
  services: {
    reinigung: ServiceItem
    security: ServiceItem
    winterdienst: {
      title: string
      href: string
      description: string
      items: WinterServiceItem[]
    }
    entruempelung: {
      title: string
      href: string
      description: string
    }
  }
  menu: {
    about: string
    contact: string
  }
}

const navigation: Record<"de" | "en", NavigationContent> = {
  de: {
    services: {
      reinigung: {
        title: "Reinigung",
        href: "/de/reinigung",
        description: "Professionelle Reinigungsservices für Ihre Immobilie",
        items: [
          "Unterhaltsreinigung",
          "Grundreinigung",
          "Glas- und Fassadenreinigung",
          "Industriereinigung",
          "Außenanlagenpflege",
          "Sonderreinigung",
          "Verkehrsmittelreinigung",
          "Hotelreinigung",
          "Veranstaltungsreinigung",
          "Baureinigung",
          "Steinreinigung",
          "Dachreinigung",
          "Solarreinigung",
        ],
      },
      security: {
        title: "Security",
        href: "/de/security",
        description: "Umfassende Sicherheitslösungen für Ihr Eigentum",
        items: [
          "Objektschutz",
          "Werkschutz",
          "Baustellenbewachung",
          "Sicherheit für Asylunterkünfte",
          "City-Streife",
          "Revier- und Streifendienst",
          "Doorman",
          "Laden- und Kaufhausdetektiv",
          "Empfangs- und Pfortendienst",
          "Night-Audit",
          "Empfang und Sicherheit für Hotels",
          "Event- und Veranstaltungsschutz",
          "Standwache / Messeschutz",
          "Ordnerdienst",
          "Parkraummanagement",
        ],
      },
      winterdienst: {
        title: "Winterdienst",
        href: "/de/winterdienst",
        description: "Zuverlässiger Winterservice für Ihre Sicherheit",
        items: [
          {
            title: "Streugut-Vergleich",
            content: {
              diy: ["Haushaltssalz", "Split", "Sand"],
              pro: [
                "Umweltfreundliches Granulat",
                "Professionelles Streusalz",
                "Spezial-Mineralgemisch",
              ],
            },
          },
          {
            title: "DIY-Winterdienst Tipps",
            content: [
              "Richtige Streumittelauswahl",
              "Effiziente Streutechnik",
              "Umweltschonendes Vorgehen",
            ],
          },
        ],
      },
      entruempelung: {
        title: "Entrümpelung",
        href: "/de/entruempelung",
        description: "Professionelle Entrümpelung mit Herz und Verstand",
      },
    },
    menu: {
      about: "Über uns",
      contact: "Kontakt",
    },
  },
  en: {
    services: {
      reinigung: {
        title: "Cleaning",
        href: "/en/cleaning",
        description: "Professional cleaning services for your property",
        items: [
          "Maintenance Cleaning",
          "Deep Cleaning",
          "Glass & Facade Cleaning",
          "Industrial Cleaning",
          "Exterior Maintenance",
          "Special Cleaning",
          "Transport Cleaning",
          "Hotel Cleaning",
          "Event Cleaning",
          "Construction Cleaning",
          "Stone Cleaning",
          "Roof Cleaning",
          "Solar Panel Cleaning",
        ],
      },
      security: {
        title: "Security",
        href: "/en/security",
        description: "Comprehensive security solutions for your property",
        items: [
          "Property Protection",
          "Industrial Protection",
          "Construction Site Surveillance",
          "Security for Refugee Accommodations",
          "City Patrol",
          "Area Patrol",
          "Doorman",
          "Retail Detective",
          "Reception & Concierge",
          "Night Audit",
          "Hotel Security",
          "Event Security",
          "Stand Guard / Trade Fair Security",
          "Bouncer Service",
          "Parking Management",
        ],
      },
      winterdienst: {
        title: "Winter Service",
        href: "/en/winter-service",
        description: "Reliable winter service for your safety",
        items: [
          {
            title: "De-icing Comparison",
            content: {
              diy: ["Household Salt", "Grit", "Sand"],
              pro: [
                "Eco-friendly Granulate",
                "Professional De-icing Salt",
                "Special Mineral Mix",
              ],
            },
          },
          {
            title: "DIY Winter Service Tips",
            content: [
              "Proper De-icing Selection",
              "Efficient Spreading Technique",
              "Environmentally Friendly Approach",
            ],
          },
        ],
      },
      entruempelung: {
        title: "Clearance",
        href: "/en/clearance",
        description: "Professional clearance with heart and understanding",
      },
    },
    menu: {
      about: "About",
      contact: "Contact",
    },
  },
}

export function Header() {
  const params = useParams()
  const pathname = usePathname()
  const locale = (params.locale as "de" | "en") || "de"
  const nav = navigation[locale]

  const currentPath = pathname.replace(/^\/[a-z]{2}/, "")

  const isComparisonContent = (
    content: WinterServiceItem["content"]
  ): content is { diy: string[]; pro: string[] } => {
    return typeof content === "object" && "diy" in content && "pro" in content
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-1">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
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

          {/* Navigation */}
          <div className="flex-1 flex justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Reinigung */}
                <NavigationMenuItem>
                  <Link href={nav.services.reinigung.href}>
                    <NavigationMenuTrigger 
                      className="hover:bg-gray-200 data-[state=open]:bg-gray-200"
                    >
                      {nav.services.reinigung.title}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-4 bg-white">
                      <div className="grid grid-cols-2 gap-4">
                        {nav.services.reinigung.items.map((item: string, index: number) => (
                          <div 
                            key={index} 
                            className="p-3 rounded-md hover:bg-gray-200"
                          >
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Security */}
                <NavigationMenuItem>
                  <Link href={nav.services.security.href}>
                    <NavigationMenuTrigger 
                      className="hover:bg-gray-200 data-[state=open]:bg-gray-200"
                    >
                      {nav.services.security.title}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-4 bg-white">
                      <div className="grid grid-cols-2 gap-4">
                        {nav.services.security.items.map((item: string, index: number) => (
                          <div 
                            key={index} 
                            className="p-3 rounded-md hover:bg-gray-200"
                          >
                            <span className="text-sm">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Winterdienst */}
                <NavigationMenuItem>
                  <Link href={nav.services.winterdienst.href}>
                    <NavigationMenuTrigger 
                      className="hover:bg-gray-200 data-[state=open]:bg-gray-200"
                    >
                      {nav.services.winterdienst.title}
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-4 bg-white">
                      <div className="grid gap-4">
                        {nav.services.winterdienst.items.map((item, index: number) => (
                          <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-200">
                            <h3 className="font-medium mb-3">{item.title}</h3>
                            {isComparisonContent(item.content) ? (
                              <div className="grid grid-cols-2 gap-8">
                                <div>
                                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                                    DIY-Lösungen
                                  </h4>
                                  <ul className="space-y-2">
                                    {item.content.diy.map((tip: string, idx: number) => (
                                      <li key={idx} className="text-sm">{tip}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                                    Professionelle Lösungen
                                  </h4>
                                  <ul className="space-y-2">
                                    {item.content.pro.map((tip: string, idx: number) => (
                                      <li key={idx} className="text-sm">{tip}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              <ul className="space-y-2">
                                {item.content.map((tip: string, idx: number) => (
                                  <li key={idx} className="text-sm">{tip}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
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
                      "hover:bg-gray-200"
                    )}
                  >
                    {nav.services.entruempelung.title}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Rechts: Über uns, Kontakt und Sprach-Switcher */}
          <div className="flex-1 flex justify-end items-center space-x-4">
            <Link 
              href={`/${locale}/about`}
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:bg-gray-200"
              )}
            >
              {nav.menu.about}
            </Link>
            <Link 
              href={`/${locale}/contact`}
              className={cn(
                navigationMenuTriggerStyle(),
                "hover:bg-gray-200"
              )}
            >
              {nav.menu.contact}
            </Link>
            <Link
              href={locale === "de" ? `/en${currentPath}` : `/de${currentPath}`}
              className={cn(
                navigationMenuTriggerStyle(),
                "flex items-center gap-2 hover:bg-gray-200"
              )}
            >
              <Globe size={16} className="text-muted-foreground" />
              {locale === "de" ? "Deutsch" : "English"}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}
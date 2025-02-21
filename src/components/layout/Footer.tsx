"use client"

import { Container } from "./Container"
import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"
import { LinkButton } from "@/components/ui/link-button"
import { useParams } from "next/navigation"

const links = {
  de: [
    { href: '/de/contact', label: 'Kontakt' },
    { href: '/de/imprint', label: 'Impressum' },
    { href: '/de/privacy', label: 'Datenschutz' },
    { href: '/de/terms', label: 'AGB' },
    { href: '/de/about', label: 'Über uns' },
  ],
  en: [
    { href: '/en/contact', label: 'Contact' },
    { href: '/en/imprint', label: 'Imprint' },
    { href: '/en/privacy', label: 'Privacy' },
    { href: '/en/terms', label: 'Terms' },
    { href: '/en/about', label: 'About' },
  ],
}

export function Footer() {
  const params = useParams()
  const locale = (params.locale as string) || 'de'
  const currentLinks = links[locale as keyof typeof links]

  return (
    <footer className="border-t bg-white py-8">
      <Container>
        <div className="grid grid-cols-3 items-center">
          {/* Logo Block */}
          <div className="-ml-7">
            <Link href={`/${locale}`} className="relative h-6 w-20 block">
              <Image
                src="/images/treu-logo.svg"
                alt="Treu Service Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Zentrierte Navigation Links */}
          <div className="flex justify-center gap-6">
            {currentLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href}
                passHref
              >
                <LinkButton className="text-sm text-secondary-light hover:text-secondary">
                  {link.label}
                </LinkButton>
              </Link>
            ))}
          </div>

          {/* Copyright & Social Media Block */}
          <div className="flex items-center gap-2 justify-end">
            <small className="text-xs text-secondary-light">
              © {new Date().getFullYear()} TREU Service GmbH
            </small>
            <a
              href="https://instagram.com/treuservice"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-secondary-light hover:text-secondary transition-all duration-300 transform hover:scale-110 hover:rotate-6"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
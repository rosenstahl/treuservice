"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/layout/Container'
import { 
  Phone, 
  Mail, 
  Instagram, 
  Droplets,
  Snowflake,
  Shield,
  Users,
  Paintbrush,
  Trash2,
  HardHat,
  Sun,
  Calculator,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

// Footer Component
export function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Mobile toggle state für jede Sektion
  const [openSections, setOpenSections] = useState({
    services: false,
    tools: false,
    company: false,
    legal: false
  })

  // Toggle Funktion für mobile Accordion
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  
  // Dienstleistungen mit Icons (4x2 Grid Layout)
  const services = [
    { 
      icon: <Droplets className="h-4 w-4 text-accent" />, 
      name: 'Gebäudereinigung',
      href: `/reinigung` 
    },
    { 
      icon: <Shield className="h-4 w-4 text-accent" />, 
      name: 'Security',
      href: `/security` 
    },
    { 
      icon: <Snowflake className="h-4 w-4 text-accent" />, 
      name: 'Winterdienst',
      href: `/winterdienst` 
    },
    { 
      icon: <Users className="h-4 w-4 text-accent" />, 
      name: 'Leiharbeit',
      href: `/leiharbeit` 
    },
    { 
      icon: <Trash2 className="h-4 w-4 text-accent" />, 
      name: 'Entrümpelung',
      href: `/entruempelung` 
    },
    { 
      icon: <Paintbrush className="h-4 w-4 text-accent" />, 
      name: 'Schadensanierung',
      href: `/sanierung` 
    },
    { 
      icon: <HardHat className="h-4 w-4 text-accent" />, 
      name: 'Entkernung',
      href: `/entkernung` 
    },
    { 
      icon: <Sun className="h-4 w-4 text-accent" />, 
      name: 'PV-Montage',
      href: `/pv-montage` 
    }
  ]
  
  // Tools & Rechner
  const tools = [
    { 
      icon: <Calculator className="h-4 w-4 text-accent" />, 
      name: 'Winterdienst Rechner',
      href: `/blog/WinterdienstKostenrechner` 
    },
    { 
      icon: <Calculator className="h-4 w-4 text-accent" />, 
      name: 'Streumittel-Rechner',
      href: `/blog/StreumittelRechnerundVergleich` 
    },
    { 
      icon: <Shield className="h-4 w-4 text-accent" />, 
      name: '§34a Sachkundeprüfung',
      href: `/blog/Sachkunde34a` 
    },
    { 
      icon: <Droplets className="h-4 w-4 text-accent" />, 
      name: 'Fleckenentfernungs-Berater',
      href: `/blog/FleckenentfernungsBerater` 
    }
  ]

  // Company Links
  const companyLinks = [
    {
      name: 'Über uns',
      href: `/about`
    },
    {
      name: 'Kontakt',
      href: `/contact`
    },
    {
      name: 'Karriere',
      href: `/jobs`
    }
  ]

  // Legal Links
  const legalLinks = [
    {
      name: 'Impressum',
      href: `/imprint`
    },
    {
      name: 'Datenschutz',
      href: `/privacy`
    },
    {
      name: 'AGB',
      href: `/terms`
    }
  ]

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Hauptfooter mit Spalten - minimierte Höhe */}
      <div className="py-6">
        <Container>
          {/* Desktop View - ab md Breakpoint */}
          <div className="hidden md:grid md:grid-cols-12 gap-x-6 gap-y-6">
            {/* Erste Spalte - Logo und Kontaktinformationen */}
            <div className="md:col-span-3">
              <div className="space-y-3">
                {/* Logo */}
                <Link href="/">
                  <div className="relative h-7 w-24">
                    <Image
                      src="/images/treu-header.svg"
                      alt="TREU Service Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </Link>
                
                {/* Instagram */}
                <a 
                  href="https://instagram.com/treuservice" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-accent hover:opacity-80 transition-opacity"
                >
                  <Instagram className="h-4 w-4 mr-1.5" />
                  <span className="text-xs font-medium">@treuservice</span>
                </a>
                
                {/* Telefon */}
                <a href="tel:+4923115044352" className="flex items-center text-xs text-gray-600 hover:text-accent transition-colors">
                  <Phone className="h-3.5 w-3.5 text-accent mr-1.5" />
                  <span>0231 15044352</span>
                </a>
                
                {/* Email */}
                <a href="mailto:info@treuservice.com" className="flex items-center text-xs text-gray-600 hover:text-accent transition-colors">
                  <Mail className="h-3.5 w-3.5 text-accent mr-1.5" />
                  <span>info@treuservice.com</span>
                </a>
              </div>
            </div>
            
            {/* Zweite Spalte - Dienstleistungen in 2x4 Grid */}
            <div className="md:col-span-4">
              <h3 className="text-xs font-medium text-gray-900 mb-3">
                Dienstleistungen
              </h3>
              
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {services.map((service, idx) => (
                  <Link
                    key={idx}
                    href={service.href}
                    className="text-xs text-gray-600 hover:text-accent transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-accent">
                      {service.icon}
                    </span>
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Dritte Spalte - Tools & Rechner */}
            <div className="md:col-span-2">
              <h3 className="text-xs font-medium text-gray-900 mb-3">
                Tools & Rechner
              </h3>
              
              <div className="grid grid-cols-1 gap-2">
                {tools.map((tool, idx) => (
                  <Link
                    key={idx}
                    href={tool.href}
                    className="text-xs text-gray-600 hover:text-accent transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-accent">
                      {tool.icon}
                    </span>
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Vierte Spalte - Unternehmen */}
            <div className="md:col-span-1.5">
              <h3 className="text-xs font-medium text-gray-900 mb-3">
                Unternehmen
              </h3>
              
              <div className="grid grid-cols-1 gap-2">
                {companyLinks.map((link, idx) => (
                  <Link 
                    key={idx}
                    href={link.href} 
                    className="text-xs text-gray-600 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Fünfte Spalte - Rechtliches */}
            <div className="md:col-span-1.5">
              <h3 className="text-xs font-medium text-gray-900 mb-3">
                Rechtliches
              </h3>
              
              <div className="grid grid-cols-1 gap-2">
                {legalLinks.map((link, idx) => (
                  <Link 
                    key={idx}
                    href={link.href} 
                    className="text-xs text-gray-600 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile View - unter md Breakpoint */}
          <div className="md:hidden space-y-5">
            {/* Logo und Kontaktinformationen */}
            <div className="flex flex-col space-y-3">
              {/* Logo mit Social Media nebeneinander */}
              <div className="flex justify-between items-center">
                {/* Logo */}
                <Link href="/">
                  <div className="relative h-7 w-24">
                    <Image
                      src="/images/treu-header.svg"
                      alt="TREU Service Logo"
                      fill
                      className="object-contain object-left"
                    />
                  </div>
                </Link>
                
                {/* Instagram */}
                <a 
                  href="https://instagram.com/treuservice" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-accent hover:opacity-80 transition-opacity"
                >
                  <Instagram className="h-4 w-4 mr-1.5" />
                  <span className="text-xs font-medium">@treuservice</span>
                </a>
              </div>
              
              {/* Kontaktdaten nebeneinander */}
              <div className="flex justify-between">
                {/* Telefon */}
                <a href="tel:+4923115044352" className="flex items-center text-xs text-gray-600 hover:text-accent transition-colors">
                  <Phone className="h-3.5 w-3.5 text-accent mr-1.5" />
                  <span>0231 15044352</span>
                </a>
                
                {/* Email */}
                <a href="mailto:info@treuservice.com" className="flex items-center text-xs text-gray-600 hover:text-accent transition-colors">
                  <Mail className="h-3.5 w-3.5 text-accent mr-1.5" />
                  <span>info@treuservice.com</span>
                </a>
              </div>
            </div>
            
            {/* Mobile Accordion für Dienstleistungen */}
            <div className="border-t border-gray-100 pt-3">
              <button 
                onClick={() => toggleSection('services')}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-xs font-medium text-gray-900">
                  Dienstleistungen
                </h3>
                {openSections.services ? 
                  <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                }
              </button>
              
              {openSections.services && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      href={service.href}
                      className="text-xs text-gray-600 hover:text-accent transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-accent">
                        {service.icon}
                      </span>
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Accordion für Tools */}
            <div className="border-t border-gray-100 pt-3">
              <button 
                onClick={() => toggleSection('tools')}
                className="flex justify-between items-center w-full text-left"
              >
                <h3 className="text-xs font-medium text-gray-900">
                  Tools & Rechner
                </h3>
                {openSections.tools ? 
                  <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                }
              </button>
              
              {openSections.tools && (
                <div className="grid grid-cols-1 gap-y-2 mt-3">
                  {tools.map((tool, idx) => (
                    <Link
                      key={idx}
                      href={tool.href}
                      className="text-xs text-gray-600 hover:text-accent transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-accent">
                        {tool.icon}
                      </span>
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile zweireihig: Unternehmen und Rechtliches nebeneinander */}
            <div className="grid grid-cols-2 gap-x-4 border-t border-gray-100 pt-3">
              {/* Unternehmen */}
              <div>
                <button 
                  onClick={() => toggleSection('company')}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-xs font-medium text-gray-900">
                    Unternehmen
                  </h3>
                  {openSections.company ? 
                    <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  }
                </button>
                
                {openSections.company && (
                  <div className="grid grid-cols-1 gap-y-2 mt-3">
                    {companyLinks.map((link, idx) => (
                      <Link 
                        key={idx}
                        href={link.href} 
                        className="text-xs text-gray-600 hover:text-accent transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Rechtliches */}
              <div>
                <button 
                  onClick={() => toggleSection('legal')}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h3 className="text-xs font-medium text-gray-900">
                    Rechtliches
                  </h3>
                  {openSections.legal ? 
                    <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  }
                </button>
                
                {openSections.legal && (
                  <div className="grid grid-cols-1 gap-y-2 mt-3">
                    {legalLinks.map((link, idx) => (
                      <Link 
                        key={idx}
                        href={link.href} 
                        className="text-xs text-gray-600 hover:text-accent transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      {/* Unterer Footer Copyright - extrem minimiert */}
      <div className="border-t border-gray-50 py-2">
        <Container>
          <div className="text-xs text-gray-400">
            © {currentYear} TREU Service GmbH
          </div>
        </Container>
      </div>
    </footer>
  )
}

export default Footer
"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  Calculator, 
  HardHat,
  ChevronDown,
  Trash2, 
  Users, 
  Sun, 
  Paintbrush, 
  Snowflake, 
  Leaf, 
  Droplets, 
  Shovel, 
  Shield, 
  ChevronRight, 
  ArrowRight, 
  X
} from "lucide-react"
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
import BurgerMenu from "../ui/BurgerMenu"

// Type für die Navigation-Daten
type NavigationData = {
  navigation: {
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
    menu: {
      about: string
      contact: string
      blog: string
    }
  }
};

// Interface für den Service im MobileNavMenu
interface ServiceItem {
  title: string;
  href: string;
  description?: string;
}

import deNavigation from "@/i18n/de/de.json"

// Blog-Overlay-Komponente (Apple-inspiriertes Design)
const BlogOverlay = ({ isOpen, onClose }: { 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  
  // Verhindere Scrollen, wenn das Overlay geöffnet ist
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Schließen, wenn außerhalb geklickt wird
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
      isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`} style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
      <div 
        ref={overlayRef}
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden transition-all duration-500 transform ${
          isOpen ? 'scale-100' : 'scale-95'
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-xl font-medium">Blog & Knowledge Hub</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Close blog overlay"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Left Column: Security & Reinigung */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center text-accent">
                <Shield className="h-5 w-5 mr-2" />
                Sicherheitsdienstwissen
              </h3>
              <div className="space-y-1">
                <Link
                  href="/blog/SmartBuildingSicherheit"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-blue-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Shield className="h-4 w-4 text-accent" /> 
                  </div>
                  <span className="text-sm">Smart-Building Sicherheit</span>
                </Link>

                <Link
                  href="/blog/security"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-blue-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Shield className="h-4 w-4 text-accent" /> 
                  </div>
                  <span className="text-sm">Notfallplan für Unternehmen</span>
                </Link>

                <Link
                  href="/blog/Sachkunde34a"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-blue-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Shield className="h-4 w-4 text-accent" /> 
                  </div>
                  <span className="text-sm">Sachkundeprüfung Guide</span>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center text-teal-700">
                <Droplets className="h-5 w-5 mr-2" />
                Reinigungswissen
              </h3>
              <div className="space-y-1">
                <Link
                  href="/blog/NachhaltigeReinigung"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-teal-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Leaf className="h-4 w-4 text-teal-700" /> 
                  </div>
                  <span className="text-sm">Nachhaltige Reinigungsmethoden</span>
                </Link>

                <Link
                  href="/blog/FleckenentfernungsBerater"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-teal-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Droplets className="h-4 w-4 text-teal-700" /> 
                  </div>
                  <span className="text-sm">Fleckenentfernungs Berater</span>
                </Link>

                <Link
                  href="/blog/MaterialspezifischeReinigung"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-teal-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Droplets className="h-4 w-4 text-teal-700" /> 
                  </div>
                  <span className="text-sm">Materialspezifischer Reinigungsguide</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Middle Column: Winterdienst & Sanierung */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center text-blue-700">
                <Snowflake className="h-5 w-5 mr-2" />
                Winterdienstwissen
              </h3>
              <div className="space-y-1">
                <Link
                  href="/blog/WinterdienstKostenrechner"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-blue-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Snowflake className="h-4 w-4 text-blue-700" /> 
                  </div>
                  <div className="text-sm">
                    <span>Winterdienst Rechner</span>
                    <Calculator className="h-3 w-3 text-blue-700 inline ml-1" />
                  </div>
                </Link>

                <Link
                  href="/blog/StreumittelRechnerundVergleich"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-blue-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Snowflake className="h-4 w-4 text-blue-700" /> 
                  </div>
                  <div className="text-sm">
                    <span>Streumittel Vergleich</span>
                    <Calculator className="h-3 w-3 text-blue-700 inline ml-1" />
                  </div>
                </Link>

                <Link
                  href="/blog/RaeumpflichtGuide2025"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-blue-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Shovel className="h-4 w-4 text-blue-700" /> 
                  </div>
                  <span className="text-sm">Räumpflicht Guide 2025</span>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center text-purple-700">
                <Paintbrush className="h-5 w-5 mr-2" />
                Sanierung & Renovierung
              </h3>
              <div className="space-y-1">
                <Link
                  href="/blog/SanierungsGuide"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-purple-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Paintbrush className="h-4 w-4 text-purple-700" /> 
                  </div>
                  <span className="text-sm">Sanierungs Guide</span>
                </Link>
                
                <Link
                  href="/blog/SanierungPraevention"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-purple-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Paintbrush className="h-4 w-4 text-purple-700" /> 
                  </div>
                  <span className="text-sm">Sanierungs Prävention</span>
                </Link>
                
                <Link
                  href="/blog/EntkernungsGuide"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-orange-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-orange-100 p-2 rounded-full">
                    <HardHat className="h-4 w-4 text-orange-700" /> 
                  </div>
                  <span className="text-sm">Entkernungs Guide</span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Column: Entrümpelung & Weitere */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center text-red-700">
                <Trash2 className="h-5 w-5 mr-2" />
                Entrümpelung
              </h3>
              <div className="space-y-1">
                <Link
                  href="/blog/EntruempelungsGuide"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-red-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-red-100 p-2 rounded-full">
                    <Trash2 className="h-4 w-4 text-red-700" /> 
                  </div>
                  <span className="text-sm">Entrümpelung Guide</span>
                </Link>
                
                <Link
                  href="/blog/EntruemplungsKostenRechner"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-red-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-red-100 p-2 rounded-full">
                    <Trash2 className="h-4 w-4 text-red-700" /> 
                  </div>
                  <div className="text-sm">
                    <span>Entrümplungs Rechner</span>
                    <Calculator className="h-3 w-3 text-red-700 inline ml-1" />
                  </div>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center text-amber-700">
                <Sun className="h-5 w-5 mr-2" />
                Weitere Themen
              </h3>
              <div className="space-y-1">
                <Link
                  href="/blog/LeiharbeitGuide"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-pink-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-pink-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-pink-700" /> 
                  </div>
                  <span className="text-sm">Leiharbeit Guide</span>
                </Link>
                
                <Link
                  href="/blog/PVGuide"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-yellow-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Sun className="h-4 w-4 text-yellow-700" /> 
                  </div>
                  <span className="text-sm">PV-Montage Guide</span>
                </Link>
                
                <Link
                  href="/blog/PVVergleich"
                  className="flex items-center gap-2 p-3 rounded-xl hover:bg-yellow-50 transition-all"
                  onClick={onClose}
                >
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Sun className="h-4 w-4 text-yellow-700" /> 
                  </div>
                  <span className="text-sm">PV-Modul Vergleich</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-5 border-t bg-gray-50">
          <Link 
            href="/blog"
            onClick={onClose}
            className="block w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center font-medium shadow-md hover:shadow-lg transition-all"
          >
            Alle Blog-Beiträge ansehen
          </Link>
        </div>
      </div>
    </div>
  );
};

// Diesen Code in die bestehende Header.tsx-Datei einfügen und das existierende MobileMenu ersetzen

// Apple-inspiriertes Mobile-Menü-Komponente (verbesserte Version)
const MobileMenu = ({ navigation, isOpen, onClose, openBlogOverlay }: {
  navigation: {
    weitere_leistungen: ServiceItem[];
  };
  isOpen: boolean;
  onClose: () => void;
  openBlogOverlay: () => void;
}) => {
  const navData = (deNavigation as unknown as NavigationData).navigation;
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Toggle für Untermenüs
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/20 backdrop-blur-md z-50 transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={(e) => {
        // Schließe das Menü, wenn außerhalb geklickt wird
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className={`fixed right-0 top-0 h-full w-[85%] max-w-md bg-white overflow-hidden
        transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ 
          borderTopLeftRadius: '1rem',
          borderBottomLeftRadius: '1rem',
          boxShadow: '0 0 40px rgba(0,0,0,0.12)'
        }}
      >
        {/* Header mit Logo und Schließen-Button */}
        <div className="py-6 px-8 flex justify-between items-center">
          <div className="relative h-8 w-28">
            <Image
              src="/images/treu-header.svg"
              alt="TREU Service Logo"
              fill
              className="object-contain object-left"
            />
          </div>
          <BurgerMenu isOpen={true} toggleMenu={onClose} />
        </div>
        
        {/* Navigations-Container mit verbessertem Scrollverhalten */}
        <div className="overflow-y-auto h-[calc(100%-80px)] pb-32 hide-scrollbar">
          <nav className="px-8 pt-2">
            {/* Hauptnavigation */}
            <div className="space-y-2">
              {/* Reinigung */}
              <div className="mb-4">
                <button 
                  onClick={() => toggleSection('reinigung')}
                  className={`flex items-center justify-between w-full text-base font-medium py-4 px-5 rounded-2xl transition-all ${
                    expandedSection === 'reinigung' ? 'bg-teal-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${expandedSection === 'reinigung' ? 'bg-teal-100' : 'bg-gray-100'}`}>
                      <Droplets className={`h-5 w-5 ${expandedSection === 'reinigung' ? 'text-teal-600' : 'text-teal-600'}`} />
                    </div>
                    <span className={expandedSection === 'reinigung' ? 'text-teal-700' : ''}>{navData.services.reinigung.title}</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${expandedSection === 'reinigung' ? 'rotate-180 text-teal-600' : 'text-gray-400'}`} />
                </button>

                <div className={`mt-1 overflow-hidden transition-all duration-300 px-3 ${
                  expandedSection === 'reinigung' 
                    ? 'max-h-[500px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="py-2 px-4 mt-2 bg-gray-50 rounded-2xl">
                    {navData.services.reinigung.items.map((item: string, index: number) => (
                      <Link 
                        key={index}
                        href={`${navData.services.reinigung.href}?service=${item.toLowerCase().replace(/\s+/g, '-')}#services`}
                        className="flex items-center py-3 text-sm text-gray-700 hover:text-teal-600 transition-colors"
                        onClick={onClose}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-400 mr-3 opacity-70"></span>
                        {item}
                      </Link>
                    ))}
                    
                    <Link 
                      href={navData.services.reinigung.href}
                      className="flex items-center py-3 mt-1 text-sm text-teal-600 font-medium hover:translate-x-1 transition-transform"
                      onClick={onClose}
                    >
                      Alle anzeigen
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Security */}
              <div className="mb-4">
                <button 
                  onClick={() => toggleSection('security')}
                  className={`flex items-center justify-between w-full text-base font-medium py-4 px-5 rounded-2xl transition-all ${
                    expandedSection === 'security' ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${expandedSection === 'security' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Shield className={`h-5 w-5 ${expandedSection === 'security' ? 'text-accent' : 'text-accent'}`} />
                    </div>
                    <span className={expandedSection === 'security' ? 'text-accent' : ''}>{navData.services.security.title}</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${expandedSection === 'security' ? 'rotate-180 text-accent' : 'text-gray-400'}`} />
                </button>

                <div className={`mt-1 overflow-hidden transition-all duration-300 px-3 ${
                  expandedSection === 'security' 
                    ? 'max-h-[500px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="py-2 px-4 mt-2 bg-gray-50 rounded-2xl">
                    {navData.services.security.items.map((item: string, index: number) => (
                      <Link 
                        key={index}
                        href={`${navData.services.security.href}?service=${item.toLowerCase().replace(/\s+/g, '-')}#services`}
                        className="flex items-center py-3 text-sm text-gray-700 hover:text-accent transition-colors"
                        onClick={onClose}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-3 opacity-70"></span>
                        {item}
                      </Link>
                    ))}
                    
                    <Link 
                      href={navData.services.security.href}
                      className="flex items-center py-3 mt-1 text-sm text-accent font-medium hover:translate-x-1 transition-transform"
                      onClick={onClose}
                    >
                      Alle anzeigen
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Winterdienst */}
              <div className="mb-4">
                <Link 
                  href="/winterdienst"
                  className="flex items-center gap-3 text-base font-medium py-4 px-5 rounded-2xl hover:bg-blue-50 transition-all"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                    <Snowflake className="h-5 w-5 text-blue-600" />
                  </div>
                  <span>{navData.services.winterdienst.title}</span>
                </Link>
              </div>
              
              {/* Weitere Leistungen */}
              <div className="mb-4">
                <button
                  onClick={() => toggleSection('weitere')}
                  className={`flex items-center justify-between w-full text-base font-medium py-4 px-5 rounded-2xl transition-all ${
                    expandedSection === 'weitere' ? 'bg-gray-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                      <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5v14" />
                      </svg>
                    </div>
                    <span>Weitere Leistungen</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${expandedSection === 'weitere' ? 'rotate-180 text-gray-600' : 'text-gray-400'}`} />
                </button>

                <div className={`mt-1 overflow-hidden transition-all duration-300 px-3 ${
                  expandedSection === 'weitere' 
                    ? 'max-h-[500px] opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}>
                  <div className="py-2 px-4 mt-2 bg-gray-50 rounded-2xl">
                    {navigation.weitere_leistungen.map((service, index) => (
                      <Link 
                        key={index}
                        href={service.href}
                        className="flex items-center py-3 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                        onClick={onClose}
                      >
                        <div className="mr-3">
                          {getServiceIcon(service.title)}
                        </div>
                        <span>{service.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Separator Line */}
              <div className="my-6 h-px bg-gray-100 mx-auto w-5/6"></div>
              
              {/* Blog */}
              <button 
                className="w-full flex items-center gap-3 text-base font-medium py-4 px-5 rounded-2xl hover:bg-purple-50 transition-all mb-4"
                onClick={() => {
                  onClose();
                  setTimeout(openBlogOverlay, 300);
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <span>{navData.menu.blog}</span>
              </button>
              
              {/* Über uns */}
              <Link 
                href="/about"
                className="flex items-center gap-3 text-base font-medium py-4 px-5 rounded-2xl hover:bg-indigo-50 transition-all mb-4"
                onClick={onClose}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <span>{navData.menu.about}</span>
              </Link>
              
              {/* Kontakt */}
              <Link 
                href="/contact"
                className="flex items-center gap-3 text-base font-medium py-4 px-5 rounded-2xl hover:bg-teal-50 transition-all"
                onClick={onClose}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                  <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>{navData.menu.contact}</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Floating Action Button am unteren Rand */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center">
          <Link
            href="/contact"
            onClick={onClose}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white text-sm font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 hover:scale-105"
          >
            Kostenfreies Angebot anfordern
          </Link>
        </div>
      </div>

      {/* CSS für versteckte Scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
// Hook für Custom Breakpoint
// Dieser Hook prüft, ob die Bildschirmbreite zwischen 1024px und 1280px liegt
const useCustomBreakpoint = () => {
  const [isCustomBreakpoint, setIsCustomBreakpoint] = useState(false);
  
  useEffect(() => {
    // Initiale Prüfung
    const checkBreakpoint = () => {
      if (typeof window !== 'undefined') {
        setIsCustomBreakpoint(window.innerWidth >= 1080 && window.innerWidth < 1280);
      }
    };
    
    // Beim ersten Rendering prüfen
    checkBreakpoint();
    
    // Event-Listener für Größenänderungen hinzufügen
    window.addEventListener('resize', checkBreakpoint);
    
    // Aufräumen beim Unmounting
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);
  
  return isCustomBreakpoint;
};

// Header-Komponente
export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  
  const currentNavigation = navigation['de'];
  const navData = (deNavigation as unknown as NavigationData).navigation;

  // State für Menüs
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogOverlayOpen, setBlogOverlayOpen] = useState(false);
  
  // Custom Breakpoint zwischen lg und xl
  const isCustomBreakpoint = useCustomBreakpoint();
  
  // Schließen des Mobile-Menüs beim Routen-Wechsel
  useEffect(() => {
    setMobileMenuOpen(false);
    setBlogOverlayOpen(false);
  }, [pathname]);

  // Handler für Winterdienst-Anfragen
  const handleServiceRequest = () => {
    window.location.href = `/winterdienst#kontakt`;
  };

  // Doppelklick-Handler für Service-Navigation
  const handleServiceDoubleClick = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <>
      <header className="fixed top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container>
          <div className="flex h-16 items-center">
            {/* Logo */}
            <div className="mr-4 lg:mr-6 xl:mr-8">
              <Link href="/">
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

            {/* Hauptnavigation - Desktop - mit Custom Breakpoint */}
            <div className={`${isCustomBreakpoint ? 'flex' : 'hidden xl:flex'} items-center space-x-1`}>
              <NavigationMenu>
                <NavigationMenuList>
                  {/* Reinigung */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className="px-3 hover:bg-gray-50 text-sm rounded-lg transition-all"
                      onDoubleClick={() => handleServiceDoubleClick('reinigung')}
                    >
                      {navData.services.reinigung.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[550px] p-5 bg-white rounded-sm shadow-lg">
                        <div className="flex items-center gap-2 mb-3 px-2">
                          <Droplets className="h-4 w-4 text-teal-600" />
                          <h3 className="text-sm font-medium">{navData.services.reinigung.title}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {navData.services.reinigung.items.map((item: string, index: number) => (
                            <Link 
                              key={index}
                              href={`${navData.services.reinigung.href}?service=${item.toLowerCase().replace(/\s+/g, '-')}#services`}
                              className="p-2 rounded-lg hover:bg-teal-50 transition-all hover:translate-x-0.5 flex items-center text-sm"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 mr-2"></span>
                              {item}
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <Link 
                            href={navData.services.reinigung.href}
                            className="text-xs text-teal-600 font-medium flex items-center hover:underline px-2"
                          >
                            Alle Reinigungsservices ansehen 
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  {/* Security */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className="px-3 hover:bg-gray-50 text-sm rounded-lg transition-all"
                      onDoubleClick={() => handleServiceDoubleClick('security')}
                    >
                      {navData.services.security.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[550px] p-5 bg-white rounded-sm shadow-lg">
                        <div className="flex items-center gap-2 mb-3 px-2">
                          <Shield className="h-4 w-4 text-accent" />
                          <h3 className="text-sm font-medium">{navData.services.security.title}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {navData.services.security.items.map((item: string, index: number) => (
                            <Link 
                              key={index}
                              href={`${navData.services.security.href}?service=${item.toLowerCase().replace(/\s+/g, '-')}#services`}
                              className="p-2 rounded-lg hover:bg-blue-50 transition-all hover:translate-x-0.5 flex items-center text-sm"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-2"></span>
                              {item}
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <Link 
                            href={navData.services.security.href}
                            className="text-xs text-accent font-medium flex items-center hover:underline px-2"
                          >
                            Alle Sicherheitsservices ansehen 
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <Link 
                    href="/winterdienst"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "px-3 hover:bg-gray-50 text-sm rounded-lg transition-all"
                    )}
                  >
                    {navData.services.winterdienst.title}
                  </Link>

                  {/* Weitere Leistungen */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger 
                      className="px-3 hover:bg-gray-50 text-sm rounded-lg transition-all"
                    >
                      Weitere Leistungen
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] p-4 bg-white rounded-sm shadow-lg">
                        <div className="grid gap-2">
                          {currentNavigation.weitere_leistungen.map((service, index) => (
                            <Link 
                              key={index}
                              href={service.href}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200 hover:shadow-sm"
                            >
                              <div className="mt-0.5 p-1.5 bg-white rounded-full shadow-sm">
                                {getServiceIcon(service.title)}
                              </div>
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-sm font-medium hover:text-blue-600 transition-colors">{service.title}</h3>
                                  <ChevronRight className="h-3.5 w-3.5 text-gray-400 ml-1 opacity-0 group-hover:opacity-100" />
                                </div>
                                {service.description && (
                                  <p className="text-xs text-gray-500 mt-1">{service.description}</p>
                                )}
                              </div>
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

            {/* WeatherHeader-Komponente - für alle Geräte sichtbar und mittig */}
            <div className="flex-grow-0 mx-auto flex justify-center items-center mr-2">
            <WeatherHeader onRequestService={handleServiceRequest} />
            </div>

            {/* Rechte Navigation - Desktop - mit Custom Breakpoint */}
            <div className={`${isCustomBreakpoint ? 'flex' : 'hidden xl:flex'} items-center space-x-2`}>
              {/* Blog Button */}
              <button
                onClick={() => setBlogOverlayOpen(true)}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "px-3 hover:bg-gray-50 text-sm rounded-lg transition-all"
                )}
              >
                {navData.menu.blog}
              </button>
                          
              {/* Über uns */}
              <Link 
                href="/about"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "px-3 hover:bg-gray-50 text-sm rounded-lg transition-all"
                )}
              >
                {navData.menu.about}
              </Link>

              {/* Kontakt */}
              <Link 
                href="/contact"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "px-3 hover:bg-gray-50 text-sm rounded-lg transition-all"
                )}
              >
                {navData.menu.contact}
              </Link>
            </div>
            
            {/* Mobile-Menü-Toggle - mit Custom Breakpoint */}
            <div className={isCustomBreakpoint ? 'hidden' : 'block xl:hidden'}>
              <BurgerMenu isOpen={mobileMenuOpen} toggleMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />
            </div>
          </div>
        </Container>
      </header>
      
      {/* Mobile-Menü */}
      <MobileMenu 
        navigation={currentNavigation}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        openBlogOverlay={() => setBlogOverlayOpen(true)}
      />
      
      {/* Blog-Overlay (für Desktop und Mobile) */}
      <BlogOverlay 
        isOpen={blogOverlayOpen}
        onClose={() => setBlogOverlayOpen(false)}
      />
    </>
  )
}

// Hilfsfunktion, um Icons basierend auf Servicenamen zuzuweisen
function getServiceIcon(title: string) {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('entrüm') || lowerTitle.includes('entruem')) {
    return <Trash2 className="h-4 w-4 text-red-600" />;
  } else if (lowerTitle.includes('sanierung')) {
    return <Paintbrush className="h-4 w-4 text-purple-600" />;
  } else if (lowerTitle.includes('winterdienst') || lowerTitle.includes('schnee')) {
    return <Snowflake className="h-4 w-4 text-blue-600" />;
  } else if (lowerTitle.includes('leiharbeit') || lowerTitle.includes('personal')) {
    return <Users className="h-4 w-4 text-pink-600" />;
  } else if (lowerTitle.includes('pv') || lowerTitle.includes('solar') || lowerTitle.includes('photovoltaik')) {
    return <Sun className="h-4 w-4 text-yellow-600" />;
  } else if (lowerTitle.includes('reinigung')) {
    return <Droplets className="h-4 w-4 text-teal-600" />;
  } else if (lowerTitle.includes('sicherheit') || lowerTitle.includes('security')) {
    return <Shield className="h-4 w-4 text-accent>" />;
  } else {
    return <HardHat className="h-4 w-4 text-orange-600" />;
  }
}
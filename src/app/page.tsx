"use client"

import React from "react"
import { Container } from "@/components/layout/Container"
import { Section } from "@/components/layout/Section"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { Carousel, Card } from "@/components/ui/apple-cards-carousel"
import Link from "next/link"
import Image from "next/image"
import { Shield, Droplets, Snowflake, Users, Trash2, Sun, HardHat, Paintbrush, Phone } from 'lucide-react'
import deData from "@/i18n/de/de.json"

// Servicedaten-Typen
interface ServiceItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  tier: number;
  color: string;
}

// Testimonial-Typ für korrekte Typisierung
interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

// Funktion, die basierend auf dem Index das richtige Icon zurückgibt
const getServiceIcon = (index: number): React.ReactNode => {
  const icons = [
    <Shield key="shield" className="inline-block mr-1 h-3.5 w-3.5 md:h-4 md:w-4" />,
    <Droplets key="droplets" className="inline-block mr-1 h-3.5 w-3.5 md:h-4 md:w-4" />,
    <Snowflake key="snowflake" className="inline-block mr-1 h-3.5 w-3.5 md:h-4 md:w-4" />,
    <Users key="users" className="inline-block mr-1 h-3.5 w-3.5 md:h-4 md:w-4" />
  ];
  return icons[index % icons.length];
};

export default function HomePage() {
  // Testimonials
  const testimonials: Testimonial[] = [];
  const maleAuthors = [
    'Michael S.', 'Ahmed Y.', 'Stefan B.', 'Peter M.', 'Mehmet A.',
    'Markus W.', 'Johannes R.', 'Klaus H.', 'Markus H.', 'Thomas G.',
    'Farid N.'
  ];
  
  if ('testimonials' in deData && deData.testimonials && 'all' in deData.testimonials) {
    const allTestimonials = deData.testimonials.all;
    if (Array.isArray(allTestimonials)) {
      testimonials.push(...allTestimonials.map((t: Record<string, string>, index) => {
        const author = t.author || "";
        const isMale = maleAuthors.includes(author);
        const imageName = isMale ? '4.jpg' : '12.jpg';
        return {
          quote: t.quote || "",
          name: author,
          designation: t.designation || "",
          src: `/images/testimonials/${imageName}`,
          key: `${imageName}-${index}` // Kombiniert Bildnamen mit Index, um einen eindeutigen Key zu erstellen
        };
      }));
    }
  }
  
  // Main Services mit Hierarchie und Brand Colors
  const mainServices: ServiceItem[] = [
    { 
      name: "Security", 
      description: "Professioneller Sicherheitsdienst",
      icon: <Shield className="w-4 h-4 md:w-5 md:h-5" />,
      path: "/security", 
      tier: 1,
      color: "#009FD8"
    },
    { 
      name: "Gebäudereinigung", 
      description: "Gebäudereinigung auf höchstem Niveau",
      icon: <Droplets className="w-4 h-4 md:w-5 md:h-5" />,
      path: "/reinigung", 
      tier: 1,
      color: "#009FD8"
    },
    { 
      name: "Winterdienst", 
      description: "Zuverlässiger Schneeräumdienst",
      icon: <Snowflake className="w-4 h-4 md:w-5 md:h-5" />,
      path: "/winterdienst", 
      tier: 2,
      color: "#009FD8"
    },
    { 
      name: "Leiharbeit", 
      description: "Flexible Personallösungen",
      icon: <Users className="w-4 h-4 md:w-5 md:h-5" />,
      path: "/leiharbeit", 
      tier: 2,
      color: "#009FD8"
    }
  ];

  // Alle Services für das Karussell
  const services: ServiceItem[] = [
    ...mainServices,
    { 
      name: "Entrümpelung", 
      description: "Professionelle Entrümpelung und Entsorgung",
      icon: <Trash2 className="w-5 h-5 md:w-6 md:h-6" />,
      path: "/entruempelung", 
      tier: 3,
      color: "#009FD8"
    },
    { 
      name: "PV-Montage", 
      description: "Nachhaltige Energielösungen",
      icon: <Sun className="w-5 h-5 md:w-6 md:h-6" />,
      path: "/pv-montage", 
      tier: 3,
      color: "#009FD8"
    },
    { 
      name: "Entkernung", 
      description: "Fachgerechte Entkernung",
      icon: <HardHat className="w-5 h-5 md:w-6 md:h-6" />,
      path: "/entkernung", 
      tier: 3,
      color: "#009FD8"
    },
    { 
      name: "Schadensanierung", 
      description: "Professionelle Sanierungsarbeiten",
      icon: <Paintbrush className="w-5 h-5 md:w-6 md:h-6" />,
      path: "/sanierung", 
      tier: 3,
      color: "#009FD8"
    }
  ];

  // Carousel Items vorbereiten
  const carouselCards = services.map((service, index) => (
    <Card
      key={service.name}
      card={{
        category: "",
        title: service.name,
        src: `/images/${service.path.substring(1)}.jpg`,
        path: `${service.path}`, // Direkter Navigationspfad ohne Lokalisierung
        content: (
          <div className="bg-[#F5F5F7] p-4 sm:p-6 md:p-8 rounded-xl mb-3 md:mb-4">
            {/* ... Rest des Contents ... */}
          </div>
        )
      }}
      index={index}
      layout={true}
    />
  ));
  
  return (
    <>
      {/* Hauptinhalt */}
      <div>
        {/* 1. HERO SECTION - Absolute Klarheit im Steve Jobs Stil */}
        <Section 
          id="hero-section"
          className="min-h-[100svh] flex items-center justify-center relative overflow-hidden p-0"
        >
          {/* Fullscreen Hintergrundbild */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{backgroundImage: "url('/images/hero.jpg')"}} 
          />
          
          {/* Gradient-Overlay für bessere Lesbarkeit */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Perfekt ausgerichteter, minimalistischer Hero-Content */}
              <div className="text-center flex flex-col items-center justify-center min-h-[100svh] px-5 md:px-0">
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight mb-3 md:mb-4 text-white">
                  Ihr Gebäudedienstleister
                </h1>
                
                <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-light text-white/90 mb-8 md:mb-16">
                  Immer an Ihrer Seite
                </div>
                
                {/* Sneak Peek der Hauptleistungen */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-16 max-w-xs sm:max-w-md md:max-w-2xl mx-auto">
                  {["Security", "Reinigung", "Winterdienst"].map((service, index) => (
                    <div key={service} className="bg-white/10 backdrop-blur-sm px-4 py-1.5 md:px-6 md:py-2.5 rounded-full text-white text-xs md:text-sm">
                      {getServiceIcon(index)} {service}
                    </div>
                  ))}
                </div>
                
                {/* Call-to-Action Buttons - perfekt ausgerichtet */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-6 w-full max-w-xs sm:max-w-lg">
                  <Link 
                    href="/contact"
                    className="flex-1 text-center bg-[#009FD8] text-white px-5 py-2.5 md:px-8 md:py-4 rounded-full hover:bg-[#007CAB] active:bg-[#006694] transition-colors text-sm md:text-base font-medium shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
                  >
                    Kostenlose Beratung
                  </Link>
                  <Link 
                    href="#services"
                    className="flex-1 text-center bg-white/10 backdrop-blur-sm border border-white/30 text-white px-5 py-2.5 md:px-8 md:py-4 rounded-full hover:bg-white/20 active:bg-white/30 transition-colors text-sm md:text-base font-medium"
                  >
                    Dienstleistungen
                  </Link>
                </div>
              </div>
            </div>
          </Container>
          
          {/* Subtiler Scroll-Indikator im Apple-Stil */}
          <div className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/90 animate-pulse">
            <p className="text-xs mb-1.5 md:text-sm md:mb-2">Mehr entdecken</p>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="md:w-6 md:h-6">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </div>
        </Section>
        
        {/* 2. SERVICES CAROUSEL SECTION - Apple-inspiriertes Karussell */}
        <Section 
          id="services"
          className="py-14 md:py-24 bg-white"
        >
          <Container className="mb-8">
            <div className="text-center max-w-3xl mx-auto px-5 md:px-0">
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">Dienstleistungen</span>
              <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
                Perfektion ist Standard
              </h2>
              <p className="text-gray-600 text-sm md:text-lg">
                Erfahren Sie, wie wir jeden Service neu gedacht haben
              </p>
            </div>
          </Container>
          
          {/* Optimiertes Karussell mit verbesserten Touch-Bereichen */}
          <div className="px-3 md:px-0">
            <Carousel items={carouselCards} />
          </div>
        </Section>
        
        {/* 3. JOURNAL SECTION - Optimiert für mobile Geräte */}
        <Section 
          id="journal"
          className="py-14 md:py-24 bg-white"
        >
          <Container>
            {/* Header im gleichen minimalistischen Stil wie bei STIMMEN */}
            <div className="text-center max-w-3xl mx-auto mb-8 md:mb-16 px-5 md:px-0">
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">Journal</span>
              <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-2 tracking-tight">Wertvolles Wissen</h2>
              <p className="text-gray-600 text-sm md:text-lg">Ohne Umwege zum Wesentlichen</p>
            </div>
            
            {/* Hervorgehobener Artikel - responsives Design */}
            <article className="mb-10 md:mb-20 px-5 md:px-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8">
                {/* Auf Mobilgeräten steht Text unter dem Bild */}
                <div className="order-2 lg:order-1">
                  <h3 className="text-lg md:text-2xl font-semibold mb-2 md:mb-4 mt-3 lg:mt-0">Notfallplan für Unternehmen</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-6 leading-relaxed">
                    Erstellen Sie einen umfassenden Notfallplan mit unserer Schritt-für-Schritt Anleitung und Checklisten für verschiedene Szenarien.
                  </p>
                  <Link 
                    href="/blog/security"
                    className="text-[#009FD8] font-medium flex items-center text-sm group"
                  >
                    Jetzt lesen
                    <svg className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
                
                {/* Bild erscheint auf Mobilgeräten zuerst (optimal für den Lesefluss) */}
                <div className="relative rounded-lg overflow-hidden order-1 lg:order-2 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <div className="h-52 sm:h-64 md:h-auto md:aspect-[4/3]">
                    <Image 
                      src="/images/blog/home-security.jpg" 
                      alt="Notfallplan für Unternehmen" 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 1023px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            </article>
            
            {/* Die anderen drei Artikel - mit optimierter Größe für Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-5 md:px-0">
              {/* Streumittel Vergleich */}
              <article className="group">
                <div className="relative rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <div className="h-44 sm:h-auto sm:aspect-[4/3]">
                    <Image 
                      src="/images/blog/home-winter.jpg" 
                      alt="Streumittel Vergleich" 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-medium mt-2.5 mb-1.5">Streumittel Vergleich</h3>
                <Link 
                  href="/blog/StreumittelRechnerundVergleich"
                  className="text-[#009FD8] text-xs md:text-sm font-medium inline-flex items-center group"
                >
                  Weiterlesen
                  <svg className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </article>

              {/* Nachhaltige Reinigungsmethoden */}
              <article className="group">
                <div className="relative rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <div className="h-44 sm:h-auto sm:aspect-[4/3]">
                    <Image 
                      src="/images/blog/home-cleaning.jpg" 
                      alt="Nachhaltige Reinigungsmethoden" 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-medium mt-2.5 mb-1.5">Nachhaltige Reinigungsmethoden</h3>
                <Link 
                  href="/blog/NachhaltigeReinigung"
                  className="text-[#009FD8] text-xs md:text-sm font-medium inline-flex items-center group"
                >
                  Weiterlesen
                  <svg className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </article>

              {/* Entrümpelung Guide */}
              <article className="group sm:col-span-2 md:col-span-1 mt-2 sm:mt-0">
                <div className="relative rounded-lg overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                  <div className="h-44 sm:h-auto sm:aspect-[4/3]">
                    <Image 
                      src="/images/blog/home-entruempelung.jpg" 
                      alt="Entrümpelung Guide" 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    />
                  </div>
                </div>
                <h3 className="text-base md:text-lg font-medium mt-2.5 mb-1.5">Entrümpelung Guide</h3>
                <Link 
                  href="/blog/EntruempelungsGuide"
                  className="text-[#009FD8] text-xs md:text-sm font-medium inline-flex items-center group"
                >
                  Weiterlesen
                  <svg className="ml-1 w-3 h-3 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </article>
            </div>
            
            {/* "Alle Beiträge"-Button mit optimierter Position und Größe */}
            <div className="text-center mt-10 md:mt-16 px-5 md:px-0">
              <Link 
                href="/blog"
                className="inline-block bg-white text-[#009FD8] border border-[#009FD8] px-6 py-2.5 md:px-8 md:py-3 rounded-full hover:bg-[#009FD8] hover:text-white active:bg-[#007CAB] transition-colors text-sm font-medium"
              >
                Alle Beiträge
              </Link>
            </div>
          </Container>
        </Section>

        {/* 4. TESTIMONIALS SECTION - Optimiert mit Apple-typischer Klarheit */}
        <Section 
          id="testimonials"
          className="py-14 md:py-24 bg-gray-50"
        >
          <Container className="mb-8 md:mb-16">
            <div className="text-center max-w-3xl mx-auto px-5 md:px-0">
              <span className="text-[#009FD8] text-xs md:text-sm font-medium uppercase tracking-wide">Stimmen</span>
              <h2 className="text-2xl md:text-4xl font-semibold mt-2 mb-3 md:mb-6 tracking-tight">
                Erfahrungen, die begeistern
              </h2>
              <p className="text-gray-600 text-sm md:text-lg">
                &quot;Unsere Kunden erzählen die Geschichte besser als wir es könnten.&quot;
              </p>
            </div>
          </Container>
          
          {/* Wenn überarbeitete AnimatedTestimonials-Komponente verfügbar ist, hier verwenden */}
          <div className="px-0 md:px-5">
            {testimonials.length > 0 && <AnimatedTestimonials testimonials={testimonials} />}
          </div>
        </Section>
       
        {/* 5. CTA SECTION - Apple-inspirierte Klarheit mit TREU Markenfarben */}
        <Section 
          id="contact"
          className="py-14 md:py-24 bg-gradient-to-r from-[#009FD8] to-[#005D8C] text-white"
        >
          <Container>
            <div className="max-w-4xl mx-auto text-center px-5 md:px-0">
              <h2 className="text-2xl md:text-4xl font-medium mb-2 md:mb-3">Der erste Schritt</h2>
              <p className="text-base md:text-xl text-white/90 mb-8 md:mb-10 max-w-lg mx-auto">
                Lassen Sie uns gemeinsam Ihren Alltag vereinfachen
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
                <Link 
                  href="/contact"
                  className="bg-white text-[#009FD8] px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors text-sm md:text-base font-medium shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
                >
                  Jetzt anfragen
                </Link>
                
                <a 
                  href="tel:+4923115044352"
                  className="border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-white/10 active:bg-white/20 transition-colors text-sm md:text-base font-medium"
                >
                  <div className="flex items-center justify-center">
                    <Phone className="mr-2 w-3.5 h-3.5 md:w-4 md:h-4" />
                    0231 15044352
                  </div>
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </div>    
    </>
  );
}
"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { Button } from "@/components/ui/button";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Card, CardFooter, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InView } from "@/components/ui/in-view";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

// Hero Section Products - gleiche Daten wie in HeroParallax
const serviceItems = [
  {
    id: 1,
    title: "Entrümpelung",
    description: "Professionelle Entrümpelung von Wohnungen, Häusern und Gewerbeimmobilien mit fachgerechter Entsorgung.",
    link: "/entruempelung",
    thumbnail: "/images/services/entruempelung-hero.jpg",
  },
  {
    id: 2,
    title: "Reinigung",
    description: "Gründliche Reinigungsdienste für Privathaushalte und Unternehmen nach höchsten Qualitätsstandards.",
    link: "/reinigung",
    thumbnail: "/images/services/reinigung-hero.jpg",
  },
  {
    id: 3,
    title: "Security",
    description: "Zuverlässige Sicherheitsdienste für Objekte, Events und Personen durch geschultes Fachpersonal.",
    link: "/security",
    thumbnail: "/images/services/security-hero.jpg",
  },
  {
    id: 4,
    title: "Winterdienst",
    description: "Professioneller Winterdienst für Privatgrundstücke und Gewerbeobjekte - zuverlässig und termingerecht.",
    link: "/winterdienst",
    thumbnail: "/images/services/winterdienst-hero.jpg",
  },
];

// Testimonials
const testimonials = [
  {
    quote: "Treuservice hat bei der Entrümpelung unseres Elternhauses ganze Arbeit geleistet. Alles wurde sauber, schnell und diskret erledigt.",
    name: "Michael Schmidt",
    designation: "Privatkunde",
    src: "/images/testimonials/testimonial-1.jpg",
  },
  {
    quote: "Die Reinigungsleistung von Treuservice ist erstklassig. Unser Bürogebäude erstrahlt jeden Tag in neuem Glanz.",
    name: "Sabine Weber",
    designation: "Facility Manager, Schmidt & Partner",
    src: "/images/testimonials/testimonial-2.jpg",
  },
  {
    quote: "Dank des zuverlässigen Winterdienstes von Treuservice müssen wir uns keine Sorgen mehr um Schnee und Eis auf unserem Firmengelände machen.",
    name: "Thomas Krause",
    designation: "Geschäftsführer, LogiTech GmbH",
    src: "/images/testimonials/testimonial-3.jpg",
  },
];

// Prozessschritte
const processSteps = [
  {
    title: "Anfrage",
    description: "Kontaktieren Sie uns per Telefon, E-Mail oder Kontaktformular mit Ihrem Anliegen.",
    icon: "📞",
  },
  {
    title: "Beratung",
    description: "Wir beraten Sie ausführlich und erstellen ein individuelles Angebot für Ihre Bedürfnisse.",
    icon: "💬",
  },
  {
    title: "Terminvereinbarung",
    description: "Wir vereinbaren einen passenden Termin für die Durchführung der Dienstleistung.",
    icon: "📅",
  },
  {
    title: "Durchführung",
    description: "Unsere qualifizierten Mitarbeiter führen den Auftrag professionell und termingerecht durch.",
    icon: "✅",
  },
  {
    title: "Nachbesprechung",
    description: "Nach Abschluss der Arbeiten besprechen wir das Ergebnis und nehmen Ihr Feedback entgegen.",
    icon: "🤝",
  },
];

// Typewriter Words
const words = [
  {
    text: "Entrümpelung",
  },
  {
    text: "Reinigung",
  },
  {
    text: "Security",
  },
  {
    text: "Winterdienst",
  },
];

// Animierte Zahlen
const animatedNumbers = [
  {
    value: 5000,
    title: "Zufriedene Kunden",
    duration: 2000,
  },
  {
    value: 12,
    title: "Jahre Erfahrung",
    duration: 1500,
  },
  {
    value: 98,
    title: "Zufriedenheitsrate %",
    duration: 2500,
  },
  {
    value: 24,
    title: "Stunden Service",
    duration: 1800,
  },
];

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [transformedCards, setTransformedCards] = useState(false);
  const heroRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      if (heroRef.current && cardsRef.current) {
        const heroHeight = heroRef.current.offsetHeight;
        if (window.scrollY > heroHeight * 0.5) {
          setTransformedCards(true);
        } else {
          setTransformedCards(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section mit Parallax */}
      <div ref={heroRef} className="relative h-screen">
        <HeroParallax products={serviceItems} />
        <div className="absolute z-10 inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 drop-shadow-md">
            Ihr zuverlässiger Partner für Gebäudedienstleistungen
          </h1>
          <div className="h-16 mb-10">
            <TypewriterEffect words={words} className="text-2xl md:text-4xl font-medium" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button size="lg" className="bg-accent hover:bg-accent-hover text-white px-8 py-6 rounded-lg text-lg shadow-xl transition-all hover:shadow-2xl transform hover:-translate-y-1">
              Kostenlose Beratung
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white px-8 py-6 rounded-lg text-lg hover:bg-white/20 transition-all">
              Dienstleistungen entdecken
            </Button>
          </div>
        </div>
      </div>

      {/* Apple Cards Transition */}
      <div 
        ref={cardsRef} 
        className="py-16 bg-white"
        style={{
          opacity: transformedCards ? 1 : 0,
          transform: `translateY(${transformedCards ? '0' : '50px'})`,
          transition: 'all 0.8s ease-in-out'
        }}
      >
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceItems.map((service, index) => (
              <div 
                key={service.id} 
                style={{
                  opacity: transformedCards ? 1 : 0,
                  transform: `translateY(${transformedCards ? '0' : '30px'})`,
                  transition: `all 0.8s ease-in-out ${index * 0.1}s`
                }}
              >
                <Link href={service.link}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full">
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={service.thumbnail}
                        alt={service.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700">{service.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Mehr erfahren</Button>
                    </CardFooter>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Über uns / Vorteile */}
      <Section className="py-24 bg-secondary text-white">
        <Container>
          <Grid className="items-center">
            <div className="col-span-12 lg:col-span-5">
              <InView>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">
                  Warum Treuservice?
                </h2>
                <p className="text-lg mb-8 text-gray-300">
                  Seit über einem Jahrzehnt stehen wir für höchste Qualität und Zuverlässigkeit. Unsere erfahrenen Mitarbeiter sorgen dafür, dass jeder Auftrag zu Ihrer vollsten Zufriedenheit ausgeführt wird.
                </p>
                <ul className="space-y-4">
                  {["Qualifizierte Fachkräfte", "Flexible Terminplanung", "Transparente Preisgestaltung", "Umweltbewusste Ausführung", "Persönliche Betreuung"].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-3 text-accent text-xl">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg">
                    Mehr über uns
                  </Button>
                </div>
              </InView>
            </div>
            <div className="col-span-12 lg:col-span-7 mt-10 lg:mt-0">
              <InView>
                <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/images/about-us.jpg"
                    alt="Unser Team"
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-10000 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                    <p className="text-2xl font-medium mb-2">Unser Team</p>
                    <p className="text-gray-300">Professionell, freundlich und immer für Sie da</p>
                  </div>
                </div>
              </InView>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Animierte Statistiken */}
      <Section className="py-16 bg-primary">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {animatedNumbers.map((item, index) => (
              <InView key={index}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-2">
                    {item.value}+
                  </div>
                  <div className="text-lg text-gray-700">{item.title}</div>
                </div>
              </InView>
            ))}
          </div>
        </Container>
      </Section>

      {/* Prozess mit Tracing Beam */}
      <Section className="py-24 bg-white">
        <Container>
          <div className="text-center mb-16">
            <InView>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">
                Unser Arbeitsprozess
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                So arbeiten wir mit Ihnen zusammen, um die bestmöglichen Ergebnisse zu erzielen.
              </p>
            </InView>
          </div>

          <TracingBeam className="px-6">
            <div className="max-w-4xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={index} className="mb-12">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white text-xl mr-4">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="ml-16 text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </TracingBeam>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section className="py-24 bg-primary-light">
        <Container>
          <div className="text-center mb-16">
            <InView>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">
                Was unsere Kunden sagen
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Erfahren Sie, was unsere Kunden über unsere Dienstleistungen denken.
              </p>
            </InView>
          </div>

          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </Container>
      </Section>

      {/* Kontakt */}
      <Section className="py-24 bg-gradient-to-b from-white to-primary-light">
        <Container>
          <Grid className="items-center">
            <div className="col-span-12 lg:col-span-6">
              <InView>
                <h2 className="text-4xl font-bold mb-6 tracking-tight">
                  Kontaktieren Sie uns
                </h2>
                <p className="text-lg mb-8 text-gray-600">
                  Haben Sie Fragen oder benötigen Sie ein individuelles Angebot? Unser Team steht Ihnen gerne zur Verfügung.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="bg-accent/10 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Telefon</h3>
                      <p className="text-gray-600">+49 (0) 123 456789</p>
                      <p className="text-sm text-gray-500 mt-1">Mo-Fr: 8:00 - 18:00 Uhr</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-accent/10 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">E-Mail</h3>
                      <p className="text-gray-600">info@treuservice.de</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-accent/10 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">Adresse</h3>
                      <p className="text-gray-600">Musterstraße 123<br />12345 Musterstadt</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  {["facebook", "twitter", "linkedin", "instagram"].map((social) => (
                    <a
                      key={social}
                      href={`#${social}`}
                      className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-white transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  ))}
                </div>
              </InView>
            </div>

            <div className="col-span-12 lg:col-span-6 mt-12 lg:mt-0">
              <InView>
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle>Kontaktformular</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" placeholder="Ihr Name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-Mail</Label>
                          <Input id="email" type="email" placeholder="ihre-email@beispiel.de" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input id="phone" placeholder="Ihre Telefonnummer" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">Dienstleistung</Label>
                        <select
                          id="service"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                        >
                          <option value="">Bitte wählen Sie</option>
                          <option value="entrümpelung">Entrümpelung</option>
                          <option value="reinigung">Reinigung</option>
                          <option value="security">Security</option>
                          <option value="winterdienst">Winterdienst</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Nachricht</Label>
                        <Textarea id="message" placeholder="Wie können wir Ihnen helfen?" rows={4} />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="privacy"
                          className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                        />
                        <label htmlFor="privacy" className="ml-2 block text-sm text-gray-600">
                          Ich stimme der <Link href="/privacy" className="text-accent hover:underline">Datenschutzerklärung</Link> zu
                        </label>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-accent hover:bg-accent-hover">Anfrage senden</Button>
                  </CardFooter>
                </Card>
              </InView>
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Scroll-to-Top Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:bg-accent-hover transition-colors"
          aria-label="Nach oben scrollen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </>
  );
}
"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Trash2, 
  HardHat, 
  Snowflake, 
  Shield, 
  Droplets, 
  Palette, 
  SunMedium,
  ChevronRight,
  Briefcase,
  ChevronUp,
  MessageSquare,
  Clock,
  Check,
  Instagram
} from 'lucide-react';
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/button";
import { H1, H2, Paragraph } from "@/components/ui/typography";
import ContactForm from '@/components/contact/unified/ContactForm';

// Servicetypen
type ServiceType = 'entruempelung' | 'entkernung' | 'reinigung' | 'security' | 'winter' | 'sanierung' | 'pv' | 'leiharbeit';

// Alle verfügbaren Dienstleistungen mit verbesserten Beschreibungen
const services = [
  {
    id: 'entruempelung' as ServiceType,
    icon: <Trash2 className="h-5 w-5" />,
    title: 'Entrümpelung',
    description: 'Professionelle Entrümpelung von Wohnungen, Häusern und Gewerbeobjekten mit umweltgerechter Entsorgung.'
  },
  {
    id: 'entkernung' as ServiceType,
    icon: <HardHat className="h-5 w-5" />,
    title: 'Entkernung',
    description: 'Fachmännische Entkernung und Rückbau mit Schadstoffbeseitigung nach aktuellen Umweltstandards.'
  },
  {
    id: 'reinigung' as ServiceType,
    icon: <Droplets className="h-5 w-5" />,
    title: 'Reinigung',
    description: 'Gründliche und nachhaltige Reinigungsservices für private und gewerbliche Räume.'
  },
  {
    id: 'security' as ServiceType,
    icon: <Shield className="h-5 w-5" />,
    title: 'Security',
    description: 'Zuverlässige Sicherheitsdienste für Objekte und Veranstaltungen mit geschultem Personal.'
  },
  {
    id: 'winter' as ServiceType,
    icon: <Snowflake className="h-5 w-5" />,
    title: 'Winterdienst',
    description: 'Professioneller Winterdienst für Privatpersonen und Unternehmen mit umweltschonenden Methoden.'
  },
  {
    id: 'sanierung' as ServiceType,
    icon: <Palette className="h-5 w-5" />,
    title: 'Sanierung',
    description: 'Umfassende Sanierungsarbeiten für Wohn- und Geschäftsgebäude mit modernen Techniken.'
  },
  {
    id: 'pv' as ServiceType,
    icon: <SunMedium className="h-5 w-5" />,
    title: 'PV-Montage',
    description: 'Fachgerechte Installation von Photovoltaik-Anlagen für eine nachhaltige Energiezukunft.'
  },
  {
    id: 'leiharbeit' as ServiceType,
    icon: <Briefcase className="h-5 w-5" />,
    title: 'Leiharbeit',
    description: 'Flexible, qualifizierte Arbeitskräfte für Ihren kurzfristigen oder langfristigen Bedarf.'
  }
];

// Liste der FAQ für den erweiterten FAQ-Bereich
const faqItems = [
  {
    question: 'Wie schnell können Sie einen Termin anbieten?',
    answer: 'In der Regel können wir innerhalb von 2-3 Werktagen einen ersten Termin anbieten. Bei Notfällen bemühen wir uns um eine schnellstmögliche Reaktion, oft noch am selben Tag.'
  },
  {
    question: 'Bieten Sie kostenlose Besichtigungstermine an?',
    answer: 'Ja, für größere Projekte wie Entrümpelung, Entkernung oder umfangreiche Reinigungsarbeiten bieten wir kostenlose Vor-Ort-Besichtigungen an, um ein genaues Angebot erstellen zu können.'
  },
  {
    question: 'Wie werden die Preise berechnet?',
    answer: 'Unsere Preise basieren auf dem Umfang der Arbeit, der benötigten Zeit und dem Material. Bei größeren Projekten erstellen wir ein detailliertes Angebot nach einer Besichtigung. Für Standarddienstleistungen haben wir festgelegte Preislisten.'
  },
  {
    question: 'Sind Ihre Mitarbeiter versichert?',
    answer: 'Selbstverständlich. Alle unsere Mitarbeiter sind umfassend versichert, und wir verfügen über eine Betriebshaftpflichtversicherung für alle ausgeführten Arbeiten.'
  },
  {
    question: 'Arbeiten Sie auch am Wochenende?',
    answer: 'Ja, für bestimmte Dienstleistungen bieten wir auch Termine am Wochenende an. Für den Winterdienst und Security-Dienste sind wir sogar rund um die Uhr verfügbar.'
  }
];

const ContactPage: React.FC = () => {
  // Status für verschiedene Komponenten
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll-to-Top Funktion
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Toggle FAQ Antworten
  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Für die perfekte Apple-Ästhetik
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] } // Apple's cubic-bezier easing
    }
  };

  return (
    <div className="relative">
      {/* Hero-Bereich im Apple-Stil mit accent Farbe */}
      <Section className="pt-20 pb-24 md:pt-24 md:pb-32 bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent)] to-[var(--color-accent-dark)] text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="space-y-6"
            >
              <H1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-white">
                Kontaktieren Sie uns
              </H1>
              <Paragraph className="text-xl md:text-2xl font-light mb-10 text-white/95">
                Wir sind für Sie da und helfen Ihnen gerne bei allen Anliegen.
              </Paragraph>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center mt-8">
                <Button 
                  className="bg-white text-[var(--color-accent)] hover:bg-white/90 border-2 border-transparent shadow-lg px-8"
                  size="lg"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  <span>0231 15044352</span>
                </Button>
                <Button 
                  className="bg-transparent text-white hover:bg-white/10 border-2 border-white px-8"
                  size="lg"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  <span>info@treuservice.com</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Kontaktinformationen und Formular */}
      <Section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Linke Spalte - Kontaktinfos */}
            <div className="lg:col-span-4 space-y-8">
              {/* Kontaktdetails */}
              <motion.div 
                className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
              >
                <div className="p-8">
                  <h2 className="text-2xl font-medium mb-8 text-gray-800">Kontaktdetails</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start gap-5">
                      <div className="bg-[var(--color-accent)]/10 rounded-full p-3 flex-shrink-0">
                        <Phone className="h-5 w-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">Telefon</p>
                        <a href="tel:023115044352" className="text-[var(--color-accent)] hover:underline text-lg">0231 15044352</a>
                        <p className="text-gray-500 text-sm mt-1">Mo-Fr, 8:00-18:00 Uhr</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-5">
                      <div className="bg-[var(--color-accent)]/10 rounded-full p-3 flex-shrink-0">
                        <Mail className="h-5 w-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">E-Mail</p>
                        <a href="mailto:info@treuservice.com" className="text-[var(--color-accent)] hover:underline text-lg">info@treuservice.com</a>
                        <p className="text-gray-500 text-sm mt-1">24/7 für Ihre Anfragen</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-5">
                      <div className="bg-[var(--color-accent)]/10 rounded-full p-3 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 mb-1">Adresse</p>
                        <p className="text-gray-700 text-lg">Rheinische Straße 220</p>
                        <p className="text-gray-700">44147 Dortmund</p>
                        <a 
                          href="https://maps.google.com/?q=Rheinische+Straße+220,44147+Dortmund" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[var(--color-accent)] hover:underline text-sm inline-block mt-2"
                        >
                          <span className="flex items-center gap-1">
                            <span>In Google Maps öffnen</span>
                            <ChevronRight className="h-3 w-3" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-100 p-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-[var(--color-accent)]" />
                    <h3 className="font-medium text-gray-900">Geschäftszeiten</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Montag – Freitag</span>
                      <span className="font-medium">8:00 – 18:00 Uhr</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Samstag</span>
                      <span className="font-medium">9:00 – 14:00 Uhr</span>
                    </div>
                    <div className="flex justify-between text-gray-600 text-sm">
                      <span>Sonntag</span>
                      <span className="font-medium">Geschlossen</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Notdienst-Informationen */}
              <motion.div 
                className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-dark)] text-white rounded-2xl shadow-sm p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 rounded-full p-3">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-xl mb-3">Notdienst 24/7</h3>
                    <p className="text-white/90 mb-5">
                      Für dringende Fälle erreichen Sie unseren Notdienst rund um die Uhr unter der gleichen Nummer.
                    </p>
                    <a 
                      href="tel:023115044352" 
                      className="inline-flex items-center rounded-xl bg-white px-5 py-2.5 text-[var(--color-accent)] font-medium hover:bg-white/90 transition-colors"
                    >
                      <span>Notdienst anrufen</span>
                    </a>
                  </div>
                </div>
              </motion.div>
              
              {/* Instagram Link (Apple-Stil) */}
              <motion.div 
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-medium mb-2 text-gray-800">Folgen Sie uns</h3>
                    <p className="text-gray-600 text-sm">Bleiben Sie auf dem Laufenden</p>
                  </div>
                  <a 
                    href="https://instagram.com/treuservice" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#E1306C] hover:bg-[#C13584] text-white transition-all p-3 rounded-full shadow-sm hover:shadow-md flex items-center justify-center"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            </div>
            
            {/* Rechte Spalte - Formular */}
            <div className="lg:col-span-8">
              <motion.div 
                className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
              >
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-medium mb-2 text-gray-800">Kontaktformular</h2>
                  <p className="text-gray-600 mb-8">
                    Wählen Sie einen Service aus und hinterlassen Sie Ihre Anfrage. Wir melden uns schnellstmöglich bei Ihnen.
                  </p>
                  
                  {/* Service-Auswahl im Apple-Stil */}
                  <div className="mb-10">
                    <h3 className="text-md font-medium text-gray-700 mb-4">Welcher Service interessiert Sie?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {services.map((service) => (
                        <motion.div
                          key={service.id}
                          className={`group p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                            selectedService === service.id 
                              ? 'bg-[var(--color-accent)] text-white shadow-md' 
                              : 'border border-gray-200 hover:border-[var(--color-accent)] bg-white hover:shadow-sm'
                          }`}
                          onClick={() => setSelectedService(service.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex flex-col items-center text-center gap-3">
                            <div className={`rounded-full p-3 ${
                              selectedService === service.id 
                                ? 'bg-white/20 text-white' 
                                : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                            }`}>
                              {service.icon}
                            </div>
                            <div>
                              <p className={`font-medium ${
                                selectedService === service.id 
                                  ? 'text-white' 
                                  : 'text-gray-800 group-hover:text-gray-900'
                              }`}>
                                {service.title}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Formular */}
                  {selectedService ? (
                    <ContactForm serviceType={selectedService} />
                  ) : (
                    <motion.div 
                      className="text-center py-20 px-6 border border-gray-100 rounded-xl bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="bg-[var(--color-accent)]/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-5">
                        <MessageSquare className="h-8 w-8 text-[var(--color-accent)]" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-700 mb-3">Service auswählen</h3>
                      <p className="text-gray-500 mb-5 max-w-md mx-auto">
                        Bitte wählen Sie oben einen Service aus, um mit dem Formular fortzufahren.
                      </p>
                      <div className="animate-bounce flex justify-center mt-5">
                        <ChevronUp className="h-5 w-5 text-[var(--color-accent)]" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Standort mit Map im Apple-Karten Stil */}
      <Section className="py-16 md:py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <H2 className="text-3xl font-medium mb-4">Unser Standort</H2>
              <Paragraph className="text-gray-600 max-w-xl mx-auto">
                Unser zentraler Standort in Dortmund ermöglicht es uns, schnell auf Ihre Bedürfnisse zu reagieren.
              </Paragraph>
            </motion.div>
          </div>
          
          <motion.div
            className="rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <div className="h-[400px] bg-gray-100 relative">
            <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.2341956501433!2d7.4496232770556025!3d51.51372660954271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b91a3a9d5e27c7%3A0x46932346c716ce6a!2sRheinische%20Str.%20220%2C%2044147%20Dortmund%2C%20Germany!5e0!3m2!1sen!2sus!4v1711311626548!5m2!1sen!2sus" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-r-none md:rounded-r-2xl"
                      title="TREU Service Standort"
                      aria-label="Standort von TREU Service in Dortmund"
                    ></iframe>
              <div className="absolute top-6 right-6 bg-[var(--color-accent)] text-white text-sm px-3 py-1.5 rounded-full font-medium">
                Hauptsitz
              </div>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap md:flex-nowrap gap-8 items-start">
                <div className="w-full md:w-1/2">
                  <h3 className="font-medium text-2xl mb-3">TREU Service Hauptsitz</h3>
                  <p className="text-gray-600 mb-5">Unser Hauptsitz ist zentral in Dortmund gelegen und bietet Ihnen alle Dienstleistungen aus einer Hand.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-[var(--color-accent)]/10 p-2 rounded-full">
                        <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                      </div>
                      <span className="text-gray-700">Rheinische Straße 220, 44147 Dortmund</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-[var(--color-accent)]/10 p-2 rounded-full">
                        <Phone className="h-4 w-4 text-[var(--color-accent)]" />
                      </div>
                      <a href="tel:023115044352" className="text-[var(--color-accent)] hover:underline">0231 15044352</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-[var(--color-accent)]/10 p-2 rounded-full">
                        <Mail className="h-4 w-4 text-[var(--color-accent)]" />
                      </div>
                      <a href="mailto:info@treuservice.com" className="text-[var(--color-accent)] hover:underline">info@treuservice.com</a>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* FAQ-Sektion - Apple-Stil */}
      <Section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
              >
                <H2 className="text-3xl font-medium mb-4">Häufig gestellte Fragen</H2>
                <Paragraph className="text-gray-600 max-w-xl mx-auto">
                  Hier finden Sie Antworten auf die am häufigsten gestellten Fragen. Falls Ihre Frage nicht dabei ist, kontaktieren Sie uns gerne direkt.
                </Paragraph>
              </motion.div>
            </div>
            
            <div className="space-y-5">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  className={`border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 ${
                    expandedFaq === index ? 'shadow-md' : 'shadow-sm'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                  <button
                    className="flex justify-between items-center w-full p-5 text-left bg-white"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className={`font-medium text-md ${expandedFaq === index ? 'text-[var(--color-accent)]' : 'text-gray-800'}`}>
                      {item.question}
                    </h3>
                    <div className={`rounded-full p-2 transition-colors ${
                      expandedFaq === index ? 'bg-[var(--color-accent)]/10' : 'bg-gray-100'
                    }`}>
                      {expandedFaq === index ? (
                        <ChevronUp className={`h-4 w-4 ${expandedFaq === index ? 'text-[var(--color-accent)]' : 'text-gray-500'}`} />
                      ) : (
                        <ChevronRight className={`h-4 w-4 ${expandedFaq === index ? 'text-[var(--color-accent)]' : 'text-gray-500'}`} />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-2 text-gray-600 bg-gray-50 border-t border-gray-100">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Call-to-Action - Apple-Stil */}
      <Section className="py-20 md:py-28 bg-gradient-to-br from-[var(--color-accent)] via-[var(--color-accent)] to-[var(--color-accent-dark)] text-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
            >
              <H2 className="text-3xl md:text-4xl font-medium mb-5 text-white">
                Bereit für professionelle Unterstützung?
              </H2>
              <Paragraph className="text-xl font-light text-white/90 mb-10 max-w-2xl mx-auto">
                Unser Team steht Ihnen für jede Anfrage zur Verfügung. Wir freuen uns darauf, Ihnen zu helfen.
              </Paragraph>
              
              <div className="flex flex-col md:flex-row justify-center gap-8 mb-12">
                <div className="flex items-center gap-4 justify-center">
                  <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-left text-lg">Hochqualifiziertes Team</p>
                </div>
                
                <div className="flex items-center gap-4 justify-center">
                  <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-left text-lg">Schnelle Reaktionszeiten</p>
                </div>
                
                <div className="flex items-center gap-4 justify-center">
                  <div className="bg-white/20 rounded-full p-3 flex-shrink-0">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-left text-lg">Höchste Qualitätsstandards</p>
                </div>
              </div>
              
              <div>
                <Button 
                  className="bg-white text-[var(--color-accent)] hover:bg-white/95 shadow-lg px-8 py-6 rounded-xl text-lg"
                >
                  <span>Jetzt unverbindlich anfragen</span>
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Scroll-to-top Button im Apple Stil */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-white shadow-xl rounded-full p-4 z-50 transition-all duration-300 transform ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        aria-label="Nach oben scrollen"
      >
        <ChevronUp className="h-5 w-5 text-[var(--color-accent)]" />
      </button>
    </div>
  );
};

export default ContactPage;
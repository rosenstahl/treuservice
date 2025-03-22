"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Building, 
  Globe, 
  Trash2, 
  HardHat, 
  Snowflake, 
  Shield, 
  Sparkles, 
  Palette, 
  SunMedium,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import ContactForm from '@/components/contact/unified/ContactForm';

// Servicetypen
type ServiceType = 'entruempelung' | 'entkernung' | 'reinigung' | 'security' | 'winter' | 'sanierung' | 'pv' | 'leiharbeit';

// Alle verfügbaren Dienstleistungen
const services = [
  {
    id: 'entruempelung' as ServiceType,
    icon: <Trash2 className="h-5 w-5" />,
    title: 'Entrümpelung',
    description: 'Professionelle Entrümpelung von Wohnungen, Häusern und Gewerbeobjekten.'
  },
  {
    id: 'entkernung' as ServiceType,
    icon: <HardHat className="h-5 w-5" />,
    title: 'Entkernung',
    description: 'Fachmännische Entkernung und Rückbau mit Schadstoffbeseitigung.'
  },
  {
    id: 'reinigung' as ServiceType,
    icon: <Sparkles className="h-5 w-5" />,
    title: 'Reinigung',
    description: 'Gründliche Reinigungsservices für private und gewerbliche Räume.'
  },
  {
    id: 'security' as ServiceType,
    icon: <Shield className="h-5 w-5" />,
    title: 'Security',
    description: 'Zuverlässige Sicherheitsdienste für Objekte und Veranstaltungen.'
  },
  {
    id: 'winter' as ServiceType,
    icon: <Snowflake className="h-5 w-5" />,
    title: 'Winterdienst',
    description: 'Professioneller Winterdienst für Privatpersonen und Unternehmen.'
  },
  {
    id: 'sanierung' as ServiceType,
    icon: <Palette className="h-5 w-5" />,
    title: 'Sanierung',
    description: 'Umfassende Sanierungsarbeiten für Wohn- und Geschäftsgebäude.'
  },
  {
    id: 'pv' as ServiceType,
    icon: <SunMedium className="h-5 w-5" />,
    title: 'PV-Montage',
    description: 'Fachgerechte Installation von Photovoltaik-Anlagen.'
  },
  {
    id: 'leiharbeit' as ServiceType,
    icon: <Briefcase className="h-5 w-5" />,
    title: 'Leiharbeit',
    description: 'Flexible Arbeitskräfte für Ihren kurzfristigen oder langfristigen Bedarf.'
  }
];

const ContactPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Hero-Bereich im Apple-Stil */}
      <motion.section 
        className="bg-[#f5f5f7] text-black py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-medium mb-4 text-black"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Kontaktieren Sie uns
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Wir sind für Sie da und helfen Ihnen gerne bei allen Anliegen rund um unsere Dienstleistungen.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a 
                href="tel:+4923115044352" 
                className="bg-[#007AFF] hover:bg-[#0071e3] text-white py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                <span>0231 15044352</span>
              </a>
              <a 
                href="mailto:info@treuservice.com" 
                className="bg-white hover:bg-gray-50 text-[#007AFF] border border-[#007AFF] py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
                <span>info@treuservice.com</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Hauptinhalt */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Kontaktinfos */}
              <div className="lg:col-span-1 space-y-6">
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-gray-800">Kontaktdetails</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#007AFF]/10 rounded-full p-2 mt-1">
                        <Phone className="h-5 w-5 text-[#007AFF]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Telefon</p>
                        <p className="text-gray-600">0231 15044352</p>
                        <p className="text-gray-500 text-sm">Mo-Fr, 8:00-18:00 Uhr</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-[#007AFF]/10 rounded-full p-2 mt-1">
                        <Mail className="h-5 w-5 text-[#007AFF]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">E-Mail</p>
                        <a href="mailto:info@treuservice.com" className="text-[#007AFF] hover:underline">info@treuservice.com</a>
                        <p className="text-gray-500 text-sm">24/7 für Ihre Anfragen</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-[#007AFF]/10 rounded-full p-2 mt-1">
                        <MapPin className="h-5 w-5 text-[#007AFF]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Adresse</p>
                        <p className="text-gray-600">Rheinische Straße 220</p>
                        <p className="text-gray-600">44147 Dortmund</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-[#007AFF]/10 rounded-full p-2 mt-1">
                        <Building className="h-5 w-5 text-[#007AFF]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Unternehmen</p>
                        <p className="text-gray-600">TREU Service GmbH</p>
                        <p className="text-gray-500 text-sm">USt-ID: DE362838091</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="bg-[#007AFF]/10 rounded-full p-2 mt-1">
                        <Globe className="h-5 w-5 text-[#007AFF]" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Online</p>
                        <a href="https://www.treuservice.de" target="_blank" className="text-[#007AFF] hover:underline">www.treuservice.de</a>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h2 className="text-xl font-medium mb-4 text-gray-800">Geschäftszeiten</h2>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-700">
                      <span>Montag - Freitag</span>
                      <span className="font-medium">8:00 - 18:00 Uhr</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Samstag</span>
                      <span className="font-medium">9:00 - 14:00 Uhr</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Sonntag</span>
                      <span className="font-medium">Geschlossen</span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-[#007AFF] font-medium">Notfallservice 24/7</p>
                      <p className="text-gray-600 text-sm">Für dringende Fälle erreichen Sie unseren Notdienst rund um die Uhr.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Kontaktformular */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div 
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-medium mb-2 text-gray-800">Kontaktformular</h2>
                  <p className="text-gray-600 mb-6">
                    Wählen Sie einen Service aus und hinterlassen Sie Ihre Anfrage. Wir melden uns schnellstmöglich bei Ihnen.
                  </p>
                  
                  {/* Service-Auswahl im Apple-Stil */}
                  <div className="mb-8">
                    <h3 className="text-md font-medium text-gray-700 mb-3">Welcher Service interessiert Sie?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className={`group p-3 rounded-xl cursor-pointer transition-all ${
                            selectedService === service.id 
                              ? 'bg-[#007AFF] text-white shadow-md' 
                              : 'border border-gray-200 hover:border-[#007AFF] bg-white hover:shadow-sm'
                          }`}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`${
                              selectedService === service.id 
                                ? 'text-white' 
                                : 'text-[#007AFF]'
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
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Formular */}
                  {selectedService ? (
                    <ContactForm serviceType={selectedService} />
                  ) : (
                    <div className="text-center py-10 px-6 border border-gray-200 rounded-xl bg-gray-50">
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Service auswählen</h3>
                      <p className="text-gray-500 mb-4">
                        Bitte wählen Sie oben einen Service aus, um mit dem Formular fortzufahren.
                      </p>
                      <div className="animate-pulse flex justify-center">
                        <ChevronRight className="h-5 w-5 text-[#007AFF] transform rotate-270" />
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
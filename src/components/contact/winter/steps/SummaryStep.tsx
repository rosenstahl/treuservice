"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../WinterdienstWizard';

type SummaryStepProps = {
  formData: FormData;
  goToPreviousStep: () => void;
  isLastStep?: boolean;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({ 
  formData,
  goToPreviousStep
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Pakettyp-Namen formatieren
  const getPackageTypeName = () => {
    switch (formData.package.type) {
      case 'all-in-one':
        return 'ALL-IN-ONE';
      case 'flex':
        return 'FLEX';
      case 'on-demand':
        return 'ON DEMAND';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Hier würde normalerweise die Datenübermittlung erfolgen
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <motion.h2 
          className="text-2xl font-medium text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          Zusammenfassung
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Überprüfen Sie Ihre Auswahl und vervollständigen Sie Ihre Anfrage.
        </motion.p>
      </div>
      
      {!isSubmitted ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Ihre Angaben</h3>
              
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-500">Adresse:</p>
                  <p className="text-sm font-medium">{formData.address}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Zu räumende Fläche:</p>
                  <p className="text-sm font-medium">
                    {formData.area.value} m²
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Gewähltes Paket:</p>
                  <p className="text-sm font-medium">{getPackageTypeName()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Gewählte Optionen:</p>
                  <ul className="text-sm">
                    {formData.options.environmentPackage && (
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Umweltfreundliches Streumittel</span>
                      </li>
                    )}
                    
                    {formData.options.finalCleaning && (
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Endreinigung im Frühjahr</span>
                      </li>
                    )}
                    
                    {formData.options.offHours.enabled && (
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Wunschzeit: {formData.options.offHours.time || '08:00'} Uhr</span>
                      </li>
                    )}
                    
                    {formData.options.seasonExtension.enabled && (
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Saisonverlängerung</span>
                      </li>
                    )}
                    
                    {!formData.options.environmentPackage && 
                     !formData.options.finalCleaning && 
                     !formData.options.offHours.enabled && 
                     !formData.options.seasonExtension.enabled && (
                      <li className="text-gray-500">Keine Optionen gewählt</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name*
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={contactInfo.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={contactInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={contactInfo.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                ></textarea>
              </div>
              
              <div className="flex justify-between space-x-4 pt-4">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
                >
                  Zurück
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 py-2 px-6 bg-accent text-white font-medium rounded-md transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent-dark'
                  }`}
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Jetzt anfragen'}
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Ihre Daten werden gemäß unserer Datenschutzerklärung verarbeitet. Durch das Absenden erklären Sie sich mit der Verarbeitung einverstanden.
              </p>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="bg-green-50 p-6 rounded-lg border border-green-200 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <svg className="h-16 w-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Vielen Dank für Ihre Anfrage!</h3>
          <p className="text-gray-600 mb-4">
            Wir haben Ihre Informationen erhalten und werden uns schnellstmöglich bei Ihnen melden.
          </p>
          <p className="text-gray-600">
            Eine Bestätigung wurde an {contactInfo.email} gesendet.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
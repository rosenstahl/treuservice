"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../EntkernungWizard';

type ZusammenfassungStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  isLastStep?: boolean;
}

export const ZusammenfassungStep: React.FC<ZusammenfassungStepProps> = ({ 
  formData,
  updateFormData,
  goToPreviousStep
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    telefon: ''
  });
  
  // Initializing contact info from existing form data
  const [kontaktInfo, setKontaktInfo] = useState({
    name: formData.kontakt.name || '',
    email: formData.kontakt.email || '',
    telefon: formData.kontakt.telefon || '',
    nachricht: formData.kontakt.nachricht || '',
  });

  // Objekttyp formatieren
  const getObjektTypName = () => {
    switch (formData.objektTyp) {
      case 'wohnung':
        return 'Wohnung';
      case 'haus':
        return 'Haus';
      case 'gewerbe':
        return 'Gewerbeimmobilie';
      case 'industriegebaeude':
        return 'Industriegebäude';
      case 'oeffentlichesgebaeude':
        return 'Öffentliches Gebäude';
      default:
        return 'Sonstiges';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setKontaktInfo(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Fehler zurücksetzen wenn ein Feld ausgefüllt wird
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    updateFormData({
      kontakt: {
        ...formData.kontakt,
        [name]: value
      }
    });
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      name: !kontaktInfo.name ? 'Bitte geben Sie Ihren Namen ein' : '',
      email: !kontaktInfo.email ? 'Bitte geben Sie Ihre E-Mail ein' : !isValidEmail(kontaktInfo.email) ? 'Bitte geben Sie eine gültige E-Mail ein' : '',
      telefon: !kontaktInfo.telefon ? 'Bitte geben Sie Ihre Telefonnummer ein' : '',
    };
    
    setErrors(newErrors);
    
    // Prüfen ob alle erforderlichen Felder ausgefüllt sind
    return !Object.values(newErrors).some(error => error !== '');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
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
                  <p className="text-sm text-gray-500">Objekttyp:</p>
                  <p className="text-sm font-medium">{getObjektTypName()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Fläche:</p>
                  <p className="text-sm font-medium">
                    {formData.objektDetails.flaeche} m²
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Entkernung:</p>
                  <p className="text-sm font-medium">
                    {formData.umfang.komplettEntkernung ? 'Komplette Entkernung' : 'Selektiver Rückbau'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Schadstoffe:</p>
                  <ul className="text-sm">
                    {formData.schadstoffoptionen.asbest && (
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Asbest</span>
                      </li>
                    )}
                    
                    {formData.schadstoffoptionen.pcb && (
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>PCB</span>
                      </li>
                    )}
                    
                    {formData.schadstoffoptionen.kmf && (
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>KMF</span>
                      </li>
                    )}
                    
                    {formData.schadstoffoptionen.schimmel && (
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Schimmel</span>
                      </li>
                    )}
                    
                    {formData.schadstoffoptionen.holzschutz && (
                      <li className="flex items-center">
                        <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Holzschutzmittel</span>
                      </li>
                    )}
                    
                    {!formData.schadstoffoptionen.asbest && 
                     !formData.schadstoffoptionen.pcb && 
                     !formData.schadstoffoptionen.kmf && 
                     !formData.schadstoffoptionen.schimmel && 
                     !formData.schadstoffoptionen.holzschutz && (
                      <li className="text-gray-500">Keine Schadstoffe ausgewählt</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Adresse:</p>
                  <p className="text-sm font-medium">
                    {formData.adresseTermin.strasse} {formData.adresseTermin.hausnummer}, {formData.adresseTermin.plz} {formData.adresseTermin.ort}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Kostenvoranschlag:</p>
                  <p className="text-sm font-medium text-accent">
                    {formData.preisschaetzung.toLocaleString('de-DE')} €
                  </p>
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
                  value={kontaktInfo.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
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
                  value={kontaktInfo.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon*
                </label>
                <input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  required
                  value={kontaktInfo.telefon}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 ${errors.telefon ? 'border-red-300' : 'border-gray-300'}`}
                />
                {errors.telefon && (
                  <p className="mt-1 text-xs text-red-500">{errors.telefon}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="nachricht" className="block text-sm font-medium text-gray-700 mb-1">
                  Nachricht
                </label>
                <textarea
                  id="nachricht"
                  name="nachricht"
                  rows={3}
                  value={kontaktInfo.nachricht}
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
            Eine Bestätigung wurde an {kontaktInfo.email} gesendet.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
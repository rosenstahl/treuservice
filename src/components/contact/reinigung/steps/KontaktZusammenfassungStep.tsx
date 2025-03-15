"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../ReinigungWizard';

type KontaktZusammenfassungStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  isLastStep?: boolean;
}

export const KontaktZusammenfassungStep: React.FC<KontaktZusammenfassungStepProps> = ({ 
  formData,
  updateFormData,
  goToPreviousStep
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({
      kontakt: {
        ...formData.kontakt,
        [name]: value
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Einfache Validierung
    if (!formData.kontakt.name) {
      setError('Bitte geben Sie Ihren Namen ein');
      return;
    }
    
    if (!formData.kontakt.email) {
      setError('Bitte geben Sie Ihre E-Mail-Adresse ein');
      return;
    }
    
    if (!formData.kontakt.telefon) {
      setError('Bitte geben Sie Ihre Telefonnummer ein');
      return;
    }
    
    setIsSubmitting(true);
    
    // Hier würde normalerweise die Datenübermittlung erfolgen
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // Formatierungshelfer für Reinigungsart
  const getReinigungsartName = () => {
    const artMap: Record<string, string> = {
      'unterhaltsreinigung': 'Unterhaltsreinigung',
      'grundreinigung': 'Grundreinigung',
      'glas_fassade': 'Glas- & Fassadenreinigung',
      'industrie': 'Industriereinigung',
      'reinraum': 'Reinraumreinigung',
      'aussenanlagen': 'Außenanlagenpflege',
      'sonderreinigung': 'Sonderreinigung',
      'verkehrsmittel': 'Verkehrsmittelreinigung',
      'hotel': 'Hotelreinigung',
      'veranstaltung': 'Veranstaltungsreinigung',
      'baureinigung': 'Baureinigung',
      'steinreinigung': 'Steinreinigung',
      'dachreinigung': 'Dachreinigung',
      'solaranlagen': 'Solaranlagenreinigung',
      'sonstiges': 'Sonstige Reinigung'
    };
    
    const art = formData.reinigungsart.hauptkategorie;
    return artMap[art] || (art === 'sonstiges' ? formData.reinigungsart.sonstigesText : art);
  };

  // Formatierungshelfer für Objekttyp
  const getObjektTypName = () => {
    const typMap: Record<string, string> = {
      'buero': 'Büro',
      'wohnhaus': 'Wohnhaus',
      'industrie': 'Industriegebäude',
      'gewerbe': 'Gewerbegebäude',
      'hotel': 'Hotel',
      'krankenhaus': 'Krankenhaus',
      'schule': 'Schule/Bildungseinrichtung',
      'aussenbereich': 'Außenbereich',
      'sonstiges': 'Sonstiges'
    };
    
    const typ = formData.objektTyp.typ;
    return typMap[typ] || (typ === 'sonstiges' ? formData.objektTyp.sonstigesText : typ);
  };

  // Formatierungshelfer für Servicetyp
  const getServiceTypName = () => {
    const serviceMap: Record<string, string> = {
      'standard': 'Standard-Service',
      'express': 'Express-Service',
      'sofort': 'Sofort-Service'
    };
    
    return serviceMap[formData.terminService.servicetyp] || formData.terminService.servicetyp;
  };

  // Formatierungshelfer für Regelmäßigkeit
  const getRegelmassigkeitName = () => {
    const regelmassigkeitMap: Record<string, string> = {
      'einmalig': 'Einmalig',
      'taeglich': 'Täglich',
      'woechentlich': 'Wöchentlich',
      'monatlich': 'Monatlich',
      'individuell': 'Individuell'
    };
    
    const reg = formData.terminService.regelmassigkeit;
    return regelmassigkeitMap[reg] || (reg === 'individuell' ? formData.terminService.individuelleAngabe : reg);
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
          Kontaktdaten & Zusammenfassung
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte geben Sie Ihre Kontaktdaten ein und überprüfen Sie Ihre Angaben.
        </motion.p>
      </div>
      
      {!isSubmitted ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name*
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.kontakt.name}
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
                  value={formData.kontakt.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
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
                  value={formData.kontakt.telefon}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              
              <div>
                <label htmlFor="firma" className="block text-sm font-medium text-gray-700 mb-1">
                  Firma (optional)
                </label>
                <input
                  id="firma"
                  name="firma"
                  type="text"
                  value={formData.kontakt.firma || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="adresseStrasse" className="block text-sm font-medium text-gray-700 mb-1">
                    Straße
                  </label>
                  <input
                    id="adresseStrasse"
                    name="adresseStrasse"
                    type="text"
                    value={formData.kontakt.adresseStrasse}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label htmlFor="adresseHausnummer" className="block text-sm font-medium text-gray-700 mb-1">
                    Nr.
                  </label>
                  <input
                    id="adresseHausnummer"
                    name="adresseHausnummer"
                    type="text"
                    value={formData.kontakt.adresseHausnummer}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="adressePlz" className="block text-sm font-medium text-gray-700 mb-1">
                    PLZ
                  </label>
                  <input
                    id="adressePlz"
                    name="adressePlz"
                    type="text"
                    value={formData.kontakt.adressePlz}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label htmlFor="adresseOrt" className="block text-sm font-medium text-gray-700 mb-1">
                    Ort
                  </label>
                  <input
                    id="adresseOrt"
                    name="adresseOrt"
                    type="text"
                    value={formData.kontakt.adresseOrt}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="anmerkungen" className="block text-sm font-medium text-gray-700 mb-1">
                  Anmerkungen (optional)
                </label>
                <textarea
                  id="anmerkungen"
                  name="anmerkungen"
                  rows={3}
                  value={formData.kontakt.anmerkungen}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                ></textarea>
              </div>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="text-lg font-medium text-gray-800 mb-3">Ihre Angaben</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Reinigungsart:</p>
                  <p className="text-sm font-medium">{getReinigungsartName()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Objekttyp:</p>
                  <p className="text-sm font-medium">{getObjektTypName()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Fläche:</p>
                  <p className="text-sm font-medium">{formData.flaecheInfo.flaeche} m²</p>
                </div>
                
                {formData.flaecheInfo.raumanzahl && (
                  <div>
                    <p className="text-sm text-gray-500">Anzahl Räume:</p>
                    <p className="text-sm font-medium">{formData.flaecheInfo.raumanzahl}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-500">Service-Typ:</p>
                  <p className="text-sm font-medium">{getServiceTypName()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Regelmäßigkeit:</p>
                  <p className="text-sm font-medium">{getRegelmassigkeitName()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Wunschtermin:</p>
                  <p className="text-sm font-medium">
                    {new Date(formData.terminService.wunschtermin).toLocaleDateString('de-DE')}
                    {formData.terminService.wunschzeit && ` um ${formData.terminService.wunschzeit} Uhr`}
                  </p>
                </div>
                
                {formData.terminService.anmerkungen && (
                  <div>
                    <p className="text-sm text-gray-500">Anmerkungen zum Termin:</p>
                    <p className="text-sm">{formData.terminService.anmerkungen}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex flex-col space-y-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 bg-accent text-white font-medium rounded-md transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent-dark'
                  }`}
                >
                  {isSubmitting ? 'Wird gesendet...' : 'Jetzt anfragen'}
                </button>
                
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="w-full py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
                >
                  Zurück
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Ihre Daten werden gemäß unserer Datenschutzerklärung verarbeitet. Durch das Absenden erklären Sie sich mit der Verarbeitung einverstanden.
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="bg-green-50 p-6 rounded-lg border border-green-200 text-center max-w-2xl mx-auto"
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
            Eine Bestätigung wurde an {formData.kontakt.email} gesendet.
          </p>
        </motion.div>
      )}

      {error && (
        <motion.p 
          className="text-red-500 text-sm text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};
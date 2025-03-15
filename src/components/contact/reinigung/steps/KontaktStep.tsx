"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../ReinigungWizard'

type KontaktStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const KontaktStep: React.FC<KontaktStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  // Zustandsvariablen für die Formularfelder
  const [name, setName] = useState(formData.kontakt.name || '')
  const [email, setEmail] = useState(formData.kontakt.email || '')
  const [telefon, setTelefon] = useState(formData.kontakt.telefon || '')
  const [firma, setFirma] = useState(formData.kontakt.firma || '')
  const [adresseStrasse, setAdresseStrasse] = useState(formData.kontakt.adresseStrasse || '')
  const [adresseHausnummer, setAdresseHausnummer] = useState(formData.kontakt.adresseHausnummer || '')
  const [adressePlz, setAdressePlz] = useState(formData.kontakt.adressePlz || '')
  const [adresseOrt, setAdresseOrt] = useState(formData.kontakt.adresseOrt || '')
  const [anmerkungen, setAnmerkungen] = useState(formData.kontakt.anmerkungen || '')
  
  // Fehlerzustand
  const [error, setError] = useState('')
  
  // Validiere und aktualisiere die Formular-Daten
  const handleContinue = () => {
    // Grundlegende Validierung
    if (!name.trim()) {
      setError('Bitte geben Sie Ihren Namen an')
      return
    }
    
    if (!email.trim() || !validateEmail(email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse an')
      return
    }
    
    if (!telefon.trim()) {
      setError('Bitte geben Sie Ihre Telefonnummer an')
      return
    }
    
    if (!adresseStrasse.trim() || !adresseHausnummer.trim() || !adressePlz.trim() || !adresseOrt.trim()) {
      setError('Bitte füllen Sie alle Adressfelder aus')
      return
    }
    
    // Aktualisiere die Formular-Daten
    updateFormData({
      kontakt: {
        name,
        email,
        telefon,
        firma,
        adresseStrasse,
        adresseHausnummer,
        adressePlz,
        adresseOrt,
        anmerkungen
      }
    })
    
    goToNextStep()
  }
  
  // E-Mail-Validierung mit regulärem Ausdruck
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  }

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
          Ihre Kontaktdaten
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte geben Sie Ihre Kontaktinformationen für die Angebotserstellung ein.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {/* Persönliche Daten */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">
              Telefon*
            </label>
            <input
              type="tel"
              id="telefon"
              name="telefon"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="firma" className="block text-sm font-medium text-gray-700 mb-1">
              Firma (optional)
            </label>
            <input
              type="text"
              id="firma"
              name="firma"
              value={firma}
              onChange={(e) => setFirma(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            />
          </div>
        </motion.div>
        
        {/* Adressdaten */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-3">Adresse</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-2">
              <label htmlFor="adresseStrasse" className="block text-sm font-medium text-gray-700 mb-1">
                Straße*
              </label>
              <input
                type="text"
                id="adresseStrasse"
                name="adresseStrasse"
                value={adresseStrasse}
                onChange={(e) => setAdresseStrasse(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                required
              />
            </div>
            
            <div>
              <label htmlFor="adresseHausnummer" className="block text-sm font-medium text-gray-700 mb-1">
                Nr.*
              </label>
              <input
                type="text"
                id="adresseHausnummer"
                name="adresseHausnummer"
                value={adresseHausnummer}
                onChange={(e) => setAdresseHausnummer(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="adressePlz" className="block text-sm font-medium text-gray-700 mb-1">
                PLZ*
              </label>
              <input
                type="text"
                id="adressePlz"
                name="adressePlz"
                value={adressePlz}
                onChange={(e) => setAdressePlz(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                required
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="adresseOrt" className="block text-sm font-medium text-gray-700 mb-1">
                Ort*
              </label>
              <input
                type="text"
                id="adresseOrt"
                name="adresseOrt"
                value={adresseOrt}
                onChange={(e) => setAdresseOrt(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                required
              />
            </div>
          </div>
        </motion.div>
        
        {/* Anmerkungen */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <label htmlFor="anmerkungen" className="block text-sm font-medium text-gray-700 mb-1">
            Anmerkungen (optional)
          </label>
          <textarea
            id="anmerkungen"
            name="anmerkungen"
            rows={3}
            value={anmerkungen}
            onChange={(e) => setAnmerkungen(e.target.value)}
            placeholder="Weitere Informationen oder Fragen"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
          />
        </motion.div>

        {error && (
          <motion.p 
            className="text-red-500 text-sm text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
        
        <motion.div 
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <motion.button
            onClick={goToPreviousStep}
            className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Zurück
          </motion.button>

          <motion.button
            onClick={handleContinue}
            className="py-3 px-8 rounded-md font-medium transition-all duration-200 bg-accent text-white hover:bg-accent-dark hover:shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Zum Abschluss
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
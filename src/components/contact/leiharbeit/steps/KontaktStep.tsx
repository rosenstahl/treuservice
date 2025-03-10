"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { User, Phone, Mail, Building, Pin, Clock } from 'lucide-react'

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
  const isUnternehmen = formData.anfrageTyp === 'unternehmen'
  const isBewerber = formData.anfrageTyp === 'bewerber'

  // Initialisiere lokale Zustandsvariablen mit Werten aus formData
  const [name, setName] = useState(formData.kontakt.name || '')
  const [firma, setFirma] = useState(formData.kontakt.firma || '')
  const [ansprechpartner, setAnsprechpartner] = useState(formData.kontakt.ansprechpartner || '')
  const [telefon, setTelefon] = useState(formData.kontakt.telefon || '')
  const [email, setEmail] = useState(formData.kontakt.email || '')
  const [adresseStrasse, setAdresseStrasse] = useState(formData.kontakt.adresseStrasse || '')
  const [adresseHausnummer, setAdresseHausnummer] = useState(formData.kontakt.adresseHausnummer || '')
  const [adressePlz, setAdressePlz] = useState(formData.kontakt.adressePlz || '')
  const [adresseOrt, setAdresseOrt] = useState(formData.kontakt.adresseOrt || '')
  const [kontaktzeitVon, setKontaktzeitVon] = useState(formData.kontakt.kontaktzeitVon || '')
  const [kontaktzeitBis, setKontaktzeitBis] = useState(formData.kontakt.kontaktzeitBis || '')
  const [anmerkungen, setAnmerkungen] = useState(formData.kontakt.anmerkungen || '')
  const [datenschutz, setDatenschutz] = useState(formData.datenschutz || false)

  const [error, setError] = useState('')

  // Handler für die Formular-Inputs
  const handleDatenschutzToggle = () => {
    setDatenschutz(prev => !prev)
    updateFormData({ datenschutz: !datenschutz })
  }

  // Validierung und Weiterleitung zum nächsten Schritt
  const handleContinue = () => {
    if (!name.trim()) {
      setError('Bitte geben Sie Ihren Namen an')
      return
    }
    
    if (isUnternehmen && !firma.trim()) {
      setError('Bitte geben Sie den Firmennamen an')
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
    
    if (!datenschutz) {
      setError('Bitte stimmen Sie den Datenschutzbestimmungen zu')
      return
    }
    
    // Aktualisiere die Formulardaten
    updateFormData({
      kontakt: {
        name,
        firma: isUnternehmen ? firma : undefined,
        ansprechpartner: isUnternehmen ? ansprechpartner : undefined,
        telefon,
        email,
        adresseStrasse,
        adresseHausnummer,
        adressePlz,
        adresseOrt,
        kontaktzeitVon,
        kontaktzeitBis,
        anmerkungen
      },
      datenschutz
    })
    
    goToNextStep()
  }

  // E-Mail-Validierung
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
          {isUnternehmen 
            ? 'Damit wir Sie kontaktieren können und Ihnen passende Personalvorschläge unterbreiten können.'
            : 'Damit wir Sie kontaktieren können und Ihnen passende Jobangebote machen können.'}
        </motion.p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {/* Persönliche/Firmendaten */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            {isUnternehmen ? 'Firmendaten' : 'Persönliche Daten'}
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {isUnternehmen ? 'Vor- und Nachname*' : 'Vor- und Nachname*'}
                </label>
              </div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                required
              />
            </div>
            
            {/* Firma (nur für Unternehmen) */}
            {isUnternehmen && (
              <div className="col-span-1">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-gray-400" />
                  <label htmlFor="firma" className="block text-sm font-medium text-gray-700">
                    Firmenname*
                  </label>
                </div>
                <input
                  type="text"
                  id="firma"
                  value={firma}
                  onChange={(e) => setFirma(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                  required={isUnternehmen}
                />
              </div>
            )}
            
            {/* Ansprechpartner (nur für Unternehmen) */}
            {isUnternehmen && (
              <div className="col-span-1">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <label htmlFor="ansprechpartner" className="block text-sm font-medium text-gray-700">
                    Ansprechpartner (optional)
                  </label>
                </div>
                <input
                  type="text"
                  id="ansprechpartner"
                  value={ansprechpartner}
                  onChange={(e) => setAnsprechpartner(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                />
              </div>
            )}
            
            {/* E-Mail */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-Mail-Adresse*
                </label>
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                required
              />
            </div>
            
            {/* Telefon */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <label htmlFor="telefon" className="block text-sm font-medium text-gray-700">
                  Telefonnummer*
                </label>
              </div>
              <input
                type="tel"
                id="telefon"
                value={telefon}
                onChange={(e) => setTelefon(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                required
              />
            </div>
          </div>
        </motion.div>
        
        {/* Adresse */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Adresse
          </h3>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
              <div className="flex items-center space-x-2">
                <Pin className="h-5 w-5 text-gray-400" />
                <label htmlFor="adresseStrasse" className="block text-sm font-medium text-gray-700">
                  Straße*
                </label>
              </div>
              <input
                type="text"
                id="adresseStrasse"
                value={adresseStrasse}
                onChange={(e) => setAdresseStrasse(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                required
              />
            </div>
            
            <div className="col-span-1">
              <label htmlFor="adresseHausnummer" className="block text-sm font-medium text-gray-700">
                Hausnr.*
              </label>
              <input
                type="text"
                id="adresseHausnummer"
                value={adresseHausnummer}
                onChange={(e) => setAdresseHausnummer(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                required
              />
            </div>
            
            <div className="col-span-1">
              <label htmlFor="adressePlz" className="block text-sm font-medium text-gray-700">
                PLZ*
              </label>
              <input
                type="text"
                id="adressePlz"
                value={adressePlz}
                onChange={(e) => setAdressePlz(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                required
              />
            </div>
            
            <div className="col-span-3">
              <label htmlFor="adresseOrt" className="block text-sm font-medium text-gray-700">
                Ort*
              </label>
              <input
                type="text"
                id="adresseOrt"
                value={adresseOrt}
                onChange={(e) => setAdresseOrt(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                required
              />
            </div>
          </div>
        </motion.div>
        
        {/* Bevorzugte Kontaktzeit */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-700">
              Bevorzugte Kontaktzeit (optional)
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="kontaktzeitVon" className="block text-sm font-medium text-gray-700">
                Von
              </label>
              <input
                type="time"
                id="kontaktzeitVon"
                value={kontaktzeitVon}
                onChange={(e) => setKontaktzeitVon(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
              />
            </div>
            
            <div>
              <label htmlFor="kontaktzeitBis" className="block text-sm font-medium text-gray-700">
                Bis
              </label>
              <input
                type="time"
                id="kontaktzeitBis"
                value={kontaktzeitBis}
                onChange={(e) => setKontaktzeitBis(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Anmerkungen */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <label htmlFor="anmerkungen" className="block text-lg font-medium text-gray-700 mb-2">
            Anmerkungen (optional)
          </label>
          <textarea
            id="anmerkungen"
            rows={3}
            value={anmerkungen}
            onChange={(e) => setAnmerkungen(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
            placeholder="Weitere Informationen oder Fragen"
          ></textarea>
        </motion.div>
        
        {/* Datenschutz */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="datenschutz"
                name="datenschutz"
                type="checkbox"
                checked={datenschutz}
                onChange={handleDatenschutzToggle}
                className="h-5 w-5 text-accent border-gray-300 rounded"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="datenschutz" className="font-medium text-gray-700">
                Datenschutzerklärung*
              </label>
              <p className="text-gray-500">
                Ich stimme zu, dass meine Angaben gemäß der Datenschutzerklärung verarbeitet werden. Ich kann meine Einwilligung jederzeit widerrufen.
              </p>
            </div>
          </div>
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
          transition={{ delay: 0.8, duration: 0.3 }}
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
            Weiter
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
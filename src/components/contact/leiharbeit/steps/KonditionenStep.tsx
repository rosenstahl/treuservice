"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Clock, CreditCard, HomeIcon, Building, Briefcase, Info } from 'lucide-react'

type KonditionenStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const KonditionenStep: React.FC<KonditionenStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const isUnternehmen = formData.anfrageTyp === 'unternehmen'
  const isBewerber = formData.anfrageTyp === 'bewerber'

  // Initialisiere lokale Zustandsvariablen mit Werten aus formData
  const [arbeitszeiten, setArbeitszeiten] = useState(
    formData.konditionen.arbeitszeiten || ''
  )
  const [ueberstundenBereitschaft, setUeberstundenBereitschaft] = useState(
    formData.konditionen.ueberstundenBereitschaft || false
  )
  // Bewerber-spezifische Felder
  const [gehaltsvorstellung, setGehaltsvorstellung] = useState(
    formData.konditionen.gehaltsvorstellung || ''
  )
  const [unterkunftBedarf, setUnterkunftBedarf] = useState(
    formData.konditionen.unterkunftBedarf || false
  )
  // Unternehmen-spezifische Felder
  const [stundensatz, setStundensatz] = useState(
    formData.konditionen.stundensatz || ''
  )
  const [unterkunftVorhanden, setUnterkunftVorhanden] = useState(
    formData.konditionen.unterkunftVorhanden || false
  )

  const [error, setError] = useState('')

  // Aktualisiere formData wenn sich lokale Zustände ändern
  useEffect(() => {
    const updatedKonditionen: FormData['konditionen'] = {
      arbeitszeiten,
      ueberstundenBereitschaft
    }

    if (isBewerber) {
      updatedKonditionen.gehaltsvorstellung = gehaltsvorstellung
      updatedKonditionen.unterkunftBedarf = unterkunftBedarf
    }

    if (isUnternehmen) {
      updatedKonditionen.stundensatz = stundensatz
      updatedKonditionen.unterkunftVorhanden = unterkunftVorhanden
    }

    updateFormData({ konditionen: updatedKonditionen })
  }, [
    arbeitszeiten, ueberstundenBereitschaft, 
    gehaltsvorstellung, unterkunftBedarf,
    stundensatz, unterkunftVorhanden, 
    isBewerber, isUnternehmen, updateFormData
  ])

  // Handler für checkboxes
  const handleUeberstundenBereitschaftToggle = () => {
    setUeberstundenBereitschaft(prev => !prev)
  }

  const handleUnterkunftBedarfToggle = () => {
    setUnterkunftBedarf(prev => !prev)
  }

  const handleUnterkunftVorhandenToggle = () => {
    setUnterkunftVorhanden(prev => !prev)
  }

  // Validierung und Weiterleitung zum nächsten Schritt
  const handleContinue = () => {
    if (!arbeitszeiten.trim()) {
      setError('Bitte geben Sie die gewünschten Arbeitszeiten an')
      return
    }
    
    if (isBewerber && !gehaltsvorstellung.trim()) {
      setError('Bitte geben Sie Ihre Gehaltsvorstellung an')
      return
    }
    
    goToNextStep()
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
          {isUnternehmen ? 'Zusätzliche Informationen' : 'Ihre Erwartungen'}
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {isUnternehmen 
            ? 'Bitte teilen Sie uns weitere wichtige Details zum Einsatz mit' 
            : 'Welche Erwartungen haben Sie an Ihren zukünftigen Einsatz?'}
        </motion.p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {/* Infobox für Unternehmen */}
        {isUnternehmen && (
          <motion.div
            className="mb-8 border-2 border-accent/30 rounded-lg p-4 bg-accent/5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            <div className="flex items-start">
              <div className="mr-3 text-accent mt-1">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium text-accent">Hinweis zur Vergütung</h4>
                <p className="text-gray-600 text-sm mt-1">
                  Die endgültige Vergütung wird individuell mit Ihnen besprochen. Die hier gemachten Angaben helfen uns, passende Kandidaten für Sie zu finden.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Arbeitszeiten - für beide */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="flex items-start">
            <div className="mr-3 text-accent mt-1">
              <Clock className="h-6 w-6" />
            </div>
            <div className="w-full">
              <label htmlFor="arbeitszeiten" className="block text-lg font-medium text-gray-700 mb-2">
                {isUnternehmen ? 'Benötigte Arbeitszeiten' : 'Gewünschte Arbeitszeiten'}
              </label>
              <input
                type="text"
                id="arbeitszeiten"
                value={arbeitszeiten}
                onChange={(e) => setArbeitszeiten(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                placeholder={isUnternehmen 
                  ? 'z.B. Mo-Fr 8-17 Uhr, 40h/Woche'
                  : 'z.B. Mo-Fr 8-17 Uhr, Teilzeit 20h/Woche'}
              />
            </div>
          </div>
        </motion.div>

        {/* Überstunden-Bereitschaft - für beide */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <div className="flex items-center">
            <div className="flex items-center h-5">
              <input
                id="ueberstundenBereitschaft"
                name="ueberstundenBereitschaft"
                type="checkbox"
                checked={ueberstundenBereitschaft}
                onChange={handleUeberstundenBereitschaftToggle}
                className="h-5 w-5 text-accent border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="ueberstundenBereitschaft" className="font-medium text-gray-700">
                {isUnternehmen ? 'Überstunden erforderlich' : 'Überstunden-Bereitschaft'}
              </label>
              <p className="text-gray-500 text-sm">
                {isUnternehmen 
                  ? 'Der Einsatz erfordert ggf. Überstunden oder Mehrarbeit.'
                  : 'Ich bin bereit, bei Bedarf Überstunden zu leisten.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bewerber: Gehaltsvorstellung */}
        {isBewerber && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <div className="flex items-start">
              <div className="mr-3 text-accent mt-1">
                <CreditCard className="h-6 w-6" />
              </div>
              <div className="w-full">
                <label htmlFor="gehaltsvorstellung" className="block text-lg font-medium text-gray-700 mb-2">
                  Gehaltsvorstellung
                </label>
                <input
                  type="text"
                  id="gehaltsvorstellung"
                  value={gehaltsvorstellung}
                  onChange={(e) => setGehaltsvorstellung(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                  placeholder="z.B. 15 EUR/Stunde oder 2.500 EUR/Monat brutto"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Unterkunft - für beide */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <div className="flex items-start">
            <div className="mr-3 text-accent mt-1">
              <HomeIcon className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center">
                <input
                  id={isUnternehmen ? "unterkunftVorhanden" : "unterkunftBedarf"}
                  name={isUnternehmen ? "unterkunftVorhanden" : "unterkunftBedarf"}
                  type="checkbox"
                  checked={isUnternehmen ? unterkunftVorhanden : unterkunftBedarf}
                  onChange={isUnternehmen ? handleUnterkunftVorhandenToggle : handleUnterkunftBedarfToggle}
                  className="h-5 w-5 text-accent border-gray-300 rounded"
                />
                <label htmlFor={isUnternehmen ? "unterkunftVorhanden" : "unterkunftBedarf"} className="ml-3 font-medium text-gray-700">
                  {isUnternehmen ? 'Unterkunftsmöglichkeiten vorhanden' : 'Unterkunftsbedarf'}
                </label>
              </div>
              <p className="text-gray-500 text-sm mt-1 ml-8">
                {isUnternehmen 
                  ? 'Wir können Unterkunftsmöglichkeiten bereitstellen oder bei der Wohnungssuche unterstützen.'
                  : 'Ich benötige für den Einsatz eine Unterkunft oder Unterstützung bei der Wohnungssuche.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Unternehmen: Optionaler Stundensatz */}
        {isUnternehmen && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <div className="flex items-start">
              <div className="mr-3 text-accent mt-1">
                <Briefcase className="h-6 w-6" />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between">
                  <label htmlFor="stundensatz" className="block text-lg font-medium text-gray-700 mb-2">
                    Budget / Vergütungsrahmen <span className="text-sm font-normal text-gray-500">(optional)</span>
                  </label>
                </div>
                <input
                  type="text"
                  id="stundensatz"
                  value={stundensatz}
                  onChange={(e) => setStundensatz(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                  placeholder="z.B. Budget bis 25 EUR/Stunde"
                />
                <p className="text-gray-500 text-xs mt-1">
                  Diese Angabe ist optional. Wir erstellen Ihnen ein individuelles Angebot basierend auf Ihren Anforderungen.
                </p>
              </div>
            </div>
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
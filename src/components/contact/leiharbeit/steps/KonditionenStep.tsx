"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Clock, CreditCard, HomeIcon, Briefcase, Info, CheckSquare, Square } from 'lucide-react'

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
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-center mb-6">
        <motion.h2 
          className="text-xl font-medium text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.2 }}
        >
          {isUnternehmen ? 'Zusätzliche Informationen' : 'Ihre Erwartungen'}
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          {isUnternehmen 
            ? 'Bitte teilen Sie uns weitere wichtige Details zum Einsatz mit' 
            : 'Welche Erwartungen haben Sie an Ihren zukünftigen Einsatz?'}
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Infobox für Unternehmen */}
        {isUnternehmen && (
          <motion.div
            className="mb-5 border border-[#009FD8]/30 rounded-lg p-4 bg-[#E6F4FA]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.2 }}
          >
            <div className="flex items-start">
              <div className="mr-2 text-[#009FD8] mt-0.5">
                <Info className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-medium text-[#009FD8]">Hinweis zur Vergütung</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Die endgültige Vergütung wird individuell mit Ihnen besprochen. Die hier gemachten Angaben helfen uns, passende Kandidaten für Sie zu finden.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Arbeitszeiten - für beide */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Clock className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">{isUnternehmen ? 'Benötigte Arbeitszeiten' : 'Gewünschte Arbeitszeiten'}</h3>
          </div>
          
          <input
            type="text"
            id="arbeitszeiten"
            value={arbeitszeiten}
            onChange={(e) => setArbeitszeiten(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
            placeholder={isUnternehmen 
              ? 'z.B. Mo-Fr 8-17 Uhr, 40h/Woche'
              : 'z.B. Mo-Fr 8-17 Uhr, Teilzeit 20h/Woche'}
          />
        </motion.div>

        {/* Überstunden-Bereitschaft - für beide */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Clock className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">{isUnternehmen ? 'Überstunden erforderlich' : 'Überstunden-Bereitschaft'}</h3>
          </div>
          
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleUeberstundenBereitschaftToggle}>
            <div className={`${ueberstundenBereitschaft ? 'text-[#009FD8]' : 'text-gray-300'}`}>
              {ueberstundenBereitschaft ? (
                <CheckSquare className="h-4 w-4" />
              ) : (
                <Square className="h-4 w-4" />
              )}
            </div>
            <span className="text-xs text-gray-700">
              {isUnternehmen 
                ? 'Der Einsatz erfordert ggf. Überstunden oder Mehrarbeit.'
                : 'Ich bin bereit, bei Bedarf Überstunden zu leisten.'}
            </span>
          </div>
        </motion.div>

        {/* Bewerber: Gehaltsvorstellung */}
        {isBewerber && (
          <motion.div
            className="mb-5 border-t border-gray-100 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <CreditCard className="w-4 h-4 mr-2 text-[#009FD8]" />
              <h3 className="font-medium text-sm">Gehaltsvorstellung</h3>
            </div>
            
            <input
              type="text"
              id="gehaltsvorstellung"
              value={gehaltsvorstellung}
              onChange={(e) => setGehaltsvorstellung(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
              placeholder="z.B. 15 EUR/Stunde oder 2.500 EUR/Monat brutto"
            />
          </motion.div>
        )}

        {/* Unterkunft - für beide */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <HomeIcon className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">{isUnternehmen ? 'Unterkunftsmöglichkeiten' : 'Unterkunftsbedarf'}</h3>
          </div>
          
          <div className="flex items-center space-x-2 cursor-pointer" 
            onClick={isUnternehmen ? handleUnterkunftVorhandenToggle : handleUnterkunftBedarfToggle}>
            <div className={`${isUnternehmen ? (unterkunftVorhanden ? 'text-[#009FD8]' : 'text-gray-300') : (unterkunftBedarf ? 'text-[#009FD8]' : 'text-gray-300')}`}>
              {isUnternehmen ? (
                unterkunftVorhanden ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />
              ) : (
                unterkunftBedarf ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />
              )}
            </div>
            <span className="text-xs text-gray-700">
              {isUnternehmen 
                ? 'Wir können Unterkunftsmöglichkeiten bereitstellen oder bei der Wohnungssuche unterstützen.'
                : 'Ich benötige für den Einsatz eine Unterkunft oder Unterstützung bei der Wohnungssuche.'}
            </span>
          </div>
        </motion.div>

        {/* Unternehmen: Optionaler Stundensatz */}
        {isUnternehmen && (
          <motion.div
            className="mb-5 border-t border-gray-100 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <Briefcase className="w-4 h-4 mr-2 text-[#009FD8]" />
              <h3 className="font-medium text-sm">Budget / Vergütungsrahmen <span className="text-xs font-normal text-gray-500">(optional)</span></h3>
            </div>
            
            <input
              type="text"
              id="stundensatz"
              value={stundensatz}
              onChange={(e) => setStundensatz(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
              placeholder="z.B. Budget bis 25 EUR/Stunde"
            />
            <p className="text-xs text-gray-500 mt-1">
              Diese Angabe ist optional. Wir erstellen Ihnen ein individuelles Angebot basierend auf Ihren Anforderungen.
            </p>
          </motion.div>
        )}

        {error && (
          <motion.p 
            className="text-red-500 text-xs text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
        
        <motion.div 
          className="flex justify-between mt-8 pt-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.2 }}
        >
          <button
            onClick={goToPreviousStep}
            className="py-2 px-4 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Zurück
          </button>
          
          <button
            onClick={handleContinue}
            className={`py-2.5 px-6 rounded-full text-xs font-medium transition-colors ${
              arbeitszeiten && (!isBewerber || gehaltsvorstellung)
                ? 'bg-[#009FD8] text-white hover:bg-[#007CAB]' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Weiter
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Briefcase, MapPin, Clock, Calendar, Factory, Building2, HardHat, Computer, Utensils, ShoppingBag, HeartPulse, MoreHorizontal } from 'lucide-react'

type BewerberProfilStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Branchen/Fachbereich Informationen
const fachbereichData = {
  produktion: {
    title: "Produktion",
    icon: <Factory className="h-6 w-6" />
  },
  logistik: {
    title: "Logistik",
    icon: <ShoppingBag className="h-6 w-6" />
  },
  handwerk: {
    title: "Handwerk",
    icon: <HardHat className="h-6 w-6" />
  },
  buero: {
    title: "Büro/Verwaltung",
    icon: <Building2 className="h-6 w-6" />
  },
  it: {
    title: "IT",
    icon: <Computer className="h-6 w-6" />
  },
  gastronomie: {
    title: "Gastronomie",
    icon: <Utensils className="h-6 w-6" />
  },
  handel: {
    title: "Handel",
    icon: <ShoppingBag className="h-6 w-6" />
  },
  medizin: {
    title: "Medizin & Pflege",
    icon: <HeartPulse className="h-6 w-6" />
  },
  sonstiges: {
    title: "Sonstiges",
    icon: <MoreHorizontal className="h-6 w-6" />
  }
}

// Qualifikationsniveaus
const qualifikationsniveaus = [
  { value: 'ungelernt', label: 'Ungelernt' },
  { value: 'angelernt', label: 'Angelernt' },
  { value: 'fachkraft', label: 'Fachkraft' },
  { value: 'spezialist', label: 'Spezialist' },
  { value: 'fuehrungskraft', label: 'Führungskraft' }
]

// Verfügbarkeitsoptionen
const verfuegbarkeitOptionen = [
  { value: 'sofort', label: 'Sofort verfügbar' },
  { value: 'ein_monat', label: 'In 1 Monat' },
  { value: 'drei_monate', label: 'In 2-3 Monaten' },
  { value: 'spaeter', label: 'Später' }
]

// Arbeitszeitoptionen
const arbeitszeitOptionen = [
  { value: 'vollzeit', label: 'Vollzeit' },
  { value: 'teilzeit', label: 'Teilzeit' },
  { value: 'minijob', label: 'Minijob' },
  { value: 'flexibel', label: 'Flexibel' }
]

export const BewerberProfilStep: React.FC<BewerberProfilStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  // Initialisiere lokale Zustandsvariablen mit Werten aus formData
  const [fachbereich, setFachbereich] = useState<FormData['bewerberProfil']['fachbereich']>(
    formData.bewerberProfil?.fachbereich || ''
  )
  const [fachbereichSonstiges, setFachbereichSonstiges] = useState(
    formData.bewerberProfil?.fachbereichSonstiges || ''
  )
  const [qualifikation, setQualifikation] = useState<FormData['bewerberProfil']['qualifikation']>(
    formData.bewerberProfil?.qualifikation || ''
  )
  const [berufserfahrungJahre, setBerufserfahrungJahre] = useState(
    formData.bewerberProfil?.berufserfahrungJahre || 0
  )
  const [verfuegbarkeit, setVerfuegbarkeit] = useState<FormData['bewerberProfil']['verfuegbarkeit']>(
    formData.bewerberProfil?.verfuegbarkeit || ''
  )
  const [arbeitszeit, setArbeitszeit] = useState<FormData['bewerberProfil']['arbeitszeit']>(
    formData.bewerberProfil?.arbeitszeit || ''
  )
  const [einsatzregion, setEinsatzregion] = useState(
    formData.bewerberProfil?.einsatzregion || ''
  )

  const [error, setError] = useState('')

  // Aktualisiere formData wenn sich lokale Zustände ändern
  useEffect(() => {
    updateFormData({
      bewerberProfil: {
        fachbereich,
        fachbereichSonstiges: fachbereich === 'sonstiges' ? fachbereichSonstiges : undefined,
        qualifikation,
        berufserfahrungJahre,
        verfuegbarkeit,
        arbeitszeit,
        einsatzregion
      }
    })
  }, [fachbereich, fachbereichSonstiges, qualifikation, berufserfahrungJahre, verfuegbarkeit, arbeitszeit, einsatzregion, updateFormData])

  // Handler für verschiedene Inputs
  const handleFachbereichSelect = (selected: FormData['bewerberProfil']['fachbereich']) => {
    setFachbereich(selected)
    setError('')
  }

  const handleQualifikationSelect = (selected: FormData['bewerberProfil']['qualifikation']) => {
    setQualifikation(selected)
    setError('')
  }

  const handleVerfuegbarkeitSelect = (selected: FormData['bewerberProfil']['verfuegbarkeit']) => {
    setVerfuegbarkeit(selected)
    setError('')
  }

  const handleArbeitszeitSelect = (selected: FormData['bewerberProfil']['arbeitszeit']) => {
    setArbeitszeit(selected)
    setError('')
  }

  // Validierung und Weiterleitung zum nächsten Schritt
  const handleContinue = () => {
    if (!fachbereich) {
      setError('Bitte wählen Sie einen Fachbereich aus')
      return
    }
    
    if (fachbereich === 'sonstiges' && !fachbereichSonstiges.trim()) {
      setError('Bitte geben Sie Ihren Fachbereich an')
      return
    }
    
    if (!qualifikation) {
      setError('Bitte wählen Sie ein Qualifikationsniveau aus')
      return
    }
    
    if (!verfuegbarkeit) {
      setError('Bitte wählen Sie Ihre Verfügbarkeit aus')
      return
    }
    
    if (!arbeitszeit) {
      setError('Bitte wählen Sie Ihr gewünschtes Arbeitszeitmodell aus')
      return
    }
    
    if (!einsatzregion.trim()) {
      setError('Bitte geben Sie Ihre bevorzugte Einsatzregion an')
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
          Ihr Bewerberprofil
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Geben Sie an, in welchem Bereich Sie arbeiten möchten und welche Qualifikationen Sie mitbringen.
        </motion.p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {/* Fachbereichauswahl */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3">Ihr Fachbereich</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
            {Object.entries(fachbereichData).map(([key, data]) => (
              <motion.div
                key={key}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${fachbereich === key ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent/30'}`}
                onClick={() => handleFachbereichSelect(key as FormData['bewerberProfil']['fachbereich'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-3 ${fachbereich === key ? 'text-accent' : 'text-gray-500'}`}>
                  {data.icon}
                </div>
                <span className="text-sm font-medium">{data.title}</span>
              </motion.div>
            ))}
          </div>

          {/* Eingabefeld für sonstigen Fachbereich */}
          {fachbereich === 'sonstiges' && (
            <motion.div
              className="mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="fachbereichSonstiges" className="block text-sm font-medium text-gray-700 mb-1">
                Bitte spezifizieren Sie Ihren Fachbereich:
              </label>
              <input
                type="text"
                id="fachbereichSonstiges"
                value={fachbereichSonstiges}
                onChange={(e) => setFachbereichSonstiges(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                placeholder="Ihr Fachbereich"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Qualifikationsniveau */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3">Qualifikationsniveau</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {qualifikationsniveaus.map((niveau) => (
              <motion.div
                key={niveau.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${qualifikation === niveau.value ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent/30'}`}
                onClick={() => handleQualifikationSelect(niveau.value as FormData['bewerberProfil']['qualifikation'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-3 ${qualifikation === niveau.value ? 'text-accent' : 'text-gray-500'}`}>
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{niveau.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Berufserfahrung */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <label htmlFor="berufserfahrungJahre" className="block text-lg font-medium text-gray-700 mb-3">
            Berufserfahrung in Jahren
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="berufserfahrungJahre"
              min="0"
              max="30"
              value={berufserfahrungJahre}
              onChange={(e) => setBerufserfahrungJahre(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <span className="ml-4 px-3 py-2 bg-accent text-white font-medium rounded-md min-w-[3rem] text-center">
              {berufserfahrungJahre}
            </span>
          </div>
        </motion.div>

        {/* Verfügbarkeit */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3">Verfügbarkeit</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {verfuegbarkeitOptionen.map((option) => (
              <motion.div
                key={option.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${verfuegbarkeit === option.value ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent/30'}`}
                onClick={() => handleVerfuegbarkeitSelect(option.value as FormData['bewerberProfil']['verfuegbarkeit'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-3 ${verfuegbarkeit === option.value ? 'text-accent' : 'text-gray-500'}`}>
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{option.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Arbeitszeit */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3">Gewünschtes Arbeitszeitmodell</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {arbeitszeitOptionen.map((option) => (
              <motion.div
                key={option.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${arbeitszeit === option.value ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent/30'}`}
                onClick={() => handleArbeitszeitSelect(option.value as FormData['bewerberProfil']['arbeitszeit'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-3 ${arbeitszeit === option.value ? 'text-accent' : 'text-gray-500'}`}>
                  <Clock className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{option.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Einsatzregion */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        >
          <label htmlFor="einsatzregion" className="block text-lg font-medium text-gray-700 mb-3">
            Bevorzugte Einsatzregion
          </label>
          <div className="flex items-center">
            <MapPin className="mr-3 text-gray-500" />
            <input
              type="text"
              id="einsatzregion"
              value={einsatzregion}
              onChange={(e) => setEinsatzregion(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              placeholder="PLZ, Stadt oder Region"
            />
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
          transition={{ delay: 0.9, duration: 0.3 }}
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
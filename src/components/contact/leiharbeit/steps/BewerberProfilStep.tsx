"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Briefcase, MapPin, Clock, Calendar, Factory, Building2, HardHat, Computer, Utensils, ShoppingBag, HeartPulse, MoreHorizontal, UserCircle } from 'lucide-react'

type BewerberProfilStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Typ für den bewerberProfil Teil von FormData
type BewerberProfilType = NonNullable<FormData['bewerberProfil']>;

// Branchen/Fachbereich Informationen
const fachbereichData = {
  produktion: {
    title: "Produktion",
    icon: <Factory className="h-5 w-5" />
  },
  logistik: {
    title: "Logistik",
    icon: <ShoppingBag className="h-5 w-5" />
  },
  handwerk: {
    title: "Handwerk",
    icon: <HardHat className="h-5 w-5" />
  },
  buero: {
    title: "Büro/Verwaltung",
    icon: <Building2 className="h-5 w-5" />
  },
  it: {
    title: "IT",
    icon: <Computer className="h-5 w-5" />
  },
  gastronomie: {
    title: "Gastronomie",
    icon: <Utensils className="h-5 w-5" />
  },
  handel: {
    title: "Handel",
    icon: <ShoppingBag className="h-5 w-5" />
  },
  medizin: {
    title: "Medizin & Pflege",
    icon: <HeartPulse className="h-5 w-5" />
  },
  sonstiges: {
    title: "Sonstiges",
    icon: <MoreHorizontal className="h-5 w-5" />
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
  const [fachbereich, setFachbereich] = useState<BewerberProfilType['fachbereich']>(
    formData.bewerberProfil?.fachbereich || ''
  )
  const [fachbereichSonstiges, setFachbereichSonstiges] = useState(
    formData.bewerberProfil?.fachbereichSonstiges || ''
  )
  const [qualifikation, setQualifikation] = useState<BewerberProfilType['qualifikation']>(
    formData.bewerberProfil?.qualifikation || ''
  )
  const [berufserfahrungJahre, setBerufserfahrungJahre] = useState(
    formData.bewerberProfil?.berufserfahrungJahre || 0
  )
  const [verfuegbarkeit, setVerfuegbarkeit] = useState<BewerberProfilType['verfuegbarkeit']>(
    formData.bewerberProfil?.verfuegbarkeit || ''
  )
  const [arbeitszeit, setArbeitszeit] = useState<BewerberProfilType['arbeitszeit']>(
    formData.bewerberProfil?.arbeitszeit || ''
  )
  const [einsatzregion, setEinsatzregion] = useState(
    formData.bewerberProfil?.einsatzregion || ''
  )

  const [error, setError] = useState('')
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

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
  const handleFachbereichSelect = (selected: BewerberProfilType['fachbereich']) => {
    setFachbereich(selected)
    setError('')
  }

  const handleQualifikationSelect = (selected: BewerberProfilType['qualifikation']) => {
    setQualifikation(selected)
    setError('')
  }

  const handleVerfuegbarkeitSelect = (selected: BewerberProfilType['verfuegbarkeit']) => {
    setVerfuegbarkeit(selected)
    setError('')
  }

  const handleArbeitszeitSelect = (selected: BewerberProfilType['arbeitszeit']) => {
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header mit Icon */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="inline-block p-2 bg-accent/10 rounded-full mb-4"
        >
          <UserCircle className="h-8 w-8 text-accent" />
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-medium text-gray-800 mb-3"
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
      
      <motion.div 
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Fachbereichauswahl */}
        <motion.div
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <Factory className="h-5 w-5 mr-2 text-accent" />
            Ihr Fachbereich
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(fachbereichData).map(([key, data]) => (
              <motion.div
                key={key}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  fachbereich === key 
                    ? 'border-accent/20 bg-accent/5 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleFachbereichSelect(key as BewerberProfilType['fachbereich'])}
                onMouseEnter={() => setHoveredOption(key)}
                onMouseLeave={() => setHoveredOption(null)}
                whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-3 ${
                  fachbereich === key 
                    ? 'text-accent' 
                    : hoveredOption === key 
                      ? 'text-accent' 
                      : 'text-gray-400'
                }`}>
                  {data.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{data.title}</span>
              </motion.div>
            ))}
          </div>

          {/* Eingabefeld für sonstigen Fachbereich */}
          {fachbereich === 'sonstiges' && (
            <motion.div
              className="mt-4"
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
                autoFocus
              />
            </motion.div>
          )}
        </motion.div>

        {/* Qualifikationsniveau */}
        <motion.div
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-accent" />
            Qualifikationsniveau
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {qualifikationsniveaus.map((niveau) => (
              <motion.div
                key={niveau.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  qualifikation === niveau.value 
                    ? 'border-accent/20 bg-accent/5 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleQualifikationSelect(niveau.value as BewerberProfilType['qualifikation'])}
                onMouseEnter={() => setHoveredOption(niveau.value)}
                onMouseLeave={() => setHoveredOption(null)}
                whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`flex justify-center items-center h-6 w-6 rounded-full mr-3 ${
                  qualifikation === niveau.value 
                    ? 'bg-accent/10 text-accent' 
                    : hoveredOption === niveau.value 
                      ? 'bg-gray-100 text-accent' 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  <span className="text-xs font-bold">{niveau.value.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{niveau.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Berufserfahrung */}
        <motion.div
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <label htmlFor="berufserfahrungJahre" className="block text-lg font-medium text-gray-700 mb-3 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-accent" />
            Berufserfahrung in Jahren
          </label>
          <div className="space-y-4">
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
              <span className="ml-4 px-4 py-2 bg-accent text-white font-medium rounded-full min-w-[3rem] text-center">
                {berufserfahrungJahre}
              </span>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>Keine Erfahrung</span>
              <span>10 Jahre</span>
              <span>20 Jahre</span>
              <span>30+ Jahre</span>
            </div>
          </div>
        </motion.div>

        {/* Verfügbarkeit und Arbeitszeit in einer Zeile */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" variants={itemVariants}>
          {/* Verfügbarkeit */}
          <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-accent" />
              Verfügbarkeit
            </h3>
            <div className="space-y-2">
              {verfuegbarkeitOptionen.map((option) => (
                <motion.div
                  key={option.value}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                    verfuegbarkeit === option.value 
                      ? 'border-accent/20 bg-accent/5 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleVerfuegbarkeitSelect(option.value as BewerberProfilType['verfuegbarkeit'])}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`mr-3 ${
                    verfuegbarkeit === option.value ? 'text-accent' : 'text-gray-400'
                  }`}>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center">
                      {verfuegbarkeit === option.value && (
                        <motion.div 
                          className="w-3 h-3 bg-accent rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        />
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{option.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Arbeitszeit */}
          <div className="p-5 bg-white rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-accent" />
              Arbeitszeitmodell
            </h3>
            <div className="space-y-2">
              {arbeitszeitOptionen.map((option) => (
                <motion.div
                  key={option.value}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                    arbeitszeit === option.value 
                      ? 'border-accent/20 bg-accent/5 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleArbeitszeitSelect(option.value as BewerberProfilType['arbeitszeit'])}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`mr-3 ${
                    arbeitszeit === option.value ? 'text-accent' : 'text-gray-400'
                  }`}>
                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center">
                      {arbeitszeit === option.value && (
                        <motion.div 
                          className="w-3 h-3 bg-accent rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        />
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{option.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Einsatzregion */}
        <motion.div
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <label htmlFor="einsatzregion" className="block text-lg font-medium text-gray-700 mb-3 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-accent" />
            Bevorzugte Einsatzregion
          </label>
          <div className="flex items-center relative">
            <input
              type="text"
              id="einsatzregion"
              value={einsatzregion}
              onChange={(e) => setEinsatzregion(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              placeholder="PLZ, Stadt oder Region"
            />
            <MapPin className="absolute left-3 h-5 w-5 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Geben Sie eine Stadt, PLZ oder Region an, in der Sie arbeiten möchten.
          </p>
        </motion.div>

        {error && (
          <motion.div 
            className="p-3 bg-red-50 border border-red-100 rounded-md text-red-500 text-sm mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {error}
          </motion.div>
        )}
        
        <motion.div 
          className="flex justify-between mt-8"
          variants={itemVariants}
        >
          <motion.button
            onClick={goToPreviousStep}
            className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
            whileHover={{ y: -2, boxShadow: '0 5px 15px -5px rgba(0, 0, 0, 0.1)' }}
            whileTap={{ scale: 0.98 }}
          >
            Zurück
          </motion.button>

          <motion.button
            onClick={handleContinue}
            className="py-2 px-8 bg-accent text-white rounded-md font-medium transition-all duration-200 hover:shadow-md"
            whileHover={{ y: -2, boxShadow: '0 5px 15px -5px rgba(0, 0, 0, 0.2)' }}
            whileTap={{ scale: 0.98 }}
          >
            Weiter
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
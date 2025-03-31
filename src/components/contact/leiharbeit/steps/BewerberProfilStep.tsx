"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Briefcase, MapPin, Clock, Calendar, Factory, Building2, HardHat, Computer, Utensils, ShoppingBag, HeartPulse, MoreHorizontal, Info } from 'lucide-react'

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
    icon: <Factory className="h-4 w-4" />
  },
  logistik: {
    title: "Logistik",
    icon: <ShoppingBag className="h-4 w-4" />
  },
  handwerk: {
    title: "Handwerk",
    icon: <HardHat className="h-4 w-4" />
  },
  buero: {
    title: "Büro/Verwaltung",
    icon: <Building2 className="h-4 w-4" />
  },
  it: {
    title: "IT",
    icon: <Computer className="h-4 w-4" />
  },
  gastronomie: {
    title: "Gastronomie",
    icon: <Utensils className="h-4 w-4" />
  },
  handel: {
    title: "Handel",
    icon: <ShoppingBag className="h-4 w-4" />
  },
  medizin: {
    title: "Medizin & Pflege",
    icon: <HeartPulse className="h-4 w-4" />
  },
  sonstiges: {
    title: "Sonstiges",
    icon: <MoreHorizontal className="h-4 w-4" />
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
          Ihr Bewerberprofil
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Geben Sie an, in welchem Bereich Sie arbeiten möchten und welche Qualifikationen Sie mitbringen.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Fachbereichauswahl */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Factory className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Ihr Fachbereich</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(fachbereichData).map(([key, data]) => (
              <div
                key={key}
                className={`flex items-center h-10 px-3 rounded-full border transition-all duration-200 cursor-pointer ${
                  fachbereich === key 
                    ? 'border-[#009FD8] bg-[#E6F4FA] shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleFachbereichSelect(key as BewerberProfilType['fachbereich'])}
                onMouseEnter={() => setHoveredOption(key)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <div className={`mr-2 ${
                  fachbereich === key 
                    ? 'text-[#009FD8]' 
                    : hoveredOption === key 
                      ? 'text-[#009FD8]' 
                      : 'text-gray-400'
                }`}>
                  {data.icon}
                </div>
                <h3 className="font-medium text-xs text-gray-700">{data.title}</h3>
              </div>
            ))}
          </div>

          {/* Eingabefeld für sonstigen Fachbereich */}
          {fachbereich === 'sonstiges' && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center mb-2 text-[#009FD8]">
                <Info className="w-4 h-4 mr-2" />
                <h3 className="font-medium text-sm">Weiterer Fachbereich</h3>
              </div>
              
              <input
                type="text"
                id="fachbereichSonstiges"
                value={fachbereichSonstiges}
                onChange={(e) => setFachbereichSonstiges(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
                placeholder="Ihr Fachbereich"
                autoFocus
              />
            </motion.div>
          )}
        </motion.div>

        {/* Qualifikationsniveau */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Briefcase className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Qualifikationsniveau</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {qualifikationsniveaus.map((niveau) => (
              <div
                key={niveau.value}
                className={`flex items-center h-10 px-3 rounded-full border transition-all duration-200 cursor-pointer ${
                  qualifikation === niveau.value 
                    ? 'border-[#009FD8] bg-[#E6F4FA]' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleQualifikationSelect(niveau.value as BewerberProfilType['qualifikation'])}
                onMouseEnter={() => setHoveredOption(niveau.value)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <div className={`flex justify-center items-center h-5 w-5 rounded-full mr-2 ${
                  qualifikation === niveau.value 
                    ? 'bg-[#009FD8]/10 text-[#009FD8]' 
                    : hoveredOption === niveau.value 
                      ? 'bg-gray-100 text-[#009FD8]' 
                      : 'bg-gray-100 text-gray-400'
                }`}>
                  <span className="text-xs font-bold">{niveau.value.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-xs font-medium text-gray-700">{niveau.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Berufserfahrung */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Clock className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Berufserfahrung in Jahren</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="range"
                id="berufserfahrungJahre"
                min="0"
                max="30"
                value={berufserfahrungJahre}
                onChange={(e) => setBerufserfahrungJahre(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#009FD8]"
              />
              <span className="ml-4 px-3 py-1.5 bg-[#009FD8] text-white text-xs font-medium rounded-full min-w-[2.5rem] text-center">
                {berufserfahrungJahre}
              </span>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>Keine</span>
              <span>10 Jahre</span>
              <span>20 Jahre</span>
              <span>30+</span>
            </div>
          </div>
        </motion.div>

        {/* Verfügbarkeit */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Calendar className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Verfügbarkeit</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {verfuegbarkeitOptionen.map((option) => (
              <div
                key={option.value}
                className={`flex items-center h-10 px-3 rounded-full border transition-all duration-200 cursor-pointer ${
                  verfuegbarkeit === option.value 
                    ? 'border-[#009FD8] bg-[#E6F4FA]' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleVerfuegbarkeitSelect(option.value as BewerberProfilType['verfuegbarkeit'])}
              >
                <div className={`flex justify-center items-center h-4 w-4 rounded-full mr-2 border ${
                  verfuegbarkeit === option.value 
                    ? 'border-[#009FD8] bg-[#009FD8]' 
                    : 'border-gray-300'
                }`}>
                  {verfuegbarkeit === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-xs font-medium text-gray-700">{option.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Arbeitszeit */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Clock className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Arbeitszeitmodell</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {arbeitszeitOptionen.map((option) => (
              <div
                key={option.value}
                className={`flex items-center h-10 px-3 rounded-full border transition-all duration-200 cursor-pointer ${
                  arbeitszeit === option.value 
                    ? 'border-[#009FD8] bg-[#E6F4FA]' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleArbeitszeitSelect(option.value as BewerberProfilType['arbeitszeit'])}
              >
                <div className={`flex justify-center items-center h-4 w-4 rounded-full mr-2 border ${
                  arbeitszeit === option.value 
                    ? 'border-[#009FD8] bg-[#009FD8]' 
                    : 'border-gray-300'
                }`}>
                  {arbeitszeit === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-xs font-medium text-gray-700">{option.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Einsatzregion */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <MapPin className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Bevorzugte Einsatzregion</h3>
          </div>
          
          <div className="flex items-center relative">
            <input
              type="text"
              id="einsatzregion"
              value={einsatzregion}
              onChange={(e) => setEinsatzregion(e.target.value)}
              className="w-full pl-8 py-2 px-3 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
              placeholder="PLZ, Stadt oder Region"
            />
            <MapPin className="absolute left-3 h-4 w-4 text-gray-400" />
          </div>
          <p className="text-xs text-gray-500 mt-2 pl-1">
            Geben Sie eine Stadt, PLZ oder Region an, in der Sie arbeiten möchten.
          </p>
        </motion.div>

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
            className="py-2.5 px-6 rounded-full text-xs font-medium bg-[#009FD8] text-white hover:bg-[#007CAB] transition-colors"
          >
            Weiter
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
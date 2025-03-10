"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Briefcase, Timer, Calendar, Factory, Building2, HardHat, Computer, Utensils, ShoppingBag, HeartPulse, MoreHorizontal, Zap } from 'lucide-react'

type UnternehmenBedarfStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Branchen Informationen
const branchenData = {
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

// Einsatzdauer Optionen
const einsatzdauerOptionen = [
  { value: 'kurzfristig', label: 'Kurzfristig (1-4 Wochen)' },
  { value: 'mittelfristig', label: 'Mittelfristig (1-6 Monate)' },
  { value: 'langfristig', label: 'Langfristig (> 6 Monate)' }
]

export const UnternehmenBedarfStep: React.FC<UnternehmenBedarfStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  // Initialisiere lokale Zustandsvariablen mit Werten aus formData
  const [branche, setBranche] = useState<FormData['unternehmenBedarf']['branche']>(
    formData.unternehmenBedarf?.branche || ''
  )
  const [brancheSonstiges, setBrancheSonstiges] = useState(
    formData.unternehmenBedarf?.brancheSonstiges || ''
  )
  const [anzahlMitarbeiter, setAnzahlMitarbeiter] = useState(
    formData.unternehmenBedarf?.anzahlMitarbeiter || 1
  )
  const [qualifikationsniveau, setQualifikationsniveau] = useState<FormData['unternehmenBedarf']['qualifikationsniveau']>(
    formData.unternehmenBedarf?.qualifikationsniveau || ''
  )
  const [einsatzdauer, setEinsatzdauer] = useState<FormData['unternehmenBedarf']['einsatzdauer']>(
    formData.unternehmenBedarf?.einsatzdauer || ''
  )
  const [einsatzbeginn, setEinsatzbeginn] = useState(
    formData.unternehmenBedarf?.einsatzbeginn || ''
  )
  const [expressAnfrage, setExpressAnfrage] = useState(
    formData.expressAnfrage || false
  )

  const [error, setError] = useState('')

  // Aktualisiere formData wenn sich lokale Zustände ändern
  useEffect(() => {
    updateFormData({
      unternehmenBedarf: {
        branche,
        brancheSonstiges: branche === 'sonstiges' ? brancheSonstiges : undefined,
        anzahlMitarbeiter,
        qualifikationsniveau,
        einsatzdauer,
        einsatzbeginn
      },
      expressAnfrage
    })
  }, [branche, brancheSonstiges, anzahlMitarbeiter, qualifikationsniveau, einsatzdauer, einsatzbeginn, expressAnfrage, updateFormData])

  // Handler für verschiedene Inputs
  const handleBrancheSelect = (selected: FormData['unternehmenBedarf']['branche']) => {
    setBranche(selected)
    setError('')
  }

  const handleQualifikationsniveauSelect = (selected: FormData['unternehmenBedarf']['qualifikationsniveau']) => {
    setQualifikationsniveau(selected)
    setError('')
  }

  const handleEinsatzdauerSelect = (selected: FormData['unternehmenBedarf']['einsatzdauer']) => {
    setEinsatzdauer(selected)
    setError('')
  }

  const handleExpressAnfrageToggle = () => {
    setExpressAnfrage(prev => !prev)
  }

  // Minimales Datum für den Einsatzbeginn (heute)
  const today = new Date().toISOString().split('T')[0]

  // Validierung und Weiterleitung zum nächsten Schritt
  const handleContinue = () => {
    if (!branche) {
      setError('Bitte wählen Sie eine Branche aus')
      return
    }
    
    if (branche === 'sonstiges' && !brancheSonstiges.trim()) {
      setError('Bitte geben Sie Ihre Branche an')
      return
    }
    
    if (!qualifikationsniveau) {
      setError('Bitte wählen Sie ein Qualifikationsniveau aus')
      return
    }
    
    if (!einsatzdauer) {
      setError('Bitte wählen Sie eine Einsatzdauer aus')
      return
    }
    
    if (!einsatzbeginn) {
      setError('Bitte geben Sie einen Einsatzbeginn an')
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
          Ihr Personalbedarf
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Geben Sie an, welche Mitarbeiter Sie benötigen und für welchen Zeitraum.
        </motion.p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {/* Express-Anfrage Option */}
        <motion.div
          className="mb-8 border-2 border-dashed border-accent/40 rounded-lg p-4 bg-accent/5 cursor-pointer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          onClick={handleExpressAnfrageToggle}
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="expressAnfrage"
                name="expressAnfrage"
                type="checkbox"
                checked={expressAnfrage}
                onChange={handleExpressAnfrageToggle}
                className="h-5 w-5 text-accent border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <div className="flex items-center gap-2">
                <label htmlFor="expressAnfrage" className="font-medium text-accent text-lg">
                  Dringender Personalbedarf
                </label>
                <Zap className="h-5 w-5 text-accent" />
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Aktivieren Sie diese Option für besonders dringende Personalanfragen. Wir garantieren Ihnen eine Rückmeldung innerhalb von 24 Stunden.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Branchenauswahl */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3">Branche</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
            {Object.entries(branchenData).map(([key, data]) => (
              <motion.div
                key={key}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${branche === key ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent/30'}`}
                onClick={() => handleBrancheSelect(key as FormData['unternehmenBedarf']['branche'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-3 ${branche === key ? 'text-accent' : 'text-gray-500'}`}>
                  {data.icon}
                </div>
                <span className="text-sm font-medium">{data.title}</span>
              </motion.div>
            ))}
          </div>

          {/* Eingabefeld für sonstige Branche */}
          {branche === 'sonstiges' && (
            <motion.div
              className="mt-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="brancheSonstiges" className="block text-sm font-medium text-gray-700 mb-1">
                Bitte spezifizieren Sie Ihre Branche:
              </label>
              <input
                type="text"
                id="brancheSonstiges"
                value={brancheSonstiges}
                onChange={(e) => setBrancheSonstiges(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                placeholder="Ihre Branche"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Anzahl Mitarbeiter */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <label htmlFor="anzahlMitarbeiter" className="block text-lg font-medium text-gray-700 mb-3">
            Anzahl benötigter Mitarbeiter
          </label>
          <div className="flex items-center">
            <input
              type="range"
              id="anzahlMitarbeiter"
              min="1"
              max="50"
              value={anzahlMitarbeiter}
              onChange={(e) => setAnzahlMitarbeiter(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <span className="ml-4 px-3 py-2 bg-accent text-white font-medium rounded-md min-w-[3rem] text-center">
              {anzahlMitarbeiter}
            </span>
          </div>
        </motion.div>

        {/* Qualifikationsniveau */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3">Qualifikationsniveau</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {qualifikationsniveaus.map((niveau) => (
              <motion.div
                key={niveau.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${qualifikationsniveau === niveau.value ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent/30'}`}
                onClick={() => handleQualifikationsniveauSelect(niveau.value as FormData['unternehmenBedarf']['qualifikationsniveau'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-3 ${qualifikationsniveau === niveau.value ? 'text-accent' : 'text-gray-500'}`}>
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{niveau.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Einsatzdauer */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3">Einsatzdauer</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {einsatzdauerOptionen.map((option) => (
              <motion.div
                key={option.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${einsatzdauer === option.value ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent/30'}`}
                onClick={() => handleEinsatzdauerSelect(option.value as FormData['unternehmenBedarf']['einsatzdauer'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-3 ${einsatzdauer === option.value ? 'text-accent' : 'text-gray-500'}`}>
                  <Timer className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">{option.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Einsatzbeginn */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <label htmlFor="einsatzbeginn" className="block text-lg font-medium text-gray-700 mb-3">
            Gewünschter Einsatzbeginn
          </label>
          <div className="flex items-center">
            <Calendar className="mr-3 text-gray-500" />
            <input
              type="date"
              id="einsatzbeginn"
              min={today}
              value={einsatzbeginn}
              onChange={(e) => setEinsatzbeginn(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
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
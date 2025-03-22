"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Briefcase, Timer, Calendar, Factory, Building2, HardHat, Computer, Utensils, ShoppingBag, HeartPulse, MoreHorizontal, Zap, Edit3, Clock, Building } from 'lucide-react'

type UnternehmenBedarfStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Definieren eines nicht-optionalen unternehmenBedarf-Typs für sichereren Zugriff
type RequiredUnternehmenBedarf = Required<NonNullable<FormData['unternehmenBedarf']>>;

// Branchen Informationen
const branchenData = {
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

// Einsatzdauer Optionen
const einsatzdauerOptionen = [
  { value: 'ein_tag', label: 'Ein Tag', icon: <Clock className="h-5 w-5" /> },
  { value: 'mehrere_tage', label: '2-5 Tage', icon: <Clock className="h-5 w-5" /> },
  { value: 'kurzfristig', label: 'Kurzfristig (1-4 Wochen)', icon: <Timer className="h-5 w-5" /> },
  { value: 'mittelfristig', label: 'Mittelfristig (1-6 Monate)', icon: <Timer className="h-5 w-5" /> },
  { value: 'langfristig', label: 'Langfristig (> 6 Monate)', icon: <Timer className="h-5 w-5" /> }
]

export const UnternehmenBedarfStep: React.FC<UnternehmenBedarfStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  // Standard-Werte für unternehmenBedarf definieren
  const defaultBedarf: RequiredUnternehmenBedarf = {
    branche: '',
    brancheSonstiges: '',
    anzahlMitarbeiter: 1,
    qualifikationsniveau: '',
    einsatzdauer: '',
    einsatzbeginn: ''
  };

  // Erstellen eines sicheren unternehmenBedarf-Objekts
  const currentBedarf = formData.unternehmenBedarf || defaultBedarf;
  
  // Direkte Initialisierung der lokalen Zustände mit Werten aus unternehmenBedarf
  const [branche, setBranche] = useState<RequiredUnternehmenBedarf['branche']>(
    currentBedarf.branche
  )
  const [brancheSonstiges, setBrancheSonstiges] = useState(
    currentBedarf.brancheSonstiges || ''
  )
  
  // Für Anzahl Mitarbeiter: entweder Zahl oder benutzerdefinierter Text
  const [anzahlMitarbeiter, setAnzahlMitarbeiter] = useState<number | string>(
    currentBedarf.anzahlMitarbeiter
  )
  const [customAnzahl, setCustomAnzahl] = useState(typeof currentBedarf.anzahlMitarbeiter === 'string')
  const [customAnzahlText, setCustomAnzahlText] = useState(
    typeof currentBedarf.anzahlMitarbeiter === 'string' ? currentBedarf.anzahlMitarbeiter.toString() : ''
  )
  
  const [qualifikationsniveau, setQualifikationsniveau] = useState<RequiredUnternehmenBedarf['qualifikationsniveau']>(
    currentBedarf.qualifikationsniveau
  )
  const [einsatzdauer, setEinsatzdauer] = useState<RequiredUnternehmenBedarf['einsatzdauer']>(
    currentBedarf.einsatzdauer
  )
  const [einsatzbeginn, setEinsatzbeginn] = useState(
    currentBedarf.einsatzbeginn
  )
  const [expressAnfrage, setExpressAnfrage] = useState(
    formData.expressAnfrage || false
  )

  const [error, setError] = useState('')
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  // Wenn customAnzahl aktiviert wird, Wechsel zwischen Slider und Textfeld
  useEffect(() => {
    if (customAnzahl) {
      if (typeof anzahlMitarbeiter === 'number') {
        setCustomAnzahlText(anzahlMitarbeiter.toString())
      }
    } else {
      if (typeof anzahlMitarbeiter === 'string' && !isNaN(Number(anzahlMitarbeiter))) {
        setAnzahlMitarbeiter(Number(anzahlMitarbeiter))
      }
    }
  }, [customAnzahl, anzahlMitarbeiter])

  // Aktualisiere formData wenn sich lokale Zustände ändern
  useEffect(() => {
    const finalAnzahlMitarbeiter = customAnzahl ? customAnzahlText : anzahlMitarbeiter
    
    updateFormData({
      unternehmenBedarf: {
        branche,
        brancheSonstiges: branche === 'sonstiges' ? brancheSonstiges : undefined,
        anzahlMitarbeiter: finalAnzahlMitarbeiter,
        qualifikationsniveau,
        einsatzdauer,
        einsatzbeginn
      },
      expressAnfrage
    })
  }, [branche, brancheSonstiges, anzahlMitarbeiter, customAnzahlText, customAnzahl, qualifikationsniveau, einsatzdauer, einsatzbeginn, expressAnfrage, updateFormData])

  // Handler für verschiedene Inputs
  const handleBrancheSelect = (selected: RequiredUnternehmenBedarf['branche']) => {
    setBranche(selected)
    setError('')
  }

  const handleQualifikationsniveauSelect = (selected: RequiredUnternehmenBedarf['qualifikationsniveau']) => {
    setQualifikationsniveau(selected)
    setError('')
  }

  const handleEinsatzdauerSelect = (selected: RequiredUnternehmenBedarf['einsatzdauer']) => {
    setEinsatzdauer(selected)
    setError('')
  }

  const handleExpressAnfrageToggle = () => {
    setExpressAnfrage(prev => !prev)
  }

  const toggleCustomAnzahl = () => {
    setCustomAnzahl(prev => !prev)
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
    
    if (customAnzahl && !customAnzahlText.trim()) {
      setError('Bitte geben Sie die Anzahl der benötigten Mitarbeiter an')
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
      {/* Header mit Icon */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, type: "spring" }}
          className="inline-block p-2 bg-accent/10 rounded-full mb-4"
        >
          <Building className="h-8 w-8 text-accent" />
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-medium text-gray-800 mb-3"
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
      
      <motion.div 
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Express-Anfrage Option */}
        <motion.div
          className="mb-8 border border-accent/30 rounded-lg p-5 bg-accent/5 cursor-pointer shadow-sm hover:shadow"
          variants={itemVariants}
          onClick={handleExpressAnfrageToggle}
          whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-start">
            <div className="flex items-center h-5 mt-1">
              <div className="relative">
                <input
                  id="expressAnfrage"
                  name="expressAnfrage"
                  type="checkbox"
                  checked={expressAnfrage}
                  onChange={handleExpressAnfrageToggle}
                  className="h-5 w-5 opacity-0 absolute z-10 cursor-pointer"
                />
                <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${expressAnfrage ? 'bg-accent' : 'bg-gray-300'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${expressAnfrage ? 'translate-x-4' : ''}`}></div>
                </div>
              </div>
            </div>
            <div className="ml-5">
              <div className="flex items-center gap-2">
                <label htmlFor="expressAnfrage" className="font-medium text-accent text-lg cursor-pointer">
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
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <Factory className="h-5 w-5 mr-2 text-accent" />
            Branche
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(branchenData).map(([key, data], index) => {
              // Werte für branche können nur bestimmte Strings sein - wir verwenden Type Assertion
              const brancheKey = key as RequiredUnternehmenBedarf['branche'];
              return (
                <motion.div
                  key={key}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                    branche === brancheKey 
                      ? 'border-accent/20 bg-accent/5 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleBrancheSelect(brancheKey)}
                  onMouseEnter={() => setHoveredOption(key)}
                  onMouseLeave={() => setHoveredOption(null)}
                  whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: 0.05 * index, duration: 0.3 }
                  }}
                >
                  <div className={`mr-3 ${
                    branche === brancheKey 
                      ? 'text-accent' 
                      : hoveredOption === key 
                        ? 'text-accent' 
                        : 'text-gray-400'
                  }`}>
                    {data.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{data.title}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Eingabefeld für sonstige Branche */}
          {branche === 'sonstiges' && (
            <motion.div
              className="mt-4"
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
                autoFocus
              />
            </motion.div>
          )}
        </motion.div>

        {/* Anzahl Mitarbeiter */}
        <motion.div
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <div className="flex justify-between items-center mb-3">
            <label htmlFor="anzahlMitarbeiter" className="block text-lg font-medium text-gray-700 flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-accent" />
              Anzahl benötigter Mitarbeiter
            </label>
            <button 
              onClick={toggleCustomAnzahl}
              className="flex items-center text-sm text-accent hover:text-accent-dark transition-colors"
            >
              <Edit3 className="h-4 w-4 mr-1" />
              {customAnzahl ? "Slider verwenden" : "Manuell eingeben"}
            </button>
          </div>
          
          {customAnzahl ? (
            <input
              type="text"
              value={customAnzahlText}
              onChange={(e) => setCustomAnzahlText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              placeholder="z.B. 10, 15-20, nach Bedarf"
            />
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="range"
                  id="anzahlMitarbeiter"
                  min="1"
                  max="50"
                  value={typeof anzahlMitarbeiter === 'number' ? anzahlMitarbeiter : 1}
                  onChange={(e) => setAnzahlMitarbeiter(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <span className="ml-4 px-4 py-2 bg-accent text-white font-medium rounded-full min-w-[3rem] text-center">
                  {typeof anzahlMitarbeiter === 'number' ? anzahlMitarbeiter : 1}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 px-1">
                <span>1</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
                <span>40</span>
                <span>50</span>
              </div>
            </div>
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
            {qualifikationsniveaus.map((niveau, index) => {
              const niveauValue = niveau.value as RequiredUnternehmenBedarf['qualifikationsniveau'];
              return (
                <motion.div
                  key={niveau.value}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                    qualifikationsniveau === niveauValue 
                      ? 'border-accent/20 bg-accent/5 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleQualifikationsniveauSelect(niveauValue)}
                  onMouseEnter={() => setHoveredOption(niveau.value)}
                  onMouseLeave={() => setHoveredOption(null)}
                  whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { delay: 0.1 * index, duration: 0.3 }
                  }}
                >
                  <div className={`flex justify-center items-center h-6 w-6 rounded-full mr-3 ${
                    qualifikationsniveau === niveauValue 
                      ? 'bg-accent/10 text-accent' 
                      : hoveredOption === niveau.value 
                        ? 'bg-gray-100 text-accent' 
                        : 'bg-gray-100 text-gray-400'
                  }`}>
                    <span className="text-xs font-bold">{niveau.value.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{niveau.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Einsatzdauer */}
        <motion.div
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <Timer className="h-5 w-5 mr-2 text-accent" />
            Einsatzdauer
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {einsatzdauerOptionen.map((option, index) => {
              const dauerValue = option.value as RequiredUnternehmenBedarf['einsatzdauer'];
              return (
                <motion.div
                  key={option.value}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                    einsatzdauer === dauerValue 
                      ? 'border-accent/20 bg-accent/5 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleEinsatzdauerSelect(dauerValue)}
                  onMouseEnter={() => setHoveredOption(option.value)}
                  onMouseLeave={() => setHoveredOption(null)}
                  whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.1 * index, duration: 0.3 }
                  }}
                >
                  <div className={`mr-3 ${
                    einsatzdauer === dauerValue 
                      ? 'text-accent' 
                      : hoveredOption === option.value 
                        ? 'text-accent' 
                        : 'text-gray-400'
                  }`}>
                    {option.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{option.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Einsatzbeginn */}
        <motion.div
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <label htmlFor="einsatzbeginn" className="block text-lg font-medium text-gray-700 mb-3 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-accent" />
            Gewünschter Einsatzbeginn
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="date"
              id="einsatzbeginn"
              min={today}
              value={einsatzbeginn}
              onChange={(e) => setEinsatzbeginn(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Geben Sie das Datum an, an dem der Mitarbeitereinsatz beginnen soll.
          </p>
        </motion.div>

        {error && (
          <motion.div 
            className="p-3 bg-red-50 border border-red-100 rounded-md text-red-500 text-sm mb-4 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
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
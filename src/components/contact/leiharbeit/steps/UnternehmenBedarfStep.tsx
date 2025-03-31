"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Briefcase, Timer, Calendar, Factory, Building2, HardHat, Computer, Utensils, ShoppingBag, HeartPulse, MoreHorizontal, Zap, Edit3, Clock } from 'lucide-react'

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

// Einsatzdauer Optionen
const einsatzdauerOptionen = [
  { value: 'ein_tag', label: 'Ein Tag', icon: <Clock className="h-4 w-4" /> },
  { value: 'mehrere_tage', label: '2-5 Tage', icon: <Clock className="h-4 w-4" /> },
  { value: 'kurzfristig', label: 'Kurzfristig (1-4 Wochen)', icon: <Timer className="h-4 w-4" /> },
  { value: 'mittelfristig', label: 'Mittelfristig (1-6 Monate)', icon: <Timer className="h-4 w-4" /> },
  { value: 'langfristig', label: 'Langfristig (> 6 Monate)', icon: <Timer className="h-4 w-4" /> }
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
          Ihr Personalbedarf
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Geben Sie an, welche Mitarbeiter Sie benötigen und für welchen Zeitraum.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Express-Anfrage Option */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Zap className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Dringlichkeit</h3>
          </div>
          
          <div className="flex items-center p-3 mb-2 rounded-full border border-[#009FD8]/20 bg-[#E6F4FA] cursor-pointer" onClick={handleExpressAnfrageToggle}>
            <div className="relative mr-3">
              <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-200 ease-in-out ${expressAnfrage ? 'bg-[#009FD8]' : 'bg-gray-300'}`}>
                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform duration-200 ease-in-out ${expressAnfrage ? 'translate-x-4' : ''}`}></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-800">Dringender Personalbedarf</span>
              <span className="text-xs text-gray-500">Garantierte Rückmeldung innerhalb von 24 Stunden</span>
            </div>
          </div>
        </motion.div>
        
        {/* Branchenauswahl */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Factory className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Branche</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Object.entries(branchenData).map(([key, data]) => {
              // Werte für branche können nur bestimmte Strings sein - wir verwenden Type Assertion
              const brancheKey = key as RequiredUnternehmenBedarf['branche'];
              return (
                <div
                  key={key}
                  className={`flex items-center h-10 px-3 rounded-full border transition-all duration-200 cursor-pointer ${
                    branche === brancheKey 
                      ? 'border-[#009FD8] bg-[#E6F4FA] shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleBrancheSelect(brancheKey)}
                  onMouseEnter={() => setHoveredOption(key)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <div className={`mr-2 ${
                    branche === brancheKey 
                      ? 'text-[#009FD8]' 
                      : hoveredOption === key 
                        ? 'text-[#009FD8]' 
                        : 'text-gray-400'
                  }`}>
                    {data.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700">{data.title}</span>
                </div>
              );
            })}
          </div>

          {/* Eingabefeld für sonstige Branche */}
          {branche === 'sonstiges' && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <input
                type="text"
                id="brancheSonstiges"
                value={brancheSonstiges}
                onChange={(e) => setBrancheSonstiges(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
                placeholder="Bitte spezifizieren Sie Ihre Branche"
                autoFocus
              />
            </motion.div>
          )}
        </motion.div>

        {/* Anzahl Mitarbeiter */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-[#009FD8]" />
              <h3 className="font-medium text-sm">Anzahl benötigter Mitarbeiter</h3>
            </div>
            <button 
              onClick={toggleCustomAnzahl}
              className="flex items-center text-xs text-[#009FD8] hover:underline"
            >
              <Edit3 className="h-3 w-3 mr-1" />
              {customAnzahl ? "Slider" : "Manuell"}
            </button>
          </div>
          
          {customAnzahl ? (
            <input
              type="text"
              value={customAnzahlText}
              onChange={(e) => setCustomAnzahlText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
              placeholder="z.B. 10, 15-20, nach Bedarf"
            />
          ) : (
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="range"
                  id="anzahlMitarbeiter"
                  min="1"
                  max="50"
                  value={typeof anzahlMitarbeiter === 'number' ? anzahlMitarbeiter : 1}
                  onChange={(e) => setAnzahlMitarbeiter(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#009FD8]"
                />
                <span className="ml-4 px-3 py-1 bg-[#E6F4FA] text-[#009FD8] font-medium rounded-full min-w-[2.5rem] text-center text-xs">
                  {typeof anzahlMitarbeiter === 'number' ? anzahlMitarbeiter : 1}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 px-1">
                <span>1</span>
                <span>50</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Qualifikationsniveau */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Briefcase className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Qualifikationsniveau</h3>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {qualifikationsniveaus.map((niveau) => {
              const niveauValue = niveau.value as RequiredUnternehmenBedarf['qualifikationsniveau'];
              return (
                <button
                  key={niveau.value}
                  type="button"
                  onClick={() => handleQualifikationsniveauSelect(niveauValue)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    qualifikationsniveau === niveauValue 
                      ? 'bg-[#009FD8] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {niveau.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Einsatzdauer */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Timer className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Einsatzdauer</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {einsatzdauerOptionen.map((option) => {
              const dauerValue = option.value as RequiredUnternehmenBedarf['einsatzdauer'];
              return (
                <div
                  key={option.value}
                  className={`flex items-center h-10 px-3 rounded-full border transition-all duration-200 cursor-pointer ${
                    einsatzdauer === dauerValue 
                      ? 'border-[#009FD8] bg-[#E6F4FA] shadow-sm' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => handleEinsatzdauerSelect(dauerValue)}
                  onMouseEnter={() => setHoveredOption(option.value)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  <div className={`mr-2 ${
                    einsatzdauer === dauerValue 
                      ? 'text-[#009FD8]' 
                      : hoveredOption === option.value 
                        ? 'text-[#009FD8]' 
                        : 'text-gray-400'
                  }`}>
                    {option.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700">{option.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Einsatzbeginn */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Calendar className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Gewünschter Einsatzbeginn</h3>
          </div>
          
          <input
            type="date"
            id="einsatzbeginn"
            min={today}
            value={einsatzbeginn}
            onChange={(e) => setEinsatzbeginn(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
          />
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
            className={`py-2.5 px-6 rounded-full text-xs font-medium transition-colors ${
              branche && (!customAnzahl || customAnzahlText) && qualifikationsniveau && einsatzdauer && einsatzbeginn
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
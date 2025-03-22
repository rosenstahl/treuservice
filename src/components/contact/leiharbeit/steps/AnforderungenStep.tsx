"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Clock, FileCheck, Car, Globe, Lightbulb, CheckCircle2, BookOpen, MessageSquareText } from 'lucide-react'

type AnforderungenStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Schichtbereitschafts-Optionen
const schichtbereitschaftsOptionen = [
  { value: 'nur_tag', label: 'Nur Tagschicht', icon: <Clock className="h-5 w-5" /> },
  { value: 'auch_nacht', label: 'Auch Nachtschicht', icon: <Clock className="h-5 w-5" /> },
  { value: 'auch_wochenende', label: 'Auch Wochenende', icon: <Clock className="h-5 w-5" /> },
  { value: 'voll_flexibel', label: 'Voll flexibel', icon: <Clock className="h-5 w-5" /> }
]

// Sprachniveaus
const sprachniveaus = [
  { value: 'keine', label: 'Keine' },
  { value: 'grundkenntnisse', label: 'Grundkenntnisse' },
  { value: 'gut', label: 'Gut' },
  { value: 'fliessend', label: 'Fließend' },
  { value: 'muttersprache', label: 'Muttersprache' }
]

export const AnforderungenStep: React.FC<AnforderungenStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const isUnternehmen = formData.anfrageTyp === 'unternehmen'
  const isBewerber = formData.anfrageTyp === 'bewerber'

  // Initialisiere lokale Zustandsvariablen mit Werten aus formData
  const [spezielleKenntnisse, setSpezielleKenntnisse] = useState(
    formData.anforderungen.spezielleKenntnisse || ''
  )
  const [schichtbereitschaft, setSchichtbereitschaft] = useState<FormData['anforderungen']['schichtbereitschaft']>(
    formData.anforderungen.schichtbereitschaft || ''
  )
  const [fuehrerschein, setFuehrerschein] = useState(
    formData.anforderungen.fuehrerschein || false
  )
  const [deutschKenntnisse, setDeutschKenntnisse] = useState<FormData['anforderungen']['sprachkenntnisse']['deutsch']>(
    formData.anforderungen.sprachkenntnisse.deutsch || ''
  )
  const [englischKenntnisse, setEnglischKenntnisse] = useState<FormData['anforderungen']['sprachkenntnisse']['englisch']>(
    formData.anforderungen.sprachkenntnisse.englisch || ''
  )
  const [weitereSprachkenntnisse, setWeitereSprachkenntnisse] = useState(
    formData.anforderungen.sprachkenntnisse.weitere || ''
  )
  // Bewerber-spezifische Felder
  const [zertifikate, setZertifikate] = useState(
    formData.anforderungen.zertifikate || ''
  )
  // Unternehmen-spezifische Felder
  const [sonstigeAnforderungen, setSonstigeAnforderungen] = useState(
    formData.anforderungen.sonstigeAnforderungen || ''
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

  // Aktualisiere formData wenn sich lokale Zustände ändern
  useEffect(() => {
    const updatedAnforderungen: FormData['anforderungen'] = {
      spezielleKenntnisse,
      schichtbereitschaft,
      fuehrerschein,
      sprachkenntnisse: {
        deutsch: deutschKenntnisse,
        englisch: englischKenntnisse,
        weitere: weitereSprachkenntnisse
      }
    }

    if (isBewerber) {
      updatedAnforderungen.zertifikate = zertifikate
    }

    if (isUnternehmen) {
      updatedAnforderungen.sonstigeAnforderungen = sonstigeAnforderungen
    }

    updateFormData({ anforderungen: updatedAnforderungen })
  }, [
    spezielleKenntnisse, schichtbereitschaft, fuehrerschein, 
    deutschKenntnisse, englischKenntnisse, weitereSprachkenntnisse,
    zertifikate, sonstigeAnforderungen, isBewerber, isUnternehmen, updateFormData
  ])

  // Handler für verschiedene Inputs
  const handleSchichtbereitschaftSelect = (selected: FormData['anforderungen']['schichtbereitschaft']) => {
    setSchichtbereitschaft(selected)
    setError('')
  }

  const handleFuehrerscheinToggle = () => {
    setFuehrerschein(prev => !prev)
  }

  const handleDeutschKenntnisseSelect = (selected: FormData['anforderungen']['sprachkenntnisse']['deutsch']) => {
    setDeutschKenntnisse(selected)
    setError('')
  }

  const handleEnglischKenntnisseSelect = (selected: FormData['anforderungen']['sprachkenntnisse']['englisch']) => {
    setEnglischKenntnisse(selected)
    setError('')
  }

  // Validierung und Weiterleitung zum nächsten Schritt
  const handleContinue = () => {
    if (!schichtbereitschaft) {
      setError('Bitte wählen Sie Ihre Schichtbereitschaft aus')
      return
    }
    
    if (!deutschKenntnisse) {
      setError('Bitte geben Sie Ihre Deutschkenntnisse an')
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
          <Lightbulb className="h-8 w-8 text-accent" />
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-medium text-gray-800 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {isUnternehmen ? 'Anforderungen an Mitarbeiter' : 'Ihre Fähigkeiten & Kenntnisse'}
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          {isUnternehmen 
            ? 'Geben Sie an, welche Anforderungen Sie an die Leiharbeiter stellen.' 
            : 'Geben Sie an, welche besonderen Fähigkeiten und Kenntnisse Sie mitbringen.'}
        </motion.p>
      </div>
      
      <motion.div 
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Spezielle Kenntnisse */}
        <motion.div
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <label htmlFor="spezielleKenntnisse" className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-accent" />
            {isUnternehmen ? 'Spezielle Kenntnisse/Fertigkeiten' : 'Besondere Kenntnisse/Fertigkeiten'}
          </label>
          <textarea
            id="spezielleKenntnisse"
            rows={3}
            value={spezielleKenntnisse}
            onChange={(e) => setSpezielleKenntnisse(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            placeholder={isUnternehmen 
              ? 'z.B. Spezielle Maschinenführerscheine, EDV-Kenntnisse, etc.'
              : 'z.B. Spezialisierung, besondere Fähigkeiten, etc.'}
          />
        </motion.div>

        {/* Bei Bewerbern: Zertifikate */}
        {isBewerber && (
          <motion.div
            className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
            variants={itemVariants}
          >
            <label htmlFor="zertifikate" className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <FileCheck className="h-5 w-5 mr-2 text-accent" />
              Zertifikate & Bescheinigungen
            </label>
            <textarea
              id="zertifikate"
              rows={2}
              value={zertifikate}
              onChange={(e) => setZertifikate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              placeholder="z.B. Staplerschein, Schweissprüfung, DEKRA-Zertifikate, etc."
            />
            <p className="text-xs text-gray-500 mt-2">Listen Sie hier alle relevanten Zertifikate oder Bescheinigungen auf, die Sie besitzen.</p>
          </motion.div>
        )}

        {/* Bei Unternehmen: Sonstige Anforderungen */}
        {isUnternehmen && (
          <motion.div
            className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
            variants={itemVariants}
          >
            <label htmlFor="sonstigeAnforderungen" className="block text-lg font-medium text-gray-700 mb-2 flex items-center">
              <MessageSquareText className="h-5 w-5 mr-2 text-accent" />
              Sonstige Anforderungen
            </label>
            <textarea
              id="sonstigeAnforderungen"
              rows={2}
              value={sonstigeAnforderungen}
              onChange={(e) => setSonstigeAnforderungen(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              placeholder="Weitere Anforderungen oder Besonderheiten für den Einsatz"
            />
          </motion.div>
        )}

        {/* Schichtbereitschaft */}
        <motion.div
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-accent" />
            {isUnternehmen ? 'Schichtsystem' : 'Schichtbereitschaft'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {schichtbereitschaftsOptionen.map((option) => (
              <motion.div
                key={option.value}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  schichtbereitschaft === option.value 
                    ? 'border-accent/20 bg-accent/5 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleSchichtbereitschaftSelect(option.value as FormData['anforderungen']['schichtbereitschaft'])}
                onMouseEnter={() => setHoveredOption(option.value)}
                onMouseLeave={() => setHoveredOption(null)}
                whileHover={{ y: -3, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-3 ${
                  schichtbereitschaft === option.value 
                    ? 'text-accent' 
                    : hoveredOption === option.value 
                      ? 'text-accent' 
                      : 'text-gray-400'
                }`}>
                  <Clock className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">{option.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Führerschein */}
        <motion.div
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <Car className="h-5 w-5 mr-3 text-accent" />
            <div className="flex items-center flex-1">
              <div className="relative">
                <input
                  id="fuehrerschein"
                  name="fuehrerschein"
                  type="checkbox"
                  checked={fuehrerschein}
                  onChange={handleFuehrerscheinToggle}
                  className="h-5 w-5 opacity-0 absolute z-10 cursor-pointer"
                />
                <div className={`w-10 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${fuehrerschein ? 'bg-accent' : 'bg-gray-300'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${fuehrerschein ? 'translate-x-4' : ''}`}></div>
                </div>
              </div>
              <label htmlFor="fuehrerschein" className="ml-3 block text-lg font-medium text-gray-700 cursor-pointer">
                {isUnternehmen ? 'Führerschein erforderlich' : 'Führerschein vorhanden'}
              </label>
            </div>
          </div>
        </motion.div>

        {/* Sprachkenntnisse */}
        <motion.div
          className="mb-6 p-5 bg-white rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-accent" />
            Sprachkenntnisse
          </h3>
          
          {/* Deutsch */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deutsch
            </label>
            <div className="flex flex-wrap gap-2">
              {sprachniveaus.map((niveau, index) => (
                <motion.button
                  key={niveau.value}
                  type="button"
                  onClick={() => handleDeutschKenntnisseSelect(niveau.value as FormData['anforderungen']['sprachkenntnisse']['deutsch'])}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    deutschKenntnisse === niveau.value 
                      ? 'bg-accent text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.1 * index, duration: 0.3 }
                  }}
                >
                  {niveau.label}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Englisch */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Englisch
            </label>
            <div className="flex flex-wrap gap-2">
              {sprachniveaus.map((niveau, index) => (
                <motion.button
                  key={niveau.value}
                  type="button"
                  onClick={() => handleEnglischKenntnisseSelect(niveau.value as FormData['anforderungen']['sprachkenntnisse']['englisch'])}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    englischKenntnisse === niveau.value 
                      ? 'bg-accent text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.1 * index + 0.5, duration: 0.3 }
                  }}
                >
                  {niveau.label}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Weitere Sprachen */}
          <div>
            <label htmlFor="weitereSprachkenntnisse" className="block text-sm font-medium text-gray-700 mb-2">
              Weitere Sprachen (optional)
            </label>
            <div className="relative">
              <input
                type="text"
                id="weitereSprachkenntnisse"
                value={weitereSprachkenntnisse}
                onChange={(e) => setWeitereSprachkenntnisse(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                placeholder="z.B. Französisch (gut), Spanisch (Grundkenntnisse)"
              />
              <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </motion.div>

        {error && (
          <motion.div 
            className="p-3 bg-red-50 border border-red-100 rounded-md text-red-500 text-sm mb-4 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <CheckCircle2 className="h-5 w-5 mr-2 text-red-500" />
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
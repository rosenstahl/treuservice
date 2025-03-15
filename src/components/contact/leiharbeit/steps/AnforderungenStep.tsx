"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Clock, FileCheck, Car, Globe } from 'lucide-react'

type AnforderungenStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Schichtbereitschafts-Optionen
const schichtbereitschaftsOptionen = [
  { value: 'nur_tag', label: 'Nur Tagschicht' },
  { value: 'auch_nacht', label: 'Auch Nachtschicht' },
  { value: 'auch_wochenende', label: 'Auch Wochenende' },
  { value: 'voll_flexibel', label: 'Voll flexibel' }
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
      <div className="text-center mb-6">
        <motion.h2 
          className="text-2xl font-medium text-gray-800 mb-2"
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
      
      <div className="max-w-3xl mx-auto">
        {/* Spezielle Kenntnisse */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <label htmlFor="spezielleKenntnisse" className="block text-lg font-medium text-gray-700 mb-2">
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
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className="flex items-start">
              <div className="mr-3 text-accent mt-1">
                <FileCheck className="h-6 w-6" />
              </div>
              <div>
                <label htmlFor="zertifikate" className="block text-lg font-medium text-gray-700 mb-2">
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
              </div>
            </div>
          </motion.div>
        )}

        {/* Bei Unternehmen: Sonstige Anforderungen */}
        {isUnternehmen && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <label htmlFor="sonstigeAnforderungen" className="block text-lg font-medium text-gray-700 mb-2">
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
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="flex items-start">
            <div className="mr-3 text-accent mt-1">
              <Clock className="h-6 w-6" />
            </div>
            <div className="w-full">
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                {isUnternehmen ? 'Schichtsystem' : 'Schichtbereitschaft'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {schichtbereitschaftsOptionen.map((option) => (
                  <motion.div
                    key={option.value}
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${schichtbereitschaft === option.value ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent/30'}`}
                    onClick={() => handleSchichtbereitschaftSelect(option.value as FormData['anforderungen']['schichtbereitschaft'])}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`mr-3 ${schichtbereitschaft === option.value ? 'text-accent' : 'text-gray-500'}`}>
                      <Clock className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">{option.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Führerschein */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <div className="flex items-start">
            <div className="mr-3 text-accent mt-1">
              <Car className="h-6 w-6" />
            </div>
            <div className="flex items-center">
              <input
                id="fuehrerschein"
                name="fuehrerschein"
                type="checkbox"
                checked={fuehrerschein}
                onChange={handleFuehrerscheinToggle}
                className="h-5 w-5 text-accent border-gray-300 rounded"
              />
              <label htmlFor="fuehrerschein" className="ml-3 block text-lg font-medium text-gray-700">
                {isUnternehmen ? 'Führerschein erforderlich' : 'Führerschein vorhanden'}
              </label>
            </div>
          </div>
        </motion.div>

        {/* Sprachkenntnisse */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <div className="flex items-start">
            <div className="mr-3 text-accent mt-1">
              <Globe className="h-6 w-6" />
            </div>
            <div className="w-full">
              <h3 className="text-lg font-medium text-gray-700 mb-3">
                Sprachkenntnisse
              </h3>
              
              {/* Deutsch */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deutsch
                </label>
                <div className="flex flex-wrap gap-2">
                  {sprachniveaus.map((niveau) => (
                    <button
                      key={niveau.value}
                      type="button"
                      onClick={() => handleDeutschKenntnisseSelect(niveau.value as FormData['anforderungen']['sprachkenntnisse']['deutsch'])}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${deutschKenntnisse === niveau.value ? 'bg-accent text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {niveau.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Englisch */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Englisch
                </label>
                <div className="flex flex-wrap gap-2">
                  {sprachniveaus.map((niveau) => (
                    <button
                      key={niveau.value}
                      type="button"
                      onClick={() => handleEnglischKenntnisseSelect(niveau.value as FormData['anforderungen']['sprachkenntnisse']['englisch'])}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${englischKenntnisse === niveau.value ? 'bg-accent text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {niveau.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Weitere Sprachen */}
              <div>
                <label htmlFor="weitereSprachkenntnisse" className="block text-sm font-medium text-gray-700 mb-2">
                  Weitere Sprachen (optional)
                </label>
                <input
                  type="text"
                  id="weitereSprachkenntnisse"
                  value={weitereSprachkenntnisse}
                  onChange={(e) => setWeitereSprachkenntnisse(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                  placeholder="z.B. Französisch (gut), Spanisch (Grundkenntnisse)"
                />
              </div>
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
"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Clock, FileCheck, Car, Globe, BookOpen, MessageSquareText, Square, CheckSquare } from 'lucide-react'

type AnforderungenStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Schichtbereitschafts-Optionen
const schichtbereitschaftsOptionen = [
  { value: 'nur_tag', label: 'Nur Tagschicht', icon: <Clock className="h-4 w-4" /> },
  { value: 'auch_nacht', label: 'Auch Nachtschicht', icon: <Clock className="h-4 w-4" /> },
  { value: 'auch_wochenende', label: 'Auch Wochenende', icon: <Clock className="h-4 w-4" /> },
  { value: 'voll_flexibel', label: 'Voll flexibel', icon: <Clock className="h-4 w-4" /> }
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
          {isUnternehmen ? 'Anforderungen an Mitarbeiter' : 'Ihre Fähigkeiten & Kenntnisse'}
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          {isUnternehmen 
            ? 'Geben Sie an, welche Anforderungen Sie an die Leiharbeiter stellen.' 
            : 'Geben Sie an, welche besonderen Fähigkeiten und Kenntnisse Sie mitbringen.'}
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Spezielle Kenntnisse */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <BookOpen className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">{isUnternehmen ? 'Spezielle Kenntnisse/Fertigkeiten' : 'Besondere Kenntnisse/Fertigkeiten'}</h3>
          </div>
          
          <textarea
            id="spezielleKenntnisse"
            rows={3}
            value={spezielleKenntnisse}
            onChange={(e) => setSpezielleKenntnisse(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
            placeholder={isUnternehmen 
              ? 'z.B. Spezielle Maschinenführerscheine, EDV-Kenntnisse, etc.'
              : 'z.B. Spezialisierung, besondere Fähigkeiten, etc.'}
          />
        </motion.div>

        {/* Bei Bewerbern: Zertifikate */}
        {isBewerber && (
          <motion.div
            className="mb-5 border-t border-gray-100 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <FileCheck className="w-4 h-4 mr-2 text-[#009FD8]" />
              <h3 className="font-medium text-sm">Zertifikate & Bescheinigungen</h3>
            </div>
            
            <textarea
              id="zertifikate"
              rows={2}
              value={zertifikate}
              onChange={(e) => setZertifikate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
              placeholder="z.B. Staplerschein, Schweissprüfung, DEKRA-Zertifikate, etc."
            />
            <p className="text-xs text-gray-500 mt-2">Listen Sie hier alle relevanten Zertifikate oder Bescheinigungen auf, die Sie besitzen.</p>
          </motion.div>
        )}

        {/* Bei Unternehmen: Sonstige Anforderungen */}
        {isUnternehmen && (
          <motion.div
            className="mb-5 border-t border-gray-100 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <MessageSquareText className="w-4 h-4 mr-2 text-[#009FD8]" />
              <h3 className="font-medium text-sm">Sonstige Anforderungen</h3>
            </div>
            
            <textarea
              id="sonstigeAnforderungen"
              rows={2}
              value={sonstigeAnforderungen}
              onChange={(e) => setSonstigeAnforderungen(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
              placeholder="Weitere Anforderungen oder Besonderheiten für den Einsatz"
            />
          </motion.div>
        )}

        {/* Schichtbereitschaft */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Clock className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">{isUnternehmen ? 'Schichtsystem' : 'Schichtbereitschaft'}</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {schichtbereitschaftsOptionen.map((option) => (
              <div
                key={option.value}
                className={`flex items-center h-10 px-3 rounded-full border transition-all duration-200 cursor-pointer ${
                  schichtbereitschaft === option.value 
                    ? 'border-[#009FD8] bg-[#E6F4FA] shadow-sm' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleSchichtbereitschaftSelect(option.value as FormData['anforderungen']['schichtbereitschaft'])}
                onMouseEnter={() => setHoveredOption(option.value)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <div className={`mr-3 ${
                  schichtbereitschaft === option.value 
                    ? 'text-[#009FD8]' 
                    : hoveredOption === option.value 
                      ? 'text-[#009FD8]' 
                      : 'text-gray-400'
                }`}>
                  {option.icon}
                </div>
                <span className="text-xs font-medium text-gray-700">{option.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Führerschein */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Car className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">{isUnternehmen ? 'Führerschein erforderlich' : 'Führerschein vorhanden'}</h3>
          </div>
          
          <div className="flex items-center">
            <div className={`mr-2 ${fuehrerschein ? 'text-[#009FD8]' : 'text-gray-300'}`}>
              {fuehrerschein ? (
                <CheckSquare className="h-4 w-4" onClick={handleFuehrerscheinToggle} />
              ) : (
                <Square className="h-4 w-4" onClick={handleFuehrerscheinToggle} />
              )}
            </div>
            <label htmlFor="fuehrerschein" className="text-xs text-gray-700 cursor-pointer" onClick={handleFuehrerscheinToggle}>
              {isUnternehmen ? 'Führerschein wird für diesen Einsatz benötigt' : 'Ich besitze einen gültigen Führerschein'}
            </label>
          </div>
        </motion.div>

        {/* Sprachkenntnisse */}
        <motion.div
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Globe className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Sprachkenntnisse</h3>
          </div>
          
          {/* Deutsch */}
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-700 mb-2">Deutsch</p>
            <div className="flex flex-wrap gap-2">
              {sprachniveaus.map((niveau) => (
                <button
                  key={niveau.value}
                  type="button"
                  onClick={() => handleDeutschKenntnisseSelect(niveau.value as FormData['anforderungen']['sprachkenntnisse']['deutsch'])}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    deutschKenntnisse === niveau.value 
                      ? 'bg-[#009FD8] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {niveau.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Englisch */}
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-700 mb-2">Englisch</p>
            <div className="flex flex-wrap gap-2">
              {sprachniveaus.map((niveau) => (
                <button
                  key={niveau.value}
                  type="button"
                  onClick={() => handleEnglischKenntnisseSelect(niveau.value as FormData['anforderungen']['sprachkenntnisse']['englisch'])}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    englischKenntnisse === niveau.value 
                      ? 'bg-[#009FD8] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {niveau.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Weitere Sprachen */}
          <div>
            <p className="text-xs font-medium text-gray-700 mb-2">Weitere Sprachen (optional)</p>
            <input
              type="text"
              id="weitereSprachkenntnisse"
              value={weitereSprachkenntnisse}
              onChange={(e) => setWeitereSprachkenntnisse(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
              placeholder="z.B. Französisch (gut), Spanisch (Grundkenntnisse)"
            />
          </div>
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
          transition={{ delay: 0.4, duration: 0.2 }}
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
              schichtbereitschaft && deutschKenntnisse
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
"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SecurityWizard'
import { Calendar, Clock, Sun, Moon, CalendarDays, CalendarOff, Info } from 'lucide-react'

type ZeitlicheInfosStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Info zu Dauertypen
const dauerTypes: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
  einmalig: {
    title: "Einmalig",
    description: "Einmaliger Einsatz an einem bestimmten Tag",
    icon: <Calendar className="h-6 w-6" />
  },
  kurzzeitig: {
    title: "Kurzzeitig",
    description: "Befristeter Einsatz für wenige Tage bis einige Wochen",
    icon: <CalendarDays className="h-6 w-6" />
  },
  langfristig: {
    title: "Langfristig",
    description: "Längerfristiger Einsatz für mehrere Monate bis ein Jahr",
    icon: <CalendarDays className="h-6 w-6" />
  },
  unbefristet: {
    title: "Unbefristet",
    description: "Dauerhafter Einsatz ohne festgelegtes Ende",
    icon: <CalendarOff className="h-6 w-6" />
  }
}

// Info zu Wiederholungstypen
const wiederholungTypes: Record<string, { title: string; description: string }> = {
  keine: {
    title: "Keine",
    description: "Kein wiederkehrender Einsatz"
  },
  taeglich: {
    title: "Täglich",
    description: "Jeden Tag (Montag bis Freitag)"
  },
  woechentlich: {
    title: "Wöchentlich",
    description: "An bestimmten Wochentagen"
  },
  monatlich: {
    title: "Monatlich",
    description: "An bestimmten Tagen im Monat"
  }
}

export const ZeitlicheInfosStep: React.FC<ZeitlicheInfosStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  // Zustandsvariablen
  const [dauerTyp, setDauerTyp] = useState<FormData['zeitlicheInfos']['dauerTyp']>(formData.zeitlicheInfos.dauerTyp || '')
  const [beginnDatum, setBeginnDatum] = useState(formData.zeitlicheInfos.beginnDatum || '')
  const [endeDatum, setEndeDatum] = useState(formData.zeitlicheInfos.endeDatum || '')
  const [wiederholung, setWiederholung] = useState<FormData['zeitlicheInfos']['wiederholung']>(formData.zeitlicheInfos.wiederholung || 'keine')
  const [dienste, setDienste] = useState(formData.zeitlicheInfos.dienste)
  const [anmerkungen, setAnmerkungen] = useState(formData.zeitlicheInfos.anmerkungen || '')
  const [error, setError] = useState('')

  // Minimum-Daten für Datums-Inputs
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const tomorrowISOString = tomorrow.toISOString().split('T')[0]

  // Aktualisiere formData, wenn sich lokale Zustandsvariablen ändern
  useEffect(() => {
    updateFormData({
      zeitlicheInfos: {
        dauerTyp,
        beginnDatum,
        endeDatum: dauerTyp !== 'einmalig' ? endeDatum : undefined,
        wiederholung,
        dienste,
        anmerkungen
      }
    })
  }, [dauerTyp, beginnDatum, endeDatum, wiederholung, dienste, anmerkungen, updateFormData])

  // Handler für Dauertyp-Auswahl
  const handleDauerTypSelect = (type: FormData['zeitlicheInfos']['dauerTyp']) => {
    setDauerTyp(type)
    setError('')
    
    // Wenn "einmalig" ausgewählt wird, setze Wiederholung auf "keine"
    if (type === 'einmalig') {
      setWiederholung('keine')
      setEndeDatum('')
    }
    // Wenn endeDatum leer ist und nicht einmalig, setze ein Standardenddatum
    else if (!endeDatum && type !== 'unbefristet') {
      const endDate = new Date(beginnDatum || today)
      if (type === 'kurzzeitig') {
        endDate.setDate(endDate.getDate() + 14) // 2 Wochen
      } else if (type === 'langfristig') {
        endDate.setMonth(endDate.getMonth() + 3) // 3 Monate
      }
      setEndeDatum(endDate.toISOString().split('T')[0])
    }
  }

  // Handler für die Wiederholungs-Auswahl
  const handleWiederholungSelect = (type: FormData['zeitlicheInfos']['wiederholung']) => {
    setWiederholung(type)
    setError('')
  }

  // Handler für Dienst-Checkboxen
  const handleDienstChange = (name: keyof FormData['zeitlicheInfos']['dienste'], checked: boolean) => {
    const updatedDienste = {
      ...dienste,
      [name]: checked
    }
    setDienste(updatedDienste)
  }

  // Validierung und Weiterleitung
  const handleContinue = () => {
    if (!dauerTyp) {
      setError('Bitte wählen Sie die Einsatzdauer aus')
      return
    }
    
    if (!beginnDatum) {
      setError('Bitte geben Sie ein Startdatum an')
      return
    }
    
    if (dauerTyp !== 'einmalig' && dauerTyp !== 'unbefristet' && !endeDatum) {
      setError('Bitte geben Sie ein Enddatum an')
      return
    }
    
    if (endeDatum && new Date(endeDatum) <= new Date(beginnDatum)) {
      setError('Das Enddatum muss nach dem Startdatum liegen')
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
          Zeitliche Details
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Legen Sie fest, wann und wie lange der Sicherheitsdienst benötigt wird.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {/* Dauer des Einsatzes */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-accent" />
              Dauer des Einsatzes
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(dauerTypes).map(([type, info]) => (
                <div
                  key={type}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${dauerTyp === type ? 'border-accent bg-accent/5' : 'border-gray-200 hover:border-accent/30'}`}
                  onClick={() => handleDauerTypSelect(type as FormData['zeitlicheInfos']['dauerTyp'])}
                >
                  <div className={`flex items-center ${dauerTyp === type ? 'text-accent' : 'text-gray-700'}`}>
                    <span className="mr-2">{info.icon}</span>
                    <span className="font-medium">{info.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{info.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Zeitraum auswählen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="beginnDatum" className="block text-sm font-medium text-gray-700 mb-1">
                Startdatum *
              </label>
              <input
                type="date"
                id="beginnDatum"
                name="beginnDatum"
                value={beginnDatum}
                onChange={(e) => setBeginnDatum(e.target.value)}
                min={today}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                required
              />
            </div>
            
            {dauerTyp !== 'einmalig' && dauerTyp !== 'unbefristet' && (
              <div>
                <label htmlFor="endeDatum" className="block text-sm font-medium text-gray-700 mb-1">
                  Enddatum *
                </label>
                <input
                  type="date"
                  id="endeDatum"
                  name="endeDatum"
                  value={endeDatum}
                  onChange={(e) => setEndeDatum(e.target.value)}
                  min={beginnDatum || tomorrowISOString}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                  required
                />
              </div>
            )}
          </div>

          {/* Wiederholung, wenn nicht einmalig */}
          {dauerTyp !== 'einmalig' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <CalendarDays className="h-4 w-4 mr-2 text-accent" />
                Wiederholung
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {Object.entries(wiederholungTypes).map(([type, info]) => (
                  <div
                    key={type}
                    className={`px-4 py-2 rounded-md cursor-pointer transition-all ${wiederholung === type ? 'bg-accent text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    onClick={() => handleWiederholungSelect(type as FormData['zeitlicheInfos']['wiederholung'])}
                  >
                    <span className="text-sm font-medium">{info.title}</span>
                  </div>
                ))}
              </div>
              
              <p className="mt-2 text-xs text-gray-500">
                {wiederholung && wiederholungTypes[wiederholung] ? wiederholungTypes[wiederholung].description : ''}
              </p>
            </div>
          )}

          {/* Dienstzeiten */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-accent" />
              Dienstzeiten
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                <input
                  id="tagesdienst"
                  name="tagesdienst"
                  type="checkbox"
                  checked={dienste.tagesdienst}
                  onChange={(e) => handleDienstChange('tagesdienst', e.target.checked)}
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <div>
                  <label htmlFor="tagesdienst" className="flex items-center text-sm font-medium text-gray-700">
                    <Sun className="h-4 w-4 mr-1 text-yellow-500" /> Tagesdienst
                  </label>
                  <p className="text-xs text-gray-500">Zwischen 6:00 und 22:00 Uhr</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                <input
                  id="nachtdienst"
                  name="nachtdienst"
                  type="checkbox"
                  checked={dienste.nachtdienst}
                  onChange={(e) => handleDienstChange('nachtdienst', e.target.checked)}
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <div>
                  <label htmlFor="nachtdienst" className="flex items-center text-sm font-medium text-gray-700">
                    <Moon className="h-4 w-4 mr-1 text-blue-600" /> Nachtdienst
                  </label>
                  <p className="text-xs text-gray-500">Zwischen 22:00 und 6:00 Uhr</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                <input
                  id="wochenenddienst"
                  name="wochenenddienst"
                  type="checkbox"
                  checked={dienste.wochenenddienst}
                  onChange={(e) => handleDienstChange('wochenenddienst', e.target.checked)}
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <div>
                  <label htmlFor="wochenenddienst" className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4 mr-1 text-green-600" /> Wochenenddienst
                  </label>
                  <p className="text-xs text-gray-500">Samstag und Sonntag</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200">
                <input
                  id="feiertagsdienst"
                  name="feiertagsdienst"
                  type="checkbox"
                  checked={dienste.feiertagsdienst}
                  onChange={(e) => handleDienstChange('feiertagsdienst', e.target.checked)}
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <div>
                  <label htmlFor="feiertagsdienst" className="flex items-center text-sm font-medium text-gray-700">
                    <Calendar className="h-4 w-4 mr-1 text-red-600" /> Feiertagsdienst
                  </label>
                  <p className="text-xs text-gray-500">An gesetzlichen Feiertagen</p>
                </div>
              </div>
            </div>
            
            {!dienste.tagesdienst && !dienste.nachtdienst && !dienste.wochenenddienst && !dienste.feiertagsdienst && (
              <p className="mt-2 text-sm text-yellow-600 flex items-center">
                <Info className="h-4 w-4 mr-1" />
                Bitte wählen Sie mindestens eine Dienstzeit aus.
              </p>
            )}
          </div>

          {/* Anmerkungen */}
          <div>
            <label htmlFor="anmerkungen" className="block text-sm font-medium text-gray-700 mb-1">
              Anmerkungen zu Ihren Zeitvorgaben (optional)
            </label>
            <textarea
              id="anmerkungen"
              name="anmerkungen"
              rows={3}
              value={anmerkungen}
              onChange={(e) => setAnmerkungen(e.target.value)}
              placeholder="Besonderheiten zu Ihren zeitlichen Anforderungen..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            />
          </div>
        </motion.div>

        {error && (
          <motion.p 
            className="text-red-500 text-sm text-center mt-6"
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
          transition={{ delay: 0.4, duration: 0.3 }}
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
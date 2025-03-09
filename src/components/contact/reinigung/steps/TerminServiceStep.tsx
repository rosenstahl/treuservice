"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../ReinigungWizard'
import { Clock, Zap, CalendarCheck, Calendar, CalendarDays, CalendarClock, Pencil } from 'lucide-react'

type TerminServiceStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Servicetyp Informationen
const serviceTypes = {
  standard: {
    title: "Standard-Service",
    description: "Normale Bearbeitung innerhalb von 3 Werktagen",
    icon: <Clock className="h-8 w-8" />,
    priceInfo: "Standardpreis"
  },
  express: {
    title: "Express-Service",
    description: "Bevorzugte Bearbeitung innerhalb von 24 Stunden",
    icon: <CalendarCheck className="h-8 w-8" />,
    priceInfo: "+25% Aufschlag"
  },
  sofort: {
    title: "Sofort-Service",
    description: "Sofortige Beauftragung & schnellstmögliche Durchführung",
    icon: <Zap className="h-8 w-8" />,
    priceInfo: "+50% Aufschlag"
  }
}

// Regelmäßigkeit Informationen
const frequencyTypes = {
  einmalig: {
    title: "Einmalig",
    description: "Einmalige Reinigung zum gewünschten Termin",
    icon: <Calendar className="h-6 w-6" />
  },
  taeglich: {
    title: "Täglich",
    description: "Tägliche Reinigung (Montag bis Freitag)",
    icon: <CalendarDays className="h-6 w-6" />,
    discount: "30% Rabatt"
  },
  woechentlich: {
    title: "Wöchentlich",
    description: "Regelmäßige Reinigung einmal pro Woche",
    icon: <CalendarDays className="h-6 w-6" />,
    discount: "20% Rabatt"
  },
  monatlich: {
    title: "Monatlich",
    description: "Regelmäßige Reinigung einmal pro Monat",
    icon: <CalendarDays className="h-6 w-6" />,
    discount: "10% Rabatt"
  },
  individuell: {
    title: "Individuell",
    description: "Benutzerdefinierter Reinigungsrhythmus",
    icon: <Pencil className="h-6 w-6" />
  }
}

export const TerminServiceStep: React.FC<TerminServiceStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  // Zustandsvariablen für die Formulardaten
  const [servicetyp, setServicetyp] = useState<FormData['terminService']['servicetyp']>(formData.terminService.servicetyp)
  const [regelmassigkeit, setRegelmassigkeit] = useState<FormData['terminService']['regelmassigkeit']>(formData.terminService.regelmassigkeit || 'einmalig')
  const [individuelleAngabe, setIndividuelleAngabe] = useState(formData.terminService.individuelleAngabe || '')
  const [wunschtermin, setWunschtermin] = useState(formData.terminService.wunschtermin || '')
  const [wunschzeit, setWunschzeit] = useState(formData.terminService.wunschzeit || '')
  const [anmerkungen, setAnmerkungen] = useState(formData.terminService.anmerkungen || '')
  const [error, setError] = useState('')

  // Minimales Datum für den Termin-Picker (heute)
  const today = new Date().toISOString().split('T')[0]
  // Für Express-Service: Morgen als minimales Datum, für Sofort-Service: Heute
  const minDate = servicetyp === 'standard' ? getNextWorkingDay() : servicetyp === 'express' ? getTomorrow() : today

  // Morgen erhalten
  function getTomorrow() {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Nächsten Werktag erhalten
  function getNextWorkingDay() {
    const date = new Date()
    let days = 1
    
    // Wenn heute Freitag (5) ist, setze auf Montag (+3 Tage)
    // Wenn heute Samstag (6) ist, setze auf Montag (+2 Tage)
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 5) days = 3
    else if (dayOfWeek === 6) days = 2
    
    date.setDate(date.getDate() + days)
    return date.toISOString().split('T')[0]
  }

  // Synchronisiere Formular-Zustand mit globalem Formular
  useEffect(() => {
    updateFormData({
      terminService: {
        servicetyp,
        regelmassigkeit,
        individuelleAngabe: regelmassigkeit === 'individuell' ? individuelleAngabe : undefined,
        wunschtermin,
        wunschzeit,
        anmerkungen
      }
    })
  }, [servicetyp, regelmassigkeit, individuelleAngabe, wunschtermin, wunschzeit, anmerkungen, updateFormData])

  // Handler für die Auswahl des Servicetyps
  const handleServicetypSelect = (type: FormData['terminService']['servicetyp']) => {
    setServicetyp(type)
    setError('')
    
    // Wenn "sofort" gewählt wird, setze das Datum auf heute
    if (type === 'sofort') {
      setWunschtermin(today)
    }
    // Wenn "express" gewählt wird, setze mindestens auf morgen
    else if (type === 'express' && (!wunschtermin || wunschtermin < getTomorrow())) {
      setWunschtermin(getTomorrow())
    }
    // Wenn "standard" gewählt wird, setze mindestens auf den nächsten Werktag
    else if (type === 'standard' && (!wunschtermin || wunschtermin < getNextWorkingDay())) {
      setWunschtermin(getNextWorkingDay())
    }
  }

  // Handler für die Auswahl der Regelmäßigkeit
  const handleRegelmassigkeitSelect = (type: FormData['terminService']['regelmassigkeit']) => {
    setRegelmassigkeit(type)
    setError('')
  }

  // Handler für Form-Inputs
  const handleIndividuelleAngabeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIndividuelleAngabe(e.target.value)
  }

  const handleWunschtermimChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWunschtermin(e.target.value)
  }

  const handleWunschzeitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWunschzeit(e.target.value)
  }

  const handleAnmerkungenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnmerkungen(e.target.value)
  }

  // Validierung und Weiterleitung zum nächsten Schritt
  const handleContinue = () => {
    if (!regelmassigkeit) {
      setError('Bitte wählen Sie die gewünschte Regelmäßigkeit')
      return
    }
    
    if (regelmassigkeit === 'individuell' && !individuelleAngabe.trim()) {
      setError('Bitte geben Sie den gewünschten Rhythmus an')
      return
    }
    
    if (!wunschtermin) {
      setError('Bitte wählen Sie einen Wunschtermin')
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
          Wann soll gereinigt werden?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie den Zeitpunkt und die Häufigkeit der Reinigung.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Servicetyp Auswahl */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-3">1. Service-Typ auswählen</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(serviceTypes).map(([type, info]) => (
              <motion.div
                key={type}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all cursor-pointer 
                  ${servicetyp === type ? 'border-accent bg-accent/5 shadow-md' : 'border-gray-200 hover:border-accent/50'}`}
                onClick={() => handleServicetypSelect(type as FormData['terminService']['servicetyp'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`p-2 rounded-full mb-2 ${servicetyp === type ? 'text-accent' : 'text-gray-500'}`}>
                  {info.icon}
                </div>
                <h4 className="font-medium text-gray-800 text-sm text-center mb-1">{info.title}</h4>
                <p className="text-xs text-gray-500 text-center mb-2">
                  {info.description}
                </p>
                <span className={`text-xs px-2 py-1 rounded ${servicetyp === type ? 'bg-accent/20 text-accent' : 'bg-gray-100 text-gray-500'}`}>
                  {info.priceInfo}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Regelmäßigkeit Auswahl */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-3">2. Regelmäßigkeit festlegen</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(frequencyTypes).map(([type, info]) => (
              <motion.div
                key={type}
                className={`flex flex-col items-center p-3 rounded-lg border transition-all cursor-pointer 
                  ${regelmassigkeit === type ? 'border-accent bg-accent/5 shadow-sm' : 'border-gray-200 hover:border-accent/30'}`}
                onClick={() => handleRegelmassigkeitSelect(type as FormData['terminService']['regelmassigkeit'])}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className={`p-1.5 rounded-full mb-1 ${regelmassigkeit === type ? 'text-accent' : 'text-gray-500'}`}>
                  {info.icon}
                </div>
                <h4 className="font-medium text-gray-800 text-xs text-center">{info.title}</h4>
                <p className="text-xs text-gray-500 text-center line-clamp-2 h-8 mt-1">
                  {info.description}
                </p>
                {info.discount && (
                  <span className="text-xs text-green-600 mt-1">
                    {info.discount}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Individuelle Angabe */}
          {regelmassigkeit === 'individuell' && (
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="individuelleAngabe" className="block text-sm font-medium text-gray-700 mb-1">
                Bitte beschreiben Sie den gewünschten Rhythmus
              </label>
              <input
                type="text"
                id="individuelleAngabe"
                name="individuelleAngabe"
                value={individuelleAngabe}
                onChange={handleIndividuelleAngabeChange}
                placeholder="z.B. alle 2 Wochen, jeden ersten Montag im Monat, etc."
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                autoFocus
              />
            </motion.div>
          )}
        </motion.div>
        
        {/* Terminauswahl */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h3 className="text-lg font-medium text-gray-800 mb-3">3. Wunschtermin angeben</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="wunschtermin" className="block text-sm font-medium text-gray-700 mb-1">
                Datum
              </label>
              <input
                type="date"
                id="wunschtermin"
                name="wunschtermin"
                min={minDate}
                value={wunschtermin}
                onChange={handleWunschtermimChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                required
                disabled={servicetyp === 'sofort'} // Bei Sofort-Service ist das Datum fixiert auf heute
              />
              {servicetyp === 'sofort' && (
                <p className="text-xs text-accent mt-1">Bei Sofort-Service wird die Reinigung heute durchgeführt</p>
              )}
            </div>
            
            <div>
              <label htmlFor="wunschzeit" className="block text-sm font-medium text-gray-700 mb-1">
                Uhrzeit (optional)
              </label>
              <input
                type="time"
                id="wunschzeit"
                name="wunschzeit"
                value={wunschzeit}
                onChange={handleWunschzeitChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Anmerkungen */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <label htmlFor="anmerkungen" className="block text-sm font-medium text-gray-700 mb-1">
            Anmerkungen zum Termin (optional)
          </label>
          <textarea
            id="anmerkungen"
            name="anmerkungen"
            rows={3}
            value={anmerkungen}
            onChange={handleAnmerkungenChange}
            placeholder="Besonderheiten zum Termin oder zur Durchführung"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
          />
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
          transition={{ delay: 0.7, duration: 0.3 }}
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
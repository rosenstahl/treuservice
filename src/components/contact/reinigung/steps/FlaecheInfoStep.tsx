"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../ReinigungWizard'

type FlaecheInfoStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Füllgrad-Beschreibungen
const fuellgradDescriptions = {
  leer: "Leere Räume mit wenigen Gegenständen",
  wenig: "Teilweise möblierte Räume, wenig zu reinigen",
  mittel: "Normal möblierte Räume",
  voll: "Stark gefüllte Räume, viele Hindernisse"
}

export const FlaecheInfoStep: React.FC<FlaecheInfoStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [flaeche, setFlaeche] = useState(formData.flaecheInfo.flaeche || 0)
  const [raumanzahl, setRaumanzahl] = useState(formData.flaecheInfo.raumanzahl || 0)
  const [error, setError] = useState('')
  
  // Dynamische Felder basierend auf der gewählten Reinigungsart und dem Objekttyp
  const isFensterreinigung = formData.reinigungsart.hauptkategorie === 'glas_fassade'
  const isInnenreinigung = [
    'buero', 'wohnhaus', 'hotel', 'krankenhaus', 'schule', 'gewerbe'
  ].includes(formData.objektTyp.typ)

  // Berechne die Fläche automatisch basierend auf der Raumanzahl, falls noch nicht gesetzt
  useEffect(() => {
    if (flaeche === 0 && raumanzahl > 0) {
      // Durchschnittliche Raumgröße von 15m²
      setFlaeche(raumanzahl * 15)
    }
  }, [flaeche, raumanzahl])

  const handleFlaecheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setFlaeche(isNaN(value) ? 0 : value)
    updateFormData({
      flaecheInfo: {
        ...formData.flaecheInfo,
        flaeche: isNaN(value) ? 0 : value
      }
    })
  }

  const handleRaumanzahlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    const newRaumanzahl = isNaN(value) ? 1 : Math.max(1, value)
    setRaumanzahl(newRaumanzahl)
    updateFormData({
      flaecheInfo: {
        ...formData.flaecheInfo,
        raumanzahl: newRaumanzahl
      }
    })
  }

  const handleSpezialDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateFormData({
      flaecheInfo: {
        ...formData.flaecheInfo,
        spezialDetails: e.target.value
      }
    })
  }

  const handleContinue = () => {
    // Einfache Validierung
    if (flaeche <= 0) {
      setError('Bitte geben Sie eine gültige Fläche an')
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
          Umfang und Größe
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Geben Sie Informationen zur Größe der zu reinigenden Fläche an
        </motion.p>
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        {/* Raumanzahl und Fläche mit Schiebereglern */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {isInnenreinigung && (
            <div>
              <label htmlFor="raumanzahl" className="block text-sm font-medium text-gray-700 mb-1">
                Anzahl der Räume: <span className="font-semibold">{raumanzahl}</span>
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  id="raumanzahl"
                  min="1"
                  max="15"
                  step="1"
                  value={raumanzahl}
                  onChange={handleRaumanzahlChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                />
                <input
                  type="number"
                  min="1"
                  value={raumanzahl}
                  onChange={handleRaumanzahlChange}
                  className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="flaeche" className="block text-sm font-medium text-gray-700 mb-1">
              Fläche: <span className="font-semibold">{flaeche} m²</span>
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                id="flaeche"
                min="5"
                max="500"
                step="5"
                value={flaeche}
                onChange={handleFlaecheChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex items-center">
                <input
                  type="number"
                  min="5"
                  value={flaeche}
                  onChange={handleFlaecheChange}
                  className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md"
                />
                <span className="ml-1">m²</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Füllgrad-Auswahl */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-sm font-medium text-gray-700">Zusätzliche Informationen (optional):</h3>
          
          <textarea
            id="spezialDetails"
            name="spezialDetails"
            rows={3}
            value={formData.flaecheInfo.spezialDetails || ""}
            onChange={handleSpezialDetailsChange}
            placeholder="Besonderheiten, Zugang, spezielle Verschmutzungen oder andere wichtige Informationen"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
          />
        </motion.div>
      </div>

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
        className="flex justify-between max-w-xl mx-auto mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <motion.button
          onClick={goToPreviousStep}
          className="py-3 px-6 rounded-md border border-gray-300 text-gray-600 font-medium transition-all hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Zurück
        </motion.button>

        <motion.button
          onClick={handleContinue}
          className="py-3 px-8 rounded-md bg-accent text-white font-medium transition-all hover:bg-accent-dark"
          whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
          whileTap={{ scale: 0.97 }}
        >
          Weiter
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
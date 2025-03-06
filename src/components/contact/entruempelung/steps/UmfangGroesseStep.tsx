"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntruempelungWizard'

type UmfangGroesseStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Beispielbilder für Füllgrade
const fuellgradImages = {
  leer: "/images/entrumpelung/fullness-empty.jpg",
  wenig: "/images/entrumpelung/fullness-light.jpg",
  mittel: "/images/entrumpelung/fullness-medium.jpg",
  voll: "/images/entrumpelung/fullness-full.jpg"
}

// Beschreibungen für Füllgrade
const fuellgradDescriptions = {
  leer: "Leere Räume mit wenigen Gegenständen",
  wenig: "Teilweise möblierte Räume, wenig zu entsorgen",
  mittel: "Normal möblierte Räume",
  voll: "Stark gefüllte Räume, viele Gegenstände"
}

export const UmfangGroesseStep: React.FC<UmfangGroesseStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [flaeche, setFlaeche] = useState(formData.umfangGroesse.flaeche)
  const [raumanzahl, setRaumanzahl] = useState(formData.umfangGroesse.raumanzahl)
  const [fuellgrad, setFuellgrad] = useState<FormData['umfangGroesse']['fuellgrad']>(formData.umfangGroesse.fuellgrad)
  const [error, setError] = useState('')

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
  }

  const handleRaumanzahlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setRaumanzahl(isNaN(value) ? 1 : Math.max(1, value))
  }

  const handleFuellgradSelect = (grad: FormData['umfangGroesse']['fuellgrad']) => {
    setFuellgrad(grad)
  }

  const handleContinue = () => {
    if (flaeche <= 0) {
      setError('Bitte geben Sie eine gültige Fläche ein')
      return
    }

    if (raumanzahl <= 0) {
      setError('Bitte geben Sie mindestens einen Raum an')
      return
    }

    updateFormData({
      umfangGroesse: {
        flaeche,
        raumanzahl,
        fuellgrad
      }
    })
    
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
          Geben Sie Informationen zur Größe und Füllgrad an
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

        {/* Füllgrad-Auswahl mit Bildern */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-sm font-medium text-gray-700">Füllgrad auswählen:</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['leer', 'wenig', 'mittel', 'voll'] as const).map((grad) => (
              <motion.div
                key={grad}
                className={`relative flex flex-col items-center border-2 rounded-lg p-2 cursor-pointer transition-all
                  ${fuellgrad === grad ? 'border-accent shadow-md' : 'border-gray-200'}`}
                onClick={() => handleFuellgradSelect(grad)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-full h-24 bg-gray-100 rounded mb-2 overflow-hidden">
                  {/* Hier würde das echte Bild kommen */}
                  <div className={`w-full h-full flex items-center justify-center ${
                    grad === 'leer' ? 'bg-gray-100' :
                    grad === 'wenig' ? 'bg-gray-200' :
                    grad === 'mittel' ? 'bg-gray-300' :
                    'bg-gray-400'
                  }`}>
                    <span className="text-xs text-gray-500 capitalize">{grad}</span>
                  </div>
                </div>
                <span className="text-xs font-medium capitalize mb-1">{grad}</span>
                <p className="text-xs text-gray-500 text-center">
                  {fuellgradDescriptions[grad]}
                </p>
                {fuellgrad === grad && (
                  <motion.div 
                    className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
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
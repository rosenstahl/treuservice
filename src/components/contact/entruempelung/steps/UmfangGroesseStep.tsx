"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntruempelungWizard'
import { Ruler, Boxes, Home } from 'lucide-react'
import { Label } from '@/components/ui/label'

type UmfangGroesseStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
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

  // Handler für numerische Eingaben
  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: number, min: number = 0) => {
    setter(Math.max(min, value))
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

      <div className="max-w-xl mx-auto space-y-6">
        {/* Raumanzahl - im Stil der Reinigungsschritte */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Home className="h-4 w-4 mr-2 text-accent" />
            Anzahl der Räume
          </Label>
          <div className="flex max-w-xs">
            <button
              type="button"
              onClick={() => handleNumberChange(setRaumanzahl, raumanzahl - 1, 1)}
              className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
            >
              -
            </button>
            <input
              id="raumanzahl"
              type="text"
              inputMode="numeric"
              value={raumanzahl}
              onChange={(e) => handleNumberChange(setRaumanzahl, parseInt(e.target.value) || 1, 1)}
              className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
              style={{ appearance: "textfield" }}
            />
            <button
              type="button"
              onClick={() => handleNumberChange(setRaumanzahl, raumanzahl + 1)}
              className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
            >
              +
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Mindestens 1 Raum erforderlich
          </p>
        </motion.div>

        {/* Fläche */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Ruler className="h-4 w-4 mr-2 text-accent" />
            Fläche in m²
          </Label>
          <div className="flex max-w-xs">
            <button
              type="button"
              onClick={() => handleNumberChange(setFlaeche, flaeche - 5, 5)}
              className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
            >
              -
            </button>
            <input
              id="flaeche"
              type="text"
              inputMode="numeric"
              value={flaeche}
              onChange={(e) => handleNumberChange(setFlaeche, parseInt(e.target.value) || 0, 0)}
              className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
              style={{ appearance: "textfield" }}
            />
            <button
              type="button"
              onClick={() => handleNumberChange(setFlaeche, flaeche + 5)}
              className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
            >
              +
            </button>
            <span className="ml-3 flex items-center">m²</span>
          </div>
        </motion.div>

        {/* Füllgrad-Auswahl mit Bildern - beibehalten, aber Design angepasst */}
        <motion.div
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Boxes className="h-4 w-4 mr-2 text-accent" />
            Füllgrad auswählen
          </Label>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['leer', 'wenig', 'mittel', 'voll'] as const).map((grad) => (
              <motion.div
                key={grad}
                className={`relative flex flex-col items-center border-2 rounded-lg p-2 cursor-pointer transition-all
                  ${fuellgrad === grad ? 'border-accent shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
                onClick={() => handleFuellgradSelect(grad)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-full h-20 rounded mb-2 overflow-hidden">
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
                <p className="text-xs font-medium capitalize mb-1">{grad}</p>
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
        <motion.div 
          className="mt-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm text-center max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}
      
      <motion.div 
        className="flex justify-between max-w-xl mx-auto mt-8"
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
    </motion.div>
  )
}
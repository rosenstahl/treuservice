"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntruempelungWizard'
import { Ruler, Boxes, Home } from 'lucide-react'

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
          Umfang und Größe
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Geben Sie Informationen zur Größe und Füllgrad an
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Raumanzahl */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Home className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Anzahl der Räume</h3>
          </div>
          
          <div className="flex items-center max-w-xs">
            <button
              type="button"
              onClick={() => handleNumberChange(setRaumanzahl, raumanzahl - 1, 1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
            >
              -
            </button>
            <input
              id="raumanzahl"
              type="text"
              inputMode="numeric"
              value={raumanzahl}
              onChange={(e) => handleNumberChange(setRaumanzahl, parseInt(e.target.value) || 1, 1)}
              className="w-16 px-3 py-2 mx-3 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-[#009FD8] text-sm"
              style={{ appearance: "textfield" }}
            />
            <button
              type="button"
              onClick={() => handleNumberChange(setRaumanzahl, raumanzahl + 1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
            >
              +
            </button>
            <span className="ml-3 text-xs text-gray-500">Räume</span>
          </div>
        </motion.div>

        {/* Fläche */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Ruler className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Fläche in m²</h3>
          </div>
          
          <div className="flex items-center max-w-xs">
            <button
              type="button"
              onClick={() => handleNumberChange(setFlaeche, flaeche - 5, 5)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
            >
              -
            </button>
            <input
              id="flaeche"
              type="text"
              inputMode="numeric"
              value={flaeche}
              onChange={(e) => handleNumberChange(setFlaeche, parseInt(e.target.value) || 0, 0)}
              className="w-16 px-3 py-2 mx-3 border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-[#009FD8] text-sm"
              style={{ appearance: "textfield" }}
            />
            <button
              type="button"
              onClick={() => handleNumberChange(setFlaeche, flaeche + 5)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
            >
              +
            </button>
            <span className="ml-3 text-xs text-gray-500">m²</span>
          </div>
        </motion.div>

        {/* Füllgrad-Auswahl mit Bildern */}
        <motion.div
          className="mb-6 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Boxes className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Füllgrad auswählen</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['leer', 'wenig', 'mittel', 'voll'] as const).map((grad) => (
              <motion.div
                key={grad}
                className={`relative flex flex-col items-center border rounded-lg p-3 cursor-pointer transition-all
                  ${fuellgrad === grad ? 'border-[#009FD8] bg-[#E6F4FA]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                onClick={() => handleFuellgradSelect(grad)}
              >
                <div className="w-full h-16 rounded-lg mb-2 overflow-hidden">
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
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#009FD8] rounded-full flex items-center justify-center text-white"
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
          className="text-red-500 text-xs text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
      
      <motion.div 
        className="flex justify-between mt-8 pt-6 border-t border-gray-100 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.2 }}
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
            flaeche > 0 && raumanzahl > 0
              ? 'bg-[#009FD8] text-white hover:bg-[#007CAB]' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Weiter
        </button>
      </motion.div>
    </motion.div>
  )
}
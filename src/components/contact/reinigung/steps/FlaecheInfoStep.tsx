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

export const FlaecheInfoStep: React.FC<FlaecheInfoStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [flaeche, setFlaeche] = useState(formData.flaecheInfo.flaeche || 0)
  const [raumanzahl, setRaumanzahl] = useState(formData.flaecheInfo.raumanzahl || 0)
  const [etagenanzahl, setEtagenanzahl] = useState(formData.flaecheInfo.etagenanzahl || 1)
  const [fensteranzahl, setFensteranzahl] = useState(formData.flaecheInfo.fensteranzahl || 0)
  const [spezialDetails, setSpezialDetails] = useState(formData.flaecheInfo.spezialDetails || '')
  const [error, setError] = useState('')
  
  // Dynamische Felder basierend auf der gewählten Reinigungsart und dem Objekttyp
  const isFensterreinigung = formData.reinigungsart.hauptkategorie === 'glas_fassade'
  const isInnenreinigung = [
    'buero', 'wohnhaus', 'hotel', 'krankenhaus', 'schule', 'gewerbe'
  ].includes(formData.objektTyp.typ)
  const isGebaeude = [
    'buero', 'wohnhaus', 'hotel', 'krankenhaus', 'schule', 'gewerbe', 'industrie'
  ].includes(formData.objektTyp.typ)

  // Fläche formatieren (max. 2 Dezimalstellen)
  const formatFlaeche = (value: number) => {
    return Math.round(value * 100) / 100
  }

  const handleFlaecheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0
    setFlaeche(formatFlaeche(newValue))
  }

  const handleRaumanzahlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0
    setRaumanzahl(newValue)
  }

  const handleEtagenanzahlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 1
    setEtagenanzahl(newValue)
  }

  const handleFensteranzahlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0
    setFensteranzahl(newValue)
  }

  const handleSpezialDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSpezialDetails(e.target.value)
  }

  // Bei Änderungen im Formular die Daten aktualisieren
  useEffect(() => {
    const updatedFlaecheInfo: FormData['flaecheInfo'] = {
      flaeche,
      spezialDetails
    }

    // Optionale Felder basierend auf Reinigungsart/Objekttyp
    if (isInnenreinigung) {
      updatedFlaecheInfo.raumanzahl = raumanzahl
    }
    
    if (isGebaeude) {
      updatedFlaecheInfo.etagenanzahl = etagenanzahl
    }
    
    if (isFensterreinigung) {
      updatedFlaecheInfo.fensteranzahl = fensteranzahl
    }

    updateFormData({ flaecheInfo: updatedFlaecheInfo })
  }, [flaeche, raumanzahl, etagenanzahl, fensteranzahl, spezialDetails, updateFormData, isInnenreinigung, isGebaeude, isFensterreinigung])

  const handleContinue = () => {
    // Einfache Validierung
    if (flaeche <= 0) {
      setError('Bitte geben Sie eine gültige Fläche an')
      return
    }
    
    if (isInnenreinigung && raumanzahl <= 0) {
      setError('Bitte geben Sie die Anzahl der Räume an')
      return
    }
    
    if (isFensterreinigung && fensteranzahl <= 0) {
      setError('Bitte geben Sie die Anzahl der Fenster an')
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
          Wie groß ist die zu reinigende Fläche?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Geben Sie Details zur Größe und Beschaffenheit der zu reinigenden Fläche an.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="space-y-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {/* Fläche - immer sichtbar */}
          <div>
            <label htmlFor="flaeche" className="block text-sm font-medium text-gray-700 mb-1">
              Flächengröße in m²
            </label>
            <div className="flex">
              <input
                type="number"
                id="flaeche"
                name="flaeche"
                min="1"
                step="0.5"
                value={flaeche || ''}
                onChange={handleFlaecheChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-accent focus:border-accent"
                required
              />
              <span className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 bg-gray-50 rounded-r-md text-gray-600">
                m²
              </span>
            </div>
          </div>
          
          {/* Raumanzahl - nur bei Innenreinigung */}
          {isInnenreinigung && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="raumanzahl" className="block text-sm font-medium text-gray-700 mb-1">
                Anzahl der Räume
              </label>
              <input
                type="number"
                id="raumanzahl"
                name="raumanzahl"
                min="1"
                value={raumanzahl || ''}
                onChange={handleRaumanzahlChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              />
            </motion.div>
          )}
          
          {/* Etagenanzahl - nur bei Gebäuden */}
          {isGebaeude && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="etagenanzahl" className="block text-sm font-medium text-gray-700 mb-1">
                Anzahl der Etagen
              </label>
              <input
                type="number"
                id="etagenanzahl"
                name="etagenanzahl"
                min="1"
                value={etagenanzahl || 1}
                onChange={handleEtagenanzahlChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              />
            </motion.div>
          )}
          
          {/* Fensteranzahl - nur bei Fensterreinigung */}
          {isFensterreinigung && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="fensteranzahl" className="block text-sm font-medium text-gray-700 mb-1">
                Anzahl der Fenster/Glasflächen
              </label>
              <input
                type="number"
                id="fensteranzahl"
                name="fensteranzahl"
                min="1"
                value={fensteranzahl || ''}
                onChange={handleFensteranzahlChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              />
            </motion.div>
          )}
          
          {/* Zusätzliche Details - immer sichtbar */}
          <div>
            <label htmlFor="spezialDetails" className="block text-sm font-medium text-gray-700 mb-1">
              Weitere Details (optional)
            </label>
            <textarea
              id="spezialDetails"
              name="spezialDetails"
              rows={3}
              value={spezialDetails}
              onChange={handleSpezialDetailsChange}
              placeholder="Besonderheiten, Zugang, spezielle Verschmutzungen oder andere wichtige Informationen"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            />
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
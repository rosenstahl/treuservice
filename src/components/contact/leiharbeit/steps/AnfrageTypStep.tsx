"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'

type AnfrageTypStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const AnfrageTypStep: React.FC<AnfrageTypStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  const [selectedType, setSelectedType] = useState<FormData['anfrageTyp']>(formData.anfrageTyp)
  const [error, setError] = useState('')

  const handleTypeSelect = (type: FormData['anfrageTyp']) => {
    setSelectedType(type)
    setError('')
    updateFormData({ anfrageTyp: type })
    
    // Hier bei Unternehmen das Express-Anfragefeld initialisieren
    if (type === 'unternehmen') {
      updateFormData({ 
        expressAnfrage: false,
        unternehmenBedarf: {
          branche: '',
          anzahlMitarbeiter: 1,
          qualifikationsniveau: '',
          einsatzdauer: '',
          einsatzbeginn: ''
        }
      })
    } else if (type === 'bewerber') {
      // Bei Bewerber das Bewerberprofil initialisieren
      updateFormData({ 
        bewerberProfil: {
          fachbereich: '',
          qualifikation: '',
          berufserfahrungJahre: 0,
          verfuegbarkeit: '',
          arbeitszeit: '',
          einsatzregion: ''
        }
      })
    }
  }

  const handleContinue = () => {
    if (!selectedType) {
      setError('Bitte wählen Sie einen Anfragetyp aus')
      return
    }
    
    goToNextStep()
  }

  // Apple Design-inspirierte Animation für Auswahl
  const selectedVariants = {
    selected: {
      backgroundColor: "rgba(0, 122, 255, 0.05)",
      borderColor: "rgba(0, 122, 255, 1)",
      transition: { duration: 0.3 }
    },
    notSelected: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderColor: "rgba(229, 231, 235, 1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Überschrift im Apple-Stil */}
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl font-semibold text-gray-900 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          Was können wir für Sie tun?
        </motion.h2>
        <motion.p 
          className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte wählen Sie eine der folgenden Optionen.
        </motion.p>
      </div>
      
      {/* Apple-inspirierte Auswahloptionen */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {/* Unternehmen-Option */}
        <motion.div
          className={`p-6 rounded-xl border transition-all cursor-pointer overflow-hidden`}
          variants={selectedVariants}
          initial="notSelected"
          animate={selectedType === 'unternehmen' ? "selected" : "notSelected"}
          onClick={() => handleTypeSelect('unternehmen')}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-start">
            <div className="flex-1">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Personalsuche für Unternehmen</h3>
              <p className="text-gray-600 mb-1 leading-relaxed">
                Wir helfen Ihnen, die passenden Mitarbeiter für Ihr Unternehmen zu finden.
              </p>
              <p className="text-gray-500 text-sm">Zeitarbeiter schnell und einfach anfragen</p>
            </div>
            <div className="ml-4 flex items-center">
              <div className={`w-6 h-6 rounded-full border border-2 flex items-center justify-center ${selectedType === 'unternehmen' ? 'border-accent' : 'border-gray-300'}`}>
                {selectedType === 'unternehmen' && (
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-accent" 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bewerber-Option */}
        <motion.div
          className={`p-6 rounded-xl border transition-all cursor-pointer overflow-hidden`}
          variants={selectedVariants}
          initial="notSelected"
          animate={selectedType === 'bewerber' ? "selected" : "notSelected"}
          onClick={() => handleTypeSelect('bewerber')}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-start">
            <div className="flex-1">
              <h3 className="text-xl font-medium text-gray-800 mb-2">Arbeit als Bewerber finden</h3>
              <p className="text-gray-600 mb-1 leading-relaxed">
                Bewerben Sie sich als Zeitarbeiter und finden Sie neue berufliche Chancen.
              </p>
              <p className="text-gray-500 text-sm">Passende Jobs in Ihrer Region entdecken</p>
            </div>
            <div className="ml-4 flex items-center">
              <div className={`w-6 h-6 rounded-full border border-2 flex items-center justify-center ${selectedType === 'bewerber' ? 'border-accent' : 'border-gray-300'}`}>
                {selectedType === 'bewerber' && (
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-accent" 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {error && (
        <motion.p 
          className="text-red-500 text-sm text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
      
      {/* Apple-Style Button */}
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <motion.button
          onClick={handleContinue}
          className={`w-full py-3.5 rounded-lg font-medium transition-all ${
            selectedType 
              ? 'bg-accent text-white' 
              : 'bg-gray-100 text-gray-400'
          }`}
          whileHover={selectedType ? { scale: 1.01 } : {}}
          whileTap={selectedType ? { scale: 0.98 } : {}}
          disabled={!selectedType}
        >
          Weiter
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
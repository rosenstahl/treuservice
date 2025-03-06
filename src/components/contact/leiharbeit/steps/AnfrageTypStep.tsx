"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Building2, User, Briefcase, UserPlus } from 'lucide-react'

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

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <motion.h2 
          className="text-2xl font-medium text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          Wie können wir Ihnen helfen?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte wählen Sie aus, ob Sie als Unternehmen Leiharbeiter suchen oder als Person Arbeit suchen.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {/* Unternehmen-Option */}
        <motion.div
          className={`flex flex-col items-center p-8 rounded-lg border-2 transition-all cursor-pointer ${selectedType === 'unternehmen' ? 'border-accent bg-accent/5 shadow-md' : 'border-gray-200 hover:border-accent/50'}`}
          onClick={() => handleTypeSelect('unternehmen')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <div className={`p-4 rounded-full mb-6 ${selectedType === 'unternehmen' ? 'text-accent bg-accent/10' : 'text-gray-600 bg-gray-100'}`}>
              <Building2 className="h-12 w-12" />
            </div>
            <div className="absolute -right-2 -bottom-2">
              <Briefcase className={`h-8 w-8 ${selectedType === 'unternehmen' ? 'text-accent' : 'text-gray-400'}`} />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Unternehmen</h3>
          <p className="text-center text-gray-600 mb-4">
            Wir suchen qualifizierte Leiharbeiter für unser Unternehmen.
          </p>
          <div className={`mt-4 px-4 py-2 rounded ${selectedType === 'unternehmen' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
            Personal finden
          </div>
        </motion.div>

        {/* Bewerber-Option */}
        <motion.div
          className={`flex flex-col items-center p-8 rounded-lg border-2 transition-all cursor-pointer ${selectedType === 'bewerber' ? 'border-accent bg-accent/5 shadow-md' : 'border-gray-200 hover:border-accent/50'}`}
          onClick={() => handleTypeSelect('bewerber')}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative">
            <div className={`p-4 rounded-full mb-6 ${selectedType === 'bewerber' ? 'text-accent bg-accent/10' : 'text-gray-600 bg-gray-100'}`}>
              <User className="h-12 w-12" />
            </div>
            <div className="absolute -right-2 -bottom-2">
              <UserPlus className={`h-8 w-8 ${selectedType === 'bewerber' ? 'text-accent' : 'text-gray-400'}`} />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Bewerber</h3>
          <p className="text-center text-gray-600 mb-4">
            Ich suche Arbeit und möchte mich als Leiharbeiter bewerben.
          </p>
          <div className={`mt-4 px-4 py-2 rounded ${selectedType === 'bewerber' ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
            Arbeit finden
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
      
      <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <motion.button
          onClick={handleContinue}
          className={`py-3 px-8 rounded-md font-medium transition-all duration-200 ${selectedType ? 'bg-accent text-white hover:bg-accent-dark' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          whileHover={selectedType ? { scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" } : {}}
          whileTap={selectedType ? { scale: 0.97 } : {}}
        >
          Weiter
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
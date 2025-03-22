"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { Building, UserCircle } from 'lucide-react'

type AnfrageTypStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Icons für die verschiedenen Anfragetypen
const icons: Record<string, React.ReactNode> = {
  unternehmen: <Building className="h-5 w-5" />,
  bewerber: <UserCircle className="h-5 w-5" />
}

// Titel für die Anfragetypen
const titles: Record<string, string> = {
  unternehmen: "Personalsuche für Unternehmen",
  bewerber: "Arbeit als Bewerber finden"
}

export const AnfrageTypStep: React.FC<AnfrageTypStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  const [selectedType, setSelectedType] = useState<FormData['anfrageTyp']>(formData.anfrageTyp)
  const [error, setError] = useState('')
  const [hoveredType, setHoveredType] = useState<string | null>(null)

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
    
    // Nach der Auswahl automatisch zum nächsten Schritt
    goToNextStep()
  }

  // Definieren der möglichen Anfragetypen
  const anfrageTypen: Array<FormData['anfrageTyp']> = [
    'unternehmen', 'bewerber'
  ]

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <motion.h2 
          className="text-2xl font-medium text-gray-800 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          Was können wir für Sie tun?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte wählen Sie eine der folgenden Optionen.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {anfrageTypen.map((type) => (
          <motion.div
            key={type}
            className={`flex flex-col px-4 py-5 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedType === type 
                ? 'border-accent/20 bg-accent/5 shadow-sm' 
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => handleTypeSelect(type)}
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center">
              <div className={`mr-3 ${
                selectedType === type 
                  ? 'text-accent' 
                  : hoveredType === type 
                    ? 'text-accent' 
                    : 'text-gray-400'
              }`}>
                {icons[type]}
              </div>
              <h3 className="font-medium text-sm text-gray-700">{titles[type]}</h3>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 pl-8">
              {type === 'unternehmen' 
                ? 'Wir helfen Ihnen, die passenden Mitarbeiter für Ihr Unternehmen zu finden.'
                : 'Finden Sie neue berufliche Chancen als Zeitarbeiter in Ihrer Region.'}
            </p>
          </motion.div>
        ))}
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
    </motion.div>
  )
}
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
  unternehmen: <Building className="h-4 w-4" />,
  bewerber: <UserCircle className="h-4 w-4" />
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
          Was können wir für Sie tun?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Bitte wählen Sie eine der folgenden Optionen.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        {anfrageTypen.map((type) => (
          <motion.div
            key={type}
            className={`flex flex-col p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedType === type 
                ? 'border-[#009FD8] bg-[#E6F4FA]' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handleTypeSelect(type)}
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
          >
            <div className="flex items-center">
              <div className={`mr-3 ${
                selectedType === type 
                  ? 'text-[#009FD8]' 
                  : hoveredType === type 
                    ? 'text-[#009FD8]' 
                    : 'text-gray-400'
              }`}>
                {icons[type]}
              </div>
              <h3 className="font-medium text-xs text-gray-700">{titles[type]}</h3>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 pl-7">
              {type === 'unternehmen' 
                ? 'Wir helfen Ihnen, die passenden Mitarbeiter für Ihr Unternehmen zu finden.'
                : 'Finden Sie neue berufliche Chancen als Zeitarbeiter in Ihrer Region.'}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {error && (
        <motion.p 
          className="text-red-500 text-xs text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
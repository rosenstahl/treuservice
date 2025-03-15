"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../ReinigungWizard'
import {
  Sparkle,
  Brush,
  Droplet,
  Factory,
  ShieldCheck,
  Trees,
  Wrench,
  Bus,
  Hotel,
  Ticket,
  HardHat,
  Mountain,
  Home,
  Sun,
  PenTool,
  // Neues Icon für Grundreinigung
  Trash2
} from 'lucide-react'

type ReinigungsartStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Icons für die verschiedenen Reinigungsarten
const icons = {
  unterhaltsreinigung: <Brush className="h-8 w-8" />,
  grundreinigung: <Trash2 className="h-8 w-8" />, // Neues Icon für Grundreinigung
  glas_fassade: <Droplet className="h-8 w-8" />,
  industrie: <Factory className="h-8 w-8" />,
  reinraum: <ShieldCheck className="h-8 w-8" />,
  aussenanlagen: <Trees className="h-8 w-8" />,
  sonderreinigung: <Wrench className="h-8 w-8" />,
  verkehrsmittel: <Bus className="h-8 w-8" />,
  hotel: <Hotel className="h-8 w-8" />,
  veranstaltung: <Ticket className="h-8 w-8" />,
  baureinigung: <HardHat className="h-8 w-8" />,
  steinreinigung: <Mountain className="h-8 w-8" />,
  dachreinigung: <Home className="h-8 w-8" />,
  solaranlagen: <Sun className="h-8 w-8" />,
  sonstiges: <PenTool className="h-8 w-8" />
}

// Titel für die Reinigungsarten
const titles = {
  unterhaltsreinigung: "Unterhaltsreinigung",
  grundreinigung: "Grundreinigung",
  glas_fassade: "Glas & Fassade",
  industrie: "Industriereinigung",
  reinraum: "Reinraumreinigung",
  aussenanlagen: "Außenanlagenpflege",
  sonderreinigung: "Sonderreinigung",
  verkehrsmittel: "Verkehrsmittelreinigung",
  hotel: "Hotelreinigung",
  veranstaltung: "Veranstaltungsreinigung",
  baureinigung: "Baureinigung",
  steinreinigung: "Steinreinigung",
  dachreinigung: "Dachreinigung",
  solaranlagen: "Solaranlagenreinigung",
  sonstiges: "Sonstige Reinigung"
}

export const ReinigungsartStep: React.FC<ReinigungsartStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep
}) => {
  const [selectedType, setSelectedType] = useState<FormData['reinigungsart']['hauptkategorie']>(formData.reinigungsart.hauptkategorie)
  const [customType, setCustomType] = useState(formData.reinigungsart.sonstigesText || '')
  const [error, setError] = useState('')

  const handleReinigungsartSelect = (type: FormData['reinigungsart']['hauptkategorie']) => {
    setSelectedType(type)
    setError('')
    updateFormData({ 
      reinigungsart: {
        hauptkategorie: type,
        sonstigesText: formData.reinigungsart.sonstigesText
      }
    })
  }

  const handleCustomTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomType(value)
    updateFormData({ 
      reinigungsart: {
        hauptkategorie: selectedType,
        sonstigesText: value
      }
    })
  }

  const handleContinue = () => {
    if (!selectedType) {
      setError('Bitte wählen Sie eine Reinigungsart aus')
      return
    }
    
    if (selectedType === 'sonstiges' && !customType.trim()) {
      setError('Bitte geben Sie die gewünschte Reinigungsleistung an')
      return
    }
    
    goToNextStep()
  }

  const reinigungsarten: Array<FormData['reinigungsart']['hauptkategorie']> = [
    'unterhaltsreinigung', 'grundreinigung', 'glas_fassade', 'industrie', 'reinraum',
    'aussenanlagen', 'sonderreinigung', 'verkehrsmittel', 'hotel', 'veranstaltung',
    'baureinigung', 'steinreinigung', 'dachreinigung', 'solaranlagen', 'sonstiges'
  ]

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
          Welche Reinigungsleistung benötigen Sie?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie die Art der Reinigung, die Sie beauftragen möchten.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {reinigungsarten.map((type) => (
          <motion.div
            key={type}
            className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all cursor-pointer 
              ${selectedType === type ? 'border-accent bg-accent/5 shadow-md' : 'border-gray-200 hover:border-accent/50'}`}
            onClick={() => handleReinigungsartSelect(type)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`p-2 rounded-full mb-2 ${selectedType === type ? 'text-accent' : 'text-gray-500'}`}>
              {icons[type]}
            </div>
            <h3 className="font-medium text-gray-800 text-sm text-center mb-1">{titles[type]}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Eingabefeld für benutzerdefinierte Reinigungsart */}
      {selectedType === 'sonstiges' && (
        <motion.div
          className="mt-6 max-w-xl mx-auto"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="customType" className="block text-sm font-medium text-gray-700 mb-1">
            Bitte beschreiben Sie, welche Reinigungsleistung Sie benötigen:
          </label>
          <input
            type="text"
            id="customType"
            name="customType"
            value={customType}
            onChange={handleCustomTypeChange}
            placeholder="z.B. Poolreinigung, Jalousiereinigung, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            autoFocus
          />
        </motion.div>
      )}

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
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <motion.button
          onClick={handleContinue}
          className={`py-3 px-8 rounded-md font-medium transition-all duration-200 
            ${selectedType ? 'bg-accent text-white hover:bg-accent-dark' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          whileHover={selectedType ? { scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" } : {}}
          whileTap={selectedType ? { scale: 0.97 } : {}}
        >
          Weiter
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
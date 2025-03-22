"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../ReinigungWizard'
import {
  Sparkle,
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
  Building2
} from 'lucide-react'

type ReinigungsartStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Wir definieren einen Typ, der den leeren String ausschließt
type NonEmptyReinigungsart = Exclude<FormData['reinigungsart']['hauptkategorie'], ''>

// Icons für die verschiedenen Reinigungsarten
const icons: Record<NonEmptyReinigungsart, React.ReactNode> = {
  unterhaltsreinigung: <Building2 className="h-5 w-5" />,
  grundreinigung: <Sparkle className="h-5 w-5" />,
  glas_fassade: <Droplet className="h-5 w-5" />,
  industrie: <Factory className="h-5 w-5" />,
  reinraum: <ShieldCheck className="h-5 w-5" />,
  aussenanlagen: <Trees className="h-5 w-5" />,
  sonderreinigung: <Wrench className="h-5 w-5" />,
  verkehrsmittel: <Bus className="h-5 w-5" />,
  hotel: <Hotel className="h-5 w-5" />,
  veranstaltung: <Ticket className="h-5 w-5" />,
  baureinigung: <HardHat className="h-5 w-5" />,
  steinreinigung: <Mountain className="h-5 w-5" />,
  dachreinigung: <Home className="h-5 w-5" />,
  solaranlagen: <Sun className="h-5 w-5" />,
  sonstiges: <PenTool className="h-5 w-5" />
}

// Titel für die Reinigungsarten
const titles: Record<NonEmptyReinigungsart, string> = {
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
  const [hoveredType, setHoveredType] = useState<string | null>(null)

  const handleReinigungsartSelect = (type: FormData['reinigungsart']['hauptkategorie']) => {
    setSelectedType(type)
    setError('')
    updateFormData({ 
      reinigungsart: {
        hauptkategorie: type,
        sonstigesText: formData.reinigungsart.sonstigesText
      }
    })
    
    // Wenn es nicht "sonstiges" ist, direkt zum nächsten Schritt gehen
    if (type !== 'sonstiges') {
      goToNextStep()
    }
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
      setError('Bitte beschreiben Sie die gewünschte Reinigungsleistung')
      return
    }
    
    goToNextStep()
  }

  const reinigungsarten: Array<NonEmptyReinigungsart> = [
    'unterhaltsreinigung', 'grundreinigung', 'glas_fassade', 'industrie', 'reinraum',
    'aussenanlagen', 'sonderreinigung', 'verkehrsmittel', 'hotel', 'veranstaltung',
    'baureinigung', 'steinreinigung', 'dachreinigung', 'solaranlagen', 'sonstiges'
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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {reinigungsarten.map((type) => (
          <motion.div
            key={type}
            className={`flex items-center h-11 px-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedType === type 
                ? 'border-accent/20 bg-accent/5 shadow-sm' 
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => handleReinigungsartSelect(type)}
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`mr-3 ${
              selectedType === type 
                ? 'text-accent' 
                : hoveredType === type 
                  ? 'text-accent' 
                  : 'text-gray-400'
            }`}>
              {type ? icons[type as NonEmptyReinigungsart] : null}
            </div>
            <h3 className="font-medium text-sm text-gray-700">{type ? titles[type as NonEmptyReinigungsart] : ""}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Eingabefeld für benutzerdefinierte Reinigungsart */}
      {selectedType === 'sonstiges' && (
        <motion.div
          className="mt-8 max-w-xl mx-auto bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="customType" className="block text-sm font-medium text-gray-700 mb-2">
            Bitte beschreiben Sie, welche Reinigungsleistung Sie benötigen:
          </label>
          <input
            type="text"
            id="customType"
            name="customType"
            value={customType}
            onChange={handleCustomTypeChange}
            placeholder="z.B. Poolreinigung, Jalousiereinigung, etc."
            className="w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-1 focus:ring-accent/30 focus:border-accent/30 text-gray-700"
            autoFocus
          />
          
          <div className="flex justify-center mt-5">
            <motion.button
              onClick={handleContinue}
              className={`py-2 px-8 rounded-md text-sm font-medium transition-all duration-200 ${
                customType.trim() 
                  ? 'bg-accent text-white hover:bg-accent-dark' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={customType.trim() ? { y: -1 } : {}}
              whileTap={customType.trim() ? { scale: 0.98 } : {}}
            >
              Weiter
            </motion.button>
          </div>
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
    </motion.div>
  )
}
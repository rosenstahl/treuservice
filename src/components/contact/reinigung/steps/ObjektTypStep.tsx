"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../ReinigungWizard'
import {
  Building2,
  Home,
  Factory,
  Store,
  Hotel,
  HeartPulse,
  GraduationCap,
  Trees,
  PenTool
} from 'lucide-react'

type ObjektTypStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Icons für die verschiedenen Objekttypen
const icons = {
  buero: <Building2 className="h-8 w-8" />,
  wohnhaus: <Home className="h-8 w-8" />,
  industrie: <Factory className="h-8 w-8" />,
  gewerbe: <Store className="h-8 w-8" />,
  hotel: <Hotel className="h-8 w-8" />,
  krankenhaus: <HeartPulse className="h-8 w-8" />,
  schule: <GraduationCap className="h-8 w-8" />,
  aussenbereich: <Trees className="h-8 w-8" />,
  sonstiges: <PenTool className="h-8 w-8" />
}

// Titel und Beschreibungen für die Objekttypen
const titles = {
  buero: "Büro",
  wohnhaus: "Wohnhaus",
  industrie: "Industrie",
  gewerbe: "Gewerbe",
  hotel: "Hotel",
  krankenhaus: "Krankenhaus",
  schule: "Bildungseinrichtung",
  aussenbereich: "Außenbereich",
  sonstiges: "Sonstiges"
}

const descriptions = {
  buero: "Büroräume, Verwaltungsgebäude, Coworking-Spaces",
  wohnhaus: "Privatwohnungen, Einfamilienhäuser, Mehrfamilienhäuser",
  industrie: "Produktionshallen, Werkstätten, Lagerhallen",
  gewerbe: "Geschäftsräume, Läden, Restaurants, Cafés",
  hotel: "Hotels, Pensionen, Ferienanlagen, Hostels",
  krankenhaus: "Krankenhäuser, Arztpraxen, Pflegeeinrichtungen",
  schule: "Schulen, Universitäten, Kindergärten, Bildungszentren",
  aussenbereich: "Außenanlagen, Terrassen, Wege, Fassaden",
  sonstiges: "Andere Objekte, bitte spezifizieren"
}

export const ObjektTypStep: React.FC<ObjektTypStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [selectedType, setSelectedType] = useState<FormData['objektTyp']['typ']>(formData.objektTyp.typ)
  const [customType, setCustomType] = useState(formData.objektTyp.sonstigesText || '')
  const [error, setError] = useState('')

  const handleObjektTypSelect = (type: FormData['objektTyp']['typ']) => {
    setSelectedType(type)
    setError('')
    updateFormData({ 
      objektTyp: {
        typ: type,
        sonstigesText: formData.objektTyp.sonstigesText
      }
    })
  }

  const handleCustomTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomType(value)
    updateFormData({ 
      objektTyp: {
        typ: selectedType,
        sonstigesText: value
      }
    })
  }

  const handleContinue = () => {
    if (!selectedType) {
      setError('Bitte wählen Sie einen Objekttyp aus')
      return
    }
    
    if (selectedType === 'sonstiges' && !customType.trim()) {
      setError('Bitte geben Sie den Objekttyp an')
      return
    }
    
    goToNextStep()
  }

  const objektTypes: Array<FormData['objektTyp']['typ']> = [
    'buero', 'wohnhaus', 'industrie', 'gewerbe', 'hotel', 
    'krankenhaus', 'schule', 'aussenbereich', 'sonstiges'
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
          Wo soll gereinigt werden?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie die Art des Objekts, das gereinigt werden soll.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {objektTypes.map((type) => (
          <motion.div
            key={type}
            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all cursor-pointer 
              ${selectedType === type ? 'border-accent bg-accent/5 shadow-md' : 'border-gray-200 hover:border-accent/50'}`}
            onClick={() => handleObjektTypSelect(type)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`p-3 rounded-full mb-3 ${selectedType === type ? 'text-accent' : 'text-gray-500'}`}>
              {icons[type]}
            </div>
            <h3 className="font-medium text-gray-800 capitalize mb-1">{titles[type]}</h3>
            <p className="text-xs text-gray-500 text-center">
              {descriptions[type]}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Eingabefeld für benutzerdefinierte Objekttyp-Eingabe */}
      {selectedType === 'sonstiges' && (
        <motion.div
          className="mt-6 max-w-xl mx-auto"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="customType" className="block text-sm font-medium text-gray-700 mb-1">
            Bitte beschreiben Sie, was gereinigt werden soll:
          </label>
          <input
            type="text"
            id="customType"
            name="customType"
            value={customType}
            onChange={handleCustomTypeChange}
            placeholder="z.B. Messehalle, Veranstaltungszentrum, Sportstätte, etc."
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
"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntruempelungWizard'
import {
  Building2,
  Home,
  UploadCloud,
  PenTool,
  Store,
  DoorOpen
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type ObjektTypStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Icons für die verschiedenen Objekttypen
const icons: Record<string, React.ReactNode> = {
  wohnung: <Building2 className="h-5 w-5" />,
  haus: <Home className="h-5 w-5" />,
  keller: <DoorOpen className="h-5 w-5" />,
  dachboden: <UploadCloud className="h-5 w-5" />,
  gewerbe: <Store className="h-5 w-5" />,
  sonstiges: <PenTool className="h-5 w-5" />
}

// Titel für die Objekttypen
const titles: Record<string, string> = {
  wohnung: "Wohnung",
  haus: "Haus",
  keller: "Keller",
  dachboden: "Dachboden",
  gewerbe: "Gewerbe",
  sonstiges: "Sonstiges"
}

export const ObjektTypStep: React.FC<ObjektTypStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
}) => {
  const [selectedType, setSelectedType] = useState<string>(formData.objektTyp.typ)
  const [customDetails, setCustomDetails] = useState(formData.objektTyp.customDetails || '')
  const [error, setError] = useState('')
  const [hoveredType, setHoveredType] = useState<string | null>(null)

  const handleObjektTypSelect = (type: string) => {
    setSelectedType(type)
    setError('')
    updateFormData({ 
      objektTyp: {
        typ: type as FormData['objektTyp']['typ'],
        customDetails: formData.objektTyp.customDetails
      }
    })
    
    // Direkt zum nächsten Schritt gehen, wenn ein Typ ausgewählt wird und es nicht "sonstiges" ist
    if (type !== 'sonstiges') {
      goToNextStep()
    }
  }

  const handleCustomDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setCustomDetails(value)
    updateFormData({ 
      objektTyp: {
        typ: selectedType as FormData['objektTyp']['typ'],
        customDetails: value
      }
    })
  }

  const handleContinue = () => {
    if (selectedType === 'sonstiges' && !customDetails.trim()) {
      setError('Bitte geben Sie Details zum Objekt an')
      return
    }
    
    goToNextStep()
  }

  const objektTypes = ['wohnung', 'haus', 'keller', 'dachboden', 'gewerbe', 'sonstiges']

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
          Was möchten Sie entrümpeln?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie den Objekttyp, für den Sie eine Entrümpelung beauftragen möchten.
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
            className={`flex items-center h-11 px-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedType === type 
                ? 'border-accent/20 bg-accent/5 shadow-sm' 
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => handleObjektTypSelect(type)}
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
              {icons[type]}
            </div>
            <h3 className="font-medium text-sm text-gray-700">{titles[type]}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Textarea für Sonstiges */}
      {selectedType === 'sonstiges' && (
        <motion.div
          className="mt-8 max-w-xl mx-auto bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Label htmlFor="customDetails" className="block text-sm font-medium text-gray-700 mb-2">
            Bitte beschreiben Sie das Objekt genauer:
          </Label>
          <Textarea
            id="customDetails"
            value={customDetails}
            onChange={handleCustomDetailsChange}
            placeholder="Besonderheiten, Art des Objekts, spezielle Anforderungen..."
            className="w-full border-gray-200 focus:ring-1 focus:ring-accent/30 focus:border-accent/30 text-gray-700"
            rows={4}
          />
          
          <div className="flex justify-center mt-5">
            <motion.button
              onClick={handleContinue}
              className={`py-2 px-8 rounded-md text-sm font-medium transition-all duration-200 ${
                customDetails.trim() 
                  ? 'bg-accent text-white hover:bg-accent-dark' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={customDetails.trim() ? { y: -1 } : {}}
              whileTap={customDetails.trim() ? { scale: 0.98 } : {}}
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
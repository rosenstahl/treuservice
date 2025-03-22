"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { Home, PanelTop, Building2, Warehouse, PenTool } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type DachTypStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Icons für die verschiedenen Dachtypen
const icons: Record<string, React.ReactNode> = {
  pitched: <Home className="h-5 w-5" />,
  flat: <PanelTop className="h-5 w-5" />,
  facade: <Building2 className="h-5 w-5" />,
  carport: <Warehouse className="h-5 w-5" />,
  other: <PenTool className="h-5 w-5" />
}

// Titel für die Dachtypen
const titles: Record<string, string> = {
  pitched: "Schrägdach",
  flat: "Flachdach",
  facade: "Fassade",
  carport: "Carport",
  other: "Anderer Dachtyp"
}

export const DachTypStep: React.FC<DachTypStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep
}) => {
  const [selectedType, setSelectedType] = useState<FormData['dach']['typ']>(formData.dach.typ)
  const [customDetails, setCustomDetails] = useState(formData.dach.sonstigesText || '')
  const [error, setError] = useState('')
  const [hoveredType, setHoveredType] = useState<string | null>(null)

  const handleDachTypSelect = (type: FormData['dach']['typ']) => {
    setSelectedType(type)
    setError('')
    updateFormData({ 
      dach: {
        ...formData.dach,
        typ: type
      }
    })
    
    // Direkt zum nächsten Schritt gehen, wenn ein Typ ausgewählt wird und es nicht "other" ist
    if (type !== 'other') {
      goToNextStep()
    }
  }

  const handleCustomDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setCustomDetails(value)
    updateFormData({ 
      dach: {
        ...formData.dach,
        sonstigesText: value
      }
    })
  }

  const handleContinue = () => {
    if (selectedType === 'other' && !customDetails.trim()) {
      setError('Bitte beschreiben Sie Ihren Dachtyp')
      return
    }
    
    goToNextStep()
  }

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
          Welchen Dachtyp haben Sie?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie den passenden Dachtyp aus, um eine geeignete PV-Montage zu planen.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {Object.keys(icons).map((type) => (
          <motion.div
            key={type}
            className={`flex items-center h-14 px-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedType === type 
                ? 'border-accent/20 bg-accent/5 shadow-sm' 
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => handleDachTypSelect(type as FormData['dach']['typ'])}
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
      {selectedType === 'other' && (
        <motion.div
          className="mt-8 max-w-xl mx-auto bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Label htmlFor="customDetails" className="block text-sm font-medium text-gray-700 mb-2">
            Bitte beschreiben Sie Ihren Dachtyp genauer:
          </Label>
          <Textarea
            id="customDetails"
            value={customDetails}
            onChange={handleCustomDetailsChange}
            placeholder="Besonderheiten, Art des Daches, spezielle Anforderungen..."
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
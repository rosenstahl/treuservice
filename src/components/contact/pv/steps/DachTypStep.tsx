"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { Home, PanelTop, Building2, Warehouse, PenTool, Info } from 'lucide-react'
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
  pitched: <Home className="h-4 w-4" />,
  flat: <PanelTop className="h-4 w-4" />,
  facade: <Building2 className="h-4 w-4" />,
  carport: <Warehouse className="h-4 w-4" />,
  other: <PenTool className="h-4 w-4" />
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
          Welchen Dachtyp haben Sie?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Wählen Sie den passenden Dachtyp aus, um eine geeignete PV-Montage zu planen.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        {Object.keys(icons).map((type) => (
          <motion.div
            key={type}
            className={`flex items-center h-10 px-3 rounded-full border transition-all duration-200 cursor-pointer ${
              selectedType === type 
                ? 'border-[#009FD8] bg-[#E6F4FA] shadow-sm' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handleDachTypSelect(type as FormData['dach']['typ'])}
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
          >
            <div className={`mr-2 ${
              selectedType === type 
                ? 'text-[#009FD8]' 
                : hoveredType === type 
                  ? 'text-[#009FD8]' 
                  : 'text-gray-400'
            }`}>
              {icons[type]}
            </div>
            <h3 className="font-medium text-xs text-gray-700">{titles[type]}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Textarea für Sonstiges */}
      {selectedType === 'other' && (
        <motion.div
          className="mt-6 max-w-xl mx-auto bg-white border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center mb-4 text-[#009FD8]">
            <Info className="w-4 h-4 mr-2" />
            <h3 className="font-medium text-sm">Details zum Dachtyp</h3>
          </div>
          
          <Label htmlFor="customDetails" className="block text-xs font-medium text-gray-700 mb-1">
            Bitte beschreiben Sie Ihren Dachtyp genauer:
          </Label>
          <Textarea
            id="customDetails"
            value={customDetails}
            onChange={handleCustomDetailsChange}
            placeholder="Besonderheiten, Art des Daches, spezielle Anforderungen..."
            className="w-full border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8] text-gray-700"
            rows={4}
          />
          
          <div className="flex justify-center mt-8 pb-2">
            <button
              onClick={handleContinue}
              className={`py-2.5 px-6 rounded-full text-xs font-medium transition-all duration-200 ${
                customDetails.trim() 
                  ? 'bg-[#009FD8] text-white hover:bg-[#007CAB]' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Weiter
            </button>
          </div>
        </motion.div>
      )}

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
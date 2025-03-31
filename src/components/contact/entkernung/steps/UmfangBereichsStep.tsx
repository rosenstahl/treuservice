"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntkernungWizard'
import { 
  CheckCircle2,
  CheckSquare,
  Square,
  Info
} from 'lucide-react'

type UmfangBereichsStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Elemente, die entfernt werden könnten
const elements = [
  { id: 'waende', label: 'Innenwände' },
  { id: 'decken', label: 'Deckenverkleidungen' },
  { id: 'boeden', label: 'Bodenbeläge & Estriche' },
  { id: 'tueren', label: 'Türen & Zargen' },
  { id: 'fenster', label: 'Fenster & Rahmen' },
  { id: 'elektro', label: 'Elektroinstallationen' },
  { id: 'sanitaer', label: 'Sanitärinstallationen' },
  { id: 'heizung', label: 'Heizungssysteme' },
  { id: 'moebel', label: 'Einbauten & Möbel' },
  { id: 'treppen', label: 'Treppen' }
]

export const UmfangBereichsStep: React.FC<UmfangBereichsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [umfangTyp, setUmfangTyp] = useState<'komplett' | 'selektiv'>(
    formData.umfang.komplettEntkernung ? 'komplett' : 'selektiv'
  )
  const [selectedElements, setSelectedElements] = useState<string[]>(
    formData.umfang.ausgewaehlteElemente
  )
  const [error, setError] = useState('')
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)

  const handleUmfangTypChange = (typ: 'komplett' | 'selektiv') => {
    setUmfangTyp(typ)
    setError('')
    
    if (typ === 'komplett') {
      // Bei Komplettentkernung werden automatisch alle Elemente ausgewählt
      const allElements = elements.map(el => el.id)
      setSelectedElements(allElements)
      updateFormData({ 
        umfang: {
          komplettEntkernung: true,
          selektiverRueckbau: false,
          ausgewaehlteElemente: allElements
        } 
      })
    } else {
      // Bei selektivem Rückbau kann der Nutzer einzelne Elemente auswählen
      updateFormData({ 
        umfang: {
          komplettEntkernung: false,
          selektiverRueckbau: true,
          ausgewaehlteElemente: selectedElements
        } 
      })
    }
  }

  const toggleElement = (elementId: string) => {
    const newSelection = selectedElements.includes(elementId)
      ? selectedElements.filter(id => id !== elementId)
      : [...selectedElements, elementId]
    
    setSelectedElements(newSelection)
    updateFormData({ 
      umfang: {
        ...formData.umfang,
        ausgewaehlteElemente: newSelection
      } 
    })
  }

  const handleContinue = () => {
    if (umfangTyp === 'selektiv' && selectedElements.length === 0) {
      setError('Bitte wählen Sie mindestens ein Element aus')
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
          Umfang der Entkernung
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Wählen Sie den gewünschten Umfang und die zu entfernenden Elemente aus.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Umfang-Typ Auswahl */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {/* Komplettentkernung */}
          <motion.div
            className={`p-3 rounded-full border transition-all cursor-pointer
              ${umfangTyp === 'komplett' ? 'border-[#009FD8] bg-[#E6F4FA]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
            onClick={() => handleUmfangTypChange('komplett')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.2 }}
          >
            <div className="flex items-center">
              <div className={`mr-2 ${umfangTyp === 'komplett' ? 'text-[#009FD8]' : 'text-gray-400'}`}>
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium text-xs text-gray-700">Komplette Entkernung</h3>
                <p className="text-xs text-gray-500 mt-0.5">Alle nicht-tragenden Elemente</p>
              </div>
            </div>
          </motion.div>
          
          {/* Selektiver Rückbau */}
          <motion.div
            className={`p-3 rounded-full border transition-all cursor-pointer
              ${umfangTyp === 'selektiv' ? 'border-[#009FD8] bg-[#E6F4FA]' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
            onClick={() => handleUmfangTypChange('selektiv')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <div className="flex items-center">
              <div className={`mr-2 ${umfangTyp === 'selektiv' ? 'text-[#009FD8]' : 'text-gray-400'}`}>
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-medium text-xs text-gray-700">Selektiver Rückbau</h3>
                <p className="text-xs text-gray-500 mt-0.5">Nur ausgewählte Elemente</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Elementauswahl bei selektivem Rückbau */}
        {umfangTyp === 'selektiv' && (
          <motion.div
            className="mt-6 border-t border-gray-100 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-4 text-[#009FD8]">
              <Info className="w-4 h-4 mr-2" />
              <h3 className="font-medium text-sm">Zu entfernende Elemente auswählen</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {elements.map((element) => (
                <motion.div
                  key={element.id}
                  className={`flex items-center h-10 px-3 rounded-full border transition-all cursor-pointer
                    ${selectedElements.includes(element.id) 
                      ? 'border-[#009FD8] bg-[#E6F4FA]' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                  onClick={() => toggleElement(element.id)}
                  onMouseEnter={() => setHoveredElement(element.id)}
                  onMouseLeave={() => setHoveredElement(null)}
                >
                  <div className={`mr-2
                    ${selectedElements.includes(element.id) 
                      ? 'text-[#009FD8]' 
                      : hoveredElement === element.id 
                        ? 'text-[#009FD8]' 
                        : 'text-gray-400'}`}
                  >
                    {selectedElements.includes(element.id) ? (
                      <CheckSquare className="h-4 w-4" />
                    ) : (
                      <Square className="h-4 w-4" />
                    )}
                  </div>
                  <span className="font-medium text-xs text-gray-700">{element.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.p 
            className="text-red-500 text-xs text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
        
        <motion.div 
          className="flex justify-between mt-8 pt-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.2 }}
        >
          <button
            onClick={goToPreviousStep}
            className="py-2 px-4 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Zurück
          </button>
          
          <button
            onClick={handleContinue}
            className={`py-2.5 px-6 rounded-full text-xs font-medium transition-colors ${
              umfangTyp === 'komplett' || (umfangTyp === 'selektiv' && selectedElements.length > 0) 
                ? 'bg-[#009FD8] text-white hover:bg-[#007CAB]' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Weiter
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
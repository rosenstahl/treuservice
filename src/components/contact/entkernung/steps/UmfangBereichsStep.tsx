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
          Umfang der Entkernung
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie den gewünschten Umfang und die zu entfernenden Elemente aus.
        </motion.p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        {/* Umfang-Typ Auswahl */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Komplettentkernung */}
          <motion.div
            className={`p-4 rounded-lg border transition-all cursor-pointer
              ${umfangTyp === 'komplett' ? 'border-accent/20 bg-accent/5 shadow-sm' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
            onClick={() => handleUmfangTypChange('komplett')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className={`p-2 ${umfangTyp === 'komplett' ? 'text-accent' : 'text-gray-400'}`}>
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-sm text-gray-700">Komplette Entkernung</h3>
                <p className="text-xs text-gray-500 mt-1">Alle nicht-tragenden Elemente werden entfernt</p>
              </div>
            </div>
          </motion.div>
          
          {/* Selektiver Rückbau */}
          <motion.div
            className={`p-4 rounded-lg border transition-all cursor-pointer
              ${umfangTyp === 'selektiv' ? 'border-accent/20 bg-accent/5 shadow-sm' : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
            onClick={() => handleUmfangTypChange('selektiv')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className={`p-2 ${umfangTyp === 'selektiv' ? 'text-accent' : 'text-gray-400'}`}>
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-sm text-gray-700">Selektiver Rückbau</h3>
                <p className="text-xs text-gray-500 mt-1">Nur ausgewählte Elemente werden entfernt</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Elementauswahl bei selektivem Rückbau */}
        {umfangTyp === 'selektiv' && (
          <motion.div
            className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-4 text-accent">
              <Info className="w-5 h-5 mr-2" />
              <h3 className="font-medium">Zu entfernende Elemente auswählen</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {elements.map((element) => (
                <motion.div
                  key={element.id}
                  className={`flex items-center h-11 px-4 rounded-lg border transition-all cursor-pointer
                    ${selectedElements.includes(element.id) 
                      ? 'border-accent/20 bg-accent/5 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'}`}
                  onClick={() => toggleElement(element.id)}
                  onMouseEnter={() => setHoveredElement(element.id)}
                  onMouseLeave={() => setHoveredElement(null)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`mr-3
                    ${selectedElements.includes(element.id) 
                      ? 'text-accent' 
                      : hoveredElement === element.id 
                        ? 'text-accent' 
                        : 'text-gray-400'}`}
                  >
                    {selectedElements.includes(element.id) ? (
                      <CheckSquare className="h-5 w-5" />
                    ) : (
                      <Square className="h-5 w-5" />
                    )}
                  </div>
                  <span className="font-medium text-sm text-gray-700">{element.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

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
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <button
            onClick={goToPreviousStep}
            className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
          >
            Zurück
          </button>
          
          <motion.button
            onClick={handleContinue}
            className={`py-2 px-8 rounded-md text-sm font-medium transition-all duration-200 
              ${umfangTyp === 'komplett' || (umfangTyp === 'selektiv' && selectedElements.length > 0) 
                ? 'bg-accent text-white hover:bg-accent-dark' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            whileHover={umfangTyp === 'komplett' || (umfangTyp === 'selektiv' && selectedElements.length > 0) 
              ? { y: -1 } 
              : {}}
            whileTap={umfangTyp === 'komplett' || (umfangTyp === 'selektiv' && selectedElements.length > 0) 
              ? { scale: 0.98 } 
              : {}}
          >
            Weiter
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
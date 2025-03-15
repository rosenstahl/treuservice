"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntkernungWizard'
import { 
  CheckCircle2,
  X,
  ArrowLeft,
  ChevronRight,
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
      
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Komplettentkernung */}
          <motion.div
            className={`p-6 rounded-lg border-2 transition-all cursor-pointer 
              ${umfangTyp === 'komplett' ? 'border-accent bg-accent/5 shadow-md' : 'border-gray-200 hover:border-accent/50'}`}
            onClick={() => handleUmfangTypChange('komplett')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <div className="flex items-start space-x-4">
              <div className={`mt-1 ${umfangTyp === 'komplett' ? 'text-accent' : 'text-gray-400'}`}>
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Komplette Entkernung</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Das Gebäude wird bis auf die Grundstruktur entkernt. Alle nicht-tragenden Elemente werden entfernt.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                    <span>Entfernung aller Innenwände</span>
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                    <span>Entfernung aller Böden und Beläge</span>
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                    <span>Entfernung aller Installationen</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Selektiver Rückbau */}
          <motion.div
            className={`p-6 rounded-lg border-2 transition-all cursor-pointer 
              ${umfangTyp === 'selektiv' ? 'border-accent bg-accent/5 shadow-md' : 'border-gray-200 hover:border-accent/50'}`}
            onClick={() => handleUmfangTypChange('selektiv')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className="flex items-start space-x-4">
              <div className={`mt-1 ${umfangTyp === 'selektiv' ? 'text-accent' : 'text-gray-400'}`}>
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Selektiver Rückbau</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Nur ausgewählte Elemente werden entfernt, während schützenswerte Bausubstanz erhalten bleibt.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center">
                    <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                    <span>Erhalt bestimmter Bauteile möglich</span>
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                    <span>Individuell anpassbar</span>
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="h-4 w-4 text-green-500 mr-2" />
                    <span>Gezielte Materialführung</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Elementauswahl bei selektivem Rückbau */}
        {umfangTyp === 'selektiv' && (
          <motion.div
            className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6 text-accent">
              <Info className="w-5 h-5 mr-2" />
              <h3 className="font-medium">Zu entfernende Elemente auswählen</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
              {elements.map((element) => (
                <motion.div
                  key={element.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all
                    ${selectedElements.includes(element.id) 
                      ? 'bg-accent/10 border border-accent/30' 
                      : 'bg-white border border-gray-200 hover:border-accent/20'}`}
                  onClick={() => toggleElement(element.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedElements.includes(element.id) ? (
                    <CheckSquare className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
                  ) : (
                    <Square className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                  )}
                  <span className="text-sm">{element.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {error && (
          <motion.p 
            className="text-red-500 text-sm text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
        
        <motion.div 
          className="flex justify-between mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <motion.button
            onClick={goToPreviousStep}
            className="py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-600 flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück
          </motion.button>
          
          <motion.button
            onClick={handleContinue}
            className={`py-3 px-8 rounded-md font-medium flex items-center
              ${umfangTyp === 'komplett' || (umfangTyp === 'selektiv' && selectedElements.length > 0)
                ? 'bg-accent text-white hover:bg-accent/90' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
            whileHover={umfangTyp === 'komplett' || (umfangTyp === 'selektiv' && selectedElements.length > 0)
              ? { scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" } 
              : {}}
            whileTap={umfangTyp === 'komplett' || (umfangTyp === 'selektiv' && selectedElements.length > 0)
              ? { scale: 0.97 } 
              : {}}
          >
            Weiter
            <ChevronRight className="h-4 w-4 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
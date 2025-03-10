"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Flame, Droplet, Bug, Wrench, CaseSensitive } from 'lucide-react'
import { Input } from '@/components/ui/input'

type SchadensartStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const SchadensartStep: React.FC<SchadensartStepProps> = ({
  formData,
  updateFormData,
  goToNextStep
}) => {
  const [isValid, setIsValid] = useState(Boolean(formData.schadensart))
  const [customInput, setCustomInput] = useState(formData.schadensartCustom || '')

  useEffect(() => {
    // Überprüfen, ob der Schritt vollständig ist
    if (formData.schadensart === 'sonstige') {
      setIsValid(Boolean(customInput.trim()))
    } else {
      setIsValid(Boolean(formData.schadensart))
    }
  }, [formData.schadensart, customInput])

  const handleSchadensartChange = (art: FormData['schadensart']) => {
    updateFormData({ schadensart: art })
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInput(e.target.value)
    updateFormData({ schadensartCustom: e.target.value })
  }

  const handleNextStep = () => {
    if (isValid) {
      goToNextStep()
    }
  }

  const options = [
    { id: 'brand', label: 'Brandschaden', icon: <Flame className="h-6 w-6" /> },
    { id: 'wasser', label: 'Wasserschaden', icon: <Droplet className="h-6 w-6" /> },
    { id: 'schimmel', label: 'Schimmelbefall', icon: <Bug className="h-6 w-6" /> },
    { id: 'kombi', label: 'Kombischaden (mehrere Arten)', icon: <CaseSensitive className="h-6 w-6" /> },
    { id: 'sonstige', label: 'Andere Sanierungsleistung', icon: <Wrench className="h-6 w-6" /> }
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
          Welche Art von Schaden liegt vor?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte wählen Sie die Art des Schadens aus, für den Sie eine Sanierung benötigen.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {options.map((option) => (
          <motion.div
            key={option.id}
            onClick={() => handleSchadensartChange(option.id as FormData['schadensart'])}
            className={`p-6 rounded-lg border border-gray-200 cursor-pointer transition-all duration-200 ${
              formData.schadensart === option.id
                ? 'border-accent bg-accent/5 ring-2 ring-accent/20'
                : 'hover:border-accent/30 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-3 rounded-full ${
                formData.schadensart === option.id ? 'bg-accent text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {option.icon}
              </div>
              <h3 className="mt-3 text-lg font-medium">{option.label}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {formData.schadensart === 'sonstige' && (
        <motion.div 
          className="max-w-lg mx-auto mt-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bitte beschreiben Sie den Schaden:
          </label>
          <Input
            value={customInput}
            onChange={handleCustomChange}
            placeholder="z.B. Asbest, Graffitibeseitigung, Geruchsbeseitigung..."
            className="w-full"
          />
        </motion.div>
      )}
      
      <motion.div className="flex justify-center mt-8">
        <motion.button
          onClick={handleNextStep}
          disabled={!isValid}
          className={`py-3 px-8 rounded-md font-medium transition-all duration-200 ${
            isValid
              ? 'bg-accent text-white hover:bg-accent-dark transform hover:scale-[1.03] hover:shadow-md'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={isValid ? { scale: 1.03 } : {}}
          whileTap={isValid ? { scale: 0.97 } : {}}
        >
          Weiter
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
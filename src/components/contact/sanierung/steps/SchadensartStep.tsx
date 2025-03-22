"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Flame, Droplet, Bug, Pencil } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

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
  const [isValid, setIsValid] = useState(Boolean(formData.schadensart.hauptkategorie))
  const [customInput, setCustomInput] = useState(formData.schadensart.sonstigesText || '')

  useEffect(() => {
    // Überprüfen, ob der Schritt vollständig ist
    if (formData.schadensart.hauptkategorie === 'sonstiges') {
      setIsValid(Boolean(customInput.trim()))
    } else {
      setIsValid(Boolean(formData.schadensart.hauptkategorie))
    }
  }, [formData.schadensart.hauptkategorie, customInput])

  const handleSchadensartChange = (art: FormData['schadensart']['hauptkategorie']) => {
    updateFormData({ 
      schadensart: {
        ...formData.schadensart,
        hauptkategorie: art
      }
    })
  }

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomInput(e.target.value)
    updateFormData({ 
      schadensart: {
        ...formData.schadensart,
        sonstigesText: e.target.value
      }
    })
  }

  const handleNextStep = () => {
    if (isValid) {
      goToNextStep()
    }
  }

  const options = [
    { 
      id: 'brand', 
      label: 'Brandschaden', 
      icon: <Flame className="h-5 w-5" />,
      description: 'Sanierung nach Bränden oder Ruß- und Rauchschäden', 
      color: 'text-red-600',
      bgColor: 'bg-red-50', 
      borderColor: 'border-red-200',
      hoverBorderColor: 'hover:border-red-300',
      activeBgColor: 'bg-red-100'
    },
    { 
      id: 'wasser', 
      label: 'Wasserschaden', 
      icon: <Droplet className="h-5 w-5" />,
      description: 'Sanierung nach Wassereintritt oder Überschwemmung', 
      color: 'text-blue-600',
      bgColor: 'bg-blue-50', 
      borderColor: 'border-blue-200',
      hoverBorderColor: 'hover:border-blue-300',
      activeBgColor: 'bg-blue-100'
    },
    { 
      id: 'schimmel', 
      label: 'Schimmelbefall', 
      icon: <Bug className="h-5 w-5" />,
      description: 'Entfernung und Sanierung von Schimmelschäden', 
      color: 'text-green-600',
      bgColor: 'bg-green-50', 
      borderColor: 'border-green-200',
      hoverBorderColor: 'hover:border-green-300',
      activeBgColor: 'bg-green-100'
    },
    { 
      id: 'sonstiges', 
      label: 'Andere Sanierungsleistung', 
      icon: <Pencil className="h-5 w-5" />,
      description: 'Sonstige Sanierungs- und Restaurationsleistungen', 
      color: 'text-purple-600',
      bgColor: 'bg-purple-50', 
      borderColor: 'border-purple-200',
      hoverBorderColor: 'hover:border-purple-300',
      activeBgColor: 'bg-purple-100'
    }
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
      
      <div className="max-w-3xl mx-auto space-y-3">
        {options.map((option) => (
          <motion.div
            key={option.id}
            onClick={() => handleSchadensartChange(option.id as FormData['schadensart']['hauptkategorie'])}
            className={cn(
              "p-4 border rounded-lg cursor-pointer transition-all flex items-center justify-between",
              formData.schadensart.hauptkategorie === option.id 
                ? `${option.activeBgColor} ${option.borderColor} shadow-sm` 
                : `bg-white border-gray-200 ${option.hoverBorderColor} hover:bg-gray-50`
            )}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex-1">
              <h3 className={cn("font-medium", option.color)}>{option.label}</h3>
              <p className="text-sm text-gray-500 mt-1">{option.description}</p>
            </div>
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", 
              formData.schadensart.hauptkategorie === option.id 
                ? option.color
                : "text-gray-400"
            )}>
              {option.icon}
            </div>
          </motion.div>
        ))}
      </div>
      
      {formData.schadensart.hauptkategorie === 'sonstiges' && (
        <motion.div 
          className="max-w-3xl mx-auto mt-4"
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
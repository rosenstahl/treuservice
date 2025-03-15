"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { Home, Building, ArrowRight, PanelTop, Building2, Warehouse } from 'lucide-react'

type DachTypStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const DachTypStep: React.FC<DachTypStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep
}) => {
  const [roofType, setRoofType] = useState<FormData['roof']['type']>(formData.roof.type)
  const [isValid, setIsValid] = useState(false)

  // Formular-Validierung
  const validateForm = useCallback(() => {
    // Prüfe, ob ein gültiger Dachtyp ausgewählt wurde (nicht leer)
    const valid = Boolean(roofType)
    setIsValid(valid)
  }, [roofType])

  // Validierung bei Änderungen
  useEffect(() => {
    validateForm()
  }, [roofType, validateForm])

  // Formular absenden
  const handleSubmit = () => {
    if (!isValid) return

    updateFormData({
      roof: {
        ...formData.roof,
        type: roofType
      }
    })
    
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
          Dachtyp
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte wählen Sie den Typ Ihres Daches aus, um eine geeignete PV-Montage zu planen.
        </motion.p>
      </div>
      
      <motion.div
        className="max-w-2xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {/* Dachtyp Auswahl */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { value: 'pitched', label: 'Schrägdach', icon: <Home /> },
              { value: 'flat', label: 'Flachdach', icon: <PanelTop /> },
              { value: 'facade', label: 'Fassade', icon: <Building2 /> },
              { value: 'carport', label: 'Carport', icon: <Warehouse /> },
              { value: 'other', label: 'Andere', icon: <Building /> }
            ].map((type) => (
              <motion.div 
                key={type.value}
                className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                  roofType === type.value ? 'border-[#009FD8] bg-[#009FD8]/5' : 'border-gray-200 hover:border-[#009FD8]/50'
                }`}
                onClick={() => setRoofType(type.value as FormData['roof']['type'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`text-3xl mb-3 ${roofType === type.value ? 'text-[#009FD8]' : 'text-gray-500'}`}>
                    {type.icon}
                  </div>
                  <span className={`text-sm ${roofType === type.value ? 'font-medium text-[#009FD8]' : 'text-gray-700'}`}>
                    {type.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Navigationsbuttons */}
        <div className="flex justify-center">
          <motion.button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-2/3 py-3 px-6 rounded-md font-medium transition-all duration-200 flex items-center justify-center ${
              isValid
                ? 'bg-[#009FD8] text-white hover:bg-[#007CAB] transform hover:scale-[1.03] hover:shadow-md'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={isValid ? { scale: 1.03 } : {}}
            whileTap={isValid ? { scale: 0.97 } : {}}
          >
            Weiter
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

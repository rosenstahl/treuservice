"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { ArrowRight } from 'lucide-react'

type RoofInfoStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const RoofInfoStep: React.FC<RoofInfoStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  const [roofMaterial, setRoofMaterial] = useState(formData.roof.material)
  const [roofOrientation, setRoofOrientation] = useState<FormData['roof']['orientation']>(formData.roof.orientation)
  const [roofArea, setRoofArea] = useState(formData.roof.area || 0)
  const [isValid, setIsValid] = useState(false)
  
  const roofMaterials = [
    'Ziegel',
    'Schiefer',
    'Metall',
    'Beton',
    'Bitumen',
    'Eternit',
    'Andere'
  ]

  // Formular-Validierung
  const validateForm = useCallback(() => {
    const valid = 
      roofMaterial !== '' && 
      Boolean(roofOrientation) && 
      roofArea > 0
    
    setIsValid(valid)
  }, [roofMaterial, roofOrientation, roofArea])

  // Validierung bei Änderungen
  useEffect(() => {
    validateForm()
  }, [roofMaterial, roofArea, roofOrientation, validateForm])

  // Formular absenden
  const handleSubmit = () => {
    if (!isValid) return

    updateFormData({
      roof: {
        ...formData.roof,
        material: roofMaterial,
        orientation: roofOrientation,
        area: roofArea
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
          Dachinfos
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte geben Sie uns weitere Informationen zu Ihrem Dach, damit wir die passende PV-Lösung für Sie finden können.
        </motion.p>
      </div>
      
      <motion.div
        className="max-w-2xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {/* Dachmaterial */}
        <div>
          <label 
            htmlFor="roofMaterial" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Dachmaterial
          </label>
          <select
            id="roofMaterial"
            value={roofMaterial}
            onChange={(e) => setRoofMaterial(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FD8]/50"
          >
            <option value="">Bitte auswählen</option>
            {roofMaterials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
        
        {/* Dachausrichtung */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Dachausrichtung
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'south', label: 'Süd' },
              { value: 'east-west', label: 'Ost-West' },
              { value: 'other', label: 'Andere' }
            ].map((orientation) => (
              <motion.div 
                key={orientation.value}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  roofOrientation === orientation.value ? 'border-[#009FD8] bg-[#009FD8]/5' : 'border-gray-200 hover:border-[#009FD8]/50'
                }`}
                onClick={() => setRoofOrientation(orientation.value as FormData['roof']['orientation'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center">
                  <span className={`text-sm ${roofOrientation === orientation.value ? 'font-medium text-[#009FD8]' : 'text-gray-700'}`}>
                    {orientation.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Dachfläche */}
        <div>
          <label 
            htmlFor="roofArea" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Verfügbare Dachfläche (m²)
          </label>
          <input
            id="roofArea"
            type="number"
            min="1"
            value={roofArea || ''}
            onChange={(e) => setRoofArea(parseFloat(e.target.value) || 0)}
            placeholder="Verfügbare Fläche in Quadratmetern"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FD8]/50"
          />
          <p className="mt-2 text-xs text-gray-500">
            Falls Sie die genaue Fläche nicht kennen, geben Sie bitte eine Schätzung an.
          </p>
        </div>
        
        {/* Navigationsbuttons */}
        <div className="flex gap-4">
          <motion.button
            onClick={goToPreviousStep}
            className="flex-1 py-3 px-6 rounded-md font-medium border border-gray-300 hover:border-[#009FD8] text-gray-700 transition-all duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Zurück
          </motion.button>
          
          <motion.button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 flex items-center justify-center ${
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

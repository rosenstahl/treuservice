"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { ArrowRight, Zap, AreaChart } from 'lucide-react'

type SystemSizeStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const SystemSizeStep: React.FC<SystemSizeStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  const [systemSize, setSystemSize] = useState(formData.system.size || 10)
  const [moduleType, setModuleType] = useState<FormData['system']['moduleType']>(formData.system.moduleType || 'standard')
  const [installationType, setInstallationType] = useState<FormData['system']['installationType']>(formData.system.installationType || 'roof-mounted')
  const [estimatedYield, setEstimatedYield] = useState(0)
  const [isValid, setIsValid] = useState(false)

  // Validierung bei Änderungen
  useEffect(() => {
    validateForm()
    // Berechne geschätzten Jahresertrag (kWh) basierend auf der Anlagengröße
    // Dies ist eine grobe Schätzung - 900-1100 kWh pro kWp in Deutschland
    const yieldFactor = moduleType === 'premium' ? 1100 : moduleType === 'bifacial' ? 1050 : 950
    setEstimatedYield(Math.round(systemSize * yieldFactor))
  }, [systemSize, moduleType, installationType])

  // Formular-Validierung
  const validateForm = () => {
    const valid = 
      systemSize > 0 && 
      moduleType !== '' && 
      installationType !== ''
    
    setIsValid(valid)
  }

  // Formular absenden
  const handleSubmit = () => {
    if (!isValid) return

    updateFormData({
      system: {
        size: systemSize,
        moduleType,
        installationType
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
          Anlagengröße
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bestimmen Sie die Größe Ihrer PV-Anlage und wählen Sie Modultyp sowie Installationsart aus.
        </motion.p>
      </div>
      
      <motion.div
        className="max-w-2xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {/* Größe der Anlage (kWp) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Anlagengröße (kWp)
          </label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">5 kWp</span>
              <span className="text-sm text-gray-500">30 kWp</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="0.5"
              value={systemSize}
              onChange={(e) => setSystemSize(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#009FD8]"
            />
            <div className="bg-[#009FD8]/10 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <Zap className="w-5 h-5 text-[#009FD8] mr-2" />
                <span className="font-medium">{systemSize} kWp</span>
              </div>
              <div className="flex items-center">
                <AreaChart className="w-5 h-5 text-[#009FD8] mr-2" />
                <span className="text-sm">≈ {estimatedYield} kWh/Jahr</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSystemSize(Math.max(5, systemSize - 0.5))}
                className="px-3 py-1 border border-gray-300 rounded-md hover:border-[#009FD8] transition-colors"
              >
                -
              </button>
              <input
                type="number"
                min="5"
                max="30"
                step="0.5"
                value={systemSize}
                onChange={(e) => setSystemSize(Math.min(30, Math.max(5, parseFloat(e.target.value) || 5)))}
                className="w-20 px-3 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#009FD8]/50"
              />
              <button 
                onClick={() => setSystemSize(Math.min(30, systemSize + 0.5))}
                className="px-3 py-1 border border-gray-300 rounded-md hover:border-[#009FD8] transition-colors"
              >
                +
              </button>
              <span className="text-sm text-gray-500">kWp</span>
            </div>
          </div>
        </div>
        
        {/* Modultyp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Modultyp
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                value: 'standard', 
                label: 'Standard', 
                desc: 'Gutes Preis-Leistungs-Verhältnis',
                efficiency: '19-21%'
              },
              { 
                value: 'premium', 
                label: 'Premium', 
                desc: 'Höherer Wirkungsgrad',
                efficiency: '21-23%'
              },
              { 
                value: 'bifacial', 
                label: 'Bifazial', 
                desc: 'Beidseitige Stromerzeugung',
                efficiency: '20-22%'
              }
            ].map((type) => (
              <motion.div 
                key={type.value}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  moduleType === type.value ? 'border-[#009FD8] bg-[#009FD8]/5' : 'border-gray-200 hover:border-[#009FD8]/50'
                }`}
                onClick={() => setModuleType(type.value as FormData['system']['moduleType'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col h-full">
                  <span className={`text-sm font-medium mb-1 ${moduleType === type.value ? 'text-[#009FD8]' : 'text-gray-700'}`}>
                    {type.label}
                  </span>
                  <span className="text-xs text-gray-500 mb-2">
                    {type.desc}
                  </span>
                  <div className="mt-auto">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                      Wirkungsgrad: {type.efficiency}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Installationsart */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Installationsart
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { 
                value: 'roof-mounted', 
                label: 'Aufdach', 
                desc: 'Montage auf vorhandener Dacheindeckung',
              },
              { 
                value: 'in-roof', 
                label: 'Indach', 
                desc: 'Integration in die Dacheindeckung',
              },
              { 
                value: 'flat-roof', 
                label: 'Flachdach', 
                desc: 'Aufständerung auf Flachdächern',
              }
            ].map((type) => (
              <motion.div 
                key={type.value}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  installationType === type.value ? 'border-[#009FD8] bg-[#009FD8]/5' : 'border-gray-200 hover:border-[#009FD8]/50'
                }`}
                onClick={() => setInstallationType(type.value as FormData['system']['installationType'])}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col h-full">
                  <span className={`text-sm font-medium mb-1 ${installationType === type.value ? 'text-[#009FD8]' : 'text-gray-700'}`}>
                    {type.label}
                  </span>
                  <span className="text-xs text-gray-500 mb-2">
                    {type.desc}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
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

"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { ArrowRight, Battery, BatteryCharging, BatteryFull, PenLine } from 'lucide-react'

type BatteryStorageStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const BatteryStorageStep: React.FC<BatteryStorageStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  const [includeStorage, setIncludeStorage] = useState(formData.battery.includeStorage)
  const [batteryCapacity, setBatteryCapacity] = useState(formData.battery.capacity || 0)
  const [additionalInfo, setAdditionalInfo] = useState(formData.additionalInfo || '')
  const [isValid, setIsValid] = useState(true) // Diese Schritte sind optional, daher immer gültig

  // Bei Änderung der Batteriekapazität prüfen, ob der Speicher aktiviert werden soll
  useEffect(() => {
    if (batteryCapacity > 0 && !includeStorage) {
      setIncludeStorage(true)
    }
  }, [batteryCapacity])

  // Beim Deaktivieren des Speichers die Kapazität zurücksetzen
  useEffect(() => {
    if (!includeStorage && batteryCapacity > 0) {
      setBatteryCapacity(0)
    }
  }, [includeStorage])

  // Formular absenden
  const handleSubmit = () => {
    updateFormData({
      battery: {
        includeStorage,
        capacity: batteryCapacity
      },
      additionalInfo
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
          Speicherlösung & Zusatzinformationen
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Möchten Sie einen Batteriespeicher integrieren? Teilen Sie uns hier auch weitere Informationen zu Ihrem Projekt mit.
        </motion.p>
      </div>
      
      <motion.div
        className="max-w-2xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {/* Speicherlösung */}
        <div className="bg-[#009FD8]/5 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <BatteryFull className="w-6 h-6 text-[#009FD8] mr-2" />
            <h3 className="text-lg font-medium">Batteriespeicher</h3>
          </div>
          
          <div className="mb-6">
            <label className="flex items-center cursor-pointer space-x-3">
              <input
                type="checkbox"
                checked={includeStorage}
                onChange={() => setIncludeStorage(!includeStorage)}
                className="form-checkbox h-5 w-5 text-[#009FD8] rounded border-gray-300 focus:ring-[#009FD8]"
              />
              <span className="text-sm font-medium text-gray-700">
                Ich möchte einen Batteriespeicher integrieren
              </span>
            </label>
            
            {includeStorage && (
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gewünschte Speicherkapazität (kWh)
                </label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">5 kWh</span>
                    <span className="text-xs text-gray-500">25 kWh</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="25"
                    step="1"
                    value={batteryCapacity || 5}
                    onChange={(e) => setBatteryCapacity(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#009FD8]"
                    disabled={!includeStorage}
                  />
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setBatteryCapacity(Math.max(5, batteryCapacity - 1))}
                      className={`px-3 py-1 border rounded-md transition-colors ${
                        includeStorage 
                          ? 'border-gray-300 hover:border-[#009FD8]' 
                          : 'border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!includeStorage}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="5"
                      max="25"
                      value={batteryCapacity || ''}
                      onChange={(e) => setBatteryCapacity(Math.min(25, Math.max(5, parseInt(e.target.value) || 0)))}
                      className={`w-20 px-3 py-1 border rounded-md text-center focus:outline-none focus:ring-2 ${
                        includeStorage 
                          ? 'border-gray-300 focus:ring-[#009FD8]/50' 
                          : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed'
                      }`}
                      placeholder="kWh"
                      disabled={!includeStorage}
                    />
                    <button 
                      onClick={() => setBatteryCapacity(Math.min(25, batteryCapacity + 1))}
                      className={`px-3 py-1 border rounded-md transition-colors ${
                        includeStorage 
                          ? 'border-gray-300 hover:border-[#009FD8]' 
                          : 'border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                      disabled={!includeStorage}
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-500">kWh</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-white rounded-md flex items-center">
                  <BatteryCharging className="w-5 h-5 text-[#009FD8] mr-2" />
                  <span className="text-sm">
                    {batteryCapacity} kWh entspricht etwa {Math.round(batteryCapacity / 5 * 100) / 10} kWh täglich
                  </span>
                </div>
                
                <p className="mt-4 text-xs text-gray-500">
                  Ein Speicher ermöglicht es Ihnen, selbst erzeugten Strom auch nachts zu nutzen und erhöht Ihre Unabhängigkeit vom Stromnetz.
                </p>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Zusatzinformationen */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <PenLine className="w-6 h-6 text-gray-700 mr-2" />
            <h3 className="text-lg font-medium">Weitere Informationen</h3>
          </div>
          
          <div className="mb-2">
            <label 
              htmlFor="additionalInfo" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Möchten Sie uns noch etwas zu Ihrem Projekt mitteilen?
            </label>
            <textarea
              id="additionalInfo"
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="z.B. besondere Anforderungen, Zeitrahmen, Budget..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009FD8]/50 min-h-[120px]"
            />
          </div>
          
          <p className="text-xs text-gray-500">
            Je mehr Informationen Sie uns geben, desto besser können wir auf Ihre individuellen Bedürfnisse eingehen.
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
            className="flex-1 py-3 px-6 rounded-md font-medium bg-[#009FD8] text-white hover:bg-[#007CAB] transition-all duration-200 flex items-center justify-center transform hover:scale-[1.03] hover:shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Weiter zur Zusammenfassung
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

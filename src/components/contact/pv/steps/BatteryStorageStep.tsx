"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { ArrowRight, Plus, Minus } from 'lucide-react'

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
  const [includeStorage, setIncludeStorage] = useState(formData.battery.includeStorage || false)
  const [batteryCapacity, setBatteryCapacity] = useState(formData.battery.capacity || 5)

  // Aktualisierung bei Änderungen des Speichers
  useEffect(() => {
    // Wenn kein Speicher gewählt wird, setze Kapazität auf 0
    if (!includeStorage && batteryCapacity > 0) {
      setBatteryCapacity(0);
    } 
    // Wenn Speicher gewählt wird, setze Mindestkapazität auf 5 kWh
    else if (includeStorage && batteryCapacity === 0) {
      setBatteryCapacity(5);
    }
  }, [includeStorage, batteryCapacity])

  // Submit Handler
  const handleSubmit = useCallback(() => {
    updateFormData({
      battery: {
        includeStorage,
        capacity: batteryCapacity
      }
    })
    
    goToNextStep()
  }, [updateFormData, includeStorage, batteryCapacity, goToNextStep])

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
          Batteriespeicher
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Möchten Sie einen Batteriespeicher in Ihre PV-Anlage integrieren?
        </motion.p>
      </div>
      
      <motion.div
        className="max-w-2xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
              !includeStorage ? 'border-[#009FD8] bg-[#009FD8]/5' : 'border-gray-200 hover:border-[#009FD8]/50'
            }`}
            onClick={() => setIncludeStorage(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`text-3xl mb-3 ${!includeStorage ? 'text-[#009FD8]' : 'text-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <span className={`text-lg font-medium ${!includeStorage ? 'text-[#009FD8]' : 'text-gray-700'}`}>
                Nein, kein Speicher
              </span>
              <p className="mt-2 text-sm text-gray-500">
                Einspeisen des überschüssigen Stroms ins Netz
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
              includeStorage ? 'border-[#009FD8] bg-[#009FD8]/5' : 'border-gray-200 hover:border-[#009FD8]/50'
            }`}
            onClick={() => setIncludeStorage(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`text-3xl mb-3 ${includeStorage ? 'text-[#009FD8]' : 'text-gray-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5zM3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
                </svg>
              </div>
              <span className={`text-lg font-medium ${includeStorage ? 'text-[#009FD8]' : 'text-gray-700'}`}>
                Ja, mit Batteriespeicher
              </span>
              <p className="mt-2 text-sm text-gray-500">
                Speichern des überschüssigen Stroms für späteren Verbrauch
              </p>
            </div>
          </motion.div>
        </div>
        
        {includeStorage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 p-6 rounded-lg"
          >
            <h3 className="text-lg font-medium text-gray-800 mb-4">Speicherkapazität:</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span>5 kWh</span>
                <span>20 kWh</span>
              </div>
              
              <input
                type="range"
                min="5"
                max="20"
                step="1"
                value={batteryCapacity}
                onChange={(e) => setBatteryCapacity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#009FD8]"
              />
              
              <div className="flex items-center justify-center gap-4">
                <button 
                  type="button"
                  onClick={() => setBatteryCapacity(Math.max(5, batteryCapacity - 1))}
                  className="p-2 rounded-full border border-gray-300 hover:border-[#009FD8] transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-[#009FD8]">{batteryCapacity}</span>
                  <span className="ml-2 text-gray-700">kWh</span>
                </div>
                
                <button 
                  type="button"
                  onClick={() => setBatteryCapacity(Math.min(20, batteryCapacity + 1))}
                  className="p-2 rounded-full border border-gray-300 hover:border-[#009FD8] transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mt-4 text-sm text-gray-600">
                <p>Empfohlene Speichergröße für Ihren Haushalt basierend auf Ihrer PV-Anlagengröße.</p>
                <p className="mt-2 text-xs text-gray-500">
                  * Die genaue Dimensionierung des Speichers erfolgt nach Prüfung Ihres individuellen Bedarfsprofils.
                </p>
              </div>
            </div>
          </motion.div>
        )}
        
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
            className="flex-1 py-3 px-6 rounded-md font-medium bg-[#009FD8] text-white hover:bg-[#007CAB] transform hover:scale-[1.03] hover:shadow-md transition-all duration-200 flex items-center justify-center"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Weiter
            <ArrowRight className="ml-2 h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

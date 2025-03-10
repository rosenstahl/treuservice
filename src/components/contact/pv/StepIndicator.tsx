"use client"

import React from 'react'
import { motion } from 'framer-motion'

// Interface für die Eigenschaften der StepIndicator-Komponente
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

// Die Schrittbeschreibungen für den Wizard
const stepsInfo = [
  'Kontaktdaten',
  'Dachinfo',
  'Anlagengröße',
  'Speicherlösung',
  'Zusammenfassung'
]

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  // Berechnet den Fortschritt in Prozent
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100
  
  return (
    <div className="mb-6">
      {/* Fortschrittsbalken */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
        <motion.div
          className="absolute h-full bg-[#009FD8]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      
      {/* Schrittindikatoren */}
      <div className="flex justify-between relative">
        {stepsInfo.map((step, index) => {
          // Bestimmt den Status jedes Schritts
          const isActive = index + 1 === currentStep
          const isCompleted = index + 1 < currentStep
          
          return (
            <div 
              key={index} 
              className="flex flex-col items-center relative"
              style={{ width: `${100 / totalSteps}%` }}
            >
              {/* Schrittnummer im Kreis */}
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium 
                  ${isActive ? 'bg-[#009FD8] text-white' : 
                    isCompleted ? 'bg-[#009FD8] text-white' : 'bg-gray-100 text-gray-500'}`}
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive || isCompleted ? '#009FD8' : '#f3f4f6'
                }}
                transition={{ duration: 0.3 }}
              >
                {index + 1}
              </motion.div>
              
              {/* Schrittbeschreibung */}
              <span 
                className={`text-xs mt-2 text-center 
                  ${isActive ? 'text-[#009FD8] font-medium' : 
                    isCompleted ? 'text-[#009FD8]' : 'text-gray-500'}`}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

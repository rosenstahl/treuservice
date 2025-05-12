"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)
  
  const stepLabels = [
    'Objekttyp',
    'Entkernungsart',
    'Optionen',
    'Wann & Wo',
    'Zusammenfassung'
  ]

  return (
    <div className="w-full mx-auto max-w-3xl">
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step} className="flex flex-col items-center relative" style={{ width: `${100/totalSteps}%` }}>
            <motion.div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors
                ${currentStep === step 
                  ? 'bg-[#009FD8] text-white' 
                  : currentStep > step 
                    ? 'bg-[#009FD8]/10 text-[#009FD8]' 
                    : 'bg-gray-100 text-gray-400'}`}
              initial={{ scale: 0.9 }}
              animate={{ 
                scale: currentStep === step ? 1 : 0.9,
                backgroundColor: currentStep === step 
                  ? '#009FD8' // primary color
                  : currentStep > step 
                    ? 'rgba(0, 159, 216, 0.1)' // primary color at 10%
                    : '#f3f4f6' // gray-100
              }}
              transition={{ duration: 0.2 }}
            >
              {currentStep > step ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-xs font-medium">{step}</span>
              )}
            </motion.div>
            <div 
              className={`hidden md:block text-xs mt-2 font-medium text-center px-1
              ${currentStep === step 
                ? 'text-[#009FD8]' 
                : currentStep > step 
                  ? 'text-[#009FD8]/60' 
                  : 'text-gray-400'}`}
              style={{ width: '100%', maxWidth: '80px' }}
            >
              {stepLabels[step - 1]}
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative mt-3 mb-2">
        <div className="absolute top-0 h-0.5 bg-gray-100 w-full rounded-full"></div>
        <motion.div 
          className="absolute top-0 h-0.5 bg-[#009FD8] rounded-full"
          initial={{ width: `0%` }}
          animate={{ 
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` 
          }}
          transition={{ duration: 0.3 }}
        ></motion.div>
      </div>
    </div>
  )
}
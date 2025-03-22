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
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                ${currentStep === step 
                  ? 'bg-accent text-white shadow-md' 
                  : currentStep > step 
                    ? 'bg-accent/20 text-accent' 
                    : 'bg-gray-200 text-gray-500'}`}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: currentStep === step ? 1.1 : 1,
                backgroundColor: currentStep === step 
                  ? '#0284c7' // accent color
                  : currentStep > step 
                    ? 'rgba(2, 132, 199, 0.2)' // accent/20
                    : '#e5e7eb' // gray-200
              }}
              transition={{ duration: 0.3 }}
            >
              {currentStep > step ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <span className="text-sm font-medium">{step}</span>
              )}
            </motion.div>
            <div 
              className={`text-xs mt-2 font-medium text-center px-1
              ${currentStep === step 
                ? 'text-accent' 
                : currentStep > step 
                  ? 'text-accent/70' 
                  : 'text-gray-500'}`}
              style={{ width: '100%', maxWidth: '100px' }}
            >
              {stepLabels[step - 1]}
            </div>
          </div>
        ))}
      </div>
      
      <div className="relative mt-3 mb-2">
        <div className="absolute top-0 h-1 bg-gray-200 w-full rounded-full"></div>
        <motion.div 
          className="absolute top-0 h-1 bg-accent rounded-full"
          initial={{ width: `0%` }}
          animate={{ 
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` 
          }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>
    </div>
  )
}
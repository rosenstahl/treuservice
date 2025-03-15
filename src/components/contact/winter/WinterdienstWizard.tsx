"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { AddressStep } from './steps/AddressStep'
import { AreaSelectionStep } from './steps/AreaSelectionStep'
import { PackageSelectionStep } from './steps/PackageSelectionStep'
import { AdditionalOptionsStep } from './steps/AdditionalOptionsStep'
import { SummaryStep } from './steps/SummaryStep'
import { GoogleMapsProvider } from './utils/GoogleMapsProvider'

// Optimierte FormData-Struktur
export type FormData = {
  address: string;
  area: {
    manual: boolean;
    value: number;
    coordinates?: Array<[number, number]>;
  };
  package: {
    type: 'all-in-one' | 'flex' | 'on-demand';
  };
  options: {
    environmentPackage: boolean;
    finalCleaning: boolean;
    offHours: {
      enabled: boolean;
      time?: string;
    };
    seasonExtension: {
      enabled: boolean;
      startDate: string;
      endDate: string;
    };
  };
}

const WinterdienstWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  
  // Initialisieren der Formular-Daten mit Standardwerten
  const [formData, setFormData] = useState<FormData>({
    address: '',
    area: {
      manual: false,
      value: 0
    },
    package: {
      type: 'all-in-one'
    },
    options: {
      environmentPackage: false,
      finalCleaning: false,
      offHours: {
        enabled: false
      },
      seasonExtension: {
        enabled: false,
        startDate: '2024-12-01',
        endDate: '2025-03-31'
      }
    }
  })

  // Navigation zwischen Schritten
  const goToNextStep = () => {
    if (currentStep < 5) {
      setDirection('forward')
      setCurrentStep(currentStep + 1)
    }
  }
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setDirection('backward')
      setCurrentStep(currentStep - 1)
    }
  }

  // Aktualisierung der Formulardaten
  const updateFormData = (newData: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...newData
    }))
  }

  // Animations-Varianten für Seitenübergänge
  const variants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -50 : 50,
      opacity: 0
    })
  }

  // Dynamisches Rendering des aktuellen Schritts
  const renderStep = () => {
    const commonProps = {
      formData,
      updateFormData,
      goToPreviousStep
    }
    
    switch (currentStep) {
      case 1:
        return <AddressStep {...commonProps} goToNextStep={goToNextStep} />
      case 2:
        return <AreaSelectionStep {...commonProps} goToNextStep={goToNextStep} />
      case 3:
        return <PackageSelectionStep {...commonProps} goToNextStep={goToNextStep} />
      case 4:
        return <AdditionalOptionsStep {...commonProps} goToNextStep={goToNextStep} />
      case 5:
        return <SummaryStep {...commonProps} isLastStep={true} />
      default:
        return null
    }
  }

  return (
    <GoogleMapsProvider>
      <motion.div 
        className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <StepIndicator currentStep={currentStep} totalSteps={5} />
          </motion.div>
          
          <div className="mt-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </GoogleMapsProvider>
  )
}

export default WinterdienstWizard
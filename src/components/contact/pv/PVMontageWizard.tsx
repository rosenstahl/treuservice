"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { ContactStep } from './steps/ContactStep'
import { RoofInfoStep } from './steps/RoofInfoStep'
import { SystemSizeStep } from './steps/SystemSizeStep'
import { BatteryStorageStep } from './steps/BatteryStorageStep'
import { SummaryStep } from './steps/SummaryStep'

// FormData-Struktur für PV-Montage
export type FormData = {
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  roof: {
    type: 'flat' | 'pitched' | 'facade' | 'carport' | 'other';
    material: string;
    orientation: 'south' | 'east-west' | 'other';
    area: number;
  };
  system: {
    size: number; // kWp
    moduleType: 'standard' | 'premium' | 'bifacial';
    installationType: 'roof-mounted' | 'in-roof' | 'flat-roof';
  };
  battery: {
    includeStorage: boolean;
    capacity: number; // kWh
  };
  additionalInfo: string;
}

const PVMontageWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  
  // Initialisieren der Formular-Daten mit Standardwerten
  const [formData, setFormData] = useState<FormData>({
    contact: {
      name: '',
      email: '',
      phone: ''
    },
    roof: {
      type: 'pitched',
      material: '',
      orientation: 'south',
      area: 0
    },
    system: {
      size: 10,
      moduleType: 'standard',
      installationType: 'roof-mounted'
    },
    battery: {
      includeStorage: false,
      capacity: 0
    },
    additionalInfo: ''
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
        return <ContactStep {...commonProps} goToNextStep={goToNextStep} />
      case 2:
        return <RoofInfoStep {...commonProps} goToNextStep={goToNextStep} />
      case 3:
        return <SystemSizeStep {...commonProps} goToNextStep={goToNextStep} />
      case 4:
        return <BatteryStorageStep {...commonProps} goToNextStep={goToNextStep} />
      case 5:
        return <SummaryStep {...commonProps} isLastStep={true} />
      default:
        return null
    }
  }

  return (
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
  )
}

export default PVMontageWizard
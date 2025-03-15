"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { ObjektTypStep } from './steps/ObjektTypStep'
import { UmfangBereichsStep } from './steps/UmfangBereichsStep'
import { SchadstoffOptionsStep } from './steps/SchadstoffOptionsStep'
import { AdresseTerminStep } from './steps/AdresseTerminStep'
import { ZusammenfassungStep } from './steps/ZusammenfassungStep'

// FormData-Struktur für den Entkernung-Wizard
export type FormData = {
  objektTyp: 'wohnung' | 'haus' | 'gewerbe' | 'industriegebaeude' | 'oeffentlichesgebaeude' | 'sonstiges' | '';
  objektDetails: {
    baujahr: string;
    flaeche: number;
    stockwerke: number;
    besonderheiten: string;
  };
  umfang: {
    komplettEntkernung: boolean;
    selektiverRueckbau: boolean;
    ausgewaehlteElemente: string[];
  };
  schadstoffoptionen: {
    asbest: boolean;
    pcb: boolean;
    kmf: boolean;
    schimmel: boolean;
    holzschutz: boolean;
    unbekannt: boolean;
  };
  zusatzoptionen: {
    entsorgung: boolean;
    beratung: boolean;
    statikPruefung: boolean;
    behoerdengaenge: boolean;
  };
  adresseTermin: {
    strasse: string;
    hausnummer: string;
    plz: string;
    ort: string;
    wunschtermin: string;
    alternativtermin: string;
  };
  kontakt: {
    name: string;
    email: string;
    telefon: string;
    nachricht: string;
  };
  preisschaetzung: number;
};

const EntkernungWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  
  // Initialisieren der Formular-Daten mit Standardwerten
  const [formData, setFormData] = useState<FormData>({
    objektTyp: '',
    objektDetails: {
      baujahr: '',
      flaeche: 0,
      stockwerke: 1,
      besonderheiten: ''
    },
    umfang: {
      komplettEntkernung: true,
      selektiverRueckbau: false,
      ausgewaehlteElemente: []
    },
    schadstoffoptionen: {
      asbest: false,
      pcb: false,
      kmf: false,
      schimmel: false,
      holzschutz: false,
      unbekannt: true
    },
    zusatzoptionen: {
      entsorgung: true,
      beratung: false,
      statikPruefung: false,
      behoerdengaenge: false
    },
    adresseTermin: {
      strasse: '',
      hausnummer: '',
      plz: '',
      ort: '',
      wunschtermin: '',
      alternativtermin: ''
    },
    kontakt: {
      name: '',
      email: '',
      telefon: '',
      nachricht: ''
    },
    preisschaetzung: 0
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
        return <ObjektTypStep {...commonProps} goToNextStep={goToNextStep} />
      case 2:
        return <UmfangBereichsStep {...commonProps} goToNextStep={goToNextStep} />
      case 3:
        return <SchadstoffOptionsStep {...commonProps} goToNextStep={goToNextStep} />
      case 4:
        return <AdresseTerminStep {...commonProps} goToNextStep={goToNextStep} />
      case 5:
        return <ZusammenfassungStep {...commonProps} isLastStep={true} />
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

export default EntkernungWizard
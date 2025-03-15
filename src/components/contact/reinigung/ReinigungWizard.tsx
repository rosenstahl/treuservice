"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { ReinigungsartStep } from './steps/ReinigungsartStep'
import { ObjektTypStep } from './steps/ObjektTypStep'
import { FlaecheInfoStep } from './steps/FlaecheInfoStep'
import { TerminServiceStep } from './steps/TerminServiceStep'
import { KontaktStep } from './steps/KontaktStep'
import { ZusammenfassungStep } from './steps/ZusammenfassungStep'

// FormData-Struktur für den Reinigungs-Wizard
export type FormData = {
  reinigungsart: {
    hauptkategorie: 'unterhaltsreinigung' | 'grundreinigung' | 'glas_fassade' | 'industrie' | 'reinraum' | 
                   'aussenanlagen' | 'sonderreinigung' | 'verkehrsmittel' | 'hotel' | 'veranstaltung' | 
                   'baureinigung' | 'steinreinigung' | 'dachreinigung' | 'solaranlagen' | 'sonstiges' | '';
    sonstigesText: string; // Für individuelle Eingabe
  };
  objektTyp: {
    typ: 'buero' | 'wohnhaus' | 'industrie' | 'gewerbe' | 'hotel' | 'krankenhaus' | 'schule' | 'aussenbereich' | 'sonstiges' | '';
    sonstigesText: string; // Für individuelle Eingabe
  };
  flaecheInfo: {
    flaeche: number; // in m²
    raumanzahl?: number; // Optional, je nach Objekttyp
    etagenanzahl?: number; // Optional, je nach Objekttyp
    fensteranzahl?: number; // Optional, je nach Reinigungsart
    spezialDetails: string; // Zusätzliche Angaben
  };
  terminService: {
    servicetyp: 'standard' | 'express' | 'sofort';
    regelmassigkeit: 'einmalig' | 'taeglich' | 'woechentlich' | 'monatlich' | 'individuell' | '';
    individuelleAngabe?: string; // Optional bei individuell
    wunschtermin: string;
    wunschzeit?: string; // Optional
    anmerkungen: string;
  };
  kontakt: {
    name: string;
    email: string;
    telefon: string;
    firma?: string; // Optional
    adresseStrasse: string;
    adresseHausnummer: string;
    adressePlz: string;
    adresseOrt: string;
    anmerkungen: string;
  };
}

const ReinigungWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  
  // Initialisieren der Formular-Daten mit Standardwerten
  const [formData, setFormData] = useState<FormData>({
    reinigungsart: {
      hauptkategorie: '',
      sonstigesText: ''
    },
    objektTyp: {
      typ: '',
      sonstigesText: ''
    },
    flaecheInfo: {
      flaeche: 0,
      spezialDetails: ''
    },
    terminService: {
      servicetyp: 'standard',
      regelmassigkeit: '',
      wunschtermin: '',
      anmerkungen: ''
    },
    kontakt: {
      name: '',
      email: '',
      telefon: '',
      adresseStrasse: '',
      adresseHausnummer: '',
      adressePlz: '',
      adresseOrt: '',
      anmerkungen: ''
    }
  })

  // Navigation zwischen Schritten
  const goToNextStep = () => {
    if (currentStep < 6) {
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
        return <ReinigungsartStep {...commonProps} goToNextStep={goToNextStep} />
      case 2:
        return <ObjektTypStep {...commonProps} goToNextStep={goToNextStep} />
      case 3:
        return <FlaecheInfoStep {...commonProps} goToNextStep={goToNextStep} />
      case 4:
        return <TerminServiceStep {...commonProps} goToNextStep={goToNextStep} />
      case 5:
        return <KontaktStep {...commonProps} goToNextStep={goToNextStep} />
      case 6:
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
          <StepIndicator currentStep={currentStep} totalSteps={6} />
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

export default ReinigungWizard
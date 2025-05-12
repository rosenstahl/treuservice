"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { DachTypStep } from './steps/DachTypStep'
import { RoofInfoStep } from './steps/RoofInfoStep'
import { SystemSizeStep } from './steps/SystemSizeStep'
import { BatteryStorageStep } from './steps/BatteryStorageStep'
import { SummaryStep } from './steps/SummaryStep'

// FormData-Struktur für PV-Montage mit erweiterten Daten
export type FormData = {
  dach: {
    typ: 'pitched' | 'flat' | 'facade' | 'carport' | 'other' | '';
    sonstigesText: string; // Für individuelle Beschreibung
    material: string;
    ausrichtung: 'south' | 'east-west' | 'other' | '';
    flaeche: number;
    neigung?: number; // optional, Grad
    hindernis: boolean; // Verschattungen/Hindernisse vorhanden
    hindernisDetails?: string; // optional, Beschreibung
  };
  anlage: {
    leistung: number; // kWp
    modulTyp: 'standard' | 'premium' | 'bifacial' | '';
    montageArt: 'roof-mounted' | 'in-roof' | 'flat-roof' | '';
    eigenverbrauch: number; // Prozent
    anzahlModule?: number; // optional, wenn bekannt
  };
  speicher: {
    speicherGewuenscht: boolean;
    kapazitaet: number; // kWh
    hersteller?: string; // optional
  };
  kontakt: {
    anrede?: 'herr' | 'frau' | 'keine' | '';
    vorname: string;
    nachname: string;
    email: string;
    telefon: string;
    firma?: string; // Optional
    adresseStrasse: string;
    adresseHausnummer: string;
    adressePlz: string;
    adresseOrt: string;
    wunschtermin?: string; // Optional
    anmerkungen: string;
  };
  datenschutz: boolean; // Hinzugefügt für Datenschutzerklärung Zustimmung
}

const PVMontageWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  
  // Initialisieren der Formular-Daten mit Standardwerten
  const [formData, setFormData] = useState<FormData>({
    dach: {
      typ: '',
      sonstigesText: '',
      material: '',
      ausrichtung: '',
      flaeche: 0,
      neigung: 30, // Standard-Dachneigung
      hindernis: false,
      hindernisDetails: ''
    },
    anlage: {
      leistung: 10,
      modulTyp: 'standard',
      montageArt: 'roof-mounted',
      eigenverbrauch: 70, // Standardwert 70%
      anzahlModule: undefined
    },
    speicher: {
      speicherGewuenscht: false,
      kapazitaet: 0,
      hersteller: ''
    },
    kontakt: {
      anrede: '',
      vorname: '',
      nachname: '',
      email: '',
      telefon: '',
      adresseStrasse: '',
      adresseHausnummer: '',
      adressePlz: '',
      adresseOrt: '',
      wunschtermin: '',
      anmerkungen: ''
    },
    datenschutz: false // Initialisiert mit false
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

  // Animations-Varianten für Seitenübergänge im Apple-Stil
  const variants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 20 : -20,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -20 : 20,
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
        return <DachTypStep {...commonProps} goToNextStep={goToNextStep} />
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
      className="w-full bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
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
                x: { type: "tween", duration: 0.2 },
                opacity: { duration: 0.15 }
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
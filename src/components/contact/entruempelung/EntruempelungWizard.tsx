"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { ObjektTypStep } from './steps/ObjektTypStep'
import { UmfangGroesseStep } from './steps/UmfangGroesseStep'
import { EntruempelungsartStep } from './steps/EntruempelungsartStep'
import { ZugangTerminStep } from './steps/ZugangTerminStep'
import { KontaktZusammenfassungStep } from './steps/KontaktZusammenfassungStep'

// FormData-Struktur für den Entrümpelungs-Wizard
export type FormData = {
  objektTyp: 'wohnung' | 'haus' | 'keller' | 'dachboden' | 'gewerbe' | 'sonstiges' | '';
  objektTypCustom: string; // Für individuelle Eingabe
  umfangGroesse: {
    flaeche: number; // in m²
    raumanzahl: number;
    fuellgrad: 'leer' | 'wenig' | 'mittel' | 'voll';
  };
  entrumpelungsart: {
    moebel: boolean;
    elektrogeraete: boolean;
    sperrmuell: boolean;
    bauschutt: boolean;
    sondermuell: boolean;
    sonstiges: boolean;
    sonstigesText: string; // Für individuelle Eingabe
  };
  adresseZugang: {
    strasse: string;
    hausnummer: string;
    plz: string;
    ort: string;
    etage: number;
    aufzug: boolean;
    parkmoeglichkeit: 'gut' | 'eingeschraenkt' | 'keine' | '';
  };
  terminKontakt: {
    wunschtermin: string;
    name: string;
    email: string;
    telefon: string;
  };
  zusatzleistungen: {
    reinigung: boolean;
    entsorgungsnachweis: boolean;
  };
}

const EntruempelungWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  
  // Initialisieren der Formular-Daten mit Standardwerten
  const [formData, setFormData] = useState<FormData>({
    objektTyp: '',
    objektTypCustom: '',
    umfangGroesse: {
      flaeche: 0,
      raumanzahl: 1,
      fuellgrad: 'mittel'
    },
    entrumpelungsart: {
      moebel: false,
      elektrogeraete: false,
      sperrmuell: false,
      bauschutt: false,
      sondermuell: false,
      sonstiges: false,
      sonstigesText: ''
    },
    adresseZugang: {
      strasse: '',
      hausnummer: '',
      plz: '',
      ort: '',
      etage: 0,
      aufzug: false,
      parkmoeglichkeit: ''
    },
    terminKontakt: {
      wunschtermin: '',
      name: '',
      email: '',
      telefon: ''
    },
    zusatzleistungen: {
      reinigung: false,
      entsorgungsnachweis: false
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
        return <ObjektTypStep {...commonProps} goToNextStep={goToNextStep} />
      case 2:
        return <UmfangGroesseStep {...commonProps} goToNextStep={goToNextStep} />
      case 3:
        return <EntruempelungsartStep {...commonProps} goToNextStep={goToNextStep} />
      case 4:
        return <ZugangTerminStep {...commonProps} goToNextStep={goToNextStep} />
      case 5:
        return <KontaktZusammenfassungStep {...commonProps} isLastStep={true} />
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

export default EntruempelungWizard
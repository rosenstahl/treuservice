"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { SchadensartStep } from './steps/SchadensartStep'
import { ObjektFlaecheStep } from './steps/ObjektFlaecheStep'
import { SchadensdetailsStep } from './steps/SchadensdetailsStep'
import { AdresseZugangStep } from './steps/AdresseZugangStep'
import { KontaktZusammenfassungStep } from './steps/KontaktZusammenfassungStep'

// FormData-Struktur für den Sanierungs-Wizard
export type FormData = {
  schadensart: {
    hauptkategorie: 'brand' | 'wasser' | 'schimmel' | 'sonstiges' | '';
    sonstigesText: string; // Für individuelle Eingabe
  };
  
  objekt: {
    typ: 'wohnung' | 'haus' | 'gewerbe' | 'keller' | 'dachboden' | 'sonstiges' | '';
    typCustom: string; // Für individuelle Eingabe
    betroffeneBereiche: string[];
    flaeche: number; // in m²
    schadensbeschreibung: string;
  };

  details: {
    // Brandschaden-spezifisch
    brandVerschmutzungsgrad: 'leicht' | 'mittel' | 'stark' | '';
    brandMaterialien: string[];
    
    // Wasserschaden-spezifisch
    wasserUrsache: 'rohrbruch' | 'unwetter' | 'hochwasser' | 'loeschwasser' | 'sonstige' | '';
    wasserUrsacheCustom: string;
    wasserArt: 'sauber' | 'kontaminiert' | '';
    wasserZeitpunkt: string; // Datum
    
    // Schimmel-spezifisch
    schimmelSichtbar: boolean;
    schimmelFlaeche: number;
    schimmelUrsacheBekannt: boolean;
    schimmelUrsache: string;
  };

  adresse: {
    strasse: string;
    hausnummer: string;
    plz: string;
    ort: string;
    etage: number;
    aufzug: boolean;
    parkmoeglichkeit: 'gut' | 'eingeschraenkt' | 'keine' | '';
    zugaenglichkeit: string;
  };

  kontakt: {
    anrede?: 'herr' | 'frau' | 'keine' | '';
    vorname: string;
    nachname: string;
    email: string;
    telefon: string;
    firma?: string; // Optional
    wunschtermin: string;
    wunschzeit: string;
    bevorzugteKontaktzeit: 'vormittags' | 'nachmittags' | 'abends' | '';
    anmerkungen: string;
  };
  
  datenschutz: boolean; // Hinzugefügt für Datenschutzerklärung Zustimmung
}

const SanierungWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  
  // Initialisieren der Formular-Daten mit Standardwerten
  const [formData, setFormData] = useState<FormData>({
    schadensart: {
      hauptkategorie: '',
      sonstigesText: ''
    },

    objekt: {
      typ: '',
      typCustom: '',
      betroffeneBereiche: [],
      flaeche: 0,
      schadensbeschreibung: ''
    },

    details: {
      // Brandschaden-spezifisch
      brandVerschmutzungsgrad: '',
      brandMaterialien: [],
      
      // Wasserschaden-spezifisch
      wasserUrsache: '',
      wasserUrsacheCustom: '',
      wasserArt: '',
      wasserZeitpunkt: '',
      
      // Schimmel-spezifisch
      schimmelSichtbar: false,
      schimmelFlaeche: 0,
      schimmelUrsacheBekannt: false,
      schimmelUrsache: ''
    },

    adresse: {
      strasse: '',
      hausnummer: '',
      plz: '',
      ort: '',
      etage: 0,
      aufzug: false,
      parkmoeglichkeit: '',
      zugaenglichkeit: ''
    },

    kontakt: {
      anrede: '',
      vorname: '',
      nachname: '',
      email: '',
      telefon: '',
      firma: '',
      wunschtermin: '',
      wunschzeit: '',
      bevorzugteKontaktzeit: '',
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
        return <SchadensartStep {...commonProps} goToNextStep={goToNextStep} />
      case 2:
        return <ObjektFlaecheStep {...commonProps} goToNextStep={goToNextStep} />
      case 3:
        return <SchadensdetailsStep {...commonProps} goToNextStep={goToNextStep} />
      case 4:
        return <AdresseZugangStep {...commonProps} goToNextStep={goToNextStep} />
      case 5:
        return <KontaktZusammenfassungStep {...commonProps} isLastStep={true} />
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

export default SanierungWizard
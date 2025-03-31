"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { ReinigungsartStep } from './steps/ReinigungsartStep'
import { ObjektTypStep } from './steps/ObjektTypStep'
import { FlaecheInfoStep } from './steps/FlaecheInfoStep'
import { TerminServiceStep } from './steps/TerminServiceStep'
import { KontaktZusammenfassungStep } from './steps/KontaktZusammenfassungStep'

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
    reinigungskraefte?: number; // Anzahl der benötigten Reinigungskräfte
    spezialDetails: string; // Zusätzliche Angaben
  };
  terminService: {
    servicetyp: 'standard' | 'express' | 'sofort';
    regelmassigkeit: 'einmalig' | 'taeglich' | 'woechentlich' | 'monatlich' | 'individuell' | '';
    individuelleAngabe?: string; // Optional bei individuell
    wunschtermin: string;
    endtermin?: string; // Enddatum für regelmäßige Reinigungen
    wunschzeit?: string; // Optional
    dienste?: { // Dienstzeiten, wie im Security-Bereich
      tagesdienst: boolean;
      nachtdienst: boolean;
      wochenenddienst: boolean;
      feiertagsdienst: boolean;
    };
    objekt_adresse?: { // Adresse des zu reinigenden Objekts
      strasse: string;
      hausnummer: string;
      plz: string;
      ort: string;
    };
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
  datenschutz: boolean; // Hinzugefügt für Datenschutzerklärung Zustimmung
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
      reinigungskraefte: 1, // Standardwert: 1 Reinigungskraft
      spezialDetails: ''
    },
    terminService: {
      servicetyp: 'standard',
      regelmassigkeit: '',
      wunschtermin: '',
      endtermin: undefined, // Enddatum ist optional
      dienste: { // Standardwerte für Dienstzeiten
        tagesdienst: true,
        nachtdienst: false,
        wochenenddienst: false,
        feiertagsdienst: false
      },
      objekt_adresse: { // Leere Adresse des zu reinigenden Objekts
        strasse: '',
        hausnummer: '',
        plz: '',
        ort: ''
      },
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
        return <ReinigungsartStep {...commonProps} goToNextStep={goToNextStep} />
      case 2:
        return <ObjektTypStep {...commonProps} goToNextStep={goToNextStep} />
      case 3:
        return <FlaecheInfoStep {...commonProps} goToNextStep={goToNextStep} />
      case 4:
        return <TerminServiceStep {...commonProps} goToNextStep={goToNextStep} />
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

export default ReinigungWizard
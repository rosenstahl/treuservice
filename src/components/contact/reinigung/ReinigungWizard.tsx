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
  preisschaetzung: number;
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
    },
    preisschaetzung: 0
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

    // Preisschätzung automatisch aktualisieren basierend auf ausgewählten Optionen
    // Dies ist eine einfache Implementierung und sollte in der Produktion erweitert werden
    calculatePrice({
      ...formData,
      ...newData
    })
  }

  // Einfache Preisberechnung basierend auf Formularwerten
  const calculatePrice = (data: FormData) => {
    let basispreis = 0
    
    // Beispielhafte Preisberechnung - in der Produktion sollte dies detaillierter sein
    if (data.reinigungsart.hauptkategorie) {
      switch(data.reinigungsart.hauptkategorie) {
        case 'unterhaltsreinigung': basispreis = 25; break
        case 'grundreinigung': basispreis = 35; break
        case 'glas_fassade': basispreis = 40; break
        case 'industrie': basispreis = 50; break
        case 'reinraum': basispreis = 80; break
        case 'aussenanlagen': basispreis = 30; break
        case 'sonderreinigung': basispreis = 45; break
        case 'verkehrsmittel': basispreis = 60; break
        case 'hotel': basispreis = 38; break
        case 'veranstaltung': basispreis = 55; break
        case 'baureinigung': basispreis = 42; break
        case 'steinreinigung': basispreis = 48; break
        case 'dachreinigung': basispreis = 65; break
        case 'solaranlagen': basispreis = 70; break
        default: basispreis = 30
      }
    }
    
    // Flächenabhängiger Preis
    const flaeche = data.flaecheInfo.flaeche || 0
    const flaechenpreis = flaeche * basispreis / 100
    
    // Aufschläge für Express und Sofort-Service
    let serviceAufschlag = 0
    if (data.terminService.servicetyp === 'express') {
      serviceAufschlag = flaechenpreis * 0.25 // 25% Aufschlag
    } else if (data.terminService.servicetyp === 'sofort') {
      serviceAufschlag = flaechenpreis * 0.5 // 50% Aufschlag
    }
    
    // Rabatt bei regelmäßiger Reinigung
    let regelmassigkeitsRabatt = 0
    if (data.terminService.regelmassigkeit === 'taeglich') {
      regelmassigkeitsRabatt = flaechenpreis * 0.3 // 30% Rabatt
    } else if (data.terminService.regelmassigkeit === 'woechentlich') {
      regelmassigkeitsRabatt = flaechenpreis * 0.2 // 20% Rabatt
    } else if (data.terminService.regelmassigkeit === 'monatlich') {
      regelmassigkeitsRabatt = flaechenpreis * 0.1 // 10% Rabatt
    }
    
    const totalPreis = flaechenpreis + serviceAufschlag - regelmassigkeitsRabatt
    
    // Mindestpreis
    const preisschaetzung = Math.max(totalPreis, 80)
    
    setFormData(prev => ({
      ...prev,
      preisschaetzung
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
"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { SecurityTypeStep } from './steps/SecurityTypeStep'
import { ObjektTypStep } from './steps/ObjektTypStep'
import { PersonalUmfangStep } from './steps/PersonalUmfangStep'
import { ZeitlicheInfosStep } from './steps/ZeitlicheInfosStep'
import { ZusammenfassungStep } from './steps/ZusammenfassungStep'

// FormData-Struktur für den Security-Wizard
export type FormData = {
  securityType: {
    hauptkategorie: 'objektschutz' | 'werkschutz' | 'baustellenbewachung' | 'asylunterkuenfte' | 
                   'city_streife' | 'revierstreifendienst' | 'doorman' | 'ladendetektiv' | 'empfangsdienst' | 
                   'nightaudit' | 'eventschutz' | 'standwache' | 'ordnerdienst' | 'parkraummanagement' | 
                   'chauffeurservice' | 'sonstiges' | '';
    sonstigesText: string; // Für individuelle Eingabe
  };
  objektTyp: {
    typ: 'gewerbe' | 'buero' | 'industrie' | 'baustelle' | 'veranstaltung' | 'wohnanlage' | 
         'privat' | 'handelsobjekt' | 'hotel' | 'institution' | 'sonstiges' | '';
    customDetails: string; // Für spezifische Details oder individuelle Angaben
  };
  personalUmfang: {
    anzahlMitarbeiter: number; // Anzahl der benötigten Sicherheitskräfte
    bewaffnung: boolean;
    qualifikationen: {
      sg34a: boolean; // Sachkundennachweis § 34a GewO
      ersteHilfe: boolean;
      brandschutz: boolean;
      deeskalation: boolean;
      evakuierung: boolean;
      fremdsprachen: boolean;
      sonstigeQualifikationen: string;
    };
    spezifischeAnforderungen: string;
  };
  zeitlicheInfos: {
    dauerTyp: 'einmalig' | 'kurzzeitig' | 'langfristig' | 'unbefristet' | '';
    beginnDatum: string;
    endeDatum?: string; // Optional, je nach dauerTyp
    wiederholung: 'keine' | 'taeglich' | 'woechentlich' | 'monatlich' | '';  
    dienste: {
      tagesdienst: boolean;
      nachtdienst: boolean;
      wochenenddienst: boolean;
      feiertagsdienst: boolean;
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
}

const SecurityWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  
  // Initialisieren der Formular-Daten mit Standardwerten
  const [formData, setFormData] = useState<FormData>({
    securityType: {
      hauptkategorie: '',
      sonstigesText: ''
    },
    objektTyp: {
      typ: '',
      customDetails: ''
    },
    personalUmfang: {
      anzahlMitarbeiter: 1,
      bewaffnung: false,
      qualifikationen: {
        sg34a: true,
        ersteHilfe: false,
        brandschutz: false,
        deeskalation: false,
        evakuierung: false,
        fremdsprachen: false,
        sonstigeQualifikationen: ''
      },
      spezifischeAnforderungen: ''
    },
    zeitlicheInfos: {
      dauerTyp: '',
      beginnDatum: '',
      wiederholung: 'keine',
      dienste: {
        tagesdienst: true,
        nachtdienst: false,
        wochenenddienst: false,
        feiertagsdienst: false
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
    }
  })

  // Navigation zwischen Schritten
  const goToNextStep = () => {
    if (currentStep < 5) { // Jetzt nur noch 5 Schritte statt 6
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
        return <SecurityTypeStep {...commonProps} goToNextStep={goToNextStep} />
      case 2:
        return <ObjektTypStep {...commonProps} goToNextStep={goToNextStep} />
      case 3:
        return <PersonalUmfangStep {...commonProps} goToNextStep={goToNextStep} />
      case 4:
        return <ZeitlicheInfosStep {...commonProps} goToNextStep={goToNextStep} />
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

export default SecurityWizard
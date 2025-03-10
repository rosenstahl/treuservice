"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { AnfrageTypStep } from './steps/AnfrageTypStep'
import { UnternehmenBedarfStep } from './steps/UnternehmenBedarfStep'
import { BewerberProfilStep } from './steps/BewerberProfilStep'
import { AnforderungenStep } from './steps/AnforderungenStep'
import { KonditionenStep } from './steps/KonditionenStep'
import { KontaktStep } from './steps/KontaktStep'
import { ZusammenfassungStep } from './steps/ZusammenfassungStep'

// FormData-Struktur für den Leiharbeit-Wizard
export type FormData = {
  anfrageTyp: 'unternehmen' | 'bewerber' | '';
  unternehmenBedarf?: {
    branche: 'produktion' | 'logistik' | 'handwerk' | 'buero' | 'it' | 'gastronomie' | 'handel' | 'medizin' | 'sonstiges' | '';
    brancheSonstiges?: string;
    anzahlMitarbeiter: number;
    qualifikationsniveau: 'ungelernt' | 'angelernt' | 'fachkraft' | 'spezialist' | 'fuehrungskraft' | '';
    einsatzdauer: 'kurzfristig' | 'mittelfristig' | 'langfristig' | '';
    einsatzbeginn: string;
  };
  bewerberProfil?: {
    fachbereich: 'produktion' | 'logistik' | 'handwerk' | 'buero' | 'it' | 'gastronomie' | 'handel' | 'medizin' | 'sonstiges' | '';
    fachbereichSonstiges?: string;
    qualifikation: 'ungelernt' | 'angelernt' | 'fachkraft' | 'spezialist' | 'fuehrungskraft' | '';
    berufserfahrungJahre: number;
    verfuegbarkeit: 'sofort' | 'ein_monat' | 'drei_monate' | 'spaeter' | '';
    arbeitszeit: 'vollzeit' | 'teilzeit' | 'minijob' | 'flexibel' | '';
    einsatzregion: string;
  };
  anforderungen: {
    // Gemeinsame Felder
    spezielleKenntnisse: string;
    schichtbereitschaft: 'nur_tag' | 'auch_nacht' | 'auch_wochenende' | 'voll_flexibel' | '';
    fuehrerschein: boolean;
    sprachkenntnisse: {
      deutsch: 'keine' | 'grundkenntnisse' | 'gut' | 'fliessend' | 'muttersprache' | '';
      englisch: 'keine' | 'grundkenntnisse' | 'gut' | 'fliessend' | 'muttersprache' | '';
      weitere: string;
    };
    // Bewerber-spezifische Felder
    zertifikate?: string;
    // Unternehmen-spezifische Felder
    sonstigeAnforderungen?: string;
  };
  konditionen: {
    // Gemeinsame Felder
    arbeitszeiten: string;
    ueberstundenBereitschaft: boolean;
    // Bewerber-spezifische Felder
    gehaltsvorstellung?: string;
    unterkunftBedarf?: boolean;
    // Unternehmen-spezifische Felder
    stundensatz?: string;
    unterkunftVorhanden?: boolean;
  };
  kontakt: {
    name: string;
    firma?: string;
    ansprechpartner?: string;
    telefon: string;
    email: string;
    adresseStrasse: string;
    adresseHausnummer: string;
    adressePlz: string;
    adresseOrt: string;
    kontaktzeitVon?: string;
    kontaktzeitBis?: string;
    anmerkungen: string;
  };
  // Datenschutz
  datenschutz: boolean;
  // Express-Angebot für Unternehmen
  expressAnfrage?: boolean;
}

const LeiharbeitWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  
  // Initialisieren der Formular-Daten mit Standardwerten
  const [formData, setFormData] = useState<FormData>({
    anfrageTyp: '',
    anforderungen: {
      spezielleKenntnisse: '',
      schichtbereitschaft: '',
      fuehrerschein: false,
      sprachkenntnisse: {
        deutsch: '',
        englisch: '',
        weitere: ''
      }
    },
    konditionen: {
      arbeitszeiten: '',
      ueberstundenBereitschaft: false
    },
    kontakt: {
      name: '',
      telefon: '',
      email: '',
      adresseStrasse: '',
      adresseHausnummer: '',
      adressePlz: '',
      adresseOrt: '',
      anmerkungen: ''
    },
    datenschutz: false
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

  // Pfad abhängig vom Anfragetyp (Unternehmen oder Bewerber)
  const renderSecondStep = () => {
    if (formData.anfrageTyp === 'unternehmen') {
      return <UnternehmenBedarfStep formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
    } else if (formData.anfrageTyp === 'bewerber') {
      return <BewerberProfilStep formData={formData} updateFormData={updateFormData} goToNextStep={goToNextStep} goToPreviousStep={goToPreviousStep} />
    }
    // Default (sollte nicht vorkommen, da im ersten Schritt ausgewählt)
    return null
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
        return <AnfrageTypStep {...commonProps} goToNextStep={goToNextStep} />
      case 2:
        return renderSecondStep()
      case 3:
        return <AnforderungenStep {...commonProps} goToNextStep={goToNextStep} />
      case 4:
        return <KonditionenStep {...commonProps} goToNextStep={goToNextStep} />
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

export default LeiharbeitWizard
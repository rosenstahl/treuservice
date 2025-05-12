"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { AnfrageTypStep } from './steps/AnfrageTypStep'
import { UnternehmenBedarfStep } from './steps/UnternehmenBedarfStep'
import { BewerberProfilStep } from './steps/BewerberProfilStep'
import { AnforderungenStep } from './steps/AnforderungenStep'
import { KonditionenStep } from './steps/KonditionenStep'
import { KontaktZusammenfassungStep } from './steps/KontaktZusammenfassungStep'

// FormData-Struktur für den Leiharbeit-Wizard
export type FormData = {
  anfrageTyp: 'unternehmen' | 'bewerber' | '';
  unternehmenBedarf?: {
    branche: 'produktion' | 'logistik' | 'handwerk' | 'buero' | 'it' | 'gastronomie' | 'handel' | 'medizin' | 'sonstiges' | '';
    brancheSonstiges?: string;
    anzahlMitarbeiter: number | string; // Geändert zu number | string für manuelle Eingabe
    qualifikationsniveau: 'ungelernt' | 'angelernt' | 'fachkraft' | 'spezialist' | 'fuehrungskraft' | '';
    einsatzdauer: 'ein_tag' | 'mehrere_tage' | 'kurzfristig' | 'mittelfristig' | 'langfristig' | ''; // Geändert für tageweise Optionen
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
    anrede?: 'herr' | 'frau' | 'keine' | '';
    vorname: string;
    nachname: string;
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
      anrede: '',
      vorname: '',
      nachname: '',
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

export default LeiharbeitWizard
"use client"

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from './StepIndicator'
import { SecurityTypeStep } from './steps/SecurityTypeStep'
import { ObjektTypStep } from './steps/ObjektTypStep'
import { PersonalUmfangStep } from './steps/PersonalUmfangStep'
import { ZeitlicheInfosStep } from './steps/ZeitlicheInfosStep'
import { KontaktStep } from './steps/KontaktStep'
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
  preisschaetzung: number;
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
    if (data.securityType.hauptkategorie) {
      switch(data.securityType.hauptkategorie) {
        case 'objektschutz': basispreis = 28; break
        case 'werkschutz': basispreis = 32; break
        case 'baustellenbewachung': basispreis = 30; break
        case 'asylunterkuenfte': basispreis = 30; break
        case 'city_streife': basispreis = 35; break
        case 'revierstreifendienst': basispreis = 28; break
        case 'doorman': basispreis = 32; break
        case 'ladendetektiv': basispreis = 35; break
        case 'empfangsdienst': basispreis = 28; break
        case 'nightaudit': basispreis = 34; break
        case 'eventschutz': basispreis = 35; break
        case 'standwache': basispreis = 29; break
        case 'ordnerdienst': basispreis = 28; break
        case 'parkraummanagement': basispreis = 25; break
        case 'chauffeurservice': basispreis = 45; break
        default: basispreis = 30
      }
    }
    
    // Mitarbeiteranzahl
    const anzahlMitarbeiter = data.personalUmfang.anzahlMitarbeiter || 1
    
    // Arbeitsstunden pro Tag schätzen (basierend auf gewählten Diensten)
    let stundenProTag = 8
    const dienste = data.zeitlicheInfos.dienste
    if (dienste.tagesdienst && dienste.nachtdienst) stundenProTag = 16
    if (dienste.tagesdienst && dienste.nachtdienst && (dienste.wochenenddienst || dienste.feiertagsdienst)) stundenProTag = 24
    
    // Tage schätzen (basierend auf Dauer)
    let anzahlTage = 1
    const dauerTyp = data.zeitlicheInfos.dauerTyp
    if (dauerTyp === 'kurzzeitig') anzahlTage = 14
    else if (dauerTyp === 'langfristig') anzahlTage = 30
    else if (dauerTyp === 'unbefristet') anzahlTage = 30 // Monatliche Berechnung
    
    // Spezielle Anforderungen Aufschlag
    let qualifikationsAufschlag = 0
    const qualifikationen = data.personalUmfang.qualifikationen
    if (qualifikationen.brandschutz) qualifikationsAufschlag += 2
    if (qualifikationen.deeskalation) qualifikationsAufschlag += 3
    if (qualifikationen.evakuierung) qualifikationsAufschlag += 2
    if (qualifikationen.fremdsprachen) qualifikationsAufschlag += 5
    if (data.personalUmfang.bewaffnung) qualifikationsAufschlag += 10

    // Dauer-basierte Rabatte
    let dauerRabatt = 0
    if (dauerTyp === 'langfristig') dauerRabatt = 0.1 // 10% Rabatt
    else if (dauerTyp === 'unbefristet') dauerRabatt = 0.15 // 15% Rabatt
    
    // Gesamtpreis berechnen
    const stundenpreis = basispreis + qualifikationsAufschlag
    let gesamtpreis = stundenpreis * stundenProTag * anzahlTage * anzahlMitarbeiter
    gesamtpreis = gesamtpreis * (1 - dauerRabatt)
    
    // Mindestpreis
    const preisschaetzung = Math.max(gesamtpreis, 200)
    
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
        return <SecurityTypeStep {...commonProps} goToNextStep={goToNextStep} />
      case 2:
        return <ObjektTypStep {...commonProps} goToNextStep={goToNextStep} />
      case 3:
        return <PersonalUmfangStep {...commonProps} goToNextStep={goToNextStep} />
      case 4:
        return <ZeitlicheInfosStep {...commonProps} goToNextStep={goToNextStep} />
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

export default SecurityWizard
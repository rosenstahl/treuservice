"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SecurityWizard'
import { Shield, Heart, Flame, AlertTriangle, School, Languages, AlertCircle } from 'lucide-react'

type PersonalUmfangStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Informationen zu Qualifikationen
const qualificationsInfo: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
  sg34a: {
    title: "Sachkundeprüfung nach § 34a GewO",
    description: "Obligatorische Grundqualifikation für Sicherheitspersonal",
    icon: <Shield className="h-5 w-5" />
  },
  ersteHilfe: {
    title: "Erweiterte Erste-Hilfe",
    description: "Umfassende Kenntnisse zur medizinischen Erstversorgung",
    icon: <Heart className="h-5 w-5" />
  },
  brandschutz: {
    title: "Brandschutzhelfer",
    description: "Zertifizierte Ausbildung im Bereich Brandschutz",
    icon: <Flame className="h-5 w-5" />
  },
  deeskalation: {
    title: "Deeskalationstraining",
    description: "Spezialtechniken zur Konfliktlösung und Gewaltprävention",
    icon: <AlertTriangle className="h-5 w-5" />
  },
  evakuierung: {
    title: "Evakuierungshelfer",
    description: "Qualifikation zur strukturierten Räumung von Gebäuden",
    icon: <AlertCircle className="h-5 w-5" />
  },
  fremdsprachen: {
    title: "Fremdsprachenkenntnisse",
    description: "Personal mit Kompetenzen in relevanten Fremdsprachen",
    icon: <Languages className="h-5 w-5" />
  }
}

export const PersonalUmfangStep: React.FC<PersonalUmfangStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  // Zustandsvariablen
  const [anzahlMitarbeiter, setAnzahlMitarbeiter] = useState(formData.personalUmfang.anzahlMitarbeiter || 1)
  const [bewaffnung, setBewaffnung] = useState(formData.personalUmfang.bewaffnung || false)
  const [qualifikationen, setQualifikationen] = useState(formData.personalUmfang.qualifikationen)
  const [sonstigeQualifikationen, setSonstigeQualifikationen] = useState(
    formData.personalUmfang.qualifikationen.sonstigeQualifikationen || ''
  )
  const [spezifischeAnforderungen, setSpezifischeAnforderungen] = useState(
    formData.personalUmfang.spezifischeAnforderungen || ''
  )
  const [error, setError] = useState('')

  // Handler für Änderungen
  const handleAnzahlMitarbeiterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    setAnzahlMitarbeiter(Math.max(1, value)) // Mindestens 1 Mitarbeiter
    updateFormData({
      personalUmfang: {
        ...formData.personalUmfang,
        anzahlMitarbeiter: Math.max(1, value)
      }
    })
  }

  const handleBewaffnungChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setBewaffnung(checked)
    updateFormData({
      personalUmfang: {
        ...formData.personalUmfang,
        bewaffnung: checked
      }
    })
  }

  const handleQualifikationChange = (name: keyof FormData['personalUmfang']['qualifikationen'], checked: boolean) => {
    if (name === 'sonstigeQualifikationen') return; // Dieser Fall wird separat behandelt
    
    const updatedQualifikationen = {
      ...qualifikationen,
      [name]: checked
    }
    
    setQualifikationen(updatedQualifikationen)
    updateFormData({
      personalUmfang: {
        ...formData.personalUmfang,
        qualifikationen: updatedQualifikationen
      }
    })
  }

  const handleSonstigeQualifikationenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSonstigeQualifikationen(value)
    updateFormData({
      personalUmfang: {
        ...formData.personalUmfang,
        qualifikationen: {
          ...formData.personalUmfang.qualifikationen,
          sonstigeQualifikationen: value
        }
      }
    })
  }

  const handleSpezifischeAnforderungenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setSpezifischeAnforderungen(value)
    updateFormData({
      personalUmfang: {
        ...formData.personalUmfang,
        spezifischeAnforderungen: value
      }
    })
  }

  const handleContinue = () => {
    // Basisvalidierung
    if (anzahlMitarbeiter < 1) {
      setError('Bitte geben Sie mindestens einen Mitarbeiter an')
      return
    }
    
    goToNextStep()
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <motion.h2 
          className="text-2xl font-medium text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          Personal und Qualifikationen
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Geben Sie an, wie viele Sicherheitskräfte Sie benötigen und welche Qualifikationen diese haben sollten.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {/* Anzahl der Mitarbeiter */}
          <div>
            <label htmlFor="anzahlMitarbeiter" className="block text-sm font-medium text-gray-700 mb-1">
              Anzahl der benötigten Sicherheitskräfte
            </label>
            <div className="flex max-w-xs">
              <button
                type="button"
                onClick={() => handleAnzahlMitarbeiterChange({ target: { value: String(Math.max(1, anzahlMitarbeiter - 1)) } } as React.ChangeEvent<HTMLInputElement>)}
                className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
              >
                -
              </button>
              <input
                id="anzahlMitarbeiter"
                type="number"
                min="1"
                value={anzahlMitarbeiter}
                onChange={handleAnzahlMitarbeiterChange}
                className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
              />
              <button
                type="button"
                onClick={() => handleAnzahlMitarbeiterChange({ target: { value: String(anzahlMitarbeiter + 1) } } as React.ChangeEvent<HTMLInputElement>)}
                className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
              >
                +
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Mindestbestellung: 1 Sicherheitskraft
            </p>
          </div>

          {/* Bewaffnung */}
          <div>
            <div className="flex items-center space-x-3">
              <input
                id="bewaffnung"
                name="bewaffnung"
                type="checkbox"
                checked={bewaffnung}
                onChange={handleBewaffnungChange}
                className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
              />
              <label htmlFor="bewaffnung" className="font-medium text-gray-800">
                Bewaffneter Sicherheitsdienst
              </label>
            </div>
            {bewaffnung && (
              <p className="mt-1 text-sm text-yellow-600 ml-7">
                <AlertTriangle className="inline-block h-4 w-4 mr-1" /> 
                Bewaffnete Dienste erfordern spezielle Genehmigungen und unterliegen besonderen rechtlichen Anforderungen.
              </p>
            )}
          </div>

          {/* Qualifikationen */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <School className="h-4 w-4 mr-2" />
              Erforderliche Qualifikationen
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {Object.entries(qualificationsInfo).map(([key, info]) => (
                <div key={key} className="flex items-start space-x-2">
                  <input
                    id={key}
                    name={key}
                    type="checkbox"
                    checked={qualifikationen[key as keyof typeof qualifikationen] || false}
                    onChange={(e) => handleQualifikationChange(key as keyof FormData['personalUmfang']['qualifikationen'], e.target.checked)}
                    className="h-4 w-4 mt-0.5 text-accent focus:ring-accent border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <label htmlFor={key} className="flex items-center text-sm font-medium text-gray-700">
                      {info.icon && <span className="mr-1 text-accent">{info.icon}</span>}
                      {info.title}
                    </label>
                    <p className="text-xs text-gray-500">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <label htmlFor="sonstigeQualifikationen" className="block text-sm font-medium text-gray-700 mb-1">
                Weitere Qualifikationen (optional)
              </label>
              <input
                id="sonstigeQualifikationen"
                name="sonstigeQualifikationen"
                type="text"
                value={sonstigeQualifikationen}
                onChange={handleSonstigeQualifikationenChange}
                placeholder="z.B. Waffenschein, Sachkundeprüfung..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
              />
            </div>
          </div>

          {/* Spezifische Anforderungen */}
          <div>
            <label htmlFor="spezifischeAnforderungen" className="block text-sm font-medium text-gray-700 mb-1">
              Spezifische Anforderungen (optional)
            </label>
            <textarea
              id="spezifischeAnforderungen"
              name="spezifischeAnforderungen"
              rows={3}
              value={spezifischeAnforderungen}
              onChange={handleSpezifischeAnforderungenChange}
              placeholder="Besondere Anforderungen an das Personal, z.B. Kleidung, Ausbildung, Verhalten..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            />
          </div>
        </motion.div>

        {error && (
          <motion.p 
            className="text-red-500 text-sm text-center mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
        
        <motion.div 
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <motion.button
            onClick={goToPreviousStep}
            className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Zurück
          </motion.button>

          <motion.button
            onClick={handleContinue}
            className="py-3 px-8 rounded-md font-medium transition-all duration-200 bg-accent text-white hover:bg-accent-dark hover:shadow-md"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Weiter
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
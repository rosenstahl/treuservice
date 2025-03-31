"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SecurityWizard'
import { Shield, Heart, Flame, AlertTriangle, School, Languages, AlertCircle } from 'lucide-react'
import { Checkbox2 } from '@/components/ui/checkbox2'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type PersonalUmfangStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Informationen zu Qualifikationen
const qualificationsInfo: Record<string, { title: string; description: string; icon: React.ReactNode; color: string }> = {
  sg34a: {
    title: "Sachkundeprüfung nach § 34a GewO",
    description: "Obligatorische Grundqualifikation für Sicherheitspersonal",
    icon: <Shield className="h-4 w-4" />,
    color: "text-[#009FD8]"
  },
  ersteHilfe: {
    title: "Erweiterte Erste-Hilfe",
    description: "Umfassende Kenntnisse zur medizinischen Erstversorgung",
    icon: <Heart className="h-4 w-4" />,
    color: "text-red-500"
  },
  brandschutz: {
    title: "Brandschutzhelfer",
    description: "Zertifizierte Ausbildung im Bereich Brandschutz",
    icon: <Flame className="h-4 w-4" />,
    color: "text-orange-500"
  },
  deeskalation: {
    title: "Deeskalationstraining",
    description: "Spezialtechniken zur Konfliktlösung und Gewaltprävention",
    icon: <AlertTriangle className="h-4 w-4" />,
    color: "text-amber-500"
  },
  evakuierung: {
    title: "Evakuierungshelfer",
    description: "Qualifikation zur strukturierten Räumung von Gebäuden",
    icon: <AlertCircle className="h-4 w-4" />,
    color: "text-amber-500"
  },
  fremdsprachen: {
    title: "Fremdsprachenkenntnisse",
    description: "Personal mit Kompetenzen in relevanten Fremdsprachen",
    icon: <Languages className="h-4 w-4" />,
    color: "text-green-500"
  }
}

// Lokaler Status-Typ
type LocalStateType = {
  anzahlMitarbeiter: number;
  bewaffnung: boolean;
  qualifikationen: FormData['personalUmfang']['qualifikationen'];
  sonstigeQualifikationen: string;
  spezifischeAnforderungen: string;
  error: string;
}

export const PersonalUmfangStep: React.FC<PersonalUmfangStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  // Zustandsvariablen
  const [localState, setLocalState] = useState<LocalStateType>({
    anzahlMitarbeiter: formData.personalUmfang.anzahlMitarbeiter || 1,
    bewaffnung: formData.personalUmfang.bewaffnung || false,
    qualifikationen: {
      ...formData.personalUmfang.qualifikationen
    },
    sonstigeQualifikationen: formData.personalUmfang.qualifikationen.sonstigeQualifikationen || '',
    spezifischeAnforderungen: formData.personalUmfang.spezifischeAnforderungen || '',
    error: ''
  });

  // Helfer-Funktion zum Aktualisieren des lokalen Zustands
  const updateLocalState = useCallback((updates: Partial<LocalStateType>) => {
    setLocalState(prev => ({ ...prev, ...updates }));
  }, []);

  // Funktion zum Aktualisieren des formData
  const saveToFormData = useCallback(() => {
    updateFormData({
      personalUmfang: {
        anzahlMitarbeiter: localState.anzahlMitarbeiter,
        bewaffnung: localState.bewaffnung,
        qualifikationen: {
          ...localState.qualifikationen,
          sonstigeQualifikationen: localState.sonstigeQualifikationen
        },
        spezifischeAnforderungen: localState.spezifischeAnforderungen
      }
    });
  }, [localState, updateFormData]);

  // Handler für Änderungen
  const handleAnzahlMitarbeiterChange = useCallback((newValue: number) => {
    const value = Math.max(1, newValue); // Mindestens 1 Mitarbeiter
    updateLocalState({ anzahlMitarbeiter: value });
    setTimeout(saveToFormData, 0);
  }, [updateLocalState, saveToFormData]);

  const handleBewaffnungChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    updateLocalState({ bewaffnung: checked });
    setTimeout(saveToFormData, 0);
  }, [updateLocalState, saveToFormData]);

  const handleQualifikationChange = useCallback((name: keyof FormData['personalUmfang']['qualifikationen'], checked: boolean) => {
    if (name === 'sonstigeQualifikationen') return; // Dieser Fall wird separat behandelt
    
    const updatedQualifikationen = {
      ...localState.qualifikationen,
      [name]: checked
    };
    
    updateLocalState({ qualifikationen: updatedQualifikationen });
    setTimeout(saveToFormData, 0);
  }, [localState.qualifikationen, updateLocalState, saveToFormData]);

  const handleSonstigeQualifikationenChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateLocalState({ sonstigeQualifikationen: value });
    
    // Verzögertes Aktualisieren von formData
    clearTimeout((window as { textChangeTimeout?: number }).textChangeTimeout);
    (window as { textChangeTimeout?: number }).textChangeTimeout = window.setTimeout(saveToFormData, 500);
  }, [updateLocalState, saveToFormData]);

  const handleSpezifischeAnforderungenChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    updateLocalState({ spezifischeAnforderungen: value });
    
    // Verzögertes Aktualisieren von formData
    clearTimeout((window as { textChangeTimeout2?: number }).textChangeTimeout2);
    (window as { textChangeTimeout2?: number }).textChangeTimeout2 = window.setTimeout(saveToFormData, 500);
  }, [updateLocalState, saveToFormData]);

  const handleContinue = useCallback(() => {
    // Basisvalidierung
    if (localState.anzahlMitarbeiter < 1) {
      updateLocalState({ error: 'Bitte geben Sie mindestens einen Mitarbeiter an' });
      return;
    }
    
    saveToFormData();
    goToNextStep();
  }, [localState.anzahlMitarbeiter, updateLocalState, saveToFormData, goToNextStep]);

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-center mb-6">
        <motion.h2 
          className="text-xl font-medium text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.2 }}
        >
          Personal und Qualifikationen
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Geben Sie an, wie viele Sicherheitskräfte Sie benötigen und welche Qualifikationen diese haben sollten.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          {/* Anzahl der Mitarbeiter im Apple-Stil */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <Label htmlFor="anzahlMitarbeiter" className="block text-sm font-medium text-gray-700 mb-3">
              Anzahl der benötigten Sicherheitskräfte
            </Label>
            <div className="flex max-w-xs">
              <button
                type="button"
                onClick={() => handleAnzahlMitarbeiterChange(localState.anzahlMitarbeiter - 1)}
                className="px-3 py-2 bg-gray-100 rounded-l-full border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
                disabled={localState.anzahlMitarbeiter <= 1}
              >
                -
              </button>
              <input
                id="anzahlMitarbeiter"
                type="text"
                inputMode="numeric"
                value={localState.anzahlMitarbeiter}
                onChange={(e) => handleAnzahlMitarbeiterChange(parseInt(e.target.value) || 1)}
                className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
                style={{ appearance: "textfield" }}
              />
              <button
                type="button"
                onClick={() => handleAnzahlMitarbeiterChange(localState.anzahlMitarbeiter + 1)}
                className="px-3 py-2 bg-gray-100 rounded-r-full border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
              >
                +
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Mindestbestellung: 1 Sicherheitskraft
            </p>
          </div>

          {/* Bewaffnung */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <Checkbox2
                id="bewaffnung"
                checked={localState.bewaffnung}
                onChange={handleBewaffnungChange}
              />
              <Label htmlFor="bewaffnung" className="font-medium text-gray-800 text-sm">
                Bewaffneter Sicherheitsdienst
              </Label>
            </div>
            {localState.bewaffnung && (
              <p className="mt-1 text-xs text-amber-600 ml-7">
                <AlertTriangle className="inline-block h-4 w-4 mr-1" /> 
                Bewaffnete Dienste erfordern spezielle Genehmigungen und unterliegen besonderen rechtlichen Anforderungen.
              </p>
            )}
          </div>

          {/* Qualifikationen mit angepassten Farben */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <School className="h-4 w-4 mr-2 text-[#009FD8]" />
              Erforderliche Qualifikationen
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {Object.entries(qualificationsInfo).map(([key, info]) => (
                <div key={key} className="flex items-start space-x-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <Checkbox2
                    id={key}
                    checked={Boolean(localState.qualifikationen[key as keyof typeof localState.qualifikationen])}
                    onChange={(e) => handleQualifikationChange(key as keyof FormData['personalUmfang']['qualifikationen'], e.target.checked)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Label htmlFor={key} className="flex items-center text-sm font-medium text-gray-700">
                      {info.icon && <span className={`mr-1 ${info.color}`}>{info.icon}</span>}
                      {info.title}
                    </Label>
                    <p className="text-xs text-gray-500">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <Label htmlFor="sonstigeQualifikationen" className="block text-xs font-medium text-gray-700 mb-1">
                Weitere Qualifikationen (optional)
              </Label>
              <Input
                id="sonstigeQualifikationen"
                value={localState.sonstigeQualifikationen}
                onChange={handleSonstigeQualifikationenChange}
                placeholder="z.B. Waffenschein, Sachkundeprüfung..."
                className="w-full bg-white rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
              />
            </div>
          </div>

          {/* Spezifische Anforderungen */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <Label htmlFor="spezifischeAnforderungen" className="block text-xs font-medium text-gray-700 mb-1">
              Spezifische Anforderungen (optional)
            </Label>
            <Textarea
              id="spezifischeAnforderungen"
              rows={3}
              value={localState.spezifischeAnforderungen}
              onChange={handleSpezifischeAnforderungenChange}
              placeholder="Besondere Anforderungen an das Personal, z.B. Kleidung, Ausbildung, Verhalten..."
              className="w-full bg-white rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
            />
          </div>
        </motion.div>

        {localState.error && (
          <motion.p 
            className="text-red-500 text-xs text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {localState.error}
          </motion.p>
        )}
        
        <motion.div 
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <motion.button
            onClick={() => {
              saveToFormData();
              goToPreviousStep();
            }}
            className="py-2.5 px-6 rounded-full bg-gray-50 text-gray-600 text-xs font-medium border border-gray-200 hover:bg-gray-100 transition-all duration-200"
          >
            Zurück
          </motion.button>

          <motion.button
            onClick={handleContinue}
            className="py-2.5 px-6 rounded-full text-xs font-medium transition-all duration-200 bg-[#009FD8] text-white hover:bg-[#007CAB]"
          >
            Weiter
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
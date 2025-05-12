"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { Battery, BatteryMedium, BatteryFull, Info, Zap } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

type BatteryStorageStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

type LocalStateType = {
  speicherGewuenscht: boolean;
  kapazitaet: number;
  hersteller: string;
  error: string;
}

export const BatteryStorageStep: React.FC<BatteryStorageStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  // Lokaler Zustand
  const [localState, setLocalState] = useState<LocalStateType>({
    speicherGewuenscht: formData.speicher.speicherGewuenscht,
    kapazitaet: formData.speicher.kapazitaet || 0,
    hersteller: formData.speicher.hersteller || '',
    error: ''
  });

  // Helfer-Funktion zum Aktualisieren des lokalen Zustands
  const updateLocalState = useCallback((updates: Partial<LocalStateType>) => {
    setLocalState(prev => ({ ...prev, ...updates }));
  }, []);

  // Aktualisierung der Formulardaten
  const saveToFormData = useCallback(() => {
    updateFormData({
      speicher: {
        speicherGewuenscht: localState.speicherGewuenscht,
        kapazitaet: localState.kapazitaet,
        hersteller: localState.hersteller
      }
    });
  }, [localState, updateFormData]);

  // Handler für Speicher-Auswahl
  const handleSpeicherSelect = useCallback((gewuenscht: boolean) => {
    updateLocalState({ 
      speicherGewuenscht: gewuenscht,
      error: ''
    });
  }, [updateLocalState]);

  // Handler für Kapazitäts-Slider
  const handleKapazitaetChange = useCallback((value: number[]) => {
    updateLocalState({ kapazitaet: value[0], error: '' });
  }, [updateLocalState]);

  // Handler für Hersteller-Eingabe
  const handleHerstellerChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateLocalState({ hersteller: e.target.value, error: '' });
  }, [updateLocalState]);

  // Validierung und Weiterleitung
  const handleContinue = useCallback(() => {
    // Validierung wenn Speicher gewünscht ist
    if (localState.speicherGewuenscht && localState.kapazitaet <= 0) {
      updateLocalState({ error: 'Bitte geben Sie eine gültige Speicherkapazität an' });
      return;
    }
    
    // Speichern der Daten und Weiterleitung
    saveToFormData();
    goToNextStep();
  }, [localState, updateLocalState, saveToFormData, goToNextStep]);

  // Empfohlene Speicherkapazität basierend auf Anlagenleistung (Faustformel: 1-1.5 kWh pro kWp)
  const recommendedCapacity = formData.anlage.leistung * 1.2;

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
          Speicherlösung
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Erweitern Sie Ihre PV-Anlage mit einem Batteriespeicher für mehr Unabhängigkeit.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Speicher Ja/Nein */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Battery className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Batteriespeicher gewünscht?</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div 
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                localState.speicherGewuenscht 
                  ? 'border-[#009FD8] bg-[#E6F4FA]' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleSpeicherSelect(true)}
            >
              <div className="flex items-center justify-center">
                <BatteryFull className={`w-4 h-4 mr-2 ${localState.speicherGewuenscht ? 'text-[#009FD8]' : 'text-gray-400'}`} />
                <span className={`text-xs font-medium ${localState.speicherGewuenscht ? 'text-[#009FD8]' : 'text-gray-700'}`}>
                  Ja, mit Batteriespeicher
                </span>
              </div>
            </div>
            
            <div 
              className={`p-3 rounded-full border transition-all cursor-pointer ${
                !localState.speicherGewuenscht 
                  ? 'border-[#009FD8] bg-[#E6F4FA]' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => handleSpeicherSelect(false)}
            >
              <div className="flex items-center justify-center">
                <BatteryMedium className={`w-4 h-4 mr-2 ${!localState.speicherGewuenscht ? 'text-[#009FD8]' : 'text-gray-400'}`} />
                <span className={`text-xs font-medium ${!localState.speicherGewuenscht ? 'text-[#009FD8]' : 'text-gray-700'}`}>
                  Nein, nur PV-Anlage
                </span>
              </div>
            </div>
          </div>
          
          <p className="mt-2 text-xs text-gray-500">
            Ein Batteriespeicher erhöht Ihren Eigenverbrauch und Ihre Autarkie.
          </p>
        </motion.div>
        
        {/* Speicherdetails, wenn Speicher gewünscht */}
        {localState.speicherGewuenscht && (
          <>
            {/* Kapazität */}
            <motion.div 
              className="mb-5 border-t border-gray-100 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <Zap className="w-4 h-4 mr-2 text-[#009FD8]" />
                <h3 className="font-medium text-sm">Speicherkapazität</h3>
              </div>
              
              <div className="px-2">
                <Slider
                  defaultValue={[localState.kapazitaet || recommendedCapacity]}
                  min={1}
                  max={30}
                  step={0.5}
                  onValueChange={handleKapazitaetChange}
                  className="mb-4"
                />
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">1 kWh</span>
                  <span className="text-xs font-medium text-[#009FD8]">{localState.kapazitaet || recommendedCapacity} kWh</span>
                  <span className="text-xs text-gray-500">30 kWh</span>
                </div>
              </div>
              
              <div className="mt-3 p-3 bg-[#E6F4FA] rounded-lg border border-[#009FD8]/10">
                <div className="flex items-start">
                  <Info className="w-4 h-4 mr-2 text-[#009FD8] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    <span className="font-medium">Empfohlene Kapazität: </span>
                    Für Ihre {formData.anlage.leistung} kWp Anlage empfehlen wir ca. {recommendedCapacity.toFixed(1)} kWh Speicherkapazität.
                  </p>
                </div>
              </div>
            </motion.div>
            
            {/* Hersteller */}
            <motion.div 
              className="mb-5 border-t border-gray-100 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.2 }}
            >
              <Label htmlFor="hersteller" className="block text-xs font-medium text-gray-700 mb-1">
                Bevorzugter Hersteller (optional)
              </Label>
              <Input
                id="hersteller"
                type="text"
                value={localState.hersteller}
                onChange={handleHerstellerChange}
                placeholder="z.B. Tesla, Sonnen, SMA, etc."
                className="w-full bg-white h-9 text-xs rounded-lg"
              />
              <p className="mt-2 text-xs text-gray-500">
                Lassen Sie dieses Feld leer, wenn Sie keine bestimmte Präferenz haben oder unsere Empfehlung wünschen.
              </p>
            </motion.div>
          </>
        )}
        
        {localState.error && (
          <motion.p 
            className="text-red-500 text-xs text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {localState.error}
          </motion.p>
        )}
        
        {/* Navigationsbuttons */}
        <motion.div 
          className="flex justify-between mt-8 pt-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
        >
          <button
            onClick={() => {
              saveToFormData();
              goToPreviousStep();
            }}
            className="py-2 px-4 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Zurück
          </button>
          
          <button
            onClick={handleContinue}
            className={`py-2.5 px-6 rounded-full text-xs font-medium transition-colors ${
              !localState.speicherGewuenscht || localState.kapazitaet > 0
                ? 'bg-[#009FD8] text-white hover:bg-[#007CAB]' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Weiter
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
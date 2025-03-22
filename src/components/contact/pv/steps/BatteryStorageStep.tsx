"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { Battery, BatteryCharging, BatteryMedium, Settings, Home, Info } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox2 } from '@/components/ui/checkbox2'

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

const batterySizeOptions = [
  { value: 5, label: "Klein (bis 5 kWh)", icon: <Battery />, description: "Für kleine Haushalte und geringen Eigenverbrauch" },
  { value: 10, label: "Mittel (6-10 kWh)", icon: <BatteryMedium />, description: "Für durchschnittliche Haushalte und mittleren Verbrauch" },
  { value: 15, label: "Groß (11-15 kWh)", icon: <BatteryCharging />, description: "Für große Haushalte und maximale Unabhängigkeit" },
  { value: 20, label: "Sehr groß (>15 kWh)", icon: <Home />, description: "Für Mehrfamilienhäuser oder Gewerbebetriebe" }
]

const commonBatteryBrands = [
  "Sonnen", "LG", "Tesla", "BYD", "Senec", "Fronius", "SMA", "E3/DC", "Varta", "Andere"
]

export const BatteryStorageStep: React.FC<BatteryStorageStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  // Lokaler Zustand
  const [localState, setLocalState] = useState<LocalStateType>({
    speicherGewuenscht: formData.speicher.speicherGewuenscht || false,
    kapazitaet: formData.speicher.kapazitaet || 10,
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
        kapazitaet: localState.speicherGewuenscht ? localState.kapazitaet : 0,
        hersteller: localState.speicherGewuenscht ? localState.hersteller : undefined
      }
    });
  }, [localState, updateFormData]);

  // Handler für Speicherwunsch-Checkbox
  const handleSpeicherGewuenschtChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    updateLocalState({ speicherGewuenscht: checked, error: '' });
  }, [updateLocalState]);

  // Handler für Herstellerauswahl
  const handleHerstellerChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    updateLocalState({ hersteller: e.target.value, error: '' });
  }, [updateLocalState]);

  // Handler für Batteriekapazität-Auswahl
  const handleBatterySizeSelect = useCallback((size: number) => {
    updateLocalState({ kapazitaet: size, error: '' });
  }, [updateLocalState]);

  // Handler für manuelle Kapazitätseingabe
  const handleKapazitaetChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    updateLocalState({ kapazitaet: value, error: '' });
  }, [updateLocalState]);

  // Fortsetzung zum nächsten Schritt
  const handleContinue = useCallback(() => {
    // Grundlegende Validierung wenn Speicher gewünscht ist
    if (localState.speicherGewuenscht) {
      if (localState.kapazitaet <= 0) {
        updateLocalState({ error: 'Bitte geben Sie eine gültige Batteriekapazität an' });
        return;
      }
    }
    
    // Speichern der Daten und Weiterleitung
    saveToFormData();
    goToNextStep();
  }, [localState, updateLocalState, saveToFormData, goToNextStep]);

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
          Batteriespeicher
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Entscheiden Sie, ob Sie einen Batteriespeicher für Ihre PV-Anlage wünschen und wählen Sie die passende Größe.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Batteriespeicher gewünscht */}
        <motion.div 
          className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="flex items-center space-x-3">
            <Checkbox2
              id="speicherGewuenscht"
              checked={localState.speicherGewuenscht}
              onChange={handleSpeicherGewuenschtChange}
            />
            <Label htmlFor="speicherGewuenscht" className="font-medium text-gray-800 flex items-center">
              <BatteryCharging className="mr-2 h-5 w-5 text-accent" />
              Ich möchte einen Batteriespeicher integrieren
            </Label>
          </div>
          
          <div className="mt-3 text-gray-600 text-sm">
            <p>Ein Batteriespeicher erhöht Ihren Eigenverbrauchsanteil und Ihre Unabhängigkeit vom Stromnetz.</p>
          </div>
        </motion.div>
        
        {localState.speicherGewuenscht && (
          <>
            {/* Speichergröße */}
            <motion.div 
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4 }}
            >
              <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Settings className="h-4 w-4 mr-2 text-accent" />
                Gewünschte Speichergröße
              </Label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {batterySizeOptions.map((option) => (
                  <motion.div 
                    key={option.value}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      localState.kapazitaet === option.value 
                        ? 'border-accent/20 bg-accent/5 shadow-sm' 
                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handleBatterySizeSelect(option.value)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center mb-1">
                        <div className={`mr-2 ${localState.kapazitaet === option.value ? 'text-accent' : 'text-gray-400'}`}>
                          {option.icon}
                        </div>
                        <h3 className={`font-medium text-sm ${localState.kapazitaet === option.value ? 'text-accent' : 'text-gray-700'}`}>
                          {option.label}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500">{option.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4">
                <Label htmlFor="kapazitaet" className="block text-sm font-medium text-gray-700 mb-2">
                  Genaue Speicherkapazität (in kWh)
                </Label>
                <div className="flex items-center">
                  <Input
                    id="kapazitaet"
                    type="number"
                    value={localState.kapazitaet || ''}
                    onChange={handleKapazitaetChange}
                    placeholder="z.B. 10"
                    className="w-full bg-white"
                    min="1"
                    step="0.5"
                  />
                  <span className="ml-2 text-gray-700">kWh</span>
                </div>
              </div>
            </motion.div>
            
            {/* Hersteller-Präferenz */}
            <motion.div 
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Label 
                htmlFor="hersteller" 
                className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
              >
                <Info className="h-4 w-4 mr-2 text-accent" />
                Bevorzugter Hersteller (optional)
              </Label>
              <select
                id="hersteller"
                value={localState.hersteller}
                onChange={handleHerstellerChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 text-gray-700"
              >
                <option value="">Keine Präferenz</option>
                {commonBatteryBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-gray-500">
                Wir beraten Sie gerne zu den Vor- und Nachteilen verschiedener Speichersysteme.
              </p>
            </motion.div>
          </>
        )}
        
        {localState.error && (
          <motion.div 
            className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {localState.error}
          </motion.div>
        )}
        
        {/* Navigationsbuttons - IMMER SICHTBAR */}
        <motion.div 
          className="flex gap-4 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <motion.button
            onClick={() => {
              saveToFormData();
              goToPreviousStep();
            }}
            className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm flex-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Zurück
          </motion.button>
          
          <motion.button
            onClick={handleContinue}
            className="py-3 px-8 rounded-md font-medium transition-all duration-200 bg-accent text-white hover:bg-accent-dark hover:shadow-md flex-1"
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
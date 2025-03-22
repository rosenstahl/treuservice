"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { Ruler, Compass, AreaChart, PanelTop, AlertTriangle, Info } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox2 } from '@/components/ui/checkbox2'

type RoofInfoStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Lokaler Zustandstyp
type LocalStateType = {
  material: string;
  ausrichtung: FormData['dach']['ausrichtung'];
  flaeche: number;
  neigung: number;
  hindernis: boolean;
  hindernisDetails: string;
  error: string;
}

export const RoofInfoStep: React.FC<RoofInfoStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  // Lokaler Zustand
  const [localState, setLocalState] = useState<LocalStateType>({
    material: formData.dach.material || '',
    ausrichtung: formData.dach.ausrichtung || 'south',
    flaeche: formData.dach.flaeche || 0,
    neigung: formData.dach.neigung || 30,
    hindernis: formData.dach.hindernis || false,
    hindernisDetails: formData.dach.hindernisDetails || '',
    error: ''
  });
  
  const dachMaterialien = [
    'Ziegel',
    'Schiefer',
    'Metall',
    'Beton',
    'Bitumen',
    'Eternit',
    'Dachpappe',
    'Glas',
    'Andere'
  ]

  // Helfer-Funktion zum Aktualisieren des lokalen Zustands
  const updateLocalState = useCallback((updates: Partial<LocalStateType>) => {
    setLocalState(prev => ({ ...prev, ...updates }));
  }, []);

  // Aktualisierung der Formulardaten
  const saveToFormData = useCallback(() => {
    updateFormData({
      dach: {
        ...formData.dach,
        material: localState.material,
        ausrichtung: localState.ausrichtung,
        flaeche: localState.flaeche,
        neigung: localState.neigung,
        hindernis: localState.hindernis,
        hindernisDetails: localState.hindernisDetails
      }
    });
  }, [formData.dach, localState, updateFormData]);

  // Handler für einfache Textänderungen
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    updateLocalState({ [id as keyof LocalStateType]: value } as Partial<LocalStateType>);
  }, [updateLocalState]);

  // Handler für numerische Eingaben
  const handleNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const numValue = parseFloat(value) || 0;
    updateLocalState({ [id as keyof LocalStateType]: numValue } as Partial<LocalStateType>);
  }, [updateLocalState]);

  // Handler für Checkbox-Änderungen
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    updateLocalState({ [id as keyof LocalStateType]: checked } as Partial<LocalStateType>);
  }, [updateLocalState]);

  // Ausrichtungsoption wählen
  const handleAusrichtungSelect = useCallback((ausrichtung: FormData['dach']['ausrichtung']) => {
    updateLocalState({ ausrichtung, error: '' });
  }, [updateLocalState]);

  // Validierung und Weiterleitung
  const handleContinue = useCallback(() => {
    // Grundlegende Validierung
    if (!localState.material) {
      updateLocalState({ error: 'Bitte wählen Sie ein Dachmaterial aus' });
      return;
    }
    
    if (!localState.ausrichtung) {
      updateLocalState({ error: 'Bitte wählen Sie die Dachausrichtung' });
      return;
    }
    
    if (localState.flaeche <= 0) {
      updateLocalState({ error: 'Bitte geben Sie eine gültige Dachfläche an' });
      return;
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
          Details zu Ihrem Dach
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte geben Sie weitere Informationen zu Ihrem Dach an, um die passende PV-Lösung zu finden.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Dachmaterial */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Label 
            htmlFor="material" 
            className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
          >
            <PanelTop className="h-4 w-4 mr-2 text-accent" />
            Dachmaterial
          </Label>
          <select
            id="material"
            value={localState.material}
            onChange={handleTextChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 text-gray-700"
          >
            <option value="">Bitte auswählen</option>
            {dachMaterialien.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </motion.div>
        
        {/* Dachausrichtung */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Compass className="h-4 w-4 mr-2 text-accent" />
            Dachausrichtung
          </Label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'south', label: 'Süd', description: 'Optimale Sonneneinstrahlung' },
              { value: 'east-west', label: 'Ost-West', description: 'Ausgewogene Stromerzeugung' },
              { value: 'other', label: 'Andere', description: 'Sonstige Ausrichtung' }
            ].map((orientation) => (
              <motion.div 
                key={orientation.value}
                className={`flex flex-col items-center p-3 rounded-lg border transition-all cursor-pointer ${
                  localState.ausrichtung === orientation.value 
                    ? 'border-accent/20 bg-accent/5 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleAusrichtungSelect(orientation.value as FormData['dach']['ausrichtung'])}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={`text-sm font-medium ${localState.ausrichtung === orientation.value ? 'text-accent' : 'text-gray-700'}`}>
                  {orientation.label}
                </span>
                <span className="text-xs text-gray-500 text-center mt-1">
                  {orientation.description}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Dachfläche und Neigung */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div 
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.3 }}
          >
            <Label 
              htmlFor="flaeche" 
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <AreaChart className="h-4 w-4 mr-2 text-accent" />
              Dachfläche (m²)
            </Label>
            <Input
              id="flaeche"
              type="number"
              value={localState.flaeche || ''}
              onChange={handleNumberChange}
              placeholder="Fläche in m²"
              className="w-full bg-white"
              min="1"
            />
            <p className="mt-1 text-xs text-gray-500">
              Falls Sie die genaue Fläche nicht kennen, geben Sie bitte eine Schätzung an.
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Label 
              htmlFor="neigung" 
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
            >
              <Ruler className="h-4 w-4 mr-2 text-accent" />
              Dachneigung (Grad)
            </Label>
            <Input
              id="neigung"
              type="number"
              value={localState.neigung || ''}
              onChange={handleNumberChange}
              placeholder="z.B. 30°"
              className="w-full bg-white"
              min="0"
              max="90"
            />
            <p className="mt-1 text-xs text-gray-500">
              Bei Flachdach etwa 0-5°, bei Schrägdach typischerweise 20-45°.
            </p>
          </motion.div>
        </div>
        
        {/* Verschattung/Hindernisse */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.3 }}
        >
          <div className="flex items-center mb-3">
            <Checkbox2
              id="hindernis"
              checked={localState.hindernis}
              onChange={handleCheckboxChange}
            />
            <Label 
              htmlFor="hindernis" 
              className="ml-2 text-sm font-medium text-gray-700 flex items-center"
            >
              <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
              Verschattung/Hindernisse vorhanden
            </Label>
          </div>
          
          {localState.hindernis && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <Textarea
                id="hindernisDetails"
                placeholder="Bitte beschreiben Sie die Verschattungssituation oder Hindernisse (z.B. Schornsteine, Gauben, Bäume, Nachbargebäude...)"
                value={localState.hindernisDetails}
                onChange={handleTextChange}
                className="w-full bg-white mt-2"
                rows={3}
              />
            </motion.div>
          )}
        </motion.div>
        
        {localState.error && (
          <motion.div 
            className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Info className="inline-block h-4 w-4 mr-1" />
            {localState.error}
          </motion.div>
        )}
        
        {/* Navigationsbuttons */}
        <motion.div 
          className="flex gap-4 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
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
"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { Ruler, Compass, AreaChart, PanelTop, AlertTriangle } from 'lucide-react'
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
          Details zu Ihrem Dach
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Bitte geben Sie weitere Informationen zu Ihrem Dach an, um die passende PV-Lösung zu finden.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Dachmaterial */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <PanelTop className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Dachmaterial</h3>
          </div>
          
          <select
            id="material"
            value={localState.material}
            onChange={handleTextChange}
            className="w-full px-3 py-2 h-9 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8] text-gray-700"
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
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Compass className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Dachausrichtung</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'south', label: 'Süd', description: 'Optimale Sonneneinstrahlung' },
              { value: 'east-west', label: 'Ost-West', description: 'Ausgewogene Stromerzeugung' },
              { value: 'other', label: 'Andere', description: 'Sonstige Ausrichtung' }
            ].map((orientation) => (
              <div 
                key={orientation.value}
                className={`flex flex-col items-center p-2 rounded-full border transition-all cursor-pointer ${
                  localState.ausrichtung === orientation.value 
                    ? 'border-[#009FD8] bg-[#E6F4FA]' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleAusrichtungSelect(orientation.value as FormData['dach']['ausrichtung'])}
              >
                <span className={`text-xs font-medium ${localState.ausrichtung === orientation.value ? 'text-[#009FD8]' : 'text-gray-700'}`}>
                  {orientation.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 text-xs text-gray-500">
            Wählen Sie die Hauptausrichtung Ihres Daches für optimale Sonneneinstrahlung.
          </div>
        </motion.div>
        
        {/* Dachfläche und Neigung */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div 
            className="mb-5 border-t border-gray-100 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <AreaChart className="w-4 h-4 mr-2 text-[#009FD8]" />
              <h3 className="font-medium text-sm">Dachfläche</h3>
            </div>
            
            <Label htmlFor="flaeche" className="block text-xs font-medium text-gray-700 mb-1">
              Fläche in m²
            </Label>
            <Input
              id="flaeche"
              type="number"
              value={localState.flaeche || ''}
              onChange={handleNumberChange}
              placeholder="Fläche in m²"
              className="w-full bg-white h-9 text-xs rounded-lg"
              min="1"
            />
            <p className="mt-1 text-xs text-gray-500">
              Falls Sie die genaue Fläche nicht kennen, geben Sie bitte eine Schätzung an.
            </p>
          </motion.div>
          
          <motion.div 
            className="mb-5 border-t border-gray-100 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <Ruler className="w-4 h-4 mr-2 text-[#009FD8]" />
              <h3 className="font-medium text-sm">Dachneigung</h3>
            </div>
            
            <Label htmlFor="neigung" className="block text-xs font-medium text-gray-700 mb-1">
              Neigung in Grad
            </Label>
            <Input
              id="neigung"
              type="number"
              value={localState.neigung || ''}
              onChange={handleNumberChange}
              placeholder="z.B. 30°"
              className="w-full bg-white h-9 text-xs rounded-lg"
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
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Verschattung/Hindernisse</h3>
          </div>
          
          <div className="flex items-center mb-3">
            <Checkbox2
              id="hindernis"
              checked={localState.hindernis}
              onChange={handleCheckboxChange}
            />
            <Label 
              htmlFor="hindernis" 
              className="ml-2 text-xs font-medium text-gray-700"
            >
              Verschattung oder Hindernisse vorhanden
            </Label>
          </div>
          
          {localState.hindernis && (
            <div className="mt-2">
              <Textarea
                id="hindernisDetails"
                placeholder="Bitte beschreiben Sie die Verschattungssituation oder Hindernisse (z.B. Schornsteine, Gauben, Bäume, Nachbargebäude...)"
                value={localState.hindernisDetails}
                onChange={handleTextChange}
                className="w-full bg-white border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
                rows={3}
              />
            </div>
          )}
        </motion.div>
        
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
          transition={{ delay: 0.4, duration: 0.2 }}
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
              localState.material && localState.ausrichtung && localState.flaeche > 0
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
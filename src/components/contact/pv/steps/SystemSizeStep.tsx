"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { Zap, Award, LayoutGrid, Percent, Activity, Wrench, NotebookPen } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

type SystemSizeStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Lokaler Zustandstyp
type LocalStateType = {
  leistung: number;
  modulTyp: FormData['anlage']['modulTyp'];
  montageArt: FormData['anlage']['montageArt'];
  eigenverbrauch: number;
  anzahlModule: number | undefined;
  error: string;
}

// Modultypen mit Details
const modulTypes = [
  { value: 'standard', label: 'Standard', description: 'Gutes Preis-/Leistungsverhältnis', icon: <Zap className="h-4 w-4" /> },
  { value: 'premium', label: 'Premium', description: 'Hohe Effizienz und Langlebigkeit', icon: <Award className="h-4 w-4" /> },
  { value: 'bifacial', label: 'Bifazial', description: 'Nutzung von Licht auf beiden Seiten', icon: <LayoutGrid className="h-4 w-4" /> }
]

// Montageart mit Details
const montageTypes = [
  { value: 'roof-mounted', label: 'Aufdach', description: 'Standard-Montage auf dem Dach', icon: <Wrench className="h-4 w-4" /> },
  { value: 'in-roof', label: 'Indach', description: 'Integration in die Dacheindeckung', icon: <NotebookPen className="h-4 w-4" /> },
  { value: 'flat-roof', label: 'Flachdach', description: 'Aufständerung auf Flachdächern', icon: <Activity className="h-4 w-4" /> }
]

export const SystemSizeStep: React.FC<SystemSizeStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  // Lokaler Zustand
  const [localState, setLocalState] = useState<LocalStateType>({
    leistung: formData.anlage.leistung || 10,
    modulTyp: formData.anlage.modulTyp || 'standard',
    montageArt: formData.anlage.montageArt || 'roof-mounted',
    eigenverbrauch: formData.anlage.eigenverbrauch || 70,
    anzahlModule: formData.anlage.anzahlModule,
    error: ''
  });

  // Helfer-Funktion zum Aktualisieren des lokalen Zustands
  const updateLocalState = useCallback((updates: Partial<LocalStateType>) => {
    setLocalState(prev => ({ ...prev, ...updates }));
  }, []);

  // Aktualisierung der Formulardaten
  const saveToFormData = useCallback(() => {
    updateFormData({
      anlage: {
        leistung: localState.leistung,
        modulTyp: localState.modulTyp,
        montageArt: localState.montageArt,
        eigenverbrauch: localState.eigenverbrauch,
        anzahlModule: localState.anzahlModule
      }
    });
  }, [localState, updateFormData]);

  // Handler für numerische Eingaben
  const handleNumberChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const numValue = parseFloat(value) || 0;
    updateLocalState({ [id as keyof LocalStateType]: numValue } as Partial<LocalStateType>);
  }, [updateLocalState]);

  // Handler für Modultyp-Auswahl
  const handleModulTypSelect = useCallback((type: FormData['anlage']['modulTyp']) => {
    updateLocalState({ modulTyp: type, error: '' });
  }, [updateLocalState]);

  // Handler für Montageart-Auswahl
  const handleMontageArtSelect = useCallback((type: FormData['anlage']['montageArt']) => {
    updateLocalState({ montageArt: type, error: '' });
  }, [updateLocalState]);

  // Handler für Eigenverbrauch-Slider
  const handleEigenverbrauchChange = useCallback((value: number[]) => {
    updateLocalState({ eigenverbrauch: value[0], error: '' });
  }, [updateLocalState]);

  // Validierung und Weiterleitung
  const handleContinue = useCallback(() => {
    // Grundlegende Validierung
    if (localState.leistung <= 0) {
      updateLocalState({ error: 'Bitte geben Sie eine gültige Anlagenleistung an' });
      return;
    }
    
    if (!localState.modulTyp) {
      updateLocalState({ error: 'Bitte wählen Sie einen Modultyp aus' });
      return;
    }
    
    if (!localState.montageArt) {
      updateLocalState({ error: 'Bitte wählen Sie eine Montageart aus' });
      return;
    }
    
    // Speichern der Daten und Weiterleitung
    saveToFormData();
    goToNextStep();
  }, [localState, updateLocalState, saveToFormData, goToNextStep]);

  // Berechnung der typischen Anzahl an Modulen (basierend auf 400Wp pro Modul)
  const calculateModuleCount = useCallback(() => {
    return Math.ceil(localState.leistung * 1000 / 400);
  }, [localState.leistung]);

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
          Anlagengröße und Technik
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Planen Sie Ihre PV-Anlage mit der passenden Leistung und den optimalen Komponenten.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Anlagenleistung */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Zap className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Anlagenleistung</h3>
          </div>
          
          <Label htmlFor="leistung" className="block text-xs font-medium text-gray-700 mb-1">
            Leistung in kWp
          </Label>
          <div className="flex items-center">
            <Input
              id="leistung"
              type="number"
              value={localState.leistung || ''}
              onChange={handleNumberChange}
              placeholder="Anlagenleistung in kWp"
              className="w-full bg-white h-9 text-xs rounded-lg"
              min="1"
              step="0.5"
            />
            <span className="ml-2 text-xs text-gray-700">kWp</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Typische Anlagengrößen für Einfamilienhäuser: 5-15 kWp
          </p>
          <div className="mt-3 p-3 bg-[#E6F4FA] rounded-lg border border-[#009FD8]/10 text-xs">
            <p className="text-gray-700">
              <span className="font-medium">Geschätzte Anzahl Module:</span> ~{calculateModuleCount()} (basierend auf 400Wp pro Modul)
            </p>
          </div>
        </motion.div>
        
        {/* Modultyp */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <LayoutGrid className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Modultyp</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {modulTypes.map((type) => (
              <div 
                key={type.value}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  localState.modulTyp === type.value 
                    ? 'border-[#009FD8] bg-[#E6F4FA]' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleModulTypSelect(type.value as FormData['anlage']['modulTyp'])}
              >
                <div className="flex items-center justify-center">
                  <div className={`mr-2 ${localState.modulTyp === type.value ? 'text-[#009FD8]' : 'text-gray-400'}`}>
                    {type.icon}
                  </div>
                  <div>
                    <h3 className={`text-xs font-medium ${localState.modulTyp === type.value ? 'text-[#009FD8]' : 'text-gray-700'}`}>
                      {type.label}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="mt-2 text-xs text-gray-500">
            {modulTypes.find(t => t.value === localState.modulTyp)?.description || "Wählen Sie einen Modultyp aus"}
          </p>
        </motion.div>
        
        {/* Montageart */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Wrench className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Montageart</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {montageTypes.map((type) => (
              <div 
                key={type.value}
                className={`p-3 rounded-full border transition-all cursor-pointer ${
                  localState.montageArt === type.value 
                    ? 'border-[#009FD8] bg-[#E6F4FA]' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleMontageArtSelect(type.value as FormData['anlage']['montageArt'])}
              >
                <div className="flex items-center justify-center">
                  <div className={`mr-2 ${localState.montageArt === type.value ? 'text-[#009FD8]' : 'text-gray-400'}`}>
                    {type.icon}
                  </div>
                  <div>
                    <h3 className={`text-xs font-medium ${localState.montageArt === type.value ? 'text-[#009FD8]' : 'text-gray-700'}`}>
                      {type.label}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <p className="mt-2 text-xs text-gray-500">
            {montageTypes.find(t => t.value === localState.montageArt)?.description || "Wählen Sie eine Montageart aus"}
          </p>
        </motion.div>
        
        {/* Eigenverbrauch-Slider */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Percent className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Eigenverbrauch (geschätzt)</h3>
          </div>
          
          <div className="px-2">
            <Slider
              defaultValue={[localState.eigenverbrauch]}
              max={100}
              step={5}
              onValueChange={handleEigenverbrauchChange}
              className="mb-4"
            />
            <div className="flex justify-between">
              <span className="text-xs text-gray-500">0%</span>
              <span className="text-xs font-medium text-[#009FD8]">{localState.eigenverbrauch}%</span>
              <span className="text-xs text-gray-500">100%</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Der Eigenverbrauchsanteil beeinflusst die Wirtschaftlichkeit Ihrer Anlage. 
            Ein typischer Wert liegt zwischen 30% und 70%.
          </p>
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
          transition={{ delay: 0.35, duration: 0.2 }}
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
              localState.leistung > 0 && localState.modulTyp && localState.montageArt
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
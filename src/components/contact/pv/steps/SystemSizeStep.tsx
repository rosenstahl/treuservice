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
  { value: 'standard', label: 'Standard', description: 'Gutes Preis-/Leistungsverhältnis', icon: <Zap /> },
  { value: 'premium', label: 'Premium', description: 'Hohe Effizienz und Langlebigkeit', icon: <Award /> },
  { value: 'bifacial', label: 'Bifazial', description: 'Nutzung von Licht auf beiden Seiten', icon: <LayoutGrid /> }
]

// Montageart mit Details
const montageTypes = [
  { value: 'roof-mounted', label: 'Aufdach', description: 'Standard-Montage auf dem Dach', icon: <Wrench /> },
  { value: 'in-roof', label: 'Indach', description: 'Integration in die Dacheindeckung', icon: <NotebookPen /> },
  { value: 'flat-roof', label: 'Flachdach', description: 'Aufständerung auf Flachdächern', icon: <Activity /> }
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
          Anlagengröße und Technik
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Planen Sie Ihre PV-Anlage mit der passenden Leistung und den optimalen Komponenten.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Anlagenleistung */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Label 
            htmlFor="leistung" 
            className="block text-sm font-medium text-gray-700 mb-2 flex items-center"
          >
            <Zap className="h-4 w-4 mr-2 text-accent" />
            Anlagenleistung (kWp)
          </Label>
          <div className="flex items-center">
            <Input
              id="leistung"
              type="number"
              value={localState.leistung || ''}
              onChange={handleNumberChange}
              placeholder="Anlagenleistung in kWp"
              className="w-full bg-white"
              min="1"
              step="0.5"
            />
            <span className="ml-2 text-gray-700">kWp</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Typische Anlagengrößen für Einfamilienhäuser: 5-15 kWp
          </p>
          <div className="mt-3 p-3 bg-accent/5 rounded-md border border-accent/10 text-sm">
            <p className="text-gray-700">
              <span className="font-medium">Geschätzte Anzahl Module:</span> ~{calculateModuleCount()} (basierend auf 400Wp pro Modul)
            </p>
          </div>
        </motion.div>
        
        {/* Modultyp */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <LayoutGrid className="h-4 w-4 mr-2 text-accent" />
            Modultyp
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modulTypes.map((type) => (
              <motion.div 
                key={type.value}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  localState.modulTyp === type.value 
                    ? 'border-accent/20 bg-accent/5 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleModulTypSelect(type.value as FormData['anlage']['modulTyp'])}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`text-2xl mb-2 ${localState.modulTyp === type.value ? 'text-accent' : 'text-gray-400'}`}>
                    {type.icon}
                  </div>
                  <h3 className={`font-medium text-sm mb-1 ${localState.modulTyp === type.value ? 'text-accent' : 'text-gray-700'}`}>
                    {type.label}
                  </h3>
                  <p className="text-xs text-gray-500">{type.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Montageart */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Wrench className="h-4 w-4 mr-2 text-accent" />
            Montageart
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {montageTypes.map((type) => (
              <motion.div 
                key={type.value}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  localState.montageArt === type.value 
                    ? 'border-accent/20 bg-accent/5 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleMontageArtSelect(type.value as FormData['anlage']['montageArt'])}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`text-2xl mb-2 ${localState.montageArt === type.value ? 'text-accent' : 'text-gray-400'}`}>
                    {type.icon}
                  </div>
                  <h3 className={`font-medium text-sm mb-1 ${localState.montageArt === type.value ? 'text-accent' : 'text-gray-700'}`}>
                    {type.label}
                  </h3>
                  <p className="text-xs text-gray-500">{type.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Eigenverbrauch-Slider */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Percent className="h-4 w-4 mr-2 text-accent" />
            Eigenverbrauch (geschätzt)
          </Label>
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
              <span className="text-sm font-medium text-accent">{localState.eigenverbrauch}%</span>
              <span className="text-xs text-gray-500">100%</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Der Eigenverbrauchsanteil beeinflusst die Wirtschaftlichkeit Ihrer Anlage. 
            Ein typischer Wert liegt zwischen 30% und 70%.
          </p>
        </motion.div>
        
        {localState.error && (
          <motion.div 
            className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {localState.error}
          </motion.div>
        )}
        
        {/* Navigationsbuttons */}
        <motion.div 
          className="flex gap-4 pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
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
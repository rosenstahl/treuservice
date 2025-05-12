/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { MapPin, Building, Plus, Minus, Calendar, Clock, Info, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

type AdresseZugangStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const AdresseZugangStep: React.FC<AdresseZugangStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const [isValid, setIsValid] = useState(false)
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<{
    strasse?: string
    hausnummer?: string
    plz?: string
    ort?: string
  }>({})
  const [terminDatum, setTerminDatum] = useState<Date | undefined>(
    formData.kontakt.wunschtermin ? new Date(formData.kontakt.wunschtermin) : undefined
  )

  // Lokaler Zustand für Adresse
  const [localState, setLocalState] = useState({
    strasse: formData.adresse.strasse || '',
    hausnummer: formData.adresse.hausnummer || '',
    plz: formData.adresse.plz || '',
    ort: formData.adresse.ort || '',
    etage: formData.adresse.etage || 0,
    aufzug: formData.adresse.aufzug || false,
    parkmoeglichkeit: formData.adresse.parkmoeglichkeit || '',
    zugaenglichkeit: formData.adresse.zugaenglichkeit || '',
    wunschzeit: formData.kontakt.wunschzeit || ''
  });

  useEffect(() => {
    // Prüfen, ob der Schritt vollständig ist
    const adresse = localState
    setIsValid(
      !!adresse.strasse.trim() && 
      !!adresse.hausnummer.trim() && 
      !!adresse.plz.trim() && 
      !!adresse.ort.trim() &&
      !!adresse.parkmoeglichkeit
    )
  }, [localState])

  const updateLocalState = useCallback((updates: Partial<typeof localState>) => {
    setLocalState(prev => {
      const newState = { ...prev, ...updates };
      
      // Aktualisiere die Fehler, wenn Felder ausgefüllt werden
      const newErrors = { ...errors };
      Object.keys(updates).forEach(key => {
        if (key in newErrors && updates[key as keyof typeof updates]) {
          delete newErrors[key as keyof typeof errors];
        }
      });
      setErrors(newErrors);
      
      return newState;
    });
  }, [errors]);

  const saveToFormData = useCallback(() => {
    updateFormData({
      adresse: {
        strasse: localState.strasse,
        hausnummer: localState.hausnummer,
        plz: localState.plz,
        ort: localState.ort,
        etage: localState.etage,
        aufzug: localState.aufzug,
        parkmoeglichkeit: localState.parkmoeglichkeit as FormData['adresse']['parkmoeglichkeit'],
        zugaenglichkeit: localState.zugaenglichkeit
      },
      kontakt: {
        ...formData.kontakt,
        wunschtermin: terminDatum ? terminDatum.toISOString().split('T')[0] : '',
        wunschzeit: localState.wunschzeit
      }
    });
  }, [localState, terminDatum, formData.kontakt, updateFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateLocalState({ [name as keyof typeof localState]: value } as Partial<typeof localState>);
    
    // Verzögertes Aktualisieren von formData
    clearTimeout((window as any).textChangeTimeout);
    (window as any).textChangeTimeout = window.setTimeout(saveToFormData, 500);
  }

  const handleEtageChange = (etage: number) => {
    updateLocalState({ etage });
    setTimeout(saveToFormData, 0);
  }

  const handleAufzugChange = (checked: boolean) => {
    updateLocalState({ aufzug: checked });
    setTimeout(saveToFormData, 0);
  }

  const handleParkmoeglichkeitChange = (value: FormData['adresse']['parkmoeglichkeit']) => {
    updateLocalState({ parkmoeglichkeit: value });
    setTimeout(saveToFormData, 0);
  }

  const handleTerminDatumChange = (date: Date | undefined) => {
    setTerminDatum(date);
    setTimeout(saveToFormData, 0);
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}
    
    if (!localState.strasse.trim()) {
      newErrors.strasse = 'Straße ist erforderlich'
    }
    
    if (!localState.hausnummer.trim()) {
      newErrors.hausnummer = 'Hausnummer ist erforderlich'
    }
    
    if (!localState.plz.trim()) {
      newErrors.plz = 'PLZ ist erforderlich'
    } else if (!/^\d{5}$/.test(localState.plz)) {
      newErrors.plz = 'PLZ muss 5 Ziffern enthalten'
    }
    
    if (!localState.ort.trim()) {
      newErrors.ort = 'Ort ist erforderlich'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      saveToFormData();
      goToNextStep();
    } else {
      setError('Bitte füllen Sie alle erforderlichen Felder aus.');
    }
  }

  const today = new Date();

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
          Einsatzort & Zugang
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Geben Sie die genaue Adresse des Einsatzortes und Informationen zur Zugänglichkeit an
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          {/* Adress-Abschnitt */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-[#009FD8]" />
              Adresse des zu sanierenden Objekts
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="strasse" className="block text-xs font-medium text-gray-700 mb-1.5">
                    Straße *
                  </Label>
                  <Input
                    id="strasse"
                    name="strasse"
                    value={localState.strasse}
                    onChange={handleChange}
                    placeholder="Straßenname"
                    className="w-full border-gray-200 rounded-lg text-sm"
                    required
                  />
                  {errors.strasse && (
                    <p className="mt-1 text-xs text-red-500">{errors.strasse}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="hausnummer" className="block text-xs font-medium text-gray-700 mb-1.5">
                    Hausnummer *
                  </Label>
                  <Input
                    id="hausnummer"
                    name="hausnummer"
                    value={localState.hausnummer}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full border-gray-200 rounded-lg text-sm"
                    required
                  />
                  {errors.hausnummer && (
                    <p className="mt-1 text-xs text-red-500">{errors.hausnummer}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="plz" className="block text-xs font-medium text-gray-700 mb-1.5">
                    PLZ *
                  </Label>
                  <Input
                    id="plz"
                    name="plz"
                    value={localState.plz}
                    onChange={handleChange}
                    placeholder="12345"
                    className="w-full border-gray-200 rounded-lg text-sm"
                    required
                  />
                  {errors.plz && (
                    <p className="mt-1 text-xs text-red-500">{errors.plz}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <Label htmlFor="ort" className="block text-xs font-medium text-gray-700 mb-1.5">
                    Ort *
                  </Label>
                  <Input
                    id="ort"
                    name="ort"
                    value={localState.ort}
                    onChange={handleChange}
                    placeholder="Musterstadt"
                    className="w-full border-gray-200 rounded-lg text-sm"
                    required
                  />
                  {errors.ort && (
                    <p className="mt-1 text-xs text-red-500">{errors.ort}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Zugangs-Abschnitt */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Building className="h-4 w-4 mr-2 text-[#009FD8]" />
              Zugangsinformationen
            </h3>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-xs text-gray-500">Etage:</div>
                
                <div className="flex items-center border rounded-full overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleEtageChange(Math.max(0, localState.etage - 1))}
                    className="flex-none h-7 w-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors bg-white"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <div className="w-10 h-7 flex items-center justify-center text-xs font-medium bg-white">
                    {localState.etage === 0 ? 'EG' : `${localState.etage}.`}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEtageChange(localState.etage + 1)}
                    className="flex-none h-7 w-7 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors bg-white"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                <Switch
                  id="aufzug"
                  checked={localState.aufzug}
                  onCheckedChange={handleAufzugChange}
                  className="data-[state=checked]:bg-[#009FD8]"
                />
                <Label htmlFor="aufzug" className="cursor-pointer text-xs">Aufzug vorhanden</Label>
              </div>
            </div>
            
            <div className="mb-4">
              <Label className="block text-xs font-medium text-gray-700 mb-2">
                Parkmöglichkeit vor Ort:
              </Label>
              <div className="space-y-2">
                <div 
                  className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    localState.parkmoeglichkeit === 'gut'
                      ? 'bg-[#E6F4FA] border-[#009FD8]'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                  onClick={() => handleParkmoeglichkeitChange('gut')}
                >
                  <div className={`mr-2 w-4 h-4 rounded-full flex items-center justify-center ${
                    localState.parkmoeglichkeit === 'gut'
                      ? 'bg-[#009FD8]'
                      : 'border border-gray-300'
                  }`}>
                    {localState.parkmoeglichkeit === 'gut' && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <Label className="cursor-pointer text-xs">Gut (direkt vor dem Gebäude)</Label>
                </div>
                
                <div 
                  className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    localState.parkmoeglichkeit === 'eingeschraenkt'
                      ? 'bg-[#E6F4FA] border-[#009FD8]'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                  onClick={() => handleParkmoeglichkeitChange('eingeschraenkt')}
                >
                  <div className={`mr-2 w-4 h-4 rounded-full flex items-center justify-center ${
                    localState.parkmoeglichkeit === 'eingeschraenkt'
                      ? 'bg-[#009FD8]'
                      : 'border border-gray-300'
                  }`}>
                    {localState.parkmoeglichkeit === 'eingeschraenkt' && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <Label className="cursor-pointer text-xs">Eingeschränkt (in der Nähe)</Label>
                </div>
                
                <div 
                  className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    localState.parkmoeglichkeit === 'keine'
                      ? 'bg-[#E6F4FA] border-[#009FD8]'
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                  onClick={() => handleParkmoeglichkeitChange('keine')}
                >
                  <div className={`mr-2 w-4 h-4 rounded-full flex items-center justify-center ${
                    localState.parkmoeglichkeit === 'keine'
                      ? 'bg-[#009FD8]'
                      : 'border border-gray-300'
                  }`}>
                    {localState.parkmoeglichkeit === 'keine' && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <Label className="cursor-pointer text-xs">Keine/Schwierig</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="zugaenglichkeit" className="block text-xs font-medium text-gray-700 mb-1.5">Zugänglichkeit und Besonderheiten</Label>
              <Textarea
                id="zugaenglichkeit"
                name="zugaenglichkeit"
                value={localState.zugaenglichkeit}
                onChange={handleChange}
                placeholder="Gibt es besondere Hinweise zur Zugänglichkeit? (z.B. Hinterhaus, schwierige/enge Treppe, etc.)"
                className="w-full border-gray-200 text-sm h-16 rounded-lg"
              />
            </div>
          </div>

          {/* Terminwunsch-Abschnitt */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-[#009FD8]" />
              Terminwunsch
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="wunschtermin" className="block text-xs font-medium text-gray-700 mb-1.5">
                  Datum
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-xs h-9",
                        !terminDatum && "text-gray-400"
                      )}
                    >
                      <Calendar className="mr-2 h-3.5 w-3.5" />
                      {terminDatum ? format(terminDatum, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border border-gray-200 rounded-lg bg-white" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={terminDatum}
                      onSelect={handleTerminDatumChange}
                      initialFocus
                      disabled={(date) => date < today}
                      className="bg-white"
                    />
                  </PopoverContent>
                </Popover>
                <p className="mt-1 text-xs text-gray-500 flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  Wählen Sie Ihren Wunschtermin
                </p>
              </div>
              
              <div>
                <Label htmlFor="wunschzeit" className="block text-xs font-medium text-gray-700 mb-1.5">
                  Uhrzeit (optional)
                </Label>
                <div className="flex items-center border rounded-lg shadow-sm overflow-hidden border-gray-200">
                  <div className="flex-none w-9 h-9 flex items-center justify-center bg-gray-50 border-r border-gray-200">
                    <Clock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    id="wunschzeit"
                    name="wunschzeit"
                    type="time"
                    className="border-0 flex-1 h-9 focus:ring-0 text-sm bg-white"
                    value={localState.wunschzeit}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {error && (
          <motion.div 
            className="mt-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-center">
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
              <p>{error}</p>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className="flex justify-between mt-7 pt-5 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <motion.button
            onClick={() => {
              saveToFormData();
              goToPreviousStep();
            }}
            className="py-2 px-4 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Zurück
          </motion.button>

          <motion.button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`py-2.5 px-6 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              isValid
                ? 'bg-[#009FD8] text-white hover:bg-[#007CAB]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Weiter
            {isValid && <ArrowRight className="h-3.5 w-3.5" />}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
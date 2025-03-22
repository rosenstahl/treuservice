
"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MapPin, Building, Plus, Minus, Calendar, Clock, Info, AlertTriangle } from 'lucide-react'
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
          Einsatzort & Zugang
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Geben Sie die genaue Adresse des Einsatzortes und Informationen zur Zugänglichkeit an
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {/* Adress-Abschnitt - im Stil von ZeitlicheInfosStep/TerminServiceStep */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-accent" />
              Adresse des zu sanierenden Objekts
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="strasse" className="block text-sm font-medium text-gray-700 mb-2">
                    Straße *
                  </Label>
                  <Input
                    id="strasse"
                    name="strasse"
                    value={localState.strasse}
                    onChange={handleChange}
                    placeholder="Straßenname"
                    className="w-full bg-white border-gray-200"
                    required
                  />
                  {errors.strasse && (
                    <p className="mt-1 text-xs text-red-500">{errors.strasse}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="hausnummer" className="block text-sm font-medium text-gray-700 mb-2">
                    Hausnummer *
                  </Label>
                  <Input
                    id="hausnummer"
                    name="hausnummer"
                    value={localState.hausnummer}
                    onChange={handleChange}
                    placeholder="123"
                    className="w-full bg-white border-gray-200"
                    required
                  />
                  {errors.hausnummer && (
                    <p className="mt-1 text-xs text-red-500">{errors.hausnummer}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="plz" className="block text-sm font-medium text-gray-700 mb-2">
                    PLZ *
                  </Label>
                  <Input
                    id="plz"
                    name="plz"
                    value={localState.plz}
                    onChange={handleChange}
                    placeholder="12345"
                    className="w-full bg-white border-gray-200"
                    required
                  />
                  {errors.plz && (
                    <p className="mt-1 text-xs text-red-500">{errors.plz}</p>
                  )}
                </div>
                <div className="col-span-2">
                  <Label htmlFor="ort" className="block text-sm font-medium text-gray-700 mb-2">
                    Ort *
                  </Label>
                  <Input
                    id="ort"
                    name="ort"
                    value={localState.ort}
                    onChange={handleChange}
                    placeholder="Musterstadt"
                    className="w-full bg-white border-gray-200"
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
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Building className="h-4 w-4 mr-2 text-accent" />
              Zugangsinformationen
            </h3>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-500">Etage:</div>
                
                <div className="flex items-center border rounded-md overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleEtageChange(Math.max(0, localState.etage - 1))}
                    className="flex-none h-8 w-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="w-14 h-8 flex items-center justify-center text-sm font-medium">
                    {localState.etage === 0 ? 'EG' : `${localState.etage}.`}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEtageChange(localState.etage + 1)}
                    className="flex-none h-8 w-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="aufzug"
                  checked={localState.aufzug}
                  onCheckedChange={handleAufzugChange}
                />
                <Label htmlFor="aufzug" className="cursor-pointer">Aufzug vorhanden</Label>
              </div>
            </div>
            
            <div className="mb-4">
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Parkmöglichkeit vor Ort:
              </Label>
              <RadioGroup
                value={localState.parkmoeglichkeit}
                onValueChange={(value) => handleParkmoeglichkeitChange(value as FormData['adresse']['parkmoeglichkeit'])}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
                  <RadioGroupItem value="gut" id="park-gut" className="text-accent border-gray-300 focus:ring-accent" />
                  <Label htmlFor="park-gut" className="cursor-pointer flex-1">Gut (direkt vor dem Gebäude)</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
                  <RadioGroupItem value="eingeschraenkt" id="park-eingeschraenkt" className="text-accent border-gray-300 focus:ring-accent" />
                  <Label htmlFor="park-eingeschraenkt" className="cursor-pointer flex-1">Eingeschränkt (in der Nähe)</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
                  <RadioGroupItem value="keine" id="park-keine" className="text-accent border-gray-300 focus:ring-accent" />
                  <Label htmlFor="park-keine" className="cursor-pointer flex-1">Keine/Schwierig</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <Label htmlFor="zugaenglichkeit">Zugänglichkeit und Besonderheiten</Label>
              <Textarea
                id="zugaenglichkeit"
                name="zugaenglichkeit"
                value={localState.zugaenglichkeit}
                onChange={handleChange}
                placeholder="Gibt es besondere Hinweise zur Zugänglichkeit? (z.B. Hinterhaus, schwierige/enge Treppe, etc.)"
                className="w-full mt-1 h-20"
              />
            </div>
          </div>

          {/* Terminwunsch-Abschnitt */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-accent" />
              Terminwunsch
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="wunschtermin" className="block text-sm font-medium text-gray-700 mb-2">
                  Datum
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-300",
                        !terminDatum && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {terminDatum ? format(terminDatum, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border border-gray-200" align="start">
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
                <Label htmlFor="wunschzeit" className="block text-sm font-medium text-gray-700 mb-2">
                  Uhrzeit (optional)
                </Label>
                <div className="flex items-center border rounded-md shadow-sm overflow-hidden">
                  <div className="flex-none w-10 h-10 flex items-center justify-center bg-gray-50 border-r">
                    <Clock className="h-5 w-5 text-gray-500" />
                  </div>
                  <Input
                    id="wunschzeit"
                    name="wunschzeit"
                    type="time"
                    className="border-0 flex-1 h-10 focus:ring-0"
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
            className="mt-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <p>{error}</p>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <motion.button
            onClick={() => {
              saveToFormData();
              goToPreviousStep();
            }}
            className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Zurück
          </motion.button>

          <motion.button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`py-3 px-8 rounded-md font-medium transition-all duration-200 ${
              isValid
                ? 'bg-accent text-white hover:bg-accent-dark hover:shadow-md'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={isValid ? { scale: 1.03 } : {}}
            whileTap={isValid ? { scale: 0.97 } : {}}
          >
            Weiter
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
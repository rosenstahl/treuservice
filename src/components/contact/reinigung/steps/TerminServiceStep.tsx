"use client"

import React, { useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../ReinigungWizard'
import { 
  Clock, 
  Zap, 
  CalendarCheck, 
  Calendar, 
  CalendarDays, 
  Sun,
  Moon,
  Info,
  MapPin
} from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox2 } from '@/components/ui/checkbox2'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

type TerminServiceStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Servicetyp Informationen
const serviceTypes = {
  standard: {
    title: "Standard-Service",
    description: "Normale Bearbeitung innerhalb von 3 Werktagen",
    icon: <Clock className="h-5 w-5" />
  },
  express: {
    title: "Express-Service",
    description: "Bevorzugte Bearbeitung innerhalb von 24 Stunden",
    icon: <CalendarCheck className="h-5 w-5" />
  },
  sofort: {
    title: "Sofort-Service",
    description: "Sofortige Beauftragung & schnellstmögliche Durchführung",
    icon: <Zap className="h-5 w-5" />
  }
}

// Regelmäßigkeit Informationen
const frequencyTypes = {
  'einmalig': {
    title: "Einmalig",
    description: "Einmalige Reinigung zum gewünschten Termin",
    icon: <Calendar className="h-5 w-5" />
  },
  'taeglich': {
    title: "Täglich",
    description: "Tägliche Reinigung (Montag bis Freitag)",
    icon: <CalendarDays className="h-5 w-5" />,
    discount: "10% Rabatt"
  },
  'woechentlich': {
    title: "Wöchentlich",
    description: "Regelmäßige Reinigung einmal pro Woche",
    icon: <CalendarDays className="h-5 w-5" />,
    discount: "7% Rabatt"
  },
  'monatlich': {
    title: "Monatlich",
    description: "Regelmäßige Reinigung einmal pro Monat",
    icon: <CalendarDays className="h-5 w-5" />,
    discount: "5% Rabatt"
  },
  'individuell': {
    title: "Individuell",
    description: "Benutzerdefinierter Reinigungsrhythmus",
    icon: <Calendar className="h-5 w-5" />
  }
}

// Erweiterte FormData mit zusätzlichen Feldern
type ExtendedFormData = FormData & {
  terminService: {
    servicetyp: 'standard' | 'express' | 'sofort';
    regelmassigkeit: 'einmalig' | 'taeglich' | 'woechentlich' | 'monatlich' | 'individuell' | '';
    individuelleAngabe?: string;
    wunschtermin: string;
    endtermin?: string; // Neu: Enddatum für regelmäßige Reinigungen
    wunschzeit?: string;
    dienste?: {
      tagesdienst: boolean;
      nachtdienst: boolean;
      wochenenddienst: boolean;
      feiertagsdienst: boolean;
    };
    objekt_adresse?: {
      strasse: string;
      hausnummer: string;
      plz: string;
      ort: string;
    };
    anmerkungen: string;
  };
}

// Typ für Timeout-IDs
interface TimeoutIds {
  individuellTimeout?: number;
  wunschzeitTimeout?: number;
  textChangeTimeout?: number;
}

// Lokaler Zustandstyp
type LocalStateType = {
  servicetyp: FormData['terminService']['servicetyp'];
  regelmassigkeit: FormData['terminService']['regelmassigkeit'];
  individuelleAngabe: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  wunschzeit: string;
  // Dienstzeiten
  dienste: {
    tagesdienst: boolean;
    nachtdienst: boolean;
    wochenenddienst: boolean;
    feiertagsdienst: boolean;
  };
  // Objektadresse
  objektStrasse: string;
  objektHausnummer: string;
  objektPlz: string;
  objektOrt: string;
  anmerkungen: string;
  error: string;
}

export const TerminServiceStep: React.FC<TerminServiceStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  // Cast zu erweitertem FormData Typ
  const extendedFormData = formData as ExtendedFormData;
  
  // Minimales Datum für den Termin-Picker (heute) - Als useMemo um ESLint-Warnung zu beheben
  const today = useMemo(() => new Date(), []);
  
  // Lokale Zustandsvariablen
  const [localState, setLocalState] = useState<LocalStateType>({
    servicetyp: formData.terminService.servicetyp || 'standard',
    regelmassigkeit: formData.terminService.regelmassigkeit || 'einmalig',
    individuelleAngabe: formData.terminService.individuelleAngabe || '',
    startDate: formData.terminService.wunschtermin ? new Date(formData.terminService.wunschtermin) : undefined,
    endDate: extendedFormData.terminService.endtermin ? new Date(extendedFormData.terminService.endtermin) : undefined,
    wunschzeit: formData.terminService.wunschzeit || '',
    dienste: extendedFormData.terminService.dienste || {
      tagesdienst: true,
      nachtdienst: false,
      wochenenddienst: false,
      feiertagsdienst: false
    },
    objektStrasse: extendedFormData.terminService.objekt_adresse?.strasse || formData.kontakt.adresseStrasse || '',
    objektHausnummer: extendedFormData.terminService.objekt_adresse?.hausnummer || formData.kontakt.adresseHausnummer || '',
    objektPlz: extendedFormData.terminService.objekt_adresse?.plz || formData.kontakt.adressePlz || '',
    objektOrt: extendedFormData.terminService.objekt_adresse?.ort || formData.kontakt.adresseOrt || '',
    anmerkungen: formData.terminService.anmerkungen || '',
    error: ''
  });
  
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const [hoveredFrequency, setHoveredFrequency] = useState<string | null>(null);
  const timeoutIds = useMemo<TimeoutIds>(() => ({}), []);

  // Prüfen, ob ein Enddatum basierend auf der Regelmäßigkeit benötigt wird
  const requiresEndDate = useCallback((frequency: string): boolean => {
    return frequency !== 'einmalig';
  }, []);
  
  // Für Express-Service: Morgen als minimales Datum, für Sofort-Service: Heute
  const getMinDate = useCallback(() => {
    if (localState.servicetyp === 'standard') return getNextWorkingDay();
    if (localState.servicetyp === 'express') return getTomorrow();
    return today;
  }, [localState.servicetyp, today]);

  // Morgen erhalten
  function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  // Nächsten Werktag erhalten
  function getNextWorkingDay() {
    const date = new Date();
    let days = 1;
    
    // Wenn heute Freitag (5) ist, setze auf Montag (+3 Tage)
    // Wenn heute Samstag (6) ist, setze auf Montag (+2 Tage)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 5) days = 3;
    else if (dayOfWeek === 6) days = 2;
    
    date.setDate(date.getDate() + days);
    return date;
  }

  // Update localState helper
  const updateLocalState = useCallback((updates: Partial<LocalStateType>) => {
    setLocalState(prev => ({ ...prev, ...updates }));
  }, []);

  // Aktualisiere den Gesamtzustand des Formulars
  const updateFormDataFromLocal = useCallback(() => {
    updateFormData({
      terminService: {
        servicetyp: localState.servicetyp,
        regelmassigkeit: localState.regelmassigkeit,
        individuelleAngabe: localState.regelmassigkeit === 'individuell' ? localState.individuelleAngabe : undefined,
        wunschtermin: localState.startDate ? localState.startDate.toISOString().split('T')[0] : '',
        endtermin: localState.endDate ? localState.endDate.toISOString().split('T')[0] : undefined,
        wunschzeit: localState.wunschzeit,
        dienste: localState.dienste,
        objekt_adresse: {
          strasse: localState.objektStrasse,
          hausnummer: localState.objektHausnummer,
          plz: localState.objektPlz,
          ort: localState.objektOrt
        },
        anmerkungen: localState.anmerkungen
      }
    });
  }, [localState, updateFormData]);

  // Standarddauer für regelmäßige Reinigungen festlegen
  const getDefaultEndDate = useCallback((startDate: Date, frequency: string): Date => {
    if (!startDate) return new Date();
    
    const endDate = new Date(startDate);
    
    switch (frequency) {
      case 'taeglich':
        // Beispiel: 1 Monat für tägliche Reinigungen
        endDate.setMonth(endDate.getMonth() + 1);
        break;
      case 'woechentlich':
        // Beispiel: 3 Monate für wöchentliche Reinigungen
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case 'monatlich':
      case 'individuell':
        // Beispiel: 6 Monate für monatliche oder individuelle Reinigungen
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      default:
        // Für einmalige Reinigungen kein Enddatum
        return startDate;
    }
    
    return endDate;
  }, []);

  // Handler für Servicetyp-Auswahl
  const handleServicetypSelect = useCallback((type: FormData['terminService']['servicetyp']) => {
    const updates: Partial<LocalStateType> = {
      servicetyp: type,
      error: ''
    };
    
    // Wenn "sofort" gewählt wird, setze das Datum auf heute
    if (type === 'sofort') {
      updates.startDate = today;
    }
    
    updateLocalState(updates);
    setTimeout(updateFormDataFromLocal, 0);
  }, [today, updateLocalState, updateFormDataFromLocal]);

  // Handler für Regelmäßigkeit-Auswahl
  const handleRegelmassigkeitSelect = useCallback((frequency: FormData['terminService']['regelmassigkeit']) => {
    const updates: Partial<LocalStateType> = {
      regelmassigkeit: frequency,
      error: ''
    };
    
    // Wenn Regelmäßigkeit nicht "einmalig" ist und ein Startdatum existiert, setze ein Enddatum
    if (requiresEndDate(frequency) && localState.startDate) {
      updates.endDate = getDefaultEndDate(localState.startDate, frequency);
    } else if (frequency === 'einmalig') {
      // Bei einmaligen Reinigungen kein Enddatum
      updates.endDate = undefined;
    }
    
    updateLocalState(updates);
    setTimeout(updateFormDataFromLocal, 0);
  }, [updateLocalState, updateFormDataFromLocal, requiresEndDate, getDefaultEndDate, localState]);

  // Handler für individuelle Angabe
  const handleIndividuelleAngabeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateLocalState({ individuelleAngabe: e.target.value });
    
    // Verzögertes Aktualisieren des Hauptformulars
    if (timeoutIds.individuellTimeout) {
      window.clearTimeout(timeoutIds.individuellTimeout);
    }
    timeoutIds.individuellTimeout = window.setTimeout(updateFormDataFromLocal, 300);
  }, [updateLocalState, updateFormDataFromLocal, timeoutIds]);

  // Handler für Wunschzeit
  const handleWunschzeitChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateLocalState({ wunschzeit: e.target.value });
    
    // Verzögertes Aktualisieren des Hauptformulars
    if (timeoutIds.wunschzeitTimeout) {
      window.clearTimeout(timeoutIds.wunschzeitTimeout);
    }
    timeoutIds.wunschzeitTimeout = window.setTimeout(updateFormDataFromLocal, 300);
  }, [updateLocalState, updateFormDataFromLocal, timeoutIds]);

  // Handler für Text-Inputs
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    updateLocalState({ [id as keyof LocalStateType]: value } as Partial<LocalStateType>);
    
    // Verzögertes Aktualisieren des Hauptformulars
    if (timeoutIds.textChangeTimeout) {
      window.clearTimeout(timeoutIds.textChangeTimeout);
    }
    timeoutIds.textChangeTimeout = window.setTimeout(updateFormDataFromLocal, 300);
  }, [updateLocalState, updateFormDataFromLocal, timeoutIds]);

  // Handler für Startdatum-Auswahl
  const handleStartDateSelect = useCallback((date: Date | undefined) => {
    const updates: Partial<LocalStateType> = {
      startDate: date,
      error: ''
    };
    
    // Wenn Regelmäßigkeit nicht "einmalig" ist und ein neues Startdatum existiert, aktualisiere auch das Enddatum
    if (date && requiresEndDate(localState.regelmassigkeit)) {
      updates.endDate = getDefaultEndDate(date, localState.regelmassigkeit);
    }
    
    updateLocalState(updates);
    setTimeout(updateFormDataFromLocal, 0);
  }, [localState.regelmassigkeit, requiresEndDate, getDefaultEndDate, updateLocalState, updateFormDataFromLocal]);

  // Handler für Enddatum-Auswahl
  const handleEndDateSelect = useCallback((date: Date | undefined) => {
    updateLocalState({ endDate: date, error: '' });
    setTimeout(updateFormDataFromLocal, 0);
  }, [updateLocalState, updateFormDataFromLocal]);

  // Handler für Dienstzeit-Checkboxen
  const handleDienstChange = useCallback((name: keyof typeof localState.dienste, checked: boolean) => {
    updateLocalState({
      dienste: {
        ...localState.dienste,
        [name]: checked
      }
    });
    
    setTimeout(updateFormDataFromLocal, 0);
  }, [localState, updateLocalState, updateFormDataFromLocal]);

  // Validierung und Navigation
  const handleContinue = useCallback(() => {
    if (!localState.regelmassigkeit) {
      updateLocalState({ error: 'Bitte wählen Sie die gewünschte Regelmäßigkeit aus' });
      return;
    }
    
    if (localState.regelmassigkeit === 'individuell' && !localState.individuelleAngabe.trim()) {
      updateLocalState({ error: 'Bitte geben Sie den gewünschten Rhythmus an' });
      return;
    }
    
    if (!localState.startDate) {
      updateLocalState({ error: 'Bitte wählen Sie einen Wunschtermin' });
      return;
    }
    
    // Prüfen, ob Enddatum bei nicht-einmaligen Reinigungen angegeben wurde
    if (requiresEndDate(localState.regelmassigkeit) && !localState.endDate) {
      updateLocalState({ error: 'Bitte wählen Sie ein Enddatum für den Reinigungszeitraum' });
      return;
    }
    
    // Prüfen, ob das Enddatum nicht vor dem Startdatum liegt
    if (localState.endDate && localState.startDate && localState.endDate <= localState.startDate) {
      updateLocalState({ error: 'Das Enddatum muss nach dem Startdatum liegen' });
      return;
    }
    
    // Prüfen ob mindestens eine Dienstzeit ausgewählt ist
    if (!localState.dienste.tagesdienst && 
        !localState.dienste.nachtdienst && 
        !localState.dienste.wochenenddienst && 
        !localState.dienste.feiertagsdienst) {
      updateLocalState({ error: 'Bitte wählen Sie mindestens eine Dienstzeit aus' });
      return;
    }

    // Prüfen ob die Objektadresse vollständig ist
    if (!localState.objektStrasse || !localState.objektHausnummer || !localState.objektPlz || !localState.objektOrt) {
      updateLocalState({ error: 'Bitte geben Sie die vollständige Adresse des zu reinigenden Objekts an' });
      return;
    }
    
    updateFormDataFromLocal();
    goToNextStep();
  }, [
    localState, 
    updateLocalState, 
    updateFormDataFromLocal, 
    goToNextStep,
    requiresEndDate
  ]);

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
          Zeitplan und Einsatzort
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie den Zeitpunkt, die Häufigkeit und den Ort der Reinigung.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Service-Typ Auswahl */}
        <motion.div
          className="space-y-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-accent" />
            Service-Typ
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(serviceTypes).map(([type, info]) => (
              <motion.div
                key={type}
                className={`flex items-center h-11 px-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  localState.servicetyp === type 
                    ? 'border-accent/20 bg-accent/5 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleServicetypSelect(type as FormData['terminService']['servicetyp'])}
                onMouseEnter={() => setHoveredType(type)}
                onMouseLeave={() => setHoveredType(null)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-3 ${
                  localState.servicetyp === type 
                    ? 'text-accent' 
                    : hoveredType === type 
                      ? 'text-accent' 
                      : 'text-gray-400'
                }`}>
                  {info.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-gray-700">{info.title}</h3>
                  <p className="text-xs text-gray-500">{info.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Regelmäßigkeit */}
        <motion.div
          className="space-y-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-accent" />
            Häufigkeit der Reinigung
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(Object.entries(frequencyTypes)).map(([frequency, info]) => (
              <motion.div
                key={frequency}
                className={`flex items-center h-14 px-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  localState.regelmassigkeit === frequency 
                    ? 'border-accent/20 bg-accent/5 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => handleRegelmassigkeitSelect(frequency as FormData['terminService']['regelmassigkeit'])}
                onMouseEnter={() => setHoveredFrequency(frequency)}
                onMouseLeave={() => setHoveredFrequency(null)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`mr-3 ${
                  localState.regelmassigkeit === frequency 
                    ? 'text-accent' 
                    : hoveredFrequency === frequency 
                      ? 'text-accent' 
                      : 'text-gray-400'
                }`}>
                  {info.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm text-gray-700">{info.title}</h3>
                  <p className="text-xs text-gray-500">{info.description}</p>
                </div>
                {'discount' in info && (
                  <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {info.discount}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Individuelle Angabe */}
          {localState.regelmassigkeit === 'individuell' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="mt-3"
            >
              <Input
                id="individuelleAngabe"
                placeholder="z.B. alle 2 Wochen, jeden ersten Montag im Monat..."
                value={localState.individuelleAngabe}
                onChange={handleIndividuelleAngabeChange}
                className="w-full bg-white"
                autoFocus
              />
            </motion.div>
          )}
        </motion.div>
        
        {/* Einsatzzeitraum mit Kalendern */}
        <motion.div
          className="space-y-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-accent" />
            Einsatzzeitraum
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Datum-Auswahl mit Popover-Kalender */}
            <div>
              <Label htmlFor="wunschtermin" className="block text-sm font-medium text-gray-700 mb-2">
                Startdatum *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="wunschtermin"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-300",
                      !localState.startDate && "text-muted-foreground"
                    )}
                    disabled={localState.servicetyp === 'sofort'} // Bei Sofort-Service ist das Datum heute
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {localState.startDate ? format(localState.startDate, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border border-gray-200" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={localState.startDate}
                    onSelect={handleStartDateSelect}
                    disabled={(date) => date < getMinDate() || date < today}
                    initialFocus
                    className="bg-white"
                  />
                </PopoverContent>
              </Popover>
              
              {localState.servicetyp === 'sofort' && (
                <p className="text-xs text-accent mt-1">Bei Sofort-Service wird die Reinigung heute durchgeführt</p>
              )}
            </div>
            
            {/* Enddatum-Auswahl für regelmäßige Reinigungen */}
            {requiresEndDate(localState.regelmassigkeit) && (
              <div>
                <Label htmlFor="endtermin" className="block text-sm font-medium text-gray-700 mb-2">
                  Enddatum *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="endtermin"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-300",
                        !localState.endDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {localState.endDate ? format(localState.endDate, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border border-gray-200" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={localState.endDate}
                      onSelect={handleEndDateSelect}
                      disabled={(date) => (!localState.startDate || date <= localState.startDate)}
                      initialFocus
                      className="bg-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            )}
            
            {/* Uhrzeit-Auswahl */}
            <div className={`${requiresEndDate(localState.regelmassigkeit) ? 'sm:col-span-2' : ''}`}>
              <Label htmlFor="wunschzeit" className="block text-sm font-medium text-gray-700 mb-2">
                Uhrzeit (optional)
              </Label>
              <Input
                id="wunschzeit"
                type="time"
                value={localState.wunschzeit}
                onChange={handleWunschzeitChange}
                className="w-full bg-white"
              />
            </div>
          </div>
        </motion.div>

        {/* Dienstzeiten (aus ZeitlicheInfosStep.tsx von Security) */}
        <motion.div
          className="space-y-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.3 }}
        >
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Clock className="h-4 w-4 mr-2 text-accent" />
            Dienstzeiten
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
              <Checkbox2
                id="tagesdienst"
                checked={localState.dienste.tagesdienst}
                onChange={(e) => handleDienstChange('tagesdienst', e.target.checked)}
              />
              <div>
                <Label htmlFor="tagesdienst" className="flex items-center text-sm font-medium text-gray-700">
                  <Sun className="h-4 w-4 mr-1 text-yellow-500" /> Tagesdienst
                </Label>
                <p className="text-xs text-gray-500">Zwischen 6:00 und 22:00 Uhr</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
              <Checkbox2
                id="nachtdienst"
                checked={localState.dienste.nachtdienst}
                onChange={(e) => handleDienstChange('nachtdienst', e.target.checked)}
              />
              <div>
                <Label htmlFor="nachtdienst" className="flex items-center text-sm font-medium text-gray-700">
                  <Moon className="h-4 w-4 mr-1 text-blue-600" /> Nachtdienst
                </Label>
                <p className="text-xs text-gray-500">Zwischen 22:00 und 6:00 Uhr</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
              <Checkbox2
                id="wochenenddienst"
                checked={localState.dienste.wochenenddienst}
                onChange={(e) => handleDienstChange('wochenenddienst', e.target.checked)}
              />
              <div>
                <Label htmlFor="wochenenddienst" className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar className="h-4 w-4 mr-1 text-green-600" /> Wochenenddienst
                </Label>
                <p className="text-xs text-gray-500">Samstag und Sonntag</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
              <Checkbox2
                id="feiertagsdienst"
                checked={localState.dienste.feiertagsdienst}
                onChange={(e) => handleDienstChange('feiertagsdienst', e.target.checked)}
              />
              <div>
                <Label htmlFor="feiertagsdienst" className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar className="h-4 w-4 mr-1 text-red-600" /> Feiertagsdienst
                </Label>
                <p className="text-xs text-gray-500">An gesetzlichen Feiertagen</p>
              </div>
            </div>
          </div>
          
          {!localState.dienste.tagesdienst && !localState.dienste.nachtdienst && 
            !localState.dienste.wochenenddienst && !localState.dienste.feiertagsdienst && (
            <p className="mt-3 text-sm text-yellow-600 flex items-center">
              <Info className="h-4 w-4 mr-1" />
              Bitte wählen Sie mindestens eine Dienstzeit aus.
            </p>
          )}
        </motion.div>

        {/* Adresse des zu reinigenden Objekts (aus ZeitlicheInfosStep.tsx von Security) */}
        <motion.div
          className="space-y-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-accent" />
            Adresse des zu reinigenden Objekts
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Label htmlFor="objektStrasse" className="block text-sm font-medium text-gray-700 mb-2">
                  Straße *
                </Label>
                <Input
                  id="objektStrasse"
                  value={localState.objektStrasse}
                  onChange={handleTextChange}
                  placeholder="Straßenname"
                  className="w-full bg-white border-gray-200"
                  required
                />
              </div>
              <div>
                <Label htmlFor="objektHausnummer" className="block text-sm font-medium text-gray-700 mb-2">
                  Hausnummer *
                </Label>
                <Input
                  id="objektHausnummer"
                  value={localState.objektHausnummer}
                  onChange={handleTextChange}
                  placeholder="123"
                  className="w-full bg-white border-gray-200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="objektPlz" className="block text-sm font-medium text-gray-700 mb-2">
                  PLZ *
                </Label>
                <Input
                  id="objektPlz"
                  value={localState.objektPlz}
                  onChange={handleTextChange}
                  placeholder="12345"
                  className="w-full bg-white border-gray-200"
                  required
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="objektOrt" className="block text-sm font-medium text-gray-700 mb-2">
                  Ort *
                </Label>
                <Input
                  id="objektOrt"
                  value={localState.objektOrt}
                  onChange={handleTextChange}
                  placeholder="Musterstadt"
                  className="w-full bg-white border-gray-200"
                  required
                />
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Anmerkungen */}
        <motion.div
          className="space-y-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.3 }}
        >
          <Label htmlFor="anmerkungen" className="block text-sm font-medium text-gray-700 flex items-center">
            <Info className="h-4 w-4 mr-2 text-accent" />
            Anmerkungen (optional)
          </Label>
          <Textarea
            id="anmerkungen"
            value={localState.anmerkungen}
            onChange={handleTextChange}
            placeholder="Haben Sie besondere Wünsche oder Anmerkungen zu Ihrem Termin?"
            className="w-full bg-white border-gray-200"
            rows={3}
          />
        </motion.div>

        {localState.error && (
          <motion.div 
            className="mt-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {localState.error}
          </motion.div>
        )}
        
        <motion.div 
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          <motion.button
            onClick={() => {
              updateFormDataFromLocal();
              goToPreviousStep();
            }}
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
  );
};
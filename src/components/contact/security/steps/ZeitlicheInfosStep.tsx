"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SecurityWizard'
import { Calendar as CalendarIcon, Clock, Sun, Moon, CalendarDays, CalendarOff, Info, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox2 } from '@/components/ui/checkbox2'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

type ZeitlicheInfosStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Info zu Dauertypen
const dauerTypes: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
  einmalig: {
    title: "Einmalig",
    description: "Einmaliger Einsatz an einem bestimmten Tag",
    icon: <CalendarIcon className="h-4 w-4" />
  },
  kurzzeitig: {
    title: "Kurzzeitig",
    description: "Befristeter Einsatz für wenige Tage bis einige Wochen",
    icon: <CalendarDays className="h-4 w-4" />
  },
  langfristig: {
    title: "Langfristig",
    description: "Längerfristiger Einsatz für mehrere Monate bis ein Jahr",
    icon: <CalendarDays className="h-4 w-4" />
  },
  unbefristet: {
    title: "Unbefristet",
    description: "Dauerhafter Einsatz ohne festgelegtes Ende",
    icon: <CalendarOff className="h-4 w-4" />
  }
}

// Info zu Wiederholungstypen
const wiederholungTypes: Record<string, { title: string; description: string }> = {
  keine: {
    title: "Keine",
    description: "Kein wiederkehrender Einsatz"
  },
  taeglich: {
    title: "Täglich",
    description: "Jeden Tag (Montag bis Freitag)"
  },
  woechentlich: {
    title: "Wöchentlich",
    description: "An bestimmten Wochentagen"
  },
  monatlich: {
    title: "Monatlich",
    description: "An bestimmten Tagen im Monat"
  }
}

// Definiere einen Typ für den lokalen Zustand
type LocalStateType = {
  dauerTyp: FormData['zeitlicheInfos']['dauerTyp'];
  startDate: Date | undefined;
  endDate: Date | undefined;
  wiederholung: FormData['zeitlicheInfos']['wiederholung'];
  dienste: {
    tagesdienst: boolean;
    nachtdienst: boolean;
    wochenenddienst: boolean;
    feiertagsdienst: boolean;
  };
  anmerkungen: string;
  adresseStrasse: string;
  adresseHausnummer: string;
  adressePlz: string;
  adresseOrt: string;
  error: string;
}

export const ZeitlicheInfosStep: React.FC<ZeitlicheInfosStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  // Lokale Zustandsvariablen - gleicher Code wie zuvor
  const [localState, setLocalState] = useState<LocalStateType>({
    dauerTyp: formData.zeitlicheInfos.dauerTyp || '',
    startDate: formData.zeitlicheInfos.beginnDatum ? new Date(formData.zeitlicheInfos.beginnDatum) : undefined,
    endDate: formData.zeitlicheInfos.endeDatum ? new Date(formData.zeitlicheInfos.endeDatum) : undefined,
    wiederholung: formData.zeitlicheInfos.wiederholung || 'keine',
    dienste: {
      tagesdienst: formData.zeitlicheInfos.dienste.tagesdienst,
      nachtdienst: formData.zeitlicheInfos.dienste.nachtdienst,
      wochenenddienst: formData.zeitlicheInfos.dienste.wochenenddienst,
      feiertagsdienst: formData.zeitlicheInfos.dienste.feiertagsdienst
    },
    anmerkungen: formData.zeitlicheInfos.anmerkungen || '',
    adresseStrasse: formData.kontakt.adresseStrasse || '',
    adresseHausnummer: formData.kontakt.adresseHausnummer || '',
    adressePlz: formData.kontakt.adressePlz || '',
    adresseOrt: formData.kontakt.adresseOrt || '',
    error: ''
  });

  // Handler-Funktionen - gleicher Code wie zuvor
  const updateLocalState = useCallback((updates: Partial<LocalStateType>) => {
    setLocalState(prev => ({ ...prev, ...updates }));
  }, []);

  const saveToFormData = useCallback(() => {
    const beginnDatum = localState.startDate ? localState.startDate.toISOString().split('T')[0] : '';
    const endeDatum = localState.endDate ? localState.endDate.toISOString().split('T')[0] : '';
    
    updateFormData({
      zeitlicheInfos: {
        dauerTyp: localState.dauerTyp,
        beginnDatum,
        endeDatum: localState.dauerTyp !== 'einmalig' && localState.dauerTyp !== 'unbefristet' ? endeDatum : undefined,
        wiederholung: localState.wiederholung,
        dienste: localState.dienste,
        anmerkungen: localState.anmerkungen
      },
      kontakt: {
        ...formData.kontakt,
        adresseStrasse: localState.adresseStrasse,
        adresseHausnummer: localState.adresseHausnummer,
        adressePlz: localState.adressePlz,
        adresseOrt: localState.adresseOrt
      }
    });
  }, [localState, updateFormData, formData.kontakt]);

  // Minimum-Datum ist heute
  const today = new Date();

  // Handler für Dauertyp-Auswahl - gleicher Code wie zuvor
  const handleDauerTypSelect = useCallback((type: FormData['zeitlicheInfos']['dauerTyp']) => {
    const updates: Partial<LocalStateType> = {
      dauerTyp: type,
      error: ''
    };
    
    // Wenn "einmalig" ausgewählt wird, setze Wiederholung auf "keine" und lösche Enddatum
    if (type === 'einmalig') {
      updates.wiederholung = 'keine';
      updates.endDate = undefined;
    }
    // Wenn endeDatum leer ist und nicht einmalig oder unbefristet, setze ein Standardenddatum
    else if (!localState.endDate && localState.startDate && type !== 'unbefristet') {
      const newEndDate = new Date(localState.startDate);
      if (type === 'kurzzeitig') {
        newEndDate.setDate(newEndDate.getDate() + 14); // 2 Wochen
      } else if (type === 'langfristig') {
        newEndDate.setMonth(newEndDate.getMonth() + 3); // 3 Monate
      }
      updates.endDate = newEndDate;
    }
    
    updateLocalState(updates);
    
    // Verzögertes Aktualisieren von formData (um Race Conditions zu vermeiden)
    setTimeout(saveToFormData, 0);
  }, [localState, updateLocalState, saveToFormData]);

  // Weitere Handler - gleicher Code wie zuvor
  const handleStartDateSelect = useCallback((date: Date | undefined) => {
    const updates: Partial<LocalStateType> = {
      startDate: date,
      error: ''
    };
    
    // Wenn ein Enddatum existiert und nun vor dem neuen Startdatum liegt, passe es an
    if (date && localState.endDate && localState.endDate <= date) {
      const newEndDate = new Date(date);
      if (localState.dauerTyp === 'kurzzeitig') {
        newEndDate.setDate(newEndDate.getDate() + 14); // 2 Wochen
      } else if (localState.dauerTyp === 'langfristig') {
        newEndDate.setMonth(newEndDate.getMonth() + 3); // 3 Monate
      } else {
        newEndDate.setDate(newEndDate.getDate() + 1); // Mindestens 1 Tag
      }
      updates.endDate = newEndDate;
    }
    
    updateLocalState(updates);
    
    // Verzögertes Aktualisieren von formData
    setTimeout(saveToFormData, 0);
  }, [localState, updateLocalState, saveToFormData]);

  const handleEndDateSelect = useCallback((date: Date | undefined) => {
    updateLocalState({ endDate: date, error: '' });
    
    // Verzögertes Aktualisieren von formData
    setTimeout(saveToFormData, 0);
  }, [updateLocalState, saveToFormData]);

  const handleWiederholungSelect = useCallback((type: FormData['zeitlicheInfos']['wiederholung']) => {
    updateLocalState({ wiederholung: type, error: '' });
    
    // Verzögertes Aktualisieren von formData
    setTimeout(saveToFormData, 0);
  }, [updateLocalState, saveToFormData]);

  const handleDienstChange = useCallback((name: keyof FormData['zeitlicheInfos']['dienste'], checked: boolean) => {
    updateLocalState({
      dienste: {
        ...localState.dienste,
        [name]: checked
      }
    });
    
    // Verzögertes Aktualisieren von formData
    setTimeout(saveToFormData, 0);
  }, [localState.dienste, updateLocalState, saveToFormData]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    updateLocalState({ [id as keyof LocalStateType]: value } as Partial<LocalStateType>);
    
    // Verzögertes Aktualisieren von formData, aber nicht für jeden Tastendruck
    clearTimeout((window as { textChangeTimeout?: number }).textChangeTimeout);
    (window as { textChangeTimeout?: number }).textChangeTimeout = window.setTimeout(saveToFormData, 500);
  }, [updateLocalState, saveToFormData]);

  const handleContinue = useCallback(() => {
    if (!localState.dauerTyp) {
      updateLocalState({ error: 'Bitte wählen Sie die Einsatzdauer aus' });
      return;
    }
    
    if (!localState.startDate) {
      updateLocalState({ error: 'Bitte geben Sie ein Startdatum an' });
      return;
    }
    
    if (localState.dauerTyp !== 'einmalig' && localState.dauerTyp !== 'unbefristet' && !localState.endDate) {
      updateLocalState({ error: 'Bitte geben Sie ein Enddatum an' });
      return;
    }
    
    if (localState.endDate && localState.startDate && localState.endDate <= localState.startDate) {
      updateLocalState({ error: 'Das Enddatum muss nach dem Startdatum liegen' });
      return;
    }

    if (!localState.adresseStrasse || !localState.adresseHausnummer || !localState.adressePlz || !localState.adresseOrt) {
      updateLocalState({ error: 'Bitte geben Sie die vollständige Adresse des zu betreuenden Objekts an' });
      return;
    }
    
    // Speichere die aktuellen Daten, bevor zum nächsten Schritt gegangen wird
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
          Zeitplan und Einsatzort
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Legen Sie fest, wann und wo der Sicherheitsdienst benötigt wird.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          {/* Dauer des Einsatzes */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <CalendarIcon className="h-4 w-4 mr-2 text-[#009FD8]" />
              Dauer des Einsatzes
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(dauerTypes).map(([type, info]) => (
                <div
                  key={type}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    localState.dauerTyp === type 
                      ? 'border-[#009FD8] bg-[#E6F4FA]' 
                      : 'border-gray-100 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => handleDauerTypSelect(type as FormData['zeitlicheInfos']['dauerTyp'])}
                >
                  <div className={`flex items-center ${localState.dauerTyp === type ? 'text-[#009FD8]' : 'text-gray-700'}`}>
                    <span className="mr-2">{info.icon}</span>
                    <span className="font-medium text-sm">{info.title}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{info.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Zeitraum auswählen mit dem Kalender-Komponente - vereinfacht */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <CalendarDays className="h-4 w-4 mr-2 text-[#009FD8]" />
              Einsatzzeitraum
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="beginnDatum" className="block text-xs font-medium text-gray-700 mb-1">
                  Startdatum *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="beginnDatum"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 hover:border-[#009FD8] focus:border-[#009FD8] focus:ring-[#009FD8] rounded-lg",
                        !localState.startDate && "text-gray-400"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                      {localState.startDate ? format(localState.startDate, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border border-gray-200 rounded-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={localState.startDate}
                      onSelect={handleStartDateSelect}
                      initialFocus
                      disabled={(date) => date < today}
                      className="bg-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              {localState.dauerTyp !== 'einmalig' && localState.dauerTyp !== 'unbefristet' && (
                <div>
                  <Label htmlFor="endeDatum" className="block text-xs font-medium text-gray-700 mb-1">
                    Enddatum *
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="endeDatum"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 hover:border-[#009FD8] focus:border-[#009FD8] focus:ring-[#009FD8] rounded-lg",
                          !localState.endDate && "text-gray-400"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        {localState.endDate ? format(localState.endDate, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border border-gray-200 rounded-lg" align="start">
                      <Calendar
                        mode="single"
                        selected={localState.endDate}
                        onSelect={handleEndDateSelect}
                        initialFocus
                        disabled={(date) => localState.startDate ? date <= localState.startDate : date <= today}
                        className="bg-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </div>

            {/* Wiederholung, wenn nicht einmalig - vereinfacht */}
            {localState.dauerTyp !== 'einmalig' && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                <Label className="block text-xs font-medium text-gray-700 mb-1">
                  Wiederholung
                </Label>
                
                <div className="flex flex-wrap gap-2">
                  {Object.entries(wiederholungTypes).map(([type, info]) => (
                    <div
                      key={type}
                      className={`px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all ${
                        localState.wiederholung === type 
                          ? 'bg-[#009FD8] text-white' 
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                      }`}
                      onClick={() => handleWiederholungSelect(type as FormData['zeitlicheInfos']['wiederholung'])}
                    >
                      <span className="font-medium">{info.title}</span>
                    </div>
                  ))}
                </div>
                
                <p className="mt-2 text-xs text-gray-500">
                  {localState.wiederholung && wiederholungTypes[localState.wiederholung] ? wiederholungTypes[localState.wiederholung].description : ''}
                </p>
              </div>
            )}
          </div>

          {/* Dienstzeiten - vereinfacht */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-[#009FD8]" />
              Dienstzeiten
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start space-x-2 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
                <Checkbox2
                  id="tagesdienst"
                  checked={localState.dienste.tagesdienst}
                  onChange={(e) => handleDienstChange('tagesdienst', e.target.checked)}
                  className="mt-0.5"
                />
                <div>
                  <Label htmlFor="tagesdienst" className="flex items-center text-sm font-medium text-gray-700">
                    <Sun className="h-4 w-4 mr-1 text-amber-500" /> Tagesdienst
                  </Label>
                  <p className="text-xs text-gray-500">Zwischen 6:00 und 22:00 Uhr</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
                <Checkbox2
                  id="nachtdienst"
                  checked={localState.dienste.nachtdienst}
                  onChange={(e) => handleDienstChange('nachtdienst', e.target.checked)}
                  className="mt-0.5"
                />
                <div>
                  <Label htmlFor="nachtdienst" className="flex items-center text-sm font-medium text-gray-700">
                    <Moon className="h-4 w-4 mr-1 text-blue-600" /> Nachtdienst
                  </Label>
                  <p className="text-xs text-gray-500">Zwischen 22:00 und 6:00 Uhr</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
                <Checkbox2
                  id="wochenenddienst"
                  checked={localState.dienste.wochenenddienst}
                  onChange={(e) => handleDienstChange('wochenenddienst', e.target.checked)}
                  className="mt-0.5"
                />
                <div>
                  <Label htmlFor="wochenenddienst" className="flex items-center text-sm font-medium text-gray-700">
                    <CalendarIcon className="h-4 w-4 mr-1 text-green-600" /> Wochenenddienst
                  </Label>
                  <p className="text-xs text-gray-500">Samstag und Sonntag</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
                <Checkbox2
                  id="feiertagsdienst"
                  checked={localState.dienste.feiertagsdienst}
                  onChange={(e) => handleDienstChange('feiertagsdienst', e.target.checked)}
                  className="mt-0.5"
                />
                <div>
                  <Label htmlFor="feiertagsdienst" className="flex items-center text-sm font-medium text-gray-700">
                    <CalendarIcon className="h-4 w-4 mr-1 text-red-500" /> Feiertagsdienst
                  </Label>
                  <p className="text-xs text-gray-500">An gesetzlichen Feiertagen</p>
                </div>
              </div>
            </div>
            
            {!localState.dienste.tagesdienst && !localState.dienste.nachtdienst && 
             !localState.dienste.wochenenddienst && !localState.dienste.feiertagsdienst && (
              <p className="mt-3 text-xs text-amber-600 flex items-center">
                <Info className="h-4 w-4 mr-1" />
                Bitte wählen Sie mindestens eine Dienstzeit aus.
              </p>
            )}
          </div>

          {/* Adresse des zu betreuenden Objekts */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-[#009FD8]" />
              Adresse des zu betreuenden Objekts
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label htmlFor="adresseStrasse" className="block text-xs font-medium text-gray-700 mb-1">
                    Straße *
                  </Label>
                  <Input
                    id="adresseStrasse"
                    value={localState.adresseStrasse}
                    onChange={handleTextChange}
                    placeholder="Straßenname"
                    className="w-full bg-white border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="adresseHausnummer" className="block text-xs font-medium text-gray-700 mb-1">
                    Hausnummer *
                  </Label>
                  <Input
                    id="adresseHausnummer"
                    value={localState.adresseHausnummer}
                    onChange={handleTextChange}
                    placeholder="123"
                    className="w-full bg-white border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="adressePlz" className="block text-xs font-medium text-gray-700 mb-1">
                    PLZ *
                  </Label>
                  <Input
                    id="adressePlz"
                    value={localState.adressePlz}
                    onChange={handleTextChange}
                    placeholder="12345"
                    className="w-full bg-white border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="adresseOrt" className="block text-xs font-medium text-gray-700 mb-1">
                    Ort *
                  </Label>
                  <Input
                    id="adresseOrt"
                    value={localState.adresseOrt}
                    onChange={handleTextChange}
                    placeholder="Musterstadt"
                    className="w-full bg-white border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Anmerkungen */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <Label htmlFor="anmerkungen" className="block text-xs font-medium text-gray-700 mb-1">
              Anmerkungen zu Ihren Zeitvorgaben (optional)
            </Label>
            <Textarea
              id="anmerkungen"
              rows={3}
              value={localState.anmerkungen}
              onChange={handleTextChange}
              placeholder="Besonderheiten zu Ihren zeitlichen Anforderungen..."
              className="w-full bg-white border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
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
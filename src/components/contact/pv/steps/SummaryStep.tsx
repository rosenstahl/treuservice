"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { User, Mail, Phone, Building, CheckCircle, ArrowUpRight, Loader2, MapPin, PenLine, Sun, Home, Calendar as CalendarIcon, Battery } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import Link from 'next/link'

type SummaryStepProps = {
  formData: FormData
  updateFormData: (newData: Partial<FormData>) => void
  goToPreviousStep: () => void
  isLastStep?: boolean
}

// Lokaler Zustandstyp
type LocalStateType = {
  anrede: FormData['kontakt']['anrede'];
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  firma: string;
  adresseStrasse: string;
  adresseHausnummer: string;
  adressePlz: string;
  adresseOrt: string;
  wunschtermin: Date | undefined;
  anmerkungen: string;
  datenschutz: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string;
}

export const SummaryStep: React.FC<SummaryStepProps> = ({
  formData,
  updateFormData,
  goToPreviousStep
}) => {
  // Lokale Zustandsvariablen
  const [localState, setLocalState] = useState<LocalStateType>({
    anrede: formData.kontakt.anrede || '',
    vorname: formData.kontakt.vorname || '',
    nachname: formData.kontakt.nachname || '',
    email: formData.kontakt.email || '',
    telefon: formData.kontakt.telefon || '',
    firma: formData.kontakt.firma || '',
    adresseStrasse: formData.kontakt.adresseStrasse || '',
    adresseHausnummer: formData.kontakt.adresseHausnummer || '',
    adressePlz: formData.kontakt.adressePlz || '',
    adresseOrt: formData.kontakt.adresseOrt || '',
    wunschtermin: formData.kontakt.wunschtermin ? new Date(formData.kontakt.wunschtermin) : undefined,
    anmerkungen: formData.kontakt.anmerkungen || '',
    datenschutz: formData.datenschutz || false,
    isSubmitting: false,
    isSubmitted: false,
    error: ''
  });

  // Aktualisierung des lokalen Zustands
  const updateLocalState = useCallback((updates: Partial<LocalStateType>) => {
    setLocalState(prev => ({ ...prev, ...updates }));
  }, []);

  // Funktion zum Aktualisieren des formData
  const saveToFormData = useCallback(() => {
    updateFormData({
      kontakt: {
        ...formData.kontakt,
        anrede: localState.anrede,
        vorname: localState.vorname,
        nachname: localState.nachname,
        email: localState.email,
        telefon: localState.telefon,
        firma: localState.firma,
        adresseStrasse: localState.adresseStrasse,
        adresseHausnummer: localState.adresseHausnummer,
        adressePlz: localState.adressePlz,
        adresseOrt: localState.adresseOrt,
        wunschtermin: localState.wunschtermin ? localState.wunschtermin.toISOString().split('T')[0] : '',
        anmerkungen: localState.anmerkungen
      },
      datenschutz: localState.datenschutz
    });
  }, [localState, updateFormData, formData.kontakt]);

  // Handler für Text-Input Änderungen
  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    updateLocalState({ [id as keyof LocalStateType]: value } as Partial<LocalStateType>);
    
    // Verzögertes Aktualisieren von formData
    clearTimeout((window as { textChangeTimeout?: number }).textChangeTimeout);
    (window as { textChangeTimeout?: number }).textChangeTimeout = window.setTimeout(saveToFormData, 500);
  }, [updateLocalState, saveToFormData]);

  // Handler für Select-Änderungen
  const handleSelectChange = useCallback((value: string) => {
    updateLocalState({ anrede: value as FormData['kontakt']['anrede'] });
    setTimeout(saveToFormData, 0);
  }, [updateLocalState, saveToFormData]);

  // Handler für Checkbox-Änderungen
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    updateLocalState({ [id as keyof LocalStateType]: checked } as Partial<LocalStateType>);
    setTimeout(saveToFormData, 0);
  }, [updateLocalState, saveToFormData]);
  
  // Handler für Datums-Änderungen
  const handleDateChange = useCallback((date: Date | undefined) => {
    updateLocalState({ wunschtermin: date });
    setTimeout(saveToFormData, 0);
  }, [updateLocalState, saveToFormData]);

  // Dachtyp als lesbare Bezeichnung
  const getDachTypLabel = (typ: string) => {
    const labels: Record<string, string> = {
      'pitched': 'Schrägdach',
      'flat': 'Flachdach',
      'facade': 'Fassade',
      'carport': 'Carport',
      'other': 'Sonstiger Dachtyp'
    };
    return labels[typ] || 'Nicht angegeben';
  }

  // Ausrichtung als lesbare Bezeichnung
  const getAusrichtungLabel = (ausrichtung: string) => {
    const labels: Record<string, string> = {
      'south': 'Süd',
      'east-west': 'Ost-West',
      'other': 'Andere'
    };
    return labels[ausrichtung] || 'Nicht angegeben';
  }

  // Modultyp als lesbare Bezeichnung
  const getModulTypLabel = (typ: string) => {
    const labels: Record<string, string> = {
      'standard': 'Standard',
      'premium': 'Premium',
      'bifacial': 'Bifazial'
    };
    return labels[typ] || 'Nicht angegeben';
  }

  // Montageart als lesbare Bezeichnung
  const getMontageArtLabel = (art: string) => {
    const labels: Record<string, string> = {
      'roof-mounted': 'Aufdach',
      'in-roof': 'Indach',
      'flat-roof': 'Flachdach'
    };
    return labels[art] || 'Nicht angegeben';
  }
  
  // Berechne das Mindestdatum für den Datumsauswähler (morgen)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  // Berechne das Maximaldatum für den Datumsauswähler (3 Monate in der Zukunft)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate;
  }

  // Formular absenden mit API-Aufruf
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // E-Mail-Validierung mit regulärem Ausdruck
    const validateEmail = (email: string) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return re.test(email)
    }
    
    // Grundlegende Validierung
    if (!localState.vorname.trim() || !localState.nachname.trim()) {
      updateLocalState({ error: 'Bitte geben Sie Ihren Vor- und Nachnamen an' });
      return;
    }
    
    if (!localState.email.trim() || !validateEmail(localState.email)) {
      updateLocalState({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an' });
      return;
    }
    
    if (!localState.telefon.trim()) {
      updateLocalState({ error: 'Bitte geben Sie Ihre Telefonnummer an' });
      return;
    }
    
    // Adressfelder prüfen
    if (!localState.adresseStrasse.trim() || !localState.adresseHausnummer.trim() || 
        !localState.adressePlz.trim() || !localState.adresseOrt.trim()) {
      updateLocalState({ error: 'Bitte geben Sie Ihre vollständige Adresse an' });
      return;
    }
    
    if (!localState.datenschutz) {
      updateLocalState({ error: 'Bitte stimmen Sie der Datenschutzerklärung zu' });
      return;
    }
    
    // Aktualisiere die Formular-Daten
    saveToFormData();
    
    updateLocalState({ isSubmitting: true, error: '' });
    
    try {
      // API-Anfrage zum Senden der E-Mail
      const response = await fetch('/api/contact/pv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Fehler beim Senden der Anfrage');
      }
      
      updateLocalState({ isSubmitting: false, isSubmitted: true });
    } catch (error) {
      console.error('Fehler beim Senden der Anfrage:', error);
      updateLocalState({ 
        isSubmitting: false, 
        error: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.'
      });
    }
    
  }, [localState, updateLocalState, saveToFormData, formData]);

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {!localState.isSubmitted ? (
        <>
          <div className="text-center mb-6">
            <motion.h2 
              className="text-xl font-medium text-gray-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.2 }}
            >
              Zusammenfassung
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-xl mx-auto text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              Überprüfen Sie Ihre Auswahl und vervollständigen Sie Ihre Anfrage.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Zusammenfassung linke Spalte */}
            <div className="space-y-6">
              {/* Dach-Informationen */}
              <motion.div
                className="pt-2 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                  <Home className="h-3 w-3 mr-1 text-[#009FD8]" />
                  Dachinformationen
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Dachtyp:</p>
                    <p className="text-xs font-medium text-[#009FD8]">{getDachTypLabel(formData.dach.typ)}</p>
                  </div>
                  
                  {formData.dach.material && (
                    <div>
                      <p className="text-xs text-gray-500">Dachmaterial:</p>
                      <p className="text-xs font-medium">{formData.dach.material}</p>
                    </div>
                  )}
                  
                  {formData.dach.ausrichtung && (
                    <div>
                      <p className="text-xs text-gray-500">Ausrichtung:</p>
                      <p className="text-xs font-medium">{getAusrichtungLabel(formData.dach.ausrichtung)}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-xs text-gray-500">Dachfläche:</p>
                    <p className="text-xs font-medium">{formData.dach.flaeche} m²</p>
                  </div>
                  
                  {formData.dach.neigung !== undefined && (
                    <div>
                      <p className="text-xs text-gray-500">Dachneigung:</p>
                      <p className="text-xs font-medium">{formData.dach.neigung}°</p>
                    </div>
                  )}
                  
                  {formData.dach.hindernis && formData.dach.hindernisDetails && (
                    <div>
                      <p className="text-xs text-gray-500">Hindernisse:</p>
                      <p className="text-xs font-medium">{formData.dach.hindernisDetails}</p>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Anlagen-Informationen */}
              <motion.div
                className="pt-4 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                  <Sun className="h-3 w-3 mr-1 text-[#009FD8]" />
                  Anlagenkonfiguration
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Anlagenleistung:</p>
                    <p className="text-xs font-medium">{formData.anlage.leistung} kWp</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Modultyp:</p>
                    <p className="text-xs font-medium">{getModulTypLabel(formData.anlage.modulTyp)}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Montageart:</p>
                    <p className="text-xs font-medium">{getMontageArtLabel(formData.anlage.montageArt)}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Eigenverbrauch (geschätzt):</p>
                    <p className="text-xs font-medium">{formData.anlage.eigenverbrauch}%</p>
                  </div>
                  
                  {formData.anlage.anzahlModule && (
                    <div>
                      <p className="text-xs text-gray-500">Anzahl Module:</p>
                      <p className="text-xs font-medium">{formData.anlage.anzahlModule} Stk.</p>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Speicher-Informationen */}
              <motion.div
                className="pt-4 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                  <Battery className="h-3 w-3 mr-1 text-[#009FD8]" />
                  Speicherlösung
                </h3>
                
                <div className="space-y-2">
                  {formData.speicher.speicherGewuenscht ? (
                    <>
                      <div>
                        <p className="text-xs text-gray-500">Batteriespeicher:</p>
                        <p className="text-xs font-medium text-green-600">Ja, mit Speicher</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-500">Kapazität:</p>
                        <p className="text-xs font-medium">{formData.speicher.kapazitaet} kWh</p>
                      </div>
                      
                      {formData.speicher.hersteller && (
                        <div>
                          <p className="text-xs text-gray-500">Bevorzugter Hersteller:</p>
                          <p className="text-xs font-medium">{formData.speicher.hersteller}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div>
                      <p className="text-xs text-gray-500">Batteriespeicher:</p>
                      <p className="text-xs font-medium">Nicht gewünscht</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
            
            {/* Kontaktformular rechte Spalte */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Anrede als Select */}
                <div>
                  <Label className="block text-xs font-medium text-gray-700 mb-1">
                    Anrede
                  </Label>
                  <Select 
                    value={localState.anrede} 
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-full bg-white h-9 text-xs rounded-lg">
                      <SelectValue placeholder="Bitte wählen" className="text-gray-600 text-xs" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="herr" className="text-gray-700 text-xs">Herr</SelectItem>
                      <SelectItem value="frau" className="text-gray-700 text-xs">Frau</SelectItem>
                      <SelectItem value="keine" className="text-gray-700 text-xs">Keine Angabe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Vor- und Nachname */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="vorname" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                      <User className="h-3 w-3 mr-1 text-[#009FD8]" />
                      Vorname*
                    </Label>
                    <Input
                      id="vorname"
                      name="vorname"
                      type="text"
                      required
                      value={localState.vorname}
                      onChange={handleTextChange}
                      className="w-full bg-white h-9 text-xs rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nachname" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                      <User className="h-3 w-3 mr-1 text-[#009FD8]" />
                      Nachname*
                    </Label>
                    <Input
                      id="nachname"
                      name="nachname"
                      type="text"
                      required
                      value={localState.nachname}
                      onChange={handleTextChange}
                      className="w-full bg-white h-9 text-xs rounded-lg"
                    />
                  </div>
                </div>
                
                {/* Kontakt */}
                <div>
                  <Label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                    <Mail className="h-3 w-3 mr-1 text-[#009FD8]" />
                    E-Mail*
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={localState.email}
                    onChange={handleTextChange}
                    className="w-full bg-white h-9 text-xs rounded-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefon" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                    <Phone className="h-3 w-3 mr-1 text-[#009FD8]" />
                    Telefon*
                  </Label>
                  <Input
                    id="telefon"
                    name="telefon"
                    type="tel"
                    required
                    value={localState.telefon}
                    onChange={handleTextChange}
                    className="w-full bg-white h-9 text-xs rounded-lg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="firma" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                    <Building className="h-3 w-3 mr-1 text-[#009FD8]" />
                    Ihr Unternehmen (optional)
                  </Label>
                  <Input
                    id="firma"
                    name="firma"
                    type="text"
                    value={localState.firma}
                    onChange={handleTextChange}
                    className="w-full bg-white h-9 text-xs rounded-lg"
                  />
                </div>

                {/* Adresse des Anfragenden */}
                <div>
                  <Label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-[#009FD8]" />
                    Ihre Adresse*
                  </Label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="col-span-2">
                      <Input
                        id="adresseStrasse"
                        name="adresseStrasse"
                        type="text"
                        placeholder="Straße"
                        value={localState.adresseStrasse}
                        onChange={handleTextChange}
                        className="w-full bg-white h-9 text-xs rounded-lg"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        id="adresseHausnummer"
                        name="adresseHausnummer"
                        type="text"
                        placeholder="Nr."
                        value={localState.adresseHausnummer}
                        onChange={handleTextChange}
                        className="w-full bg-white h-9 text-xs rounded-lg"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Input
                        id="adressePlz"
                        name="adressePlz"
                        type="text"
                        placeholder="PLZ"
                        value={localState.adressePlz}
                        onChange={handleTextChange}
                        className="w-full bg-white h-9 text-xs rounded-lg"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        id="adresseOrt"
                        name="adresseOrt"
                        type="text"
                        placeholder="Ort"
                        value={localState.adresseOrt}
                        onChange={handleTextChange}
                        className="w-full bg-white h-9 text-xs rounded-lg"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Wunschtermin mit Kalendar */}
                <div>
                  <Label htmlFor="wunschtermin" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                    <CalendarIcon className="h-3 w-3 mr-1 text-[#009FD8]" />
                    Wunschtermin für Beratung (optional)
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="wunschtermin"
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-sm h-9",
                          !localState.wunschtermin && "text-gray-500"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {localState.wunschtermin ? format(localState.wunschtermin, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border border-gray-200 rounded-lg" align="start">
                      <Calendar
                        mode="single"
                        selected={localState.wunschtermin}
                        onSelect={handleDateChange}
                        disabled={(date) => date < getMinDate() || date > getMaxDate()}
                        initialFocus
                        className="bg-white rounded-lg"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <Label htmlFor="anmerkungen" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                    <PenLine className="h-3 w-3 mr-1 text-[#009FD8]" />
                    Nachricht (optional)
                  </Label>
                  <Textarea
                    id="anmerkungen"
                    name="anmerkungen"
                    rows={2}
                    value={localState.anmerkungen}
                    onChange={handleTextChange}
                    className="w-full bg-white text-xs rounded-lg"
                  />
                </div>
                
                {/* Datenschutz-Checkbox */}
                <div className="flex items-start space-x-2 mt-3">
                  <div className="flex items-center h-7">
                    <input
                      id="datenschutz"
                      name="datenschutz"
                      type="checkbox"
                      checked={localState.datenschutz}
                      onChange={handleCheckboxChange}
                      className="h-3 w-3 text-[#009FD8] border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="datenschutz" className="text-xs text-gray-700">
                      Ich stimme der Verarbeitung meiner Daten gemäß der <Link href="/privacy" className="text-[#009FD8] hover:underline">Datenschutzerklärung</Link> zu*
                    </label>
                  </div>
                </div>
                
                {localState.error && (
                  <motion.p 
                    className="text-red-500 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {localState.error}
                  </motion.p>
                )}
                
                <div className="flex justify-between space-x-4 pt-4 border-t border-gray-100 mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      saveToFormData();
                      goToPreviousStep();
                    }}
                    className="py-2 px-4 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    Zurück
                  </button>
                  
                  {localState.isSubmitting ? (
                    <button
                      type="button"
                      disabled
                      className="flex-1 py-2.5 px-5 bg-[#009FD8]/70 text-white text-xs font-medium rounded-full cursor-not-allowed flex items-center justify-center"
                    >
                      <Loader2 className="animate-spin mr-2 h-3 w-3" />
                      Wird gesendet...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex-1 py-2.5 px-5 bg-[#009FD8] text-white text-xs font-medium rounded-full hover:bg-[#007CAB] transition-colors"
                    >
                      Anfrage senden
                    </button>
                  )}
                </div>
                
                <p className="text-[10px] text-gray-500 mt-3 leading-tight">
                  Ihre Daten werden gemäß unserer Datenschutzerklärung verarbeitet. Durch das Absenden erklären Sie sich mit der Verarbeitung einverstanden.
                </p>
              </form>
            </div>
          </div>
        </>
      ) : (
        // Erfolgsmeldung nach Absenden
        <motion.div 
          className="text-center py-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-7 w-7 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-medium text-gray-800 mb-3">Anfrage erfolgreich gesendet!</h2>
          
          <p className="text-sm text-gray-600 mb-6 max-w-lg mx-auto">
            Vielen Dank für Ihre PV-Montage-Anfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.
          </p>
          
          <div className="bg-[#E6F4FA] rounded-lg p-4 mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-2">
              <Sun className="h-4 w-4 mr-1.5 text-[#009FD8]" />
              <h3 className="text-sm font-medium text-[#009FD8]">Über unser PV-Montageteam</h3>
            </div>
            <p className="text-xs text-gray-700 mb-3">
              Unser spezialisiertes Team wird Ihre Anforderungen detailliert analysieren und ein individuelles Photovoltaik-Konzept erstellen. Für dringende Anliegen erreichen Sie uns telefonisch.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-3.5 w-3.5 text-[#009FD8]" />
              <span className="text-sm font-medium">0231 15044352</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <motion.a
              href="/"
              className="py-2.5 px-5 bg-[#009FD8] text-white text-xs font-medium rounded-full hover:bg-[#007CAB] transition-colors flex items-center justify-center"
            >
              Zurück zur Startseite
            </motion.a>
            
            <motion.a
              href="/pv-montage"
              className="py-2.5 px-5 border border-gray-200 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              Weitere PV-Informationen
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
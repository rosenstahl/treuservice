"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntruempelungWizard'
import { User, Mail, Phone, Building, CheckCircle, ArrowUpRight, ShoppingBag, Loader2, MapPin, PenLine } from 'lucide-react'
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
import Link from 'next/link'

type KontaktZusammenfassungStepProps = {
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
  anmerkungen: string;
  datenschutz: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string;
}

export const KontaktZusammenfassungStep: React.FC<KontaktZusammenfassungStepProps> = ({
  formData,
  updateFormData,
  goToPreviousStep
}) => {
  // Lokale Zustandsvariablen mit vorhandenem Namen/Kontakt-Daten
  const [localState, setLocalState] = useState<LocalStateType>({
    anrede: formData.kontakt.anrede || '',
    vorname: formData.kontakt.vorname || '',
    nachname: formData.kontakt.nachname || '',
    email: formData.terminKontakt.email || formData.kontakt.email || '',
    telefon: formData.terminKontakt.telefon || formData.kontakt.telefon || '',
    firma: formData.kontakt.firma || '',
    adresseStrasse: formData.adresseZugang.strasse || formData.kontakt.adresseStrasse || '',
    adresseHausnummer: formData.adresseZugang.hausnummer || formData.kontakt.adresseHausnummer || '',
    adressePlz: formData.adresseZugang.plz || formData.kontakt.adressePlz || '',
    adresseOrt: formData.adresseZugang.ort || formData.kontakt.adresseOrt || '',
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
      terminKontakt: {
        ...formData.terminKontakt,
        name: `${localState.vorname} ${localState.nachname}`.trim(),
        email: localState.email,
        telefon: localState.telefon
      },
      adresseZugang: {
        ...formData.adresseZugang,
        strasse: localState.adresseStrasse,
        hausnummer: localState.adresseHausnummer,
        plz: localState.adressePlz,
        ort: localState.adresseOrt
      },
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
        anmerkungen: localState.anmerkungen
      },
      datenschutz: localState.datenschutz
    });
  }, [localState, updateFormData, formData.terminKontakt, formData.adresseZugang, formData.kontakt]);

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

  // Objekttyp als lesbare Bezeichnung
  const getObjektTypLabel = (typ: string) => {
    const labels: Record<string, string> = {
      'wohnung': 'Wohnung',
      'haus': 'Haus',
      'keller': 'Keller',
      'dachboden': 'Dachboden',
      'gewerbe': 'Gewerbeimmobilie',
      'sonstiges': 'Sonstiges'
    };
    return labels[typ] || 'Nicht angegeben';
  }

  // Füllgrad als lesbare Bezeichnung
  const getFuellgradLabel = (fuellgrad: FormData['umfangGroesse']['fuellgrad']) => {
    const labels: Record<string, string> = {
      'leer': 'Nahezu leer',
      'wenig': 'Wenig befüllt',
      'mittel': 'Mittel befüllt',
      'voll': 'Stark befüllt'
    };
    return labels[fuellgrad] || 'Nicht angegeben';
  }

  // Parkmöglichkeit als lesbare Bezeichnung
  const getParkmoeglichkeitLabel = (parkmoeglichkeit: FormData['adresseZugang']['parkmoeglichkeit']) => {
    const labels: Record<string, string> = {
      'gut': 'Gut (direkt vor dem Gebäude)',
      'eingeschraenkt': 'Eingeschränkt (in der Nähe)',
      'keine': 'Keine/Schwierig'
    };
    return labels[parkmoeglichkeit] || 'Nicht angegeben';
  }

  // Etage als lesbare Bezeichnung
  const getEtageLabel = (etage: number) => {
    return etage === 0 ? 'Erdgeschoss' : `${etage}. Etage`;
  }

  // Entrümpelungsarten, die ausgewählt wurden
  const getSelectedEntrumpelungsarten = () => {
    const arten = [];
    if (formData.entrumpelungsart.moebel) arten.push('Möbel');
    if (formData.entrumpelungsart.elektrogeraete) arten.push('Elektrogeräte');
    if (formData.entrumpelungsart.sperrmuell) arten.push('Sperrmüll');
    if (formData.entrumpelungsart.bauschutt) arten.push('Bauschutt');
    if (formData.entrumpelungsart.sondermuell) arten.push('Sondermüll');
    if (formData.entrumpelungsart.sonstiges && formData.entrumpelungsart.sonstigesText) {
      arten.push(`Sonstiges: ${formData.entrumpelungsart.sonstigesText}`);
    }
    return arten.length > 0 ? arten.join(', ') : 'Keine Angabe';
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
      const response = await fetch('/api/contact/entruempelung', {
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

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

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
              Überprüfen Sie Ihre Auswahl und vervollständigen Sie Ihre Anfrage
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Zusammenfassung linke Spalte */}
            <div className="space-y-6">
              {/* Angaben zum Objekt */}
              <motion.div
                className="pt-2 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3">Angaben zum Objekt</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Objekttyp:</p>
                    <p className="text-xs font-medium text-[#009FD8]">{getObjektTypLabel(formData.objektTyp.typ)}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Objektgröße:</p>
                    <p className="text-xs font-medium">
                      {formData.umfangGroesse.flaeche} m², {formData.umfangGroesse.raumanzahl} {formData.umfangGroesse.raumanzahl === 1 ? 'Raum' : 'Räume'}, {getFuellgradLabel(formData.umfangGroesse.fuellgrad)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Adresse:</p>
                    <p className="text-xs font-medium">
                      {formData.adresseZugang.strasse} {formData.adresseZugang.hausnummer}, {formData.adresseZugang.plz} {formData.adresseZugang.ort}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Entrümpelungsart Informationen */}
              <motion.div
                className="pt-4 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3">Entrümpelungsart</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Zu entrümpelnde Gegenstände:</p>
                    <p className="text-xs font-medium">{getSelectedEntrumpelungsarten()}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Zugangs-Details */}
              <motion.div
                className="pt-4 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-[#009FD8]" />
                  Einsatzdetails
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Etage:</p>
                    <p className="text-xs font-medium">{getEtageLabel(formData.adresseZugang.etage)}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Aufzug:</p>
                    <p className="text-xs font-medium">{formData.adresseZugang.aufzug ? 'Vorhanden' : 'Nicht vorhanden'}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Parkmöglichkeit:</p>
                    <p className="text-xs font-medium">{getParkmoeglichkeitLabel(formData.adresseZugang.parkmoeglichkeit)}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Wunschtermin:</p>
                    <p className="text-xs font-medium">
                      {formatDate(formData.terminKontakt.wunschtermin)}
                      {formData.terminKontakt.wunschzeit && ` um ${formData.terminKontakt.wunschzeit} Uhr`}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Zusatzleistungen */}
              <motion.div
                className="pt-4 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3">Zusatzleistungen</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className={`mr-2 ${formData.zusatzleistungen.reinigung ? 'text-[#009FD8]' : 'text-gray-400'}`}>
                      {formData.zusatzleistungen.reinigung ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border border-gray-300"></div>
                      )}
                    </div>
                    <p className="text-xs font-medium">Endreinigung</p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`mr-2 ${formData.zusatzleistungen.entsorgungsnachweis ? 'text-[#009FD8]' : 'text-gray-400'}`}>
                      {formData.zusatzleistungen.entsorgungsnachweis ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <div className="h-3 w-3 rounded-full border border-gray-300"></div>
                      )}
                    </div>
                    <p className="text-xs font-medium">Entsorgungsnachweis</p>
                  </div>
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
                      Jetzt anfragen
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
            Vielen Dank für Ihre Entrümpelungsanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.
          </p>
          
          <div className="bg-[#E6F4FA] rounded-lg p-4 mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-2">
              <ShoppingBag className="h-4 w-4 mr-1.5 text-[#009FD8]" />
              <h3 className="text-sm font-medium text-[#009FD8]">Über unser Entrümpelungsteam</h3>
            </div>
            <p className="text-xs text-gray-700 mb-3">
              Unser spezialisiertes Team wird Ihre Anforderungen detailliert analysieren und ein individuelles Entrümpelungskonzept erstellen. Für dringende Anliegen erreichen Sie uns telefonisch.
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
              href="/entrumpelung"
              className="py-2.5 px-5 border border-gray-200 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              Weitere Entrümpelungsleistungen
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
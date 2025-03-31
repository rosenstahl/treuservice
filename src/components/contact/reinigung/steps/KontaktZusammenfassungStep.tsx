"use client"

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../ReinigungWizard';
import { CheckCircle, PhoneCall, Loader2, Sparkle, MapPin, User, Mail, Phone, Building2, PenLine } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from 'next/link';

type KontaktZusammenfassungStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  isLastStep?: boolean;
}

// Erweiterte FormData mit den neuen Feldern
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

// Lokaler Status-Typ
type LocalStateType = {
  anrede: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  firma: string;
  kontaktStrasse: string;
  kontaktHausnummer: string;
  kontaktPlz: string;
  kontaktOrt: string;
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
  // Cast formData zu erweiterten Typ
  const extendedFormData = formData as ExtendedFormData;

  // Zustandsvariablen mit lokalem State-Management
  const [localState, setLocalState] = useState<LocalStateType>({
    anrede: '',
    vorname: formData.kontakt.name.split(' ')[0] || '',
    nachname: formData.kontakt.name.split(' ').slice(1).join(' ') || '',
    email: formData.kontakt.email || '',
    telefon: formData.kontakt.telefon || '',
    firma: formData.kontakt.firma || '',
    kontaktStrasse: formData.kontakt.adresseStrasse || '',
    kontaktHausnummer: formData.kontakt.adresseHausnummer || '',
    kontaktPlz: formData.kontakt.adressePlz || '',
    kontaktOrt: formData.kontakt.adresseOrt || '',
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
    const fullName = `${localState.vorname} ${localState.nachname}`.trim();
    
    updateFormData({
      kontakt: {
        ...formData.kontakt,
        name: fullName,
        email: localState.email,
        telefon: localState.telefon,
        firma: localState.firma,
        adresseStrasse: localState.kontaktStrasse,
        adresseHausnummer: localState.kontaktHausnummer,
        adressePlz: localState.kontaktPlz,
        adresseOrt: localState.kontaktOrt,
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
    updateLocalState({ anrede: value });
    setTimeout(saveToFormData, 0);
  }, [updateLocalState, saveToFormData]);

  // Handler für Checkbox-Änderungen
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    updateLocalState({ [id as keyof LocalStateType]: checked } as Partial<LocalStateType>);
    setTimeout(saveToFormData, 0);
  }, [updateLocalState, saveToFormData]);

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
    if (!localState.kontaktStrasse.trim() || !localState.kontaktHausnummer.trim() || 
        !localState.kontaktPlz.trim() || !localState.kontaktOrt.trim()) {
      updateLocalState({ error: 'Bitte geben Sie Ihre vollständige Adresse an' });
      return;
    }
    
    // Datenschutz prüfen
    if (!localState.datenschutz) {
      updateLocalState({ error: 'Bitte stimmen Sie der Datenschutzerklärung zu' });
      return;
    }
    
    // Aktualisiere die Formular-Daten
    saveToFormData();
    
    updateLocalState({ isSubmitting: true, error: '' });
    
    try {
      // API-Anfrage zum Senden der E-Mail
      const response = await fetch('/api/contact/reinigung', {
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

  // Formatierungshelfer für Reinigungsart
  const getReinigungsartDisplay = () => {
    const artMap: Record<string, string> = {
      'unterhaltsreinigung': 'Unterhaltsreinigung',
      'grundreinigung': 'Grundreinigung',
      'glas_fassade': 'Glas- & Fassadenreinigung',
      'industrie': 'Industriereinigung',
      'reinraum': 'Reinraumreinigung',
      'aussenanlagen': 'Außenanlagenpflege',
      'sonderreinigung': 'Sonderreinigung',
      'verkehrsmittel': 'Verkehrsmittelreinigung',
      'hotel': 'Hotelreinigung',
      'veranstaltung': 'Veranstaltungsreinigung',
      'baureinigung': 'Baureinigung',
      'steinreinigung': 'Steinreinigung',
      'dachreinigung': 'Dachreinigung',
      'solaranlagen': 'Solaranlagenreinigung',
      'sonstiges': 'Sonstige Reinigung'
    };
    
    const art = formData.reinigungsart.hauptkategorie;
    const label = artMap[art] || art;
    
    if (art === 'sonstiges' && formData.reinigungsart.sonstigesText) {
      return `${label}: ${formData.reinigungsart.sonstigesText}`;
    }
    
    return label;
  };

  // Formatierungshelfer für Objekttyp
  const getObjektTypDisplay = () => {
    const typMap: Record<string, string> = {
      'buero': 'Büro',
      'wohnhaus': 'Wohnhaus',
      'industrie': 'Industriegebäude',
      'gewerbe': 'Gewerbegebäude',
      'hotel': 'Hotel',
      'krankenhaus': 'Krankenhaus',
      'schule': 'Bildungseinrichtung',
      'aussenbereich': 'Außenbereich',
      'sonstiges': 'Sonstiges'
    };
    
    const typ = formData.objektTyp.typ;
    return typMap[typ] || typ;
  };

  // Formatierungshelfer für Servicetyp
  const getServiceTypDisplay = () => {
    const serviceMap: Record<string, string> = {
      'standard': 'Standard-Service',
      'express': 'Express-Service',
      'sofort': 'Sofort-Service'
    };
    
    return serviceMap[formData.terminService.servicetyp] || formData.terminService.servicetyp;
  };

  // Formatierungshelfer für Wiederholung
  const getWiederholungDisplay = () => {
    const regelmassigkeitMap: Record<string, string> = {
      'einmalig': 'Einmalig',
      'taeglich': 'Täglich',
      'woechentlich': 'Wöchentlich',
      'monatlich': 'Monatlich',
      'individuell': 'Individuell'
    };
    
    const reg = formData.terminService.regelmassigkeit;
    if (reg === 'individuell' && formData.terminService.individuelleAngabe) {
      return `${regelmassigkeitMap[reg]}: ${formData.terminService.individuelleAngabe}`;
    }
    
    return regelmassigkeitMap[reg] || reg;
  };

  // Formatieren des Datums
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('de-DE');
    } catch {
      return dateString;
    }
  };

  // Prüfen, ob Zeitraum angezeigt werden soll (bei regelmäßigen Reinigungen)
  const showDateRange = () => {
    return formData.terminService.regelmassigkeit !== 'einmalig' && extendedFormData.terminService.endtermin;
  };

  // Dienstzeiten als formatierten String zurückgeben
  const getDienstzeitenDisplay = () => {
    if (!extendedFormData.terminService.dienste) return "Keine Angabe";
    
    const dienste = extendedFormData.terminService.dienste;
    const times = [];
    
    if (dienste.tagesdienst) times.push("Tagdienst");
    if (dienste.nachtdienst) times.push("Nachtdienst");
    if (dienste.wochenenddienst) times.push("Wochenenddienst");
    if (dienste.feiertagsdienst) times.push("Feiertagsdienst");
    
    return times.length > 0 ? times.join(", ") : "Keine Angabe";
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
              Überprüfen Sie Ihre Auswahl und vervollständigen Sie Ihre Anfrage.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Zusammenfassung linke Spalte */}
            <div className="space-y-4">
              {/* Ausgewählte Dienste */}
              <motion.div
                className="bg-white border-b border-gray-100 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3">Ausgewählte Reinigungsleistung</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Reinigungsart:</p>
                    <p className="text-xs font-medium text-[#009FD8]">{getReinigungsartDisplay()}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Objekttyp:</p>
                    <p className="text-xs font-medium">{getObjektTypDisplay()}</p>
                  </div>
                  
                  {formData.objektTyp.sonstigesText && (
                    <div>
                      <p className="text-xs text-gray-500">Objektdetails:</p>
                      <p className="text-xs">{formData.objektTyp.sonstigesText}</p>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Flächen Informationen */}
              <motion.div
                className="bg-white border-b border-gray-100 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3">Flächeninformationen</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Zu reinigende Fläche:</p>
                    <p className="text-xs font-medium">{formData.flaecheInfo.flaeche} m²</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Anzahl Reinigungskräfte:</p>
                    <p className="text-xs font-medium">{formData.flaecheInfo.reinigungskraefte || 1} Personen</p>
                  </div>
                  
                  {formData.flaecheInfo.raumanzahl && (
                    <div>
                      <p className="text-xs text-gray-500">Raumanzahl:</p>
                      <p className="text-xs font-medium">{formData.flaecheInfo.raumanzahl}</p>
                    </div>
                  )}
                  
                  {formData.flaecheInfo.etagenanzahl && (
                    <div>
                      <p className="text-xs text-gray-500">Etagen:</p>
                      <p className="text-xs font-medium">{formData.flaecheInfo.etagenanzahl}</p>
                    </div>
                  )}
                  
                  {formData.flaecheInfo.fensteranzahl && (
                    <div>
                      <p className="text-xs text-gray-500">Fensteranzahl:</p>
                      <p className="text-xs font-medium">{formData.flaecheInfo.fensteranzahl}</p>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Zeitliche Details */}
              <motion.div
                className="bg-white border-b border-gray-100 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3">Zeitliche Details</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Service-Typ:</p>
                    <p className="text-xs font-medium">{getServiceTypDisplay()}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Regelmäßigkeit:</p>
                    <p className="text-xs font-medium">{getWiederholungDisplay()}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">{showDateRange() ? 'Einsatzzeitraum:' : 'Wunschtermin:'}</p>
                    <p className="text-xs font-medium">
                      {formatDate(formData.terminService.wunschtermin)}
                      {showDateRange() && extendedFormData.terminService.endtermin && 
                        ` bis ${formatDate(extendedFormData.terminService.endtermin)}`}
                      {formData.terminService.wunschzeit && ` um ${formData.terminService.wunschzeit} Uhr`}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Dienstzeiten:</p>
                    <p className="text-xs font-medium">{getDienstzeitenDisplay()}</p>
                  </div>
                </div>
              </motion.div>

              {/* Adresse des zu reinigenden Objekts */}
              {extendedFormData.terminService.objekt_adresse && (
                <motion.div
                  className="bg-white border-b border-gray-100 py-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.2 }}
                >
                  <h3 className="text-xs font-medium text-gray-800 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-[#009FD8]" />
                    Zu reinigendes Objekt
                  </h3>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Adresse:</p>
                      <p className="text-xs font-medium">
                        {extendedFormData.terminService.objekt_adresse.strasse} {extendedFormData.terminService.objekt_adresse.hausnummer}
                      </p>
                      <p className="text-xs font-medium">
                        {extendedFormData.terminService.objekt_adresse.plz} {extendedFormData.terminService.objekt_adresse.ort}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Kontaktformular rechte Spalte */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Anrede als Select */}
                <div>
                  <Label className="block text-xs font-medium text-gray-700 mb-2">
                    Anrede
                  </Label>
                  <Select 
                    value={localState.anrede} 
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-full bg-white focus:ring-[#009FD8]/30 border-gray-200 text-sm">
                      <SelectValue placeholder="Bitte wählen" className="text-gray-600" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="herr" className="text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-700">Herr</SelectItem>
                      <SelectItem value="frau" className="text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-700">Frau</SelectItem>
                      <SelectItem value="keine" className="text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-700">Keine Angabe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Vor- und Nachname */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="vorname" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                      <User className="h-4 w-4 mr-2 text-[#009FD8]" /> Vorname*
                    </Label>
                    <Input
                      id="vorname"
                      name="vorname"
                      type="text"
                      required
                      value={localState.vorname}
                      onChange={handleTextChange}
                      className="w-full bg-white border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nachname" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                      <User className="h-4 w-4 mr-2 text-[#009FD8]" /> Nachname*
                    </Label>
                    <Input
                      id="nachname"
                      name="nachname"
                      type="text"
                      required
                      value={localState.nachname}
                      onChange={handleTextChange}
                      className="w-full bg-white border-gray-200 text-sm"
                    />
                  </div>
                </div>
                
                {/* Kontakt */}
                <div>
                  <Label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-[#009FD8]" /> E-Mail*
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={localState.email}
                    onChange={handleTextChange}
                    className="w-full bg-white border-gray-200 text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefon" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-[#009FD8]" /> Telefon*
                  </Label>
                  <Input
                    id="telefon"
                    name="telefon"
                    type="tel"
                    required
                    value={localState.telefon}
                    onChange={handleTextChange}
                    className="w-full bg-white border-gray-200 text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="firma" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-[#009FD8]" /> Ihr Unternehmen (optional)
                  </Label>
                  <Input
                    id="firma"
                    name="firma"
                    type="text"
                    value={localState.firma}
                    onChange={handleTextChange}
                    className="w-full bg-white border-gray-200 text-sm"
                  />
                </div>

                {/* Adresse des Anfragenden */}
                <div>
                  <Label className="block text-xs font-medium text-gray-700 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-[#009FD8]" /> Ihre Adresse*
                  </Label>
                  <div className="grid grid-cols-3 gap-3 mb-2">
                    <div className="col-span-2">
                      <Input
                        id="kontaktStrasse"
                        name="kontaktStrasse"
                        type="text"
                        placeholder="Straße"
                        value={localState.kontaktStrasse}
                        onChange={handleTextChange}
                        className="w-full bg-white border-gray-200 text-sm"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        id="kontaktHausnummer"
                        name="kontaktHausnummer"
                        type="text"
                        placeholder="Nr."
                        value={localState.kontaktHausnummer}
                        onChange={handleTextChange}
                        className="w-full bg-white border-gray-200 text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Input
                        id="kontaktPlz"
                        name="kontaktPlz"
                        type="text"
                        placeholder="PLZ"
                        value={localState.kontaktPlz}
                        onChange={handleTextChange}
                        className="w-full bg-white border-gray-200 text-sm"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        id="kontaktOrt"
                        name="kontaktOrt"
                        type="text"
                        placeholder="Ort"
                        value={localState.kontaktOrt}
                        onChange={handleTextChange}
                        className="w-full bg-white border-gray-200 text-sm"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="anmerkungen" className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                    <PenLine className="h-4 w-4 mr-2 text-[#009FD8]" /> Nachricht (optional)
                  </Label>
                  <Textarea
                    id="anmerkungen"
                    name="anmerkungen"
                    rows={3}
                    value={localState.anmerkungen}
                    onChange={handleTextChange}
                    className="w-full bg-white border-gray-200 text-sm"
                  />
                </div>
                
                {/* Datenschutz-Checkbox */}
                <div className="flex items-start space-x-3 mt-4">
                  <div className="flex items-center h-7">
                    <input
                      id="datenschutz"
                      name="datenschutz"
                      type="checkbox"
                      checked={localState.datenschutz}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-[#009FD8] border-gray-300 rounded focus:ring-[#009FD8]"
                      required
                    />
                  </div>
                  <div className="ml-2">
                    <label htmlFor="datenschutz" className="text-xs text-gray-700">
                      Ich stimme der Verarbeitung meiner Daten gemäß der <Link href="/privacy" className="text-[#009FD8] underline">Datenschutzerklärung</Link> zu*
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
                
                <div className="flex justify-center space-x-4 pt-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      saveToFormData();
                      goToPreviousStep();
                    }}
                    className="py-2.5 px-6 rounded-full text-xs font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200"
                  >
                    Zurück
                  </button>
                  
                  {localState.isSubmitting ? (
                    <button
                      type="button"
                      disabled
                      className="py-2.5 px-6 rounded-full text-xs font-medium bg-[#009FD8]/70 text-white cursor-not-allowed flex items-center justify-center"
                    >
                      <Loader2 className="animate-spin mr-2 h-4 w-4" />
                      Wird gesendet...
                    </button>
                  ) : (
                    <button 
                      type="submit"
                      className="py-2.5 px-6 rounded-full text-xs font-medium bg-[#009FD8] text-white hover:bg-[#007CAB] transition-all duration-200"
                    >
                      Jetzt anfragen
                    </button>
                  )}
                </div>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Ihre Daten werden gemäß unserer Datenschutzerklärung verarbeitet.
                </p>
              </form>
            </div>
          </div>
        </>
      ) : (
        // Erfolgsmeldung nach Absenden - mit verbesserter Zentrierung
        <motion.div 
          className="text-center py-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          
          <h2 className="text-xl font-medium text-gray-800 mb-3">Anfrage erfolgreich gesendet!</h2>
          
          <p className="text-sm text-gray-600 mb-4 max-w-xl mx-auto">
            Vielen Dank für Ihre Reinigungsanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.
          </p>
          
          <div className="bg-[#E6F4FA] rounded-lg py-4 px-5 mb-6 max-w-xl mx-auto">
            <div className="flex items-center justify-center mb-2">
              <Sparkle className="h-4 w-4 mr-2 text-[#009FD8]" />
              <h3 className="text-sm font-medium text-[#009FD8]">Über unser Reinigungsteam</h3>
            </div>
            <p className="text-xs text-gray-700 mb-3">
              Unser professionelles Team wird Ihre Anforderungen detailliert analysieren und ein individuelles Reinigungskonzept erstellen. Für dringende Anliegen erreichen Sie uns telefonisch.
            </p>
            <div className="flex items-center justify-center gap-2">
              <PhoneCall className="h-4 w-4 text-[#009FD8]" />
              <span className="text-sm font-medium">0231 15044352</span>
            </div>
          </div>
          
          <div className="flex justify-center gap-3 mt-6">
            <Link
              href="/"
              className="py-2.5 px-6 rounded-full text-xs font-medium bg-[#009FD8] text-white hover:bg-[#007CAB] transition-all duration-200"
            >
              Zurück zur Startseite
            </Link>
            
            <Link
              href="/reinigung"
              className="py-2.5 px-6 rounded-full text-xs font-medium border border-gray-200 text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              Weitere Reinigungsleistungen
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
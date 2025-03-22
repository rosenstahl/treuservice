
"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SecurityWizard'
import { CheckCircle, PhoneCall, Loader2, ArrowUpRight, Shield, User, Mail, Phone, Building2, MapPin, PenLine } from 'lucide-react'
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
import ContactButton from '@/components/ui/contact-button'
import Link from 'next/link'

type ZusammenfassungStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
}

// Mapping für benutzerfreundliche Anzeige
const securityTypesLabels: Record<string, string> = {
  objektschutz: "Objektschutz",
  werkschutz: "Werkschutz",
  baustellenbewachung: "Baustellenbewachung",
  asylunterkuenfte: "Sicherheit für Asylunterkünfte",
  city_streife: "City-Streife",
  revierstreifendienst: "Revier- & Streifendienst",
  doorman: "Doorman",
  ladendetektiv: "Laden- & Kaufhausdetektiv",
  empfangsdienst: "Empfangs- & Pfortendienst",
  nightaudit: "Night-Audit",
  eventschutz: "Event- & Veranstaltungsschutz",
  standwache: "Standwache / Messeschutz",
  ordnerdienst: "Ordnerdienst",
  parkraummanagement: "Parkraummanagement",
  chauffeurservice: "Fahr- & Chauffeurservice",
  sonstiges: "Sonstige Sicherheitsdienste"
}

const objektTypLabels: Record<string, string> = {
  gewerbe: "Gewerbeobjekt",
  buero: "Bürogebäude",
  industrie: "Industrieanlage",
  baustelle: "Baustelle",
  veranstaltung: "Veranstaltungsort",
  wohnanlage: "Wohnanlage",
  privat: "Privatobjekt",
  handelsobjekt: "Handelsobjekt",
  hotel: "Hotel/Gaststätte",
  institution: "Behörde/Institution",
  sonstiges: "Anderes Objekt"
}

const dauerTypLabels: Record<string, string> = {
  einmalig: "Einmalig",
  kurzzeitig: "Kurzzeitig",
  langfristig: "Langfristig",
  unbefristet: "Unbefristet"
}

const wiederholungLabels: Record<string, string> = {
  keine: "Keine Wiederholung",
  taeglich: "Täglich",
  woechentlich: "Wöchentlich",
  monatlich: "Monatlich"
}

// Formatiert das Datum in "DD.MM.YYYY"-Format
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}.${month}.${year}`
}

// Typ für den lokalen Zustand
type LocalStateType = {
  anrede: FormData['kontakt']['anrede'];
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

export const ZusammenfassungStep: React.FC<ZusammenfassungStepProps> = ({ 
  formData,
  updateFormData,
  goToPreviousStep
}) => {
  // Zustandsvariablen mit lokalem State-Management
  const [localState, setLocalState] = useState<LocalStateType>({
    anrede: formData.kontakt.anrede || '',
    vorname: formData.kontakt.vorname || '',
    nachname: formData.kontakt.nachname || '',
    email: formData.kontakt.email || '',
    telefon: formData.kontakt.telefon || '',
    firma: formData.kontakt.firma || '',
    kontaktStrasse: formData.kontakt.kontaktStrasse || '',
    kontaktHausnummer: formData.kontakt.kontaktHausnummer || '',
    kontaktPlz: formData.kontakt.kontaktPlz || '',
    kontaktOrt: formData.kontakt.kontaktOrt || '',
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
        kontaktStrasse: localState.kontaktStrasse,
        kontaktHausnummer: localState.kontaktHausnummer,
        kontaktPlz: localState.kontaktPlz,
        kontaktOrt: localState.kontaktOrt,
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

  // Simuliert das Versenden des Formulars
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // E-Mail-Validierung mit regulärem Ausdruck (jetzt innerhalb des Callbacks)
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
    
    // API-Anfrage zum Senden der E-Mail
    fetch('/api/contact/security', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        kontakt: {
          ...formData.kontakt,
          anrede: localState.anrede,
          vorname: localState.vorname,
          nachname: localState.nachname,
          email: localState.email,
          telefon: localState.telefon,
          firma: localState.firma,
          kontaktStrasse: localState.kontaktStrasse,
          kontaktHausnummer: localState.kontaktHausnummer,
          kontaktPlz: localState.kontaktPlz,
          kontaktOrt: localState.kontaktOrt,
          anmerkungen: localState.anmerkungen
        },
        datenschutz: localState.datenschutz
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Netzwerkfehler beim Senden der Anfrage');
      }
      return response.json();
    })
    .then(() => {
      updateLocalState({ isSubmitting: false, isSubmitted: true });
    })
    .catch(error => {
      console.error('Fehler beim Senden der Anfrage:', error);
      updateLocalState({ 
        isSubmitting: false, 
        error: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.' 
      });
    });
    
  }, [localState, updateLocalState, saveToFormData, formData]);

  // Anzeigenamen für die Formularwerte
  const getSecurityTypeDisplay = () => {
    const type = formData.securityType.hauptkategorie;
    const label = securityTypesLabels[type] || type;
    
    if (type === 'sonstiges' && formData.securityType.sonstigesText) {
      return `${label}: ${formData.securityType.sonstigesText}`;
    }
    
    return label;
  }

  const getObjektTypDisplay = () => {
    const typ = formData.objektTyp.typ;
    const label = objektTypLabels[typ] || typ;
    return label;
  }

  const qualifikationenList = () => {
    const qualifikationen = formData.personalUmfang.qualifikationen;
    const list = [];
    
    if (qualifikationen.sg34a) list.push("Sachkunde § 34a GewO");
    if (qualifikationen.ersteHilfe) list.push("Erweiterte Erste-Hilfe");
    if (qualifikationen.brandschutz) list.push("Brandschutzhelfer");
    if (qualifikationen.deeskalation) list.push("Deeskalationstraining");
    if (qualifikationen.evakuierung) list.push("Evakuierungshelfer");
    if (qualifikationen.fremdsprachen) list.push("Fremdsprachenkenntnisse");
    
    if (qualifikationen.sonstigeQualifikationen) {
      list.push(qualifikationen.sonstigeQualifikationen);
    }
    
    return list.length > 0 ? list.join(", ") : "Keine speziellen Qualifikationen";
  }

  const diensteTimes = () => {
    const dienste = formData.zeitlicheInfos.dienste;
    const times = [];
    
    if (dienste.tagesdienst) times.push("Tagdienst");
    if (dienste.nachtdienst) times.push("Nachtdienst");
    if (dienste.wochenenddienst) times.push("Wochenenddienst");
    if (dienste.feiertagsdienst) times.push("Feiertagsdienst");
    
    return times.length > 0 ? times.join(", ") : "Keine Angabe";
  }

  // Wiederholungsart anzeigen
  const getWiederholungDisplay = () => {
    const wiederholung = formData.zeitlicheInfos.wiederholung;
    return wiederholung ? wiederholungLabels[wiederholung] : ''
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!localState.isSubmitted ? (
        <>
          <div className="text-center mb-6">
            <motion.h2 
              className="text-2xl font-medium text-gray-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              Zusammenfassung
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Überprüfen Sie Ihre Auswahl und vervollständigen Sie Ihre Anfrage.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Zusammenfassung linke Spalte */}
            <div className="space-y-4">
              {/* Ausgewählte Dienste */}
              <motion.div
                className="bg-white p-4 rounded-md border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3">Ausgewählte Dienste</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Sicherheitsdienstleistung:</p>
                    <p className="text-sm font-medium text-accent">{getSecurityTypeDisplay()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Objekttyp:</p>
                    <p className="text-sm font-medium">{getObjektTypDisplay()}</p>
                  </div>
                  
                  {formData.objektTyp.customDetails && (
                    <div>
                      <p className="text-sm text-gray-500">Objektdetails:</p>
                      <p className="text-sm">{formData.objektTyp.customDetails}</p>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Personal Informationen */}
              <motion.div
                className="bg-white p-4 rounded-md border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3">Personal</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Anzahl Sicherheitskräfte:</p>
                    <p className="text-sm font-medium">{formData.personalUmfang.anzahlMitarbeiter} Personen</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Bewaffnung:</p>
                    <p className="text-sm font-medium">{formData.personalUmfang.bewaffnung ? "Ja" : "Nein"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Qualifikationen:</p>
                    <p className="text-sm font-medium">{qualifikationenList()}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Zeitliche Details */}
              <motion.div
                className="bg-white p-4 rounded-md border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3">Zeitliche Details</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Einsatzdauer:</p>
                    <p className="text-sm font-medium">{formData.zeitlicheInfos.dauerTyp ? dauerTypLabels[formData.zeitlicheInfos.dauerTyp] : ''}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Wiederholung:</p>
                    <p className="text-sm font-medium">{getWiederholungDisplay()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Zeitraum:</p>
                    <p className="text-sm font-medium">
                      {formatDate(formData.zeitlicheInfos.beginnDatum)}
                      {formData.zeitlicheInfos.endeDatum && ` bis ${formatDate(formData.zeitlicheInfos.endeDatum)}`}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Dienstzeiten:</p>
                    <p className="text-sm font-medium">{diensteTimes()}</p>
                  </div>
                </div>
              </motion.div>

              {/* Adresse */}
              <motion.div
                className="bg-white p-4 rounded-md border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3">Einsatzort</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Adresse:</p>
                    <p className="text-sm font-medium">
                      {formData.kontakt.adresseStrasse} {formData.kontakt.adresseHausnummer}
                    </p>
                    <p className="text-sm font-medium">
                      {formData.kontakt.adressePlz} {formData.kontakt.adresseOrt}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Kontaktformular rechte Spalte */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Anrede als Select */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Anrede
                  </Label>
                  <Select 
                    value={localState.anrede} 
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger className="w-full bg-white focus:ring-gray-300">
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
                    <Label htmlFor="vorname" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <User className="h-4 w-4 mr-2 text-accent" /> Vorname*
                    </Label>
                    <Input
                      id="vorname"
                      name="vorname"
                      type="text"
                      required
                      value={localState.vorname}
                      onChange={handleTextChange}
                      className="w-full bg-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nachname" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <User className="h-4 w-4 mr-2 text-accent" /> Nachname*
                    </Label>
                    <Input
                      id="nachname"
                      name="nachname"
                      type="text"
                      required
                      value={localState.nachname}
                      onChange={handleTextChange}
                      className="w-full bg-white"
                    />
                  </div>
                </div>
                
                {/* Kontakt */}
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-accent" /> E-Mail*
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={localState.email}
                    onChange={handleTextChange}
                    className="w-full bg-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-accent" /> Telefon*
                  </Label>
                  <Input
                    id="telefon"
                    name="telefon"
                    type="tel"
                    required
                    value={localState.telefon}
                    onChange={handleTextChange}
                    className="w-full bg-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="firma" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-accent" /> Ihr Unternehmen (optional)
                  </Label>
                  <Input
                    id="firma"
                    name="firma"
                    type="text"
                    value={localState.firma}
                    onChange={handleTextChange}
                    className="w-full bg-white"
                  />
                </div>

                {/* Adresse des Anfragenden */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-accent" /> Ihre Adresse*
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
                        className="w-full bg-white"
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
                        className="w-full bg-white"
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
                        className="w-full bg-white"
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
                        className="w-full bg-white"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="anmerkungen" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <PenLine className="h-4 w-4 mr-2 text-accent" /> Nachricht (optional)
                  </Label>
                  <Textarea
                    id="anmerkungen"
                    name="anmerkungen"
                    rows={3}
                    value={localState.anmerkungen}
                    onChange={handleTextChange}
                    className="w-full bg-white"
                  />
                </div>
                
                {/* Datenschutz-Checkbox */}
                <div className="flex items-start space-x-3 mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="datenschutz"
                      name="datenschutz"
                      type="checkbox"
                      checked={localState.datenschutz}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-accent border-gray-300 rounded focus:ring-accent"
                      required
                    />
                  </div>
                  <div className="ml-2">
                    <label htmlFor="datenschutz" className="text-sm text-gray-700">
                      Ich stimme der Verarbeitung meiner Daten gemäß der <Link href="/privacy" className="text-accent underline">Datenschutzerklärung</Link> zu*
                    </label>
                  </div>
                </div>
                
                {localState.error && (
                  <motion.p 
                    className="text-red-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {localState.error}
                  </motion.p>
                )}
                
                <div className="flex justify-between space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      saveToFormData();
                      goToPreviousStep();
                    }}
                    className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm transform hover:scale-105"
                  >
                    Zurück
                  </button>
                  
                  {localState.isSubmitting ? (
                    <button
                      type="button"
                      disabled
                      className="flex-1 py-2 px-6 bg-accent text-white font-medium rounded opacity-70 cursor-not-allowed flex items-center justify-center"
                    >
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Wird gesendet...
                    </button>
                  ) : (
                    <div className="flex-1">
                      <button type="submit" className="hidden" />
                      <div onClick={handleSubmit} className="rounded overflow-hidden">
                        <ContactButton text="Jetzt anfragen" />
                      </div>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-gray-500 mt-4">
                  Ihre Daten werden gemäß unserer Datenschutzerklärung verarbeitet. Durch das Absenden erklären Sie sich mit der Verarbeitung einverstanden.
                </p>
              </form>
            </div>
          </div>
        </>
      ) : (
        // Erfolgsmeldung nach Absenden
        <motion.div 
          className="text-center py-12 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Anfrage erfolgreich gesendet!</h2>
          
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Vielen Dank für Ihre Sicherheitsanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.
          </p>
          
          <div className="bg-accent/10 rounded-lg p-6 mb-8 max-w-xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              <Shield className="h-5 w-5 mr-2 text-accent" />
              <h3 className="text-lg font-medium text-accent">Über unser Beratungsteam</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Unser Experten-Team wird Ihre Anforderungen detailliert analysieren und ein individuelles Sicherheitskonzept erstellen. Für dringende Anliegen erreichen Sie uns telefonisch.
            </p>
            <div className="flex items-center justify-center gap-3">
              <PhoneCall className="h-5 w-5 text-accent" />
              <span className="font-medium">+49 123 456 789</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <motion.a
              href="/"
              className="py-3 px-8 bg-accent text-white rounded font-medium transition-all duration-200 hover:bg-accent-dark hover:shadow-md flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Zurück zur Startseite
            </motion.a>
            
            <motion.a
              href="/security"
              className="py-3 px-8 border border-gray-300 text-gray-700 rounded font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Weitere Sicherheitsleistungen
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
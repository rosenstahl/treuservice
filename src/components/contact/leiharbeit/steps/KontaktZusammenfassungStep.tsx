"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { 
  CheckCircle, 
  Loader2, 
  PhoneCall, 
  Briefcase, 
  Building2, 
  ArrowUpRight,
  User,
  Mail,
  Phone,
  MapPin,
  PenLine
} from 'lucide-react'
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

type KontaktZusammenfassungStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
}

// Mapping für benutzerfreundliche Anzeige
const branchenLabels: Record<string, string> = {
  produktion: "Produktion",
  logistik: "Logistik",
  handwerk: "Handwerk",
  buero: "Büro/Verwaltung",
  it: "IT",
  gastronomie: "Gastronomie",
  handel: "Handel",
  medizin: "Medizin & Pflege",
  sonstiges: "Sonstiges"
}

const qualifikationsniveauLabels: Record<string, string> = {
  ungelernt: "Ungelernt",
  angelernt: "Angelernt",
  fachkraft: "Fachkraft",
  spezialist: "Spezialist",
  fuehrungskraft: "Führungskraft"
}

const einsatzdauerLabels: Record<string, string> = {
  ein_tag: "Ein Tag",
  mehrere_tage: "2-5 Tage",
  kurzfristig: "Kurzfristig (1-4 Wochen)",
  mittelfristig: "Mittelfristig (1-6 Monate)",
  langfristig: "Langfristig (> 6 Monate)"
}

const verfuegbarkeitLabels: Record<string, string> = {
  sofort: "Sofort verfügbar",
  ein_monat: "In 1 Monat",
  drei_monate: "In 2-3 Monaten",
  spaeter: "Später"
}

const arbeitszeitLabels: Record<string, string> = {
  vollzeit: "Vollzeit",
  teilzeit: "Teilzeit",
  minijob: "Minijob",
  flexibel: "Flexibel"
}

const schichtbereitschaftLabels: Record<string, string> = {
  nur_tag: "Nur Tagschicht",
  auch_nacht: "Auch Nachtschicht",
  auch_wochenende: "Auch Wochenende",
  voll_flexibel: "Voll flexibel"
}

const sprachniveauLabels: Record<string, string> = {
  keine: "Keine",
  grundkenntnisse: "Grundkenntnisse",
  gut: "Gut",
  fliessend: "Fließend",
  muttersprache: "Muttersprache"
}

// Formatiere das Datum
const formatDatum = (datum: string): string => {
  if (!datum) return '';
  const [jahr, monat, tag] = datum.split('-');
  return `${tag}.${monat}.${jahr}`;
};

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

export const KontaktZusammenfassungStep: React.FC<KontaktZusammenfassungStepProps> = ({ 
  formData, 
  updateFormData,
  goToPreviousStep
}) => {
  const isUnternehmen = formData.anfrageTyp === 'unternehmen';
  const isBewerber = formData.anfrageTyp === 'bewerber';

  // Zustandsvariablen mit lokalem State-Management
  const [localState, setLocalState] = useState<LocalStateType>({
    anrede: formData.kontakt.anrede || '',
    vorname: formData.kontakt.vorname || '',
    nachname: formData.kontakt.nachname || '',
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
    updateFormData({
      kontakt: {
        ...formData.kontakt,
        anrede: localState.anrede,
        vorname: localState.vorname,
        nachname: localState.nachname,
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
    updateLocalState({ anrede: value as FormData['kontakt']['anrede'] });
    setTimeout(saveToFormData, 0);
  }, [updateLocalState, saveToFormData]);

  // Handler für Checkbox-Änderungen
  const handleCheckboxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    updateLocalState({ [id as keyof LocalStateType]: checked } as Partial<LocalStateType>);
    setTimeout(saveToFormData, 0);
  }, [updateLocalState, saveToFormData]);

  // Simuliert das Absenden des Formulars
  const handleSubmit = useCallback((e: React.FormEvent) => {
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
    
    if (isUnternehmen && !localState.firma.trim()) {
      updateLocalState({ error: 'Bitte geben Sie Ihren Firmennamen an' });
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
      updateLocalState({ error: 'Bitte stimmen Sie den Datenschutzbestimmungen zu' });
      return;
    }
    
    // Aktualisiere die Formular-Daten
    saveToFormData();
    
    updateLocalState({ isSubmitting: true, error: '' });
    
    // API-Anfrage zum Senden der E-Mail
    fetch('/api/contact/leiharbeit', {
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
          adresseStrasse: localState.kontaktStrasse,
          adresseHausnummer: localState.kontaktHausnummer,
          adressePlz: localState.kontaktPlz,
          adresseOrt: localState.kontaktOrt,
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
  }, [localState, updateLocalState, saveToFormData, isUnternehmen, formData]);

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
              Überprüfen Sie Ihre Angaben und vervollständigen Sie Ihre Anfrage.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Zusammenfassung linke Spalte */}
            <div className="space-y-4">
              {/* Anfragetyp */}
              <motion.div
                className="bg-white p-4 rounded-md border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3">Anfragetyp</h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Art der Anfrage:</p>
                    <p className="text-sm font-medium text-accent">
                      {isUnternehmen ? 'Unternehmen sucht Mitarbeiter' : 'Bewerber sucht Arbeit'}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Personalbedarf oder Bewerberprofil */}
              <motion.div
                className="bg-white p-4 rounded-md border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {isUnternehmen ? 'Personalbedarf' : 'Bewerberprofil'}
                </h3>
                
                <div className="space-y-2">
                  {isUnternehmen && formData.unternehmenBedarf && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Branche:</p>
                        <p className="text-sm font-medium">
                          {formData.unternehmenBedarf.branche === 'sonstiges' 
                            ? formData.unternehmenBedarf.brancheSonstiges 
                            : branchenLabels[formData.unternehmenBedarf.branche] || formData.unternehmenBedarf.branche}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Benötigte Mitarbeiter:</p>
                        <p className="text-sm font-medium">{formData.unternehmenBedarf.anzahlMitarbeiter}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Qualifikationsniveau:</p>
                        <p className="text-sm font-medium">
                          {qualifikationsniveauLabels[formData.unternehmenBedarf.qualifikationsniveau] || formData.unternehmenBedarf.qualifikationsniveau}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Einsatzdauer:</p>
                        <p className="text-sm font-medium">
                          {einsatzdauerLabels[formData.unternehmenBedarf.einsatzdauer] || formData.unternehmenBedarf.einsatzdauer}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Einsatzbeginn:</p>
                        <p className="text-sm font-medium">{formatDatum(formData.unternehmenBedarf.einsatzbeginn)}</p>
                      </div>
                      
                      {formData.expressAnfrage && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <p className="text-sm font-medium text-accent flex items-center">
                            <span className="mr-2">Express-Anfrage</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {isBewerber && formData.bewerberProfil && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Fachbereich:</p>
                        <p className="text-sm font-medium">
                          {formData.bewerberProfil.fachbereich === 'sonstiges' 
                            ? formData.bewerberProfil.fachbereichSonstiges 
                            : branchenLabels[formData.bewerberProfil.fachbereich] || formData.bewerberProfil.fachbereich}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Qualifikationsniveau:</p>
                        <p className="text-sm font-medium">
                          {qualifikationsniveauLabels[formData.bewerberProfil.qualifikation] || formData.bewerberProfil.qualifikation}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Berufserfahrung:</p>
                        <p className="text-sm font-medium">{formData.bewerberProfil.berufserfahrungJahre} Jahre</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Verfügbarkeit:</p>
                        <p className="text-sm font-medium">
                          {verfuegbarkeitLabels[formData.bewerberProfil.verfuegbarkeit] || formData.bewerberProfil.verfuegbarkeit}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Arbeitszeit:</p>
                        <p className="text-sm font-medium">
                          {arbeitszeitLabels[formData.bewerberProfil.arbeitszeit] || formData.bewerberProfil.arbeitszeit}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-500">Einsatzregion:</p>
                        <p className="text-sm font-medium">{formData.bewerberProfil.einsatzregion}</p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
              
              {/* Anforderungen */}
              <motion.div
                className="bg-white p-4 rounded-md border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {isUnternehmen ? 'Anforderungen' : 'Kenntnisse & Fähigkeiten'}
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Spezielle Kenntnisse:</p>
                    <p className="text-sm font-medium">{formData.anforderungen.spezielleKenntnisse || "Keine Angabe"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Schichtbereitschaft:</p>
                    <p className="text-sm font-medium">
                      {schichtbereitschaftLabels[formData.anforderungen.schichtbereitschaft] || "Keine Angabe"}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Führerschein:</p>
                    <p className="text-sm font-medium">{formData.anforderungen.fuehrerschein ? 'Ja' : 'Nein'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Sprachkenntnisse (Deutsch):</p>
                    <p className="text-sm font-medium">
                      {sprachniveauLabels[formData.anforderungen.sprachkenntnisse.deutsch] || "Keine Angabe"}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Sprachkenntnisse (Englisch):</p>
                    <p className="text-sm font-medium">
                      {sprachniveauLabels[formData.anforderungen.sprachkenntnisse.englisch] || "Keine Angabe"}
                    </p>
                  </div>
                  
                  {formData.anforderungen.sprachkenntnisse.weitere && (
                    <div>
                      <p className="text-sm text-gray-500">Weitere Sprachen:</p>
                      <p className="text-sm font-medium">{formData.anforderungen.sprachkenntnisse.weitere}</p>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Konditionen */}
              <motion.div
                className="bg-white p-4 rounded-md border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3">
                  {isUnternehmen ? 'Konditionen' : 'Erwartungen'}
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Arbeitszeiten:</p>
                    <p className="text-sm font-medium">{formData.konditionen.arbeitszeiten || "Keine Angabe"}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Überstundenbereitschaft:</p>
                    <p className="text-sm font-medium">{formData.konditionen.ueberstundenBereitschaft ? 'Ja' : 'Nein'}</p>
                  </div>
                  
                  {isBewerber && formData.konditionen.gehaltsvorstellung && (
                    <div>
                      <p className="text-sm text-gray-500">Gehaltsvorstellung:</p>
                      <p className="text-sm font-medium">{formData.konditionen.gehaltsvorstellung}</p>
                    </div>
                  )}
                  
                  {isBewerber && (
                    <div>
                      <p className="text-sm text-gray-500">Unterkunftsbedarf:</p>
                      <p className="text-sm font-medium">{formData.konditionen.unterkunftBedarf ? 'Ja' : 'Nein'}</p>
                    </div>
                  )}
                  
                  {isUnternehmen && (
                    <div>
                      <p className="text-sm text-gray-500">Stundensatz:</p>
                      <p className="text-sm font-medium">{formData.konditionen.stundensatz || "Keine Angabe"}</p>
                    </div>
                  )}
                  
                  {isUnternehmen && (
                    <div>
                      <p className="text-sm text-gray-500">Unterkunftsmöglichkeiten:</p>
                      <p className="text-sm font-medium">{formData.konditionen.unterkunftVorhanden ? 'Ja' : 'Nein'}</p>
                    </div>
                  )}
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
                
                {/* Firma (nur für Unternehmen) */}
                {isUnternehmen && (
                  <div>
                    <Label htmlFor="firma" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-accent" /> Firma*
                    </Label>
                    <Input
                      id="firma"
                      name="firma"
                      type="text"
                      required={isUnternehmen}
                      value={localState.firma}
                      onChange={handleTextChange}
                      className="w-full bg-white"
                    />
                  </div>
                )}
                
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
                    onClick={goToPreviousStep}
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
                        <ContactButton text={isUnternehmen ? "Personal anfragen" : "Bewerbung absenden"} />
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
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {isUnternehmen 
              ? 'Ihre Personalanfrage wurde erfolgreich gesendet!' 
              : 'Ihre Bewerbung wurde erfolgreich gesendet!'}
          </h2>
          
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            {isUnternehmen 
              ? 'Vielen Dank für Ihre Anfrage. Unser Team wird sich innerhalb der nächsten 24 Stunden mit Ihnen in Verbindung setzen, um Ihren Personalbedarf zu besprechen.' 
              : 'Vielen Dank für Ihre Bewerbung. Unser Team wird Ihre Unterlagen sorgfältig prüfen und sich in Kürze mit Ihnen in Verbindung setzen.'}
          </p>
          
          <div className="bg-accent/10 rounded-lg p-6 mb-8 max-w-xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              {isUnternehmen 
                ? <Building2 className="h-5 w-5 mr-2 text-accent" />
                : <Briefcase className="h-5 w-5 mr-2 text-accent" />
              }
              <h3 className="text-lg font-medium text-accent">
                {isUnternehmen ? 'Über unseren Personalvermittlungsservice' : 'Über unser Bewerbermanagement'}
              </h3>
            </div>
            <p className="text-gray-700 mb-4">
              {isUnternehmen 
                ? 'Unser erfahrenes Team wird Ihre Anforderungen analysieren und passende Kandidaten für Ihre Stelle vorschlagen. Für dringende Anliegen erreichen Sie uns telefonisch.' 
                : 'Unser Bewerbermanagement-Team wird Ihr Profil und Ihre Fähigkeiten analysieren, um Ihnen passende Stellen vorzuschlagen. Für dringende Anliegen erreichen Sie uns telefonisch.'}
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
              href="/leiharbeit"
              className="py-3 px-8 border border-gray-300 text-gray-700 rounded font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Mehr über Leiharbeit
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
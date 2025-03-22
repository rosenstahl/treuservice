
"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { CheckCircle, PhoneCall, Loader2, ArrowUpRight, Flame, Droplet, Bug, Calendar, Building, MapPin, User, Mail, Phone, PenLine } from 'lucide-react'
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
  isLastStep?: boolean;
}

// Lokaler State Typ
type LocalStateType = {
  anrede: FormData['kontakt']['anrede'];
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  firma: string;
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
  // Zustandsvariablen mit lokalem State-Management
  const [localState, setLocalState] = useState<LocalStateType>({
    anrede: formData.kontakt.anrede || '',
    vorname: formData.kontakt.vorname || '',
    nachname: formData.kontakt.nachname || '',
    email: formData.kontakt.email || '',
    telefon: formData.kontakt.telefon || '',
    firma: formData.kontakt.firma || '',
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

  // Formularvalidierung
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Simuliert das Versenden des Formulars
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Grundlegende Validierung
    if (!localState.vorname.trim() || !localState.nachname.trim()) {
      updateLocalState({ error: 'Bitte geben Sie Ihren Vor- und Nachnamen an' });
      return;
    }
    
    if (!localState.email.trim() || !isValidEmail(localState.email)) {
      updateLocalState({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an' });
      return;
    }
    
    if (!localState.telefon.trim()) {
      updateLocalState({ error: 'Bitte geben Sie Ihre Telefonnummer an' });
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
    fetch('/api/contact/sanierung', {
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

  // Helper-Funktionen für die Anzeige
  const getSchadensartText = (): string => {
    switch (formData.schadensart.hauptkategorie) {
      case 'brand': return 'Brandschaden'
      case 'wasser': return 'Wasserschaden'
      case 'schimmel': return 'Schimmelbefall'
      case 'sonstiges': return formData.schadensart.sonstigesText || 'Sonstige Sanierung'
      default: return 'Nicht angegeben'
    }
  }

  const getSchadensartIcon = () => {
    switch (formData.schadensart.hauptkategorie) {
      case 'brand': return <Flame className="h-5 w-5 text-red-500" />
      case 'wasser': return <Droplet className="h-5 w-5 text-blue-500" />
      case 'schimmel': return <Bug className="h-5 w-5 text-green-600" />
      default: return null
    }
  }

  const getObjektTypText = (): string => {
    switch (formData.objekt.typ) {
      case 'wohnung': return 'Wohnung'
      case 'haus': return 'Haus'
      case 'gewerbe': return 'Gewerbe'
      case 'keller': return 'Keller'
      case 'dachboden': return 'Dachboden'
      case 'sonstiges': return formData.objekt.typCustom || 'Sonstiges Objekt'
      default: return 'Nicht angegeben'
    }
  }

  // Helfer-Funktion für Material-Listen
  const getMaterialListe = (): string => {
    const materialMap: Record<string, string> = {
      'holz': 'Holz',
      'textilien': 'Textilien',
      'kunststoff': 'Kunststoff', 
      'tapete': 'Tapete',
      'bodenbelag': 'Bodenbelag',
      'moebel': 'Möbel',
      'elektrogeraete': 'Elektrogeräte'
    };
    
    return formData.details.brandMaterialien
      .map(material => materialMap[material] || material)
      .join(', ');
  }

  // Wasserursache formatieren
  const getWasserursacheText = (): string => {
    const ursacheMap: Record<string, string> = {
      'rohrbruch': 'Rohrbruch',
      'unwetter': 'Unwetter/Starkregen',
      'hochwasser': 'Hochwasser',
      'loeschwasser': 'Löschwasser',
      'sonstige': 'Sonstige Ursache'
    };
    
    if (formData.details.wasserUrsache === 'sonstige' && formData.details.wasserUrsacheCustom) {
      return `${ursacheMap[formData.details.wasserUrsache]}: ${formData.details.wasserUrsacheCustom}`;
    }
    
    return ursacheMap[formData.details.wasserUrsache] || formData.details.wasserUrsache;
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
                className="bg-white p-4 rounded-lg border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  {getSchadensartIcon()}
                  <span className="ml-2">Schadensart</span>
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Typ:</p>
                    <p className="text-sm font-medium text-accent">{getSchadensartText()}</p>
                  </div>
                  
                  {formData.schadensart.hauptkategorie === 'brand' && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Verschmutzungsgrad:</p>
                        <p className="text-sm font-medium">
                          {formData.details.brandVerschmutzungsgrad === 'leicht' ? 'Leicht' : 
                          formData.details.brandVerschmutzungsgrad === 'mittel' ? 'Mittel' : 'Stark'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Betroffene Materialien:</p>
                        <p className="text-sm font-medium">{getMaterialListe() || "Keine angegeben"}</p>
                      </div>
                    </>
                  )}
                  
                  {formData.schadensart.hauptkategorie === 'wasser' && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Ursache:</p>
                        <p className="text-sm font-medium">{getWasserursacheText()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Wasserart:</p>
                        <p className="text-sm font-medium">
                          {formData.details.wasserArt === 'sauber' ? 'Sauberes Wasser' : 'Kontaminiertes Wasser'}
                        </p>
                      </div>
                      {formData.details.wasserZeitpunkt && (
                        <div>
                          <p className="text-sm text-gray-500">Zeitpunkt:</p>
                          <p className="text-sm font-medium">
                            {new Date(formData.details.wasserZeitpunkt).toLocaleDateString('de-DE')}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {formData.schadensart.hauptkategorie === 'schimmel' && (
                    <>
                      <div>
                        <p className="text-sm text-gray-500">Sichtbarkeit:</p>
                        <p className="text-sm font-medium">
                          {formData.details.schimmelSichtbar ? 'Ja' : 'Nein, aber es gibt Anzeichen'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Befallene Fläche:</p>
                        <p className="text-sm font-medium">{formData.details.schimmelFlaeche} m²</p>
                      </div>
                      {formData.details.schimmelUrsacheBekannt && formData.details.schimmelUrsache && (
                        <div>
                          <p className="text-sm text-gray-500">Bekannte Ursache:</p>
                          <p className="text-sm font-medium">{formData.details.schimmelUrsache}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
              
              {/* Objekt & Fläche */}
              <motion.div
                className="bg-white p-4 rounded-lg border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <Building className="h-5 w-5 mr-2 text-accent" />
                  Objekt & Fläche
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Objekttyp:</p>
                    <p className="text-sm font-medium">{getObjektTypText()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Fläche:</p>
                    <p className="text-sm font-medium">{formData.objekt.flaeche} m²</p>
                  </div>
                  
                  {formData.objekt.betroffeneBereiche.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500">Betroffene Bereiche:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {formData.objekt.betroffeneBereiche.map((bereich) => (
                          <span 
                            key={bereich} 
                            className="inline-flex items-center px-2 py-1 bg-gray-100 text-xs rounded-full"
                          >
                            {bereich}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {formData.objekt.schadensbeschreibung && (
                    <div>
                      <p className="text-sm text-gray-500">Beschreibung:</p>
                      <p className="text-sm">{formData.objekt.schadensbeschreibung}</p>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Adresse */}
              <motion.div
                className="bg-white p-4 rounded-lg border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-accent" />
                  Adresse
                </h3>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Straße:</p>
                    <p className="text-sm font-medium">
                      {formData.adresse.strasse} {formData.adresse.hausnummer}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Ort:</p>
                    <p className="text-sm font-medium">
                      {formData.adresse.plz} {formData.adresse.ort}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Etage:</p>
                    <p className="text-sm font-medium">
                      {formData.adresse.etage === 0 ? 'EG' : formData.adresse.etage}
                      {formData.adresse.aufzug && <span className="ml-2 text-green-600">(Aufzug vorhanden)</span>}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Parkmöglichkeit:</p>
                    <p className="text-sm font-medium">
                      {formData.adresse.parkmoeglichkeit === 'gut' ? 'Gut' : 
                       formData.adresse.parkmoeglichkeit === 'eingeschraenkt' ? 'Eingeschränkt' : 'Schwierig'}
                    </p>
                  </div>
                  
                  {formData.adresse.zugaenglichkeit && (
                    <div>
                      <p className="text-sm text-gray-600">Zugänglichkeit:</p>
                      <p className="text-sm font-medium">{formData.adresse.zugaenglichkeit}</p>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Termindetails */}
              <motion.div
                className="bg-white p-4 rounded-lg border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-accent" />
                  Termindetails
                </h3>
                
                <div className="space-y-2">
                  {formData.kontakt.wunschtermin && (
                    <div>
                      <p className="text-sm text-gray-600">Gewünschter Termin:</p>
                      <p className="text-sm font-medium">
                        {new Date(formData.kontakt.wunschtermin).toLocaleDateString('de-DE')}
                        {formData.kontakt.wunschzeit ? ` um ${formData.kontakt.wunschzeit} Uhr` : ''}
                      </p>
                    </div>
                  )}
                  
                  {formData.kontakt.bevorzugteKontaktzeit && (
                    <div>
                      <p className="text-sm text-gray-600">Bevorzugte Kontaktzeit:</p>
                      <p className="text-sm font-medium">
                        {formData.kontakt.bevorzugteKontaktzeit === 'vormittags' ? 'Vormittags (8-12 Uhr)' : 
                         formData.kontakt.bevorzugteKontaktzeit === 'nachmittags' ? 'Nachmittags (12-17 Uhr)' : 
                         formData.kontakt.bevorzugteKontaktzeit === 'abends' ? 'Abends (17-20 Uhr)' : 
                         'Keine Angabe'}
                      </p>
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

                {/* Vor- und Nachname mit Icons */}
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
                
                {/* E-Mail mit Icon */}
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
                
                {/* Telefon mit Icon */}
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
                
                {/* Firma mit Icon */}
                <div>
                  <Label htmlFor="firma" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <Building className="h-4 w-4 mr-2 text-accent" /> Firma (optional)
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
                
                {/* Anmerkungen mit Icon */}
                <div>
                  <Label htmlFor="anmerkungen" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <PenLine className="h-4 w-4 mr-2 text-accent" /> Anmerkungen (optional)
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
        // Erfolgsmeldung nach Absenden - mit verbesserter Zentrierung
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
            Vielen Dank für Ihre Sanierungsanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit Ihnen in Verbindung setzen, um einen Termin zu vereinbaren.
          </p>
          
          <div className="bg-accent/10 rounded-lg p-6 mb-8 max-w-xl mx-auto">
            <div className="flex items-center justify-center mb-3">
              {getSchadensartIcon() || <CheckCircle className="h-5 w-5 mr-2 text-accent" />}
              <h3 className="text-lg font-medium text-accent">Über unser Sanierungsteam</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Unser Experten-Team wird Ihre Anforderungen detailliert analysieren und ein individuelles Sanierungskonzept erstellen. Für dringende Anliegen erreichen Sie uns telefonisch.
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
              href="/sanierung"
              className="py-3 px-8 border border-gray-300 text-gray-700 rounded font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Weitere Sanierungsleistungen
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
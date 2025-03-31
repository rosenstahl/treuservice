"use client"

import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { User, Mail, Phone, Building, CheckCircle, ArrowUpRight, Loader2, MapPin, PenLine, Flame, Droplet, Bug, ShoppingBag } from 'lucide-react'
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
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  isLastStep?: boolean;
}

// Lokaler State Typ mit Adressen- und Kontaktdaten
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
  // Zustandsvariablen mit lokalem State-Management
  const [localState, setLocalState] = useState<LocalStateType>({
    anrede: formData.kontakt.anrede || '',
    vorname: formData.kontakt.vorname || '',
    nachname: formData.kontakt.nachname || '',
    email: formData.kontakt.email || '',
    telefon: formData.kontakt.telefon || '',
    firma: formData.kontakt.firma || '',
    adresseStrasse: formData.adresse.strasse || '',
    adresseHausnummer: formData.adresse.hausnummer || '',
    adressePlz: formData.adresse.plz || '',
    adresseOrt: formData.adresse.ort || '',
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
      adresse: {
        ...formData.adresse,
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
        anmerkungen: localState.anmerkungen
      },
      datenschutz: localState.datenschutz
    });
  }, [localState, updateFormData, formData.adresse, formData.kontakt]);

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
      case 'brand': return <Flame className="h-3 w-3 mr-1 text-red-500" />
      case 'wasser': return <Droplet className="h-3 w-3 mr-1 text-blue-500" />
      case 'schimmel': return <Bug className="h-3 w-3 mr-1 text-green-600" />
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

  // Etage als lesbare Bezeichnung
  const getEtageLabel = (etage: number) => {
    return etage === 0 ? 'Erdgeschoss' : `${etage}. Etage`;
  }

  // Parkmöglichkeit als lesbare Bezeichnung
  const getParkmoeglichkeitLabel = (parkmoeglichkeit: FormData['adresse']['parkmoeglichkeit']) => {
    const labels: Record<string, string> = {
      'gut': 'Gut (direkt vor dem Gebäude)',
      'eingeschraenkt': 'Eingeschränkt (in der Nähe)',
      'keine': 'Keine/Schwierig'
    };
    return labels[parkmoeglichkeit] || 'Nicht angegeben';
  }

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

  // Simuliert das Versenden des Formulars
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
    
    // Adressfelder prüfen
    if (!localState.adresseStrasse.trim() || !localState.adresseHausnummer.trim() || 
        !localState.adressePlz.trim() || !localState.adresseOrt.trim()) {
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
      const response = await fetch('/api/contact/sanierung', {
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
                    <p className="text-xs font-medium text-[#009FD8]">{getObjektTypText()}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Objektgröße:</p>
                    <p className="text-xs font-medium">
                      {formData.objekt.flaeche} m²
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Adresse:</p>
                    <p className="text-xs font-medium">
                      {formData.adresse.strasse} {formData.adresse.hausnummer}, {formData.adresse.plz} {formData.adresse.ort}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Schadensart Informationen */}
              <motion.div
                className="pt-4 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3">Schadensart</h3>
                
                <div className="space-y-2">
                  <div className="flex items-start">
                    {getSchadensartIcon()}
                    <p className="text-xs font-medium">{getSchadensartText()}</p>
                  </div>
                  
                  {formData.schadensart.hauptkategorie === 'brand' && (
                    <>
                      <div>
                        <p className="text-xs text-gray-500">Verschmutzungsgrad:</p>
                        <p className="text-xs font-medium">
                          {formData.details.brandVerschmutzungsgrad === 'leicht' ? 'Leicht' : 
                           formData.details.brandVerschmutzungsgrad === 'mittel' ? 'Mittel' : 'Stark'}
                        </p>
                      </div>
                      {formData.details.brandMaterialien.length > 0 && (
                        <div>
                          <p className="text-xs text-gray-500">Betroffene Materialien:</p>
                          <p className="text-xs font-medium">{getMaterialListe()}</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {formData.schadensart.hauptkategorie === 'wasser' && (
                    <>
                      <div>
                        <p className="text-xs text-gray-500">Ursache:</p>
                        <p className="text-xs font-medium">{getWasserursacheText()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Wasserart:</p>
                        <p className="text-xs font-medium">
                          {formData.details.wasserArt === 'sauber' ? 'Sauberes Wasser' : 'Kontaminiertes Wasser'}
                        </p>
                      </div>
                      {formData.details.wasserZeitpunkt && (
                        <div>
                          <p className="text-xs text-gray-500">Zeitpunkt:</p>
                          <p className="text-xs font-medium">
                            {formatDate(formData.details.wasserZeitpunkt)}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {formData.schadensart.hauptkategorie === 'schimmel' && (
                    <>
                      <div>
                        <p className="text-xs text-gray-500">Sichtbarkeit:</p>
                        <p className="text-xs font-medium">
                          {formData.details.schimmelSichtbar ? 'Ja' : 'Nein, aber es gibt Anzeichen'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Befallene Fläche:</p>
                        <p className="text-xs font-medium">{formData.details.schimmelFlaeche} m²</p>
                      </div>
                      {formData.details.schimmelUrsacheBekannt && formData.details.schimmelUrsache && (
                        <div>
                          <p className="text-xs text-gray-500">Bekannte Ursache:</p>
                          <p className="text-xs font-medium">{formData.details.schimmelUrsache}</p>
                        </div>
                      )}
                    </>
                  )}
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
                    <p className="text-xs font-medium">{getEtageLabel(formData.adresse.etage)}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Aufzug:</p>
                    <p className="text-xs font-medium">{formData.adresse.aufzug ? 'Vorhanden' : 'Nicht vorhanden'}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Parkmöglichkeit:</p>
                    <p className="text-xs font-medium">{getParkmoeglichkeitLabel(formData.adresse.parkmoeglichkeit)}</p>
                  </div>
                  
                  {formData.kontakt.wunschtermin && (
                    <div>
                      <p className="text-xs text-gray-500">Wunschtermin:</p>
                      <p className="text-xs font-medium">
                        {formatDate(formData.kontakt.wunschtermin)}
                        {formData.kontakt.wunschzeit && ` um ${formData.kontakt.wunschzeit} Uhr`}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Betroffene Bereiche (Checklist) */}
              <motion.div
                className="pt-4 border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.2 }}
              >
                <h3 className="text-sm font-medium text-gray-800 mb-3">Betroffene Bereiche</h3>
                
                <div className="space-y-2">
                  {formData.objekt.betroffeneBereiche.length > 0 ? (
                    formData.objekt.betroffeneBereiche.map((bereich, index) => (
                      <div key={index} className="flex items-center">
                        <div className="text-[#009FD8] mr-2">
                          <CheckCircle className="h-3 w-3" />
                        </div>
                        <p className="text-xs font-medium">{bereich}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">Keine Bereiche ausgewählt</p>
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
            Vielen Dank für Ihre Sanierungsanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.
          </p>
          
          <div className="bg-[#E6F4FA] rounded-lg p-4 mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-2">
              <ShoppingBag className="h-4 w-4 mr-1.5 text-[#009FD8]" />
              <h3 className="text-sm font-medium text-[#009FD8]">Über unser Sanierungsteam</h3>
            </div>
            <p className="text-xs text-gray-700 mb-3">
              Unser spezialisiertes Team wird Ihre Anforderungen detailliert analysieren und ein individuelles Sanierungskonzept erstellen. Für dringende Anliegen erreichen Sie uns telefonisch.
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
              href="/sanierung"
              className="py-2.5 px-5 border border-gray-200 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              Weitere Sanierungsleistungen
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../LeiharbeitWizard'
import { CheckCircle, Loader2, PhoneCall, Briefcase, Building2, User, Phone, Mail, Pin, Clock, Info } from 'lucide-react'

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

export const KontaktZusammenfassungStep: React.FC<KontaktZusammenfassungStepProps> = ({ 
  formData, 
  updateFormData,
  goToPreviousStep,
  isLastStep
}) => {
  const isUnternehmen = formData.anfrageTyp === 'unternehmen';
  const isBewerber = formData.anfrageTyp === 'bewerber';

  // Kontaktformular Zustand
  const [name, setName] = useState(formData.kontakt.name || '')
  const [firma, setFirma] = useState(formData.kontakt.firma || '')
  const [ansprechpartner, setAnsprechpartner] = useState(formData.kontakt.ansprechpartner || '')
  const [telefon, setTelefon] = useState(formData.kontakt.telefon || '')
  const [email, setEmail] = useState(formData.kontakt.email || '')
  const [adresseStrasse, setAdresseStrasse] = useState(formData.kontakt.adresseStrasse || '')
  const [adresseHausnummer, setAdresseHausnummer] = useState(formData.kontakt.adresseHausnummer || '')
  const [adressePlz, setAdressePlz] = useState(formData.kontakt.adressePlz || '')
  const [adresseOrt, setAdresseOrt] = useState(formData.kontakt.adresseOrt || '')
  const [anmerkungen, setAnmerkungen] = useState(formData.kontakt.anmerkungen || '')
  const [datenschutz, setDatenschutz] = useState(formData.datenschutz || false)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  
  // Handler für die Formular-Inputs
  const handleDatenschutzToggle = () => {
    setDatenschutz(prev => !prev)
    updateFormData({ datenschutz: !datenschutz })
  }

  // Speichern der Kontaktdaten und Anzeigen der Zusammenfassung
  const handleSaveAndContinue = () => {
    if (!validateForm()) return;
    
    // Aktualisiere die Formulardaten
    updateFormData({
      kontakt: {
        name,
        firma: isUnternehmen ? firma : undefined,
        ansprechpartner: isUnternehmen ? ansprechpartner : undefined,
        telefon,
        email,
        adresseStrasse,
        adresseHausnummer,
        adressePlz,
        adresseOrt,
        anmerkungen
      },
      datenschutz
    });
    
    setShowSummary(true);
  };

  // Zurück zum Kontaktformular
  const handleBackToContact = () => {
    setShowSummary(false);
  };

  // Formularvalidierung
  const validateForm = () => {
    if (!name.trim()) {
      setError('Bitte geben Sie Ihren Namen an');
      return false;
    }
    
    if (isUnternehmen && !firma.trim()) {
      setError('Bitte geben Sie den Firmennamen an');
      return false;
    }
    
    if (!email.trim() || !validateEmail(email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse an');
      return false;
    }
    
    if (!telefon.trim()) {
      setError('Bitte geben Sie Ihre Telefonnummer an');
      return false;
    }
    
    if (!adresseStrasse.trim() || !adresseHausnummer.trim() || !adressePlz.trim() || !adresseOrt.trim()) {
      setError('Bitte füllen Sie alle Adressfelder aus');
      return false;
    }
    
    if (!datenschutz) {
      setError('Bitte stimmen Sie den Datenschutzbestimmungen zu');
      return false;
    }

    setError('');
    return true;
  };

  // E-Mail-Validierung
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  // Absenden des Formulars
  const handleSubmit = () => {
    setIsSubmitting(true);
    setError('');
    
    // In einer echten Implementierung würde hier ein API-Aufruf erfolgen
    setTimeout(() => {
      // Erfolgreiche Übermittlung simulieren
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isSubmitted ? (
        !showSummary ? (
          /* Kontaktformular */
          <>
            <div className="text-center mb-6">
              <motion.h2 
                className="text-2xl font-medium text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                Ihre Kontaktdaten
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                {isUnternehmen 
                  ? 'Damit wir Sie kontaktieren können und Ihnen passende Personalvorschläge unterbreiten können.'
                  : 'Damit wir Sie kontaktieren können und Ihnen passende Jobangebote machen können.'}
              </motion.p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {/* Persönliche/Firmendaten */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  {isUnternehmen ? 'Firmendaten' : 'Persönliche Daten'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        {isUnternehmen ? 'Vor- und Nachname*' : 'Vor- und Nachname*'}
                      </label>
                    </div>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                      required
                    />
                  </div>
                  
                  {/* Firma (nur für Unternehmen) */}
                  {isUnternehmen && (
                    <div className="col-span-1">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-5 w-5 text-gray-400" />
                        <label htmlFor="firma" className="block text-sm font-medium text-gray-700">
                          Firmenname*
                        </label>
                      </div>
                      <input
                        type="text"
                        id="firma"
                        value={firma}
                        onChange={(e) => setFirma(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                        required={isUnternehmen}
                      />
                    </div>
                  )}
                  
                  {/* Ansprechpartner (nur für Unternehmen) */}
                  {isUnternehmen && (
                    <div className="col-span-1">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-gray-400" />
                        <label htmlFor="ansprechpartner" className="block text-sm font-medium text-gray-700">
                          Ansprechpartner (optional)
                        </label>
                      </div>
                      <input
                        type="text"
                        id="ansprechpartner"
                        value={ansprechpartner}
                        onChange={(e) => setAnsprechpartner(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                      />
                    </div>
                  )}
                  
                  {/* E-Mail */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        E-Mail-Adresse*
                      </label>
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                      required
                    />
                  </div>
                  
                  {/* Telefon */}
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <label htmlFor="telefon" className="block text-sm font-medium text-gray-700">
                        Telefonnummer*
                      </label>
                    </div>
                    <input
                      type="tel"
                      id="telefon"
                      value={telefon}
                      onChange={(e) => setTelefon(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                      required
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Adresse */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-700 mb-4">
                  Adresse
                </h3>
                
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-3">
                    <div className="flex items-center space-x-2">
                      <Pin className="h-5 w-5 text-gray-400" />
                      <label htmlFor="adresseStrasse" className="block text-sm font-medium text-gray-700">
                        Straße*
                      </label>
                    </div>
                    <input
                      type="text"
                      id="adresseStrasse"
                      value={adresseStrasse}
                      onChange={(e) => setAdresseStrasse(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                      required
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="adresseHausnummer" className="block text-sm font-medium text-gray-700">
                      Hausnr.*
                    </label>
                    <input
                      type="text"
                      id="adresseHausnummer"
                      value={adresseHausnummer}
                      onChange={(e) => setAdresseHausnummer(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                      required
                    />
                  </div>
                  
                  <div className="col-span-1">
                    <label htmlFor="adressePlz" className="block text-sm font-medium text-gray-700">
                      PLZ*
                    </label>
                    <input
                      type="text"
                      id="adressePlz"
                      value={adressePlz}
                      onChange={(e) => setAdressePlz(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                      required
                    />
                  </div>
                  
                  <div className="col-span-3">
                    <label htmlFor="adresseOrt" className="block text-sm font-medium text-gray-700">
                      Ort*
                    </label>
                    <input
                      type="text"
                      id="adresseOrt"
                      value={adresseOrt}
                      onChange={(e) => setAdresseOrt(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                      required
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Anmerkungen */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <label htmlFor="anmerkungen" className="block text-lg font-medium text-gray-700 mb-2">
                  Anmerkungen (optional)
                </label>
                <textarea
                  id="anmerkungen"
                  rows={3}
                  value={anmerkungen}
                  onChange={(e) => setAnmerkungen(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent focus:border-accent"
                  placeholder="Weitere Informationen oder Fragen"
                ></textarea>
              </motion.div>
              
              {/* Datenschutz */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="datenschutz"
                      name="datenschutz"
                      type="checkbox"
                      checked={datenschutz}
                      onChange={handleDatenschutzToggle}
                      className="h-5 w-5 text-accent border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="datenschutz" className="font-medium text-gray-700">
                      Datenschutzerklärung*
                    </label>
                    <p className="text-gray-500">
                      Ich stimme zu, dass meine Angaben gemäß der Datenschutzerklärung verarbeitet werden. Ich kann meine Einwilligung jederzeit widerrufen.
                    </p>
                  </div>
                </div>
              </motion.div>

              {error && (
                <motion.p 
                  className="text-red-500 text-sm text-center mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}
              
              <motion.div 
                className="flex justify-between mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <motion.button
                  onClick={goToPreviousStep}
                  className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Zurück
                </motion.button>

                <motion.button
                  onClick={handleSaveAndContinue}
                  className="py-3 px-8 rounded-md font-medium transition-all duration-200 bg-accent text-white hover:bg-accent-dark hover:shadow-md"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Weiter
                </motion.button>
              </motion.div>
            </div>
          </>
        ) : (
          /* Zusammenfassung */
          <>
            <div className="text-center mb-6">
              <motion.h2 
                className="text-2xl font-medium text-gray-800 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                Zusammenfassung Ihrer Angaben
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                Bitte überprüfen Sie Ihre Angaben vor dem Absenden.
              </motion.p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              {/* Express-Hinweis für Unternehmen */}
              {isUnternehmen && formData.expressAnfrage && (
                <motion.div
                  className="bg-accent/10 border-l-4 border-accent p-4 mb-6 rounded-r-md"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-accent" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-accent">Express-Anfrage aktiviert</h3>
                      <div className="mt-2 text-sm text-accent/80">
                        <p>Wir werden uns innerhalb von 24 Stunden mit Ihnen in Verbindung setzen.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Anfragetyp */}
              <motion.div
                className="mb-6 bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Anfragetyp</h3>
                <div className="flex items-center space-x-3">
                  {isUnternehmen ? (
                    <>
                      <Building2 className="h-5 w-5 text-accent" />
                      <span className="font-medium">Unternehmen sucht Leiharbeiter</span>
                    </>
                  ) : (
                    <>
                      <Briefcase className="h-5 w-5 text-accent" />
                      <span className="font-medium">Bewerber sucht Arbeit</span>
                    </>
                  )}
                </div>
              </motion.div>
              
              {/* Bedarf oder Profil */}
              <motion.div
                className="mb-6 bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                  {isUnternehmen ? 'Personalbedarf' : 'Bewerberprofil'}
                </h3>
                
                {isUnternehmen && formData.unternehmenBedarf && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Branche</p>
                      <p className="text-base">
                        {formData.unternehmenBedarf.branche === 'sonstiges' 
                          ? formData.unternehmenBedarf.brancheSonstiges 
                          : branchenLabels[formData.unternehmenBedarf.branche] || formData.unternehmenBedarf.branche}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Benötigte Mitarbeiter</p>
                      <p className="text-base">{formData.unternehmenBedarf.anzahlMitarbeiter}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Qualifikationsniveau</p>
                      <p className="text-base">
                        {qualifikationsniveauLabels[formData.unternehmenBedarf.qualifikationsniveau] || formData.unternehmenBedarf.qualifikationsniveau}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Einsatzdauer</p>
                      <p className="text-base">
                        {einsatzdauerLabels[formData.unternehmenBedarf.einsatzdauer] || formData.unternehmenBedarf.einsatzdauer}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Einsatzbeginn</p>
                      <p className="text-base">{formatDatum(formData.unternehmenBedarf.einsatzbeginn)}</p>
                    </div>
                  </div>
                )}
                
                {isBewerber && formData.bewerberProfil && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Fachbereich</p>
                      <p className="text-base">
                        {formData.bewerberProfil.fachbereich === 'sonstiges' 
                          ? formData.bewerberProfil.fachbereichSonstiges 
                          : branchenLabels[formData.bewerberProfil.fachbereich] || formData.bewerberProfil.fachbereich}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Qualifikationsniveau</p>
                      <p className="text-base">
                        {qualifikationsniveauLabels[formData.bewerberProfil.qualifikation] || formData.bewerberProfil.qualifikation}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Berufserfahrung</p>
                      <p className="text-base">{formData.bewerberProfil.berufserfahrungJahre} Jahre</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Verfügbarkeit</p>
                      <p className="text-base">
                        {verfuegbarkeitLabels[formData.bewerberProfil.verfuegbarkeit] || formData.bewerberProfil.verfuegbarkeit}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Arbeitszeit</p>
                      <p className="text-base">
                        {arbeitszeitLabels[formData.bewerberProfil.arbeitszeit] || formData.bewerberProfil.arbeitszeit}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Einsatzregion</p>
                      <p className="text-base">{formData.bewerberProfil.einsatzregion}</p>
                    </div>
                  </div>
                )}
              </motion.div>
              
              {/* Anforderungen */}
              <motion.div
                className="mb-6 bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                  {isUnternehmen ? 'Anforderungen' : 'Kenntnisse & Fähigkeiten'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {formData.anforderungen.spezielleKenntnisse && (
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">
                        {isUnternehmen ? 'Spezielle Kenntnisse' : 'Besondere Kenntnisse'}
                      </p>
                      <p className="text-base">{formData.anforderungen.spezielleKenntnisse}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Schichtbereitschaft</p>
                    <p className="text-base">
                      {schichtbereitschaftLabels[formData.anforderungen.schichtbereitschaft] || formData.anforderungen.schichtbereitschaft}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Führerschein</p>
                    <p className="text-base">{formData.anforderungen.fuehrerschein ? 'Ja' : 'Nein'}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Deutschkenntnisse</p>
                    <p className="text-base">
                      {sprachniveauLabels[formData.anforderungen.sprachkenntnisse.deutsch] || formData.anforderungen.sprachkenntnisse.deutsch}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Englischkenntnisse</p>
                    <p className="text-base">
                      {sprachniveauLabels[formData.anforderungen.sprachkenntnisse.englisch] || formData.anforderungen.sprachkenntnisse.englisch}
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Konditionen */}
              <motion.div
                className="mb-6 bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                  {isUnternehmen ? 'Zusätzliche Informationen' : 'Erwartungen'}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Arbeitszeiten</p>
                    <p className="text-base">{formData.konditionen.arbeitszeiten}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">{isUnternehmen ? 'Überstunden erforderlich' : 'Überstundenbereitschaft'}</p>
                    <p className="text-base">{formData.konditionen.ueberstundenBereitschaft ? 'Ja' : 'Nein'}</p>
                  </div>
                  
                  {isBewerber && formData.konditionen.gehaltsvorstellung && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Gehaltsvorstellung</p>
                      <p className="text-base">{formData.konditionen.gehaltsvorstellung}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">{isUnternehmen ? 'Unterkunftsmöglichkeiten' : 'Unterkunftsbedarf'}</p>
                    <p className="text-base">{isUnternehmen ? (formData.konditionen.unterkunftVorhanden ? 'Ja' : 'Nein') : (formData.konditionen.unterkunftBedarf ? 'Ja' : 'Nein')}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Kontaktdaten */}
              <motion.div
                className="mb-6 bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                <div className="flex justify-between border-b pb-2 mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Kontaktdaten</h3>
                  <button 
                    onClick={handleBackToContact}
                    className="text-sm text-accent hover:text-accent-dark underline"
                  >
                    Bearbeiten
                  </button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-base">{name}</p>
                  </div>
                  
                  {isUnternehmen && firma && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Firma</p>
                      <p className="text-base">{firma}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">E-Mail</p>
                    <p className="text-base">{email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telefon</p>
                    <p className="text-base">{telefon}</p>
                  </div>
                  
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">Adresse</p>
                    <p className="text-base">
                      {adresseStrasse} {adresseHausnummer}, {adressePlz} {adresseOrt}
                    </p>
                  </div>
                  
                  {anmerkungen && (
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">Anmerkungen</p>
                      <p className="text-base">{anmerkungen}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            
              {error && (
                <motion.p 
                  className="text-red-500 text-sm text-center mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}
              
              <motion.div 
                className="flex justify-between mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                <motion.button
                  onClick={handleBackToContact}
                  className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                >
                  Zurück
                </motion.button>

                <motion.button
                  onClick={handleSubmit}
                  className="py-3 px-8 rounded-md font-medium transition-all duration-200 bg-accent text-white hover:bg-accent-dark hover:shadow-md flex items-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Wird gesendet...
                    </>
                  ) : (
                    'Anfrage absenden'
                  )}
                </motion.button>
              </motion.div>
            </div>
          </>
        )
      ) : (
        // Erfolgsanzeige
        <motion.div 
          className="text-center py-12"
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
              ? 'Vielen Dank für Ihre Anfrage. Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen, um Ihren Personalbedarf zu besprechen.'
              : 'Vielen Dank für Ihre Bewerbung. Unser Team wird Ihre Unterlagen sorgfältig prüfen und sich in Kürze mit Ihnen in Verbindung setzen.'}
          </p>
          
          {/* Express-Hinweis für Unternehmen */}
          {isUnternehmen && formData.expressAnfrage && (
            <div className="bg-accent/10 rounded-lg p-6 mb-8 max-w-xl mx-auto">
              <h3 className="text-lg font-medium text-accent mb-2">EXPRESS-ANFRAGE</h3>
              <p className="text-gray-700 mb-4">
                Wir werden uns innerhalb der nächsten 24 Stunden telefonisch bei Ihnen melden.
              </p>
              <div className="flex items-center justify-center gap-3">
                <PhoneCall className="h-5 w-5 text-accent" />
                <span className="font-medium">{telefon}</span>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <motion.a
              href="/"
              className="py-3 px-8 bg-accent text-white rounded-lg font-medium transition-all duration-200 hover:bg-accent-dark hover:shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Zurück zur Startseite
            </motion.a>
            
            <motion.a
              href="/leiharbeit"
              className="py-3 px-8 border border-gray-300 text-gray-700 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Mehr über Leiharbeit
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
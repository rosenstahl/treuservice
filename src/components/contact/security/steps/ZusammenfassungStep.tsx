"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SecurityWizard'
import { CheckCircle, PhoneCall, Loader2, ArrowUpRight, Shield } from 'lucide-react'

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

export const ZusammenfassungStep: React.FC<ZusammenfassungStepProps> = ({ 
  formData,
  updateFormData,
  goToPreviousStep
}) => {
  // Zustandsvariablen für Kontaktdaten
  const [name, setName] = useState(formData.kontakt.name || '')
  const [email, setEmail] = useState(formData.kontakt.email || '')
  const [telefon, setTelefon] = useState(formData.kontakt.telefon || '')
  const [firma, setFirma] = useState(formData.kontakt.firma || '')
  const [adresseStrasse, setAdresseStrasse] = useState(formData.kontakt.adresseStrasse || '')
  const [adresseHausnummer, setAdresseHausnummer] = useState(formData.kontakt.adresseHausnummer || '')
  const [adressePlz, setAdressePlz] = useState(formData.kontakt.adressePlz || '')
  const [adresseOrt, setAdresseOrt] = useState(formData.kontakt.adresseOrt || '')
  const [anmerkungen, setAnmerkungen] = useState(formData.kontakt.anmerkungen || '')

  // Zustandsvariablen für die Formularverarbeitung
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  // E-Mail-Validierung mit regulärem Ausdruck
  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(email)
  }

  // Simuliert das Versenden des Formulars
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Grundlegende Validierung
    if (!name.trim()) {
      setError('Bitte geben Sie Ihren Namen an')
      return
    }
    
    if (!email.trim() || !validateEmail(email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse an')
      return
    }
    
    if (!telefon.trim()) {
      setError('Bitte geben Sie Ihre Telefonnummer an')
      return
    }
    
    if (!adresseStrasse.trim() || !adresseHausnummer.trim() || !adressePlz.trim() || !adresseOrt.trim()) {
      setError('Bitte füllen Sie alle Adressfelder aus')
      return
    }
    
    // Aktualisiere die Formular-Daten
    updateFormData({
      kontakt: {
        name,
        email,
        telefon,
        firma,
        adresseStrasse,
        adresseHausnummer,
        adressePlz,
        adresseOrt,
        anmerkungen
      }
    })
    
    setIsSubmitting(true)
    setError('')
    
    // Simulierte API-Anfrage
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // In einer echten Implementierung würde hier eine API-Anfrage stattfinden
      // Die Daten würden in einer Datenbank oder per E-Mail gesendet werden
    }, 1500)
  }

  // Anzeigenamen für die Formularwerte
  const getSecurityTypeDisplay = () => {
    const type = formData.securityType.hauptkategorie
    const label = securityTypesLabels[type] || type
    
    if (type === 'sonstiges' && formData.securityType.sonstigesText) {
      return `${label}: ${formData.securityType.sonstigesText}`
    }
    
    return label
  }

  const getObjektTypDisplay = () => {
    const typ = formData.objektTyp.typ
    const label = objektTypLabels[typ] || typ
    return label
  }

  const qualifikationenList = () => {
    const qualifikationen = formData.personalUmfang.qualifikationen
    const list = []
    
    if (qualifikationen.sg34a) list.push("Sachkunde § 34a GewO")
    if (qualifikationen.ersteHilfe) list.push("Erweiterte Erste-Hilfe")
    if (qualifikationen.brandschutz) list.push("Brandschutzhelfer")
    if (qualifikationen.deeskalation) list.push("Deeskalationstraining")
    if (qualifikationen.evakuierung) list.push("Evakuierungshelfer")
    if (qualifikationen.fremdsprachen) list.push("Fremdsprachenkenntnisse")
    
    if (qualifikationen.sonstigeQualifikationen) {
      list.push(qualifikationen.sonstigeQualifikationen)
    }
    
    return list.length > 0 ? list.join(", ") : "Keine speziellen Qualifikationen";
  }

  const diensteTimes = () => {
    const dienste = formData.zeitlicheInfos.dienste
    const times = []
    
    if (dienste.tagesdienst) times.push("Tagdienst")
    if (dienste.nachtdienst) times.push("Nachtdienst")
    if (dienste.wochenenddienst) times.push("Wochenenddienst")
    if (dienste.feiertagsdienst) times.push("Feiertagsdienst")
    
    return times.length > 0 ? times.join(", ") : "Keine Angabe";
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isSubmitted ? (
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
            <div className="space-y-6">
              {/* Ausgewählte Dienste */}
              <motion.div
                className="bg-gray-50 p-4 rounded-md border border-gray-200"
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
                className="bg-gray-50 p-4 rounded-md border border-gray-200"
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
                className="bg-gray-50 p-4 rounded-md border border-gray-200"
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
            </div>
            
            {/* Kontaktformular rechte Spalte */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name*
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-Mail*
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon*
                  </label>
                  <input
                    id="telefon"
                    name="telefon"
                    type="tel"
                    required
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="firma" className="block text-sm font-medium text-gray-700 mb-1">
                    Firma (optional)
                  </label>
                  <input
                    id="firma"
                    name="firma"
                    type="text"
                    value={firma}
                    onChange={(e) => setFirma(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label htmlFor="adresseStrasse" className="block text-sm font-medium text-gray-700 mb-1">
                      Straße*
                    </label>
                    <input
                      id="adresseStrasse"
                      name="adresseStrasse"
                      type="text"
                      required
                      value={adresseStrasse}
                      onChange={(e) => setAdresseStrasse(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="adresseHausnummer" className="block text-sm font-medium text-gray-700 mb-1">
                      Nr.*
                    </label>
                    <input
                      id="adresseHausnummer"
                      name="adresseHausnummer"
                      type="text"
                      required
                      value={adresseHausnummer}
                      onChange={(e) => setAdresseHausnummer(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label htmlFor="adressePlz" className="block text-sm font-medium text-gray-700 mb-1">
                      PLZ*
                    </label>
                    <input
                      id="adressePlz"
                      name="adressePlz"
                      type="text"
                      required
                      value={adressePlz}
                      onChange={(e) => setAdressePlz(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label htmlFor="adresseOrt" className="block text-sm font-medium text-gray-700 mb-1">
                      Ort*
                    </label>
                    <input
                      id="adresseOrt"
                      name="adresseOrt"
                      type="text"
                      required
                      value={adresseOrt}
                      onChange={(e) => setAdresseOrt(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="anmerkungen" className="block text-sm font-medium text-gray-700 mb-1">
                    Nachricht (optional)
                  </label>
                  <textarea
                    id="anmerkungen"
                    name="anmerkungen"
                    rows={3}
                    value={anmerkungen}
                    onChange={(e) => setAnmerkungen(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
                  ></textarea>
                </div>
                
                {error && (
                  <motion.p 
                    className="text-red-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.p>
                )}
                
                <div className="flex justify-between space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
                  >
                    Zurück
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-2 px-6 bg-accent text-white font-medium rounded-md transition-all duration-200 transform hover:scale-105 hover:shadow-md flex items-center justify-center ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent-dark'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-5 w-5" />
                        Wird gesendet...
                      </>
                    ) : (
                      'Jetzt anfragen'
                    )}
                  </button>
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
          className="text-center py-12"
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
            <div className="flex items-center mb-3">
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
              className="py-3 px-8 bg-accent text-white rounded-lg font-medium transition-all duration-200 hover:bg-accent-dark hover:shadow-md flex items-center justify-center"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Zurück zur Startseite
            </motion.a>
            
            <motion.a
              href="/security"
              className="py-3 px-8 border border-gray-300 text-gray-700 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm flex items-center justify-center"
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
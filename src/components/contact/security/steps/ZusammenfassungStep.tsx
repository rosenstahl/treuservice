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

// Preisformatierung
const formatPrice = (price: number) => {
  return price.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' })
}

export const ZusammenfassungStep: React.FC<ZusammenfassungStepProps> = ({ 
  formData, 
  updateFormData, 
  goToPreviousStep
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Simuliert das Versenden des Formulars
  const handleSubmit = () => {
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
              Überprüfen Sie Ihre Angaben und senden Sie Ihre Anfrage ab.
            </motion.p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {/* Sicherheitsdienstleistung */}
            <motion.div
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">Gewünschte Sicherheitsleistung</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Sicherheitsdienstleistung</p>
                    <p className="text-base text-accent">{getSecurityTypeDisplay()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Objekttyp</p>
                    <p className="text-base text-accent">{getObjektTypDisplay()}</p>
                  </div>
                </div>
                
                {formData.objektTyp.customDetails && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Objektdetails</p>
                    <p className="text-base">{formData.objektTyp.customDetails}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Sicherheitskräfte</p>
                    <p className="text-base">{formData.personalUmfang.anzahlMitarbeiter} Personen</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Bewaffnung</p>
                    <p className="text-base">{formData.personalUmfang.bewaffnung ? "Ja" : "Nein"}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Qualifikationen</p>
                  <p className="text-base">{qualifikationenList()}</p>
                </div>

                {formData.personalUmfang.spezifischeAnforderungen && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Spezifische Anforderungen</p>
                    <p className="text-base">{formData.personalUmfang.spezifischeAnforderungen}</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Zeitliche Details */}
            <motion.div
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">Zeitliche Details</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Einsatzdauer</p>
                    <p className="text-base">{dauerTypLabels[formData.zeitlicheInfos.dauerTyp]}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Wiederholung</p>
                    <p className="text-base">{wiederholungLabels[formData.zeitlicheInfos.wiederholung]}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Startdatum</p>
                    <p className="text-base">{formatDate(formData.zeitlicheInfos.beginnDatum)}</p>
                  </div>
                  
                  {formData.zeitlicheInfos.endeDatum && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Enddatum</p>
                      <p className="text-base">{formatDate(formData.zeitlicheInfos.endeDatum)}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Dienstzeiten</p>
                  <p className="text-base">{diensteTimes()}</p>
                </div>

                {formData.zeitlicheInfos.anmerkungen && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Anmerkungen zu Zeitvorgaben</p>
                    <p className="text-base">{formData.zeitlicheInfos.anmerkungen}</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Kontaktdaten */}
            <motion.div
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">Kontaktdaten</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="text-base">{formData.kontakt.name}</p>
                  </div>
                  
                  {formData.kontakt.firma && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Firma</p>
                      <p className="text-base">{formData.kontakt.firma}</p>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">E-Mail</p>
                    <p className="text-base">{formData.kontakt.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telefon</p>
                    <p className="text-base">{formData.kontakt.telefon}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Adresse</p>
                  <p className="text-base">
                    {formData.kontakt.adresseStrasse} {formData.kontakt.adresseHausnummer}, {formData.kontakt.adressePlz} {formData.kontakt.adresseOrt}
                  </p>
                </div>
                
                {formData.kontakt.anmerkungen && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Anmerkungen</p>
                    <p className="text-base text-gray-700">{formData.kontakt.anmerkungen}</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Preisschätzung */}
            <motion.div
              className="bg-accent/10 border border-accent/20 rounded-lg p-6 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <h3 className="text-lg font-medium text-accent mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Kostenvoranschlag
              </h3>
              
              <div className="flex items-center justify-between">
                <p className="text-gray-800">Geschätzter Preis:</p>
                <p className="text-xl font-bold text-accent">{formatPrice(formData.preisschaetzung)}</p>
              </div>
              
              <div className="mt-4 text-xs text-gray-500">
                <p>Dies ist ein unverbindlicher Richtwert. Der finale Preis kann je nach detaillierter Bedarfsanalyse und individuellen Anforderungen variieren.</p>
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
              transition={{ delay: 0.7, duration: 0.3 }}
            >
              <motion.button
                onClick={goToPreviousStep}
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
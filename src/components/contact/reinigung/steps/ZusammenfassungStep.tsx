"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../ReinigungWizard'
import { CheckCircle, PhoneCall, Loader2 } from 'lucide-react'

type ZusammenfassungStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
}

// Mapping für benutzerfreundliche Anzeige
const reinigungsartLabels: Record<string, string> = {
  unterhaltsreinigung: "Unterhaltsreinigung",
  grundreinigung: "Grundreinigung",
  glas_fassade: "Glas- und Fassadenreinigung",
  industrie: "Industriereinigung",
  reinraum: "Reinraumreinigung",
  aussenanlagen: "Außenanlagenpflege",
  sonderreinigung: "Sonderreinigung",
  verkehrsmittel: "Verkehrsmittelreinigung",
  hotel: "Hotelreinigung",
  veranstaltung: "Veranstaltungsreinigung",
  baureinigung: "Baureinigung",
  steinreinigung: "Steinreinigung",
  dachreinigung: "Dachreinigung",
  solaranlagen: "Solaranlagenreinigung",
  sonstiges: "Sonstige Reinigung"
}

const objektTypLabels: Record<string, string> = {
  buero: "Büro",
  wohnhaus: "Wohnhaus",
  industrie: "Industrie",
  gewerbe: "Gewerbe",
  hotel: "Hotel",
  krankenhaus: "Krankenhaus",
  schule: "Bildungseinrichtung",
  aussenbereich: "Außenbereich",
  sonstiges: "Sonstiges"
}

const serviceTypLabels: Record<string, string> = {
  standard: "Standard-Service",
  express: "Express-Service",
  sofort: "Sofort-Service"
}

const regelmassigkeitLabels: Record<string, string> = {
  einmalig: "Einmalig",
  taeglich: "Täglich",
  woechentlich: "Wöchentlich",
  monatlich: "Monatlich",
  individuell: "Individuell"
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
  const getReinigungsartDisplay = () => {
    const art = formData.reinigungsart.hauptkategorie
    const label = reinigungsartLabels[art] || art
    
    if (art === 'sonstiges' && formData.reinigungsart.sonstigesText) {
      return `${label}: ${formData.reinigungsart.sonstigesText}`
    }
    
    return label
  }

  const getObjektTypDisplay = () => {
    const typ = formData.objektTyp.typ
    const label = objektTypLabels[typ] || typ
    
    if (typ === 'sonstiges' && formData.objektTyp.sonstigesText) {
      return `${label}: ${formData.objektTyp.sonstigesText}`
    }
    
    return label
  }

  const getRegelmassigkeitDisplay = () => {
    const art = formData.terminService.regelmassigkeit
    const label = regelmassigkeitLabels[art] || art
    
    if (art === 'individuell' && formData.terminService.individuelleAngabe) {
      return `${label}: ${formData.terminService.individuelleAngabe}`
    }
    
    return label
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
            <motion.div
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-800 mb-4">Ihre Reinigungsanfrage</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Reinigungsart</p>
                    <p className="text-base text-accent">{getReinigungsartDisplay()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Objekttyp</p>
                    <p className="text-base text-accent">{getObjektTypDisplay()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fläche</p>
                    <p className="text-base">{formData.flaecheInfo.flaeche} m²</p>
                  </div>
                  
                  {formData.flaecheInfo.raumanzahl ? (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Raumanzahl</p>
                      <p className="text-base">{formData.flaecheInfo.raumanzahl}</p>
                    </div>
                  ) : null}
                  
                  {formData.flaecheInfo.etagenanzahl ? (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Etagen</p>
                      <p className="text-base">{formData.flaecheInfo.etagenanzahl}</p>
                    </div>
                  ) : null}
                  
                  {formData.flaecheInfo.fensteranzahl ? (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Fensteranzahl</p>
                      <p className="text-base">{formData.flaecheInfo.fensteranzahl}</p>
                    </div>
                  ) : null}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Service-Typ</p>
                    <p className="text-base">{serviceTypLabels[formData.terminService.servicetyp]}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Regelmäßigkeit</p>
                    <p className="text-base">{getRegelmassigkeitDisplay()}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Wunschtermin</p>
                    <p className="text-base">{formatDate(formData.terminService.wunschtermin)}</p>
                  </div>
                  
                  {formData.terminService.wunschzeit ? (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Uhrzeit</p>
                      <p className="text-base">{formData.terminService.wunschzeit} Uhr</p>
                    </div>
                  ) : null}
                </div>
                
                {formData.terminService.anmerkungen && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Anmerkungen zum Termin</p>
                    <p className="text-base text-gray-700">{formData.terminService.anmerkungen}</p>
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div
              className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
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
              transition={{ delay: 0.6, duration: 0.3 }}
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
            Vielen Dank für Ihre Reinigungsanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit Ihrem persönlichen Angebot bei Ihnen melden.
          </p>
          
          {/* Bei Sofort-Service */}
          {formData.terminService.servicetyp === 'sofort' && (
            <div className="bg-accent/10 rounded-lg p-6 mb-8 max-w-xl mx-auto">
              <h3 className="text-lg font-medium text-accent mb-2">SOFORT-SERVICE AKTIVIERT</h3>
              <p className="text-gray-700 mb-4">
                Wir werden uns umgehend telefonisch bei Ihnen melden, um die sofortige Durchführung zu koordinieren.  
              </p>
              <div className="flex items-center justify-center gap-3">
                <PhoneCall className="h-5 w-5 text-accent" />
                <span className="font-medium">{formData.kontakt.telefon}</span>
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
              href="/reinigung"
              className="py-3 px-8 border border-gray-300 text-gray-700 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Weitere Leistungen
            </motion.a>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
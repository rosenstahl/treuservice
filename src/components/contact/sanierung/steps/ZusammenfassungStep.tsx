"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { calculateTotalPrice, formatPrice } from '../utils/priceCalculation'
import { CheckCircle2, AlertCircle, ArrowUpRight, Flame, Droplet, Bug, Clock, Calendar, Building, User, Mail, Phone } from 'lucide-react'

type ZusammenfassungStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  isLastStep?: boolean;
}

export const ZusammenfassungStep: React.FC<ZusammenfassungStepProps> = ({
  formData,
  updateFormData,
  goToPreviousStep
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Berechne den Preis basierend auf den Formulardaten
  useEffect(() => {
    const preis = calculateTotalPrice(formData)
    updateFormData({ preisschaetzung: preis })
  }, [formData, updateFormData])

  const handleSubmit = () => {
    setIsSubmitting(true)
    setError(null)
    
    // Hier würde normalerweise die Datenübermittlung erfolgen
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      // Bei einem Fehler: setError("Es ist ein Fehler aufgetreten...")
    }, 1500)
  }

  // Helper-Funktionen für die Anzeige
  const getSchadensartText = (): string => {
    switch (formData.schadensart) {
      case 'brand': return 'Brandschaden'
      case 'wasser': return 'Wasserschaden'
      case 'schimmel': return 'Schimmelbefall'
      case 'kombi': return 'Kombinierter Schaden'
      case 'sonstige': return formData.schadensartCustom || 'Sonstige Sanierung'
      default: return 'Nicht angegeben'
    }
  }

  const getSchadensartIcon = () => {
    switch (formData.schadensart) {
      case 'brand': return <Flame className="h-5 w-5 text-red-500" />
      case 'wasser': return <Droplet className="h-5 w-5 text-blue-500" />
      case 'schimmel': return <Bug className="h-5 w-5 text-green-600" />
      default: return <AlertCircle className="h-5 w-5 text-gray-500" />
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

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
          Bitte überprüfen Sie Ihre Angaben und schließen Sie Ihre Anfrage ab.
        </motion.p>
      </div>

      {!isSubmitted ? (
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Linke Spalte - Schadensdaten */}
            <div className="space-y-6">
              {/* Schadensart */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  {getSchadensartIcon()}
                  <h3 className="font-medium text-lg ml-2">Schadensart</h3>
                </div>
                <p className="text-gray-800">{getSchadensartText()}</p>
                
                {formData.schadensart === 'brand' && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Verschmutzungsgrad: 
                      <span className="ml-1 font-medium">
                        {formData.details.brandVerschmutzungsgrad === 'leicht' ? 'Leicht' : 
                         formData.details.brandVerschmutzungsgrad === 'mittel' ? 'Mittel' : 'Stark'}
                      </span>
                    </p>
                  </div>
                )}
                
                {formData.schadensart === 'wasser' && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Wasserart: 
                      <span className="ml-1 font-medium">
                        {formData.details.wasserArt === 'sauber' ? 'Sauberes Wasser' : 'Kontaminiertes Wasser'}
                      </span>
                    </p>
                    {formData.details.wasserZeitpunkt && (
                      <p className="text-sm text-gray-600">Zeitpunkt: 
                        <span className="ml-1 font-medium">
                          {new Date(formData.details.wasserZeitpunkt).toLocaleDateString('de-DE')}
                        </span>
                      </p>
                    )}
                  </div>
                )}
                
                {formData.schadensart === 'schimmel' && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Befallene Fläche: 
                      <span className="ml-1 font-medium">
                        {formData.details.schimmelFlaeche} m²
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Objekt */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <Building className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium text-lg ml-2">Objekt & Fläche</h3>
                </div>
                <p className="text-gray-800">{getObjektTypText()}</p>
                <p className="text-sm text-gray-600 mt-1">Betroffene Fläche: 
                  <span className="ml-1 font-medium">{formData.objekt.flaeche} m²</span>
                </p>
                
                {formData.objekt.betroffeneBereiche.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Betroffene Bereiche:</p>
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
              </div>

              {/* Adresse */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-medium text-lg ml-2">Adresse</h3>
                </div>
                <p className="text-gray-800">
                  {formData.adresse.strasse} {formData.adresse.hausnummer}
                </p>
                <p className="text-gray-800">
                  {formData.adresse.plz} {formData.adresse.ort}
                </p>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Etage: <span className="font-medium">{formData.adresse.etage}</span>
                    {formData.adresse.aufzug && <span className="ml-2 text-green-600">(Aufzug vorhanden)</span>}
                  </p>
                </div>
              </div>
            </div>

            {/* Rechte Spalte - Termin, Kontakt und Preis */}
            <div className="space-y-6">
              {/* Terminwunsch */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium text-lg ml-2">Terminwunsch</h3>
                </div>

                <div className="flex items-center">
                  <p className="text-gray-800">
                    {new Date(formData.kontakt.wunschtermin).toLocaleDateString('de-DE')}
                  </p>
                  {formData.kontakt.wunschzeit && (
                    <p className="ml-2 text-gray-800">
                      <Clock className="h-4 w-4 inline-block mr-1" />
                      {formData.kontakt.wunschzeit} Uhr
                    </p>
                  )}
                </div>
                
                {formData.kontakt.bevorzugteKontaktzeit && (
                  <p className="text-sm text-gray-600 mt-1">
                    Bevorzugte Kontaktzeit: 
                    <span className="ml-1 font-medium">
                      {formData.kontakt.bevorzugteKontaktzeit === 'vormittags' ? 'Vormittags (8-12 Uhr)' : 
                       formData.kontakt.bevorzugteKontaktzeit === 'nachmittags' ? 'Nachmittags (12-17 Uhr)' : 
                       'Abends (17-20 Uhr)'}
                    </span>
                  </p>
                )}
              </div>

              {/* Kontaktdaten */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium text-lg ml-2">Kontaktdaten</h3>
                </div>
                <p className="text-gray-800">{formData.kontakt.name}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-1" />
                    {formData.kontakt.email}
                  </p>
                  <p className="text-sm flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-1" />
                    {formData.kontakt.telefon}
                  </p>
                </div>
              </div>

              {/* Preisschätzung */}
              <div className="bg-white p-5 rounded-lg border-2 border-accent/20 shadow-sm">
                <div className="flex items-center mb-3">
                  <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-medium text-lg ml-2">Preisindikation</h3>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Geschätzter Preis:</p>
                  <p className="text-2xl font-bold text-accent">
                    {formatPrice(formData.preisschaetzung)}
                  </p>
                </div>
                
                <div className="mt-3 text-xs text-gray-500">
                  <p>
                    Dies ist eine unverbindliche Preisindikation basierend auf Ihren Angaben.
                    Der endgültige Preis kann nach einer detaillierten Vor-Ort-Begutachtung variieren.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Datenschutzhinweis und Buttons */}
          <div className="mt-8 space-y-6">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600">
              <p>
                Mit dem Absenden dieses Formulars willigen Sie ein, dass wir Ihre Daten zur Bearbeitung Ihrer Anfrage
                und zur Kontaktaufnahme verwenden dürfen. Weitere Informationen finden Sie in unserer Datenschutzerklärung.
              </p>
            </div>
            
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                <p className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {error}
                </p>
              </div>
            )}
            
            <div className="flex justify-between">
              <motion.button
                onClick={goToPreviousStep}
                className="py-3 px-6 bg-gray-100 rounded-md text-gray-800 font-medium hover:bg-gray-200 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Zurück
              </motion.button>

              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`py-3 px-8 rounded-md font-medium transition-all duration-200 
                  bg-accent text-white hover:bg-accent-dark transform hover:scale-[1.03] hover:shadow-md
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
                `}
                whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                whileTap={!isSubmitting ? { scale: 0.97 } : {}}
              >
                {isSubmitting ? 'Wird gesendet...' : 'Anfrage absenden'}
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md border border-green-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Vielen Dank für Ihre Anfrage!</h3>
            <p className="text-gray-600 mb-6">
              Wir haben Ihre Informationen erhalten und werden uns schnellstmöglich mit Ihnen in Verbindung setzen,
              um einen Termin zu vereinbaren.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-medium">Ihre Referenznummer:</span>{' '}
                <span className="font-mono bg-white px-2 py-1 rounded border">
                  SAN-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                Eine Bestätigung wurde an <span className="font-medium">{formData.kontakt.email}</span> gesendet.
              </p>
            </div>
            
            <a 
              href="#" 
              className="inline-flex items-center text-accent hover:text-accent-dark font-medium transition-colors"
            >
              Zurück zur Startseite
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
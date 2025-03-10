"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntkernungWizard'
import { 
  ArrowLeft,
  Check,
  AlertTriangle,
  Calendar,
  Home,
  Building,
  Factory,
  Landmark,
  PenTool,
  Clock,
  Hammer,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Loader2
} from 'lucide-react'

type ZusammenfassungStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  isLastStep: boolean;
}

export const ZusammenfassungStep: React.FC<ZusammenfassungStepProps> = ({ 
  formData, 
  goToPreviousStep
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = () => {
    setIsSubmitting(true)
    setSubmitError('')
    
    // Hier würde normalerweise ein API-Aufruf erfolgen
    setTimeout(() => {
      // Simuliere erfolgreiche Übermittlung
      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Simuliere Fehler (für Testzwecke auskommentiert)
      // setIsSubmitting(false)
      // setSubmitError('Es ist ein Fehler bei der Übermittlung aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.')
    }, 2000)
  }

  // Icon je nach Objekttyp auswählen
  const getObjektIcon = () => {
    switch (formData.objektTyp) {
      case 'wohnung':
      case 'haus':
        return <Home className="h-5 w-5" />
      case 'gewerbe':
        return <Building className="h-5 w-5" />
      case 'industriegebaeude':
        return <Factory className="h-5 w-5" />
      case 'oeffentlichesgebaeude':
        return <Landmark className="h-5 w-5" />
      default:
        return <PenTool className="h-5 w-5" />
    }
  }

  // Objekttyp für die Anzeige formatieren
  const formatObjektTyp = (typ: string) => {
    switch (typ) {
      case 'wohnung':
        return 'Wohnung'
      case 'haus':
        return 'Haus'
      case 'gewerbe':
        return 'Gewerbeimmobilie'
      case 'industriegebaeude':
        return 'Industriegebäude'
      case 'oeffentlichesgebaeude':
        return 'Öffentliches Gebäude'
      case 'sonstiges':
        return 'Sonstiges'
      default:
        return typ
    }
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
              Bitte überprüfen Sie Ihre Angaben und senden Sie Ihre Anfrage ab.
            </motion.p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm divide-y divide-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {/* Objekt und Umfang */}
              <div className="pb-6">
                <h3 className="font-medium text-lg mb-4">Objekt und Umfang</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    {getObjektIcon()}
                    <div>
                      <p className="text-sm font-medium">Objekttyp</p>
                      <p className="text-sm text-gray-600">{formatObjektTyp(formData.objektTyp)}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Hammer className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">Umfang</p>
                      <p className="text-sm text-gray-600">
                        {formData.umfang.komplettEntkernung ? 'Komplette Entkernung' : 'Selektiver Rückbau'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Home className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">Fläche</p>
                      <p className="text-sm text-gray-600">{formData.objektDetails.flaeche} m²</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">Stockwerke</p>
                      <p className="text-sm text-gray-600">{formData.objektDetails.stockwerke}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Schadstoffe */}
              <div className="py-6">
                <h3 className="font-medium text-lg mb-4">Schadstoffe</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.schadstoffoptionen.unbekannt ? (
                    <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Keine bekannten / Analyse erforderlich
                    </div>
                  ) : (
                    <>
                      {formData.schadstoffoptionen.asbest && (
                        <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">Asbest</div>
                      )}
                      {formData.schadstoffoptionen.pcb && (
                        <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">PCB</div>
                      )}
                      {formData.schadstoffoptionen.kmf && (
                        <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">KMF</div>
                      )}
                      {formData.schadstoffoptionen.schimmel && (
                        <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">Schimmel</div>
                      )}
                      {formData.schadstoffoptionen.holzschutz && (
                        <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">Holzschutzmittel</div>
                      )}
                      {!formData.schadstoffoptionen.asbest &&
                        !formData.schadstoffoptionen.pcb &&
                        !formData.schadstoffoptionen.kmf &&
                        !formData.schadstoffoptionen.schimmel &&
                        !formData.schadstoffoptionen.holzschutz && (
                        <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">Keine ausgewählt</div>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              {/* Zusatzoptionen */}
              <div className="py-6">
                <h3 className="font-medium text-lg mb-4">Zusatzoptionen</h3>
                <div className="flex flex-wrap gap-2">
                  {formData.zusatzoptionen.entsorgung && (
                    <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">Entsorgung & Recycling</div>
                  )}
                  {formData.zusatzoptionen.beratung && (
                    <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">Beratung & Planung</div>
                  )}
                  {formData.zusatzoptionen.statikPruefung && (
                    <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">Statikprüfung</div>
                  )}
                  {formData.zusatzoptionen.behoerdengaenge && (
                    <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">Behördengänge</div>
                  )}
                  {!formData.zusatzoptionen.entsorgung &&
                    !formData.zusatzoptionen.beratung &&
                    !formData.zusatzoptionen.statikPruefung &&
                    !formData.zusatzoptionen.behoerdengaenge && (
                    <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">Keine ausgewählt</div>
                  )}
                </div>
              </div>
              
              {/* Adresse und Termin */}
              <div className="py-6">
                <h3 className="font-medium text-lg mb-4">Adresse und Termin</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">Objektadresse</p>
                      <p className="text-sm text-gray-600">
                        {formData.adresseTermin.strasse} {formData.adresseTermin.hausnummer}
                        <br />
                        {formData.adresseTermin.plz} {formData.adresseTermin.ort}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">Wunschtermin</p>
                      <p className="text-sm text-gray-600">{new Date(formData.adresseTermin.wunschtermin).toLocaleDateString('de-DE')}</p>
                      {formData.adresseTermin.alternativtermin && (
                        <p className="text-sm text-gray-600">
                          Alternative: {new Date(formData.adresseTermin.alternativtermin).toLocaleDateString('de-DE')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Kontaktdaten */}
              <div className="py-6">
                <h3 className="font-medium text-lg mb-4">Kontaktdaten</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-gray-600">{formData.kontakt.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">E-Mail</p>
                      <p className="text-sm text-gray-600">{formData.kontakt.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium">Telefon</p>
                      <p className="text-sm text-gray-600">{formData.kontakt.telefon}</p>
                    </div>
                  </div>
                  {formData.kontakt.nachricht && (
                    <div className="flex items-start space-x-3 md:col-span-2">
                      <MessageSquare className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-medium">Nachricht</p>
                        <p className="text-sm text-gray-600">{formData.kontakt.nachricht}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Kostenvoranschlag */}
              <div className="pt-6">
                <h3 className="font-medium text-lg mb-4">Unverbindlicher Kostenvoranschlag</h3>
                <div className="bg-accent/5 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">Geschätzte Kosten für Ihre Entkernung:</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Basierend auf Ihren Angaben, ohne Gewähr
                      </p>
                    </div>
                    <div className="text-xl font-bold text-accent">
                      {formData.preisschaetzung.toLocaleString('de-DE')} €
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Dies ist ein unverbindlicher Kostenvoranschlag. Der endgültige Preis kann nach einer detaillierten Besichtigung variieren.
                </p>
              </div>
            </motion.div>
            
            {submitError && (
              <motion.div
                className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 flex items-start"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p>{submitError}</p>
              </motion.div>
            )}
            
            <motion.div 
              className="flex justify-between mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <motion.button
                onClick={goToPreviousStep}
                className="py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 text-gray-600 flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Zurück
              </motion.button>
              
              <motion.button
                onClick={handleSubmit}
                className={`py-3 px-8 rounded-md font-medium bg-accent text-white flex items-center
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-accent/90'}`}
                whileHover={!isSubmitting ? { scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    Anfrage absenden
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </>
      ) : (
        <motion.div
          className="max-w-2xl mx-auto text-center bg-white p-8 rounded-xl shadow-lg border border-green-100"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Vielen Dank für Ihre Anfrage!
          </h2>
          
          <p className="text-gray-600 mb-6">
            Wir haben Ihre Anfrage zur Entkernung erhalten und werden uns innerhalb von 24 Stunden mit Ihnen in Verbindung setzen.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg text-left mb-6">
            <div className="font-medium mb-2">Ihre Anfragenummer:</div>
            <div className="text-xl text-accent font-mono">{`ENT-${Math.floor(100000 + Math.random() * 900000)}`}</div>
          </div>
          
          <p className="text-sm text-gray-500">
            Falls Sie Fragen haben oder weitere Informationen benötigen, 
            können Sie uns jederzeit unter <span className="text-accent">info@treu-service.de</span> oder <span className="text-accent">+49 (0) 123 456789</span> kontaktieren.
          </p>
          
          <motion.a
            href="/"
            className="mt-8 inline-block py-3 px-8 rounded-md font-medium bg-accent text-white hover:bg-accent/90"
            whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.97 }}
          >
            Zurück zur Startseite
          </motion.a>
        </motion.div>
      )}
    </motion.div>
  )
}

const MapPin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const MessageSquare = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)
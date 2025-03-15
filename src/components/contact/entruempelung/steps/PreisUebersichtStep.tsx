"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntruempelungWizard'
import { HiCheck, HiX } from 'react-icons/hi'

type PreisUebersichtStepProps = {
  formData: FormData
  updateFormData: (newData: Partial<FormData>) => void
  goToPreviousStep: () => void
  isLastStep: boolean
}

export const PreisUebersichtStep: React.FC<PreisUebersichtStepProps> = ({
  formData,
  updateFormData,
  goToPreviousStep,
  isLastStep
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [datenschutzAccepted, setDatenschutzAccepted] = useState(true)

  // Objekttyp als lesbare Bezeichnung
  const getObjektTypLabel = (type: FormData['objektTyp']) => {
    switch(type) {
      case 'wohnung': return 'Wohnung'
      case 'haus': return 'Haus'
      case 'keller': return 'Keller'
      case 'dachboden': return 'Dachboden'
      case 'gewerbe': return 'Gewerbeimmobilie'
      case 'sonstiges': return formData.objektTypCustom || 'Sonstiges'
      default: return 'Nicht angegeben'
    }
  }

  // Füllgrad als lesbare Bezeichnung
  const getFuellgradLabel = (fuellgrad: FormData['umfangGroesse']['fuellgrad']) => {
    switch(fuellgrad) {
      case 'leer': return 'Nahezu leer'
      case 'wenig': return 'Wenig befüllt'
      case 'mittel': return 'Mittel befüllt'
      case 'voll': return 'Stark befüllt'
      default: return 'Nicht angegeben'
    }
  }

  // Parkmöglichkeit als lesbare Bezeichnung
  const getParkmoeglichkeitLabel = (parkmoeglichkeit: FormData['adresseZugang']['parkmoeglichkeit']) => {
    switch(parkmoeglichkeit) {
      case 'gut': return 'Gut (direkt vor dem Gebäude)'
      case 'eingeschraenkt': return 'Eingeschränkt (in der Nähe)'
      case 'keine': return 'Keine/Schwierig'
      default: return 'Nicht angegeben'
    }
  }

  // Etage als lesbare Bezeichnung
  const getEtageLabel = (etage: number) => {
    return etage === 0 ? 'Erdgeschoss' : `${etage}. Etage`
  }

  // Entrümpelungsarten, die ausgewählt wurden
  const getSelectedEntrumpelungsarten = () => {
    const arten = []
    if (formData.entrumpelungsart.moebel) arten.push('Möbel')
    if (formData.entrumpelungsart.elektrogeraete) arten.push('Elektrogeräte')
    if (formData.entrumpelungsart.sperrmuell) arten.push('Sperrmüll')
    if (formData.entrumpelungsart.bauschutt) arten.push('Bauschutt')
    if (formData.entrumpelungsart.sondermuell) arten.push('Sondermüll')
    if (formData.entrumpelungsart.sonstiges && formData.entrumpelungsart.sonstigesText) {
      arten.push(`Sonstiges: ${formData.entrumpelungsart.sonstigesText}`)
    }
    return arten.length > 0 ? arten.join(', ') : 'Keine Angabe'
  }

  // Generiere E-Mail-Text für die Anfrage
  const generateEmailBody = () => {
    const anfrageNr = Math.floor(100000 + Math.random() * 900000)
    
    return `\nNeue Entrümpelungsanfrage (#${anfrageNr}) eingegangen\n\nKontaktdaten:\nName: ${formData.terminKontakt.name}\nE-Mail: ${formData.terminKontakt.email}\nTelefon: ${formData.terminKontakt.telefon}\nWunschtermin: ${new Date(formData.terminKontakt.wunschtermin).toLocaleDateString('de-DE')}\n\nObjektdetails:\nObjekttyp: ${getObjektTypLabel(formData.objektTyp)}\n${formData.objektTyp === 'sonstiges' ? `Beschreibung: ${formData.objektTypCustom}` : ''}\nGröße: ${formData.umfangGroesse.flaeche} m², ${formData.umfangGroesse.raumanzahl} ${formData.umfangGroesse.raumanzahl === 1 ? 'Raum' : 'Räume'}\nFüllgrad: ${getFuellgradLabel(formData.umfangGroesse.fuellgrad)}\n\nZu entrümpelnde Gegenstände:\n${getSelectedEntrumpelungsarten()}\n\nAdresse:\n${formData.adresseZugang.strasse} ${formData.adresseZugang.hausnummer}\n${formData.adresseZugang.plz} ${formData.adresseZugang.ort}\n\nZugangsinformationen:\nEtage: ${getEtageLabel(formData.adresseZugang.etage)}\nAufzug: ${formData.adresseZugang.aufzug ? 'Vorhanden' : 'Nicht vorhanden'}\nParkmöglichkeit: ${getParkmoeglichkeitLabel(formData.adresseZugang.parkmoeglichkeit)}\n\nZusatzleistungen:\nEndreinigung: ${formData.zusatzleistungen.reinigung ? 'Ja' : 'Nein'}\nEntsorgungsnachweis: ${formData.zusatzleistungen.entsorgungsnachweis ? 'Ja' : 'Nein'}\n\nDiese Anfrage wurde über das Kontaktformular der Website gesendet.\n    `
  }

  const handleSubmit = async () => {
    if (!datenschutzAccepted) {
      setError('Bitte stimmen Sie den Datenschutzbestimmungen zu')
      return
    }
    
    try {
      setIsSubmitting(true)
      setError(null)
      
      // Hier würde der tatsächliche E-Mail-Versand stattfinden
      // In dieser Demo simulieren wir den Versand
      
      // In einer realen Implementierung könnte hier ein API-Aufruf zum Senden der E-Mail erfolgen
      // zum Beispiel:
      /*
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'info@treuservice.com',
          subject: 'Neue Entrümpelungsanfrage',
          body: generateEmailBody(),
          from: formData.terminKontakt.email,
          name: formData.terminKontakt.name
        }),
      })
      
      if (!response.ok) {
        throw new Error('Fehler beim Senden der E-Mail')
      }
      */
      
      // Simulation eines API-Aufrufs
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('E-Mail würde gesendet werden an: info@treuservice.com')
      console.log('E-Mail-Text:', generateEmailBody())
      
      // Erfolgsfall
      setIsSubmitted(true)
      setIsSubmitting(false)
      
    } catch (err) {
      setIsSubmitting(false)
      setError('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.')
      console.error('Fehler beim Senden der Anfrage:', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isSubmitted ? (
        // Erfolgsmeldung nach Absenden
        <div className="text-center space-y-4">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <HiCheck className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900">Vielen Dank für Ihre Anfrage!</h2>
          <p className="text-gray-500">
            Wir haben Ihre Anfrage erfolgreich erhalten und werden uns innerhalb 
            der nächsten 24 Stunden bei Ihnen melden.
          </p>
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700">
              Ihre Anfragenummer: <span className="font-bold">{Math.floor(100000 + Math.random() * 900000)}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Bitte bewahren Sie diese Nummer für Rückfragen auf.
            </p>
          </div>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Neue Anfrage stellen
            </button>
          </div>
        </div>
      ) : (
        // Zusammenfassung
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-medium text-gray-900">Übersicht Ihrer Anfrage</h2>
            <p className="mt-2 text-sm text-gray-500">
              Prüfen Sie Ihre Angaben und senden Sie Ihre Anfrage ab
            </p>
          </div>

          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ihre Angaben</h3>
            
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Objekttyp</dt>
                <dd className="mt-1 text-sm text-gray-900">{getObjektTypLabel(formData.objektTyp)}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Umfang & Größe</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formData.umfangGroesse.flaeche} m², {formData.umfangGroesse.raumanzahl} {formData.umfangGroesse.raumanzahl === 1 ? 'Raum' : 'Räume'}, {getFuellgradLabel(formData.umfangGroesse.fuellgrad)}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Entrümpelungsart</dt>
                <dd className="mt-1 text-sm text-gray-900">{getSelectedEntrumpelungsarten()}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Adresse</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formData.adresseZugang.strasse} {formData.adresseZugang.hausnummer}, {formData.adresseZugang.plz} {formData.adresseZugang.ort}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Zugang</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {getEtageLabel(formData.adresseZugang.etage)}, 
                  {formData.adresseZugang.aufzug ? ' Aufzug vorhanden' : ' Kein Aufzug'}, 
                  Parkmöglichkeit: {getParkmoeglichkeitLabel(formData.adresseZugang.parkmoeglichkeit)}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Wunschtermin</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(formData.terminKontakt.wunschtermin).toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Kontakt</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formData.terminKontakt.name}, {formData.terminKontakt.email}, {formData.terminKontakt.telefon}
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Zusatzleistungen</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formData.zusatzleistungen.reinigung ? '✓ ' : '✗ '}Endreinigung
                  <br />
                  {formData.zusatzleistungen.entsorgungsnachweis ? '✓ ' : '✗ '}Entsorgungsnachweis
                </dd>
              </div>
            </dl>
            
            <div className="mt-4">
              <button
                type="button"
                onClick={goToPreviousStep}
                className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
              >
                Angaben bearbeiten
              </button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <HiX className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Fehler</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-8 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="datenschutz"
                  name="datenschutz"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={datenschutzAccepted}
                  onChange={(e) => setDatenschutzAccepted(e.target.checked)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="datenschutz" className="font-medium text-gray-700">
                  Datenschutzerklärung
                </label>
                <p className="text-gray-500">
                  Ich habe die Datenschutzerklärung gelesen und stimme der Verarbeitung meiner Daten zu.
                </p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={goToPreviousStep}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Zurück
              </button>
              
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !datenschutzAccepted}
                className={`
                  px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  ${isSubmitting || !datenschutzAccepted
                    ? 'bg-blue-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                  }
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Wird gesendet...
                  </>
                ) : 'Anfrage absenden'}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
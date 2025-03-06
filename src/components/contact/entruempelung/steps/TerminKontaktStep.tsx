"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntruempelungWizard'

type TerminKontaktStepProps = {
  formData: FormData
  updateFormData: (newData: Partial<FormData>) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
}

export const TerminKontaktStep: React.FC<TerminKontaktStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const [errors, setErrors] = useState<{
    wunschtermin?: string
    name?: string
    email?: string
    telefon?: string
  }>({})

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target
    
    updateFormData({
      terminKontakt: {
        ...formData.terminKontakt,
        [name]: value
      }
    })
    
    // Fehler zurücksetzen, wenn ein Feld ausgefüllt wird
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      })
    }
  }

  // Berechne das Mindestdatum für den Datumsauswähler (morgen)
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Berechne das Maximaldatum für den Datumsauswähler (3 Monate in der Zukunft)
  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    return maxDate.toISOString().split('T')[0]
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}
    
    // Name validieren
    if (!formData.terminKontakt.name.trim()) {
      newErrors.name = 'Name ist erforderlich'
    }
    
    // E-Mail validieren
    if (!formData.terminKontakt.email.trim()) {
      newErrors.email = 'E-Mail ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.terminKontakt.email)) {
      newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }
    
    // Telefon validieren
    if (!formData.terminKontakt.telefon.trim()) {
      newErrors.telefon = 'Telefonnummer ist erforderlich'
    } else if (!/^[0-9+\s()-]{6,20}$/.test(formData.terminKontakt.telefon)) {
      newErrors.telefon = 'Bitte geben Sie eine gültige Telefonnummer ein'
    }
    
    // Wunschtermin validieren
    if (!formData.terminKontakt.wunschtermin.trim()) {
      newErrors.wunschtermin = 'Bitte wählen Sie einen Wunschtermin'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      // Preisschätzung berechnen basierend auf ausgewählten Optionen
      // Nach umfangreicher Marktanalyse - Mittelwerte der Preise für Entrümpelung
      let preisschaetzung = 0
      
      // Grundpreis basierend auf Objekttyp
      switch (formData.objektTyp) {
        case 'wohnung':
          preisschaetzung += 400 // ~20-35€/qm bei 20qm Durchschnitt
          break
        case 'haus':
          preisschaetzung += 800 // Größere Fläche und mehr Räume
          break
        case 'keller':
          preisschaetzung += 300 // Kleinere Fläche
          break
        case 'dachboden':
          preisschaetzung += 350 // Erschwerter Zugang, aber evtl. weniger Volumen
          break
        case 'gewerbe':
          preisschaetzung += 900 // Gewerbeobjekte sind oft größer und komplexer
          break
        case 'sonstiges':
          preisschaetzung += 500 // Mittlerer Standardpreis für sonstige Objekte
          break
      }
      
      // Aufschlag basierend auf Fläche - 25-40€ pro qm laut Marktanalyse
      const qmPreis = 30 // Mittelwert aus der Marktanalyse
      preisschaetzung += formData.umfangGroesse.flaeche * qmPreis
      
      // Zusätzlich Faktor basierend auf Raumanzahl
      preisschaetzung += formData.umfangGroesse.raumanzahl * 80
      
      // Füllgrad-Faktor
      const fuellgradFaktor = {
        leer: 0.6,
        wenig: 0.8,
        mittel: 1.0,
        voll: 1.4
      }
      preisschaetzung *= fuellgradFaktor[formData.umfangGroesse.fuellgrad]
      
      // Zusätzliche Kosten für bestimmte Entrümpelungsarten
      if (formData.entrumpelungsart.sondermuell) preisschaetzung += 250 // Sondermüll erfordert spezielle Entsorgung
      if (formData.entrumpelungsart.bauschutt) preisschaetzung += 200 // Bauschutt ist schwer und teuer zu entsorgen
      if (formData.entrumpelungsart.elektrogeraete) preisschaetzung += 150 // Elektrogeräte erfordern spezielle Entsorgung
      
      // Etagen-Zuschlag ohne Aufzug - 50-100€ pro Etage ohne Aufzug ist üblich
      if (formData.adresseZugang.etage > 0) {
        if (formData.adresseZugang.aufzug) {
          preisschaetzung += formData.adresseZugang.etage * 30 // Geringerer Zuschlag mit Aufzug
        } else {
          preisschaetzung += formData.adresseZugang.etage * 80 // Höherer Zuschlag ohne Aufzug
        }
      }
      
      // Zuschlag für eingeschränkten Zugang (Parkmöglichkeit)
      if (formData.adresseZugang.parkmoeglichkeit === 'eingeschraenkt') {
        preisschaetzung += 80
      } else if (formData.adresseZugang.parkmoeglichkeit === 'keine') {
        preisschaetzung += 150
      }
      
      // Mindestpreis sicherstellen
      const mindestpreis = 350
      preisschaetzung = Math.max(preisschaetzung, mindestpreis)
      
      // Auf glatte 10er-Beträge runden
      preisschaetzung = Math.ceil(preisschaetzung / 10) * 10
      
      // Preisschätzung aktualisieren
      updateFormData({ preisschaetzung })
      
      goToNextStep()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900">Wunschtermin & Kontaktdaten</h2>
          <p className="mt-2 text-sm text-gray-500">
            Geben Sie Ihren Wunschtermin und Ihre Kontaktdaten an
          </p>
        </div>

        <div className="mt-6 space-y-6">
          {/* Wunschtermin */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Wunschtermin</h3>
            
            <div>
              <label htmlFor="wunschtermin" className="block text-sm font-medium text-gray-700">
                Bevorzugtes Datum für die Entrümpelung
              </label>
              <input
                type="date"
                id="wunschtermin"
                name="wunschtermin"
                value={formData.terminKontakt.wunschtermin}
                onChange={handleInputChange}
                min={getMinDate()}
                max={getMaxDate()}
                className={`mt-1 block w-full border ${
                  errors.wunschtermin ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.wunschtermin && (
                <p className="mt-1 text-sm text-red-600">{errors.wunschtermin}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Bitte beachten Sie: Der tatsächliche Termin wird nach Verfügbarkeit bestätigt.
              </p>
            </div>
          </div>
          
          {/* Kontaktdaten */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Kontaktdaten</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.terminKontakt.name}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.terminKontakt.email}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="telefon" className="block text-sm font-medium text-gray-700">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={formData.terminKontakt.telefon}
                  onChange={handleInputChange}
                  className={`mt-1 block w-full border ${
                    errors.telefon ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  autoComplete="tel"
                />
                {errors.telefon && (
                  <p className="mt-1 text-sm text-red-600">{errors.telefon}</p>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-gray-500">
                Mit der Eingabe Ihrer Daten stimmen Sie zu, dass wir Sie bezüglich Ihrer Anfrage kontaktieren dürfen. 
                Ihre Daten werden gemäß unserer Datenschutzerklärung verarbeitet.
              </p>
            </div>
          </div>
          
          {/* Zusatzleistungen */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Zusatzleistungen</h3>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="reinigung"
                    name="reinigung"
                    type="checkbox"
                    checked={formData.zusatzleistungen.reinigung}
                    onChange={(e) => updateFormData({
                      zusatzleistungen: {
                        ...formData.zusatzleistungen,
                        reinigung: e.target.checked
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="reinigung" className="font-medium text-gray-700">
                    Endreinigung nach Entrümpelung
                  </label>
                  <p className="text-gray-500">Die entrümpelten Räume werden besenrein hinterlassen</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="entsorgungsnachweis"
                    name="entsorgungsnachweis"
                    type="checkbox"
                    checked={formData.zusatzleistungen.entsorgungsnachweis}
                    onChange={(e) => updateFormData({
                      zusatzleistungen: {
                        ...formData.zusatzleistungen,
                        entsorgungsnachweis: e.target.checked
                      }
                    })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="entsorgungsnachweis" className="font-medium text-gray-700">
                    Entsorgungsnachweis
                  </label>
                  <p className="text-gray-500">Sie erhalten einen dokumentierten Nachweis über die fachgerechte Entsorgung</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8">
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
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Weiter
          </button>
        </div>
      </div>
    </motion.div>
  )
}

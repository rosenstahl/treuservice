"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { CheckCircle2, AlertCircle, ArrowUpRight, Flame, Droplet, Bug, Clock, Calendar, Building, User, Mail, Phone } from 'lucide-react'

type KontaktZusammenfassungStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  isLastStep?: boolean;
}

export const KontaktZusammenfassungStep: React.FC<KontaktZusammenfassungStepProps> = ({
  formData,
  updateFormData,
  goToPreviousStep
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isValid, setIsValid] = useState(false)
  
  useEffect(() => {
    // Check if contact info is valid
    const kontakt = formData.kontakt
    setIsValid(
      !!kontakt.name.trim() && 
      !!kontakt.email.trim() && 
      isValidEmail(kontakt.email)
    )
  }, [formData.kontakt])

  const isValidEmail = (email: string): boolean => {
    // Einfache E-Mail-Validierung
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    updateFormData({
      kontakt: {
        ...formData.kontakt,
        [name]: value
      }
    })
  }

  const handleKontaktzeitChange = (value: FormData['kontakt']['bevorzugteKontaktzeit']) => {
    updateFormData({
      kontakt: {
        ...formData.kontakt,
        bevorzugteKontaktzeit: value
      }
    })
  }

  // Berechne das Morgen-Datum für den Standard-Wunschtermineintrag
  const getTomorrowDate = (): string => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Setze den Standardwert für den Wunschtermin, wenn keiner vorhanden ist
  useEffect(() => {
    if (!formData.kontakt.wunschtermin) {
      updateFormData({
        kontakt: {
          ...formData.kontakt,
          wunschtermin: getTomorrowDate()
        }
      })
    }
  }, [formData.kontakt, updateFormData])

  const handleSubmit = () => {
    if (!isValid) return;
    
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
          Kontakt & Zusammenfassung
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte geben Sie Ihre Kontaktdaten ein und überprüfen Sie Ihre Angaben.
        </motion.p>
      </div>

      {!isSubmitted ? (
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Linke Spalte - Kontaktdaten */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium text-lg ml-2">Terminwunsch</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="wunschtermin">Datum</Label>
                    <div className="flex items-center mt-1">
                      <Input
                        id="wunschtermin"
                        name="wunschtermin"
                        type="date"
                        value={formData.kontakt.wunschtermin}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="wunschzeit">Uhrzeit (optional)</Label>
                    <div className="flex items-center mt-1">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <Input
                        id="wunschzeit"
                        name="wunschzeit"
                        type="time"
                        value={formData.kontakt.wunschzeit}
                        onChange={handleChange}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <h3 className="font-medium text-lg ml-2">Ihre Kontaktdaten</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center">
                      <span>Name *</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.kontakt.name}
                      onChange={handleChange}
                      placeholder="Vor- und Nachname"
                      className="w-full mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="h-4 w-4 mr-1 text-gray-500" />
                      <span>E-Mail *</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.kontakt.email}
                      onChange={handleChange}
                      placeholder="mustermail@beispiel.de"
                      className={`w-full mt-1 ${
                        formData.kontakt.email && !isValidEmail(formData.kontakt.email)
                          ? 'border-red-500 focus:ring-red-500'
                          : ''
                      }`}
                      required
                    />
                    {formData.kontakt.email && !isValidEmail(formData.kontakt.email) && (
                      <p className="text-xs text-red-500 mt-1">
                        Bitte geben Sie eine gültige E-Mail-Adresse ein.
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="telefon" className="flex items-center">
                      <Phone className="h-4 w-4 mr-1 text-gray-500" />
                      <span>Telefon *</span>
                    </Label>
                    <Input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      value={formData.kontakt.telefon}
                      onChange={handleChange}
                      placeholder="+49 123 45678901"
                      className="w-full mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Bevorzugte Kontaktzeit</Label>
                    <RadioGroup
                      value={formData.kontakt.bevorzugteKontaktzeit}
                      onValueChange={(value) => handleKontaktzeitChange(value as FormData['kontakt']['bevorzugteKontaktzeit'])}
                      className="space-y-2 mt-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vormittags" id="zeit-vormittags" />
                        <Label htmlFor="zeit-vormittags" className="cursor-pointer">Vormittags (8-12 Uhr)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="nachmittags" id="zeit-nachmittags" />
                        <Label htmlFor="zeit-nachmittags" className="cursor-pointer">Nachmittags (12-17 Uhr)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="abends" id="zeit-abends" />
                        <Label htmlFor="zeit-abends" className="cursor-pointer">Abends (17-20 Uhr)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="anmerkungen">Zusätzliche Anmerkungen</Label>
                    <Textarea
                      id="anmerkungen"
                      name="anmerkungen"
                      value={formData.kontakt.anmerkungen}
                      onChange={handleChange}
                      placeholder="Haben Sie weitere Informationen oder Fragen? Teilen Sie uns diese gerne mit."
                      className="w-full mt-1 h-24"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rechte Spalte - Zusammenfassung */}
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
                disabled={isSubmitting || !isValid}
                className={`py-3 px-8 rounded-md font-medium transition-all duration-200 
                  ${isValid ? 'bg-accent text-white hover:bg-accent-dark transform hover:scale-[1.03] hover:shadow-md' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}
                  ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
                `}
                whileHover={isValid && !isSubmitting ? { scale: 1.03 } : {}}
                whileTap={isValid && !isSubmitting ? { scale: 0.97 } : {}}
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
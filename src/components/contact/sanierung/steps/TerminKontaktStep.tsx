"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react'

type TerminKontaktStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const TerminKontaktStep: React.FC<TerminKontaktStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const [isValid, setIsValid] = useState(false)
  
  useEffect(() => {
    // Prüfen, ob der Schritt vollständig ist
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
          Termin und Kontakt
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte geben Sie Ihren Wunschtermin und Ihre Kontaktdaten an.
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Wunschtermin */}
        <div className="p-5 border border-gray-200 rounded-lg mb-6 bg-gray-50">
          <div className="flex items-center mb-4">
            <Calendar className="mr-2 h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium">Wunschtermin</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Datum */}
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

            {/* Uhrzeit */}
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
          
          <p className="text-xs text-gray-500 mt-4">
            Hinweis: Der Wunschtermin ist unverbindlich. Wir werden uns mit Ihnen zur Terminbestätigung in Verbindung setzen.
          </p>
        </div>

        {/* Kontaktdaten */}
        <div className="p-5 border border-gray-200 rounded-lg mb-6">
          <div className="flex items-center mb-4">
            <User className="mr-2 h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium">Ihre Kontaktdaten</h3>
          </div>

          <div className="space-y-4">
            {/* Name */}
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

            {/* Email */}
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

            {/* Telefon */}
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

            {/* Bevorzugte Kontaktzeit */}
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
          </div>
        </div>

        {/* Zusätzliche Anmerkungen */}
        <div className="mb-6">
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

      {/* Navigation */}
      <div className="flex justify-between max-w-2xl mx-auto">
        <motion.button
          onClick={goToPreviousStep}
          className="py-3 px-6 bg-gray-100 rounded-md text-gray-800 font-medium hover:bg-gray-200 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Zurück
        </motion.button>

        <motion.button
          onClick={goToNextStep}
          disabled={!isValid}
          className={`py-3 px-8 rounded-md font-medium transition-all duration-200 ${
            isValid
              ? 'bg-accent text-white hover:bg-accent-dark transform hover:scale-[1.03] hover:shadow-md'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={isValid ? { scale: 1.03 } : {}}
          whileTap={isValid ? { scale: 0.97 } : {}}
        >
          Weiter
        </motion.button>
      </div>
    </motion.div>
  )
}
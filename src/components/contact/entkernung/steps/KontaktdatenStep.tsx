"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntkernungWizard'
import { 
  ArrowLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react'

type KontaktdatenStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const KontaktdatenStep: React.FC<KontaktdatenStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [kontakt, setKontakt] = useState({
    name: formData.kontakt.name || '',
    email: formData.kontakt.email || '',
    telefon: formData.kontakt.telefon || '',
    nachricht: formData.kontakt.nachricht || ''
  })
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    telefon: '',
    nachricht: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setKontakt(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Fehler zurücksetzen wenn ein Feld ausgefüllt wird
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    
    updateFormData({
      kontakt: {
        ...formData.kontakt,
        [name]: value
      }
    })
  }

  const validateForm = () => {
    const newErrors = {
      name: !kontakt.name ? 'Bitte geben Sie Ihren Namen ein' : '',
      email: !kontakt.email ? 'Bitte geben Sie Ihre E-Mail ein' : !isValidEmail(kontakt.email) ? 'Bitte geben Sie eine gültige E-Mail ein' : '',
      telefon: !kontakt.telefon ? 'Bitte geben Sie Ihre Telefonnummer ein' : '',
      nachricht: ''
    }
    
    setErrors(newErrors)
    
    // Prüfen ob alle erforderlichen Felder ausgefüllt sind
    return !Object.values(newErrors).some(error => error !== '')
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleContinue = () => {
    if (validateForm()) {
      // Berechnung des Preises basierend auf ausgewählten Optionen
      const basePrice = calculatePrice(formData)
      updateFormData({ preisschaetzung: basePrice })
      goToNextStep()
    }
  }

  // Einfache Preisberechnung (für die Demonstration - in der Realität würde dies komplexer sein)
  const calculatePrice = (data: FormData) => {
    let basePrice = 0
    
    // Grundpreis basierend auf Fläche
    basePrice = data.objektDetails.flaeche * 65 // 65€ pro m²
    
    // Aufschlag für komplette Entkernung
    if (data.umfang.komplettEntkernung) {
      basePrice *= 1.2 // 20% Aufschlag
    }
    
    // Aufschlag für Schadstoffe
    if (data.schadstoffoptionen.asbest) basePrice += data.objektDetails.flaeche * 20
    if (data.schadstoffoptionen.pcb) basePrice += data.objektDetails.flaeche * 15
    if (data.schadstoffoptionen.kmf) basePrice += data.objektDetails.flaeche * 10
    if (data.schadstoffoptionen.schimmel) basePrice += data.objektDetails.flaeche * 12
    if (data.schadstoffoptionen.holzschutz) basePrice += data.objektDetails.flaeche * 8
    
    // Zusatzoptionen
    if (data.zusatzoptionen.statikPruefung) basePrice += 450
    if (data.zusatzoptionen.behoerdengaenge) basePrice += 350
    
    // Je nach Objekttyp
    switch (data.objektTyp) {
      case 'industriegebaeude':
        basePrice *= 0.9 // 10% Rabatt wegen größerer Flächen
        break
      case 'oeffentlichesgebaeude':
        basePrice *= 1.1 // 10% Aufschlag wegen höherer Anforderungen
        break
    }
    
    // Runden auf ganze Euro
    return Math.round(basePrice)
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
          Ihre Kontaktdaten
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte geben Sie Ihre Kontaktdaten an, damit wir Sie bezüglich Ihres Entkernungsprojekts kontaktieren können.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={kontakt.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent ${errors.name ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Vor- und Nachname"
                  required
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={kontakt.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent ${errors.email ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="ihre-email@beispiel.de"
                  required
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            
            {/* Telefon */}
            <div>
              <label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1">
                Telefon *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={kontakt.telefon}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent ${errors.telefon ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="z.B. 0123 4567890"
                  required
                />
              </div>
              {errors.telefon && (
                <p className="mt-1 text-xs text-red-500">{errors.telefon}</p>
              )}
            </div>
            
            {/* Nachricht */}
            <div>
              <label htmlFor="nachricht" className="block text-sm font-medium text-gray-700 mb-1">
                Ihre Nachricht (optional)
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex items-start pointer-events-none text-gray-400">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <textarea
                  id="nachricht"
                  name="nachricht"
                  value={kontakt.nachricht}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent min-h-[120px]"
                  placeholder="Hier können Sie weitere Details oder Fragen angeben..."
                />
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              <p>* Pflichtfelder</p>
              <p className="mt-1">
                Mit der Absendung dieser Anfrage stimmen Sie zu, dass wir Ihre Daten zur Bearbeitung Ihrer Anfrage verwenden dürfen. 
                Weitere Informationen finden Sie in unserer Datenschutzerklärung.
              </p>
            </div>
          </div>
        </motion.div>
        
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
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück
          </motion.button>
          
          <motion.button
            onClick={handleContinue}
            className="py-3 px-8 rounded-md font-medium bg-accent text-white hover:bg-accent/90 flex items-center"
            whileHover={{ scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.97 }}
          >
            Weiter
            <ChevronRight className="h-4 w-4 ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
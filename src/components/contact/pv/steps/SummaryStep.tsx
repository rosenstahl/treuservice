"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../PVMontageWizard'
import { CheckCircle, Edit, CheckIcon, SendIcon } from 'lucide-react'

type SummaryStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToPreviousStep: () => void;
  isLastStep?: boolean;
}

// Übersetzungen für die Anzeige
const translateRoofType = (type: string): string => {
  const translations: Record<string, string> = {
    'pitched': 'Schrägdach',
    'flat': 'Flachdach',
    'facade': 'Fassade',
    'carport': 'Carport',
    'other': 'Andere'
  }
  return translations[type] || type
}

const translateOrientation = (orientation: string): string => {
  const translations: Record<string, string> = {
    'south': 'Süd',
    'east-west': 'Ost-West',
    'other': 'Andere'
  }
  return translations[orientation] || orientation
}

const translateModuleType = (type: string): string => {
  const translations: Record<string, string> = {
    'standard': 'Standard',
    'premium': 'Premium',
    'bifacial': 'Bifazial'
  }
  return translations[type] || type
}

const translateInstallationType = (type: string): string => {
  const translations: Record<string, string> = {
    'roof-mounted': 'Aufdach',
    'in-roof': 'Indach',
    'flat-roof': 'Flachdach'
  }
  return translations[type] || type
}

export const SummaryStep: React.FC<SummaryStepProps> = ({ 
  formData, 
  goToPreviousStep,
  isLastStep 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Berechne den Preis basierend auf dem aktuellen Marktwert
  const calculatePrice = (): number => {
    // Grundpreis pro kWp basierend auf Modultyp und Installationsart
    let basePrice = 0
    
    switch (formData.system.moduleType) {
      case 'standard':
        basePrice = 1300 // 1300€/kWp für Standardmodule
        break
      case 'premium':
        basePrice = 1550 // 1550€/kWp für Premiummodule
        break
      case 'bifacial':
        basePrice = 1450 // 1450€/kWp für bifaziale Module
        break
    }
    
    // Aufschlag basierend auf der Installationsart
    let installationMultiplier = 1.0
    switch (formData.system.installationType) {
      case 'roof-mounted':
        installationMultiplier = 1.0 // Standardpreis für Aufdach
        break
      case 'in-roof':
        installationMultiplier = 1.25 // +25% für Indach
        break
      case 'flat-roof':
        installationMultiplier = 1.15 // +15% für Flachdach
        break
    }
    
    // Grundpreis für PV-Anlage
    let pvSystemPrice = formData.system.size * basePrice * installationMultiplier
    
    // Kosten für den Batteriespeicher, falls gewünscht
    let batteryPrice = 0
    if (formData.battery.includeStorage && formData.battery.capacity > 0) {
      batteryPrice = formData.battery.capacity * 800 // 800€ pro kWh Speicherkapazität
    }
    
    // Installationskosten
    const installationFee = 1500
    
    // Rabatt für größere Anlagen
    let discount = 0
    if (formData.system.size > 15) {
      discount = pvSystemPrice * 0.05 // 5% Rabatt für Anlagen über 15 kWp
    }
    
    // Gesamtpreis
    return Math.round(pvSystemPrice + batteryPrice + installationFee - discount)
  }

  // Schätze die jährlichen Einsparungen
  const calculateSavings = (): number => {
    // Durchschnittlicher Strompreis: 0,33€/kWh
    const electricityPrice = 0.33
    
    // Durchschnittlicher Jahresertrag pro kWp (kWh): ~950 kWh/kWp
    let yieldFactor = 0
    switch (formData.system.moduleType) {
      case 'standard':
        yieldFactor = 950
        break
      case 'premium':
        yieldFactor = 1050
        break
      case 'bifacial':
        yieldFactor = 1000
        break
    }
    
    // Korrektur basierend auf der Ausrichtung
    let orientationFactor = 1.0
    switch (formData.roof.orientation) {
      case 'south':
        orientationFactor = 1.0 // Optimale Ausrichtung
        break
      case 'east-west':
        orientationFactor = 0.85 // Leichte Reduktion
        break
      case 'other':
        orientationFactor = 0.75 // Stärkere Reduktion
        break
    }
    
    // Jährlicher Ertrag
    const yearlyYield = formData.system.size * yieldFactor * orientationFactor
    
    // Selbstverbrauchsanteil (40% ohne Speicher, mehr mit Speicher)
    let selfConsumptionRate = 0.4
    if (formData.battery.includeStorage) {
      selfConsumptionRate = 0.4 + (formData.battery.capacity / (formData.system.size * 2)) * 0.4
      selfConsumptionRate = Math.min(selfConsumptionRate, 0.8) // Max 80% Selbstverbrauch
    }
    
    // Einsparung durch Selbstverbrauch
    const selfConsumptionSavings = yearlyYield * selfConsumptionRate * electricityPrice
    
    // Einspeisevergütung (ca. 0,08€/kWh)
    const feedInTariff = 0.08
    const feedInSavings = yearlyYield * (1 - selfConsumptionRate) * feedInTariff
    
    // Gesamte jährliche Einsparung
    return Math.round(selfConsumptionSavings + feedInSavings)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError('')
    
    try {
      // Simuliere einen API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Erfolgreich abgeschlossen
      setIsSubmitted(true)
    } catch (err) {
      setError('Es ist ein Fehler beim Absenden des Formulars aufgetreten. Bitte versuchen Sie es später erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Navigiere zu einem bestimmten Schritt
  const navigateToStep = (step: number) => {
    // In einem echten Anwendungsfall würden wir hier den aktuellen Schritt ändern
    goToPreviousStep()
  }

  const totalPrice = calculatePrice()
  const yearlySavings = calculateSavings()

  const renderSuccessMessage = () => (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
        <CheckIcon className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Vielen Dank für Ihre Anfrage!</h2>
      <p className="text-gray-600 mb-6 max-w-lg mx-auto">
        Wir haben Ihre Anfrage für eine PV-Anlage erhalten und werden uns umgehend mit Ihnen in Verbindung setzen.
        Sie erhalten in Kürze eine Bestätigungs-E-Mail an {formData.contact.email}.
      </p>
      <div className="bg-gray-50 p-4 rounded-lg inline-block">
        <p className="text-sm text-gray-500">Ihre Referenznummer: <span className="font-medium">PV-{Math.floor(Math.random() * 1000000)}</span></p>
      </div>
    </motion.div>
  )

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isSubmitted ? (
        renderSuccessMessage()
      ) : (
        <>
          <div className="text-center mb-6">
            <motion.h2 
              className="text-2xl font-medium text-gray-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              Zusammenfassung Ihrer Anfrage
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
          
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {/* Preisberechnung */}
            <div className="bg-[#009FD8]/5 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-[#007CAB] mb-4">Ihre PV-Anlage</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Geschätzte Investition</p>
                  <p className="text-2xl font-bold text-[#009FD8]">{totalPrice.toLocaleString('de-DE')} €</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jährliche Einsparung ca.</p>
                  <p className="text-2xl font-bold text-green-600">{yearlySavings.toLocaleString('de-DE')} €</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Unverbindliche Schätzung basierend auf Ihren Angaben. Genaue Preise nach persönlichem Beratungsgespräch.
              </p>
            </div>
            
            {/* Kontaktdaten */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <h3 className="font-medium">Kontaktdaten</h3>
                <button 
                  onClick={() => navigateToStep(1)}
                  className="text-[#009FD8] hover:text-[#007CAB] flex items-center text-sm"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Bearbeiten
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{formData.contact.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">E-Mail</p>
                    <p className="font-medium">{formData.contact.email}</p>
                  </div>
                  {formData.contact.phone && (
                    <div>
                      <p className="text-sm text-gray-500">Telefon</p>
                      <p className="font-medium">{formData.contact.phone}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Dachinfos */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <h3 className="font-medium">Dachinfos</h3>
                <button 
                  onClick={() => navigateToStep(2)}
                  className="text-[#009FD8] hover:text-[#007CAB] flex items-center text-sm"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Bearbeiten
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Dachtyp</p>
                    <p className="font-medium">{translateRoofType(formData.roof.type)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Material</p>
                    <p className="font-medium">{formData.roof.material}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ausrichtung</p>
                    <p className="font-medium">{translateOrientation(formData.roof.orientation)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Fläche</p>
                    <p className="font-medium">{formData.roof.area} m²</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Anlagengröße */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <h3 className="font-medium">Anlagengröße</h3>
                <button 
                  onClick={() => navigateToStep(3)}
                  className="text-[#009FD8] hover:text-[#007CAB] flex items-center text-sm"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Bearbeiten
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Anlagengröße</p>
                    <p className="font-medium">{formData.system.size} kWp</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Modultyp</p>
                    <p className="font-medium">{translateModuleType(formData.system.moduleType)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Installationsart</p>
                    <p className="font-medium">{translateInstallationType(formData.system.installationType)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Speicher */}
            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="bg-gray-50 p-4 flex justify-between items-center">
                <h3 className="font-medium">Speicherlösung</h3>
                <button 
                  onClick={() => navigateToStep(4)}
                  className="text-[#009FD8] hover:text-[#007CAB] flex items-center text-sm"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Bearbeiten
                </button>
              </div>
              <div className="p-4">
                {formData.battery.includeStorage ? (
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <div>
                      <p className="font-medium">Batteriespeicher mit {formData.battery.capacity} kWh</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">Kein Batteriespeicher gewünscht</p>
                )}
              </div>
            </div>
            
            {/* Zusatzinfos */}
            {formData.additionalInfo && (
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                <div className="bg-gray-50 p-4">
                  <h3 className="font-medium">Zusätzliche Informationen</h3>
                </div>
                <div className="p-4">
                  <p className="text-gray-600">{formData.additionalInfo}</p>
                </div>
              </div>
            )}
            
            {/* Datenschutz-Checkbox */}
            <div className="mb-6">
              <label className="flex items-start cursor-pointer space-x-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#009FD8] rounded border-gray-300 focus:ring-[#009FD8] mt-0.5"
                  required
                />
                <span className="text-sm text-gray-600">
                  Ich stimme zu, dass meine Daten für die Bearbeitung meiner Anfrage verwendet werden. 
                  Ich habe die <a href="/privacy" className="text-[#009FD8] hover:underline">Datenschutzerklärung</a> gelesen und verstanden.
                </span>
              </label>
            </div>
            
            {/* Fehler */}
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            {/* Navigationsbuttons */}
            <div className="flex gap-4">
              <motion.button
                onClick={goToPreviousStep}
                className="flex-1 py-3 px-6 rounded-md font-medium border border-gray-300 hover:border-[#009FD8] text-gray-700 transition-all duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Zurück
              </motion.button>
              
              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex-1 py-3 px-6 rounded-md font-medium bg-[#009FD8] text-white hover:bg-[#007CAB] transition-all duration-200 flex items-center justify-center transform hover:scale-[1.03] hover:shadow-md ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                whileTap={!isSubmitting ? { scale: 0.97 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Wird gesendet...
                  </>
                ) : (
                  <>
                    Anfrage absenden
                    <SendIcon className="ml-2 h-4 w-4" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  )
}

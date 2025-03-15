"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { Building, Plus, Minus } from 'lucide-react'

type AdresseZugangStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const AdresseZugangStep: React.FC<AdresseZugangStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const [isValid, setIsValid] = useState(false)
  const [errors, setErrors] = useState<{
    strasse?: string
    hausnummer?: string
    plz?: string
    ort?: string
  }>({})

  useEffect(() => {
    // Prüfen, ob der Schritt vollständig ist
    const adresse = formData.adresse
    setIsValid(
      !!adresse.strasse.trim() && 
      !!adresse.hausnummer.trim() && 
      !!adresse.plz.trim() && 
      !!adresse.ort.trim() &&
      !!adresse.parkmoeglichkeit
    )
  }, [formData.adresse])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    updateFormData({
      adresse: {
        ...formData.adresse,
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

  const handleEtageChange = (etage: number) => {
    updateFormData({
      adresse: {
        ...formData.adresse,
        etage
      }
    })
  }

  const handleAufzugChange = (checked: boolean) => {
    updateFormData({
      adresse: {
        ...formData.adresse,
        aufzug: checked
      }
    })
  }

  const handleParkmoeglichkeitChange = (value: FormData['adresse']['parkmoeglichkeit']) => {
    updateFormData({
      adresse: {
        ...formData.adresse,
        parkmoeglichkeit: value
      }
    })
  }

  const validateForm = () => {
    const newErrors: typeof errors = {}
    
    if (!formData.adresse.strasse.trim()) {
      newErrors.strasse = 'Straße ist erforderlich'
    }
    
    if (!formData.adresse.hausnummer.trim()) {
      newErrors.hausnummer = 'Hausnummer ist erforderlich'
    }
    
    if (!formData.adresse.plz.trim()) {
      newErrors.plz = 'PLZ ist erforderlich'
    } else if (!/^\d{5}$/.test(formData.adresse.plz)) {
      newErrors.plz = 'PLZ muss 5 Ziffern enthalten'
    }
    
    if (!formData.adresse.ort.trim()) {
      newErrors.ort = 'Ort ist erforderlich'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
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
          <h2 className="text-2xl font-medium text-gray-900">Adresse & Zugangsinformationen</h2>
          <p className="mt-2 text-sm text-gray-500">
            Geben Sie die genaue Adresse und Informationen zur Zugänglichkeit an
          </p>
        </div>

        <div className="mt-6 space-y-6">
          {/* Adress-Abschnitt */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Adresse</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="strasse" className="block text-sm font-medium text-gray-700">
                  Straße
                </label>
                <input
                  type="text"
                  id="strasse"
                  name="strasse"
                  value={formData.adresse.strasse}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.strasse ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.strasse && (
                  <p className="mt-1 text-sm text-red-600">{errors.strasse}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="hausnummer" className="block text-sm font-medium text-gray-700">
                  Hausnummer
                </label>
                <input
                  type="text"
                  id="hausnummer"
                  name="hausnummer"
                  value={formData.adresse.hausnummer}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.hausnummer ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.hausnummer && (
                  <p className="mt-1 text-sm text-red-600">{errors.hausnummer}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label htmlFor="plz" className="block text-sm font-medium text-gray-700">
                  PLZ
                </label>
                <input
                  type="text"
                  id="plz"
                  name="plz"
                  value={formData.adresse.plz}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.plz ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  maxLength={5}
                />
                {errors.plz && (
                  <p className="mt-1 text-sm text-red-600">{errors.plz}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="ort" className="block text-sm font-medium text-gray-700">
                  Ort
                </label>
                <input
                  type="text"
                  id="ort"
                  name="ort"
                  value={formData.adresse.ort}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.ort ? 'border-red-300' : 'border-gray-300'
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.ort && (
                  <p className="mt-1 text-sm text-red-600">{errors.ort}</p>
                )}
              </div>
            </div>
          </div>
          
          {/* Zugangs-Abschnitt */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Zugangsinformationen</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Etage
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => handleEtageChange(Math.max(0, formData.adresse.etage - 1))}
                    className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <div className="flex-1 flex items-center justify-center border-t border-b border-gray-300 bg-white text-sm">
                    {formData.adresse.etage === 0 ? 'Erdgeschoss' : `${formData.adresse.etage}. Etage`}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEtageChange(formData.adresse.etage + 1)}
                    className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="aufzug"
                  name="aufzug"
                  type="checkbox"
                  checked={formData.adresse.aufzug}
                  onChange={(e) => handleAufzugChange(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="aufzug" className="ml-2 block text-sm text-gray-700">
                  Aufzug vorhanden
                </label>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Parkmöglichkeit vor Ort
              </label>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => handleParkmoeglichkeitChange('gut')}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    formData.adresse.parkmoeglichkeit === 'gut'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Gut (direkt vor dem Gebäude)
                </button>
                <button
                  type="button"
                  onClick={() => handleParkmoeglichkeitChange('eingeschraenkt')}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    formData.adresse.parkmoeglichkeit === 'eingeschraenkt'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Eingeschränkt (in der Nähe)
                </button>
                <button
                  type="button"
                  onClick={() => handleParkmoeglichkeitChange('keine')}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${
                    formData.adresse.parkmoeglichkeit === 'keine'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Keine/Schwierig
                </button>
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="zugaenglichkeit" className="block text-sm font-medium text-gray-700">
                Zugänglichkeit und Besonderheiten
              </label>
              <Textarea
                id="zugaenglichkeit"
                name="zugaenglichkeit"
                value={formData.adresse.zugaenglichkeit}
                onChange={handleChange}
                placeholder="Gibt es besondere Hinweise zur Zugänglichkeit? (z.B. Hinterhaus, schwierige Enge Treppe, etc.)"
                className="w-full mt-1 h-24"
              />
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
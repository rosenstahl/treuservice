"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntruempelungWizard'

type ZugangTerminStepProps = {
  formData: FormData
  updateFormData: (newData: Partial<FormData>) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
}

export const ZugangTerminStep: React.FC<ZugangTerminStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const [errors, setErrors] = useState<{
    strasse?: string
    hausnummer?: string
    plz?: string
    ort?: string
    wunschtermin?: string
  }>({})

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    
    // Prüfen, zu welchem Abschnitt das Feld gehört
    if (['strasse', 'hausnummer', 'plz', 'ort'].includes(name)) {
      updateFormData({
        adresseZugang: {
          ...formData.adresseZugang,
          [name]: value
        }
      })
    } else if (name === 'wunschtermin') {
      updateFormData({
        terminKontakt: {
          ...formData.terminKontakt,
          [name]: value
        }
      })
    }
    
    // Fehler zurücksetzen, wenn ein Feld ausgefüllt wird
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: undefined
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    
    if (['aufzug'].includes(name)) {
      updateFormData({
        adresseZugang: {
          ...formData.adresseZugang,
          [name]: checked
        }
      })
    } else if (['reinigung', 'entsorgungsnachweis'].includes(name)) {
      updateFormData({
        zusatzleistungen: {
          ...formData.zusatzleistungen,
          [name]: checked
        }
      })
    }
  }

  const handleEtageChange = (value: number) => {
    updateFormData({
      adresseZugang: {
        ...formData.adresseZugang,
        etage: value
      }
    })
  }

  const handleParkmoeglichkeitChange = (value: 'gut' | 'eingeschraenkt' | 'keine') => {
    updateFormData({
      adresseZugang: {
        ...formData.adresseZugang,
        parkmoeglichkeit: value
      }
    })
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
    
    if (!formData.adresseZugang.strasse.trim()) {
      newErrors.strasse = 'Straße ist erforderlich'
    }
    
    if (!formData.adresseZugang.hausnummer.trim()) {
      newErrors.hausnummer = 'Hausnummer ist erforderlich'
    }
    
    if (!formData.adresseZugang.plz.trim()) {
      newErrors.plz = 'PLZ ist erforderlich'
    } else if (!/^\d{5}$/.test(formData.adresseZugang.plz)) {
      newErrors.plz = 'PLZ muss 5 Ziffern enthalten'
    }
    
    if (!formData.adresseZugang.ort.trim()) {
      newErrors.ort = 'Ort ist erforderlich'
    }

    if (!formData.terminKontakt.wunschtermin.trim()) {
      newErrors.wunschtermin = 'Bitte wählen Sie einen Wunschtermin'
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
          <h2 className="text-2xl font-medium text-gray-900">Zugang, Termin & Zusatzleistungen</h2>
          <p className="mt-2 text-sm text-gray-500">
            Geben Sie die Adresse, Zugangsinformationen, Wunschtermin und Zusatzleistungen an
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
                  value={formData.adresseZugang.strasse}
                  onChange={handleInputChange}
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
                  value={formData.adresseZugang.hausnummer}
                  onChange={handleInputChange}
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
                  value={formData.adresseZugang.plz}
                  onChange={handleInputChange}
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
                  value={formData.adresseZugang.ort}
                  onChange={handleInputChange}
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
                    onClick={() => handleEtageChange(Math.max(0, formData.adresseZugang.etage - 1))}
                    className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 text-gray-500 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <div className="flex-1 flex items-center justify-center border-t border-b border-gray-300 bg-white text-sm">
                    {formData.adresseZugang.etage === 0 ? 'Erdgeschoss' : `${formData.adresseZugang.etage}. Etage`}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEtageChange(formData.adresseZugang.etage + 1)}
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
                  checked={formData.adresseZugang.aufzug}
                  onChange={handleCheckboxChange}
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
                    formData.adresseZugang.parkmoeglichkeit === 'gut'
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
                    formData.adresseZugang.parkmoeglichkeit === 'eingeschraenkt'
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
                    formData.adresseZugang.parkmoeglichkeit === 'keine'
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Keine/Schwierig
                </button>
              </div>
            </div>
          </div>

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
                    onChange={handleCheckboxChange}
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
                    onChange={handleCheckboxChange}
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
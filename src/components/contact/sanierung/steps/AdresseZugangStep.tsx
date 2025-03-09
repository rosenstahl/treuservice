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
          Adresse und Zugang
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte geben Sie die genaue Adresse und Informationen zur Zugänglichkeit an.
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Straße und Hausnummer */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2">
            <Label htmlFor="strasse">Straße *</Label>
            <Input 
              id="strasse"
              name="strasse"
              value={formData.adresse.strasse}
              onChange={handleChange}
              placeholder="Straße"
              className="w-full mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="hausnummer">Hausnummer *</Label>
            <Input 
              id="hausnummer"
              name="hausnummer"
              value={formData.adresse.hausnummer}
              onChange={handleChange}
              placeholder="Nr."
              className="w-full mt-1"
              required
            />
          </div>
        </div>

        {/* PLZ und Ort */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <Label htmlFor="plz">PLZ *</Label>
            <Input 
              id="plz"
              name="plz"
              value={formData.adresse.plz}
              onChange={handleChange}
              placeholder="PLZ"
              className="w-full mt-1"
              pattern="[0-9]{5}"
              maxLength={5}
              required
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="ort">Ort *</Label>
            <Input 
              id="ort"
              name="ort"
              value={formData.adresse.ort}
              onChange={handleChange}
              placeholder="Ort"
              className="w-full mt-1"
              required
            />
          </div>
        </div>

        {/* Etage und Aufzug */}
        <div className="p-5 border border-gray-200 rounded-lg mb-6 bg-gray-50">
          <div className="flex items-center mb-4">
            <Building className="mr-2 h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium">Etagenangaben</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Etage */}
            <div>
              <Label htmlFor="etage">Etage</Label>
              <div className="flex items-center mt-1">
                <button
                  type="button"
                  onClick={() => formData.adresse.etage > -1 && handleEtageChange(formData.adresse.etage - 1)}
                  className="p-2 bg-gray-100 rounded-l-lg text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <Input
                  id="etage"
                  type="number"
                  value={formData.adresse.etage}
                  onChange={(e) => handleEtageChange(parseInt(e.target.value) || 0)}
                  className="text-center rounded-none border-x-0"
                />
                <button
                  type="button"
                  onClick={() => handleEtageChange(formData.adresse.etage + 1)}
                  className="p-2 bg-gray-100 rounded-r-lg text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                0 = Erdgeschoss, -1 = Untergeschoss
              </p>
            </div>

            {/* Aufzug */}
            <div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="aufzug">Aufzug vorhanden</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="aufzug"
                    checked={formData.adresse.aufzug}
                    onCheckedChange={handleAufzugChange}
                  />
                  <span className="text-sm text-gray-700">
                    {formData.adresse.aufzug ? 'Ja' : 'Nein'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parkmöglichkeiten */}
        <div className="mb-6">
          <Label className="mb-2 block">Parkmöglichkeiten für Einsatzfahrzeuge *</Label>
          <RadioGroup
            value={formData.adresse.parkmoeglichkeit}
            onValueChange={(value) => handleParkmoeglichkeitChange(value as FormData['adresse']['parkmoeglichkeit'])}
            className="space-y-3 mt-1"
          >
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="gut" id="park-gut" className="mt-1" />
              <Label htmlFor="park-gut" className="cursor-pointer">
                <span className="font-medium">Gute Parkmöglichkeiten</span>
                <p className="text-sm text-gray-600">Direkt vor dem Gebäude, privater Parkplatz, etc.</p>
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="eingeschraenkt" id="park-eingeschraenkt" className="mt-1" />
              <Label htmlFor="park-eingeschraenkt" className="cursor-pointer">
                <span className="font-medium">Eingeschränkte Parkmöglichkeiten</span>
                <p className="text-sm text-gray-600">Begrenzte Parkplätze, temporäres Halten möglich</p>
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="keine" id="park-keine" className="mt-1" />
              <Label htmlFor="park-keine" className="cursor-pointer">
                <span className="font-medium">Keine Parkmöglichkeiten</span>
                <p className="text-sm text-gray-600">Fußgängerzone, stark begrenzter Zugang</p>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Zugänglichkeit/Besonderheiten */}
        <div className="mb-6">
          <Label htmlFor="zugaenglichkeit">Zugänglichkeit und Besonderheiten</Label>
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
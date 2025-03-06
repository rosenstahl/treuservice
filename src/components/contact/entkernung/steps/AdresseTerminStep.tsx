"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntkernungWizard'
import { 
  ArrowLeft,
  ChevronRight,
  Calendar,
  MapPin
} from 'lucide-react'

type AdresseTerminStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const AdresseTerminStep: React.FC<AdresseTerminStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [adresse, setAdresse] = useState({
    strasse: formData.adresseTermin.strasse || '',
    hausnummer: formData.adresseTermin.hausnummer || '',
    plz: formData.adresseTermin.plz || '',
    ort: formData.adresseTermin.ort || ''
  })
  
  const [termine, setTermine] = useState({
    wunschtermin: formData.adresseTermin.wunschtermin || '',
    alternativtermin: formData.adresseTermin.alternativtermin || ''
  })
  
  const [errors, setErrors] = useState({
    strasse: '',
    hausnummer: '',
    plz: '',
    ort: '',
    wunschtermin: ''
  })

  const handleAdresseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAdresse(prev => ({
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
      adresseTermin: {
        ...formData.adresseTermin,
        [name]: value
      }
    })
  }

  const handleTerminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTermine(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Fehler zurücksetzen wenn ein Feld ausgefüllt wird
    if (name === 'wunschtermin' && errors.wunschtermin) {
      setErrors(prev => ({
        ...prev,
        wunschtermin: ''
      }))
    }
    
    updateFormData({
      adresseTermin: {
        ...formData.adresseTermin,
        [name]: value
      }
    })
  }

  const validateForm = () => {
    const newErrors = {
      strasse: !adresse.strasse ? 'Bitte geben Sie die Straße ein' : '',
      hausnummer: !adresse.hausnummer ? 'Bitte geben Sie die Hausnummer ein' : '',
      plz: !adresse.plz ? 'Bitte geben Sie die PLZ ein' : '',
      ort: !adresse.ort ? 'Bitte geben Sie den Ort ein' : '',
      wunschtermin: !termine.wunschtermin ? 'Bitte geben Sie einen Wunschtermin ein' : ''
    }
    
    setErrors(newErrors)
    
    // Prüfen ob alle erforderlichen Felder ausgefüllt sind
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleContinue = () => {
    if (validateForm()) {
      goToNextStep()
    }
  }

  // Mindestdatum für Terminauswahl (heute + 3 Tage)
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 3)
  const minDateStr = minDate.toISOString().split('T')[0]

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
          Adresse & Wunschtermin
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Geben Sie die Adresse des zu entkernenden Objekts und Ihren Wunschtermin an.
        </motion.p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Adresse */}
          <motion.div
            className="p-6 bg-gray-50 rounded-lg border border-gray-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <div className="flex items-center mb-4 text-accent">
              <MapPin className="w-5 h-5 mr-2" />
              <h3 className="font-medium">Objektadresse</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label htmlFor="strasse" className="block text-sm font-medium text-gray-700 mb-1">
                    Straße *
                  </label>
                  <input
                    type="text"
                    id="strasse"
                    name="strasse"
                    value={adresse.strasse}
                    onChange={handleAdresseChange}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent ${errors.strasse ? 'border-red-300' : 'border-gray-300'}`}
                    required
                  />
                  {errors.strasse && (
                    <p className="mt-1 text-xs text-red-500">{errors.strasse}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="hausnummer" className="block text-sm font-medium text-gray-700 mb-1">
                    Nr. *
                  </label>
                  <input
                    type="text"
                    id="hausnummer"
                    name="hausnummer"
                    value={adresse.hausnummer}
                    onChange={handleAdresseChange}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent ${errors.hausnummer ? 'border-red-300' : 'border-gray-300'}`}
                    required
                  />
                  {errors.hausnummer && (
                    <p className="mt-1 text-xs text-red-500">{errors.hausnummer}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="plz" className="block text-sm font-medium text-gray-700 mb-1">
                    PLZ *
                  </label>
                  <input
                    type="text"
                    id="plz"
                    name="plz"
                    value={adresse.plz}
                    onChange={handleAdresseChange}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent ${errors.plz ? 'border-red-300' : 'border-gray-300'}`}
                    required
                  />
                  {errors.plz && (
                    <p className="mt-1 text-xs text-red-500">{errors.plz}</p>
                  )}
                </div>
                
                <div className="col-span-2">
                  <label htmlFor="ort" className="block text-sm font-medium text-gray-700 mb-1">
                    Ort *
                  </label>
                  <input
                    type="text"
                    id="ort"
                    name="ort"
                    value={adresse.ort}
                    onChange={handleAdresseChange}
                    className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent ${errors.ort ? 'border-red-300' : 'border-gray-300'}`}
                    required
                  />
                  {errors.ort && (
                    <p className="mt-1 text-xs text-red-500">{errors.ort}</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Terminauswahl */}
          <motion.div
            className="p-6 bg-gray-50 rounded-lg border border-gray-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className="flex items-center mb-4 text-accent">
              <Calendar className="w-5 h-5 mr-2" />
              <h3 className="font-medium">Wunschtermin</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="wunschtermin" className="block text-sm font-medium text-gray-700 mb-1">
                  Gewünschter Termin *
                </label>
                <input
                  type="date"
                  id="wunschtermin"
                  name="wunschtermin"
                  value={termine.wunschtermin}
                  onChange={handleTerminChange}
                  min={minDateStr}
                  className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent ${errors.wunschtermin ? 'border-red-300' : 'border-gray-300'}`}
                  required
                />
                {errors.wunschtermin && (
                  <p className="mt-1 text-xs text-red-500">{errors.wunschtermin}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Frühester Termin: in 3 Tagen</p>
              </div>
              
              <div>
                <label htmlFor="alternativtermin" className="block text-sm font-medium text-gray-700 mb-1">
                  Alternativer Termin (optional)
                </label>
                <input
                  type="date"
                  id="alternativtermin"
                  name="alternativtermin"
                  value={termine.alternativtermin}
                  onChange={handleTerminChange}
                  min={minDateStr}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
                />
              </div>
              
              <p className="text-xs text-gray-500 mt-2">
                Wir bemühen uns, Ihren Wunschtermin einzuhalten. Die tatsächliche Terminvereinbarung erfolgt nach Bestätigung durch unser Team.
              </p>
            </div>
          </motion.div>
        </div>
        
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
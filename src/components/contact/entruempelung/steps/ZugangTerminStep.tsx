"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntruempelungWizard'
import { Building, Calendar as CalendarIcon, Clock, Car, Info, Settings, Sparkle, ArrowUpCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Checkbox2 } from '@/components/ui/checkbox2'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

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
  const [error, setError] = useState('')
  const [startDate, setStartDate] = useState<Date | undefined>(
    formData.terminKontakt.wunschtermin ? new Date(formData.terminKontakt.wunschtermin) : undefined
  )

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    
    if (name === 'wunschtermin' || name === 'wunschzeit') {
      updateFormData({
        terminKontakt: {
          ...formData.terminKontakt,
          [name]: value
        }
      })
    }
    
    // Fehler zurücksetzen, wenn ein Feld ausgefüllt wird
    if (error) {
      setError('')
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
    return tomorrow
  }

  // Berechne das Maximaldatum für den Datumsauswähler (3 Monate in der Zukunft)
  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 3)
    return maxDate
  }

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date)
    if (date) {
      updateFormData({
        terminKontakt: {
          ...formData.terminKontakt,
          wunschtermin: date.toISOString().split('T')[0]
        }
      })
    }
    if (error) {
      setError('')
    }
  }

  const handleContinue = () => {
    if (!formData.terminKontakt.wunschtermin.trim()) {
      setError('Bitte wählen Sie einen Wunschtermin')
      return
    }
    
    if (!formData.adresseZugang.parkmoeglichkeit) {
      setError('Bitte geben Sie die Parkmöglichkeit an')
      return
    }
    
    goToNextStep()
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="text-center mb-6">
        <motion.h2 
          className="text-xl font-medium text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.2 }}
        >
          Zugang, Zusatzleistungen & Termin
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Geben Sie Zugangsinformationen, Zusatzleistungen und Ihren Wunschtermin an
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Zugangs-Abschnitt */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Building className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Zugangsinformationen</h3>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-gray-700">Etage</Label>
              <div className="flex items-center max-w-xs">
                <button
                  type="button"
                  onClick={() => handleEtageChange(Math.max(0, formData.adresseZugang.etage - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <div className="w-32 h-9 flex items-center justify-center border border-gray-200 mx-3 rounded-lg bg-white text-sm">
                  {formData.adresseZugang.etage === 0 ? 'Erdgeschoss' : `${formData.adresseZugang.etage}. Etage`}
                </div>
                <button
                  type="button"
                  onClick={() => handleEtageChange(formData.adresseZugang.etage + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 py-2">
              <Checkbox2
                id="aufzug"
                name="aufzug"
                checked={formData.adresseZugang.aufzug}
                onChange={handleCheckboxChange}
              />
              <div>
                <Label htmlFor="aufzug" className="flex items-center text-xs font-medium text-gray-700">
                  <ArrowUpCircle className="h-3 w-3 mr-1 text-[#009FD8]" /> Aufzug vorhanden
                </Label>
                <p className="text-xs text-gray-500">Dies erleichtert die Entrümpelung</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Label className="block text-xs font-medium text-gray-700 mb-2 flex items-center">
              <Car className="h-3 w-3 mr-1 text-[#009FD8]" /> 
              Parkmöglichkeit vor Ort
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div
                className={`px-4 py-2 border rounded-full cursor-pointer transition-all ${
                  formData.adresseZugang.parkmoeglichkeit === 'gut'
                    ? 'border-[#009FD8] bg-[#E6F4FA]'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleParkmoeglichkeitChange('gut')}
              >
                <span className={`text-xs font-medium ${formData.adresseZugang.parkmoeglichkeit === 'gut' ? 'text-[#009FD8]' : 'text-gray-700'}`}>Gut</span>
              </div>
              <div
                className={`px-4 py-2 border rounded-full cursor-pointer transition-all ${
                  formData.adresseZugang.parkmoeglichkeit === 'eingeschraenkt'
                    ? 'border-[#009FD8] bg-[#E6F4FA]'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleParkmoeglichkeitChange('eingeschraenkt')}
              >
                <span className={`text-xs font-medium ${formData.adresseZugang.parkmoeglichkeit === 'eingeschraenkt' ? 'text-[#009FD8]' : 'text-gray-700'}`}>Eingeschränkt</span>
              </div>
              <div
                className={`px-4 py-2 border rounded-full cursor-pointer transition-all ${
                  formData.adresseZugang.parkmoeglichkeit === 'keine'
                    ? 'border-[#009FD8] bg-[#E6F4FA]'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleParkmoeglichkeitChange('keine')}
              >
                <span className={`text-xs font-medium ${formData.adresseZugang.parkmoeglichkeit === 'keine' ? 'text-[#009FD8]' : 'text-gray-700'}`}>Keine/Schwierig</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Zusatzleistungen */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Settings className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Zusatzleistungen</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 py-2">
              <Checkbox2
                id="reinigung"
                name="reinigung"
                checked={formData.zusatzleistungen.reinigung}
                onChange={handleCheckboxChange}
              />
              <div>
                <Label htmlFor="reinigung" className="flex items-center text-xs font-medium text-gray-700">
                  <Sparkle className="h-3 w-3 mr-1 text-[#009FD8]" /> Endreinigung nach Entrümpelung
                </Label>
                <p className="text-xs text-gray-500">Die entrümpelten Räume werden besenrein hinterlassen</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 py-2">
              <Checkbox2
                id="entsorgungsnachweis"
                name="entsorgungsnachweis"
                checked={formData.zusatzleistungen.entsorgungsnachweis}
                onChange={handleCheckboxChange}
              />
              <div>
                <Label htmlFor="entsorgungsnachweis" className="flex items-center text-xs font-medium text-gray-700">
                  <Info className="h-3 w-3 mr-1 text-[#009FD8]" /> Entsorgungsnachweis
                </Label>
                <p className="text-xs text-gray-500">Sie erhalten einen dokumentierten Nachweis über die fachgerechte Entsorgung</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wunschtermin */}
        <motion.div 
          className="mb-5 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <CalendarIcon className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Wunschtermin</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wunschtermin" className="text-xs font-medium text-gray-700">
              Bevorzugtes Datum für die Entrümpelung
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="wunschtermin"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-sm",
                    !startDate && "text-gray-500"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border border-gray-200 rounded-lg" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  disabled={(date) => date < getMinDate() || date > getMaxDate()}
                  initialFocus
                  className="bg-white rounded-lg"
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-gray-500 mt-1">
              Bitte beachten Sie: Der tatsächliche Termin wird nach Verfügbarkeit bestätigt
            </p>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="wunschzeit" className="text-xs font-medium text-gray-700 mb-1 flex items-center">
              <Clock className="h-3 w-3 mr-1 text-[#009FD8]" />
              Bevorzugte Uhrzeit (optional)
            </Label>
            <Input
              type="time"
              id="wunschzeit"
              name="wunschzeit"
              value={formData.terminKontakt.wunschzeit || ''}
              onChange={handleInputChange}
              className="w-full max-w-xs bg-white border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8]"
            />
          </div>
        </motion.div>
      </div>

      {error && (
        <motion.p 
          className="text-red-500 text-xs text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
      
      <motion.div 
        className="flex justify-between mt-8 pt-6 border-t border-gray-100 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.2 }}
      >
        <button
          onClick={goToPreviousStep}
          className="py-2 px-4 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Zurück
        </button>
        
        <button
          onClick={handleContinue}
          className={`py-2.5 px-6 rounded-full text-xs font-medium transition-colors ${
            formData.terminKontakt.wunschtermin && formData.adresseZugang.parkmoeglichkeit
              ? 'bg-[#009FD8] text-white hover:bg-[#007CAB]' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Weiter
        </button>
      </motion.div>
    </motion.div>
  )
}
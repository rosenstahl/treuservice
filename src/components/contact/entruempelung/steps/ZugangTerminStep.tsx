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
          Zugang, Zusatzleistungen & Termin
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Geben Sie Zugangsinformationen, Zusatzleistungen und Ihren Wunschtermin an
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Zugangs-Abschnitt */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Building className="h-4 w-4 mr-2 text-accent" />
            Zugangsinformationen
          </Label>
          
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Etage</Label>
              <div className="flex max-w-xs">
                <button
                  type="button"
                  onClick={() => handleEtageChange(Math.max(0, formData.adresseZugang.etage - 1))}
                  className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
                >
                  -
                </button>
                <div className="w-32 flex items-center justify-center border-t border-b border-gray-300 bg-white text-sm font-medium">
                  {formData.adresseZugang.etage === 0 ? 'Erdgeschoss' : `${formData.adresseZugang.etage}. Etage`}
                </div>
                <button
                  type="button"
                  onClick={() => handleEtageChange(formData.adresseZugang.etage + 1)}
                  className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
              <Checkbox2
                id="aufzug"
                name="aufzug"
                checked={formData.adresseZugang.aufzug}
                onChange={handleCheckboxChange}
              />
              <div>
                <Label htmlFor="aufzug" className="flex items-center text-sm font-medium text-gray-700">
                  <ArrowUpCircle className="h-4 w-4 mr-1 text-accent" /> Aufzug vorhanden
                </Label>
                <p className="text-xs text-gray-500">Dies erleichtert die Entrümpelung</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Car className="h-4 w-4 mr-2 text-accent" /> 
              Parkmöglichkeit vor Ort
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div
                className={`px-4 py-2 border rounded-md cursor-pointer transition-all ${
                  formData.adresseZugang.parkmoeglichkeit === 'gut'
                    ? 'border-accent bg-accent/5 shadow-sm font-semibold'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleParkmoeglichkeitChange('gut')}
              >
                <span className={`text-sm ${formData.adresseZugang.parkmoeglichkeit === 'gut' ? 'text-accent' : 'text-gray-700'}`}>Gut</span>
                <p className="text-xs text-gray-500">Direkt vor dem Gebäude</p>
              </div>
              <div
                className={`px-4 py-2 border rounded-md cursor-pointer transition-all ${
                  formData.adresseZugang.parkmoeglichkeit === 'eingeschraenkt'
                    ? 'border-accent bg-accent/5 shadow-sm font-semibold'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleParkmoeglichkeitChange('eingeschraenkt')}
              >
                <span className={`text-sm ${formData.adresseZugang.parkmoeglichkeit === 'eingeschraenkt' ? 'text-accent' : 'text-gray-700'}`}>Eingeschränkt</span>
                <p className="text-xs text-gray-500">In der Nähe</p>
              </div>
              <div
                className={`px-4 py-2 border rounded-md cursor-pointer transition-all ${
                  formData.adresseZugang.parkmoeglichkeit === 'keine'
                    ? 'border-accent bg-accent/5 shadow-sm font-semibold'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleParkmoeglichkeitChange('keine')}
              >
                <span className={`text-sm ${formData.adresseZugang.parkmoeglichkeit === 'keine' ? 'text-accent' : 'text-gray-700'}`}>Keine/Schwierig</span>
                <p className="text-xs text-gray-500">Parkplätze schwer zu finden</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Zusatzleistungen */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Settings className="h-4 w-4 mr-2 text-accent" />
            Zusatzleistungen
          </Label>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
              <Checkbox2
                id="reinigung"
                name="reinigung"
                checked={formData.zusatzleistungen.reinigung}
                onChange={handleCheckboxChange}
              />
              <div>
                <Label htmlFor="reinigung" className="flex items-center text-sm font-medium text-gray-700">
                  <Sparkle className="h-4 w-4 mr-1 text-green-500" /> Endreinigung nach Entrümpelung
                </Label>
                <p className="text-xs text-gray-500">Die entrümpelten Räume werden besenrein hinterlassen</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 bg-white hover:border-gray-200 transition-all">
              <Checkbox2
                id="entsorgungsnachweis"
                name="entsorgungsnachweis"
                checked={formData.zusatzleistungen.entsorgungsnachweis}
                onChange={handleCheckboxChange}
              />
              <div>
                <Label htmlFor="entsorgungsnachweis" className="flex items-center text-sm font-medium text-gray-700">
                  <Info className="h-4 w-4 mr-1 text-blue-500" /> Entsorgungsnachweis
                </Label>
                <p className="text-xs text-gray-500">Sie erhalten einen dokumentierten Nachweis über die fachgerechte Entsorgung</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Wunschtermin */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-accent" />
            Wunschtermin
          </Label>
          
          <div className="space-y-2">
            <Label htmlFor="wunschtermin" className="text-sm text-gray-700">
              Bevorzugtes Datum für die Entrümpelung
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="wunschtermin"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-100 hover:border-gray-300",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border border-gray-200" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  disabled={(date) => date < getMinDate() || date > getMaxDate()}
                  initialFocus
                  className="bg-white"
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-gray-500 mt-1">
              Bitte beachten Sie: Der tatsächliche Termin wird nach Verfügbarkeit bestätigt
            </p>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="wunschzeit" className="text-sm text-gray-700 mb-2 flex items-center">
              <Clock className="h-4 w-4 mr-2 text-accent" />
              Bevorzugte Uhrzeit (optional)
            </Label>
            <Input
              type="time"
              id="wunschzeit"
              name="wunschzeit"
              value={formData.terminKontakt.wunschzeit || ''}
              onChange={handleInputChange}
              className="w-full max-w-xs bg-white"
            />
          </div>
        </motion.div>
      </div>

      {error && (
        <motion.div 
          className="mt-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm text-center max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}
      
      <motion.div 
        className="flex justify-between max-w-2xl mx-auto mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <motion.button
          onClick={goToPreviousStep}
          className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Zurück
        </motion.button>

        <motion.button
          onClick={handleContinue}
          className="py-3 px-8 rounded-md font-medium transition-all duration-200 bg-accent text-white hover:bg-accent-dark hover:shadow-md"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Weiter
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
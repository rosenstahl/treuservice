"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntkernungWizard'
import { MapPin, Calendar as CalendarIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

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
  });

  // Termine als Date-Objekte für den Kalender
  const [wunschtermin, setWunschtermin] = useState<Date | undefined>(
    formData.adresseTermin.wunschtermin ? new Date(formData.adresseTermin.wunschtermin) : undefined
  );
  const [alternativtermin, setAlternativtermin] = useState<Date | undefined>(
    formData.adresseTermin.alternativtermin ? new Date(formData.adresseTermin.alternativtermin) : undefined
  );
  
  const [errors, setErrors] = useState({
    strasse: '',
    hausnummer: '',
    plz: '',
    ort: '',
    wunschtermin: ''
  });

  const handleAdresseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAdresse(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Fehler zurücksetzen wenn ein Feld ausgefüllt wird
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
    
    updateFormData({
      adresseTermin: {
        ...formData.adresseTermin,
        [id]: value
      }
    });
  };

  const handleWunschterminChange = (date: Date | undefined) => {
    setWunschtermin(date);
    
    // Fehler zurücksetzen wenn ein Datum ausgewählt wird
    if (errors.wunschtermin) {
      setErrors(prev => ({
        ...prev,
        wunschtermin: ''
      }));
    }
    
    updateFormData({
      adresseTermin: {
        ...formData.adresseTermin,
        wunschtermin: date ? date.toISOString().split('T')[0] : ''
      }
    });
  };

  const handleAlternativterminChange = (date: Date | undefined) => {
    setAlternativtermin(date);
    
    updateFormData({
      adresseTermin: {
        ...formData.adresseTermin,
        alternativtermin: date ? date.toISOString().split('T')[0] : ''
      }
    });
  };

  const validateForm = () => {
    const newErrors = {
      strasse: !adresse.strasse ? 'Bitte geben Sie die Straße ein' : '',
      hausnummer: !adresse.hausnummer ? 'Bitte geben Sie die Hausnummer ein' : '',
      plz: !adresse.plz ? 'Bitte geben Sie die PLZ ein' : '',
      ort: !adresse.ort ? 'Bitte geben Sie den Ort ein' : '',
      wunschtermin: !wunschtermin ? 'Bitte geben Sie einen Wunschtermin ein' : ''
    };
    
    setErrors(newErrors);
    
    // Prüfen ob alle erforderlichen Felder ausgefüllt sind
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleContinue = () => {
    if (validateForm()) {
      goToNextStep();
    }
  };

  // Mindestdatum ist heute
  const today = new Date();

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
          Adresse & Wunschtermin
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Geben Sie die Adresse des zu entkernenden Objekts und Ihren Wunschtermin an.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Adresse */}
          <motion.div
            className="border-t border-gray-100 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.2 }}
          >
            <div className="flex items-center mb-4 text-[#009FD8]">
              <MapPin className="w-4 h-4 mr-2" />
              <h3 className="font-medium text-sm">Objektadresse</h3>
            </div>
            
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <Label htmlFor="strasse" className="block text-xs font-medium text-gray-700 mb-1">
                    Straße *
                  </Label>
                  <Input
                    id="strasse"
                    value={adresse.strasse}
                    onChange={handleAdresseChange}
                    className={`w-full bg-white text-sm rounded-lg py-2 px-3 h-9 ${errors.strasse ? 'border-red-300' : 'border-gray-200'}`}
                    required
                  />
                  {errors.strasse && (
                    <p className="mt-1 text-xs text-red-500">{errors.strasse}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="hausnummer" className="block text-xs font-medium text-gray-700 mb-1">
                    Nr. *
                  </Label>
                  <Input
                    id="hausnummer"
                    value={adresse.hausnummer}
                    onChange={handleAdresseChange}
                    className={`w-full bg-white text-sm rounded-lg py-2 px-3 h-9 ${errors.hausnummer ? 'border-red-300' : 'border-gray-200'}`}
                    required
                  />
                  {errors.hausnummer && (
                    <p className="mt-1 text-xs text-red-500">{errors.hausnummer}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <Label htmlFor="plz" className="block text-xs font-medium text-gray-700 mb-1">
                    PLZ *
                  </Label>
                  <Input
                    id="plz"
                    value={adresse.plz}
                    onChange={handleAdresseChange}
                    className={`w-full bg-white text-sm rounded-lg py-2 px-3 h-9 ${errors.plz ? 'border-red-300' : 'border-gray-200'}`}
                    required
                  />
                  {errors.plz && (
                    <p className="mt-1 text-xs text-red-500">{errors.plz}</p>
                  )}
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="ort" className="block text-xs font-medium text-gray-700 mb-1">
                    Ort *
                  </Label>
                  <Input
                    id="ort"
                    value={adresse.ort}
                    onChange={handleAdresseChange}
                    className={`w-full bg-white text-sm rounded-lg py-2 px-3 h-9 ${errors.ort ? 'border-red-300' : 'border-gray-200'}`}
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
            className="border-t border-gray-100 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.2 }}
          >
            <div className="flex items-center mb-4 text-[#009FD8]">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <h3 className="font-medium text-sm">Wunschtermin</h3>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="wunschtermin" className="block text-xs font-medium text-gray-700 mb-1">
                  Gewünschter Termin *
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="wunschtermin"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 rounded-lg py-2 px-3 h-9 text-sm",
                        !wunschtermin && "text-gray-500",
                        errors.wunschtermin && "border-red-300"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                      {wunschtermin ? format(wunschtermin, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border border-gray-200 rounded-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={wunschtermin}
                      onSelect={handleWunschterminChange}
                      initialFocus
                      disabled={(date) => date < today}
                      className="bg-white rounded-lg"
                    />
                  </PopoverContent>
                </Popover>
                {errors.wunschtermin && (
                  <p className="mt-1 text-xs text-red-500">{errors.wunschtermin}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="alternativtermin" className="block text-xs font-medium text-gray-700 mb-1">
                  Alternativer Termin (optional)
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="alternativtermin"
                      variant={"outline"}
                      className="w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 rounded-lg py-2 px-3 h-9 text-sm"
                    >
                      <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                      {alternativtermin ? format(alternativtermin, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white border border-gray-200 rounded-lg" align="start">
                    <Calendar
                      mode="single"
                      selected={alternativtermin}
                      onSelect={handleAlternativterminChange}
                      initialFocus
                      disabled={(date) => date < today}
                      className="bg-white rounded-lg"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <p className="text-xs text-gray-500 mt-1">
                Wir bemühen uns, Ihren Wunschtermin einzuhalten. Die tatsächliche Terminvereinbarung erfolgt nach Bestätigung durch unser Team.
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex justify-between mt-8 pt-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.2 }}
        >
          <button
            onClick={goToPreviousStep}
            className="py-2 px-4 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Zurück
          </button>
          
          <button
            onClick={handleContinue}
            className="py-2.5 px-6 rounded-full text-xs font-medium bg-[#009FD8] text-white hover:bg-[#007CAB] transition-colors"
          >
            Weiter
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
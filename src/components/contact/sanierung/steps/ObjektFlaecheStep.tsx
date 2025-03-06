"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Home, Building2, Warehouse, DoorOpen, Stethoscope, Wrench, Plus, Minus } from 'lucide-react'
import { MIN_AREA } from '../utils/priceCalculation'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

type ObjektFlaecheStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const ObjektFlaecheStep: React.FC<ObjektFlaecheStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [isValid, setIsValid] = useState(false)
  const [customObjektTyp, setCustomObjektTyp] = useState(formData.objekt.typCustom || '')
  const [flaeche, setFlaeche] = useState(formData.objekt.flaeche || 0)
  const [schadensbeschreibung, setSchadensbeschreibung] = useState(formData.objekt.schadensbeschreibung || '')
  
  const bereiche = [
    { id: 'wohnzimmer', label: 'Wohnzimmer' },
    { id: 'schlafzimmer', label: 'Schlafzimmer' },
    { id: 'kueche', label: 'Küche' },
    { id: 'bad', label: 'Badezimmer' },
    { id: 'flur', label: 'Flur/Diele' },
    { id: 'keller', label: 'Keller' },
    { id: 'dachboden', label: 'Dachboden' },
    { id: 'buero', label: 'Büro/Arbeitsraum' },
    { id: 'lager', label: 'Lagerraum' }
  ]

  // Ausgewählte Bereiche (Checkboxen)
  const [selectedBereiche, setSelectedBereiche] = useState<string[]>(formData.objekt.betroffeneBereiche || [])

  useEffect(() => {
    // Check if the data is valid to move to the next step
    const hasObjektTyp = formData.objekt.typ && 
      (formData.objekt.typ !== 'sonstiges' || customObjektTyp.trim() !== '')
    
    const hasFlaeche = flaeche > 0
    const hasBereiche = selectedBereiche.length > 0
    
    setIsValid(hasObjektTyp && hasFlaeche && hasBereiche)
  }, [formData.objekt.typ, customObjektTyp, flaeche, selectedBereiche])

  const handleObjektTypChange = (typ: FormData['objekt']['typ']) => {
    updateFormData({ 
      objekt: { 
        ...formData.objekt, 
        typ 
      } 
    })
  }

  const handleCustomObjektTypChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomObjektTyp(e.target.value)
    updateFormData({ 
      objekt: { 
        ...formData.objekt, 
        typCustom: e.target.value 
      }
    })
  }

  const handleFlaecheChange = (value: number) => {
    setFlaeche(value)
    updateFormData({ 
      objekt: { 
        ...formData.objekt, 
        flaeche: value 
      }
    })
  }

  const handleSchadensbeschreibungChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSchadensbeschreibung(e.target.value)
    updateFormData({ 
      objekt: { 
        ...formData.objekt, 
        schadensbeschreibung: e.target.value 
      }
    })
  }

  const handleBereichToggle = (bereichId: string) => {
    setSelectedBereiche(prev => {
      const newBereiche = prev.includes(bereichId)
        ? prev.filter(id => id !== bereichId)
        : [...prev, bereichId]

      updateFormData({
        objekt: {
          ...formData.objekt,
          betroffeneBereiche: newBereiche
        }
      })

      return newBereiche
    })
  }

  const objektTypOptions = [
    { id: 'wohnung', label: 'Wohnung', icon: <Home className="h-6 w-6" /> },
    { id: 'haus', label: 'Haus', icon: <Building2 className="h-6 w-6" /> },
    { id: 'gewerbe', label: 'Gewerbe', icon: <Warehouse className="h-6 w-6" /> },
    { id: 'keller', label: 'Keller', icon: <DoorOpen className="h-6 w-6" /> },
    { id: 'dachboden', label: 'Dachboden', icon: <Stethoscope className="h-6 w-6" /> },
    { id: 'sonstiges', label: 'Sonstiges', icon: <Wrench className="h-6 w-6" /> }
  ]

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
          Objekt & Fläche
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte geben Sie Informationen zum betroffenen Objekt und der Schadensfläche an.
        </motion.p>
      </div>

      {/* Objekttyp Auswahl */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Art des Objekts:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {objektTypOptions.map((option) => (
            <motion.div
              key={option.id}
              onClick={() => handleObjektTypChange(option.id as FormData['objekt']['typ'])}
              className={`p-4 rounded-lg border border-gray-200 cursor-pointer transition-all ${
                formData.objekt.typ === option.id
                  ? 'border-accent bg-accent/5 ring-1 ring-accent/20'
                  : 'hover:border-accent/30 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-2 rounded-full ${
                  formData.objekt.typ === option.id ? 'bg-accent text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.icon}
                </div>
                <h3 className="mt-2 text-sm font-medium">{option.label}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {formData.objekt.typ === 'sonstiges' && (
          <motion.div 
            className="mt-4 max-w-lg mx-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Input
              value={customObjektTyp}
              onChange={handleCustomObjektTypChange}
              placeholder="Bitte Objekttyp angeben"
              className="w-full"
            />
          </motion.div>
        )}
      </div>

      {/* Betroffene Bereiche */}
      <div className="mb-8 max-w-4xl mx-auto">
        <h3 className="text-lg font-medium mb-4">Betroffene Bereiche:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {bereiche.map((bereich) => (
            <div key={bereich.id} className="flex items-start space-x-2">
              <Checkbox 
                id={`bereich-${bereich.id}`}
                checked={selectedBereiche.includes(bereich.id)}
                onCheckedChange={() => handleBereichToggle(bereich.id)}
                className="mt-1"
              />
              <Label 
                htmlFor={`bereich-${bereich.id}`}
                className="cursor-pointer"
              >
                {bereich.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Fläche Eingabe */}
      <div className="mb-8 max-w-2xl mx-auto">
        <h3 className="text-lg font-medium mb-4">Betroffene Fläche:</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center w-full sm:w-72">
            <button
              type="button"
              onClick={() => flaeche > 0 && handleFlaecheChange(flaeche - 5)}
              className="p-2 bg-gray-100 rounded-l-lg text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Minus className="h-5 w-5" />
            </button>
            <Input
              type="number"
              value={flaeche}
              onChange={(e) => handleFlaecheChange(parseInt(e.target.value) || 0)}
              min={0}
              className="text-center rounded-none border-x-0"
            />
            <button
              type="button"
              onClick={() => handleFlaecheChange(flaeche + 5)}
              className="p-2 bg-gray-100 rounded-r-lg text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <span className="text-gray-700">m²</span>
          
          {flaeche > 0 && flaeche < MIN_AREA && (
            <span className="text-sm text-amber-600">
              Mindestfläche für die Berechnung: {MIN_AREA} m²
            </span>
          )}
        </div>
      </div>

      {/* Schadensbeschreibung */}
      <div className="mb-8 max-w-2xl mx-auto">
        <h3 className="text-lg font-medium mb-4">Schadensbeschreibung:</h3>
        <Textarea
          value={schadensbeschreibung}
          onChange={handleSchadensbeschreibungChange}
          placeholder="Beschreiben Sie den Schaden kurz (optional)"
          className="w-full h-32"
        />
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
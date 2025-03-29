/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Textarea } from '@/components/ui/textarea'
import { Home, Building2, Warehouse, DoorOpen, Pencil, Store, Ruler, ArrowRight, ArrowLeft } from 'lucide-react'
import { Checkbox2 } from '@/components/ui/checkbox2'
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
  const [error, setError] = useState('')
  const [hoveredType, setHoveredType] = useState<string | null>(null)
  
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
    
    setIsValid(Boolean(hasObjektTyp && hasFlaeche && hasBereiche))
  }, [formData.objekt.typ, customObjektTyp, flaeche, selectedBereiche])

  const handleObjektTypChange = (typ: FormData['objekt']['typ']) => {
    updateFormData({ 
      objekt: { 
        ...formData.objekt, 
        typ 
      } 
    })
  }

  const handleCustomObjektTypChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomObjektTyp(e.target.value)
    updateFormData({ 
      objekt: { 
        ...formData.objekt, 
        typCustom: e.target.value 
      }
    })
  }

  const handleFlaecheChange = useCallback((newValue: number) => {
    const value = Math.max(1, newValue); // Mindestens 1 m²
    setFlaeche(value);
    updateFormData({ 
      objekt: { 
        ...formData.objekt, 
        flaeche: value 
      }
    });
  }, [formData.objekt, updateFormData]);

  const handleSchadensbeschreibungChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSchadensbeschreibung(e.target.value)
    updateFormData({ 
      objekt: { 
        ...formData.objekt, 
        schadensbeschreibung: e.target.value 
      }
    })
  }

  const handleBereichToggle = (e: React.ChangeEvent<HTMLInputElement>, bereichId: string) => {
    const checked = e.target.checked;
    
    setSelectedBereiche(prev => {
      const newBereiche = checked
        ? [...prev, bereichId]
        : prev.filter(id => id !== bereichId);

      updateFormData({
        objekt: {
          ...formData.objekt,
          betroffeneBereiche: newBereiche
        }
      });

      return newBereiche;
    });
  }

  const objektTypOptions = [
    { 
      id: 'wohnung', 
      label: 'Wohnung', 
      icon: <Building2 className="h-4 w-4" />,
      description: 'Appartements und Wohneinheiten'
    },
    { 
      id: 'haus', 
      label: 'Haus', 
      icon: <Home className="h-4 w-4" />,
      description: 'Einfamilien- und Mehrfamilienhäuser'
    },
    { 
      id: 'gewerbe', 
      label: 'Gewerbe', 
      icon: <Store className="h-4 w-4" />,
      description: 'Geschäfte, Büros und Gewerbegebäude'
    },
    { 
      id: 'keller', 
      label: 'Keller', 
      icon: <DoorOpen className="h-4 w-4" />,
      description: 'Kellerräume und Untergeschosse'
    },
    { 
      id: 'dachboden', 
      label: 'Dachboden', 
      icon: <Warehouse className="h-4 w-4" />,
      description: 'Dachgeschosse und Speicherräume'
    },
    { 
      id: 'sonstiges', 
      label: 'Sonstiges', 
      icon: <Pencil className="h-4 w-4" />,
      description: 'Andere Objekttypen'
    }
  ]

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
          Objekt & Fläche
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Bitte geben Sie Informationen zum betroffenen Objekt und der Schadensfläche an.
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          {/* Objekttyp Auswahl */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <h3 className="text-xs font-medium text-gray-700 mb-3">Art des Objekts:</h3>
            <div className="space-y-2">
              {objektTypOptions.map((option) => (
                <div 
                  key={option.id}
                  onClick={() => handleObjektTypChange(option.id as FormData['objekt']['typ'])}
                  className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    formData.objekt.typ === option.id 
                      ? 'bg-[#E6F4FA] border-[#009FD8]' 
                      : 'bg-white border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className={`mr-2 w-4 h-4 rounded-full flex items-center justify-center ${
                    formData.objekt.typ === option.id
                      ? 'bg-[#009FD8]'
                      : 'border border-gray-300'
                  }`}>
                    {formData.objekt.typ === option.id && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-xs text-gray-700">{option.label}</h3>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {formData.objekt.typ === 'sonstiges' && (
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.2 }}
              >
                <Label htmlFor="customObjektTyp" className="block text-xs font-medium text-gray-700 mb-1.5">
                  Bitte beschreiben Sie das Objekt genauer:
                </Label>
                <Textarea
                  id="customObjektTyp"
                  value={customObjektTyp}
                  onChange={handleCustomObjektTypChange}
                  placeholder="Art des Objekts, Besonderheiten..."
                  className="w-full border-gray-200 focus:ring-1 focus:ring-[#009FD8]/30 focus:border-[#009FD8]/30 text-sm rounded-lg bg-white"
                  rows={2}
                />
              </motion.div>
            )}
          </div>

          {/* Betroffene Bereiche mit Checkbox2 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <h3 className="text-xs font-medium text-gray-700 mb-3">
              Betroffene Bereiche
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2">
              {bereiche.map((bereich) => (
                <div key={bereich.id} className="flex items-start space-x-2 p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors bg-white">
                  <Checkbox2
                    id={`bereich-${bereich.id}`}
                    checked={selectedBereiche.includes(bereich.id)}
                    onChange={(e) => handleBereichToggle(e, bereich.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Label htmlFor={`bereich-${bereich.id}`} className="flex items-center text-xs font-medium text-gray-700">
                      {bereich.label}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fläche Eingabe */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <Label htmlFor="flaeche" className="block text-xs font-medium text-gray-700 mb-3 flex items-center">
              <Ruler className="h-3.5 w-3.5 mr-1.5 text-[#009FD8]" />
              Betroffene Fläche
            </Label>
            <div className="flex max-w-xs bg-white">
              <button
                type="button"
                onClick={() => handleFlaecheChange(flaeche - 5)}
                className="px-3 py-1.5 bg-gray-50 rounded-l-lg border border-gray-200 hover:bg-gray-100 transition-colors text-gray-700 text-sm"
              >
                -
              </button>
              <input
                id="flaeche"
                type="text"
                inputMode="numeric"
                value={flaeche}
                onChange={(e) => handleFlaecheChange(parseInt(e.target.value) || 1)}
                className="w-16 px-3 py-1.5 border-t border-b border-gray-200 text-center focus:outline-none focus:ring-0 text-sm bg-white"
                style={{ appearance: "textfield" }}
              />
              <button
                type="button"
                onClick={() => handleFlaecheChange(flaeche + 5)}
                className="px-3 py-1.5 bg-gray-50 rounded-r-lg border border-gray-200 hover:bg-gray-100 transition-colors text-gray-700 text-sm"
              >
                +
              </button>
              <span className="ml-3 flex items-center text-sm">m²</span>
            </div>
            <p className="mt-1.5 text-xs text-gray-500">
              Geben Sie die ungefähre Größe der betroffenen Fläche an.
            </p>
          </div>

          {/* Schadensbeschreibung */}
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <Label htmlFor="schadensbeschreibung" className="block text-xs font-medium text-gray-700 mb-1.5">
              Schadensbeschreibung
            </Label>
            <Textarea
              id="schadensbeschreibung"
              rows={3}
              value={schadensbeschreibung}
              onChange={handleSchadensbeschreibungChange}
              placeholder="Beschreiben Sie den Schaden kurz (optional)"
              className="w-full border-gray-200 rounded-lg text-sm bg-white"
            />
          </div>
        </motion.div>
        
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
          className="flex justify-between mt-7 pt-5 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <motion.button
            onClick={goToPreviousStep}
            className="py-2 px-4 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors bg-white flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Zurück
          </motion.button>

          <motion.button
            onClick={goToNextStep}
            disabled={!isValid}
            className={`py-2.5 px-6 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
              isValid
                ? 'bg-[#009FD8] text-white hover:bg-[#007CAB]'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={isValid ? { scale: 1.01 } : {}}
            whileTap={isValid ? { scale: 0.99 } : {}}
          >
            Weiter
            {isValid && <ArrowRight className="h-3.5 w-3.5" />}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
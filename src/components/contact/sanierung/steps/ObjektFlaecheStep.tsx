"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Home, Building2, Warehouse, DoorOpen, Pencil, Store, Ruler } from 'lucide-react'
import { Checkbox2 } from '@/components/ui/checkbox2'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

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
      icon: <Building2 className="h-5 w-5" />,
      description: 'Appartements und Wohneinheiten'
    },
    { 
      id: 'haus', 
      label: 'Haus', 
      icon: <Home className="h-5 w-5" />,
      description: 'Einfamilien- und Mehrfamilienhäuser'
    },
    { 
      id: 'gewerbe', 
      label: 'Gewerbe', 
      icon: <Store className="h-5 w-5" />,
      description: 'Geschäfte, Büros und Gewerbegebäude'
    },
    { 
      id: 'keller', 
      label: 'Keller', 
      icon: <DoorOpen className="h-5 w-5" />,
      description: 'Kellerräume und Untergeschosse'
    },
    { 
      id: 'dachboden', 
      label: 'Dachboden', 
      icon: <Warehouse className="h-5 w-5" />,
      description: 'Dachgeschosse und Speicherräume'
    },
    { 
      id: 'sonstiges', 
      label: 'Sonstiges', 
      icon: <Pencil className="h-5 w-5" />,
      description: 'Andere Objekttypen'
    }
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

      <div className="max-w-2xl mx-auto">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {/* Objekttyp Auswahl - im Stil von SecurityTypeStep / ReinigungsartStep */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Art des Objekts:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {objektTypOptions.map((option) => (
                <motion.div
                  key={option.id}
                  className={`flex items-center h-auto px-4 py-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                    formData.objekt.typ === option.id 
                      ? 'border-accent/20 bg-accent/5 shadow-sm' 
                      : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleObjektTypChange(option.id as FormData['objekt']['typ'])}
                  onMouseEnter={() => setHoveredType(option.id)}
                  onMouseLeave={() => setHoveredType(null)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`mr-3 ${
                    formData.objekt.typ === option.id 
                      ? 'text-accent' 
                      : hoveredType === option.id 
                        ? 'text-accent' 
                        : 'text-gray-400'
                  }`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm text-gray-700">{option.label}</h3>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {formData.objekt.typ === 'sonstiges' && (
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="customObjektTyp" className="block text-sm font-medium text-gray-700 mb-2">
                  Bitte beschreiben Sie das Objekt genauer:
                </Label>
                <Textarea
                  id="customObjektTyp"
                  value={customObjektTyp}
                  onChange={handleCustomObjektTypChange}
                  placeholder="Art des Objekts, Besonderheiten..."
                  className="w-full border-gray-200 focus:ring-1 focus:ring-accent/30 focus:border-accent/30 text-gray-700"
                  rows={2}
                />
              </motion.div>
            )}
          </div>

          {/* Betroffene Bereiche mit Checkbox2 */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              Betroffene Bereiche
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {bereiche.map((bereich) => (
                <div key={bereich.id} className="flex items-start space-x-2 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <Checkbox2
                    id={`bereich-${bereich.id}`}
                    checked={selectedBereiche.includes(bereich.id)}
                    onChange={(e) => handleBereichToggle(e, bereich.id)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Label htmlFor={`bereich-${bereich.id}`} className="flex items-center text-sm font-medium text-gray-700">
                      {bereich.label}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fläche Eingabe - im Stil der Reinigung/Security FlaecheInfoStep */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <Label htmlFor="flaeche" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Ruler className="h-4 w-4 mr-2 text-accent" />
              Betroffene Fläche
            </Label>
            <div className="flex max-w-xs">
              <button
                type="button"
                onClick={() => handleFlaecheChange(flaeche - 5)}
                className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
              >
                -
              </button>
              <input
                id="flaeche"
                type="text"
                inputMode="numeric"
                value={flaeche}
                onChange={(e) => handleFlaecheChange(parseInt(e.target.value) || 1)}
                className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
                style={{ appearance: "textfield" }}
              />
              <button
                type="button"
                onClick={() => handleFlaecheChange(flaeche + 5)}
                className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
              >
                +
              </button>
              <span className="ml-3 flex items-center">m²</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Geben Sie die ungefähre Größe der betroffenen Fläche an.
            </p>
          </div>

          {/* Schadensbeschreibung */}
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <Label htmlFor="schadensbeschreibung" className="block text-sm font-medium text-gray-700 mb-1">
              Schadensbeschreibung
            </Label>
            <Textarea
              id="schadensbeschreibung"
              rows={3}
              value={schadensbeschreibung}
              onChange={handleSchadensbeschreibungChange}
              placeholder="Beschreiben Sie den Schaden kurz (optional)"
              className="w-full bg-white"
            />
          </div>
        </motion.div>
        
        {error && (
          <motion.p 
            className="text-red-500 text-sm text-center mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
        
        <motion.div 
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
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
            onClick={goToNextStep}
            disabled={!isValid}
            className={`py-3 px-8 rounded-md font-medium transition-all duration-200 ${
              isValid
                ? 'bg-accent text-white hover:bg-accent-dark hover:shadow-md'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={isValid ? { scale: 1.03 } : {}}
            whileTap={isValid ? { scale: 0.97 } : {}}
          >
            Weiter
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
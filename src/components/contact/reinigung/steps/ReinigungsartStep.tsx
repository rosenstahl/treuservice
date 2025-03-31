"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../ReinigungWizard'
import {
  Sparkle,
  Droplet,
  Factory,
  ShieldCheck,
  Trees,
  Wrench,
  Bus,
  Hotel,
  Ticket,
  HardHat,
  Mountain,
  Home,
  Sun,
  PenTool,
  Building2,
  Info
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type ReinigungsartStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Wir definieren einen Typ, der den leeren String ausschließt
type NonEmptyReinigungsart = Exclude<FormData['reinigungsart']['hauptkategorie'], ''>

// Icons für die verschiedenen Reinigungsarten
const icons: Record<NonEmptyReinigungsart, React.ReactNode> = {
  unterhaltsreinigung: <Building2 className="h-4 w-4" />,
  grundreinigung: <Sparkle className="h-4 w-4" />,
  glas_fassade: <Droplet className="h-4 w-4" />,
  industrie: <Factory className="h-4 w-4" />,
  reinraum: <ShieldCheck className="h-4 w-4" />,
  aussenanlagen: <Trees className="h-4 w-4" />,
  sonderreinigung: <Wrench className="h-4 w-4" />,
  verkehrsmittel: <Bus className="h-4 w-4" />,
  hotel: <Hotel className="h-4 w-4" />,
  veranstaltung: <Ticket className="h-4 w-4" />,
  baureinigung: <HardHat className="h-4 w-4" />,
  steinreinigung: <Mountain className="h-4 w-4" />,
  dachreinigung: <Home className="h-4 w-4" />,
  solaranlagen: <Sun className="h-4 w-4" />,
  sonstiges: <PenTool className="h-4 w-4" />
}

// Titel für die Reinigungsarten
const titles: Record<NonEmptyReinigungsart, string> = {
  unterhaltsreinigung: "Unterhaltsreinigung",
  grundreinigung: "Grundreinigung",
  glas_fassade: "Glas & Fassade",
  industrie: "Industriereinigung",
  reinraum: "Reinraumreinigung",
  aussenanlagen: "Außenanlagenpflege",
  sonderreinigung: "Sonderreinigung",
  verkehrsmittel: "Verkehrsmittelreinigung",
  hotel: "Hotelreinigung",
  veranstaltung: "Veranstaltungsreinigung",
  baureinigung: "Baureinigung",
  steinreinigung: "Steinreinigung",
  dachreinigung: "Dachreinigung",
  solaranlagen: "Solaranlagenreinigung",
  sonstiges: "Sonstige Reinigung"
}

export const ReinigungsartStep: React.FC<ReinigungsartStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep
}) => {
  const [selectedType, setSelectedType] = useState<FormData['reinigungsart']['hauptkategorie']>(formData.reinigungsart.hauptkategorie)
  const [customType, setCustomType] = useState(formData.reinigungsart.sonstigesText || '')
  const [error, setError] = useState('')
  const [hoveredType, setHoveredType] = useState<string | null>(null)

  const handleReinigungsartSelect = (type: FormData['reinigungsart']['hauptkategorie']) => {
    setSelectedType(type)
    setError('')
    updateFormData({ 
      reinigungsart: {
        hauptkategorie: type,
        sonstigesText: formData.reinigungsart.sonstigesText
      }
    })
    
    // Wenn es nicht "sonstiges" ist, direkt zum nächsten Schritt gehen
    if (type !== 'sonstiges') {
      goToNextStep()
    }
  }

  const handleCustomTypeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setCustomType(value)
    updateFormData({ 
      reinigungsart: {
        hauptkategorie: selectedType,
        sonstigesText: value
      }
    })
  }

  const handleContinue = () => {
    if (!selectedType) {
      setError('Bitte wählen Sie eine Reinigungsart aus')
      return
    }
    
    if (selectedType === 'sonstiges' && !customType.trim()) {
      setError('Bitte beschreiben Sie die gewünschte Reinigungsleistung')
      return
    }
    
    goToNextStep()
  }

  const reinigungsarten: Array<NonEmptyReinigungsart> = [
    'unterhaltsreinigung', 'grundreinigung', 'glas_fassade', 'industrie', 'reinraum',
    'aussenanlagen', 'sonderreinigung', 'verkehrsmittel', 'hotel', 'veranstaltung',
    'baureinigung', 'steinreinigung', 'dachreinigung', 'solaranlagen', 'sonstiges'
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
          Welche Reinigungsleistung benötigen Sie?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Wählen Sie die Art der Reinigung, die Sie beauftragen möchten.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        {reinigungsarten.map((type) => (
          <motion.div
            key={type}
            className={`flex items-center h-10 px-3 rounded-full border transition-all duration-200 cursor-pointer ${
              selectedType === type 
                ? 'border-[#009FD8] bg-[#E6F4FA] shadow-sm' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handleReinigungsartSelect(type)}
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
          >
            <div className={`mr-2 ${
              selectedType === type 
                ? 'text-[#009FD8]' 
                : hoveredType === type 
                  ? 'text-[#009FD8]' 
                  : 'text-gray-400'
            }`}>
              {type ? icons[type as NonEmptyReinigungsart] : null}
            </div>
            <h3 className="font-medium text-xs text-gray-700">{type ? titles[type as NonEmptyReinigungsart] : ""}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Eingabefeld für benutzerdefinierte Reinigungsart */}
      {selectedType === 'sonstiges' && (
        <motion.div
          className="mt-6 max-w-xl mx-auto bg-white border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center mb-4 text-[#009FD8]">
            <Info className="w-4 h-4 mr-2" />
            <h3 className="font-medium text-sm">Details zur Reinigungsart</h3>
          </div>
          
          <Label htmlFor="customType" className="block text-xs font-medium text-gray-700 mb-1">
            Bitte beschreiben Sie, welche Reinigungsleistung Sie benötigen:
          </Label>
          <Textarea
            id="customType"
            value={customType}
            onChange={handleCustomTypeChange}
            placeholder="z.B. Poolreinigung, Jalousiereinigung, etc."
            className="w-full border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8] text-gray-700"
            rows={4}
          />
          
          <div className="flex justify-center mt-8 pb-2">
            <button
              onClick={handleContinue}
              className={`py-2.5 px-6 rounded-full text-xs font-medium transition-all duration-200 ${
                customType.trim() 
                  ? 'bg-[#009FD8] text-white hover:bg-[#007CAB]' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Weiter
            </button>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.p 
          className="text-red-500 text-xs text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
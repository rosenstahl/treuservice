"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SecurityWizard'
import {
  Building,
  Factory,
  HardHat,
  Home,
  Landmark,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  KeyRound,
  Hotel,
  Tickets,
  CircleUser,
  MoveVertical,
  ParkingCircle,
  CarFront,
  PenTool,
  Info
} from 'lucide-react'

type SecurityTypeStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Icons für die verschiedenen Security-Typen
const icons: Record<string, React.ReactNode> = {
  objektschutz: <Building className="h-4 w-4" />,
  werkschutz: <Factory className="h-4 w-4" />,
  baustellenbewachung: <HardHat className="h-4 w-4" />,
  asylunterkuenfte: <Home className="h-4 w-4" />,
  city_streife: <Landmark className="h-4 w-4" />,
  revierstreifendienst: <MapPin className="h-4 w-4" />,
  doorman: <KeyRound className="h-4 w-4" />,
  ladendetektiv: <ShoppingBag className="h-4 w-4" />,
  empfangsdienst: <ShieldCheck className="h-4 w-4" />,
  nightaudit: <Hotel className="h-4 w-4" />,
  eventschutz: <Tickets className="h-4 w-4" />,
  standwache: <CircleUser className="h-4 w-4" />,
  ordnerdienst: <MoveVertical className="h-4 w-4" />,
  parkraummanagement: <ParkingCircle className="h-4 w-4" />,
  chauffeurservice: <CarFront className="h-4 w-4" />,
  sonstiges: <PenTool className="h-4 w-4" />
}

// Titel für die Security-Typen
const titles: Record<string, string> = {
  objektschutz: "Objektschutz",
  werkschutz: "Werkschutz",
  baustellenbewachung: "Baustellenbewachung",
  asylunterkuenfte: "Sicherheit für Asylunterkünfte",
  city_streife: "City-Streife",
  revierstreifendienst: "Revier- & Streifendienst",
  doorman: "Doorman",
  ladendetektiv: "Laden- & Kaufhausdetektiv",
  empfangsdienst: "Empfangs- & Pfortendienst",
  nightaudit: "Night-Audit",
  eventschutz: "Event- & Veranstaltungsschutz",
  standwache: "Standwache / Messeschutz",
  ordnerdienst: "Ordnerdienst",
  parkraummanagement: "Parkraummanagement",
  chauffeurservice: "Fahr- & Chauffeurservice",
  sonstiges: "Sonstige Sicherheitsdienste"
}

export const SecurityTypeStep: React.FC<SecurityTypeStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep
}) => {
  const [selectedType, setSelectedType] = useState<FormData['securityType']['hauptkategorie']>(formData.securityType.hauptkategorie)
  const [customType, setCustomType] = useState(formData.securityType.sonstigesText || '')
  const [error, setError] = useState('')
  const [hoveredType, setHoveredType] = useState<string | null>(null)

  const handleSecurityTypeSelect = (type: FormData['securityType']['hauptkategorie']) => {
    setSelectedType(type)
    setError('')
    updateFormData({ 
      securityType: {
        hauptkategorie: type,
        sonstigesText: formData.securityType.sonstigesText
      }
    })
    
    // Wenn es nicht "sonstiges" ist, direkt zum nächsten Schritt gehen
    if (type !== 'sonstiges') {
      goToNextStep()
    }
  }

  const handleCustomTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomType(value)
    updateFormData({ 
      securityType: {
        hauptkategorie: selectedType,
        sonstigesText: value
      }
    })
  }

  const handleContinue = () => {
    if (!selectedType) {
      setError('Bitte wählen Sie eine Sicherheitsdienstleistung aus')
      return
    }
    
    if (selectedType === 'sonstiges' && !customType.trim()) {
      setError('Bitte beschreiben Sie den gewünschten Sicherheitsdienst')
      return
    }
    
    goToNextStep()
  }

  const securityTypes: Array<FormData['securityType']['hauptkategorie']> = [
    'objektschutz', 'werkschutz', 'baustellenbewachung', 'asylunterkuenfte', 'city_streife',
    'revierstreifendienst', 'doorman', 'ladendetektiv', 'empfangsdienst', 'nightaudit',
    'eventschutz', 'standwache', 'ordnerdienst', 'parkraummanagement', 'chauffeurservice', 'sonstiges'
  ]

  return (
    <motion.div 
      className="space-y-8"
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
          Welche Sicherheitsdienstleistung suchen Sie?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Wählen Sie die Art des Sicherheitsdienstes, den Sie beauftragen möchten.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        {securityTypes.map((type) => (
          <motion.div
            key={type}
            className={`flex items-center h-10 px-3 rounded-full border transition-all duration-200 cursor-pointer ${
              selectedType === type 
                ? 'border-[#009FD8] bg-[#E6F4FA] shadow-sm' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handleSecurityTypeSelect(type)}
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
              {type ? icons[type] : null}
            </div>
            <h3 className="font-medium text-xs text-gray-700">{type ? titles[type] : ""}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Eingabefeld für benutzerdefinierte Sicherheitsdienstleistung */}
      {selectedType === 'sonstiges' && (
        <motion.div
          className="mt-6 max-w-xl mx-auto bg-white border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center mb-5 text-[#009FD8]">
            <Info className="w-4 h-4 mr-2" />
            <h3 className="font-medium text-sm">Details zum Sicherheitsdienst</h3>
          </div>
          
          <label htmlFor="customType" className="block text-xs font-medium text-gray-700 mb-1">
            Bitte beschreiben Sie, welchen Sicherheitsdienst Sie benötigen:
          </label>
          <input
            type="text"
            id="customType"
            name="customType"
            value={customType}
            onChange={handleCustomTypeChange}
            placeholder="z.B. Personenschutz, Transportbegleitung, etc."
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8] text-gray-700"
            autoFocus
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
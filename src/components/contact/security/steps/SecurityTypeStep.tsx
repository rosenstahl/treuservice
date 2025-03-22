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
  PenTool
} from 'lucide-react'

type SecurityTypeStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Icons für die verschiedenen Security-Typen
const icons: Record<string, React.ReactNode> = {
  objektschutz: <Building className="h-5 w-5" />,
  werkschutz: <Factory className="h-5 w-5" />,
  baustellenbewachung: <HardHat className="h-5 w-5" />,
  asylunterkuenfte: <Home className="h-5 w-5" />,
  city_streife: <Landmark className="h-5 w-5" />,
  revierstreifendienst: <MapPin className="h-5 w-5" />,
  doorman: <KeyRound className="h-5 w-5" />,
  ladendetektiv: <ShoppingBag className="h-5 w-5" />,
  empfangsdienst: <ShieldCheck className="h-5 w-5" />,
  nightaudit: <Hotel className="h-5 w-5" />,
  eventschutz: <Tickets className="h-5 w-5" />,
  standwache: <CircleUser className="h-5 w-5" />,
  ordnerdienst: <MoveVertical className="h-5 w-5" />,
  parkraummanagement: <ParkingCircle className="h-5 w-5" />,
  chauffeurservice: <CarFront className="h-5 w-5" />,
  sonstiges: <PenTool className="h-5 w-5" />
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <motion.h2 
          className="text-2xl font-medium text-gray-800 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          Welche Sicherheitsdienstleistung suchen Sie?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie die Art des Sicherheitsdienstes, den Sie beauftragen möchten.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {securityTypes.map((type) => (
          <motion.div
            key={type}
            className={`flex items-center h-11 px-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedType === type 
                ? 'border-accent/20 bg-accent/5 shadow-sm' 
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => handleSecurityTypeSelect(type)}
            onMouseEnter={() => setHoveredType(type)}
            onMouseLeave={() => setHoveredType(null)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`mr-3 ${
              selectedType === type 
                ? 'text-accent' 
                : hoveredType === type 
                  ? 'text-accent' 
                  : 'text-gray-400'
            }`}>
              {type ? icons[type] : null}
            </div>
            <h3 className="font-medium text-sm text-gray-700">{type ? titles[type] : ""}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Eingabefeld für benutzerdefinierte Sicherheitsdienstleistung */}
      {selectedType === 'sonstiges' && (
        <motion.div
          className="mt-8 max-w-xl mx-auto bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="customType" className="block text-sm font-medium text-gray-700 mb-2">
            Bitte beschreiben Sie, welchen Sicherheitsdienst Sie benötigen:
          </label>
          <input
            type="text"
            id="customType"
            name="customType"
            value={customType}
            onChange={handleCustomTypeChange}
            placeholder="z.B. Personenschutz, Transportbegleitung, etc."
            className="w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-1 focus:ring-accent/30 focus:border-accent/30 text-gray-700"
            autoFocus
          />
          
          <div className="flex justify-center mt-5">
            <motion.button
              onClick={handleContinue}
              className={`py-2 px-8 rounded-md text-sm font-medium transition-all duration-200 ${
                customType.trim() 
                  ? 'bg-accent text-white hover:bg-accent-dark' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={customType.trim() ? { y: -1 } : {}}
              whileTap={customType.trim() ? { scale: 0.98 } : {}}
            >
              Weiter
            </motion.button>
          </div>
        </motion.div>
      )}

      {error && (
        <motion.p 
          className="text-red-500 text-sm text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  )
}
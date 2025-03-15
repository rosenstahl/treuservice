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
const icons = {
  objektschutz: <Building className="h-8 w-8" />,
  werkschutz: <Factory className="h-8 w-8" />,
  baustellenbewachung: <HardHat className="h-8 w-8" />,
  asylunterkuenfte: <Home className="h-8 w-8" />,
  city_streife: <Landmark className="h-8 w-8" />,
  revierstreifendienst: <MapPin className="h-8 w-8" />,
  doorman: <KeyRound className="h-8 w-8" />,
  ladendetektiv: <ShoppingBag className="h-8 w-8" />,
  empfangsdienst: <ShieldCheck className="h-8 w-8" />,
  nightaudit: <Hotel className="h-8 w-8" />,
  eventschutz: <Tickets className="h-8 w-8" />,
  standwache: <CircleUser className="h-8 w-8" />,
  ordnerdienst: <MoveVertical className="h-8 w-8" />,
  parkraummanagement: <ParkingCircle className="h-8 w-8" />,
  chauffeurservice: <CarFront className="h-8 w-8" />,
  sonstiges: <PenTool className="h-8 w-8" />
}

// Titel für die Security-Typen
const titles = {
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

  const handleSecurityTypeSelect = (type: FormData['securityType']['hauptkategorie']) => {
    setSelectedType(type)
    setError('')
    updateFormData({ 
      securityType: {
        hauptkategorie: type,
        sonstigesText: formData.securityType.sonstigesText
      }
    })
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {securityTypes.map((type) => (
          <motion.div
            key={type}
            className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all cursor-pointer 
              ${selectedType === type ? 'border-accent bg-accent/5 shadow-md' : 'border-gray-200 hover:border-accent/50'}`}
            onClick={() => handleSecurityTypeSelect(type)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`p-2 rounded-full mb-2 ${selectedType === type ? 'text-accent' : 'text-gray-500'}`}>
              {icons[type]}
            </div>
            <h3 className="font-medium text-gray-800 text-sm text-center mb-1">{titles[type]}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Eingabefeld für benutzerdefinierte Sicherheitsdienstleistung */}
      {selectedType === 'sonstiges' && (
        <motion.div
          className="mt-6 max-w-xl mx-auto"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <label htmlFor="customType" className="block text-sm font-medium text-gray-700 mb-1">
            Bitte beschreiben Sie, welchen Sicherheitsdienst Sie benötigen:
          </label>
          <input
            type="text"
            id="customType"
            name="customType"
            value={customType}
            onChange={handleCustomTypeChange}
            placeholder="z.B. Personenschutz, Transportbegleitung, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
            autoFocus
          />
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
      
      <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <motion.button
          onClick={handleContinue}
          className={`py-3 px-8 rounded-md font-medium transition-all duration-200 
            ${selectedType ? 'bg-accent text-white hover:bg-accent-dark' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          whileHover={selectedType ? { scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" } : {}}
          whileTap={selectedType ? { scale: 0.97 } : {}}
        >
          Weiter
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
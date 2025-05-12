"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntkernungWizard'
import { 
  Home, 
  Building2, 
  Factory,
  Store, 
  Landmark, 
  PenTool,
  Info
} from 'lucide-react'

type ObjektTypStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Objekttypen mit Icons
const objektTypOptions: Array<{
  value: FormData['objektTyp'];
  label: string;
  icon: React.ReactNode;
}> = [
  { value: 'wohnung', label: 'Wohnung', icon: <Building2 className="h-4 w-4" /> },
  { value: 'haus', label: 'Haus/Villa', icon: <Home className="h-4 w-4" /> },
  { value: 'gewerbe', label: 'Gewerbeobjekt', icon: <Store className="h-4 w-4" /> },
  { value: 'industriegebaeude', label: 'Industriegebäude', icon: <Factory className="h-4 w-4" /> },
  { value: 'oeffentlichesgebaeude', label: 'Öffentliches Gebäude', icon: <Landmark className="h-4 w-4" /> },
  { value: 'sonstiges', label: 'Sonstiges Objekt', icon: <PenTool className="h-4 w-4" /> }
]

export const ObjektTypStep: React.FC<ObjektTypStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep
}) => {
  const [selectedType, setSelectedType] = useState<FormData['objektTyp']>(formData.objektTyp)
  const [baujahr, setBaujahr] = useState(formData.objektDetails.baujahr || '')
  const [flaeche, setFlaeche] = useState(formData.objektDetails.flaeche || 0)
  const [stockwerke, setStockwerke] = useState(formData.objektDetails.stockwerke || 1)
  const [besonderheiten, setBesonderheiten] = useState(formData.objektDetails.besonderheiten || '')
  const [error, setError] = useState('')
  const [hoveredType, setHoveredType] = useState<string | null>(null)

  const handleObjektTypSelect = (type: FormData['objektTyp']) => {
    setSelectedType(type)
    setError('')
    updateFormData({ objektTyp: type })
  }

  const handleBaujahrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBaujahr(e.target.value)
    updateFormData({ 
      objektDetails: {
        ...formData.objektDetails,
        baujahr: e.target.value
      } 
    })
  }

  const handleFlaecheChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0
    setFlaeche(value)
    updateFormData({ 
      objektDetails: {
        ...formData.objektDetails,
        flaeche: value
      } 
    })
  }

  const handleStockwerkeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value) || 1
    setStockwerke(value)
    updateFormData({ 
      objektDetails: {
        ...formData.objektDetails,
        stockwerke: value
      } 
    })
  }

  const handleBesonderheitenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBesonderheiten(e.target.value)
    updateFormData({ 
      objektDetails: {
        ...formData.objektDetails,
        besonderheiten: e.target.value
      } 
    })
  }

  const handleContinue = () => {
    if (!selectedType) {
      setError('Bitte wählen Sie einen Objekttyp aus')
      return
    }
    
    if (flaeche <= 0) {
      setError('Bitte geben Sie eine gültige Fläche ein')
      return
    }
    
    goToNextStep()
  }

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
          Welches Objekt soll entkernt werden?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Wählen Sie den Objekttyp aus und geben Sie einige grundlegende Informationen an.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        {objektTypOptions.map((option) => (
          <motion.div
            key={option.value}
            className={`flex items-center h-10 px-3 rounded-full border transition-all duration-200 cursor-pointer ${
              selectedType === option.value 
                ? 'border-[#009FD8] bg-[#E6F4FA] shadow-sm' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handleObjektTypSelect(option.value)}
            onMouseEnter={() => setHoveredType(option.value)}
            onMouseLeave={() => setHoveredType(null)}
          >
            <div className={`mr-2 ${
              selectedType === option.value 
                ? 'text-[#009FD8]' 
                : hoveredType === option.value 
                  ? 'text-[#009FD8]' 
                  : 'text-gray-400'
            }`}>
              {option.icon}
            </div>
            <h3 className="font-medium text-xs text-gray-700">{option.label}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Details für das ausgewählte Objekt */}
      {selectedType && (
        <motion.div
          className="mt-6 max-w-xl mx-auto bg-white border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center mb-5 text-[#009FD8]">
            <Info className="w-4 h-4 mr-2" />
            <h3 className="font-medium text-sm">Details zum Objekt</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="baujahr" className="block text-xs font-medium text-gray-700 mb-1">
                Baujahr (ca.)
              </label>
              <input
                type="text"
                id="baujahr"
                name="baujahr"
                value={baujahr}
                onChange={handleBaujahrChange}
                placeholder="z.B. 1980"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8] text-gray-700"
              />
            </div>
            
            <div>
              <label htmlFor="flaeche" className="block text-xs font-medium text-gray-700 mb-1">
                Fläche in m² *
              </label>
              <input
                type="number"
                id="flaeche"
                name="flaeche"
                value={flaeche || ''}
                onChange={handleFlaecheChange}
                placeholder="z.B. 120"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8] text-gray-700"
                required
              />
            </div>
            
            <div>
              <label htmlFor="stockwerke" className="block text-xs font-medium text-gray-700 mb-1">
                Anzahl der Stockwerke
              </label>
              <select
                id="stockwerke"
                name="stockwerke"
                value={stockwerke}
                onChange={handleStockwerkeChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8] text-gray-700"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
                <option value="11">Mehr als 10</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="besonderheiten" className="block text-xs font-medium text-gray-700 mb-1">
                Besonderheiten (optional)
              </label>
              <textarea
                id="besonderheiten"
                name="besonderheiten"
                value={besonderheiten}
                onChange={handleBesonderheitenChange}
                placeholder="z.B. Denkmalschutz, bekannte Schadstoffe, schwieriger Zugang..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8] text-gray-700 h-16"
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-8 pb-2">
            <button
              onClick={handleContinue}
              className={`py-2.5 px-6 rounded-full text-xs font-medium transition-all duration-200 ${
                flaeche > 0 
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
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
  { value: 'wohnung', label: 'Wohnung', icon: <Building2 className="h-5 w-5" /> },
  { value: 'haus', label: 'Haus/Villa', icon: <Home className="h-5 w-5" /> },
  { value: 'gewerbe', label: 'Gewerbeobjekt', icon: <Store className="h-5 w-5" /> },
  { value: 'industriegebaeude', label: 'Industriegebäude', icon: <Factory className="h-5 w-5" /> },
  { value: 'oeffentlichesgebaeude', label: 'Öffentliches Gebäude', icon: <Landmark className="h-5 w-5" /> },
  { value: 'sonstiges', label: 'Sonstiges Objekt', icon: <PenTool className="h-5 w-5" /> }
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
          Welches Objekt soll entkernt werden?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie den Objekttyp aus und geben Sie einige grundlegende Informationen an.
        </motion.p>
      </div>
      
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {objektTypOptions.map((option) => (
          <motion.div
            key={option.value}
            className={`flex items-center h-11 px-4 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedType === option.value 
                ? 'border-accent/20 bg-accent/5 shadow-sm' 
                : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => handleObjektTypSelect(option.value)}
            onMouseEnter={() => setHoveredType(option.value)}
            onMouseLeave={() => setHoveredType(null)}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`mr-3 ${
              selectedType === option.value 
                ? 'text-accent' 
                : hoveredType === option.value 
                  ? 'text-accent' 
                  : 'text-gray-400'
            }`}>
              {option.icon}
            </div>
            <h3 className="font-medium text-sm text-gray-700">{option.label}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Details für das ausgewählte Objekt */}
      {selectedType && (
        <motion.div
          className="mt-8 max-w-3xl mx-auto bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center mb-4 text-accent">
            <Info className="w-5 h-5 mr-2" />
            <h3 className="font-medium">Details zum Objekt</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="baujahr" className="block text-sm font-medium text-gray-700 mb-1">
                Baujahr (ca.)
              </label>
              <input
                type="text"
                id="baujahr"
                name="baujahr"
                value={baujahr}
                onChange={handleBaujahrChange}
                placeholder="z.B. 1980"
                className="w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-1 focus:ring-accent/30 focus:border-accent/30 text-gray-700"
              />
            </div>
            
            <div>
              <label htmlFor="flaeche" className="block text-sm font-medium text-gray-700 mb-1">
                Fläche in m² *
              </label>
              <input
                type="number"
                id="flaeche"
                name="flaeche"
                value={flaeche || ''}
                onChange={handleFlaecheChange}
                placeholder="z.B. 120"
                className="w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-1 focus:ring-accent/30 focus:border-accent/30 text-gray-700"
                required
              />
            </div>
            
            <div>
              <label htmlFor="stockwerke" className="block text-sm font-medium text-gray-700 mb-1">
                Anzahl der Stockwerke
              </label>
              <select
                id="stockwerke"
                name="stockwerke"
                value={stockwerke}
                onChange={handleStockwerkeChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-1 focus:ring-accent/30 focus:border-accent/30 text-gray-700"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
                <option value="11">Mehr als 10</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="besonderheiten" className="block text-sm font-medium text-gray-700 mb-1">
                Besonderheiten (optional)
              </label>
              <textarea
                id="besonderheiten"
                name="besonderheiten"
                value={besonderheiten}
                onChange={handleBesonderheitenChange}
                placeholder="z.B. Denkmalschutz, bekannte Schadstoffe, schwieriger Zugang..."
                className="w-full px-4 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-1 focus:ring-accent/30 focus:border-accent/30 text-gray-700 h-20"
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <motion.button
              onClick={handleContinue}
              className={`py-2 px-8 rounded-md text-sm font-medium transition-all duration-200 
                ${flaeche > 0 ? 'bg-accent text-white hover:bg-accent-dark' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
              whileHover={flaeche > 0 ? { y: -1 } : {}}
              whileTap={flaeche > 0 ? { scale: 0.98 } : {}}
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
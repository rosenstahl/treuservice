"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntkernungWizard'
import { 
  Home, 
  Building2, 
  Factory, 
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

// Icons für die verschiedenen Objekttypen
const icons = {
  wohnung: <Building2 className="h-8 w-8" />,
  haus: <Home className="h-8 w-8" />,
  gewerbe: <Building2 className="h-8 w-8" />,
  industriegebaeude: <Factory className="h-8 w-8" />,
  oeffentlichesgebaeude: <Landmark className="h-8 w-8" />,
  sonstiges: <PenTool className="h-8 w-8" />
}

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

  const objektTypes: Array<FormData['objektTyp']> = ['wohnung', 'haus', 'gewerbe', 'industriegebaeude', 'oeffentlichesgebaeude', 'sonstiges']

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
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {objektTypes.map((type) => (
          <motion.div
            key={type}
            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all cursor-pointer h-[120px] 
              ${selectedType === type ? 'border-accent bg-accent/5 shadow-md' : 'border-gray-200 hover:border-accent/50'}`}
            onClick={() => handleObjektTypSelect(type)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`p-3 rounded-full mb-3 ${selectedType === type ? 'text-accent' : 'text-gray-500'}`}>
              {icons[type]}
            </div>
            <h3 className="font-medium text-gray-800 capitalize mb-1 text-center">{type.replace('oeffentlichesgebaeude', 'Öffentliches Gebäude').replace('industriegebaeude', 'Industriegebäude')}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Details für das ausgewählte Objekt */}
      {selectedType && (
        <motion.div
          className="mt-8 max-w-3xl mx-auto bg-gray-50 p-6 rounded-lg border border-gray-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent h-20"
              />
            </div>
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
      
      <motion.div 
        className="flex justify-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <motion.button
          onClick={handleContinue}
          className={`py-3 px-8 rounded-md font-medium transition-all duration-200 
            ${selectedType && flaeche > 0 ? 'bg-accent text-white hover:bg-accent/90' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          whileHover={selectedType && flaeche > 0 ? { scale: 1.03, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" } : {}}
          whileTap={selectedType && flaeche > 0 ? { scale: 0.97 } : {}}
        >
          Weiter
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

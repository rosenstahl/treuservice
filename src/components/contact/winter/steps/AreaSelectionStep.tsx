"use client"

import React, { useState } from 'react'
import { FormData } from '../WinterdienstWizard'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Dynamischer Import der Google Maps Komponente, um SSR-Probleme zu vermeiden
const AreaDrawingMap = dynamic(
  () => import('./AreaDrawingMap'),
  { ssr: false }
);

type AreaSelectionStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const AreaSelectionStep: React.FC<AreaSelectionStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  // Initial vom formData.area.value laden, aber danach unabhängig
  const [areaSize, setAreaSize] = useState(formData.area.value > 0 ? formData.area.value.toString() : "")
  const [isManualMode, setIsManualMode] = useState(formData.area.manual)
  
  const handleAreaChange = ({ area, coordinates }: { area: number; coordinates: Array<[number, number]> }) => {
    // Nur formData aktualisieren, aber nicht die manuelle Eingabe
    if (!isManualMode) {
      updateFormData({
        area: {
          ...formData.area,
          manual: false,
          value: area,
          coordinates: coordinates
        }
      });
    }
  };
  
  const handleContinue = () => {
    // Beim Weiter immer den aktuellen Wert übernehmen
    // Wenn manuell eingegeben, dann diesen
    // Wenn per Karte gezeichnet, dann den aus dem formData
    if (isManualMode && areaSize) {
      updateFormData({ 
        area: {
          ...formData.area,
          manual: true,
          value: parseFloat(areaSize) || 0
        } 
      })
    }
    goToNextStep()
  }

  const handleManualAreaSubmit = () => {
    const value = parseFloat(areaSize);
    if (!isNaN(value) && value > 0) {
      setIsManualMode(true);
      updateFormData({
        area: {
          ...formData.area,
          manual: true,
          value: value
        }
      });
    }
  };

  const handleAreaSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAreaSize(e.target.value);
  };

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
          Fläche markieren
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Zeichnen Sie auf der Karte die Flächen ein, die geräumt werden sollen, oder geben Sie die Größe manuell ein.
        </motion.p>
      </div>

      {/* Google Maps Drawing Integration - nur anzeigen, wenn nicht im manuellen Modus */}
      {!isManualMode && (
        <motion.div 
          className="relative w-full rounded-lg overflow-hidden shadow-md"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <AreaDrawingMap 
            initialCoordinates={formData.area.coordinates}
            onAreaChange={handleAreaChange} 
          />
        </motion.div>
      )}
      
      {/* Manuelle Flächeneingabe - direkt unter der Karte */}
      <motion.div 
        className={`bg-white rounded-lg shadow-sm p-5 border ${isManualMode ? "border-accent" : "border-accent/10"}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Manuelle Flächeneingabe</span>
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <div className="relative flex-1">
              <input
                type="number"
                min="1"
                value={areaSize}
                onChange={handleAreaSizeChange}
                placeholder="z.B. 500"
                className="w-36 px-4 py-2 pr-14 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500">m²</span>
              </div>
            </div>
            
            <button
              onClick={handleManualAreaSubmit}
              className="py-2 px-4 bg-accent text-white font-medium rounded-md hover:bg-accent-dark transition-all duration-200 text-sm transform hover:scale-105"
              disabled={!areaSize || isNaN(parseFloat(areaSize)) || parseFloat(areaSize) <= 0}
            >
              Übernehmen
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Wenn Sie die exakten Maße Ihrer zu räumenden Fläche kennen, können Sie diese hier in Quadratmetern eingeben.
        </p>
        {isManualMode && (
          <div className="mt-4 pt-2 border-t border-gray-200">
            <p className="text-accent font-medium">Manuelle Flächeneingabe aktiv: {areaSize} m²</p>
            <button 
              onClick={() => setIsManualMode(false)} 
              className="mt-2 text-sm text-gray-600 hover:text-accent underline"
            >
              Zurück zur Kartenzeichnung
            </button>
          </div>
        )}
      </motion.div>
      
      <motion.div 
        className="flex justify-between mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <button
          onClick={goToPreviousStep}
          className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
        >
          Zurück
        </button>
        <button
  onClick={handleContinue}
  disabled={isManualMode ? (!areaSize || isNaN(parseFloat(areaSize)) || parseFloat(areaSize) <= 0) : formData.area.value <= 0}
  className={`py-2 px-6 bg-accent text-white font-medium rounded-md hover:bg-accent-dark transition-all duration-200 transform hover:scale-105 hover:shadow-md ${
    (isManualMode ? (!areaSize || isNaN(parseFloat(areaSize)) || parseFloat(areaSize) <= 0) : formData.area.value <= 0) 
      ? 'opacity-50 cursor-not-allowed' 
      : ''
  }`}
>
  Weiter
</button>
      </motion.div>
    </motion.div>
  )
}
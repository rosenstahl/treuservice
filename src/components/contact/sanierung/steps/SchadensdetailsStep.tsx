"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Flame, Droplet, Bug, Plus, Minus, Calendar } from 'lucide-react'

type SchadensdetailsStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const SchadensdetailsStep: React.FC<SchadensdetailsStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const [isValid, setIsValid] = useState(false)
  const [customWasserUrsache, setCustomWasserUrsache] = useState(formData.details.wasserUrsacheCustom || '')
  const [schimmelFlaeche, setSchimmelFlaeche] = useState(formData.details.schimmelFlaeche || 0)
  const [schimmelUrsache, setSchimmelUrsache] = useState(formData.details.schimmelUrsache || '')

  useEffect(() => {
    // Prüfen, ob der Schritt vollständig ist (je nach Schadensart)
    let valid = true

    if (formData.schadensart === 'brand') {
      valid = !!formData.details.brandVerschmutzungsgrad && formData.details.brandMaterialien.length > 0
    } else if (formData.schadensart === 'wasser') {
      const hasUrsache = formData.details.wasserUrsache && 
        (formData.details.wasserUrsache !== 'sonstige' || customWasserUrsache.trim() !== '')
      valid = hasUrsache && !!formData.details.wasserArt
    } else if (formData.schadensart === 'schimmel') {
      valid = formData.details.schimmelFlaeche > 0 && 
        (!formData.details.schimmelUrsacheBekannt || schimmelUrsache.trim() !== '')
    }

    setIsValid(valid)
  }, [
    formData.schadensart, 
    formData.details.brandVerschmutzungsgrad, 
    formData.details.brandMaterialien, 
    formData.details.wasserUrsache,
    formData.details.wasserArt,
    formData.details.wasserZeitpunkt,
    formData.details.schimmelFlaeche,
    formData.details.schimmelUrsacheBekannt,
    customWasserUrsache,
    schimmelFlaeche,
    schimmelUrsache
  ])

  // Brand-Materialien-Checkboxen
  const brandMaterialien = [
    { id: 'holz', label: 'Holz' },
    { id: 'textilien', label: 'Textilien' },
    { id: 'kunststoff', label: 'Kunststoff' },
    { id: 'tapete', label: 'Tapete' },
    { id: 'bodenbelag', label: 'Bodenbelag' },
    { id: 'moebel', label: 'Möbel' },
    { id: 'elektrogeraete', label: 'Elektrogeräte' }
  ]

  // Beschreibungen für Verschmutzungsgrade (aus Füllgrad von Entrümpelung)
  const verschmutzungsgradDescriptions = {
    leicht: "Oberflächlicher Ruß, kaum Geruch",
    mittel: "Deutlicher Ruß, wahrnehmbarer Geruch",
    stark: "Starke Verschmutzung, intensiver Geruch"
  }

  const handleBrandVerschmutzung = (grad: FormData['details']['brandVerschmutzungsgrad']) => {
    updateFormData({
      details: {
        ...formData.details,
        brandVerschmutzungsgrad: grad
      }
    })
  }

  const handleBrandMaterialToggle = (materialId: string) => {
    const currentMaterialien = formData.details.brandMaterialien || []
    const newMaterialien = currentMaterialien.includes(materialId)
      ? currentMaterialien.filter(id => id !== materialId)
      : [...currentMaterialien, materialId]

    updateFormData({
      details: {
        ...formData.details,
        brandMaterialien: newMaterialien
      }
    })
  }

  const handleWasserUrsache = (ursache: FormData['details']['wasserUrsache']) => {
    updateFormData({
      details: {
        ...formData.details,
        wasserUrsache: ursache
      }
    })
  }

  const handleCustomWasserUrsache = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomWasserUrsache(e.target.value)
    updateFormData({
      details: {
        ...formData.details,
        wasserUrsacheCustom: e.target.value
      }
    })
  }

  const handleWasserArt = (art: FormData['details']['wasserArt']) => {
    updateFormData({
      details: {
        ...formData.details,
        wasserArt: art
      }
    })
  }

  const handleWasserZeitpunkt = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      details: {
        ...formData.details,
        wasserZeitpunkt: e.target.value
      }
    })
  }

  const handleSchimmelFlaeche = (flaeche: number) => {
    setSchimmelFlaeche(flaeche)
    updateFormData({
      details: {
        ...formData.details,
        schimmelFlaeche: flaeche
      }
    })
  }

  const handleSchimmelSichtbar = (sichtbar: boolean) => {
    updateFormData({
      details: {
        ...formData.details,
        schimmelSichtbar: sichtbar
      }
    })
  }

  const handleSchimmelUrsacheBekannt = (bekannt: boolean) => {
    updateFormData({
      details: {
        ...formData.details,
        schimmelUrsacheBekannt: bekannt
      }
    })
  }

  const handleSchimmelUrsache = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchimmelUrsache(e.target.value)
    updateFormData({
      details: {
        ...formData.details,
        schimmelUrsache: e.target.value
      }
    })
  }

  // Rendering der Detailfelder je nach Schadensart
  const renderBrandDetails = () => (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h3 className="text-lg font-medium mb-4">Grad der Verschmutzung:</h3>
        
        <div className="grid grid-cols-3 gap-3">
          {(['leicht', 'mittel', 'stark'] as const).map((grad) => (
            <motion.div
              key={grad}
              className={`relative flex flex-col items-center border-2 rounded-lg p-3 cursor-pointer transition-all
                ${formData.details.brandVerschmutzungsgrad === grad ? 'border-accent shadow-md' : 'border-gray-200'}`}
              onClick={() => handleBrandVerschmutzung(grad)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-full h-16 bg-gray-100 rounded mb-2 overflow-hidden">
                <div className={`w-full h-full flex items-center justify-center ${
                  grad === 'leicht' ? 'bg-gray-100' :
                  grad === 'mittel' ? 'bg-gray-300' :
                  'bg-gray-500'
                }`}>
                  <span className="text-xs text-gray-700 capitalize">{grad}</span>
                </div>
              </div>
              <span className="text-sm font-medium capitalize mb-1">{grad}</span>
              <p className="text-xs text-gray-500 text-center">
                {verschmutzungsgradDescriptions[grad]}
              </p>
              {formData.details.brandVerschmutzungsgrad === grad && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Betroffene Materialien:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {brandMaterialien.map((material) => (
            <label 
              key={material.id} 
              htmlFor={`material-${material.id}`}
              className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded-md"
            >
              <Checkbox 
                id={`material-${material.id}`}
                checked={(formData.details.brandMaterialien || []).includes(material.id)}
                onCheckedChange={() => handleBrandMaterialToggle(material.id)}
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="font-medium text-gray-700">{material.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  const renderWasserDetails = () => (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h3 className="text-lg font-medium mb-4">Schadensursache:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'rohrbruch', label: 'Rohrbruch', icon: <Droplet className="h-5 w-5" /> },
            { id: 'unwetter', label: 'Unwetter/Starkregen', icon: <Droplet className="h-5 w-5" /> },
            { id: 'hochwasser', label: 'Hochwasser', icon: <Droplet className="h-5 w-5" /> },
            { id: 'loeschwasser', label: 'Löschwasser', icon: <Flame className="h-5 w-5" /> },
            { id: 'sonstige', label: 'Sonstige Ursache', icon: <Droplet className="h-5 w-5" /> }
          ].map((option) => (
            <motion.div
              key={option.id}
              onClick={() => handleWasserUrsache(option.id as FormData['details']['wasserUrsache'])}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                formData.details.wasserUrsache === option.id
                  ? 'border-accent bg-accent/5'
                  : 'border-gray-200 hover:border-accent/30 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-2 rounded-full ${
                  formData.details.wasserUrsache === option.id ? 'bg-accent text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {option.icon}
                </div>
                <h4 className="mt-2 font-medium">{option.label}</h4>
              </div>
            </motion.div>
          ))}
        </div>

        {formData.details.wasserUrsache === 'sonstige' && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Input
              value={customWasserUrsache}
              onChange={handleCustomWasserUrsache}
              placeholder="Bitte Ursache angeben"
              className="w-full"
            />
          </motion.div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Art des Wassers:</h3>
        <RadioGroup
          value={formData.details.wasserArt}
          onValueChange={(value) => handleWasserArt(value as FormData['details']['wasserArt'])}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sauber" id="wasser-sauber" />
            <Label htmlFor="wasser-sauber">Sauberes Wasser (z.B. Leitungswasser)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="kontaminiert" id="wasser-kontaminiert" />
            <Label htmlFor="wasser-kontaminiert">Kontaminiertes Wasser (z.B. Abwasser, verschmutztes Wasser)</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Zeitpunkt des Schadens:</h3>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <Input
            type="date"
            value={formData.details.wasserZeitpunkt}
            onChange={handleWasserZeitpunkt}
            max={new Date().toISOString().split('T')[0]}
            className="w-full sm:w-auto"
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Hinweis: Je früher nach Schadenseintritt mit der Sanierung begonnen wird, desto einfacher und kostengünstiger ist diese.
        </p>
      </div>
    </div>
  )

  const renderSchimmelDetails = () => (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h3 className="text-lg font-medium mb-4">Ist der Schimmel sichtbar?</h3>
        <RadioGroup
          value={formData.details.schimmelSichtbar ? 'ja' : 'nein'}
          onValueChange={(value) => handleSchimmelSichtbar(value === 'ja')}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="schimmel-sichtbar-ja" />
            <Label htmlFor="schimmel-sichtbar-ja">Ja, der Schimmel ist sichtbar</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nein" id="schimmel-sichtbar-nein" />
            <Label htmlFor="schimmel-sichtbar-nein">Nein, aber es gibt Anzeichen (z.B. Geruch)</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Ungefähre Größe der befallenen Fläche:</h3>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center w-full sm:w-72">
            <button
              type="button"
              onClick={() => schimmelFlaeche > 0 && handleSchimmelFlaeche(schimmelFlaeche - 0.5)}
              className="p-2 bg-gray-100 rounded-l-lg text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Minus className="h-5 w-5" />
            </button>
            <Input
              type="number"
              value={schimmelFlaeche}
              onChange={(e) => handleSchimmelFlaeche(parseFloat(e.target.value) || 0)}
              min={0}
              step={0.5}
              className="text-center rounded-none border-x-0"
            />
            <button
              type="button"
              onClick={() => handleSchimmelFlaeche(schimmelFlaeche + 0.5)}
              className="p-2 bg-gray-100 rounded-r-lg text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
          <span className="text-gray-700">m²</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Ist die Ursache bekannt?</h3>
        <RadioGroup
          value={formData.details.schimmelUrsacheBekannt ? 'ja' : 'nein'}
          onValueChange={(value) => handleSchimmelUrsacheBekannt(value === 'ja')}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="ursache-bekannt-ja" />
            <Label htmlFor="ursache-bekannt-ja">Ja</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nein" id="ursache-bekannt-nein" />
            <Label htmlFor="ursache-bekannt-nein">Nein</Label>
          </div>
        </RadioGroup>

        {formData.details.schimmelUrsacheBekannt && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <Input
              value={schimmelUrsache}
              onChange={handleSchimmelUrsache}
              placeholder="Bitte Ursache angeben (z.B. undichtes Fenster, Wasserschaden)"
              className="w-full"
            />
          </motion.div>
        )}
      </div>
    </div>
  )

  // Rendering für sonstige Sanierungen
  const renderSonstigeDetails = () => (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
        <p>
          Für individuelle Sanierungsleistungen benötigen wir einen Vor-Ort-Termin, um den genauen Umfang 
          zu bestimmen. Fahren Sie mit dem Formular fort, um einen Termin zu vereinbaren.
        </p>
      </div>
    </div>
  )

  // Dynamisches Rendering je nach Schadensart
  const renderDetails = () => {
    switch (formData.schadensart) {
      case 'brand':
        return renderBrandDetails()
      case 'wasser':
        return renderWasserDetails()
      case 'schimmel':
        return renderSchimmelDetails()
      default:
        return renderSonstigeDetails()
    }
  }

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
          Schadensdetails
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Bitte geben Sie weitere Details zum Schaden an.
        </motion.p>
      </div>

      {renderDetails()}

      {/* Navigation */}
      <div className="flex justify-between max-w-3xl mx-auto">
        <motion.button
          onClick={goToPreviousStep}
          className="py-3 px-6 bg-gray-100 rounded-md text-gray-800 font-medium hover:bg-gray-200 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Zurück
        </motion.button>

        <motion.button
          onClick={goToNextStep}
          disabled={formData.schadensart !== 'sonstige' && !isValid}
          className={`py-3 px-8 rounded-md font-medium transition-all duration-200 ${
            isValid || formData.schadensart === 'sonstige'
              ? 'bg-accent text-white hover:bg-accent-dark transform hover:scale-[1.03] hover:shadow-md'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={(isValid || formData.schadensart === 'sonstige') ? { scale: 1.03 } : {}}
          whileTap={(isValid || formData.schadensart === 'sonstige') ? { scale: 0.97 } : {}}
        >
          Weiter
        </motion.button>
      </div>
    </motion.div>
  )
}
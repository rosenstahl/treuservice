"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntruempelungWizard'
import { CheckSquare, Square, Info, Boxes } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type EntruempelungsartStepProps = {
  formData: FormData
  updateFormData: (newData: Partial<FormData>) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
}

// Titel für die Entrümpelungsarten
const entrumpelungsartTitles = {
  moebel: "Möbel",
  elektrogeraete: "Elektrogeräte",
  sperrmuell: "Sperrmüll",
  bauschutt: "Bauschutt",
  sondermuell: "Sondermüll",
  sonstiges: "Sonstiges"
}

// Beschreibungen für die Entrümpelungsarten
const entrumpelungsartDescriptions = {
  moebel: "Schränke, Tische, Stühle, etc.",
  elektrogeraete: "TV, Kühlschrank, Waschmaschine, etc.",
  sperrmuell: "Matratzen, Teppiche, sperrige Gegenstände",
  bauschutt: "Steine, Beton, Fliesen, etc.",
  sondermuell: "Farben, Chemikalien, Schadstoffe",
  sonstiges: "Andere zu entrümpelnde Gegenstände"
}

export const EntruempelungsartStep: React.FC<EntruempelungsartStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const [sonstigesText, setSonstigesText] = useState(formData.entrumpelungsart.sonstigesText || '')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [error, setError] = useState('')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    if (textareaRef.current) {
      adjustTextareaHeight()
    }
  }, [sonstigesText])

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleToggleOption = (option: keyof FormData['entrumpelungsart']) => {
    // Wir müssen sonstigesText als Spezialfall behandeln, da es kein boolean ist
    if (option !== 'sonstigesText') {
      updateFormData({
        entrumpelungsart: {
          ...formData.entrumpelungsart,
          [option]: !formData.entrumpelungsart[option as keyof Omit<FormData['entrumpelungsart'], 'sonstigesText'>]
        }
      })
    }
  }

  const handleSonstigesTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setSonstigesText(value)
    updateFormData({
      entrumpelungsart: {
        ...formData.entrumpelungsart,
        sonstigesText: value
      }
    })
  }

  // Prüfen, ob mindestens eine Option ausgewählt wurde
  const isAtLeastOneSelected = () => {
    const { sonstigesText, ...options } = formData.entrumpelungsart
    return Object.values(options).some(value => value) || 
           (formData.entrumpelungsart.sonstiges && sonstigesText.trim().length > 0)
  }

  const handleContinue = () => {
    if (!isAtLeastOneSelected()) {
      setError('Bitte wählen Sie mindestens eine Entrümpelungsart aus')
      return
    }
    
    if (formData.entrumpelungsart.sonstiges && !sonstigesText.trim()) {
      setError('Bitte beschreiben Sie die sonstigen zu entrümpelnden Gegenstände')
      return
    }
    
    goToNextStep()
  }

  // Icons für die Entrümpelungsarten im Apple-Stil
  const renderIcon = (type: string, isSelected: boolean, isHovered: boolean) => {
    const baseClassName = "w-4 h-4"
    const colorClass = isSelected 
      ? "text-[#009FD8]" 
      : isHovered 
        ? "text-[#009FD8]" 
        : "text-gray-400"
    
    switch(type) {
      case 'moebel':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${baseClassName} ${colorClass}`}>
            <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
            <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198c.03-.028.061-.057.091-.086L12 5.432Z" />
          </svg>
        );
      case 'elektrogeraete':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${baseClassName} ${colorClass}`}>
            <path d="M19.5 6h-15v9h15V6Z" />
            <path fillRule="evenodd" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z" clipRule="evenodd" />
          </svg>
        );
      case 'sperrmuell':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${baseClassName} ${colorClass}`}>
            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
          </svg>
        );
      case 'bauschutt':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${baseClassName} ${colorClass}`}>
            <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
            <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.196 7.616.573a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z" clipRule="evenodd" />
          </svg>
        );
      case 'sondermuell':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${baseClassName} ${colorClass}`}>
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
        );
      case 'sonstiges':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`${baseClassName} ${colorClass}`}>
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
          </svg>
        );
      default:
        return <Boxes className={`${baseClassName} ${colorClass}`} />;
    }
  }

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
          Was soll entrümpelt werden?
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Wählen Sie alle Arten von Gegenständen aus, die entrümpelt werden sollen
        </motion.p>
      </div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          className="mb-6 border-t border-gray-100 pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          <div className="flex items-center mb-4">
            <Boxes className="w-4 h-4 mr-2 text-[#009FD8]" />
            <h3 className="font-medium text-sm">Art der zu entrümpelnden Gegenstände</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Dynamisch alle Entrümpelungsarten generieren (außer sonstigesText) */}
            {Object.keys(formData.entrumpelungsart)
              .filter(key => key !== 'sonstigesText')
              .map((key) => {
                const optionKey = key as keyof Omit<FormData['entrumpelungsart'], 'sonstigesText'>;
                const isSelected = formData.entrumpelungsart[optionKey];
                const isHovered = hoveredItem === key;
                
                return (
                  <div
                    key={key}
                    className={`
                      flex items-start p-3 rounded-lg border cursor-pointer 
                      transition-all duration-200
                      ${isSelected 
                        ? 'border-[#009FD8] bg-[#E6F4FA]' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => handleToggleOption(optionKey)}
                    onMouseEnter={() => setHoveredItem(key)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className={`mt-0.5 mr-3 ${
                      isSelected
                        ? 'text-[#009FD8]' 
                        : isHovered
                          ? 'text-[#009FD8]'
                          : 'text-gray-400'
                    }`}>
                      {renderIcon(key, isSelected, isHovered)}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xs font-medium">{entrumpelungsartTitles[optionKey]}</h3>
                      <p className="text-xs text-gray-500">{entrumpelungsartDescriptions[optionKey]}</p>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      {isSelected ? (
                        <CheckSquare className="h-4 w-4 text-[#009FD8]" />
                      ) : (
                        <Square className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </div>
                )
              })}
          </div>
        </motion.div>
        
        {/* Eingabefeld für sonstige Entrümpelungsarten */}
        {formData.entrumpelungsart.sonstiges && (
          <motion.div
            className="mb-5 border-t border-gray-100 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-4 text-[#009FD8]">
              <Info className="w-4 h-4 mr-2" />
              <h3 className="font-medium text-sm">Sonstige Gegenstände</h3>
            </div>
            
            <Label htmlFor="sonstigesText" className="block text-xs font-medium text-gray-700 mb-1">
              Bitte beschreiben Sie die sonstigen zu entrümpelnden Gegenstände:
            </Label>
            <Textarea
              ref={textareaRef}
              id="sonstigesText"
              value={sonstigesText}
              onChange={handleSonstigesTextChange}
              placeholder="z.B. Gartengeräte, Spielzeug, Dokumente, etc."
              className="w-full border-gray-200 rounded-lg text-sm focus:ring-1 focus:ring-[#009FD8] focus:border-[#009FD8] text-gray-700"
              rows={3}
              autoFocus
            />
          </motion.div>
        )}
      </div>

      {error && (
        <motion.p 
          className="text-red-500 text-xs text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}
      
      <motion.div 
        className="flex justify-between mt-8 pt-6 border-t border-gray-100 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.2 }}
      >
        <button
          onClick={goToPreviousStep}
          className="py-2 px-4 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Zurück
        </button>
        
        <button
          onClick={handleContinue}
          className={`py-2.5 px-6 rounded-full text-xs font-medium transition-colors ${
            isAtLeastOneSelected() && (!formData.entrumpelungsart.sonstiges || sonstigesText.trim())
              ? 'bg-[#009FD8] text-white hover:bg-[#007CAB]' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Weiter
        </button>
      </motion.div>
    </motion.div>
  )
}
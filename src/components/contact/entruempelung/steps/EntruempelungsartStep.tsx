"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntruempelungWizard'
import { HiCheck, HiPlusCircle } from 'react-icons/hi'

type EntruempelungsartStepProps = {
  formData: FormData
  updateFormData: (newData: Partial<FormData>) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
}

// Icons für die verschiedenen Entrümpelungsarten
const icons = {
  moebel: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
      <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198c.03-.028.061-.057.091-.086L12 5.432Z" />
    </svg>
  ),
  elektrogeraete: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M19.5 6h-15v9h15V6Z" />
      <path fillRule="evenodd" d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v11.25C1.5 17.16 2.34 18 3.375 18H9.75v1.5H6A.75.75 0 0 0 6 21h12a.75.75 0 0 0 0-1.5h-3.75V18h6.375c1.035 0 1.875-.84 1.875-1.875V4.875C22.5 3.839 21.66 3 20.625 3H3.375Zm0 13.5h17.25a.375.375 0 0 0 .375-.375V4.875a.375.375 0 0 0-.375-.375H3.375A.375.375 0 0 0 3 4.875v11.25c0 .207.168.375.375.375Z" clipRule="evenodd" />
    </svg>
  ),
  sperrmuell: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
    </svg>
  ),
  bauschutt: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M11.584 2.376a.75.75 0 0 1 .832 0l9 6a.75.75 0 1 1-.832 1.248L12 3.901 3.416 9.624a.75.75 0 0 1-.832-1.248l9-6Z" />
      <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1 0-1.5h.75v-9.918a.75.75 0 0 1 .634-.74A49.109 49.109 0 0 1 12 9c2.59 0 5.134.196 7.616.573a.75.75 0 0 1 .634.74Zm-7.5 2.418a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Zm3-.75a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 1-1.5 0v-6.75a.75.75 0 0 1 .75-.75ZM9 12.75a.75.75 0 0 0-1.5 0v6.75a.75.75 0 0 0 1.5 0v-6.75Z" clipRule="evenodd" />
      <path d="M12 7.875a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" />
    </svg>
  ),
  sondermuell: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
  ),
  sonstiges: (
    <HiPlusCircle className="w-6 h-6" />
  )
}

export const EntruempelungsartStep: React.FC<EntruempelungsartStepProps> = ({
  formData,
  updateFormData,
  goToNextStep,
  goToPreviousStep
}) => {
  const [sonstigesText, setSonstigesText] = useState(formData.entrumpelungsart.sonstigesText || '')

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

  const handleSonstigesTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const isValid = isAtLeastOneSelected()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900">Was soll entrümpelt werden?</h2>
          <p className="mt-2 text-sm text-gray-500">
            Wählen Sie alle Arten von Gegenständen aus, die entrümpelt werden sollen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {/* Möbel */}
          <div
            onClick={() => handleToggleOption('moebel')}
            className={`
              flex items-center p-4 rounded-lg border cursor-pointer 
              transition-colors duration-200 ease-in-out
              ${formData.entrumpelungsart.moebel 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }
            `}
          >
            <div className="mr-4">
              {icons.moebel}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium">Möbel</h3>
              <p className="text-sm text-gray-500">Schränke, Tische, Stühle, etc.</p>
            </div>
            <div>
              {formData.entrumpelungsart.moebel && (
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700">
                  <HiCheck className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
          
          {/* Elektrogeräte */}
          <div
            onClick={() => handleToggleOption('elektrogeraete')}
            className={`
              flex items-center p-4 rounded-lg border cursor-pointer 
              transition-colors duration-200 ease-in-out
              ${formData.entrumpelungsart.elektrogeraete 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }
            `}
          >
            <div className="mr-4">
              {icons.elektrogeraete}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium">Elektrogeräte</h3>
              <p className="text-sm text-gray-500">TV, Kühlschrank, Waschmaschine, etc.</p>
            </div>
            <div>
              {formData.entrumpelungsart.elektrogeraete && (
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700">
                  <HiCheck className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
          
          {/* Sperrmüll */}
          <div
            onClick={() => handleToggleOption('sperrmuell')}
            className={`
              flex items-center p-4 rounded-lg border cursor-pointer 
              transition-colors duration-200 ease-in-out
              ${formData.entrumpelungsart.sperrmuell 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }
            `}
          >
            <div className="mr-4">
              {icons.sperrmuell}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium">Sperrmüll</h3>
              <p className="text-sm text-gray-500">Matratzen, Teppiche, sperrige Gegenstände</p>
            </div>
            <div>
              {formData.entrumpelungsart.sperrmuell && (
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700">
                  <HiCheck className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
          
          {/* Bauschutt */}
          <div
            onClick={() => handleToggleOption('bauschutt')}
            className={`
              flex items-center p-4 rounded-lg border cursor-pointer 
              transition-colors duration-200 ease-in-out
              ${formData.entrumpelungsart.bauschutt 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }
            `}
          >
            <div className="mr-4">
              {icons.bauschutt}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium">Bauschutt</h3>
              <p className="text-sm text-gray-500">Steine, Beton, Fliesen, etc.</p>
            </div>
            <div>
              {formData.entrumpelungsart.bauschutt && (
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700">
                  <HiCheck className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
          
          {/* Sondermüll */}
          <div
            onClick={() => handleToggleOption('sondermuell')}
            className={`
              flex items-center p-4 rounded-lg border cursor-pointer 
              transition-colors duration-200 ease-in-out
              ${formData.entrumpelungsart.sondermuell 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }
            `}
          >
            <div className="mr-4">
              {icons.sondermuell}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium">Sondermüll</h3>
              <p className="text-sm text-gray-500">Farben, Chemikalien, Schadstoffe</p>
            </div>
            <div>
              {formData.entrumpelungsart.sondermuell && (
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700">
                  <HiCheck className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
          
          {/* Sonstiges */}
          <div
            onClick={() => handleToggleOption('sonstiges')}
            className={`
              flex items-center p-4 rounded-lg border cursor-pointer 
              transition-colors duration-200 ease-in-out
              ${formData.entrumpelungsart.sonstiges 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }
            `}
          >
            <div className="mr-4">
              {icons.sonstiges}
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium">Sonstiges</h3>
              <p className="text-sm text-gray-500">Andere zu entrümpelnde Gegenstände</p>
            </div>
            <div>
              {formData.entrumpelungsart.sonstiges && (
                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700">
                  <HiCheck className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Eingabefeld für sonstige Entrümpelungsarten */}
        {formData.entrumpelungsart.sonstiges && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <label htmlFor="sonstigesText" className="block text-sm font-medium text-gray-700 mb-1">
              Bitte beschreiben Sie die zu entrümpelnden Gegenstände:
            </label>
            <input
              type="text"
              id="sonstigesText"
              name="sonstigesText"
              value={sonstigesText}
              onChange={handleSonstigesTextChange}
              placeholder="z.B. Gartengeräte, Spielzeug, Dokumente, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            {formData.entrumpelungsart.sonstiges && !sonstigesText.trim() && (
              <p className="mt-1 text-sm text-red-600">
                Bitte beschreiben Sie die Gegenstände
              </p>
            )}
          </motion.div>
        )}

        {!isValid && (
          <p className="text-orange-500 text-sm text-center mt-2">
            Bitte wählen Sie mindestens eine Art aus.
          </p>
        )}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={goToPreviousStep}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Zurück
          </button>
          
          <button
            type="button"
            onClick={goToNextStep}
            disabled={!isValid}
            className={`
              px-4 py-2 rounded-md text-sm font-medium text-white 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${isValid
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
              }
            `}
          >
            Weiter
          </button>
        </div>
      </div>
    </motion.div>
  )
}

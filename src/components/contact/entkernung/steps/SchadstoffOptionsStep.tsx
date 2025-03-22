"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../EntkernungWizard'
import { 
  AlertTriangle,
  CheckSquare,
  Square,
  Info,
  HelpCircle
} from 'lucide-react'

type SchadstoffOptionsStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const schadstoffInfo = [
  { 
    id: 'asbest', 
    label: 'Asbest', 
    description: 'Fasermaterial, oft in Baumaterialien zwischen 1930-1990 verwendet (Dämmungen, Verkleidungen, Bodenplatten)'
  },
  { 
    id: 'pcb', 
    label: 'PCB (Polychlorierte Biphenyle)', 
    description: 'In Dichtungsmassen, Anstrichen, Kondensatoren in Gebäuden aus den 1960er-1980er Jahren'
  },
  { 
    id: 'kmf', 
    label: 'KMF (Künstliche Mineralfasern)', 
    description: 'Alte Dämmmaterialien, Brandschutzplatten, aus der Zeit vor ca. 1995'
  },
  { 
    id: 'schimmel', 
    label: 'Schimmelpilz', 
    description: 'Bei Feuchtigkeitsschäden oder schlechter Belüftung in Wänden und anderen Bauteilen'
  },
  { 
    id: 'holzschutz', 
    label: 'Holzschutzmittel', 
    description: 'Ältere Holzbehandlungen mit giftigen Chemikalien wie PCP, Lindan'
  },
  { 
    id: 'unbekannt', 
    label: 'Keine/unbekannt', 
    description: 'Keine bekannten Schadstoffe oder Situation unklar (Schadstoffanalyse empfohlen)'
  }
]

const zusatzoptionen = [
  { 
    id: 'entsorgung', 
    label: 'Fachgerechte Entsorgung & Recycling', 
    description: 'Umweltgerechte Entsorgung aller anfallenden Materialien' 
  },
  { 
    id: 'beratung', 
    label: 'Beratung & Planung', 
    description: 'Umfassende Beratung und detaillierte Planung Ihres Entkernungsprojekts' 
  },
  { 
    id: 'statikPruefung', 
    label: 'Statische Beurteilung', 
    description: 'Fachliche Prüfung der tragenden Elemente und statische Beurteilung' 
  },
  { 
    id: 'behoerdengaenge', 
    label: 'Behördliche Abwicklung', 
    description: 'Unterstützung bei Genehmigungen und behördlichen Anforderungen' 
  }
]

export const SchadstoffOptionsStep: React.FC<SchadstoffOptionsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  const [schadstoffoptionen, setSchadstoffoptionen] = useState({
    asbest: formData.schadstoffoptionen.asbest,
    pcb: formData.schadstoffoptionen.pcb,
    kmf: formData.schadstoffoptionen.kmf,
    schimmel: formData.schadstoffoptionen.schimmel,
    holzschutz: formData.schadstoffoptionen.holzschutz,
    unbekannt: formData.schadstoffoptionen.unbekannt
  })
  
  const [zusatzOptions, setZusatzOptions] = useState({
    entsorgung: formData.zusatzoptionen.entsorgung,
    beratung: formData.zusatzoptionen.beratung,
    statikPruefung: formData.zusatzoptionen.statikPruefung,
    behoerdengaenge: formData.zusatzoptionen.behoerdengaenge
  })

  const [showTooltip, setShowTooltip] = useState<string | null>(null)

  const toggleSchadstoff = (id: string) => {
    // Wenn "Keine/unbekannt" ausgewählt wird, alle anderen deaktivieren
    if (id === 'unbekannt') {
      const newOptions = {
        asbest: false,
        pcb: false,
        kmf: false,
        schimmel: false,
        holzschutz: false,
        unbekannt: true
      }
      setSchadstoffoptionen(newOptions)
      updateFormData({ schadstoffoptionen: newOptions })
    } else {
      // Ansonsten den ausgewählten Schadstoff umschalten und "Keine/unbekannt" deaktivieren
      const newOptions = {
        ...schadstoffoptionen,
        [id]: !schadstoffoptionen[id as keyof typeof schadstoffoptionen],
        unbekannt: false
      }
      setSchadstoffoptionen(newOptions)
      updateFormData({ schadstoffoptionen: newOptions })
    }
  }

  const toggleZusatzoption = (id: string) => {
    const newOptions = {
      ...zusatzOptions,
      [id]: !zusatzOptions[id as keyof typeof zusatzOptions]
    }
    setZusatzOptions(newOptions)
    updateFormData({ zusatzoptionen: newOptions })
  }

  const handleContinue = () => {
    goToNextStep();
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
          Schadstoffe & Zusatzoptionen
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie mögliche Schadstoffe und zusätzliche Leistungen für Ihr Projekt aus.
        </motion.p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        {/* Schadstoffoptionen */}
        <motion.div
          className="p-6 bg-yellow-50 rounded-lg border border-yellow-200 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="flex items-center mb-4 text-amber-600">
            <AlertTriangle className="w-5 h-5 mr-2" />
            <h3 className="font-medium">Mögliche Schadstoffe im Gebäude</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Bitte wählen Sie alle Schadstoffe aus, von denen Sie wissen oder vermuten, dass sie im Gebäude vorhanden sind. Bei Unsicherheit wählen Sie &quot;Keine/unbekannt&quot; - wir führen dann eine Schadstoffanalyse durch.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {schadstoffInfo.map((schadstoff) => (
              <motion.div
                key={schadstoff.id}
                className={`flex items-start p-3 rounded-lg cursor-pointer transition-all relative
                  ${schadstoffoptionen[schadstoff.id as keyof typeof schadstoffoptionen] 
                    ? 'bg-amber-100 border border-amber-300' 
                    : 'bg-white border border-gray-200 hover:border-amber-200'}`}
                onClick={() => toggleSchadstoff(schadstoff.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-shrink-0 mt-0.5 mr-3">
                  {schadstoffoptionen[schadstoff.id as keyof typeof schadstoffoptionen] ? (
                    <CheckSquare className="h-5 w-5 text-amber-600" />
                  ) : (
                    <Square className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{schadstoff.label}</span>
                    <button 
                      className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTooltip(showTooltip === schadstoff.id ? null : schadstoff.id);
                      }}
                    >
                      <HelpCircle className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {showTooltip === schadstoff.id && (
                    <motion.div 
                      className="mt-2 p-2 bg-white text-xs text-gray-600 rounded shadow-md border border-gray-200"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {schadstoff.description}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Zusatzoptionen */}
        <motion.div
          className="p-6 bg-gray-50 rounded-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <div className="flex items-center mb-4 text-accent">
            <Info className="w-5 h-5 mr-2" />
            <h3 className="font-medium">Zusätzliche Leistungen</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {zusatzoptionen.map((option) => (
              <motion.div
                key={option.id}
                className={`flex items-start p-3 rounded-lg cursor-pointer transition-all
                  ${zusatzOptions[option.id as keyof typeof zusatzOptions] 
                    ? 'bg-accent/10 border border-accent/30' 
                    : 'bg-white border border-gray-200 hover:border-accent/20'}`}
                onClick={() => toggleZusatzoption(option.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex-shrink-0 mt-0.5 mr-3">
                  {zusatzOptions[option.id as keyof typeof zusatzOptions] ? (
                    <CheckSquare className="h-5 w-5 text-accent" />
                  ) : (
                    <Square className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-medium">{option.label}</span>
                  <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <button
            onClick={goToPreviousStep}
            className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
          >
            Zurück
          </button>
          
          <motion.button
            onClick={handleContinue}
            className="py-2 px-8 rounded-md text-sm font-medium bg-accent text-white transition-all duration-200 hover:bg-accent-dark"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Weiter
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
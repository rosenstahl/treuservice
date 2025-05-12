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
          Schadstoffe & Zusatzoptionen
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Wählen Sie mögliche Schadstoffe und zusätzliche Leistungen für Ihr Projekt aus.
        </motion.p>
      </div>
      
      <div className="max-w-2xl mx-auto">
        {/* Schadstoffoptionen */}
        <motion.div
          className="mb-8 border-b border-gray-100 pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.2 }}
        >
          <div className="flex items-center mb-4 text-amber-600">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <h3 className="font-medium text-sm">Mögliche Schadstoffe im Gebäude</h3>
          </div>
          
          <p className="text-xs text-gray-600 mb-4">
            Bitte wählen Sie alle Schadstoffe aus, von denen Sie wissen oder vermuten, dass sie im Gebäude vorhanden sind. Bei Unsicherheit wählen Sie &quot;Keine/unbekannt&quot; - wir führen dann eine Schadstoffanalyse durch.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {schadstoffInfo.map((schadstoff) => (
              <motion.div
                key={schadstoff.id}
                className={`flex items-center py-2 px-3 rounded-full border transition-colors cursor-pointer
                  ${schadstoffoptionen[schadstoff.id as keyof typeof schadstoffoptionen] 
                    ? 'bg-[#FEF3C7] border-amber-300' 
                    : 'bg-white border-gray-200 hover:border-amber-200'}`}
                onClick={() => toggleSchadstoff(schadstoff.id)}
              >
                <div className="flex-shrink-0 mr-2">
                  {schadstoffoptionen[schadstoff.id as keyof typeof schadstoffoptionen] ? (
                    <CheckSquare className="h-4 w-4 text-amber-600" />
                  ) : (
                    <Square className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center">
                    <span className="text-xs font-medium">{schadstoff.label}</span>
                    <button 
                      className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTooltip(showTooltip === schadstoff.id ? null : schadstoff.id);
                      }}
                    >
                      <HelpCircle className="h-3 w-3" />
                    </button>
                  </div>
                  
                  {showTooltip === schadstoff.id && (
                    <motion.div 
                      className="mt-1 py-1 px-2 bg-white text-xs text-gray-600 rounded-lg shadow-sm border border-gray-100"
                      initial={{ opacity: 0, y: -3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15 }}
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
          className="pt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          <div className="flex items-center mb-4 text-[#009FD8]">
            <Info className="w-4 h-4 mr-2" />
            <h3 className="font-medium text-sm">Zusätzliche Leistungen</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {zusatzoptionen.map((option) => (
              <motion.div
                key={option.id}
                className={`flex items-start py-2 px-3 rounded-lg border cursor-pointer transition-colors
                  ${zusatzOptions[option.id as keyof typeof zusatzOptions] 
                    ? 'bg-[#E6F4FA] border-[#009FD8]' 
                    : 'bg-white border-gray-200 hover:border-[#009FD8]/20'}`}
                onClick={() => toggleZusatzoption(option.id)}
              >
                <div className="flex-shrink-0 mt-0.5 mr-2">
                  {zusatzOptions[option.id as keyof typeof zusatzOptions] ? (
                    <CheckSquare className="h-4 w-4 text-[#009FD8]" />
                  ) : (
                    <Square className="h-4 w-4 text-gray-400" />
                  )}
                </div>
                <div>
                  <span className="text-xs font-medium">{option.label}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-between mt-8 pt-6 border-t border-gray-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.2 }}
        >
          <button
            onClick={goToPreviousStep}
            className="py-2 px-4 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Zurück
          </button>
          
          <button
            onClick={handleContinue}
            className="py-2.5 px-6 rounded-full text-xs font-medium bg-[#009FD8] text-white hover:bg-[#007CAB] transition-colors"
          >
            Weiter
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}
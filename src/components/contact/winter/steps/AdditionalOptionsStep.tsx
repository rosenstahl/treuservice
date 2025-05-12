"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../WinterdienstWizard';
import { Leaf, Clock, Calendar, Shield, Sparkles } from 'lucide-react';

type AdditionalOptionsStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const AdditionalOptionsStep: React.FC<AdditionalOptionsStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  const [showTimeSelect, setShowTimeSelect] = useState(formData.options.offHours.enabled);
  const [time, setTime] = useState(formData.options.offHours.time || '08:00');
  
  const handleOptionToggle = (option: keyof FormData['options']) => {
    if (option === 'offHours') {
      setShowTimeSelect(!formData.options.offHours.enabled);
      
      updateFormData({
        options: {
          ...formData.options,
          offHours: {
            enabled: !formData.options.offHours.enabled,
            time: !formData.options.offHours.enabled ? time : undefined
          }
        }
      });
    } else if (option === 'environmentPackage' || option === 'finalCleaning') {
      updateFormData({
        options: {
          ...formData.options,
          [option]: !formData.options[option]
        }
      });
    }
  };
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    
    updateFormData({
      options: {
        ...formData.options,
        offHours: {
          ...formData.options.offHours,
          time: newTime
        }
      }
    });
  };
  
  const handleSeasonExtensionChange = (isEnabled: boolean) => {
    updateFormData({
      options: {
        ...formData.options,
        seasonExtension: {
          ...formData.options.seasonExtension,
          enabled: isEnabled
        }
      }
    });
  };
  
  const handleContinue = () => {
    goToNextStep();
  };
  
  // Pakettyp-Namen formatieren (für Info-Text)
  const getPackageTypeName = () => {
    switch (formData.package.type) {
      case 'all-in-one':
        return 'ALL-IN-ONE';
      case 'flex':
        return 'FLEX';
      case 'on-demand':
        return 'ON DEMAND';
      default:
        return '';
    }
  };
  
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
          Zusatzoptionen
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie optionale Ergänzungen für Ihren Winterdienst ({getPackageTypeName()}).
        </motion.p>
      </div>
      
      <motion.div 
        className="space-y-4 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {/* Haftung (immer inklusive) */}
        <div className="bg-accent/5 p-5 rounded-lg border border-accent/20 transition-all duration-200">
          <div className="flex items-start">
            <div className="mt-0.5 mr-4 flex-shrink-0 text-accent">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="text-base font-medium text-gray-800">Haftung</h3>
                <span className="ml-2 text-xs font-medium text-accent bg-accent/10 px-2 py-0.5 rounded">Immer inklusive</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Lehnen Sie sich zurück - TREU Service übernimmt für Sie die Haftung! 
                Auf uns können Sie sich zu 100% verlassen.
              </p>
            </div>
          </div>
        </div>
        
        {/* Umweltpaket */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200">
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <input
                type="checkbox"
                id="environmentPackage"
                checked={formData.options.environmentPackage}
                onChange={() => handleOptionToggle('environmentPackage')}
                className="h-4 w-4 text-accent rounded focus:ring-accent/50"
              />
            </div>
            <div className="mr-4 flex-shrink-0 text-green-500">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <label htmlFor="environmentPackage" className="text-base font-medium text-gray-800 cursor-pointer">
                Umweltfreundliches Streumittel
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Durch die Umweltpakete von TREU Service haben Sie die Möglichkeit, einen Beitrag zu unserem Klimaschutz zu leisten. 
                Wir verwenden umweltschonende Streumittel, die Pflanzen und Tiere schützen und trotzdem höchste Wirksamkeit garantieren.
              </p>
            </div>
          </div>
        </div>
        
        {/* Endreinigung */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200">
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <input
                type="checkbox"
                id="finalCleaning"
                checked={formData.options.finalCleaning}
                onChange={() => handleOptionToggle('finalCleaning')}
                className="h-4 w-4 text-accent rounded focus:ring-accent/50"
              />
            </div>
            <div className="mr-4 flex-shrink-0 text-blue-500">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <label htmlFor="finalCleaning" className="text-base font-medium text-gray-800 cursor-pointer">
                Endreinigung
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Greifen Sie noch zum Besen? Damit Ihre Flächen nach der Saison vollständig von Salz-, Splitt- und 
                Sandresten befreit sind, bietet unser TREU Service-Team Ihnen eine professionelle Endreinigung an.
              </p>
            </div>
          </div>
        </div>
        
        {/* Wunschzeit / Off-Hours */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200">
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <input
                type="checkbox"
                id="offHours"
                checked={formData.options.offHours.enabled}
                onChange={() => handleOptionToggle('offHours')}
                className="h-4 w-4 text-accent rounded focus:ring-accent/50"
              />
            </div>
            <div className="mr-4 flex-shrink-0 text-amber-500">
              <Clock className="h-5 w-5" />
            </div>
            <div className="w-full">
              <label htmlFor="offHours" className="text-base font-medium text-gray-800 cursor-pointer">
                Off-Hours Wunschzeit
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Sie haben individuelle Öffnungszeiten, kein Problem! Mit Off-Hours 
                können Sie Zeiten festlegen, damit der TREU Service Winterdienst abweichend 
                von der Ortsatzung Ihre Flächen räumen kann. So kommen Ihre Kunden, Lieferanten und 
                Mitarbeiter immer sicher in Ihr Gebäude.
              </p>
              
              {showTimeSelect && (
                <motion.div 
                  className="mt-4 bg-gray-50 p-3 rounded-md"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <label htmlFor="timeSelect" className="text-sm text-gray-600 mr-3">
                      Startzeit:
                    </label>
                    <input
                      type="time"
                      id="timeSelect"
                      value={time}
                      onChange={handleTimeChange}
                      className="px-3 py-1 border border-gray-300 rounded-md focus:ring-accent/50 focus:outline-none focus:ring-2"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Wählen Sie die gewünschte Uhrzeit für die Räumung. Bitte beachten Sie, dass wir &quot;best effort&quot; bieten und die genaue Uhrzeit je nach Wetterlage und Verkehrssituation abweichen kann.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        
        {/* Saisonverlängerung */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200">
          <div className="flex items-start">
            <div className="mt-1 mr-3">
              <input
                type="checkbox"
                id="seasonExtension"
                checked={formData.options.seasonExtension.enabled}
                onChange={(e) => handleSeasonExtensionChange(e.target.checked)}
                className="h-4 w-4 text-accent rounded focus:ring-accent/50"
              />
            </div>
            <div className="mr-4 flex-shrink-0 text-indigo-500">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <label htmlFor="seasonExtension" className="text-base font-medium text-gray-800 cursor-pointer">
                Saisonverlängerung
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Mittlerweile wird es immer schwerer vorherzusagen, wann der Winter beginnt und wann er endet. 
                Um sicherzugehen, dass Sie nicht doch plötzlich vom Schnee überrumpelt werden, bietet TREU Service 
                Ihnen eine Saisonverlängerung an.
              </p>
              
              {formData.options.seasonExtension.enabled && (
                <div className="mt-3 bg-indigo-50 p-3 rounded-md">
                  <p className="text-xs text-indigo-700 font-medium">
                    Verlängerungszeitraum: 01.04.2025 - 30.04.2025
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="flex justify-between space-x-4 pt-4">
        <button
          onClick={goToPreviousStep}
          className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
        >
          Zurück
        </button>
        
        <button
          onClick={handleContinue}
          className="py-2 px-6 bg-accent text-white font-medium rounded-md hover:bg-accent-dark transition-all duration-200 transform hover:scale-105 hover:shadow-md"
        >
          Weiter
        </button>
      </div>
    </motion.div>
  );
};
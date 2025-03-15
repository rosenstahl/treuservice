"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../WinterdienstWizard';

type PackageSelectionStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

export const PackageSelectionStep: React.FC<PackageSelectionStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep 
}) => {
  const handlePackageSelection = (packageType: FormData['package']['type']) => {
    updateFormData({
      package: {
        type: packageType
      }
    });
  };
  
  const handleContinue = () => {
    goToNextStep();
  };
  
  // Animation Varianten für die Package Cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.4
      }
    })
  };

  // Aktueller Monat und Jahr für die Anzeige des Saisonzeitraums
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-11 (Jan-Dez)
  const currentYear = now.getFullYear();
  const nextYear = currentYear + 1;
  
  // Saisonzeitraum-Text
  const seasonText = (currentMonth >= 3 && currentMonth <= 9) 
    ? `(Nov.-Mrz. ${nextYear})` 
    : `(${currentMonth <= 2 ? currentYear : nextYear}-Mrz.)`;
  
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
          Servicepaket wählen
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Wählen Sie das für Sie passende Winterdienst-Paket. 
          {formData.area.value > 0 && (
            <span className="font-medium"> Für eine Fläche von {formData.area.value} m²</span>
          )}
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* FLEX Paket (links) */}
        <motion.div 
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
            formData.package.type === 'flex' 
              ? 'border-accent shadow-lg bg-white' 
              : 'border-gray-200 bg-white hover:shadow-md'
          }`}
          style={{
            boxShadow: formData.package.type === 'flex' ? '0 4px 14px rgba(0,0,0,0.1)' : '',
            transform: formData.package.type === 'flex' ? 'translateY(-4px)' : ''
          }}
        >
          {formData.package.type === 'flex' && (
            <div className="absolute top-0 left-0 z-10">
              <div className="bg-green-500 text-white py-1 px-4 rounded-br-lg text-xs font-medium">
                Ausgewählt
              </div>
            </div>
          )}
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-4 text-center border-b">
            <h3 className="text-2xl font-bold text-blue-600">FLEX</h3>
            <p className="text-sm text-gray-600">Im Ernstfall flexibel abgesichert sein</p>
          </div>
          
          <div className="p-5">
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Einsatzabhängige Abrechnung</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Zuverlässiger Winterdienst nach Bedarf</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Vorhaltung der personellen u. maschinellen Ressourcen</span>
              </li>
            </ul>
            
            <div className="border-t pt-4 mt-6 text-center">
              <div className="mt-2">
                <span className="text-blue-600 font-bold">Bereithaltegebühr {seasonText}</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                <span>Abrechnung pro Einsatz</span>
              </div>
            </div>
            
            <button
              onClick={() => handlePackageSelection('flex')}
              className={`w-full py-3 px-2 rounded-md mt-6 transition-all duration-300 ${
                formData.package.type === 'flex'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
              }`}
            >
              {formData.package.type === 'flex' ? 'Ausgewählt' : 'Jetzt auswählen'}
            </button>
          </div>
        </motion.div>
        
        {/* ALL-IN-ONE Paket (mitte) */}
        <motion.div 
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
            formData.package.type === 'all-in-one' 
              ? 'border-accent shadow-lg bg-white' 
              : 'border-gray-200 bg-white hover:shadow-md'
          }`}
          style={{
            boxShadow: formData.package.type === 'all-in-one' ? '0 4px 14px rgba(0,0,0,0.1)' : '',
            transform: formData.package.type === 'all-in-one' ? 'translateY(-4px)' : ''
          }}
        >
          {/* Eleganteres Bestseller-Label im Apple-Stil */}
          <div className="absolute top-3 right-3 z-20">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-1 px-3 rounded-full text-xs font-medium shadow-sm flex items-center">
              <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zm7-10a1 1 0 01.707.293l.707.707.707-.707A1 1 0 0116 3v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Bestseller
            </div>
          </div>
          
          {formData.package.type === 'all-in-one' && (
            <div className="absolute top-0 left-0 z-10">
              <div className="bg-green-500 text-white py-1 px-4 rounded-br-lg text-xs font-medium">
                Ausgewählt
              </div>
            </div>
          )}
          
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 py-4 text-center border-b">
            <h3 className="text-2xl font-bold text-blue-700">ALL-IN-ONE</h3>
            <p className="text-sm text-gray-600">Budgetsicherheit, keine Kostenüberraschung</p>
          </div>
          
          <div className="p-5">
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <div className="bg-blue-600 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Unbegrenzter Leistungsumfang in der gesamten Saison</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-600 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Zuverlässiger Winterdienst während der gesamten Saison</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-600 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Vorhaltung der personellen u. maschinellen Ressourcen</span>
              </li>
            </ul>
            
            <div className="border-t pt-4 mt-6 text-center">
              <div className="mt-2">
                <span className="text-blue-700 font-bold">Fixpreis/Saison {seasonText}</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                <span>Optional: monatliche Abrechnung</span>
              </div>
            </div>
            
            <button
              onClick={() => handlePackageSelection('all-in-one')}
              className={`w-full py-3 px-2 rounded-md mt-6 transition-all duration-300 ${
                formData.package.type === 'all-in-one'
                ? 'bg-blue-700 text-white'
                : 'bg-white text-blue-700 border border-blue-700 hover:bg-blue-50'
              }`}
            >
              {formData.package.type === 'all-in-one' ? 'Ausgewählt' : 'Jetzt auswählen'}
            </button>
          </div>
        </motion.div>
        
        {/* ON-DEMAND Paket (rechts) */}
        <motion.div 
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className={`relative overflow-hidden rounded-xl border transition-all duration-300 ${
            formData.package.type === 'on-demand' 
              ? 'border-accent shadow-lg bg-white' 
              : 'border-gray-200 bg-white hover:shadow-md'
          }`}
          style={{
            boxShadow: formData.package.type === 'on-demand' ? '0 4px 14px rgba(0,0,0,0.1)' : '',
            transform: formData.package.type === 'on-demand' ? 'translateY(-4px)' : ''
          }}
        >
          {formData.package.type === 'on-demand' && (
            <div className="absolute top-0 left-0 z-10">
              <div className="bg-green-500 text-white py-1 px-4 rounded-br-lg text-xs font-medium">
                Ausgewählt
              </div>
            </div>
          )}
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-4 text-center border-b">
            <h3 className="text-2xl font-bold text-blue-600">ON DEMAND</h3>
            <p className="text-sm text-gray-600">Unser TREU Service-Notfallservice</p>
          </div>
          
          <div className="p-5">
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">&quot;Last minute&quot; Buchung ohne Vorabreservierung</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Räum- und Streuservice bei Bedarf</span>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Sofortiger Einsatz möglich</span>
              </li>
            </ul>
            
            <div className="border-t pt-4 mt-6 text-center">
              <div className="mt-2">
                <span className="text-blue-600 font-bold">Abrechnung pro Einzelfahrt</span>
              </div>
            </div>
            
            <button
              onClick={() => handlePackageSelection('on-demand')}
              className={`w-full py-3 px-2 rounded-md mt-6 transition-all duration-300 ${
                formData.package.type === 'on-demand'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
              }`}
            >
              {formData.package.type === 'on-demand' ? 'Ausgewählt' : 'Jetzt auswählen'}
            </button>
          </div>
        </motion.div>
      </div>
      
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
        <button
          onClick={handleContinue}
          className="py-2 px-6 bg-accent text-white font-medium rounded-md hover:bg-accent-dark transition-all duration-200 transform hover:scale-105 hover:shadow-md"
        >
          Weiter
        </button>
      </motion.div>
    </motion.div>
  );
};
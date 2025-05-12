"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../WinterdienstWizard';
import { ShieldCheck, CalendarCheck, Hourglass } from 'lucide-react';

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
        type: packageType,
        price: 0 // Keine Preise übermitteln
      }
    });
  };
  
  const handleContinue = () => {
    goToNextStep();
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
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        {/* FLEX Paket */}
        <div
          className={`flex flex-col h-full overflow-hidden rounded-lg shadow-sm border transition-all duration-200 ${
            formData.package.type === 'flex' 
              ? 'border-accent/20 bg-accent/5 shadow-md' 
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100 flex items-center space-x-3">
            <Hourglass className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg text-blue-600">FLEX</h3>
          </div>
          
          <div className="flex-grow p-5 space-y-4">
            <p className="text-sm text-gray-600">Im Ernstfall flexibel abgesichert sein.</p>
            
            <ul className="space-y-2 my-4">
              <li className="flex text-sm">
                <span className="text-accent mr-2">✓</span>
                <span>Einsatzabhängige Abrechnung</span>
              </li>
              <li className="flex text-sm">
                <span className="text-accent mr-2">✓</span>
                <span>Zuverlässiger Winterdienst nach Bedarf</span>
              </li>
              <li className="flex text-sm">
                <span className="text-accent mr-2">✓</span>
                <span>Vorhaltung der personellen u. maschinellen Ressourcen</span>
              </li>
            </ul>
            
            <div className="text-center mt-4 space-y-1">
              <div className="font-medium">Saison {seasonText}</div>
              <div className="text-sm text-gray-500">Abrechnung pro Einsatz</div>
            </div>
          </div>

          <div className="p-5 pt-0">
            <button
              onClick={() => handlePackageSelection('flex')}
              className={`w-full py-2 px-4 rounded transition-colors ${
                formData.package.type === 'flex'
                  ? 'bg-blue-600 text-white'
                  : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              {formData.package.type === 'flex' ? 'Ausgewählt' : 'Auswählen'}
            </button>
          </div>
        </div>
        
        {/* ALL-IN-ONE Paket */}
        <div
          className={`flex flex-col h-full overflow-hidden rounded-lg shadow-sm border transition-all duration-200 ${
            formData.package.type === 'all-in-one' 
              ? 'border-accent/20 bg-accent/5 shadow-md' 
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="relative">
            <div className="absolute top-3 right-3">
              <div className="bg-blue-600 text-white py-1 px-3 rounded-full text-xs font-medium">
                Bestseller
              </div>
            </div>
          </div>

          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-100 to-blue-200 flex items-center space-x-3">
            <ShieldCheck className="h-5 w-5 text-blue-700" />
            <h3 className="font-semibold text-lg text-blue-700">ALL-IN-ONE</h3>
          </div>
          
          <div className="flex-grow p-5 space-y-4">
            <p className="text-sm text-gray-600">Budgetsicherheit, keine Kostenüberraschung.</p>
            
            <ul className="space-y-2 my-4">
              <li className="flex text-sm">
                <span className="text-accent mr-2">✓</span>
                <span>Unbegrenzter Leistungsumfang in der gesamten Saison</span>
              </li>
              <li className="flex text-sm">
                <span className="text-accent mr-2">✓</span>
                <span>Zuverlässiger Winterdienst während der gesamten Saison</span>
              </li>
              <li className="flex text-sm">
                <span className="text-accent mr-2">✓</span>
                <span>Vorhaltung der personellen u. maschinellen Ressourcen</span>
              </li>
            </ul>
            
            <div className="text-center mt-4 space-y-1">
              <div className="font-medium">Service für die Saison {seasonText}</div>
              <div className="text-sm text-gray-500">Optional: monatliche Abrechnung</div>
            </div>
          </div>

          <div className="p-5 pt-0">
            <button
              onClick={() => handlePackageSelection('all-in-one')}
              className={`w-full py-2 px-4 rounded transition-colors ${
                formData.package.type === 'all-in-one'
                  ? 'bg-blue-700 text-white'
                  : 'border border-blue-700 text-blue-700 hover:bg-blue-50'
              }`}
            >
              {formData.package.type === 'all-in-one' ? 'Ausgewählt' : 'Auswählen'}
            </button>
          </div>
        </div>
        
        {/* ON-DEMAND Paket */}
        <div
          className={`flex flex-col h-full overflow-hidden rounded-lg shadow-sm border transition-all duration-200 ${
            formData.package.type === 'on-demand' 
              ? 'border-accent/20 bg-accent/5 shadow-md' 
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-blue-100 flex items-center space-x-3">
            <CalendarCheck className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-lg text-blue-600">ON DEMAND</h3>
          </div>
          
          <div className="flex-grow p-5 space-y-4">
            <p className="text-sm text-gray-600">Unser TREU Service-Notfallservice.</p>
            
            <ul className="space-y-2 my-4">
              <li className="flex text-sm">
                <span className="text-accent mr-2">✓</span>
                <span>&ldquo;Last minute&rdquo; Buchung ohne Vorabreservierung</span>
              </li>
              <li className="flex text-sm">
                <span className="text-accent mr-2">✓</span>
                <span>Räum- und Streuservice bei Bedarf</span>
              </li>
              <li className="flex text-sm">
                <span className="text-accent mr-2">✓</span>
                <span>Sofortiger Einsatz möglich</span>
              </li>
            </ul>
            
            <div className="text-center mt-4 space-y-1">
              <div className="font-medium">Einzeleinsätze nach Bedarf</div>
              <div className="text-sm text-gray-500">Keine Voranmeldung nötig</div>
            </div>
          </div>

          <div className="p-5 pt-0">
            <button
              onClick={() => handlePackageSelection('on-demand')}
              className={`w-full py-2 px-4 rounded transition-colors ${
                formData.package.type === 'on-demand'
                  ? 'bg-blue-600 text-white'
                  : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              {formData.package.type === 'on-demand' ? 'Ausgewählt' : 'Auswählen'}
            </button>
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
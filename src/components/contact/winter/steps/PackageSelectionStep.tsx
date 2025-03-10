"use client"

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../WinterdienstWizard';
import { 
  calculateAllPrices, 
  formatPrice, 
  MIN_AREA,
  calculateSeasonRatio
} from '../utils/priceCalculation';

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
  // Aktueller saisonaler Faktor - automatisch berechnet basierend auf Datum
  const seasonRatio = calculateSeasonRatio();
  
  // Berechne alle Preise einmal pro Render
  const prices = useMemo(() => {
    const area = formData.area.value;
    return calculateAllPrices(area, seasonRatio);
  }, [formData.area.value, seasonRatio]);
  
  // Ermittle Monatspreise für ALL-IN-ONE Paket
  const monthlyPrice = Math.round(prices['all-in-one'] / 4);
  
  // Service-Preis für FLEX Paket
  const servicePrice = prices['service-price'];
  
  const handlePackageSelection = (packageType: FormData['package']['type']) => {
    updateFormData({
      package: {
        type: packageType,
        price: prices[packageType]
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
            <span className="font-medium"> Preis für {formData.area.value} m²</span>
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
          className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
            formData.package.type === 'flex' 
              ? 'border-accent shadow-md' 
              : 'border-gray-200 hover:border-accent/50'
          }`}
        >
          {formData.package.type === 'flex' && (
            <div className="absolute top-0 left-0 z-10">
              <div className="bg-green-500 text-white py-1 px-4 rounded-br-lg text-xs font-medium">
                Ausgewählt
              </div>
            </div>
          )}
          
          <div className="bg-secondary text-primary py-4 text-center">
            <h3 className="text-2xl font-bold text-accent">FLEX</h3>
            <p className="text-sm text-primary-light">Im Ernstfall flexibel abgesichert sein</p>
          </div>
          
          <div className="p-5 bg-secondary text-primary">
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <div className="bg-accent rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Einsatzabhängige Abrechnung</span>
              </li>
              <li className="flex items-start">
                <div className="bg-accent rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Übernahme der Verkehrssicherungspflicht inkl. der Haftung nach Zugang der Auftragsbestätigung</span>
              </li>
              <li className="flex items-start">
                <div className="bg-accent rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Vorhaltung der personellen u. maschinellen Ressourcen</span>
              </li>
            </ul>
            
            <div className="border-t border-accent/20 pt-4 mt-6">
              <div className="flex justify-between text-sm text-primary-light">
                <span>Bereithaltegebühr</span>
                <span className="font-bold text-primary-light">{formatPrice(prices['flex'])}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-accent font-bold">Ihr Preis {seasonText}</span>
                <span className="text-xl font-bold text-accent">{formatPrice(prices['flex'])}*</span>
              </div>
              <div className="flex justify-between text-sm text-primary-light mt-4">
                <span>Preis pro Einsatz</span>
                <span className="font-bold text-primary-light">{formatPrice(servicePrice)}*</span>
              </div>
            </div>
            
            <button
              onClick={() => handlePackageSelection('flex')}
              className="w-full py-3 px-2 rounded-md bg-white text-secondary font-semibold mt-6 hover:bg-primary-dark transition-colors"
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
          className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
            formData.package.type === 'all-in-one' 
              ? 'border-accent shadow-md' 
              : 'border-gray-200 hover:border-accent/50'
          }`}
        >
          <div className="absolute -right-12 -top-12 transform rotate-45 bg-accent w-40 h-40 z-10"></div>
          <div className="absolute top-1 right-1 z-20 text-white text-xs font-bold transform rotate-45">
            Bestseller
          </div>
          
          {formData.package.type === 'all-in-one' && (
            <div className="absolute top-0 left-0 z-10">
              <div className="bg-green-500 text-white py-1 px-4 rounded-br-lg text-xs font-medium">
                Ausgewählt
              </div>
            </div>
          )}
          
          <div className="bg-secondary text-primary py-4 text-center">
            <h3 className="text-2xl font-bold text-accent">ALL-IN-ONE</h3>
            <p className="text-sm text-primary-light">Budgetsicherheit, keine Kostenüberraschung</p>
          </div>
          
          <div className="p-5 bg-secondary text-primary">
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <div className="bg-accent rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Unbegrenzter Leistungsumfang in der gesamten Saison</span>
              </li>
              <li className="flex items-start">
                <div className="bg-accent rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Übernahme der Verkehrssicherungspflicht inkl. der Haftung nach Zugang der Auftragsbestätigung</span>
              </li>
              <li className="flex items-start">
                <div className="bg-accent rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Vorhaltung der personellen u. maschinellen Ressourcen</span>
              </li>
            </ul>
            
            <div className="border-t border-accent/20 pt-4 mt-6">
              <div className="flex justify-between text-sm text-primary-light">
                <span>Fixpreis/Saison</span>
                <span className="font-bold text-primary-light">{formatPrice(prices['all-in-one'])}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-accent font-bold">Ihr Preis {seasonText}</span>
                <span className="text-xl font-bold text-accent">{formatPrice(prices['all-in-one'])}*</span>
              </div>
              <div className="flex justify-between text-sm text-primary-light mt-4">
                <span>bei monatlicher Abrechnung</span>
                <span className="font-bold text-primary-light">{formatPrice(monthlyPrice)}*</span>
              </div>
            </div>
            
            <button
              onClick={() => handlePackageSelection('all-in-one')}
              className="w-full py-3 px-2 rounded-md bg-white text-secondary font-semibold mt-6 hover:bg-primary-dark transition-colors"
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
          className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300 ${
            formData.package.type === 'on-demand' 
              ? 'border-accent shadow-md' 
              : 'border-gray-200 hover:border-accent/50'
          }`}
        >
          {formData.package.type === 'on-demand' && (
            <div className="absolute top-0 left-0 z-10">
              <div className="bg-green-500 text-white py-1 px-4 rounded-br-lg text-xs font-medium">
                Ausgewählt
              </div>
            </div>
          )}
          
          <div className="bg-secondary text-primary py-4 text-center">
            <h3 className="text-2xl font-bold text-accent">ON DEMAND</h3>
            <p className="text-sm text-primary-light">Unser EQQO-Notfallservice</p>
          </div>
          
          <div className="p-5 bg-secondary text-primary">
            <ul className="space-y-4 mb-6">
              <li className="flex items-start">
                <div className="bg-accent rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">&quot;Last minute&quot; Buchung ohne Vorabreservierung</span>
              </li>
              <li className="flex items-start">
                <div className="bg-red-500 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <span className="text-sm">Keine Übernahme der Verkehrssicherungspflicht inkl. Haftung</span>
              </li>
              <li className="flex items-start">
                <div className="bg-accent rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm">Sofortiger Einsatz möglich</span>
              </li>
            </ul>
            
            <div className="border-t border-accent/20 pt-4 mt-6">
              <div className="flex justify-between items-center mt-4">
                <span className="text-accent font-bold">Einzelfahrt</span>
                <span className="text-xl font-bold text-accent">{formatPrice(prices['on-demand'])}*</span>
              </div>
            </div>
            
            <button
              onClick={() => handlePackageSelection('on-demand')}
              className="w-full py-3 px-2 rounded-md bg-white text-secondary font-semibold mt-6 hover:bg-primary-dark transition-colors"
            >
              {formData.package.type === 'on-demand' ? 'Ausgewählt' : 'Jetzt auswählen'}
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Information zur Flächengröße */}
      {formData.area.value > 0 && (
        <motion.div 
          className="text-center text-sm text-accent mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <p>
            Preisberechnung für eine Fläche von <span className="font-bold">{formData.area.value} m²</span>.
            {formData.area.value < MIN_AREA && (
              <span> (Mindestfläche {MIN_AREA} m² wird angewendet)</span>
            )}
          </p>
          <p className="text-xs mt-1">* zzgl. USt.</p>
        </motion.div>
      )}
      
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
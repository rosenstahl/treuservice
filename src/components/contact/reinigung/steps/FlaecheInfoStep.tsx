"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../ReinigungWizard'
import { Users, Ruler, Home, Building, Info } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type FlaecheInfoStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

// Erweiterte FormData um das Feld für Reinigungskräfte
type ExtendedFormData = FormData & {
  flaecheInfo: {
    flaeche: number;
    raumanzahl?: number;
    etagenanzahl?: number;
    fensteranzahl?: number;
    reinigungskraefte?: number;
    spezialDetails: string;
  }
}

export const FlaecheInfoStep: React.FC<FlaecheInfoStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep,
  goToPreviousStep
}) => {
  // Cast zu erweitertem FormData Typ
  const extendedFormData = formData as ExtendedFormData;

  const [flaeche, setFlaeche] = useState(extendedFormData.flaecheInfo.flaeche || 0);
  const [raumanzahl, setRaumanzahl] = useState(extendedFormData.flaecheInfo.raumanzahl || 0);
  const [etagenanzahl, setEtagenanzahl] = useState(extendedFormData.flaecheInfo.etagenanzahl || 1);
  const [fensteranzahl, setFensteranzahl] = useState(extendedFormData.flaecheInfo.fensteranzahl || 0);
  const [reinigungskraefte, setReinigungskraefte] = useState(extendedFormData.flaecheInfo.reinigungskraefte || 1);
  const [spezialDetails, setSpezialDetails] = useState(extendedFormData.flaecheInfo.spezialDetails || '');
  const [error, setError] = useState('');
  
  // Analyse der gewählten Reinigungsart und Objekttyp für dynamische Feldanzeige
  const reinigungsart = formData.reinigungsart.hauptkategorie;
  const objektTyp = formData.objektTyp.typ;

  // Booleans für verschiedene Reinigungsarten-Kategorien
  const isInnenreinigung = [
    'unterhaltsreinigung', 'grundreinigung', 'hotel', 'veranstaltung', 'reinraum'
  ].includes(reinigungsart);
  
  const isFensterreinigung = [
    'glas_fassade'
  ].includes(reinigungsart);
  
  const isDachreinigung = [
    'dachreinigung'
  ].includes(reinigungsart);
  
  const isSolarreinigung = [
    'solaranlagen'
  ].includes(reinigungsart);
  
  const isAussenreinigung = [
    'aussenanlagen', 'steinreinigung'
  ].includes(reinigungsart);
  
  const isGebaeude = [
    'buero', 'wohnhaus', 'hotel', 'krankenhaus', 'schule', 'gewerbe'
  ].includes(objektTyp);

  // Hilfsfunktion zur Aktualisierung der FormData
  const updateFormDataWithAll = useCallback(() => {
    const updatedData = {
      flaecheInfo: {
        ...formData.flaecheInfo,
        flaeche,
        reinigungskraefte,
        spezialDetails
      }
    };
    
    // Nur hinzufügen, wenn relevant
    if (isInnenreinigung) {
      updatedData.flaecheInfo.raumanzahl = raumanzahl;
    }
    
    if (isGebaeude) {
      updatedData.flaecheInfo.etagenanzahl = etagenanzahl;
    }
    
    if (isFensterreinigung) {
      updatedData.flaecheInfo.fensteranzahl = fensteranzahl;
    }
    
    updateFormData(updatedData);
  }, [formData.flaecheInfo, flaeche, reinigungskraefte, spezialDetails, isInnenreinigung, raumanzahl, isGebaeude, etagenanzahl, isFensterreinigung, fensteranzahl, updateFormData]);

  // Update FormData, wenn relevante Werte sich ändern
  useEffect(() => {
    updateFormDataWithAll();
  }, [flaeche, raumanzahl, etagenanzahl, fensteranzahl, reinigungskraefte, spezialDetails, updateFormDataWithAll]);

  // Handler für numerische Eingaben im Apple-Style
  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: number, min: number = 0) => {
    setter(Math.max(min, value));
  };

  const handleSpezialDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSpezialDetails(e.target.value);
  };

  const handleContinue = () => {
    // Einfache Validierung
    if (flaeche <= 0) {
      setError('Bitte geben Sie eine gültige Fläche an');
      return;
    }
    
    if (isInnenreinigung && raumanzahl <= 0) {
      setError('Bitte geben Sie die Anzahl der Räume an');
      return;
    }
    
    if (isFensterreinigung && fensteranzahl <= 0) {
      setError('Bitte geben Sie die Anzahl der Fenster an');
      return;
    }
    
    // Sicherstellen, dass alle Daten gespeichert sind
    updateFormDataWithAll();
    goToNextStep();
  };

  // Hilfstext für die Flächenberechnung basierend auf der Reinigungsart
  const getFlaechenLabel = () => {
    if (isFensterreinigung) return "Glasfläche:";
    if (isDachreinigung) return "Dachfläche:";
    if (isSolarreinigung) return "Fläche der Solaranlage:";
    if (isAussenreinigung) return "Außenfläche:";
    return "Fläche:";
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
          Umfang und Größe
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Geben Sie Informationen zur Größe der zu reinigenden Fläche an
        </motion.p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        {/* Reinigungskräfte */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Label htmlFor="reinigungskraefte" className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Users className="h-4 w-4 mr-2 text-accent" />
            Anzahl der benötigten Reinigungskräfte
          </Label>
          <div className="flex max-w-xs">
            <button
              type="button"
              onClick={() => handleNumberChange(setReinigungskraefte, reinigungskraefte - 1, 1)}
              className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
            >
              -
            </button>
            <input
              id="reinigungskraefte"
              type="text"
              inputMode="numeric"
              value={reinigungskraefte}
              onChange={(e) => handleNumberChange(setReinigungskraefte, parseInt(e.target.value) || 1, 1)}
              className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
              style={{ appearance: "textfield" }}
            />
            <button
              type="button"
              onClick={() => handleNumberChange(setReinigungskraefte, reinigungskraefte + 1, 1)}
              className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
            >
              +
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Mindestbestellung: 1 Reinigungskraft
          </p>
        </motion.div>

        {/* Flächenangabe */}
        <motion.div 
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Ruler className="h-4 w-4 mr-2 text-accent" />
            {getFlaechenLabel()}
          </Label>
          <div className="flex max-w-xs">
            <button
              type="button"
              onClick={() => handleNumberChange(setFlaeche, flaeche - 5, 0)}
              className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
            >
              -
            </button>
            <input
              id="flaeche"
              type="text"
              inputMode="numeric"
              value={flaeche}
              onChange={(e) => handleNumberChange(setFlaeche, parseInt(e.target.value) || 0)}
              className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
              style={{ appearance: "textfield" }}
            />
            <button
              type="button"
              onClick={() => handleNumberChange(setFlaeche, flaeche + 5)}
              className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
            >
              +
            </button>
            <span className="ml-3 flex items-center">m²</span>
          </div>
        </motion.div>

        {/* Raumanzahl - nur bei Innenreinigung */}
        {isInnenreinigung && (
          <motion.div 
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.3 }}
          >
            <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Home className="h-4 w-4 mr-2 text-accent" />
              Anzahl der Räume
            </Label>
            <div className="flex max-w-xs">
              <button
                type="button"
                onClick={() => handleNumberChange(setRaumanzahl, raumanzahl - 1, 0)}
                className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
              >
                -
              </button>
              <input
                id="raumanzahl"
                type="text"
                inputMode="numeric"
                value={raumanzahl}
                onChange={(e) => handleNumberChange(setRaumanzahl, parseInt(e.target.value) || 0)}
                className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
                style={{ appearance: "textfield" }}
              />
              <button
                type="button"
                onClick={() => handleNumberChange(setRaumanzahl, raumanzahl + 1)}
                className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
              >
                +
              </button>
            </div>
          </motion.div>
        )}

        {/* Etagenanzahl - nur bei Gebäuden */}
        {isGebaeude && (isInnenreinigung || reinigungsart === 'glas_fassade') && (
          <motion.div 
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Building className="h-4 w-4 mr-2 text-accent" />
              Anzahl der Etagen
            </Label>
            <div className="flex max-w-xs">
              <button
                type="button"
                onClick={() => handleNumberChange(setEtagenanzahl, etagenanzahl - 1, 1)}
                className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
              >
                -
              </button>
              <input
                id="etagenanzahl"
                type="text"
                inputMode="numeric"
                value={etagenanzahl}
                onChange={(e) => handleNumberChange(setEtagenanzahl, parseInt(e.target.value) || 1, 1)}
                className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
                style={{ appearance: "textfield" }}
              />
              <button
                type="button"
                onClick={() => handleNumberChange(setEtagenanzahl, etagenanzahl + 1)}
                className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
              >
                +
              </button>
            </div>
          </motion.div>
        )}

        {/* Fensteranzahl - nur bei Fensterreinigung */}
        {isFensterreinigung && (
          <motion.div 
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.3 }}
          >
            <Label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Info className="h-4 w-4 mr-2 text-accent" />
              Anzahl der Fenster/Glaselemente
            </Label>
            <div className="flex max-w-xs">
              <button
                type="button"
                onClick={() => handleNumberChange(setFensteranzahl, fensteranzahl - 1, 0)}
                className="px-3 py-2 bg-gray-100 rounded-l-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
              >
                -
              </button>
              <input
                id="fensteranzahl"
                type="text"
                inputMode="numeric"
                value={fensteranzahl}
                onChange={(e) => handleNumberChange(setFensteranzahl, parseInt(e.target.value) || 0)}
                className="w-16 px-3 py-2 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-0"
                style={{ appearance: "textfield" }}
              />
              <button
                type="button"
                onClick={() => handleNumberChange(setFensteranzahl, fensteranzahl + 1)}
                className="px-3 py-2 bg-gray-100 rounded-r-md border border-gray-300 hover:bg-gray-200 transition-colors text-gray-700"
              >
                +
              </button>
            </div>
          </motion.div>
        )}

        {/* Zusatzinformationen */}
        <motion.div
          className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Label htmlFor="spezialDetails" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Info className="h-4 w-4 mr-2 text-accent" />
            Zusätzliche Informationen (optional)
          </Label>
          
          <Textarea
            id="spezialDetails"
            name="spezialDetails"
            rows={3}
            value={spezialDetails}
            onChange={handleSpezialDetailsChange}
            placeholder="Besonderheiten, Zugang, spezielle Verschmutzungen oder andere wichtige Informationen"
            className="w-full bg-white border-gray-200 focus:ring-accent/30 focus:border-accent/30"
          />
        </motion.div>
      </div>

      {error && (
        <motion.div 
          className="mt-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm text-center max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}
      
      <motion.div 
        className="flex justify-between max-w-xl mx-auto mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      >
        <motion.button
          onClick={goToPreviousStep}
          className="py-2 px-6 bg-gray-100 text-gray-700 font-medium rounded-md border border-gray-200 hover:bg-gray-200 transition-all duration-200 hover:shadow-sm"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Zurück
        </motion.button>

        <motion.button
          onClick={handleContinue}
          className="py-3 px-8 rounded-md font-medium transition-all duration-200 bg-accent text-white hover:bg-accent-dark hover:shadow-md"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Weiter
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
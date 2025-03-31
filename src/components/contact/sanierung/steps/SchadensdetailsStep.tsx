"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../SanierungWizard'
import { Input } from '@/components/ui/input'
import { Checkbox2 } from '@/components/ui/checkbox2'
import { Label } from '@/components/ui/label'
import { Flame, Droplet, Calendar, Info, Bug, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

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
  const [error, setError] = useState('')
  const [customWasserUrsache, setCustomWasserUrsache] = useState(formData.details.wasserUrsacheCustom || '')
  const [schimmelFlaeche, setSchimmelFlaeche] = useState(formData.details.schimmelFlaeche || 0)
  const [schimmelUrsache, setSchimmelUrsache] = useState(formData.details.schimmelUrsache || '')
  const [schadensDatum, setSchadensDatum] = useState<Date | undefined>(
    formData.details.wasserZeitpunkt ? new Date(formData.details.wasserZeitpunkt) : undefined
  )

  useEffect(() => {
    // Prüfen, ob der Schritt vollständig ist (je nach Schadensart)
    let valid = true;

    if (formData.schadensart.hauptkategorie === 'brand') {
      valid = !!formData.details.brandVerschmutzungsgrad && formData.details.brandMaterialien.length > 0;
    } else if (formData.schadensart.hauptkategorie === 'wasser') {
      const hasUrsache = !!formData.details.wasserUrsache && 
      (formData.details.wasserUrsache !== 'sonstige' || customWasserUrsache.trim() !== '');
          valid = hasUrsache && !!formData.details.wasserArt;
    } else if (formData.schadensart.hauptkategorie === 'schimmel') {
      valid = formData.details.schimmelFlaeche > 0 && 
        (!formData.details.schimmelUrsacheBekannt || schimmelUrsache.trim() !== '');
    }

    setIsValid(valid);
  }, [
    formData.schadensart.hauptkategorie, 
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
  ]);

  // Brand-Materialien-Checkboxen
  const brandMaterialien = [
    { id: 'holz', label: 'Holz' },
    { id: 'textilien', label: 'Textilien' },
    { id: 'kunststoff', label: 'Kunststoff' },
    { id: 'tapete', label: 'Tapete' },
    { id: 'bodenbelag', label: 'Bodenbelag' },
    { id: 'moebel', label: 'Möbel' },
    { id: 'elektrogeraete', label: 'Elektrogeräte' }
  ];

  // Beschreibungen für Verschmutzungsgrade
  const verschmutzungsgradDescriptions = {
    leicht: "Oberflächlicher Ruß, kaum Geruch",
    mittel: "Deutlicher Ruß, wahrnehmbarer Geruch",
    stark: "Starke Verschmutzung, intensiver Geruch"
  };

  const handleBrandVerschmutzung = (grad: FormData['details']['brandVerschmutzungsgrad']) => {
    updateFormData({
      details: {
        ...formData.details,
        brandVerschmutzungsgrad: grad
      }
    });
    setError('');
  };

  const handleBrandMaterialToggle = (e: React.ChangeEvent<HTMLInputElement>, materialId: string) => {
    const checked = e.target.checked;
    const currentMaterialien = formData.details.brandMaterialien || [];
    const newMaterialien = checked
      ? [...currentMaterialien, materialId]
      : currentMaterialien.filter(id => id !== materialId);

    updateFormData({
      details: {
        ...formData.details,
        brandMaterialien: newMaterialien
      }
    });
    setError('');
  };

  const handleWasserUrsache = (value: FormData['details']['wasserUrsache']) => {
    updateFormData({
      details: {
        ...formData.details,
        wasserUrsache: value
      }
    });
    setError('');
  };

  const handleCustomWasserUrsache = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomWasserUrsache(e.target.value);
    updateFormData({
      details: {
        ...formData.details,
        wasserUrsacheCustom: e.target.value
      }
    });
  };

  const handleWasserArt = (value: FormData['details']['wasserArt']) => {
    updateFormData({
      details: {
        ...formData.details,
        wasserArt: value
      }
    });
    setError('');
  };

  const handleWasserZeitpunkt = (date: Date | undefined) => {
    setSchadensDatum(date);
    updateFormData({
      details: {
        ...formData.details,
        wasserZeitpunkt: date ? date.toISOString().split('T')[0] : ''
      }
    });
    setError('');
  };

  const handleSchimmelFlaeche = useCallback((newValue: number) => {
    const value = Math.max(0, newValue);
    setSchimmelFlaeche(value);
    updateFormData({
      details: {
        ...formData.details,
        schimmelFlaeche: value
      }
    });
    setError('');
  }, [formData.details, updateFormData]);

  const handleSchimmelSichtbar = (value: string) => {
    const sichtbar = value === 'ja';
    updateFormData({
      details: {
        ...formData.details,
        schimmelSichtbar: sichtbar
      }
    });
    setError('');
  };

  const handleSchimmelUrsacheBekannt = (value: string) => {
    const bekannt = value === 'ja';
    updateFormData({
      details: {
        ...formData.details,
        schimmelUrsacheBekannt: bekannt
      }
    });
    setError('');
  };

  const handleSchimmelUrsache = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchimmelUrsache(e.target.value);
    updateFormData({
      details: {
        ...formData.details,
        schimmelUrsache: e.target.value
      }
    });
  };

  const handleContinue = () => {
    if (formData.schadensart.hauptkategorie === 'sonstiges' || isValid) {
      goToNextStep();
    } else {
      // Set error message based on the current schadensart
      if (formData.schadensart.hauptkategorie === 'brand') {
        if (!formData.details.brandVerschmutzungsgrad) {
          setError('Bitte wählen Sie den Grad der Verschmutzung aus');
        } else if (formData.details.brandMaterialien.length === 0) {
          setError('Bitte wählen Sie mindestens ein betroffenes Material aus');
        }
      } else if (formData.schadensart.hauptkategorie === 'wasser') {
        if (!formData.details.wasserUrsache) {
          setError('Bitte wählen Sie eine Schadensursache aus');
        } else if (formData.details.wasserUrsache === 'sonstige' && !customWasserUrsache.trim()) {
          setError('Bitte geben Sie die Ursache an');
        } else if (!formData.details.wasserArt) {
          setError('Bitte wählen Sie die Art des Wassers aus');
        }
      } else if (formData.schadensart.hauptkategorie === 'schimmel') {
        if (formData.details.schimmelFlaeche <= 0) {
          setError('Bitte geben Sie die ungefähre Größe der befallenen Fläche an');
        } else if (formData.details.schimmelUrsacheBekannt && !schimmelUrsache.trim()) {
          setError('Bitte geben Sie die bekannte Ursache an');
        }
      }
    }
  };

  // Rendering der Detailfelder je nach Schadensart
  const renderBrandDetails = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Flame className="h-4 w-4 mr-2 text-red-500" />
          Grad der Verschmutzung
        </h3>
        
        <div className="grid grid-cols-3 gap-3">
          {(['leicht', 'mittel', 'stark'] as const).map((grad) => (
            <motion.div
              key={grad}
              className={`relative flex flex-col items-center border rounded-lg p-3 cursor-pointer transition-all
                ${formData.details.brandVerschmutzungsgrad === grad ? 'border-[#009FD8] bg-[#E6F4FA]' : 'border-gray-200'}`}
              onClick={() => handleBrandVerschmutzung(grad)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="w-full h-12 rounded mb-2 overflow-hidden">
                <div className={`w-full h-full flex items-center justify-center ${
                  grad === 'leicht' ? 'bg-gray-100' :
                  grad === 'mittel' ? 'bg-gray-300' :
                  'bg-gray-500'
                }`}>
                  <span className={`text-xs ${grad === 'stark' ? 'text-white' : 'text-gray-700'} capitalize`}>{grad}</span>
                </div>
              </div>
              <span className="text-xs font-medium capitalize mb-1">{grad}</span>
              <p className="text-xs text-gray-500 text-center">
                {verschmutzungsgradDescriptions[grad]}
              </p>
              {formData.details.brandVerschmutzungsgrad === grad && (
                <motion.div 
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#009FD8] rounded-full flex items-center justify-center text-white"
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

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          Betroffene Materialien
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-2">
          {brandMaterialien.map((material) => (
            <div key={material.id} className="flex items-start space-x-2 p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
              <Checkbox2
                id={`material-${material.id}`}
                checked={(formData.details.brandMaterialien || []).includes(material.id)}
                onChange={(e) => handleBrandMaterialToggle(e, material.id)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label htmlFor={`material-${material.id}`} className="flex items-center text-xs font-medium text-gray-700">
                  {material.label}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWasserDetails = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Droplet className="h-4 w-4 mr-2 text-blue-500" />
          Schadensursache
        </h3>
        <div className="space-y-2.5">
          {[
            { id: 'rohrbruch', label: 'Rohrbruch' },
            { id: 'unwetter', label: 'Unwetter/Starkregen' },
            { id: 'hochwasser', label: 'Hochwasser' },
            { id: 'loeschwasser', label: 'Löschwasser' },
            { id: 'sonstige', label: 'Sonstige Ursache' }
          ].map((option) => (
            <div 
              key={option.id} 
              className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
                formData.details.wasserUrsache === option.id
                  ? 'bg-[#E6F4FA] border-[#009FD8]'
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
              onClick={() => handleWasserUrsache(option.id as FormData['details']['wasserUrsache'])}
            >
              <div className={`mr-2 w-4 h-4 rounded-full flex items-center justify-center ${
                formData.details.wasserUrsache === option.id
                  ? 'bg-[#009FD8]'
                  : 'border border-gray-300'
              }`}>
                {formData.details.wasserUrsache === option.id && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <Label className="cursor-pointer text-xs font-medium text-gray-700 flex-1">
                {option.label}
              </Label>
            </div>
          ))}
        </div>

        {formData.details.wasserUrsache === 'sonstige' && (
          <motion.div 
            className="mt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            <Input
              value={customWasserUrsache}
              onChange={handleCustomWasserUrsache}
              placeholder="Bitte Ursache angeben"
              className="w-full border-gray-200 text-sm rounded-lg"
            />
          </motion.div>
        )}
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Droplet className="h-4 w-4 mr-2 text-blue-500" />
          Art des Wassers
        </h3>
        <div className="space-y-2.5">
          <div 
            className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
              formData.details.wasserArt === 'sauber'
                ? 'bg-[#E6F4FA] border-[#009FD8]'
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => handleWasserArt('sauber')}
          >
            <div className={`mr-2 w-4 h-4 rounded-full flex items-center justify-center ${
              formData.details.wasserArt === 'sauber'
                ? 'bg-[#009FD8]'
                : 'border border-gray-300'
            }`}>
              {formData.details.wasserArt === 'sauber' && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <div className="flex-1">
              <Label className="flex flex-col cursor-pointer">
                <span className="text-xs font-medium">Sauberes Wasser</span>
                <span className="text-xs text-gray-500">z.B. Leitungswasser, Regenwasser</span>
              </Label>
            </div>
          </div>
          
          <div 
            className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
              formData.details.wasserArt === 'kontaminiert'
                ? 'bg-[#E6F4FA] border-[#009FD8]'
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => handleWasserArt('kontaminiert')}
          >
            <div className={`mr-2 w-4 h-4 rounded-full flex items-center justify-center ${
              formData.details.wasserArt === 'kontaminiert'
                ? 'bg-[#009FD8]'
                : 'border border-gray-300'
            }`}>
              {formData.details.wasserArt === 'kontaminiert' && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <div className="flex-1">
              <Label className="flex flex-col cursor-pointer">
                <span className="text-xs font-medium">Kontaminiertes Wasser</span>
                <span className="text-xs text-gray-500">z.B. Abwasser, verunreinigtes Wasser</span>
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
          Zeitpunkt des Schadens
        </h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-lg text-xs h-9",
                !schadensDatum && "text-gray-400"
              )}
            >
              <Calendar className="mr-2 h-3.5 w-3.5" />
              {schadensDatum ? format(schadensDatum, "PPP", { locale: de }) : <span>Datum auswählen</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 border border-gray-200 rounded-lg bg-white" align="start">
            <CalendarComponent
              mode="single"
              selected={schadensDatum}
              onSelect={handleWasserZeitpunkt}
              initialFocus
              disabled={(date) => date > new Date()}
              className="bg-white"
            />
          </PopoverContent>
        </Popover>
        <p className="text-xs text-gray-500 mt-2 flex items-center">
          <Info className="h-3 w-3 mr-1 text-blue-500" />
          Je früher nach Schadenseintritt mit der Sanierung begonnen wird, desto einfacher und kostengünstiger ist diese.
        </p>
      </div>
    </div>
  );

  const renderSchimmelDetails = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Bug className="h-4 w-4 mr-2 text-green-600" />
          Ist der Schimmel sichtbar?
        </h3>
        <div className="space-y-2.5">
          <div 
            className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
              formData.details.schimmelSichtbar
                ? 'bg-[#E6F4FA] border-[#009FD8]'
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => handleSchimmelSichtbar('ja')}
          >
            <div className={`mr-2 w-4 h-4 rounded-full flex items-center justify-center ${
              formData.details.schimmelSichtbar
                ? 'bg-[#009FD8]'
                : 'border border-gray-300'
            }`}>
              {formData.details.schimmelSichtbar && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <div className="flex-1">
              <Label className="flex flex-col cursor-pointer">
                <span className="text-xs font-medium">Ja, der Schimmel ist sichtbar</span>
              </Label>
            </div>
          </div>
          
          <div 
            className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
              !formData.details.schimmelSichtbar
                ? 'bg-[#E6F4FA] border-[#009FD8]'
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => handleSchimmelSichtbar('nein')}
          >
            <div className={`mr-2 w-4 h-4 rounded-full flex items-center justify-center ${
              !formData.details.schimmelSichtbar
                ? 'bg-[#009FD8]'
                : 'border border-gray-300'
            }`}>
              {!formData.details.schimmelSichtbar && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <div className="flex-1">
              <Label className="flex flex-col cursor-pointer">
                <span className="text-xs font-medium">Nein, aber es gibt Anzeichen</span>
                <span className="text-xs text-gray-500">z.B. Geruch, Feuchtigkeitsschäden</span>
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Bug className="h-4 w-4 mr-2 text-green-600" />
          Ungefähre Größe der befallenen Fläche
        </h3>
        <div className="flex max-w-xs">
          <button
            type="button"
            onClick={() => handleSchimmelFlaeche(schimmelFlaeche - 0.5)}
            className="px-3 py-1.5 bg-gray-50 rounded-l-lg border border-gray-200 hover:bg-gray-100 transition-colors text-gray-700 text-sm"
          >
            -
          </button>
          <input
            type="text"
            inputMode="numeric"
            value={schimmelFlaeche}
            onChange={(e) => handleSchimmelFlaeche(parseFloat(e.target.value) || 0)}
            className="w-16 px-3 py-1.5 border-t border-b border-gray-200 text-center focus:outline-none focus:ring-0 text-sm"
            style={{ appearance: "textfield" }}
          />
          <button
            type="button"
            onClick={() => handleSchimmelFlaeche(schimmelFlaeche + 0.5)}
            className="px-3 py-1.5 bg-gray-50 rounded-r-lg border border-gray-200 hover:bg-gray-100 transition-colors text-gray-700 text-sm"
          >
            +
          </button>
          <span className="ml-2 self-center text-sm">m²</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
          <Bug className="h-4 w-4 mr-2 text-green-600" />
          Ist die Ursache bekannt?
        </h3>
        <div className="space-y-2.5">
          <div 
            className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
              formData.details.schimmelUrsacheBekannt
                ? 'bg-[#E6F4FA] border-[#009FD8]'
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => handleSchimmelUrsacheBekannt('ja')}
          >
            <div className={`mr-2 w-4 h-4 rounded-full flex items-center justify-center ${
              formData.details.schimmelUrsacheBekannt
                ? 'bg-[#009FD8]'
                : 'border border-gray-300'
            }`}>
              {formData.details.schimmelUrsacheBekannt && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <Label className="cursor-pointer text-xs font-medium">Ja</Label>
          </div>
          
          <div 
            className={`flex items-center p-2.5 rounded-lg border cursor-pointer transition-colors ${
              !formData.details.schimmelUrsacheBekannt
                ? 'bg-[#E6F4FA] border-[#009FD8]'
                : 'bg-white border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => handleSchimmelUrsacheBekannt('nein')}
          >
            <div className={`mr-2 w-4 h-4 rounded-full flex items-center justify-center ${
              !formData.details.schimmelUrsacheBekannt
                ? 'bg-[#009FD8]'
                : 'border border-gray-300'
            }`}>
              {!formData.details.schimmelUrsacheBekannt && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <Label className="cursor-pointer text-xs font-medium">Nein</Label>
          </div>
        </div>

        {formData.details.schimmelUrsacheBekannt && (
          <motion.div 
            className="mt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.2 }}
          >
            <Input
              value={schimmelUrsache}
              onChange={handleSchimmelUrsache}
              placeholder="Bitte Ursache angeben (z.B. undichtes Fenster, Wasserschaden)"
              className="w-full border-gray-200 text-sm rounded-lg"
            />
          </motion.div>
        )}
      </div>
    </div>
  );

  // Rendering für sonstige Sanierungen
  const renderSonstigeDetails = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-[#E6F4FA] border border-[#009FD8]/20 rounded-xl p-4 text-gray-700">
        <div className="flex items-center mb-2">
          <Info className="h-4 w-4 mr-2 text-[#009FD8]" />
          <h3 className="font-medium text-sm">Individuelle Sanierung</h3>
        </div>
        <p className="text-xs">
          Für individuelle Sanierungsleistungen benötigen wir einen Vor-Ort-Termin, um den genauen Umfang 
          zu bestimmen. Fahren Sie mit dem Formular fort, um einen Termin zu vereinbaren.
        </p>
      </div>
    </div>
  );

  // Dynamisches Rendering je nach Schadensart
  const renderDetails = () => {
    switch (formData.schadensart.hauptkategorie) {
      case 'brand':
        return renderBrandDetails();
      case 'wasser':
        return renderWasserDetails();
      case 'schimmel':
        return renderSchimmelDetails();
      default:
        return renderSonstigeDetails();
    }
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
          Schadensdetails
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-xl mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          Bitte geben Sie weitere Details zum Schaden an.
        </motion.p>
      </div>

      {renderDetails()}

      {error && (
        <motion.div 
          className="mt-4 p-2.5 bg-red-50 border border-red-200 rounded-lg text-red-600 text-xs text-center max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-center">
            <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
            <p>{error}</p>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between max-w-2xl mx-auto mt-7 pt-5 border-t border-gray-100">
        <motion.button
          onClick={goToPreviousStep}
          className="py-2 px-4 text-gray-600 text-xs font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Zurück
        </motion.button>

        <motion.button
          onClick={handleContinue}
          disabled={formData.schadensart.hauptkategorie !== 'sonstiges' && !isValid}
          className={`py-2.5 px-6 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
            isValid || formData.schadensart.hauptkategorie === 'sonstiges'
              ? 'bg-[#009FD8] text-white hover:bg-[#007CAB]'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          whileHover={(isValid || formData.schadensart.hauptkategorie === 'sonstiges') ? { scale: 1.01 } : {}}
          whileTap={(isValid || formData.schadensart.hauptkategorie === 'sonstiges') ? { scale: 0.99 } : {}}
        >
          Weiter
          {(isValid || formData.schadensart.hauptkategorie === 'sonstiges') && <ArrowRight className="h-3.5 w-3.5" />}
        </motion.button>
      </div>
    </motion.div>
  );
}
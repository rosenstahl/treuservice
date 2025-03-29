"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, User, Mail, Phone, Building2, MapPinned, Pen, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Servicetypen
type ServiceType = 'entruempelung' | 'entkernung' | 'reinigung' | 'security' | 'winter' | 'sanierung' | 'pv' | 'leiharbeit';

interface ContactFormProps {
  serviceType: ServiceType;
}

// Servicespezifische Label und Texte
const serviceLabels: Record<ServiceType, {title: string, successMessage: string}> = {
  entruempelung: {
    title: 'Entrümpelung',
    successMessage: 'Vielen Dank für Ihre Entrümpelungsanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.'
  },
  entkernung: {
    title: 'Entkernung',
    successMessage: 'Vielen Dank für Ihre Entkernungsanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.'
  },
  reinigung: {
    title: 'Reinigung',
    successMessage: 'Vielen Dank für Ihre Reinigungsanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.'
  },
  security: {
    title: 'Security',
    successMessage: 'Vielen Dank für Ihre Security-Anfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.'
  },
  winter: {
    title: 'Winterdienst',
    successMessage: 'Vielen Dank für Ihre Winterdienst-Anfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.'
  },
  sanierung: {
    title: 'Sanierung',
    successMessage: 'Vielen Dank für Ihre Sanierungsanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.'
  },
  pv: {
    title: 'PV-Montage',
    successMessage: 'Vielen Dank für Ihre PV-Montageanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.'
  },
  leiharbeit: {
    title: 'Leiharbeit',
    successMessage: 'Vielen Dank für Ihre Leiharbeitsanfrage. Wir werden uns innerhalb der nächsten 24 Stunden mit einem maßgeschneiderten Angebot bei Ihnen melden.'
  }
};

const ContactForm: React.FC<ContactFormProps> = ({ serviceType }) => {
  // Zustandsvariablen
  const [formData, setFormData] = useState({
    anrede: '',
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    firma: '',
    adresseStrasse: '',
    adresseHausnummer: '',
    adressePlz: '',
    adresseOrt: '',
    wunschtermin: '',
    anmerkungen: '',
    datenschutz: false
  });
  
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Funktionen zur Formularverarbeitung
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (error) setError('');
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, anrede: value }));
    if (error) setError('');
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData(prev => ({ ...prev, [id]: checked }));
    if (error) setError('');
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    if (date) {
      setFormData(prev => ({ 
        ...prev, 
        wunschtermin: date.toISOString().split('T')[0]
      }));
    }
    if (error) setError('');
  };

  // Berechne das Mindestdatum für den Datumsauswähler (heute + 1 Tag = morgen)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  // Berechne das Maximaldatum für den Datumsauswähler (3 Monate in der Zukunft)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // E-Mail-Validierung
    const validateEmail = (email: string) => {
      const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return re.test(email);
    };
    
    // Grundlegende Validierung
    if (!formData.vorname.trim() || !formData.nachname.trim()) {
      setError('Bitte geben Sie Ihren Vor- und Nachnamen an');
      return;
    }
    
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setError('Bitte geben Sie eine gültige E-Mail-Adresse an');
      return;
    }
    
    if (!formData.telefon.trim()) {
      setError('Bitte geben Sie Ihre Telefonnummer an');
      return;
    }
    
    // Adressfelder prüfen
    if (!formData.adresseStrasse.trim() || !formData.adresseHausnummer.trim() || 
        !formData.adressePlz.trim() || !formData.adresseOrt.trim()) {
      setError('Bitte geben Sie Ihre vollständige Adresse an');
      return;
    }
    
    // Wunschtermin prüfen
    if (!formData.wunschtermin) {
      setError('Bitte wählen Sie einen Wunschtermin');
      return;
    }
    
    // Datenschutz prüfen
    if (!formData.datenschutz) {
      setError('Bitte stimmen Sie den Datenschutzbestimmungen zu');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // API-Anfrage zum Senden der E-Mail
      const response = await fetch(`/api/contact/unified`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceType
        }),
      });
      
      if (!response.ok) {
        throw new Error('Fehler beim Senden der Anfrage');
      }
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Fehler beim Senden der Anfrage:', error);
      setIsSubmitting(false);
      setError('Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.');
    }
  };

  return (
    <>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Anrede als Select im Apple-Stil */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Anrede
            </Label>
            <Select 
              value={formData.anrede} 
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="w-full bg-white border border-gray-300 rounded-lg focus:ring-[#007AFF] focus:border-[#007AFF] focus:ring-2">
                <SelectValue placeholder="Bitte wählen" className="text-gray-600" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 rounded-lg shadow-lg">
                <SelectItem value="herr" className="text-gray-700 hover:bg-gray-50">Herr</SelectItem>
                <SelectItem value="frau" className="text-gray-700 hover:bg-gray-50">Frau</SelectItem>
                <SelectItem value="keine" className="text-gray-700 hover:bg-gray-50">Keine Angabe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vorname" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <User className="h-4 w-4 mr-2 text-[#007AFF]" />
                Vorname*
              </Label>
              <Input
                id="vorname"
                type="text"
                required
                value={formData.vorname}
                onChange={handleTextChange}
                className="w-full bg-white border-gray-300 rounded-lg focus:ring-[#007AFF] focus:border-[#007AFF] focus:ring-2"
              />
            </div>
            <div>
              <Label htmlFor="nachname" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <User className="h-4 w-4 mr-2 text-[#007AFF]" />
                Nachname*
              </Label>
              <Input
                id="nachname"
                type="text"
                required
                value={formData.nachname}
                onChange={handleTextChange}
                className="w-full bg-white border-gray-300 rounded-lg focus:ring-[#007AFF] focus:border-[#007AFF] focus:ring-2"
              />
            </div>
          </div>
          
          {/* Kontaktdaten */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Mail className="h-4 w-4 mr-2 text-[#007AFF]" />
                E-Mail*
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={handleTextChange}
                className="w-full bg-white border-gray-300 rounded-lg focus:ring-[#007AFF] focus:border-[#007AFF] focus:ring-2"
              />
            </div>
            <div>
              <Label htmlFor="telefon" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Phone className="h-4 w-4 mr-2 text-[#007AFF]" />
                Telefon*
              </Label>
              <Input
                id="telefon"
                type="tel"
                required
                value={formData.telefon}
                onChange={handleTextChange}
                className="w-full bg-white border-gray-300 rounded-lg focus:ring-[#007AFF] focus:border-[#007AFF] focus:ring-2"
              />
            </div>
          </div>
          
          {/* Firma (optional) */}
          <div>
            <Label htmlFor="firma" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-[#007AFF]" />
              Ihr Unternehmen (optional)
            </Label>
            <Input
              id="firma"
              type="text"
              value={formData.firma}
              onChange={handleTextChange}
              className="w-full bg-white border-gray-300 rounded-lg focus:ring-[#007AFF] focus:border-[#007AFF] focus:ring-2"
            />
          </div>

          {/* Adresse */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <MapPinned className="h-4 w-4 mr-2 text-[#007AFF]" />
              Ihre Adresse*
            </Label>
            <div className="grid grid-cols-3 gap-3 mb-2">
              <div className="col-span-2">
                <Input
                  id="adresseStrasse"
                  placeholder="Straße"
                  value={formData.adresseStrasse}
                  onChange={handleTextChange}
                  className="w-full bg-white border-gray-300 rounded-lg focus:ring-[#007AFF] focus:border-[#007AFF] focus:ring-2"
                  required
                />
              </div>
              <div>
                <Input
                  id="adresseHausnummer"
                  placeholder="Nr."
                  value={formData.adresseHausnummer}
                  onChange={handleTextChange}
                  className="w-full bg-white border-gray-300 rounded-lg focus:ring-[#007AFF] focus:border-[#007AFF] focus:ring-2"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Input
                  id="adressePlz"
                  placeholder="PLZ"
                  value={formData.adressePlz}
                  onChange={handleTextChange}
                  className="w-full bg-white border-gray-300 rounded-lg focus:ring-[#007AFF] focus:border-[#007AFF] focus:ring-2"
                  required
                />
              </div>
              <div className="col-span-2">
                <Input
                  id="adresseOrt"
                  placeholder="Ort"
                  value={formData.adresseOrt}
                  onChange={handleTextChange}
                  className="w-full bg-white border-gray-300 rounded-lg focus:ring-[#007AFF] focus:border-[#007AFF] focus:ring-2"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Wunschtermin im Apple-Stil */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-[#007AFF]" />
              Wunschtermin*
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-white border-gray-300 rounded-lg hover:bg-gray-50",
                    !startDate && "text-gray-500"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4 text-[#007AFF]" />
                  {startDate ? format(startDate, "PPP", { locale: de }) : <span>Datum auswählen</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border border-gray-200 rounded-lg shadow-lg" align="start">
                <CalendarComponent
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateSelect}
                  disabled={(date) => date < getMinDate() || date > getMaxDate()}
                  initialFocus
                  className="bg-white"
                />
              </PopoverContent>
            </Popover>
            <p className="text-xs text-gray-500 mt-1">
              Bitte beachten Sie: Der tatsächliche Termin wird nach Verfügbarkeit bestätigt
            </p>
          </div>
          
          {/* Anmerkungen */}
          <div>
            <Label htmlFor="anmerkungen" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Pen className="h-4 w-4 mr-2 text-[#007AFF]" />
              Nachricht (optional)
            </Label>
            <Textarea
              id="anmerkungen"
              rows={4}
              value={formData.anmerkungen}
              onChange={handleTextChange}
              className="w-full bg-white border-gray-300 rounded-lg focus:ring-[#007AFF] focus:border-[#007AFF] focus:ring-2"
              placeholder={`Teilen Sie uns Ihre Wünsche für unseren ${serviceLabels[serviceType].title}-Service mit...`}
            />
          </div>
          
          {/* Datenschutz-Checkbox im Apple-Stil */}
          <div className="flex items-start space-x-3 mt-4">
            <div className="flex items-center h-5">
              <input
                id="datenschutz"
                type="checkbox"
                checked={formData.datenschutz}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-[#007AFF] border-gray-300 rounded focus:ring-[#007AFF]"
                required
              />
            </div>
            <div className="ml-2">
              <label htmlFor="datenschutz" className="text-sm text-gray-700">
                Ich stimme der Verarbeitung meiner Daten gemäß der <Link href="/privacy" className="text-[#007AFF] underline">Datenschutzerklärung</Link> zu*
              </label>
            </div>
          </div>
          
          {/* Fehlermeldung */}
          {error && (
            <motion.p 
              className="text-red-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
          
          {/* Submit-Button im Apple-Stil */}
          {isSubmitting ? (
            <button
              type="button"
              disabled
              className="w-full py-3 px-6 bg-[#007AFF]/70 text-white font-medium rounded-full opacity-70 cursor-not-allowed flex items-center justify-center"
            >
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Wird gesendet...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-3 px-6 bg-[#007AFF] hover:bg-[#0071e3] text-white font-medium rounded-full transition-all duration-200"
            >
              Anfrage senden
            </button>
          )}
          
          <p className="text-xs text-gray-500 mt-4">
            Ihre Daten werden gemäß unserer Datenschutzerklärung verarbeitet. Durch das Absenden erklären Sie sich mit der Verarbeitung einverstanden.
          </p>
        </form>
      ) : (
        // Erfolgsmeldung nach Absenden im Apple-Stil
        <motion.div 
          className="text-center py-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto w-16 h-16 bg-[#E5F2FF] rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-[#007AFF]" />
          </div>
          
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Anfrage erfolgreich gesendet!</h2>
          
          <p className="text-lg text-gray-600 mb-6">
            {serviceLabels[serviceType].successMessage}
          </p>
          
          <div className="bg-[#F5F5F7] rounded-lg p-5 mb-6 max-w-xl mx-auto">
            <p className="text-gray-700">
              Für dringende Anliegen erreichen Sie uns telefonisch:
            </p>
            <div className="flex items-center justify-center gap-3 mt-3 font-medium text-[#007AFF]">
              <Phone className="h-5 w-5" />
              <span>0231 15044352</span>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default ContactForm;
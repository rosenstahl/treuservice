"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FormData } from '../WinterdienstWizard'

// Spezifische Typen ohne globale Deklaration
interface GooglePlace {
  formatted_address?: string;
  geometry?: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
  address_components?: Array<{
    types: string[];
    long_name: string;
    short_name: string;
  }>;
}

type AddressStepProps = {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  goToNextStep: () => void;
}

export const AddressStep: React.FC<AddressStepProps> = ({ 
  formData, 
  updateFormData, 
  goToNextStep 
}) => {
  const [address, setAddress] = useState(formData.address)
  const [isValid, setIsValid] = useState(Boolean(formData.address))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any>(null)

  // Prüft, ob eine Adresse vollständig ist (enthält Straße, Hausnummer, PLZ, Stadt)
  const isCompleteAddress = (addressComponents?: Array<{types: string[], long_name: string}>) => {
    if (!addressComponents || addressComponents.length === 0) return false;
    
    // Notwendige Adresskomponenten
    const requiredComponents = {
      street: false,     // 'route'
      streetNumber: false, // 'street_number'
      postalCode: false, // 'postal_code'
      city: false        // 'locality' oder 'administrative_area_level_3'
    };
    
    for (const component of addressComponents) {
      if (component.types.includes('route')) requiredComponents.street = true;
      if (component.types.includes('street_number')) requiredComponents.streetNumber = true;
      if (component.types.includes('postal_code')) requiredComponents.postalCode = true;
      if (component.types.includes('locality') || component.types.includes('administrative_area_level_3')) {
        requiredComponents.city = true;
      }
    }
    
    return (
      requiredComponents.street && 
      requiredComponents.streetNumber && 
      requiredComponents.postalCode && 
      requiredComponents.city
    );
  };

  // Callback für die Verarbeitung der ausgewählten Adresse
  const handlePlaceChanged = useCallback(() => {
    if (!autocompleteRef.current) return;
    
    const place = autocompleteRef.current.getPlace() as GooglePlace;
    
    if (place && place.formatted_address && place.address_components) {
      // Prüfen, ob die Adresse alle notwendigen Komponenten hat
      if (!isCompleteAddress(place.address_components)) {
        setError('Bitte geben Sie eine vollständige Adresse mit Straße, Hausnummer, PLZ und Ort ein.');
        setIsValid(false);
        return;
      }
      
      setAddress(place.formatted_address)
      setIsValid(true)
      setError('')
      
      // Extrahiere Koordinaten
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        
        // Speichere alle Adressdaten
        updateFormData({ 
          address: place.formatted_address,
          area: {
            ...formData.area,
            coordinates: [[lat, lng]]
          }
        })
      }
    }
  }, [formData.area, updateFormData]);

  useEffect(() => {
    // Initialisiere Google Autocomplete wenn das Input-Element existiert
    if (inputRef.current && typeof window !== 'undefined' && window.google && window.google.maps && window.google.maps.places) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'de' }
      })

      // Event-Listener für Änderungen
      autocompleteRef.current.addListener('place_changed', handlePlaceChanged)
    }

    return () => {
      // Cleanup der Event-Listener wenn verfügbar
      if (autocompleteRef.current && typeof window !== 'undefined' && window.google && window.google.maps) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    }
  }, [handlePlaceChanged]);

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
    // Sehr einfache Validierung - detaillierte Validierung erfolgt später
    setIsValid(e.target.value.length > 10) 
  }

  // Validiere und geocodiere die Adresse vor dem Fortfahren
  const validateAndContinue = () => {
    if (!address.trim()) {
      setError('Bitte geben Sie eine Adresse ein.')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    // Wenn wir bereits Koordinaten haben (über Autocomplete), direkt fortfahren
    if (formData.area.coordinates && formData.area.coordinates.length > 0) {
      setIsLoading(false)
      goToNextStep()
      return
    }
    
    // Ansonsten die Adresse geocodieren
    try {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode({ address }, (results: any, status: string) => {
          setIsLoading(false)
          
          if (status === 'OK' && results && results.length > 0) {
            // Prüfen, ob die zurückgegebene Adresse vollständig ist
            if (!isCompleteAddress(results[0].address_components)) {
              setError('Die Adresse ist nicht vollständig. Bitte geben Sie eine vollständige Adresse mit Straße, Hausnummer, PLZ und Ort ein.');
              return;
            }
            
            const location = results[0].geometry.location
            const lat = location.lat()
            const lng = location.lng()
            
            // Adresse und Koordinaten speichern
            updateFormData({
              address: results[0].formatted_address || address,
              area: {
                ...formData.area,
                coordinates: [[lat, lng]]
              }
            })
            
            goToNextStep()
          } else {
            setError('Die Adresse konnte nicht gefunden werden. Bitte prüfen Sie Ihre Eingabe.')
          }
        })
      } else {
        setIsLoading(false)
        setError('Google Maps konnte nicht geladen werden. Bitte laden Sie die Seite neu.')
      }
    } catch (geocodeError) {
      setIsLoading(false)
      setError('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.')
    }
  }

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
          Adresse eingeben
        </motion.h2>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          Geben Sie die Adresse ein, für die Sie einen Winterdienst beauftragen möchten.
        </motion.p>
      </div>
      
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <div className="mb-6">
          <label 
            htmlFor="address" 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Adresse
          </label>
          <input
            id="address"
            ref={inputRef}
            type="text"
            value={address}
            onChange={handleManualInput}
            placeholder="Straße, Hausnummer, PLZ, Ort"
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
              error ? 'border-red-300 focus:ring-red-400' : 'border-gray-300 focus:ring-accent/50'
            }`}
          />
          {error && (
            <motion.p 
              className="mt-2 text-sm text-red-600"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.p>
          )}
          <p className="mt-2 text-xs text-gray-500">
            Bitte geben Sie eine vollständige Adresse mit Straße, Hausnummer, PLZ und Ort ein.
          </p>
        </div>
        
        <motion.button
          onClick={validateAndContinue}
          disabled={!isValid || isLoading}
          className={`w-full py-3 px-6 rounded-md font-medium transition-all duration-200 ${
            isValid && !isLoading
              ? 'bg-accent text-white hover:bg-accent-dark transform hover:scale-[1.03] hover:shadow-md'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          whileHover={isValid && !isLoading ? { scale: 1.03 } : {}}
          whileTap={isValid && !isLoading ? { scale: 0.97 } : {}}
        >
          {isLoading ? 'Wird geladen...' : 'Weiter'}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
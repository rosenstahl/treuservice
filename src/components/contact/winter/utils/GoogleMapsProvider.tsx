import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoadScriptProps, useLoadScript } from '@react-google-maps/api';

// Google Maps API Key - sollte eigentlich in einer .env Datei sein
export const GOOGLE_MAPS_API_KEY = 'AIzaSyCbAjl459xe6fTtqZ8rS3OjyVIKypc0Bfg';

// Die Bibliotheken, die wir brauchen
export type Libraries = ('drawing' | 'geometry' | 'places')[]
export const libraries: Libraries = ['drawing', 'geometry', 'places'];

// Context für den Google Maps Status
type GoogleMapsContextType = {
  isLoaded: boolean;
  loadError: Error | undefined;
};

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  loadError: undefined,
});

// Hook zum Zugriff auf den Google Maps Status
export const useGoogleMaps = () => useContext(GoogleMapsContext);

// Props für den Provider
type GoogleMapsProviderProps = {
  children: React.ReactNode;
};

// Provider-Komponente
export const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({ children }) => {
  // Prüfen, ob Google Maps bereits geladen ist
  const [isGoogleMapsPreloaded, setIsGoogleMapsPreloaded] = useState(false);
  
  useEffect(() => {
    setIsGoogleMapsPreloaded(
      typeof window !== 'undefined' && 
      window.google !== undefined && 
      window.google.maps !== undefined
    );
  }, []);

  // Nur laden, wenn noch nicht vorhanden
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
    preventGoogleFontsLoading: isGoogleMapsPreloaded,
  });

  // Der Provider stellt den Status bereit
  return (
    <GoogleMapsContext.Provider value={{ isLoaded: isLoaded || isGoogleMapsPreloaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

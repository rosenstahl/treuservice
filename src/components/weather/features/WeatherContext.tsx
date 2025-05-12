"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  getCurrentWeather, 
  getWeather, 
  LocationParams,
  WeatherParams
} from './brightsky-api';
import { 
  processWeatherData, 
  ProcessedWeatherData, 
  HourlyForecast, 
  DailyForecast,
  formatTemperature,
  formatDecimal
} from './weatherDataProcessors';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

// Typ für den Context
export interface WeatherContextType {
  isLoading: boolean;
  error: string | null;
  location: string;
  weather: ProcessedWeatherData | null;
  fetchWeather: (location: string) => Promise<void>;
  detectLocation: () => Promise<void>;
  lastUpdated: Date | null;
  coordinates: { lat: number; lon: number } | null;
  // Helper-Methoden für UI-Komponenten
  formatTemperature: (temp: number | null | undefined) => string;
  formatDecimal: (num: number | null | undefined, precision?: number) => string;
  getFormattedDate: (date: Date, formatStr?: string) => string;
  getCurrentForecast: () => DailyForecast | null;
  getTodayForecast: () => DailyForecast | null;
  getNextHoursForecasts: (hours?: number) => HourlyForecast[];
  getNextDaysForecasts: (days?: number) => DailyForecast[];
  getRefreshHandler: () => (() => void);
}

// Storage Version für Kompatibilitätsprüfung
const STORAGE_VERSION = "1.1";

// Erstellen des Context
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Hook für den einfachen Zugriff auf den Context
export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather muss innerhalb eines WeatherProviders verwendet werden');
  }
  return context;
}

// Props für den Provider
interface WeatherProviderProps {
  children: ReactNode;
  initialLocation?: string;
}

// Interface für gespeicherte Wetterdaten
interface StoredWeatherData {
  version: string;
  location: string;
  coordinates: { lat: number; lon: number };
  weather: ProcessedWeatherData;
  lastUpdated: string;
}

// Interface für Google Maps API Komponenten
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

/**
 * Weather Provider Komponente
 * Stellt alle Wetterdaten und Funktionen für die Anwendung bereit
 */
export function WeatherProvider({ children, initialLocation }: WeatherProviderProps) {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState(initialLocation || '');
  const [weather, setWeather] = useState<ProcessedWeatherData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);

  const getWeatherDataByCoordinates = useCallback(async (lat: number, lon: number, locationName: string): Promise<void> => {
    console.log(`Starte Wetterdatenabruf für: ${locationName} (${lat}, ${lon})`);
    setIsLoading(true);
    setError(null);
    
    try {
      // Koordinaten speichern
      setCoordinates({ lat, lon });
      
      // Datum für API-Anfragen vorbereiten
      const today = new Date();
      const lastDate = new Date(today);
      lastDate.setDate(today.getDate() + 6); // 7 Tage Vorhersage
      
      const dateStr = today.toISOString().split('T')[0];
      const lastDateStr = lastDate.toISOString().split('T')[0];
      
      // API-Parameter definieren
      const locationParams: LocationParams = {
        lat,
        lon,
        tz: "Europe/Berlin"
      };
      
      const weatherParams: WeatherParams = {
        lat,
        lon,
        date: dateStr,
        last_date: lastDateStr,
        tz: "Europe/Berlin"
      };
      
      // Parallele API-Anfragen senden
      const [currentResponse, forecastResponse] = await Promise.all([
        getCurrentWeather(locationParams),
        getWeather(weatherParams)
      ]);
      
      // Validierung der API-Antworten
      if (!currentResponse || !currentResponse.weather) {
        throw new Error("Keine aktuellen Wetterdaten erhalten");
      }
      
      if (!forecastResponse || !forecastResponse.weather || !Array.isArray(forecastResponse.weather)) {
        throw new Error("Keine Wettervorhersagedaten erhalten");
      }
      
      if (forecastResponse.weather.length === 0) {
        console.warn("Leere Wettervorhersageliste erhalten");
        // Hier könnte man zusätzliche Fallback-Logik implementieren
      }
      
      // API-Daten verarbeiten mit optimiertem Processor
      console.log("Wetterdaten erhalten, verarbeite Daten...");
      const processedData = processWeatherData(currentResponse, forecastResponse);
      
      if (!processedData) {
        throw new Error("Wetterdaten konnten nicht verarbeitet werden");
      }
      
      // Validiere das verarbeitete Ergebnis
      if (!processedData.current || !processedData.hourly || !processedData.daily) {
        console.warn("Unvollständige verarbeitete Wetterdaten:", processedData);
      }
      
      // Zustand aktualisieren
      setWeather(processedData);
      setLocation(locationName);
      setLastUpdated(new Date());
      
      console.log(`Wetterdaten für ${locationName} aktualisiert: ${processedData.current.temperature}°C`);
      
      // Im localStorage speichern
      try {
        localStorage.setItem('weatherData', JSON.stringify({
          version: STORAGE_VERSION,
          location: locationName,
          coordinates: { lat, lon },
          weather: processedData,
          lastUpdated: new Date().toISOString()
        }));
      } catch (storageError) {
        console.warn('Lokaler Speicher nicht verfügbar:', storageError);
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      
      if (error instanceof Error) {
        setError(`Fehler: ${error.message}`);
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // WICHTIGE ÄNDERUNG: Verwende den browser-basierten Google Maps Geocoder anstatt der API-Route
  const geocodeAddress = useCallback(async (address: string): Promise<{
    lat: number;
    lon: number;
    locationName: string;
  } | null> => {
    try {
      // Prüfe, ob Google Maps verfügbar ist
      if (typeof window === 'undefined' || !window.google || !window.google.maps) {
        throw new Error('Google Maps API ist nicht verfügbar');
      }

      // Verwende den Browser-basierten Geocoder
      const geocoder = new window.google.maps.Geocoder();
      
      // Geocode-Anfrage als Promise
      const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode({ address, region: 'de' }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            resolve(results);
          } else {
            reject(new Error(`Adresse konnte nicht gefunden werden (${status})`));
          }
        });
      });
      
      // Erste Ergebnis verwenden
      const result = results[0];
      const location = result.geometry.location;
      
      // Extrahiere einen Ortsnamen
      let locationName = address;
      const components = result.address_components;
      
      // Suchprioritäten für Ortsnamen
      const searchOrder = [
        'locality', 'sublocality_level_1', 'sublocality', 
        'postal_town', 'administrative_area_level_3',
        'administrative_area_level_2', 'administrative_area_level_1',
      ];
      
      // Suche nach dem spezifischsten verfügbaren Namen
      for (const type of searchOrder) {
        const component = components.find((c) => c.types.includes(type));
        if (component) {
          locationName = component.long_name;
          break;
        }
      }
      
      console.log(`Geocoding erfolgreich: ${address} -> ${locationName} (${location.lat()}, ${location.lng()})`);
      
      return {
        lat: location.lat(),
        lon: location.lng(),
        locationName
      };
    } catch (error) {
      console.error('Fehler beim Geocoding:', error);
      return null;
    }
  }, []);

  /**
   * Hauptfunktion zum Abrufen der Wetterdaten für eine bestimmte Adresse
   */
  const fetchWeather = useCallback(async (address: string): Promise<void> => {
    if (!address.trim()) {
      setError('Bitte geben Sie einen Ort ein');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Geocoding durchführen
      const geoResult = await geocodeAddress(address);
      
      if (!geoResult) {
        throw new Error('Adresse konnte nicht gefunden werden');
      }
      
      // Wetterdaten abrufen
      await getWeatherDataByCoordinates(geoResult.lat, geoResult.lon, geoResult.locationName);
      
    } catch (error) {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      
      if (error instanceof Error) {
        setError(`Fehler: ${error.message}`);
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten');
      }
      
      setIsLoading(false);
    }
  }, [geocodeAddress, getWeatherDataByCoordinates]);

  /**
   * Reverse Geocoding: Koordinaten zu Adresse umwandeln
   */
  const reverseGeocode = useCallback(async (lat: number, lon: number): Promise<string> => {
    try {
      // WICHTIGE ÄNDERUNG: Verwende auch hier den browser-basierten Geocoder für Konsistenz
      if (typeof window === 'undefined' || !window.google || !window.google.maps) {
        return "Ihr Standort";
      }

      const geocoder = new window.google.maps.Geocoder();
      
      const results = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
        geocoder.geocode({ location: { lat, lng: lon } }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            resolve(results);
          } else {
            reject(new Error(`Reverse Geocoding fehlgeschlagen (${status})`));
          }
        });
      });
      
      // Bestimme Ortsname
      let locationName = "Ihr Standort";
      
      if (results && results.length > 0) {
        const result = results[0];
        const components = result.address_components;
        
        // Suchprioritäten
        const searchOrder = [
          'locality', 'sublocality_level_1', 'sublocality',
          'postal_town', 'administrative_area_level_3',
        ];
        
        // Suche nach dem spezifischsten verfügbaren Namen
        for (const type of searchOrder) {
          const component = components.find((c) => c.types.includes(type));
          if (component) {
            locationName = component.long_name;
            break;
          }
        }
      }
      
      return locationName;
    } catch (error) {
      console.warn('Fehler beim Reverse Geocoding:', error);
      return "Ihr Standort";
    }
  }, []);

  /**
   * Standorterkennung mit dem Browser
   */
  const detectLocation = useCallback(async () => {
    console.log("Starte Browser-Standorterkennung...");
    setIsLoading(true);
    setError(null);
    
    try {
      // Prüfe, ob Geolocation verfügbar ist
      if (!navigator.geolocation) {
        throw new Error('Geolocation wird von Ihrem Browser nicht unterstützt');
      }
      
      // Browser-Koordinaten abrufen
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve, 
          reject, 
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });
      
      const { latitude, longitude } = position.coords;
      console.log(`Browser-Standort erkannt: ${latitude}, ${longitude}`);
      
      // Reverse-Geocoding für Ortsname
      const locationName = await reverseGeocode(latitude, longitude);
      
      // Wetterdaten abrufen
      await getWeatherDataByCoordinates(latitude, longitude, locationName);
      
    } catch (error) {
      console.error('Standorterkennung fehlgeschlagen:', error);
      
      let errorMessage = 'Standorterkennung fehlgeschlagen';
      
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case GeolocationPositionError.PERMISSION_DENIED:
            errorMessage = 'Standortzugriff verweigert. Bitte erlauben Sie den Zugriff oder geben Sie einen Ort manuell ein.';
            break;
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            errorMessage = 'Standort konnte nicht ermittelt werden. Bitte geben Sie einen Ort manuell ein.';
            break;
          case GeolocationPositionError.TIMEOUT:
            errorMessage = 'Zeitüberschreitung bei der Standorterkennung. Bitte geben Sie einen Ort manuell ein.';
            break;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      setIsLoading(false);
    }
  }, [reverseGeocode, getWeatherDataByCoordinates]);

  // Lade gespeicherte Wetterdaten beim Komponenten-Mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('weatherData');
      if (savedData) {
        const parsed = JSON.parse(savedData) as StoredWeatherData;
        
        // Prüfe Version der gespeicherten Daten
        if (parsed.version !== STORAGE_VERSION) {
          console.log('Gespeicherte Daten haben ein veraltetes Format');
          // Wetterdaten mit gespeichertem Standort aktualisieren
          if (parsed.location) {
            fetchWeather(parsed.location);
          }
          return;
        }
        
        // Prüfe, ob die Daten noch aktuell sind (max. 60 Minuten alt)
        const lastUpdated = new Date(parsed.lastUpdated);
        const now = new Date();
        const diffMs = now.getTime() - lastUpdated.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 60) {
          // Verwende die gespeicherten Daten
          setLocation(parsed.location);
          setCoordinates(parsed.coordinates);
          setWeather(parsed.weather);
          setLastUpdated(lastUpdated);
          console.log(`Gespeicherte Wetterdaten geladen: ${parsed.weather.current.temperature}°C in ${parsed.location}`);
        } else {
          console.log(`Gespeicherte Wetterdaten sind veraltet (${diffMins} Minuten alt)`);
          // Wenn Standort gespeichert wurde, diesen verwenden
          if (parsed.location) {
            fetchWeather(parsed.location);
          }
        }
      }
    } catch (error) {
      console.warn('Fehler beim Laden der gespeicherten Wetterdaten:', error);
    }
  }, [fetchWeather]);

  /**
   * Formatiert ein Datum mit date-fns
   */
  const getFormattedDate = useCallback((date: Date, formatStr: string = 'dd.MM.yyyy'): string => {
    try {
      return format(date, formatStr, { locale: de });
    } catch {
      return "";
    }
  }, []);

  /**
   * Gibt die aktuelle Wettervorhersage zurück
   */
  const getCurrentForecast = useCallback((): DailyForecast | null => {
    if (!weather?.daily?.length) return null;
    return weather.daily[0];
  }, [weather]);

  /**
   * Gibt die Wettervorhersage für heute zurück
   */
  const getTodayForecast = useCallback((): DailyForecast | null => {
    if (!weather?.daily?.length) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return weather.daily.find(day => {
      const dayDate = new Date(day.date);
      dayDate.setHours(0, 0, 0, 0);
      return dayDate.getTime() === today.getTime();
    }) || null;
  }, [weather]);

  /**
   * Gibt die Wettervorhersage für die nächsten X Stunden zurück
   */
  const getNextHoursForecasts = useCallback((hours: number = 24): HourlyForecast[] => {
    if (!weather?.hourly) return [];
    return weather.hourly.slice(0, hours);
  }, [weather]);

  /**
   * Gibt die Wettervorhersage für die nächsten X Tage zurück
   */
  const getNextDaysForecasts = useCallback((days: number = 7): DailyForecast[] => {
    if (!weather?.daily) return [];
    return weather.daily.slice(0, days);
  }, [weather]);

  /**
   * Gibt eine Funktion zum Aktualisieren der Wetterdaten zurück
   */
  const getRefreshHandler = useCallback(() => {
    return () => {
      if (location && location.trim() !== "") {
        fetchWeather(location);
      } else {
        detectLocation();
      }
    };
  }, [location, fetchWeather, detectLocation]);

  // Erstelle den Context-Wert
  const value: WeatherContextType = {
    isLoading,
    error,
    location,
    weather,
    fetchWeather,
    detectLocation,
    lastUpdated,
    coordinates,
    // Helper-Methoden - jetzt aus dem weatherDataProcessors Modul importiert
    formatTemperature,
    formatDecimal,
    getFormattedDate,
    getCurrentForecast,
    getTodayForecast,
    getNextHoursForecasts,
    getNextDaysForecasts,
    getRefreshHandler
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}
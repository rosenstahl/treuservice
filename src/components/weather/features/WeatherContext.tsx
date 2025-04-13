"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
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
 * Hilfsfunktion zum Formatieren einer Adresse
 * Verbessert die Chancen, dass Google die Adresse findet
 */
const formatAddress = (address: string): string => {
  // Bereinigen überflüssiger Leerzeichen
  let formatted = address.trim().replace(/\s+/g, ' ');
  
  // PLZ-Erkennung: Falls nur eine 5-stellige Nummer eingegeben wurde, "Deutschland" anhängen
  if (/^\d{5}$/.test(formatted)) {
    formatted += ' Deutschland';
  }
  
  // Prüfen ob "Deutschland" oder "Germany" enthalten ist, falls nicht und die Adresse
  // wahrscheinlich eine deutsche Adresse ist, "Deutschland" anhängen
  if (
    !/(deutschland|germany)/i.test(formatted) && 
    (
      /\d{5}/.test(formatted) || // enthält deutsche PLZ
      /(straße|strasse|weg|platz|allee|gasse)/i.test(formatted) // enthält typisch deutsche Straßennamen
    )
  ) {
    formatted += ', Deutschland';
  }
  
  return formatted;
};

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
  // Ref statt State für initial loading check
  const initialLoadRef = useRef(false);

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

  const geocodeAddress = useCallback(async (address: string): Promise<{
    lat: number;
    lon: number;
    locationName: string;
  } | null> => {
    try {
      // Adresse formatieren um Erkennungsrate zu verbessern
      const formattedAddress = formatAddress(address);
      
      const encodedAddress = encodeURIComponent(formattedAddress);
      // ÄNDERUNG: Vereinheitlichte Verwendung des Maps API-Schlüssels
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      
      // Prüfen ob der API-Schlüssel vorhanden ist
      if (!apiKey) {
        console.error("Google Maps API-Schlüssel fehlt");
        return null;
      }
      
      // Logge API-Schlüssel Format (erste 4 Zeichen) für Debugging
      console.log("API-Schlüssel Format:", apiKey.substring(0, 4) + "...");
      
      // Geocoding-URL mit region=de für deutsche Adressen
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}&region=de`;
      
      console.log("Sende Geocoding-Anfrage für:", formattedAddress);
      const geoResponse = await fetch(geocodeUrl);
      
      if (!geoResponse.ok) {
        throw new Error(`Geocoding-Fehler: HTTP ${geoResponse.status}`);
      }
      
      const geoData = await geoResponse.json();
      console.log("Geocoding Antwort:", geoData.status, geoData.results?.length || 0, "Ergebnisse");
      
      // Detailliertere Fehlerbehandlung
      if (geoData.status === 'ZERO_RESULTS') {
        throw new Error('Adresse konnte nicht gefunden werden. Bitte präzisieren Sie die Eingabe (z.B. mit PLZ oder Ort).');
      } else if (geoData.status !== 'OK' || !geoData.results || geoData.results.length === 0) {
        throw new Error(`Geocoding-Fehler: ${geoData.status || 'Keine Ergebnisse gefunden'}`);
      }
      
      const result = geoData.results[0];
      const location = result.geometry.location;
      
      // Extrahiere einen Ortsnamen (vom Spezifischen zum Allgemeinen)
      let locationName = formattedAddress;
      const components: AddressComponent[] = result.address_components;
      
      // Suchprioritäten für Ortsname
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
      
      console.log("Gefundener Standort:", locationName, `(${location.lat}, ${location.lng})`);
      
      return {
        lat: location.lat,
        lon: location.lng,
        locationName
      };
    } catch (error) {
      console.error('Fehler beim Geocoding:', error);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Adresse konnte nicht gefunden werden');
      }
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
        setError(`${error.message}`);
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
      // ÄNDERUNG: Vereinheitlichte Verwendung des Maps API-Schlüssels
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      
      // Prüfen ob der API-Schlüssel vorhanden ist
      if (!apiKey) {
        console.error("Google Maps API-Schlüssel fehlt");
        return "Ihr Standort";
      }
      
      // Ändere den Ergebnistyp-Filter für bessere Ergebnisse
      const reverseGeocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}&language=de&result_type=locality|sublocality|political|administrative_area_level_3`;
      
      const geoResponse = await fetch(reverseGeocodeUrl);
      
      if (!geoResponse.ok) {
        return "Ihr Standort";
      }
      
      const geoData = await geoResponse.json();
      
      // Bestimme Ortsname
      let locationName = "Ihr Standort";
      
      if (geoData.status === 'OK' && geoData.results && geoData.results.length > 0) {
        const result = geoData.results[0];
        const components: AddressComponent[] = result.address_components;
        
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
  // ÄNDERUNG: Optimierter useEffect mit Ref statt State
  useEffect(() => {
    // Verhindere mehrfache Ausführung mit Ref
    if (initialLoadRef.current) return;
    initialLoadRef.current = true;
    
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
  // Wichtig: leeres Array als Abhängigkeit, um nur einmal beim Mount auszuführen
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
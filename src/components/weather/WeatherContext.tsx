"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  BrightskyApiResponse, 
  fetchCurrentWeather, 
  fetchWeatherForecast
} from './brightsky-api';
import { WinterServiceStatus } from './features/utils';
import { 
  processWeatherData,
} from './features/weatherDataProcessors';
import {
  checkWinterWarningsForLocation,
  createIceRiskDescription,
  DWDWarning
} from './features/dwd-warnings';

// Typdefinitionen für verarbeitete Wetterdaten
export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionDE: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  precipitationProbability: number;
  cloudCover: number;
  soilTemperature?: number;
  timestamp: Date;
  updateTime: Date;
}

export interface HourlyForecast {
  time: Date;
  temperature: number;
  condition: string;
  conditionDE: string;
  icon: string;
  precipitation: number;
  precipitationProbability: number;
  humidity: number;
  windSpeed: number;
}

export interface DailyForecast {
  date: Date;
  maxTemp: number;
  minTemp: number;
  condition: string;
  conditionDE: string;
  icon: string;
  precipitation: number;
  precipitationProbability: number;
  snowAmount: number;
}

export interface IceRisk {
  risk: 'low' | 'medium' | 'high';
  description: string;
}

export interface ProcessedWeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  winterServiceStatus: WinterServiceStatus;
  iceRisk: IceRisk;
  dwdWarning?: DWDWarning | null; // Neue Eigenschaft für DWD-Warnungen
}

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
}

// Google Geocoding API Key
const GOOGLE_GEOCODING_API_KEY = 'AIzaSyA9Wnj0p_5oHHpcsYZKbbRLCEyUE_gz3UQ';

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
interface SavedHourData {
  time: string;
  temperature: number;
  condition: string;
  conditionDE: string;
  icon: string;
  precipitation: number;
  precipitationProbability: number;
  humidity: number;
  windSpeed: number;
}

interface SavedDayData {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  conditionDE: string;
  icon: string;
  precipitation: number;
  precipitationProbability: number;
  snowAmount: number;
}

interface SavedCurrentData {
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionDE: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  precipitationProbability: number;
  cloudCover: number;
  soilTemperature?: number;
  timestamp: string;
  updateTime: string;
}

interface SavedWeatherData {
  current: SavedCurrentData;
  hourly: SavedHourData[];
  daily: SavedDayData[];
  winterServiceStatus: WinterServiceStatus;
  iceRisk: IceRisk;
  dwdWarning?: DWDWarning | null;
}

interface StoredWeatherData {
  location: string;
  coordinates: { lat: number; lon: number };
  weather: SavedWeatherData;
  lastUpdated: string;
  requestId?: string; // Für Race Condition Lösung
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
  const [latestRequestId, setLatestRequestId] = useState<string>(''); // Für Race Condition Lösung

  /**
   * Funktion zum Abrufen der Wetterdaten für bestimmte Koordinaten
   */
  const fetchWeatherForCoordinates = useCallback(async (lat: number, lon: number, locationName: string) => {
    setIsLoading(true);
    setError(null);
    
    // Generiere eine eindeutige ID für diese Anfrage (Lösung für Race Condition)
    const requestId = Date.now().toString();
    setLatestRequestId(requestId);
    
    try {
      // Speichere Koordinaten
      setCoordinates({ lat, lon });
      
      // Abrufen der Wetterdaten und DWD-Warnungen parallel
      const [current, forecast, dwdWarningResult] = await Promise.all([
        fetchCurrentWeather(lat, lon),
        fetchWeatherForecast(lat, lon, 7),
        checkWinterWarningsForLocation(lat, lon)
      ]);
      
      // Race Condition Check: Prüfe, ob diese Anfrage noch die aktuellste ist
      if (requestId !== latestRequestId) {
        console.log('Veraltete Wetteranfrage ignoriert');
        return; // Diese Anfrage ist nicht mehr aktuell, ignoriere Ergebnisse
      }
      
      // Kombiniere die Ergebnisse für die Verarbeitung
      const combinedData: BrightskyApiResponse = {
        weather: [...current.weather, 
                  ...forecast.weather.filter(item => 
                    !current.weather.some(currentItem => 
                      currentItem.timestamp === item.timestamp
                    )
                  )],
        sources: [...current.sources, ...forecast.sources]
      };
      
      // Verarbeite die API-Antwort mit unserer optimierten Funktion
      const processedData = processWeatherData(combinedData);
      
      // Integriere DWD-Warnungen, wenn vorhanden
      if (dwdWarningResult.hasWarning) {
        // Überschreibe den Winterdienststatus mit dem aus den DWD-Warnungen
        processedData.winterServiceStatus = dwdWarningResult.winterServiceStatus;
        
        // Speichere die Warnung
        processedData.dwdWarning = dwdWarningResult.warningDetails;
        
        // Aktualisiere die Eis-Risiko-Beschreibung basierend auf der DWD-Warnung
        if (dwdWarningResult.warningDetails) {
          const description = createIceRiskDescription(dwdWarningResult.warningDetails);
          
          // Risikostufe aus dem DWD-Warnlevel ableiten
          let risk: 'low' | 'medium' | 'high' = 'low';
          const level = dwdWarningResult.warningDetails.level;
          
          if (level >= 3) risk = 'high';
          else if (level >= 2) risk = 'medium';
          
          // Eis-Risiko aktualisieren
          processedData.iceRisk = {
            risk,
            description
          };
        }
      }
      
      // Aktualisiere den Zustand
      setWeather(processedData);
      setLocation(locationName);
      setLastUpdated(new Date());
      
      console.log('Wetterdaten aktualisiert:', processedData.current.temperature, '°C in', locationName);
      if (dwdWarningResult.hasWarning) {
        console.log('DWD-Warnung aktiv:', dwdWarningResult.warningDetails?.headline);
      }
      
      // Speichere im localStorage für Persistenz
      try {
        localStorage.setItem('weatherData', JSON.stringify({
          location: locationName,
          coordinates: { lat, lon },
          weather: processedData,
          lastUpdated: new Date().toISOString(),
          requestId // Speichere die Request-ID mit ab
        }));
      } catch (storageError) {
        console.warn('Lokaler Speicher nicht verfügbar:', storageError);
      }
    } catch (error) {
      // Race Condition Check auch bei Fehlern
      if (requestId !== latestRequestId) {
        return; // Diese Anfrage ist nicht mehr aktuell, ignoriere Fehler
      }
      
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      
      if (error instanceof Error) {
        setError(`Fehler bei Wetterdaten: ${error.message}`);
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten');
      }
    } finally {
      if (requestId === latestRequestId) {
        setIsLoading(false);
      }
    }
  }, [latestRequestId]);

  /**
   * Geocoding mit Google Maps API
   */
  const geocodeAddress = useCallback(async (address: string): Promise<{lat: number, lon: number, display_name: string}> => {
    const encodedAddress = encodeURIComponent(address.trim());
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_GEOCODING_API_KEY}&region=de`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Geocoding-Fehler: HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      // Prüfe API-Antwort auf Fehler
      if (data.status !== 'OK') {
        throw new Error(`Geocoding-Fehler: ${data.status}${data.error_message ? ' - ' + data.error_message : ''}`);
      }
      
      // Stelle sicher, dass Ergebnisse vorhanden sind
      if (!data.results || data.results.length === 0) {
        throw new Error('Die angegebene Adresse konnte nicht gefunden werden');
      }
      
      const result = data.results[0];
      const location = result.geometry.location;
      
      // Vereinfachter Ortsname
      let locationName = address;
      
      // Extrahiere Ortsname aus den Adresskomponenten
      const locality = result.address_components.find(
        (component: {types: string[]}) => component.types.includes('locality')
      );
      const subLocality = result.address_components.find(
        (component: {types: string[]}) => component.types.includes('sublocality') || component.types.includes('neighborhood')
      );
      const administrativeArea = result.address_components.find(
        (component: {types: string[]}) => component.types.includes('administrative_area_level_1') || 
                            component.types.includes('administrative_area_level_2')
      );
      
      // Wähle den spezifischsten verfügbaren Namen
      if (locality) {
        locationName = locality.long_name;
      } else if (subLocality) {
        locationName = subLocality.long_name;
      } else if (administrativeArea) {
        locationName = administrativeArea.long_name;
      }
      
      return {
        lat: location.lat,
        lon: location.lng,
        display_name: locationName
      };
    } catch (error) {
      console.error('Geocoding-Fehler:', error);
      
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('Unbekannter Fehler bei der Adresssuche');
      }
    }
  }, []);

  /**
   * Funktion zum Abrufen der Wetterdaten durch Ortseingabe
   */
  const fetchWeather = useCallback(async (locationQuery: string) => {
    if (!locationQuery.trim()) {
      setError('Bitte geben Sie einen Ort ein');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Geocodierung der Adresse
      const geoResult = await geocodeAddress(locationQuery);
      
      // Abrufen der Wetterdaten für die gefundenen Koordinaten
      await fetchWeatherForCoordinates(geoResult.lat, geoResult.lon, geoResult.display_name);
    } catch (error) {
      console.error('Fehler bei der Standortsuche:', error);
      
      if (error instanceof Error) {
        setError(`Standortsuche fehlgeschlagen: ${error.message}`);
      } else {
        setError('Ein unbekannter Fehler ist bei der Standortsuche aufgetreten');
      }
      
      setIsLoading(false);
    }
  }, [fetchWeatherForCoordinates, geocodeAddress]);

  /**
   * Funktion zur Erkennung des aktuellen Standorts
   */
  const detectLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation wird von Ihrem Browser nicht unterstützt');
      setIsLoading(false);
      return;
    }
    
    try {
      // Browser-Geolocation verwenden
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });
      
      const { latitude, longitude } = position.coords;
      
      // Reverse Geocoding für Ortsnamen
      try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_GEOCODING_API_KEY}&result_type=locality|sublocality|political`;
        
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          
          let locationName = "Ihr Standort";
          
          if (data.status === 'OK' && data.results && data.results.length > 0) {
            // Versuche, eine geeignete Adresskomponente zu finden
            const result = data.results[0];
            
            const locality = result.address_components.find(
              (component: {types: string[]}) => component.types.includes('locality')
            );
            const subLocality = result.address_components.find(
              (component: {types: string[]}) => component.types.includes('sublocality')
            );
            
            if (locality) {
              locationName = locality.long_name;
            } else if (subLocality) {
              locationName = subLocality.long_name;
            }
          }
          
          // Wetterdaten für den erkannten Standort abrufen
          await fetchWeatherForCoordinates(latitude, longitude, locationName);
        } else {
          // Fallback ohne detaillierten Ortsname
          await fetchWeatherForCoordinates(latitude, longitude, "Ihr Standort");
        }
      } catch (e) {
        console.warn('Ortsnamen nicht ermittelt, verwende Standardnamen:', e);
        // Fallback ohne Ortsname
        await fetchWeatherForCoordinates(latitude, longitude, "Ihr Standort");
      }
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
  }, [fetchWeatherForCoordinates]);

  // Lade gespeicherte Wetterdaten beim Komponenten-Mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('weatherData');
      if (savedData) {
        const parsed = JSON.parse(savedData) as StoredWeatherData;
        
        // Prüfe, ob die Daten noch aktuell sind (max. 60 Minuten alt)
        const lastUpdated = new Date(parsed.lastUpdated);
        const now = new Date();
        const diffMs = now.getTime() - lastUpdated.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 60) {
          setLocation(parsed.location);
          setCoordinates(parsed.coordinates);
          
          // Übernehme RequestId wenn vorhanden
          if (parsed.requestId) {
            setLatestRequestId(parsed.requestId);
          }

          // Rekonstruiere alle Date-Objekte
          const weatherWithDates = {
            ...parsed.weather,
            current: {
              ...parsed.weather.current,
              timestamp: new Date(parsed.weather.current.timestamp),
              updateTime: new Date(parsed.weather.current.updateTime)
            },
            hourly: parsed.weather.hourly.map((hour: SavedHourData) => ({
              ...hour,
              time: new Date(hour.time)
            })),
            daily: parsed.weather.daily.map((day: SavedDayData) => ({
              ...day,
              date: new Date(day.date)
            }))
          };
          
          setWeather(weatherWithDates as ProcessedWeatherData);
          setLastUpdated(lastUpdated);
          console.log('Gespeicherte Wetterdaten geladen:', parsed.weather.current.temperature, '°C in', parsed.location);
        } else {
          console.log('Gespeicherte Wetterdaten sind veraltet (', diffMins, 'Minuten alt)');
          // Wenn Koordinaten vorhanden sind, aktualisiere die Wetterdaten
          if (parsed.coordinates) {
            fetchWeatherForCoordinates(parsed.coordinates.lat, parsed.coordinates.lon, parsed.location);
          }
        }
      }
    } catch (error) {
      console.warn('Fehler beim Laden der gespeicherten Wetterdaten:', error);
    }
  }, [fetchWeatherForCoordinates]);

  // Automatische Aktualisierung alle 15 Minuten, wenn Koordinaten vorhanden sind
  useEffect(() => {
    if (!coordinates) return;
    
    const intervalId = setInterval(() => {
      const lastUpdate = lastUpdated || new Date(0);
      const now = new Date();
      const timeDiff = now.getTime() - lastUpdate.getTime();
      
      if (timeDiff > 15 * 60 * 1000) {
        console.log('Automatische Aktualisierung der Wetterdaten...');
        fetchWeatherForCoordinates(coordinates.lat, coordinates.lon, location);
      }
    }, 60000); // Jede Minute prüfen
    
    return () => clearInterval(intervalId);
  }, [coordinates, lastUpdated, location, fetchWeatherForCoordinates]);

  // Erstelle den Context-Wert
  const value: WeatherContextType = {
    isLoading,
    error,
    location,
    weather,
    fetchWeather,
    detectLocation,
    lastUpdated,
    coordinates
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}
"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  BrightskyApiResponse, 
  fetchCurrentWeather, 
  fetchWeatherForecast
} from './brightsky-api';
import { WinterServiceStatus } from '../features/utils';
import { 
  processWeatherData,
} from '../features/weatherDataProcessors';
import {
  geocodeAddress,
  detectCurrentLocation,
} from './GeoService';

// Debug-Flag für ausführlichere Protokollierung
const DEBUG = true;

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

export interface ProcessedWeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  winterServiceStatus: WinterServiceStatus;
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
  refreshWeather: () => Promise<void>;
}

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
}

interface StoredWeatherData {
  location: string;
  coordinates: { lat: number; lon: number };
  coordKey?: string; // Koordinatenschlüssel für präziseres Caching
  weather: SavedWeatherData;
  lastUpdated: string;
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

  /**
   * Funktion zum Abrufen der Wetterdaten für bestimmte Koordinaten
   * Mit verbesserter Koordinatenvalidierung und Cache-Kontrolle
   */
  const fetchWeatherForCoordinates = useCallback(async (lat: number, lon: number, locationName: string) => {
    if (DEBUG) console.log(`Starte Wetterdatenabruf für: ${lat.toFixed(6)}, ${lon.toFixed(6)}, "${locationName}"`);
    setIsLoading(true);
    setError(null);
    
    try {
      // Validiere Koordinaten
      if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        throw new Error(`Ungültige Koordinaten: ${lat}, ${lon}`);
      }
      
      // Speichere Koordinaten
      setCoordinates({ lat, lon });
      
      // Parallele Anfragen für Current und Forecast
      const [current, forecast] = await Promise.all([
        fetchCurrentWeather(lat, lon),
        fetchWeatherForecast(lat, lon, 7)
      ]);
      
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
      
      // Verarbeite die API-Antwort
      const processedData = processWeatherData(combinedData);
      
      // Aktualisiere den Zustand
      setWeather(processedData);
      setLocation(locationName);
      const currentTime = new Date();
      setLastUpdated(currentTime);
      
      if (DEBUG) console.log('Wetterdaten aktualisiert:', processedData.current.temperature, '°C in', locationName);
      
      // Speichere im localStorage für Persistenz
      try {
        // Einen eindeutigen Schlüssel für die Koordinaten erstellen
        const coordKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
        
        localStorage.setItem('weatherData', JSON.stringify({
          location: locationName,
          coordinates: { lat, lon },
          coordKey, // Hinzufügen eines eindeutigen Schlüssels für die Koordinaten
          weather: processedData,
          lastUpdated: currentTime.toISOString()
        }));
      } catch (storageError) {
        console.warn('Lokaler Speicher nicht verfügbar:', storageError);
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      
      if (error instanceof Error) {
        setError(`Fehler bei Wetterdaten: ${error.message}`);
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Verbesserte Funktion zur Erkennung des aktuellen Standorts
   * Verwendet den GeoService
   */
  const detectLocation = useCallback(async () => {
    if (DEBUG) console.log("Starte Standorterkennung mit GeoService...");
    setIsLoading(true);
    setError(null);
    
    try {
      // Den kompletten Prozess auslagern in den GeoService
      const geoResult = await detectCurrentLocation();
      
      if (DEBUG) console.log(`Normalisierte Standortdaten erhalten: ${geoResult.lat}, ${geoResult.lon}, "${geoResult.displayName}"`);
      
      // Wetterdaten mit normalisierten Koordinaten abrufen
      await fetchWeatherForCoordinates(geoResult.lat, geoResult.lon, geoResult.displayName);
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

  /**
   * Aktualisiert die Wetterdaten mit den aktuellen Koordinaten und Standort
   */
  const refreshWeather = useCallback(async () => {
    if (DEBUG) console.log("Aktualisiere Wetterdaten...");
    
    if (!coordinates) {
      if (DEBUG) console.log("Keine Koordinaten vorhanden, verwende Standorterkennung...");
      await detectLocation();
      return;
    }
    
    try {
      // Aktuelle Wetterdaten mit den gespeicherten Koordinaten abrufen
      await fetchWeatherForCoordinates(
        coordinates.lat, 
        coordinates.lon, 
        location || "Ihr Standort"
      );
    } catch (error) {
      console.error("Fehler beim Aktualisieren der Wetterdaten:", error);
      setError("Aktualisierung fehlgeschlagen. Bitte versuchen Sie es später erneut.");
    }
  }, [coordinates, location, detectLocation, fetchWeatherForCoordinates]);

  /**
   * Funktion zum Abrufen der Wetterdaten durch Ortseingabe
   * Nutzt geocodeAddress aus dem GeoService
   */
  const fetchWeather = useCallback(async (locationQuery: string) => {
    if (!locationQuery.trim()) {
      setError('Bitte geben Sie einen Ort ein');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      if (DEBUG) console.log("Starte Geocoding für Adresse:", locationQuery);
      
      // Geocodierung der Adresse mit dem GeoService
      const geoResult = await geocodeAddress(locationQuery);
      
      // Abrufen der Wetterdaten für die gefundenen, normalisierten Koordinaten
      await fetchWeatherForCoordinates(geoResult.lat, geoResult.lon, geoResult.displayName);
    } catch (error) {
      console.error('Fehler bei der Standortsuche:', error);
      
      if (error instanceof Error) {
        setError(`Standortsuche fehlgeschlagen: ${error.message}`);
      } else {
        setError('Ein unbekannter Fehler ist bei der Standortsuche aufgetreten');
      }
      
      setIsLoading(false);
    }
  }, [fetchWeatherForCoordinates]);

  // Lade gespeicherte Wetterdaten beim Komponenten-Mount
  useEffect(() => {
    try {
      // Cache-Tag für Diagnose
      if (DEBUG) {
        const cacheBuster = new Date().getTime();
        console.log(`Cache-Buster: ${cacheBuster}`);
      }
      
      const savedData = localStorage.getItem('weatherData');
      if (savedData) {
        const parsed = JSON.parse(savedData) as StoredWeatherData;
        
        // Prüfe, ob die Daten noch aktuell sind (max. 30 Minuten alt)
        const lastUpdated = new Date(parsed.lastUpdated);
        const now = new Date();
        const diffMs = now.getTime() - lastUpdated.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 30) {
          setLocation(parsed.location);
          setCoordinates(parsed.coordinates);

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
          if (DEBUG) console.log('Gespeicherte Wetterdaten geladen:', parsed.weather.current.temperature, '°C in', parsed.location);
        } else {
          if (DEBUG) console.log('Gespeicherte Wetterdaten sind veraltet (', diffMins, 'Minuten alt)');
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
    refreshWeather
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
}
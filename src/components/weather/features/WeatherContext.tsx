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
// Neue GeoService-Importe
import {
  geocodeAddress as geoServiceGeocode,
  detectCurrentLocation,
  GeoResult
} from './GeoService';

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
   * Mit verbesserter Koordinatenvalidierung
   */
  const fetchWeatherForCoordinates = useCallback(async (lat: number, lon: number, locationName: string) => {
    console.log(`Starte Wetterdatenabruf für: ${lat.toFixed(6)}, ${lon.toFixed(6)}, "${locationName}"`);
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
      setLastUpdated(new Date());
      
      console.log('Wetterdaten aktualisiert:', processedData.current.temperature, '°C in', locationName);
      
      // Speichere im localStorage für Persistenz
      try {
        // Einen eindeutigen Schlüssel für die Koordinaten erstellen
        const coordKey = `${lat.toFixed(4)},${lon.toFixed(4)}`;
        
        localStorage.setItem('weatherData', JSON.stringify({
          location: locationName,
          coordinates: { lat, lon },
          coordKey, // Hinzufügen eines eindeutigen Schlüssels für die Koordinaten
          weather: processedData,
          lastUpdated: new Date().toISOString()
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
   * Funktion zum Abrufen der Wetterdaten durch Ortseingabe
   * Nutzt den neuen GeoService
   */
  const fetchWeather = useCallback(async (locationQuery: string) => {
    if (!locationQuery.trim()) {
      setError('Bitte geben Sie einen Ort ein');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Geocodierung der Adresse mit dem neuen GeoService
      const geoResult = await geoServiceGeocode(locationQuery);
      
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

  /**
   * Verbesserte Funktion zur Erkennung des aktuellen Standorts
   * Verwendet den neuen GeoService für normalisierte Koordinaten
   */
  const detectLocation = useCallback(async () => {
    console.log("Starte Standorterkennung mit GeoService...");
    setIsLoading(true);
    setError(null);
    
    try {
      // Verwende den GeoService für die Standorterkennung und Normalisierung
      const geoResult = await detectCurrentLocation();
      
      console.log(`Normalisierte Standortdaten erhalten: ${geoResult.lat}, ${geoResult.lon}, "${geoResult.displayName}"`);
      
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
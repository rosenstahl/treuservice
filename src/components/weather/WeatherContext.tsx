"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translateWeatherCondition, getWeatherIcon, calculateIceRisk } from './utils';

// Typdefinitionen für die API und die Anwendungsdaten
interface Coordinates {
  lat: number;
  lon: number;
}

interface WeatherItem {
  timestamp: string;
  temperature: number;
  condition: string;
  icon: string;
  precipitation: number;
  precipitation_probability?: number;
  relative_humidity: number;
  wind_speed: number;
  cloud_cover?: number;
  soil_temperature?: number;
}

interface WeatherResponse {
  weather: WeatherItem[];
  sources: unknown[];
}

interface CurrentConditions {
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionDE: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  precipitationProbability: number;
  cloudCover?: number;
  soilTemperature?: number;
  summary: string;
  updateTime: Date;
}

interface HourlyForecast {
  time: Date;
  temperature: number;
  condition: string;
  conditionDE: string;
  icon: string;
  precipitation: number;
  windSpeed: number;
  humidity: number;
}

interface DailyForecast {
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

interface WeatherNotifications {
  iceRisk: {
    risk: 'low' | 'medium' | 'high';
    description: string;
  };
  snowfallPrediction?: {
    willSnow: boolean;
    startTime?: string;
    endTime?: string;
    totalAmount: number;
  };
  winterServiceRequired: boolean;
  lastUpdate: Date;
}

interface ProcessedWeatherData {
  currentConditions: CurrentConditions;
  forecast: {
    hourly: HourlyForecast[];
    daily: DailyForecast[];
  };
  notifications: WeatherNotifications;
}

// Typ für den Context
interface WeatherContextType {
  isLoading: boolean;
  error: string | null;
  location: string;
  weatherData: ProcessedWeatherData | null;
  searchLocation: (location: string) => Promise<void>;
  detectLocation: () => Promise<void>;
  lastUpdated: Date | null;
  isLocalizing: boolean; // Neuer State für genaueres Feedback
}

// Erstelle den Context
const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

// Custom Hook zum Verwenden des Contexts
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather muss innerhalb eines WeatherProvider verwendet werden');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

// Hauptkomponente des Weather Providers
export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLocalizing, setIsLocalizing] = useState(false); // Separater State für Lokalisierung
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [weatherData, setWeatherData] = useState<ProcessedWeatherData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [cacheTimestamp, setCacheTimestamp] = useState<Record<string, number>>({});

  // Hilfsfunktion für Promise mit Timeout
  const withTimeout = <T,>(promise: Promise<T>, timeoutMs: number, errorMessage: string): Promise<T> => {
    let timeoutId: NodeJS.Timeout;
    
    // Erstelle ein Promise, das nach der angegebenen Zeit abläuft
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error(errorMessage));
      }, timeoutMs);
    });
    
    // Rennen zwischen dem ursprünglichen Promise und dem Timeout
    return Promise.race([
      promise.then(result => {
        clearTimeout(timeoutId);
        return result;
      }),
      timeoutPromise
    ]);
  };

  // Funktion zum Abrufen der Wetterdaten von BrightSky API
  const fetchWeatherData = useCallback(async (lat: number, lon: number): Promise<WeatherResponse> => {
    const today = new Date().toISOString().split('T')[0];
    
    // Datum für 14 Tage später - für längere Vorhersage
    const nextTwoWeeks = new Date();
    nextTwoWeeks.setDate(nextTwoWeeks.getDate() + 14);
    const nextTwoWeeksString = nextTwoWeeks.toISOString().split('T')[0];
    
    // BrightSky API URL mit allen erforderlichen Parametern
    const url = `https://api.brightsky.dev/weather?lat=${lat}&lon=${lon}&date=${today}&last_date=${nextTwoWeeksString}&tz=${encodeURIComponent('Europe/Berlin')}`;
    
    // Caching-Schlüssel basierend auf den Koordinaten (gerundet auf 2 Dezimalstellen für besseres Caching)
    const cacheKey = `weather_${lat.toFixed(2)}_${lon.toFixed(2)}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    const cacheTime = cacheTimestamp[cacheKey] || 0;
    const now = Date.now();
    
    // Cache ist 10 Minuten gültig (600000ms)
    if (cachedData && now - cacheTime < 600000) {
      console.log('Verwende gecachte Wetterdaten');
      return JSON.parse(cachedData);
    }
    
    try {
      console.log('Wetterdaten abrufen:', url);
      
      const response = await withTimeout(
        fetch(url, {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
          }
        }),
        15000, // 15 Sekunden Timeout
        'Die Wetterabfrage hat zu lange gedauert. Bitte versuchen Sie es später erneut.'
      );
      
      if (!response.ok) {
        throw new Error(`API-Fehler: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Daten im Session Storage speichern
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
        setCacheTimestamp(prev => ({ ...prev, [cacheKey]: now }));
      } catch (cacheError) {
        console.warn('Konnte Wetterdaten nicht cachen:', cacheError);
      }
      
      return data;
    } catch (error) {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Ein unbekannter Fehler ist beim Abrufen der Wetterdaten aufgetreten.');
    }
  }, [cacheTimestamp]);

  // Verarbeite die API-Antwort in ein einheitliches Format
  const processWeatherData = useCallback((data: WeatherResponse): ProcessedWeatherData => {
    if (!data.weather || data.weather.length === 0) {
      throw new Error('Keine Wetterdaten erhalten');
    }
    
    const now = new Date();
    const currentWeather = data.weather[0];
    
    // Verarbeite aktuelle Bedingungen
    const temperature = currentWeather.temperature;
    const feelsLike = temperature - 2; // Einfache Approximation für gefühlte Temperatur
    const conditionDE = translateWeatherCondition(currentWeather.condition);

    // Sortiere Wetterdaten chronologisch
    const sortedWeather = [...data.weather].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    // Aktuelle Bedingungen
    const currentConditions: CurrentConditions = {
      temperature,
      feelsLike,
      condition: currentWeather.condition,
      conditionDE,
      icon: currentWeather.icon || getWeatherIcon(currentWeather.condition),
      humidity: currentWeather.relative_humidity,
      windSpeed: currentWeather.wind_speed,
      precipitation: currentWeather.precipitation || 0,
      precipitationProbability: currentWeather.precipitation_probability || 0,
      cloudCover: currentWeather.cloud_cover,
      soilTemperature: currentWeather.soil_temperature || (temperature - 2),
      summary: conditionDE,
      updateTime: now
    };
    
    // Stündliche Vorhersage - nur zukünftige Zeiten
    const hourlyForecast: HourlyForecast[] = sortedWeather
      .filter(item => new Date(item.timestamp) > now)
      .slice(0, 48) // Nur 48 Stunden in die Zukunft
      .map(hour => {
        const hourTime = new Date(hour.timestamp);
        const hourConditionDE = translateWeatherCondition(hour.condition);

        return {
          time: hourTime,
          temperature: hour.temperature,
          condition: hour.condition,
          conditionDE: hourConditionDE,
          icon: hour.icon || getWeatherIcon(hour.condition),
          precipitation: hour.precipitation || 0,
          windSpeed: hour.wind_speed,
          humidity: hour.relative_humidity
        };
      });
    
    // Tägliche Vorhersage generieren
    const dailyForecast: DailyForecast[] = generateDailyForecast(sortedWeather);
    
    // Benachrichtigungen und Warnungen
    const notifications = generateNotifications(sortedWeather, currentConditions);
    
    return {
      currentConditions,
      forecast: {
        hourly: hourlyForecast,
        daily: dailyForecast
      },
      notifications
    };
  }, []);

  // Hilfsfunktion zum Generieren von Tagesvorhersagen
  const generateDailyForecast = (weatherItems: WeatherItem[]): DailyForecast[] => {
    const dailyMap = new Map<string, WeatherItem[]>();
    
    // Gruppiere Wetterdaten nach Tagen
    weatherItems.forEach(item => {
      const date = new Date(item.timestamp).toISOString().split('T')[0];
      if (!dailyMap.has(date)) {
        dailyMap.set(date, []);
      }
      const items = dailyMap.get(date);
      if (items) {
        items.push(item);
      }
    });
    
    // Sortierte Liste der Tage
    const sortedDays = Array.from(dailyMap.keys()).sort();
    
    // Tagesvorhersagen erstellen
    return sortedDays.slice(0, 7).map(dateStr => {
      const dayItems = dailyMap.get(dateStr) || [];
      const temperatures = dayItems.map(item => item.temperature);
      
      const maxTemp = Math.max(...temperatures);
      const minTemp = Math.min(...temperatures);
      
      // Häufigste Bedingung finden
      const conditions = dayItems.map(item => item.condition).filter(Boolean);
      const conditionCounts = new Map<string, number>();
      
      conditions.forEach(condition => {
        conditionCounts.set(condition, (conditionCounts.get(condition) || 0) + 1);
      });
      
      let mostCommonCondition = 'unknown';
      let maxCount = 0;
      
      conditionCounts.forEach((count, condition) => {
        if (count > maxCount) {
          mostCommonCondition = condition;
          maxCount = count;
        }
      });
      
      const conditionDE = translateWeatherCondition(mostCommonCondition);
      
      // Niederschlagssumme und Durchschnittswahrscheinlichkeit
      let totalPrecipitation = 0;
      const precipProbabilities: number[] = [];
      let snowAmount = 0;
      
      dayItems.forEach(item => {
        totalPrecipitation += item.precipitation || 0;
        
        if (item.precipitation_probability !== undefined) {
          precipProbabilities.push(item.precipitation_probability);
        }
        
        // Schneemenge berechnen, wenn Temperatur <= 2°C und Niederschlag vorhanden
        if (item.temperature <= 2 && item.precipitation > 0) {
          const conversionFactor = item.temperature <= 0 ? 10 : 7;
          snowAmount += (item.precipitation * conversionFactor) / 10; // cm Schnee
        }
      });
      
      const avgPrecipProb = precipProbabilities.length > 0 
        ? precipProbabilities.reduce((sum, val) => sum + val, 0) / precipProbabilities.length 
        : 0;
      
      return {
        date: new Date(dateStr),
        maxTemp,
        minTemp,
        condition: mostCommonCondition,
        conditionDE,
        icon: getWeatherIcon(mostCommonCondition),
        precipitation: Math.round(totalPrecipitation * 10) / 10,
        precipitationProbability: Math.round(avgPrecipProb),
        snowAmount: Math.round(snowAmount * 10) / 10
      };
    });
  };

  // Generiere Benachrichtigungen basierend auf den Wetterdaten
  const generateNotifications = (
    weatherItems: WeatherItem[], 
    currentConditions: CurrentConditions
  ): WeatherNotifications => {
    const now = new Date();
    const temp = currentConditions.temperature;
    const humidity = currentConditions.humidity;
    const precipitation = currentConditions.precipitation;
    
    // Glättegefahr berechnen
    const iceRisk = calculateIceRisk(temp, precipitation, humidity);
    
    // Schneefall-Vorhersage für die nächsten 24 Stunden
    let willSnow = false;
    let snowStartTime: string | undefined;
    let snowEndTime: string | undefined;
    let totalSnowAmount = 0;
    let isSnowing = false;
    
    // Nächste 24 Stunden durchsuchen
    const next24Hours = weatherItems
      .filter(item => {
        const itemTime = new Date(item.timestamp);
        return itemTime > now && itemTime < new Date(now.getTime() + 24 * 60 * 60 * 1000);
      })
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    for (let i = 0; i < next24Hours.length; i++) {
      const hour = next24Hours[i];
      const temp = hour.temperature;
      const precip = hour.precipitation || 0;
      
      // Schneefallbedingungen: Temperatur <= 2°C und Niederschlag > 0
      if (temp <= 2 && precip > 0) {
        if (!isSnowing) {
          isSnowing = true;
          willSnow = true;
          snowStartTime = hour.timestamp;
        }
        
        // Schneemenge berechnen
        const conversionFactor = temp <= 0 ? 10 : (temp <= 1 ? 8 : 7);
        totalSnowAmount += precip * conversionFactor / 10; // cm
      } 
      else if (isSnowing) {
        // Ende des Schneefalls
        isSnowing = false;
        snowEndTime = hour.timestamp;
      }
    }
    
    // Wenn kein Ende gefunden wurde, aber ein Beginn vorhanden ist
    if (snowStartTime && !snowEndTime && next24Hours.length > 0) {
      snowEndTime = next24Hours[next24Hours.length - 1].timestamp;
    }
    
    // Schneefallvorhersage
    const snowfallPrediction = willSnow
      ? {
          willSnow: true,
          startTime: snowStartTime,
          endTime: snowEndTime,
          totalAmount: Math.round(totalSnowAmount * 10) / 10
        }
      : {
          willSnow: false,
          totalAmount: 0
        };
    
    return {
      iceRisk,
      snowfallPrediction,
      winterServiceRequired: temp <= 0 || (temp <= 2 && precipitation > 0.2),
      lastUpdate: now
    };
  };

  // Funktion zum Abrufen der Wetterdaten für einen bestimmten Standort
  const fetchWeatherForLocation = useCallback(async (lat: number, lon: number, locationName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Speichere Koordinaten
      setCoordinates({ lat, lon });
      
      // Lade Wetterdaten
      const weatherResponse = await fetchWeatherData(lat, lon);
      
      // Verarbeite die Daten
      const processedData = processWeatherData(weatherResponse);
      
      // Aktualisiere den State
      setWeatherData(processedData);
      setLocation(locationName);
      setLastUpdated(new Date());
      
      console.log('Wetterdaten erfolgreich abgerufen und verarbeitet');
    } catch (error) {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten.');
      }
    } finally {
      setIsLoading(false);
      setIsLocalizing(false); // Lokalisierung ist auf jeden Fall abgeschlossen
    }
  }, [fetchWeatherData, processWeatherData]);

  // Hilfs-Promise für die Geolocation mit Timeout
  const getPositionWithTimeout = (highAccuracy: boolean, timeout: number): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator || !navigator.geolocation) {
        reject(new Error('Geolocation wird von diesem Browser nicht unterstützt.'));
        return;
      }
      
      const options = {
        enableHighAccuracy: highAccuracy,
        timeout: timeout,
        maximumAge: highAccuracy ? 0 : 60000 // Kein Cache bei hoher Genauigkeit
      };
      
      console.log(`Versuche Standort zu ermitteln mit ${highAccuracy ? 'hoher' : 'niedriger'} Genauigkeit, Timeout: ${timeout}ms`);
      
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  
  // IP-basierter Fallback für Geolocation
  const fallbackToIpLocation = useCallback(async (): Promise<boolean> => {
    console.log("Führe IP-basierten Fallback durch...");
    
    try {
      // IP-Geolocation-Dienst verwenden (ipapi.co ist recht zuverlässig)
      const response = await withTimeout(
        fetch('https://ipapi.co/json/'),
        5000,
        'IP-Lokalisierung hat zu lange gedauert.'
      );
      
      if (!response.ok) {
        console.error("IP-Lokalisierung fehlgeschlagen:", response.status);
        return false;
      }
      
      const data = await response.json();
      
      if (data && data.latitude && data.longitude) {
        setError("Verwende ungefähren Standort basierend auf IP-Adresse. Für genaue Daten nutzen Sie bitte die manuelle Suche.");
        
        // Klar kennzeichnen, dass dies ein ungefährer Standort ist
        const locationLabel = data.city ? 
                            `Ungefähr: ${data.city}` : 
                            data.region ? 
                              `Ungefähr: ${data.region}` : 
                              'Ungefährer Standort';
        
        // Abruf der Wetterdaten mit den ungefähren Koordinaten
        await fetchWeatherForLocation(
          data.latitude, 
          data.longitude, 
          locationLabel
        );
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('IP-Fallback fehlgeschlagen:', error);
      return false;
    }
  }, [fetchWeatherForLocation]);

  // Funktion zur Standortsuche
  const searchLocation = useCallback(async (locationName: string) => {
    if (!locationName.trim()) {
      setError('Bitte geben Sie einen Standort ein');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Geocoding über Nominatim
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1&addressdetails=1&countrycodes=de,at,ch`;
      
      const response = await withTimeout(
        fetch(geocodeUrl, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'TreuserviceWetterApp/1.0',
            'Cache-Control': 'no-cache'
          }
        }),
        10000,
        'Die Adresssuche hat zu lange gedauert. Bitte versuchen Sie es später erneut.'
      );
      
      if (!response.ok) {
        throw new Error(`Geocoding-Fehler: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);
        
        // Vereinfache den zurückgegebenen Ortsnamen
        const parts = result.display_name.split(',');
        const simplifiedName = parts.length > 0 ? parts[0].trim() : locationName;
        
        // Abrufen der Wetterdaten für die gefundenen Koordinaten
        await fetchWeatherForLocation(lat, lon, simplifiedName);
      } else {
        throw new Error('Die angegebene Adresse konnte nicht gefunden werden.');
      }
    } catch (error) {
      console.error('Fehler bei der Standortsuche:', error);
      
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Ein unbekannter Fehler ist bei der Standortsuche aufgetreten.');
      }
      
      setIsLoading(false);
    }
  }, [fetchWeatherForLocation]);

  // Verbesserte Funktion zum Erkennen des aktuellen Standorts
  const detectLocation = useCallback(async () => {
    setIsLoading(true);
    setIsLocalizing(true); // Zeige an, dass die Standorterkennung läuft
    setError(null);
    
    console.log("Starte Standortbestimmung mit stufenweisem Fallback...");
    
    // Prüfe Browsersupport
    if (!navigator || !navigator.geolocation) {
      console.log("Browser unterstützt keine Geolocation, verwende IP-Fallback");
      await fallbackToIpLocation();
      setIsLoading(false);
      setIsLocalizing(false);
      return;
    }
    
    try {
      let position: GeolocationPosition;
      
      // Versuch 1: Hochpräzise Standortbestimmung (8 Sekunden)
      try {
        console.log("Versuche hochpräzise Standortbestimmung...");
        position = await getPositionWithTimeout(true, 8000);
        console.log("Hochpräzise Standortbestimmung erfolgreich");
      } catch (highAccuracyError) {
        console.log("Hochpräzise Bestimmung fehlgeschlagen, versuche mit niedrigerer Präzision");
        
        // Wenn das ein Berechtigungsfehler war, sofort werfen
        if (
          highAccuracyError instanceof GeolocationPositionError && 
          highAccuracyError.code === 1
        ) {
          throw highAccuracyError;
        }
        
        // Versuch 2: Niedrigere Genauigkeit (weniger Akku/Ressourcenverbrauch, schneller)
        try {
          position = await getPositionWithTimeout(false, 10000);
          console.log("Standortbestimmung mit reduzierter Präzision erfolgreich");
        } catch (error) {
          console.log("Auch niedrige Präzision fehlgeschlagen, werfe Fehler");
          // Wenn der zweite Versuch fehlschlägt, wirf den ursprünglichen Fehler
          throw error;
        }
      }
      
      // Position wurde erfolgreich ermittelt
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log(`Standort ermittelt: ${lat}, ${lon}`);
      
      // Versuche Ortsnamen zu ermitteln
      let locationName = "Ihr Standort";
      
      try {
        console.log("Versuche Ortsnamen zu ermitteln...");
        const reverseGeocodeUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=de`;
        
        const response = await withTimeout(
          fetch(reverseGeocodeUrl, {
            headers: {
              'Accept': 'application/json',
              'User-Agent': 'TreuserviceWetterApp/1.0',
              'Cache-Control': 'no-cache'
            }
          }),
          5000,
          'Ortsnamensermittlung hat zu lange gedauert.'
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.address) {
            locationName = data.address.city || 
                          data.address.town || 
                          data.address.village || 
                          data.address.suburb ||
                          data.address.county ||
                          "Ihr Standort";
            console.log(`Ortsname ermittelt: ${locationName}`);
          }
        }
      } catch (geocodeError) {
        console.warn("Konnte Ortsname nicht ermitteln:", geocodeError);
        // Nur Warnung, keine Unterbrechung - wir haben immer noch die Koordinaten
      }
      
      // Wetterdaten mit den genauen Koordinaten abrufen
      await fetchWeatherForLocation(lat, lon, locationName);
      
    } catch (error) {
      console.error('Fehler bei der Standorterkennung:', error);
      
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case 1: // PERMISSION_DENIED
            setError('Standortzugriff verweigert. Für lokale Wetterdaten erlauben Sie bitte den Standortzugriff in Ihren Browser-Einstellungen.');
            // KEINE automatische Fallback, da der Benutzer bewusst abgelehnt hat
            break;
          case 2: // POSITION_UNAVAILABLE
            setError('Standortbestimmung nicht möglich. Versuche alternative Methode...');
            
            // Nur bei technischen Problemen den Fallback nutzen
            try {
              console.log("Standort nicht verfügbar, verwende IP-basierte Lokalisierung als Fallback");
              const fallbackSuccess = await fallbackToIpLocation();
              
              if (!fallbackSuccess) {
                setError('Standortbestimmung fehlgeschlagen. Bitte geben Sie einen Ort manuell ein.');
              }
            } catch (_fallbackError) {
              setError('Standortbestimmung fehlgeschlagen. Bitte geben Sie einen Ort manuell ein.');
            }
            break;
          case 3: // TIMEOUT
            setError('Standortbestimmung hat zu lange gedauert. Versuche alternative Methode...');
            
            // Bei Timeout den Fallback nutzen
            try {
              console.log("Timeout bei Standortbestimmung, verwende IP-basierte Lokalisierung");
              const fallbackSuccess = await fallbackToIpLocation();
              
              if (!fallbackSuccess) {
                setError('Standortbestimmung fehlgeschlagen. Bitte geben Sie einen Ort manuell ein.');
              }
            } catch (_fallbackError) {
              setError('Standortbestimmung fehlgeschlagen. Bitte geben Sie einen Ort manuell ein.');
            }
            break;
          default:
            setError('Ein unbekannter Fehler ist bei der Standorterkennung aufgetreten.');
            
            // Bei sonstigen Geolocation-Fehlern auch Fallback versuchen
            await fallbackToIpLocation();
        }
      } else if (error instanceof Error) {
        setError(error.message);
        
        // Bei sonstigen Fehlern auch Fallback versuchen, aber nicht bei Berechtigungsfehlern
        if (!error.message.includes('permission') && !error.message.includes('verweigert')) {
          await fallbackToIpLocation();
        }
      } else {
        setError('Ein unbekannter Fehler ist aufgetreten.');
        await fallbackToIpLocation();
      }
      
      setIsLoading(false);
      setIsLocalizing(false);
    }
  }, [fetchWeatherForLocation, fallbackToIpLocation]);

  // Automatische Aktualisierung der Wetterdaten, wenn Koordinaten vorhanden sind
  useEffect(() => {
    // WICHTIG: Geändert um Weiterleitungsproblem zu beheben
    // Keine automatische Aktualisierung, wenn wir nicht auf der Winterdienst-Seite sind
    if (typeof window !== 'undefined') {
      const isWinterdienstPage = window.location.pathname.includes('/winterdienst');
      if (!isWinterdienstPage) {
        return; // Keine automatische Aktualisierung auf der Hauptseite
      }
    }
    
    // Keine automatische Aktualisierung während eines laufenden Requests
    if (isLoading || isLocalizing) return;
    
    // Kein Update ohne Koordinaten oder Daten
    if (!coordinates || !weatherData) return;
    
    // Prüfen, ob die letzte Aktualisierung mehr als 15 Minuten zurückliegt
    const now = new Date();
    const lastUpdate = lastUpdated || new Date(0);
    const timeDiff = now.getTime() - lastUpdate.getTime();
    
    if (timeDiff > 15 * 60 * 1000) { // 15 Minuten
      console.log('Automatische Aktualisierung der Wetterdaten...');
      fetchWeatherForLocation(coordinates.lat, coordinates.lon, location);
    }
  }, [coordinates, fetchWeatherForLocation, isLoading, isLocalizing, lastUpdated, location, weatherData]);

  // Stellt den Context-Wert bereit
  const value = {
    isLoading,
    isLocalizing,
    error,
    location,
    weatherData,
    searchLocation,
    detectLocation,
    lastUpdated
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};
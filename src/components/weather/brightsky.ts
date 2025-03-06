export interface WeatherObservation {
  timestamp: string;
  source_id: number;
  cloud_cover?: number;
  condition?: string;
  dew_point?: number;
  icon?: string;
  precipitation?: number;
  precipitation_probability?: number;
  pressure_msl?: number;
  relative_humidity?: number;
  sunshine?: number;
  temperature?: number;
  soil_temperature?: number; // Bodentemperatur wird abgeleitet
  visibility?: number;
  wind_direction?: number;
  wind_speed?: number;
  wind_gust_speed?: number;
}

export interface WeatherResponse {
  weather: WeatherObservation[];
  sources: Record<string, unknown>[];
}

export interface ForecastParams {
  lat: number;
  lon: number;
  date?: string; // Optional: YYYY-MM-DD
  last_date?: string; // Optional: YYYY-MM-DD
  _cacheBuster?: number; // Optional: Verhindert Caching
}

export interface CurrentWeatherParams {
  lat: number;
  lon: number;
  _cacheBuster?: number; // Optional: Verhindert Caching
}

// Schnittstelle für Geolocation-Fehler
export interface GeoLocationError {
  code: number;
  message: string;
}

// API-URLs
const BRIGHTSKY_API_BASE = "https://api.brightsky.dev";
const GEOCODING_API = "https://nominatim.openstreetmap.org/search";

// Interface für Brightsky Weather API Antwort (sowohl aktuell als auch Vorhersage)
interface BrightskyWeatherResponse {
  weather: {
    timestamp: string;
    source_id: number;
    cloud_cover: number | null;
    condition: string | null;
    dew_point: number | null;
    icon: string | null;
    precipitation: number | null;
    pressure_msl: number | null;
    relative_humidity: number | null;
    sunshine: number | null;
    temperature: number | null;
    visibility: number | null;
    wind_direction: number | null;
    wind_speed: number | null;
    wind_gust_speed: number | null;
  }[];
  sources: Record<string, unknown>[];
}

// Funktion zum Abrufen der aktuellen Wetterdaten
export async function getCurrentWeather({ lat, lon, _cacheBuster }: CurrentWeatherParams): Promise<WeatherObservation | null> {
  try {
    console.log(`API-Aufruf: getCurrentWeather für lat=${lat}, lon=${lon}`);
    
    if (!isValidCoordinate(lat, lon)) {
      console.error('Ungültige Koordinaten:', lat, lon);
      throw new Error('Ungültige Koordinaten. Bitte geben Sie gültige Breiten- und Längengrade ein.');
    }
    
    // Hole aktuelle Wetterdaten von Brightsky - nutze weather Endpunkt mit aktuellem Datum
    // Das heutige Datum für den weather-Endpunkt verwenden
    const today = new Date().toISOString().split('T')[0];
    const result = await fetchBrightskyWeather({ lat, lon, date: today, _cacheBuster });
    
    // Wenn wir Daten bekommen haben, nehmen wir den aktuellsten Datensatz
    if (result && result.length > 0) {
      console.log('Brightsky API erfolgreich:', result[0]);
      return result[0];
    } else {
      throw new Error("Keine aktuellen Wetterdaten verfügbar");
    }
  } catch (error) {
    console.error('Allgemeiner Fehler bei getCurrentWeather:', error);
    throw new Error('Fehler beim Abrufen der aktuellen Wetterdaten. Bitte versuchen Sie es später erneut.');
  }
}

// Gemeinsame Funktion zum Abrufen von Wetterdaten von Brightsky
async function fetchBrightskyWeather({ lat, lon, date, last_date, _cacheBuster }: ForecastParams): Promise<WeatherObservation[]> {
  // Cache-Parameter hinzufügen, wenn vorhanden
  const cacheBuster = _cacheBuster || Date.now();
  
  // URL für den weather Endpunkt erstellen mit korrektem Timezone-Parameter
  let url = `${BRIGHTSKY_API_BASE}/weather?lat=${lat}&lon=${lon}&tz=${encodeURIComponent('Europe/Berlin')}`;
  
  // Hinzufügen von Datumsparametern, wenn angegeben
  if (date) {
    url += `&date=${date}`;
  }
  
  if (last_date) {
    url += `&last_date=${last_date}`;
  }

  // Anfrage für 14 Tage Vorhersage stellen, wenn last_date nicht angegeben ist
  if (!last_date && date) {
    // Berechne Datum für 14 Tage nach Startdatum
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 14);
    url += `&last_date=${endDate.toISOString().split('T')[0]}`;
  }
  
  // Cache-Buster hinzufügen
  url += `&_=${cacheBuster}`;
  
  console.log('Brightsky API Anfrage URL:', url);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate', // Stärkere Cache-Kontrolle
        'Pragma': 'no-cache', // Für ältere Browser
        'Expires': '0' // Für ältere Browser
      },
      signal: AbortSignal.timeout(15000) // Längeres Timeout für mehr Zuverlässigkeit
    });
    
    if (!response.ok) {
      console.error(`Brightsky API Fehler: ${response.status} ${response.statusText}`);
      throw new Error(`Brightsky API Fehler: ${response.status} ${response.statusText}`);
    }
    
    const data: BrightskyWeatherResponse = await response.json();
    console.log('Erhaltene Brightsky-Daten:', data);
    
    if (!data.weather || !Array.isArray(data.weather) || data.weather.length === 0) {
      console.error('Keine Wetterdaten von Brightsky verfügbar');
      throw new Error('Keine Wetterdaten von Brightsky verfügbar');
    }
    
    // Validieren der Daten auf unplausible Werte
    const suspiciousValues = data.weather.filter(item => 
      (item.temperature !== null && (item.temperature < -50 || item.temperature > 50)) ||
      (item.precipitation !== null && item.precipitation < 0) ||
      (item.relative_humidity !== null && (item.relative_humidity < 0 || item.relative_humidity > 100))
    );
    
    if (suspiciousValues.length > 0) {
      console.warn('Verdächtige Wetterwerte gefunden:', suspiciousValues);
    }
    
    // Konvertiere die Rohdaten in unser Format
    return data.weather.map(item => {
      // Bedingungen intelligent herleiten
      const condition = item.condition;
      const precipitation = item.precipitation || 0;
      const cloudCover = item.cloud_cover || 0;
      
      // Intelligente Wetterbedingungskorrektur basierend auf mehreren Faktoren
      let correctedCondition = condition;
      
      // Wenn als Regen markiert, aber kein Niederschlag, korrigieren basierend auf Wolkendecke
      if (condition === 'rain' && precipitation === 0) {
        if (cloudCover > 50) {
          correctedCondition = 'cloudy';
        } else if (cloudCover > 10) {
          correctedCondition = 'partly-cloudy-day';
        } else {
          correctedCondition = 'clear-day';
        }
        console.log(`Bedingung korrigiert von ${condition} zu ${correctedCondition} (Wolkendecke: ${cloudCover}%)`);
      }
      
      // Bei Nacht die entsprechenden Nacht-Icons verwenden
      const timestamp = new Date(item.timestamp);
      const hour = timestamp.getHours();
      const isNight = hour < 6 || hour > 20; // Vereinfachte Annahme für Tag/Nacht
      
      // Icon-Korrektur für Tag/Nacht
      let icon = correctedCondition;
      if (isNight) {
        if (icon === 'clear-day') {
          icon = 'clear-night';
        } else if (icon === 'partly-cloudy-day') {
          icon = 'partly-cloudy-night';
        }
      }
      
      // Sicherstelle, dass die Luftfeuchtigkeit realistisch ist
      let humidity = item.relative_humidity;
      if (humidity === null || humidity === undefined) {
        // Anstatt feste 70% zu nehmen, approximieren wir basierend auf anderen Faktoren
        humidity = precipitation > 0 ? 85 : (cloudCover > 50 ? 75 : 60);
      }
      
      // Runde alle numerischen Werte auf sinnvolle Dezimalstellen
      return {
        timestamp: item.timestamp,
        source_id: item.source_id || 2,
        temperature: item.temperature !== null ? 
          Math.round(item.temperature * 10) / 10 : undefined,
        condition: correctedCondition !== null ? 
          mapBrightskyCondition(correctedCondition) : 
          deriveWeatherCondition(item),
        icon: item.icon !== null ? 
          item.icon : 
          icon || undefined, // Stelle sicher, dass null zu undefined umgewandelt wird
        precipitation: Math.round((precipitation) * 10) / 10,
        precipitation_probability: Math.round(item.precipitation ? 70 : 0), // Brightsky liefert keine direkte Wahrscheinlichkeit
        relative_humidity: Math.round(humidity),
        wind_speed: Math.round((item.wind_speed || 0) * 10) / 10,
        wind_direction: Math.round(item.wind_direction || 0),
        wind_gust_speed: item.wind_gust_speed !== null ? 
          Math.round(item.wind_gust_speed * 10) / 10 : undefined,
        cloud_cover: Math.round(item.cloud_cover || 0),
        pressure_msl: Math.round(item.pressure_msl || 0),
        visibility: Math.round(item.visibility || 0),
        dew_point: item.dew_point !== null ? 
          Math.round(item.dew_point * 10) / 10 : undefined,
        soil_temperature: item.temperature !== null ? 
          Math.round(estimateSoilTemperature(item.temperature, item.temperature - 2) * 10) / 10 : 
          undefined,
        sunshine: item.sunshine !== null ? item.sunshine : undefined
      };
    });
  } catch (error) {
    console.error('Fehler beim Abrufen der Wetterdaten von BrightSky:', error);
    // Verbesserte Fehlerbehandlung
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Die Anfrage an den Wetterdienst hat zu lange gedauert. Bitte versuchen Sie es später erneut.');
      }
      throw error;
    }
    throw new Error('Ein unbekannter Fehler ist beim Abrufen der Wetterdaten aufgetreten.');
  }
}

// Funktion zum Abrufen der Vorhersage
export async function getWeatherForecast({ lat, lon, date, last_date, _cacheBuster }: ForecastParams): Promise<WeatherObservation[]> {
  try {
    console.log(`API-Aufruf: getWeatherForecast für lat=${lat}, lon=${lon}`);
    
    if (!isValidCoordinate(lat, lon)) {
      console.error('Ungültige Koordinaten:', lat, lon);
      throw new Error('Ungültige Koordinaten. Bitte geben Sie gültige Breiten- und Längengrade ein.');
    }
    
    // Standard-Datumsparameter falls nicht angegeben
    const today = new Date().toISOString().split('T')[0];
    
    let endDate = last_date;
    // Wenn kein Enddatum angegeben ist, setzen wir es auf 14 Tage später für längere Vorhersage
    if (!endDate) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 14); // 14 Tage Vorhersage
      endDate = futureDate.toISOString().split('T')[0];
    }
    
    // Verwende Brightsky mit korrektem Datumsbereich
    const result = await fetchBrightskyWeather({ 
      lat, 
      lon, 
      date: date || today, 
      last_date: endDate, 
      _cacheBuster 
    });
    
    console.log('Brightsky Forecast API erfolgreich mit', result.length, 'Einträgen');
    return result;
  } catch (error) {
    console.error('Allgemeiner Fehler bei getWeatherForecast:', error);
    return generateFallbackForecast();
  }
}

// Funktion zur Koordinaten-Validierung
function isValidCoordinate(lat: number, lon: number): boolean {
  return (
    !isNaN(lat) && 
    !isNaN(lon) && 
    lat >= -90 && 
    lat <= 90 && 
    lon >= -180 && 
    lon <= 180
  );
}

// Funktion zur Adresssuche (Geocoding)
export async function geocodeAddress(address: string): Promise<{lat: number, lon: number, display_name: string} | null> {
  try {
    if (!address || address.trim().length < 3) {
      throw new Error('Bitte geben Sie mindestens 3 Zeichen für die Adresssuche ein');
    }
    
    // Nominatim OpenStreetMap Geocoding API verwenden
    const url = `${GEOCODING_API}?q=${encodeURIComponent(address)}&format=json&limit=1&addressdetails=1&countrycodes=de,at,ch`;
    console.log('Geocoding-Anfrage:', url);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        // User-Agent für bessere Ergebnisse
        'User-Agent': 'TreuserviceWetterApp/1.0',
        'Cache-Control': 'no-cache, no-store, must-revalidate' 
      },
      // Timeout nach 8 Sekunden
      signal: AbortSignal.timeout(8000)
    });
    
    if (!response.ok) {
      throw new Error(`Geocoding-Fehler: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Geocoding-Ergebnisse:', data);
    
    if (Array.isArray(data) && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        display_name: result.display_name
      };
    } else {
      console.warn('Keine Geocoding-Ergebnisse gefunden');
      throw new Error('Die angegebene Adresse konnte nicht gefunden werden. Bitte überprüfen Sie die Eingabe oder versuchen Sie es mit einem anderen Ort.');
    }
  } catch (error) {
    console.error('Geocoding-Fehler:', error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Die Adresssuche hat zu lange gedauert. Bitte versuchen Sie es erneut oder geben Sie einen anderen Ort ein.');
      }
      // Original-Fehlermeldung weitergeben
      throw error;
    }
    throw new Error('Fehler bei der Adresssuche.');
  }
}

// Funktion zum Erhalten der Benutzerposition mit besserer Fehlerbehandlung
export function getUserLocation(): Promise<{lat: number, lon: number}> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 0,
        message: 'Geolocation wird von diesem Browser nicht unterstützt. Bitte geben Sie Ihren Ort manuell ein.'
      });
      return;
    }
    
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        if (isValidCoordinate(lat, lon)) {
          console.log('Benutzerposition erfolgreich erhalten:', lat, lon);
          resolve({ lat, lon });
        } else {
          reject({
            code: 4,
            message: 'Ungültige Koordinaten vom Browser erhalten. Bitte geben Sie Ihren Standort manuell ein.'
          });
        }
      },
      (error) => {
        let message = 'Unbekannter Fehler bei der Standortbestimmung';
        
        switch (error.code) {
          case 1:
            message = 'Sie haben die Standortfreigabe verweigert. Bitte erlauben Sie den Zugriff auf Ihren Standort in den Browser-Einstellungen oder geben Sie einen Ort manuell ein.';
            break;
          case 2:
            message = 'Der Standort ist momentan nicht verfügbar. Bitte versuchen Sie es später erneut oder geben Sie einen Ort manuell ein.';
            break;
          case 3:
            message = 'Zeitüberschreitung bei der Standortbestimmung. Bitte versuchen Sie es erneut oder geben Sie einen Ort manuell ein.';
            break;
        }
        
        reject({
          code: error.code,
          message: message
        });
      },
      options
    );
  });
}

// Hilfsfunktionen für die Datenverarbeitung

// Funktion zum Ableiten der Wetterbedingung aus anderen Wetterdaten
function deriveWeatherCondition(data: BrightskyWeatherResponse['weather'][0]): string {
  if (data.temperature === null) return 'unknown';
  
  // Bedingung basierend auf verfügbaren Daten bestimmen
  if (data.precipitation !== null && data.precipitation > 0) {
    // Wenn es Niederschlag gibt
    if (data.temperature <= 0) return 'snow';
    if (data.temperature <= 3) return 'sleet';
    return 'rain';
  }
  
  if (data.cloud_cover !== null) {
    // Wolkenbedeckung basierte Bedingung
    if (data.cloud_cover >= 80) return 'cloudy';
    if (data.cloud_cover >= 30) return 'partly-cloudy-day';
    return 'clear-day';
  }
  
  // Fallback basierend auf Jahreszeit
  const month = new Date(data.timestamp).getMonth();
  return (month < 2 || month > 10) ? 'partly-cloudy-day' : 'clear-day';
}

// Funktion zum Schätzen der Bodentemperatur
function estimateSoilTemperature(temp: number, min_temp: number): number {
  // Grobe Schätzung: In der Regel ist die Bodentemperatur etwas niedriger als die Lufttemperatur
  return Math.round((temp * 0.7 + min_temp * 0.3) * 10) / 10;
}

// Mapping von Brightsky-Bedingungen zu unseren Bedingungen
function mapBrightskyCondition(condition: string): string {
  switch (condition.toLowerCase()) {
    case 'dry': return 'clear-day';
    case 'fog': return 'fog';
    case 'rain': return 'rain';
    case 'sleet': return 'sleet';
    case 'snow': return 'snow';
    case 'hail': return 'hail';
    case 'thunderstorm': return 'thunderstorm';
    case 'clear-day': return 'clear-day';
    case 'clear-night': return 'clear-night';
    case 'partly-cloudy-day': return 'partly-cloudy-day';
    case 'partly-cloudy-night': return 'partly-cloudy-night';
    case 'cloudy': return 'cloudy';
    default: return 'unknown';
  }
}

// Fallback-Vorhersage generieren, wenn die API fehlschlägt
function generateFallbackForecast(): WeatherObservation[] {
  const forecast = [];
  const now = new Date();
  const currentHour = now.getHours();
  
  // Aktuelle saisonale Temperaturen für Februar 2025
  const baseTemp = 9; // Aktuelle Temperatur für Februar 2025
  
  // Mehr Tage für Fallback-Vorhersage generieren (14 Tage)
  for (let i = 0; i < 336; i++) { // 14 Tage * 24 Stunden
    const forecastTime = new Date(now);
    forecastTime.setHours(currentHour + i);
    
    // Tagestemperatur-Kurve simulieren
    const hourOfDay = (currentHour + i) % 24;
    const isNight = hourOfDay < 6 || hourOfDay > 20;
    
    const tempVariation = hourOfDay > 8 && hourOfDay < 18 
      ? Math.sin(((hourOfDay - 8) / 10) * Math.PI) * 3 
      : (isNight ? -1.5 : 0); // Nachts kühler
    
    // Niederschlagswahrscheinlichkeit berechnen
    const rainChance = Math.random() < 0.3 ? 70 : 30;
    
    // Wetterbedingung bestimmen
    let condition;
    if (rainChance > 60) {
      condition = "rain";
    } else {
      condition = "partly-cloudy-day";
    }
    
    // Icon anpassen für konsistente Typen
    let finalIcon: string;
    
    if (condition === 'partly-cloudy-day' && isNight) {
      finalIcon = 'partly-cloudy-night';
    } else if (condition === 'clear-day' && isNight) {
      finalIcon = 'clear-night';
    } else {
      finalIcon = condition;
    }
    
    // Temperatur über mehrere Tage leicht schwanken lassen
    const dayOffset = Math.floor(i / 24);
    const dayVariation = Math.sin(dayOffset * 0.5) * 1.5; // +/- 1.5 Grad über mehrere Tage
    
    forecast.push({
      timestamp: forecastTime.toISOString(),
      source_id: 999, // Kennung für Fallback-Daten
      temperature: Math.round((baseTemp + tempVariation + dayVariation) * 10) / 10,
      condition: condition,
      icon: finalIcon,
      precipitation: rainChance > 50 ? 0.2 + Math.random() * 0.5 : 0,
      precipitation_probability: rainChance,
      relative_humidity: 70 + Math.random() * 15, // Hohe Luftfeuchtigkeit im Februar
      wind_speed: 8 + Math.random() * 10, // Typischer Wind im Februar
      cloud_cover: 40 + Math.random() * 40, // Teilweise bis stark bewölkt 
      soil_temperature: Math.round((baseTemp - 2 + tempVariation + dayVariation) * 10) / 10
    });
  }
  
  return forecast;
}

// Hilfsfunction für die Glättegefahr-Berechnung
export function calculateIceRisk(temperature: number, precipitation: number, humidity: number): {
  risk: 'low' | 'medium' | 'high';
  description: string;
} {
  // Verbesserte Logik für Glättegefahr
  if (temperature <= -2 && precipitation > 0) {
    return { 
      risk: 'high', 
      description: 'Hohe Glättegefahr durch Schnee oder gefrierenden Regen' 
    };
  } else if (temperature <= -3) {
    return { 
      risk: 'high', 
      description: 'Hohe Glättegefahr durch anhaltenden Frost' 
    };
  } else if (temperature <= 0 && humidity > 80) {
    return { 
      risk: 'medium', 
      description: 'Mittlere Glättegefahr durch mögliche Reifbildung bei hoher Luftfeuchtigkeit' 
    };
  } else if (temperature <= 0 && precipitation > 0) {
    return { 
      risk: 'medium', 
      description: 'Mittlere Glättegefahr durch mögliche überfrierende Nässe' 
    };
  } else if (temperature <= -2) {
    return { 
      risk: 'medium', 
      description: 'Mittlere Glättegefahr durch Minustemperaturen' 
    };
  } else if (temperature <= 0) {
    return { 
      risk: 'low', 
      description: 'Geringe Glättegefahr durch leichten Frost' 
    };
  } else {
    return { 
      risk: 'low', 
      description: 'Keine signifikante Glättegefahr' 
    };
  }
}

// Funktion für den optimalen Räumzeitpunkt
export function calculateOptimalCleaningTime(forecast: WeatherObservation[]): string {
  if (!forecast || forecast.length === 0) return "Keine Daten verfügbar";
  
  // Finde den optimalen Zeitpunkt basierend auf Temperatur und Niederschlag
  let optimalTime = forecast[0];
  let bestScore = -Infinity;
  
  for (const hour of forecast) {
    if (!hour.temperature) continue;
    
    // Score berechnen: Höhere Temperaturen und weniger Niederschlag sind besser
    const tempScore = hour.temperature > 0 ? hour.temperature * 2 : -5; // Temperaturen über 0 sind besser
    const precipScore = hour.precipitation ? -hour.precipitation * 10 : 0; // Weniger Niederschlag ist besser
    const currentScore = tempScore + precipScore;
    
    // Zeitfenster zwischen 6 und 20 Uhr bevorzugen (Tageslicht)
    const hourOfDay = new Date(hour.timestamp).getHours();
    const timeBonus = (hourOfDay >= 6 && hourOfDay <= 20) ? 5 : -5;
    
    if (currentScore + timeBonus > bestScore) {
      bestScore = currentScore + timeBonus;
      optimalTime = hour;
    }
  }
  
  const date = new Date(optimalTime.timestamp);
  return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

// Funktion zur Berechnung der benötigten Streumenge
export function calculateRequiredGrit(area: number, iceRisk: 'low' | 'medium' | 'high'): {
  salt: number;  // kg
  grit: number;  // kg
  description: string;
} {
  // Streumenge pro m² je nach Risikostufe
  const dosageMap = {
    low: 20,     // g/m²
    medium: 30,   // g/m²
    high: 40      // g/m²
  };
  
  const dosage = dosageMap[iceRisk];
  const saltAmount = Math.round((area * dosage) / 1000); // Umrechnung in kg
  const gritAmount = Math.round((area * dosage * 1.5) / 1000); // Mehr Grit als Salz benötigt
  
  let recommendation = "";
  
  if (iceRisk === 'high') {
    recommendation = "Bei hoher Glättegefahr empfehlen wir eine Kombination aus Salz und Splitt.";
  } else if (iceRisk === 'medium') {
    recommendation = "Bei mittlerer Glättegefahr ist umweltfreundlicher Splitt oder Granulat ausreichend.";
  } else {
    recommendation = "Bei geringer Glättegefahr reicht eine präventive, sparsame Streuung.";
  }
  
  return {
    salt: saltAmount,
    grit: gritAmount,
    description: recommendation
  };
}

// Funktion zur Schneefall-Vorhersage
export function predictSnowfall(forecast: WeatherObservation[], hours: number = 24): {
  willSnow: boolean;
  startTime?: string;
  endTime?: string;
  totalAmount: number;
} {
  if (!forecast || forecast.length === 0) {
    return { willSnow: false, totalAmount: 0 };
  }
  
  let willSnow = false;
  let snowStartTime = '';
  let snowEndTime = '';
  let totalSnowAmount = 0;
  let isSnowing = false;
  
  // Nur die nächsten 'hours' Stunden betrachten
  const relevantForecast = forecast.slice(0, hours);
  
  for (let i = 0; i < relevantForecast.length; i++) {
    const hour = relevantForecast[i];
    
    // Schneefall-Bedingungen: Temperatur <= 2°C und Niederschlag > 0
    const isSnowCondition = (hour.temperature !== undefined && hour.temperature <= 2) && 
                          (hour.precipitation !== undefined && hour.precipitation > 0);
    
    if (isSnowCondition && !isSnowing) {
      // Schneefall beginnt
      isSnowing = true;
      willSnow = true;
      snowStartTime = hour.timestamp;
    } else if (!isSnowCondition && isSnowing) {
      // Schneefall endet
      isSnowing = false;
      snowEndTime = hour.timestamp;
    }
    
    // Schneemenge berechnen
    if (isSnowCondition && hour.precipitation) {
      // Berechnung: 1mm Regen entspricht etwa 7-10mm Schnee je nach Temperatur
      const conversionFactor = hour.temperature && hour.temperature <= 0 ? 10 : 7;
      totalSnowAmount += (hour.precipitation * conversionFactor) / 10; // in cm
    }
  }
  
  // Falls es am Ende der Prognose noch schneit, Endzeit setzen
  if (isSnowing && relevantForecast.length > 0) {
    const lastHour = relevantForecast[relevantForecast.length - 1];
    snowEndTime = lastHour.timestamp;
  }
  
  return {
    willSnow,
    startTime: willSnow ? snowStartTime : undefined,
    endTime: willSnow ? snowEndTime : undefined,
    totalAmount: parseFloat(totalSnowAmount.toFixed(1))
  };
}
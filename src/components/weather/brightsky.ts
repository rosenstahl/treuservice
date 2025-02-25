// Schnittstelle für die Wetterdaten
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
  soil_temperature?: number; // Bodentemperatur
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
}

export interface CurrentWeatherParams {
  lat: number;
  lon: number;
}

// DWD API Basis-URLs
const DWD_API_BASE = 'https://dwd.api.proxy.bund.dev/v30';
const BRIGHTSKY_API_BASE = 'https://api.brightsky.dev';

// Typ für DWD-API Antworten
interface DwdStationResponse {
  [stationId: string]: {
    forecast1?: DwdForecastData;
    days?: Record<string, unknown>;
    sunshine?: number;
    [key: string]: unknown;
  };
}

interface DwdForecastData {
  temperature?: number;
  icon?: string;
  precipitation?: number;
  precipitationProbability?: number;
  humidity?: number;
  windSpeed?: number;
  cloudCover?: number;
  soilTemperature?: number;
  pressure?: number;
  [key: string]: unknown;
}

// Funktion zum Abrufen der nächsten Wetterstation
async function getNearestStation(lat: number, lon: number): Promise<string | null> {
  try {
    const url = `${DWD_API_BASE}/stationIDs?lat=${lat}&lon=${lon}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Fehler beim Abrufen der nächsten Wetterstation: ${response.status}`);
    }
    
    const data = await response.json() as string[];
    console.log('Nächste Wetterstation:', data);
    
    // Erste Station aus der Liste nehmen
    if (data && data.length > 0) {
      return data[0].toString();
    }
    
    return null;
  } catch (error) {
    console.error('Fehler bei der Suche nach der nächsten Wetterstation:', error);
    return null;
  }
}

// Funktion zum Abrufen der aktuellen Wetterdaten vom DWD
export async function getCurrentWeather({ lat, lon }: CurrentWeatherParams): Promise<WeatherObservation | null> {
  try {
    console.log(`API-Aufruf: getCurrentWeather für lat=${lat}, lon=${lon}`);
    
    // 1. Zuerst die nächste Wetterstation finden
    const stationId = await getNearestStation(lat, lon);
    
    if (!stationId) {
      console.warn('Keine Wetterstation in der Nähe gefunden, versuche Brightsky als Fallback');
      return fetchBrightskyCurrentWeather({ lat, lon });
    }
    
    // 2. Wetterdaten für diese Station abrufen
    const url = `${DWD_API_BASE}/stationOverviewExtended?stationIds=${stationId}`;
    console.log('DWD API Anfrage URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.warn(`DWD-API antwortet nicht (${response.status}), versuche Brightsky als Fallback`);
      return fetchBrightskyCurrentWeather({ lat, lon });
    }
    
    const data = await response.json() as DwdStationResponse;
    console.log('Erhaltene DWD-Wetterdaten:', data);
    
    // 3. Daten aufbereiten
    if (data && data[stationId]) {
      const stationData = data[stationId];
      return mapDwdToWeatherObservation(stationData);
    } else {
      console.warn('Keine gültigen Daten für die Station erhalten');
      return fetchBrightskyCurrentWeather({ lat, lon });
    }
  } catch (error) {
    console.error('DWD API Fehler:', error);
    
    // Versuche Brightsky als Fallback
    try {
      return await fetchBrightskyCurrentWeather({ lat, lon });
    } catch (fallbackError) {
      console.error('Beide APIs fehlgeschlagen:', fallbackError);
      return null; // Null zurückgeben, damit die UI entsprechend reagieren kann
    }
  }
}

// Hilfsfunktion für Brightsky als Fallback
async function fetchBrightskyCurrentWeather({ lat, lon }: CurrentWeatherParams): Promise<WeatherObservation | null> {
  const cacheBuster = Date.now();
  const url = `${BRIGHTSKY_API_BASE}/current_weather?lat=${lat}&lon=${lon}&_=${cacheBuster}`;
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Brightsky API Fehler: ${response.status}`);
  }
  
  const data: WeatherResponse = await response.json();
  console.log('Erhaltene Brightsky-Wetterdaten:', data);
  
  return data.weather[0] || null;
}

// Funktion zum Abrufen der Wettervorhersage
export async function getWeatherForecast({ lat, lon, date, last_date }: ForecastParams): Promise<WeatherObservation[]> {
  try {
    console.log(`API-Aufruf: getWeatherForecast für lat=${lat}, lon=${lon}`);
    
    // 1. Zuerst die nächste Wetterstation finden
    const stationId = await getNearestStation(lat, lon);
    
    if (!stationId) {
      console.warn('Keine Wetterstation in der Nähe gefunden, versuche Brightsky als Fallback');
      return fetchBrightskyForecast({ lat, lon, date, last_date });
    }
    
    // 2. Vorhersage für diese Station abrufen
    const url = `${DWD_API_BASE}/forecasts?stationIds=${stationId}`;
    console.log('DWD API Vorhersage URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.warn(`DWD-API Vorhersage nicht verfügbar (${response.status}), versuche Brightsky`);
      return fetchBrightskyForecast({ lat, lon, date, last_date });
    }
    
    const data = await response.json() as DwdStationResponse;
    console.log('Erhaltene DWD-Vorhersagedaten:', data);
    
    // 3. Daten aufbereiten
    if (data && data[stationId] && 'forecast' in data[stationId]) {
      const forecastData = data[stationId].forecast as unknown[];
      return mapDwdForecastToWeatherObservation(forecastData);
    } else {
      console.warn('Keine gültigen Vorhersagedaten für die Station erhalten');
      return fetchBrightskyForecast({ lat, lon, date, last_date });
    }
  } catch (error) {
    console.error('DWD API Vorhersage-Fehler:', error);
    
    // Brightsky als Fallback
    try {
      return await fetchBrightskyForecast({ lat, lon, date, last_date });
    } catch (fallbackError) {
      console.error('Beide APIs für Vorhersage fehlgeschlagen:', fallbackError);
      
      // Generiere eine einfache Fallback-Vorhersage
      return generateFallbackForecast();
    }
  }
}

// Hilfsfunktion für Brightsky-Vorhersage als Fallback
async function fetchBrightskyForecast({ lat, lon, date, last_date }: ForecastParams): Promise<WeatherObservation[]> {
  const cacheBuster = Date.now();
  let url = `${BRIGHTSKY_API_BASE}/weather?lat=${lat}&lon=${lon}&_=${cacheBuster}`;
  
  if (date) url += `&date=${date}`;
  if (last_date) url += `&last_date=${last_date}`;
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Brightsky API Vorhersage-Fehler: ${response.status}`);
  }
  
  const data: WeatherResponse = await response.json();
  console.log('Erhaltene Brightsky-Vorhersagedaten:', data);
  
  return data.weather || [];
}

// Mapper für DWD Daten auf unser WeatherObservation Interface
function mapDwdToWeatherObservation(dwdData: DwdStationResponse[string]): WeatherObservation {
  // Mapping basierend auf der tatsächlichen DWD API-Struktur
  const currentData = dwdData.forecast1 || {};
  // Wir verwenden das days-Objekt nicht direkt, aber es könnte in Zukunft nützlich sein
  // const days = dwdData.days || {};
  
  // Wetterbedingung extrahieren und mappen
  let condition = 'unknown';
  if (currentData.icon) {
    condition = mapDwdIconToCondition(currentData.icon);
  }
  
  return {
    timestamp: new Date().toISOString(),
    source_id: 2, // ID für DWD
    temperature: currentData.temperature !== undefined ? currentData.temperature : null,
    condition: condition,
    icon: currentData.icon || 'cloud',
    precipitation: currentData.precipitation || 0,
    precipitation_probability: currentData.precipitationProbability || 0,
    relative_humidity: currentData.humidity || 0,
    wind_speed: currentData.windSpeed || 0,
    cloud_cover: currentData.cloudCover || 0,
    soil_temperature: currentData.soilTemperature || null,
    sunshine: dwdData.sunshine, // Sonnenscheindauer
    pressure_msl: currentData.pressure || null
  };
}

// Mapper für DWD Vorhersage
function mapDwdForecastToWeatherObservation(forecastData: unknown[]): WeatherObservation[] {
  if (!Array.isArray(forecastData)) {
    return [];
  }
  
  return forecastData.map((item) => {
    const forecastItem = item as Record<string, unknown>;
    return {
      timestamp: (forecastItem.time as string) || new Date().toISOString(),
      source_id: 2,
      temperature: forecastItem.temperature as number,
      condition: mapDwdIconToCondition(forecastItem.icon as string || ''),
      icon: forecastItem.icon as string || 'cloud',
      precipitation: forecastItem.precipitation as number || 0,
      precipitation_probability: forecastItem.precipitationProbability as number || 0,
      relative_humidity: forecastItem.humidity as number || 0,
      wind_speed: forecastItem.windSpeed as number || 0,
      cloud_cover: forecastItem.cloudCover as number || 0,
      soil_temperature: forecastItem.soilTemperature as number || null
    };
  });
}

// Hilfsfunktion zur Übersetzung der DWD-Icons in Bedingungen
function mapDwdIconToCondition(dwdIcon: string): string {
  // Dieses Mapping basiert auf den DWD-Icon-Codes
  const iconMap: Record<string, string> = {
    'clear-day': 'clear-day',
    'clear-night': 'clear-night',
    'partly-cloudy-day': 'partly-cloudy-day',
    'partly-cloudy-night': 'partly-cloudy-night',
    'cloudy': 'cloudy',
    'fog': 'fog',
    'wind': 'wind',
    'rain': 'rain',
    'sleet': 'sleet',
    'snow': 'snow',
    'hail': 'hail',
    'thunderstorm': 'thunderstorm',
    'windy': 'wind',
    // Weitere bekannte DWD-Icons
    '1': 'clear-day', // Sonnig/klar
    '2': 'partly-cloudy-day', // Leicht bewölkt
    '3': 'cloudy', // Bewölkt
    '4': 'cloudy', // Bedeckt
    '5': 'fog', // Nebel
    '6': 'fog', // Nebel mit Reifbildung
    '7': 'rain', // Leichter Regen
    '8': 'rain', // Regen
    '9': 'rain', // Starker Regen
    '10': 'sleet', // Schneeregen
    '11': 'snow', // Leichter Schneefall
    '12': 'snow', // Schneefall
    '13': 'snow', // Starker Schneefall
    '14': 'thunderstorm', // Gewitter
    '15': 'thunderstorm', // Starkes Gewitter
    '16': 'thunderstorm', // Gewitter mit Hagel
    '17': 'hail', // Hagel
    '18': 'sleet', // Schneeregen
    '19': 'thunderstorm', // Gewitter
    '20': 'cloudy', // Wolken
    '21': 'rain', // Regen
    '22': 'snow', // Schnee
    '23': 'sleet', // Schneeregen
    '24': 'rain', // Schauer
    '25': 'hail', // Graupel
    '26': 'fog', // Nebel
    '27': 'partly-cloudy-day', // Wechselnd bewölkt
    '28': 'partly-cloudy-night', // Wechselnd bewölkt (Nacht)
    '29': 'clear-night', // Klar (Nacht)
    '30': 'rain', // Regen (Nacht)
    '31': 'snow', // Schnee (Nacht)
  };
  
  return iconMap[dwdIcon] || 'unknown';
}

// Fallback-Vorhersage generieren, wenn beide APIs fehlschlagen
function generateFallbackForecast(): WeatherObservation[] {
  const forecast = [];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMonth = now.getMonth();
  
  // Basierend auf Monat und Tageszeit realistische Temperaturen generieren
  const isWinter = currentMonth < 2 || currentMonth > 10;
  const baseTemp = isWinter ? 2 : 15; // Basis-Temperatur je nach Jahreszeit
  
  for (let i = 0; i < 24; i++) {
    const forecastTime = new Date(now);
    forecastTime.setHours(currentHour + i);
    
    // Tagestemperatur-Kurve simulieren
    const hourOfDay = (currentHour + i) % 24;
    const tempVariation = hourOfDay > 8 && hourOfDay < 18 
      ? Math.sin(((hourOfDay - 8) / 10) * Math.PI) * (isWinter ? 4 : 8) 
      : 0;
    
    // Niederschlagswahrscheinlichkeit berechnen
    const rainChance = isWinter ? (Math.random() < 0.3 ? 40 : 10) : (Math.random() < 0.2 ? 30 : 5);
    
    forecast.push({
      timestamp: forecastTime.toISOString(),
      source_id: 999, // Kennung für Fallback-Daten
      temperature: Math.round((baseTemp + tempVariation) * 10) / 10,
      condition: isWinter ? (rainChance > 30 ? "snow" : "cloudy") : (rainChance > 20 ? "rain" : "partly-cloudy-day"),
      icon: isWinter ? (rainChance > 30 ? "snow" : "cloudy") : (rainChance > 20 ? "rain" : "partly-cloudy-day"),
      precipitation: rainChance > 20 ? Math.random() * 0.5 : 0,
      precipitation_probability: rainChance,
      relative_humidity: 50 + Math.random() * 30,
      wind_speed: 5 + Math.random() * 10,
      cloud_cover: 30 + Math.random() * 50,
      soil_temperature: Math.round((baseTemp - 2 + Math.random()) * 10) / 10
    });
  }
  
  return forecast;
}

// Hilfsfunction für die Glättegefahr-Berechnung
export function calculateIceRisk(temperature: number, precipitation: number, humidity: number): {
  risk: 'low' | 'medium' | 'high';
  description: string;
} {
  if (temperature <= 0 && precipitation > 0) {
    return { 
      risk: 'high', 
      description: 'Hohe Glättegefahr durch Schnee oder gefrierenden Regen' 
    };
  } else if (temperature <= 3 && humidity > 70) {
    return { 
      risk: 'medium', 
      description: 'Mittlere Glättegefahr durch mögliche Reifbildung' 
    };
  } else if (temperature <= 1) {
    return { 
      risk: 'medium', 
      description: 'Mittlere Glättegefahr durch niedrige Temperaturen' 
    };
  } else {
    return { 
      risk: 'low', 
      description: 'Geringe Glättegefahr' 
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
      snowStartTime = new Date(hour.timestamp).toLocaleString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit'
      });
    } else if (!isSnowCondition && isSnowing) {
      // Schneefall endet
      isSnowing = false;
      snowEndTime = new Date(hour.timestamp).toLocaleString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit'
      });
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
    snowEndTime = new Date(lastHour.timestamp).toLocaleString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    });
  }
  
  return {
    willSnow,
    startTime: willSnow ? snowStartTime : undefined,
    endTime: willSnow ? snowEndTime : undefined,
    totalAmount: parseFloat(totalSnowAmount.toFixed(1))
  };
}
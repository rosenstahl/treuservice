/**
 * weatherDataProcessors.ts
 * 
 * Vereinfachte Verarbeitung der Brightsky API-Daten ohne unnötige Transformationen.
 * Nutzt die API-Daten direkt, wo möglich.
 */

import { CurrentWeatherResponse, WeatherResponse } from './brightsky-api';

/**
 * Verarbeitete aktuelle Wetterdaten
 */
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
  timestamp: Date;
  updateTime: Date;
}

/**
 * Vereinfachte stündliche Vorhersagedaten - direkt aus der API
 */
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

/**
 * Verarbeitete tägliche Vorhersagedaten - abgeleitet aus stündlichen Daten
 */
export interface DailyForecast {
  date: Date;
  maxTemp: number;
  minTemp: number;
  condition: string;
  conditionDE: string;
  icon: string;
  precipitation: number;
  precipitationProbability: number;
}

/**
 * Kompletter verarbeiteter Wetterdatensatz
 */
export interface ProcessedWeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
}

/**
 * Einfache Formatierungsfunktionen für Temperatur und Dezimalwerte
 */
export const formatTemperature = (temp: number | null | undefined): string => {
  if (temp == null) return "–"; // Gedankenstrich für fehlende Werte
  return Math.round(temp).toString();
};

export const formatDecimal = (value: number | null | undefined, precision = 1): string => {
  if (value == null) return "–";
  return value.toFixed(precision);
};

// In weatherDataProcessors.ts
const WEATHER_CONDITIONS: Record<string, string> = {
  'clear-day': 'Klar',
  'clear-night': 'Klar', // Wird als "Unbekannt" angezeigt, sollte 'Klar' oder 'Klar (Nacht)' sein
  'partly-cloudy-day': 'Teilweise bewölkt',
  'partly-cloudy-night': 'Teilweise bewölkt',
  'cloudy': 'Bewölkt',
  'fog': 'Nebel',
  'wind': 'Windig',
  'rain': 'Regen',
  'sleet': 'Schneeregen',
  'snow': 'Schnee',
  'hail': 'Hagel',
  'thunderstorm': 'Gewitter',
  'dry': 'Trocken',
  'unknown': 'Unbekannt'
};
export function translateCondition(condition: string | null | undefined): string {
  if (!condition) return 'Unbekannt';
  
  const normalizedCondition = condition.toLowerCase();
  
  // Debug-Ausgabe
  console.log(`Übersetze Wetterbedingung: ${normalizedCondition}`);
  console.log(`Wörterbucheintrag: ${WEATHER_CONDITIONS[normalizedCondition]}`);
  
  return WEATHER_CONDITIONS[normalizedCondition] || condition;
}
/**
 * Berechnet die gefühlte Temperatur basierend auf Temperatur, Wind und Luftfeuchtigkeit
 */
export function calculateFeelsLike(temperature: number, windSpeed: number, humidity: number): number {
  // Wind-Chill-Effekt bei Kälte
  if (temperature <= 10 && windSpeed > 0) {
    return Math.round((temperature - (windSpeed * 0.5)) * 10) / 10;
  } 
  // Wärmeindex bei Hitze und hoher Luftfeuchtigkeit
  else if (temperature > 20 && humidity > 60) {
    return Math.round((temperature + (humidity - 60) / 5) * 10) / 10;
  }
  
  // Bei moderaten Bedingungen keine Anpassung
  return temperature;
}

/**
 * Verbesserte Funktion zur Ermittlung des repräsentativsten Wetters für einen Tag
 * Berücksichtigt Prioritäten von Wetterereignissen und Tageszeiten
 */
export function getBestDailyWeather(hourlyData: HourlyForecast[], useIcon = false): string {
  if (!hourlyData?.length) return 'unknown';
  
  // Prioritäten für Wetterereignisse (höhere Zahlen = wichtiger)
  const priorities: Record<string, number> = {
    'thunderstorm': 5,
    'snow': 4,
    'rain': 3,
    'sleet': 3,
    'hail': 3,
    'fog': 2,
    'cloudy': 1,
    'partly-cloudy-day': 1,
    'clear-day': 0
  };
  
  // Tagesstunden mehr gewichten (8-18 Uhr)
  const dayHours = hourlyData.filter(item => {
    const hour = new Date(item.time).getHours();
    return hour >= 8 && hour <= 18;
  });
  
  // Wenn keine Daten für Tagesstunden, dann alle verwenden
  const dataToUse = dayHours.length > 0 ? dayHours : hourlyData;
  
  // Wenn extreme Wetterereignisse vorhanden, diese nehmen
  for (const key of Object.keys(priorities).sort((a, b) => priorities[b] - priorities[a])) {
    // Überprüfen, ob ein Wetterereignis mit dieser Priorität vorkommt
    const matchingItem = dataToUse.find(item => {
      const value = useIcon ? (item.icon || item.condition) : item.condition;
      return value && value.toLowerCase().includes(key);
    });
    
    if (matchingItem) {
      return useIcon 
        ? (matchingItem.icon || matchingItem.condition) 
        : matchingItem.condition;
    }
  }
  
  // Sonst das häufigste Wetter
  const values = dataToUse.map(item => 
    useIcon ? (item.icon || item.condition) : item.condition
  ).filter(Boolean);
  
  return findMostCommon(values) || 'unknown';
}

/**
 * Findet das häufigste Element in einem Array
 */
function findMostCommon<T>(items: T[]): T {
  if (items.length === 0) return 'unknown' as unknown as T;
  
  const counts = new Map<T, number>();
  let maxItem = items[0];
  let maxCount = 0;
  
  for (const item of items) {
    const count = (counts.get(item) || 0) + 1;
    counts.set(item, count);
    
    if (count > maxCount) {
      maxCount = count;
      maxItem = item;
    }
  }
  
  return maxItem;
}

/**
 * Hauptfunktion zur Verarbeitung der Wetterdaten von der Brightsky API.
 * Vereinfachte Version, die API-Daten direkt nutzt, wo möglich.
 */
export function processWeatherData(
  currentResponse: CurrentWeatherResponse, 
  forecastResponse: WeatherResponse
): ProcessedWeatherData | null {
  try {
    // Aktuelle Zeit
    const now = new Date();
    
    // Sicherheitscheck
    if (!currentResponse?.weather || !forecastResponse?.weather) {
      console.warn('Unvollständige API-Antworten');
      return null;
    }
    
    // Aktuelle Wetterdaten verarbeiten (EIN Objekt, kein Array)
    const currentWeather = processCurrentWeather(currentResponse.weather, now);
    
    // Stündliche Daten verarbeiten (Array von Objekten)
    const hourlyForecasts = processHourlyForecast(forecastResponse.weather);
    
    // Tägliche Daten ableiten (gruppiert nach Tagen)
    const dailyForecasts = processDailyForecast(forecastResponse.weather);
    
    return {
      current: currentWeather,
      hourly: hourlyForecasts,
      daily: dailyForecasts
    };
  } catch (error) {
    console.error('Fehler bei der Verarbeitung der Wetterdaten:', error);
    return null;
  }
}

/**
 * Verarbeitet aktuelle Wetterdaten vom /current_weather Endpunkt
 */
function processCurrentWeather(currentWeather: CurrentWeatherResponse['weather'], now: Date): CurrentWeather {
  // Korrekte Extraktion der Werte aus dem current_weather Endpunkt
  const temperature = currentWeather.temperature ?? 0;
  const humidity = currentWeather.relative_humidity ?? 0;
  
  // Wichtig: Bei current_weather die _10 Varianten verwenden (diese existieren wirklich)
  const windSpeed = currentWeather.wind_speed_10 ?? 0;
  const precipitation = currentWeather.precipitation_10 ?? 0;
  
  const cloudCover = currentWeather.cloud_cover ?? 0;
  const condition = currentWeather.condition ?? 'unknown';
  const icon = currentWeather.icon ?? condition;
  
  // current_weather hat keine precipitation_probability
  const precipitationProbability = 0;
  
  // Berechnung der gefühlten Temperatur
  const feelsLike = calculateFeelsLike(temperature, windSpeed, humidity);
  
  return {
    temperature,
    feelsLike,
    condition,
    conditionDE: translateCondition(condition),
    icon,
    humidity,
    windSpeed,
    precipitation,
    precipitationProbability,
    cloudCover,
    timestamp: new Date(currentWeather.timestamp),
    updateTime: now
  };
}

/**
 * Verarbeitet stündliche Vorhersagedaten vom /weather Endpunkt
 * Zeigt jede 3 Stunde statt jeder Stunde an
 */
function processHourlyForecast(forecastItems: WeatherResponse['weather']): HourlyForecast[] {
  // Aktuelle Zeit
  const now = new Date();
  
  // Nur zukünftige Stunden filtern (keine vergangenen Stunden anzeigen)
  const filteredForecasts = forecastItems
    .filter(item => item && item.timestamp && new Date(item.timestamp) > now)
    .slice(0, 24) // Maximal 24 Stunden Daten behalten
    .map(item => ({
      time: new Date(item.timestamp),
      temperature: item.temperature ?? 0,
      condition: item.condition ?? 'unknown',
      conditionDE: translateCondition(item.condition),
      icon: item.icon ?? item.condition ?? 'unknown',
      precipitation: item.precipitation ?? 0,
      precipitationProbability: item.precipitation_probability ?? 0,
      humidity: item.relative_humidity ?? 0,
      windSpeed: item.wind_speed ?? 0
    }));
  
  // Jede 3. Stunde auswählen
  return filteredForecasts.filter((_, index) => index % 3 === 0);
}

/**
 * Verarbeitet tägliche Vorhersagedaten
 * Nur zukünftige Tage anzeigen und Tageszeit-Daten bevorzugen (statt Abenddaten)
 */
function processDailyForecast(forecastItems: WeatherResponse['weather']): DailyForecast[] {
  // Nach Tagen gruppieren
  const days = new Map<string, WeatherResponse['weather']>();
  
  // Heutiges Datum und morgiges Datum für Filterung berechnen
  const today = new Date();
  // Morgiges Datum berechnen
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  
  // Gruppieren nach Tag (YYYY-MM-DD)
  forecastItems.forEach(item => {
    if (!item || !item.timestamp) return;
    
    const date = new Date(item.timestamp);
    const dateStr = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    
    // NUR zukünftige Tage berücksichtigen (ab morgen)
    if (dateStr < tomorrowStr) return; // Ignoriere alle Tage vor morgen
    
    if (!days.has(dateStr)) {
      days.set(dateStr, []);
    }
    
    days.get(dateStr)!.push(item);
  });
  
  // Tägliche Daten verarbeiten
  const dailyForecasts: DailyForecast[] = [];
  
  days.forEach((items, dateStr) => {
    // Temperaturen für Min/Max
    const temperatures = items
      .map(item => item.temperature)
      .filter((t): t is number => t != null);
    
    if (temperatures.length === 0) return;
    
    // Stündliche Daten umwandeln zum Format, das getBestDailyWeather versteht
    const hourlyFormat: HourlyForecast[] = items.map(item => ({
      time: new Date(item.timestamp),
      temperature: item.temperature ?? 0,
      condition: item.condition ?? 'unknown',
      conditionDE: translateCondition(item.condition),
      icon: item.icon ?? item.condition ?? 'unknown',
      precipitation: item.precipitation ?? 0,
      precipitationProbability: item.precipitation_probability ?? 0,
      humidity: item.relative_humidity ?? 0,
      windSpeed: item.wind_speed ?? 0
    }));
    
    // Tagesdaten (8-18 Uhr) - für die Wetterbedingungen bevorzugen
    const dayHours = hourlyFormat.filter(item => {
      const hour = new Date(item.time).getHours();
      return hour >= 8 && hour <= 18;
    });
    
    // Verwende Tagesdaten für die Bedingungen, wenn verfügbar
    const dataToUse = dayHours.length > 0 ? dayHours : hourlyFormat;
    
    // Verwende die neue Funktion für bessere Wetterbedingung/Icon-Auswahl
    const condition = getBestDailyWeather(dataToUse);
    const icon = getBestDailyWeather(dataToUse, true);
    
    // Niederschlag und Wahrscheinlichkeit
    const precipValues = items
      .map(item => item.precipitation)
      .filter((p): p is number => p != null);
    
    const precipProbValues = items
      .map(item => item.precipitation_probability)
      .filter((p): p is number => p != null);
    
    // Aggregierte Werte
    const totalPrecip = precipValues.reduce((sum, val) => sum + val, 0);
    const avgPrecipProb = precipProbValues.length > 0
      ? Math.round(precipProbValues.reduce((sum, val) => sum + val, 0) / precipProbValues.length)
      : 0;
    
    dailyForecasts.push({
      date: new Date(dateStr),
      maxTemp: Math.max(...temperatures),
      minTemp: Math.min(...temperatures),
      condition,
      conditionDE: translateCondition(condition),
      icon,
      precipitation: totalPrecip,
      precipitationProbability: avgPrecipProb
    });
  });
  
  // Nach Datum sortieren
  return dailyForecasts.sort((a, b) => a.date.getTime() - b.date.getTime());
}
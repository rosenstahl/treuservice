/**
 * weatherDataProcessors.ts
 * 
 * Diese Datei enthält vereinfachte Funktionen zur direkten Umwandlung der Brightsky-Daten
 * in interne Formate ohne zusätzliche Behandlung fehlender Daten.
 */

import { 
  BrightskyWeatherItem,
  BrightskyApiResponse
} from '../brightsky-api';
import { 
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
  IceRisk
} from '../WeatherContext';
import { findMostCommon, translateWeatherCondition, WinterServiceStatus,  } from './utils';

/**
 * Verarbeitet die aktuellen Wetterdaten ohne Null-Checks
 */
export function processCurrentWeather(currentItem: BrightskyWeatherItem): CurrentWeather {
  const now = new Date();
  
  // Da wir annehmen, dass Brightsky vollständige Daten liefert, 
  // nutzen wir die Werte direkt ohne Fallbacks
  return {
    temperature: currentItem.temperature!,
    feelsLike: calculateFeelsLike(
      currentItem.temperature!,
      currentItem.wind_speed!,
      currentItem.relative_humidity!
    ),
    condition: currentItem.condition || 'unknown',
    conditionDE: translateWeatherCondition(currentItem.condition || 'unknown'),
    icon: currentItem.icon || currentItem.condition || 'unknown',
    humidity: currentItem.relative_humidity!,
    windSpeed: currentItem.wind_speed!,
    precipitation: currentItem.precipitation!,
    precipitationProbability: currentItem.precipitation_probability!,
    cloudCover: currentItem.cloud_cover!,
    soilTemperature: currentItem.temperature! - 2, // Einfache Approximation
    timestamp: new Date(currentItem.timestamp),
    updateTime: now
  };
}

/**
 * Vereinfachte Berechnung der gefühlten Temperatur
 */
function calculateFeelsLike(temperature: number, windSpeed: number, humidity: number): number {
  let feelsLike = temperature;
  
  // Wind-Chill-Effekt bei niedrigen Temperaturen
  if (temperature < 10 && windSpeed > 5) {
    feelsLike -= (windSpeed * 0.15);
  }
  
  // Hitzefaktor bei hohen Temperaturen und Luftfeuchtigkeit
  if (temperature > 20 && humidity > 60) {
    feelsLike += (humidity - 60) * 0.1;
  }
  
  return Math.round(feelsLike * 10) / 10;
}

/**
 * Verarbeitet die stündliche Wettervorhersage ohne Null-Checks
 */
export function processHourlyForecast(weatherItems: BrightskyWeatherItem[]): HourlyForecast[] {
  const now = new Date();
  
  // Nur zukünftige Stunden und maximal 24 Stunden
  return weatherItems
    .filter(item => new Date(item.timestamp) > now)
    .slice(0, 24)
    .map((item) => ({
      time: new Date(item.timestamp),
      temperature: item.temperature!,
      condition: item.condition || 'unknown',
      conditionDE: translateWeatherCondition(item.condition || 'unknown'),
      icon: item.icon || item.condition || 'unknown',
      precipitation: item.precipitation!,
      precipitationProbability: item.precipitation_probability!,
      humidity: item.relative_humidity!,
      windSpeed: item.wind_speed!
    }));
}

/**
 * Gruppiert Wetterdaten nach Tagen 
 */
export function groupWeatherItemsByDay(weatherItems: BrightskyWeatherItem[]): Map<string, BrightskyWeatherItem[]> {
  const dailyMap = new Map<string, BrightskyWeatherItem[]>();
  
  for (const item of weatherItems) {
    const date = new Date(item.timestamp).toISOString().split('T')[0];
    
    if (!dailyMap.has(date)) {
      dailyMap.set(date, []);
    }
    
    dailyMap.get(date)!.push(item);
  }
  
  return dailyMap;
}

/**
 * Berechnet die tägliche Wettervorhersage
 */
export function processDailyForecast(weatherItems: BrightskyWeatherItem[]): DailyForecast[] {
  // Gruppiere nach Tagen
  const dailyMap = groupWeatherItemsByDay(weatherItems);
  const daily: DailyForecast[] = [];
  
  // Verarbeite jeden Tag
  Array.from(dailyMap.entries()).forEach(([dateStr, items]) => {
    // Temperatur-Daten direkt verwenden
    const temps = items.map(item => item.temperature!);
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    
// Häufigste Wetterbedingung und Icons finden
const conditions = items.map(item => item.condition || 'unknown');
const mostCommonCondition = findMostCommon(conditions) || 'unknown';

const icons = items.map(item => item.icon || item.condition || 'unknown');
const mostCommonIcon = findMostCommon(icons) || 'unknown';    
    // Berechne Durchschnittswerte für Niederschlag
    const precipProbs = items.map(item => item.precipitation_probability!);
    const avgPrecipProb = precipProbs.reduce((sum, val) => sum + val, 0) / precipProbs.length;
    const totalPrecip = items.reduce((sum, item) => sum + item.precipitation!, 0);
    
    // Schneemenge berechnen (vereinfacht)
    let snowAmount = 0;
    if (Math.min(...temps) <= 2 && totalPrecip > 0) {
      const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
      const factor = avgTemp <= 0 ? 10 : 7;
      snowAmount = (totalPrecip * factor) / 10; // in cm
    }
    
    daily.push({
      date: new Date(dateStr),
      maxTemp,
      minTemp,
      condition: mostCommonCondition,
      conditionDE: translateWeatherCondition(mostCommonCondition),
      icon: mostCommonIcon,
      precipitation: totalPrecip,
      precipitationProbability: Math.round(avgPrecipProb),
      snowAmount: Math.round(snowAmount * 10) / 10
    });
  });
  
  // Sortiere nach Datum
  return daily.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Hauptfunktion zur Verarbeitung aller Wetterdaten
 * Verwendet DWD-Warnungen für Glätterisiko, daher keine eigene Berechnung mehr
 */
export function processWeatherData(data: BrightskyApiResponse) {
  // Nach Zeitstempel sortieren für konsistente Verarbeitung
  const sortedItems = [...data.weather].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  // Verarbeite die verschiedenen Datentypen
  const current = processCurrentWeather(sortedItems[0]);
  const hourly = processHourlyForecast(sortedItems);
  const daily = processDailyForecast(sortedItems).slice(0, 7); // Nur 7 Tage
  
  // Standard-Werte für Glätterisiko und Winterdienststatus
  // Diese werden später in WeatherContext.tsx durch DWD-Warnungen überschrieben
  const iceRisk: IceRisk = {
    risk: 'low',
    description: 'Keine aktuellen Glättewarnungen vom DWD.'
  };
  
  // Standardmäßig kein Winterdienst erforderlich (wird durch DWD-Daten aktualisiert)
  const winterServiceStatus = WinterServiceStatus.NOT_REQUIRED;
  
  return {
    current,
    hourly,
    daily,
    iceRisk,
    winterServiceStatus,
    dwdWarning: null // Wird später im WeatherContext mit tatsächlicher Warnung überschrieben
  };
}
/**
 * weatherDataProcessors.ts
 * 
 * Diese Datei enthält Funktionen zur Verarbeitung der Brightsky-Daten
 * in interne Formate mit robuster Fehlerbehandlung und Fallbackmechanismen.
 */

import { 
  BrightskyWeatherItem,
  BrightskyApiResponse
} from './brightsky-api';
import { 
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
} from './WeatherContext';
import { findMostCommon, translateWeatherCondition, WinterServiceStatus } from './utils';

/**
 * Findet den aktuellsten Wetterdatensatz aus einer Liste von Daten
 */
export function findCurrentWeatherItem(items: BrightskyWeatherItem[]): BrightskyWeatherItem | null {
  if (!items || items.length === 0) {
    console.error('Keine Wetterdaten gefunden');
    return null;
  }

  const now = new Date();
  console.log(`Suche aktuellsten Wetterdatensatz für Zeit: ${now.toISOString()}`);
  
  // Konvertiere Zeitstempel in Datum-Objekte und berechne die Differenz zur aktuellen Zeit
  const itemsWithTimeDiff = items.map(item => {
    const timestamp = new Date(item.timestamp);
    return {
      item,
      timestamp,
      diffMs: Math.abs(timestamp.getTime() - now.getTime())
    };
  });

  // Sortiere nach geringster Zeitdifferenz
  itemsWithTimeDiff.sort((a, b) => a.diffMs - b.diffMs);
  
  // Wähle den zeitlich nächsten Datensatz
  const closest = itemsWithTimeDiff[0];
  console.log(`Aktuellster Datensatz gefunden: ${closest.timestamp.toISOString()}, Differenz: ${closest.diffMs / (60 * 1000)} Minuten`);
  
  return closest.item;
}

/**
 * Extrahiert sichere Werte aus Wetterdaten mit Fallbacks für fehlende Daten
 */
function getSafeWeatherValue<T>(value: T | null, fallback: T): T {
  return value !== null ? value : fallback;
}

/**
 * Verarbeitet die aktuellen Wetterdaten mit robuster Fehlerbehandlung
 */
export function processCurrentWeather(weatherItems: BrightskyWeatherItem[]): CurrentWeather {
  const now = new Date();
  
  // Finde den aktuellsten Datensatz
  const currentItem = findCurrentWeatherItem(weatherItems);
  
  if (!currentItem) {
    // Notfall-Fallback, wenn kein Datensatz gefunden wird
    console.error('Kein aktueller Wetterdatensatz gefunden, verwende Ersatzwerte');
    
    return {
      temperature: 0,
      feelsLike: 0,
      condition: 'unknown',
      conditionDE: 'Keine Daten',
      icon: 'unknown',
      humidity: 0,
      windSpeed: 0,
      precipitation: 0,
      precipitationProbability: 0,
      cloudCover: 0,
      soilTemperature: 0,
      timestamp: now,
      updateTime: now
    };
  }
  
  // Extrahiere Werte mit Fallbacks für null
  const temperature = getSafeWeatherValue(currentItem.temperature, 0);
  const humidity = getSafeWeatherValue(currentItem.relative_humidity, 0);
  const windSpeed = getSafeWeatherValue(currentItem.wind_speed, 0);
  const precipitation = getSafeWeatherValue(currentItem.precipitation, 0);
  const precipitationProbability = getSafeWeatherValue(currentItem.precipitation_probability, 0);
  const cloudCover = getSafeWeatherValue(currentItem.cloud_cover, 0);
  const condition = currentItem.condition || 'unknown';
  
  console.log(`Aktuelle Wetterdaten: ${temperature}°C, ${condition}`);
  
  // Berechne die gefühlte Temperatur
  const feelsLike = calculateFeelsLike(temperature, windSpeed, humidity);
  
  return {
    temperature,
    feelsLike,
    condition,
    conditionDE: translateWeatherCondition(condition),
    icon: currentItem.icon || condition || 'unknown',
    humidity,
    windSpeed,
    precipitation,
    precipitationProbability,
    cloudCover,
    soilTemperature: temperature - 2, // Einfache Approximation
    timestamp: new Date(currentItem.timestamp),
    updateTime: now
  };
}

/**
 * Berechnet die gefühlte Temperatur basierend auf wissenschaftlichen Formeln
 * @param temperature Lufttemperatur in °C
 * @param windSpeed Windgeschwindigkeit in m/s
 * @param humidity Relative Luftfeuchtigkeit in %
 * @returns Gefühlte Temperatur in °C
 */
function calculateFeelsLike(temperature: number, windSpeed: number, humidity: number): number {
  // Sicherstellen, dass wir keine ungültigen Werte verarbeiten
  if (isNaN(temperature) || isNaN(windSpeed) || isNaN(humidity)) {
    return temperature;
  }
  
  // Wind-Chill-Formel für kalte Temperaturen (≤ 10°C)
  if (temperature <= 10 && windSpeed > 1.39) { // 1.39 m/s = 5 km/h
    // Umrechnung der Windgeschwindigkeit von m/s in km/h
    const windKmh = windSpeed * 3.6;
    const windChill = 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windKmh, 0.16) + 
           0.3965 * temperature * Math.pow(windKmh, 0.16);
    
    return Math.round(windChill * 10) / 10;
  }
  
  // Hitzeindex für warme Temperaturen (> 20°C)
  if (temperature > 20 && humidity > 40) {
    // Vereinfachte Hitzeindex-Formel vom US National Weather Service
    const heatIndex = -8.784695 + 1.61139411 * temperature + 2.338549 * (humidity/100)
           - 0.14611605 * temperature * (humidity/100) - 0.012308094 * Math.pow(temperature, 2)
           - 0.016424828 * Math.pow(humidity/100, 2)
           + 0.002211732 * Math.pow(temperature, 2) * (humidity/100)
           + 0.00072546 * temperature * Math.pow(humidity/100, 2);
    
    return Math.round(heatIndex * 10) / 10;
  }
  
  // Bei Temperaturen im Bereich 10-20°C, einfach die Originaltemperatur zurückgeben
  return temperature;
}

/**
 * Verarbeitet die stündliche Wettervorhersage mit Fehlerbehandlung
 */
export function processHourlyForecast(weatherItems: BrightskyWeatherItem[]): HourlyForecast[] {
  const now = new Date();
  
  // Nur zukünftige Stunden und maximal 24 Stunden
  const futureItems = weatherItems.filter(item => {
    try {
      const itemTime = new Date(item.timestamp);
      return itemTime > now;
    } catch (/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      parseError
    ) {
      console.warn(`Fehlerhafte Zeitangabe: ${item.timestamp}`);
      return false;
    }
  });
  
  console.log(`${futureItems.length} zukünftige Stunden-Vorhersagen gefunden`);
  
  // Sortieren nach Zeit und auf 24 Stunden begrenzen
  futureItems.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  const items = futureItems.slice(0, 24);
  
  // Verarbeiten mit sicheren Werten
  return items.map((item) => {
    const itemTime = new Date(item.timestamp);
    
    // Debug-Log für jede Stunde
    console.log(`Stunden-Vorhersage für ${itemTime.toISOString()}: ${getSafeWeatherValue(item.temperature, 0)}°C`);
    
    return {
      time: itemTime,
      temperature: getSafeWeatherValue(item.temperature, 0),
      condition: item.condition || 'unknown',
      conditionDE: translateWeatherCondition(item.condition || 'unknown'),
      icon: item.icon || item.condition || 'unknown',
      precipitation: getSafeWeatherValue(item.precipitation, 0),
      precipitationProbability: getSafeWeatherValue(item.precipitation_probability, 0),
      humidity: getSafeWeatherValue(item.relative_humidity, 0),
      windSpeed: getSafeWeatherValue(item.wind_speed, 0)
    };
  });
}

/**
 * Gruppiert Wetterdaten nach Tagen 
 */
export function groupWeatherItemsByDay(weatherItems: BrightskyWeatherItem[]): Map<string, BrightskyWeatherItem[]> {
  const dailyMap = new Map<string, BrightskyWeatherItem[]>();
  
  for (const item of weatherItems) {
    try {
      const date = new Date(item.timestamp).toISOString().split('T')[0];
      
      if (!dailyMap.has(date)) {
        dailyMap.set(date, []);
      }
      
      dailyMap.get(date)!.push(item);
    } catch (/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
      parseError
    ) {
      console.warn(`Fehlerhafte Zeitangabe: ${item.timestamp}`);
    }
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
  
  console.log(`Tägliche Vorhersage für ${dailyMap.size} Tage`);
  
  // Verarbeite jeden Tag
  Array.from(dailyMap.entries()).forEach(([dateStr, items]) => {
    try {
      // Temperatur-Daten mit Fallbacks
      const temps = items.map(item => getSafeWeatherValue(item.temperature, 0));
      const maxTemp = Math.max(...temps);
      const minTemp = Math.min(...temps);
      
      // Häufigste Wetterbedingung und Icons finden
      const conditions = items.map(item => item.condition || 'unknown');
      const mostCommonCondition = findMostCommon(conditions) || 'unknown';

      const icons = items.map(item => item.icon || item.condition || 'unknown');
      const mostCommonIcon = findMostCommon(icons) || 'unknown';
      
      // Berechne Durchschnittswerte für Niederschlag
      const precipProbs = items.map(item => getSafeWeatherValue(item.precipitation_probability, 0));
      const avgPrecipProb = precipProbs.length > 0 
        ? precipProbs.reduce((sum, val) => sum + val, 0) / precipProbs.length 
        : 0;
      
      const totalPrecip = items.reduce((sum, item) => sum + getSafeWeatherValue(item.precipitation, 0), 0);
      
      // Schneemenge berechnen (vereinfacht)
      let snowAmount = 0;
      if (Math.min(...temps) <= 2 && totalPrecip > 0) {
        const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
        const factor = avgTemp <= 0 ? 10 : 7;
        snowAmount = (totalPrecip * factor) / 10; // in cm
      }
      
      console.log(`Tagesvorhersage für ${dateStr}: min ${minTemp}°C, max ${maxTemp}°C, Niederschlag ${totalPrecip}mm`);
      
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
    } catch (error) {
      console.error(`Fehler bei der Verarbeitung der Tagesprognose für ${dateStr}:`, error);
    }
  });
  
  // Sortiere nach Datum
  return daily.sort((a, b) => a.date.getTime() - b.date.getTime());
}

/**
 * Hauptfunktion zur Verarbeitung aller Wetterdaten
 */
export function processWeatherData(data: BrightskyApiResponse) {
  console.log('Beginne Verarbeitung der Wetterdaten...');
  
  // Prüfe, ob Wetterdaten vorhanden sind
  if (!data.weather || !Array.isArray(data.weather) || data.weather.length === 0) {
    throw new Error('Keine Wetterdaten für die Verarbeitung verfügbar');
  }
  
  // Nach Zeitstempel sortieren für konsistente Verarbeitung
  const sortedItems = [...data.weather].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
  
  console.log(`Verarbeite ${sortedItems.length} Wetterdaten-Einträge`);
  
  // Verarbeite die verschiedenen Datentypen
  const current = processCurrentWeather(sortedItems);
  const hourly = processHourlyForecast(sortedItems);
  const daily = processDailyForecast(sortedItems).slice(0, 7); // Nur 7 Tage
  
  // Standardmäßig kein Winterdienst erforderlich
  const winterServiceStatus = WinterServiceStatus.NOT_REQUIRED;
  
  console.log('Wetterdatenverarbeitung abgeschlossen');
  
  return {
    current,
    hourly,
    daily,
    winterServiceStatus
  };
}
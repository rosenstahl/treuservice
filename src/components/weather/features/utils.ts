/**
 * Formatiere eine Temperatur ohne Dezimalstellen
 */
export const formatTemperature = (temp?: number): string => {
  if (temp === undefined) return "N/A";
  return Math.round(temp).toString();
};

/**
 * Formatiere eine Dezimalzahl mit einer Dezimalstelle
 */
export const formatDecimal = (value?: number): string => {
  if (value === undefined) return "N/A";
  return value.toFixed(1);
};

/**
 * Status des Winterdienstes
 */
export enum WinterServiceStatus {
  NOT_REQUIRED = "not_required",
  STANDBY = "standby", 
  REQUIRED = "required"
}

/**
 * Übersetzungstabelle für Wetterbedingungen
 */
export const weatherConditions: Record<string, { de: string; }> = {
  'clear-day': { de: 'Klar' },
  'clear-night': { de: 'Klar' },
  'partly-cloudy-day': { de: 'Teilweise bewölkt' },
  'partly-cloudy-night': { de: 'Teilweise bewölkt' },
  'cloudy': { de: 'Bewölkt' },
  'fog': { de: 'Nebel' },
  'rain': { de: 'Regen' },
  'drizzle': { de: 'Nieselregen' },
  'sleet': { de: 'Schneeregen' },
  'snow': { de: 'Schnee' },
  'thunderstorm': { de: 'Gewitter' },
  'wind': { de: 'Windig' },
  'hail': { de: 'Hagel' },
  'dry': { de: 'Trocken' },
  'light rain': { de: 'Leichter Regen' },
  'moderate rain': { de: 'Mäßiger Regen' },
  'heavy rain': { de: 'Starker Regen' },
  'light snow': { de: 'Leichter Schneefall' },
  'moderate snow': { de: 'Mäßiger Schneefall' },
  'heavy snow': { de: 'Starker Schneefall' },
  'light sleet': { de: 'Leichter Schneeregen' },
  'moderate sleet': { de: 'Mäßiger Schneeregen' },
  'heavy sleet': { de: 'Starker Schneeregen' },
  'unknown': { de: 'Unbekannt' }
};

/**
 * Übersetzt eine Wetterbedingung ins Deutsche
 */
export function translateWeatherCondition(condition: string): string {
  if (!condition) return 'Unbekannt';
  
  const normalizedCondition = condition.toLowerCase();
  
  // Direkte Übereinstimmung prüfen
  if (normalizedCondition in weatherConditions) {
    return weatherConditions[normalizedCondition].de;
  }
  
  // Teilweise Übereinstimmung prüfen
  for (const [key, value] of Object.entries(weatherConditions)) {
    if (normalizedCondition.includes(key)) {
      return value.de;
    }
  }
  
  // Fallback für unbekannte Bedingungen
  return condition;
}

/**
 * Findet das häufigste Element in einem Array
 * 
 * @param items Array von Elementen zum Durchsuchen
 * @returns Das Element, das am häufigsten vorkommt, oder undefined bei leerem Array
 */
export function findMostCommon<T>(items: T[]): T | undefined {
  if (items.length === 0) return undefined;
  
  const counts = new Map<T, number>();
  let mostCommon: T = items[0];
  let maxCount = 0;
  
  for (const item of items) {
    const count = (counts.get(item) || 0) + 1;
    counts.set(item, count);
    
    if (count > maxCount) {
      maxCount = count;
      mostCommon = item;
    }
  }
  
  return mostCommon;
}

/**
 * Prüft, ob eine bestimmte Uhrzeit als "Nacht" gilt (zwischen 18 und 6 Uhr)
 */
export function isNightTime(date: Date): boolean {
  const hours = date.getHours();
  return hours < 6 || hours >= 18;
}
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
 * Bestimmt, ob basierend auf Temperatur und Niederschlag Winterdienst erforderlich ist
 * @param temperature - Die Temperatur in °C
 * @param precipitation - Der Niederschlag in mm
 * @returns Boolean, ob Winterdienst erforderlich ist
 */
export function isWinterServiceRequired(temperature: number, precipitation: number): boolean {
  // Winterdienst ist nur nötig bei:
  // 1. Temperaturen unter 0°C (Frost), oder
  // 2. Temperaturen zwischen 0°C und 2°C UND Niederschlag (Gefahr von überfrierender Nässe)
  
  if (temperature <= 0) {
    return true; // Unter 0°C immer Winterdienst erforderlich
  } else if (temperature <= 2 && precipitation > 0.2) {
    return true; // Bei Temperaturen bis 2°C und Niederschlag ist Winterdienst erforderlich
  }
  
  return false; // Ansonsten kein Winterdienst nötig
}

/**
 * Übersetzungstabelle für Wetterbedingungen
 */
export const weatherConditions: Record<string, { de: string; icon: string }> = {
  'clear-day': { de: 'Klar', icon: 'clear-day' },
  'clear-night': { de: 'Klar', icon: 'clear-night' },
  'partly-cloudy-day': { de: 'Teilweise bewölkt', icon: 'partly-cloudy-day' },
  'partly-cloudy-night': { de: 'Teilweise bewölkt', icon: 'partly-cloudy-night' },
  'cloudy': { de: 'Bewölkt', icon: 'cloudy' },
  'fog': { de: 'Nebel', icon: 'fog' },
  'rain': { de: 'Regen', icon: 'rain' },
  'drizzle': { de: 'Nieselregen', icon: 'drizzle' },
  'sleet': { de: 'Schneeregen', icon: 'sleet' },
  'snow': { de: 'Schnee', icon: 'snow' },
  'thunderstorm': { de: 'Gewitter', icon: 'thunderstorm' },
  'wind': { de: 'Windig', icon: 'wind' },
  'hail': { de: 'Hagel', icon: 'hail' },
  'dry': { de: 'Trocken', icon: 'clear-day' },
  'light rain': { de: 'Leichter Regen', icon: 'drizzle' },
  'moderate rain': { de: 'Mäßiger Regen', icon: 'rain' },
  'heavy rain': { de: 'Starker Regen', icon: 'rain' },
  'light snow': { de: 'Leichter Schneefall', icon: 'snow' },
  'moderate snow': { de: 'Mäßiger Schneefall', icon: 'snow' },
  'heavy snow': { de: 'Starker Schneefall', icon: 'snow' },
  'light sleet': { de: 'Leichter Schneeregen', icon: 'sleet' },
  'moderate sleet': { de: 'Mäßiger Schneeregen', icon: 'sleet' },
  'heavy sleet': { de: 'Starker Schneeregen', icon: 'sleet' },
  'unknown': { de: 'Unbekannt', icon: 'cloudy' }
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
 * Bestimmt den passenden Icon-Schlüssel für eine Wetterbedingung
 */
export function getWeatherIcon(condition: string, isNight: boolean = false): string {
  if (!condition) return 'cloudy';
  
  const normalizedCondition = condition.toLowerCase();
  
  // Tag/Nacht-Anpassung
  if (isNight) {
    if (normalizedCondition === 'clear-day') return 'clear-night';
    if (normalizedCondition === 'partly-cloudy-day') return 'partly-cloudy-night';
  }
  
  // Direkte Übereinstimmung prüfen
  if (normalizedCondition in weatherConditions) {
    return weatherConditions[normalizedCondition].icon;
  }
  
  // Teilweise Übereinstimmung prüfen
  for (const [key, value] of Object.entries(weatherConditions)) {
    if (normalizedCondition.includes(key)) {
      return value.icon;
    }
  }
  
  // Fallback für unbekannte Bedingungen
  return 'cloudy';
}

/**
 * Berechnet die Glättegefahr basierend auf Temperatur, Niederschlag und Luftfeuchtigkeit
 */
export function calculateIceRisk(temperature: number, precipitation: number, humidity: number): { 
  risk: 'low' | 'medium' | 'high'; 
  description: string 
} {
  // Wissenschaftlich korrekte Berechnung des Risikos:
  
  // 1. Hohe Glättegefahr bei Frost und Niederschlag
  if (temperature <= 0 && precipitation > 0) {
    return {
      risk: 'high',
      description: 'Hohe Glättegefahr durch Eisbildung bei Niederschlag und Frost.'
    };
  } 
  // 2. Hohe Glättegefahr bei starkem Frost
  else if (temperature <= -3) {
    return {
      risk: 'high',
      description: 'Hohe Glättegefahr durch anhaltende Minustemperaturen.'
    };
  } 
  // 3. Mittlere Glättegefahr bei Frost und hoher Luftfeuchtigkeit
  else if (temperature <= 0 && humidity > 80) {
    return {
      risk: 'medium',
      description: 'Mittlere Glättegefahr durch Reifbildung bei Frost und hoher Luftfeuchtigkeit.'
    };
  } 
  // 4. Mittlere Glättegefahr bei geringem Frost oder Temperaturen nahe Gefrierpunkt mit Niederschlag
  else if ((temperature <= 0) || (temperature <= 3 && precipitation > 0)) {
    return {
      risk: 'medium',
      description: 'Mittlere Glättegefahr durch mögliche überfrierende Nässe.'
    };
  } 
  // 5. Geringe Glättegefahr bei niedrigen Plusgraden ohne Niederschlag
  else if (temperature <= 3) {
    return {
      risk: 'low',
      description: 'Geringe Glättegefahr, jedoch Vorsicht bei sinkenden Temperaturen.'
    };
  } 
  // 6. Keine Glättegefahr bei höheren Temperaturen
  else {
    return {
      risk: 'low',
      description: 'Keine signifikante Glättegefahr bei aktuellen Temperaturen.'
    };
  }
}

/**
 * Prüft, ob eine bestimmte Uhrzeit als "Nacht" gilt (zwischen 18 und 6 Uhr)
 */
export function isNightTime(date: Date): boolean {
  const hours = date.getHours();
  return hours < 6 || hours >= 18;
}

/**
 * Helferfunktion zur Ermittlung des besten Wettericons für einen Tag
 * basierend auf den Bedingungen über den Tag verteilt
 */
export function getBestDailyIcon(conditions: string[]): string {
  if (!conditions.length) return 'cloudy';
  
  // Priorisiere bestimmte Wetterbedingungen
  const priorities = [
    'thunderstorm', 'snow', 'sleet', 'rain', 'fog', 
    'cloudy', 'partly-cloudy-day', 'clear-day'
  ];
  
  // Zähle Häufigkeit jeder Bedingung
  const conditionCount: Record<string, number> = {};
  conditions.forEach(condition => {
    const normalized = condition.toLowerCase();
    conditionCount[normalized] = (conditionCount[normalized] || 0) + 1;
  });
  
  // Gehe die Prioritätenliste durch und gib die erste Bedingung zurück, die vorhanden ist
  for (const priority of priorities) {
    if (conditions.some(c => c.toLowerCase().includes(priority))) {
      return priority;
    }
  }
  
  // Wenn nichts passt, nimm die häufigste Bedingung
  let mostCommon = 'cloudy';
  let highestCount = 0;
  
  Object.entries(conditionCount).forEach(([condition, count]) => {
    if (count > highestCount) {
      mostCommon = condition;
      highestCount = count;
    }
  });
  
  return mostCommon;
}
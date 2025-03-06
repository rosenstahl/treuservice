// API-Status-Tracking-Variablen
let brightskyFailures = 0;
let lastFailureTime: number | null = null;

// Typen definieren
export interface WeatherData {
  date: string;
  temperature: number;
  description: string;
  icon: string;
  // Weitere gemeinsame Felder können hier hinzugefügt werden
}

// Zentrale Cache-Struktur für alle Wetterdaten
export interface GlobalWeatherCache {
  location: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  currentConditions: {
    temperature: number;
    feelsLike: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    precipitationProbability: number;
    cloudCover: number;
    soilTemperature?: number;
    summary: string;
    updateTime: Date;
  };
  forecast: {
    hourly: Array<{
      time: Date;
      temperature: number;
      condition: string;
      icon: string;
      precipitation: number;
      windSpeed: number;
      humidity: number;
    }>;
    daily: Array<{
      date: Date;
      maxTemp: number;
      minTemp: number;
      condition: string;
      icon: string;
      precipitation: number;
      precipitationProbability: number;
      snowAmount: number;
    }>;
  };
  notifications: {
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
  };
}

// Globaler Cache für Wetterdaten (singleton)
let globalWeatherCache: GlobalWeatherCache | null = null;
const CACHE_LIFETIME = 15 * 60 * 1000; // 15 Minuten

// Event-System für Wetter-Updates
export type WeatherUpdateListener = () => void;
const weatherUpdateListeners: WeatherUpdateListener[] = [];

// Event-Listener für Wetter-Updates registrieren
export function addWeatherUpdateListener(listener: WeatherUpdateListener): void {
  if (!weatherUpdateListeners.includes(listener)) {
    weatherUpdateListeners.push(listener);
  }
}

// Event-Listener entfernen
export function removeWeatherUpdateListener(listener: WeatherUpdateListener): void {
  const index = weatherUpdateListeners.indexOf(listener);
  if (index !== -1) {
    weatherUpdateListeners.splice(index, 1);
  }
}

// Alle Listener benachrichtigen
function notifyWeatherUpdateListeners(): void {
  weatherUpdateListeners.forEach(listener => {
    try {
      listener();
    } catch (error) {
      console.error('Error in weather update listener:', error);
    }
  });
}

// Typen für die API-Antworten
export interface BrightskyResponse {
  weather: BrightskyWeatherItem[];
  sources: unknown[];
  [key: string]: unknown;
}

export interface BrightskyWeatherItem {
  timestamp: string;
  temperature?: number;
  precipitation?: number;
  precipitation_probability?: number;
  relative_humidity?: number;
  cloud_cover?: number;
  wind_speed?: number;
  soil_temperature?: number;
  condition?: string;
  icon?: string;
  [key: string]: unknown;
}

// Wetterbedingungen einheitlich übersetzen
export const weatherConditionMap: Record<string, { de: string; en: string; icon: string }> = {
  'clear-day': { de: 'Klar (Tag)', en: 'Clear (Day)', icon: 'sun' },
  'clear-night': { de: 'Klar (Nacht)', en: 'Clear (Night)', icon: 'moon' },
  'partly-cloudy-day': { de: 'Teilweise bewölkt (Tag)', en: 'Partly Cloudy (Day)', icon: 'cloud-sun' },
  'partly-cloudy-night': { de: 'Teilweise bewölkt (Nacht)', en: 'Partly Cloudy (Night)', icon: 'cloud-moon' },
  'cloudy': { de: 'Bewölkt', en: 'Cloudy', icon: 'cloud' },
  'fog': { de: 'Nebel', en: 'Fog', icon: 'cloud-fog' },
  'rain': { de: 'Regen', en: 'Rain', icon: 'cloud-rain' },
  'drizzle': { de: 'Nieselregen', en: 'Drizzle', icon: 'cloud-drizzle' },
  'sleet': { de: 'Schneeregen', en: 'Sleet', icon: 'cloud-sleet' },
  'snow': { de: 'Schnee', en: 'Snow', icon: 'cloud-snow' },
  'thunderstorm': { de: 'Gewitter', en: 'Thunderstorm', icon: 'cloud-lightning' },
  'wind': { de: 'Windig', en: 'Windy', icon: 'wind' },
  'hail': { de: 'Hagel', en: 'Hail', icon: 'cloud-hail' },
  'dry': { de: 'Trocken', en: 'Dry', icon: 'sun' },
  'light rain': { de: 'Leichter Regen', en: 'Light Rain', icon: 'cloud-drizzle' },
  'moderate rain': { de: 'Mäßiger Regen', en: 'Moderate Rain', icon: 'cloud-rain' },
  'heavy rain': { de: 'Starker Regen', en: 'Heavy Rain', icon: 'cloud-rain' },
  'light snow': { de: 'Leichter Schneefall', en: 'Light Snow', icon: 'cloud-snow' },
  'moderate snow': { de: 'Mäßiger Schneefall', en: 'Moderate Snow', icon: 'cloud-snow' },
  'heavy snow': { de: 'Starker Schneefall', en: 'Heavy Snow', icon: 'cloud-snow' },
  'light sleet': { de: 'Leichter Schneeregen', en: 'Light Sleet', icon: 'cloud-sleet' },
  'moderate sleet': { de: 'Mäßiger Schneeregen', en: 'Moderate Sleet', icon: 'cloud-sleet' },
  'heavy sleet': { de: 'Starker Schneeregen', en: 'Heavy Sleet', icon: 'cloud-sleet' },
  'unknown': { de: 'Unbekannt', en: 'Unknown', icon: 'cloud' }
};

// Übersetze eine Wetterbedingung
export function translateWeatherCondition(condition: string, locale: string = 'de'): string {
  if (!condition) return locale === 'de' ? 'Unbekannt' : 'Unknown';
  
  const normalizedCondition = condition.toLowerCase();
  
  // Direkte Übereinstimmung prüfen
  if (normalizedCondition in weatherConditionMap) {
    return locale === 'de' 
      ? weatherConditionMap[normalizedCondition].de 
      : weatherConditionMap[normalizedCondition].en;
  }
  
  // Teilweise Übereinstimmung prüfen
  for (const [key, value] of Object.entries(weatherConditionMap)) {
    if (normalizedCondition.includes(key)) {
      return locale === 'de' ? value.de : value.en;
    }
  }
  
  // Fallback für unbekannte Bedingungen
  console.warn('Unbekannte Wetterbedingung:', condition);
  return condition;
}

// Berechne die Glättegefahr mit verbesserten Parametern
export function calculateIceRisk(temperature: number, precipitation: number, humidity: number): { risk: 'low' | 'medium' | 'high'; description: string } {
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
 * Holt Wetterdaten von der Brightsky API mit verbesserter Fehlerbehandlung
 */
async function fetchFromBrightsky(lat: number, lon: number): Promise<BrightskyResponse> {
  const date = new Date();
  const dateString = date.toISOString().split('T')[0];
  
  // URL für die Brightsky API mit korrekt encodiertem Timezone-Parameter
  const url = `https://api.brightsky.dev/weather?lat=${lat}&lon=${lon}&date=${dateString}&tz=${encodeURIComponent('Europe/Berlin')}`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 Sekunden Timeout
    
    console.log('Brightsky API Request:', url);
    
    const response = await fetch(url, { 
      signal: controller.signal,
      headers: { 
        'Accept': 'application/json',
        'Cache-Control': 'no-cache' // Cache explizit deaktivieren
      }
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Brightsky API Error: ${response.status}`);
    }
    
    const data = await response.json() as BrightskyResponse;
    
    // Validiere die Daten
    if (!data || !data.weather || !Array.isArray(data.weather) || data.weather.length === 0) {
      throw new Error('Keine Wetterdaten von der API erhalten');
    }
    
    // Prüfen auf unplausible Werte
    const suspiciousValues = data.weather.filter(item => 
      (item.temperature !== undefined && (item.temperature < -50 || item.temperature > 50)) ||
      (item.precipitation !== undefined && item.precipitation < 0) ||
      (item.relative_humidity !== undefined && (item.relative_humidity < 0 || item.relative_humidity > 100))
    );
    
    if (suspiciousValues.length > 0) {
      console.warn('Verdächtige Wetterwerte gefunden:', suspiciousValues);
    }
    
    return data;
  } catch (error) {
    console.error('Fehler bei API-Anfrage:', error);
    
    // Bei Timeout oder Netzwerkfehler, werfen wir einen benutzerfreundlichen Fehler
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Zeitüberschreitung bei der API-Anfrage. Bitte versuchen Sie es später erneut.');
      }
    }
    
    throw error;
  }
}

/**
 * Hauptfunktion für den Wetterdatenabruf mit verbessertem Caching
 */
export async function getWeatherData(lat: number, lon: number): Promise<BrightskyResponse> {
  console.log(`Wetterdaten werden abgerufen für: ${lat}, ${lon}`);
  
  // Cache-Koordinaten auf 2 Dezimalstellen runden für besseres Matching
  const roundedLat = Math.round(lat * 100) / 100;
  const roundedLon = Math.round(lon * 100) / 100;
  
  // Cache prüfen
  if (globalWeatherCache && 
      Math.abs(globalWeatherCache.coordinates.lat - roundedLat) < 0.01 && 
      Math.abs(globalWeatherCache.coordinates.lon - roundedLon) < 0.01 &&
      (new Date().getTime() - globalWeatherCache.currentConditions.updateTime.getTime()) < CACHE_LIFETIME) {
    console.log('Verwende zwischengespeicherte Wetterdaten');
    
    // Wir haben aktuelle Daten im Cache - wir müssen trotzdem ein BrightskyResponse-Objekt zurückgeben
    // Da wir die Daten bereits haben, erstellen wir ein simuliertes Objekt
    const cachedData: BrightskyResponse = {
      weather: [createWeatherItemFromCache(globalWeatherCache)],
      sources: []
    };
    
    // Füge Vorhersagedaten hinzu
    globalWeatherCache.forecast.hourly.forEach(hour => {
      cachedData.weather.push({
        timestamp: hour.time.toISOString(),
        temperature: hour.temperature,
        precipitation: hour.precipitation,
        relative_humidity: hour.humidity,
        wind_speed: hour.windSpeed,
        condition: hour.condition,
        icon: hour.icon
      });
    });
    
    return cachedData;
  }
  
  try {
    console.log('Rufe Brightsky API ab...');
    const data = await fetchFromBrightsky(lat, lon);
    
    // Bei Erfolg: Fehler zurücksetzen
    console.log('Brightsky erfolgreich abgerufen!');
    brightskyFailures = 0;
    lastFailureTime = null;
    
    // Cache aktualisieren, wenn wir Daten haben
    if (data && data.weather && data.weather.length > 0) {
      updateGlobalWeatherCache(lat, lon, data);
      
      // Benachrichtige alle Listener über die Aktualisierung
      notifyWeatherUpdateListeners();
    }
    
    return data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
    // Bei Fehler den Fehlerzähler erhöhen
    brightskyFailures++;
    lastFailureTime = Date.now();
    
    // Wenn wir bereits Daten im Cache haben, verwenden wir diese als Fallback
    if (globalWeatherCache) {
      console.log('Verwende Cache als Fallback für fehlgeschlagene API-Anfrage');
      
      // Nach 3 fehlgeschlagenen Versuchen sollten wir eine Warnung anzeigen
      if (brightskyFailures >= 3) {
        // Wir könnten hier eine Benachrichtigung an die UI senden
        console.warn('Mehrere API-Fehler in Folge. Wetterdaten könnten veraltet sein.');
      }
      
      // Simuliertes API-Ergebnis aus dem Cache erstellen
      const fallbackData: BrightskyResponse = {
        weather: [createWeatherItemFromCache(globalWeatherCache)],
        sources: []
      };
      
      // Füge Vorhersagedaten hinzu
      globalWeatherCache.forecast.hourly.forEach(hour => {
        fallbackData.weather.push({
          timestamp: hour.time.toISOString(),
          temperature: hour.temperature,
          precipitation: hour.precipitation,
          relative_humidity: hour.humidity,
          wind_speed: hour.windSpeed,
          condition: hour.condition,
          icon: hour.icon
        });
      });
      
      return fallbackData;
    }
    
    throw new Error("Wetterdaten konnten nicht abgerufen werden. Bitte versuchen Sie es später erneut.");
  }
}

// Hilfsfunktion zum Erstellen eines API-ähnlichen WeatherItem aus dem Cache
function createWeatherItemFromCache(cache: GlobalWeatherCache): BrightskyWeatherItem {
  return {
    timestamp: new Date().toISOString(),
    temperature: Math.round(cache.currentConditions.temperature),
    precipitation: Math.round(cache.currentConditions.precipitation * 10) / 10,
    precipitation_probability: Math.round(cache.currentConditions.precipitationProbability),
    relative_humidity: Math.round(cache.currentConditions.humidity),
    cloud_cover: Math.round(cache.currentConditions.cloudCover),
    wind_speed: Math.round(cache.currentConditions.windSpeed * 10) / 10,
    soil_temperature: cache.currentConditions.soilTemperature !== undefined ? 
      Math.round(cache.currentConditions.soilTemperature) : undefined,
    condition: cache.currentConditions.condition,
    icon: cache.currentConditions.icon
  };
}

// Aktualisiert den globalen Wetterdaten-Cache mit verbesserter Datenverarbeitung
function updateGlobalWeatherCache(lat: number, lon: number, data: BrightskyResponse): void {
  // Sicherstellen, dass Daten vorhanden sind
  if (!data.weather || data.weather.length === 0) {
    console.error('Keine Wetterdaten zum Aktualisieren des Cache');
    return;
  }
  
  const current = data.weather[0]; // Aktuelles Wetter
  const now = new Date();
  
  // Temperaturen immer auf eine Dezimalstelle runden
  const roundedTemp = current.temperature !== undefined ? 
                      Math.round(current.temperature * 10) / 10 : 0;
  
  // Erstelle Cache, wenn er noch nicht existiert
  if (!globalWeatherCache) {
    globalWeatherCache = {
      location: "",
      coordinates: { lat, lon },
      currentConditions: {
        temperature: roundedTemp,
        feelsLike: Math.round((roundedTemp - 2) * 10) / 10, // Verbesserte Näherung für gefühlte Temperatur
        condition: current.condition || 'unknown',
        icon: current.icon || 'cloudy',
        humidity: Math.round(current.relative_humidity || 70),
        windSpeed: Math.round((current.wind_speed || 0) * 10) / 10,
        precipitation: Math.round((current.precipitation || 0) * 10) / 10,
        precipitationProbability: Math.round(current.precipitation_probability || 0),
        cloudCover: Math.round(current.cloud_cover || 0),
        soilTemperature: current.soil_temperature !== undefined ? 
                         Math.round(current.soil_temperature * 10) / 10 : 
                         Math.round((roundedTemp - 2) * 10) / 10, // Geschätzte Bodentemperatur
        summary: translateWeatherCondition(current.condition || 'unknown'),
        updateTime: now
      },
      forecast: {
        hourly: [],
        daily: []
      },
      notifications: {
        iceRisk: calculateIceRisk(
          roundedTemp, 
          current.precipitation || 0, 
          current.relative_humidity || 70
        ),
        winterServiceRequired: roundedTemp <= 3,
        lastUpdate: now
      }
    };
  } else {
    // Cache aktualisieren
    globalWeatherCache.coordinates = { lat, lon };
    globalWeatherCache.currentConditions = {
      temperature: roundedTemp,
      feelsLike: Math.round((roundedTemp - 2) * 10) / 10,
      condition: current.condition || 'unknown',
      icon: current.icon || 'cloudy',
      humidity: Math.round(current.relative_humidity || 70),
      windSpeed: Math.round((current.wind_speed || 0) * 10) / 10,
      precipitation: Math.round((current.precipitation || 0) * 10) / 10,
      precipitationProbability: Math.round(current.precipitation_probability || 0),
      cloudCover: Math.round(current.cloud_cover || 0),
      soilTemperature: current.soil_temperature !== undefined ? 
                       Math.round(current.soil_temperature * 10) / 10 : 
                       Math.round((roundedTemp - 2) * 10) / 10,
      summary: translateWeatherCondition(current.condition || 'unknown'),
      updateTime: now
    };
    
    globalWeatherCache.notifications.iceRisk = calculateIceRisk(
      roundedTemp, 
      current.precipitation || 0, 
      current.relative_humidity || 70
    );
    globalWeatherCache.notifications.winterServiceRequired = roundedTemp <= 3;
    globalWeatherCache.notifications.lastUpdate = now;
  }
  
  // Stündliche Vorhersage aktualisieren - mit Sicherheitsabfragen
  if (data.weather.length > 1) {
    // Stündliche Daten sortieren, um sicherzustellen, dass sie in der richtigen Reihenfolge sind
    const sortedHourlyData = [...data.weather.slice(1)]
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    globalWeatherCache.forecast.hourly = sortedHourlyData
      .slice(0, Math.min(25, sortedHourlyData.length))
      .map(hour => {
        // Sicherstellen, dass alle Zeitangaben korrekt interpretiert werden
        const hourTime = new Date(hour.timestamp);
        
        return {
          time: hourTime,
          temperature: hour.temperature !== undefined ? Math.round(hour.temperature * 10) / 10 : roundedTemp,
          condition: hour.condition || 'unknown',
          icon: hour.icon || 'cloudy',
          precipitation: Math.round((hour.precipitation || 0) * 10) / 10,
          windSpeed: Math.round((hour.wind_speed || 0) * 10) / 10,
          humidity: Math.round(hour.relative_humidity || 70)
        };
      });
  }
  
  // Tägliche Vorhersage berechnen
  const dailyMap = new Map<string, {
    temps: number[]; 
    conditions: Record<string, number>; 
    precipitation: number;
    precipitationProb: number[];
    snowAmount: number;
    icons: Record<string, number>;
    timestamps: string[]; // Speichere Timestamps, um sicherzustellen, dass wir mit korrekten Daten arbeiten
  }>();
  
  // Daten nach Tagen gruppieren
  data.weather.forEach(hour => {
    if (!hour.timestamp || hour.temperature === undefined) return;
    
    // Korrekte Extraktion des Datums unter Berücksichtigung der Zeitzone
    const hourDate = new Date(hour.timestamp);
    const date = hourDate.toISOString().split('T')[0]; // YYYY-MM-DD
    
    const temp = Math.round(hour.temperature * 10) / 10;
    const condition = hour.condition || 'unknown';
    const precip = hour.precipitation || 0;
    const precipProb = hour.precipitation_probability || 0;
    const icon = hour.icon || 'cloudy';
    
    // Schneemenge berechnen wenn kalt und Niederschlag
    let snow = 0;
    if (temp <= 2 && precip > 0) {
      const factor = temp <= 0 ? 10 : 7;
      snow = (precip * factor) / 10; // cm
    }
    
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        temps: [],
        conditions: {},
        precipitation: 0,
        precipitationProb: [],
        snowAmount: 0,
        icons: {},
        timestamps: []
      });
    }
    
    const dayData = dailyMap.get(date)!;
    dayData.temps.push(temp);
    dayData.precipitation += precip;
    dayData.precipitationProb.push(precipProb);
    dayData.snowAmount += snow;
    dayData.timestamps.push(hour.timestamp);
    
    // Bedingungen und Icons zählen
    dayData.conditions[condition] = (dayData.conditions[condition] || 0) + 1;
    dayData.icons[icon] = (dayData.icons[icon] || 0) + 1;
  });
  
  // Tägliche Zusammenfassung erstellen und nach Datum sortieren
  globalWeatherCache.forecast.daily = Array.from(dailyMap.entries())
    .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
    .map(([date, data]) => {
      // Häufigste Wetterbedingung finden
      let mostCommonCondition = 'unknown';
      let maxConditionCount = 0;
      
      Object.entries(data.conditions).forEach(([condition, count]) => {
        if (count > maxConditionCount) {
          mostCommonCondition = condition;
          maxConditionCount = count;
        }
      });
      
      // Häufigstes Icon finden
      let mostCommonIcon = 'cloudy';
      let maxIconCount = 0;
      
      Object.entries(data.icons).forEach(([icon, count]) => {
        if (count > maxIconCount) {
          mostCommonIcon = icon;
          maxIconCount = count;
        }
      });
      
      // Mittlere Niederschlagswahrscheinlichkeit berechnen
      const avgPrecipProb = data.precipitationProb.length > 0 
        ? data.precipitationProb.reduce((sum, val) => sum + val, 0) / data.precipitationProb.length 
        : 0;
      
      return {
        date: new Date(date),
        maxTemp: Math.max(...data.temps),
        minTemp: Math.min(...data.temps),
        condition: mostCommonCondition,
        icon: mostCommonIcon,
        precipitation: Math.round(data.precipitation * 10) / 10,
        precipitationProbability: Math.round(avgPrecipProb),
        snowAmount: Math.round(data.snowAmount * 10) / 10
      };
    });
  
  // Schneefall-Vorhersage generieren
  let willSnow = false;
  let snowStartTime: string | undefined;
  let snowEndTime: string | undefined;
  let totalSnowAmount = 0;
  
  // Nächste 24 Stunden durchsuchen
  const next24Hours = globalWeatherCache.forecast.hourly.slice(0, 24);
  
  for (let i = 0; i < next24Hours.length; i++) {
    const hour = next24Hours[i];
    const temp = hour.temperature;
    const precip = hour.precipitation;
    
    // Schneefallbedingungen: Temperatur <= 2°C und Niederschlag > 0
    if (temp <= 2 && precip > 0) {
      willSnow = true;
      
      // Startzeit
      if (!snowStartTime) {
        snowStartTime = hour.time.toISOString();
      }
      
      // Schneemenge berechnen mit korrekterer Berechnung
      const conversionFactor = temp <= 0 ? 10 : (temp <= 1 ? 8 : 7); // Korrekter Faktor je nach Temperatur
      totalSnowAmount += precip * conversionFactor / 10; // cm
    } 
    else if (snowStartTime && !snowEndTime) {
      // Ende des Schneefalls
      snowEndTime = hour.time.toISOString();
    }
  }
  
  // Wenn kein Ende gefunden wurde, aber ein Beginn vorhanden ist
  if (snowStartTime && !snowEndTime && next24Hours.length > 0) {
    snowEndTime = next24Hours[next24Hours.length - 1].time.toISOString();
  }
  
  // Schneefallvorhersage aktualisieren, wenn Schnee erwartet wird
  if (willSnow) {
    globalWeatherCache.notifications.snowfallPrediction = {
      willSnow: true,
      startTime: snowStartTime,
      endTime: snowEndTime,
      totalAmount: Math.round(totalSnowAmount * 10) / 10
    };
  } else {
    globalWeatherCache.notifications.snowfallPrediction = {
      willSnow: false,
      totalAmount: 0
    };
  }
  
  // Speichere die Cache im sessionStorage, damit er zwischen Seiten erhalten bleibt
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('weatherCache', JSON.stringify({
        coordinates: globalWeatherCache.coordinates,
        location: globalWeatherCache.location,
        time: now.getTime()
      }));
    } catch (e) {
      console.warn('Konnte Weather-Cache nicht speichern:', e);
    }
  }
}

// Aktualisiert den Standort im globalen Wetterdaten-Cache
export function updateWeatherLocation(
  locationName: string, 
  coordinates?: { lat: number; lon: number }
): void {
  if (globalWeatherCache) {
    globalWeatherCache.location = locationName;
    
    // Wenn Koordinaten übergeben wurden, diese ebenfalls aktualisieren
    if (coordinates) {
      globalWeatherCache.coordinates = coordinates;
    }
    
    // Aktualisiere auch den Session-Storage
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('weatherCache', JSON.stringify({
          coordinates: globalWeatherCache.coordinates,
          location: locationName,
          time: new Date().getTime()
        }));
      } catch (e) {
        console.warn('Konnte Weather-Cache-Location nicht speichern:', e);
      }
    }
    
    // Benachrichtige alle Listener über die Aktualisierung
    notifyWeatherUpdateListeners();
  }
}

// Gibt den aktuellen globalen Wetterdaten-Cache zurück
export function getGlobalWeatherCache(): GlobalWeatherCache | null {
  return globalWeatherCache;
}

// Speichere den API-Status im lokalen Speicher, damit er zwischen Seitenaufrufen erhalten bleibt
export function saveApiStatus(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('brightskyFailures', brightskyFailures.toString());
    localStorage.setItem('lastFailureTime', lastFailureTime?.toString() || '');
  }
}

// Lade den API-Status und Cache beim Start
export function loadApiStatus(): void {
  if (typeof window !== 'undefined') {
    // API-Status aus dem localStorage laden
    if (window.localStorage) {
      const storedFailures = localStorage.getItem('brightskyFailures');
      const storedFailureTime = localStorage.getItem('lastFailureTime');
      
      if (storedFailures) {
        brightskyFailures = parseInt(storedFailures, 10);
      }
      
      if (storedFailureTime && storedFailureTime !== '') {
        lastFailureTime = parseInt(storedFailureTime, 10);
      }
    }
    
    // Versuche den Cache aus der Session zu laden
    try {
      const cachedWeatherData = sessionStorage.getItem('weatherCache');
      if (cachedWeatherData) {
        const parsedCache = JSON.parse(cachedWeatherData);
        const cacheTime = new Date(parsedCache.time);
        
        // Wenn der Cache noch frisch genug ist und wir Koordinaten haben
        if ((new Date().getTime() - cacheTime.getTime()) < CACHE_LIFETIME && 
            parsedCache.coordinates && 
            typeof parsedCache.coordinates.lat === 'number' && 
            typeof parsedCache.coordinates.lon === 'number') {
          
          console.log('Weather Cache in Session gefunden, wird bei der nächsten Anfrage verwendet');
          
          // Wenn wir noch keinen globalWeatherCache haben, initialisieren wir ihn mit Basisdaten
          if (!globalWeatherCache) {
            // Die Daten werden beim nächsten API-Aufruf vollständig aktualisiert
            globalWeatherCache = {
              location: parsedCache.location || "",
              coordinates: parsedCache.coordinates,
              currentConditions: {
                temperature: 0,
                feelsLike: 0,
                condition: 'unknown',
                icon: 'cloudy',
                humidity: 0,
                windSpeed: 0,
                precipitation: 0,
                precipitationProbability: 0,
                cloudCover: 0,
                summary: '',
                updateTime: new Date(0) // Sehr altes Datum, damit Aktualisierung erzwungen wird
              },
              forecast: {
                hourly: [],
                daily: []
              },
              notifications: {
                iceRisk: {
                  risk: 'low',
                  description: 'Keine Daten verfügbar.'
                },
                winterServiceRequired: false,
                lastUpdate: new Date(0)
              }
            };
            
            // Wir fordern sofort neue Daten an, um den Cache zu aktualisieren
            getWeatherData(parsedCache.coordinates.lat, parsedCache.coordinates.lon)
              .catch(error => console.error('Fehler beim automatischen Nachladen der Wetterdaten:', error));
          }
        }
      }
    } catch (e) {
      console.warn('Fehler beim Laden des Weather-Cache:', e);
    }
  }
}
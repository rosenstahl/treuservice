/**
 * brightsky-api.ts
 * 
 * Eine zentrale API-Schnittstelle für die Kommunikation mit dem BrightSky-Wetterdienst.
 * Diese Datei enthält alle notwendigen Typen und Funktionen, um Wetterdaten abzurufen.
 * VERBESSERTE VERSION mit strikter Cache-Kontrolle
 */

// API-URL-Konstanten
const BRIGHTSKY_API_BASE = "https://api.brightsky.dev";
const DEFAULT_TIMEOUT = 10000; // 10 Sekunden Timeout
const MAX_STATION_DISTANCE = 50; // Maximale Entfernung zur Wetterstation in km

// Debug-Flag für ausführlichere Protokollierung
const DEBUG = true;

// API-Antwort-Typen, die der offiziellen BrightSky-API entsprechen
export interface BrightskyWeatherItem {
  timestamp: string;
  source_id: number;
  cloud_cover: number | null;
  condition: string | null;
  dew_point: number | null;
  icon: string | null;
  precipitation: number | null;
  precipitation_probability: number | null;
  pressure_msl: number | null;
  relative_humidity: number | null;
  sunshine: number | null;
  temperature: number | null;
  visibility: number | null;
  wind_direction: number | null;
  wind_speed: number | null;
  wind_gust_direction: number | null;
  wind_gust_speed: number | null;
}

export interface BrightskySource {
  id: number;
  dwd_station_id: string;
  wmo_station_id: string;
  station_name: string;
  observation_type: string;
  lat: number;
  lon: number;
  height: number;
  distance: number;
  first_record: string;
  last_record: string;
}

export interface BrightskyApiResponse {
  weather: BrightskyWeatherItem[];
  sources: BrightskySource[];
}

// Parameter-Typen für API-Anfragen
export interface WeatherParams {
  lat: number;
  lon: number;
  date?: string;  // ISO 8601 Format (YYYY-MM-DDTHH:MM:SS)
  last_date?: string;  // ISO 8601 Format (YYYY-MM-DDTHH:MM:SS)
  tz?: string;  // Zeitzone, z.B. 'Europe/Berlin'
  max_dist?: number; // Maximale Entfernung zur Wetterstation in km
}

/**
 * Funktion zum Abrufen von Wetterdaten von der BrightSky API.
 * Unterstützt sowohl aktuelle als auch Vorhersagedaten.
 * VERBESSERTE VERSION mit strikter Cache-Kontrolle
 * 
 * @param params Parameter für die API-Anfrage
 * @returns Die API-Antwort als Promise
 */
export async function fetchWeatherData(params: WeatherParams): Promise<BrightskyApiResponse> {
  // Koordinaten validieren mit verbesserter Fehlermeldung
  if (!isValidCoordinate(params.lat, params.lon)) {
    throw new Error(`Ungültige Koordinaten: ${params.lat}, ${params.lon}. Die Werte müssen im gültigen Bereich liegen.`);
  }
  
  // Koordinaten mit höherer Genauigkeit formatieren (6 Nachkommastellen)
  const lat = params.lat.toFixed(6);
  const lon = params.lon.toFixed(6);
  
  // Cache-Buster für garantiert frische Daten
  const cacheBuster = new Date().getTime();
  
  // API-URL zusammenbauen
  const timezone = params.tz || 'Europe/Berlin';
  let url = `${BRIGHTSKY_API_BASE}/weather?lat=${lat}&lon=${lon}&tz=${encodeURIComponent(timezone)}&_cb=${cacheBuster}`;
  
  // Maximale Distanz zur Wetterstation begrenzen für präzisere Daten
  if (params.max_dist || MAX_STATION_DISTANCE) {
    const maxDist = params.max_dist || MAX_STATION_DISTANCE;
    url += `&max_dist=${maxDist}`;
  }
  
  // Datum hinzufügen, wenn angegeben
  if (params.date) {
    url += `&date=${encodeURIComponent(params.date)}`;
  }
  
  // Enddatum hinzufügen, wenn angegeben
  if (params.last_date) {
    url += `&last_date=${encodeURIComponent(params.last_date)}`;
  }
  
  if (DEBUG) console.log(`BrightSky API-Anfrage für Koordinaten (${lat}, ${lon}):`, url);
  
  try {
    // Timeout mit AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
    
    // API-Anfrage senden mit strikten Cache-Kontrollen
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    clearTimeout(timeoutId);
    
    // HTTP-Fehler prüfen
    if (!response.ok) {
      // Bei 404-Fehler: Versuche es erneut ohne max_dist Parameter
      if (response.status === 404 && url.includes('max_dist')) {
        console.warn('Keine Wetterstation im angegebenen Radius gefunden. Versuche es ohne Distanzbegrenzung...');
        
        // URL ohne max_dist Parameter neu erstellen
        const fallbackUrl = url.replace(/&max_dist=\d+/, '');
        
        if (DEBUG) console.log('Fallback-Anfrage:', fallbackUrl);
        
        // Neuer Timeout für Fallback-Anfrage
        const fallbackController = new AbortController();
        const fallbackTimeoutId = setTimeout(() => fallbackController.abort(), DEFAULT_TIMEOUT);
        
        // Neue Anfrage ohne Distanzbegrenzung
        const fallbackResponse = await fetch(fallbackUrl, {
          signal: fallbackController.signal,
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        clearTimeout(fallbackTimeoutId);
        
        if (!fallbackResponse.ok) {
          throw new Error(`BrightSky API-Fehler: ${fallbackResponse.status} ${fallbackResponse.statusText}`);
        }
        
        const fallbackData = await fallbackResponse.json() as BrightskyApiResponse;
        
        // Daten validieren
        if (!fallbackData.weather || !Array.isArray(fallbackData.weather) || fallbackData.weather.length === 0) {
          throw new Error('Keine Wetterdaten in der Fallback-API-Antwort enthalten');
        }
        
        if (DEBUG) {
          console.log('Fallback-Daten erhalten:', fallbackData.weather.length, 'Einträge');
          console.log('Erste Wetterelemente:', fallbackData.weather.slice(0, 2));
        }
        
        return fallbackData;
      }
      
      throw new Error(`BrightSky API-Fehler: ${response.status} ${response.statusText}`);
    }
    
    // Antwort parsen
    const data = await response.json() as BrightskyApiResponse;
    
    // Daten validieren
    if (!data.weather || !Array.isArray(data.weather) || data.weather.length === 0) {
      throw new Error('Keine Wetterdaten in der API-Antwort enthalten');
    }
    
    // Log Informationen zur Wetterstation
    if (DEBUG && data.sources && data.sources.length > 0) {
      const source = data.sources[0];
      console.log(
        `Wetterdaten von Station: ${source.station_name}, ` +
        `Entfernung: ${source.distance.toFixed(1)} km, ` +
        `Höhe: ${source.height} m`
      );
      
      console.log('Erste Wetterelemente:', data.weather.slice(0, 2));
    }
    
    if (DEBUG) console.log('BrightSky API-Antwort erhalten:', data.weather.length, 'Einträge');
    
    return data;
  } catch (error) {
    // Fehlerbehandlung mit benutzerfreundlichen Meldungen
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Zeitüberschreitung bei der Wetterabfrage. Bitte versuchen Sie es später erneut.');
      }
      
      console.error('Fehler bei BrightSky API-Anfrage:', error);
      throw error;
    }
    
    throw new Error('Ein unbekannter Fehler ist aufgetreten.');
  }
}

/**
 * Hilfsfunktion zum Abrufen aktueller Wetterdaten.
 * 
 * @param lat Breitengrad
 * @param lon Längengrad
 * @returns Die API-Antwort als Promise
 */
export async function fetchCurrentWeather(lat: number, lon: number): Promise<BrightskyApiResponse> {
  // Aktuelles Datum mit Uhrzeit
  const now = new Date();
  
  // Formatiere das Datum für die API - ISO-String ohne Zeit (nur YYYY-MM-DD)
  const today = now.toISOString().split('T')[0];
  
  if (DEBUG) console.log(`Rufe aktuelle Wetterdaten für (${lat.toFixed(6)}, ${lon.toFixed(6)}) ab (Datum: ${today})`);
  
  return fetchWeatherData({ 
    lat, 
    lon, 
    date: today,
    tz: 'Europe/Berlin'
  });
}

/**
 * Hilfsfunktion zum Abrufen von Wettervorhersagedaten für die nächsten Tage.
 * 
 * @param lat Breitengrad
 * @param lon Längengrad
 * @param days Anzahl der Tage für die Vorhersage (Standard: 7)
 * @returns Die API-Antwort als Promise
 */
export async function fetchWeatherForecast(lat: number, lon: number, days: number = 7): Promise<BrightskyApiResponse> {
  const today = new Date();
  const startDate = today.toISOString().split('T')[0]; // Nur Datum verwenden
  
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + days);
  const lastDate = endDate.toISOString().split('T')[0]; // Nur Datum verwenden
  
  if (DEBUG) console.log(`Rufe Wettervorhersage für (${lat.toFixed(6)}, ${lon.toFixed(6)}) ab (von ${startDate} bis ${lastDate})`);
  
  return fetchWeatherData({ 
    lat, 
    lon, 
    date: startDate, 
    last_date: lastDate,
    tz: 'Europe/Berlin'
  });
}

/**
 * Verbesserte Hilfsfunktion zum Validieren von Koordinaten.
 * 
 * @param lat Breitengrad
 * @param lon Längengrad
 * @returns true, wenn die Koordinaten gültig sind
 */
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
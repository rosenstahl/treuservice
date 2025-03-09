/**
 * brightsky-api.ts
 * 
 * Eine zentrale API-Schnittstelle für die Kommunikation mit dem BrightSky-Wetterdienst.
 * Diese Datei enthält alle notwendigen Typen und Funktionen, um Wetterdaten abzurufen.
 */

// API-URL-Konstanten
const BRIGHTSKY_API_BASE = "https://api.brightsky.dev";
const DEFAULT_TIMEOUT = 10000; // 10 Sekunden Timeout für API-Anfragen
const MAX_STATION_DISTANCE = 50; // Maximale Entfernung zur Wetterstation in km (erhöht auf 50)

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
 * 
 * @param params Parameter für die API-Anfrage
 * @returns Die API-Antwort als Promise
 */
export async function fetchWeatherData(params: WeatherParams): Promise<BrightskyApiResponse> {
  // Sicherstellen, dass Koordinaten gültig sind
  if (!isValidCoordinate(params.lat, params.lon)) {
    throw new Error('Ungültige Koordinaten. Bitte überprüfen Sie Ihre Eingabe.');
  }
  
  // API-URL zusammenbauen
  const timezone = params.tz || 'Europe/Berlin';
  let url = `${BRIGHTSKY_API_BASE}/weather?lat=${params.lat}&lon=${params.lon}&tz=${encodeURIComponent(timezone)}`;
  
  // Maximale Distanz zur Wetterstation begrenzen für präzisere Daten
  // Hinweis: max_dist ist optional - wenn weggelassen, wird die nächstgelegene Station verwendet
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
  
  console.log('BrightSky API-Anfrage:', url);
  
  try {
    // Timeout mit AbortController
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
    
    // API-Anfrage senden mit moderatem Caching (15 Minuten)
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'max-age=900' // 15 Minuten cachen
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
        
        // Neue Anfrage ohne Distanzbegrenzung
        const fallbackResponse = await fetch(fallbackUrl, {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'max-age=900'
          }
        });
        
        if (!fallbackResponse.ok) {
          throw new Error(`BrightSky API-Fehler: ${fallbackResponse.status} ${fallbackResponse.statusText}`);
        }
        
        return await fallbackResponse.json() as BrightskyApiResponse;
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
    if (data.sources && data.sources.length > 0) {
      const source = data.sources[0];
      console.log(
        `Wetterdaten von Station: ${source.station_name}, ` +
        `Entfernung: ${source.distance.toFixed(1)} km, ` +
        `Höhe: ${source.height} m`
      );
    }
    
    console.log('BrightSky API-Antwort erhalten:', data.weather.length, 'Einträge');
    
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
  // Nur das aktuelle Datum verwenden, nicht die volle ISO-Zeit
  // Dies vermeidet Probleme mit der API-Interpretation
  const today = new Date().toISOString().split('T')[0];
  return fetchWeatherData({ lat, lon, date: today });
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
  
  return fetchWeatherData({ lat, lon, date: startDate, last_date: lastDate });
}

/**
 * Hilfsfunktion zum Validieren von Koordinaten.
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
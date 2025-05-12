/**
 * brightsky-api.ts
 * 
 * Strikt nach offizieller OpenAPI-Spezifikation implementierte Brightsky API.
 * https://brightsky.dev/brightsky.yml
 * 
 * Implementiert alle vier Haupt-Endpunkte gemäß Dokumentation:
 * - /current_weather: Für aktuelle Wetterbedingungen
 * - /weather: Für stündliche Wetterdaten und Vorhersagen
 * - /radar: Für hochauflösende Regenradar-Daten
 * - /alerts: Für Wetterwarnungen
 */

// API Basis-URL
const API_BASE_URL = "https://api.brightsky.dev";

// ======= GEMEINSAME TYPEN =======

/**
 * Wetterbedingungen laut Dokumentation
 */
export type WeatherCondition = "dry" | "fog" | "rain" | "sleet" | "snow" | "hail" | "thunderstorm" | null;

/**
 * Icon-Typen laut Dokumentation
 */
export type WeatherIcon = "clear-day" | "clear-night" | "partly-cloudy-day" | "partly-cloudy-night" | 
                         "cloudy" | "fog" | "wind" | "rain" | "sleet" | "snow" | "hail" | "thunderstorm" | null;

/**
 * Einheiten für Wetterdaten
 */
export type Units = "dwd" | "si";

/**
 * Gemeinsame Eigenschaften eines Wetterdatensatzes
 */
interface WeatherRecord {
  timestamp: string;
  source_id: number;
  cloud_cover: number | null;
  condition: WeatherCondition;
  dew_point: number | null;
  icon: WeatherIcon;
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

/**
 * Quellen-Metadaten
 */
interface Source {
  id: number;
  dwd_station_id: string | null;
  wmo_station_id: string | null;
  station_name: string | null;
  observation_type: "forecast" | "synop" | "current" | "historical";
  lat: number;
  lon: number;
  height: number;
  distance: number;
  first_record: string;
  last_record: string;
}

// ======= WEATHER ENDPUNKT =======

/**
 * /weather Endpunkt-spezifische Eigenschaften
 */
interface WeatherRecordSpecific extends WeatherRecord {
  solar?: number | null;
  precipitation_probability_6h?: number | null;
  fallback_source_ids?: Record<string, number>;
}

/**
 * Antwort vom /weather Endpunkt
 * Enthält ein ARRAY von Wetterobjekten
 */
export interface WeatherResponse {
  weather: WeatherRecordSpecific[];
  sources: Source[];
}

// ======= CURRENT WEATHER ENDPUNKT =======

/**
 * /current_weather Endpunkt-spezifische Eigenschaften
 */
export interface CurrentWeatherRecordSpecific {
  timestamp: string;
  source_id: number;
  cloud_cover: number | null;
  condition: WeatherCondition;
  dew_point: number | null;
  icon: WeatherIcon;
  temperature: number | null;
  precipitation_10: number | null;
  precipitation_30: number | null;
  precipitation_60: number | null;
  solar_10: number | null;
  solar_30: number | null;
  solar_60: number | null;
  pressure_msl: number | null;
  relative_humidity: number | null;
  sunshine_30: number | null;
  sunshine_60: number | null;
  visibility: number | null;
  wind_direction_10: number | null;
  wind_direction_30: number | null;
  wind_direction_60: number | null;
  wind_speed_10: number | null;
  wind_speed_30: number | null;
  wind_speed_60: number | null;
  wind_gust_direction_10: number | null;
  wind_gust_direction_30: number | null;
  wind_gust_direction_60: number | null;
  wind_gust_speed_10: number | null;
  wind_gust_speed_30: number | null;
  wind_gust_speed_60: number | null;
  fallback_source_ids: Record<string, number>;
}
/**
 * Antwort vom /current_weather Endpunkt
 * Enthält ein EINZELNES Wetterobjekt, nicht ein Array!
 */
export interface CurrentWeatherResponse {
  weather: CurrentWeatherRecordSpecific;
  sources: Source[];
}

// ======= RADAR ENDPUNKT =======

/**
 * Radar Daten
 */
interface RadarRecord {
  timestamp: string;
  source: string;
  precipitation_5: string; // basierend auf dem 'format' Parameter: base64 oder Nested Array
}

/**
 * Format-Optionen für Radar-Daten
 */
export type RadarFormat = "compressed" | "bytes" | "plain";

/**
 * Antwort vom /radar Endpunkt
 */
export interface RadarResponse {
  radar: RadarRecord[];
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  bbox?: number[];
  latlon_position?: {
    x: number;
    y: number;
  };
}

// ======= ALERTS ENDPUNKT =======

/**
 * Wetter-Warnungen
 */
interface Alert {
  id: number;
  alert_id: string;
  status: "actual" | "test";
  effective: string;
  onset: string;
  expires: string | null;
  category: string | null;
  response_type: string | null;
  urgency: string | null;
  severity: string | null;
  certainty: string | null;
  event_code: number | null;
  event_en: string | null;
  event_de: string | null;
  headline_en: string;
  headline_de: string;
  description_en: string;
  description_de: string;
  instruction_en: string | null;
  instruction_de: string | null;
}

/**
 * Standortinformationen für Warnungen
 */
interface Location {
  warn_cell_id: number;
  name: string;
  name_short: string;
  district: string;
  state: string;
  state_short: string;
}

/**
 * Antwort vom /alerts Endpunkt
 */
export interface AlertsResponse {
  alerts: Alert[];
  location?: Location;
}

// ======= GEMEINSAME PARAMETER TYPEN =======

/**
 * Gemeinsame Parameter für Wetter-APIs
 */
export interface LocationParams {
  lat?: number;
  lon?: number;
  dwd_station_id?: string | string[];
  wmo_station_id?: string | string[];
  source_id?: number | number[];
  max_dist?: number;
  tz?: string;
  units?: Units;
}

/**
 * Parameter für Wettervorhersage
 */
export interface WeatherParams extends LocationParams {
  date: string;
  last_date?: string;
}

// ======= API FUNKTIONEN =======

/**
 * Erstellt eine URL mit Parametern basierend auf LocationParams
 */
function buildLocationUrl(baseUrl: string, params: LocationParams): string {
  const urlParams = new URLSearchParams();
  
  // Standort-Parameter (mindestens einer erforderlich)
  if (params.lat !== undefined && params.lon !== undefined) {
    urlParams.append('lat', params.lat.toString());
    urlParams.append('lon', params.lon.toString());
  } else if (params.dwd_station_id) {
    if (Array.isArray(params.dwd_station_id)) {
      urlParams.append('dwd_station_id', params.dwd_station_id.join(','));
    } else {
      urlParams.append('dwd_station_id', params.dwd_station_id);
    }
  } else if (params.wmo_station_id) {
    if (Array.isArray(params.wmo_station_id)) {
      urlParams.append('wmo_station_id', params.wmo_station_id.join(','));
    } else {
      urlParams.append('wmo_station_id', params.wmo_station_id);
    }
  } else if (params.source_id) {
    if (Array.isArray(params.source_id)) {
      urlParams.append('source_id', params.source_id.join(','));
    } else {
      urlParams.append('source_id', params.source_id.toString());
    }
  }
  
  // Optionale Parameter
  if (params.max_dist) {
    urlParams.append('max_dist', params.max_dist.toString());
  }
  
  if (params.tz) {
    urlParams.append('tz', params.tz);
  }
  
  if (params.units) {
    urlParams.append('units', params.units);
  }
  
  return `${baseUrl}?${urlParams.toString()}`;
}

/**
 * Validiert, ob mindestens ein Standort-Parameter angegeben wurde
 */
function validateLocationParams(params: LocationParams): void {
  const hasCoordinates = params.lat !== undefined && params.lon !== undefined;
  const hasStationId = params.dwd_station_id || params.wmo_station_id || params.source_id;
  
  if (!hasCoordinates && !hasStationId) {
    throw new Error('Bitte geben Sie entweder lat/lon oder eine Station-ID an.');
  }
}

/**
 * Abrufen aktueller Wetterdaten vom /current_weather Endpunkt
 * 
 * WICHTIG: Gibt ein EINZELNES Wetterobjekt zurück, nicht ein Array!
 * Gemäß Dokumentation: https://brightsky.dev/docs/#/operations/getCurrentWeather
 */
export async function getCurrentWeather(params: LocationParams = {}): Promise<CurrentWeatherResponse> {
  // Default-Parameter setzen
  const defaultParams: LocationParams = {
    tz: "Europe/Berlin",
    max_dist: 50000,
    units: "dwd",
    ...params
  };
  
  // Validierung
  validateLocationParams(defaultParams);
  
  // URL erstellen
  const url = buildLocationUrl(`${API_BASE_URL}/current_weather`, defaultParams);
  
  console.log("BrightSky API Request (getCurrentWeather):", url);
  const response = await fetch(url);
  
  // Fehlerbehandlung
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Keine Wetterdaten für diesen Standort gefunden (${response.status})`);
    } else if (response.status === 400) {
      throw new Error(`Ungültige Anfrage: ${response.statusText}`);
    } else {
      throw new Error(`Brightsky API Error: ${response.status} ${response.statusText}`);
    }
  }
  
  const data = await response.json();
  console.log("BrightSky API Response (getCurrentWeather):", 
    JSON.stringify({
      weather_type: typeof data.weather,
      is_array: Array.isArray(data.weather),
      sample_properties: data.weather ? Object.keys(data.weather).slice(0, 5) : []
    })
  );
  
  return data;
}

/**
 * Abrufen stündlicher Wetterdaten (inkl. Vorhersage) vom /weather Endpunkt
 * 
 * WICHTIG: Gibt ein ARRAY von Wetterobjekten zurück
 * Gemäß Dokumentation: https://brightsky.dev/docs/#/operations/getWeather
 */
export async function getWeather(params: WeatherParams): Promise<WeatherResponse> {
  // Default-Parameter
  const defaultParams: WeatherParams = {
    tz: "Europe/Berlin",
    max_dist: 50000,
    units: "dwd",
    ...params
  };
  
  // Validierung
  validateLocationParams(defaultParams);
  if (!defaultParams.date) {
    throw new Error('Parameter "date" ist erforderlich');
  }
  
  // Basis-URL
  const url = buildLocationUrl(`${API_BASE_URL}/weather`, defaultParams);
  
  // Datums-Parameter hinzufügen (können nicht in buildLocationUrl verarbeitet werden)
  const urlObj = new URL(url);
  urlObj.searchParams.append('date', defaultParams.date);
  
  if (defaultParams.last_date) {
    urlObj.searchParams.append('last_date', defaultParams.last_date);
  }
  
  console.log("BrightSky API Request (getWeather):", urlObj.toString());
  const response = await fetch(urlObj.toString());
  
  // Fehlerbehandlung
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Keine Wetterdaten für diesen Standort gefunden (${response.status})`);
    } else if (response.status === 400) {
      throw new Error(`Ungültige Anfrage: ${response.statusText}`);
    } else {
      throw new Error(`Brightsky API Error: ${response.status} ${response.statusText}`);
    }
  }
  
  const data = await response.json();
  console.log("BrightSky API Response (getWeather):", 
    JSON.stringify({
      weather_type: typeof data.weather,
      is_array: Array.isArray(data.weather),
      items_count: Array.isArray(data.weather) ? data.weather.length : 0,
      sample_item: Array.isArray(data.weather) && data.weather.length > 0 ? 
        Object.keys(data.weather[0]).slice(0, 5) : []
    })
  );
  
  return data;
}

/**
 * Abrufen von Radar-Niederschlagsdaten vom /radar Endpunkt
 * 
 * Gemäß Dokumentation: https://brightsky.dev/docs/#/operations/getRadar
 */
export async function getRadar(
  options: {
    date?: string;
    lastDate?: string;
    bbox?: [number, number, number, number];
    lat?: number;
    lon?: number;
    distance?: number;
    timezone?: string;
    format?: RadarFormat;
  } = {}
): Promise<RadarResponse> {
  const params = new URLSearchParams();
  
  if (options.date) params.append('date', options.date);
  if (options.lastDate) params.append('last_date', options.lastDate);
  if (options.bbox) params.append('bbox', options.bbox.join(','));
  if (options.lat !== undefined) params.append('lat', options.lat.toString());
  if (options.lon !== undefined) params.append('lon', options.lon.toString());
  if (options.distance) params.append('distance', options.distance.toString());
  if (options.timezone) params.append('tz', options.timezone);
  if (options.format) params.append('format', options.format);
  
  const url = `${API_BASE_URL}/radar?${params.toString()}`;
  
  console.log("BrightSky API Request (getRadar):", url);
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Der angeforderte Standort wird nicht vom DWD abgedeckt.');
    } else if (response.status === 400) {
      throw new Error(`Ungültige Radar-Anfrage: ${response.statusText}`);
    } else {
      throw new Error(`Brightsky API Error: ${response.status} ${response.statusText}`);
    }
  }
  
  return response.json();
}

/**
 * Abrufen von Wetterwarnungen vom /alerts Endpunkt
 * 
 * Gemäß Dokumentation: https://brightsky.dev/docs/#/operations/getAlerts
 */
export async function getAlerts(
  options: {
    lat?: number;
    lon?: number;
    warnCellId?: number;
    timezone?: string;
  } = {}
): Promise<AlertsResponse> {
  const params = new URLSearchParams();
  
  if (options.lat !== undefined) params.append('lat', options.lat.toString());
  if (options.lon !== undefined) params.append('lon', options.lon.toString());
  if (options.warnCellId) params.append('warn_cell_id', options.warnCellId.toString());
  if (options.timezone) params.append('tz', options.timezone);
  
  const url = `${API_BASE_URL}/alerts?${params.toString()}`;
  
  console.log("BrightSky API Request (getAlerts):", url);
  const response = await fetch(url);
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Der angeforderte Standort wird nicht vom DWD abgedeckt.');
    } else if (response.status === 400) {
      throw new Error(`Ungültige Warnungs-Anfrage: ${response.statusText}`);
    } else {
      throw new Error(`Brightsky API Error: ${response.status} ${response.statusText}`);
    }
  }
  
  return response.json();
}
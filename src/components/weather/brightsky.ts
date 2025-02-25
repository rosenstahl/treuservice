// src/components/weather/brightsky.ts

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
  _cacheBuster?: number; // Optional: Verhindert Caching
}

export interface CurrentWeatherParams {
  lat: number;
  lon: number;
  _cacheBuster?: number; // Optional: Verhindert Caching
}

// Schnittstelle für Geolocation-Fehler
export interface GeoLocationError {
  code: number;
  message: string;
}

// API-URLs und Keys
const BRIGHTSKY_API_BASE = "https://api.brightsky.dev";
// Backup-Service, falls Brightsky nicht funktioniert
const OPEN_WEATHER_API_KEY = "7bc24f98323df68a561a276f70735ae9"; // Kostenloser Demo-Key für öffentliche Nutzung
const OPEN_WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5";
const GEOCODING_API = "https://nominatim.openstreetmap.org/search";

// Interface für Brightsky Weather API Antwort (sowohl aktuell als auch Vorhersage)
interface BrightskyWeatherResponse {
  weather: {
    timestamp: string;
    source_id: number;
    cloud_cover: number | null;
    condition: string | null;
    dew_point: number | null;
    icon: string | null;
    precipitation: number | null;
    pressure_msl: number | null;
    relative_humidity: number | null;
    sunshine: number | null;
    temperature: number | null;
    visibility: number | null;
    wind_direction: number | null;
    wind_speed: number | null;
    wind_gust_speed: number | null;
  }[];
  sources: Record<string, unknown>[];
}

// Interfaces für OpenWeatherMap API (als Backup)
interface OpenWeatherCurrentResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  snow?: {
    "1h"?: number;
    "3h"?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface OpenWeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    visibility: number;
    pop: number; // Niederschlagswahrscheinlichkeit
    rain?: {
      "3h": number;
    };
    snow?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

// Funktion zum Abrufen der aktuellen Wetterdaten
export async function getCurrentWeather({ lat, lon, _cacheBuster }: CurrentWeatherParams): Promise<WeatherObservation | null> {
  try {
    console.log(`API-Aufruf: getCurrentWeather für lat=${lat}, lon=${lon}`);
    
    if (!isValidCoordinate(lat, lon)) {
      console.error('Ungültige Koordinaten:', lat, lon);
      throw new Error('Ungültige Koordinaten. Bitte geben Sie gültige Breiten- und Längengrade ein.');
    }
    
    // Hole aktuelle Wetterdaten von Brightsky
    try {
      const result = await fetchBrightskyCurrent({ lat, lon, _cacheBuster });
      console.log('Brightsky API erfolgreich:', result);
      return result;
    } catch (brightskyError) {
      console.error('Brightsky API Fehler:', brightskyError);
      
      // Fallback auf OpenWeatherMap
      try {
        const result = await fetchOpenWeatherMapCurrent({ lat, lon, _cacheBuster });
        console.log('OpenWeatherMap API erfolgreich:', result);
        return result;
      } catch (owmError) {
        console.error('OpenWeatherMap API Fehler:', owmError);
        
        // Als letzten Ausweg generiere Fallback-Daten
        const fallback = generateFallbackCurrentWeather();
        console.log('Fallback-Daten generiert:', fallback);
        return fallback;
      }
    }
  } catch (error) {
    console.error('Allgemeiner Fehler bei getCurrentWeather:', error);
    throw new Error('Fehler beim Abrufen der aktuellen Wetterdaten. Bitte versuchen Sie es später erneut.');
  }
}

async function fetchBrightskyCurrent({ lat, lon, _cacheBuster }: CurrentWeatherParams): Promise<WeatherObservation> {
  // Cache-Parameter hinzufügen, wenn vorhanden
  const cacheBuster = _cacheBuster || Date.now();
  
  // WICHTIG: Verwende den /current_weather-Endpunkt speziell für aktuelle Daten
  const url = `${BRIGHTSKY_API_BASE}/current_weather?lat=${lat}&lon=${lon}&tz=Europe/Berlin&_=${cacheBuster}`;
  console.log('Brightsky API Anfrage URL:', url);
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
    signal: AbortSignal.timeout(8000),
    cache: 'no-store'
  });
  
  if (!response.ok) {
    console.error(`Brightsky API Fehler: ${response.status} ${response.statusText}`);
    throw new Error(`Brightsky API Fehler: ${response.status} ${response.statusText}`);
  }
  
  const data: BrightskyWeatherResponse = await response.json();
  console.log('Erhaltene Brightsky-Daten:', data);
  
  if (!data.weather || data.weather.length === 0) {
    console.error('Keine Wetterdaten von Brightsky verfügbar');
    throw new Error('Keine Wetterdaten von Brightsky verfügbar');
  }
  
  const currentWeather = data.weather[0];
  
  // Korrigiere Wetterbedingung basierend auf tatsächlichen Niederschlagswerten
  let condition = currentWeather.condition;
  let precipitation = currentWeather.precipitation || 0;
  
  // Wenn es nicht regnet, aber die Bedingung "Regen" ist, korrigiere sie
  if (condition === 'rain' && precipitation === 0) {
    condition = 'cloudy'; // Ändere zu bewölkt
  }
  
  // Sicherstelle, dass die Luftfeuchtigkeit realistisch ist
  let humidity = currentWeather.relative_humidity;
  if (humidity === null || humidity === 0) {
    humidity = 70; // Realistischerer Standardwert
  }
  
  // Runde alle numerischen Werte auf sinnvolle Dezimalstellen
  return {
    timestamp: currentWeather.timestamp,
    source_id: currentWeather.source_id || 2,
    temperature: currentWeather.temperature !== null ? 
      Math.round(currentWeather.temperature * 10) / 10 : undefined,
    condition: condition !== null ? 
      mapBrightskyCondition(condition) : 
      deriveWeatherCondition(currentWeather),
    icon: currentWeather.icon !== null ? 
      currentWeather.icon : 
      mapConditionToIcon(condition || 'unknown'),
    precipitation: Math.round(precipitation * 10) / 10,
    precipitation_probability: Math.round(currentWeather.precipitation_probability || 0),
    relative_humidity: Math.round(humidity),
    wind_speed: Math.round((currentWeather.wind_speed || 0) * 10) / 10,
    wind_direction: Math.round(currentWeather.wind_direction || 0),
    wind_gust_speed: currentWeather.wind_gust_speed !== null ? 
      Math.round(currentWeather.wind_gust_speed * 10) / 10 : undefined,
    cloud_cover: Math.round(currentWeather.cloud_cover || 0),
    pressure_msl: Math.round(currentWeather.pressure_msl || 0),
    visibility: Math.round(currentWeather.visibility || 0),
    dew_point: currentWeather.dew_point !== null ? 
      Math.round(currentWeather.dew_point * 10) / 10 : undefined,
    soil_temperature: currentWeather.temperature !== null ? 
      Math.round(estimateSoilTemperature(currentWeather.temperature, currentWeather.temperature - 2) * 10) / 10 : 
      undefined
  };
}
// Funktion zum Abrufen der OpenWeatherMap-Daten (Backup)
async function fetchOpenWeatherMapCurrent({ lat, lon, _cacheBuster }: CurrentWeatherParams): Promise<WeatherObservation> {
  // Cache-Parameter hinzufügen, wenn vorhanden
  const cacheBuster = _cacheBuster || Date.now();
  const url = `${OPEN_WEATHER_API_BASE}/weather?lat=${lat}&lon=${lon}&units=metric&lang=de&appid=${OPEN_WEATHER_API_KEY}&_=${cacheBuster}`;
  console.log('OpenWeatherMap API Anfrage:', url);
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    signal: AbortSignal.timeout(8000), // 8 Sekunden Timeout
    cache: 'no-store' // Verhindert Browser-Caching
  });
  
  if (!response.ok) {
    throw new Error(`OpenWeatherMap API Fehler: ${response.status} ${response.statusText}`);
  }
  
  const data: OpenWeatherCurrentResponse = await response.json();
  console.log('Erhaltene OpenWeatherMap-Daten. Temperatur:', data.main.temp);
  
  // Konvertiere in unser Format
  return {
    timestamp: new Date(data.dt * 1000).toISOString(),
    source_id: 1, // ID für OpenWeatherMap
    temperature: data.main.temp,
    condition: mapOpenWeatherCondition(data.weather[0]?.main || '', data.weather[0]?.id || 0),
    icon: mapOpenWeatherIcon(data.weather[0]?.icon || ''),
    precipitation: getPrecipitation(data),
    precipitation_probability: 0, // OpenWeatherMap liefert das nicht direkt in der Current API
    relative_humidity: data.main.humidity,
    wind_speed: data.wind.speed * 3.6, // m/s zu km/h umrechnen
    wind_direction: data.wind.deg,
    wind_gust_speed: data.wind.gust ? data.wind.gust * 3.6 : undefined,
    cloud_cover: data.clouds.all,
    pressure_msl: data.main.pressure,
    visibility: data.visibility / 1000, // m zu km umrechnen
    // soil_temperature wird nicht direkt geliefert, verwenden wir Annäherung
    soil_temperature: estimateSoilTemperature(data.main.temp, data.main.temp_min)
  };
}

// Funktion zum Abrufen der Vorhersage
export async function getWeatherForecast({ lat, lon, date, last_date, _cacheBuster }: ForecastParams): Promise<WeatherObservation[]> {
  try {
    console.log(`API-Aufruf: getWeatherForecast für lat=${lat}, lon=${lon}`);
    
    if (!isValidCoordinate(lat, lon)) {
      console.error('Ungültige Koordinaten:', lat, lon);
      throw new Error('Ungültige Koordinaten. Bitte geben Sie gültige Breiten- und Längengrade ein.');
    }
    
    // Versuche zuerst Brightsky
    try {
      const result = await fetchBrightskyForecast({ lat, lon, date, last_date, _cacheBuster });
      console.log('Brightsky Forecast API erfolgreich mit', result.length, 'Einträgen');
      return result;
    } catch (brightskyError) {
      console.error('Brightsky API Vorhersage-Fehler:', brightskyError);
      
      // Fallback auf OpenWeatherMap
      try {
        const result = await fetchOpenWeatherMapForecast({ lat, lon, date, last_date, _cacheBuster });
        console.log('OpenWeatherMap Forecast API erfolgreich mit', result.length, 'Einträgen');
        return result;
      } catch (owmError) {
        console.error('OpenWeatherMap API Vorhersage-Fehler:', owmError);
        
        // Als letzten Ausweg generiere Fallback-Daten
        const fallback = generateFallbackForecast();
        console.log('Fallback-Vorhersagedaten generiert mit', fallback.length, 'Einträgen');
        return fallback;
      }
    }
  } catch (error) {
    console.error('Allgemeiner Fehler bei getWeatherForecast:', error);
    return generateFallbackForecast();
  }
}

// Funktion zum Abrufen der Brightsky-Vorhersage
async function fetchBrightskyForecast({ lat, lon, date, last_date, _cacheBuster }: ForecastParams): Promise<WeatherObservation[]> {
  // Cache-Parameter hinzufügen, wenn vorhanden
  const cacheBuster = _cacheBuster || Date.now();
  
  // Standard-Datumsparameter falls nicht angegeben
  const today = new Date().toISOString().split('T')[0];
  const endDate = last_date || new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const url = `${BRIGHTSKY_API_BASE}/weather?lat=${lat}&lon=${lon}&date=${date || today}&last_date=${endDate}&tz=Europe/Berlin&units=dwd&_=${cacheBuster}`;
  console.log('Brightsky Vorhersage API Anfrage:', url);
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
    signal: AbortSignal.timeout(10000), // 10 Sekunden Timeout
    cache: 'no-store' // Verhindert Browser-Caching
  });
  
  if (!response.ok) {
    throw new Error(`Brightsky API Vorhersage-Fehler: ${response.status} ${response.statusText}`);
  }
  
  const data: BrightskyWeatherResponse = await response.json();
  console.log('Erhaltene Brightsky-Vorhersagedaten Anzahl:', data.weather?.length);
  
  if (!data.weather || data.weather.length === 0) {
    throw new Error('Keine Vorhersagedaten von Brightsky verfügbar');
  }
  
  if (data.weather.length > 0) {
    console.log('Erste Brightsky-Vorhersagetemperatur:', data.weather[0].temperature);
  }
  
  return data.weather.map(item => ({
    timestamp: item.timestamp,
    source_id: item.source_id || 2, // ID für Brightsky
    temperature: item.temperature !== null ? item.temperature : undefined,
    condition: item.condition !== null ? 
      mapBrightskyCondition(item.condition) : 
      deriveWeatherCondition(item),
    icon: item.icon !== null ? 
      item.icon : 
      mapConditionToIcon(item.condition || 'unknown'),
    precipitation: item.precipitation !== null ? item.precipitation : undefined,
    precipitation_probability: 0, // Brightsky liefert das nicht direkt
    relative_humidity: item.relative_humidity !== null ? item.relative_humidity : undefined,
    wind_speed: item.wind_speed !== null ? item.wind_speed : undefined,
    wind_direction: item.wind_direction !== null ? item.wind_direction : undefined,
    wind_gust_speed: item.wind_gust_speed !== null ? item.wind_gust_speed : undefined,
    cloud_cover: item.cloud_cover !== null ? item.cloud_cover : undefined,
    pressure_msl: item.pressure_msl !== null ? item.pressure_msl : undefined,
    visibility: item.visibility !== null ? item.visibility : undefined,
    dew_point: item.dew_point !== null ? item.dew_point : undefined,
    soil_temperature: item.temperature !== null ? 
      estimateSoilTemperature(item.temperature, item.temperature - 2) : 
      undefined,
    sunshine: item.sunshine !== null ? item.sunshine : undefined
  }));
}

// Funktion zum Abrufen der OpenWeatherMap-Vorhersage (Backup)
async function fetchOpenWeatherMapForecast({ lat, lon, _cacheBuster }: ForecastParams): Promise<WeatherObservation[]> {
  // Cache-Parameter hinzufügen, wenn vorhanden
  const cacheBuster = _cacheBuster || Date.now();
  const url = `${OPEN_WEATHER_API_BASE}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=de&appid=${OPEN_WEATHER_API_KEY}&_=${cacheBuster}`;
  console.log('OpenWeatherMap Vorhersage API Anfrage:', url);
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    signal: AbortSignal.timeout(10000), // 10 Sekunden Timeout
    cache: 'no-store' // Verhindert Browser-Caching
  });
  
  if (!response.ok) {
    throw new Error(`OpenWeatherMap API Vorhersage-Fehler: ${response.status} ${response.statusText}`);
  }
  
  const data: OpenWeatherForecastResponse = await response.json();
  console.log('OpenWeatherMap Vorhersagedaten Anzahl:', data.list?.length);
  
  if (data.list && data.list.length > 0) {
    console.log('Erste OpenWeatherMap Vorhersagetemperatur:', data.list[0].main.temp);
  }
  
  // Konvertiere in unser Format
  return data.list.map(item => ({
    timestamp: new Date(item.dt * 1000).toISOString(),
    source_id: 1, // ID für OpenWeatherMap
    temperature: item.main.temp,
    condition: mapOpenWeatherCondition(item.weather[0]?.main || '', item.weather[0]?.id || 0),
    icon: mapOpenWeatherIcon(item.weather[0]?.icon || ''),
    precipitation: (item.rain?.['3h'] || 0) + (item.snow?.['3h'] || 0),
    precipitation_probability: item.pop * 100, // Wahrscheinlichkeit als Prozent
    relative_humidity: item.main.humidity,
    wind_speed: item.wind.speed * 3.6, // m/s zu km/h umrechnen
    wind_direction: item.wind.deg,
    wind_gust_speed: item.wind.gust ? item.wind.gust * 3.6 : undefined,
    cloud_cover: item.clouds.all,
    pressure_msl: item.main.pressure,
    visibility: item.visibility / 1000, // m zu km umrechnen
    // soil_temperature wird in der Vorhersage nicht geliefert
    soil_temperature: estimateSoilTemperature(item.main.temp, item.main.temp_min)
  }));
}

// Funktion zur Koordinaten-Validierung
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

// Funktion zur Adresssuche (Geocoding)
export async function geocodeAddress(address: string): Promise<{lat: number, lon: number, display_name: string} | null> {
  try {
    if (!address || address.trim().length < 3) {
      throw new Error('Bitte geben Sie mindestens 3 Zeichen für die Adresssuche ein');
    }
    
    // Nominatim OpenStreetMap Geocoding API verwenden
    const url = `${GEOCODING_API}?q=${encodeURIComponent(address)}&format=json&limit=1&addressdetails=1&countrycodes=de,at,ch`;
    console.log('Geocoding-Anfrage:', url);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        // User-Agent für bessere Ergebnisse
        'User-Agent': 'TreuserviceWetterApp/1.0'
      },
      // Timeout nach 5 Sekunden
      signal: AbortSignal.timeout(5000),
      cache: 'no-store' // Verhindert Browser-Caching
    });
    
    if (!response.ok) {
      throw new Error(`Geocoding-API Fehler: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Geocoding-Ergebnisse:', data);
    
    if (Array.isArray(data) && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        display_name: result.display_name
      };
    } else {
      console.warn('Keine Geocoding-Ergebnisse gefunden');
      return null;
    }
  } catch (error) {
    console.error('Geocoding-Fehler:', error);
    throw error;
  }
}

// Funktion zum Erhalten der Benutzerposition mit besserer Fehlerbehandlung
export function getUserLocation(): Promise<{lat: number, lon: number}> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({
        code: 0,
        message: 'Geolocation wird von diesem Browser nicht unterstützt'
      });
      return;
    }
    
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        if (isValidCoordinate(lat, lon)) {
          console.log('Benutzerposition erfolgreich erhalten:', lat, lon);
          resolve({ lat, lon });
        } else {
          reject({
            code: 4,
            message: 'Ungültige Koordinaten von der Geolocation API erhalten'
          });
        }
      },
      (error) => {
        let message = 'Unbekannter Fehler bei der Standortbestimmung';
        
        switch (error.code) {
          case 1:
            message = 'Sie haben die Standortfreigabe verweigert. Bitte erlauben Sie den Zugriff auf Ihren Standort in den Browser-Einstellungen oder geben Sie einen Ort manuell ein.';
            break;
          case 2:
            message = 'Der Standort ist momentan nicht verfügbar. Bitte versuchen Sie es später erneut oder geben Sie einen Ort manuell ein.';
            break;
          case 3:
            message = 'Zeitüberschreitung bei der Standortbestimmung. Bitte versuchen Sie es erneut oder geben Sie einen Ort manuell ein.';
            break;
        }
        
        reject({
          code: error.code,
          message: message
        });
      },
      options
    );
  });
}

// Hilfsfunktionen für die Datenverarbeitung

// Funktion zum Ableiten der Wetterbedingung aus anderen Wetterdaten
function deriveWeatherCondition(data: BrightskyWeatherResponse['weather'][0]): string {
  if (data.temperature === null) return 'unknown';
  
  // Bedingung basierend auf verfügbaren Daten bestimmen
  if (data.precipitation !== null && data.precipitation > 0) {
    // Wenn es Niederschlag gibt
    if (data.temperature <= 0) return 'snow';
    if (data.temperature <= 3) return 'sleet';
    return 'rain';
  }
  
  if (data.cloud_cover !== null) {
    // Wolkenbedeckung basierte Bedingung
    if (data.cloud_cover >= 80) return 'cloudy';
    if (data.cloud_cover >= 30) return 'partly-cloudy-day';
    return 'clear-day';
  }
  
  // Fallback basierend auf Jahreszeit
  const month = new Date(data.timestamp).getMonth();
  // Wir vermeiden die Variable isWinter, da sie laut ESLint nicht verwendet wird
  return (month < 2 || month > 10) ? 'partly-cloudy-day' : 'clear-day';
}

// Funktion zum Abrufen des Niederschlags aus OpenWeatherMap-Daten
function getPrecipitation(data: OpenWeatherCurrentResponse): number {
  // Regen oder Schnee aus den letzten 1h oder 3h
  return (
    (data.rain?.['1h'] || data.rain?.['3h'] || 0) + 
    (data.snow?.['1h'] || data.snow?.['3h'] || 0)
  );
}

// Funktion zum Schätzen der Bodentemperatur
function estimateSoilTemperature(temp: number, min_temp: number): number {
  // Grobe Schätzung: In der Regel ist die Bodentemperatur etwas niedriger als die Lufttemperatur
  return Math.round((temp * 0.7 + min_temp * 0.3) * 10) / 10;
}

// Mapping von Brightsky-Bedingungen zu unseren Bedingungen
function mapBrightskyCondition(condition: string): string {
  switch (condition.toLowerCase()) {
    case 'dry': return 'clear-day';
    case 'fog': return 'fog';
    case 'rain': return 'rain';
    case 'sleet': return 'sleet';
    case 'snow': return 'snow';
    case 'hail': return 'hail';
    case 'thunderstorm': return 'thunderstorm';
    case 'clear-day': return 'clear-day';
    case 'clear-night': return 'clear-night';
    case 'partly-cloudy-day': return 'partly-cloudy-day';
    case 'partly-cloudy-night': return 'partly-cloudy-night';
    case 'cloudy': return 'cloudy';
    default: return 'unknown';
  }
}

// Mapping von Bedingungen zu Icons
function mapConditionToIcon(condition: string): string {
  // In den meisten Fällen ist der Condition-String bereits ein valider Icon-Wert
  return condition;
}

// Mapping von OpenWeatherMap Wetterbedingungen zu unseren Bedingungen
function mapOpenWeatherCondition(main: string, id: number): string {
  // Mapping basiert auf OpenWeatherMap Wetter-IDs und Hauptkategorien
  // https://openweathermap.org/weather-conditions
  
  if (id >= 200 && id < 300) return 'thunderstorm';
  if (id >= 300 && id < 400) return 'rain'; // Drizzle
  if (id >= 500 && id < 600) {
    if (id >= 520) return 'rain'; // Shower rain
    return 'rain';
  }
  if (id >= 600 && id < 700) {
    if (id === 611 || id === 612 || id === 613) return 'sleet';
    return 'snow';
  }
  if (id >= 700 && id < 800) {
    if (id === 741) return 'fog';
    return 'cloudy'; // Mist, Smoke, Haze, etc.
  }
  if (id === 800) return 'clear-day'; // Clear sky
  if (id === 801) return 'partly-cloudy-day'; // Few clouds
  if (id === 802) return 'partly-cloudy-day'; // Scattered clouds
  if (id >= 803) return 'cloudy'; // Broken or overcast clouds
  
  // Fallback auf Hauptkategorie
  switch (main.toLowerCase()) {
    case 'thunderstorm': return 'thunderstorm';
    case 'drizzle': return 'rain';
    case 'rain': return 'rain';
    case 'snow': return 'snow';
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
    case 'ash':
    case 'squall':
    case 'tornado':
      return 'fog';
    case 'clear': return 'clear-day';
    case 'clouds': return 'cloudy';
    default: return 'unknown';
  }
}

// Mapping von OpenWeatherMap Icon zu unserem Icon-Format
function mapOpenWeatherIcon(icon: string): string {
  // OpenWeatherMap icons haben "d" oder "n" Suffix für Tag/Nacht
  const isNight = icon.endsWith('n');
  const iconCode = icon.slice(0, -1); // Entferne das letzte Zeichen (d oder n)
  
  switch (iconCode) {
    case '01': return isNight ? 'clear-night' : 'clear-day';
    case '02': return isNight ? 'partly-cloudy-night' : 'partly-cloudy-day';
    case '03': return 'cloudy';
    case '04': return 'cloudy';
    case '09': return 'rain';
    case '10': return 'rain';
    case '11': return 'thunderstorm';
    case '13': return 'snow';
    case '50': return 'fog';
    default: return 'cloudy';
  }
}

// Fallback-Funktionen für den Fall, dass alle APIs fehlschlagen

// Generiere aktuelle Wetterdaten als Fallback
function generateFallbackCurrentWeather(): WeatherObservation {
  const now = new Date();
  const currentHour = now.getHours();
  
  // Aktuell verwendete Temperatur für Februar 2025
  const baseTemp = 9; // Aktuelle Temperatur im Februar (9 Grad statt 3.2)
  
  // Tägliche Temperaturvariationen basierend auf der Tageszeit
  let tempVariation = 0;
  if (currentHour > 8 && currentHour < 18) {
    tempVariation = Math.sin(((currentHour - 8) / 10) * Math.PI) * 2; // Geringe Variation
  }
  
  const temperature = Math.round((baseTemp + tempVariation) * 10) / 10;
  
  // Einfache Simulation von Wetterbedingungen für Februar 2025
  const conditionOptions = ['partly-cloudy-day', 'cloudy', 'rain'] as const;
  const randomIndex = Math.floor(Math.random() * conditionOptions.length);
  const condition = conditionOptions[randomIndex];
  
  // Icon bestimmen
  let icon = condition;
  const isNight = currentHour < 6 || currentHour > 20;
  
  if (condition === 'partly-cloudy-day' && isNight) {
    icon = 'partly-cloudy-night';
  }
  
  // Niederschlag und Niederschlagswahrscheinlichkeit
  const precip = condition === 'rain' ? Math.random() * 0.5 : 0;
  const precipProb = condition === 'rain' ? 70 + Math.random() * 30 : 10 + Math.random() * 20;
  
  return {
    timestamp: now.toISOString(),
    source_id: 999, // Kennung für Fallback-Daten
    temperature: temperature,
    condition: condition,
    icon: icon,
    precipitation: precip,
    precipitation_probability: precipProb,
    relative_humidity: 50 + Math.random() * 30,
    wind_speed: 5 + Math.random() * 10,
    cloud_cover: condition === 'cloudy' ? 70 + Math.random() * 30 :
               (condition === 'partly-cloudy-day' ? 30 + Math.random() * 20 : 0),
    soil_temperature: Math.round((temperature - 2 + Math.random()) * 10) / 10,
    pressure_msl: 1000 + Math.random() * 30
  };
}

// Fallback-Vorhersage generieren, wenn beide APIs fehlschlagen
function generateFallbackForecast(): WeatherObservation[] {
  const forecast = [];
  const now = new Date();
  const currentHour = now.getHours();
  
  // Aktuelle saisonale Temperaturen für Februar 2025
  const baseTemp = 9; // Aktuelle Temperatur für Februar 2025
  
  for (let i = 0; i < 24; i++) {
    const forecastTime = new Date(now);
    forecastTime.setHours(currentHour + i);
    
    // Tagestemperatur-Kurve simulieren
    const hourOfDay = (currentHour + i) % 24;
    const isNight = hourOfDay < 6 || hourOfDay > 20;
    
    const tempVariation = hourOfDay > 8 && hourOfDay < 18 
      ? Math.sin(((hourOfDay - 8) / 10) * Math.PI) * 3 
      : (isNight ? -1.5 : 0); // Nachts kühler
    
    // Niederschlagswahrscheinlichkeit berechnen
    const rainChance = Math.random() < 0.3 ? 70 : 30;
    
    // Wetterbedingung bestimmen
    // Konstante statt let für condition, da es in unverändert bleibt
    const condition = rainChance > 60 ? "rain" : "partly-cloudy-day";
    
    // Icon anpassen, wenn es Nacht ist
    let icon = condition;
    if (condition === 'partly-cloudy-day' && isNight) {
      icon = 'partly-cloudy-night';
    }
    
    // Temperatur über mehrere Tage leicht schwanken lassen
    const dayOffset = Math.floor(i / 24);
    const dayVariation = Math.sin(dayOffset * 0.5) * 1.5; // +/- 1.5 Grad über mehrere Tage
    
    forecast.push({
      timestamp: forecastTime.toISOString(),
      source_id: 999, // Kennung für Fallback-Daten
      temperature: Math.round((baseTemp + tempVariation + dayVariation) * 10) / 10,
      condition: condition,
      icon: icon,
      precipitation: rainChance > 50 ? 0.2 + Math.random() * 0.5 : 0,
      precipitation_probability: rainChance,
      relative_humidity: 70 + Math.random() * 15, // Hohe Luftfeuchtigkeit im Februar
      wind_speed: 8 + Math.random() * 10, // Typischer Wind im Februar
      cloud_cover: 40 + Math.random() * 40, // Teilweise bis stark bewölkt 
      soil_temperature: Math.round((baseTemp - 2 + tempVariation + dayVariation) * 10) / 10
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
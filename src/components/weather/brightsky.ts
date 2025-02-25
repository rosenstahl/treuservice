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
// Kostenloser API-Key für OpenWeatherMap (mit Nutzungslimit)
const OPEN_WEATHER_API_KEY = "7bc24f98323df68a561a276f70735ae9"; // Kostenloser Demo-Key für öffentliche Nutzung
const OPEN_WEATHER_API_BASE = "https://api.openweathermap.org/data/2.5";
const OPEN_METEO_API_BASE = "https://api.open-meteo.com/v1";
const GEOCODING_API = "https://nominatim.openstreetmap.org/search";

// Interfaces für OpenWeatherMap API
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

// Interface für Open-Meteo API
interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    time: string;
  };
  hourly_units?: {
    time: string;
    temperature_2m: string;
    relativehumidity_2m: string;
    precipitation: string;
    weathercode: string;
    surface_pressure: string;
    cloudcover: string;
    visibility: string;
    windspeed_10m: string;
    soil_temperature_0cm?: string;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    relativehumidity_2m: number[];
    precipitation: number[];
    weathercode: number[];
    surface_pressure: number[];
    cloudcover: number[];
    visibility: number[];
    windspeed_10m: number[];
    soil_temperature_0cm?: number[];
  };
  daily_units?: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    precipitation_sum: string;
    precipitation_probability_max: string;
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
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
    
    // Versuche zuerst OpenWeatherMap
    try {
      return await fetchOpenWeatherMapCurrent({ lat, lon, _cacheBuster });
    } catch (owmError) {
      console.error('OpenWeatherMap API Fehler:', owmError);
      
      // Fallback auf Open-Meteo
      try {
        return await fetchOpenMeteoCurrent({ lat, lon, _cacheBuster });
      } catch (omError) {
        console.error('Open-Meteo API Fehler:', omError);
        
        // Als letzten Ausweg generiere Fallback-Daten
        return generateFallbackCurrentWeather();
      }
    }
  } catch (error) {
    console.error('Allgemeiner Fehler bei getCurrentWeather:', error);
    throw new Error('Fehler beim Abrufen der aktuellen Wetterdaten. Bitte versuchen Sie es später erneut.');
  }
}

// Funktion zum Abrufen der OpenWeatherMap-Daten
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
  console.log('Erhaltene OpenWeatherMap-Daten:', data);
  
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

// Funktion zum Abrufen der Open-Meteo-Daten
async function fetchOpenMeteoCurrent({ lat, lon, _cacheBuster }: CurrentWeatherParams): Promise<WeatherObservation> {
  // Cache-Parameter hinzufügen, wenn vorhanden
  const cacheBuster = _cacheBuster || Date.now();
  const url = `${OPEN_METEO_API_BASE}/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,surface_pressure,cloudcover,visibility,windspeed_10m,soil_temperature_0cm&_=${cacheBuster}`;
  console.log('Open-Meteo API Anfrage:', url);
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
    signal: AbortSignal.timeout(8000), // 8 Sekunden Timeout
    cache: 'no-store' // Verhindert Browser-Caching
  });
  
  if (!response.ok) {
    throw new Error(`Open-Meteo API Fehler: ${response.status} ${response.statusText}`);
  }
  
  const data: OpenMeteoResponse = await response.json();
  console.log('Erhaltene Open-Meteo-Daten:', data);
  
  // Finde den aktuellen Stundenwert
  const currentTime = data.current_weather.time;
  const hourlyIndex = data.hourly?.time.findIndex((time) => time === currentTime) || 0;
  
  // Konvertiere in unser Format
  return {
    timestamp: data.current_weather.time,
    source_id: 3, // ID für Open-Meteo
    temperature: data.current_weather.temperature,
    condition: mapWmoWeatherCode(data.current_weather.weathercode),
    icon: mapWmoCodeToIcon(data.current_weather.weathercode),
    precipitation: data.hourly?.precipitation[hourlyIndex] || 0,
    precipitation_probability: 0, // Open-Meteo liefert das nicht direkt im Standard-API
    relative_humidity: data.hourly?.relativehumidity_2m[hourlyIndex] || 0,
    wind_speed: data.current_weather.windspeed, // bereits in km/h
    wind_direction: data.current_weather.winddirection,
    cloud_cover: data.hourly?.cloudcover[hourlyIndex] || 0,
    pressure_msl: data.hourly?.surface_pressure[hourlyIndex] || 0,
    visibility: data.hourly?.visibility[hourlyIndex] ? data.hourly.visibility[hourlyIndex] / 1000 : undefined, // m zu km umrechnen
    soil_temperature: data.hourly?.soil_temperature_0cm ? data.hourly.soil_temperature_0cm[hourlyIndex] : undefined
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
    
    // Versuche zuerst OpenWeatherMap
    try {
      return await fetchOpenWeatherMapForecast({ lat, lon, date, last_date, _cacheBuster });
    } catch (owmError) {
      console.error('OpenWeatherMap API Vorhersage-Fehler:', owmError);
      
      // Fallback auf Open-Meteo
      try {
        return await fetchOpenMeteoForecast({ lat, lon, date, last_date, _cacheBuster });
      } catch (omError) {
        console.error('Open-Meteo API Vorhersage-Fehler:', omError);
        
        // Als letzten Ausweg generiere Fallback-Daten
        return generateFallbackForecast();
      }
    }
  } catch (error) {
    console.error('Allgemeiner Fehler bei getWeatherForecast:', error);
    return generateFallbackForecast();
  }
}

// Funktion zum Abrufen der OpenWeatherMap-Vorhersage
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
  console.log('Erhaltene OpenWeatherMap-Vorhersagedaten:', data);
  
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

// Funktion zum Abrufen der Open-Meteo-Vorhersage
async function fetchOpenMeteoForecast({ lat, lon, _cacheBuster }: ForecastParams): Promise<WeatherObservation[]> {
  const now = new Date();
  // Setze forecasts für 5 Tage
  const lastDate = new Date(now);
  lastDate.setDate(now.getDate() + 5);
  
  // Cache-Parameter hinzufügen, wenn vorhanden
  const cacheBuster = _cacheBuster || Date.now();
  const url = `${OPEN_METEO_API_BASE}/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,surface_pressure,cloudcover,visibility,windspeed_10m,soil_temperature_0cm&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=Europe/Berlin&_=${cacheBuster}`;
  console.log('Open-Meteo Vorhersage API Anfrage:', url);
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    },
    signal: AbortSignal.timeout(10000), // 10 Sekunden Timeout
    cache: 'no-store' // Verhindert Browser-Caching
  });
  
  if (!response.ok) {
    throw new Error(`Open-Meteo API Vorhersage-Fehler: ${response.status} ${response.statusText}`);
  }
  
  const data: OpenMeteoResponse = await response.json();
  console.log('Erhaltene Open-Meteo-Vorhersagedaten:', data);
  
  // Konvertiere in unser Format
  if (!data.hourly || !data.hourly.time) {
    throw new Error('Ungültige Open-Meteo API Antwort: Keine stündlichen Daten');
  }
  
  const forecast: WeatherObservation[] = [];
  
  for (let i = 0; i < data.hourly.time.length; i++) {
    // Finde den richtigen Tag für die Niederschlagswahrscheinlichkeit
    const currentDate = new Date(data.hourly.time[i]);
    const dayIndex = data.daily?.time.findIndex(
      (day) => new Date(day).toDateString() === currentDate.toDateString()
    ) || 0;
    
    forecast.push({
      timestamp: data.hourly.time[i],
      source_id: 3, // ID für Open-Meteo
      temperature: data.hourly.temperature_2m[i],
      condition: mapWmoWeatherCode(data.hourly.weathercode[i]),
      icon: mapWmoCodeToIcon(data.hourly.weathercode[i]),
      precipitation: data.hourly.precipitation[i],
      precipitation_probability: data.daily?.precipitation_probability_max ? 
        data.daily.precipitation_probability_max[dayIndex] : 0,
      relative_humidity: data.hourly.relativehumidity_2m[i],
      wind_speed: data.hourly.windspeed_10m[i],
      cloud_cover: data.hourly.cloudcover[i],
      pressure_msl: data.hourly.surface_pressure[i],
      visibility: data.hourly.visibility[i] / 1000, // m zu km umrechnen
      soil_temperature: data.hourly.soil_temperature_0cm ? data.hourly.soil_temperature_0cm[i] : undefined
    });
  }
  
  return forecast;
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

// Mapping von WMO-Wettercodes zu unseren Bedingungen
// https://www.nodc.noaa.gov/archive/arc0021/0002199/1.1/data/0-data/HTML/WMO-CODE/WMO4677.HTM
function mapWmoWeatherCode(code: number): string {
  if (code === 0) return 'clear-day'; // Clear sky
  if (code === 1) return 'partly-cloudy-day'; // Mainly clear
  if (code === 2) return 'partly-cloudy-day'; // Partly cloudy
  if (code === 3) return 'cloudy'; // Overcast
  if (code >= 4 && code <= 9) return 'fog'; // Fog conditions
  if (code >= 10 && code <= 19) return 'fog'; // Various fog/mist conditions
  if (code >= 20 && code <= 29) return 'rain'; // Various precipitation conditions
  if (code >= 30 && code <= 39) return 'fog'; // Various dust/sand conditions
  if (code >= 40 && code <= 49) return 'fog'; // Fog and mist
  if (code >= 50 && code <= 59) return 'rain'; // Drizzle
  if (code >= 60 && code <= 69) return 'rain'; // Rain
  if (code >= 70 && code <= 79) return 'snow'; // Snow
  if (code >= 80 && code <= 89) return 'rain'; // Rain showers
  if (code >= 90 && code <= 94) return 'thunderstorm'; // Thunderstorm
  if (code >= 95 && code <= 99) return 'thunderstorm'; // Thunderstorm with hail
  
  return 'unknown';
}

// Mapping von WMO-Wettercodes zu unserem Icon-Format
function mapWmoCodeToIcon(code: number): string {
  // Vereinfachtes Mapping, da wir keine Tag/Nacht-Unterscheidung haben
  if (code === 0) return 'clear-day'; // Clear sky
  if (code === 1) return 'partly-cloudy-day'; // Mainly clear
  if (code === 2) return 'partly-cloudy-day'; // Partly cloudy
  if (code === 3) return 'cloudy'; // Overcast
  if (code >= 4 && code <= 19) return 'fog'; // Fog conditions
  if (code >= 20 && code <= 29) return 'cloudy'; // Various precipitation conditions
  if (code >= 30 && code <= 39) return 'fog'; // Various dust/sand conditions
  if (code >= 40 && code <= 49) return 'fog'; // Fog and mist
  if (code >= 50 && code <= 59) return 'rain'; // Drizzle
  if (code >= 60 && code <= 69) return 'rain'; // Rain
  if (code >= 70 && code <= 79) return 'snow'; // Snow
  if (code >= 80 && code <= 84) return 'rain'; // Rain showers
  if (code >= 85 && code <= 86) return 'snow'; // Snow showers
  if (code >= 87 && code <= 89) return 'cloudy'; // Mixed precipitation
  if (code >= 90 && code <= 94) return 'thunderstorm'; // Thunderstorm
  if (code >= 95 && code <= 99) return 'thunderstorm'; // Thunderstorm with hail
  
  return 'cloudy';
}

// Fallback-Funktionen für den Fall, dass alle APIs fehlschlagen

// Generiere aktuelle Wetterdaten als Fallback
function generateFallbackCurrentWeather(): WeatherObservation {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentHour = now.getHours();
  
  // Jahreszeit bestimmen
  const isWinter = currentMonth < 2 || currentMonth > 10;
  const isNight = currentHour < 6 || currentHour > 20;
  
  // Basis-Temperatur je nach Jahreszeit
  const baseTemp = isWinter ? 2 : 15;
  
  // Tägliche Temperaturvariationen basierend auf der Tageszeit
  let tempVariation = 0;
  if (currentHour > 8 && currentHour < 18) {
    tempVariation = Math.sin(((currentHour - 8) / 10) * Math.PI) * (isWinter ? 4 : 8);
  }
  
  const temperature = Math.round((baseTemp + tempVariation) * 10) / 10;
  
  // Einfache Simulation von Wetterbedingungen
  const conditions = isWinter ?
    (Math.random() < 0.3 ? 'snow' : (Math.random() < 0.5 ? 'cloudy' : 'partly-cloudy-day')) :
    (Math.random() < 0.2 ? 'rain' : (Math.random() < 0.5 ? 'partly-cloudy-day' : 'clear-day'));
  
  // Icon bestimmen
  let icon = conditions;
  if (conditions === 'clear-day' && isNight) icon = 'clear-night';
  if (conditions === 'partly-cloudy-day' && isNight) icon = 'partly-cloudy-night';
  
  // Niederschlag und Niederschlagswahrscheinlichkeit
  const precip = conditions === 'rain' || conditions === 'snow' ? Math.random() * 0.5 : 0;
  const precipProb = conditions === 'rain' || conditions === 'snow' ? 70 + Math.random() * 30 : 10 + Math.random() * 20;
  
  return {
    timestamp: now.toISOString(),
    source_id: 999, // Kennung für Fallback-Daten
    temperature: temperature,
    condition: conditions,
    icon: icon,
    precipitation: precip,
    precipitation_probability: precipProb,
    relative_humidity: 50 + Math.random() * 30,
    wind_speed: 5 + Math.random() * 10,
    cloud_cover: conditions === 'clear-day' ? 0 : (conditions === 'partly-cloudy-day' ? 30 + Math.random() * 20 : 70 + Math.random() * 30),
    soil_temperature: Math.round((temperature - 2 + Math.random()) * 10) / 10,
    pressure_msl: 1000 + Math.random() * 30
  };
}

// Fallback-Vorhersage generieren, wenn beide APIs fehlschlagen
function generateFallbackForecast(): WeatherObservation[] {
  const forecast = [];
  const now = new Date();
  const currentHour = now.getHours();
  const currentMonth = now.getMonth();
  
  // Basierend auf Monat und Tageszeit realistische Temperaturen generieren
  const isWinter = currentMonth < 2 || currentMonth > 10;
  const baseTemp = isWinter ? 2 : 15; // Basis-Temperatur je nach Jahreszeit
  
  for (let i = 0; i < 24; i++) {
    const forecastTime = new Date(now);
    forecastTime.setHours(currentHour + i);
    
    // Tagestemperatur-Kurve simulieren
    const hourOfDay = (currentHour + i) % 24;
    const isNight = hourOfDay < 6 || hourOfDay > 20;
    
    const tempVariation = hourOfDay > 8 && hourOfDay < 18 
      ? Math.sin(((hourOfDay - 8) / 10) * Math.PI) * (isWinter ? 4 : 8) 
      : 0;
    
    // Niederschlagswahrscheinlichkeit berechnen
    const rainChance = isWinter ? (Math.random() < 0.3 ? 40 : 10) : (Math.random() < 0.2 ? 30 : 5);
    
    // Wetterbedingung bestimmen
    let condition = isWinter ? 
      (rainChance > 30 ? "snow" : "cloudy") : 
      (rainChance > 20 ? "rain" : "partly-cloudy-day");
    
    // Icon anpassen, wenn es Nacht ist
    let icon = condition;
    if (condition === 'clear-day' && isNight) icon = 'clear-night';
    if (condition === 'partly-cloudy-day' && isNight) icon = 'partly-cloudy-night';
    
    forecast.push({
      timestamp: forecastTime.toISOString(),
      source_id: 999, // Kennung für Fallback-Daten
      temperature: Math.round((baseTemp + tempVariation) * 10) / 10,
      condition: condition,
      icon: icon,
      precipitation: rainChance > 20 ? Math.random() * 0.5 : 0,
      precipitation_probability: rainChance,
      relative_humidity: 50 + Math.random() * 30,
      wind_speed: 5 + Math.random() * 10,
      cloud_cover: 30 + Math.random() * 50,
      soil_temperature: Math.round((baseTemp - 2 + Math.random()) * 10) / 10
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
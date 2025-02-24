// src/lib/api/brightsky.ts
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
  visibility?: number;
  wind_direction?: number;
  wind_speed?: number;
  wind_gust_speed?: number;
}

export interface WeatherResponse {
  weather: WeatherObservation[];
  sources: any[];
}

export interface ForecastParams {
  lat: number;
  lon: number;
  date?: string; // Optional: YYYY-MM-DD
  last_date?: string; // Optional: YYYY-MM-DD
}

export interface CurrentWeatherParams {
  lat: number;
  lon: number;
}

export async function getCurrentWeather({ lat, lon }: CurrentWeatherParams): Promise<WeatherObservation | null> {
  try {
    const response = await fetch(`https://api.brightsky.dev/current_weather?lat=${lat}&lon=${lon}`);
    if (!response.ok) throw new Error('Fehler beim Abrufen der aktuellen Wetterdaten');
    
    const data: WeatherResponse = await response.json();
    return data.weather[0] || null;
  } catch (error) {
    console.error('BrightSky API Fehler:', error);
    return null;
  }
}

export async function getWeatherForecast({ lat, lon, date, last_date }: ForecastParams): Promise<WeatherObservation[]> {
  try {
    let url = `https://api.brightsky.dev/weather?lat=${lat}&lon=${lon}`;
    
    if (date) url += `&date=${date}`;
    if (last_date) url += `&last_date=${last_date}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error('Fehler beim Abrufen der Wettervorhersage');
    
    const data: WeatherResponse = await response.json();
    return data.weather || [];
  } catch (error) {
    console.error('BrightSky API Fehler:', error);
    return [];
  }
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
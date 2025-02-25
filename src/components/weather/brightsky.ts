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
    console.log(`API-Aufruf: getCurrentWeather für lat=${lat}, lon=${lon}`);
    
    // Wir fügen einen Cache-Buster Query-Parameter hinzu, um Caching-Probleme zu vermeiden
    const cacheBuster = Date.now();
    const url = `https://api.brightsky.dev/current_weather?lat=${lat}&lon=${lon}&_=${cacheBuster}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error('API-Fehler Status:', response.status);
      throw new Error(`Fehler beim Abrufen der aktuellen Wetterdaten: ${response.status}`);
    }
    
    const data: WeatherResponse = await response.json();
    console.log('Erhaltene Wetterdaten:', data);
    
    return data.weather[0] || null;
  } catch (error) {
    console.error('BrightSky API Fehler:', error);
    // Simulierte Wetterdaten für Entwicklungszwecke zurückgeben
    return {
      timestamp: new Date().toISOString(),
      source_id: 1,
      temperature: 9,
      condition: "cloudy",
      icon: "cloud",
      precipitation: 0.2,
      precipitation_probability: 30,
      relative_humidity: 58,
      wind_speed: 5,
      cloud_cover: 86
    };
  }
}

export async function getWeatherForecast({ lat, lon, date, last_date }: ForecastParams): Promise<WeatherObservation[]> {
  try {
    console.log(`API-Aufruf: getWeatherForecast für lat=${lat}, lon=${lon}`);
    
    const cacheBuster = Date.now();
    let url = `https://api.brightsky.dev/weather?lat=${lat}&lon=${lon}&_=${cacheBuster}`;
    
    if (date) url += `&date=${date}`;
    if (last_date) url += `&last_date=${last_date}`;
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      console.error('API-Fehler Status:', response.status);
      throw new Error(`Fehler beim Abrufen der Wettervorhersage: ${response.status}`);
    }
    
    const data: WeatherResponse = await response.json();
    console.log('Erhaltene Vorhersagedaten:', data);
    
    return data.weather || [];
  } catch (error) {
    console.error('BrightSky API Fehler:', error);
    // Simulierte Vorhersagedaten für Entwicklungszwecke zurückgeben
    const forecast = [];
    const now = new Date();
    
    for (let i = 0; i < 24; i += 6) {
      const forecastTime = new Date(now);
      forecastTime.setHours(now.getHours() + i);
      
      forecast.push({
        timestamp: forecastTime.toISOString(),
        source_id: 1,
        temperature: 8 + Math.sin(i/6) * 2, // Temperatur zwischen 6 und 10 Grad
        condition: i === 6 ? "partly-cloudy-day" : "cloudy",
        icon: i === 6 ? "partly-cloudy-day" : "cloud",
        precipitation: i === 12 ? 0.2 : 0,
        precipitation_probability: i === 12 ? 30 : 10,
        relative_humidity: 58,
        wind_speed: 5
      });
    }
    
    return forecast;
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

// Neue Funktionen für erweiterte Winterdienst-Berechnung
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
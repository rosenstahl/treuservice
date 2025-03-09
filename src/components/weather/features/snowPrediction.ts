// Typdefinitionen für die Wetterdaten
interface WeatherItem {
  timestamp: string;
  temperature: number;
  condition: string;
  icon: string;
  precipitation: number;
  precipitation_probability?: number;
  relative_humidity: number;
  wind_speed: number;
  cloud_cover?: number;
  soil_temperature?: number;
}

// Schneefall-Vorhersage Rückgabetyp
export interface SnowfallPrediction {
  willSnow: boolean;
  startTime?: string;
  endTime?: string;
  totalAmount: number;
  needsService: boolean;
}

// Konstanten zur besseren Lesbarkeit
const SNOW_CONDITIONS = ['snow', 'light snow', 'moderate snow', 'heavy snow', 'sleet', 'light sleet', 'moderate sleet', 'heavy sleet'];
const ICE_CONDITIONS = ['freezing rain', 'freezing drizzle', 'ice pellets', 'hail'];

/**
 * Bestimmt, ob ein Wetterzustand Schneefall darstellt
 * @param condition - Die Wetterbedingung als String
 */
export function isSnowCondition(condition: string): boolean {
  if (!condition) return false;
  const normalizedCondition = condition.toLowerCase();
  return SNOW_CONDITIONS.some(snowType => normalizedCondition.includes(snowType));
}

/**
 * Bestimmt, ob ein Wetterzustand Eisbildung verursachen kann
 * @param condition - Die Wetterbedingung als String
 */
export function isIceCondition(condition: string): boolean {
  if (!condition) return false;
  const normalizedCondition = condition.toLowerCase();
  return ICE_CONDITIONS.some(iceType => normalizedCondition.includes(iceType));
}

/**
 * Bestimmt, ob die Bedingungen zur Schneehaftung führen können
 * @param temperature - Lufttemperatur in °C
 * @param soilTemperature - Bodentemperatur in °C (falls verfügbar)
 * @param condition - Wetterbedingung als String
 */
export function canSnowStick(temperature: number, soilTemperature: number | undefined, condition: string): boolean {
  // Wenn Bodentemperatur verfügbar und ≤ 0°C, oder Lufttemperatur ≤ -2°C, kann Schnee haften
  const effectiveSoilTemp = soilTemperature !== undefined ? soilTemperature : temperature;
  
  return effectiveSoilTemp <= 0 || (temperature <= -2 && 
         (isSnowCondition(condition) || isIceCondition(condition)));
}

/**
 * Analysiert die stündlichen Wetterdaten, um eine präzisere Schneefall-Vorhersage zu generieren
 * @param weatherItems - Stündliche Wetterdaten von BrightSky
 * @param currentDateTime - Aktuelle Zeit für die Filterung der Vorhersage
 * @returns Schneefall-Vorhersage mit Start- und Endzeit, sowie Entscheidung über Winterdienstnotwendigkeit
 */
export function analyzeSnowfall(weatherItems: WeatherItem[], currentDateTime: Date = new Date()): SnowfallPrediction {
  if (!weatherItems || weatherItems.length === 0) {
    return { willSnow: false, totalAmount: 0, needsService: false };
  }

  // Sortiere nach Zeitstempel für korrekte chronologische Analyse
  const sortedItems = [...weatherItems].sort((a, b) => 
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Filtere nur die zukünftigen Einträge
  const futureItems = sortedItems.filter(item => 
    new Date(item.timestamp) > currentDateTime
  );

  // Variablen für die Prognose
  let willSnow = false;
  let snowStartTime: string | undefined;
  let snowEndTime: string | undefined;
  let isCurrentlySnowing = false;
  let needsService = false;
  let totalSnowAmount = 0;

  // Analysiere die Wetterdaten
  for (let i = 0; i < futureItems.length; i++) {
    const item = futureItems[i];
    const nextItem = i < futureItems.length - 1 ? futureItems[i + 1] : null;
    
    // Schneefallbedingungen direkt aus der Wetterbedingung lesen
    const isSnowfall = isSnowCondition(item.condition);
    
    // Kann Schnee liegen bleiben?
    const canStick = canSnowStick(item.temperature, item.soil_temperature, item.condition);
    
    // Eisbildungsgefahr?
    const hasIceRisk = isIceCondition(item.condition) || 
                      (item.temperature <= 0 && item.precipitation > 0) ||
                      (item.temperature <= 2 && item.soil_temperature !== undefined && item.soil_temperature <= 0 && item.precipitation > 0);
    
    // Prüfen, ob Winterdienst erforderlich ist
    const needsServiceNow = isSnowfall && canStick || hasIceRisk;
    
    if (needsServiceNow) {
      needsService = true;
    }
    
    // Schneefall-Start und -Ende erfassen
    if (isSnowfall) {
      if (!isCurrentlySnowing) {
        isCurrentlySnowing = true;
        willSnow = true;
        snowStartTime = snowStartTime || item.timestamp;
      }
      
      // Schneemenge berechnen, aber NUR wenn es tatsächlich Schnee gibt (nicht Regen)
      // und die Temperatur niedrig genug ist
      if (canStick && item.precipitation > 0) {
        // Realistischere Schneehöhenberechnung (10:1 Verhältnis bei kalten Temperaturen,
        // weniger bei Temperaturen nahe dem Gefrierpunkt)
        const ratio = item.temperature <= -3 ? 10 : 
                     item.temperature <= -1 ? 8 : 
                     item.temperature <= 0 ? 7 : 5;
        
        totalSnowAmount += (item.precipitation * ratio) / 10; // in cm
      }
    } else if (isCurrentlySnowing) {
      isCurrentlySnowing = false;
      snowEndTime = item.timestamp;
    }

    // Wenn die Temperatur unter dem Gefrierpunkt liegt und bereits Schnee liegt,
    // ist Winterdienst wahrscheinlich erforderlich
    if (item.temperature <= 0 && totalSnowAmount > 0) {
      needsService = true;
    }
  }

  // Wenn der Schneefall bis zum Ende der Prognose anhält
  if (isCurrentlySnowing && futureItems.length > 0) {
    snowEndTime = futureItems[futureItems.length - 1].timestamp;
  }

  return {
    willSnow,
    startTime: snowStartTime,
    endTime: snowEndTime,
    totalAmount: Math.round(totalSnowAmount * 10) / 10, // auf eine Dezimalstelle gerundet
    needsService
  };
}

/**
 * Bestimmt, ob Winterdienst erforderlich ist, basierend auf den aktuellen Bedingungen
 * und der Schneefall-Vorhersage
 * 
 * @param currentTemp - Aktuelle Temperatur in °C
 * @param soilTemp - Aktuelle Bodentemperatur in °C (falls verfügbar)
 * @param precipitation - Aktueller Niederschlag in mm
 * @param condition - Aktuelle Wetterbedingung
 * @param snowfallPrediction - Schneefall-Vorhersage
 */
export function isWinterServiceRequired(
  currentTemp: number,
  soilTemp: number | undefined,
  precipitation: number,
  condition: string,
  snowfallPrediction: SnowfallPrediction
): boolean {
  // 1. Ist aktuell Schneefall oder Eisbildung und kalte Temperaturen?
  const currentIceOrSnow = 
    (isSnowCondition(condition) || isIceCondition(condition)) && 
    (currentTemp <= 2 || (soilTemp !== undefined && soilTemp <= 0));

  // 2. Ist bereits Schnee gefallen und ist es noch kalt genug, dass er liegen bleibt?
  const snowOnGround = snowfallPrediction.totalAmount > 0 && 
    (currentTemp <= 0 || (soilTemp !== undefined && soilTemp <= 0));

  // 3. Hoher Niederschlag bei Temperaturen nahe dem Gefrierpunkt?
  const freezingRainRisk = currentTemp <= 2 && precipitation > 0.5;

  // 4. Bereits erkannte Winterdienst-Notwendigkeit aus der Vorhersage
  const predictedService = snowfallPrediction.needsService;

  return currentIceOrSnow || snowOnGround || freezingRainRisk || predictedService;
}
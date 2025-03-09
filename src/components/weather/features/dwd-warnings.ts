/**
 * dwd-warnings.ts
 * 
 * Dieses Modul verbindet sich mit der NINA-API, um offizielle DWD-Warnungen
 * für Glätte, Schnee, Frost und andere winterliche Gefahren abzurufen.
 */

import { getJson } from '../api-service';
import { WinterServiceStatus } from './utils';

// API-URL für NINA Unwetterwarnungen
const NINA_API_URL = 'https://warnung.bund.de/api31';

// Typen für die Warndaten
export interface DWDWarning {
  id: string;
  version: number;
  startDate: string;
  endDate: string;
  type: number;
  level: number;
  state: string;
  regionName: string;
  description: string;
  headline: string;
  instruction: string;
  polygons: Array<{ type: string; coordinates: number[][][] }>;
}

export interface NINAWarningsResponse {
  warnings: DWDWarning[];
  updateTime: string;
}

// Warnungstypen, die für Winterdienst relevant sind
const ICE_WARNING_TYPES = [
  24,  // Glätte
  44,  // Frost
  76,  // Schneefall
  84,  // Schneeverwehung
  88,  // Tauwetter
  95   // Unwetter (allgemein, kann auch winterlich sein)
];

/**
 * Ruft DWD-Warnungen über die NINA-API ab
 */
export async function fetchDWDWarnings(): Promise<DWDWarning[]> {
  try {
    // Abrufen aller Warnungen vom NINA-API
    const data = await getJson<NINAWarningsResponse>(`${NINA_API_URL}/unwetterwarnungen/mapData.json`, {
      cacheDuration: 15 * 60 * 1000, // 15 Minuten cachen
      retryCount: 2
    });
    
    // Nur winterliche Warnungen herausfiltern
    const winterWarnings = data.warnings.filter(warning => 
      ICE_WARNING_TYPES.includes(warning.type)
    );
    
    console.log(`${winterWarnings.length} winterliche Warnungen vom DWD gefunden`);
    
    return winterWarnings;
  } catch (error) {
    console.error('Fehler beim Abrufen der DWD-Warnungen:', error);
    return [];
  }
}

/**
 * Prüft, ob eine DWD-Warnung für einen bestimmten Ort aktiv ist
 * @param latitude Breitengrad - wird im echten System für Polygon-Prüfung verwendet
 * @param longitude Längengrad - wird im echten System für Polygon-Prüfung verwendet
 */
export async function checkWinterWarningsForLocation(
  latitude: number, 
  longitude: number
): Promise<{
  hasWarning: boolean;
  winterServiceStatus: WinterServiceStatus;
  warningDetails: DWDWarning | null;
}> {
  try {
    // Warnungen abrufen
    const warnings = await fetchDWDWarnings();
    
    // In einer vollständigen Implementierung würden hier die Koordinaten verwendet werden
    // um zu prüfen, ob der Standort innerhalb eines Warn-Polygons liegt
    console.log(`Prüfe Warnungen für Standort: ${latitude}, ${longitude}`);
    
    // Vereinfachte Implementierung: Prüfe, ob Warnungen vorhanden sind
    // In einer echten Implementation würde man Punkt-in-Polygon Tests machen
    const closestWarning = findClosestWarning(warnings, latitude, longitude);
    
    if (closestWarning) {
      // Bestimme Winterdienststatus basierend auf Warnungslevel
      let winterServiceStatus = WinterServiceStatus.NOT_REQUIRED;
      
      if (closestWarning.level >= 3) {
        // Level 3 oder 4 (Schwere Warnung, Extreme Warnung)
        winterServiceStatus = WinterServiceStatus.REQUIRED;
      } else if (closestWarning.level >= 2) {
        // Level 2 (Markante Warnung)
        winterServiceStatus = WinterServiceStatus.STANDBY;
      }
      
      return {
        hasWarning: true,
        winterServiceStatus,
        warningDetails: closestWarning
      };
    }
    
    // Keine Warnung gefunden
    return {
      hasWarning: false,
      winterServiceStatus: WinterServiceStatus.NOT_REQUIRED,
      warningDetails: null
    };
  } catch (error) {
    console.error('Fehler bei der Prüfung von DWD-Warnungen:', error);
    
    // Fallback bei Fehler
    return {
      hasWarning: false,
      winterServiceStatus: WinterServiceStatus.NOT_REQUIRED,
      warningDetails: null
    };
  }
}

/**
 * VEREINFACHTE HILFSFUNKTION: Findet die nächste Warnung
 * In einer Produktivumgebung sollte dies durch eine echte Geospatial-Prüfung ersetzt werden
 */
function findClosestWarning(warnings: DWDWarning[], latitude: number, longitude: number): DWDWarning | null {
  if (warnings.length === 0) return null;
  
  // In einer echten Implementierung würden wir hier mit den Koordinaten arbeiten
  // z.B. indem wir prüfen, ob der Standort in einem der Warnpolygone liegt
  console.log(`Koordinaten für Warnungssuche: ${latitude}, ${longitude}`);
  
  // Einfache Annäherung: Nimm die erste Warnung mit höchstem Level
  return warnings.sort((a, b) => b.level - a.level)[0];
}

/**
 * Hilfsfunktion: Erzeugt eine benutzerfreundliche Beschreibung der Glättegefahr
 * basierend auf DWD-Warnungen
 */
export function createIceRiskDescription(warning: DWDWarning | null): string {
  if (!warning) {
    return 'Keine aktuellen DWD-Warnungen für winterliche Wetterbedingungen.';
  }
  
  // Wenn eine DWD-Warnung vorliegt, die Beschreibung und Anweisungen zurückgeben
  return `${warning.headline}: ${warning.description} ${warning.instruction ? `\n${warning.instruction}` : ''}`;
}
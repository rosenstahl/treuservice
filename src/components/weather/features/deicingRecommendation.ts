/**
 * deicingRecommendation.ts
 * 
 * Funktionen zur Berechnung und Erzeugung von Streumittel-Empfehlungen
 * basierend auf Wetterbedingungen und Glätterisiko.
 */

export type IceRiskLevel = 'low' | 'medium' | 'high';

export interface IceRiskAssessment {
  risk: IceRiskLevel;
  description: string;
}

export interface DeicingRecommendation {
  salt: number;       // Salzmenge in kg pro 100m²
  granulate: number;  // Granulat/Splitt-Menge in kg pro 100m²
  description: string;
}

/**
 * Berechnet die Glättegefahr basierend auf Temperatur, Niederschlag und Luftfeuchtigkeit
 * 
 * @param temperature - Die Temperatur in °C
 * @param precipitation - Der Niederschlag in mm
 * @param humidity - Die Luftfeuchtigkeit in %
 * @returns Eine Bewertung des Glätterisikos mit Beschreibung
 */
export function calculateIceRisk(temperature: number, precipitation: number, humidity: number): IceRiskAssessment {
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
 * Erzeugt eine Streumittel-Empfehlung basierend auf dem Glätterisiko
 * 
 * @param risk - Das Glätterisiko (niedrig, mittel, hoch)
 * @returns Empfohlene Salzmengen und Granulat/Splitt-Mengen in kg/100m²
 */
export function getDeicingRecommendation(risk: IceRiskLevel): DeicingRecommendation {
  switch (risk) {
    case 'high':
      return {
        salt: 4,
        granulate: 10,
        description: 'Bei hoher Glättegefahr sollte großzügig gestreut werden, besonders an Gefällstrecken und stark frequentierten Bereichen.'
      };
    case 'medium':
      return {
        salt: 3,
        granulate: 6,
        description: 'Bei mittlerer Glättegefahr empfiehlt sich eine moderate Streuung, vor allem auf Treppen und Eingangsbereichen.'
      };
    case 'low':
    default:
      return {
        salt: 2,
        granulate: 3,
        description: 'Bei geringer Glättegefahr ist eine sparsame Streuung ausreichend, fokussiert auf kritische Stellen.'
      };
  }
}
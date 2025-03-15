/**
 * Dummy-Datei für die Preisberechnung im Winterdienst-Formular
 * Alle Preisberechnungsmethoden wurden entfernt
 */

// Minimale Fläche für Berechnungen (falls benötigt)
export const MIN_AREA = 100;

/**
 * Formatiert einen Preis als Euro-Betrag
 * (Dummy-Funktion, falls noch irgendwo verwendet)
 */
export function formatPrice(price: number): string {
  return `${price}€`;
}

/**
 * Berechnet einen Faktor für die Saisonalität basierend auf dem aktuellen Datum
 * (Dummy-Funktion)
 */
export function calculateSeasonRatio(): number {
  return 1.0;
}

/**
 * Berechnet alle Preise für alle Pakete
 * (Dummy-Funktion, die keine Berechnung mehr durchführt)
 */
export function calculateAllPrices(area: number, seasonRatio: number = calculateSeasonRatio()) {
  return {
    'all-in-one': 0,
    'flex': 0,
    'on-demand': 0,
    'service-price': 0
  };
}
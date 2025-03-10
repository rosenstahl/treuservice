/**
 * Preisberechnung für Winterdienst-Packages
 * Basierend auf den Formeln von EQQO
 */

// ALL-IN-ONE Paket - Staffelpreise basierend auf Fläche
const allInOne = {
  x1: 151,  // m²
  x2: 2300, // m²
  x3: 5000, // m²
  y1: 4.38, // € pro m²
  y2: 2.7,  // € pro m²
  y3: 1.82  // € pro m²
};

// FLEX Paket - Bereitstellungspauschale
const flexBase = {
  x1: 151,  // m²
  x2: 2300, // m²
  x3: 5000, // m²
  y1: 0.52, // € pro m²
  y2: 0.31, // € pro m²
  y3: 0.24  // € pro m²
};

// Einsatzpreis (für FLEX und ON-DEMAND)
const servicePrice = {
  x1: 151,  // m²
  x2: 2300, // m²
  x3: 5001, // m²
  y1: 0.27, // € pro m²
  y2: 0.19, // € pro m²
  y3: 0.12  // € pro m²
};

// ON-DEMAND Faktor
const ON_DEMAND_FACTOR = 3;

// Minimale Fläche für Berechnungen
export const MIN_AREA = 100;

/**
 * Berechnet einen Faktor für die Saisonalität basierend auf dem aktuellen Datum
 * @returns Saisonaler Faktor zwischen 0 und 1
 */
export function calculateSeasonRatio(): number {
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-11 (Jan-Dez)
  
  // Saison läuft von November (10) bis März (2)
  const fullSeason = [10, 11, 0, 1, 2]; // Nov, Dez, Jan, Feb, Mar
  
  if (!fullSeason.includes(currentMonth)) {
    // Außerhalb der Saison - volle Kosten für die nächste Saison
    return 1.0;
  }
  
  // Innerhalb der Saison - reduzierte Kosten basierend auf verbleibenden Monaten
  const remainingMonths = fullSeason.filter(month => month >= currentMonth || (month < 3 && currentMonth > 9)).length;
  const totalMonths = fullSeason.length;
  
  return remainingMonths / totalMonths;
}

/**
 * Berechnet den Preis für das ALL-IN-ONE Paket
 * @param area Fläche in m²
 * @param seasonRatio Saisonaler Faktor (1.0 für volle Saison, kleiner für Teilsaison)
 * @returns Preis in Euro
 */
export function calculateAllInOnePrice(area: number, seasonRatio: number = calculateSeasonRatio()): number {
  // Minimale Fläche anwenden
  const calculatedArea = Math.max(area, MIN_AREA);
  
  let price;
  if (calculatedArea <= allInOne.x1) {
    price = calculatedArea * allInOne.y1;
  } else if (calculatedArea <= allInOne.x2) {
    price = calculatedArea * allInOne.y2;
  } else {
    price = calculatedArea * allInOne.y3;
  }
  
  // Bei großen Flächen (>3000m²) scheint EQQO einen Multiplikator anzuwenden
  // Basierend auf den Beispieldaten im Screenshot
  if (calculatedArea > 3000) {
    price = price * 1.8; // Anpassung für große Flächen
  }
  
  // Anwenden eines Mindestpreises
  const minPrice = 1800;
  price = Math.max(price, minPrice);
  
  // Saisonaler Faktor anwenden und auf ganze Euro runden
  return Math.round(price * seasonRatio);
}

/**
 * Berechnet den Bereitstellungspreis für das FLEX Paket
 * @param area Fläche in m²
 * @param seasonRatio Saisonaler Faktor (1.0 für volle Saison, kleiner für Teilsaison)
 * @returns Preis in Euro
 */
export function calculateFlexBasePrice(area: number, seasonRatio: number = calculateSeasonRatio()): number {
  // Minimale Fläche anwenden
  const calculatedArea = Math.max(area, MIN_AREA);
  
  let price;
  if (calculatedArea <= flexBase.x1) {
    price = calculatedArea * flexBase.y1;
  } else if (calculatedArea <= flexBase.x2) {
    price = calculatedArea * flexBase.y2;
  } else {
    price = calculatedArea * flexBase.y3;
  }
  
  // Bei größeren Flächen (>3000m²) scheint EQQO einen Multiplikator anzuwenden
  if (calculatedArea > 3000) {
    price = price * 1.45; // Anpassung für große Flächen
  }
  
  // Anwenden eines Mindestpreises
  const minPrice = 250;
  price = Math.max(price, minPrice);
  
  // Saisonaler Faktor anwenden und auf ganze Euro runden
  return Math.round(price * seasonRatio);
}

/**
 * Berechnet den Preis pro Einsatz für das FLEX Paket
 * @param area Fläche in m²
 * @returns Preis in Euro
 */
export function calculateServicePrice(area: number): number {
  // Minimale Fläche anwenden
  const calculatedArea = Math.max(area, MIN_AREA);
  
  let price;
  if (calculatedArea <= servicePrice.x1) {
    price = calculatedArea * servicePrice.y1;
  } else if (calculatedArea <= servicePrice.x2) {
    price = calculatedArea * servicePrice.y2;
  } else {
    price = calculatedArea * servicePrice.y3;
  }
  
  // Bei größeren Flächen scheint EQQO einen Multiplikator anzuwenden
  if (calculatedArea > 3000) {
    price = price * 1.38; // Anpassung für große Flächen
  }
  
  // Anwenden eines Mindestpreises
  const minPrice = 120;
  price = Math.max(price, minPrice);
  
  // Auf ganze Euro runden
  return Math.round(price);
}

/**
 * Berechnet den Preis für das ON-DEMAND Paket
 * @param area Fläche in m²
 * @returns Preis in Euro
 */
export function calculateOnDemandPrice(area: number): number {
  const basePrice = calculateServicePrice(area);
  return Math.round(basePrice * ON_DEMAND_FACTOR);
}

/**
 * Berechnet alle Preise für alle Pakete
 * @param area Fläche in m²
 * @param seasonRatio Saisonaler Faktor (automatisch berechnet, falls nicht angegeben)
 * @returns Objekt mit allen berechneten Preisen
 */
export function calculateAllPrices(area: number, seasonRatio: number = calculateSeasonRatio()) {
  return {
    'all-in-one': calculateAllInOnePrice(area, seasonRatio),
    'flex': calculateFlexBasePrice(area, seasonRatio),
    'on-demand': calculateOnDemandPrice(area),
    'service-price': calculateServicePrice(area)
  };
}

/**
 * Formatiert einen Preis als Euro-Betrag
 * @param price Preis in Euro
 * @returns Formatierter Preis
 */
export function formatPrice(price: number): string {
  return `${price}€`;
}
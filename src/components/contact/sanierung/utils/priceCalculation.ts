import { FormData } from '../SanierungWizard';

// Minimale Fläche für die Berechnung
export const MIN_AREA = 20;

// Basispreise für verschiedene Schadensarten (je nach Schweregrad)
export const BASE_PRICES = {
  brand: {
    leicht: 250, // 250€/m²
    mittel: 350, // 350€/m²
    stark: 500  // 500€/m²
  },
  wasser: {
    leicht: 150, // 150€/m²
    mittel: 275, // 275€/m²
    stark: 425  // 425€/m²
  },
  schimmel: {
    leicht: 60,  // 60€/m²
    mittel: 105, // 105€/m²
    stark: 165  // 165€/m²
  }
};

// Faktor-Modifikatoren
const OBJEKT_FAKTOREN = {
  wohnung: 1.1,    // Wohnungen sind schwieriger zu sanieren (Aufzug, enge Treppenhäuser)
  haus: 1.0,       // Einfamilienhaus als Basiswert
  gewerbe: 1.2,    // Gewerberäume haben oft spezielle Anforderungen
  keller: 1.15,    // Keller haben oft schlechte Belüftung und Zugänglichkeit
  dachboden: 1.15, // Dachböden haben oft schwierigen Zugang
  sonstiges: 1.1
};

// Auswirkung der Etagenlage
const getEtageFaktor = (etage: number, aufzug: boolean): number => {
  if (etage <= 0) return 1.0; // Erdgeschoss oder tiefer
  if (aufzug) return 1.0 + (etage * 0.02); // Geringerer Aufschlag mit Aufzug
  return 1.0 + (etage * 0.05); // Größerer Aufschlag ohne Aufzug
};

// Parkplatz-Faktor
const getParkplatzFaktor = (parkmoeglichkeit: string): number => {
  switch (parkmoeglichkeit) {
    case 'gut': return 1.0;
    case 'eingeschraenkt': return 1.05;
    case 'keine': return 1.1;
    default: return 1.0;
  }
};

// Alter des Wasserschadens
const getWasserZeitpunktFaktor = (zeitpunkt: string): number => {
  if (!zeitpunkt) return 1.2; // Wenn kein Zeitpunkt angegeben wurde, höheren Faktor ansetzen
  
  const schadensDatum = new Date(zeitpunkt);
  const jetzt = new Date();
  const diffTage = Math.floor((jetzt.getTime() - schadensDatum.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffTage <= 2) return 1.0;
  if (diffTage <= 7) return 1.1;
  if (diffTage <= 14) return 1.2;
  if (diffTage <= 30) return 1.3;
  return 1.4; // Mehr als 30 Tage
};

// Berechnung des Basispreises je nach Schadensart
export const calculateBasePrice = (formData: FormData): number => {
  const area = Math.max(formData.objekt.flaeche, MIN_AREA);
  let preis = 0;
  
  switch (formData.schadensart) {
    case 'brand':
      preis = area * BASE_PRICES.brand[formData.details.brandVerschmutzungsgrad as keyof typeof BASE_PRICES.brand || 'mittel'];
      break;
    case 'wasser':
      preis = area * BASE_PRICES.wasser[
        formData.details.wasserUrsache === 'loeschwasser' ? 'stark' : 
        (formData.details.wasserArt === 'kontaminiert' ? 'stark' : 'mittel')
      ];
      break;
    case 'schimmel':
      preis = area * BASE_PRICES.schimmel[
        formData.details.schimmelFlaeche > 5 ? 'stark' : 
        (formData.details.schimmelFlaeche > 2 ? 'mittel' : 'leicht')
      ];
      break;
    case 'kombi':
      // Bei Kombischäden nehmen wir den höchsten Preis und addieren 20%
      const brandPreis = area * BASE_PRICES.brand.mittel;
      const wasserPreis = area * BASE_PRICES.wasser.mittel;
      const schimmelPreis = area * BASE_PRICES.schimmel.mittel;
      preis = Math.max(brandPreis, wasserPreis, schimmelPreis) * 1.2;
      break;
    default:
      // Standard-Preis für unbekannte Schäden
      preis = area * 250;
  }
  
  return Math.round(preis);
};

// Berechnung des Gesamtpreises unter Berücksichtigung aller Faktoren
export const calculateTotalPrice = (formData: FormData): number => {
  // Basispreis berechnen
  let totalPreis = calculateBasePrice(formData);
  
  // Objekttypfaktor anwenden
  const objektTyp = formData.objekt.typ;
  if (objektTyp && OBJEKT_FAKTOREN[objektTyp as keyof typeof OBJEKT_FAKTOREN]) {
    totalPreis *= OBJEKT_FAKTOREN[objektTyp as keyof typeof OBJEKT_FAKTOREN];
  }
  
  // Etagen- und Aufzugsfaktor anwenden
  totalPreis *= getEtageFaktor(formData.adresse.etage, formData.adresse.aufzug);
  
  // Parkplatzfaktor anwenden
  totalPreis *= getParkplatzFaktor(formData.adresse.parkmoeglichkeit);
  
  // Wasserschaden-Zeitpunkt-Faktor anwenden (wenn relevant)
  if (formData.schadensart === 'wasser' && formData.details.wasserZeitpunkt) {
    totalPreis *= getWasserZeitpunktFaktor(formData.details.wasserZeitpunkt);
  }
  
  // Runden für eine glattere Darstellung
  return Math.round(totalPreis / 10) * 10;
};

// Formatierung des Preises als Währung
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};
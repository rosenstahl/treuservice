/**
 * GeoService.ts
 * 
 * Zentrale Datei für alle Geolocation-Funktionen.
 * Vereinfacht die Standorterkennung und -abfrage für die Wetterkomponenten.
 */

// Google Geocoding API Key
const GOOGLE_GEOCODING_API_KEY = 'AIzaSyA9Wnj0p_5oHHpcsYZKbbRLCEyUE_gz3UQ';

// Interface für Geo-Ergebnisse
export interface GeoResult {
  lat: number;
  lon: number;
  displayName: string;
}

// Interface für Google Geocoding Adresskomponenten
interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

/**
 * Browser-Geolocation-API nutzen, um den aktuellen Standort zu ermitteln
 * @returns Promise mit den Koordinaten
 */
export async function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation wird von Ihrem Browser nicht unterstützt'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      resolve, 
      reject, 
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0  // Keine gecachten Positionen verwenden
      }
    );
  });
}

/**
 * Adresse (Ort, PLZ, etc.) in Koordinaten umwandeln
 * @param address Adressstring
 * @returns Promise mit Koordinaten und Ortsnamen
 */
export async function geocodeAddress(address: string): Promise<GeoResult> {
  console.log("Geocoding für Adresse:", address);
  const encodedAddress = encodeURIComponent(address.trim());
  
  // Cache-Buster Timestamp hinzufügen
  const cacheBuster = new Date().getTime();
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_GEOCODING_API_KEY}&region=de&timestamp=${cacheBuster}`;
  
  const response = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache', 
      'Expires': '0'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Geocoding-Fehler: HTTP ${response.status}`);
  }
  
  const data = await response.json();
  
  if (data.status !== 'OK') {
    throw new Error(`Geocoding-Fehler: ${data.status}${data.error_message ? ' - ' + data.error_message : ''}`);
  }
  
  if (!data.results || data.results.length === 0) {
    throw new Error('Die angegebene Adresse konnte nicht gefunden werden');
  }
  
  const result = data.results[0];
  const location = result.geometry.location;
  
  // Debug-Log für Diagnose
  console.log("Google Geocoding Ergebnis:", {
    formatted_address: result.formatted_address,
    position: location,
    place_id: result.place_id,
    types: result.types
  });
  
  // Ortsname aus den Adresskomponenten extrahieren
  let displayName = address;
  
  const locality = result.address_components.find(
    (component: AddressComponent) => component.types.includes('locality')
  );
  const subLocality = result.address_components.find(
    (component: AddressComponent) => component.types.includes('sublocality') || 
                                    component.types.includes('neighborhood')
  );
  const administrativeArea = result.address_components.find(
    (component: AddressComponent) => component.types.includes('administrative_area_level_1') || 
                                    component.types.includes('administrative_area_level_2')
  );
  
  // Präzisesten Namen wählen
  if (locality) {
    displayName = locality.long_name;
  } else if (subLocality) {
    displayName = subLocality.long_name;
  } else if (administrativeArea) {
    displayName = administrativeArea.long_name;
  }
  
  console.log(`Geocoding erfolgreich: ${displayName} (${location.lat}, ${location.lng})`);
  
  return {
    lat: location.lat,
    lon: location.lng,
    displayName
  };
}

/**
 * Konvertiert Koordinaten in einen Ortsnamen (Reverse Geocoding)
 * @param lat Breitengrad
 * @param lon Längengrad
 * @returns Promise mit normalisiertem Standort
 */
export async function reverseGeocode(lat: number, lon: number): Promise<GeoResult> {
  console.log(`Reverse Geocoding für: ${lat}, ${lon}`);
  
  // Cache-Buster hinzufügen
  const cacheBuster = new Date().getTime();
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_GEOCODING_API_KEY}&result_type=locality|sublocality|political|administrative_area_level_1&timestamp=${cacheBuster}`;
  
  const response = await fetch(url, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache', 
      'Expires': '0'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Reverse Geocoding-Fehler: HTTP ${response.status}`);
  }
  
  const data = await response.json();
  
  console.log("Google Reverse Geocoding Antwort:", data.status, data.results ? data.results.length : 0);
  
  if (data.status !== 'OK') {
    throw new Error(`Reverse Geocoding-Fehler: ${data.status}`);
  }
  
  if (!data.results || data.results.length === 0) {
    throw new Error('Keine Ortsangaben für diese Koordinaten gefunden');
  }
  
  // Das erste Ergebnis enthält die genauesten Daten
  const result = data.results[0];
  const normalizedLocation = result.geometry.location;
  
  // Debug-Log
  console.log("Reverse Geocoding Ergebnis Detail:", {
    formatted_address: result.formatted_address,
    position: normalizedLocation,
    place_id: result.place_id,
    types: result.types,
    components: result.address_components.map((c: AddressComponent) => ({
      long_name: c.long_name,
      types: c.types
    }))
  });
  
  // Ortsname extrahieren
  let displayName = "Ihr Standort";
  
  const locality = result.address_components.find(
    (component: AddressComponent) => component.types.includes('locality')
  );
  
  if (locality) {
    displayName = locality.long_name;
  } else {
    // Weitere Komponenten prüfen, falls kein locality-Eintrag existiert
    const subLocality = result.address_components.find(
      (component: AddressComponent) => component.types.includes('sublocality')
    );
    
    const administrativeArea = result.address_components.find(
      (component: AddressComponent) => component.types.includes('administrative_area_level_1')
    );
    
    if (subLocality) {
      displayName = subLocality.long_name;
    } else if (administrativeArea) {
      displayName = administrativeArea.long_name;
    }
  }
  
  console.log(`Reverse Geocoding erfolgreich: ${displayName} (${normalizedLocation.lat}, ${normalizedLocation.lng})`);
  
  return {
    lat: normalizedLocation.lat,
    lon: normalizedLocation.lng,
    displayName
  };
}

/**
 * Kombinierte Funktion für Standorterkennung:
 * 1. Ruft die Geräteposition ab
 * 2. Normalisiert die Koordinaten durch Google Geocoding
 * 3. Liefert präzise Koordinaten und Ortsnamen
 */
export async function detectCurrentLocation(): Promise<GeoResult> {
  try {
    console.log("Starte Browser-Standorterkennung...");
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    
    console.log(`Browser-Koordinaten erhalten: ${latitude}, ${longitude}`);
    
    // Koordinaten durch Google Geocoding normalisieren
    const geoResult = await reverseGeocode(latitude, longitude);
    
    // Überprüfe, ob die Koordinaten stark abweichen
    const distance = calculateDistance(
      latitude, longitude, 
      geoResult.lat, geoResult.lon
    );
    
    // Wenn die normalisierten Koordinaten zu weit entfernt sind (>5km), 
    // verwenden wir die Original-Koordinaten
    if (distance > 5) {
      console.warn(`Normalisierte Koordinaten weichen stark ab (${distance.toFixed(2)}km). Verwende Original-Koordinaten.`);
      return {
        lat: latitude,
        lon: longitude,
        displayName: geoResult.displayName
      };
    }
    
    return geoResult;
  } catch (error) {
    console.error("Fehler bei der Standorterkennung:", error);
    throw error;
  }
}

/**
 * Berechnet die Entfernung zwischen zwei Koordinaten in Kilometern
 * (Haversine-Formel)
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Erdradius in Kilometern
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance;
}
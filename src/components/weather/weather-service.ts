// API-Status-Tracking-Variablen
let brightskyFailures = 0;
const MAX_FAILURES = 3;
const RECOVERY_TIMEOUT = 30 * 60 * 1000; // 30 Minuten
let lastFailureTime: number | null = null;

// Typen definieren
export interface WeatherData {
  date: string;
  temperature: number;
  description: string;
  icon: string;
  // Weitere gemeinsame Felder können hier hinzugefügt werden
}

/**
 * Holt Wetterdaten von der Brightsky API
 */
async function fetchFromBrightsky(lat: number, lon: number): Promise<any> {
  const date = new Date();
  const dateString = date.toISOString().split('T')[0];
  
  // URL für die Brightsky API
  const url = `https://api.brightsky.dev/weather?lat=${lat}&lon=${lon}&date=${dateString}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Brightsky API Error: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Geben wir die Rohdaten zurück, um die kompatibilität mit dem bestehenden Code zu wahren
  return data;
}

/**
 * Holt Wetterdaten von der Backup-API (falls implementiert)
 */
async function fetchFromBackupAPI(lat: number, lon: number): Promise<any> {
  // Diese Funktion muss an deine tatsächliche Backup-API angepasst werden
  // Momentan gibt es hier nur eine Fallback-Logik, die direkt versucht, 
  // trotzdem von Brightsky zu lesen
  
  return fetchFromBrightsky(lat, lon);
}

/**
 * Hauptfunktion für intelligente API-Auswahl
 */
export async function getWeatherData(lat: number, lon: number): Promise<any> {
  console.log(`Wetterdaten werden abgerufen für: ${lat}, ${lon}`);
  console.log(`Brightsky-Fehler bisher: ${brightskyFailures}`);
  
  // Überprüfen, ob wir Brightsky versuchen sollten
  const shouldTryBrightsky = 
    brightskyFailures < MAX_FAILURES || 
    (lastFailureTime && Date.now() - lastFailureTime > RECOVERY_TIMEOUT);
  
  if (shouldTryBrightsky) {
    try {
      console.log('Versuche Brightsky API...');
      const data = await fetchFromBrightsky(lat, lon);
      
      // Bei Erfolg: Fehler zurücksetzen
      console.log('Brightsky erfolgreich!');
      brightskyFailures = 0;
      lastFailureTime = null;
      
      return data;
    } catch (error) {
      console.error("Brightsky API Fehler:", error);
      
      // Fehler inkrementieren und Zeit merken
      brightskyFailures++;
      lastFailureTime = Date.now();
      
      console.log(`Brightsky fehlgeschlagen (${brightskyFailures}). Versuche Backup...`);
      
      // Fallback auf Backup-API
      try {
        return await fetchFromBackupAPI(lat, lon);
      } catch (backupError) {
        console.error("Backup API Fehler:", backupError);
        throw backupError; // Beide APIs fehlgeschlagen
      }
    }
  } else {
    console.log('Überspringe Brightsky wegen zu vieler Fehler, nutze direkt Backup...');
    
    // Direkt Backup-API verwenden
    try {
      return await fetchFromBackupAPI(lat, lon);
    } catch (backupError) {
      console.error("Backup API Fehler:", backupError);
      
      // Als letzten Versuch doch Brightsky probieren
      console.log('Backup fehlgeschlagen, versuche Brightsky als letzten Ausweg...');
      return fetchFromBrightsky(lat, lon);
    }
  }
}

// Speichere den API-Status im lokalen Speicher, damit er zwischen Seitenaufrufen erhalten bleibt
export function saveApiStatus(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('brightskyFailures', brightskyFailures.toString());
    localStorage.setItem('lastFailureTime', lastFailureTime?.toString() || '');
  }
}

// Lade den API-Status beim Start
export function loadApiStatus(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedFailures = localStorage.getItem('brightskyFailures');
    const storedFailureTime = localStorage.getItem('lastFailureTime');
    
    if (storedFailures) {
      brightskyFailures = parseInt(storedFailures, 10);
    }
    
    if (storedFailureTime && storedFailureTime !== '') {
      lastFailureTime = parseInt(storedFailureTime, 10);
    }
  }
}
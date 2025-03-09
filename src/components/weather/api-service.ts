/**
 * api-service.ts
 * 
 * Zentrale API-Hilfsdienste mit einheitlicher Fehlerbehandlung und Caching-Strategie
 */

// API-Konfiguration
const DEFAULT_TIMEOUT = 10000; // 10 Sekunden Timeout für API-Anfragen
const DEFAULT_CACHE_TIME = 15 * 60 * 1000; // 15 Minuten Caching

// Eigene Error-Klasse für API-Fehler
export class ApiError extends Error {
  status?: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Optionen für API-Anfragen
interface ApiRequestOptions extends RequestInit {
  timeout?: number;
  cacheDuration?: number;
  retryCount?: number;
}

/**
 * Führt einen API-Aufruf mit Fehlerbehandlung, Timeout, Caching und Retry-Logik durch
 */
export async function fetchWithErrorHandling<T>(
  url: string, 
  options: ApiRequestOptions = {}
): Promise<T> {
  const {
    timeout = DEFAULT_TIMEOUT,
    cacheDuration = DEFAULT_CACHE_TIME,
    retryCount = 1,
    ...fetchOptions
  } = options;
  
  // Prüfe Cache, wenn GET-Anfrage
  if (fetchOptions.method === undefined || fetchOptions.method === 'GET') {
    const cachedResponse = await getCachedResponse<T>(url);
    if (cachedResponse) {
      console.log(`Verwende gecachte Daten für: ${url}`);
      return cachedResponse;
    }
  }

  // Füge Standard-Header hinzu
  const headers = {
    'Accept': 'application/json',
    'Cache-Control': `max-age=${Math.floor(cacheDuration / 1000)}`,
    ...fetchOptions.headers,
  };

  // Abbruch-Controller für Timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Fetch-Anfrage mit Timeout
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    // Timeout löschen
    clearTimeout(timeoutId);

    // HTTP-Fehler prüfen
    if (!response.ok) {
      // Bei 404 oder 503 Retry versuchen, wenn noch nicht erschöpft
      if ((response.status === 404 || response.status === 503) && retryCount > 0) {
        console.warn(`API-Fehler ${response.status} für ${url}, Versuch ${retryCount} von ${options.retryCount || 1}`);
        
        // Warten vor Retry
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Erneuter Versuch mit verringertem Counter
        return fetchWithErrorHandling<T>(url, {
          ...options,
          retryCount: retryCount - 1
        });
      }
      
      throw new ApiError(`API-Fehler: ${response.status} ${response.statusText}`, response.status);
    }

    // Überprüfe Content-Type
    const contentType = response.headers.get('content-type');
    let data: T;

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      throw new ApiError('Unerwarteter Antworttyp von der API');
    }

    // Daten im Cache speichern für GET-Anfragen
    if (fetchOptions.method === undefined || fetchOptions.method === 'GET') {
      await setCachedResponse(url, data, cacheDuration);
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    // Fehlerbehandlung mit benutzerfreundlichen Meldungen
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError('Zeitüberschreitung bei der API-Anfrage. Bitte versuchen Sie es später erneut.');
      }
      
      // ApiError direkt weiterleiten
      if (error instanceof ApiError) {
        throw error;
      }
      
      console.error('Fehler bei API-Anfrage:', error);
      throw new ApiError(error.message);
    }
    
    throw new ApiError('Ein unbekannter Fehler ist aufgetreten.');
  }
}

/**
 * Versuche, einen gespeicherten API-Response aus dem Cache zu laden
 */
async function getCachedResponse<T>(url: string): Promise<T | null> {
  try {
    const cacheKey = `api_cache_${url}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (!cachedData) return null;
    
    const { data, expiry } = JSON.parse(cachedData);
    const now = new Date().getTime();
    
    // Prüfe, ob der Cache noch gültig ist
    if (expiry > now) {
      return data as T;
    }
    
    // Cache ist abgelaufen, löschen
    localStorage.removeItem(cacheKey);
    return null;
  } catch (error) {
    console.warn('Fehler beim Zugriff auf Cache:', error);
    return null;
  }
}

/**
 * Speichere API-Response im Cache
 */
async function setCachedResponse<T>(url: string, data: T, duration: number): Promise<void> {
  try {
    const cacheKey = `api_cache_${url}`;
    const now = new Date().getTime();
    const expiry = now + duration;
    
    localStorage.setItem(cacheKey, JSON.stringify({
      data,
      expiry
    }));
  } catch (error) {
    console.warn('Fehler beim Speichern im Cache:', error);
  }
}

/**
 * Hilfsfunktion für GET-Anfragen mit JSON-Antwort
 */
export async function getJson<T>(url: string, options: ApiRequestOptions = {}): Promise<T> {
  return fetchWithErrorHandling<T>(url, {
    method: 'GET',
    ...options
  });
}

/**
 * Hilfsfunktion für POST-Anfragen mit JSON-Body und JSON-Antwort
 */
export async function postJson<T>(url: string, data: Record<string, unknown>, options: ApiRequestOptions = {}): Promise<T> {
  return fetchWithErrorHandling<T>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    body: JSON.stringify(data),
    ...options
  });
}
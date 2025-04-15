import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Extrahiere und validiere Parameter
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const latlng = searchParams.get('latlng');
  const resultType = searchParams.get('result_type');
  
  console.log(`Geocoding-Anfrage erhalten: address=${address}, latlng=${latlng}`);
  
  if (!address && !latlng) {
    console.error('Geocoding-Anfrage ohne Adresse oder Koordinaten');
    return NextResponse.json({ error: 'Adresse oder Koordinaten fehlen' }, { status: 400 });
  }
  
  try {
    const apiKey = "AIzaSyCbAjl459xe6fTtqZ8rS3OjyVIKypc0Bfg";
    let geocodeUrl = '';
    
    // Sorgfältige URL-Erstellung mit korrekter Kodierung
    if (address) {
      // Stelle sicher, dass die Adresse richtig getrimmt und kodiert ist
      const encodedAddress = encodeURIComponent(address.trim());
      geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}&region=de`;
      console.log(`Versuche Adresse zu geocodieren: ${address} (kodiert: ${encodedAddress})`);
    } else if (latlng) {
      geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${apiKey}`;
      if (resultType) {
        geocodeUrl += `&result_type=${resultType}`;
      }
      console.log(`Versuche Reverse-Geocoding: ${latlng}`);
    }
    
    // Log der vollständigen URL (ohne API-Key für Sicherheit)
    const logUrl = geocodeUrl.replace(apiKey, 'API_KEY');
    console.log(`Geocoding URL: ${logUrl}`);
    
    // Erweiterte Header für die API-Anfrage
    const geoResponse = await fetch(geocodeUrl, {
      method: 'GET',
      headers: {
        'Referer': 'https://treuservice.com',
        'Origin': 'https://treuservice.com',
        'User-Agent': 'treuservice/1.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    // Ausführliche Fehlerprotokollierung
    if (!geoResponse.ok) {
      const status = geoResponse.status;
      console.error(`Geocoding-API-Fehler: HTTP ${status}`);
      
      try {
        // Versuche, detaillierte Fehlermeldung zu bekommen
        const errorText = await geoResponse.text();
        console.error("Detaillierte API-Antwort:", errorText);
        
        return NextResponse.json({ 
          error: `Geocoding-Fehler: HTTP ${status}`,
          details: errorText
        }, { status });
      } catch (textError) {
        console.error("Konnte Fehlertext nicht extrahieren:", textError);
        return NextResponse.json({ 
          error: `Geocoding-Fehler: HTTP ${status}`,
          details: "Keine weiteren Details verfügbar"
        }, { status });
      }
    }
    
    // Verarbeitung der erfolgreichen Antwort
    try {
      const geoData = await geoResponse.json();
      console.log(`Geocoding-Antwort Status: ${geoData.status}, Ergebnisse: ${geoData.results?.length || 0}`);
      
      if (geoData.status !== 'OK') {
        console.warn(`Geocoding-Statusfehler: ${geoData.status}`, geoData.error_message);
        return NextResponse.json({ 
          error: `Geocoding-Fehler: ${geoData.status}`,
          details: geoData.error_message || "Keine weiteren Details verfügbar"
        }, { status: 400 });
      }
      
      if (!geoData.results || geoData.results.length === 0) {
        console.warn('Geocoding-Antwort ohne Ergebnisse');
        return NextResponse.json({ 
          error: 'Keine Ergebnisse gefunden',
          details: 'Die Adresse konnte nicht gefunden werden'
        }, { status: 404 });
      }
      
      // Erfolgreiche Antwort
      console.log('Geocoding erfolgreich abgeschlossen');
      return NextResponse.json(geoData);
      
    } catch (parseError) {
      console.error('Fehler beim Parsen der Geocoding-Antwort:', parseError);
      return NextResponse.json({ 
        error: 'Ungültiges Antwortformat', 
        details: parseError instanceof Error ? parseError.message : 'Unbekannter Fehler'
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Unerwarteter Fehler bei der Geocoding-Anfrage:', error);
    return NextResponse.json({ 
      error: 'Fehler bei der Geocodierung', 
      details: error instanceof Error ? error.message : 'Unbekannter Fehler'
    }, { status: 500 });
  }
}
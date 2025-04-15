import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');
  const latlng = searchParams.get('latlng');
  const resultType = searchParams.get('result_type');
  
  if (!address && !latlng) {
    return NextResponse.json({ error: 'Adresse oder Koordinaten fehlen' }, { status: 400 });
  }
  
  try {
    const apiKey = "AIzaSyCbAjl459xe6fTtqZ8rS3OjyVIKypc0Bfg";
    let geocodeUrl = '';
    
    if (address) {
      const encodedAddress = encodeURIComponent(address.trim());
      geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}&region=de`;
    } else if (latlng) {
      geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=${apiKey}`;
      if (resultType) {
        geocodeUrl += `&result_type=${resultType}`;
      }
    }
    
    // Wichtige Korrektur: Füge den Referer-Header hinzu, um die API-Schlüsseleinschränkungen zu erfüllen
    const geoResponse = await fetch(geocodeUrl, {
      headers: {
        'Referer': 'https://treuservice.com',
        'Origin': 'https://treuservice.com'
      }
    });
    
    if (!geoResponse.ok) {
      console.error(`Geocoding-Fehler: HTTP ${geoResponse.status}`);
      const errorText = await geoResponse.text();
      console.error("Detaillierte Antwort:", errorText);
      throw new Error(`Geocoding-Fehler: HTTP ${geoResponse.status}`);
    }
    
    const geoData = await geoResponse.json();
    
    if (geoData.status !== 'OK') {
      console.warn(`Geocoding-Fehler: ${geoData.status}`, geoData.error_message);
      return NextResponse.json({ 
        error: `Geocoding-Fehler: ${geoData.status}`,
        details: geoData.error_message
      }, { status: 400 });
    }
    
    return NextResponse.json(geoData);
  } catch (error) {
    console.error('Geocoding API error:', error);
    return NextResponse.json({ 
      error: 'Fehler bei der Geocodierung', 
      details: error instanceof Error ? error.message : 'Unbekannter Fehler'
    }, { status: 500 });
  }
}
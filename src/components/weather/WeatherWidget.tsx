"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, CloudSnow, Thermometer, Wind, Droplets, MapPin, AlertTriangle } from "lucide-react";
import { H3, Paragraph } from "@/components/ui/typography";
import { getCurrentWeather, getWeatherForecast, calculateIceRisk } from '@/components/weather/brightsky';

// Warnungs-Level-Typen
type AlertLevel = 'green' | 'yellow' | 'red';

// Wetter-Daten Interface
interface WeatherData {
  location: string;
  temperature: number;
  conditions: string;
  humidity: number;
  cloudiness: number;
  windSpeed: number;
  precipitation: number;            
  precipitationProbability: number;
  snowHeight?: number;
  icon: string;
  alertLevel: AlertLevel;
  forecast: {
    time: string;
    temperature: number;
    conditions: string;
    precipitation?: number;
    icon: string;
  }[];
}

// Aktualisierte Mock-Daten mit realistischeren Werten
const mockWeatherData: WeatherData = {
  location: 'Berlin',
  temperature: 9, // Aktuelle Temperatur
  conditions: 'Bewölkt', // Übersetzung
  humidity: 58,
  cloudiness: 86,
  windSpeed: 5,
  precipitation: 0.2,
  precipitationProbability: 30, // Niedrigerer Wert für kein rotes Warnlevel
  snowHeight: 0,
  icon: 'cloud',
  alertLevel: 'green', // Geändert auf grün
  forecast: [
    { time: '09:00', temperature: 8, conditions: 'Leicht bewölkt', precipitation: 0, icon: 'cloud' },
    { time: '12:00', temperature: 9, conditions: 'Bewölkt', precipitation: 0.2, icon: 'cloud' },
    { time: '15:00', temperature: 10, conditions: 'Bewölkt', precipitation: 0.2, icon: 'cloud' },
    { time: '18:00', temperature: 8, conditions: 'Leicht bewölkt', precipitation: 0, icon: 'cloud' },
  ]
};

// Funktion zur Übersetzung der Wetterbedingungen
const translateCondition = (condition: string): string => {
  const translations: {[key: string]: string} = {
    "clear-day": "Klar (Tag)",
    "clear-night": "Klar (Nacht)",
    "partly-cloudy-day": "Teilweise bewölkt (Tag)",
    "partly-cloudy-night": "Teilweise bewölkt (Nacht)",
    "cloudy": "Bewölkt",
    "fog": "Nebel",
    "wind": "Windig",
    "rain": "Regen",
    "sleet": "Schneeregen",
    "snow": "Schnee",
    "hail": "Hagel",
    "thunderstorm": "Gewitter",
    "thunderstorm with light drizzle": "Gewitter mit leichtem Nieselregen",
    "dry": "Trocken",
    "light rain": "Leichter Regen",
    "moderate rain": "Mäßiger Regen",
    "heavy rain": "Starker Regen",
    "light snow": "Leichter Schneefall",
    "moderate snow": "Mäßiger Schneefall",
    "heavy snow": "Starker Schneefall",
    "light sleet": "Leichter Schneeregen",
    "moderate sleet": "Mäßiger Schneeregen",
    "heavy sleet": "Starker Schneeregen",
    "unknown": "Unbekannt"
  };
  
  return translations[condition.toLowerCase()] || condition;
};

// Funktion zur Bestimmung des Warnungs-Levels
const determineAlertLevel = (temp: number, precipitation: number): AlertLevel => {
  if (temp < 0 || precipitation > 70) return 'red';
  if (temp <= 3 || precipitation > 40) return 'yellow';
  return 'green';
};

// Funktion zur Berechnung der erwarteten Schneehöhe basierend auf Niederschlagsmenge und Temperatur
const calculateSnowHeight = (precipitation: number, temperature: number): string => {
  if (temperature > 2 || precipitation === 0) return '0';
  
  // Bei Temperaturen unter 0°C wird Niederschlag effizienter in Schnee umgewandelt
  const conversionFactor = temperature <= 0 ? 10 : 7;
  
  // Berechnung: 1mm Regen entspricht etwa 7-10mm Schnee
  const snowHeightCm = (precipitation * conversionFactor) / 10;
  
  return snowHeightCm.toFixed(1);
};

// Alert-Komponente - optional anzeigen
const AlertBanner = ({ level }: { level: AlertLevel }) => {
  const colors = {
    green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    red: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
  };
  
  const messages = {
    green: 'Alles sicher: Kein Winterdienst erforderlich',
    yellow: 'Vorwarnung: Winterdienst in Bereitschaft',
    red: 'Winterdienst erforderlich',
  };

  // Wenn grün, nicht anzeigen
  if (level === 'green') return null;

  return (
    <div className={`${colors[level].bg} ${colors[level].text} ${colors[level].border} border rounded-lg p-4 mb-4`}>
      <div className="flex items-center">
        <span className="font-semibold">{messages[level]}</span>
      </div>
    </div>
  );
};

export const WeatherWidget = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number} | null>(null);
  const [locationDetectionFailed, setLocationDetectionFailed] = useState(false);

  // Funktion zum Ermitteln des aktuellen Standorts
  const detectLocation = () => {
    setIsLoading(true);
    setLocationDetectionFailed(false);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          console.log("Standort erkannt:", latitude, longitude);
          
          // Reverse-Geocoding, um Ortsnamen zu erhalten
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&accept-language=de`
            );
            const data = await response.json();
            const locationName = data.address.city || data.address.town || data.address.village || 'Unbekannter Ort';
            
            console.log("Ermittelter Ort:", locationName);
            
            setCoordinates({ lat: latitude, lon: longitude });
            setSearchLocation(locationName);
            
            // Wetterdaten für diesen Standort abrufen
            fetchWeatherData(locationName, { lat: latitude, lon: longitude });
          } catch (error) {
            console.error('Fehler beim Geocoding:', error);
            setLocationDetectionFailed(true);
            setSearchLocation('Berlin');
            fetchWeatherData('Berlin');
          }
        },
        (error) => {
          console.error('Geolocation-Fehler:', error);
          setLocationDetectionFailed(true);
          setIsLoading(false);
        }
      );
    } else {
      console.error('Browser unterstützt keine Standorterkennung');
      setLocationDetectionFailed(true);
      setIsLoading(false);
    }
  };

  const fetchWeatherData = async (location: string, coords?: {lat: number, lon: number}) => {
    setIsLoading(true);
    try {
      let useCoords = coords || coordinates;

      // Wenn keine Koordinaten übergeben wurden, Geocoding durchführen
      if (!useCoords && location !== 'Berlin') {
        try {
          console.log("Führe Geocoding für Standort durch:", location);
          
          const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1&accept-language=de`;
          console.log("Geocoding URL:", geocodeUrl);
          
          const geocodeResponse = await fetch(geocodeUrl);
          const geocodeData = await geocodeResponse.json();
          
          console.log("Geocoding-Ergebnis:", geocodeData);
          
          if (geocodeData && geocodeData.length > 0) {
            const { lat, lon } = geocodeData[0];
            useCoords = { lat: parseFloat(lat), lon: parseFloat(lon) };
            setCoordinates(useCoords);
            console.log("Koordinaten gefunden:", useCoords);
          } else {
            console.log("Keine Koordinaten für den Standort gefunden");
            // Fallback auf Berlin, wenn keine Koordinaten gefunden wurden
            useCoords = { lat: 52.52, lon: 13.41 };
          }
        } catch (error) {
          console.error('Fehler beim Geocoding:', error);
          useCoords = { lat: 52.52, lon: 13.41 }; // Berlin als Fallback
        }
      }
      
      // Fallback, falls immer noch keine Koordinaten vorhanden sind
      if (!useCoords) {
        useCoords = { lat: 52.52, lon: 13.41 }; // Berlin als Fallback
      }

      console.log("Wetterdaten werden abgerufen für:", location, "mit Koordinaten:", useCoords);
      
      // Aktualisiere sofort den Standortnamen, auch wenn die API-Anfrage fehlschlägt
      setWeather(prev => ({
        ...prev,
        location: location
      }));
      
      const currentWeather = await getCurrentWeather(useCoords);
      console.log("Aktuelle Wetterdaten empfangen:", currentWeather);
      
      const forecast = await getWeatherForecast({
        ...useCoords,
        date: new Date().toISOString().split('T')[0]
      });
      
      if (currentWeather) {
        const hourlyForecast = forecast.slice(0, 24).filter((_, i) => i % 6 === 0); // Alle 6 Stunden
        
        const precipitation = currentWeather.precipitation || 0;
        const precipProbability = currentWeather.precipitation_probability || 0;
        const temperature = currentWeather.temperature || 0;
        
        const alertLevel = determineAlertLevel(temperature, precipProbability);
        const snowHeight = parseFloat(calculateSnowHeight(precipitation, temperature));
        
        const translatedCondition = translateCondition(currentWeather.condition || 'Unbekannt');
        
        setWeather({
          location: location, // Immer den vom Benutzer eingegebenen Standort verwenden
          temperature: temperature,
          conditions: translatedCondition,
          humidity: currentWeather.relative_humidity || 0,
          cloudiness: currentWeather.cloud_cover || 0,
          windSpeed: currentWeather.wind_speed || 0,
          precipitation: precipitation,
          precipitationProbability: precipProbability,
          snowHeight: snowHeight > 0 ? snowHeight : undefined,
          icon: currentWeather.icon || 'cloud',
          alertLevel,
          forecast: hourlyForecast.map(item => ({
            time: new Date(item.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
            temperature: item.temperature || 0,
            conditions: translateCondition(item.condition || 'Unbekannt'),
            precipitation: item.precipitation,
            icon: item.icon || 'cloud'
          }))
        });
      } else {
        console.log("Keine Wetterdaten erhalten, verwende Mock-Daten mit dem eingegebenen Standort");
        setWeather({
          ...mockWeatherData,
          location: location
        });
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      // Fallback auf Mock-Daten bei einem Fehler, aber mit dem gewählten Standort
      console.log("Fehler aufgetreten, verwende Mock-Daten mit dem eingegebenen Standort");
      setWeather({
        ...mockWeatherData,
        location: location
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchLocation.trim()) {
      fetchWeatherData(searchLocation);
    }
  };

  // Enter-Taste für die Suche
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Beim ersten Laden Standort-basierte Daten abrufen
  useEffect(() => {
    // Automatische Standorterkennung beim Laden starten
    detectLocation();
    
    // Fallback auf Standardwerte falls die Standorterkennung fehlschlägt
    // Der Timeout sorgt dafür, dass der Fallback nur greift, wenn die Standorterkennung fehlschlägt
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        console.log("Standorterkennung hat zu lange gedauert, verwende Fallback");
        fetchWeatherData('Berlin');
      }
    }, 5000);
    
    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Suchleiste */}
      <div className="flex gap-2">
        <Input
          placeholder="Standort eingeben..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow"
        />
        <Button 
          onClick={detectLocation} 
          className="bg-accent hover:bg-accent/90"
          title="Meinen Standort verwenden"
        >
          <MapPin className="w-4 h-4" />
        </Button>
        <Button onClick={handleSearch} disabled={isLoading} className="bg-accent hover:bg-accent/90">
          <Search className="w-4 h-4 mr-2" />
          Suchen
        </Button>
      </div>
      
      {/* Standorterkennungshinweis */}
      {locationDetectionFailed && (
        <div className="bg-yellow-100 text-yellow-800 border border-yellow-200 p-2 rounded-lg text-sm">
          Standorterkennung nicht möglich. Bitte geben Sie Ihren Standort manuell ein.
        </div>
      )}
      
      {/* Warnungs-Banner - zeigt nur bei gelb/rot an */}
      <AlertBanner level={weather.alertLevel} />
      
      {/* Aktuelle Wetterdaten */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Linke Spalte - Hauptdaten */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <H3 className="text-2xl font-bold mb-2">{weather.location}</H3>
              <div className="text-5xl font-bold mb-4">{weather.temperature}°C</div>
              <CloudSnow className="w-16 h-16 text-accent mb-4" />
              <Paragraph className="text-center text-muted-foreground">
                {weather.conditions}
              </Paragraph>
            </div>
            
            {/* Rest des Codes bleibt gleich */}
            
            {/* Mittlere Spalte - Details */}
            <div className="col-span-1 space-y-4">
              <div className="flex items-center">
                <Droplets className="w-5 h-5 text-accent mr-2" />
                <span>Luftfeuchtigkeit: {weather.humidity}%</span>
              </div>
              <div className="flex items-center">
                <Wind className="w-5 h-5 text-accent mr-2" />
                <span>Windgeschwindigkeit: {weather.windSpeed} km/h</span>
              </div>
              <div className="flex items-center">
                <Thermometer className="w-5 h-5 text-accent mr-2" />
                <span>Gefühlte Temperatur: {weather.temperature - 2}°C</span>
              </div>
              <div className="flex items-center">
                <CloudSnow className="w-5 h-5 text-accent mr-2" />
                <span>Niederschlagswahrscheinlichkeit: {weather.precipitationProbability}%</span>
              </div>
              {weather.precipitationProbability > 30 && weather.temperature < 2 && (
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mr-2" />
                  <span>Erwartete Schneehöhe: {calculateSnowHeight(weather.precipitation, weather.temperature)} cm</span>
                </div>
              )}
            </div>
            
            {/* Rechte Spalte - Empfehlungen */}
            <div className="col-span-1 bg-blue-50 p-4 rounded-lg">
              <H3 className="text-lg font-semibold mb-2">Streumittel-Empfehlung</H3>
              <Paragraph className="text-sm">
                Bei Temperaturen unter 0°C empfehlen wir Splitt oder Granulat statt Salz für umweltfreundlichen Winterdienst.
              </Paragraph>
              <div className="mt-4">
                <H3 className="text-lg font-semibold mb-2">Optimaler Räumzeitpunkt</H3>
                <div className="text-sm font-medium text-green-700">Heute 8:00 Uhr</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Wettervorhersage */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <H3 className="text-xl font-semibold mb-4">24-Stunden Vorhersage</H3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {weather.forecast.map((item, index) => (
              <div key={index} className="flex flex-col items-center p-3 border rounded-lg">
                <span className="text-sm font-medium">{item.time}</span>
                <CloudSnow className="w-8 h-8 my-2 text-accent" />
                <span className="text-lg font-bold">{item.temperature}°C</span>
                <span className="text-xs text-center text-muted-foreground mt-1">
                  {item.conditions}
                </span>
                {item.precipitation !== undefined && item.precipitation > 0 && (
                  <span className="text-xs text-center text-blue-600 mt-1">
                    {item.precipitation} mm
                  </span>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
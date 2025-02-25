"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  CloudSnow, 
  Thermometer, 
  Wind, 
  Droplets, 
  MapPin, 
  AlertTriangle,
  Cloud, 
  CloudRain,
  Sun,
  Layers
} from "lucide-react";
import { H3, Paragraph } from "@/components/ui/typography";
import { 
  getCurrentWeather, 
  getWeatherForecast, 
  calculateIceRisk,
  calculateOptimalCleaningTime,
  predictSnowfall,
  calculateRequiredGrit,
  WeatherObservation
} from '@/components/weather/brightsky';

// Warnungs-Level-Typen
type AlertLevel = 'green' | 'yellow' | 'red';

// Wetter-Daten Interface
interface WeatherData {
  location: string;
  temperature: number | null;
  conditions: string;
  humidity: number;
  cloudiness: number;
  windSpeed: number;
  precipitation: number;            
  precipitationProbability: number;
  snowHeight?: number;
  soilTemperature?: number;
  icon: string;
  alertLevel: AlertLevel;
  iceRisk: {
    risk: 'low' | 'medium' | 'high';
    description: string;
  };
  forecast: {
    time: string;
    temperature: number;
    conditions: string;
    precipitation?: number;
    icon: string;
  }[];
  optimalCleaningTime?: string;
  snowfallPrediction?: {
    willSnow: boolean;
    startTime?: string;
    endTime?: string;
    totalAmount: number;
  };
  streumittelBedarf?: {
    salt: number;
    grit: number;
    description: string;
  };
}

// Interface für Geocoding-Antworten
interface GeocodingResponse {
  lat: string;
  lon: string;
  display_name: string;
  [key: string]: unknown;
}

// Funktion zur Übersetzung der Wetterbedingungen
const translateCondition = (condition: string): string => {
  const translations: Record<string, string> = {
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
const determineAlertLevel = (temp: number | null, precipitation: number): AlertLevel => {
  if (temp === null) return 'green';
  if (temp < 0 || precipitation > 70) return 'red';
  if (temp <= 3 || precipitation > 40) return 'yellow';
  return 'green';
};

// Funktion zur Berechnung der erwarteten Schneehöhe
const calculateSnowHeight = (precipitation: number, temperature: number | null): number | undefined => {
  if (temperature === null || temperature > 2 || precipitation === 0) return undefined;
  
  // Bei Temperaturen unter 0°C wird Niederschlag effizienter in Schnee umgewandelt
  const conversionFactor = temperature <= 0 ? 10 : 7;
  
  // Berechnung: 1mm Regen entspricht etwa 7-10mm Schnee
  const snowHeightCm = (precipitation * conversionFactor) / 10;
  
  return parseFloat(snowHeightCm.toFixed(1));
};

// Funktion zur Auswahl des passenden Wetter-Icons
const getWeatherIcon = (condition: string) => {
  const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
    'clear-day': Sun,
    'clear-night': Sun,
    'partly-cloudy-day': Cloud,
    'partly-cloudy-night': Cloud,
    'cloudy': Cloud,
    'fog': Cloud,
    'rain': CloudRain,
    'sleet': CloudSnow,
    'snow': CloudSnow,
    'thunderstorm': CloudRain,
    'hail': CloudRain,
    // Standardmäßig Cloud verwenden
  };
  
  const IconComponent = iconMap[condition.toLowerCase()] || Cloud;
  return <IconComponent className="w-16 h-16 text-accent" />;
};

// Alert-Komponente
const AlertBanner = ({ level, description }: { level: AlertLevel, description: string }) => {
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
        <AlertTriangle className="w-5 h-5 mr-2" />
        <span className="font-semibold">{messages[level]}</span>
        {description && <span className="ml-2 text-sm">{description}</span>}
      </div>
    </div>
  );
};

export const WeatherWidget = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number} | null>(null);
  const [locationDetectionFailed, setLocationDetectionFailed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API-Aufrufe
  const fetchWeatherData = async (location: string, coords?: {lat: number, lon: number}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      let useCoords = coords || coordinates;

      // Wenn keine Koordinaten übergeben wurden, Geocoding durchführen
      if (!useCoords) {
        try {
          console.log("Führe Geocoding für Standort durch:", location);
          
          const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1&accept-language=de`;
          console.log("Geocoding URL:", geocodeUrl);
          
          const geocodeResponse = await fetch(geocodeUrl);
          
          if (!geocodeResponse.ok) {
            throw new Error(`Geocoding-Fehler: ${geocodeResponse.status}`);
          }
          
          const geocodeData = await geocodeResponse.json() as GeocodingResponse[];
          
          console.log("Geocoding-Ergebnis:", geocodeData);
          
          if (geocodeData && geocodeData.length > 0) {
            const { lat, lon } = geocodeData[0];
            useCoords = { lat: parseFloat(lat), lon: parseFloat(lon) };
            setCoordinates(useCoords);
            console.log("Koordinaten gefunden:", useCoords);
          } else {
            throw new Error("Keine Koordinaten für den Standort gefunden");
          }
        } catch (error) {
          console.error('Fehler beim Geocoding:', error);
          setError("Standort nicht gefunden. Bitte versuchen Sie es mit einer anderen Adresse.");
          setIsLoading(false);
          return;
        }
      }
      
      console.log("Wetterdaten werden abgerufen für:", location, "mit Koordinaten:", useCoords);
      
      // API-Aufrufe parallel ausführen
      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        getCurrentWeather(useCoords),
        getWeatherForecast({
          ...useCoords,
          date: new Date().toISOString().split('T')[0]
        })
      ]);
      
      // Prüfen, ob wir gültige Daten haben
      if (!currentWeatherResponse) {
        throw new Error("Keine aktuellen Wetterdaten verfügbar");
      }
      
      console.log("Aktuelle Wetterdaten empfangen:", currentWeatherResponse);
      console.log("Vorhersagedaten empfangen:", forecastResponse);
      
      // Daten aufbereiten
      const precipitation = currentWeatherResponse.precipitation || 0;
      const precipProbability = currentWeatherResponse.precipitation_probability || 0;
      const temperature = currentWeatherResponse.temperature !== undefined ? currentWeatherResponse.temperature : null;
      const humidity = currentWeatherResponse.relative_humidity || 0;
      
      // Alert-Level berechnen
      const alertLevel = determineAlertLevel(temperature, precipProbability);
      
      // Glättegefahr berechnen
      const iceRisk = calculateIceRisk(temperature !== null ? temperature : 0, precipitation, humidity);
      
      // Schneehöhe berechnen
      const snowHeight = calculateSnowHeight(precipitation, temperature);
      
      // Wetterbedingung übersetzen
      const translatedCondition = translateCondition(currentWeatherResponse.condition || 'unknown');
      
      // Optimalen Räumzeitpunkt berechnen
      const optimalCleaningTime = calculateOptimalCleaningTime(forecastResponse);
      
      // Schneefall-Vorhersage
      const snowfallPrediction = predictSnowfall(forecastResponse);
      
      // Streumittelbedarf berechnen (Annahme: 100m² pro Standort)
      const streumittelBedarf = calculateRequiredGrit(100, iceRisk.risk);
      
      // Stündliche Vorhersage aufbereiten
      const hourlyForecast = forecastResponse.filter((_, i) => i % 3 === 0).slice(0, 8).map(item => ({
        time: new Date(item.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
        temperature: item.temperature || 0,
        conditions: translateCondition(item.condition || 'unknown'),
        precipitation: item.precipitation,
        icon: item.icon || 'cloud'
      }));
      
      // Wetterdaten aktualisieren
      setWeather({
        location: location,
        temperature: temperature,
        conditions: translatedCondition,
        humidity: humidity,
        cloudiness: currentWeatherResponse.cloud_cover || 0,
        windSpeed: currentWeatherResponse.wind_speed || 0,
        precipitation: precipitation,
        precipitationProbability: precipProbability,
        snowHeight: snowHeight,
        soilTemperature: currentWeatherResponse.soil_temperature,
        icon: currentWeatherResponse.icon || 'cloud',
        alertLevel,
        iceRisk,
        forecast: hourlyForecast,
        optimalCleaningTime,
        snowfallPrediction,
        streumittelBedarf
      });
    } catch (error) {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      setError("Fehler beim Abrufen der Wetterdaten. Bitte versuchen Sie es später erneut.");
      // Wetterdaten auf null setzen, damit die UI entsprechend reagieren kann
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Funktion zum Ermitteln des aktuellen Standorts
  const detectLocation = useCallback(() => {
    setIsLoading(true);
    setLocationDetectionFailed(false);
    setError(null);
    
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
            
            if (!response.ok) {
              throw new Error(`Geocoding-Fehler: ${response.status}`);
            }
            
            const data = await response.json() as Record<string, any>;
            const locationName = data.address?.city || data.address?.town || data.address?.village || 'Unbekannter Ort';
            
            console.log("Ermittelter Ort:", locationName);
            
            setCoordinates({ lat: latitude, lon: longitude });
            setSearchLocation(locationName);
            
            // Wetterdaten für diesen Standort abrufen
            fetchWeatherData(locationName, { lat: latitude, lon: longitude });
          } catch (error) {
            console.error('Fehler beim Geocoding:', error);
            setLocationDetectionFailed(true);
            setError("Standort konnte nicht in Adresse umgewandelt werden.");
            // Dennoch mit Koordinaten fortfahren
            fetchWeatherData("Ihr Standort", { lat: latitude, lon: longitude });
          }
        },
        (error) => {
          console.error('Geolocation-Fehler:', error);
          setLocationDetectionFailed(true);
          setIsLoading(false);
          setError("Standorterkennung nicht möglich: " + error.message);
        }
      );
    } else {
      console.error('Browser unterstützt keine Standorterkennung');
      setLocationDetectionFailed(true);
      setIsLoading(false);
      setError("Ihr Browser unterstützt keine Standorterkennung.");
    }
  }, []);

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
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        console.log("Standorterkennung hat zu lange gedauert, Timeout erreicht");
        setLocationDetectionFailed(true);
        setIsLoading(false);
        setError("Zeitüberschreitung bei der Standorterkennung. Bitte geben Sie Ihren Standort manuell ein.");
      }
    }, 10000); // 10 Sekunden Timeout
    
    return () => clearTimeout(fallbackTimer);
  }, [detectLocation, isLoading]);

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
          disabled={isLoading}
          className="bg-accent hover:bg-accent/90"
          title="Meinen Standort verwenden"
        >
          <MapPin className="w-4 h-4" />
        </Button>
        <Button 
          onClick={handleSearch} 
          disabled={isLoading || !searchLocation.trim()} 
          className="bg-accent hover:bg-accent/90"
        >
          <Search className="w-4 h-4 mr-2" />
          Suchen
        </Button>
      </div>
      
      {/* Fehlermeldungen */}
      {locationDetectionFailed && !error && (
        <div className="bg-yellow-100 text-yellow-800 border border-yellow-200 p-3 rounded-lg text-sm">
          <div className="flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>Standorterkennung nicht möglich. Bitte geben Sie Ihren Standort manuell ein.</span>
          </div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 text-red-800 border border-red-200 p-3 rounded-lg text-sm">
          <div className="flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}
      
      {/* Ladeanzeige */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {/* Wetterdaten anzeigen wenn verfügbar */}
      {!isLoading && weather && (
        <>
          {/* Warnungs-Banner - zeigt nur bei gelb/rot an */}
          <AlertBanner 
            level={weather.alertLevel} 
            description={weather.iceRisk.description} 
          />
          
          {/* Aktuelle Wetterdaten */}
          <Card className="bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Linke Spalte - Hauptdaten */}
                <div className="col-span-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-blue-50 rounded-lg">
                  <H3 className="text-2xl font-bold mb-2">{weather.location}</H3>
                  <div className="text-5xl font-bold mb-4">
                    {weather.temperature !== null ? `${weather.temperature.toFixed(1)}°C` : "-- °C"}
                  </div>
                  <div className="mb-4">
                    {getWeatherIcon(weather.icon || weather.conditions)}
                  </div>
                  <Paragraph className="text-center text-muted-foreground">
                    {weather.conditions}
                  </Paragraph>
                </div>
                
                {/* Mittlere Spalte - Details */}
                <div className="col-span-1 space-y-4 p-4 border rounded-lg">
                  <H3 className="text-lg font-semibold mb-3">Aktuelle Details</H3>
                  
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
                    <span>
                      Gefühlte Temperatur: {weather.temperature !== null ? `${(weather.temperature - 2).toFixed(1)}°C` : "-- °C"}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <CloudRain className="w-5 h-5 text-accent mr-2" />
                    <span>Niederschlagswahrsch.: {weather.precipitationProbability}%</span>
                  </div>
                  
                  {weather.soilTemperature !== undefined && (
                    <div className="flex items-center">
                      <Layers className="w-5 h-5 text-accent mr-2" />
                      <span>Bodentemperatur: {weather.soilTemperature.toFixed(1)}°C</span>
                    </div>
                  )}
                  
                  {weather.snowHeight !== undefined && (
                    <div className="flex items-center">
                      <CloudSnow className="w-5 h-5 text-amber-500 mr-2" />
                      <span>Erwartete Schneehöhe: {weather.snowHeight} cm</span>
                    </div>
                  )}
                </div>
                
                {/* Rechte Spalte - Empfehlungen */}
                <div className="col-span-1 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <H3 className="text-lg font-semibold mb-3">Winterdienst-Info</H3>
                  
                  <div className="mb-4">
                    <div className="font-medium mb-1">Streumittel-Empfehlung:</div>
                    <div className="text-sm">
                      <p>{weather.streumittelBedarf?.description}</p>
                      <p className="mt-1">
                        <span className="font-semibold">Bedarf für 100m²:</span><br />
                        Salz: {weather.streumittelBedarf?.salt} kg<br />
                        Granulat/Splitt: {weather.streumittelBedarf?.grit} kg
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="font-medium mb-1">Optimaler Räumzeitpunkt:</div>
                    <div className="text-sm font-medium text-green-700">
                      {weather.optimalCleaningTime ? `Heute ${weather.optimalCleaningTime} Uhr` : "Aktuell nicht erforderlich"}
                    </div>
                  </div>
                  
                  {weather.snowfallPrediction?.willSnow && (
                    <div>
                      <div className="font-medium mb-1">Schneefall erwartet:</div>
                      <div className="text-sm">
                        <p>
                          Beginn: {weather.snowfallPrediction.startTime}<br />
                          Ende: {weather.snowfallPrediction.endTime}<br />
                          Menge: {weather.snowfallPrediction.totalAmount} cm
                        </p>
                      </div>
                    </div>
                  )}
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
                    {getWeatherIcon(item.icon || item.conditions)}
                    <span className="text-lg font-bold">{item.temperature.toFixed(1)}°C</span>
                    <span className="text-xs text-center text-muted-foreground mt-1">
                      {item.conditions}
                    </span>
                    {item.precipitation !== undefined && item.precipitation > 0 && (
                      <span className="text-xs text-center text-blue-600 mt-1">
                        {item.precipitation.toFixed(1)} mm
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
      
      {/* Wenn keine Daten und nicht lädt */}
      {!isLoading && !weather && !error && (
        <div className="bg-blue-100 text-blue-800 border border-blue-200 p-4 rounded-lg">
          <p className="text-center">
            Bitte geben Sie einen Standort ein oder verwenden Sie die Standorterkennung, um Wetterdaten anzuzeigen.
          </p>
        </div>
      )}
    </div>
  );
};
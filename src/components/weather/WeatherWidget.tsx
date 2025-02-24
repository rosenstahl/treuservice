"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, CloudSnow, CloudRain, Thermometer, Wind, Droplets } from "lucide-react";
import { H3, Paragraph } from "@/components/ui/typography";
// Füge diese Imports zu WeatherWidget.tsx hinzu
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
  icon: string;
  alertLevel: AlertLevel;
  forecast: {
    time: string;
    temperature: number;
    conditions: string;
    icon: string;
  }[];
}

// Mock-Daten für das Beispiel
const mockWeatherData: WeatherData = {
  location: 'Berlin',
  temperature: -2,
  conditions: 'THUNDERSTORM WITH LIGHT DRIZZLE',
  humidity: 58,
  cloudiness: 86,
  windSpeed: 5,
  icon: 'snowflake',
  alertLevel: 'red',
  forecast: [
    { time: '09:00', temperature: -1, conditions: 'Snow', icon: 'cloud-snow' },
    { time: '12:00', temperature: 0, conditions: 'Light Snow', icon: 'cloud-snow' },
    { time: '15:00', temperature: 1, conditions: 'Cloudy', icon: 'cloud' },
    { time: '18:00', temperature: -1, conditions: 'Snow', icon: 'cloud-snow' },
  ]
};

// Funktion zur Bestimmung des Warnungs-Levels
const determineAlertLevel = (temp: number, precipitation: number): AlertLevel => {
  if (temp < 0 || precipitation > 70) return 'red';
  if (temp <= 3 || precipitation > 40) return 'yellow';
  return 'green';
};

// Alert-Komponente
const AlertBanner = ({ level }: { level: AlertLevel }) => {
  const colors = {
    green: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    red: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
  };
  
  const messages = {
    green: 'Alles sicher: Kein Winterdienst erforderlich',
    yellow: 'Vorwarnung: Winterdienst in Bereitschaft',
    red: 'Akuter Handlungsbedarf: Winterdienst erforderlich',
  };

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

  const fetchWeatherData = async (location: string) => {
    setIsLoading(true);
    try {
      // In einer echten Implementierung würde hier ein Geocoding-Service verwendet werden
      // Für jetzt nehmen wir einfach Berlin als Standort an
      const coords = { lat: 52.52, lon: 13.41 }; // Berlin
      
      const currentWeather = await getCurrentWeather(coords);
      const forecast = await getWeatherForecast({
        ...coords,
        date: new Date().toISOString().split('T')[0]
      });
      
      if (currentWeather) {
        const hourlyForecast = forecast.slice(0, 24).filter((_, i) => i % 6 === 0); // Alle 6 Stunden
        
        const alertLevel = determineAlertLevel(
          currentWeather.temperature || 0, 
          currentWeather.precipitation_probability || 0
        );
        
        setWeather({
          location: location || 'Berlin',
          temperature: currentWeather.temperature || 0,
          conditions: currentWeather.condition || 'Unbekannt',
          humidity: currentWeather.relative_humidity || 0,
          cloudiness: currentWeather.cloud_cover || 0,
          windSpeed: currentWeather.wind_speed || 0,
          icon: currentWeather.icon || 'cloud',
          alertLevel,
          forecast: hourlyForecast.map(item => ({
            time: new Date(item.timestamp).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
            temperature: item.temperature || 0,
            conditions: item.condition || 'Unbekannt',
            icon: item.icon || 'cloud'
          }))
        });
      }
    } catch (error) {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      // Fallback auf Mock-Daten bei einem Fehler
      setWeather(mockWeatherData);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSearch = () => {
    if (searchLocation.trim()) {
      fetchWeatherData(searchLocation);
    }
  };

  // Beim ersten Laden Standort-basierte Daten abrufen
  useEffect(() => {
    fetchWeatherData('Berlin');
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Suchleiste */}
      <div className="flex gap-2">
        <Input
          placeholder="Standort eingeben..."
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch} disabled={isLoading} className="bg-accent hover:bg-accent/90">
          <Search className="w-4 h-4 mr-2" />
          Suchen
        </Button>
      </div>
      
      {/* Warnungs-Banner */}
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
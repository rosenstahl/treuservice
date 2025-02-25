"use client";

import { H3 } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Minus, Layers, RefreshCw, Snowflake, CloudRain, ThermometerSnowflake } from "lucide-react";
import { useEffect, useState, useRef } from "react";

// Typen für die Wetterdaten
interface WeatherData {
  city: string;
  lat: number;
  lon: number;
  temperature: number;
  precipitation: number | null;
  condition: string;
  isSnowing: boolean;
}

// Liste der deutschen Großstädte mit Koordinaten
const CITIES: { name: string; lat: number; lon: number }[] = [
  { name: "Berlin", lat: 52.52, lon: 13.41 },
  { name: "Hamburg", lat: 53.55, lon: 10.00 },
  { name: "München", lat: 48.14, lon: 11.58 },
  { name: "Köln", lat: 50.94, lon: 6.96 },
  { name: "Frankfurt", lat: 50.11, lon: 8.68 },
  { name: "Stuttgart", lat: 48.78, lon: 9.18 },
  { name: "Düsseldorf", lat: 51.23, lon: 6.78 },
  { name: "Leipzig", lat: 51.34, lon: 12.38 },
  { name: "Dortmund", lat: 51.51, lon: 7.47 },
  { name: "Essen", lat: 51.46, lon: 7.01 },
  { name: "Bremen", lat: 53.08, lon: 8.80 },
  { name: "Dresden", lat: 51.05, lon: 13.74 },
  { name: "Hannover", lat: 52.37, lon: 9.73 },
  { name: "Nürnberg", lat: 49.45, lon: 11.08 },
  { name: "Rostock", lat: 54.09, lon: 12.10 },
  { name: "Freiburg", lat: 47.99, lon: 7.85 },
  { name: "Kiel", lat: 54.32, lon: 10.14 },
  { name: "Münster", lat: 51.96, lon: 7.63 },
];

// Wettersimulator für Deutschland (da wir keine Echtzeit-API haben)
function simulateWeatherData(): WeatherData[] {
  // Februar-Wetter in Deutschland (realistisch)
  const baseTemp = 2; // Basis-Temperatur für Februar
  const northSouthVariation = 4; // Temperaturdifferenz Nord-Süd
  const elevationVariation = 3; // Temperaturdifferenz durch Höhenlage

  return CITIES.map(city => {
    // Temperatur variiert mit Breitengrad (nördlicher = kälter)
    // und speziellen Standortfaktoren (z.B. München kälter durch Alpen-Nähe)
    let tempModifier = 0;
    
    // Nord-Süd-Gefälle
    const latDiff = 54.5 - city.lat; // Nördlichster Punkt ~54.5
    tempModifier += (latDiff / 6) * northSouthVariation;
    
    // Spezielle Standortfaktoren
    if (city.name === "München" || city.name === "Freiburg") {
      tempModifier -= 2; // Kälter durch Alpen/Schwarzwald-Nähe
    }
    if (city.name === "Hamburg" || city.name === "Kiel" || city.name === "Rostock") {
      tempModifier += 1; // Milder durch Küstennähe
    }
    
    // Zufallsvariation für Realismus
    const randomVariation = (Math.random() - 0.5) * 2;
    
    // Endtemperatur berechnen
    const temperature = Math.round((baseTemp + tempModifier + randomVariation) * 10) / 10;
    
    // Niederschläge basierend auf Region und Temperatur
    const isPrecipitation = Math.random() < 0.4; // 40% Chance auf Niederschlag
    let precipitation = null;
    
    if (isPrecipitation) {
      // Mehr Niederschlag im Norden und an der Küste
      const basePrecip = 0.5; // Basis-Niederschlag in mm/h
      let precipModifier = 1;
      
      if (city.name === "Hamburg" || city.name === "Bremen" || city.name === "Kiel" || city.name === "Rostock") {
        precipModifier = 1.5; // Küstenregionen
      } else if (city.lat > 52) {
        precipModifier = 1.3; // Norddeutschland
      } else if (city.name === "Freiburg" || city.name === "München") {
        precipModifier = 1.2; // Gebirgsnahe Regionen
      }
      
      precipitation = Math.round(basePrecip * precipModifier * (0.8 + Math.random() * 0.4) * 10) / 10;
    }
    
    // Wetterbedingung bestimmen
    let condition;
    let isSnowing = false;
    
    if (precipitation) {
      if (temperature <= 0) {
        condition = "snow";
        isSnowing = true;
      } else if (temperature <= 3) {
        condition = "sleet";
        isSnowing = Math.random() < 0.5; // 50% Chance auf Schnee bei Schneeregen
      } else {
        condition = "rain";
      }
    } else {
      // Kein Niederschlag
      const cloudiness = Math.random();
      if (cloudiness < 0.3) {
        condition = "clear-day";
      } else if (cloudiness < 0.7) {
        condition = "partly-cloudy-day";
      } else {
        condition = "cloudy";
      }
    }
    
    return {
      city: city.name,
      lat: city.lat,
      lon: city.lon,
      temperature: temperature,
      precipitation: precipitation,
      condition: condition,
      isSnowing: isSnowing
    };
  });
}

export const SnowfallMapWidget = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<WeatherData | null>(null);
  const [zoom, setZoom] = useState(1);

  // Deutschland-Koordinaten für die SVG-Karte
  const germanyBounds = {
    minLat: 47.3, maxLat: 55.1,
    minLon: 5.9, maxLon: 15.0
  };
  
  // Wetterdaten laden
  useEffect(() => {
    const loadWeatherData = () => {
      setIsLoading(true);
      try {
        // In einer realen Anwendung würde hier ein API-Aufruf stehen
        const data = simulateWeatherData();
        setWeatherData(data);
        
        // Stadt mit dem meisten Schneefall als Standard auswählen
        const snowingCities = data.filter(city => city.isSnowing);
        if (snowingCities.length > 0) {
          // Sortiere nach Niederschlagsmenge absteigend
          const sortedSnowingCities = [...snowingCities].sort((a, b) => 
            (b.precipitation || 0) - (a.precipitation || 0)
          );
          setSelectedCity(sortedSnowingCities[0]);
        } else {
          // Wenn kein Schnee, wähle die kälteste Stadt
          const coldestCity = [...data].sort((a, b) => a.temperature - b.temperature)[0];
          setSelectedCity(coldestCity);
        }
      } catch (error) {
        console.error('Fehler beim Laden der Wetterdaten:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWeatherData();
    
    // Daten alle 10 Minuten aktualisieren
    const interval = setInterval(loadWeatherData, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Koordinaten auf SVG-Koordinaten umrechnen
  const coordToSvgPoint = (lat: number, lon: number, width: number, height: number) => {
    const { minLat, maxLat, minLon, maxLon } = germanyBounds;
    
    // X-Koordinate (Längengrad)
    const xPercent = (lon - minLon) / (maxLon - minLon);
    const x = xPercent * width;
    
    // Y-Koordinate (Breitengrad) - Umkehrung weil SVG Y von oben nach unten geht
    const yPercent = 1 - (lat - minLat) / (maxLat - minLat);
    const y = yPercent * height;
    
    return { x, y };
  };
  
  // Marker-Größe basierend auf Zoom
  const getMarkerSize = () => {
    return 6 * zoom;
  };
  
  // Marker-Farbe basierend auf Temperatur
  const getTemperatureColor = (temp: number) => {
    if (temp <= -5) return "#0033cc"; // Sehr kalt (dunkelblau)
    if (temp <= 0) return "#4d79ff";  // Kalt (blau)
    if (temp <= 3) return "#80dfff";  // Kühl (hellblau)
    if (temp <= 7) return "#ffcc00";  // Mild (gelb)
    return "#ff5c33";                 // Warm (orange/rot)
  };
  
  // Niederschlags-Indikator
  const getPrecipitationIndicator = (city: WeatherData) => {
    if (!city.precipitation) return null;
    
    const baseSize = getMarkerSize() * 1.6;
    const size = baseSize + (city.precipitation * 2);
    
    return (
      <circle
        cx={0}
        cy={0}
        r={size}
        fill={city.isSnowing ? "rgba(200, 220, 255, 0.5)" : "rgba(100, 180, 255, 0.3)"}
        stroke={city.isSnowing ? "#e0e0ff" : "#80b3ff"}
        strokeWidth={0.5 * zoom}
      />
    );
  };
  
  // Symbol basierend auf Wetterbedingung
  const getWeatherSymbol = (city: WeatherData) => {
    const condition = city.condition;
    const isSelected = selectedCity?.city === city.city;
    const symbolSize = getMarkerSize() * (isSelected ? 1.2 : 1);
    
    if (condition === "snow" || (condition === "sleet" && city.isSnowing)) {
      return (
        <g transform={`translate(0, -${symbolSize * 1.5})`}>
          <Snowflake 
            size={symbolSize * 2} 
            color="#ffffff" 
            fill="#b3d9ff" 
            strokeWidth={1.5}
          />
        </g>
      );
    }
    
    if (condition === "rain" || condition === "sleet") {
      return (
        <g transform={`translate(0, -${symbolSize * 1.5})`}>
          <CloudRain 
            size={symbolSize * 2} 
            color="#80b3ff" 
            strokeWidth={1.5}
          />
        </g>
      );
    }
    
    if (condition === "cloudy" || condition === "partly-cloudy-day") {
      return (
        <g transform={`translate(0, -${symbolSize * 1.5})`}>
          <Cloud 
            size={symbolSize * 2} 
            color={condition === "cloudy" ? "#9aa0a6" : "#b8b9ba"} 
            strokeWidth={1.5}
          />
        </g>
      );
    }
    
    return null;
  };
  
  // Temperatur-Label
  const getTemperatureLabel = (city: WeatherData) => {
    const isSelected = selectedCity?.city === city.city;
    const fontSize = 10 * zoom * (isSelected ? 1.2 : 1);
    
    return (
      <text
        x={0}
        y={getMarkerSize() * 2.5}
        fontSize={fontSize}
        fontWeight={isSelected ? "bold" : "normal"}
        fill="#333"
        textAnchor="middle"
      >
        {city.temperature.toFixed(1)}°C
      </text>
    );
  };
  
  // Stadt-Label
  const getCityLabel = (city: WeatherData) => {
    const isSelected = selectedCity?.city === city.city;
    const fontSize = 11 * zoom * (isSelected ? 1.2 : 1);
    
    if (!isSelected && zoom < 1.3) return null;
    
    return (
      <text
        x={0}
        y={getMarkerSize() * 4}
        fontSize={fontSize}
        fontWeight={isSelected ? "bold" : "normal"}
        fill="#333"
        textAnchor="middle"
      >
        {city.city}
      </text>
    );
  };
  
  // Zoom-Funktionen
  const zoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const zoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.8));

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <H3 className="text-xl font-semibold flex items-center gap-2">
            <ThermometerSnowflake className="h-5 w-5 text-blue-500" />
            Niederschlagsradar Deutschland
          </H3>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setWeatherData(simulateWeatherData())}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <RefreshCw className="w-4 h-4" />
              Aktualisieren
            </Button>
            <Button variant="outline" size="sm">
              <Layers className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
        
        {/* Karten-Container */}
        <div className="relative w-full h-[500px] bg-sky-50 rounded-lg overflow-hidden mb-4" ref={mapContainerRef}>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="absolute inset-0">
              {/* SVG-Karte */}
              <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="xMidYMid meet"
                style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
              >
                {/* Deutschland-Umriss */}
                <path
                  d="M38.5,20.1 C41.1,18.1 44.6,17.8 47.5,17.5 C50.1,17.2 53.2,17.2 55.6,18.3 C58.4,19.6 60.5,21.9 62.9,23.8 C65.7,26.1 68.4,28.9 69.1,32.5 C69.8,36.4 67.7,39.9 66.2,43.3 C64.8,46.6 63.5,50.1 63.6,53.6 C63.7,56.9 65.3,59.9 67.4,62.5 C69.5,64.9 72.3,66.6 74.9,68.5 C77.8,70.6 80.7,73.1 82.1,76.6 C83.4,80.1 82.6,83.9 80.8,87.1 C73.4,90.5 65.9,86.6 58.7,85.1 C55.6,84.4 52.3,84.2 49.3,85.1 C46.8,85.9 44.6,87.3 42.1,87.8 C39.5,88.3 36.8,87.8 34.2,87.4 C31.7,86.9 29,86.3 27.1,84.7 C25.2,83.1 24.3,80.6 23.6,78.1 C22.9,75.6 22.3,72.9 22.8,70.3 C23.4,67.6 25.3,65.3 27.3,63.4 C29.6,61.3 32.2,59.1 33.7,56.3 C35.4,53.1 35.4,49.3 35.1,45.7 C34.9,42.1 34.2,38.3 32.1,35.3 C30.1,32.2 26.9,30.1 23.6,28.5 C20.4,26.9 16.8,25.4 14.4,22.5 C18.5,17.9 25.1,16.5 31.3,17.3 C33.9,17.7 36.6,18.5 38.5,20.1"
                  fill="#f0f0f0"
                  stroke="#ccc"
                  strokeWidth="0.5"
                />
                
                {/* Städte/Wetter-Marker */}
                {weatherData.map((city) => {
                  // SVG-Koordinaten berechnen
                  const point = coordToSvgPoint(city.lat, city.lon, 100, 100);
                  const isSelected = selectedCity?.city === city.city;
                  
                  return (
                    <g 
                      key={city.city}
                      transform={`translate(${point.x}, ${point.y})`}
                      onClick={() => setSelectedCity(city)}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Niederschlag */}
                      {getPrecipitationIndicator(city)}
                      
                      {/* Temperatur-Punkt */}
                      <circle
                        r={getMarkerSize()}
                        fill={getTemperatureColor(city.temperature)}
                        stroke={isSelected ? "#000" : "white"}
                        strokeWidth={isSelected ? 1 * zoom : 0.5 * zoom}
                      />
                      
                      {/* Wetter-Symbol */}
                      {getWeatherSymbol(city)}
                      
                      {/* Temperatur */}
                      {getTemperatureLabel(city)}
                      
                      {/* Stadt-Name */}
                      {getCityLabel(city)}
                    </g>
                  );
                })}
              </svg>
              
              {/* Zoom-Steuerung */}
              <div className="absolute right-4 top-4 flex flex-col space-y-2">
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white shadow-md" onClick={zoomIn}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white shadow-md" onClick={zoomOut}>
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Ausgewählte Stadt - Detailansicht */}
              {selectedCity && (
                <div className="absolute left-4 bottom-4 bg-white p-3 rounded-lg shadow-md max-w-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h4 className="font-bold text-lg">{selectedCity.city}</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <span className="text-slate-600">Temperatur:</span>
                    <span className="font-medium">{selectedCity.temperature.toFixed(1)}°C</span>
                    
                    <span className="text-slate-600">Wetter:</span>
                    <span className="font-medium">
                      {selectedCity.isSnowing ? "Schneefall" : 
                       selectedCity.condition === "rain" ? "Regen" :
                       selectedCity.condition === "sleet" ? "Schneeregen" :
                       selectedCity.condition === "cloudy" ? "Bewölkt" :
                       selectedCity.condition === "partly-cloudy-day" ? "Teilweise bewölkt" :
                       "Klar"}
                    </span>
                    
                    {selectedCity.precipitation !== null && (
                      <>
                        <span className="text-slate-600">Niederschlag:</span>
                        <span className="font-medium">
                          {selectedCity.precipitation.toFixed(1)} mm/h
                        </span>
                      </>
                    )}
                    
                    {selectedCity.isSnowing && (
                      <>
                        <span className="text-slate-600">Schneehöhe (24h):</span>
                        <span className="font-medium">
                          {((selectedCity.precipitation || 0) * 10).toFixed(1)} cm
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div>Letzte Aktualisierung: {new Date().toLocaleTimeString('de-DE')}</div>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full bg-blue-500"></span> Kalt
            <span className="ml-2 h-3 w-3 rounded-full bg-yellow-500"></span> Mild
            <span className="ml-2 h-3 w-3 rounded-full bg-red-500"></span> Warm
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Cloud = ({ size, color, strokeWidth }: { size: number; color: string; strokeWidth: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M17.5 19H9.5C6.5 19 4.5 17 4.5 14C4.5 11.3 6.3 9.2 8.9 9C9.5 6.5 11.8 5 14.5 5C17.8 5 20.5 7.7 20.5 11C20.5 11.4 20.4 11.8 20.4 12.2C21.7 12.9 22.5 14.3 22.5 15.8C22.5 17.6 21.1 19 19.3 19H17.5Z" 
      stroke={color} 
      strokeWidth={strokeWidth} 
      fill="white" 
    />
  </svg>
);
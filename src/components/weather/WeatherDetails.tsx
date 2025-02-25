"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H3, Paragraph } from "@/components/ui/typography";
import { 
  Thermometer, 
  Wind, 
  Droplets, 
  CloudSnow, 
  Calendar, 
  Clock,
  ArrowDown,
  Layers
} from "lucide-react";
import { getWeatherForecast, predictSnowfall, WeatherObservation } from './brightsky';

interface WeatherDetailsProps {
  location: string;
  coordinates?: { lat: number; lon: number };
  currentWeather?: {
    temperature: number | null;
    conditions: string;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    icon: string;
    soilTemperature?: number;
  };
}

export const WeatherDetails = ({ 
  location, 
  coordinates, 
  currentWeather 
}: WeatherDetailsProps) => {
  const [activeTab, setActiveTab] = useState('hourly');
  const [hourlyForecast, setHourlyForecast] = useState<WeatherObservation[]>([]);
  const [dailyForecast, setDailyForecast] = useState<{
    date: string;
    maxTemp: number;
    minTemp: number;
    conditions: string;
    precipitation: number;
    snowAmount: number;
    icon: string;
  }[]>([]);
  const [snowPrediction, setSnowPrediction] = useState<{
    willSnow: boolean;
    startTime?: string;
    endTime?: string;
    totalAmount: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Wetterdaten laden, wenn Koordinaten verfügbar sind
  useEffect(() => {
    if (coordinates) {
      loadWeatherData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates]);
  
  // Wetterdaten von der API abrufen
  const loadWeatherData = async () => {
    if (!coordinates) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Heutiges Datum
      const today = new Date();
      const formattedToday = today.toISOString().split('T')[0];
      
      // Datum in 7 Tagen
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      const formattedNextWeek = nextWeek.toISOString().split('T')[0];
      
      // Vorhersage abrufen
      const forecast = await getWeatherForecast({
        ...coordinates,
        date: formattedToday,
        last_date: formattedNextWeek
      });
      
      if (forecast.length === 0) {
        throw new Error("Keine Vorhersagedaten verfügbar");
      }
      
      // Stündliche Vorhersage (nur die nächsten 48 Stunden)
      setHourlyForecast(forecast.slice(0, 48));
      
      // Tägliche Vorhersage berechnen
      const dailyData = calculateDailyForecast(forecast);
      setDailyForecast(dailyData);
      
      // Schneefall-Vorhersage
      const snowfall = predictSnowfall(forecast, 72); // 3 Tage vorausschauen
      setSnowPrediction(snowfall);
      
    } catch (error) {
      console.error("Fehler beim Laden der Wetterdetails:", error);
      setError("Die Wettervorhersage konnte nicht geladen werden. Bitte versuchen Sie es später erneut.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Stündliche Vorhersagedaten in tägliche Zusammenfassung konvertieren
  const calculateDailyForecast = (hourlyData: WeatherObservation[]) => {
    const dailyMap = new Map<string, {
      temps: number[]; 
      conditions: Record<string, number>; 
      precipitation: number;
      snowAmount: number;
      icons: Record<string, number>;
    }>();
    
    // Daten nach Tagen gruppieren
    hourlyData.forEach(hour => {
      if (!hour.timestamp || hour.temperature === undefined) return;
      
      const date = hour.timestamp.split('T')[0];
      const temp = hour.temperature;
      const condition = hour.condition || 'unknown';
      const precip = hour.precipitation || 0;
      const icon = hour.icon || 'cloud';
      
      // Schneemenge berechnen wenn kalt und Niederschlag
      let snow = 0;
      if (temp <= 2 && precip > 0) {
        const factor = temp <= 0 ? 10 : 7;
        snow = (precip * factor) / 10; // cm
      }
      
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          temps: [],
          conditions: {},
          precipitation: 0,
          snowAmount: 0,
          icons: {}
        });
      }
      
      const dayData = dailyMap.get(date)!;
      dayData.temps.push(temp);
      dayData.precipitation += precip;
      dayData.snowAmount += snow;
      
      // Bedingungen und Icons zählen
      dayData.conditions[condition] = (dayData.conditions[condition] || 0) + 1;
      dayData.icons[icon] = (dayData.icons[icon] || 0) + 1;
    });
    
    // Tägliche Zusammenfassung erstellen
    const dailyForecast = Array.from(dailyMap.entries()).map(([date, data]) => {
      // Häufigste Wetterbedingung finden
      let mostCommonCondition = 'unknown';
      let maxConditionCount = 0;
      
      Object.entries(data.conditions).forEach(([condition, count]) => {
        if (count > maxConditionCount) {
          mostCommonCondition = condition;
          maxConditionCount = count;
        }
      });
      
      // Häufigstes Icon finden
      let mostCommonIcon = 'cloud';
      let maxIconCount = 0;
      
      Object.entries(data.icons).forEach(([icon, count]) => {
        if (count > maxIconCount) {
          mostCommonIcon = icon;
          maxIconCount = count;
        }
      });
      
      return {
        date: formatDate(date),
        maxTemp: Math.max(...data.temps),
        minTemp: Math.min(...data.temps),
        conditions: mostCommonCondition,
        precipitation: parseFloat(data.precipitation.toFixed(1)),
        snowAmount: parseFloat(data.snowAmount.toFixed(1)),
        icon: mostCommonIcon
      };
    });
    
    return dailyForecast;
  };
  
  // Datum formatieren
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
  };
  
  // Uhrzeit formatieren
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  // Wetter-Icon-Komponente
  const getWeatherIcon = (condition: string) => {
    switch(condition.toLowerCase()) {
      case 'clear-day':
      case 'clear-night':
        return '☀️';
      case 'partly-cloudy-day':
      case 'partly-cloudy-night':
        return '⛅';
      case 'cloudy':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'snow':
        return '❄️';
      case 'sleet':
        return '🌨️';
      case 'wind':
        return '💨';
      case 'fog':
        return '🌫️';
      case 'thunderstorm':
        return '⛈️';
      default:
        return '☁️';
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <H3 className="text-xl font-semibold">Wettervorhersage für {location}</H3>
          <div className="text-sm text-gray-500">
            <Calendar className="inline-block w-4 h-4 mr-1" />
            {new Date().toLocaleDateString('de-DE')}
          </div>
        </div>
        
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-800 border border-red-200 p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {!isLoading && !error && (
          <>
            {/* Schneefall-Prognose */}
            {snowPrediction && snowPrediction.willSnow && (
              <div className="bg-blue-100 text-blue-800 border border-blue-200 p-4 rounded-lg mb-6">
                <div className="flex items-start">
                  <CloudSnow className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium mb-1">Schneefall erwartet</div>
                    <div className="text-sm">
                      In den nächsten Tagen wird Schneefall mit einer Höhe von ca. {snowPrediction.totalAmount.toFixed(1)} cm erwartet.
                      {snowPrediction.startTime && (
                        <span> Beginn: {snowPrediction.startTime}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Vorhersage-Tabs */}
            <Tabs 
              defaultValue={activeTab}
              value={activeTab}
              className="mb-6"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="hourly" onClick={() => setActiveTab('hourly')}>
                  Stündlich
                </TabsTrigger>
                <TabsTrigger value="daily" onClick={() => setActiveTab('daily')}>
                  7-Tage Trend
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="hourly" className="space-y-4">
                {/* Aktuelle Wetterbedingungen */}
                {currentWeather && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center">
                      <Thermometer className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <div className="text-sm">Temperatur</div>
                        <div className="font-medium">
                          {currentWeather.temperature !== null ? `${currentWeather.temperature.toFixed(1)}°C` : "--°C"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Wind className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <div className="text-sm">Wind</div>
                        <div className="font-medium">{currentWeather.windSpeed} km/h</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Droplets className="w-5 h-5 text-blue-600 mr-2" />
                      <div>
                        <div className="text-sm">Luftfeuchtigkeit</div>
                        <div className="font-medium">{currentWeather.humidity}%</div>
                      </div>
                    </div>
                    {currentWeather.soilTemperature !== undefined && (
                      <div className="flex items-center">
                        <Layers className="w-5 h-5 text-blue-600 mr-2" />
                        <div>
                          <div className="text-sm">Bodentemperatur</div>
                          <div className="font-medium">{currentWeather.soilTemperature.toFixed(1)}°C</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Stündliche Vorhersage */}
                <div className="overflow-x-auto pb-4">
                  <div className="inline-flex space-x-4 min-w-full">
                    {hourlyForecast.map((hour, index) => (
                      <div 
                        key={index} 
                        className="flex-none w-20 text-center p-3 border rounded-lg bg-white"
                      >
                        <div className="text-xs text-gray-500 mb-1">
                          <Clock className="inline-block w-3 h-3 mr-1" />
                          {formatTime(hour.timestamp)}
                        </div>
                        <div className="text-2xl mb-1">{getWeatherIcon(hour.icon || 'cloud')}</div>
                        <div className="font-bold">{hour.temperature?.toFixed(1)}°C</div>
                        {hour.precipitation !== undefined && hour.precipitation > 0 && (
                          <div className="text-xs text-blue-600 mt-1">
                            <Droplets className="inline-block w-3 h-3 mr-1" />
                            {hour.precipitation.toFixed(1)} mm
                          </div>
                        )}
                        {hour.wind_speed !== undefined && (
                          <div className="text-xs text-gray-600 mt-1">
                            <Wind className="inline-block w-3 h-3 mr-1" />
                            {hour.wind_speed} km/h
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="daily">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3">
                  {dailyForecast.map((day, index) => (
                    <div 
                      key={index} 
                      className={`p-4 border rounded-lg text-center ${index === 0 ? 'bg-blue-50' : 'bg-white'}`}
                    >
                      <div className="font-medium mb-2">{day.date}</div>
                      <div className="text-3xl mb-2">{getWeatherIcon(day.icon)}</div>
                      <div className="flex justify-center items-center space-x-3 mb-2">
                        <span className="text-red-500">{day.maxTemp.toFixed(1)}°</span>
                        <ArrowDown className="h-3 w-3 text-blue-500" />
                        <span className="text-blue-500">{day.minTemp.toFixed(1)}°</span>
                      </div>
                      
                      {day.precipitation > 0 && (
                        <div className="text-xs text-blue-600 mb-1">
                          <Droplets className="inline-block w-3 h-3 mr-1" />
                          {day.precipitation} mm
                        </div>
                      )}
                      
                      {day.snowAmount > 0 && (
                        <div className="text-xs text-blue-800 font-medium">
                          <CloudSnow className="inline-block w-3 h-3 mr-1" />
                          {day.snowAmount} cm Schnee
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
        
        {/* Zusätzliche Informationen */}
        <div className="mt-6 text-sm text-gray-500 border-t pt-4">
          <Paragraph>
            Die Wettervorhersage wird regelmäßig aktualisiert und bietet eine Vorhersagegenauigkeit von bis zu 7 Tagen.
            Daten basierend auf dem Deutschen Wetterdienst.
          </Paragraph>
        </div>
      </CardContent>
    </Card>
  );
};
"use client"

import React from 'react';
import { useWeather } from './features/WeatherContext';
import { Thermometer, MapPin, ArrowDown, ArrowUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import AnimatedWeatherIcon from './features/AnimatedWeatherIcon';
import { WeatherLastUpdated } from './features/WeatherLastUpdated';
import { WeatherWarningBanner } from './features/WeatherWarningBanner';

interface WeatherHeaderProps {
  onRequestService?: () => void;
}

/**
 * Kompakte Wetteranzeige für den Header
 * Beinhaltet aktuelle Temperatur und ein Popup mit mehr Details
 */
const WeatherHeader: React.FC<WeatherHeaderProps> = ({ onRequestService }) => {
  const { 
    isLoading, 
    error, 
    location, 
    weather, 
    lastUpdated, 
    detectLocation,
    refreshWeather
  } = useWeather();

  // Aktualisieren der Wetterdaten mit verbesserter zentraler Funktion
  const handleRefresh = () => {
    // Die zentrale refreshWeather-Funktion verwenden, die 
    // automatisch die beste Methode auswählt
    refreshWeather();
  };

  // Zeigt Lade-Indikator während des Ladens
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 bg-white/5 p-2 rounded-md">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  // Zeigt Button zum Laden der Wetterdaten, wenn Fehler oder keine Daten
  if (error || !weather) {
    return (
      <Button 
        onClick={detectLocation} 
        size="sm" 
        variant="outline"
        className="bg-white/5 text-white border-white/10 hover:bg-white/10"
      >
        <MapPin className="mr-2 h-4 w-4" />
        Wetterinfo laden
      </Button>
    );
  }

  const current = weather.current;
  const todayForecast = weather.daily[0];
  
  // Header-Wetter-Widget mit Popup
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-white/5 text-white border-white/10 hover:bg-white/10 flex items-center"
        >
          <AnimatedWeatherIcon iconName={current.icon} size={20} className="mr-2" />
          <span className="font-semibold">{Math.round(current.temperature)}°C</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-white border-slate-200 shadow-md">
        <div className="flex flex-col space-y-4">
          {/* Kopfzeile */}
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-slate-500" />
              <span className="text-sm font-medium text-slate-800">{location}</span>
            </div>
            <WeatherLastUpdated 
              lastUpdated={lastUpdated} 
              variant="header" 
              format="HH:mm"
              showPrefix={false}
              iconSize={0}
              onRefresh={handleRefresh}
            />
          </div>
          
          {/* Aktuelle Wetterbedingungen */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AnimatedWeatherIcon iconName={current.icon} size={48} color="#333" />
              <div className="ml-3">
                <div className="text-xl font-bold text-slate-800">{Math.round(current.temperature)}°C</div>
                <div className="text-sm text-slate-600">{current.conditionDE}</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-sm flex items-center">
                <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-slate-800">{Math.round(todayForecast.maxTemp)}°</span>
              </div>
              <div className="text-sm flex items-center">
                <ArrowDown className="h-3 w-3 text-blue-500 mr-1" />
                <span className="text-slate-800">{Math.round(todayForecast.minTemp)}°</span>
              </div>
            </div>
          </div>
          
          {/* Details */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <Thermometer className="h-4 w-4 mr-1 text-slate-500" />
              <span className="text-slate-700">Gefühlt: {Math.round(current.feelsLike)}°C</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 mr-1 text-slate-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4v16m6-14 a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"></path>
              </svg>
              <span className="text-slate-700">Feuchtigkeit: {Math.round(current.humidity)}%</span>
            </div>
          </div>
          
          {/* Wettervorhersage Tag/Nacht */}
          <div className="grid grid-cols-4 gap-2 mt-2 bg-slate-50 p-2 rounded-md">
            {weather.hourly.slice(0, 4).map((hour, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <span className="text-xs text-slate-500">
                  {format(hour.time, 'HH:mm', { locale: de })}
                </span>
                <AnimatedWeatherIcon iconName={hour.icon} size={20} color="#555" />
                <span className="text-sm font-medium text-slate-800">
                  {Math.round(hour.temperature)}°
                </span>
              </div>
            ))}
          </div>
          
          {/* Winterdienst Banner */}
          <WeatherWarningBanner 
            winterServiceStatus={weather.winterServiceStatus}
            currentWeather={current}
            forecastItems={weather.hourly}
            onActionClick={onRequestService}
            actionButtonText="Winterdienst anfordern"
            variant="light"
            className="mt-2"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WeatherHeader;
"use client"

import React, { useEffect, useState } from 'react';
import { useWeather } from './features/WeatherContext';
import { MapPin, ArrowDown, ArrowUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AnimatedWeatherIcon from './features/AnimatedWeatherIcon';
import { WeatherLastUpdated } from './features/WeatherLastUpdated';
import { WeatherWarningBanner, DailyWeatherStatusIndicator } from './features/WeatherWarningBanner';

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
    formatTemperature,
    getTodayForecast,
    getNextHoursForecasts,
    getFormattedDate,
    getRefreshHandler
  } = useWeather();

  // Status für Sichtbarkeit
  const [isVisible, setIsVisible] = useState(true);

  // Effekt, der den Sichtbarkeitsstatus aktualisiert, wenn sich der Wetter-Kontext ändert
  useEffect(() => {
    // Auch bei Ladevorgängen sichtbar bleiben
    setIsVisible(true);
  }, [isLoading, weather, error, location]);

  // Wenn nicht sichtbar, nichts anzeigen
  if (!isVisible) return null;

  // Zeigt Lade-Indikator während des Ladens
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 bg-accent p-2 rounded-md">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    );
  }

  // Container für Location Pin und Wetter-Widget
  const renderWeatherContainer = () => {
    // Zeigt nur Location Pin, wenn keine Daten oder Fehler
    if (error || !weather) {
      return (
        <Button 
          onClick={detectLocation} 
          size="sm" 
          variant="outline"
          className="bg-accent text-white border-transparent hover:bg-accent-hover hover:text-white hover:shadow-[0_0_8px_rgba(255,255,255,0.5)]"
        >
          <MapPin className="mr-2 h-4 w-4" />
          Wetterinfo laden
        </Button>
      );
    }

    const current = weather.current;
    const todayForecast = getTodayForecast();
    
    // Standortname für die Anzeige formatieren
    const displayLocation = location && location.length > 10 
      ? location.substring(0, 10) + '...'
      : location;
    
    // Wetter-Widget mit Location Pin davor
    return (
      <div className="flex items-center space-x-2">
        {/* Location Pin Button für Standorterkennung */}
        <Button 
          onClick={detectLocation} 
          size="sm" 
          variant="outline"
          className="hidden md:flex bg-accent text-white border-transparent hover:bg-accent-hover hover:text-white hover:shadow-[0_0_8px_rgba(255,255,255,0.5)] px-2"
          title="Standort erkennen"
        >
          <MapPin className="h-4 w-4" />
        </Button>
        
        {/* Wetter-Widget */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-accent text-white border-transparent hover:bg-accent-hover hover:text-white hover:shadow-[0_0_8px_rgba(255,255,255,0.5)] flex items-center"
            >
              {/* Standort links */}
              {displayLocation && (
                <span className="mr-0 text-sm flex items-center">
                  {displayLocation}
                </span>
              )}
              
              {/* Icon in der Mitte */}
              <AnimatedWeatherIcon iconName={current.icon} size={30} isHeader={true} />
              
              {/* Temperatur rechts */}
              <span className="ml-0 font-semibold">{formatTemperature(current.temperature)}°C</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 bg-white border-slate-200 shadow-md z-50">
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
                  onRefresh={getRefreshHandler()}
                />
              </div>
              
              {/* Aktuelle Wetterbedingungen */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* Auch hier Header-Icon mit x.-Präfix verwenden */}
                  <AnimatedWeatherIcon iconName={current.icon} size={48} color="#333" isHeader={true} />
                  <div className="ml-3">
                    <div className="text-xl font-bold text-slate-800">{formatTemperature(current.temperature)}°C</div>
                    <div className="text-sm text-slate-600">{current.conditionDE}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {todayForecast && (
                    <>
                      <div className="text-sm flex items-center">
                        <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                        <span className="text-slate-800">{formatTemperature(todayForecast.maxTemp)}°</span>
                      </div>
                      <div className="text-sm flex items-center">
                        <ArrowDown className="h-3 w-3 text-blue-500 mr-1" />
                        <span className="text-slate-800">{formatTemperature(todayForecast.minTemp)}°</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {/* Wettervorhersage für die nächsten Stunden */}
              <div className="grid grid-cols-4 gap-2 mt-2 bg-slate-50 p-2 rounded-md">
                {getNextHoursForecasts(4).length > 0 ? (
                  getNextHoursForecasts(4).map((hour, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <span className="text-xs text-slate-500">
                        {getFormattedDate(hour.time, 'HH:mm')}
                      </span>
                      {/* Auch in der stündlichen Vorhersage Header-Icons verwenden */}
                      <AnimatedWeatherIcon iconName={hour.icon} size={20} color="#555" isHeader={true} />
                      <span className="text-sm font-medium text-slate-800">
                        {formatTemperature(hour.temperature)}°
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-4 text-center text-sm text-slate-500 py-2">
                    Keine stündlichen Daten verfügbar
                  </div>
                )}
              </div>
              
              {/* Tageskarten mit Winterdienst-Status - aktualisierte Version */}
              {weather.daily && weather.daily.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2 bg-slate-50 p-2 rounded-md">
                  {weather.daily.slice(0, 2).map((day, index) => (
                    <div key={index} className="flex flex-col items-center p-2 border border-slate-200 rounded-md">
                      <span className="text-xs text-slate-500 font-medium mb-1">
                        {getFormattedDate(day.date, 'EEE, dd.MM')}
                      </span>
                      <div className="flex items-center mb-1">
                        <AnimatedWeatherIcon iconName={day.icon} size={20} color="#555" isHeader={true} />
                        <span className="text-sm text-slate-700 ml-1">
                          {formatTemperature(day.minTemp)}° / {formatTemperature(day.maxTemp)}°
                        </span>
                      </div>
                      
                      {/* Winterdienst-Status-Indikator für diesen Tag */}
                      <DailyWeatherStatusIndicator 
                        day={day} 
                        hourlyForecasts={weather.hourly} 
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Winterdienst Banner - aktualisierte Version */}
              {weather.hourly && (
                <WeatherWarningBanner 
                  currentWeather={current}
                  forecastItems={weather.hourly}
                  onActionClick={onRequestService}
                  actionButtonText="Winterdienst anfordern"
                  className="mt-2"
                />
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  return renderWeatherContainer();
};

export default WeatherHeader;
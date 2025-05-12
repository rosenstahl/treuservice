"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { H1, Paragraph } from "@/components/ui/typography";
import { 
  Thermometer, 
  Wind, 
  Droplets, 
  CloudSnow, 
  MapPin, 
  Search, 
  ArrowDown, 
  ArrowRight 
} from 'lucide-react';
import { useWeather } from './features/WeatherContext';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import WinterImage from '/public/images/winterdienst/winter-landscape.jpg';
import AnimatedWeatherIcon from './features/AnimatedWeatherIcon';
import { WeatherLastUpdated } from './features/WeatherLastUpdated';
import { WeatherWarningBanner, DailyWeatherStatusIndicator } from './features/WeatherWarningBanner';

interface WeatherHeroProps {
  scrollToContact?: () => void;
}

const WeatherHero: React.FC<WeatherHeroProps> = ({ scrollToContact }) => {
  // Wetter-Context mit den Helper-Methoden
  const { 
    isLoading, 
    error, 
    location,
    weather,
    fetchWeather,
    detectLocation,
    lastUpdated,
    formatTemperature,
    formatDecimal,
    getFormattedDate,
    getNextHoursForecasts,
    getNextDaysForecasts,
    getRefreshHandler
  } = useWeather();

  // Lokaler State für Suche
  const [searchInput, setSearchInput] = useState('');

  // Aktualisiere Sucheingabe wenn sich der Standort ändert
  useEffect(() => {
    if (location) {
      setSearchInput(location);
    }
  }, [location]);

  // Standortsuche
  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeather(searchInput);
    }
  };

  // Enter-Taste für Suche
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Wetterinhalt rendern
  const renderWeatherContent = () => {
    if (!weather) {
      return (
        <div className="backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/20">
          <p className="text-center text-white text-sm md:text-base">
            Bitte geben Sie einen Standort ein oder verwenden Sie die Standorterkennung, um Wetterdaten anzuzeigen.
          </p>
        </div>
      );
    }

    const current = weather.current;

    return (
      <>
        {/* Standort */}
        <div className="flex items-center mb-3 md:mb-4">
          <MapPin className="w-5 h-5 md:w-6 md:h-6 mr-2 text-white" />
          <h2 className="text-xl md:text-2xl font-bold text-white">{location || "Ihr Standort"}</h2>
        </div>

        {/* Große Temperaturanzeige */}
        <div className="flex items-center">
          <span className="text-6xl md:text-8xl font-bold mr-3 md:mr-4 text-white">
            {formatTemperature(current.temperature)}°
          </span>
          <div className="pt-2 md:pt-4">
            <AnimatedWeatherIcon 
              iconName={current.icon} 
              size="lg"
            />
          </div>
        </div>

        {/* Wetterbeschreibung */}
        <div className="mt-1 md:mt-2 mb-4 md:mb-6">
          <div className="text-xl md:text-2xl text-white">{current.conditionDE}</div>
        </div>

        {/* Wetterdetails */}
        <div className="backdrop-blur-sm rounded-xl p-4 md:p-6 mt-4 md:mt-6 border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <div className="flex items-center text-white">
              <Thermometer className="w-4 h-4 md:w-5 md:h-5 text-white mr-2 md:mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base">Gefühlt: {formatTemperature(current.feelsLike)}°C</span>
            </div>
            
            <div className="flex items-center text-white">
              <Droplets className="w-4 h-4 md:w-5 md:h-5 text-white mr-2 md:mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base">Luftfeuchtigkeit: {Math.round(current.humidity)}%</span>
            </div>

            <div className="flex items-center text-white">
              <Wind className="w-4 h-4 md:w-5 md:h-5 text-white mr-2 md:mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base">Wind: {formatDecimal(current.windSpeed)} km/h</span>
            </div>

            <div className="flex items-center text-white">
              <CloudSnow className="w-4 h-4 md:w-5 md:h-5 text-white mr-2 md:mr-3 flex-shrink-0" />
              <span className="text-sm md:text-base">Niederschlagswahr.: {Math.round(current.precipitationProbability)}%</span>
            </div>
          </div>
        </div>
        
        {/* Letzte Aktualisierung - Der Refresh-Button zeigt auch das Symbol an */}
        <WeatherLastUpdated 
          lastUpdated={lastUpdated}
          onRefresh={getRefreshHandler()}
          variant="dark"
          className="mt-3 md:mt-4 flex justify-center"
          showIcon={false}
          showPrefix={true}
        />
        
        {/* Warnungs-Banner - mit verbesserter Logik */}
        <div className="mt-3 md:mt-4">
          <WeatherWarningBanner 
            currentWeather={current}
            forecastItems={weather.hourly}
            onActionClick={scrollToContact}
            actionButtonText="Winterdienst buchen"
            variant="dark"
          />
        </div>
      </>
    );
  };

  // Tagesvorhersage rendern
  const renderDailyForecast = () => {
    const dailyForecasts = getNextDaysForecasts(4); // Zeigt 4 Tage statt 7
    
    if (dailyForecasts.length === 0) {
      return (
        <div className="p-3 md:p-4 text-white text-center text-sm md:text-base">
          Keine tägliche Vorhersage verfügbar.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
        {dailyForecasts.map((day, index) => (
          <div key={index} className="flex flex-col items-center p-2 md:p-3 border rounded-lg border-white/10 text-white">
            <span className="text-xs md:text-sm font-medium">
              {getFormattedDate(day.date, 'EEE, dd.MM')}
            </span>
            <div className="my-1">
              <AnimatedWeatherIcon 
                iconName={day.icon} 
                size="sm"
              />
            </div>
            
            {/* Temperaturen */}
            <div className="flex justify-center items-center space-x-1 md:space-x-2">
              <span className="text-xs md:text-sm text-red-300">{formatTemperature(day.maxTemp)}°</span>
              <ArrowDown className="h-2.5 w-2.5 md:h-3 md:w-3 text-blue-300" />
              <span className="text-xs md:text-sm text-blue-300">{formatTemperature(day.minTemp)}°</span>
            </div>
            
            {/* NEU: Winterdienst-Status-Indikator für diesen Tag */}
            {weather && (
              <DailyWeatherStatusIndicator 
                day={day} 
                hourlyForecasts={weather.hourly} 
                variant="dark" 
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Stündliche Vorhersage rendern
  const renderHourlyForecast = () => {
    // Maximal 4 Stunden holen, damit keine abgeschnittenen Karten erscheinen
    const hourlyForecasts = getNextHoursForecasts(4);
    
    if (hourlyForecasts.length === 0) {
      return (
        <div className="p-3 md:p-4 text-white text-center text-sm md:text-base">
          Keine stündliche Vorhersage verfügbar.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {hourlyForecasts.map((hour, index) => (
          <div key={index} className="flex flex-col items-center p-2 border rounded-lg border-white/10 text-white">
            <span className="text-xs md:text-sm font-medium">
              {getFormattedDate(hour.time, 'HH:mm')}
            </span>
            <div className="my-1">
              <AnimatedWeatherIcon 
                iconName={hour.icon} 
                size="sm"
              />
            </div>
            <span className="text-base md:text-lg font-bold">
              {formatTemperature(hour.temperature)}°
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-[100svh] flex items-center overflow-hidden">
      {/* Hintergrundbild */}
      <div className="absolute inset-0 z-0">
        <Image
          src={WinterImage}
          alt="Winterlandschaft"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 md:to-transparent"></div>
      </div>

      {/* Inhalt - entfernt overflow-auto für kein Scrollen */}
      <div className="container mx-auto relative z-10 px-4 py-4 md:py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 lg:items-start mt-14 md:mt-20">
          {/* Linke Spalte - Suche & Wetter */}
          <div className="lg:col-span-5 text-white">
            {/* Suchleiste */}
            <div className="flex gap-1 md:gap-2 mb-4 md:mb-8">
              <Input
                placeholder="PLZ, Ort oder Adresse..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-white/20 text-white backdrop-blur-sm border-white/20 placeholder-white/70 text-sm md:text-base h-9 md:h-10"
                disabled={isLoading}
              />
              <Button 
                onClick={detectLocation} 
                disabled={isLoading}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm h-9 md:h-10 px-2 md:px-3"
                title="Meinen Standort verwenden"
              >
                <MapPin className="w-4 h-4 text-white" />
              </Button>
              <Button 
                onClick={handleSearch} 
                disabled={isLoading || !searchInput.trim()} 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm h-9 md:h-10 px-2.5 md:px-3"
              >
                {isLoading ? (
                  <div className="w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Search className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                )}
                <span className="text-white text-sm ml-1.5">Suchen</span>
              </Button>
            </div>

            {/* Fehleranzeige */}
            {error && (
              <div className="mb-3 md:mb-4 p-2 md:p-3 bg-red-500/20 backdrop-blur-sm rounded border border-red-400/30 text-white text-sm">
                <p>{error}</p>
              </div>
            )}

            {/* Wetteranzeige */}
            {isLoading ? (
              <div className="backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 flex justify-center items-center min-h-[150px] md:min-h-[200px]">
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-2 md:mb-3"></div>
                  <p className="text-white text-sm md:text-base">Wetterdaten werden geladen...</p>
                </div>
              </div>
            ) : (
              renderWeatherContent()
            )}
          </div>

          {/* Rechte Spalte - Text & Vorhersage */}
          <div className="lg:col-span-7 mt-4 md:mt-0">
            {/* Text */}
            <div className="backdrop-blur-sm rounded-xl p-5 md:p-8 border border-white/10">
              <H1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 md:mb-4 text-white">
                Professioneller Winterdienst
              </H1>
              <div className="text-lg sm:text-xl md:text-2xl font-medium text-accent mb-3 md:mb-6">
                Zuverlässiger Service bei Schnee und Glätte
              </div>
              <Paragraph className="text-sm md:text-lg text-white/90 mb-4 md:mb-8">
                Unsere erfahrenen Teams sorgen dafür, dass Ihre Wege, Zufahrten und Parkplätze auch bei widrigen Wetterbedingungen sicher und frei von Schnee und Eis bleiben. Mit modernster Technik und umweltschonendem Streumaterial bieten wir einen rundum professionellen Winterdienst.
              </Paragraph>
              <button 
                onClick={scrollToContact}
                className="px-4 py-2.5 md:px-6 md:py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all duration-200 shadow-sm flex items-center gap-1.5 text-sm md:text-base"
              >
                Jetzt Angebot anfordern
                <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </button>
            </div>
            
            {/* Wettervorhersage */}
            {weather && (
              <div className="backdrop-blur-sm rounded-xl p-3 md:p-4 mt-4 md:mt-6 border border-white/10">
                <Tabs defaultValue="hourly" className="w-full">
                  <TabsList className="bg-white/10 border border-white/20 mb-3 md:mb-4 sticky top-0 z-10 h-9 md:h-10">
                    <TabsTrigger value="hourly" className="data-[state=active]:bg-white/20 data-[state=active]:text-white h-7 md:h-8 text-xs md:text-sm">
                      Heute
                    </TabsTrigger>
                    <TabsTrigger value="daily" className="data-[state=active]:bg-white/20 data-[state=active]:text-white h-7 md:h-8 text-xs md:text-sm">
                      4-Tage Trend
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="hourly">
                    {renderHourlyForecast()}
                  </TabsContent>
                  
                  <TabsContent value="daily">
                    {renderDailyForecast()}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherHero;
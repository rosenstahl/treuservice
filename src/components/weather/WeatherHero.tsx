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
        <div className="backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <p className="text-center text-white">
            Bitte geben Sie einen Standort ein oder verwenden Sie die Standorterkennung, um Wetterdaten anzuzeigen.
          </p>
        </div>
      );
    }

    const current = weather.current;

    return (
      <>
        {/* Standort */}
        <div className="flex items-center mb-4">
          <MapPin className="w-6 h-6 mr-2 text-white" />
          <h2 className="text-2xl font-bold text-white">{location || "Ihr Standort"}</h2>
        </div>

        {/* Große Temperaturanzeige */}
        <div className="flex items-center">
          <span className="text-8xl font-bold mr-4 text-white">
            {formatTemperature(current.temperature)}°
          </span>
          <div className="pt-4">
            <AnimatedWeatherIcon 
              iconName={current.icon} 
              size="xl"
            />
          </div>
        </div>

        {/* Wetterbeschreibung */}
        <div className="mt-2 mb-6">
          <div className="text-2xl text-white">{current.conditionDE}</div>
        </div>

        {/* Wetterdetails */}
        <div className="backdrop-blur-sm rounded-xl p-6 mt-6 border border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-white">
              <Thermometer className="w-5 h-5 text-white mr-3" />
              <span>Gefühlt: {formatTemperature(current.feelsLike)}°C</span>
            </div>
            
            <div className="flex items-center text-white">
              <Droplets className="w-5 h-5 text-white mr-3" />
              <span>Luftfeuchtigkeit: {Math.round(current.humidity)}%</span>
            </div>

            <div className="flex items-center text-white">
              <Wind className="w-5 h-5 text-white mr-3" />
              <span>Wind: {formatDecimal(current.windSpeed)} km/h</span>
            </div>

            <div className="flex items-center text-white">
              <CloudSnow className="w-5 h-5 text-white mr-3" />
              <span>Niederschlagswahr.: {Math.round(current.precipitationProbability)}%</span>
            </div>
          </div>
        </div>
        
        {/* Letzte Aktualisierung - Der Refresh-Button zeigt auch das Symbol an */}
        <WeatherLastUpdated 
          lastUpdated={lastUpdated}
          onRefresh={getRefreshHandler()}
          variant="dark"
          className="mt-4 flex justify-center"
          showIcon={false}
          showPrefix={true}
        />
        
        {/* Warnungs-Banner - mit verbesserter Logik */}
        <div className="mt-4">
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
        <div className="p-4 text-white text-center">
          Keine tägliche Vorhersage verfügbar.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-4 gap-3">
        {dailyForecasts.map((day, index) => (
          <div key={index} className="flex flex-col items-center p-3 border rounded-lg border-white/10 text-white">
            <span className="text-sm font-medium">
              {getFormattedDate(day.date, 'EEE, dd.MM')}
            </span>
            <div className="my-1">
              <AnimatedWeatherIcon 
                iconName={day.icon} 
                size="md"
              />
            </div>
            
            {/* Temperaturen */}
            <div className="flex justify-center items-center space-x-2">
              <span className="text-red-300">{formatTemperature(day.maxTemp)}°</span>
              <ArrowDown className="h-3 w-3 text-blue-300" />
              <span className="text-blue-300">{formatTemperature(day.minTemp)}°</span>
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
        <div className="p-4 text-white text-center">
          Keine stündliche Vorhersage verfügbar.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-4 gap-2">
        {hourlyForecasts.map((hour, index) => (
          <div key={index} className="flex flex-col items-center p-2 border rounded-lg border-white/10 text-white">
            <span className="text-sm font-medium">
              {getFormattedDate(hour.time, 'HH:mm')}
            </span>
            <div className="my-1">
              <AnimatedWeatherIcon 
                iconName={hour.icon} 
                size="md"
              />
            </div>
            <span className="text-lg font-bold">
              {formatTemperature(hour.temperature)}°
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen flex items-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Inhalt - entfernt overflow-auto für kein Scrollen */}
      <div className="container mx-auto relative z-10 px-4 py-4 md:py-8 w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start mt-20">
          {/* Linke Spalte - Suche & Wetter */}
          <div className="lg:col-span-5 text-white">
            {/* Suchleiste */}
            <div className="flex gap-2 mb-8">
              <Input
                placeholder="PLZ, Ort oder Adresse eingeben..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow bg-white/20 text-white backdrop-blur-sm border-white/20 placeholder-white/70"
                disabled={isLoading}
              />
              <Button 
                onClick={detectLocation} 
                disabled={isLoading}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                title="Meinen Standort verwenden"
              >
                <MapPin className="w-4 h-4 text-white" />
              </Button>
              <Button 
                onClick={handleSearch} 
                disabled={isLoading || !searchInput.trim()} 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm"
              >
                {isLoading ? (
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Search className="w-4 h-4 mr-2 text-white" />
                )}
                <span className="text-white">Suchen</span>
              </Button>
            </div>

            {/* Fehleranzeige */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/20 backdrop-blur-sm rounded border border-red-400/30 text-white">
                <p>{error}</p>
              </div>
            )}

            {/* Wetteranzeige */}
            {isLoading ? (
              <div className="backdrop-blur-sm rounded-xl p-6 border border-white/10 flex justify-center items-center min-h-[200px]">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-white">Wetterdaten werden geladen...</p>
                </div>
              </div>
            ) : (
              renderWeatherContent()
            )}
          </div>

          {/* Rechte Spalte - Text & Vorhersage */}
          <div className="lg:col-span-7">
            {/* Text */}
            <div className="backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <H1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                Professioneller Winterdienst
              </H1>
              <div className="text-xl md:text-2xl font-medium text-accent mb-6">
                Zuverlässiger Service bei Schnee und Glätte
              </div>
              <Paragraph className="text-lg text-white/90 mb-8">
                Unsere erfahrenen Teams sorgen dafür, dass Ihre Wege, Zufahrten und Parkplätze auch bei widrigen Wetterbedingungen sicher und frei von Schnee und Eis bleiben. Mit modernster Technik und umweltschonendem Streumaterial bieten wir einen rundum professionellen Winterdienst.
              </Paragraph>
              <button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-all duration-200 shadow-sm flex items-center gap-2"
              >
                Jetzt Angebot anfordern
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            {/* Wettervorhersage */}
            {weather && (
              <div className="backdrop-blur-sm rounded-xl p-4 mt-6 border border-white/10">
                <Tabs defaultValue="hourly" className="w-full">
                  <TabsList className="bg-white/10 border border-white/20 mb-4 sticky top-0 z-10">
                    <TabsTrigger value="hourly" className="data-[state=active]:bg-white/20 data-[state=active]:text-white">
                      Heute
                    </TabsTrigger>
                    <TabsTrigger value="daily" className="data-[state=active]:bg-white/20 data-[state=active]:text-white">
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
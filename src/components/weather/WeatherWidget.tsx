"use client";

import { useState, useEffect } from 'react';
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
  Clock,
  ArrowDown,
  Layers,
  RefreshCw
} from "lucide-react";
import { H3, Paragraph } from "@/components/ui/typography";

// Importiere den WeatherContext
import { useWeather } from './WeatherContext';
// Importiere die Hilfs-Funktionen
import { formatTemperature, formatDecimal, isWinterServiceRequired } from './utils';

// StyledTabs-Komponente importieren
import { StyledTabs } from './StyledTabs';

// Neue animierte Wetter-Icon-Komponente
const AnimatedWeatherIcon = ({ condition, size = 'md' }: { condition: string, size?: 'sm' | 'md' | 'lg' }) => {
  const getSizeClasses = () => {
    switch(size) {
      case 'sm': return 'w-16 h-16';
      case 'lg': return 'w-32 h-32';
      default: return 'w-24 h-24';
    }
  };
  
  switch(condition.toLowerCase()) {
    case 'clear-day':
    case 'clear-night':
      return (
        <div className={`${getSizeClasses()} relative flex items-center justify-center`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="sun-gradient" gradientUnits="userSpaceOnUse" y2="28.33" y1="19.67" x2="21.5" x1="16.5">
                  <stop stopColor="#fbbf24" offset={0} />
                  <stop stopColor="#fbbf24" offset=".45" />
                  <stop stopColor="#f59e0b" offset={1} />
                </linearGradient>
              </defs>
              <circle strokeWidth=".5" strokeMiterlimit={10} stroke="#f8af18" fill="url(#sun-gradient)" r={12} cy={32} cx={32} />
              <path d="M32 15.71V9.5m0 45v-6.21m11.52-27.81l4.39-4.39M16.09 47.91l4.39-4.39m0-23l-4.39-4.39m31.82 31.78l-4.39-4.39M9.5 32h6.21m32.79 0h-6.21" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" stroke="#fbbf24" fill="none">
                <animateTransform values="0 32 32; 360 32 32" type="rotate" repeatCount="indefinite" dur="45s" attributeName="transform" />
              </path>
            </svg>
          </div>
        </div>
      );
    case 'partly-cloudy-day':
    case 'partly-cloudy-night':
      return (
        <div className={`${getSizeClasses()} relative flex items-center justify-center`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="cloud-gradient" gradientUnits="userSpaceOnUse" y2="50.8" y1="21.96" x2="39.2" x1="22.56">
                  <stop stopColor="#f3f7fe" offset={0} />
                  <stop stopColor="#f3f7fe" offset=".45" />
                  <stop stopColor="#deeafb" offset={1} />
                </linearGradient>
                <linearGradient id="sun-gradient-2" gradientUnits="userSpaceOnUse" y2="28.33" y1="19.67" x2="21.5" x1="16.5">
                  <stop stopColor="#fbbf24" offset={0} />
                  <stop stopColor="#fbbf24" offset=".45" />
                  <stop stopColor="#f59e0b" offset={1} />
                </linearGradient>
              </defs>
              <g>
                <circle strokeWidth=".5" strokeMiterlimit={10} stroke="#f8af18" fill="url(#sun-gradient-2)" r={8} cy={24} cx={19} />
                <path d="M19 15.67V12.5m0 23v-3.17m5.89-14.22l2.24-2.24M10.87 32.13l2.24-2.24m0-11.78l-2.24-2.24m16.26 16.26l-2.24-2.24M7.5 24h3.17m19.83 0h-3.17" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" stroke="#fbbf24" fill="none">
                  <animateTransform values="0 19 24; 360 19 24" type="rotate" repeatCount="indefinite" dur="45s" attributeName="transform" />
                </path>
              </g>
              <path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z" strokeWidth=".5" strokeMiterlimit={10} stroke="#e6effc" fill="url(#cloud-gradient)">
                <animateTransform values="0 0; 3 0; 0 0; -3 0; 0 0" type="translate" repeatCount="indefinite" dur="6s" attributeName="transform" />
              </path>
            </svg>
          </div>
        </div>
      );
    case 'cloudy':
      return (
        <div className={`${getSizeClasses()} relative flex items-center justify-center`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="cloud-gradient-3" gradientUnits="userSpaceOnUse" y2="50.8" y1="21.96" x2="39.2" x1="22.56">
                  <stop stopColor="#f3f7fe" offset={0} />
                  <stop stopColor="#f3f7fe" offset=".45" />
                  <stop stopColor="#deeafb" offset={1} />
                </linearGradient>
              </defs>
              <path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z" strokeWidth=".5" strokeMiterlimit={10} stroke="#e6effc" fill="url(#cloud-gradient-3)">
                <animateTransform values="0 0; 3 0; 0 0; -3 0; 0 0" type="translate" repeatCount="indefinite" dur="6s" attributeName="transform" />
              </path>
            </svg>
          </div>
        </div>
      );
    case 'rain':
      return (
        <div className={`${getSizeClasses()} relative flex items-center justify-center`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="cloud-gradient-rain" gradientUnits="userSpaceOnUse" y2="50.8" y1="21.96" x2="39.2" x1="22.56">
                  <stop stopColor="#f3f7fe" offset={0} />
                  <stop stopColor="#f3f7fe" offset=".45" />
                  <stop stopColor="#deeafb" offset={1} />
                </linearGradient>
                <linearGradient id="rain-drop-1" gradientUnits="userSpaceOnUse" y2="48.05" y1="42.95" x2="25.47" x1="22.53">
                  <stop stopColor="#4286ee" offset={0} />
                  <stop stopColor="#4286ee" offset=".45" />
                  <stop stopColor="#0950bc" offset={1} />
                </linearGradient>
                <linearGradient id="rain-drop-2" gradientUnits="userSpaceOnUse" y2="48.05" y1="42.95" x2="32.47" x1="29.53">
                  <stop stopColor="#4286ee" offset={0} />
                  <stop stopColor="#4286ee" offset=".45" />
                  <stop stopColor="#0950bc" offset={1} />
                </linearGradient>
                <linearGradient id="rain-drop-3" gradientUnits="userSpaceOnUse" y2="48.05" y1="42.95" x2="39.47" x1="36.53">
                  <stop stopColor="#4286ee" offset={0} />
                  <stop stopColor="#4286ee" offset=".45" />
                  <stop stopColor="#0950bc" offset={1} />
                </linearGradient>
              </defs>
              <path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z" strokeWidth=".5" strokeMiterlimit={10} stroke="#e6effc" fill="url(#cloud-gradient-rain)">
                <animateTransform values="0 0; 3 0; 0 0; -3 0; 0 0" type="translate" repeatCount="indefinite" dur="6s" attributeName="transform" />
              </path>
              <path d="M24.39 43.03l-.78 4.94" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" stroke="url(#rain-drop-1)" fill="none">
                <animateTransform values="1 -5; -2 10" type="translate" repeatCount="indefinite" dur="0.7s" attributeName="transform" />
              </path>
              <path d="M31.39 43.03l-.78 4.94" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" stroke="url(#rain-drop-2)" fill="none">
                <animateTransform values="1 -5; -2 10" type="translate" repeatCount="indefinite" dur="0.7s" begin="-0.4s" attributeName="transform" />
              </path>
              <path d="M38.39 43.03l-.78 4.94" strokeWidth={2} strokeMiterlimit={10} strokeLinecap="round" stroke="url(#rain-drop-3)" fill="none">
                <animateTransform values="1 -5; -2 10" type="translate" repeatCount="indefinite" dur="0.7s" begin="-0.2s" attributeName="transform" />
              </path>
            </svg>
          </div>
        </div>
      );
    case 'snow':
      return (
        <div className={`${getSizeClasses()} relative flex items-center justify-center`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="cloud-gradient-snow" gradientUnits="userSpaceOnUse" y2="50.8" y1="21.96" x2="39.2" x1="22.56">
                  <stop stopColor="#f3f7fe" offset={0} />
                  <stop stopColor="#f3f7fe" offset=".45" />
                  <stop stopColor="#deeafb" offset={1} />
                </linearGradient>
                <linearGradient id="snowflake-gradient" gradientUnits="userSpaceOnUse" y2="47.28" y1="42.72" x2="25.74" x1="21.26">
                  <stop stopColor="#86c3db" offset={0} />
                  <stop stopColor="#86c3db" offset=".45" />
                  <stop stopColor="#5eafcf" offset={1} />
                </linearGradient>
                <linearGradient id="snowflake-gradient-2" gradientUnits="userSpaceOnUse" y2="47.28" y1="42.72" x2="36.74" x1="32.26">
                  <stop stopColor="#86c3db" offset={0} />
                  <stop stopColor="#86c3db" offset=".45" />
                  <stop stopColor="#5eafcf" offset={1} />
                </linearGradient>
                <linearGradient id="snowflake-gradient-3" gradientUnits="userSpaceOnUse" y2="53.28" y1="48.72" x2="38.74" x1="34.26">
                  <stop stopColor="#86c3db" offset={0} />
                  <stop stopColor="#86c3db" offset=".45" />
                  <stop stopColor="#5eafcf" offset={1} />
                </linearGradient>
              </defs>
              <path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z" strokeWidth=".5" strokeMiterlimit={10} stroke="#e6effc" fill="url(#cloud-gradient-snow)">
                <animateTransform values="0 0; 3 0; 0 0; -3 0; 0 0" type="translate" repeatCount="indefinite" dur="6s" attributeName="transform" />
              </path>
              <g>
                <path d="M23.5 42.5v5m0-2.5h-1.5m3 0h-1.5m0-2.5l-1.5 1.5m3-1.5l-1.5 1.5" fill="none" strokeLinecap="round" strokeMiterlimit={10} stroke="url(#snowflake-gradient)" strokeWidth={1}>
                  <animateTransform values="1 -5; -2 10" type="translate" repeatCount="indefinite" dur="1.5s" attributeName="transform" />
                </path>
                <path d="M34.5 42.5v5m0-2.5h-1.5m3 0h-1.5m0-2.5l-1.5 1.5m3-1.5l-1.5 1.5" fill="none" strokeLinecap="round" strokeMiterlimit={10} stroke="url(#snowflake-gradient-2)" strokeWidth={1}>
                  <animateTransform values="1 -3; -2 7" type="translate" repeatCount="indefinite" dur="1.5s" begin="-0.5s" attributeName="transform" />
                </path>
                <path d="M36.5 48.5v5m0-2.5h-1.5m3 0h-1.5m0-2.5l-1.5 1.5m3-1.5l-1.5 1.5" fill="none" strokeLinecap="round" strokeMiterlimit={10} stroke="url(#snowflake-gradient-3)" strokeWidth={1}>
                  <animateTransform values="1 -4; -2 8" type="translate" repeatCount="indefinite" dur="1.5s" begin="-1s" attributeName="transform" />
                </path>
              </g>
            </svg>
          </div>
        </div>
      );
    default:
      return (
        <div className={`${getSizeClasses()} relative flex items-center justify-center`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <linearGradient id="cloud-gradient-default" gradientUnits="userSpaceOnUse" y2="50.8" y1="21.96" x2="39.2" x1="22.56">
                  <stop stopColor="#f3f7fe" offset={0} />
                  <stop stopColor="#f3f7fe" offset=".45" />
                  <stop stopColor="#deeafb" offset={1} />
                </linearGradient>
              </defs>
              <path d="M46.5 31.5h-.32a10.49 10.49 0 00-19.11-8 7 7 0 00-10.57 6 7.21 7.21 0 00.1 1.14A7.5 7.5 0 0018 45.5a4.19 4.19 0 00.5 0v0h28a7 7 0 000-14z" strokeWidth=".5" strokeMiterlimit={10} stroke="#e6effc" fill="url(#cloud-gradient-default)">
                <animateTransform values="0 0; 3 0; 0 0; -3 0; 0 0" type="translate" repeatCount="indefinite" dur="6s" attributeName="transform" />
              </path>
            </svg>
          </div>
        </div>
      );
  }
};

export const WeatherWidget = () => {
  // WeatherContext nutzen
  const { 
    isLoading, 
    error, 
    location,
    weatherData, 
    searchLocation, 
    detectLocation,
    lastUpdated
  } = useWeather();
  
  // Lokaler State für Suche
  const [searchInput, setSearchInput] = useState('');
  const [activeTab, setActiveTab] = useState('hourly');
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownHours, setCountdownHours] = useState(0);
  
  // Wenn sich der globale Location-Wert ändert, aktualisieren wir auch das Eingabefeld
  useEffect(() => {
    if (location) {
      setSearchInput(location);
    }
  }, [location]);
  
  // Schneefall-Countdown berechnen
  useEffect(() => {
    if (
      weatherData && 
      weatherData.notifications.snowfallPrediction &&
      weatherData.notifications.snowfallPrediction.willSnow && 
      weatherData.notifications.snowfallPrediction.startTime
    ) {
      // Prüfen, ob die Temperaturen unter 0°C sind (sonst ist kein Winterdienst nötig)
      const temp = weatherData.currentConditions.temperature;
      const soilTemp = weatherData.currentConditions.soilTemperature;
      
      if (temp <= 0 || (soilTemp !== undefined && soilTemp <= 0)) {
        // Zeit bis zum Schneefall berechnen
        const snowStartTime = new Date(weatherData.notifications.snowfallPrediction.startTime);
        const now = new Date();
        const timeDiffMs = snowStartTime.getTime() - now.getTime();
        const hoursDiff = Math.max(0, Math.floor(timeDiffMs / (1000 * 60 * 60)));
        
        if (hoursDiff < 24) {
          setShowCountdown(true);
          setCountdownHours(hoursDiff);
        } else {
          setShowCountdown(false);
        }
      } else {
        setShowCountdown(false);
      }
    } else {
      setShowCountdown(false);
    }
  }, [weatherData]);

  // Funktion zur Standortsuche
  const handleSearch = () => {
    if (searchInput.trim()) {
      searchLocation(searchInput);
    }
  };

  // Enter-Taste für die Suche
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Scrollt zu einem Contact-Formular, wenn vorhanden
  const scrollToContactForm = () => {
    const contactForm = document.querySelector('form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Funktion zum Generieren von 8 gleichmäßig verteilten Stundenintervallen
  const generateTimeIntervals = (): { time: string; hour: number }[] => {
    const now = new Date();
    const currentHour = now.getHours();
    const intervals = [];

    // Beginne mit der nächsten geraden Stunde
    const startHour = currentHour % 2 === 0 ? currentHour + 2 : currentHour + 1;
    
    // Generiere 8 Zeitintervalle im 2-Stunden-Takt
    for (let i = 0; i < 8; i++) {
      const hour = (startHour + i * 2) % 24;
      intervals.push({
        time: `${String(hour).padStart(2, '0')}:00`,
        hour
      });
    }

    return intervals;
  };

  // Formatiert das letzte Update-Datum für ein benutzerfreundliches Format
  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000 / 60); // Differenz in Minuten
    
    if (diff < 1) return 'gerade eben';
    if (diff < 60) return `vor ${diff} ${diff === 1 ? 'Minute' : 'Minuten'}`;
    
    const hours = Math.floor(diff / 60);
    return `vor ${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
  };

  return (
    <div className="w-full space-y-4">
      {/* Suchleiste */}
      <div className="flex gap-2">
        <Input
          placeholder="PLZ, Ort oder Adresse eingeben..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow"
          disabled={isLoading}
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
          disabled={isLoading || !searchInput.trim()} 
          className="bg-accent hover:bg-accent/90"
        >
          {isLoading ? (
            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Search className="w-4 h-4 mr-2" />
          )}
          Suchen
        </Button>
      </div>
      
      {/* Fehlermeldungen */}
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
      
      {/* Wettervorhersage für... Box mit Aktualisierungsinfo */}
      <div className="text-center mb-2">
        <div className="text-sm text-gray-600">
          {location ? `Wettervorhersage für ${location}` : isLoading ? "Standort wird ermittelt..." : "Wettervorhersage"}
        </div>
        {lastUpdated && (
          <div className="text-xs text-gray-500 mt-1 flex items-center justify-center">
            <span>Aktualisiert {formatLastUpdated()}</span>
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto ml-2"
              onClick={() => weatherData && searchLocation(location)}
              title="Aktualisieren"
            >
              <RefreshCw className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Countdown bis Schneefall/Räumpflicht - Nur anzeigen, wenn die Temperaturen unter 0°C liegen */}
      {showCountdown && (
        <div className="bg-blue-100 text-blue-800 border border-blue-200 p-4 rounded-lg mb-4 animate-pulse">
          <div className="flex items-center">
            <Clock className="w-6 h-6 mr-3 flex-shrink-0" />
            <div>
              <span className="font-bold">
                Schneefall beginnt in ca. {countdownHours} {countdownHours === 1 ? 'Stunde' : 'Stunden'}
              </span>
              <span className="block text-sm mt-1">
                Räumpflicht beginnt voraussichtlich {countdownHours + 2} {countdownHours + 2 === 1 ? 'Stunde' : 'Stunden'} nach Schneebeginn
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Wetterdaten anzeigen wenn verfügbar */}
      {!isLoading && !error && weatherData && (
        <>
          {/* Warnungs-Banner - zeigt nur bei gelb/rot an */}
          {(weatherData.currentConditions.temperature <= 3 || weatherData.currentConditions.precipitationProbability > 70) && (
            <div className={`p-4 rounded-lg mb-4 flex items-start ${
              weatherData.currentConditions.temperature < 0 
                ? 'bg-red-100 text-red-800 border border-red-200' 
                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            }`}>
              <AlertTriangle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
              <div className="flex-grow">
                <div className="font-medium">
                  {weatherData.currentConditions.temperature < 0 
                    ? 'Winterdienst erforderlich!' 
                    : 'Winterdienst in Bereitschaft'}
                </div>
                <div className="text-sm mt-1">
                  {weatherData.notifications.iceRisk.description}
                </div>
                
                {/* Aktions-Button - nur bei Rotwarnung anzeigen */}
                {weatherData.currentConditions.temperature < 0 && (
                  <button 
                    onClick={scrollToContactForm}
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors font-medium flex items-center"
                  >
                    <CloudSnow className="w-4 h-4 mr-2" />
                    Jetzt Winterdienst anfordern
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Aktuelle Wetterdaten */}
          <Card className="bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Linke Spalte - Hauptdaten */}
                <div className="col-span-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-blue-50 rounded-lg">
                  <H3 className="text-2xl font-bold mb-2">{location || "Ihr Standort"}</H3>
                  <div className="text-5xl font-bold mb-4">
                    {formatTemperature(weatherData.currentConditions.temperature)}°C
                  </div>
                  <div className="mb-4">
                    <AnimatedWeatherIcon condition={weatherData.currentConditions.icon || 'cloudy'} size="lg" />
                  </div>
                  <Paragraph className="text-center text-muted-foreground">
                    {weatherData.currentConditions.conditionDE}
                  </Paragraph>
                </div>
                
                {/* Mittlere Spalte - Details */}
                <div className="col-span-1 space-y-4 p-4 border rounded-lg">
                  <H3 className="text-lg font-semibold mb-3">Aktuelle Details</H3>
                  
                  <div className="flex items-center">
                    <Droplets className="w-5 h-5 text-accent mr-2" />
                    <span>Luftfeuchtigkeit: {Math.round(weatherData.currentConditions.humidity)}%</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Wind className="w-5 h-5 text-accent mr-2" />
                    <span>Windgeschwindigkeit: {formatDecimal(weatherData.currentConditions.windSpeed)} km/h</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Thermometer className="w-5 h-5 text-accent mr-2" />
                    <span>
                      Gefühlte Temperatur: {formatTemperature(weatherData.currentConditions.feelsLike)}°C
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <Droplets className="w-5 h-5 text-accent mr-2" />
                    <span>Niederschlagswahrsch.: {Math.round(weatherData.currentConditions.precipitationProbability)}%</span>
                  </div>
                  
                  {weatherData.currentConditions.soilTemperature !== undefined && (
                    <div className="flex items-center">
                      <Layers className="w-5 h-5 text-accent mr-2" />
                      <span>Bodentemperatur: {formatTemperature(weatherData.currentConditions.soilTemperature)}°C</span>
                    </div>
                  )}
                  
                  {weatherData.notifications && 
                   weatherData.notifications.snowfallPrediction && 
                   weatherData.notifications.snowfallPrediction.totalAmount > 0 && (
                    <div className="flex items-center">
                      <CloudSnow className="w-5 h-5 text-amber-500 mr-2" />
                      <span>Erwartete Schneehöhe: {formatDecimal(weatherData.notifications.snowfallPrediction.totalAmount)} cm</span>
                    </div>
                  )}
                </div>
                
                {/* Rechte Spalte - Empfehlungen */}
                <div className="col-span-1 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <H3 className="text-lg font-semibold mb-3">Winterdienst-Info</H3>
                  
                  {weatherData.notifications && weatherData.notifications.iceRisk && (
                    <div className="mb-4">
                      <div className="font-medium mb-1">Streumittel-Empfehlung:</div>
                      <div className="text-sm">
                        <p>{weatherData.notifications.iceRisk.description}</p>
                        <p className="mt-1">
                          <span className="font-semibold">Bedarf für 100m²:</span><br />
                          Salz: {weatherData.notifications.iceRisk.risk === 'high' ? '4' : 
                                weatherData.notifications.iceRisk.risk === 'medium' ? '3' : '2'} kg<br />
                          Granulat/Splitt: {weatherData.notifications.iceRisk.risk === 'high' ? '10' : 
                                         weatherData.notifications.iceRisk.risk === 'medium' ? '6' : '3'} kg
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {/* Optimaler Räumzeitpunkt */}
                  <div className="mb-4">
                    <div className="font-medium mb-1">Optimaler Räumzeitpunkt:</div>
                    <div className="text-sm font-medium text-green-700">
                      {weatherData.currentConditions.temperature >= 3 
                        ? "Aktuell kein Winterdienst nötig" 
                        : weatherData.forecast && weatherData.forecast.hourly.length > 0
                          ? `Heute ${weatherData.forecast.hourly[0].time.getHours()}:00 Uhr` 
                          : "Aktuell nicht verfügbar"}
                    </div>
                  </div>
                  
                  {/* Schneefall-Vorhersage */}
                  {weatherData.notifications && 
                   weatherData.notifications.snowfallPrediction && 
                   weatherData.notifications.snowfallPrediction.willSnow && 
                   weatherData.currentConditions.temperature <= 0 && (
                    <div>
                      <div className="font-medium mb-1">Schneefall erwartet:</div>
                      <div className="text-sm">
                        <p>
                          {weatherData.notifications.snowfallPrediction.startTime && (
                            <>Beginn: {new Date(weatherData.notifications.snowfallPrediction.startTime).toLocaleTimeString('de-DE', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              day: '2-digit',
                              month: '2-digit'
                            })}<br /></>
                          )}
                          {weatherData.notifications.snowfallPrediction.endTime && (
                            <>Ende: {new Date(weatherData.notifications.snowfallPrediction.endTime).toLocaleTimeString('de-DE', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              day: '2-digit',
                              month: '2-digit'
                            })}<br /></>
                          )}
                          Menge: {formatDecimal(weatherData.notifications.snowfallPrediction.totalAmount)} cm
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Tabs für Vorhersage */}
          {weatherData.forecast && (
            <div className="mt-8">
              <StyledTabs 
                options={[
                  { value: 'hourly', label: 'Stündlich' },
                  { value: 'daily', label: '7-Tage Trend' }
                ]} 
                value={activeTab}
                onChange={setActiveTab}
                className="mb-6"
              />
              
              {activeTab === 'hourly' && (
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <H3 className="text-xl font-semibold mb-4">Stundenvorhersage</H3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {(() => {
                        // Generiere 8 Zeitintervalle im 2-Stunden-Takt
                        const intervals = generateTimeIntervals();
                        
                        return intervals.map((interval, index) => {
                          // Finde Wetterdaten für die aktuelle Stunde
                          const forecastItem = weatherData.forecast.hourly.find(
                            item => item.time.getHours() === interval.hour
                          );
                          
                          // Falls keine Daten für diese Stunde verfügbar sind, verwenden wir Ersatzdaten
                          const fallbackTemp = weatherData.currentConditions.temperature;
                          const fallbackIcon = weatherData.currentConditions.icon;
                          const fallbackCondition = weatherData.currentConditions.conditionDE;
                          
                          return (
                            <div key={index} className="flex flex-col items-center p-3 border rounded-lg hover:shadow-sm transition-shadow">
                              <span className="text-sm font-medium">{interval.time}</span>
                              <div className="h-16 flex justify-center items-center">
                                <AnimatedWeatherIcon 
                                  condition={forecastItem?.icon || fallbackIcon} 
                                  size="sm" 
                                />
                              </div>
                              <span className="text-lg font-bold">
                                {formatTemperature(forecastItem?.temperature || fallbackTemp)}°C
                              </span>
                              <span className="text-xs text-center text-muted-foreground mt-1">
                                {forecastItem?.conditionDE || fallbackCondition}
                              </span>
                              {forecastItem?.precipitation !== undefined && forecastItem.precipitation > 0 && (
                                <span className="text-xs text-center text-blue-600 mt-1">
                                  {formatDecimal(forecastItem.precipitation)} mm
                                </span>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === 'daily' && weatherData.forecast.daily && (
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <H3 className="text-xl font-semibold mb-4">7-Tage Trend</H3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-7 gap-3">
                      {weatherData.forecast.daily.map((day, index) => (
                        <div 
                          key={index} 
                          className={`p-4 border rounded-lg text-center ${index === 0 ? 'bg-blue-50' : 'bg-white'} hover:shadow-md transition-shadow duration-300 flex flex-col items-center`}
                        >
                          <div className="font-medium mb-1">
                            {day.date.toLocaleDateString('de-DE', { 
                              weekday: 'short', 
                              day: '2-digit', 
                              month: '2-digit' 
                            })}
                          </div>
                          <div className="h-24 flex justify-center items-center">
                            <AnimatedWeatherIcon condition={day.icon} />
                          </div>
                          <div className="flex justify-center items-center space-x-3 mb-2">
                            <span className="text-red-500 font-bold">{formatTemperature(day.maxTemp)}°</span>
                            <ArrowDown className="h-3 w-3 text-blue-500" />
                            <span className="text-blue-500 font-bold">{formatTemperature(day.minTemp)}°</span>
                          </div>
                          
                          <div className="text-sm text-gray-600 mb-1">{day.conditionDE}</div>
                          
                          {day.precipitation > 0 && (
                            <div className="text-xs text-blue-600 mb-1">
                              <Droplets className="inline-block w-3 h-3 mr-1" />
                              {formatDecimal(day.precipitation)} mm
                            </div>
                          )}
                          
                          {day.snowAmount > 0 && (
                            <div className="text-xs text-blue-800 font-medium">
                              <CloudSnow className="inline-block w-3 h-3 mr-1" />
                              {formatDecimal(day.snowAmount)} cm Schnee
                            </div>
                          )}
                          
                          {/* Winterdienst anfordern Button erscheint nur, wenn relevant */}
                          {isWinterServiceRequired(day.minTemp, day.precipitation) && index < 3 && (
                            <button 
                              onClick={scrollToContactForm}
                              className="mt-2 text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded transition-colors"
                            >
                              Winterdienst buchen
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </>
      )}
      
      {/* Wenn keine Daten und nicht lädt */}
      {!isLoading && !weatherData && !error && (
        <div className="bg-blue-100 text-blue-800 border border-blue-200 p-4 rounded-lg">
          <p className="text-center">
            Bitte geben Sie einen Standort ein oder verwenden Sie die Standorterkennung, um Wetterdaten anzuzeigen.
          </p>
        </div>
      )}
    </div>
  );
};
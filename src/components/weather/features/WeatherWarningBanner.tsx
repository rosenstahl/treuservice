"use client";

import React from 'react';
import { WinterServiceStatus } from './utils';
import { BrightskyWeatherItem } from './brightsky-api';
import { CurrentWeather, HourlyForecast } from './WeatherContext';
import Image from 'next/image';

// Typen für die Props der Komponente - DWD entfernt
export interface WeatherWarningBannerProps {
  winterServiceStatus?: WinterServiceStatus; // Optional, da wir es selbst berechnen können
  currentWeather?: BrightskyWeatherItem | CurrentWeather; // Unterstützt beide Typen
  forecastItems?: BrightskyWeatherItem[] | HourlyForecast[]; // Unterstützt beide Typen
  onActionClick?: () => void;
  actionButtonText?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

// Hilfsfunktion zur Überprüfung des Typs
function isBrightskyItem(item: any): item is BrightskyWeatherItem {
  return item && typeof item === 'object' && 'timestamp' in item && 'source_id' in item;
}

// Hilfsfunktion zum extrahieren der Temperatur
function getTemperature(item: BrightskyWeatherItem | CurrentWeather): number {
  if (isBrightskyItem(item)) {
    return item.temperature ?? 999;
  } else {
    return item.temperature;
  }
}

// Hilfsfunktion zum überprüfen von Schneebedingungen
function hasSnowCondition(item: BrightskyWeatherItem | CurrentWeather | HourlyForecast): boolean {
  const condition = isBrightskyItem(item) ? item.condition : item.condition;
  return (condition?.toLowerCase().includes('snow') ?? false);
}

/**
 * Prüft den Winterdienststatus basierend auf Schneefall und Temperatur
 */
function determineWinterServiceStatus(
  currentWeather?: BrightskyWeatherItem | CurrentWeather,
  forecastItems?: BrightskyWeatherItem[] | HourlyForecast[]
): WinterServiceStatus {
  // Aktuelle Bedingungen prüfen
  if (currentWeather) {
    const currentTemp = getTemperature(currentWeather);
    const hasSnow = hasSnowCondition(currentWeather);
    
    if (hasSnow) {
      if (currentTemp <= 0) {
        return WinterServiceStatus.REQUIRED;
      } else if (currentTemp <= 3) {
        return WinterServiceStatus.STANDBY;
      }
    }
  }

  // Vorhersage für die nächsten Stunden prüfen
  if (forecastItems && forecastItems.length > 0) {
    const nextFewHours = forecastItems.slice(0, 6); // Nächste 6 Stunden
    
    for (const item of nextFewHours) {
      // Da we einen gemischte Array-Typ haben, müssen wir die Item-Struktur prüfen
      const itemTemp = isBrightskyItem(item) ? (item.temperature ?? 999) : item.temperature;
      const itemHasSnow = hasSnowCondition(item);
      
      if (itemHasSnow) {
        if (itemTemp <= 0) {
          return WinterServiceStatus.REQUIRED;
        } else if (itemTemp <= 3) {
          return WinterServiceStatus.STANDBY;
        }
      }
    }
  }

  // Standardfall: Kein Winterdienst erforderlich
  return WinterServiceStatus.NOT_REQUIRED;
}

/**
 * Komponente zur Anzeige des Winterdienst-Status
 */
export const WeatherWarningBanner: React.FC<WeatherWarningBannerProps> = ({
  winterServiceStatus,
  currentWeather,
  forecastItems,
  onActionClick,
  actionButtonText = "Jetzt Winterdienst anfordern",
  variant = 'light',
  className = '',
}) => {
  // Status automatisch bestimmen, falls nicht von außen gesetzt
  const effectiveStatus = winterServiceStatus || 
                          determineWinterServiceStatus(currentWeather, forecastItems);
  
  // Styling-Variablen basierend auf der Variante
  const getServiceBannerStyle = () => {
    if (variant === 'dark') {
      return effectiveStatus === WinterServiceStatus.REQUIRED
        ? 'bg-red-900/70 text-white border border-red-800/60' 
        : 'bg-blue-800/70 text-white border border-blue-700/60';
    } else {
      return effectiveStatus === WinterServiceStatus.REQUIRED
        ? 'bg-red-100 text-red-800 border border-red-200' 
        : 'bg-blue-100 text-blue-800 border border-blue-200';
    }
  };

  // Text für die Statusmeldung zum Winterdienst
  const getStatusMessage = () => {
    if (effectiveStatus === WinterServiceStatus.REQUIRED) {
      return "Winterdienst erforderlich";
    } else if (effectiveStatus === WinterServiceStatus.STANDBY) {
      return "Winterdienst in Bereitschaft";
    }
    return "";
  };

  // Wenn keine relevanten Informationen vorhanden sind, nichts anzeigen
  if (effectiveStatus === WinterServiceStatus.NOT_REQUIRED) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Banner: Winterdienst-Status */}
      <div className={`p-4 rounded-lg flex items-start ${getServiceBannerStyle()}`}>
        <div className="w-6 h-6 mr-3 mt-1 flex-shrink-0">
          <Image 
            src="/images/weather-icons/76.svg" // Schneeflocken-Icon für Winterdienst
            alt="Winterdienst"
            width={24}
            height={24}
          />
        </div>
        <div className="flex-grow">
          <div className="font-medium">
            {getStatusMessage()}
          </div>
          <div className="text-sm mt-1">
            {effectiveStatus === WinterServiceStatus.REQUIRED 
              ? "Aufgrund der aktuellen Wetterbedingungen ist Winterdienst notwendig. Bitte sorgen Sie für geräumte und gestreute Wege." 
              : "Winterdienst sollte vorbereitet werden, da die Wetterbedingungen sich verschlechtern könnten."}
          </div>
          
          {/* Aktions-Button */}
          {onActionClick && (
            <button 
              onClick={onActionClick}
              className={variant === 'dark'
                ? 'mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors font-medium flex items-center'
                : 'mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors font-medium flex items-center'
              }
            >
              <div className="w-4 h-4 mr-2">
                <Image 
                  src="/images/weather-icons/76.svg" // Kleines Schneeflocken-Icon
                  alt=""
                  width={16}
                  height={16}
                />
              </div>
              {actionButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
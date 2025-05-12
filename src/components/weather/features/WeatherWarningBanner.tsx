"use client"

import React, { useMemo } from 'react';
import { CloudSnow, SnowflakeIcon, ThermometerSunIcon, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CurrentWeather, HourlyForecast, DailyForecast } from './weatherDataProcessors';

/**
 * Status des Winterdienstes - zentral definiert in der Banner-Komponente
 */
export enum WinterServiceStatus {
  // Kein Winterdienst nötig (≥ 4°C)
  NOT_REQUIRED = "not_required",

  // Eventuell nötig (Bereitschaft, 1-3°C oder ≤0°C ohne Schnee)
  MAYBE_REQUIRED = "maybe_required",

  // Bald erforderlich (kommende Tage ≤0°C und Schnee)
  REQUIRED_SOON = "required_soon",

  // Sofort erforderlich (aktuell ≤0°C und Schnee)
  REQUIRED_NOW = "required_now"
}

// Props für das Banner
interface WeatherWarningBannerProps {
  currentWeather: CurrentWeather;    // Aktuelle Wetterdaten
  forecastItems: HourlyForecast[];   // Stündliche Vorhersage-Daten
  onActionClick?: () => void;        // Optional: Callback für Button-Klick
  actionButtonText?: string;         // Optional: Text für den Button
  variant?: 'default' | 'dark';      // Optional: Darstellungs-Variante
  className?: string;                // Optional: Zusätzliche CSS-Klassen
}

/**
 * Bestimmt den Winterdienststatus für die aktuelle Situation und die nahe Zukunft
 */
export function determineWinterServiceStatus(
  currentWeather: CurrentWeather,
  hourlyForecasts: HourlyForecast[]
): WinterServiceStatus {
  // Aktuelle Werte für die Berechnung
  const currentTemp = currentWeather.temperature;
  const currentHumidity = currentWeather.humidity;
  const currentCondition = currentWeather.condition?.toLowerCase() || '';
  
  // Prüfen, ob es aktuell schneit
  const isSnowingNow = currentCondition.includes('snow') || currentCondition.includes('sleet');
  
  //---------- PRÜFE DIE AKTUELLEN BEDINGUNGEN (HEUTE) ----------
  
  // 1. REQUIRED_NOW: Kalt (≤0°C) UND es schneit
  if (currentTemp <= 0 && isSnowingNow) {
    return WinterServiceStatus.REQUIRED_NOW;
  }
  
  // 2. MAYBE_REQUIRED: Kalt (≤0°C) aber kein Schnee ODER
  //    Kühl (1-3°C)
  if (currentTemp <= 0 || (currentTemp > 0 && currentTemp <= 3)) {
    return WinterServiceStatus.MAYBE_REQUIRED;
  }
  
  // Zusätzliche Prüfung für erhöhtes Risiko:
  // Bei Temperaturen 1-3°C und hoher Luftfeuchtigkeit
  if (currentTemp > 0 && currentTemp <= 3 && currentHumidity > 80) {
    return WinterServiceStatus.MAYBE_REQUIRED;
  }
  
  // Prüfe die nächsten 24 Stunden (heute)
  const next24Hours = hourlyForecasts.slice(0, 24);
  for (const hour of next24Hours) {
    const hourTemp = hour.temperature;
    const hourCondition = hour.condition?.toLowerCase() || '';
    const isSnowing = hourCondition.includes('snow') || hourCondition.includes('sleet');
    
    // REQUIRED_NOW, wenn in den nächsten 24h Schnee bei ≤0°C
    if (hourTemp <= 0 && isSnowing) {
      return WinterServiceStatus.REQUIRED_NOW;
    }
    
    // MAYBE_REQUIRED, wenn in den nächsten 24h kalt oder kühl
    if (hourTemp <= 0 || (hourTemp > 0 && hourTemp <= 3)) {
      return WinterServiceStatus.MAYBE_REQUIRED;
    }
  }
  
  //---------- PRÜFE DIE ZUKÜNFTIGEN BEDINGUNGEN (AB MORGEN) ----------
  
  // Prüfe die Tage nach den ersten 24 Stunden
  const futureDays = hourlyForecasts.slice(24);
  for (const hour of futureDays) {
    const hourTemp = hour.temperature;
    const hourCondition = hour.condition?.toLowerCase() || '';
    const isSnowing = hourCondition.includes('snow') || hourCondition.includes('sleet');
    
    // REQUIRED_SOON, wenn in der Zukunft Schnee bei ≤0°C
    if (hourTemp <= 0 && isSnowing) {
      return WinterServiceStatus.REQUIRED_SOON;
    }
  }
  
  // Wenn keine der Bedingungen zutrifft: Kein Winterdienst nötig
  return WinterServiceStatus.NOT_REQUIRED;
}

/**
 * Bestimmt den Winterdienststatus für einen spezifischen Tag in der Vorhersage
 */
export function getDailyWinterServiceStatus(
  day: DailyForecast, 
  hourlyForecasts: HourlyForecast[]
): WinterServiceStatus {
  // Aktuelles Datum
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Datum des gesuchten Tages
  const dayDate = new Date(day.date);
  dayDate.setHours(0, 0, 0, 0);
  
  // Ist es der heutige Tag?
  const isToday = today.getTime() === dayDate.getTime();
  
  // Wenn es heute ist, verwende den aktuellen Status für eine konsistente Anzeige
  if (isToday) {
    // Diese Funktion wird von außen aufgerufen - der aktuelle Status wird separat berechnet
    return WinterServiceStatus.NOT_REQUIRED; // Dummy-Wert, wird nicht verwendet
  }
  
  // Nächster Tag
  const nextDay = new Date(dayDate);
  nextDay.setDate(dayDate.getDate() + 1);
  
  // Stündliche Prognosen für den spezifischen Tag filtern
  const hourlyForThisDay = hourlyForecasts.filter(hour => {
    const hourDate = new Date(hour.time);
    return hourDate >= dayDate && hourDate < nextDay;
  });
  
  // Keine Daten für diesen Tag
  if (hourlyForThisDay.length === 0) {
    return WinterServiceStatus.NOT_REQUIRED;
  }
  
  // Minimale Temperatur für diesen Tag
  const minTemp = day.minTemp;
  
  // Prüfen, ob es Schnee/Schneeregen an diesem Tag gibt
  const hasSnow = hourlyForThisDay.some(hour => {
    const condition = hour.condition?.toLowerCase() || '';
    return condition.includes('snow') || condition.includes('sleet');
  });
  
  // Prüfen, ob die Luftfeuchtigkeit hoch ist
  const hasHighHumidity = hourlyForThisDay.some(hour => hour.humidity > 80);
  
  // Gleiche Logik wie bei der Hauptfunktion
  if (minTemp <= 0 && hasSnow) {
    return WinterServiceStatus.REQUIRED_NOW; // "Erforderlich" für diesen Tag
  } else if (minTemp <= 0 || (minTemp > 0 && minTemp <= 3)) {
    return WinterServiceStatus.MAYBE_REQUIRED;
  } else if (minTemp > 0 && minTemp <= 3 && hasHighHumidity) {
    return WinterServiceStatus.MAYBE_REQUIRED;
  } else {
    return WinterServiceStatus.NOT_REQUIRED;
  }
}

/**
 * Komponente für Wetter-Warnungs-Banner
 * Zeigt Winterdienst-Warnungen basierend auf dem errechneten Status an
 */
export function WeatherWarningBanner({ 
  currentWeather,
  forecastItems,
  onActionClick,
  actionButtonText = "Jetzt handeln",
  variant = 'default',
  className = ''
}: WeatherWarningBannerProps) {
  
  // Status selbst berechnen mit useMemo für Leistungsoptimierung
  const winterServiceStatus = useMemo(() => {
    return determineWinterServiceStatus(currentWeather, forecastItems);
  }, [currentWeather, forecastItems]);
  
  // Variante für dunklen Hintergrund
  const darkVariant = variant === 'dark';
  
  // Warnungs-Variante basierend auf Status
  const getAlertClass = () => {
    switch (winterServiceStatus) {
      case WinterServiceStatus.REQUIRED_NOW:
        return darkVariant 
          ? 'bg-red-500/30 border-red-500/50 text-white' 
          : 'bg-red-50 border-red-200 text-red-800';
      case WinterServiceStatus.MAYBE_REQUIRED:
        return darkVariant 
          ? 'bg-amber-500/30 border-amber-500/50 text-white' 
          : 'bg-amber-50 border-amber-200 text-amber-800';
      case WinterServiceStatus.REQUIRED_SOON:
        return darkVariant 
          ? 'bg-blue-500/30 border-blue-500/50 text-white' 
          : 'bg-blue-50 border-blue-200 text-blue-800';
      case WinterServiceStatus.NOT_REQUIRED:
        return darkVariant 
          ? 'bg-green-500/30 border-green-500/50 text-white' 
          : 'bg-green-50 border-green-200 text-green-800';
      default:
        return '';
    }
  };
  
  // Icon basierend auf Status
  const getAlertIcon = () => {
    switch (winterServiceStatus) {
      case WinterServiceStatus.REQUIRED_NOW:
        return <CloudSnow className="h-5 w-5" />;
      case WinterServiceStatus.MAYBE_REQUIRED:
        return <AlertTriangle className="h-5 w-5" />;
      case WinterServiceStatus.REQUIRED_SOON:
        return <SnowflakeIcon className="h-5 w-5" />;
      case WinterServiceStatus.NOT_REQUIRED:
        return <ThermometerSunIcon className="h-5 w-5" />;
      default:
        return <ThermometerSunIcon className="h-5 w-5" />;
    }
  };
  
  // Titel basierend auf Status
  const getAlertTitle = () => {
    switch (winterServiceStatus) {
      case WinterServiceStatus.REQUIRED_NOW:
        return "Winterdienst erforderlich";
      case WinterServiceStatus.MAYBE_REQUIRED:
        return "Winterdienst in Bereitschaft";
      case WinterServiceStatus.REQUIRED_SOON:
        return "Winterdienst bald erforderlich";
      case WinterServiceStatus.NOT_REQUIRED:
        return "Kein Winterdienst notwendig";
      default:
        return "";
    }
  };
  
  // Beschreibung basierend auf Status
  const getAlertDescription = () => {
    switch (winterServiceStatus) {
      case WinterServiceStatus.REQUIRED_NOW:
        return `Aktuell ${Math.round(currentWeather.temperature)}°C mit ${currentWeather.conditionDE.toLowerCase()}. Sofortiger Winterdienst wird dringend empfohlen.`;
      case WinterServiceStatus.MAYBE_REQUIRED:
        if (currentWeather.temperature <= 0) {
          return `Die Temperatur liegt bei ${Math.round(currentWeather.temperature)}°C. Trotz Abwesenheit von Schnee besteht Glättegefahr.`;
        } else {
          return `Die Temperatur liegt bei ${Math.round(currentWeather.temperature)}°C. Bei ${Math.round(currentWeather.humidity)}% Luftfeuchtigkeit ist Glätte möglich.`;
        }
      case WinterServiceStatus.REQUIRED_SOON:
        return "Die Vorhersage zeigt winterliche Bedingungen in den kommenden Tagen. Bereiten Sie sich auf Winterdienst vor.";
      case WinterServiceStatus.NOT_REQUIRED:
        return `Aktuell ${Math.round(currentWeather.temperature)}°C mit ${currentWeather.conditionDE.toLowerCase()}. Winterdienst ist derzeit nicht erforderlich.`;
      default:
        return "";
    }
  };

  // Bestimmt, ob der Aktions-Button angezeigt werden soll
  const shouldShowActionButton = () => {
    return onActionClick && (
      winterServiceStatus === WinterServiceStatus.REQUIRED_NOW || 
      winterServiceStatus === WinterServiceStatus.MAYBE_REQUIRED || 
      winterServiceStatus === WinterServiceStatus.REQUIRED_SOON
    );
  };

  return (
    <Alert className={`${getAlertClass()} ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-1">
          {getAlertIcon()}
        </div>
        <div className="ml-3 flex-1">
          <AlertTitle>{getAlertTitle()}</AlertTitle>
          <AlertDescription className="mt-1">
            {getAlertDescription()}
          </AlertDescription>
          
          {/* Aktions-Button (optional) */}
          {shouldShowActionButton() && (
            <button
              onClick={onActionClick}
              className={`mt-3 w-full md:w-auto text-sm font-medium px-4 py-2 rounded 
                ${darkVariant 
                  ? 'bg-white text-gray-800 hover:bg-gray-100' 
                  : 'bg-white border border-gray-300 shadow-sm hover:bg-gray-50 text-gray-700'
                }`}
            >
              {actionButtonText}
            </button>
          )}
        </div>
      </div>
    </Alert>
  );
}

/**
 * Mini-Banner-Komponente für die Tageskarten in der Prognose
 */
export function DailyWeatherStatusIndicator({
  day,
  hourlyForecasts,
  variant = 'default'
}: {
  day: DailyForecast;
  hourlyForecasts: HourlyForecast[];
  variant?: 'default' | 'dark';
}) {
  const status = useMemo(() => {
    return getDailyWinterServiceStatus(day, hourlyForecasts);
  }, [day, hourlyForecasts]);

  // Dunkler Hintergrund?
  const darkVariant = variant === 'dark';

  // Keine Anzeige, wenn kein Winterdienst erforderlich
  if (status === WinterServiceStatus.NOT_REQUIRED) {
    return null;
  }

  // Styling für den Indikator
  const getStatusClass = () => {
    switch (status) {
      case WinterServiceStatus.REQUIRED_NOW:
        return darkVariant 
          ? 'bg-red-500/80 text-white' 
          : 'bg-red-100 text-red-800';
      case WinterServiceStatus.MAYBE_REQUIRED:
        return darkVariant 
          ? 'bg-amber-500/80 text-white' 
          : 'bg-amber-100 text-amber-800';
      case WinterServiceStatus.REQUIRED_SOON:
        return darkVariant 
          ? 'bg-blue-500/80 text-white' 
          : 'bg-blue-100 text-blue-800';
      default:
        return '';
    }
  };

  // Text für den Indikator
  const getStatusText = () => {
    switch (status) {
      case WinterServiceStatus.REQUIRED_NOW:
        return "Winterdienst";
      case WinterServiceStatus.MAYBE_REQUIRED:
        return "Bereitschaft";
      case WinterServiceStatus.REQUIRED_SOON:
        return "Winterdienst";
      default:
        return "";
    }
  };

  // Icon für den Indikator
  const getStatusIcon = () => {
    switch (status) {
      case WinterServiceStatus.REQUIRED_NOW:
        return <CloudSnow className="h-3 w-3 mr-1" />;
      case WinterServiceStatus.MAYBE_REQUIRED:
        return <AlertTriangle className="h-3 w-3 mr-1" />;
      case WinterServiceStatus.REQUIRED_SOON:
        return <SnowflakeIcon className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className={`${getStatusClass()} text-xs font-medium py-1 px-2 rounded flex items-center justify-center mt-1`}>
      {getStatusIcon()}
      <span>{getStatusText()}</span>
    </div>
  );
}
"use client";

import React, { useState, useEffect } from 'react';
import { Clock, Info, CloudSnow } from 'lucide-react';

interface WeatherSnowfallCountdownProps {
  weatherData: any;
  onActionClick?: () => void;
  className?: string;
  variant?: 'light' | 'dark';
}

export const WeatherSnowfallCountdown: React.FC<WeatherSnowfallCountdownProps> = ({ 
  weatherData, 
  onActionClick, 
  className = '', 
  variant = 'light' 
}) => {
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdownHours, setCountdownHours] = useState(0);
  const [precipProbability, setPrecipProbability] = useState(0);

  // Verarbeitet Wetterdaten und berechnet den Countdown bis zum Schneefall
  useEffect(() => {
    if (
      weatherData && 
      weatherData.notifications.snowfallPrediction &&
      weatherData.notifications.snowfallPrediction.willSnow && 
      weatherData.notifications.snowfallPrediction.startTime &&
      weatherData.notifications.snowfallPrediction.needsService
    ) {
      // Zeit bis zum Schneefall berechnen
      const snowStartTime = new Date(weatherData.notifications.snowfallPrediction.startTime);
      const now = new Date();
      const timeDiffMs = snowStartTime.getTime() - now.getTime();
      const hoursDiff = Math.max(0, Math.floor(timeDiffMs / (1000 * 60 * 60)));
      
      if (hoursDiff < 24) {
        // Finde die Wahrscheinlichkeit für den vorhergesagten Zeitpunkt
        let probability = 0;
        if (weatherData.forecast && weatherData.forecast.hourly.length > 0) {
          const relevantHour = weatherData.forecast.hourly.find(
            h => Math.abs(h.time.getTime() - snowStartTime.getTime()) < 1000 * 60 * 60
          );
          if (relevantHour) {
            probability = Math.round(weatherData.currentConditions.precipitationProbability);
          }
        }

        setShowCountdown(true);
        setCountdownHours(hoursDiff);
        setPrecipProbability(probability);
      } else {
        setShowCountdown(false);
      }
    } else {
      setShowCountdown(false);
    }
  }, [weatherData]);

  // Wenn kein Countdown gezeigt werden soll, rendere nichts
  if (!showCountdown) return null;

  // Styling-Variablen basierend auf dem Variant-Prop
  const containerBg = variant === 'dark' ? 'bg-blue-900/70 text-white border-blue-800' : 'bg-blue-100 text-blue-800 border-blue-200';
  const infoBg = variant === 'dark' ? 'bg-blue-800/50 text-blue-100' : 'bg-white/50 text-gray-600';
  const buttonBg = variant === 'dark' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className={`p-4 rounded-lg mb-4 border ${containerBg} ${className}`}>
      <div className="flex items-start">
        <Clock className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
        <div>
          <span className="font-bold">
            Schneefall wird voraussichtlich in etwa {countdownHours} {countdownHours === 1 ? 'Stunde' : 'Stunden'} erwartet
            {precipProbability > 0 && ` (${precipProbability}% Wahrscheinlichkeit)`}
          </span>
          
          <span className="block text-sm mt-1">
            Bei einsetzendem Schneefall kann eine Räumpflicht entstehen. 
            Prüfen Sie die gesetzlichen Bestimmungen für Ihre Region.
          </span>
          
          <div className={`flex items-center mt-2 text-xs p-2 rounded ${infoBg}`}>
            <Info className="w-3 h-3 mr-1 flex-shrink-0" />
            <span>
              Wettervorhersagen können abweichen. Die Genauigkeit nimmt mit zeitlichem Abstand ab.
            </span>
          </div>
          
          {onActionClick && (
            <button 
              onClick={onActionClick}
              className={`mt-3 ${buttonBg} text-white px-3 py-1.5 rounded text-sm transition-colors flex items-center`}
            >
              <CloudSnow className="w-3 h-3 mr-2" />
              Winterdienst vorsorglich anfragen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
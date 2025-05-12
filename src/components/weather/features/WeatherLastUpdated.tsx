"use client";

import React from 'react';
import { RefreshCw, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { useWeather } from './WeatherContext';

// Die Funktion direkt in die Komponenten-Datei integrieren
function formatTimeAgo(date: Date | null): string {
  if (!date) return '';
  
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // Differenz in Minuten
  
  if (diff < 1) return 'gerade eben';
  if (diff < 60) return `vor ${diff} ${diff === 1 ? 'Minute' : 'Minuten'}`;
  
  const hours = Math.floor(diff / 60);
  if (hours < 24) return `vor ${hours} ${hours === 1 ? 'Stunde' : 'Stunden'}`;
  
  const days = Math.floor(hours / 24);
  return `vor ${days} ${days === 1 ? 'Tag' : 'Tagen'}`;
}

interface WeatherLastUpdatedProps {
  lastUpdated?: Date | null; // Optional, wird aus dem Context genommen, wenn nicht angegeben
  onRefresh?: () => void; // Optional, wird aus dem Context genommen, wenn nicht angegeben
  className?: string;
  variant?: 'light' | 'dark' | 'header';
  useTimeAgo?: boolean;
  showIcon?: boolean;
  iconSize?: number;
  format?: string;
  showPrefix?: boolean;
}

/**
 * Komponente zur Anzeige des letzten Aktualisierungszeitpunkts der Wetterdaten
 * mit optionalem Refresh-Button
 */
export const WeatherLastUpdated: React.FC<WeatherLastUpdatedProps> = ({
  lastUpdated: externalLastUpdated,
  onRefresh: externalOnRefresh,
  className = '',
  variant = 'light',
  useTimeAgo = false,
  showIcon = false,
  iconSize = 3.5,
  format: dateFormat = 'HH:mm:ss',
  showPrefix = true
}) => {
  // Hole Daten aus dem Context, falls keine explizit übergeben wurden
  const { lastUpdated: contextLastUpdated, getRefreshHandler } = useWeather();
  
  // Verwende entweder die explizit übergebenen Werte oder die aus dem Context
  const lastUpdated = externalLastUpdated || contextLastUpdated;
  const onRefresh = externalOnRefresh || getRefreshHandler();

  if (!lastUpdated) return null;

  // Styling basierend auf Variante (hell/dunkel/header)
  let textColor = '';
  if (variant === 'dark') {
    textColor = 'text-white/70';
  } else if (variant === 'light') {
    textColor = 'text-gray-500';
  } else if (variant === 'header') {
    textColor = 'text-slate-500';
  }
  
  const hoverColor = variant === 'dark' ? 'hover:text-white' : 'hover:text-gray-700';

  // Zeit formatieren basierend auf Einstellung
  const formattedTime = useTimeAgo 
    ? formatTimeAgo(lastUpdated)
    : format(lastUpdated, dateFormat, { locale: de });

  return (
    <div className={`flex items-center ${textColor} text-sm ${className}`}>
      {showIcon && iconSize > 0 && <Clock className={`w-${iconSize} h-${iconSize} mr-1`} />}
      <span>
        {showPrefix && (useTimeAgo ? '' : 'Aktualisiert: ')}{formattedTime}
      </span>
      {onRefresh && (
        <button
          onClick={onRefresh}
          className={`ml-2 p-1 rounded-full ${hoverColor} transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50`}
          title="Aktualisieren"
          aria-label="Wetterdaten aktualisieren"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
"use client";

import React from 'react';
import { RefreshCw } from 'lucide-react';
import { formatTimeAgo } from './timeUtils';

interface WeatherLastUpdatedProps {
  lastUpdated: Date | null;
  onRefresh?: () => void;
  className?: string;
  variant?: 'light' | 'dark';
}

/**
 * Komponente zur Anzeige des letzten Aktualisierungszeitpunkts der Wetterdaten
 * mit optionalem Refresh-Button
 */
export const WeatherLastUpdated: React.FC<WeatherLastUpdatedProps> = ({
  lastUpdated,
  onRefresh,
  className = '',
  variant = 'light'
}) => {
  if (!lastUpdated) return null;

  // Styling basierend auf Variante (hell/dunkel)
  const textColor = variant === 'dark' ? 'text-white/70' : 'text-gray-500';
  const hoverColor = variant === 'dark' ? 'hover:text-white' : 'hover:text-gray-700';

  return (
    <div className={`flex items-center ${textColor} text-sm ${className}`}>
      <span>Aktualisiert {formatTimeAgo(lastUpdated)}</span>
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
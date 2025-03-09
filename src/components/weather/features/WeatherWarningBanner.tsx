"use client";

import React from 'react';
import { AlertTriangle, CloudSnow } from 'lucide-react';
import { WinterServiceStatus } from './utils';
import { DWDWarning } from './dwd-warnings';

// Typen für die Props der Komponente
export interface WeatherWarningBannerProps {
  iceRiskDescription: string;
  winterServiceStatus: WinterServiceStatus;  // Status bestimmt die Anzeige und Dringlichkeit
  dwdWarning?: DWDWarning | null;  // Offizielle DWD-Warnung, wenn vorhanden
  onActionClick?: () => void;
  actionButtonText?: string;
  variant?: 'light' | 'dark';      // Für unterschiedliche Stile (hell/dunkel)
  className?: string;
}

/**
 * Eine wiederverwendbare Komponente für Wetterwarnungen/Winterdienst-Hinweise
 * Zeigt farblich abgestufte Warnungen basierend auf dem Winterdienststatus an
 * Priorisiert offizielle DWD-Warnungen, wenn vorhanden
 */
export const WeatherWarningBanner: React.FC<WeatherWarningBannerProps> = ({
  iceRiskDescription, 
  winterServiceStatus,
  dwdWarning,
  onActionClick,
  actionButtonText = "Jetzt Winterdienst anfordern",
  variant = 'light',
  className = '',
}) => {
  // Keine Anzeige wenn Winterdienst nicht nötig
  if (winterServiceStatus === WinterServiceStatus.NOT_REQUIRED) {
    return null;
  }
  
  // Rot für "erforderlich", Gelb für "Bereitschaft"
  const isDanger = winterServiceStatus === WinterServiceStatus.REQUIRED;
  
  // Styling basierend auf Status und Variante
  const getBannerStyle = () => {
    if (variant === 'dark') {
      return isDanger
        ? 'bg-red-900/70 text-white border border-red-800/60' 
        : 'bg-amber-800/70 text-white border border-amber-700/60';
    } else {
      return isDanger
        ? 'bg-red-100 text-red-800 border border-red-200' 
        : 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    }
  };
  
  // Warntext basierend auf Status und DWD-Warnung
  const getWarningText = () => {
    // Wenn eine DWD-Warnung vorliegt, deren Überschrift anzeigen
    if (dwdWarning) {
      return `${dwdWarning.headline || 'DWD-Warnung'}`;
    }
    
    // Ansonsten standardmäßigen Warntext anzeigen
    return isDanger
      ? 'Winterdienst erforderlich!' 
      : 'Winterdienst in Bereitschaft';
  };
  
  // Beschreibungstext (priorisiere DWD-Beschreibung)
  const getDescription = () => {
    if (dwdWarning && dwdWarning.description) {
      return (
        <>
          <div>{dwdWarning.description}</div>
          {dwdWarning.instruction && (
            <div className="mt-1 font-medium">{dwdWarning.instruction}</div>
          )}
          <div className="mt-1 text-xs opacity-80">
            <span className="font-medium">Quelle:</span> Deutscher Wetterdienst
          </div>
        </>
      );
    }
    
    return iceRiskDescription;
  };
  
  // Button-Styling basierend auf Variante
  const buttonStyle = variant === 'dark'
    ? 'mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors font-medium flex items-center'
    : 'mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors font-medium flex items-center';
    
  return (
    <div className={`p-4 rounded-lg mb-4 flex items-start ${getBannerStyle()} ${className}`}>
      <AlertTriangle className="w-5 h-5 mr-3 mt-1 flex-shrink-0" />
      <div className="flex-grow">
        <div className="font-medium">
          {getWarningText()}
        </div>
        <div className="text-sm mt-1">
          {getDescription()}
        </div>
        
        {/* Aktions-Button - nur anzeigen wenn Handler übergeben wurde */}
        {onActionClick && (
          <button 
            onClick={onActionClick}
            className={buttonStyle}
          >
            <CloudSnow className="w-4 h-4 mr-2" />
            {actionButtonText}
          </button>
        )}
      </div>
    </div>
  );
};
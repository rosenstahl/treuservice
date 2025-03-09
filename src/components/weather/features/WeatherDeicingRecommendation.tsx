"use client";

import React from 'react';
import { IceRiskLevel, getDeicingRecommendation } from './deicingRecommendation';
import { BrushSquare } from 'lucide-react';

interface WeatherDeicingRecommendationProps {
  iceRisk: {
    risk: IceRiskLevel;
    description: string;
  };
  className?: string;
  variant?: 'light' | 'dark';
  showTitle?: boolean;
  showDescription?: boolean;
  compact?: boolean;
}

/**
 * Komponente zur Anzeige von Streumittel-Empfehlungen basierend auf Glätterisiko
 */
export const WeatherDeicingRecommendation: React.FC<WeatherDeicingRecommendationProps> = ({
  iceRisk,
  className = '',
  variant = 'light',
  showTitle = true,
  showDescription = true,
  compact = false
}) => {
  // Empfehlung basierend auf dem Risiko generieren
  const recommendation = getDeicingRecommendation(iceRisk.risk);
  
  // Styling-Variablen basierend auf dem Variant-Prop
  const textBase = variant === 'dark' ? 'text-white' : 'text-gray-700';
  const textAccent = variant === 'dark' ? 'text-white/70' : 'text-gray-500';
  const iconColor = variant === 'dark' ? 'text-accent' : 'text-accent';
  const borderColor = variant === 'dark' ? 'border-white/10' : 'border-gray-100';
  
  if (compact) {
    // Kompakte Ansicht (für kleinere Spaces)
    return (
      <div className={`flex items-center ${textBase} ${className}`}>
        <BrushSquare className={`${iconColor} w-5 h-5 mr-2 flex-shrink-0`} />
        <div>
          <span className="font-medium">Streumittel: </span>
          <span>Salz {recommendation.salt}kg, Granulat {recommendation.granulate}kg pro 100m²</span>
        </div>
      </div>
    );
  }
  
  // Standardansicht
  return (
    <div className={`${className}`}>
      {showTitle && (
        <div className={`font-medium mb-2 ${textBase}`}>Streumittel-Empfehlung:</div>
      )}
      
      {showDescription && (
        <div className={`text-sm mb-2 ${textAccent}`}>
          {iceRisk.description}
        </div>
      )}
      
      <div className={`p-3 border rounded-lg ${borderColor} ${textBase} text-sm`}>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col items-center">
            <span className="font-medium mb-1">Salz</span>
            <span className="text-xl font-bold">{recommendation.salt} kg</span>
            <span className="text-xs mt-1">pro 100m²</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="font-medium mb-1">Granulat/Splitt</span>
            <span className="text-xl font-bold">{recommendation.granulate} kg</span>
            <span className="text-xs mt-1">pro 100m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};
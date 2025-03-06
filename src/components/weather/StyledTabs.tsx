"use client";

import React from 'react';

interface TabOption {
  value: string;
  label: string;
}

interface StyledTabsProps {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const StyledTabs: React.FC<StyledTabsProps> = ({
  options,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex rounded-md border border-gray-200 bg-gray-50 p-1 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          className={`flex-1 rounded-sm py-1.5 text-sm font-medium transition-all ${
            value === option.value
              ? 'bg-white text-primary shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
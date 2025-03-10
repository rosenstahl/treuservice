"use client"

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ProcessStep {
  title: string;
  description: string;
}

interface ProcessSectionProps {
  title: string;
  description?: string;
  steps: ProcessStep[];
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

/**
 * ProcessSection - A component to display a step-by-step process flow
 * Designed to be consistent across all service pages
 */
export function ProcessSection({
  title,
  description,
  steps,
  ctaText,
  onCtaClick,
  className
}: ProcessSectionProps) {
  return (
    <div className={cn("py-8", className)}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {description && (
          <p className="text-foreground/80 max-w-3xl mx-auto">
            {description}
          </p>
        )}
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-0.5 bg-accent/30 z-0 hidden md:block"></div>
          <div className="space-y-10">
            {steps.map((step, index) => (
              <div key={`step-${index}`} className="relative z-10">
                <ProcessStepItem 
                  number={index + 1}
                  title={step.title}
                  description={step.description}
                />
              </div>
            ))}
          </div>
        </div>
        
        {ctaText && onCtaClick && (
          <div className="text-center mt-12">
            <button 
              onClick={onCtaClick}
              className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-all duration-200 inline-flex items-center gap-2"
            >
              {ctaText}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const ProcessStepItem = ({ 
  number, 
  title, 
  description 
}: { 
  number: number; 
  title: string; 
  description: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-1">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  </div>
);

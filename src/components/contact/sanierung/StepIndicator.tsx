import React from 'react'

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const stepLabels = [
    'Schadensart',
    'Objekt & Fläche',
    'Details',
    'Adresse',
    'Kontakt',
    'Zusammenfassung'
  ]

  return (
    <div className="flex justify-between items-center w-full">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep
        
        return (
          <React.Fragment key={index}>
            {/* Verbindungslinie zwischen den Schritten */}
            {index > 0 && (
              <div 
                className={`flex-1 h-1 ${
                  isCompleted ? 'bg-accent' : 'bg-gray-200'
                }`}
              />
            )}
            
            {/* Schritt-Indikator */}
            <div className="flex flex-col items-center">
              <div 
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isActive 
                    ? 'bg-accent text-white' 
                    : isCompleted 
                      ? 'bg-accent text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {stepNumber}
              </div>
              <span 
                className={`mt-2 text-xs ${
                  isActive || isCompleted ? 'text-accent font-medium' : 'text-gray-500'
                } hidden sm:inline-block text-center max-w-[80px]`}
              >
                {stepLabels[index]}
              </span>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
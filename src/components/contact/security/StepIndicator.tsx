import React from 'react'

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)
  
  return (
    <div className="flex items-center justify-between">
      <div className="hidden sm:flex w-full">
        {steps.map((step) => {
          const isActive = step === currentStep
          const isCompleted = step < currentStep
          
          return (
            <React.Fragment key={step}>
              {/* Step Circle */}
              <div className="relative flex items-center justify-center">
                <div 
                  className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${isCompleted ? 'bg-accent text-white' : isActive ? 'bg-accent-light text-accent border-2 border-accent' : 'bg-gray-100 text-gray-500'}`}
                >
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : step}
                </div>
                {isActive && (
                  <div className="absolute -bottom-6 whitespace-nowrap text-xs font-medium text-accent">
                    Schritt {step}
                  </div>
                )}
              </div>
              
              {/* Connector Line */}
              {step < totalSteps && (
                <div className="flex-1 mx-2">
                  <div 
                    className={`h-1 transition-colors ${step < currentStep ? 'bg-accent' : 'bg-gray-200'}`}
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
      
      {/* Mobile View - Simplified Indicator */}
      <div className="sm:hidden w-full">
        <div className="text-sm text-center font-medium">
          Schritt {currentStep} von {totalSteps}
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-accent h-2.5 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
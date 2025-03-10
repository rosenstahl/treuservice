import React from 'react'
import { motion } from 'framer-motion'

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4 max-w-3xl mx-auto overflow-x-auto py-2 px-1">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isPast = stepNumber < currentStep
        
        return (
          <React.Fragment key={stepNumber}>
            <div className="flex flex-col items-center">
              {/* Kreis mit Nummer */}
              <motion.div 
                className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all ${
                  isActive 
                    ? 'bg-accent text-white font-medium shadow-sm' 
                    : isPast 
                      ? 'bg-accent/80 text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive 
                    ? '#009FD8' // accent 
                    : isPast 
                      ? 'rgba(0, 159, 216, 0.8)'  // accent/80
                      : '#e5e7eb' // gray-200
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
              >
                {isPast ? (
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </motion.svg>
                ) : (
                  <span className="text-sm sm:text-base">{stepNumber}</span>
                )}
              </motion.div>
              
              {/* Step-Label für alle Bildschirme */}
              <motion.span 
                className={`text-xs sm:text-sm mt-2 whitespace-nowrap ${
                  isActive ? 'text-accent font-medium' : 
                  isPast ? 'text-accent/80' : 'text-gray-500'
                }`}
                animate={{
                  color: isActive ? '#009FD8' : isPast ? 'rgba(0, 159, 216, 0.8)' : '#6b7280'
                }}
                transition={{ duration: 0.3 }}
              >
                {getStepLabel(stepNumber)}
              </motion.span>
            </div>
            
            {stepNumber < totalSteps && (
              <motion.div 
                className="h-0.5 w-8 sm:w-12 mt-5 sm:mt-5"
                initial={false}
                animate={{
                  backgroundColor: isPast ? '#009FD8' : '#e5e7eb'
                }}
                transition={{ duration: 0.4 }}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

function getStepLabel(step: number): string {
  switch (step) {
    case 1:
      return 'Adresse';
    case 2:
      return 'Fläche';
    case 3:
      return 'Paket';
    case 4:
      return 'Optionen';
    case 5:
      return 'Übersicht';
    default:
      return '';
  }
}
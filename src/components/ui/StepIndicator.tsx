import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: string[];
  currentStep: number; // 0-indexed
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-10">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-0 right-0 h-px bg-navy-mid z-0" />
        <div
          className="absolute top-5 left-0 h-px bg-gold z-0 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={index} className="flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gold border-gold text-navy'
                    : isActive
                    ? 'border-gold text-gold bg-navy'
                    : 'border-navy-mid text-muted bg-navy'
                }`}
              >
                {isCompleted ? <Check size={16} /> : index + 1}
              </div>
              <span
                className={`mt-2 text-xs font-sans uppercase tracking-wide hidden sm:block ${
                  isActive ? 'text-gold' : isCompleted ? 'text-gold/70' : 'text-muted'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;

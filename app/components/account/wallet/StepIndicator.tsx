// components/StepsIndicator.tsx
import React from 'react';

interface StepsIndicatorProps {
  currentStep: number;
}

const StepsIndicator: React.FC<StepsIndicatorProps> = ({ currentStep }) => {
  const steps = ['Setting Up', 'Verification', 'Add Funds'];

  return (
    <div className='flex h-fit items-start justify-center'>
      {steps.map((step, index) => (
        <div key={index} className='flex items-center'>
          <div
            className={`flex h-[20.96px] w-[20.96px] items-center justify-center rounded-full font-clashmd text-[7.62px] lg:h-8 lg:w-8 lg:text-base ${
              currentStep >= index + 1
                ? 'bg-primary text-white'
                : 'bg-[#D9D9D9] text-black'
            }`}
          >
            {currentStep > index + 1 ? '✓' : index + 1}
          </div>
          <span
            className={`ml-2 text-[10px] text-black lg:font-clashmd lg:text-sm`}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div className='mx-3 h-[0.48px] w-[17.15px] bg-black lg:mx-6 lg:h-[1px] lg:w-9'></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepsIndicator;

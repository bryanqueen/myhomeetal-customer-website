'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '../Button';

const steps: string[] = [
  'Linking User Information',
  'Checking Email Address',
  'Checking Bank Verification Code',
  'Checking Phone Number',
];

const Verification: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepsCompleted, setStepsCompleted] = useState(false);

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      const completionTimer = setTimeout(() => {
        setStepsCompleted(true);
      }, 1000); // Delay before marking steps as completed

      return () => clearTimeout(completionTimer);
    }
  }, [currentStep]);

  return (
    <div>
      {stepsCompleted ? (
        <div>
          <div className='mx-auto grid max-w-[463px] gap-10'>
            <Image
              src='/images/success2.svg'
              width={75}
              height={75}
              alt='success icon'
              className='mx-auto'
            />

            <div>
              <h2 className='mx-auto max-w-[50%] mb-2 lg:max-w-[377px] text-center font-clashmd text-base lg:text-[25px] lg:leading-[30.75px]'>
                Your details have been successfully verified!
              </h2>
              <p className='mx-auto max-w-[80%] lg:max-w-[404px] text-center text-xs lg:text-base lg:leading-[19.68px]'>
                Congratulations! We have successfully verified the information
                you provided. Your wallet is now ready for use.
              </p>
            </div>

            <Button
              linkType='rel'
              href={`/account/my-wallet?fund=${'account'}`}
              className='h-[56px] w-full rounded-full border-0 font-clashmd text-base shadow-none'
            >
              Navigate to wallet page
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className='mb-4 font-clashmd text-base lg:text-[25px]'>
            Verifying Your Details
          </h2>
          <p className='mb-8 text-xs max-w-[80%] lg:max-w-[494px] lg:text-base lg:leading-[19.68px]'>
            We are currently verifying the data you submitted to ensure
            everything is accurate and up to date. This process might take a few
            moments.
          </p>
          <div className='grid gap-3'>
            {steps.map((step, index) => (
              <div key={index} className='flex items-center gap-5'>
                <p className='font-clashmd text-xs lg:text-sm'>{step}</p>
                <div className='flex items-center'>
                  <div className={`loader`}>
                    {currentStep > index ? (
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='#1B691B'
                        className='size-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                        />
                      </svg>
                    ) : (
                      <div className='spinner'></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Verification;

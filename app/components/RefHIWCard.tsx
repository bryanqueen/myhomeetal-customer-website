import Image from 'next/image';
import React from 'react';

const steps = [
  {
    stepNumber: 1,
    title: 'Get Your Unique Referral Link:',
    description:
      'Sign up or log in to your account, then navigate to the "Referral Program" section to generate your unique referral link.',
    imageSrc: '/images/mobref2.svg',
  },
  {
    stepNumber: 2,
    title: 'Share Your Link:',
    description:
      'Share your referral link with friends and family via social media, email, or direct messaging.',
    imageSrc: '/images/mobref3.svg',
  },
  {
    stepNumber: 3,
    title: 'Friends Sign Up and Shop:',
    description:
      "When your friends click your link, they'll be directed to sign up and shop on our website for the bonus to be activated.",
    imageSrc: '/images/mobref4.svg',
  },
  {
    stepNumber: 4,
    title: 'Earn Rewards:',
    description:
      "Once your referred friends make their first purchase, you'll earn a reward. The more they shop, the more you earn!",
    imageSrc: '/images/mobref5.svg',
  },
];

const ReferralSteps: React.FC = () => {
  return (
    <div className='mx-[3%] grid gap-7 lg:gap-4 lg:mx-0 lg:grid-cols-4 2xl:gap-10'>
      {steps.map((step) => (
        <div
          key={step.stepNumber}
          className='relative w-full rounded-3xl bg-[#FFF1F1] px-5 py-9 pt-20 lg:max-w-[322px] 2xl:max-w-full'
        >
          <div className='absolute left-4 top-4 rounded-full bg-primaryBg px-4 py-2 font-clashmd text-xs text-white'>
            <span>Step {step.stepNumber}</span>
          </div>

          <Image
            src={step.imageSrc}
            alt={step.title}
            width={159}
            height={159}
            loading='lazy'
            className='mx-auto mb-4'
          />
          <h3 className='mb-4 max-w-[274px] font-clashmd text-base leading-[29.52px] text-myGray lg:text-2xl'>
            {step.title}
          </h3>
          <p className='text-center text-xs leading-[14.76px] text-[#525252] lg:max-w-[274px] lg:text-start lg:text-base lg:leading-[19.09px]'>
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReferralSteps;

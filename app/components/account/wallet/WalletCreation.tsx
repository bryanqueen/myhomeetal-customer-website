import cn from 'classnames';

import CollectWalletInfo from '@components/account/wallet/CollectWalletInfo';

const WalletCreation = () => {
  return (
    <>
      <div className='flex flex-col gap-5 xl:flex-row'>
        <div className='grid shrink-0 gap-3'>
          <h1 className='text-3xl font-medium'>My Wallet</h1>
          <span className='text-gray-500'>Lets setup your wallet</span>
        </div>
        <div className='flex w-full items-center justify-center gap-5'>
          <StepIndicator step={1} label='Setting Up' active={true} />
          <hr className='hidden w-20 border-gray-800 md:block' />
          <StepIndicator step={2} label='Verification' />
          <hr className='hidden w-20 border-gray-800 md:block' />
          <StepIndicator step={3} label='Add Funds' />
        </div>
      </div>
      <CollectWalletInfo />
    </>
  );
};

const StepIndicator = ({
  step,
  label,
  active = false,
}: {
  step: number;
  label: string;
  active?: boolean;
}) => {
  return (
    <div className='flex items-center gap-3'>
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full text-white md:h-12 md:w-12',
          { 'bg-primary': active, 'bg-primary/30': !active }
        )}
      >
        {step}
      </div>
      <span className='text-xs md:text-lg'>{label}</span>
    </div>
  );
};

export default WalletCreation;

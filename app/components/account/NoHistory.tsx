import { ShoppingCart } from 'iconsax-react';

import Button from '@components/Button';
import { ReactNode } from 'react';
import Link from 'next/link';

const NoHistory = ({
  title = 'No Purchase History Yet',
  buttonText = 'Start Shopping Now',
  bodyText = "Looks like you haven't made any purchases with us so far. Ready tostart your shopping journey? Dive into our collection and discoverproducts tailored just for you.",
  icon = <ShoppingCart size={24} variant='Bulk' color='white' />,
  onButtonClick,
  extraText,
}: {
  title?: string;
  buttonText?: string;
  bodyText?: string;
  extraText?: string;
  icon?: ReactNode;
  onButtonClick?: () => void;
}) => {
  return (
    <div className='m-auto grid max-w-xs justify-items-center gap-3 lg:max-w-[420px] lg:gap-6'>
      <div className='h-16 w-16 rounded-full bg-[#FFC5C6]' />
      <p className='text-center font-clashmd text-lg text-myGray lg:text-2xl'>
        {title}
      </p>
      <p className='w-[80%] text-center text-xs text-myGray lg:w-full lg:text-sm'>
        {bodyText}
      </p>
      {onButtonClick ? (
        <Button
          icon={icon}
          onClick={onButtonClick}
          className='mt-4 h-[50px] w-full rounded-[8px] border-0 text-sm text-white shadow-none lg:mt-2 lg:rounded-[10px] lg:text-base'
        >
          <span>{buttonText}</span>
        </Button>
      ) : (
        <Button
          linkType='rel'
          href='/'
          icon={icon}
          className='mt-4 h-[50px] w-full rounded-[8px] border-0 text-sm text-white shadow-none lg:mt-2 lg:rounded-[10px] lg:text-base'
        >
          <span>{buttonText}</span>
        </Button>
      )}
      <Link href='/' className='text-center font-clashmd text-xs'>
        {extraText}
      </Link>
    </div>
  );
};

export default NoHistory;

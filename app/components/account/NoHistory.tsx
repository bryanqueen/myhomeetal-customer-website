import { ShoppingCart } from 'iconsax-react';

import Button from '@components/Button';

const NoHistory = ({
  title = 'No Purchase History Yet',
}: {
  title?: string;
}) => {
  return (
    <div className='m-auto grid max-w-xs justify-items-center gap-3 lg:gap-6'>
      <div className='h-16 w-16 rounded-full bg-[#FFC5C6]' />
      <p className='font-clashmd text-lg text-center text-myGray lg:text-2xl'>{title}</p>
      <p className='text-center w-[80%] lg:w-full text-xs text-myGray lg:text-sm'>
        Looks like you haven't made any purchases with us so far. Ready to start
        your shopping journey? Dive into our collection and discover products
        tailored just for you.
      </p>
      <Button
        linkType='rel'
        href='/'
        icon={<ShoppingCart size={24} variant='Bulk' color='white' />}
        className='h-[50px] w-full rounded-[20px] lg:rounded-[10px] mt-3 lg:mt-2 text-sm text-white lg:text-base'
      >
        <span>Start Shopping Now</span>
      </Button>
    </div>
  );
};

export default NoHistory;

import { ShoppingCart } from 'iconsax-react';

import Button from '@components/Button';

const NoHistory = ({
  title = 'No Purchase History Yet',
}: {
  title?: string;
}) => {
  return (
    <div className='m-auto grid max-w-xs justify-items-center gap-3'>
      <div className='h-16 w-16 rounded-full bg-primary/30' />
      <p className='text-2xl font-medium'>{title}</p>
      <p className='mb-5 text-center text-sm'>
        Looks like you haven&apos;t made any purchases with us so far. Ready to
        start your shopping journey? Dive into our collection and discover
        products tailored just for you.
      </p>
      <Button className='min-w-fit gap-3'>
        <ShoppingCart variant='Bulk' />
        Start Shopping Now
      </Button>
    </div>
  );
};

export default NoHistory;

'use client';

import cn from 'classnames';
import { signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

import Button from '@components/Button';
import ProductListCard from '@components/cards/ProductListCard';
import ProductGridCard from '@components/cards/ProductGridCard';

const isList = signal(false);

const ListGridSwitch = () => {
  useSignals();

  return (
    <div
      className={cn({
        'grid grid-cols-2 gap-5 lg:max-w-5xl xl:grid-cols-3': !isList.value,
      })}
    >
      {/*[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) =>
        isList.value ? <ProductListCard key={i} /> : <ProductGridCard key={i} />
      )*/}
    </div>
  );
};

export const ListGridSwitchControls = () => {
  useSignals();

  return (
    <div
      className={cn('hidden items-center justify-end gap-2 md:flex', {
        'text-primary': isList.value === true,
        'text-gray-500': isList.value === false,
      })}
    >
      <Button
        className='text-inherit'
        variant='ghost'
        fit
        onClick={() => (isList.value = false)}
      >
        <GridIcon isActive={isList.value === false} />
      </Button>
      <Button
        className='text-inherit'
        variant='ghost'
        fit
        onClick={() => (isList.value = true)}
      >
        <ListIcon isActive={isList.value === true} />
      </Button>
    </div>
  );
};

const GridIcon = ({ isActive }: { isActive?: boolean }) => {
  const color = isActive ? 'black' : 'lightgray';

  return (
    <svg width='20' height='25' viewBox='0 0 25 25' fill='none'>
      <rect width='10' height='10' fill={color} />
      <rect x='15' width='10' height='10' fill={color} />
      <rect y='15' width='10' height='10' fill={color} />
      <rect x='15' y='15' width='10' height='10' fill={color} />
    </svg>
  );
};

const ListIcon = ({ isActive }: { isActive?: boolean }) => {
  const color = isActive ? 'black' : 'lightgray';

  return (
    <svg
      width='20'
      height='24'
      viewBox='0 0 26 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='4' height='4' fill={color} />
      <rect x='6' width='20' height='4' fill={color} />
      <rect y='10' width='4' height='4' fill={color} />
      <rect x='6' y='10' width='20' height='4' fill={color} />
      <rect y='20' width='4' height='4' fill={color} />
      <rect x='6' y='20' width='20' height='4' fill={color} />
    </svg>
  );
};

export default ListGridSwitch;

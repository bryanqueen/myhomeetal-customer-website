'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRegion } from '../RegionProvider';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { useNav } from '../providers';

const regions = [
  { name: 'NG', flagSrc: '/images/flags/NG.png' },
  { name: 'US', flagSrc: '/images/flags/US.png' },
  { name: 'UK', flagSrc: '/images/flags/GB.png' },
];

const CustomDropdown = () => {
  const { setActiveNav } = useNav();
  const { region, setRegion } = useRegion();
  const [isOpen, setIsOpen] = useState(false);

  const getFlagSrc = (region: string) => {
    switch (region) {
      case 'NG':
        return '/images/flags/NG.png';
      case 'US':
        return '/images/flags/US.png';
      case 'UK':
        return '/images/flags/GB.png';
      default:
        return '/images/flags/default.png';
    }
  };

  return (
    <div className='relative inline-block w-full px-[3%] py-5'>
      <button
        className='flex h-[50px] w-full items-center justify-between gap-5 rounded-lg bg-white px-5 font-clashmd text-sm leading-none text-[#656565] no-underline outline-none transition-colors hover:bg-gray-50'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className='flex gap-3 items-center'>
          <Image
            src={getFlagSrc(region)}
            alt='flag'
            width={20}
            height={15}
            className='mr-2 h-[15px]'
          />
          Region
        </div>

        <ChevronDownIcon width={16} />
      </button>
      {isOpen && (
        <ul className='absolute mt-2 w-full rounded-md border bg-white shadow-lg'>
          {regions.map((regionItem) => (
            <li
              key={regionItem.name}
              className='flex h-[37px] cursor-pointer items-center px-4 py-2 text-sm text-[#656565] hover:text-[#8B1A1A]'
              onClick={() => {
                setRegion(regionItem.name);
                setIsOpen(false);
                setActiveNav(null);
              }}
            >
              <Image
                src={regionItem.flagSrc}
                alt='flag'
                width={20}
                height={15}
                className='mr-2 h-[15px]'
              />
              {regionItem.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;

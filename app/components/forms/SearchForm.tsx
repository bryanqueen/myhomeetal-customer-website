'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { ArrowRight } from 'iconsax-react';
import { useRouter } from 'next/navigation';

import Input from '@components/Input';
import Button from '@components/Button';
import { ROUTES } from '@utils/routes';
import useQueryParams from '@components/hooks/useQueryParams';
import { useDropdownContext } from '@/app/providers';

const SearchForm = () => {
  const id = 'search-dropdown';
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const { handleParamChange, searchParams } = useQueryParams();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { openDropdown, handleDropdownToggle } = useDropdownContext();
  const dropdown = openDropdown === id;

  const dropdownRootClassName = cn(
    'absolute top-16 min-w-64 overflow-hidden rounded-3xl bg-white p-5 shadow',
    {
      block: dropdown === true,
      hidden: dropdown === false,
    }
  );

  useEffect(() => {
    if (inputRef.current && !dropdown) {
      inputRef.current.blur();
    }
  }, [dropdown]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search');

    router.push(`${ROUTES.SEARCH}?q=${searchQuery}`);
    // setDropdown(false);
    handleDropdownToggle(id, false);
  };

  return (
    <div className='relative'>
      <form className='relative w-full min-w-[18rem]' onSubmit={handleSearch}>
        <Input
          name='search'
          type='text'
          placeholder='What can we help you find?'
          variant='outline'
          inputClassName='rounded-full border-[#BDBDBD] py-3 placeholder:text-[#BDBDBD] placeholder:text-sm px-5'
          // onFocus={() => setDropdown(true)}
          // onBlur={() => setDropdown(false)}
          onFocus={() => handleDropdownToggle(id, true)}
          onBlur={() => handleDropdownToggle(id, false)}
          defaultValue={searchParams.get('q') || ''}
          ref={inputRef}
        />
        <Button
          className='absolute right-5 top-1/2 -translate-y-1/2'
          fit
          variant='ghost'
        >
          <Image
            className=''
            src='/icons/search.svg'
            alt='Search'
            width={18}
            height={20}
          />
        </Button>
      </form>
      {/**
       * 
       * <div className={`w-full ${dropdownRootClassName}`} ref={dropdownRef}>
        <div className='mb-5'>
          <p className='mb-3 font-medium'>Top Search</p>
          <div className='grid grid-cols-4 gap-3'>
            <div className='h-24 rounded-lg bg-gray-100' />
            <div className='h-24 rounded-lg bg-gray-100' />
            <div className='h-24 rounded-lg bg-gray-100' />
            <div className='h-24 rounded-lg bg-gray-100' />
          </div>
        </div>
        <div className='mb-5'>
          <p className='mb-3 font-medium'>Trending Search</p>
          <div className='grid grid-cols-2 gap-3 text-gray-700'>
            <Link
              href=''
              className='flex items-center justify-between rounded-full p-3 hover:bg-gray-100'
            >
              Laptops <ArrowRight size='15px' />
            </Link>
          </div>
        </div>
      </div>
       */}
    </div>
  );
};

export default SearchForm;

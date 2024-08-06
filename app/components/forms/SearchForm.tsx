'use client';

import Image from 'next/image';
import { FormEvent, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { ArrowRight, SearchNormal1 } from 'iconsax-react';
import { useRouter } from 'next/navigation';

import Input from '@components/Input';
import Button from '@components/Button';
import { ROUTES } from '@utils/routes';
import { useDropdownContext } from '@/app/providers';

interface Product {
  _id: number;
  productTitle: string;
  // Add other product properties as needed
}

const SearchForm = () => {
  const id = 'search-dropdown';
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { openDropdown, handleDropdownToggle } = useDropdownContext();
  const dropdown = openDropdown === id;

  const dropdownRootClassName = cn(
    'overflow-hidden transition duration-300 ease-in-out',
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

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Construct a POST request body
    const requestBody = {
      query: query, // Or other search parameters if needed
    };

    // Fetch data from API using POST request
    fetch(
      `https://my-home-et-al.onrender.com/api/v1/product/search?query=${query}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicate JSON data
        },
        body: JSON.stringify(requestBody), // Stringify the request body
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setSuggestedProducts(data.slice(0, 5));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle errors appropriately (e.g., display error message)
      });
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    // Trigger data fetching with the clicked search term
    handleSearchChange({
      target: { value: search },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    // Fetch recent searches from local storage or API
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;

    // Update recent searches
    if (searchQuery) {
      const updatedRecentSearches = [
        searchQuery,
        ...recentSearches.filter((search) => search !== searchQuery),
      ].slice(0, 5);
      setRecentSearches(updatedRecentSearches);
      localStorage.setItem(
        'recentSearches',
        JSON.stringify(updatedRecentSearches)
      );
    }

    router.push(`${ROUTES.SEARCH}?q=${searchQuery}`);
    handleDropdownToggle(id, false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Prevent the dropdown from closing when clicking inside it
    e.preventDefault();
  };

  return (
    <div className=''>
      <form className='relative w-full min-w-[18rem]' onSubmit={handleSearch}>
        <Input
          name='search'
          type='text'
          placeholder='What can we help you find?'
          value={searchQuery}
          onChange={handleSearchChange}
          variant='outline'
          inputClassName='rounded-full border-[#BDBDBD] py-4 lg:py-3 placeholder:text-[#BDBDBD] placeholder:text-sm px-5'
          onFocus={() => handleDropdownToggle(id, true)}
          onBlur={(e) => {
            // Check if the related target (element that receives focus next) is within the dropdown
            if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
              handleDropdownToggle(id, false);
            }
          }}
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
      <div
        ref={dropdownRef}
        className={`absolute ${dropdownRootClassName} left-0 right-0 top-[80px] h-screen bg-[#292929]/50 lg:top-[87px]`}
      >
        <div
          onMouseDown={handleMouseDown}
          className={`relative mx-auto mt-7 lg:mt-10 w-full max-w-[90%] rounded-2xl bg-white p-5 lg:max-w-[473px]`}
        >
          <div className='mb-5'>
            <p className='mb-6 font-clashmd text-xs text-myGray lg:text-sm'>
              Suggested Products
            </p>
            <div className='grid gap-3'>
              {suggestedProducts.map((product) => (
                <Link
                onClick={() => handleDropdownToggle(id, false)}
                  href={`/item/${product?._id}`}
                  key={product._id}
                  className='flex items-center gap-3 text-sm text-[#656565] lg:text-base'
                >
                  <Image
                    className=''
                    src='/icons/search.svg'
                    alt='Search'
                    width={15}
                    height={20}
                  />
                  {product.productTitle}
                </Link>
              ))}
            </div>
          </div>
          {recentSearches.length > 0 && (
            <div className='mb-5'>
              <p className='mb-2 font-clashmd text-xs text-myGray lg:text-sm'>
                Previous Search
              </p>
              <div className='grid grid-cols-2 gap-4 text-sm text-[#656565]'>
                {recentSearches.map((search) => (
                  <Link
                    href='/'
                    key={search}
                    onClick={() => handleRecentSearchClick(search)}
                    className='flex items-center justify-between'
                  >
                    {search} <ArrowRight size='15px' />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;

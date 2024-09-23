'use client';

import Image from 'next/image';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { ArrowRight } from 'iconsax-react';
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

  // Debounce function to limit the frequency of API calls
  const debounce = (func: any, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Function to handle API search with debounce
  const fetchSuggestions = useCallback(
    debounce((query: string) => {
      if (query) {
        const requestBody = { query };

        fetch(
          `${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}product/search?query=${query}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setSuggestedProducts(data.slice(0, 5).reverse());
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setSuggestedProducts([]);
          });
      } else {
        setSuggestedProducts([]);
      }
    }, 500), // Adjust debounce delay as needed
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    fetchSuggestions(query); // Call debounced function
  };

  const handleRecentSearchClick = (search: string) => {
    const lowerCaseSearch = search.toLowerCase();
    setSearchQuery(lowerCaseSearch);
    handleSearchChange({
      target: { value: lowerCaseSearch },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches).map((s: string) => s.toLowerCase()));
    }
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = (formData.get('search') as string).toLowerCase(); // Convert to lowercase

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

      router.push(`${ROUTES.SEARCH}?q=${searchQuery}`);
      setSuggestedProducts([]);
    }
    handleDropdownToggle(id, false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
          inputClassName='rounded-full border-[#BDBDBD] focus:border-gray-300 focus:outline-0 py-4 lg:py-3 placeholder:text-[#BDBDBD] placeholder:text-sm px-5'
          onFocus={() => handleDropdownToggle(id, true)}
          onBlur={(e) => {
            // Check if the related target (element that receives focus next) is within the dropdown
            if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
              handleDropdownToggle(id, false);
            }
          }}
          ref={inputRef}
        />
        {searchQuery ? (
          <Button className='rounded-full max-sm:h-[80%] max-w-[80px] font-clashmd absolute max-sm:text-xs max-sm:right-[5px] right-[6px] hover:bg-white hover:text-primary top-1/2 border-0 -translate-y-1/2'>
            Search
          </Button>
        ) : (
          <Button
            className='absolute disabled:bg-transparent right-5 top-1/2 -translate-y-1/2'
            fit
            variant='ghost'
            disabled={suggestedProducts.length < 1}
          >
            <Image
              className=''
              src='/icons/search.svg'
              alt='Search'
              width={18}
              height={20}
            />
          </Button>
        )}
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
              {suggestedProducts.length > 0 ? suggestedProducts.map((product) => (
                <Link
                  onClick={() => handleDropdownToggle(id, false)}
                  href={`/item/${product?._id}`}
                  key={product._id}
                  className='flex truncate text-ellipsis overflow-hidden whitespace-nowrap items-center gap-3 text-sm text-[#656565] lg:text-base'
                >
                  <Image
                    className='min-w-[15px]'
                    src='/icons/search.svg'
                    alt='Search'
                    width={15}
                    height={20}
                  />
                  <span className='truncate text-ellipsis'>{product.productTitle}</span>

                </Link>
              )) : (
                <div className='text-sm'>
                  No product found
                </div>
              )}
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

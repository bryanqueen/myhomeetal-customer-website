'use client';

import Image from 'next/image';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { ArrowRight } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';

import Input from '@components/Input';
import Button from '@components/Button';
import { ROUTES } from '@utils/routes';
import { useDropdownContext } from '@/app/providers';

interface Suggestion {
  suggestionText: string;
  type: string;
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
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const fetchSuggestions = useCallback(
    async (query: string) => {
      if (query.length > 2) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}product/suggestions?query=${encodeURIComponent(query)}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch suggestions');
          }
          const data = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    },
    []
  );

  const debouncedFetchSuggestions = useCallback(
    debounce((query: string) => fetchSuggestions(query), 300),
    [fetchSuggestions]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedFetchSuggestions(query);
  };

  const handleRecentSearchClick = (search: string) => {
    setSearchQuery(search);
    debouncedFetchSuggestions(search);
  };

  useEffect(() => {
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchQuery = formData.get('search') as string;

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

      router.push(`${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery)}`);
      setSuggestions([]);
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
            disabled={suggestions.length < 1}
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
              {searchQuery.length > 0 && (
                <Link
                  onClick={() => {
                    handleDropdownToggle(id, false);
                  }}
                  href={`${ROUTES.SEARCH}?q=${encodeURIComponent(searchQuery)}`}
                  className='flex truncate text-ellipsis overflow-hidden whitespace-nowrap items-center gap-3 text-sm text-[#656565] lg:text-base'
                >
                  <Image
                    className='min-w-[15px]'
                    src='/icons/search.svg'
                    alt='Search'
                    width={15}
                    height={20}
                  />
                  <span className='truncate text-ellipsis'>{searchQuery}</span>
                </Link>
              )}

              {suggestions.length > 0 && suggestions.slice(0, 7).map((suggestion, index) => (
                <Link
                  onClick={() => {
                    handleDropdownToggle(id, false);
                  }}
                  href={`${ROUTES.SEARCH}?q=${encodeURIComponent(suggestion.suggestionText)}`}
                  key={index}
                  className='flex truncate text-ellipsis overflow-hidden whitespace-nowrap items-center gap-3 text-sm text-[#656565] lg:text-base'
                >
                  <Image
                    className='min-w-[15px]'
                    src='/icons/search.svg'
                    alt='Search'
                    width={15}
                    height={20}
                  />
                  <span className='truncate text-ellipsis'>{suggestion.suggestionText}</span>
                </Link>
              ))}

              {suggestions.length < 1 && searchQuery.length < 1 && (
                <div className='text-sm'>
                  No suggestions found
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
                    href={`${ROUTES.SEARCH}?q=${encodeURIComponent(search)}`}
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


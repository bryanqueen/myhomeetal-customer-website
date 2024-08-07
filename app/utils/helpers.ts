import { twMerge } from 'tailwind-merge';
import cn from 'classnames';

export const cls = (...args: cn.ArgumentArray) => twMerge(cn(args));

export const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  pageRange = 2, // Number of pages to display before and after ellipsis
  minPagesToShow = 5 // Minimum number of pages to show before and after ellipsis
) => {
  const pages = [];

  if (totalPages <= minPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= minPagesToShow - pageRange) {
      // Display pages from the beginning up to minPagesToShow
      for (let i = 1; i <= minPagesToShow; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - pageRange) {
      // Display pages from totalPages - minPagesToShow + 1 up to the end
      pages.push(1);
      pages.push('...');
      const startPage = Math.max(totalPages - minPagesToShow + 1, 1); // Ensure startPage is not negative
      for (let i = startPage; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Display pages around the current page
      pages.push(1);
      pages.push('...');
      const startPage = currentPage - pageRange;
      const endPage = currentPage + pageRange;
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
  }

  return pages;
};

export const formatPrice = (price: string | number): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  if (isNaN(numericPrice)) {
    return 'Invalid price'; // Handle invalid price scenario
  }
  return numericPrice.toLocaleString('en-US');
};

export const convertPrice = (priceInNGN, region) => {
  const exchangeRates = {
    NG: 1, // Example rate
    US: 1500,
    UK: 2000,
  };

  return priceInNGN / exchangeRates[region];
};

export const currencySymbols = {
  NG: '₦',
  US: '$',
  UK: '£',
};

export const numberToWords = (num: number): string => {
  const ones: string[] = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ];

  if (num < 10) return ones[num];

  return 'Number too large';
};

import { twMerge } from 'tailwind-merge';
import cn from 'classnames';
import { useCart } from '../CartProvider';
import productService from '../services/productService';
import toast from 'react-hot-toast';
import { usePopup } from '../PopupProvider';

export const useCartActions = () => {
  const { dispatch } = useCart();
  const { showPopup, hidePopup } = usePopup();
  const fetchCart = async () => {
    try {
      const res = await productService.getCart();
      if (res.status === 200) {
        dispatch({ type: 'SET_CART', payload: res.data.cart });
      } else {
        console.error('Failed to fetch cart data');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addItemToCart = async (item) => {
    try {
      const res = await productService.addToCart(item.id);
      if (res.status === 200) {
        // Refetch cart data to ensure state is up-to-date
        const updatedCart = await productService.getCart();
        dispatch({ type: 'SET_CART', payload: updatedCart.data.cart });
        toast.success('Added to cart');
        showPopup();
      } else {
        toast.error('adding failed');
      }

    } catch (error) {
      console.log(error);
    }
  };

  const addItemToCart1 = async (item) => {
    try {
      const res = await productService.addToCart(item.id);
      if (res.status === 200) {
        // Refetch cart data to ensure state is up-to-date
        const updatedCart = await productService.getCart();
        dispatch({ type: 'SET_CART', payload: updatedCart.data.cart });
      } else {
        toast.error('adding failed');
      }

    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (itemId) => {
    try {
      const payload = {
        productId: itemId
      }
      const res = await productService.updateCartItem(payload);
      if (res.status === 200) {
        // Refetch cart data to ensure state is up-to-date
        const updatedCart = await productService.getCart();
        dispatch({ type: 'SET_CART', payload: updatedCart.data.cart });
      } else {
        toast.error('adding failed');
      }

    } catch (error) {
      console.log(error);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      const payload = {
        productId: itemId
      }
      const res = await productService.deleteCartItem(payload);
      if (res.status === 200) {
        const updatedCart = await productService.getCart();
        // Check if showPopup is true before hiding the popup
        if (showPopup) {
          hidePopup();
        }
        dispatch({ type: 'SET_CART', payload: updatedCart.data.cart });
        toast.success('Item deleted');
      } else {
        toast.error('Failed to delete item');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete item');
    }
  };

  return { addItemToCart, addItemToCart1, removeItemFromCart, updateCartItem, fetchCart };
};


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

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export const formatNumberWithCommas = (value: string): string => {
  const number = parseFloat(value.replace(/,/g, ''));
  if (isNaN(number)) return value;
  return number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function formatDate(dateString) {
  const date = new Date(dateString);

  // Extract the day, month, and year
  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getUTCFullYear();

  // Function to get the ordinal suffix for the day
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  // Combine the parts into the desired format
  return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
}
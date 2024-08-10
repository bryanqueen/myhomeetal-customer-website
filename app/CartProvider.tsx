'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import productService from './services/productService';
import toast from 'react-hot-toast';

// Cart context
const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload || [] };
    case 'ADD_ITEM':
      return { ...state, items: [...(state.items || []), action.payload] }; 
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item => item.id === action.payload.id ? action.payload : item)
      };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    // Fetch cart data on initial load
    const getCart = async () => {
      try {
        const res = await productService.getCart();
        if (res.status === 200) {
          dispatch({ type: 'SET_CART', payload: res.data.cart });
          
        }
      } catch (error) {
        console.log(error);
       
      }
    }

    getCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

'use client';

// CartContext.tsx
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import productService from './services/productService';

interface CartItem {
  _id: string;
  productTitle: string;
  price: number;
  images: string[];
  brand: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

interface CartContextProps extends CartState {
  addToCart: (item: CartItem, quantity: number) => void;
  
  fetchCart: () => void;
  
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const CartContext = createContext<CartContextProps>({
  ...initialState,
  addToCart: () => {}  ,
  fetchCart: () => {},
});

const cartReducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        totalAmount: action.payload.reduce((total, item) => total + item.price * item.quantity, 0),
      };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        totalAmount: state.totalAmount + action.payload.price * action.payload.quantity,
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload),
        totalAmount: state.totalAmount - state.items.find(item => item._id === action.payload)!.price * state.items.find(item => item._id === action.payload)!.quantity,
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
        ),
        totalAmount: state.items.reduce((total, item) => total + item.price * item.quantity, 0),
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await productService.getCart();
      dispatch({ type: 'SET_CART', payload: data.data });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const addToCart = async (item: CartItem, quantity: number) => {
    try {
      const data = await productService.addToCart(item._id);
      dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity } });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };
/*
  const removeFromCart = async (productId: string) => {
    try {
      await apiUtils.deleteRequest(apiUtils.api.CART, { productId });
      dispatch({ type: 'REMOVE_ITEM', payload: productId });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      await apiUtils.postRequest(`${apiUtils.api.CART}/${productId}`, { quantity });
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    } catch (error) {
      console.error('Failed to update item quantity in cart:', error);
    }
  };
*/
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,   
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

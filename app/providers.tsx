'use client';

import React, { createContext, ReactNode, useState, useContext } from 'react';
import { CartProvider } from 'react-use-cart';
import { toast } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

type NavState = {
  activeNav: 'myAccount' | 'main' | 'cart' | null;
};

type NavContextType = {
  state: NavState;
  setActiveNav: (key: NavState['activeNav']) => void;
};

type ItemQuantityState = {
  quantity: number;
};

type ItemQuantityType = {
  state: ItemQuantityState;
  setQuantity: (value: number) => void;
};

interface DropdownContextValue {
  openDropdown: string | null;
  handleDropdownToggle: (id: string, state: boolean) => void;
}

interface DropdownProviderProps {
  children: ReactNode;
}

const initialNavState: NavState = {
  activeNav: null,
};

const initialItemQuantity: ItemQuantityState = {
  quantity: 1,
};

const NavContext = createContext<NavContextType>({
  state: initialNavState,
  setActiveNav: () => {},
});

const ItemQuantityContext = createContext<ItemQuantityType>({
  state: initialItemQuantity,
  setQuantity: () => {},
});

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined
);

type UIProviderProps = {
  children: ReactNode;
};

export const UIProvider = ({ children }: UIProviderProps) => {
  const [state, setState] = useState<NavState>(initialNavState);
  const [itemState, setItemState] =
    useState<ItemQuantityState>(initialItemQuantity);

  const setActiveNav = (key: NavState['activeNav']) => {
    setState((prevState) => ({
      activeNav: prevState.activeNav === key ? null : key,
    }));
  };

  const setItemQuantity = (quantity: ItemQuantityState['quantity']) => {
    setItemState(() => ({
      quantity,
    }));
  };

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (id: string, state: boolean) => {
    setOpenDropdown((prev) => (state ? id : prev === id ? null : prev));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <NavContext.Provider value={{ state, setActiveNav }}>
        <DropdownContext.Provider
          value={{ openDropdown, handleDropdownToggle }}
        >
          <CartProvider
            onItemAdd={() => toast.success('Added item to cart')}
            onItemRemove={() => toast.success('Removed item from cart')}
          >
            <ItemQuantityContext.Provider
              value={{ state: itemState, setQuantity: setItemQuantity }}
            >
              {children}
            </ItemQuantityContext.Provider>
          </CartProvider>
        </DropdownContext.Provider>
      </NavContext.Provider>
    </QueryClientProvider>
  );
};

export const useDropdownContext = (): DropdownContextValue => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      'useDropdownContext must be used within a DropdownProvider'
    );
  }
  return context;
};
export const useNav = () => useContext(NavContext);
export const useItemQuantity = () => useContext(ItemQuantityContext);

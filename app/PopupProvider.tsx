'use client';
// PopupContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface PopupContextProps {
  isPopupVisible: boolean;
  showPopup: () => void;
  hidePopup: () => void;
}

// Create the context
const PopupContext = createContext<PopupContextProps | undefined>(undefined);

// Provider component
const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);

  const showPopup = () => setPopupVisible(true);
  const hidePopup = () => setPopupVisible(false);

  return (
    <PopupContext.Provider value={{ isPopupVisible, showPopup, hidePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

// Custom hook to use the PopupContext
const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

export { PopupProvider, usePopup };

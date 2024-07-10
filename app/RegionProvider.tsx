'use client';
import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';

// Define the context value type
interface RegionContextType {
  region: string;
  setRegion: Dispatch<SetStateAction<string>>;
}

// Define the provider's props type
interface RegionProviderProps {
  children: ReactNode;
}

// Create Region Context with a default value
const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider = ({ children }: RegionProviderProps) => {
  const [region, setRegion] = useState<string>('NG');
  return (
    <RegionContext.Provider value={{ region, setRegion }}>
      {children}
    </RegionContext.Provider>
  );
};

// Custom hook to use the Region context
export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
};

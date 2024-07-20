'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface Address {
  id: number;
  email: string;
  phoneNumber: string;
}

interface AddressBookContextType {
  addresses: Address[];
  createAddress: (email: string, phoneNumber: string) => void;
  editAddress: (id: number, email: string, phoneNumber: string) => void;
  deleteAddress: (id: number) => void;
  saveAddress: () => void;
}

const AddressBookContext = createContext<AddressBookContextType | undefined>(
  undefined
);

export const useAddressBook = () => {
  const context = useContext(AddressBookContext);
  if (!context) {
    throw new Error(
      'useAddressBook must be used within an AddressBookProvider'
    );
  }
  return context;
};

export const AddressBookProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [addresses, setAddresses] = useState<Address[]>(() => {
    if (typeof window !== 'undefined') {
      const storedAddresses = localStorage.getItem('addresses');
      return storedAddresses ? JSON.parse(storedAddresses) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('addresses', JSON.stringify(addresses));
    }
  }, [addresses]);

  const createAddress = (email: string, phoneNumber: string) => {
    const newAddress: Address = {
      id: addresses.length > 0 ? addresses[addresses.length - 1].id + 1 : 1,
      email,
      phoneNumber,
    };
    setAddresses([...addresses, newAddress]);
  };

  const editAddress = (id: number, email: string, phoneNumber: string) => {
    setAddresses(
      addresses.map((address) =>
        address.id === id ? { ...address, email, phoneNumber } : address
      )
    );
  };

  const deleteAddress = (id: number) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const saveAddress = () => {
    // Logic to save addresses, e.g., send to a backend server
    console.log('Addresses saved:', addresses);
  };

  return (
    <AddressBookContext.Provider
      value={{
        addresses,
        createAddress,
        editAddress,
        deleteAddress,
        saveAddress,
      }}
    >
      {children}
    </AddressBookContext.Provider>
  );
};

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
  lga: string;
}

interface AddressBookContextType {
  addresses: Address[];
  createAddress: (email: string, phoneNumber: string, lga: string) => void;
  editAddress: (id: number, email: string, phoneNumber: string, lga: string) => void;
  deleteAddress: (id: number) => void;
  saveAddress: () => void;
  firstStageCompleted: boolean;
  selectedPaymentMethod: string;
  selectedDeliveryMethod: string;
  setFirstStageCompleted: (completed: boolean) => void;
  setSelectedPaymentMethod: (payment: string) => void;
  setSelectedDeliveryMethod: (delivery: string) => void;
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

  const [firstStageCompleted, setFirstStageCompleted] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem('firstStageCompleted');
      return storedValue === 'true'; // Convert string to boolean
    }
    return false; // Default value if not in the browser
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedMethod = localStorage.getItem('selectedPaymentMethod');
      return storedMethod || '';
    }
    return '';
  });

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedMethod = localStorage.getItem('selectedDeliveryMethod');
      return storedMethod || '';
    }
    return '';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('addresses', JSON.stringify(addresses));
      localStorage.setItem(
        'firstStageCompleted',
        JSON.stringify(firstStageCompleted)
      );
      localStorage.setItem('selectedPaymentMethod', selectedPaymentMethod);
      localStorage.setItem('selectedDeliveryMethod', selectedDeliveryMethod);
    }
  }, [addresses, firstStageCompleted]);

  const createAddress = (email: string, phoneNumber: string, lga: string) => {
    const newAddress: Address = {
      id: addresses.length > 0 ? addresses[addresses.length - 1].id + 1 : 1,
      email,
      phoneNumber,
      lga
    };
    setAddresses([...addresses, newAddress]);
  };

  const editAddress = (id: number, email: string, phoneNumber: string, lga: string) => {
    setAddresses(
      addresses.map((address) =>
        address.id === id ? { ...address, email, phoneNumber, lga } : address
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
        firstStageCompleted,
        setFirstStageCompleted,
        selectedPaymentMethod,
        selectedDeliveryMethod,
        setSelectedDeliveryMethod,
        setSelectedPaymentMethod,
      }}
    >
      {children}
    </AddressBookContext.Provider>
  );
};

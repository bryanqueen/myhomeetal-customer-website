export interface UserInfo {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export interface PageProps {
  params?: any;
  searchParams: {
    tab: string;
  };
}

export interface User {
  display_name: string;
  bvn: string;
  firstname: string;
  currency: string;
  lastname: string;
  email: string;
  date_of_birth: string;
  gender: string;
  email_alert: boolean;
  mobile_number: string;
}

export interface CartIt {
  _id: string;
  productTitle: string;
  price: string;
  images: string[];
  brand: string;
  quantity: number;
}

export interface CartState {
  cart: CartIt[];
  loading: boolean;
  error: string | null;
  totalAmount: number;
}

export interface CartContextProps extends CartState {
  addToCart: (item: CartIt) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
}
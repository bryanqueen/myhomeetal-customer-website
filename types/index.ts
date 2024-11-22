export interface CategoryType {
  name: string;
  _id: string;
  product_category_image?: string;
  products?: [];
}

export interface Product {
  _id: string;
  productTitle: string;
  price: number;
  images: string[];
  review: any[];
  isProductNew: boolean;
}

export interface CategoryProps {
  title: string;
  id: string;
  color?: string;
  products: Product[];
};

export interface Balance {
  balance: number,
  clear_balance: number,
  liened_amount: []
}

export interface Wallet {
  _id: string;
  user: string;
  account_no: string;
  bvn: string;
  mobile_number: string;
  bank_name: string;
  balance: Balance;
  transactions: string[];
  __v: number;
}

export interface WalletTrans {
  _id: string;
  amount: number;
  type: string;
  date: string;
  order: string;
}

export interface WalletAccountProps {
  wallet?: Wallet;
  walletTrans?: WalletTrans[];
}
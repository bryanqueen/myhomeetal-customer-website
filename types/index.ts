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
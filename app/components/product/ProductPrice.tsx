'use client'
import { convertPrice, currencySymbols, formatPrice } from "@/app/utils/helpers";

interface ProductPriceProps {
  priceInNGN: number;
  region: string;
  className?: string;
}

const ProductPrice = ({ priceInNGN, region, className }: ProductPriceProps) => {

  const convertedPrice = convertPrice(priceInNGN, region);
  const currencySymbol = currencySymbols[region] || '₦';

  return (
    <span className={className}>
      {currencySymbol}
      {formatPrice(convertedPrice.toFixed(2))}
    </span>
  );
};

export default ProductPrice;

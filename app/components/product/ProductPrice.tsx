'use client'
import { convertPrice, currencySymbols, formatPrice } from "@/app/utils/helpers";

interface ProductPriceProps {
  priceInNGN: number;
  region: any;
  className?: string;
}

const ProductPrice = ({ priceInNGN, region, className }: ProductPriceProps) => {
 

  const positivePriceInNGN = Math.abs(priceInNGN);
  const convertedPrice = convertPrice(positivePriceInNGN, region);
  const currencySymbol = currencySymbols[region] || '₦';

  return (
    <span className={className}>
      {currencySymbol}
      {formatPrice(convertedPrice.toFixed(2))}
    </span>
  );
};

export default ProductPrice;

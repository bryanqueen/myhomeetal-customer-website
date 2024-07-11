import { convertPrice, currencySymbols, formatPrice } from "@/app/utils/helpers";


interface ProductPriceProps {
  priceInNGN: number;
  region: string;
  className: string;
}

const ProductPrice = ({ priceInNGN, region, className }: ProductPriceProps) => {
  const convertedPrice = convertPrice(priceInNGN, region);
  const currencySymbol = currencySymbols[region] || '₦';

  return (
    <p className={className}>
      {currencySymbol}
      {formatPrice(convertedPrice.toFixed(2))}
    </p>
  );
};

export default ProductPrice;

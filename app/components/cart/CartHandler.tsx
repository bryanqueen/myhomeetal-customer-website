'use client';

import { useCart, Item } from 'react-use-cart';
import { useEffect, useState } from 'react';
// import { redirect } from 'next/navigation';

import Button from '@components/Button';
import { ROUTES } from '@/app/utils/routes';

interface Props {
  item: Item;
  className?: string;
  children: React.ReactNode;
  variant: 'ADD' | 'REMOVE' | 'UPDATE_PLUS' | 'UPDATE_MINUS';
  quantity?: number;
}

const CartHandler = ({
  item,
  className,
  children,
  variant,
  quantity = 1,
}: Props) => {
  const { updateItemQuantity, removeItem, addItem, getItem } = useCart();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (variant === 'ADD') {
      const itemInCart = getItem(item.id);
      if (itemInCart) {
        setDisabled(true);
      }
    }
  }, [variant, getItem, item.id]);

  const handleCart = () => {
    switch (variant) {
      case 'ADD':
        addItem(item, quantity);
        setDisabled(true);
        // redirect(ROUTES.CART);
        break;
      case 'REMOVE':
        removeItem(item.id);
        break;
      case 'UPDATE_PLUS':
        updateItemQuantity(item.id, Number(item.quantity) + 1);
        break;
      case 'UPDATE_MINUS':
        updateItemQuantity(item.id, Number(item.quantity) - 1);
        break;
      default:
        alert('Error: Unknown variant');
    }
  };

  return (
    <Button onClick={handleCart} icon className={className} disabled={disabled}>
      {children}
    </Button>
  );
};

export default CartHandler;

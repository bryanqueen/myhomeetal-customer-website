'use client';

import { useCart, Item } from 'react-use-cart';
import { useEffect, useState } from 'react';
import { ShoppingCart } from 'iconsax-react';
import Button from '@components/Button';
import { ROUTES } from '@/app/utils/routes';
import { usePopup } from '@/app/PopupProvider';

interface Props {
  item: Item;
  cart?: boolean;
  className?: string;
  children: React.ReactNode;
  variant: 'ADD' | 'REMOVE' | 'UPDATE_PLUS' | 'UPDATE_MINUS';
  quantity?: number;
  disabled?: boolean;
}

const CartHandler = ({
  item,
  cart,
  className,
  children,
  variant,
  quantity = 1,
  disabled,
}: Props) => {
  const { updateItemQuantity, removeItem, addItem, getItem } = useCart();
  const { showPopup, hidePopup, isPopupVisible } = usePopup();

  const handleCart = () => {
    switch (variant) {
      case 'ADD':
        addItem(item, quantity);
        showPopup();
        // redirect(ROUTES.CART);
        break;
      case 'REMOVE':
        removeItem(item.id);
        if (isPopupVisible) {
          hidePopup();
        }

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
    <Button
      onClick={handleCart}
      className={className}
      disabled={disabled}
      icon={
        variant === 'ADD' ? (
          <ShoppingCart size={24} variant='Bulk' color='white' />
        ) : undefined
      }
    >
      {children}
    </Button>
  );
};

export default CartHandler;

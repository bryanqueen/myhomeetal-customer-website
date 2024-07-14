import {
  UserTick,
  Box,
  Messages,
  HeartAdd,
  HeartCircle,
  Logout as LogoutIcon,
  ShoppingCart,
  Wallet2,
  Notification,
  SecuritySafe,
  Location,
  CloseSquare,
  Menu,
  Shop,
  Bag,
} from 'iconsax-react';

import { ROUTES } from './routes';

import LogoutDialog from '@components/account/Logout';

export const accountNav = [
  {
    text: 'Personal Information',
    icon: <UserTick variant='Bulk' />,
    link: ROUTES.ACCOUNT,
  },
  {
    text: 'My Orders',
    icon: <ShoppingCart variant='Bulk' />,
    link: ROUTES.PURCHASING_HISTORY,
  },
  {
    text: 'My Wallet',
    icon: <Wallet2 variant='Bulk' />,
    link: ROUTES.WALLET,
  },
  {
    text: 'Notifications',
    icon: <Notification variant='Bold' />,
    link: ROUTES.NOTIFICATIONS,
  },
  {
    text: 'Saved Items',
    icon: <HeartAdd variant='Bulk' />,
    link: ROUTES.SAVED_ITEMS,
  },
  {
    text: 'Security',
    icon: <SecuritySafe variant='Bulk' />,
    link: ROUTES.SECURITY,
  },
  {
    text: 'Address Book',
    icon: <Location variant='Bulk' />,
    link: ROUTES.ADDRESS_BOOK,
  },
  {
    text: 'Close Account',
    icon: <CloseSquare variant='Bulk' />,
    link: ROUTES.CLOSE_ACCOUNT,
  },
];

export const accountNav2 = [
  {
    text: 'My Account',
    icon: <UserTick variant='Bulk' />,
    link: ROUTES.ACCOUNT,
  },
  {
    text: 'My Orders',
    icon: <Box variant='Bulk' />,
    link: ROUTES.PURCHASING_HISTORY,
  },
  {
    text: 'Inbox',
    icon: <Messages variant='Bulk' />,
    link: ROUTES.NOTIFICATIONS,
  },
  {
    text: 'Saved Items',
    icon: <HeartCircle variant='Bulk' />,
    link: ROUTES.SAVED_ITEMS,
  },
  {
    text: 'Logout',
    icon: <LogoutIcon variant='Bulk' />,
    dialog: { content: <LogoutDialog /> },
  },
];
export const accountNav3 = [
  {
    text: 'Personal Information',
    icon: <UserTick variant='Bulk' color='#292D32' />,
    link: ROUTES.ACCOUNT,
  },
  {
    text: 'My Orders',
    icon: <Box variant='Bulk' color='#292D32' />,
    link: ROUTES.PURCHASING_HISTORY,
  },
  {
    text: 'My Wallet',
    icon: <Wallet2 variant='Bulk' color='#292D32' />,
    link: ROUTES.WALLET,
  },
  {
    text: 'Notifications',
    icon: <Notification variant='Bold' color='#292D32' />,
    link: ROUTES.NOTIFICATIONS,
  },
  {
    text: 'Saved Items',
    icon: <HeartAdd variant='Bulk' color='#292D32' />,
    link: ROUTES.SAVED_ITEMS,
  },

  {
    text: 'My Address',
    icon: <Location variant='Bulk' color='#292D32' />,
    link: ROUTES.ADDRESS_BOOK,
  },
  {
    text: 'Security',
    icon: <SecuritySafe variant='Bulk' color='#292D32' />,
    link: ROUTES.SECURITY,
  },
  {
    text: 'Close Account',
    icon: <CloseSquare variant='Bulk' color='#292D32' />,
    link: ROUTES.CLOSE_ACCOUNT,
  },
  {
    text: 'Logout',
    icon: <LogoutIcon variant='Bulk' color='#292D32' />,
    dialog: { content: <LogoutDialog /> },
  },
];
export const hamburgerNav = [
  {
    text: 'My Categories',
    icon: <Menu variant='Bulk' color='#292D32' />,
    link: ROUTES.ACCOUNT,
  },
  {
    text: 'My Shops',
    icon: <Shop variant='Bulk' color='#292D32' />,
    link: ROUTES.PURCHASING_HISTORY,
  },
  {
    text: 'My Deals',
    icon: <Bag variant='Bulk' color='#292D32' />,
    link: ROUTES.WALLET,
  },
  {
    text: 'My Account',
    icon: <UserTick variant='Bulk' />,
    link: ROUTES.ACCOUNT,
  },
  {
    text: 'My Cart',
    icon: <ShoppingCart variant='Bulk' color='#292D32' />,
    link: ROUTES.SAVED_ITEMS,
  },
  {
    text: 'Help Center',
    icon: <UserTick variant='Bulk' />,
    select: {
      options: [
        { value: 'nigeria', label: 'Nigeria', image: '/images/flags/nigeria.png' },
        { value: 'us', label: 'US', image: '/images/flags/us.png' },
        { value: 'uk', label: 'UK', image: '/images/flags/uk.png' },
      ],
      onChange: (event) => {
        console.log(event.target.value); // Handle select option change
      },
    },
  },
];

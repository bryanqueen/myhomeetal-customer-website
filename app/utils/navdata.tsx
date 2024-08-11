import {
  UserTick,
  Box,
  HeartAdd,
  Logout as LogoutIcon,
  ShoppingCart,
  Wallet2,
  Notification,
  Location,
  CloseSquare,
  Bag,
  Profile2User,
  Messages3,
  Cpu,
  Category2,
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
    text: 'My Referrals',
    icon: <Profile2User variant='Bulk' />,
    link: ROUTES.REFERRAL,
  },
  {
    text: 'Address Book',
    icon: <Location variant='Bulk' />,
    link: ROUTES.ADDRESS_BOOK,
  },
  {
    text: 'Rating & Reviews',
    icon: <Messages3 variant='Bulk' />,
    link: ROUTES.REVIEWS,
  },
  {
    text: 'Close Account',
    icon: <CloseSquare variant='Bulk' />,
    link: ROUTES.CLOSE_ACCOUNT,
  },
  {
    text: 'Meet the Devs',
    icon: <Cpu variant='Outline' />,
    link: ROUTES.DEVS,
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
    text: 'My Notifications',
    icon: <Notification variant='Bold' color='#292D32' />,
    link: ROUTES.NOTIFICATIONS,
  },
  {
    text: 'Saved Items',
    icon: <HeartAdd variant='Bulk' color='#292D32' />,
    link: ROUTES.SAVED_ITEMS,
  },
  {
    text: 'My Referrals',
    icon: <Profile2User variant='Bulk' />,
    link: ROUTES.REFERRAL,
  },

  {
    text: 'My Address',
    icon: <Location variant='Bulk' color='#292D32' />,
    link: ROUTES.ADDRESS_BOOK,
  },
  {
    text: 'Rating & Reviews',
    icon: <Messages3 variant='Bulk' />,
    link: ROUTES.REVIEWS,
  },
  {
    text: 'Close Account',
    icon: <CloseSquare variant='Bulk' color='#292D32' />,
    link: ROUTES.CLOSE_ACCOUNT,
  },
  {
    text: 'Meet the Devs',
    icon: <Cpu variant='Bulk' color='#292D32' />,
    link: ROUTES.DEVS,
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
    icon: <Category2 variant='Bulk' color='#292D32' />,
    link: ROUTES.CARTEGORIES,
  },
  {
    text: 'My Deals',
    icon: <Bag variant='Bulk' color='#292D32' />,
    link: ROUTES.DEALS,
  },
  {
    text: 'Referral Program',
    icon: <Profile2User variant='Bulk' color='#292D32' />,
    link: ROUTES.REFERRAL2,
  },
  {
    text: 'Help Center',
    icon: <UserTick variant='Bulk' color='#292D32' />,
    link: ROUTES.HELP_CENTER,
  },
  {
    select: {
      options: [
        {
          value: 'nigeria',
          label: 'Nigeria',
          image: '/images/flags/nigeria.png',
        },
        { value: 'us', label: 'US', image: '/images/flags/us.png' },
        { value: 'uk', label: 'UK', image: '/images/flags/uk.png' },
      ],
      onChange: (event) => {
        console.log(event.target.value); // Handle select option change
      },
    },
  },
];

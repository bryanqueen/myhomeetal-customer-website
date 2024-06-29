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
    text: 'Purchasing History',
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

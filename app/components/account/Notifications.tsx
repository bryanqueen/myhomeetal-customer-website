import { Add } from 'iconsax-react';
import cn from 'classnames';

import Button from '@/app/components/Button';

const notifications: {
  title: string;
  message: string;
  type: 'Important' | 'Unread' | 'Warning' | 'Successful';
  duration: number;
  callToAction?: {
    text: string;
    icon: React.ReactNode;
  };
}[] = [
  {
    title: 'Order Confirmed!',
    message:
      'Thanks for shopping with us. Your order #12345 will be on its way soon.',
    type: 'Important',
    duration: 26,
  },
  {
    title: 'Shipment on the Move!',
    message:
      'Good news! Your order #12345 has been dispatched. Track its journey in real-time.',
    type: 'Unread',
    duration: 43,
  },
  {
    title: 'Introducing Premium Membership: The Gold Experience',
    message:
      'Because you deserve nothing but the best! Our new Premium Membership offers exclusive early access to sales, free express shipping, and tailor-made offers just for you. Join the Gold Experience today and elevate your shopping adventure with us.',
    type: 'Successful',
    duration: 4,
    callToAction: {
      text: 'Join Premium plan',
      icon: <Add variant='Broken' />,
    },
  },
  {
    title: 'Cart Reminder',
    message:
      "You've left some items in your cart. Hurry and check out before they're gone!",
    type: 'Warning',
    duration: 4,
  },
];

const Notifications = () => {
  return (
    <div className='grid gap-5 py-5'>
      {notifications.map((notification, i) => (
        <div
          key={i}
          className='flex max-w-2xl gap-3 rounded-md border p-2 md:gap-8'
        >
          <div className='h-16 w-16 shrink-0 rounded-md bg-gray-100'></div>
          <div className='max-w-lg basis-full'>
            <p className='mb-1 font-medium'>{notification.title}</p>
            <p className='text-sm text-gray-500'>{notification.message}</p>
            {notification.callToAction && (
              <div className='pt-4'>
                <Button className='min-w-fit px-5'>
                  {notification.callToAction.icon}
                  {notification.callToAction.text}
                </Button>
              </div>
            )}
          </div>
          <div className='flex flex-col items-end md:shrink-0'>
            <span className='font-medium'>{notification.duration}m ago</span>
            <span
              className={cn('rounded-full px-2 py-0.5 text-sm', {
                'bg-red-500/30 text-primary': notification.type === 'Important',
                'bg-blue-500/20 text-blue-700': notification.type === 'Unread',
                'bg-yellow-500/30 text-yellow-600':
                  notification.type === 'Warning',
                'bg-green-500/20 text-green-700':
                  notification.type === 'Successful',
              })}
            >
              {notification.type}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;

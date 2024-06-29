'use client';

import { HTMLAttributes, ReactNode, forwardRef } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import cn from 'classnames';

interface ProductInformationProps {
  details: ReactNode;
  specifications: ReactNode;
  reviews: ReactNode;
}

const ProductTabs = ({
  details,
  specifications,
  reviews,
}: ProductInformationProps) => (
  <Tabs.Root className='flex flex-col' defaultValue='tab1'>
    <Tabs.List
      className='flex shrink-0 gap-14 border-b border-gray-400'
      aria-label='Manage your account'
    >
      <TabTrigger value='tab1'>Product details</TabTrigger>
      <TabTrigger value='tab2'>Specifications</TabTrigger>
      <TabTrigger value='tab3'>Reviews</TabTrigger>
    </Tabs.List>
    <div className='max-w-4xl'>
      <TabContent value='tab1'>{details}</TabContent>
      <TabContent value='tab2'>{specifications}</TabContent>
      <TabContent value='tab3'>{reviews}</TabContent>
    </div>
  </Tabs.Root>
);

interface TabTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  value: string;
}

interface TabContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  value: string;
}

const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(
  ({ children, className, value, ...props }, forwardedRef) => (
    <Tabs.Trigger
      className={cn(
        'flex cursor-default select-none items-center justify-center bg-white px-0 py-4 text-xl font-bold leading-none text-gray-400 shadow-current outline-none first:rounded-tl-md last:rounded-tr-md hover:text-primary focus:text-primary data-[state=active]:text-black data-[state=active]:shadow-[inset_0_-2px_0_0,0_2px_0_0] data-[state=active]:focus:relative data-[state=active]:focus:text-primary',
        className
      )}
      value={value}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </Tabs.Trigger>
  )
);

TabTrigger.displayName = 'TabTrigger';

const TabContent = forwardRef<HTMLDivElement, TabContentProps>(
  ({ children, className, value, ...props }, forwardedRef) => (
    <Tabs.Content
      className={cn('grow rounded-b-md bg-white py-5 outline-none', className)}
      value={value}
      tabIndex={1}
      {...props}
    >
      {children}
    </Tabs.Content>
  )
);

TabContent.displayName = 'TabContent';

export default ProductTabs;

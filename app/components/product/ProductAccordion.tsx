'use client';

import { HTMLAttributes, forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import * as Accordion from '@radix-ui/react-accordion';
import { FaChevronDown } from 'react-icons/fa6';

interface ProductInformationProps {
  details: ReactNode;
  specifications: ReactNode;
  reviews: ReactNode;
}

const ProductAccordion = ({
  details,
  specifications,
  reviews,
}: ProductInformationProps) => (
  <Accordion.Root
    className='mb-5 rounded-md shadow-black/5'
    type='single'
    defaultValue='item-1'
    collapsible
  >
    <AccordionItem value='item-1'>
      <AccordionTrigger>Product details</AccordionTrigger>
      <AccordionContent>{details}</AccordionContent>
    </AccordionItem>

    <AccordionItem value='item-2'>
      <AccordionTrigger>Specifications</AccordionTrigger>
      <AccordionContent>{specifications}</AccordionContent>
    </AccordionItem>

    <AccordionItem value='item-3'>
      <AccordionTrigger>Reviews</AccordionTrigger>
      <AccordionContent>{reviews}</AccordionContent>
    </AccordionItem>
  </Accordion.Root>
);

interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  value: string;
}

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, value, ...props }, forwardedRef) => (
    <Accordion.Item
      className={classNames(
        'mt-px overflow-hidden border-b border-gray-300 first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10',
        className
      )}
      value={value}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);

AccordionItem.displayName = 'AccordionItem';

interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className='flex'>
      <Accordion.Trigger
        className={classNames(
          'group flex flex-1 cursor-default items-center justify-between bg-white py-6 pr-5 leading-none shadow-[0_1px_0] shadow-gray-300 outline-none',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <div className='font-medium'>{children}</div>
        <FaChevronDown
          className='transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180'
          aria-hidden
          size='1rem'
        />
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

AccordionTrigger.displayName = 'AccordionTrigger';

interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={classNames(
        'text-mauve11 bg-mauve2 overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className='py-5'>{children}</div>
    </Accordion.Content>
  )
);

AccordionContent.displayName = 'AccordionContent';

export default ProductAccordion;

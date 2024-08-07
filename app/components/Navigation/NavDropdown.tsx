'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'iconsax-react';
import Link from 'next/link';
import cn from 'classnames';

import useClickOutsideContainer from '../../hooks/useClickOutsideContainer';
import useHoverOutsideContainer from '../../hooks/useHoverOutsideContainer';
import { useDropdownContext } from '../../providers';

import ClientOnly from '@components/ClientOnly';

interface NavDropdownProps {
  id: string;
  target: ReactNode;
  items?: any;
  contentClassName?: string;
  position?: string;
  children?: ReactNode;
}

const NavDropdown = ({
  id,
  target,
  items,
  contentClassName,
  position,
  children, // children prop will overwrite items prop when present
}: NavDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<string | undefined>(undefined);
  const { openDropdown, handleDropdownToggle } = useDropdownContext();

  const isOpen = openDropdown === id;

  const onToggle = (state: boolean) => handleDropdownToggle(id, state);

  useClickOutsideContainer(dropdownRef, () => onToggle(false));
  useHoverOutsideContainer(dropdownRef, () => onToggle(false));

  useEffect(() => {
    if (isOpen) {
      const contentHeight = contentRef.current?.scrollHeight;
      setHeight(`${contentHeight}px`);
    } else {
      setHeight('0');
    }
  }, [isOpen]);

  const contentRootClassName = cn(
    'absolute top-[110px] min-w-64 overflow-hidden rounded-3xl bg-white p-0 transition-opacity duration-300 ease-out z-50',
    {
      'opacity-100': isOpen,
      'opacity-0': !isOpen,
    },
    position
  );

  return (
    <div className=' flex items-center'>
      <button
        className='flex w-full items-center whitespace-nowrap justify-between gap-1 text-base hover:text-[#8B1A1A] font-clashmd text-myGray transition'
        aria-expanded={isOpen ? 'true' : 'false'}
        onClick={() => onToggle(!isOpen)}
        onMouseEnter={() => onToggle(true)}
      >
        {target}
      </button>
      <ClientOnly>
        {isOpen && (
          <div className='absolute h-screen inset-0 top-[83px] bg-black bg-opacity-50 z-40' onClick={() => onToggle(false)}></div>
        )}
        <div
          className={contentRootClassName}
          ref={dropdownRef}
          style={{ height }}
          onMouseLeave={() => onToggle(false)}
          onMouseEnter={() => onToggle(true)}
        >
          <div ref={contentRef} className={`p-5 ${contentClassName}`}>
            {children
              ? children
              : items.map((item: any, j: any) => (
                <Link
                  key={j}
                  href={item.link}
                  className='flex select-none justify-between rounded-lg p-5 text-[#656565] text-sm leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus-visible:shadow-[0_0_0_2px]'
                >
                  {item.text}
                  {item.icon || <ArrowRight size='15px' />}
                </Link>
              ))}
          </div>
        </div>
      </ClientOnly>
    </div>
  );
};

export default NavDropdown;

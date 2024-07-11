import cn from 'classnames';
import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'solid' | 'ghost' | 'outline';
  active?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  type?: 'submit' | 'reset' | 'button';
  loading?: boolean;
  disabled?: boolean;
  disableBorderRadius?: boolean;
  noPadding?: boolean;
  center?: boolean;
  ariaLabel?: string;
  linkType?: 'rel' | 'abs' | 'none';
  href?: string;
  rounded?: boolean;
  fit?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant = 'solid',
    children,
    active,
    icon = false,
    iconRight = false,
    loading = false,
    disabled = false,
    disableBorderRadius = false,
    center = false,
    noPadding = false,
    ariaLabel,
    linkType = 'none',
    href,
    rounded = false,
    fit = false,
    ...rest
  } = props;

  const rootClassName = twMerge(
    cn(
      'btn font-body inline-flex w-32 cursor-pointer items-center justify-center gap-1 border p-2 text-center font-medium leading-4 placeholder-white transition duration-300 ease-in-out focus:outline-none focus-visible:outline-none md:text-sm',
      {
        'rounded-md': !disableBorderRadius,
        'rounded-[2rem]': rounded,
        'focus:bg-secondary bg-primary text-white': variant === 'solid',
        ' border-primary bg-white text-primary hover:bg-primary/80 hover:text-white':
          variant === 'outline',
        'focus:border-secondary border-transparent text-black hover:bg-white/50':
          variant === 'ghost',
        'cursor-not-allowed': loading,
        'cursor-not-allowed bg-[#FF6567] hover:cursor-not-allowed hover:shadow-none disabled:text-white':
          disabled,
        'mx-auto': center,
        'w-auto p-0': noPadding,
        'max-w-fit': fit,
      },
      className
    )
  );

  if (linkType === 'abs')
    return (
      <a href={href} className={rootClassName} aria-label={ariaLabel}>
        {icon && <span className='me-2'>{icon}</span>}
        {children}
      </a>
    );

  if (linkType === 'rel')
    return (
      <Link href={href || ''} className={rootClassName} aria-label={ariaLabel}>
        {icon && <span className='me-2'>{icon}</span>}
        {children}
      </Link>
    );

  return (
    <button
      aria-pressed={active}
      data-variant={variant}
      ref={ref}
      className={rootClassName}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {icon && <span className='me-2'>{icon}</span>}
      <div className=''>{children}</div>
      {iconRight && <span className='ml-2'>{iconRight}</span>}
      {loading && (
        <svg
          className='-me-1 ms-3 h-5 w-5 animate-spin'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          />
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          />
        </svg>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;

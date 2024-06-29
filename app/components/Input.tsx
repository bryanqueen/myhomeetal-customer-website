import cn from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  labelKey?: string;
  placeholderKey?: string;
  name: string;
  errorKey?: string;
  type?: string;
  shadow?: boolean;
  disableBorderRadius?: boolean;
  variant?: 'normal' | 'solid' | 'outline';
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className = 'block',
      labelKey,
      name,
      errorKey,
      placeholderKey = ' ',
      variant = 'normal',
      shadow = false,
      type = 'text',
      disableBorderRadius = false,
      inputClassName,
      labelClassName,
      ...rest
    },
    ref
  ) => {
    const rootClassName = twMerge(
      cn(
        'w-full min-w-[15rem]',
        {
          'rounded-md': disableBorderRadius,
          // shadow: 'focus:shadow',
        },
        className
      )
    );

    const labelClass = twMerge(
      cn('mb-2 inline-block text-gray-500', labelClassName)
    );

    const inputClass = twMerge(
      cn(
        'w-full rounded-xl bg-gray-100 p-4 px-6 text-black focus:outline-primary',
        {
          'border border-gray-300 bg-white focus:border-primary':
            variant === 'outline',
        },
        inputClassName
      )
    );

    return (
      <div className={rootClassName}>
        {labelKey && <label className={labelClass}>{labelKey}</label>}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          placeholder={placeholderKey}
          className={inputClass}
          autoComplete='off'
          spellCheck='false'
          aria-invalid={errorKey ? 'true' : 'false'}
          {...rest}
        />
        {errorKey && (
          <p className='my-2 text-xs text-red-500 first-letter:capitalize'>
            {errorKey}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

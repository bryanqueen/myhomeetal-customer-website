'use client';
import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface PhoneInputComponentProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const PhoneInputComponent: React.FC<PhoneInputComponentProps> = ({
  value,
  onChange,
  disabled,
  className
}) => {

  return (
    <div>
      <div className='hidden lg:block'>
        <PhoneInput
          id='phone'
          placeholder='Enter phone number'
          value={value}
          onChange={onChange}
          className={`phone-input ${className}`}
          defaultCountry='NG'
          disabled={disabled}
        />
      </div>
      <div className='lg:hidden'>
        <PhoneInput
          id='phone'
          placeholder='Enter phone number'
          value={value}
          onChange={onChange}
          className={`phone-input-mobile ${className}`}
          defaultCountry='NG'
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default PhoneInputComponent;

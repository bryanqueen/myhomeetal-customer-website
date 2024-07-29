'use client';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputComponentProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInputComponent: React.FC<PhoneInputComponentProps> = ({
  value,
  onChange,
}) => {
  
  const inputStyle: React.CSSProperties = {
    border: '1px solid #D9D9D9',
    borderRadius: '10px',
    width: '100%',
    height: '70px',
    paddingLeft: '70px',
    fontSize: '14px',
  };
  const mobileinputStyle: React.CSSProperties = {
    border: '0',
    borderRadius: '10px',
    width: '100%',
    height: '60px',
    paddingLeft: '70px',
    background: '#F4F4F4',
    fontSize: '12px',
  };

  const buttonStyle: React.CSSProperties = {
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    border: '1px solid #00000039',
    background: 'white',
    padding: '0 10px 0 10px',
  };
  const mobilebuttonStyle: React.CSSProperties = {
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderTop: '0px',
    borderBottom: '0px',
    borderLeft: '0px',
    borderRight: '1px solid #d9d9d9',
    background: '#F4F4F4',
    padding: '0 10px 0 10px',
  };

  return (
    <div>
      <div className='hidden lg:block'>
        <PhoneInput
          country={'ng'} // Default country code
          value={value}
          onChange={onChange}
          onlyCountries={['ng']} // Limit to Nigeria only
          inputStyle={inputStyle}
          buttonStyle={buttonStyle}
        />
      </div>
      <div className='lg:hidden'>
        <PhoneInput
          country={'ng'} // Default country code
          value={value}
          onChange={onChange}
          onlyCountries={['ng']} // Limit to Nigeria only
          inputStyle={mobileinputStyle}
          buttonStyle={mobilebuttonStyle}
        />
      </div>
    </div>
  );
};

export default PhoneInputComponent;

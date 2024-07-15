'use client';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneInputComponent: React.FC = () => {
  const [phone, setPhone] = useState<string>('');
  const inputStyle: React.CSSProperties = {
    border: '0',
    borderRadius: '16px',
    width: '100%',
    height: '56px',
    paddingLeft: '60px',
  };
  const mobileinputStyle: React.CSSProperties = {
    border: '0',
    borderRadius: '10px',
    width: '100%',
    height: '60px',
    paddingLeft: '60px',
    background: '#F4F4F4',
  };

  const buttonStyle: React.CSSProperties = {
    borderTopLeftRadius: '16px',
    borderBottomLeftRadius: '16px',
    borderTop: '0px',
    borderBottom: '0px',
    borderLeft: '0px',
    borderRight: '1px',
    background: 'white',
    padding: '0 5px 0 5px',
  };
  const mobilebuttonStyle: React.CSSProperties = {
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderTop: '0px',
    borderBottom: '0px',
    borderLeft: '0px',
    borderRight: '1px',
    background: '#f4f4f4',
    padding: '0 5px 0 5px',
  };

  return (
    <div>
      <div className='hidden lg:block'>
        <PhoneInput
          country={'ng'} // Default country code (e.g., 'us' for the USA)
          value={phone}
          onChange={(phone) => setPhone(phone)}
          enableSearch={true} // Enables search functionality for countries
          inputStyle={inputStyle}
          buttonStyle={buttonStyle}
          containerClass='phone-input-container'
        />
      </div>
      <div className='lg:hidden'>
        <PhoneInput
          country={'ng'} // Default country code (e.g., 'us' for the USA)
          value={phone}
          onChange={(phone) => setPhone(phone)}
          enableSearch={true} // Enables search functionality for countries
          inputStyle={mobileinputStyle}
          buttonStyle={mobilebuttonStyle}
        />
      </div>
    </div>
  );
};

export default PhoneInputComponent;

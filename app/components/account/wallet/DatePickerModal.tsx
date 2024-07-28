'use client';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Image from 'next/image';

interface DatePickerModalProps {
  onDateSelect: (date: string) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({ onDateSelect }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      onDateSelect(format(date, 'yyyy-MM-dd'));
    }
    setShowModal(false);
  };

  return (
    <div className='date-picker-container'>
      <button
        className='flex h-[60px] w-full items-center justify-between rounded-[10px] bg-[#F4F4F4] px-5 text-sm lg:h-[70px] lg:border lg:border-[#D9D9D9] lg:bg-white'
        onClick={() => setShowModal(true)}
      >
        {startDate ? (
          <span>{format(startDate, 'yyyy-MM-dd')}</span>
        ) : (
          <span>Select Date of Birth</span>
        )}

        <Image src='/Calendar.svg' width={15} height={15} alt='female icon' />
      </button>

      {showModal && (
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-header'>
              <button
                className='close-modal-btn'
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              inline
              calendarClassName='date-picker-calendar'
              dateFormat='yyyy-MM-dd'
              showYearDropdown
              showMonthDropdown
              dropdownMode='select'
            />
            <div className='modal-footer'>
              <button
                className='cancel-btn'
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className='save-btn' onClick={() => setShowModal(false)}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerModal;

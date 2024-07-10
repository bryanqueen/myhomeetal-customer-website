import React from 'react';

const SelectOption = ({ options, onChange }: { options: { value: string, label: string, image: string }[], onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  return (
    <div className="relative inline-block w-full text-gray-700">
      <select
        onChange={onChange}
        className="appearance-none h-10 w-full pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
        style={{ backgroundImage: 'url("/path/to/arrow-down-icon.svg")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center' }}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value} style={{ backgroundImage: `url(${option.image})`, backgroundRepeat: 'no-repeat', paddingLeft: '1.5rem' }}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectOption;

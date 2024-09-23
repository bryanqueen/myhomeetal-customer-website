import Select, {
  components,
  DropdownIndicatorProps,
  MultiValue,
  SingleValue,
} from 'react-select';
import Image from 'next/image';
import cn from 'classnames';

export type SelectValue =
  | MultiValue<string | number>
  | SingleValue<string | number>;

export interface SelectOption {
  value?: string | number | boolean;
  label: string;
}

export interface SelectInputProps {
  isMulti?: boolean;
  isLoading?: boolean;
  options: SelectOption[];
  block?: boolean;
  placeholder?: string;
  labelKey?: string;
  value?: string | number | boolean | SelectOption;
  defaultValue?: string | number | boolean | SelectOption;
  defaultInputValue?: string;
  isDisabled?: boolean;
  onChange?: (e: SelectOption) => void;
  name?: string;
  errorKey?: string;
}

const controlStyles = {
  base: 'border border-[#D9D9D9] h-[50px] md:h-[70px] rounded-2xl bg-white hover:cursor-pointer mt-2 px-4 py-2.5',
  focus: 'border-primary ring-1 ring-primary',
  nonFocus: 'border-gray-400/50',
};
const placeholderStyles = 'text-gray-400 pl-1 py-0.5';
const selectInputStyles = 'pl-1 py-0.5';
const valueContainerStyles = 'p-1 gap-1';
const singleValueStyles = 'leading-7 ml-1';
const multiValueStyles =
  'bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5';
const multiValueLabelStyles = 'leading-6 py-0.5';
const multiValueRemoveStyles =
  'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md';
const indicatorsContainerStyles = 'p-1 gap-1';
const clearIndicatorStyles =
  'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800';
const indicatorSeparatorStyles = 'hidden';
const dropdownIndicatorStyles =
  'p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black';
const menuStyles = 'p-1 mt-2 border border-gray-200 bg-white rounded-lg';
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm';
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded',
  focus: 'bg-primary/10 active:bg-gray-200',
  selected: "after:content-['✔'] after:ml-2 after:text-primary text-gray-500",
};
const noOptionsMessageStyles =
  'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm';

// Solves 'react-select inside radix-ui dialog not working properly'
const onBlurWorkaround = (event: React.FocusEvent<HTMLInputElement>) => {
  const element = event.relatedTarget;
  if (
    element &&
    (element.tagName === 'A' ||
      element.tagName === 'BUTTON' ||
      element.tagName === 'INPUT')
  ) {
    (element as HTMLElement).focus();
  }
};

const SelectInput = ({
  isMulti,
  isLoading,
  isDisabled,
  options,
  placeholder,
  labelKey,
  value,
  defaultInputValue,
  defaultValue,
  name,
  onChange,
  errorKey,
  ...props
}: SelectInputProps) => {
  return (
    <div className='relative'>
      <label className='text-capitalize text-gray-700'>{labelKey}</label>
      <Select
        id={name}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder ?? 'Select...'}
        isLoading={isLoading}
        isMulti={isMulti}
        options={options}
        defaultInputValue={defaultInputValue}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        unstyled
        // @ts-ignore
        components={{ DropdownIndicator }}
        styles={{
          input: (base) => ({
            ...base,
            'input:focus': {
              boxShadow: 'none',
            },
          }),
          // On mobile, the label will truncate automatically, so we want to
          // override that behaviour.
          multiValueLabel: (base) => ({
            ...base,
            whiteSpace: 'normal',
            overflow: 'visible',
          }),
          control: (base) => ({
            ...base,
            transition: 'none',
          }),
        }}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            cn(
              isFocused && optionStyles.focus,
              isSelected && optionStyles.selected,
              optionStyles.base
            ),
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        onBlur={onBlurWorkaround}
        {...props}
      />
      {errorKey && (
        <p className='my-2 text-xs text-red-500 first-letter:capitalize'>
          {errorKey}
        </p>
      )}
    </div>
  );
};

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image src='/icons/dropdown.svg' alt='' width='15' height='20' />
    </components.DropdownIndicator>
  );
};

export default SelectInput;

import { Item, Indicator } from '@radix-ui/react-radio-group';

interface Props {
  id: string;
  value: string;
  labelKey?: string;
}

const RadioItem = ({ id, value, labelKey }: Props) => {
  return (
    <div className='flex items-center'>
      <Item
        className='peer h-[20px] w-[20px] cursor-default rounded-full bg-white shadow-[0_0_0_1px] shadow-gray-300 outline-none focus:shadow-black'
        value={value}
        id={id}
      >
        <Indicator className="relative flex h-full w-full items-center justify-center after:block after:h-full after:w-full after:rounded-[50%] after:border-[5px] after:border-primary after:bg-white after:content-['']" />
      </Item>
      {labelKey && (
        <label
          className='pl-[10px] leading-none peer-checked:font-bold'
          htmlFor={id}
        >
          {labelKey}
        </label>
      )}
    </div>
  );
};

export default RadioItem;

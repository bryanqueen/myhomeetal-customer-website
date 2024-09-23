import { Message, Shop } from "iconsax-react";
import Button from "../Button";
import SelectInput, { SelectOption } from "../SelectInput"
import * as RadioGroup from '@radix-ui/react-radio-group';

interface RadioItemProps {
  id: string;
  value: string;
  labelKey: string;
  address: string;
  hours: string;
  contact: string;
}

const RadioItem = ({ id, value, labelKey, address, hours, contact }: RadioItemProps) => {
  return (
    <div className="flex max-sm:gap-5 text-sm md:text-base max-sm:flex-col py-8 border-b">
      <div className="flex md:basis-1/2 gap-4 items-start">
        {/* Radio Button */}
        <RadioGroup.Item
          className="bg-white w-5 h-5 rounded-full border-2 border-red-500"
          id={id}
          value={value}
        >
          <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-3 after:h-3 after:rounded-full after:bg-red-500" />
        </RadioGroup.Item>


        {/* Label and Additional Info */}
        <label className="flex-1 max-w-[312px]" htmlFor={id}>
          <div>{labelKey}</div>
          <p className="mt-2">{address}</p>
        </label>
      </div>
      <div className="md:basis-1/2">
        <div className="grid gap-4">
          <div className="flex items-center gap-4">
            <Shop variant="Bulk" color="#292D32" size={16} />
            <div>
              <p className="text-sm font-clashmd">
                Opening Hours:
              </p>
              {hours}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Message variant="Bulk" color="#292D32" size={16} />
            <div>
              <p className="text-sm font-clashmd">
                Contact Information:
              </p>
              {contact}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

const IsPickUp = () => {
  const categoryOptions: SelectOption[] = [
    { value: 1, label: 'Category 1' },
    { value: 2, label: 'Category 2' },
    { value: 3, label: 'Category 3' },
  ];

  const handleSelectChange = (selectedOption: SelectOption) => {
    console.log('Selected Option:', selectedOption);
  };
  return (
    <div className='absolute top-[50%] min-w-full translate-y-[-50%] px-[3%]'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='mt-10 rounded-xl bg-[#f4f4f4] px-5 pt-7 pb-5 lg:py-10 lg:mx-auto lg:mt-24 lg:block lg:max-w-4xl lg:rounded-2xl'
      >
        <h2 className="lg:text-2xl font-clashmd">Select a Pick-up station</h2>
        <div className="grid text-sm lg:text-base md:grid-cols-2 gap-3 lg:gap-5 mt-6">
          <SelectInput
            options={categoryOptions}
            onChange={handleSelectChange}
            placeholder="Lagos"
            labelKey="State"
            isMulti={false}
          />
          <SelectInput
            options={categoryOptions}
            onChange={handleSelectChange}
            placeholder="All cities"
            labelKey="Cities"
            isMulti={false}
          />
        </div>
        <div className="h-[220px] md:h-[200px] mt-3 overflow-y-scroll custom-scrollbar">
          <RadioGroup.Root
            className="flex flex-col"
            defaultValue=""
            aria-label="Pick-up Station"
          >
            {/* Radio Items */}
            <RadioItem
              id="station1"
              value="station1"
              labelKey="My Homeetal Anthony Pickup Station"
              address="57, Adebayo Mokolu Street, Anthony village, Ikeja Lagos State."
              hours="Mon-Fri 8am - 5pm, Sat 9am - 5pm"
              contact="MyHome etal 08160016673"
            />
            <RadioItem
              id="station2"
              value="station2"
              labelKey="My Homeetal Anthony Pickup Station"
              address="5,Anthony village Road, Ikeja Lagos State."
              hours="Mon-Fri 8am - 5pm, Sat 9am - 5pm"
              contact="MyHome etal 08160016673"
            />
            <RadioItem
              id="station3"
              value="station3"
              labelKey="My Homeetal Ijebu Pickup Station"
              address="16, Eroko Street Ijebuode, Ogun State"
              hours="Mon-Fri 8am - 5pm, Sat 9am - 5pm"
              contact="MyHome etal 08160016673"
            />
          </RadioGroup.Root>
        </div>
        <div className="pt-5">
          <Button className="rounded-full w-full h-[50px] lg:h-[60px] font-clashmd border-0 shadow-none">
            Set as Pickup statation
          </Button>
        </div>
      </div>
    </div>
  )
}

export default IsPickUp

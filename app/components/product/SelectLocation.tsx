'use client';
import { locations } from '@/app/utils/constants';
import { Box1, Shop } from 'iconsax-react';
import { useEffect, useState } from 'react';

export default function SelectLocation() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryDates, setDeliveryDates] = useState({ start: '', end: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const calculateDeliveryDates = () => {
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(today.getDate() + 1); // Start date is tomorrow
      const endDate = new Date();
      endDate.setDate(today.getDate() + 4); // End date is three days after the start date

      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
      };

      setDeliveryDates({
        start: startDate.toLocaleDateString('en-GB', options),
        end: endDate.toLocaleDateString('en-GB', options),
      });
    };
    calculateDeliveryDates();
  }, []);

  const handleSelectChange = (location, fee) => {
    setSelectedLocation(location);
    setDeliveryFee(fee);
    setDropdownOpen(false); // Close dropdown after selection
  };

  const filteredLocations = locations.map((state) => ({
    ...state,
    lga: state.lga.filter((lga) =>
      lga.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  return (
    <div className="h-[355px] w-full rounded-[20px] bg-[#f4f4f4] px-6">
      <h2 className="py-5 text-center text-xs text-black">
        Select your Location
      </h2>
      <div>
        <input
          type="text"
          placeholder={selectedLocation || 'Select your location...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="h-[50px] w-full rounded-[10px] bg-white px-4 placeholder:text-xs placeholder:text-[#989898] lg:h-[56px] lg:rounded-xl lg:placeholder:text-sm lg:placeholder:text-black"
        />
        {dropdownOpen && (
          <div className="relative">
            <div className="absolute z-10 mt-2 max-h-[300px] custom-scrollbar w-full overflow-y-scroll rounded-[10px] bg-white shadow-lg">
              {filteredLocations.map(
                (state, index) =>
                  state.lga.length > 0 && (
                    <div key={index} className="mb-2">
                      <div className="bg-gray-100 px-4 py-2 text-sm font-clashmd text-gray-700">
                        {state.state}
                      </div>
                      {state.lga.map((lga, i) => (
                        <div
                          key={i}
                          onClick={() => handleSelectChange(lga.name, lga.fee)}
                          className={`cursor-pointer px-4 py-2 text-xs ${selectedLocation === lga.name
                              ? 'bg-gray-200'
                              : 'hover:bg-gray-100'
                            }`}
                        >
                          {lga.name}
                        </div>
                      ))}
                    </div>
                  )
              )}
            </div>
          </div>
        )}
        <div className="mt-5 h-[200px] w-full">
          <div className="mb-2 flex h-[92px] w-full gap-3 px-2">
            <div className="flex w-[36px]">
              <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[5px] border border-[#DCDCDC]">
                <Shop size="16" color="#292D32" variant="Bulk" />
              </div>
            </div>
            <div className="flex w-[80%] flex-col">
              <h2 className="font-clashmd text-sm text-black">
                Pickup Station
              </h2>
              <p className="my-1 text-xs text-black">Delivery Fees ₦ 0</p>
              <p className="text-xs text-black">
                Available for pickup now. Order within the next 24hrs to secure
                your item.
              </p>
            </div>
          </div>
          <div className="flex h-[92px] w-full gap-3 px-2">
            <div className="flex w-[36px]">
              <div className="flex h-[36px] w-[36px] items-center justify-center rounded-[5px] border border-[#DCDCDC]">
                <Box1 size="16" color="#292D32" variant="Bulk" />
              </div>
            </div>
            <div className="flex w-[80%] flex-col">
              <h2 className="font-clashmd text-sm text-black">Door Delivery</h2>
              <p className="my-1 text-xs text-black">
                Delivery Fees ₦{deliveryFee}
              </p>
              {deliveryDates && (
                <p className="text-xs text-black">
                  Arriving at pickup station between {deliveryDates.start} &{' '}
                  {deliveryDates.end} when you order within next 3hrs 51mins
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import Button from "../Button"
import Input from "../Input"

const AddAddressModal = ({ setMyAddress,
  handlePhoneChange,
  error,
  selectedLocation,
  searchTerm,
  setSearchTerm,
  setDropdownOpen,
  dropdownOpen,
  filteredLocations,
  handleSelectChange,
  createMyAddress,
  isAddLoading }: {
    setMyAddress: (address: string) => void;
    handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
    selectedLocation: string;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
    setDropdownOpen: (dropdownOpen: boolean) => void;
    dropdownOpen: boolean;
    filteredLocations;
    handleSelectChange: (location: string) => void;
    createMyAddress: () => void;
    isAddLoading: boolean;
  }) => {

  const renderLocationDropdown = () => (
    <div className="grid gap-2">
      <input
        type="text"
        placeholder={selectedLocation || "Select your location..."}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="h-[50px] w-full rounded-[10px] bg-white px-4 text-xs placeholder:text-[#989898] lg:h-[56px] lg:rounded-xl lg:text-sm placeholder:lg:text-black"
      />
      {dropdownOpen && (
        <div className="relative">
          <div className="absolute z-10 mt-2 h-[150px] custom-scrollbar w-full overflow-y-scroll rounded-[10px] bg-white shadow-lg">
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
                        onClick={() => handleSelectChange(lga.name)}
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
    </div>
  );

  return (
    <div className='absolute top-[50%] min-w-full translate-y-[-50%] px-[3%]'>
      <div
        onClick={(e) => e.stopPropagation()}
        className='mt-10 rounded-xl bg-[#f4f4f4] px-5 py-10 lg:mx-auto lg:mt-24 lg:block lg:max-w-[582px] lg:rounded-2xl'
      >
        <div className='mx-auto grid gap-5 lg:max-w-[503px]'>
          <Input
            name='address'
            onChange={(e) => setMyAddress(e.target.value)}
            labelKey='Delevery Address'
            placeholder='Enter a Valid address'
            labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
            inputClassName='h-[50px] w-full lg:text-sm text-xs rounded-[10px] lg:rounded-2xl lg:h-[56px] bg-white placeholder:text-xs placeholder:text-[#989898] lg:placeholder:text-sm lg:placeholder:text-black'
          />
          <Input
            name='phoneNumber'
            onChange={handlePhoneChange}
            errorKey={error}
            labelKey='Phone Number'
            placeholder='Enter your Phone Number'
            labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
            inputClassName='h-[50px] lg:text-sm text-xs rounded-[10px] lg:rounded-2xl lg:h-[56px] bg-white placeholder:text-xs placeholder:text-[#989898] lg:placeholder:text-sm lg:placeholder:text-black'
          />
          <div className='grid gap-2'>
            <label className='font-clashmd text-[10px] text-black lg:font-clash lg:text-xs'>
              City
            </label>
            {renderLocationDropdown()}
          </div>
        </div>
        <div className='hidden items-center justify-center lg:flex'>
          <Button
            onClick={createMyAddress}
            loading={isAddLoading}
            disabled={isAddLoading}
            className='mx-auto mt-10 h-[50px] w-full max-w-[391px] rounded-full border-0 bg-primary text-center font-clashmd text-base text-white shadow-none'
          >
            Create a New Address
          </Button>
        </div>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className='flex items-center justify-center lg:hidden'
      >
        <Button
          onClick={createMyAddress}
          loading={isAddLoading}
          disabled={isAddLoading}
          className='mx-auto mt-14 h-[50px] min-w-full rounded-[10px] border-0 bg-primary text-center font-clashmd text-base text-white shadow-none'
        >
          Create a New Address
        </Button>
      </div>
    </div>
  )
}

export default AddAddressModal

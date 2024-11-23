import Button from "../Button";
import Input from "../Input";

interface EditAddressModalProps {
  addressInWords: string;
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
  editMyAddress: () => void;
  isUpdateLoading: boolean;
  myAddress: string;
  phoneNumber: string;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({
  addressInWords,
  setMyAddress,
  handlePhoneChange,
  error,
  selectedLocation,
  searchTerm,
  setSearchTerm,
  setDropdownOpen,
  dropdownOpen,
  filteredLocations,
  handleSelectChange,
  editMyAddress,
  isUpdateLoading,
  myAddress,
  phoneNumber,
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
    <div className="absolute top-[40%] mt-20 min-w-full translate-y-[-50%] px-[3%] lg:min-w-[1115px] lg:px-0">
      <div
        onClick={(e) => e.stopPropagation()}
        className="mx-auto rounded-2xl bg-[#f4f4f4] px-5 py-10 lg:mt-24 lg:min-w-[1115px]"
      >
        <div className="grid-cols-2 gap-5 lg:grid">
          <div>
            <p className="font-clashmd text-xs lg:text-base">
              Address {addressInWords}
            </p>
            <p className="max-w-[243px] text-[10px] lg:max-w-[497px] lg:text-sm">
              Ensure the details entered are accurate to avoid issues during
              product delivery
            </p>
          </div>
          <div className="hidden gap-2 lg:grid">
            <label className="font-clashmd text-[10px] text-black lg:font-clash lg:text-xs">
              City
            </label>
            {renderLocationDropdown()}
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Input
            name="address"
            value={myAddress}
            onChange={(e) => setMyAddress(e.target.value)}
            labelKey="Delivery Address"
            placeholder="Enter a valid address"
            labelClassName="text-[10px] font-clashmd lg:font-clash lg:text-xs text-black"
            inputClassName="h-[56px] text-xs bg-white placeholder:text-sm placeholder:text-black"
          />
          <Input
            name="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneChange}
            errorKey={error}
            labelKey="Phone Number"
            placeholder="Enter your phone number"
            labelClassName="text-[10px] font-clashmd lg:font-clash lg:text-xs text-black"
            inputClassName="h-[56px] text-xs bg-white placeholder:text-sm placeholder:text-black"
          />
          <div className="grid gap-2 lg:hidden">
            <label className="font-clashmd text-[10px] text-black lg:font-clash lg:text-xs">
              City
            </label>
            {renderLocationDropdown()}
          </div>
        </div>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-center"
      >
        <Button
          onClick={editMyAddress}
          disabled={isUpdateLoading}
          loading={isUpdateLoading}
          className="mx-auto mt-10 h-[50px] w-full max-w-[391px] rounded-[10px] bg-primary text-center font-clashmd text-base text-white lg:rounded-full"
        >
          Update Address
        </Button>
      </div>
    </div>
  );
};

export default EditAddressModal;
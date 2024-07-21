import Input from '@/app/components/Input';
import PhoneInputComponent from '@/app/components/account/phoneNumber';

export default function PersonalInformationForm() {
  return (
    <div>
      {/**Mobile form */}
      <form action='' className='mt-4 lg:hidden'>
        <div className='rounded-[10px] bg-[#F4F4F4] px-4 py-5'>
          <div className='flex items-center justify-between'>
            <div className='flex w-fit items-center gap-3'>
              <span className='flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FFE0E0] text-[8px] text-myGray'>
                1
              </span>
              <p className='text-xs text-myGray'>Personal Information</p>
            </div>
            <p className='text-[10px] text-primary'>Edit information</p>
          </div>

          <div className='mt-5 grid gap-[14px]'>
            <div className='relative'>
              <Input
                name='firstName'
                type='text'
                variant='outline'
                inputClassName='border-0 h-[65px] rounded-[10px] text-xs placeholder:text-[#989898]'
                placeholder='Oluwafemi'
              />
            </div>
            <div className='relative'>
              <Input
                name='lastName'
                placeholder='Odunayo'
                type='text'
                variant='outline'
                inputClassName='border-0 h-[65px] rounded-[10px] text-xs placeholder:text-[#989898]'
              />
            </div>
            <div className='relative'>
              <Input
                name='email'
                placeholder='Somtoochukwu@gmail.com'
                type='text'
                variant='outline'
                inputClassName='border-0 h-[65px] rounded-[10px] text-xs placeholder:text-[#989898]'
              />
            </div>
            <Input
              name='password'
              type='password'
              variant='outline'
              inputClassName='bg-white h-[60px] lg:h-[56px] border-0 rounded-[10px] lg:rounded-2xl placeholder:text-[#989898]'
              placeholder='*********'
            />
            <div className='grid gap-2'>
              <PhoneInputComponent />
            </div>
          </div>
        </div>
      </form>

      {/**Desktop form */}
      <form action='' className='hidden lg:block'>
        <div className='my-10 rounded-2xl border border-[#F4F4F4] p-3 pb-5'>
          <div className='mb-3 flex justify-between pt-3'>
            <div className='flex items-center gap-3'>
              <p className='text-base text-myGray'>Personal Information</p>
            </div>
            <p className='font-clashmd text-base text-primary'>
              Edit information
            </p>
          </div>
          <div className='rounded-xl bg-[#F4F4F4] p-5 py-7'>
            <div className='mb-5 grid gap-5 md:grid-cols-2'>
              <Input
                name='firstName'
                labelKey='First Name'
                type='text'
                variant='outline'
                inputClassName='border-0 rounded-2xl placeholder:text-[#989898]'
                placeholder='Oluwafemi'
                labelClassName='text-myGray font-clashmd text-base'
              />
              <Input
                name='lastName'
                labelKey='Last Name'
                type='text'
                variant='outline'
                inputClassName='border-0 rounded-2xl placeholder:text-[#989898]'
                placeholder='Odunayo'
                labelClassName='text-myGray font-clashmd text-base'
              />
            </div>
            <Input
              name='email'
              labelKey='Email adress'
              type='text'
              variant='outline'
              inputClassName='border-0 rounded-2xl mb-3 placeholder:text-[#989898]'
              placeholder='No 3 Kayode Arikawe Street, ikosi, Ketu, Lagos.'
              labelClassName='text-myGray font-clashmd text-base'
            />
            <div className='mb-5 grid gap-5 md:grid-cols-2'>
              <Input
                name='password'
                labelKey='Password'
                type='password'
                variant='outline'
                inputClassName='bg-[#F4F4F4] lg:bg-white h-[60px] lg:h-[56px] border-0 rounded-[10px] lg:rounded-2xl placeholder:text-[#989898]'
                placeholder='*********'
                labelClassName='lg:text-myGray lg:text-base text-black text-[8px] font-clashmd'
              />
              <div className='grid gap-2'>
                <label className='font-clashmd text-[8px] text-black lg:text-base lg:text-myGray'>
                  Phone Number
                </label>
                <PhoneInputComponent />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

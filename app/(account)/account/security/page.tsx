import PhoneInputComponent from '@/app/components/account/phoneNumber';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Security | Myhomeetal',
};

function SecurityPage() {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <main className='px-[3%] lg:px-0'>
      <div className='flex items-center py-5 pl-1 lg:hidden'>
        <Button
          href={previousPath}
          className='justify-start font-clashmd text-xs text-myGray lg:justify-center lg:font-clash lg:text-sm'
          linkType='rel'
          variant='ghost'
        >
          <ArrowLeftIcon
            width={17}
            className=' mr-[2px] mt-[-1px] lg:mr-1 lg:mt-[-3px]'
          />
          Back
        </Button>
        <p className='text-center font-clashmd text-xs text-myGray lg:hidden'>
          Security
        </p>
      </div>
      <div className='hidden lg:block'>
        <h1 className='font-clashmd text-3xl text-myGray'>Security</h1>
        <p className='py-2 text-base text-[#7C7C7C]'>
          Our robust measures ensure your data remains protected, giving you a
          worry-free browsing and shopping experience.
        </p>
      </div>

      <div className='mt-20 max-w-[1110px] lg:mt-14'>
        <form action=''>
          <div className='w-full lg:rounded-2xl lg:border lg:border-[#F4F4F4] lg:p-5'>
            <div className='mb-5 hidden items-center justify-end lg:flex'>
              <button className='font-clashmd text-base text-primary'>
                Edit information
              </button>
            </div>
            <div className='lg:rounded-xl lg:bg-[#F4F4F4] lg:p-5 lg:py-7'>
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
              <Input
                name='email'
                labelKey='Email adress'
                type='text'
                variant='outline'
                inputClassName='bg-[#F4F4F4] lg:bg-white h-[60px] lg:h-[56px] border-0 rounded-[10px] lg:rounded-2xl placeholder:text-[#989898]'
                placeholder='test.oluwafemi@gmail.com'
                labelClassName='lg:text-myGray lg:text-base text-black text-[8px] font-clashmd'
              />
            </div>
            <div className='mt-10 flex items-center justify-center lg:mb-5 lg:hidden lg:justify-end'>
              <button className='font-clashmd text-xs text-primary lg:text-base'>
                Edit information
              </button>
            </div>
            <div></div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default SecurityPage;

import Image from 'next/image';
import Accordion from '@/app/components/Accordion';
import ReferralDashBoard2 from '@/app/components/account/ReferralDashboard2';
import SearchForm from '@/app/components/forms/SearchForm';
import ReferralSteps from '@/app/components/RefHIWCard';

export default async function ReferralPage() {

  return (
    <main className='mx-[3%] pb-20 pt-[165px] lg:pt-0'>
      <div className='fixed left-0 right-0 top-[83px] z-20 bg-white px-[3%] py-4 lg:hidden'>
        <SearchForm />
      </div>
      <section>
        <ReferralDashBoard2 />
      </section>
      <section>
        <div className='mt-5 lg:mt-7'>
          <Image
            src='/images/referral.svg'
            width={2000}
            height={280}
            alt='referral'
            loading='lazy'
            className='hidden lg:block w-full'
          />
          <Image
            src='/images/mobref.svg'
            width={1360}
            height={280}
            alt='referral'
            loading='lazy'
            className='lg:hidden'
          />
        </div>
      </section>
      <section className='mt-20'>
        <h2 className='mb-3 text-center font-clashmd text-base text-myGray lg:text-[39px]'>
          How it works{' '}
        </h2>
        <p className='mx-auto max-w-[288px] text-center text-xs leading-[14.76px] text-[#525252] lg:max-w-[421px] lg:text-base lg:leading-[19.09px]'>
          Invite your friends to shop with us and earn exciting rewards for
          every successful referral.
        </p>
        <div className='mt-16'>
          <ReferralSteps />
        </div>
      </section>
      <section className='mt-20'>
        <h2 className='mx-auto mb-3 text-center font-clashmd text-base text-myGray lg:max-w-[352px] 2xl:max-w-full lg:text-[39px] lg:leading-[47.97px]'>
          Frequently Asked Question
        </h2>
        <p className='mx-auto mb-16 max-w-[321px] text-center font-clashmd text-sm leading-[14.76px] text-[#525252] lg:max-w-[421px] lg:font-clash lg:text-base lg:leading-[19.09px]'>
          Invite your friends to shop with us and earn exciting rewards for
          every successful referral.
        </p>
        <Accordion />
      </section>
    </main>
  );
}

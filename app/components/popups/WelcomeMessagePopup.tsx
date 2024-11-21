'use client';
import { useEffect, useState } from 'react'
import Logo from '../Logo'
import Image from 'next/image'

const WelcomeMessagePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if the popup should be shown
    const lastShown = localStorage.getItem('welcomePopupLastShown');
    const now = Date.now();

    // Show popup only if it hasn't been shown before or after 24 hours (86400000 ms)
    if (!lastShown || now - Number(lastShown) > 3600000) {
      setShowPopup(true);
      localStorage.setItem('welcomePopupLastShown', now.toString()); // Update the last shown timestamp
    }
  }, [])

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [showPopup])
  return (
    <>
      {showPopup && (
        <div className='fixed z-[1000] myFlex top-0 bottom-0 right-0 left-0 bg-black/65'>
          <div className="bg-white relative myFlex rounded-[13.68px] w-[95vw] md:w-[456px] h-[420px]">
            {/**Close Button */}
            <div
              onClick={() => setShowPopup(false)}
              className='myFlex absolute -top-12 md:-top-8 right-0 md:-right-8 size-[27px] rounded-full bg-white'
            >
              <Image
                src="/icons/X.svg"
                alt='X icon'
                width={10}
                height={10}
                loading='eager'
              />
            </div>
            {/**Background rectanglular shape images */}
            <Image
              src="/images/rectangle.svg"
              alt='icon'
              width={155}
              height={433.84}
              loading='eager'
              className='absolute top-0 left-0'
            />
            <Image
              src="/images/rectangle2.svg"
              alt='icon'
              width={140}
              height={433.84}
              loading='eager'
              className='absolute right-0 top-0'
            />
            <div className="w-[70%] md:w-[317.39px] min-h-full bg-[url('/images/celebration.svg')] bg-cover bg-center bg-no-repeat myFlex flex-col gap-3">
              <div className='max-w-[265.85px] myFlex flex-col gap-3'>
                <Image
                  src="/images/confetti2.png"
                  width={53.35}
                  height={53.35}
                  loading='eager'
                  alt='confetti'
                />
                <h1 className='text-center font-clashmd text-2xl'>
                  Welcome back, Valued Shopper!
                </h1>
                <p className='text-sm text-center leading-[15.99px]'>
                  We’re glad to see you again! 🎉 Check out our latest
                  arrivals and exclusive deals waiting just for you.
                </p>
              </div>
            </div>

            <div className='absolute bottom-5 left-5'>
              <Logo variant={3} />
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default WelcomeMessagePopup

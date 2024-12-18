import Link from "next/link";

const TopBanner = () => {
  return (
    <div className='hidden relative z-50 h-[43px] items-center justify-center bg-primaryBg text-center text-sm text-white lg:flex'>
      <p>
        myhomeetal.com is absolutely your one-stop store for genuine and
        affordable products! -{' '}
        <Link href='/about' className='font-clashmd'>Learn more about us</Link>
      </p>
    </div>
  );
};

export default TopBanner;

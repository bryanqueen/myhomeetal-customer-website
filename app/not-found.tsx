import Navigation from './components/Navigation';
import TopBanner from './components/banner/TopBanner';
import Button from './components/Button';
import MainFooter from './components/MainFooter';

const NotFound = () => {
  return (
    <main>
      <TopBanner />
      <Navigation />
      <div className='flex min-h-[80vh] flex-col items-center justify-center'>
        <h1 className='font-clashmd text-[20px] mb-2 lg:mb-0 lg:text-[49px]'>
          Why wasn&apos;t this page found?
        </h1>
        <p className='mb-10 max-w-[70%] lg:max-w-[589px] text-center text-xs lg:text-[25px] lg:leading-[30.75px]'>
          Oops! Looks like this page is on vacation, exploring fashion trends
          across the globe.
        </p>
        <Button
          className='h-[50px] min-w-[300px] rounded-full border-0 font-clashmd text-base shadow-none lg:h-[56px] lg:min-w-[516px]'
          linkType='rel'
          href='/'
        >
          Go back to Home
        </Button>
      </div>
      <MainFooter />
    </main>
  );
};

export default NotFound;

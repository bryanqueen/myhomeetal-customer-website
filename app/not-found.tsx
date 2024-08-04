import Navigation from './components/Navigation';
import TopBanner from './components/banner/TopBanner';
import MainFooter from './components/MainFooter';
import VoidCard from './components/VoidCard';

const NotFound = () => {
  return (
    <main>
      <TopBanner />
      <Navigation />
      <div className='flex min-h-[100vh] items-center justify-center'>
        <VoidCard
          title="Why wasn't this page found?"
          bodyText='Oops! Looks like this page is on vacation, exploring fashion trends across the globe.'
          btnText='Go back to Home'
          link='/'
        />
      </div>

      <MainFooter />
    </main>
  );
};

export default NotFound;

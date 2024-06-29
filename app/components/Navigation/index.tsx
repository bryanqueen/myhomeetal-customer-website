import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navigation = () => {
  return (
    <div className='fixed left-0 right-0 top-0 z-[2000] max-h-screen bg-white lg:sticky'>
      <MobileNav />
      <DesktopNav />
    </div>
  );
};

export default Navigation;

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navigation = () => {
  return (
    <div className='fixed left-0 right-0 top-0 z-[50] max-h-screen lg:sticky lg:bg-white'>
      <MobileNav />
      <DesktopNav />
    </div>
  );
};

export default Navigation;

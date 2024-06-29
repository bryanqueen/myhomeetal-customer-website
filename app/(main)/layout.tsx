import TopBanner from '@/app/components/banner/TopBanner';
import MainFooter from '@components/MainFooter';
import Navigation from '@components/Navigation';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='mt-36 lg:mt-0'>
      <TopBanner />
      <Navigation />
      {children}
      <MainFooter />
    </div>
  );
}

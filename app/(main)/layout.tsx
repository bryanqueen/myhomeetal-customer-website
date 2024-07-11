import TopBanner from '@/app/components/banner/TopBanner';
import MainFooter from '@components/MainFooter';
import Navigation from '@components/Navigation';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <TopBanner />
      <Navigation />
      {children}
      <MainFooter />
    </div>
  );
}

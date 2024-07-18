import TopBanner from '@/app/components/banner/TopBanner';
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
    </div>
  );
}

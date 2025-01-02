import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Navigation from '@components/Navigation';
import AccountSidebar from '@components/account/AccountSidebar';
import Back from '@/app/components/account/Back';
import { AuthError, verifyAuth } from '@/app/hooks/useCheckAuth';

export default async function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get('AUTH_TOKEN');
  
  // Get the request headers
  const headersList = headers();
  
  // Get the full URL from the referer or request URL
  const fullUrl = headersList.get('referer') || headersList.get('x-url') || '';
  
  // Extract just the pathname portion using URL
  let currentPath = '/account'; // default fallback
  try {
    if (fullUrl) {
      const url = new URL(fullUrl);
      currentPath = url.pathname;
    }
  } catch (e) {
    console.error('Error parsing URL:', e);
  }

  if (!token) {
    const redirectUrl = `/login?callbackUrl=${encodeURIComponent(currentPath)}`;
    redirect(redirectUrl);
  }

  try {
    await verifyAuth(token.value);
  } catch (error) {
    const redirectUrl = `/login?callbackUrl=${encodeURIComponent(currentPath)}`;
    if (error instanceof AuthError) {
      redirect(`${redirectUrl}&error=${encodeURIComponent(error.message)}`);
    }
    redirect(redirectUrl);
  }

  return (
    <div className='mt-20 lg:mt-0'>
      <Navigation />
      <Back />
      <div className='my-5 grid lg:grid-cols-[250px_1fr] lg:gap-10 lg:px-10'>
        <AccountSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
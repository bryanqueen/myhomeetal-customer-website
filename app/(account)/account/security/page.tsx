import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security | Myhomeetal',
};

function SecurityPage() {
  return (
    <main>
      <h1 className='text-3xl font-medium'>Security</h1>
      <p className='py-2 text-gray-500'>
        Our robust measures ensure your data remains protected, giving you a
        worry-free browsing and shopping experience.
      </p>
    </main>
  );
}

export default SecurityPage;

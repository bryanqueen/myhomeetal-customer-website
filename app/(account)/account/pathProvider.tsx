// app/account/PathProvider.tsx
'use client';
import { usePathname } from 'next/navigation';

export default function PathProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Add the pathname as a data attribute that can be read by the server component
  return (
    <div data-current-path={pathname}>
      {children}
    </div>
  );
}
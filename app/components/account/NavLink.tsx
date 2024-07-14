'use client';

import Link from 'next/link';
import { useSelectedLayoutSegment, usePathname } from 'next/navigation';
import cn from 'classnames';
import { twMerge } from 'tailwind-merge';

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();
  const isActive = href.split('/')[2] === segment || href === pathname;

  const className = twMerge(
    cn(
      'mb-3 flex items-center gap-3 rounded-lg p-3 py-4 text-[#989898] transition hover:bg-primary/30 hover:text-black focus:outline-primary',
      { 'bg-primary text-white hover:bg-primary hover:text-white': isActive }
    )
  );

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

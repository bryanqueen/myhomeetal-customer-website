import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// Components using this hook must be wrapped with Suspense boundary to prevent disabling SSR
export default function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleParamChange(name: string, value: string) {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    const query = params ? `?${params.toString()}` : '';
    router.push(`${pathname}${query}`);
  }

  return { searchParams, handleParamChange };
}

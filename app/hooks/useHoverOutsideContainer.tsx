import { useEffect } from 'react';

export default function useHoverOutsideContainer(ref: any, action: () => void) {
  useEffect(() => {
    function handleHoverOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    }
    document.addEventListener('hover', handleHoverOutside);

    return () => {
      document.removeEventListener('hover', handleHoverOutside);
    };
  }, [ref, action]);
}

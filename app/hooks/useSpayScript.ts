// useSpayScript.ts
import { useEffect, useState } from 'react';

const useSpayScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://testcheckout.spaybusiness.com/pay/static/js/spay_checkout.js';
    script.async = true;

    script.onload = () => {
      setIsLoaded(true);
      console.log('Spay script loaded successfully.');
    };

    script.onerror = () => {
      setError('Failed to load the Spay script.');
      console.error('Failed to load the Spay script.');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return { isLoaded, error };
};

export default useSpayScript;

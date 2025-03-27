import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { jwtVerify } from "jose";

export const useAuth = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [authenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    const verifyToken = async (token: string) => {
      try {
        if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
          throw new Error('NEXT_PUBLIC_JWT_SECRET is not defined in environment variables');
        }
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);

        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < currentTime) {
          throw new Error('Token has expired');
        }

        setAuthenticating(false);
      } catch (error) {
        console.error("Error verifying token:", error);
        redirectToLogin();
      }
    };

    const redirectToLogin = () => {
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
    };

    const authToken = Cookies.get("AUTH_TOKEN");
    if (!authToken) {
      redirectToLogin();
    } else {
      verifyToken(authToken);
    }
  }, [router, pathname]);

  return { authenticating };
};
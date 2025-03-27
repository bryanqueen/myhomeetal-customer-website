import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import { authService, LoginPayload } from "@services/authService";
import { apiUtils } from "@utils/apiUtils";
import { constants } from "@utils/constants";
import { ROUTES } from "@utils/routes";

export const useLogin = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);

  useEffect(() => {
    const callback = searchParams.get("callbackUrl");
    if (callback) {
      setCallbackUrl(callback);
    }
  }, [searchParams]);

  const loginMutate = useMutation(authService.login, {
    onSuccess: async (res: AxiosResponse<any>) => {
      const { data } = res;

      // Save the user's token and profile
      setCookie(constants.AUTH_TOKEN, data.token, { maxAge: 60 * 60 * 24 }); // 1 day
      setCookie(constants.USER_INFO, JSON.stringify(data.userProfile), {
        maxAge: 60 * 60 * 24,
      }); // 1 day

      // Notify the user
      toast.success("Login successful. Redirecting...");

      // try {
      //   // Authenticate with StarnetPro API
      //   const starnetProResponse = await axios.post(
      //     "https://api.clicknship.com.ng/Token",
      //     {
      //       username: "cnsdemoapiacct", // Replace with your merchant username
      //       password: "ClickNShip$12345", // Replace with your merchant password
      //       grant_type: "password",
      //     },
      //     {
      //       headers: { "Content-Type": "application/x-www-form-urlencoded", 'Access-Control-Allow-Origin': '*' },
      //     }
      //   );

      //   // Save the StarnetPro token
      //   console.log("starnetProResponse", starnetProResponse);
      //   const starnetProToken = starnetProResponse.data.token;
      //   setCookie("STARNETPRO_TOKEN", starnetProToken, {
      //     maxAge: 60 * 60 * 24,
      //   }); // 1 day

      //   console.log("StarnetPro token saved successfully");
      // } catch (error) {
      //   console.error("Error authenticating with StarnetPro:", error);
      //   toast.error(
      //     "Failed to authenticate with StarnetPro. Please try again."
      //   );
      // }

      // Redirect the user
      router.push(callbackUrl || ROUTES.HOME);
    },

    onError: (error: AxiosError<any>, variables) => {
      const { response } = error;
      const email = variables?.email;

      const resendOtp = async () => {
        const data: any = { email: email };
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}user/resend-otp`,
            data
          );

          if (res.status === 200) {
            toast.success("Code sent!");
          }
        } catch (error) {
          console.log(error);
        }
      };

      if (response?.data.error === "User email has not been verified") {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
        resendOtp();
      } else {
        setError(apiUtils.getAPIErrorMessage(response?.data.error));
      }
    },
  });

  const handleLogin = (payload: LoginPayload) => {
    setError("");
    loginMutate.mutate(payload);
  };

  return {
    handleLogin,
    loading: loginMutate.isLoading,
    error,
  };
};

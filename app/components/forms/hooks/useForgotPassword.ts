import { useState } from "react";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authService, ForgotPasswordPayload } from "@/app/services/authService";
import { apiUtils } from "@/app/utils/apiUtils";
import { ROUTES } from "@/app/utils/routes";

export const useForgotPassword = () => {
    const [error, setError] = useState ('');
    const router = useRouter();

    const forgotPasswordMutate = useMutation(authService.forgotPassword, {
        onSuccess: async (res) => {
            console.log(res);
            router.push(ROUTES.LOGIN);
            toast.success('Reset code sent')
        },
        onError: (error: AxiosError<any>) => {
            const { response } = error;
            setError(apiUtils.getAPIErrorMessage(response?.data.message));
        }
    });

    const handleForgotPassword = (payload: ForgotPasswordPayload) => {
            forgotPasswordMutate.mutate(payload)
    };

    return {
        handleForgotPassword,
        loading: forgotPasswordMutate.isLoading,
        error
    };
};
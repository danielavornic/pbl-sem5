import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { settingsApi } from "@/app/account/settings/queries";
import { authApi } from "@/app/auth/queries";
import useUserStore from "@/lib/user-store";
import { LoginCredentials } from "@/types";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Adresa de email este obligatorie" })
    .email({ message: "Introduceti o adresa de email valida" }),
  password: z.string().min(1, { message: "Parola este obligatorie" })
});

export const mfaFormSchema = z.object({
  otp: z.string().min(6, {
    message: "Codul OTP trebuie să conțină 6 caractere."
  })
});

const useLogin = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [isMFAOpen, setIsMFAOpen] = useState(false);
  const [loginData, setLoginData] = useState<LoginCredentials | null>(null);

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const mfaForm = useForm({
    resolver: zodResolver(mfaFormSchema),
    defaultValues: {
      otp: ""
    }
  });

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginCredentials) => authApi.login(data),
    onSuccess: (response) => {
      const { user, mfaEnabled } = response;

      if (mfaEnabled) {
        setLoginData(loginForm.getValues());
        setIsMFAOpen(true);
        toast.success("Te rugăm să introduci codul MFA primit pe email");
        return;
      }

      handleSuccessfulLogin(user);
    },
    onError: (error: any) => {
      toast.error("Eroare la autentificare", {
        description: error.response?.data?.message
      });
    }
  });

  const verifyMFAMutation = useMutation({
    mutationFn: (otp: string) => settingsApi.verifyOTP({ otp }),
    onSuccess: (response) => {
      const { user } = response;
      handleSuccessfulLogin(user);
      setIsMFAOpen(false);
    },
    onError: (error: any) => {
      toast.error("Cod MFA invalid", {
        description: error.response?.data?.message
      });
    }
  });

  const handleSuccessfulLogin = (user: any) => {
    if (!user) {
      toast.error("Eroare la autentificare");
      return;
    }

    setUser(user);
    if (user.isFirstLogin) {
      router.push("/?setup=true");
    } else {
      router.push("/");
    }

    queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  };

  const onLoginSubmit = (data: LoginCredentials) => loginMutation.mutate(data);

  const onMFASubmit = (values: { otp: string }) => {
    verifyMFAMutation.mutate(values.otp);
  };

  const onMFAClose = () => {
    setIsMFAOpen(false);
    mfaForm.reset();
  };

  return {
    loginForm,
    mfaForm,
    onLoginSubmit,
    onMFASubmit,
    onMFAClose,
    isMFAOpen,
    isLoginPending: loginMutation.isPending,
    isMFAPending: verifyMFAMutation.isPending
  };
};

export default useLogin;

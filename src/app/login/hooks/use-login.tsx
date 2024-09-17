"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { authApi } from "@/api/authApi";
import useUserStore from "@/lib/user-store";
import { UserLoginCredentials } from "@/types";

export const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Adresa de email este obligatorie" })
    .email({ message: "Introduceti o adresa de email valida" }),
  password: z.string().min(1, { message: "Parola este obligatorie" })
});

const useLogin = () => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserLoginCredentials) => authApi.login(data),
    onSuccess: (response) => {
      const { user } = response;

      if (user === null) {
        toast.error("Eroare la autentificare", {
          description: response.message
        });
        return;
      }

      setUser(user);
      if (user?.isFirstLogin) {
        router.push("/?setup=true");
      } else {
        router.push("/");
      }
    },
    onError: (error: any) => {
      toast.error("Eroare la autentificare", {
        description: error.response?.data?.message
      });
    }
  });

  const onSubmit = (data: UserLoginCredentials) => mutate(data);

  return { form, onSubmit, isPending };
};

export default useLogin;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import { z } from "zod";

import { authApi } from "@/api/authApi";
import { PASSWORD_REGEX } from "@/lib/auth";
import { UserRegisterCredentials } from "@/types";

export const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "Prenumele este obligatoriu" }),
    lastName: z.string().min(1, { message: "Numele este obligatoriu" }),
    email: z
      .string()
      .min(1, { message: "Adresa de email este obligatorie" })
      .email({ message: "Introduceți o adresă de email validă" }),
    phoneNumber: z
      .string()
      .min(1, { message: "Numărul de telefon este obligatoriu" })
      .refine(isValidPhoneNumber, { message: "Introduceți un număr de telefon valid" }),
    password: z
      .string()
      .min(8, { message: "Parola trebuie să conțină cel puțin 8 caractere" })
      .regex(
        PASSWORD_REGEX,
        "Parola trebuie să conțină cel puțin o literă mare, o literă mică, un număr și un caracter special"
      ),
    birthday: z
      .date({ message: "Data de naștere este obligatorie" })
      .refine(
        (date) => {
          const now = new Date();
          return date < now && now.getFullYear() - date.getFullYear() >= 13;
        },
        { message: "Trebuie să aveți cel puțin 13 ani" }
      )
      .refine(
        (date) => {
          return date < new Date();
        },
        { message: "Data de naștere nu poate fi in viitor" }
      ),
    confirmPassword: z.string().min(1, { message: "Confirmați parola" })
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Parolele nu se potrivesc",
        path: ["confirmPassword"]
      });
    }
  });

const useRegister = () => {
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [dialogEmail, setDialogEmail] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserRegisterCredentials) => authApi.register(data),
    onSuccess: () => {
      setShowEmailDialog(true);
      form.reset();
    },
    onError: (error: any) => {
      toast.error("Eroare la inregistrare", {
        description: error.response?.data?.message
      });
    }
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    mutate({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: data.password,
      birthday: data.birthday.toISOString()
    });

    // TODO: Remove after backend implementation
    setDialogEmail(data.email);
    setShowEmailDialog(true);
    form.reset();
  };

  return { form, onSubmit, isPending, showEmailDialog, setShowEmailDialog, dialogEmail };
};

export default useRegister;

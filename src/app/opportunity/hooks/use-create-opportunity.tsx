"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { opportunityApi } from "@/api/opportunityApi";
// import { useUploadFile } from "@/hooks/use-upload-file";
import { OpportunityCreateData } from "@/types";

const sessionSchema = z.object({
  date: z.string().min(1, { message: "Data este obligatorie" }),
  startTime: z.string().min(1, { message: "Ora de început este obligatorie" }),
  endTime: z.string().min(1, { message: "Ora de sfârșit este obligatorie" }),
  spotsLeft: z
    .number()
    .min(1, { message: "Numărul de locuri disponibile trebuie să fie de cel puțin 1" })
});

export const opportunityFormSchema = z.object({
  organizationId: z.number().optional(),
  title: z.string().min(1, { message: "Titlul este obligatoriu" }),
  description: z.string().min(1, { message: "Descrierea este obligatorie" }),
  region: z.string().min(1, { message: "Localitatea organizației este obligatorie" }),
  address: z.string().min(1, { message: "Adresa este obligatorie" }),
  isHighPriority: z.boolean(),
  sessions: z.array(sessionSchema).min(1, { message: "Trebuie să adăugați cel puțin o sesiune" }),
  categories: z.array(z.number()).min(1, { message: "Trebuie să selectați cel puțin o categorie" }),
  skills: z.array(z.number()).min(1, { message: "Trebuie să selectați cel puțin o abilitate" })
});

const useCreateOpportunity = () => {
  const form = useForm<z.infer<typeof opportunityFormSchema>>({
    resolver: zodResolver(opportunityFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      address: "",
      region: "",
      isHighPriority: false,
      sessions: [],
      categories: [],
      skills: []
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: OpportunityCreateData) => opportunityApi.create(data),
    onSuccess: () => {
      toast.success("Oportunitatea a fost creată cu succes", {
        description: "Oportunitatea a fost creată cu succes și va fi verificată de un administrator"
      });
      form.reset();
    },
    onError: (error: any) => {
      toast.error("Eroare la crearea oportunității", {
        description: error.response?.data?.message
      });
    }
  });

  const onSubmit = (data: z.infer<typeof opportunityFormSchema>) => {
    mutate({
      title: data.title,
      description: data.description,
      address: data.address,
      region: data.region,
      isHighPriority: data.isHighPriority,
      sessions: data.sessions,
      categories: data.categories,
      skills: data.skills
    });

    return;
  };

  return { form, onSubmit, isPending };
};

export default useCreateOpportunity;

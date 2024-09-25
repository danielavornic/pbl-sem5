"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isBefore, isSameDay, startOfDay } from "date-fns";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { opportunityApi } from "@/api/opportunityApi";
import { useUploadFile } from "@/hooks/use-upload-file";
import { OpportunityCreateData } from "@/types";

const sessionSchema = z
  .object({
    startTime: z
      .string()
      .nullable()
      .refine((val) => val !== null, { message: "Ora de început este obligatorie" }),
    endTime: z
      .string()
      .nullable()
      .refine((val) => val !== null, { message: "Ora de sfârșit este obligatorie" }),
    spotsLeft: z
      .number()
      .min(1, { message: "Numărul de locuri disponibile trebuie să fie de cel puțin 1" })
  })
  .superRefine((data, ctx) => {
    if (data.startTime && data.endTime) {
      const start = new Date(data.startTime);
      const end = new Date(data.endTime);
      const now = startOfDay(new Date());

      if (isBefore(start, now)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Data de început nu poate fi în trecut",
          path: ["startTime"]
        });
      }

      if (isBefore(end, start)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Data de sfârșit trebuie să fie după data de început",
          path: ["endTime"]
        });
      }

      if (!isSameDay(start, end)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Data de început și de sfârșit trebuie să fie în aceeași zi",
          path: ["endTime"]
        });
      }
    }
  });

export const opportunityFormSchema = z.object({
  title: z.string().min(1, { message: "Titlul este obligatoriu" }),
  description: z.string().min(1, { message: "Descrierea este obligatorie" }),
  region: z.string().min(1, { message: "Localitatea organizației este obligatorie" }),
  address: z.string().min(1, { message: "Adresa este obligatorie" }),
  isHighPriority: z.boolean(),
  sessions: z.array(sessionSchema).min(1, { message: "Trebuie să adăugați cel puțin o sesiune" }),
  categories: z.array(z.number()).min(1, { message: "Trebuie să selectați cel puțin o categorie" }),
  skills: z.array(z.number()).min(1, { message: "Trebuie să selectați cel puțin o abilitate" }),
  image: z.array(z.custom<File>())
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
      sessions: [{ startTime: "", endTime: "", spotsLeft: 0 }],
      categories: [],
      skills: [],
      image: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sessions"
  });

  const [canAddSession, setCanAddSession] = useState(false);

  const checkCanAddSession = () => {
    const lastSession = form.getValues("sessions").slice(-1)[0];

    if (!lastSession.startTime || !lastSession.endTime || lastSession.spotsLeft < 1) {
      setCanAddSession(false);
      return;
    }

    setCanAddSession(true);
  };

  useEffect(() => {
    const subscription = form.watch(() => {
      checkCanAddSession();
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile("imageUploader", {
    defaultUploadedFiles: []
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
    if (data.image.length === 0) {
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
    }

    onUpload(data.image);
  };

  useEffect(() => {
    if (uploadedFiles.length) {
      const formValues = form.getValues();
      const imageUrl = uploadedFiles[0].url;

      mutate({
        ...formValues,
        image: imageUrl
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles, form]);

  return {
    form,
    onSubmit,
    isPending,
    fields,
    append,
    remove,
    canAddSession,
    isUploading,
    progresses,
    uploadedFiles
  };
};

export default useCreateOpportunity;

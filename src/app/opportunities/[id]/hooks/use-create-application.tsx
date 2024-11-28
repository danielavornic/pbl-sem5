import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { applicationApi } from "@/api/applicationsApi";
import { useUploadFile } from "@/hooks/use-upload-file";
import { ApplicationPayload } from "@/types/application";

const applicationFormSchema = z.object({
  text: z.string().optional(),
  files: z.array(z.custom<File>())
});

export const useCreateApplication = ({
  opportunityId,
  onSuccess,
  sessions
}: {
  opportunityId: number;
  sessions: number[];
  onSuccess?: () => void;
}) => {
  const form = useForm<z.infer<typeof applicationFormSchema>>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      text: "",
      files: []
    }
  });

  const { onUpload, progresses, uploadedFiles, isUploading } = useUploadFile("imageUploader", {
    defaultUploadedFiles: []
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ApplicationPayload) => applicationApi.create(data),
    onSuccess: () => {
      toast.success("Aplicația a fost trimisă cu succes");
      form.reset();
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error("Eroare la trimiterea aplicației", {
        description: error.response?.data?.message
      });
    }
  });

  const onSubmit = async (data: z.infer<typeof applicationFormSchema>) => {
    if (data.files.length === 0) {
      mutate({
        opportunityId,
        text: data.text,
        sessions
      });
      return;
    }

    onUpload(data.files);
  };

  useEffect(() => {
    if (uploadedFiles.length) {
      const formValues = form.getValues();
      const files = uploadedFiles.map((f) => f.url);

      mutate({
        opportunityId,
        text: formValues.text,
        files,
        sessions
      });
    }
  }, [uploadedFiles, form]);

  return {
    form,
    onSubmit,
    isPending,
    isUploading,
    progresses,
    uploadedFiles
  };
};

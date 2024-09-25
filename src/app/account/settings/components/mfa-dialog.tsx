"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { settingsApi } from "../queries";

interface MfaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const mfaSteps = [
  {
    title: "Scanează codul QR",
    description:
      "Scanează codul QR cu aplicația Google Authenticator sau introdu manual cheia secretă."
  },
  {
    title: "Introdu codul de verificare",
    description: "Introdu codul de verificare generat de aplicație pentru a finaliza procesul."
  }
];

const formSchema = z.object({
  code: z
    .string()
    .min(6, { message: "Codul trebuie să aibă 6 caractere" })
    .length(6, { message: "Codul trebuie să aibă 6 caractere" })
});

const MfaDialog = ({ open, onOpenChange }: MfaDialogProps) => {
  const [step, setStep] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const verifyCodeMutation = useMutation({
    mutationFn: (code: string) => settingsApi.verifyMfaCode({ code }),
    onSuccess: () => {
      onOpenChange(false);
      toast.success("Autentificarea dublă a fost activată cu succes.");
      form.reset();
      setStep(0);
    },
    onError: (error) => {
      toast.error("Codul introdus este incorect. Te rugăm să încerci din nou.");
    }
  });
  const onSubmit = (data: { code: string }) => verifyCodeMutation.mutate(data.code);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
        form.reset();
        setStep(0);
      }}
    >
      <DialogContent>
        <DialogHeader className="flex flex-col items-center pt-6 text-center">
          <div className="mb-3 flex items-center gap-2">
            <DialogTitle className="text-center leading-normal">
              {mfaSteps[step].title}{" "}
            </DialogTitle>
          </div>
          <DialogDescription className="text-center">
            {mfaSteps[step].description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {step === 0 && (
            <div className="flex flex-col items-center justify-center gap-4">
              <Image src="/images/placeholder.webp" alt="QR code" width={200} height={200} />
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                the code for the QR
              </code>
            </div>
          )}
          {step === 1 && (
            <Form {...form}>
              <form className="w-full" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cod</FormLabel>
                      <FormControl>
                        <Input placeholder="XXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
        </div>
        <DialogFooter className="mt-4">
          <Button
            variant="muted"
            onClick={() => (step === 0 ? onOpenChange(false) : setStep(step - 1))}
            disabled={verifyCodeMutation.isPending}
          >
            Înapoi
          </Button>
          <Button
            variant="default"
            onClick={() => (step === 0 ? setStep(step + 1) : form.handleSubmit(onSubmit)())}
            loading={verifyCodeMutation.isPending}
          >
            {step === 2 ? "Finalizează" : "Continuă"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MfaDialog;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
} from "@/components/ui/input-otp";

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Codul OTP trebuie să conțină 6 caractere."
  })
});

interface MFADialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
}

export const MFADialog = ({ isOpen, onClose, onSubmit }: MFADialogProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: ""
    }
  });

  const handleSubmit = (values: { otp: string }) => {
    onSubmit(values.otp);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="pt-6">
          <DialogTitle className="mb-3 text-center leading-normal">
            Verificare în doi pași
          </DialogTitle>
          <DialogDescription className="text-center">
            Introduceți codul generat de Google Authenticator.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col items-center gap-6"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Verifică
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MFADialog;

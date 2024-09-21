"use client";

import Link from "next/dist/client/link";

import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input";

import useRegister from "../hooks/use-register";
import ConfirmEmailDialog from "./email-dialog";

export const RegisterForm = () => {
  const { form, onSubmit, isPending, showEmailDialog, setShowEmailDialog, dialogEmail } =
    useRegister();

  return (
    <>
      <div className="my-10">
        <h1 className="mb-4 text-3xl font-bold">Creează un cont</h1>
        <div className="mx-auto min-w-[500px] max-w-[500px]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-end space-y-4"
              noValidate
            >
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nume</FormLabel>
                    <FormControl>
                      <Input placeholder="Cucos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Prenume</FormLabel>
                    <FormControl>
                      <Input placeholder="Maria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Adresa de e-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="maria.cucos@gmail.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Număr de telefon</FormLabel>
                    <FormControl>
                      <PhoneInput placeholder="Număr de telefon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col space-y-2">
                    <FormLabel>Data nașterii</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        granularity="day"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Parola</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Confirmă parola</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" loading={isPending}>
                {isPending ? "Se incarcă..." : "Creează cont"}
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-10 flex justify-center">
          <span className="mr-2">Ai deja un cont?</span>
          <Button variant="link-accent" className="h-auto p-0" asChild>
            <Link href="/auth/login">Conectează-te la contul tău</Link>
          </Button>
        </div>
      </div>

      <ConfirmEmailDialog
        email={dialogEmail}
        open={showEmailDialog}
        onOpenChange={setShowEmailDialog}
      />
    </>
  );
};

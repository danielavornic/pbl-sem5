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
                      <Input placeholder="Nume" {...field} />
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
                      <Input placeholder="Prenume" {...field} />
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
                      <Input placeholder="name@example.com" type="email" {...field} />
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

              <Button type="submit" className="w-full" loading={isPending}>
                {isPending ? "Se incarcă..." : "Creează cont"}
              </Button>
            </form>
          </Form>
        </div>

        <div className="mt-6">
          <div className="flex items-center">
            <div className="h-px flex-grow bg-muted-foreground"></div>
            <span className="mx-4 text-muted-foreground">sau</span>
            <div className="h-px flex-grow bg-muted-foreground"></div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button className="flex w-full items-center bg-card px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Înregistrează-te cu Google
            </Button>
          </div>
          <div className="mt-10 flex justify-center">
            <span className="mr-2">Ai deja un cont?</span>
            <Button variant="link-accent" className="h-auto p-0" asChild>
              <Link href="/auth/login">Conectează-te la contul tău</Link>
            </Button>
          </div>
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

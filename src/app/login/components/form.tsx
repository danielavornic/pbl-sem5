"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
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

import useLogin from "../hooks/use-login";

export const LoginForm = () => {
  const { form, onSubmit, isPending } = useLogin();

  return (
    <div className="min-w-[436px]">
      <h1 className="mb-4 text-3xl font-bold">Intră în cont</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-end space-y-4"
          noValidate
        >
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

          <Button type="submit" loading={isPending}>
            {isPending ? "Se incarcă..." : "Accesează contul"}
          </Button>
        </form>
      </Form>

      <div className="mt-10 flex justify-center">
        <span className="mr-2">Nu ai cont?</span>
        <Button variant="link-accent" className="h-auto p-0" asChild>
          <Link href="/register">Înregistrează-te</Link>
        </Button>
      </div>
    </div>
  );
};

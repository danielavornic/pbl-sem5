"use client";

import Link from "next/link";
import { useState } from "react";

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

import GoogleButton from "../../components/google-button";
import useLogin from "../hooks/use-login";
import MFADialog from "./mfa-dialog";

export const LoginForm = () => {
  const {
    loginForm,
    mfaForm,
    onLoginSubmit,
    onMFASubmit,
    onMFAClose,
    isMFAOpen,
    isLoginPending,
    isMFAPending
  } = useLogin();

  return (
    <div className="min-w-[500px]">
      <h1 className="mb-4 text-3xl font-bold">Intră în cont</h1>
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          className="flex flex-col items-end space-y-4"
          noValidate
        >
          <FormField
            control={loginForm.control}
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
            control={loginForm.control}
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

          <Button loading={isLoginPending} type="submit" className="w-full">
            {isLoginPending ? "Se incarcă..." : "Accesează contul"}
          </Button>
        </form>
      </Form>

      <GoogleButton />

      <div className="mt-10 flex justify-center">
        <span className="mr-2">Nu ai cont?</span>
        <Button variant="link-accent" className="h-auto p-0" asChild>
          <Link href="/auth/register">Înregistrează-te</Link>
        </Button>
      </div>

      <MFADialog
        form={mfaForm}
        isOpen={isMFAOpen}
        onClose={onMFAClose}
        onSubmit={onMFASubmit}
        isPending={isMFAPending}
      />
    </div>
  );
};

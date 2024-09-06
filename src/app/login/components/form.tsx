"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import useLogin from "../hooks/use-login";

export const LoginForm = () => {
  const { form, onSubmit, isPending } = useLogin();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Conectează-te</CardTitle>
          <CardDescription>Completează câmpurile de mai jos cu datele personale</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Adresa de email"
                {...form.register("email")}
                required
                autoComplete="email"
                className={form.formState.errors.email ? "border-red-500" : ""}
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Parola"
                {...form.register("password")}
                required
                autoComplete="current-password"
                className={form.formState.errors.password ? "border-red-500" : ""}
              />
              {form.formState.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Se incarcă..." : "Conectează-te"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Link href="/forgot-password" className="text-blue-600 hover:underline">
            Ai uitat parola?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

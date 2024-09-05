"use client";

import useLogin from "../hooks/use-login";

export const LoginForm = () => {
  const { form, onSubmit, isPending } = useLogin();

  return <div>LoginForm</div>;
};

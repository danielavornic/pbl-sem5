"use client";

import useAdminLogin from "../hooks/use-admin-login";

export const AdminLoginForm = () => {
  const { form, onSubmit, isPending } = useAdminLogin();

  return <div>AdminLoginForm</div>;
};

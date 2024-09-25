"use client";

import { useAuth } from "@/app/auth/use-auth";
import { FullScreenLoader } from "@/components/full-screen-loader";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
};

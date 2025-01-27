"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import useUserStore from "@/lib/user-store";

import { authApi } from "./queries";

export const useAuth = () => {
  const { user, setUser, clearUser } = useUserStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => authApi.getProfile(),
    retry: false
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isError) {
      console.log("Error fetching user profile");
      clearUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError]);

  return {
    user,
    isLoading,
    isError
  };
};

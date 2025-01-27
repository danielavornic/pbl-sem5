"use client";

import { Button } from "@/components/ui/button";
import useUserStore from "@/lib/user-store";
import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authApi } from "../queries";

const GoogleButton = ({ isRegister }: { isRegister?: boolean }) => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const googleLoginMutation = useMutation({
    mutationFn: (credentials: { firstName: string; lastName: string; email: string }) =>
      authApi.loginWithGoogle(credentials),
    onSuccess: (response) => {
      const { user, mfaEnabled } = response;

      if (mfaEnabled) {
        toast.error("MFA nu este suportat pentru autentificarea cu Google");
        return;
      }

      setUser(user);
      if (user.isFirstLogin) {
        router.push("/?setup=true");
      } else {
        router.push("/");
      }
    },
    onError: (error: any) => {
      toast.error("Eroare la autentificarea cu Google", {
        description: error.response?.data?.message
      });
    }
  });

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
        });

        const credentials = {
          firstName: data?.given_name,
          lastName: data?.family_name,
          email: data?.email
        };

        googleLoginMutation.mutate(credentials);
      } catch (error) {
        toast.error("Eroare la conectarea cu Google");
        console.error("Error fetching user info:", error);
      }
    }
  });

  return (
    <div className="mt-6 w-full">
      <div className="flex items-center">
        <div className="h-px flex-grow bg-muted-foreground"></div>
        <span className="mx-4 text-muted-foreground">sau</span>
        <div className="h-px flex-grow bg-muted-foreground"></div>
      </div>

      <div className="mt-4 flex w-full justify-center">
        <Button
          onClick={() => login()}
          className="flex w-full items-center bg-card px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          disabled={googleLoginMutation.isPending}
        >
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
          {googleLoginMutation.isPending
            ? "Se încarcă..."
            : isRegister
              ? "Înregistrează-te cu Google"
              : "Conectează-te cu Google"}
        </Button>
      </div>
    </div>
  );
};

export default GoogleButton;

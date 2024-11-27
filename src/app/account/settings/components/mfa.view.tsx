"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/app/auth/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { settingsApi } from "../queries";

export const MfaView = () => {
  const { user } = useAuth();
  const isMfaEnabled = user && "mfaEnabled" in user && user.mfaEnabled;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ enable }: { enable: boolean }) => settingsApi.updateMfa({ enable }),
    onSuccess: () => {
      toast.success("MFA a fost schimbat cu succes!");
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: any) => {
      toast.error("Eroare la MFA", {
        description: error.response?.data?.message
      });
    }
  });

  const toggleMfa = () => {
    const confirm = window.confirm(
      `Ești sigur că vrei să ${isMfaEnabled ? "dezactivezi" : "activezi"} MFA?`
    );
    if (!confirm) {
      return;
    }

    mutate({ enable: !!!isMfaEnabled });
  };

  return (
    <Card className="h-full w-full shadow-none">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold uppercase">Autentificare dublă</h3>
            <p className="text-sm text-gray-500">
              La fiecare autentificare vei avea nevoie de un cod generat și trimis pe e-mail.
            </p>
          </div>
          <Button className="flex-shrink-0" variant="secondary" onClick={toggleMfa}>
            {isMfaEnabled ? "Dezactivează" : "Activează"}
          </Button>
          {/* <MfaDialog open={showDialog} onOpenChange={setShowDialog} /> */}
        </div>
      </CardContent>
    </Card>
  );
};

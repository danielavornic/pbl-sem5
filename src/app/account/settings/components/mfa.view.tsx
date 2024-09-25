"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import MfaDialog from "./mfa-dialog";

export const MfaView = () => {
  const [isMfaEnabled, setIsMfaEnabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const disableMfa = () => {
    const confirm = window.confirm("Ești sigur că vrei să dezactivezi autentificarea dublă?");
    if (!confirm) {
      return;
    }

    setIsMfaEnabled(false);
  };

  return (
    <Card className="h-full w-full shadow-none">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold uppercase">Autentificare dublă</h3>
            <p className="text-sm text-gray-500">
              Utilizează Google Authenticator pentru a-ți proteja contul. La fiecare autentificare
              vei avea nevoie de un cod generat de aplicație.
            </p>
          </div>
          <Button
            className="flex-shrink-0"
            variant="secondary"
            onClick={() => (isMfaEnabled ? disableMfa() : setShowDialog(true))}
          >
            {isMfaEnabled ? "Dezactivează" : "Activează"}
          </Button>
          <MfaDialog open={showDialog} onOpenChange={setShowDialog} />
        </div>
      </CardContent>
    </Card>
  );
};

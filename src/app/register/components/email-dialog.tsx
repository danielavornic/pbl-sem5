"use client";

import { MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface ConfirmEmailDialogProps {
  email: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfirmEmailDialog = ({ open, email, onOpenChange }: ConfirmEmailDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center text-center">
          <MailCheck size={90} className="mb-4 text-secondary" />
          <DialogTitle className="text-center">Confirmă adresa de e-mail</DialogTitle>
          <DialogDescription className="text-center">
            Pentru a finaliza înregistrarea, accesează link-ul primit pe adresa de e-mail:{" "}
            <span className="font-semibold">{email}</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="muted" className="flex-1">
              Închide
            </Button>
          </DialogClose>
          <Button variant="default" asChild className="flex-1">
            <a href="https://mail.google.com" target="_blank" rel="noreferrer">
              Deschide Gmail
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmEmailDialog;

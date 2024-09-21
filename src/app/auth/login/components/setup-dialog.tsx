"use client";

import Image from "next/image";
import Link from "next/link";

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

interface SetupAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SetupAccountDialog = ({ open, onOpenChange }: SetupAccountDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-2">
            <DialogTitle className="mt-1 text-center leading-normal">Bine ai venit pe </DialogTitle>
            <Image src="/logo.svg" alt="logo" width={176} height={30} />
          </div>
          <DialogDescription className="text-center">
            Ai ocazia să creezi o organizație sau să completezi profilul tău pentru a începe să
            folosești platforma.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="muted" className="flex-1" asChild>
              <Link href="/organizations/create">Creează o organizatie</Link>
            </Button>
          </DialogClose>
          <Button variant="default" asChild className="flex-1">
            <Link href="/profile">Completează profilul</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SetupAccountDialog;

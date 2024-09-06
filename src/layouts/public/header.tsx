"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="h-24">
      <div className="container flex h-full items-center justify-between">
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="Voluntariat Moldova" width={238} height={48} />
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Button variant="link-foreground" asChild>
            <Link href="/login">Intră în cont</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/register">Creează un cont</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

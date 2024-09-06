"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export const Header = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="h-24">
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-start">
          <Link href={isAdmin ? "/admin" : "/"}>
            <Image src="/logo.svg" alt="Voluntariat Moldova" width={238} height={48} />
          </Link>
          {isAdmin && <span className="font-heading text-sm font-semibold text-accent">admin</span>}
        </div>

        {isAdmin ? (
          <div>
            <Button variant="default" asChild>
              <Link href="/admin/login">Intră în cont</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Button variant="link-foreground" asChild>
              <Link href="/login">Intră în cont</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/register">Creează un cont</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

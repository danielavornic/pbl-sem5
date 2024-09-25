"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import useUserStore from "@/lib/user-store";
import { cn } from "@/lib/utils";

import { UserNav } from "./user-nav";

const menuLinks: { label: string; href: string }[] = [
  { label: "Oportunități", href: "/opportunities" },
  { label: "Organizații", href: "/organizations" }
];

export const Header = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const { user } = useUserStore();

  return (
    <header className="h-24">
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-start">
          <Link href={isAdmin ? "/admin" : "/"} className="flex-shrink-0">
            <Image src="/logo.svg" alt="Voluntariat Moldova" width={238} height={48} priority />
          </Link>
          {isAdmin && <span className="font-heading text-sm font-semibold text-accent">admin</span>}
        </div>

        {!isAdmin && (
          <div className="flex items-center gap-8">
            {menuLinks.map((link) => (
              <Button
                key={link.label}
                size="lg"
                variant="link-foreground"
                className={cn("font-medium", {
                  "font-semibold underline": pathname.startsWith(link.href)
                })}
                asChild
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        )}

        <UserNav />
        {user ? (
          <div className="flex">
            <UserNav />
          </div>
        ) : isAdmin ? (
          <div>
            <Button variant="default" asChild>
              <Link href="/admin/login">Intră în cont</Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-5">
            <Button variant="link-foreground" asChild>
              <Link href="/auth/login">Intră în cont</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/auth/register">Creează un cont</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

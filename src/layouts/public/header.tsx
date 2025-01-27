"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import useUserStore from "@/lib/user-store";
import { cn } from "@/lib/utils";

import { User } from "@/types/user";
import { UserNav } from "./user-nav";

const publicLinks: { label: string; href: string }[] = [
  { label: "Oportunități", href: "/opportunities" },
  { label: "Organizații", href: "/organizations" }
];

const orgOwnerLinks: { label: string; href: string }[] = [
  { label: "Organizația mea", href: "/account/organization" }
];

export const Header = () => {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const { user } = useUserStore() as { user: User & { createdOrganizations?: any[] } };
  // check if user is object
  const isLogged = typeof user === "object";

  const menuLinks =
    user?.createdOrganizations && user.createdOrganizations.length > 0
      ? orgOwnerLinks
      : publicLinks;

  return (
    <header className="mb-6 h-24 lg:h-24">
      <div className="container relative flex h-full items-center justify-between">
        <div className="flex items-start">
          <Link href={isAdmin ? "/admin" : "/"} className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Voluntariat Moldova"
              width={238}
              height={48}
              priority
              className="lg:auto w-40"
            />
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

        {isLogged && !isAdmin ? (
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

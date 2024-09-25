"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Setări",
    href: "/account/settings"
  },
  {
    title: "Informații personale",
    href: "/account"
  }
];

export const AccountSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-1/4">
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.title}>
              <Button
                variant="link-foreground"
                className={cn("px-0", { "font-semibold underline": pathname === item.href })}
                asChild
              >
                <Link href={item.href}>{item.title}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

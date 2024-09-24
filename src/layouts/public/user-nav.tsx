"use client";

import { useMutation } from "@tanstack/react-query";
import { Building, CalendarHeart, CircleUserRound, LogOut, Settings2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authApi } from "@/app/auth/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useUserStore from "@/lib/user-store";
import { User } from "@/types";

export const UserNav = () => {
  const router = useRouter();

  const { user, clearUser } = useUserStore();

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      toast.success("Deconectat cu succes");
      clearUser();
      router.push("/");
    },
    onError: (error: any) => {
      toast.error("Eroare la deconectare", {
        description: error.response?.data?.message
      });
    }
  });

  if (user === null) {
    return null;
  }

  const { profilePicture, firstName, lastName, email, organizationId } = (user as User) || {
    profilePicture: "",
    firstName: "",
    lastName: "",
    email: "",
    organizationId: null
  };

  return (
    <div className="flex items-center gap-5">
      {organizationId ? (
        <Button asChild>
          <Link href="/opportunities/create">Publică o oportunitate</Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href="/organizations/create">Creează o organizație</Link>
        </Button>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-12 w-12 rounded-full">
            <Avatar className="h-12 w-12">
              {!!profilePicture && (
                <AvatarImage src={profilePicture} alt={`${firstName} ${lastName}`} />
              )}
              <AvatarFallback>
                <span className="text-sm font-semibold">
                  {firstName?.[0]}
                  {lastName?.[0]}
                </span>
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {firstName} {lastName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">{email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/account" className="flex items-center gap-2">
                <CircleUserRound size="16" />
                <span>Cont</span>
              </Link>
            </DropdownMenuItem>
            {organizationId && (
              <>
                <DropdownMenuItem>
                  <Link href="/account/organization" className="flex items-center gap-2">
                    <Building size="16" />
                    <span>Organizația mea</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href="/account/organization/opportunities"
                    className="flex items-center gap-2"
                  >
                    <CalendarHeart size="16" />
                    <span>Oportunități create</span>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem>
              <Link href="/account/settings" className="flex items-center gap-2">
                <Settings2 size="16" />
                <span>Setări</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center gap-2"
            onClick={() => logoutMutation.mutate()}
          >
            <LogOut size="16" />
            <span>Deconectare</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

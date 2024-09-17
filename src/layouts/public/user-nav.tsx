"use client";

import { useMutation } from "@tanstack/react-query";
import { Building, CircleUserRound, LogOut, Settings2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { authApi } from "@/api/authApi";
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

export const UserNav = () => {
  const router = useRouter();

  const { user } = useUserStore();
  const clearUser = useUserStore((state) => state.clearUser);

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

  if (!user) {
    return null;
  }

  const { profilePicture, firstName, lastName, email } = user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            {profilePicture && (
              <AvatarImage src={profilePicture} alt={`${firstName} ${lastName}`} />
            )}
            <AvatarFallback>
              <span className="text-sm font-semibold">
                {firstName[0]}
                {lastName[0]}
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
              <span>Profil</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/account/organization" className="flex items-center gap-2">
              <Building size="16" />
              <span>Organizația mea</span>
            </Link>
          </DropdownMenuItem>
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
  );
};

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, Info, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { NamedEntity } from "@/types";
import { Organization } from "@/types/organization";

export const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return <div className="w-4">{id}</div>;
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="my-1 rounded-sm hover:bg-primary/30 hover:text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nume
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return <span className="font-medium">{name}</span>;
    }
  },
  {
    accessorKey: "description",
    header: "Descriere",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="trucate line-clamp-1 max-w-[250px] break-all text-sm">{description}</div>
      );
    }
  },

  {
    accessorKey: "address",
    header: "Adresă"
  },
  {
    accessorKey: "region",
    header: "Regiune",
    cell: ({ row }) => {
      const region = row.getValue("region") as NamedEntity;
      return region?.name;
    }
  },
  {
    accessorKey: "phoneNumber",
    header: "Telefon"
  },
  {
    accessorKey: "approvalStatus",
    header: "Status",
    cell: ({ row }) => {
      const approvalStatus = row.getValue("approvalStatus") as string;
      switch (approvalStatus) {
        case "pending":
          return <Badge variant="warning">În așteptare</Badge>;
        case "approved":
          return <Badge variant="success">Aprobat</Badge>;
        case "rejected":
          return <Badge variant="destructive">Respins</Badge>;
        default:
          return null;
      }
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="my-1 rounded-sm hover:bg-primary/30 hover:text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Creat la
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const createdAtDate = format(new Date(createdAt), "HH:mm, PPP");
      return createdAtDate;
    }
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="my-1 rounded-sm hover:bg-primary/30 hover:text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actualizat la
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;
      const updatedAtDate = format(new Date(updatedAt), "HH:mm, PPP");
      return updatedAtDate;
    }
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Info size={16} className="mr-2" />
              Vezi detalii
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

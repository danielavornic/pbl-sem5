"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, Info, MoreHorizontal } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { NamedEntity } from "@/types";
import { Opportunity, SessionExtended } from "@/types/opportunity";

export const columns: ColumnDef<Opportunity>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as number;
      return <div className="w-4">{id}</div>;
    }
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="my-1 rounded-sm hover:bg-primary/30 hover:text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Titlu
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <span className="font-medium">{title}</span>;
    }
  },
  {
    accessorKey: "organization",
    header: "Organizație",
    cell: ({ row }) => {
      const organization = row.getValue("organization") as NamedEntity;
      return organization.name;
    }
  },
  {
    accessorKey: "description",
    header: "Descriere",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <div className="line-clamp-1 max-w-[250px] break-all text-sm">{description}</div>;
    }
  },
  {
    accessorKey: "region",
    header: "Localitate",
    cell: ({ row }) => {
      const region = row.getValue("region") as NamedEntity;
      return region.name;
    }
  },
  {
    accessorKey: "isHighPriority",
    header: "Prioritate",
    cell: ({ row }) => {
      const isHighPriority = row.getValue("isHighPriority") as boolean;
      return isHighPriority ? (
        <Badge variant="destructive">Înaltă</Badge>
      ) : (
        <Badge variant="muted">Normală</Badge>
      );
    }
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
    accessorKey: "sessions",
    header: "Prima sesiune",
    cell: ({ row }) => {
      const sessions = row.getValue("sessions") as SessionExtended[];
      if (sessions && sessions.length > 0) {
        const firstSession = sessions[0];
        const formattedDate = format(new Date(firstSession.date), "dd.MM.yyyy");
        const formattedTime = `${firstSession.startTime.slice(0, 5)} - ${firstSession.endTime.slice(0, 5)}`;
        return (
          <div className="text-sm">
            <div>
              {formattedDate}, {formattedTime}
            </div>
          </div>
        );
      }
      return <div className="text-sm text-gray-500">Fără sesiuni</div>;
    }
  },
  {
    accessorKey: "sessions",
    header: "Locuri",
    cell: ({ row }) => {
      const sessions = row.getValue("sessions") as SessionExtended[];
      if (sessions && sessions.length > 0) {
        const firstSession = sessions[0];
        return firstSession.spotsLeft;
      }
      return <div className="text-sm text-gray-500">Fără sesiuni</div>;
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
            <DetailsCellComponent row={row} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

const DetailsCellComponent = ({ row }: { row: Row<Opportunity> }) => {
  const [id, setId] = useQueryState("id", parseAsInteger);
  const opportunityId = row.getValue("id") as number;

  return (
    <DropdownMenuItem onClick={() => setId(opportunityId)}>
      <Info size={16} className="mr-2" />
      Vezi detalii
    </DropdownMenuItem>
  );
};

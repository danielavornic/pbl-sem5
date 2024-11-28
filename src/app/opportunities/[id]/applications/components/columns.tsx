"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, Info, MoreHorizontal } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

import OppStatusBadge from "@/app/opportunities/components/opp-status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Application } from "@/types/application";

export const columns: ColumnDef<Application>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="w-4">{row.getValue("id")}</div>
  },
  {
    accessorKey: "user",
    header: "Voluntar",
    cell: ({ row }) => {
      const user = row.getValue("user") as any;
      return `${user.firstName} ${user.lastName}`;
    }
  },
  {
    accessorKey: "sessions",
    header: "Sesiune",
    cell: ({ row }) => {
      const sessions = row.getValue("sessions") as any[];
      if (sessions?.length > 0) {
        const session = sessions[0];
        return (
          <div className="text-sm">
            <div>{format(new Date(session.date), "dd.MM.yyyy")}</div>
            <div>
              {format(new Date(session.startTime), "HH:mm")} -{" "}
              {format(new Date(session.endTime), "HH:mm")}
            </div>
          </div>
        );
      }
      return <div className="text-sm text-gray-500">Fără sesiune</div>;
    }
  },
  {
    accessorKey: "files",
    header: "Documente",
    cell: ({ row }) => {
      const files = row.getValue("files") as string[];
      return <div className="text-sm">{files?.length || 0} fișiere</div>;
    }
  },
  {
    accessorKey: "approvalStatus",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="my-1 rounded-sm hover:bg-primary/30 hover:text-black"
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("approvalStatus") as string;
      return <OppStatusBadge status={status} />;
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="my-1 rounded-sm hover:bg-primary/30 hover:text-black"
      >
        Aplicat la
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => format(new Date(row.getValue("createdAt")), "dd.MM.yyyy HH:mm")
  },
  {
    id: "actions",
    cell: ({ row }) => (
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
    )
  }
];

const DetailsCellComponent = ({ row }: { row: Row<Application> }) => {
  const [id, setId] = useQueryState("id", parseAsInteger);
  return (
    <DropdownMenuItem onClick={() => setId(row.getValue("id"))}>
      <Info size={16} className="mr-2" />
      Vezi detalii
    </DropdownMenuItem>
  );
};

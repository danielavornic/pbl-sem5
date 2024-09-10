import { NamedEntity } from "./common";

export interface Organization {
  id: number;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  name: string;
  description: string;
  address: string;
  region: NamedEntity;
  phoneNumber: string;
  categories?: NamedEntity[];
  logo?: string;
  website?: string;

  approvalStatus: "pending" | "approved" | "rejected";
  approvedBy: {
    id: number;
    username: string;
  } | null;
  approvalDate: string | null;

  createdAt: string;
  updatedAt: string;
}

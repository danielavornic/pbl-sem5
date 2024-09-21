import { NamedEntity } from "./common";

export enum ApprovalStatus {
  pending = "În așteptare",
  approved = "Aprobat",
  rejected = "Respins"
}
export interface OrganizationCreateData {
  name: string;
  description: string;
  address: string;
  region: NamedEntity | null | number;
  categories?: number[] | NamedEntity[];
  website?: string;
  phoneNumber: string;
  logo?: string;
}

export interface Organization extends OrganizationCreateData {
  id: number;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  categories?: NamedEntity[];

  approvalStatus: "pending" | "approved" | "rejected";
  approvedBy: {
    id: number;
    username: string;
  } | null;
  approvalDate: string | null;

  createdAt: string;
  updatedAt: string;
}

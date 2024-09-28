import { NamedEntity } from "./common";

interface OrganizationBase {
  name: string;
  description: string;
  address: string;
  website?: string;
  phoneNumber: string;
  logo?: string;
}

export interface OrganizationCreateData extends OrganizationBase {
  regionId: number;
  categoryIds?: number[];
}

export interface Organization extends OrganizationBase {
  id: number;
  region: NamedEntity;
  categories: NamedEntity[];
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  approvalStatus: "pending" | "approved" | "rejected";
  approvedBy: {
    id: number;
    username: string;
  } | null;
  approvalDate: string | null;
  createdAt: string;
  updatedAt: string;
}

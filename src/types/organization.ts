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
  region: string;
  categories?: number[] | NamedEntity[];
  website?: string;
  phoneNumber: string;
}

// export interface Organization extends OrganizationCreateData {
//   id: number;
//   createdAt: string;
//   updatedAt: string;
//   ownerId: number;
//   owner: {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//   };
//   volunteers: {
//     id: number;
//     firstName: string;
//     lastName: string;
//     email: string;
//   }[];
//   events: {
//     id: number;
//     name: string;
//     date: string;
//     location: string;
//   }[];
//   categoriesData: NamedEntity[];
//   regionId: NamedEntity;
// }

export interface Organization extends OrganizationCreateData {
  id: number;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  categories?: NamedEntity[];
  logo?: string;

  approvalStatus: "pending" | "approved" | "rejected";
  approvedBy: {
    id: number;
    username: string;
  } | null;
  approvalDate: string | null;

  createdAt: string;
  updatedAt: string;
}

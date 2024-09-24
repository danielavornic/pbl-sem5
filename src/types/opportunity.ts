import { NamedEntity } from "./common";

export enum ApprovalStatus {
  pending = "În așteptare",
  approved = "Aprobat",
  rejected = "Respins"
}

interface OpportunityBase {
  title: string;
  description: string;
  address: string;
  isHighPriority: boolean;
  image?: string;
}

export interface OpportunityCreateData extends OpportunityBase {
  sessions: Session[];
  region: string;
  categories: number[];
  skills: number[];
}

export interface Session {
  startTime: string;
  endTime: string;
  spotsLeft: number;
}

export interface Opportunity extends OpportunityBase {
  id: number;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  organization: NamedEntity;
  region: NamedEntity;
  categories: NamedEntity[];
  skills: NamedEntity[];
  approvalStatus: string;
  approvedBy: {
    id: number;
    username: string;
  } | null;
  approvalDate: string | null;
  createdAt: string;
  updatedAt: string;
  sessions: SessionExtended[];
}

export interface SessionExtended extends Session {
  date: string;
}

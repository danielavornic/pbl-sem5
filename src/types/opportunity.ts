import { NamedEntity } from "./common";
import { ApprovalStatus } from "./organization";

export interface OpportunityCreateData {
  organizationId?: number;
  title: string;
  description: string;
  region: string;
  address: string;
  isHighPriority: boolean;
  sessions: Session[];
  categories: number[] | NamedEntity[];
  skills: number[] | NamedEntity[];
}

export interface Session {
  startTime: string;
  endTime: string;
  spotsLeft: number;
}

export interface Opportunity extends OpportunityCreateData {
  id: number;
  createdBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
  organizationId?: number;
  categories: NamedEntity[];
  skills: NamedEntity[];

  approvalStatus: ApprovalStatus;
  approvedBy: {
    id: number;
    username: string;
  } | null;
  approvalDate: string | null;

  createdAt: string;
  updatedAt: string;
}

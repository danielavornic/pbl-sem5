import { NamedEntity } from "./common";
import { ApprovalStatus } from "./organization";

export interface OpportunityBase {
  title: string;
  description: string;
  address: string;
  isHighPriority: boolean;
  sessions: Session[];
  image?: string;
}

export interface OpportunityCreateData extends OpportunityBase {
  regionId: number;
  categoryIds: number[];
  skills: number[];
}

export interface Session {
  startTime: string;
  endTime: string;
  spotsLeft: number;
}

export interface Opportunity extends OpportunityBase {
  id: number;
  region: NamedEntity;
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

import { Opportunity } from "./opportunity";

export interface Application {
  id: number;
  opportunity: Opportunity;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
  text: string | null;
  files: string[];
  sessions: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  createdAt: string;
  updatedAt: string;

  approvalStatus: string;
  approvedBy: {
    id: number;
    username: string;
  } | null;
  approvalDate: string | null;
}
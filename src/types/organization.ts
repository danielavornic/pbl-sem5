import { NamedEntity } from "./common";

export interface OrganizationCreateData {
  name: string;
  description: string;
  address: string;
  region: string;
  categories: number[];
  website: string;
  phoneNumber: string;
}

export interface Organization extends OrganizationCreateData {
  id: number;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  owner: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  volunteers: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }[];
  events: {
    id: number;
    name: string;
    date: string;
    location: string;
  }[];
  categoriesData: NamedEntity[];
  regionId: NamedEntity;
}
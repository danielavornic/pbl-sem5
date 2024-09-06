import { NamedEntity } from "@/types";

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface UserLoginCredentials {
  email: string;
  password: string;
}

export interface BaseUser {
  id: number;
  email: string;
  createdAt: string;
}

export interface AdminUser extends BaseUser {
  username: string;
}

export interface UserRegisterCredentials extends UserLoginCredentials {
  firstName: string;
  lastName: string;
  birthday: string;
  phoneNumber: string;
}

export interface User extends UserRegisterCredentials {
  isFirstLogin: boolean;
  organizationId?: number;
  bio?: string;
  region?: NamedEntity;
  skils?: NamedEntity[];
  profilePicture?: string;
  updatedAt: string;
}

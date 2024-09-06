import { axiosInst } from "@/lib/axios";
import {
  AdminCredentials,
  AdminUser,
  ResponseMessage,
  User,
  UserLoginCredentials,
  UserRegisterCredentials
} from "@/types";

export const authApi = {
  register: async (body: UserRegisterCredentials): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.post("/auth/register", body);
      return data;
    } catch (error: Error | any) {
      console.error("Error during registration:", error);
      return error.response.data;
    }
  },
  login: async (body: UserLoginCredentials): Promise<{ message: string; userInfo: User }> => {
    try {
      const { data } = await axiosInst.post("/auth/login", body);
      return data;
    } catch (error: Error | any) {
      console.error("Error during login:", error);
      return error.response.data;
    }
  },
  loginAdmin: async (body: AdminCredentials): Promise<{ message: string; userInfo: AdminUser }> => {
    try {
      const { data } = await axiosInst.post("/auth/login/admin", body);
      return data;
    } catch (error: Error | any) {
      console.error("Error during login:", error);
      return error.response.data;
    }
  },
  confirmEmail: async (token: string): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.get(`/auth/confirm-email`, {
        params: { token }
      });
      return data;
    } catch (error: Error | any) {
      console.error("Error during email confirmation:", error);
      return error.response.data;
    }
  },
  // For the first modal with options to create org or complete volunteer profile
  setIsFirstLogin: async (): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.patch("/auth/first-login", { isFirstLogin: false });
      return data;
    } catch (error: Error | any) {
      console.error("Error during setting first login:", error);
      return error.response.data;
    }
  }
};

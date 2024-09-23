import { axiosInst } from "@/lib/axios";
import { LoginCredentials, ResponseMessage, User, UserRegisterCredentials } from "@/types";

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
  login: async (body: LoginCredentials): Promise<{ message: string; user: User }> => {
    try {
      const { data } = await axiosInst.post("/auth/login", body);
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
  logout: async (): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.post("/auth/logout");
      return data;
    } catch (error: Error | any) {
      console.error("Error during logout:", error);
      return error.response.data;
    }
  },
  getProfile: async (): Promise<User> => {
    try {
      const { data } = await axiosInst.get("/auth");
      return data;
    } catch (error: Error | any) {
      console.error("Error during fetching user profile:", error);
      return error.response.data;
    }
  }
};

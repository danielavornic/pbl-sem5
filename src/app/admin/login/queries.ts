import { axiosInst } from "@/lib/axios";
import { BaseUser, LoginCredentials } from "@/types";

export const adminApi = {
  loginAdmin: async (body: LoginCredentials): Promise<{ message: string; userInfo: BaseUser }> => {
    try {
      const { data } = await axiosInst.post("/auth/login/admin", body);
      return data;
    } catch (error: Error | any) {
      console.error("Error during login:", error);
      return error.response.data;
    }
  }
};

import { axiosInst } from "@/lib/axios";

export const settingsApi = {
  verifyOTP: async (body: { otp: string }) => {
    const { data } = await axiosInst.post(`/auth/validate-otp?otp=${body.otp}`);
    return data;
  },
  updateMfa: async (body: { enable: boolean }) => {
    const { data } = await axiosInst.patch(`/auth/mfa?enable=${body.enable}`);
    return data;
  }
};

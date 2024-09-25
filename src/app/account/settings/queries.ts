import { axiosInst } from "@/lib/axios";

export const settingsApi = {
  verifyMfaCode: async (body: { code: string }) => {
    const { data } = await axiosInst.post("/account/settings/mfa/verify", body);
    return data;
  },
  hasMfa: async () => {
    const { data } = await axiosInst.get("/account/settings/mfa");
    return data;
  },
  disableMfa: async () => {
    const { data } = await axiosInst.post("/account/settings/mfa/disable");
    return data;
  }
};

import { axiosInst } from "@/lib/axios";
import { OrganizationCreateData, ResponseMessage } from "@/types";

export const organizationApi = {
  create: async (body: OrganizationCreateData): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.post("/organizations", body);
      return data;
    } catch (error: Error | any) {
      console.error("Error during organization creation:", error);
      return error.response.data;
    }
  },
  getAll: async (): Promise<{ organizations: OrganizationCreateData[] }> => {
    try {
      const { data } = await axiosInst.get("/organizations");
      return data;
    } catch (error: Error | any) {
      console.error("Error fetching organizations:", error);
      throw error;
    }
  },
  getById: async (id: string): Promise<OrganizationCreateData> => {
    try {
      const { data } = await axiosInst.get(`/organizations/${id}`);
      return data;
    } catch (error: Error | any) {
      console.error(`Error fetching organization with ID ${id}:`, error);
      throw error;
    }
  },
  update: async (id: string, body: Partial<OrganizationCreateData>): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.patch(`/organizations/${id}`, body);
      return data;
    } catch (error: Error | any) {
      console.error(`Error updating organization with ID ${id}:`, error);
      return error.response.data;
    }
  },
  delete: async (id: string): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.delete(`/organizations/${id}`);
      return data;
    } catch (error: Error | any) {
      console.error(`Error deleting organization with ID ${id}:`, error);
      return error.response.data;
    }
  },
};
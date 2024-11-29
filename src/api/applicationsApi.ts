import { axiosInst } from "@/lib/axios";
import { ResponseMessage } from "@/types";
import { Application, ApplicationPayload } from "@/types/application";

export const applicationApi = {
  create: async (body: ApplicationPayload): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.post(`/applications/${body.opportunityId}`, body);
      return data;
    } catch (error: Error | any) {
      console.error("Error during application creation:", error);
      return error.response.data;
    }
  },
  getAllByOpportunityId: async (id: number): Promise<Application[]> => {
    try {
      const { data } = await axiosInst.get(`/applications/opportunities/${id}`);
      return data;
    } catch (error: Error | any) {
      console.error("Error fetching applications:", error);
      throw error;
    }
  },
  getById: async (id: number): Promise<Application> => {
    try {
      const { data } = await axiosInst.get(`/applications/${id}`);
      return data;
    } catch (error: Error | any) {
      console.error(`Error fetching opportunity with ID ${id}:`, error);
      throw error;
    }
  },
  updateApprovalStatus: async (
    id: number,
    status: "approved" | "rejected"
  ): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.put(`/applications/${id}/status`, {
        status
      });
      return data;
    } catch (error: Error | any) {
      console.error(`Error updating application status with ID ${id}:`, error);
      return error.response.data;
    }
  },
  getMyApplications: async (): Promise<Application> => {
    try {
      const { data } = await axiosInst.get(`/applications/my`);
      return data;
    } catch (error: Error | any) {
      console.error(`Error fetching my applications:`, error);
      throw error;
    }
  }
};

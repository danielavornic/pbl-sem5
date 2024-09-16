import { axiosInst } from "@/lib/axios";
import { Opportunity, OpportunityCreateData, ResponseMessage } from "@/types";

export const opportunityApi = {
  create: async (body: OpportunityCreateData): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.post("/opportunities", body);
      return data;
    } catch (error: Error | any) {
      console.error("Error during opportunity creation:", error);
      return error.response.data;
    }
  },
  getAll: async (): Promise<{ opportunities: Opportunity[] }> => {
    try {
      const { data } = await axiosInst.get("/opportunities");
      return data;
    } catch (error: Error | any) {
      console.error("Error fetching opportunities:", error);
      throw error;
    }
  },
  getById: async (id: string): Promise<Opportunity> => {
    try {
      const { data } = await axiosInst.get(`/opportunities/${id}`);
      return data;
    } catch (error: Error | any) {
      console.error(`Error fetching opportunity with ID ${id}:`, error);
      throw error;
    }
  },
  update: async (id: string, body: Partial<OpportunityCreateData>): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.patch(`/opportunities/${id}`, body);
      return data;
    } catch (error: Error | any) {
      console.error(`Error updating opportunity with ID ${id}:`, error);
      return error.response.data;
    }
  },
  delete: async (id: string): Promise<ResponseMessage> => {
    try {
      const { data } = await axiosInst.delete(`/opportunities/${id}`);
      return data;
    } catch (error: Error | any) {
      console.error(`Error deleting opportunity with ID ${id}:`, error);
      return error.response.data;
    }
  },
};
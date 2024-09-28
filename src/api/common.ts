import { Option } from "@/components/ui/multiple-selector";
import { axiosInst } from "@/lib/axios";
import { NamedEntity } from "@/types";

export const commonApi = {
  getSkills: async (): Promise<Option[]> => {
    try {
      const { data } = await axiosInst.get("/skills");
      return formatToFilterOptions(data);
    } catch (error: Error | any) {
      console.error("Error fetching skills:", error);
      throw error;
    }
  },
  getRegions: async (): Promise<Option[]> => {
    try {
      const { data } = await axiosInst.get("/regions");
      return formatToFilterOptions(data);
    } catch (error: Error | any) {
      console.error("Error fetching regions:", error);
      throw error;
    }
  },
  getCategories: async (): Promise<Option[]> => {
    try {
      const { data } = await axiosInst.get("/categories");
      return formatToFilterOptions(data);
    } catch (error: Error | any) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }
};

const formatToFilterOptions = (data: NamedEntity[]): Option[] => {
  return data.map((item) => ({ value: item.id.toString(), label: item.name }));
};

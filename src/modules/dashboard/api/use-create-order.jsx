import { useMutation } from "@tanstack/react-query";
import { API } from "@/lib/axios";
 
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await API.post("/orders", payload);
      return response.data;
    },
  });
};
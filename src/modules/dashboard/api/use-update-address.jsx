import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/lib/axios";
import { toast } from "react-toastify";
 
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: async ({ addressId, payload }) => {
      const response = await API.put(`/address/${addressId}`, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      toast.success("Address updated successfully.");
    },
    onError: () => {
      toast.error("Failed to update address. Please try again.");
    },
  });
};
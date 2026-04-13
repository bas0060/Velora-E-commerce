import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/lib/axios";
import { toast } from "react-toastify";
 
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: async (addressId) => {
      const response = await API.delete(`/address/${addressId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"], exact: false  });
      toast.success("Address deleted.");
    },
    onError: () => {
      toast.error("Failed to delete address. Please try again.");
    },
  });
};
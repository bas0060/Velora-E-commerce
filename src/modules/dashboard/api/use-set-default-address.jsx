import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/lib/axios";
import { toast } from "react-toastify";
 
export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: async (addressId) => {
      const response = await API.patch(`/address/${addressId}/default`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"], exact: false  });
      toast.success("Default address updated.");
    },
    onError: () => {
      toast.error("Failed to set default address. Please try again.");
    },
  });
};
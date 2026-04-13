import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/lib/axios";
import { toast } from "react-toastify";
 
 const useCreateAddress = () => {
  const queryClient = useQueryClient();
 
  return useMutation({
    mutationFn: async (payload) => {
      const response = await API.post("/address", payload);
      return response.data;
    },
    onSuccess: () => {
      // { exact: false } invalidates ALL queries whose key starts with "addresses"
      // regardless of page/size — so the list always refreshes after adding
      queryClient.invalidateQueries({ queryKey: ["addresses"], exact: false });
      toast.success("Address added successfully.");
    },
    onError: () => {
      toast.error("Failed to add address. Please try again.");
    },
  });
};

export default useCreateAddress
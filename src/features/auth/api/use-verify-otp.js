import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../../../lib/axios";

export const useVerifyOtp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload) => {
      const response = await API.post("/auth/verify-otp", payload);
      return response.data;
    },
    onSuccess: () => {
      // 1. Force a refresh of the 'user-profile' global state to get updated 'isVerified' status
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};
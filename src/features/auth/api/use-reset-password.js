import { useMutation } from "@tanstack/react-query";
import { API } from "@/lib/axios";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await API.post("/auth/reset-password", payload);
      return response.data;
    },
  });
};
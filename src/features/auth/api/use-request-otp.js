import { useMutation } from "@tanstack/react-query";
import { API } from "../../../lib/axios";

export const useRequestOtp = () => {
  return useMutation({
    mutationFn: async (email) => {
      const response = await API.post("/auth/request-otp", { email });
      return response.data;
    },
  });
};
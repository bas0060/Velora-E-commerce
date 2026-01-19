import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../../lib/axios";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData) => {
      // userData contains { username, email, password }
      const response = await API.post("/auth/register", userData);
      return response.data;
    },
    onSuccess: (res) => {
      // 1. Update the global state with the unverified user data
      queryClient.setQueryData(["user-profile"], res.data);
    },
  });
};
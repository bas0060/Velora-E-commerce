import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "@/lib/axios";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  // Where the user came from, or the home page
  const from = location.state?.from?.pathname || "/";

  return useMutation({
    mutationFn: async (payload) => {
      const response = await API.post("/auth/login", payload);
      return response.data; // This is the successResponse from your BE
    },
    onSuccess: (res) => {
      // 1. Update the 'user-profile' cache with the new user data
      queryClient.setQueryData(["user-profile"], res.data);

      // 2. Redirect back to where they tried to go
      navigate(from, { replace: true });
    },
  });
};
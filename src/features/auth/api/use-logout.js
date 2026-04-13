import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { API } from "@/lib/axios";
import { toast } from "react-toastify";
 
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
 
  return useMutation({
    mutationFn: async () => {
      const response = await API.post("/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      // Clear the cached user profile so ProtectedRoute immediately sees no user
      queryClient.removeQueries({ queryKey: ["user-profile"] });
      toast.success("Logged out successfully.");
      navigate("/login", { replace: true });
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });
};
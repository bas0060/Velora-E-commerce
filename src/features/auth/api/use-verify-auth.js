import { useQuery } from "@tanstack/react-query";
import { API } from "../../../lib/axios";

export const useVerifyAuth = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      try {
        const response = await API.get("/users/profile");
        return response.data.data; // Returns the user object
      } catch (error) {
        // If 401, we return null so the app knows there's no user
        return null;
      }
    },
    // Prevent the app from constantly checking the profile
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false, // We don't want to retry if the user is simply not logged in
  });
};
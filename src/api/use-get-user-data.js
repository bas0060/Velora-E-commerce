import { useQuery } from "@tanstack/react-query";

// This is how you "get" the global user state anywhere in your app
export const useGetUserProfile = () => {
  
  // This looks up the ["user-profile"] key in the global cache
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      // This part only runs if the cache is empty (e.g., on page refresh)
      const response = await API.get("/users/profile");
      return response.data.data;
    },
    staleTime: Infinity, // Keep the user data "fresh" as long as the session lasts
  });
};
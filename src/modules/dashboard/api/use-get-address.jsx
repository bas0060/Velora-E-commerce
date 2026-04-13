import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/axios";
 
export const useGetAddresses = ({ page = 1, size = 10 } = {}) => {
  return useQuery({
    queryKey: ["addresses", page, size],
    queryFn: async () => {
      const response = await API.get("/address", {
        params: { page, size },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5, 
  });
};
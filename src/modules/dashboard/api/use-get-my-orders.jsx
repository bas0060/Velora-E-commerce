import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/axios";
 
 const useGetMyOrders = ({ page = 1, size = 10 } = {}) => {
  return useQuery({
    queryKey: ["user", page, size],
    queryFn: async () => {
      const response = await API.get("/orders/user", {
        params: { page, size },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export default useGetMyOrders
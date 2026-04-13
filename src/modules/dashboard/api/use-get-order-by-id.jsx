import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/axios";
 
export const useGetOrderById = (orderId) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await API.get(`/orders/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
    staleTime: 1000 * 60 * 2,
  });
};
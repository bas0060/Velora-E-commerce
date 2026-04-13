import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/axios";
 
 const useVerifyPayment = (reference) => {
  return useQuery({
    queryKey: ["verify-payment", reference],
    queryFn: async () => {
      const response = await API.get(`/payment/verify`, {
        params: { reference },
      });
      return response.data.data; // returns { order: {...} }
    },
    enabled: !!reference, // only runs when reference exists
    retry: false,
  });
};

export default useVerifyPayment
import { useMutation } from "@tanstack/react-query";
import { API } from "@/lib/axios";

const useInitializePayment = () => {
  return useMutation({
    mutationFn: async (payload) => {
      // payload = { orderId: string, email: string }
      const response = await API.post("/payment/initialize", {
        ...payload,
        callbackUrl: import.meta.env.VITE_CALLBACK_URL,
      });
      return response.data;
    },
  });
};

export default useInitializePayment;
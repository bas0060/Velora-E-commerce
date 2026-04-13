import { useCreateOrder } from "@/modules/dashboard/api/use-create-order";
import  useInitializePayment  from "@/modules/dashboard/api/use-initialize-payment";
import { useGetUserProfile } from "@/api/use-get-user-data";
import { toast } from "react-toastify";
 
const useCheckout = () => {
  const { data: user } = useGetUserProfile();
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();
  const { mutate: initializePayment, isPending: isInitializingPayment } = useInitializePayment();
 
  const isLoading = isCreatingOrder || isInitializingPayment;
 
  const checkout = ({ items, shippingAddress }) => {
    if (!user?.email) {
      toast.error("Unable to retrieve your account details. Please log in again.");
      return;
    }
 
    if (!items || items.length === 0) {
      toast.error("No items to checkout.");
      return;
    }
 
    if (!shippingAddress) {
      toast.error("Please select a shipping address.");
      return;
    }
 
    const orderPayload = {
      orderItems: items.map((item) => ({
        productId: item.id,       
        // product: item.id,       
        qty: item.quantity,
        name: item.name,   
        image: item.image, 
        price: item.price,  
      })),
      shippingAddress,
      paymentMethod: "Paystack",
    };
 
    console.log("orderPayload:", JSON.stringify(orderPayload, null, 2));
    createOrder(orderPayload, {
      onSuccess: (res) => {
        const orderId = res.data._id;
 
        initializePayment(
          { orderId, email: user.email },
          {
            onSuccess: (payRes) => {
              const authUrl = payRes.data.authorization_url;
              if (!authUrl) {
                toast.error("Payment initialization failed. Please try again.");
                return;
              }
              window.location.href = authUrl;
            },
            onError: () => {
              toast.error(
                "Payment initialization failed. Your order was saved — please try again from your orders page."
              );
            },
          }
        );
      },
      onError: () => {
        toast.error("Failed to create order. Please try again.");
      },
    });
  };
 
  return { checkout, isLoading };
};
 
export default useCheckout;
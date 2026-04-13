import { useQuery } from '@tanstack/react-query';
import { API } from '@/lib/axios'; 
// import { buildQueryString } from '@/utils/helpers';

export const useGetProductDetail = (productId) => {
  const getProductDetail = async () => {
    // const queryString = buildQueryString({ ...filters });
    const response = await API.get(`/products/${productId}`);
    return response.data.data; // Adjust based on your API response structure
  };

  return useQuery({
    queryKey: ['product-detail', productId],
    queryFn: getProductDetail,
  });
};
// (/orders/groups/{id} - id is the id of the order group to be fetched). Let's use this GET endpoint to fetch 
import { useQuery } from '@tanstack/react-query';
import { API } from '@/lib/axios';
import { buildQueryString } from '@/utils/helpers';

export const useGetTopProducts = (filters = {}) => {
  const getTopProducts = async () => {
    const queryString = buildQueryString({ ...filters });
    const url = `/products/top${queryString ? `?${queryString}` : ''}`;
    const response = await API.get(url);
    return response.data.data;
  };

  return useQuery({
    queryKey: ['top-products', filters],
    queryFn: getTopProducts,
  });
};

import { useQuery } from '@tanstack/react-query';
import { API } from '@/lib/axios';
import { buildQueryString } from '../../../utils/helpers';

export const useGetProducts = (filters = {}, options = {}) => {
  const getGetProducts = async () => {
    const queryString = buildQueryString({ ...filters });
    const response = await API.get(`/products${queryString ? `?${queryString}` : ""}`);
    return response.data.data;
  };

  return useQuery({
    queryKey: ["products", filters],
    queryFn: getGetProducts,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
    ...options,
  });
};
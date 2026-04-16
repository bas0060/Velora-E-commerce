import { useQuery } from '@tanstack/react-query';
import { API } from '@/lib/axios';

export const useGetCategories = (options = {}) => {
  const getCategories = async () => {
    const response = await API.get('/categories');
    return response.data.data;
  };

  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
    ...options,
  });
};
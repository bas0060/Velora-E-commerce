// src/features/products/api/use-get-new-products.js

import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/axios";
import { buildQueryString } from "@/utils/helpers";

export const useGetNewProducts = (filters = {}, options = {}) => {
  const getNewProducts = async () => {
    const queryString = buildQueryString({ ...filters });
    const url = `/products/new${queryString ? `?${queryString}` : ""}`;
    const response = await API.get(url);
    return response.data.data;
  };

  return useQuery({
    queryKey: ["new-products", filters],
    queryFn: getNewProducts,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
    ...options,
  });
};

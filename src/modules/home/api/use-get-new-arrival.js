// src/features/products/api/use-get-new-products.js

import { useQuery } from "@tanstack/react-query";
import { API } from "@/lib/axios";
import { buildQueryString } from "@/utils/helpers";

export const useGetNewProducts = (filters = {}) => {
  const getNewProducts = async () => {
    const queryString = buildQueryString({ ...filters });
    const url = `/products/new${queryString ? `?${queryString}` : ""}`;
    const response = await API.get(url);
    return response.data.data;
  };

  return useQuery({
    queryKey: ["new-products", filters],
    queryFn: getNewProducts,
  });
};

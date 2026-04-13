import { useQuery } from '@tanstack/react-query';
import { API } from '@/lib/axios';
import { buildQueryString } from '../../../utils/helpers';

export const useGetProducts = (filters) => {

    const getGetProducts = async () => {
        // const response = await API.get('/products', { params: filters });
        // return response.data.data; 

        const queryString = buildQueryString({ ...filters });
        const response = await API.get(`/products${queryString ? `?${queryString}` : ""}`);
        return response.data.data;
    };
    
    // const getGetProductsById = async () => {
    //     const response = await API.get('/products');
    //     return response.data.data;
    // };

    return useQuery({
        queryKey: ['products', filters],
        queryFn: getGetProducts,
    });
};
import { useQuery } from '@tanstack/react-query';
import { API } from '@/lib/axios';

export const useGetCategories = () => {

    const getCategories = async () => {
        const response = await API.get('/categories');
        return response.data.data;
    };

    return useQuery({
        queryKey: ['categories'],
        queryFn: getCategories ,
    });
};
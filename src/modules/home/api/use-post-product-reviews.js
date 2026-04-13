import { useMutation } from '@tanstack/react-query';
import { API } from '@/lib/axios';
import { toast } from 'react-toastify';
 
export const usePostProductReviews = () => {
  const postReview = useMutation({
    mutationFn: async (payload) => {
      const response = await API.post(`/products/${payload.productId}/reviews`, {
        rating: payload.rating,
        comment: payload.comment,
      });
      console.log("productId:", payload.productId);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Review submitted successfully!');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message || 'Error submitting review'}`);
    },
  });
 
  return postReview;
};
// ReviewModal.js
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { StarIcon } from 'lucide-react';
import { useGetProductDetail } from '../../api/use-get-product-detail';
import { usePostProductReviews } from '../../api/use-post-product-reviews';
 
export const ReviewModal = ({ open, onClose, productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const ratingDescriptions = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
 
  // All hooks must be called at the top level — before any early returns
  const { data: product, isLoading, error } = useGetProductDetail(productId);
  const postReview = usePostProductReviews();
 
  // Prevent scrolling when the modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
 
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);
 
  if (isLoading) {
    return <div>Loading...</div>;
  }
 
  if (error || !product) {
    return <div>Product not found</div>;
  }
 
  // Validate the review form
  const validateForm = async () => {
    const schema = yup.object().shape({
      review: yup
        .string()
        .required('Review is required')
        .max(600, 'Review must not be more than 600 characters'),
    });
 
    try {
      await schema.validate({ review }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = err.inner.reduce((acc, currentError) => {
        acc[currentError.path] = currentError.message;
        return acc;
      }, {});
      setErrors(newErrors);
      return false;
    }
  };
 
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
 
    const isValid = await validateForm();
 
    if (!isValid) {
      setIsSubmitting(false);
      return;
    }
 
    const user = JSON.parse(localStorage.getItem('user'));
 
    const payload = {
      productId,
      rating,
      comment: review,
      user: user ? user.name : 'Anonymous',
    };
 
    try {
      // mutateAsync allows us to await the result and react to success/failure here
      await postReview.mutateAsync(payload);
      handleClose(); 
    } catch {
      
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const handleRating = (newRating) => {
    setRating(newRating);
  };
 
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };
 
  const handleClose = () => {
    setReview('');
    setRating(0);
    setErrors({});
    onClose();
  };

  const closeModal = (e) => {
    if (!e || e.target === e.currentTarget) {
      onClose();
    }
  };
 
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen backdrop-blur-sm flex justify-center items-center z-50 ${open ? 'block' : 'hidden'}`}
      onClick={closeModal}
    >
      <div className="bg-[#A1C249] p-3 md:p-12 rounded-lg w-11/12 md:w-3/4 lg:w-1/2">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Review {product.name}</h3>
          <p className="mb-6">Would you like to rate this product and leave a public review?</p>
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                onClick={() => handleRating(index + 1)}
                className="cursor-pointer"
              >
                <StarIcon
                  size={40}
                  fill={index < rating ? '#FFD700' : '#E4E5E9'}
                  color={index < rating ? '#FFD700' : '#E4E5E9'}
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-700">
            {rating > 0 ? ratingDescriptions[rating - 1] : 'Click to rate'}
          </p>
        </div>
 
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <textarea
              value={review}
              onChange={handleReviewChange}
              placeholder="Write your review here"
              className="w-full p-4 border outline-none border-gray-700 text-gray-800 rounded-md resize-none min-h-40"
            />
            {errors.review && <p className="text-red-500 text-sm">{errors.review}</p>}
          </div>
          <p className="text-right text-sm">{review.length}/600</p>
 
          <div className="flex justify-between gap-4 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 cursor-pointer text-gray-700 rounded-md w-1/2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 cursor-pointer text-white rounded-md w-1/2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
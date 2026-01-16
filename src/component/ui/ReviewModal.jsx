
// import { useState, useEffect } from 'react';
// import * as yup from 'yup';
// import { StarIcon } from 'lucide-react';
// import { toast } from 'react-toastify';

// export const ReviewModal = ({ open, onClose, productId }) => {
//   const [rating, setRating] = useState(0);
//   const [review, setReview] = useState('');
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const ratingDescriptions = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

//   // Validate the review form
//   const validateForm = () => {
//     const schema = yup.object().shape({
//       review: yup
//         .string()
//         .required('Review is required')
//         .max(600, 'Review must not be more than 600 characters'),
//     });

//     return schema
//       .validate({ review }, { abortEarly: false })
//       .then(() => {
//         return true;
//       })
//       .catch((err) => {
//         const newErrors = err.inner.reduce((acc, currentError) => {
//           acc[currentError.path] = currentError.message;
//           return acc;
//         }, {});
//         setErrors(newErrors);
//         return false;
//       });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const isValid = await validateForm();

//     if (isValid) {
//       const payload = { productId, review, rating };
//       // Save review to localStorage (simulating API call)
//       const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
//       existingReviews.push(payload);
//       localStorage.setItem('reviews', JSON.stringify(existingReviews));

//       toast.success('Review submitted successfully!');
//       onClose(); // Close modal after submission
//     } else {
//       toast.error('Please fix the errors in the form');
//     }

//     setIsSubmitting(false);
//   };

//   const handleRating = (newRating) => {
//     setRating(newRating);
//   };

//   const handleReviewChange = (e) => {
//     setReview(e.target.value);
//   };

//   const handleClose = () => {
//     setReview('');
//     setRating(0);
//     setErrors({});
//     onClose();
//   };

//   // Prevent scrolling when the modal is open
//   useEffect(() => {
//     if (open) {
//       // Disable scrolling
//       document.body.style.overflow = 'hidden';
//     } else {
//       // Re-enable scrolling when modal is closed
//       document.body.style.overflow = 'auto';
//     }

//     return () => {
//       document.body.style.overflow = 'auto'; // Cleanup when the modal is unmounted
//     };
//   }, [open]);

//   return (
//     <div
//       className={`modal-overlay inset-0 backdrop: blur-sm bg-black/70 z-10 ${open ? 'open ' : ''}`}
//     >
//       <div className="modal-content">
//         <div className="text-center">
//           <h3 className="text-xl font-bold mb-4">Review this product</h3>
//           <p className="mb-6">Would you like to rate this product and leave a public review?</p>
//           <div className="flex justify-center gap-2 mb-4">
//             {Array.from({ length: 5 }, (_, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleRating(index + 1)}
//                 className="cursor-pointer"
//               >
//                 <StarIcon
//                   size={40}
//                   fill={index < rating ? '#FFD700' : '#E4E5E9'}
//                   color={index < rating ? '#FFD700' : '#E4E5E9'}
//                 />
//               </div>
//             ))}
//           </div>
//           <p className="text-sm text-gray-500">
//             {rating > 0 ? ratingDescriptions[rating - 1] : 'Click to rate'}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-4">
//           <div className="mb-4">
//             <textarea
//               value={review}
//               onChange={handleReviewChange}
//               placeholder="Write your review here"
//               className="w-full p-4 border border-gray-300 rounded-md resize-none min-h-40"
//             />
//             {errors.review && <p className="text-red-500 text-sm">{errors.review}</p>}
//           </div>
//           <p className="text-right text-sm">{review.length}/600</p>

//           <div className="flex justify-between gap-4 mt-4">
//             <button
//               type="button"
//               onClick={handleClose}
//               className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md w-1/2"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-500 text-white rounded-md w-1/2"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Submitting...' : 'Submit'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { StarIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import productData from '../../data/productData';

export const ReviewModal = ({ open, onClose, productId }) => {

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ratingDescriptions = ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

   // Find the product using productId
  const product = productData.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>; // Handle case when product is not found
  }

  // Validate the review form
  const validateForm = () => {
    const schema = yup.object().shape({
      review: yup
        .string()
        .required('Review is required')
        .max(600, 'Review must not be more than 600 characters'),
    });

    return schema
      .validate({ review }, { abortEarly: false })
      .then(() => {
        return true;
      })
      .catch((err) => {
        const newErrors = err.inner.reduce((acc, currentError) => {
          acc[currentError.path] = currentError.message;
          return acc;
        }, {});
        setErrors(newErrors);
        return false;
      });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isValid = await validateForm();

    if (isValid) {
      const payload = { productId, review, rating };
      // Save review to localStorage (simulating API call)
      const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
      existingReviews.push(payload);
      localStorage.setItem('reviews', JSON.stringify(existingReviews));

      toast.success('Review submitted successfully!');
      onClose(); // Close modal after submission
    } else {
      toast.error('Please fix the errors in the form');
    }

    setIsSubmitting(false);
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

  // Prevent scrolling when the modal is open
  useEffect(() => {
    if (open) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Cleanup when the modal is unmounted
    };
  }, [open]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center z-50 ${
        open ? 'block' : 'hidden'
      }`}
      // onClick={onClose}
    >
      <div className="bg-[#A1C249] p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 max-w-xl z-50 transform transition-transform duration-300 scale-105">
        <div className="text-center">
          {/* <h3 className="text-xl font-bold mb-4">Review this product</h3> */}
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


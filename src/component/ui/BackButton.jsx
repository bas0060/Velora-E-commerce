import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from 'lucide-react'; // Importing the chevron-left icon from lucide-react

const BackButton = () => {
  const navigate = useNavigate(); // useNavigate hook from React Router

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <button
      onClick={handleBackClick}
      className="flex items-center gap-x-1 font-semibold lg:font-bold text-gray-700 hover:text-gray-500"
    >
      <ChevronLeftIcon size={24} className="" /> {/* Chevron icon with margin */}
      Back
    </button>
  );
};

export default BackButton
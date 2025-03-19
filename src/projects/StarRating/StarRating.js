import { useState } from "react";

export function StarRating() {
  const [rating, setRating] = useState(-1);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div>
      <div className="flex mt-5">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            isFilled={index < (hoverRating || rating)}
            onClick={() => setRating(index + 1)}
            onMouseEnter={() => setHoverRating(index + 1)}
            onMouseLeave={() => setHoverRating(0)}
          />
        ))}
      </div>
      <div className="mt-2">Actual Rating: {rating}</div>
    </div>
  );
}

const Star = ({ isFilled, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`w-8 h-8 ${isFilled ? "text-yellow-400" : "text-gray-300"} cursor-pointer`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
};

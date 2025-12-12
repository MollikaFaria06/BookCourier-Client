import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL, ratings, date } = review;

  return (
    <div className="max-w-md bg-white dark:bg-slate-800 shadow-lg rounded-xl p-6 border border-gray-200 dark:border-slate-700">
      <FaQuoteLeft className="text-primary text-2xl mb-4" />
      <p className="mb-4 text-gray-700 dark:text-gray-200">{testimonial}</p>

      <div className="border-t border-dashed border-gray-200 dark:border-slate-700 my-4" />

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          <img
            src={user_photoURL || "https://via.placeholder.com/150"}
            alt={userName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{userName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {ratings ? `${ratings} / 5 • ` : ""}
            {date ? new Date(date).toLocaleDateString() : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

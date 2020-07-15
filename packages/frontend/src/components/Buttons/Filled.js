import React from "react";

const Filled = ({ onClick, text, disabled, runValidation }) => {
  return (
    <button
      type="button"
      className={`px-6 py-2 sm:py-3 ${
        disabled ? "bg-indigo-300" : "bg-indigo-500"
      } inline-flex items-center hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none focus:shadow-outline rounded-sm shadow`}
      onClick={onClick}
    >
      {/* Filter Text */}
      <span className="ml-1 text-white font-medium">{text}</span>
    </button>
  );
};

export default Filled;

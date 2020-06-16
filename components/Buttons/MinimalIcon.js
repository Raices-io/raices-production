import React from "react";

const MinimalIcon = ({ onClick, text, disabled }) => {
  return (
    <button
      type="button"
      className={`${
        disabled && "opacity-0"
      } pr-6 py-3 inline-flex items-center focus:outline-none rounded-sm `}
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
    >
      <svg
        className={`fill-current ${
          disabled ? " text-gray-400" : "text-indigo-500"
        } h-6 w-6`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
      </svg>
      {/* Filter Text */}
      <span
        className={`ml-1 ${
          disabled ? " text-gray-400" : "text-indigo-500"
        } font-semibold`}
      >
        {text}
      </span>
    </button>
  );
};

export default MinimalIcon;

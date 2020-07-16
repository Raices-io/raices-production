import React from "react";

const PaginationButton = ({ hidden = false, onClick, direction }) => {
  return (
    <div
      onClick={() => {
        if (!hidden) {
          onClick();
        }
      }}
      className={` ml-3 first:ml-0 bg-white ${
        hidden ? "shadow-none" : "shadow-lg hover:bg-indigo-200"
      }
      rounded-full w-10 h-10 flex justify-center items-center`}
    >
      {direction == "next" ? (
        <svg
          className={`h-6 w-6 ${
            hidden ? "text-gray-400" : "text-indigo-700"
          } fill-current`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
        </svg>
      ) : (
        <svg
          className={`h-6 w-6 ${
            hidden ? "text-gray-400" : "text-indigo-700"
          } fill-current`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
        </svg>
      )}
    </div>
  );
};

export default PaginationButton;
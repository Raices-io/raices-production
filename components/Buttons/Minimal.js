import React from "react";
import { useRouter } from "next/router";

const Minimal = ({ onClick, text, disabled, link }) => {
  const router = useRouter();
  return (
    <button
      type="button"
      className={`${
        disabled && "opacity-0"
      } pr-6 py-3 inline-flex items-center focus:outline-none rounded-sm `}
      onClick={() => {
        if (!disabled & !link) {
          onClick();
        }
        if (link) {
          router.push(link);
        }
      }}
    >
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

export default Minimal;

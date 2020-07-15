import React from "react";

const Checkbox = ({ label }) => {
  return (
    <label className="mt-3 flex items-center sm:w-1/4 sm:px-2 lg:w-1/2 xl:w-full">
      <input
        type="checkbox"
        name="balcony"
        className="form-checkbox w-6 h-6 rounded-lg bg-gray-400 text-indigo-500  focus:bg-indigo-500 border-none"
      />
      <span className="text-gray-700 ml-2">{label}</span>
    </label>
  );
};

export default Checkbox;

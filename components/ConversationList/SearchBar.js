import React, { Fragment } from "react";

const SearchBar = ({ mobile }) => {
  return (
    <Fragment>
      <div className="mt-4 w-full flex items-center justify-between">
        <div className={`relative w-full ml-0`}>
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 fill-current text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
            </svg>
          </div>
          <input
            placeholder="Search by keywords"
            className="block border-2 border-transparent w-full bg-white shadow focus:outline-none focus:bg-gray-100 focus:border-gray-800 focus:border-gray-900 focus:text-gray-900 text-white rounded-lg pl-10 pr-4 py-2"
          />
        </div>
        {/* <div className="">
          <div className="ml-3 text-white flex justify-start items-center w-full h-full ">
            <div className="h-10 w-10 bg-indigo-500 flex justify-center items-center rounded">
              <svg
                className="h-6 w-6 fill-current text-white "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
              </svg>
            </div>
          </div>
        </div> */}
      </div>
    </Fragment>
  );
};
export default SearchBar;

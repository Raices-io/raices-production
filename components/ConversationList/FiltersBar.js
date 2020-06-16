import React, { useState } from "react";

const FiltersBar = ({ mobile }) => {
  const [filterShowOpen, setFilterShowOpen] = useState(false);
  const [filterWaitOpen, setFilterWaitOpen] = useState(false);
  const [filterShowTitle, setFilterShowTitle] = useState("All leads");
  const [filterWaitTitle, setFilterWaitTitle] = useState("Longest wait");

  const handleWaitFilterTitleClick = (value) => {
    setFilterWaitTitle(value);
    setFilterWaitOpen((p) => false);
  };
  const handleShowFilterTitleClick = (value) => {
    setFilterShowTitle(value);
    setFilterShowOpen((p) => false);
  };
  return (
    <div
      className={`h-12 mt-2 flex w-full justify-between items-center relative  `}
    >
      {/* Show all filter */}
      <button
        type="button"
        className="ml-2 w-32 inline-flex justify-between items-center focus:outline-none focus:shadow-outline  pr-4"
        onClick={() => setFilterShowOpen((p) => !filterShowOpen)}
      >
        {/* Filter Div, flex child 2 */}

        {/* Filter Text */}
        <span className="ml-0 text-gray-500 font-medium">
          {filterShowTitle}
        </span>
        {/* Filter SVG */}
        <svg
          className="h-6 w-6 fill-current text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          {filterShowOpen ? (
            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
          ) : (
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          )}
        </svg>
      </button>
      <button
        tabindex="-1"
        onClick={() => setFilterShowOpen((p) => false)}
        className={`${
          filterShowOpen ? "fixed" : "hidden"
        } z-10 w-full h-full inset-0 bg-black opacity-0 cursor-default`}
      ></button>
      <div
        className={`${
          filterShowOpen ? "block" : "hidden"
        } z-10 mt-2 py-4 bg-white w-48 rounded-lg shadow-xl absolute left-3 top-8`}
      >
        <a
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          href="#"
          onClick={() => handleShowFilterTitleClick("They're waiting")}
        >
          Lead is waiting for a response from you
        </a>
        <a
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          href="#"
          onClick={() => handleShowFilterTitleClick("You're waiting")}
        >
          You are waiting for a response from lead
        </a>
        <a
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          href="#"
          onClick={() => handleShowFilterTitleClick("Not responded")}
        >
          Not Responded
        </a>
        <a
          className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          href="#"
          onClick={() => handleShowFilterTitleClick("All leads")}
        >
          All leads
        </a>
      </div>
      {/* Longest Wait Filter */}
      <button
        type="button"
        className=" w-32 block inline-flex justify-between items-center focus:outline-none focus:shadow-outline "
        onClick={() => setFilterWaitOpen((p) => !filterWaitOpen)}
      >
        {/* Filter Div, flex child 2 */}

        {/* Filter Text */}
        <span className="ml-1 text-gray-500 font-medium">
          {filterWaitTitle}
        </span>
        {/* Filter SVG */}
        <svg
          className="h-6 w-6 fill-current text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          {filterWaitOpen ? (
            <path d="M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z" />
          ) : (
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          )}
        </svg>
      </button>
      <button
        tabindex="-1"
        onClick={() => setFilterWaitOpen((p) => false)}
        className={`${
          filterWaitOpen ? "fixed" : "hidden"
        } z-10 w-full h-full inset-0 bg-black opacity-0 cursor-default`}
      ></button>
      <div
        className={`${
          filterWaitOpen ? "block" : "hidden"
        } z-10 mt-2 py-4 bg-white w-32 rounded-lg shadow-xl absolute right-3 top-8`}
      >
        <a
          className="block text-right px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          href="#"
          onClick={() => handleWaitFilterTitleClick("Longest wait")}
        >
          <span className="">Longest Wait</span>
        </a>
        <a
          className="block text-right px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          href="#"
          onClick={() => handleWaitFilterTitleClick("Newest leads")}
        >
          <span className="">Newest leads</span>
        </a>
      </div>
    </div>
  );
};
export default FiltersBar;

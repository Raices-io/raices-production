import React from "react";
const FactsAndFeatures = ({ features }) => {
  return (
    <div className="mt-4 sm:mt-0 grid grid-cols-2 gap-4 sm:col-span-2">
      <div className="flex items-center">
        <svg
          className="h-5 w-5 fill-current text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z" />
        </svg>
        <span className="ml-2">{features.type}</span>
      </div>
      <div className="flex  items-center">
        <svg
          className="h-5 w-5 fill-current text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z" />
        </svg>
        <span className="ml-2">Built in {features.year_built}</span>
      </div>
      <div className="flex  items-center">
        <svg
          className="h-5 w-5 fill-current text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M2 14v-3H1a1 1 0 0 1-1-1 1 1 0 0 1 1-1h1l4-7h8l4 7h1a1 1 0 0 1 1 1 1 1 0 0 1-1 1h-1v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H5v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3zm13.86-5L13 4H7L4.14 9h11.72zM5.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
        <span className="ml-2">{features.parking_spots} Parking Spots</span>
      </div>
      <div className="flex  items-center">
        <svg
          className="h-5 w-5 fill-current text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
        </svg>
        <span
          className={`ml-2 ${
            !features.portero && "line-through text-gray-400"
          }`}
        >
          Portero
        </span>
      </div>
      <div className="flex items-center">
        <svg
          className="h-5 w-5 fill-current text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9 11.17V7h2v4.17a3 3 0 1 1-2 0zm-1-.63a4 4 0 1 0 4 0V4a2 2 0 1 0-4 0v6.53zM6 9.53V4a4 4 0 0 1 8 0v5.53A5.99 5.99 0 0 1 10 20 6 6 0 0 1 6 9.53z" />
        </svg>
        <span
          className={`ml-2 ${
            !features.air_conditioning && "line-through text-gray-400"
          }`}
        >
          Air Conditioning
        </span>
      </div>
    </div>
  );
};
export default FactsAndFeatures;

import React from 'react';
import FactsAndFeatures from './FactsAndFeatures';

const HomeDetails = ({ home }) => {
	return (
		<div>
			<div className="pt-5 px-4 md:px-0">
				<dl>
					{home.features && (
						<div className=" sm:grid sm:grid-cols-3 sm:gap-4">
							<dt className="text-lg leading-5 font-medium text-gray-700">
								Facts and Features
							</dt>
							<FactsAndFeatures features={home.amenities} />
						</div>
					)}

					{home.description && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">Description</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								{home.description}
							</dd>
						</div>
					)}
					{home.nearby_schools && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">Nearby Schools</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								{home.nearby_schools}
							</dd>
						</div>
					)}
					{home.nearby_hospitals && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">Nearby Hospitals</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								{home.nearby_hospitals}
							</dd>
						</div>
					)}
					{home.nearby_restaurants && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">
								Nearby Restaurants
							</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								{home.nearby_restaurants}
							</dd>
						</div>
					)}
					{/* <div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
            <dt className="text-lg leading-5 font-medium text-gray-700">
              Downloads
            </dt>
            <dd className="mt-4 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="border border-gray-200 rounded-md">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm leading-5">
                  <div className="w-0 flex-1 flex items-center">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span className="ml-2 flex-1 w-0 truncate">
                      HomeInfo Download.pdf
                    </span>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
                    >
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
				</dl>
			</div>
		</div>
	);
};
export default HomeDetails;

import React, { useState } from 'react';

const ASearchFilter = props => {
	const [locationFocused, setLocationFocused] = useState(false);
	return (
		<div className="flex justify-between items-center shadow-lg rounded-lg h-16 mt-8">
			<div
				className={`flex relative flex-col h-full w-3/4 justify-center ${
					!locationFocused ? 'border-transparent' : 'border-gray-600'
				} border-2 rounded-t-lg `}>
				<label
					for="email"
					className="pl-3 blockfont-medium leading-5 text-gray-800 uppercase text-xs font-semibold">
					Location
				</label>
				<div className="mt-1 relative rounded-md">
					<input
						id="email"
						className="w-40 leading-loose py-0 form-input block w-full sm:text-sm sm:leading-5 border-none outline-none focus:outline-none focus:border-none focus:shadow-none"
						placeholder="Search for a city"
						onFocus={() => setLocationFocused(true)}
						onBlur={() => setLocationFocused(false)}
					/>
				</div>
			</div>
			<div className="mr-3 bg-indigo-500 inline-flex items-center hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4 py-3 text-white">
				<svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
				</svg>
				<span className="ml-2">Search</span>
			</div>
		</div>
	);
};

export default ASearchFilter;

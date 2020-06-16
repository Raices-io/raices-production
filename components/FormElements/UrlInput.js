import React from 'react';

const UrlInput = () => {
	return (
		<div className="sm:col-span-4">
			<label for="username" className="block text-sm font-medium leading-5 text-gray-700">
				Username
			</label>
			<div className="mt-1 flex rounded-md shadow-sm">
				<span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
					workcation.com/
				</span>
				<input
					id="username"
					className="flex-1 form-input block w-full rounded-none rounded-r-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
				/>
			</div>
		</div>
	);
};
export default UrlInput;

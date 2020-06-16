import React, { useState } from 'react';
import Checkbox from './Forms/Checkbox';
const SearchFilters = props => {
	const [filtersOpen, setFiltersOpen] = useState(false);
	return (
		<section className="">
			{/* Second row for filter buttons and search */}
			<div className="flex mt-4 justify-between px-2 pt-0 py-2 ">
				<div className="relative max-w-xs w-full">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3">
						<svg
							className="h-5 w-5 fill-current text-gray-600"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20">
							<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
						</svg>
					</div>
					<input
						placeholder="Search by keywords"
						className="block border-2 border-transparent w-full bg-white shadow focus:outline-none focus:bg-gray-100 focus:border-gray-800 focus:border-gray-900 focus:text-gray-900 text-white rounded-lg pl-10 pr-4 py-2"
					/>
				</div>
				<button
					type="button"
					className="ml-4 bg-indigo-500 inline-flex items-center hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4"
					onClick={() => setFiltersOpen(p => !filtersOpen)}>
					{/* Filter Div, flex child 2 */}
					{/* Filter SVG */}
					<svg
						className="h-6 w-6 fill-current text-white"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20">
						<path d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm3 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1zm4 5a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-4z"></path>
					</svg>
					{/* Filter Text */}
					<span className="ml-1 text-white font-medium">Filters</span>
				</button>
			</div>

			{/* Filters Form */}
			<form className={`${filtersOpen ? 'block' : 'hidden'} bg-gray-100`}>
				{/* Filters */}
				<div className="lg:flex">
					{/* Basic house filters section */}
					<div className="px-4 py-4 border-t lg:border-none border-gray-900">
						<div className="flex flex-wrap -mx-2 ">
							<label className="block w-1/2 px-2 sm:w-1/4 lg:w-1/2">
								<span className="text-sm font-semibold text-gray-500">Bedrooms</span>
								<select className="p-2 mt-1 form-select block w-full text-white focus:outline-none shadow bg-gray-500 border-none">
									<option>4</option>
									<option>3</option>
									<option>2</option>
									<option>1</option>
								</select>
							</label>
							<label className="block w-1/2 px-2 sm:w-1/4 lg:w-1/2">
								<span className="text-sm font-semibold text-gray-500">Bathrooms</span>
								<select className="p-2 mt-1 form-select block w-full text-white focus:outline-none shadow bg-gray-500 border-none">
									<option>4</option>
									<option>3</option>
									<option>2</option>
									<option>1</option>
								</select>
							</label>
							<label className="block w-full px-2 sm:w-1/4 xl:w-full lg:w-1/2">
								<span className="text-sm font-semibold text-gray-500">Price Range</span>
								<select className="p-2 mt-1 form-select block w-full text-white focus:outline-none shadow bg-gray-500 border-none">
									<option>Up to $1000/mo</option>
									<option>Up to $2000/mo</option>
									<option>Up to $3000/mo</option>
									<option>Up to $4000/mo</option>
								</select>
							</label>
						</div>
					</div>
					{/* Property Type filters section */}
					<div className="px-4 py-4 border-t border-gray-900 lg:border-none lg:w-1/3 lg:border-l xl:w-full">
						{/* Radio buttons */}
						<div className="sm:flex sm:-mx-2 sm:flex-wrap">
							<Checkbox label="For rent" />
							<Checkbox label="For sale" />
						</div>
					</div>
					{/* Amenities filters section */}
					<div className="px-4 py-4 border-t lg:border-none border-gray-900 lg:w-1/3 lg:border-l xl:w-full">
						<span className="block text-sm font-semibold text-gray-500">Property Type</span>
						<div className="sm:flex sm:-mx-2 sm:flex-wrap">
							<Checkbox label="Apartment" />
							<Checkbox label="House" />
							<Checkbox label="Finca" />
						</div>
					</div>
				</div>
				{/* End Filters */}
				{/* Update Button */}
				<div className="bg-gray-100 px-4 py-4 sm:text-right">
					<button
						onClick={event => event.preventDefault()}
						className="block w-full sm:w-auto sm:inline-block bg-indigo-500 text-white hover:bg-indigo-400 font-semibold px-4 py-2 rounded-lg xl:w-full">
						Update results
					</button>
				</div>
				{/* END Update Button */}
			</form>
		</section>
	);
};

export default SearchFilters;

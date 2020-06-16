import React from 'react';

const HomeStats = props => {
	return (
		<div className="mt-5 px-4 md:px-0 grid grid-cols-1 gap-5 sm:grid-cols-3">
			<div className="bg-white overflow-hidden shadow rounded-lg">
				<div className="px-4 py-5 sm:p-6">
					<dl>
						<dt className="text-sm leading-5 font-medium text-gray-500 truncate">
							Time on Raíces
						</dt>
						<dd className="mt-1 text-3xl leading-9 font-semibold text-gray-400">126 days</dd>
					</dl>
				</div>
			</div>
			<div className="bg-white overflow-hidden shadow rounded-lg">
				<div className="px-4 py-5 sm:p-6">
					<dl>
						<dt className="text-sm leading-5 font-medium text-gray-500 truncate">Views</dt>
						<dd className="mt-1 text-3xl leading-9 font-semibold text-gray-400">350</dd>
					</dl>
				</div>
			</div>
			<div className="bg-white overflow-hidden shadow rounded-lg">
				<div className="px-4 py-5 sm:p-6">
					<dl>
						<dt className="text-sm leading-5 font-medium text-gray-500 truncate">Saves</dt>
						<dd className="mt-1 text-3xl leading-9 font-semibold text-gray-400">7</dd>
					</dl>
				</div>
			</div>
		</div>
	);
};
export default HomeStats;

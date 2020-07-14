import React from 'react';

const HomeStats = props => {
	return (
		<div class="mt-5 px-4 md:px-0 grid grid-cols-1 gap-5 sm:grid-cols-3">
			<div class="bg-white shadow rounded-lg">
				<div class="px-4 py-5 sm:p-6">
					<dl>
						<dt class="text-sm leading-5 font-medium text-gray-500 truncate">Time on Raíces</dt>
						<dd class="mt-1 text-3xl leading-9 font-semibold text-gray-400">126 days</dd>
					</dl>
				</div>
			</div>
			<div class="bg-white shadow rounded-lg">
				<div class="px-4 py-5 sm:p-6">
					<dl>
						<dt class="text-sm leading-5 font-medium text-gray-500 truncate">Views</dt>
						<dd class="mt-1 text-3xl leading-9 font-semibold text-gray-400">350</dd>
					</dl>
				</div>
			</div>
			<div class="bg-white shadow rounded-lg">
				<div class="px-4 py-5 sm:p-6">
					<dl>
						<dt class="text-sm leading-5 font-medium text-gray-500 truncate">Saves</dt>
						<dd class="mt-1 text-3xl leading-9 font-semibold text-gray-400">7</dd>
					</dl>
				</div>
			</div>
		</div>
	);
};
export default HomeStats;

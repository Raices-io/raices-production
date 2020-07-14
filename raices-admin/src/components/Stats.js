import React from 'react';

const Stats = ({ draftHomes, deniedHomes, reviewHomes }) => {
	return (
		<div className="bg-gray-50 pt-12 sm:pt-16">
			<div className="mt-10 pb-12 sm:pb-16">
				<div className="relative">
					<div className="absolute inset-0 h-1/2 bg-gray-50"></div>
					<div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="max-w-4xl mx-auto">
							<dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
								<div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
									<dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
										To review
									</dt>
									<dd className="order-1 text-5xl leading-none font-extrabold text-indigo-600">
										{reviewHomes.length || 0}
									</dd>
								</div>
								<div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
									<dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
										Denied
									</dt>
									<dd className="order-1 text-5xl leading-none font-extrabold text-indigo-600">
										{deniedHomes.length || 0}
									</dd>
								</div>
								<div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
									<dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
										Draft
									</dt>
									<dd className="order-1 text-5xl leading-none font-extrabold text-indigo-600">
										{draftHomes.length || 0}
									</dd>
								</div>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Stats;

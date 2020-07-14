import React from 'react';

const LargeShowingCard = ({ agent, messageAgent }) => {
	return (
		<div className="">
			{' '}
			<div class="sticky top-20 mt-10 w-400px max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
				<div class=" top-0 z-10 rounded-lg shadow-xl mt-8">
					<div class=" pointer-events-none absolute inset-0 rounded-lg border-2 border-indigo-600"></div>
					<div class="absolute inset-x-0 top-0 transform translate-y-px">
						<div class="flex justify-center transform -translate-y-1/2">
							<span class="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm leading-5 font-semibold tracking-wider uppercase text-white">
								Showing Agent
							</span>
						</div>
					</div>
					<div class="bg-white rounded-t-lg px-6 pt-12 pb-10 flex flex-col justify-center content-center">
						<div className=" flex justify-center">
							<img className="h-32 w-32 rounded-full" src={agent.profilePic} alt="" />
						</div>
						<div class="mt-4 flex items-center justify-center">
							<span class="text-3xl leading-8 font-semibold text-gray-500">
								{`Hi, I'm ${agent.displayName.split(' ')[0]}`}
							</span>
						</div>
					</div>
					<div class="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10">
						<ul>
							<li class="flex items-start">
								<div class="flex-shrink-0">
									<svg
										class="h-6 w-6 text-green-500"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<p class="ml-3 text-base leading-6 font-medium text-gray-500">
									Lives in Medellin
								</p>
							</li>
							<li class="mt-4 flex items-start">
								<div class="flex-shrink-0">
									<svg
										class="h-6 w-6 text-green-500"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<p class="ml-3 text-base leading-6 font-medium text-gray-500">
									Speaks English, Español
								</p>
							</li>
							<li class="mt-4 flex items-start">
								<div class="flex-shrink-0">
									<svg
										class="h-6 w-6 text-green-500"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<p class="ml-3 text-base leading-6 font-medium text-gray-500">
									Will pick you up if you'd like
								</p>
							</li>
						</ul>
						<div class="mt-10">
							<div class="rounded-lg shadow-md">
								<a
									href="#"
									data-gumroad-single-product="true"
									class="block w-full text-center rounded-lg border border-transparent bg-indigo-600 px-6 py-4 text-xl leading-6 font-medium text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150"
									onClick={messageAgent}>
									Schedule a showing
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default LargeShowingCard;

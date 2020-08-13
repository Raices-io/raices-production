import React from 'react';
import moment from 'moment';
import Link from 'next/link';

const PendingHomeComponent = ({ home }) => {
	return (
		<Link href={`/home-review/${home.id}`}>
			<li>
				<a
					href="#"
					class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
					<div class="flex items-center px-4 py-4 sm:px-6">
						<div class="min-w-0 flex-1 flex items-center">
							<div class="flex-shrink-0">
								<img class="h-12 w-12 rounded-full" src={home.agent.profilePic} alt="" />
							</div>
							<div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
								<div>
									<div class="text-sm leading-5 font-medium text-indigo-600 truncate">
										{home.agent.displayName}
									</div>
									<div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
										<span class="truncate">
											{home.addressLineOne || 'No address provided'}
										</span>
									</div>
								</div>
								<div class="hidden md:block">
									<div>
										{home.createdAt && (
											<div class="text-sm leading-5 text-gray-900">
												Created
												{' ' +
													moment
														.unix(home.createdAt.seconds)
														.format('ddd Do,  h:mmA')}
											</div>
										)}
										{home.owner && (
											<div class="mt-2 flex items-center text-sm leading-5 text-gray-500">
												<svg
													class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
													fill="currentColor"
													viewBox="0 0 20 20">
													<path
														fill-rule="evenodd"
														d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
														clip-rule="evenodd"
													/>
												</svg>
												Raices property
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
						<div>
							<svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</div>
				</a>
			</li>
		</Link>
	);
};

export default PendingHomeComponent;

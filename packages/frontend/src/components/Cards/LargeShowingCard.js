import React from 'react';

const LargeShowingCard = ({ agent, messageAgent }) => {
	return (
		<div className="">
			{' '}
			<div className="sticky top-20 mt-10 w-400px max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4">
				<div className=" top-0 z-10 rounded-lg shadow-xl mt-8">
					<div className=" pointer-events-none absolute inset-0 rounded-lg border-2 border-indigo-600"></div>
					<div className="absolute inset-x-0 top-0 transform translate-y-px">
						<div className="flex justify-center transform -translate-y-1/2">
							<span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm leading-5 font-semibold tracking-wider uppercase text-white">
								AGENTE
							</span>
						</div>
					</div>
					<div className="bg-white rounded-t-lg px-6 pt-12 pb-10 flex flex-col justify-center content-center">
						<div className=" flex justify-center">
							<img className="h-32 w-32 rounded-full" src={agent.profilePic} alt="" />
						</div>
						<div className="mt-4 flex items-center justify-center">
							<span className="text-3xl leading-8 font-semibold text-gray-500">
								{`Hola, soy ${agent.displayName.split(' ')[0]}`}
							</span>
						</div>
					</div>
					<div className="border-t-2 border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-gray-50 sm:px-10 sm:py-10">
						<ul>
							<li className="flex items-start">
								<div className="flex-shrink-0">
									<svg
										className="h-6 w-6 text-green-500"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<p className="ml-3 text-base leading-6 font-medium text-gray-500">
									Vive en Medellín
								</p>
							</li>
							<li className="mt-4 flex items-start">
								<div className="flex-shrink-0">
									<svg
										className="h-6 w-6 text-green-500"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<p className="ml-3 text-base leading-6 font-medium text-gray-500">
									Habla Inglés y Español
								</p>
							</li>
							<li className="mt-4 flex items-start">
								<div className="flex-shrink-0">
									<svg
										className="h-6 w-6 text-green-500"
										stroke="currentColor"
										fill="none"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<p className="ml-3 text-base leading-6 font-medium text-gray-500">
									Puede recogerte si lo deseas
								</p>
							</li>
						</ul>
						<div className="mt-10">
							<div className="rounded-lg shadow-md">
								<a
									href="#"
									data-gumroad-single-product="true"
									className="block w-full text-center rounded-lg border border-transparent bg-indigo-600 px-6 py-4 text-xl leading-6 font-medium text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150"
									onClick={messageAgent}>
									Planea una visita
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

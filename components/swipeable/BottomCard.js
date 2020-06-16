import React, { useState, Fragment } from 'react';
import { useSwipeable, Swipeable } from 'react-swipeable';

const BottomCard = ({ component, setComponent }) => {
	const [bottomCardOpen, setBottomCardOpen] = useState(false);
	return (
		<Fragment>
			<button
				tabindex="-1"
				onClick={() => setBottomCardOpen(p => false)}
				className={`${
					bottomCardOpen ? 'fixed' : 'hidden'
				} z-10 w-full h-full inset-0 bg-black opacity-25 cursor-default sm:hidden`}></button>
			{/* Bottom Card */}
			<Swipeable
				onSwiped={eventData => {
					console.log(eventData.dir);
					if (eventData.dir == 'Up') {
						setBottomCardOpen(true);
					} else {
						setBottomCardOpen(false);
					}
				}}
				className={`sm:hidden flex flex-col items-center justify-center absolute z-20 bottom-0 left-0 w-full rounded-t-lg ${
					bottomCardOpen ? 'h-64 bg-white' : 'bg-gray-100 h-15  '
				}`}>
				<div className="w-10 h-1 mt-1 bg-gray-400 rounded-lg"></div>
				<div className="h-full flex w-screen justify-center items-center flex-col relative">
					<nav className="-mb-px w-full">
						{/* Display when bottom nav is closed */}
						{!bottomCardOpen && (
							<div className="px-4 items-center flex sm:justify-center ">
								<div className="flex justify-start">
									<svg
										className="items-start fill-current w-6 h-6 text-green-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20">
										<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
									</svg>
								</div>
								<a
									href="#"
									className="ml-4 whitespace-no-wrap py-2 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700  focus:outline-none focus:text-gray-700">
									{component}
								</a>
							</div>
						)}
						{bottomCardOpen && (
							<div className="">
								<div
									className={`${
										component == 'Photos' ? 'bg-gray-100' : ''
									} h-15 flex items-center`}
									onClick={() => {
										setComponent('Photos');
										setBottomCardOpen(false);
									}}>
									<div className="px-4 items-center flex sm:justify-center">
										<div className="flex justify-start">
											<svg
												className="items-start fill-current w-6 h-6 text-green-400"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20">
												<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
											</svg>
										</div>
										<a
											href="#"
											className="ml-4 whitespace-no-wrap py-2 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700  focus:outline-none focus:text-gray-700">
											Photos
										</a>
									</div>
								</div>
								<div
									className={`${
										component == 'General information' ? 'bg-gray-100' : ''
									} h-15 flex items-center`}
									onClick={() => {
										setComponent('General information');
										setBottomCardOpen(false);
									}}>
									<div className="px-4 items-center flex sm:justify-center">
										<div className="flex justify-start">
											<svg
												className="items-start fill-current w-6 h-6 text-green-400"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20">
												<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
											</svg>
										</div>
										<a
											href="#"
											className="ml-4 whitespace-no-wrap py-2 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700  focus:outline-none focus:text-gray-700">
											General Information
										</a>
									</div>
								</div>
								<div
									className={`${
										component == 'Descriptions' ? 'bg-gray-100' : ''
									} h-15 flex items-center`}
									onClick={() => {
										setComponent('Descriptions');
										setBottomCardOpen(false);
									}}>
									<div className="px-4 items-center flex sm:justify-center">
										<div className="flex justify-start">
											<svg
												className="items-start fill-current w-6 h-6 text-green-400"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20">
												<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
											</svg>
										</div>
										<a
											href="#"
											className="ml-4 whitespace-no-wrap py-2 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700  focus:outline-none focus:text-gray-700 ">
											Description
										</a>
									</div>
								</div>
								<div
									className={`${
										component == 'Summary' ? 'bg-gray-100' : ''
									} h-15 flex items-center`}
									onClick={() => {
										setComponent('Summary');
										setBottomCardOpen(false);
									}}>
									<div className="px-4 items-center flex sm:justify-center">
										<div className="flex justify-start">
											<svg
												className="items-start fill-current w-6 h-6 text-green-400"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20">
												<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
											</svg>
										</div>
										<a
											href="#"
											className="ml-4 whitespace-no-wrap py-2 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700  focus:outline-none focus:text-gray-700">
											Summary
										</a>
									</div>
								</div>
							</div>
						)}
					</nav>
				</div>
			</Swipeable>
		</Fragment>
	);
};
export default BottomCard;

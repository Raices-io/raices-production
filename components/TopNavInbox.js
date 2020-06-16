import React, { useState, Fragment } from 'react';
import ProfileDropdownMenu from './ProfileDropdownMenu';

const TopNavInbox = () => {
	const [navOpen, setNavOpen] = useState(false);
	return (
		<Fragment>
			<header className={` bg-gray-100 sm:flex sm:items-center sm:justify-between `}>
				<div className="flex justify-between px-4 py-2 ">
					<div>
						<h2 className="text-2xl">Raíces</h2>
					</div>
					{/* The hamburger/close icon to open the menu. Hidden on screens larger than small*/}
					<div className="flex sm:hidden">
						<button
							type="button"
							className="px-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:text-grey-900"
							onClick={() => setNavOpen(p => !navOpen)}>
							{navOpen ? (
								<svg
									className="h-6 w-6 fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20">
									<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
								</svg>
							) : (
								<svg
									className="h-6 w-6 fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20">
									<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
								</svg>
							)}
						</button>
					</div>
					{/* EnD Hamburger Close Icon */}
				</div>
				{/* The search box */}
				<nav className={`${navOpen ? 'block' : 'hidden'} sm:flex sm:items-center sm:px-4 `}>
					<div className={`sm:flex sm:items-center`}>
						<div className={`lg:hidden md:ml-6 md:flex`}>
							<a
								href="#"
								className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-indigo-700 transition duration-150 ease-in-out">
								Explore
							</a>
							<a
								href="#"
								className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
								Saved
							</a>
							<a
								href="#"
								className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
								Inbox
							</a>
							<a
								href="#"
								className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out">
								Showings
							</a>
						</div>
						{/* Dropdown */}
						<ProfileDropdownMenu className="hidden sm:ml-6 sm:block" />
						{/* Dropdown */}
					</div>
				</nav>
			</header>

			{/* END Filters Form */}
		</Fragment>
	);
};

export default TopNavInbox;

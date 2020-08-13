import React, { useState, Fragment, useEffect } from 'react';
import ProfileDropdownMenu from './ProfileDropdownMenu';
import Link from 'next/link';
import Logo from '../Logo/Logo';
import { useRouter } from 'next/router';
import { useAuth } from '../../util/auth.js';
import styled from 'styled-components';

const TopNav = ({ inbox = false }) => {
	const router = useRouter();
	const auth = useAuth();
	const user = auth.user;
	const [navOpen, setNavOpen] = useState(false);

	return (
		<Fragment>
			<Header>
				<div className="flex justify-between py-2 xl:w-72">
					<Link href="/">
						<a>
							<Logo />
						</a>
					</Link>
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
				<nav
					className={`${
						navOpen ? 'block' : 'hidden'
					} sm:flex sm:items-center px-4 md:px-0 ls:flex-1 lg:justify-between `}>
					<div className={`sm:flex sm:items-center `}>
						<div className={`${inbox ? 'lg:hidden' : ''} hidden md:ml-6 md:flex`}>
							<Link href="/propiedades">
								<a
									href="#"
									className={`inline-flex items-center px-1 pt-1 border-b-2 ${
										router.pathname == '/propiedades'
											? 'border-teal-700'
											: 'border-transparent'
									} hover:border-gray-300 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-teal-700 transition duration-150 ease-in-out`}>
									Propiedades
								</a>
							</Link>
							<Link href="/inbox">
								<a
									href="#"
									className={`ml-8 inline-flex items-center px-1 pt-1 border-b-2 ${
										router.pathname == '/inbox' ? 'border-teal-700' : 'border-transparent'
									} hover:border-gray-300 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-teal-700 transition duration-150 ease-in-out`}>
									Correo
								</a>
							</Link>
							<Link href="/add-home">
								<a
									href="#"
									className={`ml-8 mr-8 inline-flex items-center px-1 pt-1 border-b-2 ${
										router.pathname == '/add-home'
											? 'border-teal-700'
											: 'border-transparent'
									} hover:border-gray-300 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-teal-700 transition duration-150 ease-in-out`}>
									Agregar casa
								</a>
							</Link>
							{auth.isAgent && (
								<Link href="/agent/property_list">
									<a
										href="#"
										className={`inline-flex items-center px-1 pt-1 border-b-2 ${
											router.pathname == '/agent/property-list'
												? 'border-teal-700'
												: 'border-transparent'
										} hover:border-gray-300 text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-teal-700 transition duration-150 ease-in-out`}>
										Mis propiedades
									</a>
								</Link>
							)}
						</div>
						{/* Dropdown */}
						<ProfileDropdownMenu user={user} className="hidden sm:ml-6 sm:block" />
						{/* Dropdown */}
					</div>
				</nav>
			</Header>

			{/* END Filters Form */}
		</Fragment>
	);
};

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	width: min(1920px, 90vw);
	margin: 1rem auto;

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			width: 130px;
			height: auto;
		}
	}

	@media (max-width: 834px) {
		a {
			svg {
				width: 100px;
			}
		}
	}
`;

export default TopNav;

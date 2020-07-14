import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../util/auth';
import styled from 'styled-components';

const StyledNav = styled.div`
	background: blue;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: auto;
	padding-top: 20px;
	width: 200px;
	display: flex;
	flex-direction: column;
`;

const SideNav = () => {
	// ROUTER
	const router = useRouter();
	// AUTH
	const auth = useAuth();
	const { signout } = useAuth();
	const user = auth.user;
	const logout = async e => {
		e.preventDefault();
		await signout();
		router.push('/');
	};
	return (
		<StyledNav>
			<div className="p-6">
				<span className="text-white text-xl font-semibold uppercase">Raices Admin</span>
			</div>
			<nav>
				{/* New nav section */}
				<div>
					<Link href="/">
						<a
							className={`group flex items-center px-3 py-2 text-sm leading-5 font-medium  ${
								router.pathname == '/' ? 'bg-gray-200 text-gray-800' : 'text-white'
							} focus:outline-none  transition ease-in-out duration-150`}
							aria-current="page">
							<svg
								class={`flex-shrink-0 -ml-1 mr-3 h-6 w-6 ${
									router.pathname == '/' ? 'text-gray-800' : 'text-white'
								} transition ease-in-out duration-150`}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
								/>
							</svg>
							<span class="truncate">Dashboard</span>
						</a>
					</Link>
					<Link href="/pending-homes">
						<a
							className={`group flex items-center px-3 py-2 text-sm leading-5 font-medium  ${
								router.pathname == '/pending-homes'
									? 'bg-gray-200 text-gray-800'
									: 'text-white'
							} focus:outline-none  transition ease-in-out duration-150`}>
							<svg
								class="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-white group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
								/>
							</svg>
							<span class="truncate">Pending Homes</span>
						</a>
					</Link>
					<Link href="/homes-by-agent">
						<a
							className={`group flex items-center px-3 py-2 text-sm leading-5 font-medium  ${
								router.pathname == '/homes-by-agent'
									? 'bg-gray-200 text-gray-800'
									: 'text-white'
							} focus:outline-none  transition ease-in-out duration-150`}>
							<svg
								class="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-white group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
								/>
							</svg>
							<span class="truncate">Homes By Agent</span>
						</a>
					</Link>
					<Link href="/agent-info">
						<a
							className={`group flex items-center px-3 py-2 text-sm leading-5 font-medium  ${
								router.pathname == '/agent-info' ? 'bg-gray-200 text-gray-800' : 'text-white'
							} focus:outline-none  transition ease-in-out duration-150`}>
							<svg
								class="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-white group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
								/>
							</svg>
							<span class="truncate">Agent Info</span>
						</a>
					</Link>
					<Link href="add-a-home">
						<a
							href="#"
							className={`group flex items-center px-3 py-2 text-sm leading-5 font-medium  ${
								router.pathname == '/homes' ? 'bg-gray-200 text-gray-800' : 'text-white'
							} focus:outline-none  transition ease-in-out duration-150`}>
							<svg
								class="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-white group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
								/>
							</svg>
							<span class="truncate">Add a Home</span>
						</a>
					</Link>
					<Link href="/admin">
						<a
							href="#"
							className={`group flex items-center px-3 py-2 text-sm leading-5 font-medium  ${
								router.pathname == '/admin' ? 'bg-gray-200 text-gray-800' : 'text-white'
							} focus:outline-none  transition ease-in-out duration-150`}>
							<svg
								class="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-white group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
								/>
							</svg>
							<span class="truncate">Admin</span>
						</a>
					</Link>
					<Link href="/360">
						<a
							href="#"
							className={`group flex items-center px-3 py-2 text-sm leading-5 font-medium  ${
								router.pathname == '/360' ? 'bg-gray-200 text-gray-800' : 'text-white'
							} focus:outline-none  transition ease-in-out duration-150`}>
							<svg
								class="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-white group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
								/>
							</svg>
							<span class="truncate">360</span>
						</a>
					</Link>
					<Link href="/reports">
						<a
							href="#"
							className={`group flex items-center px-3 py-2 text-sm leading-5 font-medium  ${
								router.pathname == '/reports' ? 'bg-gray-200 text-gray-800' : 'text-white'
							} focus:outline-none  transition ease-in-out duration-150`}>
							<svg
								class="flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-white group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
							<span class="truncate">Reports</span>
						</a>
					</Link>
				</div>
				<div class="my-8">
					<h3
						class="px-3 text-xs leading-4 font-semibold text-white uppercase tracking-wider"
						id="projects-headline">
						Other stuff
					</h3>
					<div class="mt-1" role="group" aria-labelledby="projects-headline">
						<a
							href="#"
							class="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-white rounded-md  focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
							onClick={e => {
								if (user) {
									logout(e);
								} else {
									router.push('/signin');
								}
							}}>
							<span className="truncate">{user ? 'Logout' : 'Login'}</span>
						</a>
					</div>
				</div>
			</nav>
		</StyledNav>
	);
};

export default SideNav;

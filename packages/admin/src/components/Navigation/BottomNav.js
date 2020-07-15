import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../util/auth.js';
const BottomNav = () => {
	const router = useRouter();
	const auth = useAuth();
	const user = auth.user;
	return (
		<div
			className={`flex px-7 bottom-0 justify-center w-full h-12 z-10 bg-white border-t border-gray-200 items-center`}>
			<div className="max-w-lg flex justify-between w-full">
				<Link href="/">
					<div className="flex flex-col content-center items-center" style={{ cursor: 'pointer' }}>
						<svg
							className={`h-5 w-5 ${
								router.pathname == '/' ? 'text-indigo-500' : 'text-gray-500'
							} group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150 fill-current-['≥/]`}
							stroke="currentColor"
							fill="none"
							viewBox="0 0 20 20">
							<path d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z" />
						</svg>
					</div>
				</Link>
				<Link href="/inbox">
					<div className="flex flex-col content-center items-center" style={{ cursor: 'pointer' }}>
						<svg
							className={`h-5 w-5 ${
								router.pathname == '/inbox' ? 'text-indigo-500' : 'text-gray-500'
							} group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150 fill-current`}
							stroke="currentColor"
							fill="none"
							viewBox="0 0 20 20">
							<path d="M17 11v3l-3-3H8a2 2 0 0 1-2-2V2c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1zm-3 2v2a2 2 0 0 1-2 2H6l-3 3v-3H2a2 2 0 0 1-2-2V8c0-1.1.9-2 2-2h2v3a4 4 0 0 0 4 4h6z" />
						</svg>
					</div>
				</Link>
				{auth.isAgent ? (
					<Link href="/add-home">
						<div
							className="flex flex-col content-center items-center"
							style={{ cursor: 'pointer' }}>
							<svg
								className={`h-5 w-5 ${
									router.pathname == '/add-home' ? 'text-indigo-500' : 'text-gray-500'
								} group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150 fill-current`}
								stroke="currentColor"
								fill="none"
								viewBox="0 0 20 20">
								<path d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
							</svg>
						</div>
					</Link>
				) : (
					<Link href="/propiedades">
						<div
							className="flex flex-col content-center items-center"
							style={{ cursor: 'pointer' }}>
							<svg
								className={`h-5 w-5 ${
									router.pathname == '/propiedades' ? 'text-indigo-500' : 'text-gray-500'
								} group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150 fill-current`}
								stroke="currentColor"
								fill="none"
								viewBox="0 0 20 20">
								<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
							</svg>
						</div>
					</Link>
				)}

				<Link href={user ? '/profile' : '/signin'}>
					<div className="flex flex-col content-center items-center" style={{ cursor: 'pointer' }}>
						{user ? (
							<img
								className=" object-cover block rounded-full h-5 w-5 overflow-hidden focus:outline-none border-2 border-gray-600 focus:border-white"
								src={user.profilePic}
							/>
						) : (
							<svg
								className={`h-5 w-5 ${
									router.pathname == '/add-home' ? 'text-indigo-500' : 'text-gray-500'
								} group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150 fill-current`}
								stroke="currentColor"
								fill="none"
								viewBox="0 0 20 20">
								<path d="M5 5a5 5 0 0 1 10 0v2A5 5 0 0 1 5 7V5zM0 16.68A19.9 19.9 0 0 1 10 14c3.64 0 7.06.97 10 2.68V20H0v-3.32z" />
							</svg>
						)}
					</div>
				</Link>
			</div>
		</div>
	);
};
export default BottomNav;

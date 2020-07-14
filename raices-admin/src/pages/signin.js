import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../util/auth.js';

const Signin = () => {
	const auth = useAuth();
	const router = useRouter();
	const login = async provider => {
		try {
			let signin = await auth.signinWithProvider(provider);
			if (signin) {
				router.push('/');
			} else {
				console.log('signin');
				console.log(signin);
			}
		} catch (e) {
			console.log(e);
		}
	};
	// Redirect to /
	// if signed in.
	useEffect(() => {
		console.log(auth.user);
		if (auth.user) {
			router.push('/');
		}
	}, [auth, router]);
	return (
		// <button onClick={() => login("google")}>Sign in with Google</button>
		<div class="min-h-screen bg-gray-50 flex flex-col flex-grow justify-center items-center py-12 sm:px-6 lg:px-8 ">
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				{/* Raices Logo */}
				<h2 class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					Iniciar sesión en su cuenta
				</h2>
			</div>

			<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div class="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
					<form action="#" method="POST">
						<div class="mt-6">
							<span class="block w-full rounded-md shadow-sm">
								<div
									onClick={() => {
										login('google');
									}}
									class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
									Iniciar sesión con Google
								</div>
							</span>
						</div>
					</form>

					<div class="mt-6">
						<div class="relative">
							<div class="absolute inset-0 flex items-center">
								<div class="w-full border-t border-gray-300"></div>
							</div>
							<div class="relative flex justify-center text-sm leading-5">
								<span class="px-2 bg-white text-gray-500">
									Si no tiene una cuenta, ¡cree uno en un clic! Es gratis :)
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signin;

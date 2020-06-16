import React, { useState, useEffect } from 'react';
import { useAuth } from '../util/auth.js';
import { useRouter } from 'next/router';
import LoadingPage from '../components/LoadingSpinner/LoadingPage';
import TopNav from '../components/Navigation/TopNav';
import BottomNav from '../components/Navigation/BottomNav';
import firebase from '../util/firebase';

const Profile = () => {
	const auth = useAuth();
	const router = useRouter();
	const [user, setUser] = useState(null);

	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		console.log(name);
		console.log(typeof value);
		if (name == 'spanish' || name == 'english') {
			setUser(p => {
				return {
					...p,
					languages: {
						...p.languages,
						[name]: value == 'true' ? false : true,
					},
				};
			});
		} else {
			setUser(p => {
				return {
					...p,
					[name]: value,
				};
			});
		}
	};

	const updateUser = async () => {
		const callUpdateUser = firebase.functions().httpsCallable('callUpdateUser');
		let response = await callUpdateUser({
			user,
		});
		if (response) {
			console.log('updated user');
		} else {
			alert('problem!');
		}
	};
	useEffect(() => {
		if (auth.user) {
			setUser(auth.user);
		}
	}, [auth]);
	// Redirect to /signin
	// if not signed in.
	useEffect(() => {
		if (auth.user === false) {
			router.push('/signin');
		}
	}, [auth, router]);
	if (!auth.user || !user) {
		return <LoadingPage />;
	}
	if (user) {
		return (
			<div className="relative flex flex-col w-screen h-full bg-white overflow-y-scroll antialiased">
				<div className="z-40 hidden md:block px-12 mt-12">
					<TopNav fixed />
				</div>
				<div className=" mt-4 sm:mt-12 mb-0 sm:mb-0 overflow-y-scroll px-12 flex flex-col h-full flex-grow mx-0 flex-grow">
					<form>
						<div>
							<div>
								<div>
									<h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
									<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
										This information will be displayed publicly so be careful what you
										share.
									</p>
								</div>
								<button
									type="button"
									className="bg-white sm:hidden flex mt-6 inline-flex items-center justify-center px-4 py-1 border border-gray-200 font-medium rounded-md text-gray-400 focus:bg-red-100 hover:bg-red-50 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-red-200 transition ease-in-out duration-150 text-xs sm:text-sm sm:leading-5"
									onClick={() => auth.signout().then(() => router.push('/'))}>
									Logout
								</button>
								<div className="mt-6 sm:mt-5">
									<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
										<label
											htmlFor="username"
											className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
											Display Name
										</label>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<div className="max-w-lg flex rounded-md shadow-sm">
												<input
													id="username"
													name="displayName"
													className="flex-1 form-input block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
													value={user.displayName}
													onChange={handleChange}
												/>
											</div>
										</div>
									</div>

									<div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
										<label
											htmlFor="about"
											className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
											About
										</label>
										<div className="mt-1 sm:mt-0 sm:col-span-2">
											<div className="max-w-lg flex rounded-md shadow-sm">
												<textarea
													id="about"
													name="about"
													rows="3"
													className="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
													value={user.about}
													onChange={handleChange}></textarea>
											</div>
											<p className="mt-2 text-sm text-gray-500">
												Write a few sentences about yourself.
											</p>
										</div>
									</div>

									<div className="mt-6 sm:mt-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
										<label
											htmlFor="photo"
											className="block text-sm leading-5 font-medium text-gray-700">
											Photo
										</label>
										<div className="mt-2 sm:mt-0 sm:col-span-2">
											<div className="flex items-center">
												<span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
													{auth.user.profilePic ? (
														<img className="" src={user.profilePic} />
													) : (
														<svg
															className="h-full w-full text-gray-300"
															fill="currentColor"
															viewBox="0 0 24 24">
															<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
														</svg>
													)}
												</span>
											</div>
										</div>
									</div>

									{user.languages && (
										<div className="mt-6 sm:border-t sm:border-gray-200 sm:pt-5">
											<div role="group" aria-labelledby="label-email">
												<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
													<div>
														<div
															className="text-base leading-6 font-medium text-gray-900 sm:text-sm sm:leading-5 sm:text-gray-700"
															id="label-email">
															Languages
														</div>
													</div>
													<div className="mt-4 sm:mt-0 sm:col-span-2">
														<div className="max-w-lg">
															<div className="relative flex items-start">
																<div className="absolute flex items-center h-5">
																	<input
																		id="comments"
																		type="checkbox"
																		name="spanish"
																		className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
																		checked={user.languages.spanish}
																		value={user.languages.spanish}
																		onChange={handleChange}
																	/>
																</div>
																<div className="pl-7 text-sm leading-5">
																	<label
																		htmlFor="comments"
																		className="font-medium text-gray-700">
																		Spanish
																	</label>
																	<p className="text-gray-500">
																		I speak Spanish fluently.
																	</p>
																</div>
															</div>
															<div className="mt-4">
																<div className="relative flex items-start">
																	<div className="absolute flex items-center h-5">
																		<input
																			id="candidates"
																			type="checkbox"
																			name="english"
																			className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
																			checked={user.languages.english}
																			onChange={handleChange}
																			value={user.languages.english}
																		/>
																	</div>
																	<div className="pl-7 text-sm leading-5">
																		<label
																			htmlFor="candidates"
																			className="font-medium text-gray-700">
																			English
																		</label>
																		<p className="text-gray-500">
																			I English fluently.
																		</p>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="mt-8 border-t border-gray-200 pt-5">
							<div className="flex justify-end">
								{/* <span className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
                  >
                    Cancel
                  </button>
                </span> */}
								<span className="ml-3 mb-4 inline-flex rounded-md shadow-sm">
									<button
										className="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
										onClick={e => {
											e.preventDefault();
											updateUser();
										}}>
										Save
									</button>
								</span>
							</div>
						</div>
					</form>
				</div>
				<div className="flex w-full md:hidden">
					<BottomNav />
				</div>
			</div>
		);
	}
};

export default Profile;

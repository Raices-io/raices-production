import React, { useState, useEffect } from 'react';
import { useAuth } from '../util/auth.js';
import { useRouter } from 'next/router';
import LoadingPage from '../components/LoadingSpinner/LoadingPage';
import Layout from '../components/Layout';
import { firebase } from '../util/firebase';
import validator from 'email-validator';
const Profile = () => {
	const auth = useAuth();
	const router = useRouter();
	const [user, setUser] = useState(null);
	const [inviteError, setInviteError] = useState(null);
	const [email, setEmail] = useState('');
	const firestore = firebase.firestore();
	const [processing, setProcessing] = useState(false);
	const getUser = async () => {
		const user = await firestore.collection('users').doc(auth.user.uid).get();
		if (user.empty) {
			console.log('error');
		} else {
			setUser(p => user.data());
		}
	};
	const handleChangeEmail = e => {
		setInviteError(p => null);
		const value = e.target.value;
		setEmail(p => value);
	};
	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
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

	const submitEmail = async (email, user) => {
		setProcessing(p => true);
		// validate email
		let valid = validator.validate(email);
		if (!valid) {
			setInviteError(p => 'Email is not valid.');
			setProcessing(p => false);
			return;
		}
		// see if user already current users agentsInvited array
		let invited = user.agentsInvited.includes(email);
		if (invited) {
			setInviteError(p => 'Already invited');
			setProcessing(p => false);
			return;
		}
		// see if user already in db
		let usersRef = await firestore.collection('users').where('email', '==', email).limit(1).get();
		let exists = false;
		if (!usersRef.empty) {
			exists = true;
		}
		if (exists) {
			setInviteError(p => 'Already signed up!');
			setProcessing(p => false);
			return;
		}

		// send the invite
		const invite = await firebase.functions().httpsCallable('callSendAgentInvite');
		await invite({
			inviteeEmail: email,
			inviterEmail: user.email,
			uid: user.uid,
			inviterName: user.displayName,
		});
		// add email to users' agentsInvited array (adding to backend too)

		setUser(p => {
			let updatedAgentsInvited = p.agentsInvited;
			updatedAgentsInvited.push(email);
			console.log(updatedAgentsInvited);

			return {
				...p,
				agentsInvited: updatedAgentsInvited,
			};
		});
		// clear the input
		setProcessing(p => false);
		setEmail('');
	};

	useEffect(() => {
		if (auth.user) {
			getUser();
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
			<Layout>
				<form>
					{/* For agents only, rewards section */}
					{user.userType === 'agent' && (
						<div>
							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">Rewards</h3>
								<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">Earn rewards</p>
							</div>
							<div className="flex-col items-center mt-4">
								<div className="flex w-full justify-between">
									<span className="flex-col justify-center items-center">
										<svg
											className={`mx-auto h-5 w-5 text-indigo-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150 fill-current-['≥/]`}
											stroke="currentColor"
											fill="none"
											viewBox="0 0 20 20">
											<path d="M0 6c0-1.1.9-2 2-2h3l2-2h6l2 2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm10 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
										</svg>
										<span>1 tour</span>
									</span>
									<span className="flex-col justify-center items-center">
										<svg
											className={`mx-auto h-5 w-5 text-indigo-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150 fill-current-['≥/]`}
											stroke="currentColor"
											fill="none"
											viewBox="0 0 20 20">
											<path d="M0 6c0-1.1.9-2 2-2h3l2-2h6l2 2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm10 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0-2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
										</svg>
										<span>5 tours</span>
									</span>
									<span className="flex-col justify-center items-center">
										<svg
											className={`mx-auto h-5 w-5 text-indigo-500 group-hover:text-gray-500 group-focus:text-gray-600 transition ease-in-out duration-150 fill-current-['≥/]`}
											stroke="currentColor"
											fill="none"
											viewBox="0 0 20 20">
											<path d="M9 18v-7L0 2V0h20v2l-9 9v7l5 1v1H4v-1l5-1zm2-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
										</svg>
										<span>Champán</span>
									</span>
								</div>
								<div className="relative w-full pt-1">
									<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
										<div
											style={{ width: `${(user.agentSignups / 5) * 100}%` }}
											className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
									</div>
								</div>
							</div>
							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">Invite Users</h3>
								<div>
									<label
										for="email"
										class="mt-4 block text-sm font-medium leading-5 text-gray-700">
										Email
									</label>
									<div class="flex mt-4 w-1/2 relative rounded-md shadow-sm">
										<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<svg
												class="h-5 w-5 text-gray-400"
												viewBox="0 0 20 20"
												fill="currentColor">
												<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
												<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
											</svg>
										</div>
										<input
											id="email"
											class="form-input block w-full pl-10 sm:text-sm sm:leading-5"
											placeholder="you@example.com"
											value={email}
											onChange={handleChangeEmail}
										/>
										<button
											onClick={e => {
												e.preventDefault();
												submitEmail(email, user);
											}}
											disabled={inviteError || processing}
											className={`ml-4 inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white  ${
												inviteError || processing
													? 'bg-indigo-300'
													: 'bg-indigo-700 hover:bg-indigo-500'
											} focus:outline-none focus:shadow-outline-indigo  transition duration-150 ease-in-out`}>
											invite
										</button>
									</div>
									{inviteError && (
										<p class="mt-2 text-sm text-red-600" id="email-error">
											{inviteError}
										</p>
									)}
								</div>
							</div>
							<div>
								<h3 className="mt-4 text-lg leading-6 font-medium text-gray-900">
									Invited Users
								</h3>
								<table className="min-w-full">
									<thead>
										<tr>
											<th className="py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Email
											</th>
											<th className="py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
												Signed up
											</th>
										</tr>
									</thead>
									<tbody>
										{user.agentsInvited.map(email => {
											return (
												<tr classname="bg-white">
													<td
														className={`py-4 whitespace-no-wrap text-sm leading-5 font-medium ${
															user.agentsSignedUp.includes(email)
																? 'text-green-500'
																: 'text-gray-400'
														}`}>
														{email}
													</td>
													<td>
														<svg
															class={`fill-current ${
																user.agentsSignedUp.includes(email)
																	? 'text-green-500'
																	: `text-gray-300`
															} h-5 w-5`}
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 20 20">
															<path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
														</svg>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					)}

					<div className="mt-6">
						<div>
							<div>
								<h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
								<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
									Esta información se mostrará públicamente, así que tenga cuidado con lo
									que compartir.
								</p>
							</div>

							<div className="mt-6 sm:mt-5">
								<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
									<label
										htmlFor="username"
										className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
										Nombre
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
										Acerca de ti
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
											Escribe algunas oraciones sobre ti
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
			</Layout>
		);
	}
};

export default Profile;

import React, { useState, useEffect } from 'react';
import { firebase } from '../../../util/firebase';
import Router from 'next/router';
import { isEmpty } from 'lodash';
const Agent = ({ agent }) => {
	const [user, setUser] = useState(agent);
	const firestore = firebase.firestore();
	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;
		setUser(p => {
			return {
				...p,
				[name]: value,
			};
		});
	};
	const updateAgent = async () => {
		await firestore.collection('users').doc(agent.id).update({
			user,
		});
	};
	if (isEmpty(agent)) {
		return (
			<div className=" flex flex-col flex-grow flex-shrink-0 h-full bg-white antialiased">
				<div className="flex flex-grow justify-center items-center">
					<div className="flex flex-col items-center">
						<span>Hmm - we didn't find a agent.</span>
						<div className="w-40 mt-6 bg-indigo-500 inline-flex justify-center items-center hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none focus:shadow-outline rounded-lg shadow pl-3 pr-4 py-3 text-white">
							<svg
								className="h-4 w-4 fill-current"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20">
								<path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
							</svg>
							<span onClick={() => Router.back()} className="ml-2">
								Go back
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className=" flex px-8 flex-col flex-grow flex-shrink-0 h-full bg-white antialiased">
			<form>
				<div className="mt-6">
					<div>
						<div>
							<h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
							<p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
								Esta información se mostrará públicamente, así que tenga cuidado con lo que
								compartir.
							</p>
						</div>

						<div className="mt-6 sm:mt-5">
							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="agentname"
									className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
									Nombre
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<div className="max-w-lg flex rounded-md shadow-sm">
										<input
											id="agentname"
											name="displayName"
											className="flex-1 form-input block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
											value={user.displayName}
											onChange={handleChange}
										/>
									</div>
								</div>
							</div>
							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="agentname"
									className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
									Email
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<div className="max-w-lg flex rounded-md shadow-sm">
										<input
											id="agentname"
											name="email"
											className="flex-1 form-input block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
											value={user.email}
											onChange={handleChange}
										/>
									</div>
								</div>
							</div>
							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="agentname"
									className="block text-sm font-medium leading-5 text-gray-700 sm:mt-px sm:pt-2">
									Phone
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<div className="max-w-lg flex rounded-md shadow-sm">
										<input
											id="agentname"
											type="tel"
											name="phone"
											className="flex-1 form-input block w-full rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
											value={user.phone}
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
											{user.profilePic ? (
												<img className="" src={agent.profilePic} />
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
																checked={agent.languages.spanish}
																value={agent.languages.spanish}
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
									updateAgent();
								}}>
								Save
							</button>
						</span>
					</div>
				</div>
			</form>
		</div>
	);
};

Agent.getInitialProps = async ctx => {
	const { id } = ctx.query;
	const firestore = firebase.firestore();
	const agentRef = firestore.collection('users').doc(id);

	let agent = {};
	const agentData = await agentRef.get();
	if (agentData.exists) {
		agent = agentData.data();
		agent.id = agentData.id;
	}
	return { agent };
};
export default Agent;

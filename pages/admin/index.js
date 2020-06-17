import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../util/auth';
import { useRouter } from 'next/router';
import { firebase } from '../../util/firebase';

const Admin = () => {
	// ****
	// ROUTER
	// ****
	const router = useRouter();

	// ****
	// AUTH
	// ****
	const auth = useAuth();
	const user = auth.user;

	// ****
	// FIRESTORE
	// ****
	const firestore = firebase.firestore();
	// ****
	// STATE
	// ****
	const [loading, setLoading] = useState(false);
	const [pendingHomes, setPendingHomes] = useState([]);
	const [empty, setEmpty] = useState(false);
	//   Set the pending Homes from the db
	const getPendingHomes = async () => {
		let homes = [];
		await firestore
			.collection('pendingHomes')
			.where('status', '==', 'pending')
			.get()
			.then(snapshot => {
				if (snapshot.empty) {
					console.log('no pending homes!');
					setLoading(p => false);
					setEmpty(p => true);
				}
				snapshot.forEach(doc => {
					homes.push({ id: doc.id, ...doc.data() });
				});
			});
		setPendingHomes(p => homes);
	};
	useEffect(() => {
		getPendingHomes();
	}, []);
	// if not signed in AND Auth user redirect to sign in page
	//   useEffect(() => {
	//     if (user == false || user.userType !== "auth") {
	//       router.push("/signin");
	//     }
	//   }, [auth, router]);

	//   if (!auth.user) {
	//     return <div className="h-screen w-screen bg-white">Loading...</div>;
	//   }

	return (
		<div
			className={`relative flex bg-gray-100 flex-col items-center w-screen h-full flex-grow overflow-y-scroll antialiased`}>
			{loading && <span>Loading...</span>}

			<div className="max-w-screen-xl bg-gray-100 px-8 flex w-full flex-col flex-grow">
				<h2 className="text-3xl">Admin</h2>
				<h2 className="text-xl">Pending Homes</h2>

				<div className="mt-10 bg-white shadow overflow-hidden sm:rounded-md">
					<ul>
						{/* Pending Home Component */}
						{pendingHomes.map(home => (
							<li>
								<a
									href="#"
									className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
									<div className="flex items-center px-4 py-4 sm:px-6">
										<div className="min-w-0 flex-1 flex items-center">
											<div className="flex-shrink-0">
												<img
													className="h-12 w-12 rounded-full"
													src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
													alt=""
												/>
											</div>
											<div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
												<div>
													<div className="text-sm leading-5 font-medium text-indigo-600 truncate">
														Ricardo Cooper
													</div>
													<div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
														<svg
															className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
															fill="currentColor"
															viewBox="0 0 20 20">
															<path
																fill-rule="evenodd"
																d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
																clip-rule="evenodd"
															/>
														</svg>
														<span className="truncate">
															ricardo.cooper@example.com
														</span>
													</div>
												</div>
												<div className="hidden md:block">
													<div>
														<div className="text-sm leading-5 text-gray-900">
															Applied on
															<time datetime="2020-01-07">January 7, 2020</time>
														</div>
														<div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
															<svg
																className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
																fill="currentColor"
																viewBox="0 0 20 20">
																<path
																	fill-rule="evenodd"
																	d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
																	clip-rule="evenodd"
																/>
															</svg>
															Completed phone screening
														</div>
													</div>
												</div>
											</div>
										</div>
										<div>
											<svg
												className="h-5 w-5 text-gray-400"
												fill="currentColor"
												viewBox="0 0 20 20">
												<path
													fill-rule="evenodd"
													d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>
									</div>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Admin;

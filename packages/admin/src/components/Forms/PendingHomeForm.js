import React, { useState, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firebase } from '../../util/firebase';
import WarningModal from '../Modals/WarningModal';
import { isEmpty } from 'lodash';
import algoliasearch from 'algoliasearch/lite';
import Search from '../pendingHomeAgent/Search';
const searchClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_SEARCH_ID);

const updateAfter = 700;

const createURL = state => `?${qs.stringify(state)}`;

const pathToSearchState = path => (path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {});

const searchStateToURL = searchState => {
	delete searchState.page;
	return searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '';
};

const DEFAULT_PROPS = {
	searchClient,
	indexName: 'AGENTS',
};

const PendingHomeForm = ({ pendingHomes }) => {
	const router = useRouter();
	const firestore = firebase.firestore();

	const [warningModalOpen, setWarningModalOpen] = useState(false);
	const [pendingHomeId, setPendingHomeId] = useState(null);
	const [homes, setHomes] = useState(pendingHomes);
	const [user, setUser] = useState({});

	const updateAgent = (id, name, email, pic) => {
		setUser({
			displayName: name,
			id: id,
			email: email,
			profilePic: pic,
		});
	};
	const deletePendingHome = async id => {
		try {
			// delete pending home from state
			const updatedPendingHomes = pendingHomes.filter(home => home.id !== id);
			setHomes(p => updatedPendingHomes);
			await firestore.collection('pendingHomes').doc(id).delete();
			return;
		} catch (e) {
			console.log(e);
			return;
		}
	};
	const createNewPendingHome = () => {
		if (isEmpty(user)) {
			alert('add a user');
			return;
		}
		//create a new pendingHome in the DB and then redirect
		let data = {
			owner: true,
			userId: 'admin',
			agent: {
				displayName: user.displayName,
				profilePic: user.profilePic,
				uid: user.id,
			},
			sale_type: [],
			title: '',
			addressLineOne: '',
			addressLineTwo: '',
			city: '',
			state: '',
			zip: '',
			home_type: '',
			bedrooms: 0,
			bathrooms: 0,
			parking_spots: 0,
			amenities: [],
			description: '',
			nearby_schools: '',
			nearby_hospitals: '',
			nearby_restaurants: '',
			status: 'draft',
			price: '',
		};
		firestore
			.collection('pendingHomes')
			.add(data)
			.then(ref => {
				router.push(`/home-in-progress/general/${ref.id}`);
			});
	};
	return (
		<Fragment>
			{warningModalOpen && (
				<WarningModal
					setWarningModalOpen={setWarningModalOpen}
					pendingHomeId={pendingHomeId}
					deletePendingHome={deletePendingHome}
				/>
			)}
			<div className="sm:py-6 pb-12 flex flex-col h-full w-full flex-grow flex-shrink-0 mx-0  flex-grow">
				<div class="bg-white">
					<div class=" bg-white pb-16  sm:pb-20 lg:pb-28">
						<div class="relative">
							<div class="absolute inset-0 h-1/2 "></div>
							<div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
								<div class="max-w-lg mx-auto rounded-lg shadow-xl overflow-hidden ">
									<div class=" px-6 pt-8 lg:flex-shrink-1 lg:pt-12">
										<h3 class="text-2xl leading-8 font-extrabold text-gray-900 sm:text-3xl sm:leading-9">
											Listar una casa en Raices
										</h3>
										Select a user
										{!isEmpty(user) && (
											<div className="flex-col">
												{user.displayName}
												{user.email}
											</div>
										)}
										<Search {...DEFAULT_PROPS} updateAgent={updateAgent} />
										{pendingHomes && pendingHomes.length !== 0 && (
											<div class=" mt-8">
												<div class="flex items-center">
													<h4 class="flex-shrink-0 pr-4 bg-white text-sm leading-5 tracking-wider font-semibold uppercase text-indigo-600">
														Tus casas en progreso
													</h4>
													<div class="flex-1 border-t-2 border-gray-200"></div>
												</div>
												<ul class="mt-8">
													{homes.map(home => {
														return (
															<li class="mt-4 flex justify-between items-center lg:col-span-1">
																<span class="w-1/4 uppercase inline-flex items-center px-2.5 py-0.5 rounded-md text-sm justify-center font-medium leading-5 bg-indigo-100 text-indigo-800">
																	{home.status}
																</span>
																<Link
																	href={`/home-in-progress/general/${home.id}`}>
																	<p class=" flex-grow text-sm ml-4 text-left leading-5 text-gray-700 hover:underline cursor-pointer truncate">
																		{home.addressLineOne}
																	</p>
																</Link>
																<span
																	onClick={() => {
																		setPendingHomeId(p => home.id);
																		setWarningModalOpen(true);
																	}}
																	class="cursor-pointer uppercase inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium leading-5 bg-red-100 text-red-800">
																	Eliminar
																</span>
															</li>
														);
													})}
												</ul>
											</div>
										)}
									</div>
									<div class=" px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center ">
										<div class="mt-6 flex flex-col">
											<div class="rounded-md  shadow">
												<a
													class="flex items-center justify-center px-5 py-3 cursor-pointer border border-transparent text-base leading-6 font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
													onClick={createNewPendingHome}>
													Enviar una nueva propiedad
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default PendingHomeForm;

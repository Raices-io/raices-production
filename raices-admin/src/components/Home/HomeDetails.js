import React, { Fragment, useState, useEffect } from 'react';
import FactsAndFeatures from './FactsAndFeatures';
import { firebase } from '../../util/firebase';
import { useRouter } from 'next/router';

const HomeDetails = ({ home, images, approve }) => {
	const firestore = firebase.firestore();
	const router = useRouter();
	const [agent, setAgent] = useState('Andrea');
	const [rejectReason, setRejectReason] = useState([]);
	const approveHome = async () => {
		// create real home in db under medellin for now, eventually we have to select for city
		try {
			await firestore
				.collection('homes')
				.doc(home.id)
				.set({
					...home,
					updated: firebase.firestore.Timestamp.now(),
					defaultPic: images[0].downloadURL,
					status: 'approved',
				});
			// remove pending home
			await firestore.collection('pendingHomes').doc(home.id).delete();
			router.push('/');
		} catch (e) {
			console.log(e);
		}
	};
	const denyHome = async () => {
		// TITO - send email to the user here. We have their user id (home.uid) and can pull the info/email from that.
		await firestore.collection('pendingHomes').doc(home.id).update({
			status: 'denied',
			rejectReasons: rejectReason,
		});
		router.push('/');
	};
	// when the page loads, if owner: true, set andrea as default agent
	const updateAgent = async (name = 'Andrea') => {
		try {
			let agent = {
				displayName: 'Andrea G.',
				profilePic:
					'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/57972762_10157383956006694_6058631071333875712_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=SeUXKeQfQD0AX_3A5Ya&_nc_ht=scontent.feoh1-1.fna&oh=d31d9bb95a644e10798a8bde660ae2c0&oe=5EF020DE',
				uid: 'NX8o69qwb6NcLaTiXdNBkVpopaT2',
			};
			if (name === 'Andrea') {
				agent.uid = 'NX8o69qwb6NcLaTiXdNBkVpopaT2';
				agent.displayName = 'Andrea G.';
				agent.profilePic =
					'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/57972762_10157383956006694_6058631071333875712_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=SeUXKeQfQD0AX_3A5Ya&_nc_ht=scontent.feoh1-1.fna&oh=d31d9bb95a644e10798a8bde660ae2c0&oe=5EF020DE';
			} else {
				agent.uid = 'E3DpaFWbTcgTKXqVYvGjxcUz8tc2';
				agent.displayName = 'Cristina S.';
				agent.profilePic =
					'https://lh4.googleusercontent.com/-hBU3pmrFIio/AAAAAAAAAAI/AAAAAAAAAAA/AAKWJJPZkIZSgzV6VmEnZXPhkcSpEc594Q/photo.jpg';
			}
			await firestore.collection('pendingHomes').doc(home.id).update({
				agent,
			});
		} catch (e) {
			console.log(e);
		}
	};
	useEffect(() => {
		if (home.rejectReasons) {
			setRejectReason(p => home.rejectReasons);
		}
	}, [home]);
	useEffect(() => {
		if (home.owner) {
			updateAgent('Andrea');
		}
	}, [home]);
	useEffect(() => {
		if (home) {
			if (!home.defaultPic) {
				firestore.collection('pendingHomes').doc(home.id).update({
					defaultPic: images[0].downloadURL,
				});
			}
		}
	}, [images]);
	return (
		<div>
			<div className="pt-5 px-4 md:px-0">
				<dl>
					{home.features && (
						<div className=" sm:grid sm:grid-cols-3 sm:gap-4">
							<dt className="text-lg leading-5 font-medium text-gray-700">
								Facts and Features
							</dt>
							<FactsAndFeatures features={home.amenities} />
						</div>
					)}

					{home.description && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">Description</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								{home.description}
							</dd>
						</div>
					)}
					{home.nearby_schools && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">Nearby Schools</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								{home.nearby_schools}
							</dd>
						</div>
					)}
					{home.nearby_hospitals && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">Nearby Hospitals</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								{home.nearby_hospitals}
							</dd>
						</div>
					)}
					{home.nearby_restaurants && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">
								Nearby Restaurants
							</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								{home.nearby_restaurants}
							</dd>
						</div>
					)}
				</dl>
			</div>
			{/* add in approve section */}
			{approve && (
				<div className="mt-8 text-white mx-auto bg-indigo-700 flex flex-grow flex-col px-6 py-12 mb-4 rounded-lg">
					<div className="text-2xl">Home Approval</div>
					{/* if owner=true, assign one of our agents */}
					{home.owner && (
						<Fragment>
							<div>
								El propietario de esta casa solicitó a un agente de Raices que lo represente
								la propiedad. Selecciona un agente.
							</div>
							<div className="flex mt-8 justify-around">
								<div className="flex flex-col items-center">
									<img
										className={`${
											agent == 'Andrea' && 'border-4'
										} w-20 h-20 rounded-full border-white object-cover`}
										src="https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/57972762_10157383956006694_6058631071333875712_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=SeUXKeQfQD0AX_3A5Ya&_nc_ht=scontent.feoh1-1.fna&oh=d31d9bb95a644e10798a8bde660ae2c0&oe=5EF020DE"
										onClick={() => {
											setAgent('Andrea');
											updateAgent('Andrea');
										}}
									/>
									<span>Andrea</span>
								</div>
								<div className="flex flex-col items-center">
									<img
										className={`${
											agent == 'Cristina' && 'border-4'
										} w-20 h-20 rounded-full border-white object-cover`}
										src="https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/68900116_10220118424855159_6214685473923661824_n.jpg?_nc_cat=102&_nc_sid=8bfeb9&_nc_ohc=RCQwk8CAYVgAX8OO9XV&_nc_ht=scontent.feoh1-1.fna&oh=d7cda04afab4da185a0a1db217cb33d2&oe=5EF09288"
										onClick={() => {
											setAgent('Cristina');
											// update the home's agent to Cristina
											updateAgent('Cristina');
										}}
									/>
									<span>Cristina</span>
								</div>
							</div>
						</Fragment>
					)}
					{/* If rejecting, decide reason for rejecting */}
					<div className="mt-8">¿Esta casa se ve bien? Apruébalo.</div>
					<button
						onClick={approveHome}
						className="mt-4 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out">
						Approve
					</button>
					<div className="mt-8">¿Esta casa no está lista? Seleccione una razón.</div>
					<div className="mt-4 text-white">
						{/* Photos */}
						<div className="relative flex items-start">
							<div className="absolute flex items-center h-5">
								<input
									id="comments"
									type="checkbox"
									className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
									checked={rejectReason.includes('fotos')}
									onClick={() => {
										if (rejectReason.includes('fotos')) {
											let updatedReasons = rejectReason.filter(
												reason => reason !== 'fotos',
											);
											setRejectReason(p => updatedReasons);
										} else {
											setRejectReason(p => [...p, 'fotos']);
										}
									}}
								/>
							</div>
							<div className="pl-7 text-sm leading-5">
								<label htmlFor="comments" className="font-medium font-bold text-white">
									Fotos
								</label>
								<p className="text-white">las fotos no son buenas</p>
							</div>
						</div>
						{/* Missing info */}
						<div className="relative flex items-start">
							<div className="absolute flex items-center h-5">
								<input
									id="comments"
									type="checkbox"
									className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
									checked={rejectReason.includes('información faltante')}
									onClick={() => {
										if (rejectReason.includes('información faltante')) {
											let updatedReasons = rejectReason.filter(
												reason => reason !== 'información faltante',
											);
											setRejectReason(p => updatedReasons);
										} else {
											setRejectReason(p => [...p, 'información faltante']);
										}
									}}
								/>
							</div>
							<div className="pl-7 text-sm leading-5">
								<label htmlFor="comments" className="font-medium font-bold text-white">
									Info
								</label>
								<p className="text-white">información faltante</p>
							</div>
						</div>
						{/* Duplicated house */}
						<div className="relative flex items-start">
							<div className="absolute flex items-center h-5">
								<input
									id="comments"
									type="checkbox"
									className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
									checked={rejectReason.includes('casa duplicada')}
									onClick={() => {
										if (rejectReason.includes('casa duplicada')) {
											let updatedReasons = rejectReason.filter(
												reason => reason !== 'casa duplicada',
											);
											setRejectReason(p => updatedReasons);
										} else {
											setRejectReason(p => [...p, 'casa duplicada']);
										}
									}}
								/>
							</div>
							<div className="pl-7 text-sm leading-5">
								<label htmlFor="comments" className="font-medium font-bold text-white">
									Duplicada
								</label>
								<p className="text-white">casa duplicada</p>
							</div>
						</div>
						{/* general issues */}
						<div className="relative flex items-start">
							<div className="absolute flex items-center h-5">
								<input
									id="comments"
									type="checkbox"
									className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
									checked={rejectReason.includes('problemas generales de calidad')}
									onClick={() => {
										if (rejectReason.includes('problemas generales de calidad')) {
											let updatedReasons = rejectReason.filter(
												reason => reason !== 'problemas generales de calidad',
											);
											setRejectReason(p => updatedReasons);
										} else {
											setRejectReason(p => [...p, 'problemas generales de calidad']);
										}
									}}
								/>
							</div>
							<div className="pl-7 text-sm leading-5">
								<label htmlFor="comments" className="font-bold ">
									Info
								</label>
								<p className="">problemas generales de calidad</p>
							</div>
						</div>
					</div>
					<button
						type="button"
						className={`mt-4 inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 ${
							rejectReason.length >= 1 ? 'bg-red-600' : 'bg-red-300'
						} text-base leading-6 font-medium text-white shadow-sm ${
							rejectReason.length >= 1 &&
							'hover:bg-red-500 focus:outline-none focus:border-red-700'
						} focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5`}
						disabled={rejectReason.length == 0}
						onClick={denyHome}>
						Deny
					</button>
				</div>
			)}
		</div>
	);
};
export default HomeDetails;

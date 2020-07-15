import React, { useState, useEffect, Fragment } from 'react';
import { firebase } from '../../util/firebase';
import LargeImageHeader from '../Gallery/LargeImageHeader';
import SmallImageHeader from '../Gallery/SmallImageHeader';
import MediumImageHeader from '../Gallery/MediumImageHeader';

import HomeChangeDetails from './HomeChangeDetails';
import ImageGalleryModal from '../Gallery/ImageGalleryModal';

import { useRouter } from 'next/router';

import usePendingHome from '../../hooks/usePendingHome';

import WarningModal from '../Modals/WarningModal';

const PendingHomeChangeComponent = () => {
	const { images, pendingHome } = usePendingHome();
	const router = useRouter();
	const firestore = firebase.firestore();
	const [showImageModal, setShowImageModal] = useState(false);
	const [title, setTitle] = useState(pendingHome.title);
	const [description, setDescription] = useState(pendingHome.description);
	const [schools, setSchools] = useState(pendingHome.nearby_schools);
	const [hospitals, setHospitals] = useState(pendingHome.nearby_hospitals);
	const [restaurants, setRestaurants] = useState(pendingHome.nearby_restaurants);
	const [saving, setSaving] = useState(null);
	const [warningModalOpen, setWarningModalOpen] = useState(false);
	const [rejectReason, setRejectReason] = useState([]);
	const [agent, setAgent] = useState('Andrea');

	// Sets the initial state when we get the pendingHome from the hook
	useEffect(() => {
		setTitle(p => pendingHome.title);
		setDescription(p => pendingHome.description);
		setSchools(p => pendingHome.nearby_schools);
		setHospitals(p => pendingHome.nearby_hospitals);
		setRestaurants(p => pendingHome.nearby_restaurants);
	}, [pendingHome]);

	// Set reject reasons, if they exist on a previously denied home
	useEffect(() => {
		if (pendingHome.rejectReasons) {
			setRejectReason(p => pendingHome.rejectReasons);
		}
	}, [pendingHome]);

	// Sets andrea as the default agent if none exists
	useEffect(() => {
		if (pendingHome.owner) {
			updateAgent('Andrea');
		}
	}, [pendingHome]);

	// Create the image download URL array
	let imageURLs = [];
	images.forEach(img => imageURLs.push(img.downloadURL));

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

	// Changing default pic
	const changeDefaultPic = async url => {
		const homeRef = firestore.collection('pendingHomes').doc(home.id);
		await homeRef.update({
			defaultPic: url,
		});
		alert('cambio. Refrescar la pagina.');
	};

	// Save changes to the pending home
	const saveHome = async () => {
		setSaving(p => true);
		try {
			await firestore.collection('pendingHomes').doc(pendingHome.id).update({
				description: description,
				nearby_schools: schools,
				nearby_restaurants: restaurants,
				nearby_hospitals: hospitals,
				title: title,
			});
			setSaving(p => false);
		} catch (e) {
			setSaving(p => false);
			alert(e);
		}
	};

	// Approves home, creates a regular home doc, deletes the pending Home doc
	const approveHome = async () => {
		try {
			await firestore
				.collection('homes')
				.doc(pendingHome.id)
				.set({
					...pendingHome,
					updated: firebase.firestore.Timestamp.now(),
					defaultPic: images[0].downloadURL,
					status: 'approved',
				});
			// remove pending home
			await firestore.collection('pendingHomes').doc(pendingHome.id).delete();
			router.push('/');
		} catch (e) {
			console.log(e);
		}
	};

	// Denies the home
	const denyHome = async () => {
		// We should send the user an email here with a notification
		await firestore.collection('pendingHomes').doc(pendingHome.id).update({
			status: 'denied',
			rejectReasons: rejectReason,
		});
		router.push('/');
	};

	// Deletes a pic
	const deletePic = async url => {
		const picRef = await firestore.collection('images').where('downloadURL', '==', url).get();
		console.log(picRef);
		try {
			await picRef.docs[0].ref.delete();
			alert('borre. Refrescar la pagina');
		} catch (e) {
			alert(e);
		}
	};

	// Deletes the pending home doc itself
	const deletePendingHome = async () => {
		await firestore.collection('pendingHomes').doc(pendingHome.id).delete();
		router.push('/pending-homes');
	};

	return (
		<div className="relative flex flex-col w-full flex-shrink-0 flex-grow bg-white mb-0 md:pb-0 overflow-scroll">
			{warningModalOpen && (
				<WarningModal
					setWarningModalOpen={setWarningModalOpen}
					pendingHomeId={pendingHome.id}
					deletePendingHome={deletePendingHome}
				/>
			)}
			{showImageModal && (
				<ImageGalleryModal
					setShowImageModal={setShowImageModal}
					images={imageURLs}
					defaultPic={pendingHome.defaultPic}
					changeDefaultPic={changeDefaultPic}
					deletePic={deletePic}
				/>
			)}

			<div className="font-sans antialiased h-full mt-0 mb-2 sm:mb-0 bg-white flex flex-grow flex-col">
				{/* Large Gallery Image Grid for images 1-5 */}
				<div className="hidden lg:block ">
					<LargeImageHeader images={imageURLs} setShowImageModal={setShowImageModal} />
				</div>
				{/* Medium Image Header*/}
				<div className="hidden sm:flex  lg:hidden h-294px">
					<MediumImageHeader images={imageURLs} setShowImageModal={setShowImageModal} />
				</div>
				{/* Small Image Header*/}
				<div className="sm:flex md:hidden">
					<SmallImageHeader images={imageURLs} setShowImageModal={setShowImageModal} />
				</div>

				<div className="max-w-3xl grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 h-full lg:max-w-screen-xl lg:px-24 md:pb-20 lg:pb-4">
					<div className="">
						<h2 className="px-6 md:px-0 text-gray-700 font-bold text-3xl mt-4 leading-tight">
							<textarea
								className="w-full"
								type="text"
								value={title}
								onChange={e => {
									let value = e.target.value;
									setTitle(p => value);
								}}></textarea>
						</h2>

						<h4 className="px-6 md:px-0 text-gray-500 font-semibold">
							{pendingHome.bedrooms} bedrooms · {pendingHome.bathrooms} Bath
						</h4>

						{/* Home stats will be after MVP */}
						{/* <HomeStats /> */}
						{/* House Details */}
						<HomeChangeDetails
							home={pendingHome}
							description={description}
							setDescription={setDescription}
							schools={schools}
							setSchools={setSchools}
							hospitals={hospitals}
							setHospitals={setHospitals}
							restaurants={restaurants}
							setRestaurants={setRestaurants}
							saveHome={saveHome}
							images={images}
							approve={true}
						/>
						{/* Showing/Agent Button */}
					</div>

					<div className="mt-8 text-white mx-auto bg-indigo-700 flex flex-grow flex-col px-6 py-12 mb-4 rounded-lg">
						<div className="text-2xl">Home Approval</div>
						{/* if owner=true, assign one of our agents */}
						{pendingHome.owner && (
							<Fragment>
								<div>
									El propietario de esta casa solicitó a un agente de Raices que lo
									represente la propiedad. Selecciona un agente.
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
						<div className="mt-8">Need to adjust this home's info? Save it.</div>
						<button
							onClick={saveHome}
							className="mt-4 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out">
							{saving !== null && saving == true ? 'Saving...' : 'Save'}
						</button>
						<div className="mt-8">¿Esta casa se ve bien? Apruébalo.</div>
						<button
							onClick={approveHome}
							className="mt-4 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-500 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out">
							Approve
						</button>
						<div className="mt-8">Want to delete this home?</div>
						<button
							onClick={() => {
								setWarningModalOpen(true);
							}}
							className="mt-4 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-500 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out">
							Eliminar
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
												setRejectReason(p => [
													...p,
													'problemas generales de calidad',
												]);
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
				</div>
			</div>
		</div>
	);
};
export default PendingHomeChangeComponent;

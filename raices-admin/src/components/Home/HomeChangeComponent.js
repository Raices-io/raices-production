import React, { useState } from 'react';
import { firebase } from '../../util/firebase';
import LargeImageHeader from '../Gallery/LargeImageHeader';
import SmallImageHeader from '../Gallery/SmallImageHeader';
import MediumImageHeader from '../Gallery/MediumImageHeader';

import HomeChangeDetails from '../Home/HomeChangeDetails';

import ImageGalleryModal from '../Gallery/ImageGalleryModal';
import { useRouter } from 'next/router';
import usePendingHome from '../../hooks/usePendingHome';

import WarningModal from '../Modals/WarningModal';
// get firestore in for client side calls for now.
// after MVP launched work on getting this logic to backend and pagination

const HomeComponent = ({ home }) => {
	const router = useRouter();
	const firestore = firebase.firestore();
	const [showImageModal, setShowImageModal] = useState(false);
	const [title, setTitle] = useState(home.title);
	const [description, setDescription] = useState(home.description);
	const [schools, setSchools] = useState(home.nearby_schools);
	const [hospitals, setHospitals] = useState(home.nearby_hospitals);
	const [restaurants, setRestaurants] = useState(home.nearby_restaurants);
	const [saving, setSaving] = useState(null);
	const [warningModalOpen, setWarningModalOpen] = useState(false);

	let imageURLs = [];
	home.images.forEach(img => imageURLs.push(img.downloadURL));

	const changeDefaultPic = async url => {
		const homeRef = firestore.collection('homes').doc(home.id);
		await homeRef.update({
			defaultPic: url,
		});
		alert('cambio. Refrescar la pagina.');
	};
	const saveHome = async () => {
		setSaving(p => true);
		try {
			await firestore.collection('homes').doc(home.id).update({
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

	// Deletes the home doc itself
	const deletePendingHome = async () => {
		await firestore.collection('homes').doc(home.id).delete();
		router.push('/homes-by-agent');
	};
	return (
		<div className="relative flex flex-col w-full h-full flex-shrink-0 flex-grow bg-white mb-0 md:pb-0 overflow-scroll">
			{warningModalOpen && (
				<WarningModal
					setWarningModalOpen={setWarningModalOpen}
					pendingHomeId={home.id}
					deletePendingHome={deletePendingHome}
				/>
			)}
			{showImageModal && (
				<ImageGalleryModal
					setShowImageModal={setShowImageModal}
					images={imageURLs}
					defaultPic={home.defaultPic}
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
							{home.bedrooms} bedroom · {home.bathrooms} Bath
						</h4>

						{/* Home stats will be after MVP */}
						{/* <HomeStats /> */}
						{/* House Details */}
						<HomeChangeDetails
							home={home}
							description={description}
							setDescription={setDescription}
							schools={schools}
							setSchools={setSchools}
							hospitals={hospitals}
							setHospitals={setHospitals}
							restaurants={restaurants}
							setRestaurants={setRestaurants}
							saveHome={saveHome}
							images={home.images}
							approve={false}
						/>
						{/* Showing/Agent Button */}
					</div>
					<div className="mt-8 text-white mx-auto bg-indigo-700 flex flex-grow flex-col px-6 py-12 mb-4 rounded-lg">
						<div className="text-2xl">Home Changes</div>
						{/* If rejecting, decide reason for rejecting */}
						<div className="mt-8">Need to adjust this home's info? Save it.</div>
						<button
							onClick={saveHome}
							className="mt-4 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out">
							{saving !== null && saving == true ? 'Saving...' : 'Save'}
						</button>
						<div className="mt-8">Want to delete this home?</div>
						<button
							onClick={() => {
								setWarningModalOpen(true);
							}}
							className="mt-4 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-red-500 hover:bg-indigo-400 focus:outline-none focus:bg-indigo-400 transition duration-150 ease-in-out">
							Eliminar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default HomeComponent;

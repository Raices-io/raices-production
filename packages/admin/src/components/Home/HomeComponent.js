import React, { useState } from 'react';
import LargeImageHeader from '../Gallery/LargeImageHeader';
import SmallImageHeader from '../Gallery/SmallImageHeader';
import MediumImageHeader from '../Gallery/MediumImageHeader';

import HomeDetails from '../Home/HomeDetails';

import ImageGalleryModal from '../Gallery/ImageGalleryModal';
import { useRouter } from 'next/router';
import usePendingHome from '../../hooks/usePendingHome';

// get firestore in for client side calls for now.
// after MVP launched work on getting this logic to backend and pagination

const HomeComponent = () => {
	const [showImageModal, setShowImageModal] = useState(false);

	const { images, pendingHome } = usePendingHome();

	let imageURLs = [];
	images.forEach(img => imageURLs.push(img.downloadURL));

	return (
		<div className="relative flex flex-col w-full h-full flex-shrink-0 flex-grow bg-white mb-0 md:pb-0 overflow-scroll">
			{showImageModal && <ImageGalleryModal setShowImageModal={setShowImageModal} images={imageURLs} />}
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
							{pendingHome.title}
						</h2>

						<h4 className="px-6 md:px-0 text-gray-500 font-semibold">
							{pendingHome.bedrooms} bedroom · {pendingHome.bathrooms} Bath
						</h4>

						{/* Home stats will be after MVP */}
						{/* <HomeStats /> */}
						{/* House Details */}
						<HomeDetails home={pendingHome} images={images} approve />
						{/* Showing/Agent Button */}
					</div>
				</div>
			</div>
		</div>
	);
};
export default HomeComponent;

import React, { Fragment, useState, useEffect } from 'react';
import FactsAndFeatures from './FactsAndFeatures';
import { firebase } from '../../util/firebase';
import { useRouter } from 'next/router';

const HomeDetails = ({
	home,
	description,
	setDescription,
	schools,
	setSchools,
	hospitals,
	setHospitals,
	restaurants,
	setRestaurants,
	images,
	approve,
}) => {
	const firestore = firebase.firestore();
	const router = useRouter();

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
		<div className="flex-col flex-grow ">
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
					{description && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">Description</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								<textarea
									onChange={e => {
										let value = e.target.value;
										setDescription(p => value);
									}}
									className="w-full"
									type="textarea"
									value={description}
								/>
							</dd>
						</div>
					)}
					{schools && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">Nearby Schools</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								<textarea
									onChange={e => {
										let value = e.target.value;
										setSchools(p => value);
									}}
									className="w-full"
									type="textarea"
									value={schools}
								/>
							</dd>
						</div>
					)}
					{hospitals && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">Nearby Hospitals</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								<textarea
									onChange={e => {
										let value = e.target.value;
										setHospitals(p => value);
									}}
									className="w-full"
									type="textarea"
									value={hospitals}
								/>
							</dd>
						</div>
					)}
					{restaurants && (
						<div className="mt-8 sm:grid sm:mt-5 sm:grid-cols-3 sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
							<dt className="text-lg leading-5 font-medium text-gray-700">
								Nearby Restaurants
							</dt>
							<dd className="leading-relaxed mt-4 text-sm leading-5 text-gray-600 sm:mt-0 sm:col-span-2">
								<textarea
									className="w-full"
									type="textarea"
									value={restaurants}
									onChange={e => {
										let value = e.target.value;
										setRestaurants(p => value);
									}}
								/>
							</dd>
						</div>
					)}
				</dl>
			</div>
		</div>
	);
};
export default HomeDetails;

import React from 'react';
import Card from '../components/Card';

const property = {
	imageUrl: 'https://source.unsplash.com/featured/?house&sig=123',
	imageAlt: 'Rear view of modern home with pool',
	beds: 3,
	baths: 2,
	title: 'Modern executive home in city center - the heart of Los Angeles',
	priceInCents: 190000,
	formattedPrice: '$1,900.00',
	reviewCount: 34,
	rating: 4,
};

const Location = ({ spacing = '' }) => {
	return (
		<div className={spacing}>
			<div className="px-4">
				<h3 className="text-gray-900 text-xl">{'Envigado'}</h3>
				<p className="text-gray-600">{'Small City, Big Feel'}</p>
			</div>
			<div className="mt-6 sm:overflow-x-auto sm:overflow-y-hidden">
				<div className="px-4 sm:inline-flex sm:pt-2 pb-8 xl:px-8">
					{/* When you iterate over cards in the future ensure that first one doesn't get the margin left*/}
					<Card property={property} />
					<Card property={property} styles="ml-4" />
					<Card property={property} styles="ml-4" />
					<Card property={property} styles="ml-4" />
				</div>
			</div>
		</div>
	);
};

export default Location;

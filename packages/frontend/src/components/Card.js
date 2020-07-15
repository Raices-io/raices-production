import React, { Component } from 'react';
import Router from 'next/router';

const Card = ({ property, styles = '' }) => {
	return (
		<div onClick={() => Router.push('/home')} className={`${styles} mt-4`}>
			<div className="relative pb-5/6">
				<img
					className="absolute inset-0 h-full w-full rounded-lg shadow-md object-cover"
					src={property.imageUrl}
				/>
			</div>
			<div className="relative  px-4 -mt-16 mx-auto max-w-sm">
				<div className="bg-white rounded-lg p-6 shadow-lg">
					<div className="flex items-baseline">
						<span className="inline-block bg-teal-200 text-teal-800 text-white text-xs px-2 rounded-full uppercase font-semibold tracking-wid">
							New
						</span>
						<div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
							{property.beds} beds &bull; {property.baths} baths
						</div>
					</div>
					<h4 className="mt-1 font-semibold text-lg leading-tight truncate">{property.title}</h4>
					<div className="mt-1">
						{property.formattedPrice} <span className="text-gray-600 text-sm">/wk</span>
					</div>
					<div className="mt-2 flex items-center">
						{[1, 2, 3, 4, 5].map(i => (
							<svg
								className={`${
									i <= property.rating ? 'text-teal-500' : 'text-gray-400'
								} h-4 w-4 fill-current`}
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20">
								<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
							</svg>
						))}
						<span className="text-gray-600 text-sm ml-2">{property.reviewCount} reviews</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;

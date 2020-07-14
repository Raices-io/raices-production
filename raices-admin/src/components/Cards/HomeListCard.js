import React from 'react';
import Link from 'next/link';

const HomeListCard = ({ property, city }) => {
	return (
		<Link href={`/home/${city}/${property.docId}`}>
			<div className="mt-2 w-full flex flex-col">
				{/* Image */}
				<div className="pb-2/3 relative">
					<img
						className="absolute top-0 h-full w-full rounded-sm shadow-md object-cover"
						src={property.images[0]['downloadURL']}
					/>
				</div>
				{/* Details */}
				<div className="flex flex-col mt-2 md:mt-0  md:justify-between">
					<span className="sm:truncate">{property.title}</span>
					<span className="font-bold self-start">${property.price}</span>
				</div>
			</div>
		</Link>
	);
};
export default HomeListCard;

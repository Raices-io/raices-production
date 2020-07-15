import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const BackgroundImage = styled.div`
	background-image: url(${props => props.image});
	height: 100%;
	width: 100%;
	background-size: cover;
	background-position: center center;
`;
const LocationCard = ({ location: { name, image, subtitle } }) => {
	return (
		<Link href={`/homes/${name}`}>
			<div class="w-full first:mt-0 mt-4 sm:mt-0 first:ml-0 ml-0 sm:ml-4 max-w-sm rounded-md border bg-white shadow">
				<div class="relative">
					<div class="h-48 bg-cover bg-no-repeat bg-center">
						<BackgroundImage image={image} />
					</div>
					<div class="absolute right-0 w-10 mr-2">
						{/* <a href="#">
              <img
                class="rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/17.jpg"
              />
            </a> */}
					</div>
				</div>
				<div class="p-3">
					<h3 class="mr-10 text-sm truncate-2nd font-semibold">
						<span>{name}</span>
					</h3>
				</div>
			</div>
		</Link>
	);
};

export default LocationCard;

import React from 'react';
import ShowAllPhotos from '../Buttons/ShowAllPhotos';
import styled from 'styled-components';

const BackgroundImage = styled.div`
	background-image: url("${props => props.image}");
	height: 100%;
	width: 100%;
	background-size: cover;
	background-position: center center;
`;
const SmallMediumImageHeader = ({ images, setShowImageModal }) => {
	return (
		<div className="relative">
			{images[0] ? (
				<div class="h-48 bg-cover bg-no-repeat bg-center">
					<BackgroundImage image={images[0]} />
				</div>
			) : (
				<div className="h-full w-full bg-gray-100"></div>
			)}
			<ShowAllPhotos setShowImageModal={setShowImageModal} />
		</div>
	);
};

export default SmallMediumImageHeader;

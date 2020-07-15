import React, { Fragment } from 'react';
import ShowAllPhotos from '../Buttons/ShowAllPhotos';
import styled from 'styled-components';

const BackgroundImage = styled.div`
	background-image: url("${props => props.image}");
	height: 100%;
	width: 100%;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
`;
const GridGallery = styled.div`
	display: grid;
	position: relative;
	grid-gap: 10px;
	grid-template-columns: repeat(4, 1fr);
	min-height: 30vh;
	.horizontal {
		grid-column: span 2;
	}
	.vertical {
		grid-row: span 2;
	}
	.big {
		grid-column: span 2;
		grid-row: span 2;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
`;

const LargeImageHeader = ({ images, setShowImageModal }) => {
	return (
		<GridGallery>
			{images[0] ? (
				<div className="big">
					<BackgroundImage image={images[0]} />
				</div>
			) : (
				<div className="h-full w-full bg-gray-100"></div>
			)}
			{images[1] ? (
				<div>
					<BackgroundImage image={images[1]} />
				</div>
			) : (
				<div className="h-full w-full bg-gray-100"></div>
			)}

			{images[2] ? (
				<div class="h-48 bg-cover bg-no-repeat bg-center">
					<BackgroundImage image={images[2]} />
				</div>
			) : (
				<div className="h-full w-full bg-gray-100"></div>
			)}
			{images[3] ? (
				<div class="h-48 bg-cover bg-no-repeat bg-center">
					<BackgroundImage image={images[3]} />
				</div>
			) : (
				<div className="h-full w-full bg-gray-100"></div>
			)}
			{images[4] ? (
				<div class="h-48 bg-cover bg-no-repeat bg-center">
					<BackgroundImage image={images[4]} />
				</div>
			) : (
				<div className="h-full w-full bg-gray-100"></div>
			)}
			<ShowAllPhotos setShowImageModal={setShowImageModal} />
		</GridGallery>
	);
};

export default LargeImageHeader;

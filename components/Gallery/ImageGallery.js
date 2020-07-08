import React, { Fragment } from 'react';
import styled from 'styled-components';
import colors from '../../util/colors';

const ImageGallery = ({ images, setShowImageModal }) => {
	return (
		<Container>
			<GridGallery>
				{images.map((image, index) => {
					if (index < 5) {
						return image ? (
							<BackgroundImage
								image={image}
								key={index}
								className={`${index === 0 && 'prominent'} image`}
							/>
						) : (
							<div className="h-full w-full bg-gray-100"></div>
						);
					}
				})}
			</GridGallery>
			<button onClick={setShowImageModal} className="button">
				Mostrar Fotos
			</button>
		</Container>
	);
};

const Container = styled.div`
	position: relative;

	.button {
		background-color: rgba(0, 0, 0, 0.4);
		position: absolute;
		right: 2rem;
		bottom: 1rem;
		background-color: ${colors('text.white')};
		padding: 0.5rem 1rem;
		font-size: 0.9rem;
		border-radius: 3px;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
	}
`;

const GridGallery = styled.div`
	display: grid;
	position: relative;
	grid-gap: 10px;
	grid-template-columns: 1.5fr 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr;

	height: min(450px, 35vw);
	width: min(1440px, 90vw);

	border-radius: 10px;
	overflow: hidden;

	scroll-snap-points-y: repeat(100vw);
	scroll-snap-type: y mandatory;

	.prominent {
		grid-column: span 2;
		grid-row: span 2;
	}

	@media (max-width: 834px) {
		grid-gap: 7px;
	}

	@media (max-width: 768px) {
		grid-template-columns: calc(100vw - 2rem) calc(100vw - 2rem) calc(100vw - 2rem) calc(100vw - 2rem) calc(
				100vw - 2rem
			);
		grid-template-rows: 1fr;
		grid-gap: 0;
		height: 35vh;

		width: calc(100vw - 2rem);
		margin: 0 auto;

		overflow-x: scroll;

		.prominent {
			grid-column: span 1;
			grid-row: span 1;
		}
	}
`;

const BackgroundImage = styled.div`
	background-image: url("${props => props.image}");
	height: 100%;
	width: 100%;
	background-size: cover;
	background-position: center;

	scroll-snap-align: center;
`;

export default ImageGallery;

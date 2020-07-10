import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import colors from '../../util/colors';
import AgentCard from '../Cards/AgentCard';
import NumberFormat from 'react-number-format';
import { useSetNavigation, useStateNavigation } from '../../context/navigation/NavigationProvider';

const ImageGalleryModal = ({ images = [], home }) => {
	const [position, setPosition] = useState(1);

	const { showImagesModal, showTourModal, closeImagesTourModal } = useSetNavigation();
	const { imagesModal, tourModal } = useStateNavigation();

	console.log('IMAGES MODAL', images[position - 1]);

	return (
		<>
			<ModalBg onClick={closeImagesTourModal} />
			<ModalContainer>
				<Header>
					<ButtonsContainer>
						<Button onClick={showImagesModal} active={imagesModal}>
							Fotos
						</Button>
						{home.tour_src && (
							<Button onClick={showTourModal} active={tourModal}>
								Video 360°
							</Button>
						)}
					</ButtonsContainer>
					<Title>
						<h3>{home.title}</h3>
						<NumberFormat
							thousandSeparator={true}
							thousandsGroupStyle="thousand"
							displayType="text"
							prefix={'$'}
							value={home.price}
						/>
					</Title>
					<div>
						<svg
							width="14"
							height="14"
							viewBox="0 0 14 14"
							fill="none"
							onClick={closeImagesTourModal}
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1 1L13 13M1 13L13 1L1 13Z"
								stroke="#4A5568"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</Header>
				<LeftPanel>
					{imagesModal && (
						<SVGWrapper
							onClick={() => {
								if (position > 1) {
									setPosition(p => position - 1);
								}
							}}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
								<path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z" />
							</svg>
						</SVGWrapper>
					)}
					{imagesModal && (
						<SVGWrapper
							onClick={() => {
								if (position < images.length) {
									setPosition(p => position + 1);
								}
							}}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
								<path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
							</svg>
						</SVGWrapper>
					)}
					<ImageContainer>
						{imagesModal && <BackgroundImage image={images[position - 1].downloadURL}></BackgroundImage>}
						{tourModal && (
							<iframe
								id="/tours/N_uOrlBoz_IR"
								allow="vr;accelerometer;gyroscope;fullscreen"
								allowfullscreen
								frameborder="0"
								width="100%"
								height="100%"
								src={home.tour_src}></iframe>
						)}
					</ImageContainer>
					{imagesModal && (
						<Position>
							{position} of {images.length} imagenes
						</Position>
					)}
				</LeftPanel>
				<RightPanel>
					<AgentCard home={home} />
				</RightPanel>
			</ModalContainer>
		</>
	);
};

const ModalContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 95vw;
	height: 95vh;
	z-index: 20;
	overflow: hidden;

	background-color: ${colors('bg.white')};
	border-radius: 10px;

	display: grid;
	grid-template-columns: 3fr 400px;
	grid-template-rows: 70px 1fr;
	grid-template-areas:
		'header header'
		'image panel';

	@media (max-width: 1024px) {
		grid-template-columns: 1fr;
		grid-template-rows: 70px 1fr 300px;
		grid-template-areas:
			'header '
			'image'
			'panel';
	}

	@media (max-width: 550px) {
		width: 100vw;
		height: 100vh;
		border-radius: 0;
	}
`;
const ModalBg = styled.header`
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	z-index: 10;

	background-color: rgba(0, 0, 0, 0.4);
`;
const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
	grid-area: header;
	border-bottom: 1px solid ${colors('border.light')};

	svg {
		cursor: pointer;
	}
`;

const Title = styled.div`
	display: flex;
	span {
		font-family: 'Roboto', sans-serif;
		margin-left: 2rem;
	}

	@media (max-width: 1024px) {
		h3 {
			width: 400px;
			text-overflow: ellipsis;
			min-width: 0;
			/* Required for text-overflow to do anything */
			white-space: nowrap;
			overflow: hidden;
		}
	}
	@media (max-width: 834px) {
		h3 {
			width: 250px;
			text-overflow: ellipsis;
			min-width: 0;
			/* Required for text-overflow to do anything */
			white-space: nowrap;
			overflow: hidden;
		}
	}
	@media (max-width: 768px) {
		display: none;
	}
`;

const SVGWrapper = styled.div`
	position: absolute;
	padding: 0.5rem;
	border-radius: 50%;
	background-color: #2c2c2c;
	transition: ${props => props.theme.transitions.bg_hover};
	cursor: pointer;

	&:hover {
		background-color: #4d4d4d;
	}

	&:nth-child(1) {
		top: 50%;
		left: 2rem;
		transform: translateY(-50%);
	}

	&:nth-child(2) {
		top: 50%;
		right: 2rem;
		transform: translateY(-50%);

		svg {
			transform: translateX(1px);
		}
	}

	svg {
		width: 40px;
		height: auto;

		transform: translateX(-2px);

		fill: white;
	}

	@media (max-width: 768px) {
		svg {
			width: 20px;
		}
	}
`;

const LeftPanel = styled.div`
	grid-area: image;
	position: relative;
	width: 100%;
	background-color: black;
`;

const ImageContainer = styled.div`
	height: calc(100% - 4rem);
	border-bottom: 1px solid ${colors('text.light')};
`;

const RightPanel = styled.aside`
	grid-area: panel;

	width: 400px;

	@media (max-width: 420px) {
		width: 100%;
	}
`;

const BackgroundImage = styled.div`

	background: url("${props => props.image}");
	margin: 0 auto;
	height: 100%;
	width: 80%;
	display: block;
	min-height: 150px;
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center center;
`;

const Position = styled.span`
	display: block;
	position: absolute;
	bottom: 1.25rem;
	left: 50%;
	transform: translateX(-50%);
	color: ${colors('text.light')};
	font-size: 0.9rem;
`;

const ButtonsContainer = styled.div`
	display: flex;
	align-items: center;
	width: fit-content;
	height: 100%;
`;

const Button = styled.button`
	padding: 0.5rem 1rem;
	border: 1px solid ${colors('text.light')};
	color: ${colors('text.light')};
	border-radius: 5px;
	font-size: 0.9rem;
	height: fit-content;
	margin-right: 1rem;

	&:focus {
		outline: none;
	}

	&:hover {
		border: 1px solid ${colors('primary')};
		color: ${colors('primary')};
	}

	${props =>
		props.active &&
		css`
			border: 1px solid ${colors('primary')};
			color: ${colors('text.white')};
			background-color: ${colors('primary')};

			&:hover {
				color: ${colors('text.white')};
				background-color: ${colors('primary')};
				cursor: default;
			}
		`}
`;

export default ImageGalleryModal;
